/**
*太古神域
*@author Jian
*创建时间：2024-12-26
*/
//class com.modules.boss.wanfa.TaiguShenyuView extends com.modules.boss.wanfa.WanfaView
var TaiguShenyuView=(function(_super){
	function TaiguShenyuView(){
		this._title2=null;
		this._uiEff=null;
		TaiguShenyuView.__super.call(this);
	}

	__class(TaiguShenyuView,'com.modules.boss.wanfa.TaiguShenyuView',_super);
	var __proto=TaiguShenyuView.prototype;
	__proto.init=function(){
		this.bg.size(886,526);
		this.btnWF2.removeSelf();
		this.btnWF3.removeSelf();
		this.btnWF1_bg.removeSelf();
		this.title.skin="mobile/boss/title8.png";
		this.init2(15185);
		this._uiEff=GameEffect.getEffect();
		this._uiEff.move(this.bg.width >> 1,this.bg.height >> 1,this.bg,0);
		this._title2=new Image();
		this._title2.move((this.bg.width-194 >> 1)+18,this.p_panel.y+8,this);
	}

	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._title2=null;
		this._uiEff=null;
		_super.prototype.destroy.call(this);
	}

	__proto.showMyInfo=function(value){
		if(value){
			this.bg.skin=ResPathUtil.getImageRes("bg2",".jpg","wanfa");
			this._title2.skin=ResPathUtil.getImageRes("sy_title",".png","wanfa");
			this._uiEff.url=ResPathUtil.getPanelEffect("taigushenyu","wanfa");
			this._uiEff.play();
		}
		else{
			this._title2.skin=null;
			this._uiEff.stopAndHide();
		}
	}

	return TaiguShenyuView;
})(WanfaView)

