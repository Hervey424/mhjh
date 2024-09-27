var EscortAcceptItem=(function(_super){
	function EscortAcceptItem(){
		this._data=null;
		this._tgTime=0;
		this._tgGuide=null;
		this._rewards=null;
		this._cost_txt=null;
		EscortAcceptItem.__super.call(this);
		this._rewards=new ShowItemList(true,true,10,this,0,275,false,"grid_62_1",EnumImageType.ITEM_56);
		this._cost_txt=new ItemCostLabel(18);
		this._cost_txt.move(0,380,this);
		TipMgr.addTip(this.imgHelp,new TipData("TEXT","消耗充值钻石接取"));
	}

	__class(EscortAcceptItem,'com.modules.escort.EscortAcceptItem',_super);
	var __proto=EscortAcceptItem.prototype;
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		TipMgr.removeTip(this.imgHelp);
		this._data=null;
		this._rewards=null;
		this._cost_txt=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.show=function(){
		this.addEvent("MoneyEvent.CHANGE",this.onMoneyChange);
		this.btn.on("click",this,this.onClick);
	}

	__proto.hide=function(){
		this.closeTGGuide();
		EventMgr.removeAll(this);
		this.btn.off("click",this,this.onClick);
	}

	__proto.setData=function(data){
		this._data=data;
		this.update();
	}

	__proto.update=function(){
		if(this._data==null)
			return;
		if(this._data.isDouble){
			this._rewards.showOrderGridByJson(this._data.bean.q_success_doublerewards,10,2,5,true);
		}
		else{
			this._rewards.showOrderGridByJson(this._data.bean.q_success_rewards,10,2,5,true);
		}
		this._rewards.center();
		this._cost_txt.showJson(this._data.bean.q_jiequ,null,0,true,0,0,false,"消耗：","#e7c162");
		this._cost_txt.x=this.width-this._cost_txt.width >> 1;
		this.imgHelp.visible=this._cost_txt.itemId==EnumMoney.YUAN_BAO;
		this.times_txt.htmlText="剩余次数："+GameHTML.setColor(this._data.remainCount+"/"+this._data.maxCount,this._data.remainCount > 0 ? GameHTML.GREEN :GameHTML.RED);
	}

	__proto.tuoguan=function(){
		if(this._data==null)
			return;
		if(this._data.taskID==TuoguanCenter.biaocheTaskId){
			var act=ActivityUtil.isOpenByFunType(19);
			if(act && TuoguanCenter.isTuoguan(act.id)){
				var ed=EscortCenter.getCurrentDoingData();
				if(!ed){
					if(!this._tgGuide){
						this._tgGuide=Guide.getGuide();
					}
					this._tgTime=4;
					this._tgGuide.show2("",3);
					this._tgGuide.guideTo(this.btn);
					this.timerLoop(1000,this,this.onTuoguan);
					this.onTuoguan();
				}
			}
		}
	}

	__proto.onTuoguan=function(){
		this._tgTime--;
		if(this._tgTime <=0){
			this.onClick();
		}
		else{
			this._tgGuide.txt.text=this._tgTime+"s后托管接取";
		}
	}

	__proto.closeTGGuide=function(){
		if(this._tgGuide){
			this._tgGuide.hide();
			this._tgGuide=null;
			this.clearTimer(this,this.onTuoguan);
		}
	}

	__proto.onMoneyChange=function(id){
		if(id==this._cost_txt.itemId){
			this._cost_txt.update();
			this.btn.showRedPoint(this._cost_txt.itemEnough && this._data.remainCount > 0);
		}
	}

	__proto.onClick=function(e){
		this.closeTGGuide();
		if(this._data==null)
			return;
		if(this._data.isDouble){
			this.onOK();
		}
		else{
			Alert.show("当前不在双倍押镖活动期间，是否接取？\n双倍押镖时间：11:00-11:59,16:00-16:59,21:00-21:59",GameHandler.create(this,this.onOK));
		}
	}

	__proto.onOK=function(){
		if(this._cost_txt.itemEnough){
			TaskCommandSender.sendAccpetTask(this._data.taskID,this._data.taskType);
			PanelManager.removePanel(PanelRegister.ESCORT_ACCEPT);
		}
		else{
			if(this._cost_txt.itemId==EnumMoney.YUAN_BAO || this._cost_txt.itemId==EnumMoney.BIND_YUAN_BAO){
				Alert.show("充值钻石不足,是否前往充值",GameHandler.create(PanelOpenManager,PanelOpenManager.openPanelById,[1070000]));
			}
			else{
				GameNotice.showMousePosMessage(ItemUtil.getItemName(this._cost_txt.itemId)+"不足");
			}
		}
	}

	return EscortAcceptItem;
})(EscortAcceptItemUI)


