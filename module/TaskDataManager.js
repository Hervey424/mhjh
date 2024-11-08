var TaskDataManager=(function(){
	function TaskDataManager(){
		this.isTaskOpen=false;
		this._vipIds=null;
		/**
		*用于记录 首充面板是否通过任务打开过
		*/
		this._firstChargeNote=false;
	}

	__class(TaskDataManager,'com.modules.track.TaskDataManager');
	var __proto=TaskDataManager.prototype;
	/**
	*根据任务数据 追踪目标角色
	*@param data
	*
	*/
	__proto.gotoTargetByTaskData=function(taskVo){
		if(GlobalCenter.gm_taskId > 0)
			return;
		if(GlobalControl.isploting || taskVo==null)
			return;
		var tcon=taskVo.getConditionData();
		if(!tcon)return;
		if(App.role.isJump)
			return;
		if(taskVo.taskType==1){
			TaskModel.setAutoTask(true,"TaskDataManager.gotoTargetByTaskData()");
			var taskBean=App.dataMgr.q_taskModelContainer.getDataBean(taskVo.taskID);
			if(taskVo.taskState==1){
				if(tcon.taskConditionType==4 && tcon.conditionObj){
					if(myparseInt(tcon.conditionObj.clienttype)==1){
						var zcon=TaskModel.getXuanshangCon(TaskModel.fengmo);
						if(zcon && zcon.conditionObj && zcon.conditionObj.hasOwnProperty("clienttuijianmap")&& JSON.parse(zcon.conditionObj["clienttuijianmap"]).indexOf(App.role.mapId)>=0){
							if(zcon.conditionObj.hasOwnProperty("clientmonster")){
								BossCommandSender.gotoAttackMonster(myparseInt(zcon.conditionObj.clientmonster));
								return;
								}else if(zcon.conditionObj.hasOwnProperty("mtype")){
								BossCommandSender.getMonsterXYByType(myparseInt(zcon.conditionObj.mtype));
								return;
							}
						}
					}
					else if(tcon.conditionObj.tasktype==3){
						if(taskVo.taskState < 2 && TaskModel.dailyTask){
							EventMgr.dispatch("TE.taskClick",TaskModel.dailyTask.getConditionData());
						}
						return;
					}
					else if(tcon.conditionObj.tasktype==27){
						if(JNTaskCenter.task){
							if(JNTaskCenter.task.taskState==1){
								var bean=App.dataMgr.q_taskArrestContainer.getDataBean(JNTaskCenter.task.taskID);
								if(bean && bean.q_finish_condition_ids){
									var param=JSON.parse(bean.q_finish_condition_ids)[0];
									GameUtils.setEnterInfo(param["clientMap"],param["clientmonster"],[param["clientMap"]]);
									return;
								}
							}
							App.mapModule.mapMoveModel.walkToNpc(293,false,false,"walk",taskVo.taskID);
						}
						return;
					}
				}
				if(tcon.panelStr && (tcon.taskConditionType !=8192 || tcon.mapId <=0)){
					this.checkOpenPanel(tcon);
				}
				else if(tcon.panelID > 0 && myparseInt(tcon.targetId)==0 && tcon.mapId==0){
					this.checkOpenPanel(tcon);
				}
				else{
					EventMgr.dispatch("TE.taskClick",tcon,true);
				}
			}
			else{
				EventMgr.dispatch("TE.taskClick",tcon,true);
			}
		}
		else if(taskVo.taskType==3 || taskVo.taskType==16 || taskVo.taskType==29){
			TaskModel.setAutoTask(false,"TaskDataManager.gotoTargetByTaskData()");
			TaskAuto.autoTaskData=taskVo;
			if(taskVo.taskType==16){
				var tranStr,conObj;
				var bossBean=App.dataMgr.q_task_xuanshangContainer.getDataBean(taskVo.taskID);
				if(bossBean){
					if(taskVo.taskState==0){
						com.modules.track.TaskDataManager.instance.transferByTaskData(taskVo,true);
					}
					else if(taskVo.taskState==2){
						TransferManager.transferToNPC(bossBean.q_task_accept_id);
					}
					else{
						if(bossBean.q_map_id > 0){
							if(App.role.mapId==bossBean.q_map_id){
								conObj=(ClassUtils.asTo(JSON.parse(bossBean.q_finish_condition_ids),Array))[0][0];
								EventMgr.dispatch("TE.gotoMonster",myparseInt(conObj.mrank));
							}
							else{
								TransferManager.toBossMap(12,bossBean.q_map_id);
							}
						}
						else{
							com.modules.track.TaskDataManager.instance.transferByTaskData(taskVo,true);
						}
					}
				}
      }
      // 历练任务
			else if(taskVo.taskType==29){
				var llbean=App.dataMgr.q_taskLilianConter.getDataBean(taskVo.taskID,false);
				if(GlobalControl.isInZone || !llbean){
					return;
				}
				if(taskVo.taskState==1){
					if(llbean.q_panel_param){
						PanelOpenManager.openPanelById(JSON.parse(llbean.q_panel_param)["panelid"]);
					}
          else if (llbean.q_lilian_type == 1 || llbean.q_lilian_type == 4 || llbean.q_lilian_type == 5) {
            // 一键完成
						if(llbean.q_lilian_type==4 && EnumSetup.isGou(41)&& EnumSetup.getValue(1014)>=EnumSetup.getValue(1012)){
							PanelManager.openPanel(PanelRegister.LILIAN);
						}
						else{
							App.mapModule.mapMoveModel.walkToNpc(llbean.q_task_npc,false,false,"walk",0,null,true,false);
						}
					}
					else if(!App.role.isGather){
						EventMgr.dispatch("TE.taskClick",tcon,true);
					}
				}
				else if(taskVo.taskState==2){
					App.mapModule.mapMoveModel.walkToNpc(llbean.q_task_npc,false,false,"walk",0,null,true,false);
				}
			}
			else{
				var rcBean=App.dataMgr.q_taskDailyContainer.getDataBean(taskVo.taskID);
				if(rcBean){
					if(taskVo.taskState==2 || taskVo.taskState==0){
						TransferManager.transferToNPC(rcBean.q_task_accept_id);
					}
					else{
						EventMgr.dispatch("TE.taskClick",tcon,true);
					}
				}
			}
		}
		else if(taskVo.taskType==64){
			var curTaskData=EscortCenter.getTask();
			if(curTaskData){
				var obj=curTaskData.otherVarMapObj;
				var arr;
				var yabiaoCfg=DataManager.getInstance().q_yabiao_taskContainer.getDataBean(curTaskData.taskID,false);
				if(yabiaoCfg && yabiaoCfg.q_task_map){
					arr=JSON.parse(yabiaoCfg.q_task_map);
				}
				if(arr && arr[0]==App.role.mapId){
					if(curTaskData.taskState==0){
					}
					else if(curTaskData.taskState==1){
						App.mapModule.mapMoveModel.walkToMap(arr[0],obj.posx,obj.posy,false,null,1,false,true,true,0,curTaskData.taskID);
						GlobalControl.isEscortOpen=true;
					}
					else if(curTaskData.taskState==2){
						if(App.role.mapId==250000){
							App.mapModule.mapMoveModel.walkToNpc(2087,false,false,"walk",taskVo.taskID);
						}
						else{
							App.mapModule.mapMoveModel.walkToNpc(2087,false,false,"walk",taskVo.taskID);
						}
					}
				}
				else{
					if(curTaskData.taskState==0){
						var str1=JSON.stringify({"npcid":2086});
						this.transfer(curTaskData,str1,1,true);
					}
					else if(curTaskData.taskState==1){
						TaskCommandSender.sendTransmint(null,15);
						GlobalControl.isEscortOpen=true;
					}
					else if(curTaskData.taskState==2){
						var str2=JSON.stringify({"npcid":2087});
						this.transfer(curTaskData,str2,1,true);
					}
				}
			}
		}
		else{
			EventMgr.dispatch("TE.taskClick",tcon,true);
		}
	}

	__proto.transferByTaskConditionData=function(taskConditionData){
		if(taskConditionData !=null){
			if(taskConditionData.mapId==App.role.mapId){
				EventMgr.dispatch("ET.character_move_to_position",taskConditionData.mapId,taskConditionData.nodex,taskConditionData.nodey,true,Handler.create(com.App,App.autoFightBoss));
				return true;
			}
		}
		return false;
	}

	/**
	*根据任务data传送方法
	*@param data
	*@param isClickTranfer-是否手动点击小云朵
	*/
	__proto.transferByTaskData=function(taskVo,isClickTranfer){
		(isClickTranfer===void 0)&& (isClickTranfer=false);
		if(GlobalCenter.gm_taskId > 0)
			return;
		var _taskConditionData=taskVo.getConditionData();
		if(App.role.isJump){
			return;
		};
		var str=JSON.stringify({"taskid":taskVo.taskID});
		if(taskVo.taskType < 8){
			if(taskVo.taskType==1){
				if(_taskConditionData && _taskConditionData.taskConditionType !=2){
					TaskModel.setAutoTask(true,"TaskDataManager.transferByTaskData()");
					if(_taskConditionData.panelStr !="" && _taskConditionData.panelStr !=null && taskVo.taskState==1){
						this.checkOpenPanel(_taskConditionData);
					}
					else{
						this.transfer(taskVo,str,2,isClickTranfer);
					}
				}
				else{
					TaskCommandSender.sendTransmitToServer(JSON.stringify({"npcid":_taskConditionData.targetId}),1,_taskConditionData.targetId);
				}
			}
			else if(taskVo.taskType==2){
				this.transfer(taskVo,str,2,isClickTranfer);
			}
			else if(taskVo.taskType==3){
				TaskAuto.autoTaskData=taskVo;
				if(taskVo.taskType==3){
					TaskModel.isForceHideGuide=true;
				}
				TaskModel.setAutoTask(false,"TaskDataManager.transferByTaskData()");
				if(taskVo.taskState==0 || taskVo.taskState==2){
					this.transfer(taskVo,JSON.stringify({"npcid":taskVo.taskAcceptID}),1,isClickTranfer);
				}
				else{
					this.transfer(taskVo,str,4,isClickTranfer);
				}
			}
		}
		else if(taskVo.taskType==16){
			TaskAuto.autoTaskData=taskVo;
			if(taskVo.taskState==0){
				this.transfer(taskVo,JSON.stringify({"npcid":taskVo.taskAcceptID}),1,isClickTranfer);
				}else{
				this.transfer(taskVo,str,11,isClickTranfer);
			}
		}
		else if(taskVo.taskType==18){
			this.transfer(taskVo,JSON.stringify({"npcid":_taskConditionData.targetId}),1,isClickTranfer);
		}
		else if(taskVo.taskType==64){
			var curTaskData=EscortCenter.getTask();
			if(curTaskData){
				if(curTaskData.taskState==0){
					this.transfer(curTaskData,JSON.stringify({"npcid":2086}),1,true);
				}
				else if(curTaskData.taskState==1){
					var arr;
					var yabiaoCfg=DataManager.getInstance().q_yabiao_taskContainer.getDataBean(curTaskData.taskID,false);
					if(yabiaoCfg && yabiaoCfg.q_task_map){
						arr=JSON.parse(yabiaoCfg.q_task_map);
					}
					if(arr && arr[0]==App.role.mapId){
						var obj=curTaskData.otherVarMapObj;
						App.mapModule.mapMoveModel.walkToMap(arr[0],obj.posx,obj.posy,false,null,1,false,true,true,0,curTaskData.taskID);
						GlobalControl.isEscortOpen=true;
					}
					else{
						TaskCommandSender.sendTransmint(null,15);
					}
				}
				else if(curTaskData.taskState==2){
					var npc=2087;
					if(App.role.mapId==250000){
						npc=2087;
					}
					this.transfer(curTaskData,JSON.stringify({"npcid":npc}),1,true);
				}
			}
		}
		else{
			this.transfer(taskVo,JSON.stringify({"npcid":_taskConditionData.targetId}),1,isClickTranfer);
		}
	}

	/**
	*是否满足进剧情副本
	*剧情任务副本通过zoneid传送特殊处理
	*@param data
	*@return
	*
	*/
	__proto.checkCanEnterZone=function(taskVo){
		if(!taskVo)
			return false;
		if(taskVo.taskType!=1)
			return false;
		var data=taskVo.getConditionData();
		if(data){
			if(data.taskConditionType==8192&&taskVo.taskState==1){
				ZoneCommandSender.enterZoneMap(data.zoneId);
				return true;
			}
		}
		return false;
	}

	/**
	*
	*@param data
	*@param str
	*@param taskType
	*
	*TaskCommandSender.sendTransmint（
	*@param id {"taskid":10000}{"npcid":10000}
	*@param type 传送类型（0，坐标点，1，npc，2，主线任务 3.激战boss 4.日常任务 7.帮会任务）
	*/
	__proto.transfer=function(taskVo,str,taskType,isClickTranfer){
		var data=taskVo.getConditionData();
		if(data){
			if(this.checkCanEnterZone(taskVo))
				return;
			EventMgr.dispatch("TE.taskTransfer",data,str,taskType,isClickTranfer);
		}
	}

	/**
	*自动做这个主线任务
	*@param taskVo
	*@param isMouseClick
	*@param from
	*
	*/
	__proto.autoMainTaskByData=function(taskVo,isMouseClick,from){
		(isMouseClick===void 0)&& (isMouseClick=true);
		if(GameConfig.isDebug && GameConfig.isDebugStopTask){
			return;
		}
		if(!taskVo || GlobalCenter.gm_taskId > 0 || TaskAuto.isPauseMain2 || TaskAuto.isPauseMain3 || GlobalControl.isploting || taskVo.stopAuto){
			return;
		};
		var index=this.vipIds.indexOf(taskVo.taskID);
		if(index !=-1){
			if(taskVo.taskState !=2){
				if(from && from.indexOf("TaskTrack")==-1){
					return;
				}
			}
		}
		if(taskVo.taskState==EnumTaskState.NO_LEVEL){
			return;
		}
		if(taskVo.taskState !=EnumTaskState.NO_RECEIVE){
			if(!TaskModel.isAutoTask || GameConfig.isSmrzOpen)
				return;
			if(!Browser.onPC && App.needGuide(9)){
				return;
			}
			if(App.needGuide(8,false)&& GlobalControl.isInZone){
				return;
			};
			var tcon=taskVo.getConditionData();
			if(tcon.taskConditionType==4 && tcon.conditionObj){
				if(tcon.conditionObj.tasktype==3){
					if(taskVo.taskState < 2 && TaskModel.dailyTask){
						EventMgr.dispatch("TE.taskClick",TaskModel.dailyTask.getConditionData());
					}
					return;
				}
				else if(tcon.conditionObj.tasktype==2){
					var brbean=App.dataMgr.q_taskBranchContainer.getDataBean(tcon.conditionObj.taskid,false);
					if(brbean && brbean.q_branch_type==17 && TaskModel.fengmo){
						var tcon_fm=TaskModel.getXuanshangCon(TaskModel.fengmo);
						if(tcon_fm){
							if(tcon_fm.conditionObj.hasOwnProperty("clienttuijianmap")&& JSON.parse(tcon_fm.conditionObj["clienttuijianmap"]).indexOf(App.role.mapId)>=0){
								if(tcon_fm.conditionObj.hasOwnProperty("clientmonster")){
									BossCommandSender.gotoAttackMonster(myparseInt(tcon_fm.conditionObj.clientmonster));
									return;
									}else if(tcon_fm.conditionObj.hasOwnProperty("mtype")){
									BossCommandSender.getMonsterXYByType(myparseInt(tcon_fm.conditionObj.mtype));
									return;
								}
							}
							App.openAutoFight();
							return;
						}
					}
				}
			}
			if(taskVo.taskState==2){
				if(tcon.conditionObj){
					if(tcon.conditionObj.clientmonster > 0 && App.role.mapId==tcon.mapId){
						EventMgr.dispatch("TE.taskClick",tcon,isMouseClick);
						return;
					}
					else if(tcon.conditionObj.trigger==1019){
						return;
					}
				}
				if(tcon.taskConditionType==8){
					EventMgr.dispatch("TE.taskClick",tcon,isMouseClick);
					return;
				}
			}
			if(taskVo.taskState==1){
				if((tcon.panelStr || tcon.panelID > 0)&& taskVo.isAutoType==1){
					if(tcon.isGoZone()){
						if(App.role.mapId !=tcon.mapId){
							this.checkOpenPanel(tcon);
						}
						else{
							App.openAutoFight();
							return;
						}
					}
					else{
						this.checkOpenPanel(tcon,true);
						return;
					}
				}
			}
			if(!TaskModel.isShowTransferPanel){
				if(myparseInt(tcon.targetId)!=0 || tcon.mapId !=0){
					EventMgr.dispatch("TE.taskClick",tcon,isMouseClick);
				}
			}
		}
	}

	/**
	*@param task
	*@param level 星级奖励 为0的话就不是星级奖励了 直接用
	*/
	__proto.getStarAwardsJason=function(task,level){
		(level===void 0)&& (level=0);
		var awards=task.q_task_rewards;
		if(level==0){
			return awards;
		};
		var rewardsList=awards.split(";");
		for (var i=0;i < rewardsList.length;i++){
			if(level==i+1){
				awards=rewardsList[i];
			}
		}
		return awards;
	}

	/**
	*检查是否可以打开面板打开面板
	*@param isAuto-是否自动任务
	*/
	__proto.checkOpenPanel=function(con,isAuto){
		(isAuto===void 0)&& (isAuto=false);
		if(con.panelStr){
			if(isAuto && PanelManager.isShowing(con.panelStr))
				return;
			if(con.panelStr==PanelRegister.GUILD && con.panelID==0){
				GuildCommandSender.sendGuildRecommendMessage();
				TaskModel.hideOrShowTaskGuide(false);
				return;
			}
		}
		TaskModel.hideOrShowTaskGuide(false);
		if(con.panelID==108){
			if(!this._firstChargeNote){
				this._firstChargeNote=true;
				PanelOpenManager.openShouchong();
			}
		}
		else{
			PanelOpenManager.openPanelById(con.panelID);
		}
	}

	__getset(0,__proto,'vipIds',function(){
		if(!this._vipIds){
			var b=App.dataMgr.q_globalContainer.getDataBean(428);
			if(b){
				this._vipIds=ClassUtils.asTo(JSON.parse(b.q_string_value),Array);
			}
			else{
				this._vipIds=[];
			}
		}
		return this._vipIds;
	});

	__getset(1,TaskDataManager,'instance',function(){
		if(TaskDataManager._instance==null){
			TaskDataManager._instance=new TaskDataManager();
		}
		return TaskDataManager._instance;
	});

	TaskDataManager._instance=null;
	return TaskDataManager;
})()