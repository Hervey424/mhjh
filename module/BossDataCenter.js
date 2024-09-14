var BossDataCenter=(function(){
	function BossDataCenter(){
		/**所有BOSS*/
		this._allBossDic=null;
		/**地图配置表字典*/
		this.mapDic=null;
		/**怪物（boss）配置表字典*/
		this.monsterBeanDic=null;
		/**激战BOSS配置列表*/
		this.fightBeanDic=null;
		/**{mapId:{monsterId:{bossId(唯一ID):boss数据}}}*/
		this._mapbossDic=null;
		this._bossTimes=null;
		this.role=null;
		/**主线任务装备体验状态-1 体验中 0 体验过了*/
		this.equipTiyanState=0;
		/**主线任务BOSS体验状态-1 体验中 0 体验过了*/
		this.bossTiyanState=0;
		this.fuhuoDic=null;
		//本次更新复活的boss
		this._prompt_key=null;
		/**BOSS掉落物品*/
		this.showItemStr=null;
		/**当前服务器时间*/
		this.curServerTime=0;
		this.logDic=null;
		this._bossGZDic={};
		/**BOSS掉落记录*/
		this.logList=[];
		this.logTopCount=0;
		//怪物体力
		this._tiliTypeDic=null;
		this._tiliTypeDic={};
		this._mapbossDic={};
		this._allBossDic={};
		this.fightBeanDic=App.dataMgr.q_fightBossContainer.getHashMap();
		this.monsterBeanDic=App.dataMgr.q_monsterContainer.getHashMap();
		this.mapDic=App.dataMgr.q_mapContainer.getHashMap();
		this.role=App.role;
	}

	__class(BossDataCenter,'com.logic.data.zone.boss.BossDataCenter');
	var __proto=BossDataCenter.prototype;
	/**清除本地数据缓存*/
	__proto.clear=function(mapids){
		if(mapids){
			var mapid;
			for(var $each_mapid in mapids){
				mapid=mapids[$each_mapid];
				delete this._mapbossDic[mapid+''];
			}
		}
		else{
			this._mapbossDic={};
		}
	}

	__proto.reset=function(){
		this._mapbossDic={};
		this._allBossDic={};
		BossCommandSender.sendC2S_AliveWildBossMessage();
	}

	//------------------重复使用变量--------///
	__proto.update=function(infoList,type){
		if(infoList.length==0)return;
		this.role=App.role;
		if(!this.role)return;
		this.logDic={};
		this.fuhuoDic={};
		this.curServerTime=ServerTime.getServerTime();
		var c_types={};
		var fightBean,bossBean,bossInfo,bossData,bInt64;
		for(var i=0;i < infoList.length;i++){
			bossInfo=ClassUtils.asTo(infoList[i],WildBossInfo);
			if(!this.fightBeanDic[bossInfo.fightId]){
				this.logDic["fightId_"+bossInfo.fightId]="Q_fight_boss_ID："+bossInfo.fightId+"__";
				continue ;
			}
			fightBean=ClassUtils.asTo(this.fightBeanDic[bossInfo.fightId],Q_fight_bossBean);
			if(!this.mapDic[bossInfo.mapModelId]){
				this.logDic["map_"+bossInfo.mapModelId]="Q_map_fId："+bossInfo.fightId+" bId："+bossInfo.monsterModelId+" mId："+bossInfo.mapModelId+"_";
				continue ;
			}
			if(!this.monsterBeanDic[bossInfo.monsterModelId]){
				this.logDic["bId_"+bossInfo.monsterModelId]="Q_monster_ID："+bossInfo.monsterModelId+"_";
				continue ;
			}
			bossBean=this.monsterBeanDic[bossInfo.monsterModelId];
			bInt64=bossInfo.monsterId.toString();
			var temp1=this._allBossDic[bossInfo.fightId];
			if(!temp1){
				temp1={};
				this._allBossDic[bossInfo.fightId]=temp1;
			};
			var temp2=temp1[bossInfo.monsterModelId];
			if(!temp2){
				temp2={};
				temp1[bossInfo.monsterModelId]=temp2;
			}
			bossData=temp2[bInt64];
			if(!bossData){
				bossData=new WildBossData(bossInfo.mapModelId,bInt64,bossBean,fightBean);
				temp2[bInt64]=bossData;
			}
			temp1=this._mapbossDic[bossInfo.mapModelId];
			if(!temp1){
				temp1={};
				this._mapbossDic[bossInfo.mapModelId]=temp1;
			}
			temp2=temp1[bossInfo.monsterModelId];
			if(temp2 && bossData.monsterModelId==21004301){
				for(var fzBossI64Id in temp2){
					delete temp2[fzBossI64Id];
				}
			}
			if(!temp2){
				temp2={};
				temp1[bossInfo.monsterModelId]=temp2;
			}
			temp2[bInt64]=bossData;
			if(!c_types[fightBean.q_client_boss_type]){
				c_types[fightBean.q_client_boss_type]=true;
			}
			if(bossBean.q_follow_popup > 0){
				if(bossData.remainTime > 0 || bossInfo.status==2){
					if(bossInfo.remainTime <=0 || bossInfo.status==2){
						this.fuhuoDic[bossInfo.mapModelId+'_'+bossInfo.monsterModelId]=bossData;
					}
				}
				else if((bossInfo.remainTime > 0 || bossInfo.status==3)&& (bossInfo.mapModelId+'_'+bossInfo.monsterModelId)==this._prompt_key){
					PanelManager.closeByClass(BossPrompt);
				}
			}
			bossData.update(bossInfo);
			if(bossInfo.monsterLv > 0){
				bossData.level=bossInfo.monsterLv;
			}
			else{
				bossData.level=bossBean.q_lvl;
			}
		}
		i=0;
		if(!GameConfig.isRelease){
			var logStr='';
			var log;
			for(var $each_log in this.logDic){
				log=this.logDic[$each_log];
				logStr+=log;
				i++;
				if(i > 5)break ;
			}
			if(logStr){
				Alert.show(logStr);
				Log.logDebug(logStr);
			}
		}
		for(log in this.fuhuoDic){
			bossData=this.fuhuoDic[log];
			if(!this._bossGZDic[log]){
				continue ;
			}
			bossData=this.fuhuoDic[log];
			bossBean=this.monsterBeanDic[bossData.monsterModelId];
			if(!bossBean)continue ;
			if(bossBean.q_blonger_tili){
				this.logDic=JSON.parse(bossBean.q_blonger_tili);
				if(this.getTiliNum(this.logDic["tili"])< this.logDic["num"]){
					continue ;
				}
				if(this.logDic.hasOwnProperty("fake")&& bossBean.q_percent_tili){
					this.logDic=JSON.parse(bossBean.q_percent_tili);
					if(this.getTiliNum(this.logDic["tili"])< this.logDic["num"]){
						continue ;
					}
				}
			}
			this._prompt_key=log;
			PanelManager.openByClass(BossPrompt,bossData);
			break ;
		}
		KuaFuCenter.checkFxsmPoint();
		ShangGuJinDiCenter.checkPoint();
		com.logic.data.zone.boss.BossDataCenter.checkAnzhishendianPoint();
		EventMgr.dispatch("FIGHTBOSSSTATUE");
		if(c_types[8]){
			BossDataCenter.updateTiliRed(168);
		}
		if(c_types[33]){
			WanyaoCenter.updateWanyao();
		}
		if(c_types[31]){
			KuafuBattleCenter.getYijiRedpoint(true);
		}
		if(c_types[35]){
			App.redPoint.callLater(FeiShengCenter,FeiShengCenter.updateBossRed);
		}
	}

	__proto.setGuanzhu=function(mapid,bossid,bool){
		var key,count=0;
		for(key in this._bossGZDic){
			if(key !="count" && this._bossGZDic[key] > 0){
				count++;
			}
		}
		key=mapid+'_'+bossid;
		if(bool){
			this._bossGZDic[key]=1;
		}
		else if(this._bossGZDic.hasOwnProperty(key)){
			this._bossGZDic[key]=0;
		}
		else{
			return false;
		}
		count=0;
		for(key in this._bossGZDic){
			if(key !="count" && this._bossGZDic[key] > 0){
				count++;
			}
		}
		this._bossGZDic["count"]=count;
		SetupCenter.saveClient("56",this._bossGZDic);
		return true;
	}

	__proto.isGuanzhu=function(mapid,bossid){
		return Boolean(this._bossGZDic[mapid+'_'+bossid]);
	}

	/**勾选状态(0 已取消，1已关注，2从未关注过)*/
	__proto.guanzhuState=function(mapid,bossid){
		if(this._bossGZDic[mapid+'_'+bossid]){
			return 1;
		}
		else if(this._bossGZDic[mapid+'_'+bossid]==0){
			return 0;
		}
		return 2;
	}

	__proto.initGuanzhu=function(dic,clearAll){
		(clearAll===void 0)&& (clearAll=false);
		if(clearAll){
			for(var key in this._bossGZDic){
				if(key !="count"){
					this._bossGZDic[key]=0;
				}
			}
			this._bossGZDic["count"]=0;
			SetupCenter.saveClient("56",this._bossGZDic);
			EventMgr.dispatch("FightBossEvent.CLEAR_GUANZHU");
			BossDataCenter.onSend();
		}
		else{
			this._bossGZDic=dic;
		}
	}

	/**
	*@param type 1.等级关注、2.转生关注、3.龙魂关注、4.单个功能开放、5.收到功能数据、6.刷新整个表、7.锁妖塔、0都关注
	*@param oldLv 角色升级前总等级
	*/
	__proto.updateAutoGuanzhu=function(type,oldLv){
		(type===void 0)&& (type=0);
		(oldLv===void 0)&& (oldLv=0);
		if(!SetupCenter.isInit)return;
		if(type==0 || type==1){
			if(type > 0){
				var level=App.role.allLevel;
				for(;oldLv <=level;oldLv++){
					this.parseAutoGuanzhu(App.dataMgr.q_boss_followContainer.getDataBean(oldLv,false));
				}
			}
			else{
				this.parseAutoGuanzhu(App.dataMgr.q_boss_followContainer.getDataBean(App.role.allLevel,false));
			}
		}
		if(type==0 || type==2){
			this.parseAutoGuanzhu(App.dataMgr.q_boss_followContainer.getDataBean(App.role.jingJieId *10000,false));
		}
		if(type==0 || type==3){
			var wear=WearEquipCenter.getEquipByPart(710);
			if(wear){
				this.parseAutoGuanzhu(App.dataMgr.q_boss_followContainer.getDataBean(20000+wear.rank,false));
			}
		}
		if(type==4){
			this.parseAutoGuanzhu(App.dataMgr.q_boss_followContainer.getDataBean(30000+oldLv,false));
		}
		else if(type==5){
			var funs=App.dataMgr.q_functionContainer.getList();
			var fun;
			for(var $each_fun in funs){
				fun=funs[$each_fun];
				this.parseAutoGuanzhu(App.dataMgr.q_boss_followContainer.getDataBean(30000+fun.q_function_id,false));
			}
		}
		else if(type==6){
			var beans=App.dataMgr.q_boss_followContainer.getList();
			var bean;
			for(var $each_bean in beans){
				bean=beans[$each_bean];
				this.parseAutoGuanzhu(bean);
			}
		}
		else if(type==7){
			this.parseAutoGuanzhu(App.dataMgr.q_boss_followContainer.getDataBean(10,false));
		}
	}

	__proto.parseAutoGuanzhu=function(follow){
		if(!follow || !follow.q_map_id)return;
		var ids;
		if(follow.q_remove_monsterid){
			ids=JSON.parse(follow.q_remove_monsterid);
			var id;
			for(var $each_id in ids){
				id=ids[$each_id];
				id+='';
				for(var key in this._bossGZDic){
					mapids=key.split('_');
					if(mapids[1]==id){
						this._bossGZDic[key]=0;
					}
				}
			}
		};
		var fBean,boss,map,param,mapids=JSON.parse(follow.q_map_id),zhuan=App.role.jingJieId;
		var mapid;
		for(var $each_mapid in mapids){
			mapid=mapids[$each_mapid];
			map=App.dataMgr.q_mapContainer.getDataBean(mapid,false);
			if(!map || !map.q_boss)continue ;
			if(map.q_client_type==10 || map.q_client_type==11 || map.q_client_type==12){
				ids=JSON.parse(map.q_boss);
				boss=App.dataMgr.q_monsterContainer.getDataBean(ids[0]["monster"],false);
				fBean=App.dataMgr.q_fightBossContainer.getDataBean(boss.q_fight_boss_id,false);
				if(!fBean || !boss)continue ;
				if(Boolean(fBean.q_boss_type_name !='1' ? HuaxingCenter.getDataById(fBean.q_show_item):ZuoQiCenter.getZuoqi(fBean.q_show_item))){
					this._bossGZDic[mapid+'_'+boss.q_id]=0;
					continue ;
				}
				if(!ConditionUtil.isMapCanEnter(map)){
					continue ;
				}
			}
			else{
				if(!ConditionUtil.isMapCanEnter(map)){
					continue ;
				}
				ids=JSON.parse(map.q_boss);
			}
			var $each_param;
			for($each_param in ids){
				param=ids[$each_param];
				if(!this._bossGZDic.hasOwnProperty(mapid+'_'+param["monster"])){
					this._bossGZDic[mapid+'_'+param["monster"]]=1;
				}
			}
		};
		var count=0;
		for(param in this._bossGZDic){
			if(param !="count" && this._bossGZDic[param] > 0){
				count++;
			}
		}
		this._bossGZDic["count"]=count;
		SetupCenter.saveClient("56",this._bossGZDic);
	}

	__proto.updateLianyuHJ=function(info,data){
		var bean=App.dataMgr.q_zone_boContainer.getDataBean(info.boId);
		if(!bean)return 0;
		var mapid=JSON.parse(App.dataMgr.q_zone_mapContainer.getDataBean(bean.q_zone_id).q_mapid)[0];
		if(bean.q_bo==1 || data.isFinish(bean.q_id-1)){
			var ids=JSON.parse(bean.q_info);
			for(var i=ids.length-1;i >-1;i--){
				if(info.killedMonsterIds.indexOf(ids[i])>=0){
					break ;
				}
			}
			if(i < ids.length-1){
				i++;
			}
			for(;i >-1;i--){
				if(!this._bossGZDic.hasOwnProperty(mapid+'_'+ids[i])){
					this._bossGZDic[mapid+'_'+ids[i]]=1;
				}
			};
			var count=0;
			for(var proName in this._bossGZDic){
				if(proName !="count" && this._bossGZDic[proName] > 0){
					count++;
				}
			}
			this._bossGZDic["count"]=count;
			SetupCenter.saveClient("56",this._bossGZDic);
		}
		return mapid;
	}

	/**通过地图ID和bossId拿到地图内指定BOSS的数据列表*/
	__proto.getBossListByMapIdAndBossId=function(mapid,bossid,sortRemainTime){
		(sortRemainTime===void 0)&& (sortRemainTime=false);
		var list=[];
		if(this._mapbossDic[mapid]){
			var boss;
			for(var $each_boss in this._mapbossDic[mapid][bossid]){
				boss=this._mapbossDic[mapid][bossid][$each_boss];
				list.push(boss);
			}
			if(sortRemainTime){
				list.sort(this.sortZoneFunc);
			}
		}
		return list;
	}

	/**获取最接近复活的怪和剩余活着的数量
	*return [同一地图同一ID是否有超过一只怪,剩余活着的数量,即将复活的怪]
	**/
	__proto.getTimeAndLifeNum=function(mapid,bossid){
		var list=this.getBossListByMapIdAndBossId(mapid,bossid,true);
		for(var i=list.length-1;i >-1;i--){
			if((list [i]).remainTime <=0){
				break ;
			}
		}
		return [list.length > 1,i+1,list[0]];
	}

	/**
	*获取激战boss表数据对应的怪物存活数量
	*/
	__proto.getFightLiveCount=function(mapid,fightid){
		var count=0;
		var fightBean=App.dataMgr.q_fightBossContainer.getDataBean(fightid);
		var monsterIds=JSON.parse(fightBean.q_monster_id);
		for (var i=0;i < monsterIds.length;i++){
			count+=this.getTimeAndLifeNum(mapid,monsterIds[i])[1];
		}
		return count;
	}

	__proto.showState=function(monsterBean,mapId){
		if(monsterBean==null)
			return 0;
		var time=0;
		var infos=com.logic.data.zone.boss.BossDataCenter.instance.getTimeAndLifeNum(mapId,monsterBean.q_id);
		if(infos==null)
			return 0;
		if(infos[1] > 0 || !infos[2]){
			time=0;
		}
		else{
			time=(infos [2]).remainTime-ServerTime.getServerTime();
		}
		return time;
	}

	/**使用地图ID获取地图内BOSS列表*/
	__proto.getBossListByMapId=function(mapId,sortRemainTime,needSort){
		(sortRemainTime===void 0)&& (sortRemainTime=true);
		(needSort===void 0)&& (needSort=true);
		var list=[];
		var bDic;
		for(var $each_bDic in this._mapbossDic[mapId]){
			bDic=this._mapbossDic[mapId][$each_bDic];
			var boss;
			for(var $each_boss in bDic){
				boss=bDic[$each_boss];
				list.push(boss);
			}
		}
		if(needSort && list.length > 1){
			if(sortRemainTime){
				list.sort(this.sortZoneFunc);
			}
			else{
				list.sort(BossDataCenter.sortBossFunc);
			}
		}
		return list;
	}

	/**
	*@param mapId
	*@param fightId
	*@param monsterId
	*@param isLife true返回存活或者最接近复活的BOSS
	*/
	__proto.getBossBy=function(mapId,fightId,monsterId,isLife){
		(isLife===void 0)&& (isLife=true);
		var min;
		var bDic;
		for(var $each_bDic in this._mapbossDic[mapId]){
			bDic=this._mapbossDic[mapId][$each_bDic];
			var boss;
			for(var $each_boss in bDic){
				boss=bDic[$each_boss];
				if(boss.fightId==fightId && boss.monsterModelId==monsterId){
					if(isLife && boss.remainTime > 0){
						if(!min || boss.remainTime < min.remainTime){
							min=boss;
						}
						continue ;
					}
					return boss;
				}
			}
		}
		return min;
	}

	/**
	*@param mapId
	*@param monsterId
	*@param isLife true返回存活或者最接近复活的BOSS
	*/
	__proto.getBossBy2=function(mapId,monsterId,isLife){
		(isLife===void 0)&& (isLife=true);
		var monster=App.dataMgr.q_monsterContainer.getDataBean(monsterId,false);
		if(monster){
			return this.getBossBy(mapId,monster.q_fight_boss_id,monsterId,isLife);
		}
		return null;
	}

	__proto.getBossByPos=function(mapId,fightId,monsterId,nodex,nodey){
		var bDic;
		for(var $each_bDic in this._mapbossDic[mapId]){
			bDic=this._mapbossDic[mapId][$each_bDic];
			var boss;
			for(var $each_boss in bDic){
				boss=bDic[$each_boss];
				if(boss.fightId==fightId && boss.monsterModelId==monsterId){
					if(boss.monsterX==nodex && boss.monsterY==nodey){
						return boss;
					}
				}
			}
		}
		return null;
	}

	/**
	*获取地图BOSS数量
	*@param mapIds 指定地图ID
	*@param fightIds 指定激战BOSSid
	*@param bossIds 指定怪物ID
	*@param isHas 是否有达到条件的就返回
	*@param isLife 是否只获取活着的怪
	*@return
	*/
	__proto.getMapsBossNum=function(mapIds,fightIds,bossIds,isHas,isLife){
		(isHas===void 0)&& (isHas=false);
		(isLife===void 0)&& (isLife=true);
		var dic1=fightIds ? {}:null;
		var id;
		for(var $each_id in fightIds){
			id=fightIds[$each_id];
			dic1[id]=true;
		};
		var dic2=bossIds ? {}:null;
		var $each_id;
		for($each_id in bossIds){
			id=bossIds[$each_id];
			dic2[id]=true;
		};
		var count=0,mDic;
		var $each_id;
		for($each_id in mapIds){
			id=mapIds[$each_id];
			var bDic;
			for(var $each_bDic in this._mapbossDic[id]){
				bDic=this._mapbossDic[id][$each_bDic];
				var boss;
				for(var $each_boss in bDic){
					boss=bDic[$each_boss];
					if(dic1 && !dic1[boss.fightId])continue ;
					if(dic2 && !dic2[boss.monsterModelId])continue ;
					if(isLife && boss.remainTime > 0)continue ;
					count++;
					if(isHas)return count;
				}
			}
		}
		return count;
	}

	__proto.sortZoneFunc=function(a,b){
		if(a.remainTime > b.remainTime)
			return 1;
		if(a.remainTime < b.remainTime)
			return-1;
		return BossDataCenter.sortBossFunc(a,b);
	}

	/**获取BOSS数据
	*@param fightId-激战bossId
	*@param monsterId-怪物ID
	**/
	__proto.getBossDataByBossId=function(fightId,monsterId){
		(monsterId===void 0)&& (monsterId=0);
		var vec=this._allBossDic[fightId];
		if(vec !=null && vec.length > 0){
			if(monsterId <=0){
				return vec[0];
			}
			else{
				var data;
				for(var $each_data in vec){
					data=vec[$each_data];
					if(data.monsterModelId==monsterId){
						return data;
					}
				}
			}
		}
		return null;
	}

	/**通过怪物ID和地图ID获取激战BOSS数据*/
	__proto.getMonsterByMapAndId=function(monsterId,mapid){
		if(this._mapbossDic[mapid]){
			var boss;
			for(var $each_boss in this._mapbossDic[mapid][monsterId]){
				boss=this._mapbossDic[mapid][monsterId][$each_boss];
				return boss;
			}
		}
		return null;
	}

	/**
	*[{'id':798,'num':1,'jb':''}]
	*@param id
	*@param dropid
	*@return
	*
	*/
	__proto.getShowItem=function(id,dropid){
		(dropid===void 0)&& (dropid=0);
		if(id > 0){
			var bossBean=App.dataMgr.q_monsterContainer.getDataBean(id,false);
			if(bossBean){
				dropid=myparseInt(bossBean.q_items);
			}
		}
		if(dropid > 0){
			var bean=App.dataMgr.q_monster_dropprob.getDataBean(dropid,false);
			if(bean && bean.q_zs_items){
				return JSON.parse(bean.q_zs_items);
			}
		}
		return [];
	}

	__proto.loadMonsterTilis=function(tiliList){
		for(var i=0;i < tiliList.length;i++){
			this._tiliTypeDic[tiliList[i].type]=tiliList[i];
		}
		KuafuBattleCenter.hasTili178=this.getTiliNum(178)> 0;
		KuafuBattleCenter.sendNotice();
		ZoneRedPoint.refreshCailiaoZoneRedPoint();
		App.redPoint.callLater(FeiShengCenter,FeiShengCenter.updateBossRed);
		JieriRedPoint.sendIconRed(4018);
		EventMgr.dispatch("FightBossEvent.TILI_CHANGE");
		BossDataCenter.updateTiliRed(168);
	}

	/**获取体力详细数据 */
	__proto.getMonsterTili=function(type){
		return this._tiliTypeDic[type];
	}

	/**获取体力值*/
	__proto.getTiliNum=function(type){
		var o=this._tiliTypeDic[type];
		if(o){
			return o.num;
		}
		return 0;
	}

	/**怪物体力改变 */
	__proto.changeMonsterTiliinfo=function(limit){
		var info;
		for(var $each_info in this._tiliTypeDic){
			info=this._tiliTypeDic[$each_info];
			if(info.type==limit.type){
				this._tiliTypeDic[limit.type]=limit;
				break ;
			}
		}
		ZoneRedPoint.refreshCailiaoZoneRedPoint();
		App.redPoint.callLater(FeiShengCenter,FeiShengCenter.updateBossRed);
		JieriRedPoint.sendIconRed(4018);
		KuaFuCenter.checkFxsmPoint();
		com.logic.data.zone.boss.BossDataCenter.checkAnzhishendianPoint();
		if(limit.type==178){
			KuafuBattleCenter.hasTili178=this.getTiliNum(178)> 0;
			KuafuBattleCenter.sendNotice();
			}else if(limit.type==179){
			KuafuBattleCenter.getYijiRedpoint(true);
		}
		EventMgr.dispatch("FightBossEvent.TILI_CHANGE");
		BossDataCenter.updateTiliRed(168);
		WanyaoCenter.updateWanyao();
	}

	/**
	*一般用于面板显示BOSS名称
	*@param q_id Q_monster表
	*@param isHtml 是否是需要带颜色的HTML格式
	*@return 「魂级」祖玛教主(一转)或 「魂级」祖玛教主(1000级)
	*
	*/
	__proto.getBossName=function(q_id,isHtml,isLevel,isTitle,flag){
		(isHtml===void 0)&& (isHtml=true);
		(isLevel===void 0)&& (isLevel=true);
		(isTitle===void 0)&& (isTitle=true);
		(flag===void 0)&& (flag="({0})");
		return this.getBossName1(q_id,isHtml,isLevel,isTitle,flag)[0];
	}

	/**
	*一般用于面板显示BOSS名称
	*@param q_id Q_monster表
	*@param isHtml 是否是需要带颜色的HTML格式
	*@params isTitle 前缀是否和名字合在一起
	*@return isTitle=true-[「魂级」祖玛教主(1000级),"#ffffff"]，isTitle=false-[祖玛教主(1000级),"#ffffff",「魂级」]
	*/
	__proto.getBossName1=function(q_id,isHtml,isLevel,isTitle,flag){
		(isHtml===void 0)&& (isHtml=true);
		(isLevel===void 0)&& (isLevel=true);
		(isTitle===void 0)&& (isTitle=true);
		(flag===void 0)&& (flag="({0})");
		var bean=this.monsterBeanDic[q_id];
		if(bean !=null){
			if(!EnumMonsterType.isBoss(bean.q_type)&& !EnumMonsterType.isMonster(bean.q_type,16)){
				return [bean.q_name,GameColor.getMonsterColor(bean.q_type)];
			}
			return this.getBossNamePrivate(this.getBossWorldRank(q_id),bean.q_name,isHtml,isLevel,isTitle,flag);
		}
		return ["",bean !=null ? GameColor.getMonsterColor(bean.q_type):"#FFD02A",''];
	}

	/**
	*一般用于场景显示BOSS名称
	*@param q_id Q_monster表
	*@param isHtml 是否是需要带颜色的HTML格式
	*@params isTitle 前缀是否和名字合在一起
	*@return isTitle=true-[「魂级」祖玛教主(1000级),"#ffffff"]，isTitle=false-[祖玛教主(1000级),"#ffffff",「魂级」]
	*/
	__proto.getBossName2=function(q_id,isHtml,isLevel,isTitle,flag){
		(isHtml===void 0)&& (isHtml=true);
		(isLevel===void 0)&& (isLevel=false);
		(isTitle===void 0)&& (isTitle=true);
		(flag===void 0)&& (flag="({0})");
		var bean=this.monsterBeanDic[q_id];
		if(bean !=null){
			if(!EnumMonsterType.isBoss(bean.q_type)&& !EnumMonsterType.isMonster(bean.q_type,16)){
				return [bean.q_name,GameColor.getMonsterColor(bean.q_type)];
			}
			return this.getBossNamePrivate(this.getBossWorldRank(q_id),bean.q_name,isHtml,isLevel,isTitle,flag);
		}
		return this.getBossName1(q_id,isHtml,isLevel,isTitle,flag);
	}

	__proto.getMonsterLv2=function(id){
		var rankId=this.getBossWorldRank(id);
		if(rankId==0){
			if(this.monsterBeanDic[id]){
				return (this.monsterBeanDic [id]).q_lvl;
			}
			else{
				return 0;
			}
		};
		var bean=App.dataMgr.q_monster_rankContainer.getDataBean(rankId,false);
		if(bean){
			return bean.q_boss_lv;
		}
		return 0;
	}

	__proto.getBossWorldRank=function(q_id,isWorldRank){
		(isWorldRank===void 0)&& (isWorldRank=true);
		var bean=this.monsterBeanDic[q_id];
		if(bean !=null){
			return bean.q_boss_title_type;
		}
		return 0;
	}

	__proto.getBossNamePrivate=function(rank,q_name,isHtml,isLevel,isTitle,flag){
		(isHtml===void 0)&& (isHtml=true);
		(isLevel===void 0)&& (isLevel=true);
		(isTitle===void 0)&& (isTitle=true);
		(flag===void 0)&& (flag="({0})");
		var arr=[];
		var bean=App.dataMgr.q_monster_rankContainer.getDataBean(rank,false);
		if(bean !=null){
			var color=GameColor.getColor(bean.q_default);
			var str=GameUtils.getContainCountryName(q_name);
			if(isTitle){
				str=bean.q_name+str;
			}
			if(isLevel){
				if(bean.q_show_daojing > 0){
					str=str+StringFormat.getSubstitute(flag,StringFormat.getChieseNum(bean.q_show_daojing % 1000)+"转");
				}
				else if(bean.q_boss_lv > 0){
					str=str+StringFormat.getSubstitute(flag,bean.q_boss_lv+"级");
				}
			}
			if(isHtml){
				arr.push(GameHTML.setColor(str,color));
			}
			else{
				arr.push(str);
			}
			arr.push(color);
			if(!isTitle){
				arr.push(bean.q_name);
			}
		}
		else{
			arr.push(GameUtils.getContainCountryName(q_name));
			arr.push(GameColor.getColor(0));
			arr.push('');
		}
		return arr;
	}

	/**根据玩家等级来获得怪物阶数名称(天级，地级)*/
	__proto.getMonsterRankName=function(){
		var str="";
		var level=App.role.allLevel;
		var list=App.dataMgr.q_monster_rankContainer.getList();
		for(var i=0;i < list.length;i++){
			if(level <=list[i].q_lv){
				str=list[i].q_name;
				break ;
			}
		}
		return str;
	}

	__proto.getLiveBossListByMapId1=function(mapId){
		var list=[],tempList;
		var bDic;
		for(var $each_bDic in this._mapbossDic[mapId]){
			bDic=this._mapbossDic[mapId][$each_bDic];
			tempList=[];
			var boss;
			for(var $each_boss in bDic){
				boss=bDic[$each_boss];
				if(boss.remainTime <=0){
					list.push(boss);
				}
			}
		}
		return list.length > 0;
	}

	/**
	*侧边栏是否忽略勾选，忽略的就认为是勾了，自动战斗就要去打
	*@param monsterModelId
	*/
	__proto.isIgnoreCheck=function(monsterModelId){
		var mRank=App.dataMgr.q_monster_rankContainer.getDataBean(com.logic.data.zone.boss.BossDataCenter.instance.getBossWorldRank(monsterModelId),false);
		if(mRank !=null && mRank.q_check_or_not==1){
			return true;
		}
		return false;
	}

	/**
	*获取活着的离的最近的BOSS
	*@param mapId
	*@param monsterId
	*@return
	*
	*/
	__proto.getLiveAndNearBoss=function(mapId,monsterId){
		var list=com.logic.data.zone.boss.BossDataCenter.instance.getBossListByMapIdAndBossId(mapId,monsterId);
		if(list && list.length > 0){
			var myX=App.role.nodex;
			var myY=App.role.nodey;
			var arr1=[];
			var arr2=[];
			var boss;
			var len=list.length;
			for(var j=0;j < len;j++){
				boss=list[j];
				if(boss.remainTime <=0){
					boss.sortValue=GameMathUtil.getDistance(myX,myY,boss.monsterX,boss.monsterY);
					if(boss.curHp==boss.allHp){
						arr1.push(boss);
					}
					else{
						arr2.push(boss);
					}
				}
			};
			var sortArr=arr1.length > 0 ? arr1 :arr2;
			sortArr.sort(SortTools.sortByFlash("sortValue",16));
			if(sortArr.length > 0){
				return sortArr[0];
			}
		}
		return null;
	}

	__getset(0,__proto,'mapbossDic',function(){return this._mapbossDic;});
	/**已关注数量*/
	__getset(0,__proto,'guanzhuNum',function(){
		return myparseInt(this._bossGZDic["count"]);
	});

	__getset(1,BossDataCenter,'instance',function(){
		if(!BossDataCenter._instance)
			BossDataCenter._instance=new BossDataCenter();
		return BossDataCenter._instance;
	});

	BossDataCenter.sortBossFunc=function(a,b){
		if(a.level > b.level)
			return 1;
		if(a.level < b.level)
			return-1;
		if(a.monsterModelId > b.monsterModelId)
			return 1;
		if(a.monsterModelId < b.monsterModelId)
			return-1;
		return 0;
	}

	BossDataCenter.updateTonglingRed=function(c_type){
		(c_type===void 0)&& (c_type=0);
		var red=false;
		var mapids,ids,beans=App.dataMgr.q_fightBossContainer.getListBy(c_type);
		var bean;
		for(var $each_bean in beans){
			bean=beans[$each_bean];
			ids=JSON.parse(bean.q_monster_id);
			mapids=JSON.parse(bean.q_refresh_maps);
			for(var i=0;i < mapids.length;i++){
				if(com.logic.data.zone.boss.BossDataCenter.instance.isGuanzhu(mapids[i],ids[i])&& com.logic.data.zone.boss.BossDataCenter.instance.getMapsBossNum([mapids[i]],[bean.q_id],[ids[i]],true)> 0){
					red=true;
					break ;
				}
			}
			if(red)break ;
		}
		if(c_type==8){
			BossDataCenter.zuojiJT_red=red;
		}
		BossDataCenter.onSend();
	}

	BossDataCenter.updateTiliRed=function(t_type){
		if(t_type==168 && FunctionManager.isFunctionOpen(312)){
			BossDataCenter.zuojiJT_red=com.logic.data.zone.boss.BossDataCenter.instance.getTiliNum(168)> 0;
			if(BossDataCenter.zuojiJT_red){
				BossDataCenter.updateTonglingRed(8);
				return;
			}
		}
		BossDataCenter.onSend();
	}

	BossDataCenter.onSend=function(delay){
		(delay===void 0)&& (delay=true);
		if(delay){
			App.timer.doTimeOnce(BossDataCenter,500,com.logic.data.zone.boss.BossDataCenter.onSend,[false]);
			return;
		}
		if(FunctionManager.isFunctionOpen(113)){
			BossDataCenter.wanfa_red=BossDataCenter.zuojiJT_red || WanyaoCenter.wanyaoRed || TaskModel.fengmo && TaskModel.fengmo.taskState==2
			|| (FunctionManager.isFunctionOpen(72)&& com.logic.data.zone.boss.BossDataCenter.instance.getTiliNum(134)> 0)
			|| (FunctionManager.isFunctionOpen(121)&& com.logic.data.zone.boss.BossDataCenter.instance.getTiliNum(176)> 0)
			|| BossDataCenter.anzhishendianPoint || ShangGuJinDiCenter.getPoint()|| JieriRedPoint.isRed(3000);
			if(!BossDataCenter.wanfa_red){
				var type;
				for(var $each_type in EnumActivityType.TYPES4){
					type=EnumActivityType.TYPES4[$each_type];
					if(JieriRedPoint.isRed(type)){
						BossDataCenter.wanfa_red=true;
						break ;
					}
				}
				BossDataCenter.wanfa_red=BossDataCenter.wanfa_red || (FunctionManager.isFunctionOpen(183)&& MoneyCenter.getMoney(EnumMoney.JINGJI)> 0);
			}
			EventMgr.dispatch(ActivityEvent.refreshRedPoint,1420,BossDataCenter.wanfa_red);
			EventMgr.dispatch(ActivityEvent.refreshRedPoint,1001,BossDataCenter.wanfa_red || LianyuCenter.isRed(200000));
		}
	}

	BossDataCenter.checkAnzhishendianPoint=function(){
		BossDataCenter.anzhishendianPoint=BossDataCenter.getAnZhiShenDianPoint();
		BossDataCenter.onSend();
	}

	BossDataCenter.getAnZhiShenDianPoint=function(){
		if(!FunctionManager.isFunctionOpen(318)){
			return false;
		}
		if(com.logic.data.zone.boss.BossDataCenter.instance.getTiliNum(177)==0)
			return false;
		var all=App.dataMgr.q_fightBossContainer.getListBy(26);
		for (var i=0;i < all.length;i++){
			var bean=all[i];
			var mapid=JSON.parse(bean.q_refresh_maps)[0];
			var monsterid=JSON.parse(bean.q_monster_id)[0];
			var state=com.logic.data.zone.boss.BossDataCenter.instance.showState(App.dataMgr.q_monsterContainer.getDataBean(monsterid),mapid);
			if(state <=0){
				return true;
			}
		}
		return false;
	}

	BossDataCenter.ENUM_STATE_1=1;
	BossDataCenter.ENUM_STATE_2=2;
	BossDataCenter.ENUM_STATE_3=3;
	BossDataCenter.manzuIsFree=false;
	BossDataCenter.worldLevel=0;
	BossDataCenter._instance=null;
	BossDataCenter.zuojiJT_red=false;
	BossDataCenter.wanfa_red=false;
	BossDataCenter.anzhishendianPoint=false;
	return BossDataCenter;
})()