/**
*
*@author Jian
*创建时间：2024-1-15
*/
//class com.modules.boss.wanfa.WanfaView extends ui.mobile.boss.wanfa.WanfaViewUI
var WanfaView=(function(_super){
	function WanfaView(){
		this._datas=null;
		this._icons=null;
		WanfaView.__super.call(this);
		this.init();
	}

	__class(WanfaView,'com.modules.boss.wanfa.WanfaView',_super);
	var __proto=WanfaView.prototype;
	Laya.imps(__proto,{"com.game.core.panel.ITabView":true})
	__proto.init=function(){
		this.title.skin="mobile/boss/title3.png";
		this.init2(15153);
	}

	__proto.init2=function(gId){
		var datas=JSON.parse(App.dataMgr.q_globalContainer.getDataBean(gId).q_string_value)
		this.p_panel.vScrollBarAllwaysShow="off";
		this.p_panel.refresh();
		this._icons=[];
		this._datas=[];
		for(var i=0;i < datas.length;i++){
			this._datas.push(new WanfaIconData(datas[i]));
		}
	}

	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._datas=null;
		this._icons=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.showMyInfo=function(value){
		if(value){
			this.btnWF1_bg.skin=ResPathUtil.getImageRes("bg",".png","bigbutton");
			this.btnWF3.showRedPoint(TaskModel.fengmo && TaskModel.fengmo.taskState==2);
			this.btnWF2.showRedPoint(DailyCenter.actRedPoint || DailyCenter.taskRedPoint);
			this.bg.skin=ResPathUtil.getImageRes("bg",".jpg","wanfa");
			this.addEvent("FIGHTBOSSSTATUE",this.onUpdateBoss);
			this.addEvent("WulingdahuiCenter.WLDH_INFO",this.onWulingInfo);
			this.addEvent(ActivityEvent.REFRESH_JIANYAO,this.updateAct);
			this.addEvent(ActivityEvent.REFRESH_DETAIL,this.updateAct);
			this.btnWF1.on("click",this,this.onClick);
			this.btnWF2.on("click",this,this.onClick);
			this.btnWF3.on("click",this,this.onClick);
			WanyaoCenter.sendC2S_NpcInfoMessage();
			WulingdahuiCenter.sendWudaohuiInfoReq();
			this.updateAct(1);
		}
		else{
			this.btnWF1_bg.skin=null;
			App.timer.clearTimer(this,this.onTimer1);
			App.timer.clearTimer(this,this.onTimer2);
			this.btnWF1.off("click",this,this.onClick);
			this.btnWF2.off("click",this,this.onClick);
			this.btnWF3.off("click",this,this.onClick);
		}
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		this.addEvent(ActivityEvent.refreshRedPoint,this.onRedPoint);
		this.addEvent("TE.updateTaskTrack",this.updateTask);
		this.addEvent("FightBossEvent.TILI_CHANGE",this.update);
		var icon,idata,day=ServerTime.getOpenDays();
		for(var i=0,j=0;i < this._datas.length;i++){
			idata=this._datas[i];
			if(idata.dic.hasOwnProperty("openday")&& (day < idata.dic["openday"][0] || (idata.dic["openday"][1] > 0 && day > idata.dic["openday"][1]))){
				continue ;
			}
			if(j < this._icons.length){
				icon=this._icons[j];
			}
			else{
				icon=new WanfaIcon();
				icon.move(idata.x,idata.y,this.bg);
				this._icons.push(icon);
			}
			icon.data=idata;
			icon.bg.on("mouseover",this,this.onRoll);
			icon.bg.on("mouseout",this,this.onRoll);
			icon.on("click",this,this.onClick);
			icon.load();
			j++;
		}
		while(j < this._icons.length){
			this._icons.pop().destroy();
		}
		this.timerLoop(1000,this,this.onTimer);
		this.showMyInfo(true);
		this.onUpdateBoss();
	}

	__proto.hide=function(){
		this.bg.skin=null;
		this.showMyInfo(false);
		EventMgr.removeAll(this);
		this.clearTimer(this,this.onTimer);
		var icon;
		for(var $each_icon in this._icons){
			icon=this._icons[$each_icon];
			icon.bg.off("mouseover",this,this.onRoll);
			icon.bg.off("mouseout",this,this.onRoll);
			icon.off("click",this,this.onClick);
			icon.jiaobiao.skin=null;
			icon.bg.filters=null;
			icon.bg.skin=null;
		}
	}

	__proto.onClick=function(e){
		var panelId=0;
		switch(e.currentTarget){
			case this.btnWF1:
				PanelOpenManager.openBOSS(null,6);
				return;
			case this.btnWF2:
				panelId=1060000;
				break ;
			case this.btnWF3:
				panelId=311;
				break ;
			default :;
				var icon=e.currentTarget;
				if(!icon || !FunctionManager.isFunctionOpen(icon.data.funid,true)){
					return;
				}
				if(icon.data.dic.hasOwnProperty("npcid")){
					TransferManager.transferToNPC(icon.data.dic["npcid"]);
					PanelManager.removePanel(PanelRegister.BOSS);
					return;
				}
				panelId=myparseInt(icon.data.dic["panelid"]);
				break ;
			}
		PanelOpenManager.openPanelById(panelId,PanelRegister.BOSS);
	}

	__proto.updateTask=function(task){
		if(task && task.taskType !=3){
			return;
		}
		this.update(2);
	}

	__proto.update=function(wfid){
		(wfid===void 0)&& (wfid=0);
		var icon;
		for(var $each_icon in this._icons){
			icon=this._icons[$each_icon];
			if(wfid > 0){
				if(icon.data.wfid==wfid){
					icon.update();
					break ;
				}
			}
			else{
				icon.update();
			}
		}
	}

	__proto.onRedPoint=function(iconId,value){
		(value===void 0)&& (value=false);
		if(iconId==1001){
			var icon;
			for(var $each_icon in this._icons){
				icon=this._icons[$each_icon];
				if(icon.data.tilis || icon.data.wfid==9 || icon.data.wfid==11 || icon.data.wfid==12){
					icon.update();
				}
			}
			this.btnWF2.showRedPoint(DailyCenter.actRedPoint || DailyCenter.taskRedPoint);
			this.btnWF3.showRedPoint(TaskModel.fengmo && TaskModel.fengmo.taskState==2);
		}
	}

	__proto.updateAct=function(type){
		if(type==1){
			var act,run,yu,sTime=ServerTime.getServerTime();
			var beans=App.dataMgr.q_activitiesContainer.getListByType(1);
			var bean;
			for(var $each_bean in beans){
				bean=beans[$each_bean];
				if(bean.q_tanchuang==0 || bean.q_function_type==0){
					continue ;
				}
				act=ActivityCenter.getData(bean.q_id);
				if(!act)continue ;
				if(act.activityStates==1){
					run=act;
				}
				else if(act.activityStates==0 && sTime < act.openTime){
					if(!yu || act.openTime < yu.openTime){
						yu=act;
					}
				}
			}
			this.btnWF1_bg.visible=Boolean(yu || run);
			if(this.btnWF1_bg.visible){
				act=run ? run :yu;
				this.btnWF1.skin=ResPathUtil.getImageResByUrl("image/bigbutton/"+act.id+"_icon"+".png");
				this.wf_txt2.text=DateUtils.formatByTime(act.openTime,false)+"-"+DateUtils.formatByTime(act.finishTime,false);
				this.wf_txt3.color=run ? "#00ff00" :"#ef0605";
				this.wf_txt3.text=run ? "进行中" :"未开启";
				this.wf_txt2.color=this.wf_txt3.color;
				this.wf_txt1.text=act.bean.q_name;
			}
		}
	}

	__proto.onRoll=function(e){
		if(e.type=="mouseover"){
			e.currentTarget.filters=FilterUtil.LIGHT_FILTER_ARRAY;
		}
		else if(e.type=="mouseout"){
			e.currentTarget.filters=null;
		}
	}

	__proto.onTimer=function(){
		var icon;
		for(var $each_icon in this._icons){
			icon=this._icons[$each_icon];
			icon.onTimer();
		}
	}

	__proto.onWulingInfo=function(cmd){
		var time=cmd.recoverTime;
		if(time > 0){
			App.timer.serverTimeEnd(this,this.onTimer1,time);
		}
	}

	__proto.onTimer1=function(data){
		var icon;
		for(var $each_icon in this._icons){
			icon=this._icons[$each_icon];
			icon.onWulingdahuiTimer(data.spuleTime);
		}
	}

	__proto.onUpdateBoss=function(){
		if(FunctionManager.isFunctionOpen(259)){
			var bossDatas=KuafuBattleCenter.getBossDatas();
			if(KuafuBattleCenter.hasTili178 && bossDatas.length > 0 && KuafuBattleCenter.getDeadBossNum(bossDatas)==bossDatas.length){
				bossDatas.sort(KuafuBattleCenter.sortByTime);
				var data=bossDatas[0];
				App.timer.serverTimeEnd(this,this.onTimer2,data.remainTime);
			}
		}
	}

	__proto.onTimer2=function(data){
		var icon;
		for(var $each_icon in this._icons){
			icon=this._icons[$each_icon];
			icon.onKuafuBossTimer(data.spuleTime);
		}
	}

	return WanfaView;
})(WanfaViewUI)