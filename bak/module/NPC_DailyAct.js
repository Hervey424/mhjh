var NPC_DailyAct=(function(_super){
	function NPC_DailyAct(){
		this._grids=null;
		this._energy_type=0;
		this._fun_type=0;
		this._time=0;
		NPC_DailyAct.__super.call(this);
		this._grids=new ShowItemListBigGrid(4,this,30,390);
	}

	__class(NPC_DailyAct,'com.modules.npc.view.NPC_DailyAct',_super);
	var __proto=NPC_DailyAct.prototype;
	Laya.imps(__proto,{"com.modules.npc.view.INPC_Panel":true})
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._grids=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=0);
		this._fun_type=0;
		this._energy_type=tab;
		var arr=null;
		if(tab==16){
			this._fun_type=8;
		}
		else if(tab==12){
			this._fun_type=1;
		}
		else if(tab==63){
			this._fun_type=23;
		}
		if(this._fun_type > 0){
			arr=App.dataMgr.q_activitiesContainer.getListByFunType(this._fun_type);
			if(arr && arr.length > 0){
				this._grids.showJson(arr[0].q_show_rewards);
			}
		}
		else{
			switch(tab){
				case 27:
					this._fun_type=10;
					break ;
				case 14:
					this._fun_type=2;
					this.addEvent("PAODIAN_UPDATE",this.onPaodian);
					break ;
				}
			if(this._fun_type > 0){
				arr=App.dataMgr.q_activitiesContainer.getListByFunType(this._fun_type);
				if(arr && arr.length > 0){
					this._grids.showJsonById(arr[0].q_show_rewards);
				}
			}
		}
		this.btn.on("click",this,this.onClick);
		this.addEvent(ActivityEvent.REFRESH_JIANYAO,this.update);
		this.addEvent(ActivityEvent.REFRESH_DETAIL,this.update);
		this.update(1);
	}

	__proto.hide=function(){
		EventMgr.removeAll(this);
		this.clearTimer(this,this.onTimer);
		this.btn.off("click",this,this.onClick);
	}

	__proto.update=function(type){
		if(type !=1){
			return;
		};
		var beans=App.dataMgr.q_activitiesContainer.getListByFunType(this._fun_type);
		var act,temp,f_time=0;
		for(var i=0;i < beans.length;i++){
			temp=ActivityCenter.getData(beans[i].q_id);
			if(!temp)continue ;
			if(temp.activityStates==1){
				act=temp;
				break ;
			}
			else if(temp.activityStates >-1 && temp.finishTime > ServerTime.getServerTime()&& (f_time==0 || temp.finishTime < f_time)){
				act=temp;
				f_time=act.finishTime;
			}
		}
		if(this._energy_type==16){
			this.btn.label="前往沙巴克";
		}
		else{
			this.btn.label="参与活动";
		}
		if(act){
			this._time=act.openTime-ServerTime.getServerTime();
			if(this._time > 0){
				this.btn.disabled=true;
				this.timerLoop(1000,this,this.onTimer);
			}
			else{
				this._time=0;
			}
		}
		else{
			this._time=-1;
		}
		this.onTimer();
	}

	__proto.onClick=function(e){
		switch(this._energy_type){
			case 12:
			case 14:
			case 63:
				if(ActivitiesCommandSender.joinByFuncType(this._fun_type)){
					PanelManager.removePanel(PanelRegister.NPC_PANEL);
				}
				break ;
			case 27:
				if(ZoneCenter.dtdbZoneMapId > 0){
					ZoneCommandSender.zoneInto(ZoneCenter.dtdbZoneMapId);
				}
				break ;
			case 16:
				CastleWarCommandSender.askCountrySiegeSelect();
				break ;
			}
	}

	__proto.onPaodian=function(cmd){
		if(cmd.type==1){
			this.update(1);
		}
	}

	__proto.onTimer=function(){
		if(this._time > 0){
			this._time--;
			if(this._time < 300){
				this.timeTxt.text=DateUtils.convertTime(this._time,':',false)+" 后开启";
				this.timeTxt.color="#00ff00";
			}
			else{
				this.timeTxt.text="活动未开启";
				this.timeTxt.color="#ef0605";
			}
		}
		else{
			this.btn.disabled=this._time < 0;
			this.timeTxt.text=this.btn.disabled ? "活动未开启" :"活动已开启";
			this.timeTxt.color=this.btn.disabled ? "#ef0605" :"#00ff00";
			this.clearTimer(this,this.onTimer);
		}
	}

	__proto.getNpcType=function(){
		return [this._energy_type];
	}

	return NPC_DailyAct;
})(NPC_DailyActUI)