//class com.modules.escort.EscortTraceView extends ui.mobile.escort.EscortTraceViewUI
var EscortTraceView=(function(_super){
	function EscortTraceView(){
		this._endTime=0;
		this._isHide=false;
		this._maxHp=0;
		this._vo=null;
		this._rewards=null;
		this._yes=false;
		EscortTraceView.__super.call(this);
		this._rewards=new ShowItemList(true,true,0,this.mainBox,30,65,false,"grid_62_1",EnumImageType.ITEM_56);
	}

	__class(EscortTraceView,'com.modules.escort.EscortTraceView',_super);
	var __proto=EscortTraceView.prototype;
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._vo=null;
		this._rewards=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.show=function(){
		App.stageLayer.mainLayer.addChild(this);
		this.addEvent("ET.character_update_position",this.onRolePos);
		this.addEvent("TE.taskTrackShowOrHide",this.onTaskShowOrHide);
		this.hideBtn.on("click",this,this.onClick);
		this.btn_find.on("click",this,this.onClick);
		this.btn_auto.on("click",this,this.onClick);
		this.btn_help.on("click",this,this.onClick);
		this.showView();
	}

	__proto.hide=function(){
		GlobalControl.isEscortOpen=false;
		EventMgr.removeAll(this);
		this.hideBtn.off("click",this,this.onClick);
		this.btn_auto.off("click",this,this.onClick);
		this.btn_find.off("click",this,this.onClick);
		this.btn_help.off("click",this,this.onClick);
		this.remove();
		Laya.workerTimer.clear(this,this.onTime);
	}

	__proto.showView=function(){
		var vo=EscortCenter.getData();
		if(!vo||!vo.taskData){
			this.hide();
			return;
		}
		this._vo=vo;
		this.name_txt.text=vo.monsterBean.q_name;
		this.name_txt.color=ItemUtil.getItemNameColor(vo.bean.q_quality);
		if(vo.isDouble){
			this._rewards.showOrderGridByJson(vo.bean.q_success_doublerewards,4,0,4,true);
		}
		else{
			this._rewards.showOrderGridByJson(vo.bean.q_success_rewards,4,0,4,true);
		}
		this._rewards.center();
		GlobalControl.isEscortOpen=true;
		this.showInfo();
	}

	__proto.showInfo=function(){
		if(this._vo==null)
			return;
		if(GlobalControl.isEscortOpen){
			this._vo.followCar();
		}
		this._endTime=this._vo.time-ServerTime.getServerTime();
		this._endTime=Math.max(0,this._endTime);
		if(this._endTime > 0){
			Laya.workerTimer.loop(1000,this,this.onTime);
		}
		this.onTime();
		if(this._vo.monsterid){
			var monsterData=App.mapModule.mapAvatarModel.getMonster(this._vo.monsterid);
			if(monsterData){
				var distanceGrid=Math.abs(this._vo.x-App.role.nodex)+Math.abs(this._vo.y-App.role.nodey);
				this._yes=distanceGrid <=this._vo.range;
				(monsterData.roleView).showYabiaoEffect(this._yes);
			}
		}
	}

	__proto.onRolePos=function(px,py,gx,gy){
		(px===void 0)&& (px=0);
		(py===void 0)&& (py=0);
		(gx===void 0)&& (gx=0);
		(gy===void 0)&& (gy=0);
		if(this._vo && this._vo.monsterid && this._vo.mapId==App.role.mapId){
			var monsterData=App.mapModule.mapAvatarModel.getMonster(this._vo.monsterid);
			if(monsterData){
				var distanceGrid=Math.abs(this._vo.x-App.role.nodex)+Math.abs(this._vo.y-App.role.nodey);
				var yes=distanceGrid <=this._vo.range;
				if(this._yes !=yes){
					this._yes=yes;
					(monsterData.roleView).showYabiaoEffect(yes);
				}
			}
		}
	}

	__proto.onClick=function(e){
		switch(e.currentTarget){
			case this.hideBtn:{
					this._isHide=!this._isHide;
					this.mainBox.visible=!this._isHide;
					if(Browser.onPC){
						this.hideBtn.scaleX=this.mainBox.visible ?-1 :1;
					}
					else{
						this.hideBtn.scaleX=this.mainBox.visible ? 1 :-1;
					}
					break ;
				}
			case this.btn_auto:
			case this.btn_find:{
					if(this._vo.taskState==2){
						var npcId=0;
						if(this._vo.taskID==640004 || this._vo.taskID==640005 || this._vo.taskID==640006){
							npcId=2087;
						}
						else{
							npcId=2087
						}
						App.mapModule.mapMoveModel.walkToNpc(npcId);
					}
					else{
						this._vo.findCar();
					}
					break ;
				}
			case this.btn_help:{
					if(!GuildCenter.hasGuild()){
						GameNotice.showMousePosMessage("未加入行会");
						return;
					};
					var mapName=GameUtils.getMapName(App.role.mapId);
					var pos=MapVO.getNodeByPixelXY(App.role.map_x,App.role.map_y);
					var content="运镖遇到危险，兄弟们快来支援！坐标："+'[<a style="text-decoration: underline;" href="event:'+EnumChatRegType.SHOWMYPOSITION_EVENTID+'">'+mapName+"("+pos.x+","+pos.y+")"+"</a>]";
					ChatCenter.sendChat(7,null,null,false,content,"EscortTraceView");
					break ;
				}
			}
	}

	__proto.onHideBox=function(type){
		this._isHide=type==0;
		this.mainBox.visible=!this._isHide;
	}

	__proto.onTime=function(){
		this.time_txt.text=StringFormat.formatToTime_V11(this._endTime);
		this._endTime--;
		if(this._endTime < 0){
			Laya.workerTimer.clear(this,this.onTime);
		}
	}

	__proto.resize=function(ty){
		this.y=ty;
		if(Browser.onPC){
			this.hideBtn.x=this.width-15;
			this.hideBtn.scaleX=this.mainBox.visible ?-1 :1;
			}else{
			this.hideBtn.x=15
			this.hideBtn.scaleX=this.mainBox.visible ? 1 :-1;
		}
		if(Browser.onPC){
			this.x=Laya.stage.width-this.width-GameConfig.LiuHai_Right;
		}
		else{
			this.x=GameConfig.LiuHai;
		}
	}

	__proto.onTaskShowOrHide=function(index){
		this.onHideBox(index);
	}

	return EscortTraceView;
})(EscortTraceViewUI)