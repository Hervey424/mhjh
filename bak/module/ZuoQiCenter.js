//class com.modules.zuoqi.ZuoQiCenter
var ZuoQiCenter=(function(){
	function ZuoQiCenter(){}
	__class(ZuoQiCenter,'com.modules.zuoqi.ZuoQiCenter');
	/**是否处在骑乘中*/
	__getset(1,ZuoQiCenter,'isRiding',function(){return ZuoQiCenter._isRiding;},function(value){
		ZuoQiCenter._isRiding=value;
		if(!Browser.onPC && App.mainPanel){
			App.mainPanel.rideBtn.skin=value ? "mobile/main_mobi/btn_riding.png" :"mobile/main_mobi/btn_ride.png";
		}
	});

	/**列表*/
	__getset(1,ZuoQiCenter,'zuoqiDic',function(){return ZuoQiCenter._dic;});
	/**坐骑总等级*/
	__getset(1,ZuoQiCenter,'allLevel',function(){return ZuoQiCenter._allLevel;});
	ZuoQiCenter.getZuoqi=function(id){return ZuoQiCenter._dic[id];}
	ZuoQiCenter.setZuoqi=function(info){
		ZuoQiCenter._dic[info.faqiId]=info;
	}

	ZuoQiCenter.updateAllLevel=function(){
		ZuoQiCenter._allLevel=0;
		var info;
		for(var $each_info in ZuoQiCenter._dic){
			info=ZuoQiCenter._dic[$each_info];
			ZuoQiCenter._allLevel+=info.lv;
		}
	}

	ZuoQiCenter.getDrop=function(itemId){return ZuoQiCenter._dropDic ? ZuoQiCenter._dropDic[itemId] :null;}
	ZuoQiCenter.updateDropInfo=function(list){
		ZuoQiCenter._dropDic={};
		var info;
		for(var $each_info in list){
			info=list[$each_info];
			ZuoQiCenter._dropDic[info.itemModelId]=info;
		}
		EventMgr.dispatch("AdvanceEvent.DROP_UPDATE");
	}

	ZuoQiCenter.sendShowOrHide=function(bool,notice){
		(notice===void 0)&& (notice=false);
		if(com.modules.zuoqi.ZuoQiCenter.isRiding==bool){
			return;
		}
		if(bool){
			var role=App.role;
			if(!role || role.isWearFaqi)return;
			if(role.isDead){
				if(notice){
					GameNotice.showMousePosMessage("重生状态无法骑乘");
				}
				return;
			}
			if(role.isInFightState){
				if(notice){
					GameNotice.showMousePosMessage("战斗状态无法骑乘");
				}
				return;
			}
			if(ZuoQiCenter.wearId==0){
				if(notice){
					GameNotice.showMousePosMessage("您还没有激活坐骑");
				}
				return;
			};
			var map=App.dataMgr.q_mapContainer.getDataBean(role.mapId);
			if(map && map.q_ride_faqi==1){
				if(notice){
					GameNotice.showMousePosMessage("当前地图禁止骑乘");
				}
				return;
			}
		}
		com.modules.zuoqi.ZuoQiCenter.isRiding=bool;
		HorseCommandSender.sendC2S_FaqiHideAndShowMessage(bool ? 0 :1);
	}

	ZuoQiCenter.updateZuoqiRed=function(items){
		if(!FunctionManager.isFunctionOpen(50))
			return;
		ZuoQiCenter.zuoqiRed=false;
		var mounts=App.dataMgr.q_mountContainer.mounts;
		var lvBean,param;
		var bean;
		for(var $each_bean in mounts){
			bean=mounts[$each_bean];
			if(!com.modules.zuoqi.ZuoQiCenter.getZuoqi(bean.q_id)&& ConditionUtil.isConditionEnoughJson(bean.q_open_demand)&& bean.q_open_cost){
				param=JSON.parse(bean.q_open_cost)[0];
				if(BagItemCenter.getItemCount(param.id)>=param.num){
					ZuoQiCenter.zuoqiRed=true;
					if(items && items.indexOf(param["id"])!=-1){
						if(!PanelManager.isShowing(PanelRegister.ZUO_QI)){
							PanelManager.openByClass(CanActivePanel,bean,4060000);
						}
						break ;
					}
				}
			}
		}
		if(!ZuoQiCenter.zuoqiRed){
			var zuoqi;
			var $each_bean;
			for($each_bean in mounts){
				bean=mounts[$each_bean];
				zuoqi=ZuoQiCenter.getZuoqi(bean.q_id);
				if(!zuoqi)continue ;
				lvBean=App.dataMgr.q_mountLvContainer.getDataBean(zuoqi.faqiId+zuoqi.lv,false);
				if(!lvBean || (lvBean.q_next_id==0 && zuoqi.star >=lvBean.q_max_layer)|| !ConditionUtil.isConditionEnoughJson(lvBean.q_level_demand)){
					continue ;
				}
				if(lvBean.q_levelup_consume){
					param=JSON.parse(lvBean.q_levelup_consume)[0];
					var have=BagItemCenter.getItemCount(param.id);
					if(have >=param.num){
						ZuoQiCenter.zuoqiRed=true;
						if(Browser.onPC && have >=param.num *3){
							App.openStrong(4060000,true);
						}
						break ;
					}
				}
			}
		}
		ZuoQiCenter.sendNotice();
	}

	ZuoQiCenter.updateFeijianRed=function(){
		if(!FunctionManager.isFunctionOpen(236)){
			return;
		}
		ZuoQiCenter.feijianRed=false;
		var beans=App.dataMgr.q_mountContainer.feijians;
		var zuoqi,lvBean,param;
		var bean;
		for(var $each_bean in beans){
			bean=beans[$each_bean];
			zuoqi=com.modules.zuoqi.ZuoQiCenter.getZuoqi(bean.q_id);
			if(zuoqi){
				lvBean=App.dataMgr.q_mountLvContainer.getDataBean(zuoqi.faqiId+zuoqi.lv,false);
				if(!lvBean || (lvBean.q_next_id==0 && zuoqi.star >=lvBean.q_max_layer)|| !ConditionUtil.isConditionEnoughJson(lvBean.q_level_demand)){
					continue ;
				}
				if(ConditionUtil.isItemEnoughJson(lvBean.q_levelup_consume)){
					ZuoQiCenter.feijianRed=true;
					break ;
				}
			}
			else if(ConditionUtil.isConditionEnoughJson(bean.q_open_demand)&& bean.q_open_cost){
				if(ConditionUtil.isItemEnoughJson(bean.q_open_cost)){
					ZuoQiCenter.feijianRed=true;
					break ;
				}
			}
		}
		ZuoQiCenter.sendNotice();
	}

	ZuoQiCenter.updateZuoqiSkillRed=function(){
		if(!FunctionManager.isFunctionOpen(50))
			return;
		ZuoQiCenter.zuoqiSkillRed=false;
		var pids,mounts=App.dataMgr.q_mountContainer.mounts;
		var bean;
		for(var $each_bean in mounts){
			bean=mounts[$each_bean];
			if(com.modules.zuoqi.ZuoQiCenter.getZuoqi(bean.q_id)&& bean.q_passive){
				pids=JSON.parse(bean.q_passive);
				var pid;
				for(var $each_pid in pids){
					pid=pids[$each_pid];
					if(SkillCenter.isPassSkillCanUpById(pid)){
						ZuoQiCenter.zuoqiSkillRed=true;
						break ;
					}
				}
				if(ZuoQiCenter.zuoqiSkillRed)break ;
			}
		}
		ZuoQiCenter.sendNotice();
	}

	ZuoQiCenter.sendNotice=function(){
		if(FunctionManager.isFunctionOpen(50)){
			var red=ZuoQiCenter.zuoqiRed || ZuoQiCenter.zuoqiSkillRed || AdvanceCenter.reddic[1] || ZuoQiCenter.feijianRed;
			EventMgr.dispatch("ET.FUNCTION_TIP",50,red || LingShouCenter.getPoint()|| ZuJiCenter.getPoint());
			App.openStrong(4060000,red);
		}
	}

	ZuoQiCenter.DROP_UPDATE="AdvanceEvent.DROP_UPDATE";
	ZuoQiCenter.ZUOQI_UPDATE="ZuoQiCenter.ZUOQI_UPDATE";
	ZuoQiCenter.ZUOQI_LIST="ZuoQiCenter.ZUOQI_LIST";
	ZuoQiCenter.wearId=0;
	ZuoQiCenter.ID_50000=50000;
	ZuoQiCenter._isRiding=false;
	ZuoQiCenter._dic={};
	ZuoQiCenter._allLevel=0;
	ZuoQiCenter._dropDic=null;
	ZuoQiCenter.isZuoQiEquipRedPoint=false;
	ZuoQiCenter.zuoqiSkillRed=false;
	ZuoQiCenter.zuoqiRed=false;
	ZuoQiCenter.feijianRed=false;
	return ZuoQiCenter;
})()