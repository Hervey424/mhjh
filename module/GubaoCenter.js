
/**
*
*@author Jian
*创建时间：2024-2-22
*/
//class com.modules.gubao.GubaoCenter extends com.game.core.connect.GameServer
var GubaoCenter=(function(_super){
	//时装
	function GubaoCenter(){
		GubaoCenter.__super.call(this);
	}

	__class(GubaoCenter,'com.modules.gubao.GubaoCenter',_super);
	var __proto=GubaoCenter.prototype;
	__proto.init=function(){
		GameServer.register(S2C_GubaoInfoMessage,GameHandler.create(this,this.onS2C_GubaoInfoMessage));
		GameServer.register(S2C_GubaoTaskInfoMessage,GameHandler.create(this,this.onS2C_GubaoTaskInfoMessage));
	}

	__proto.onS2C_GubaoTaskInfoMessage=function(cmd){
		var bean,has={};
		var info;
		for(var $each_info in cmd.gubaoTaskInfoList){
			info=cmd.gubaoTaskInfoList[$each_info];
			GubaoCenter._dic["task_"+info.id]=info;
			bean=GubaoCenter.getTaskBean(info.id);
			if(!bean)continue ;
			has[bean.q_replace]=bean.q_des;
		}
		EventMgr.dispatch("GubaoCenter.UPDATE_TASK");
		var type=0;
		for(var key in has){
			type=myparseInt(key);
			if(type < 1000){
				GubaoCenter.updateRed2();
			}
			else if(type < 2000){
				TitleCenter.updateRed();
			}
			else if(type < 3000){
				HuaxingCenter.updateRed(myparseInt(has[key]));
			}
			else{
				FashionCenter.updateRed(myparseInt(has[key]));
			}
		}
	}

	__proto.onS2C_GubaoInfoMessage=function(cmd){
		var bean;
		var id;
		for(var $each_id in cmd.gubaoIds){
			id=cmd.gubaoIds[$each_id];
			GubaoCenter._dic[id]=true;
			bean=App.dataMgr.q_gubaoContainer.getDataBean(id,false);
			if(bean && bean.q_boss_follow){
				BossDataCenter.instance.setGuanzhu(bean.q_boss_follow / 100 >> 0,bean.q_boss_follow,false);
			}
		}
		ShangGuJinDiCenter.checkPoint();
		EventMgr.dispatch("GubaoCenter.UPDATE");
		GubaoCenter.updateRed1();
	}

	GubaoCenter.sendC2S_GubaoActivationMessage=function(id,type,times){
		(type===void 0)&& (type=0);
		(times===void 0)&& (times=1);
		var cmd=new C2S_GubaoActivationMessage();
		cmd.type=type;
		cmd.num=times;
		cmd.id=id;
		GameServer.sendCommand(cmd);
	}

	GubaoCenter.updateRed1=function(delay){
		(delay===void 0)&& (delay=true);
		if(delay){
			App.timer.doTimeOnce(GubaoCenter,500,GubaoCenter.updateRed1,[false]);
			return;
		}
		GubaoCenter.active_red=false;
		var types=Q_globalCenter.getJsonData(15156)["tabs_type"];
		var opendays=Q_globalCenter.getJsonData(15156)["tabs_openday"];
		var beans,day=ServerTime.getOpenDays();
		for(var i=0;i < types.length;i++){
			if(day < opendays[i]){
				break ;
			}
			beans=App.dataMgr.q_gubaoContainer.getBeans(types[i]);
			for(var j=1;j < beans.length;j++){
				if(!GubaoCenter.isActive(beans[j].q_id)&& ConditionUtil.isItemEnoughJson(beans[j].q_open_cost)){
					GubaoCenter.active_red=true;
					break ;
				}
			}
			if(GubaoCenter.active_red)break ;
		}
		EventMgr.dispatch("ET.FUNCTION_TIP",239,GubaoCenter.up_red || GubaoCenter.active_red);
		if(App.menuProxy){
			App.menuProxy.openStrong(1460000,GubaoCenter.up_red || GubaoCenter.active_red);
		}
	}

	GubaoCenter.updateRed2=function(delay){
		(delay===void 0)&& (delay=true);
		if(delay){
			App.redPoint.callLater(GubaoCenter,GubaoCenter.updateRed2,[false]);
			return;
		}
		GubaoCenter.up_red=false;
		var types=Q_globalCenter.getJsonData(15156)["tabs_type"];
		var bean,m_data;
		for(var i=0;i < types.length;i++){
			if(!GubaoCenter.isGubaoUP(types[i]))continue ;
			if(GubaoCenter.isAllActive(types[i])){
				GubaoCenter.up_red=true;
				break ;
			}
		}
		GubaoCenter.onSend();
		if(App.menuProxy){
			App.menuProxy.openStrong(1460000,GubaoCenter.up_red || GubaoCenter.active_red);
		}
	}

	GubaoCenter.onSend=function(delay){
		(delay===void 0)&& (delay=true);
		if(delay){
			App.redPoint.callLater(GubaoCenter,GubaoCenter.onSend,[false]);
			return;
		};
		var red=GubaoCenter.up_red || GubaoCenter.active_red || HechengRedPoint.shengwangRed1 || HechengRedPoint.shengwangRed2 || HechengRedPoint.batiRed || HechengRedPoint.miaoshaRed || ShenGuCenter.getPoint();
		EventMgr.dispatch("ET.FUNCTION_TIP",239,red);
	}

	GubaoCenter.isTabRed=function(type){
		var bean;
		var beans=App.dataMgr.q_gubaoContainer.getBeans(type);
		if(GubaoCenter.isGubaoUP(type)&& beans[1].q_master_type){
			var m_data=MasterCenter.getMasterDataByType(JSON.parse(beans[1].q_master_type)[0]);
			if(m_data && m_data.level > 1){
				return true;
			}
		}
		for(var i=1;i < beans.length;i++){
			bean=beans[i];
			if(!GubaoCenter.isActive(bean.q_id)&& ConditionUtil.isItemEnoughJson(bean.q_open_cost)){
				return true;
			}
		}
		return false;
	}

	GubaoCenter.getTaskBean=function(type){
		var vec=App.dataMgr.q_task_gubaoContainer.getList();
		var bean;
		for(var $each_bean in vec){
			bean=vec[$each_bean];
			if(bean.q_replace==type){
				return bean;
			}
		}
		return null;
	}

	GubaoCenter.getTask=function(type){
		if(type > 0){
			var info=GubaoCenter._dic["task_"+type];
			if(!info){
				info=new GubaoTaskInfo();
				info.id=type;
				GubaoCenter._dic["task_"+type]=info;
			}
		}
		return info;
	}

	GubaoCenter.isGubaoUP=function(type){
		if(type==0)return false;
		var task=com.modules.gubao.GubaoCenter.getTask(type);
		if(!task)return false;
		var g_bean=com.modules.gubao.GubaoCenter.getTaskBean(type);
		return task.count > 0 && (g_bean.q_jiacheng_max==99999999 || task.activationCount < (g_bean.q_jiacheng_max+task.extLimit));
	}

	GubaoCenter.isAllActive=function(type){
		var bean=App.dataMgr.q_gubaoContainer.getBeans(type)[1];
		if(bean && bean.q_master_type){
			var data=MasterCenter.getMasterDataByType(JSON.parse(bean.q_master_type)[0]);
			return data && data.level > 1;
		}
		return true;
	}

	GubaoCenter.isActive=function(id){
		return Boolean(GubaoCenter._dic[id]);
	}

	GubaoCenter.UPDATE_TASK="GubaoCenter.UPDATE_TASK";
	GubaoCenter.UPDATE="GubaoCenter.UPDATE";
	GubaoCenter.TYPE_1000=1000;
	GubaoCenter.TYPE_2000=2000;
	GubaoCenter.TYPE_3000=3000;
	GubaoCenter.up_red=false;
	GubaoCenter.active_red=false;
	GubaoCenter._dic={};
	return GubaoCenter;
})(GameServer)