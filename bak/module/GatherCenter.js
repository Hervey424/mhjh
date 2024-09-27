/**
*采集
*@author 胡剑
*创建时间：2023-11-21 下午8:48:44
*
*/
//class com.logic.data.GatherCenter
var GatherCenter=(function(){
	function GatherCenter(){}
	__class(GatherCenter,'com.logic.data.GatherCenter');
	GatherCenter.getWajueCount=function(npcId){
		return myparseInt(GatherCenter._wajueCountDict[npcId]);
	}

	GatherCenter.setWajueCount=function(npcId,count){
		GatherCenter._wajueCountDict[npcId]=count;
	}

	GatherCenter.destroyBar=function(){
		if(GatherCenter._gather){
			GatherCenter._gather.destroy();
			GatherCenter._gather=null;
		}
	}

	GatherCenter.clear=function(){
		com.logic.data.GatherCenter.waJueType=0;
		com.logic.data.GatherCenter.wajueId=null;
		App.role.setGatherState(false);
		if(GatherCenter._gather !=null){
			GatherCenter._gather.hide();
			Laya.timer.once(60000,GatherCenter,com.logic.data.GatherCenter.destroyBar);
		}
	}

	GatherCenter.stop=function(cmd){
		var role;
		if(cmd.personId.toString()==App.role.personId){
			role=ClassUtils.asTo(App.role,MapFightRoleData);
			if(GatherCenter._gather !=null){
				GatherCenter._gather.hide();
				Laya.timer.once(60000,GatherCenter,com.logic.data.GatherCenter.destroyBar);
			}
			if(GlobalControl.isAutoFight){
				App.mapModule.autoFightRobot.setDropBoxState(false);
			}
			if(cmd.isfinish==1){
				var wajueCount=GatherCenter.getWajueCount(com.logic.data.GatherCenter.wajueId);
				wajueCount++;
				GatherCenter.setWajueCount(com.logic.data.GatherCenter.wajueId,wajueCount);
				if(com.logic.data.GatherCenter.wajueId){
					var npc=App.mapModule.mapAvatarModel.getNpc(com.logic.data.GatherCenter.wajueId);
					if(npc){
						if(npc.npcModelBean.q_energy_type==42){
							App.timer.doTimeOnce(App,1000,App.openAutoFight);
						}
						else{
							var dropprob;
							if(npc.npcModelId==82){
								if(SetupCenter.instance.autoWajue){
									if(SetupCenter.instance.wajueCount > wajueCount){
										if(WajueUtil.wajue(npc)){
											return;
										}
									}
								}
							}
							else if(npc.npcModelId==182){
								var waJueType=com.logic.data.GatherCenter.waJueType==1 ? npc.dropId :npc.dropId2;
								dropprob=App.dataMgr.q_monster_dropprob.getDataBean(waJueType,false);
								if(dropprob && dropprob.q_open_cost){
									var obj=JSON.parse(dropprob.q_open_cost)[0];
									if(!ConditionUtil.isItemEnoughObject(obj)&& !ConditionUtil.isItemEnough(EnumMoney.BIND_YUAN_BAO,obj["rate"])){
										Alert.show("您的"+EnumMoney.getName(EnumMoney.BIND_YUAN_BAO)+"不足，是否前往充值",GameHandler.create(PlatformCenter,PlatformCenter.gotoPay));
									}
									else{
										TaskCommandSender.sendC2S_NpcServicesMessage(npc.personId);
										return;
									}
								}
							}
						}
					}
				}
			}
			com.logic.data.GatherCenter.wajueId=null;
		}
		else{
			role=App.mapModule.mapAvatarModel.getFightRoleData(cmd.personId.toString());
		}
		if(role){
			role.setGatherState(false);
		}
	}

	GatherCenter.start=function(cmd){
		if(!cmd.personId)return;
		var id=cmd.tatget.toString();
		var personId=cmd.personId.toString();
		var role,npc=App.mapModule.mapAvatarModel.getNpc(id);
		if(App.role && personId==App.role.personId){
			com.logic.data.GatherCenter.wajueId=id;
			role=ClassUtils.asTo(App.role,MapFightRoleData);
			if(npc){
				if(GatherCenter._gather==null){
					GatherCenter._gather=new GatherProgressBar();
					}else{
					Laya.timer.clear(GatherCenter,com.logic.data.GatherCenter.destroyBar);
				}
				GatherCenter._gather.show(npc.npcModelId,cmd.costtime);
				if(GlobalControl.isAutoFight){
					App.mapModule.autoFightRobot.setDropBoxState(true);
				}
			}
		}
		else{
			role=App.mapModule.mapAvatarModel.getFightRoleData(personId);
		}
		if(role && npc && npc.npcModelBean){
			role.dir=SceneType.getDretion(role.nodex,role.nodey,npc.nodex,npc.nodey);
			role.setGatherState(true,npc.npcModelBean.q_stronghold==1 ? 0 :1);
		}
	}

	GatherCenter._gather=null;
	GatherCenter._wajueCountDict={};
	GatherCenter.waJueType=0;
	GatherCenter.wajueId=null;
	return GatherCenter;
})()