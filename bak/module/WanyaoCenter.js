/**
*
*@author Jian
*创建时间：2024-6-4
*/
//class com.modules.boss.wanyao.WanyaoCenter
var WanyaoCenter=(function(){
	function WanyaoCenter(){}
	__class(WanyaoCenter,'com.modules.boss.wanyao.WanyaoCenter');
	__getset(1,WanyaoCenter,'datas',function(){
		if(!WanyaoCenter._datas){
			WanyaoCenter._mapids=[];
			WanyaoCenter._datas=[];
			var beans=App.dataMgr.q_mapContainer.getMapClient(42);
			for(var i=0;i < beans.length;i++){
				WanyaoCenter._datas.push(new WanyaoTabData(beans[i]));
				WanyaoCenter._mapids.push(beans[i].q_map_id);
			}
			BossCommandSender.sendC2S_AliveWildBossMessage(WanyaoCenter._mapids);
		}
		return WanyaoCenter._datas;
	});

	WanyaoCenter.updateMapEnter=function(){
		var vec=WanyaoCenter.datas;
		var data;
		for(var $each_data in vec){
			data=vec[$each_data];
			data.isEnter=ConditionUtil.isMapCanEnter(data.bean);
		}
	}

	WanyaoCenter.sendC2S_NpcInfoMessage=function(mapids){
		if(!WanyaoCenter._datas)WanyaoCenter.datas;
		if(!mapids)mapids=WanyaoCenter._mapids;
		var cmd=new C2S_NpcInfoMessage();
		cmd.mapId=mapids;
		GameServer.sendCommand(cmd);
	}

	WanyaoCenter.updateWanyao=function(delay){
		(delay===void 0)&& (delay=true);
		if(delay){
			if(FunctionManager.isFunctionOpen(347)){
				App.redPoint.callLater(WanyaoCenter,WanyaoCenter.updateWanyao,[false]);
			}
			return;
		}
		WanyaoCenter.wanyaoRed=false;
		var vec=WanyaoCenter.datas;
		for(var i=vec.length-1;i >-1;i--){
			if(WanyaoCenter.wanyaoIsRed(vec[i],true)){
				WanyaoCenter.wanyaoRed=true;
				break ;
			}
		}
		BossDataCenter.onSend();
	}

	WanyaoCenter.wanyaoIsRed=function(tab,isMap){
		(isMap===void 0)&& (isMap=false);
		if(isMap && !tab.isEnter){
			return false;
		};
		var n_bean,time=ServerTime.getServerTime();
		var npc;
		for(var $each_npc in WanyaoCenter._npcs[tab.bean.q_map_id]){
			npc=WanyaoCenter._npcs[tab.bean.q_map_id][$each_npc];
			if(npc.refreshTime==0 || npc.refreshTime >=time){
				n_bean=App.dataMgr.q_npcContainer.getDataBean(npc.modelId,false);
				if(n_bean && BossDataCenter.instance.getTiliNum(n_bean.q_caijitili_client)> 0){
					return true;
				}
			}
		}
		if(BossDataCenter.instance.getTiliNum(180)> 0){
			var obj;
			for(var $each_obj in tab.ids){
				obj=tab.ids[$each_obj];
				if(BossDataCenter.instance.isGuanzhu(tab.bean.q_map_id,obj["monster"])&& BossDataCenter.instance.getMapsBossNum([tab.bean.q_map_id],null,[obj["monster"]],true)> 0){
					return true;
				}
			}
		}
		return false;
	}

	WanyaoCenter.getNpcInfo=function(mapid){
		var bean;
		var num=0,total=0,min=0,time=ServerTime.getServerTime();
		var info;
		for(var $each_info in WanyaoCenter._npcs[mapid]){
			info=WanyaoCenter._npcs[mapid][$each_info];
			bean=App.dataMgr.q_npcContainer.getDataBean(info.modelId,false);
			if(!bean || bean.q_displaynpc !=1){
				continue ;
			}
			total++;
			if(info.refreshTime > time){
				if(min==0 || info.refreshTime < min){
					min=info.refreshTime;
				}
			}
			else{
				num++;
			}
		}
		return [num,total,min-time];
	}

	WanyaoCenter.getMapNpcs=function(mapid){
		return WanyaoCenter._npcs[mapid];
	}

	WanyaoCenter.getNpc=function(mapid,onlyId){
		return WanyaoCenter._npcs[mapid] ? WanyaoCenter._npcs[mapid][onlyId] :null;
	}

	WanyaoCenter.updateNpc=function(arr){
		var hideTime=0;
		var info;
		for(var $each_info in arr){
			info=arr[$each_info];
			if(!WanyaoCenter._npcs[info.mapModelId]){
				WanyaoCenter._npcs[info.mapModelId]={};
			}
			WanyaoCenter._npcs[info.mapModelId][info.npcId.toString()]=info;
			hideTime=info.hideTime.toNumber();
			if(hideTime > 0){
				info.refreshTime+=hideTime;
			}
		}
		EventMgr.dispatch("WanyaoCenter.NPC_UPDATE");
		WanyaoCenter.updateWanyao();
	}

	WanyaoCenter.NPC_UPDATE="WanyaoCenter.NPC_UPDATE";
	WanyaoCenter._datas=null;
	WanyaoCenter._mapids=null;
	WanyaoCenter.wanyaoRed=false;
	WanyaoCenter._npcs={};
	return WanyaoCenter;
})()


/**
*
*@author Jian
*创建时间：2024-5-30
*/
//class com.modules.boss.wanyao.WanyaoTabData
var WanyaoTabData=(function(){
	function WanyaoTabData(bean){
		this.isEnter=false;
		this.bean=null;
		this.ids=null;
		this.bean=bean;
		this.ids=bean.q_boss ? JSON.parse(bean.q_boss):[];
	}

	__class(WanyaoTabData,'com.modules.boss.wanyao.WanyaoTabData');
	return WanyaoTabData;
})()