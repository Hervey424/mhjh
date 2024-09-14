var KuafuBattleCenter=(function(_super){
	function KuafuBattleCenter(){
		KuafuBattleCenter.__super.call(this);
	}

	__class(KuafuBattleCenter,'com.modules.kuafuBattle.KuafuBattleCenter',_super);
	var __proto=KuafuBattleCenter.prototype;
	__proto.init=function(){
		GameServer.register(S2C_FrenzyZoneInfoListMessage,GameHandler.create(this,this.onS2C_FrenzyZoneInfoListMessage));
	}

	__proto.onS2C_FrenzyZoneInfoListMessage=function(cmd){
		com.modules.kuafuBattle.KuafuBattleCenter.battle_type=cmd.combineProcess;
		com.modules.kuafuBattle.KuafuBattleCenter.battleInfos=cmd.zoneInfos;
		EventMgr.dispatch("KuangbaoBattleCenter.KB_BATTLE_INFO");
	}

	KuafuBattleCenter.setKuafuBossShow=function(monter,bean){
		if(App.role.mapBean.q_boss_list==16){
			var isBoss=EnumMonsterType.isBoss(bean.q_type)|| EnumMonsterType.isBazhuBoss(bean.q_type);
			if(isBoss){
				if(App.mainProxy.kuafuBattleSide){
					App.mainProxy.kuafuBattleSide.show(monter);
					App.mainProxy.openEscortPanel();
					TrackPanel.getInstance().visible=false;
				}
			}
		}
	}

	KuafuBattleCenter.setKuafuBossHide=function(monter){
		if(App.role.mapBean.q_boss_list==16){
			var isBoss=EnumMonsterType.isBoss(monter.monsterModelBean.q_type)|| EnumMonsterType.isBazhuBoss(monter.monsterModelBean.q_type);
			if(isBoss){
				if(App.mainProxy.kuafuBattleSide){
					App.mainProxy.kuafuBattleSide.hide();
					App.mainProxy.openEscortPanel();
					TrackPanel.getInstance().visible=true;
					if(!Browser.onPC && App.mainProxy.roleInfo){
						App.mainProxy.roleInfo.y=TrackPanel.getInstance().y+180;
					}
				}
			}
		}
	}

	KuafuBattleCenter.getBossIds=function(){
		if(!KuafuBattleCenter._bossIds){
			KuafuBattleCenter._bossIds=JSON.parse(App.dataMgr.q_globalContainer.getDataBean(21007,false).q_string_value);
		}
		return KuafuBattleCenter._bossIds;
	}

	KuafuBattleCenter.getBossOtherIds=function(){
		if(!KuafuBattleCenter._bossOtherIds){
			KuafuBattleCenter._bossOtherIds=JSON.parse(App.dataMgr.q_globalContainer.getDataBean(21009,false).q_string_value);
		}
		return KuafuBattleCenter._bossOtherIds;
	}

	KuafuBattleCenter.getBossDatas=function(){
		var datas=[];
		var bossId=App.dataMgr.q_globalContainer.getDataBean(21007,false).q_int_value;
		var bossIds=KuafuBattleCenter.getBossIds();
		var tempArr=[];
		tempArr=tempArr.concat(bossIds,bossId);
		var list;
		for(var i=0;i < tempArr.length;i++){
			list=BossDataCenter.instance.getBossListByMapIdAndBossId(300011,tempArr[i]);
			if(list.length > 0){
				datas.push(list[0]);
			}
		}
		return datas;
	}

	KuafuBattleCenter.getDeadBossNum=function(datas){
		var deadNum=0;
		var data;
		for(var i=0;i < datas.length;i++){
			data=datas[i];
			if(data.remainTime > 0){
				deadNum++;
			}
		}
		return deadNum;
	}

	KuafuBattleCenter.sortByTime=function(a,b){
		if(a.remainTime > b.remainTime){
			return 1;
		}
		else if(a.remainTime < b.remainTime){
			return-1;
		}
		return 0;
	}

	KuafuBattleCenter.getAttrValue=function(attrArr,key){
		var value=0;
		var obj;
		for(var i=0;i < attrArr.length;i++){
			obj=attrArr[i];
			if(obj.name==key){
				value=obj.value;
				break ;
			}
		}
		return value;
	}

	KuafuBattleCenter.getYijiRedpoint=function(isBoss,isWear){
		(isWear===void 0)&& (isWear=false);
		if(!FunctionManager.isFunctionOpen(290)){
			return;
		};
		var bool=false;
		if(BossDataCenter.instance.getTiliNum(179)> 0){
			var bean,beans=App.dataMgr.q_fightBossContainer.getListBy(31);
			var i=0,mapid=0,mapBean;
			if(isWear){
				KuafuBattleCenter._newBeans=[];
				KuafuBattleCenter._enterArr=[];
				for(i=0;i < beans.length;i++){
					bean=beans[i];
					mapid=JSON.parse(bean.q_refresh_maps)[0];
					mapBean=App.dataMgr.q_mapContainer.getDataBean(mapid);
					if(MapUtil.checkMapShowCondition(mapid)){
						KuafuBattleCenter._newBeans.push(bean);
						if(ConditionUtil.isMapCanEnter(mapBean)){
							KuafuBattleCenter._enterArr.push(i);
						}
					}
				}
				if(KuafuBattleCenter._enterArr.length > 3){
					KuafuBattleCenter._enterArr=KuafuBattleCenter._enterArr.slice(KuafuBattleCenter._enterArr.length-3);
				}
			}
			if(!KuafuBattleCenter._enterArr)return;
			var isGou=false,mapids,bossIds;
			for(i=0;i < KuafuBattleCenter._newBeans.length;i++){
				bean=KuafuBattleCenter._newBeans[i];
				mapids=JSON.parse(bean.q_refresh_maps);
				bossIds=JSON.parse(bean.q_monster_id);
				isGou=KuafuBattleCenter._enterArr.indexOf(i)!=-1 && BossDataCenter.instance.guanzhuState(mapids[0],bossIds[0])!=0;
				if(!isBoss){
					for(var j=0;j < bossIds.length;j++){
						BossDataCenter.instance.setGuanzhu(mapids[j],bossIds[j],isGou);
					}
				}
				if(isGou){
					bool=BossDataCenter.instance.getMapsBossNum(mapids,null,bossIds,true)> 0;
					if(bool)break ;
				}
			}
		}
		if(KuafuBattleCenter.yijiRedpoint !=bool){
			KuafuBattleCenter.yijiRedpoint=bool;
			KuafuBattleCenter.sendNotice();
		}
	}

	KuafuBattleCenter.sendNotice=function(){
		EventMgr.dispatch("KuangbaoBattleCenter.KB_BATTLE_REDPOINT");
	}

	KuafuBattleCenter.PANEL_BATTLE=0;
	KuafuBattleCenter.PANEL_YIJI=1;
	KuafuBattleCenter.PANEL_SHENYU=2;
	KuafuBattleCenter.KB_BATTLE_REDPOINT="KuangbaoBattleCenter.KB_BATTLE_REDPOINT";
	KuafuBattleCenter.KB_BATTLE_INFO="KuangbaoBattleCenter.KB_BATTLE_INFO";
	KuafuBattleCenter.battle_type=0;
	KuafuBattleCenter.battleInfos=null;
	KuafuBattleCenter.yijiRedpoint=false;
	KuafuBattleCenter._bossIds=null;
	KuafuBattleCenter._bossOtherIds=null;
	KuafuBattleCenter._enterArr=null;
	KuafuBattleCenter._newBeans=null;
	KuafuBattleCenter.hasTili178=false;
	return KuafuBattleCenter;
})(GameServer)
