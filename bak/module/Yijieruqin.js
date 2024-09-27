
/**
*次元裂缝
*@author Jian
*创建时间：2024-2-28
*/
//class com.modules.dailyActivity.CiyuanZoneInfo extends com.modules.dungeon.BaseZone
var CiyuanZoneInfo=(function(_super){
	function CiyuanZoneInfo(){
		this._view=null;
		this._timeNum=null;
		this._has_boss=false;
		this._isBoss=false;
		this._isAct=false;
		this._end_notice=0;
		this._last_time=0;
		this._gap_time=0;
		this._c_time=0;
		this._e_time=0;
		CiyuanZoneInfo.__super.call(this);
	}

	__class(CiyuanZoneInfo,'com.modules.dailyActivity.CiyuanZoneInfo',_super);
	var __proto=CiyuanZoneInfo.prototype;
	__proto.init=function(){
		this._view=new CiyuanZoneInfoUI();
		this.setSwitch(this._view.btnHide,this._view.bg,this._view.titleBox);
		this.btnExit=this._view.btnExit;
		this.addChild(this._view);
		TipMgr.addTip(this._view.tipBox,new TipData("TEXT",TipDescUtil.getTextTipDesc(720)));
		this._timeNum=NumberBitmap.show("45");
		this._view.warning.addChild(this._timeNum);
		this._view.warning.y=160;
	}

	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		TipMgr.removeTip(this._view.tipBox);
		this._timeNum=null;
		this._view=null;
		_super.prototype.destroy.call(this);
	}

	__proto.enter=function(){
		this.showExit(true);
		Laya.workerTimer.loop(1000,this,this.showCountDown);
		this.addEvent("FIGHTBOSSSTATUE",this.updateBoss);
		this.addEvent(ActivityEvent.REFRESH_DETAIL,this.updateAct);
		ActivityCenter.sendDetailInfos(1);
		BossCommandSender.sendC2S_AliveWildBossMessage([App.role.mapId]);
		this._view.warning.skin=ResPathUtil.getImageRes("warning",".png","dailyAct");
		this._view.title.text=App.role.mapBean.q_map_name;
		this._view.btnGo.on("click",this,this.onClickBtn);
		this._gap_time=myparseInt(ZoneCenter.getZoneBean().q_note);
		this._gap_time=this._gap_time > 0 ? this._gap_time :600;
		this._end_notice=0;
		this._isBoss=false;
		this._isAct=false;
	}

	__proto.exit=function(){
		this._leftTime=0;
		this._last_time=0;
		this._leftTotalTime=0;
		this._view.warning.skin=null;
		this._view.warning.removeSelf();
		this._view.btnGo.off("click",this,this.onClickBtn);
		Laya.workerTimer.clear(this,this.showCountDown);
		EventMgr.removeAll(this);
		this.showExit(false);
		this.removeSelf();
	}

	__proto.updateAct=function(type){
		if(this._isAct || type !=1){
			return;
		};
		var act,temp,beans=App.dataMgr.q_activitiesContainer.getListByType(1);
		var bean;
		for(var $each_bean in beans){
			bean=beans[$each_bean];
			if(bean.q_function_type==23){
				temp=ActivityCenter.getData(bean.q_id);
				if(temp && temp.activityStates==1){
					act=temp;
					break ;
				}
			}
		}
		if(act){
			this._isAct=true;
			this._leftTotalTime=act.finishTime-ServerTime.getServerTime();
			this._last_time=act.finishTime-this._gap_time;
			this._e_time=act.finishTime;
			this._c_time=act.openTime;
			this.showCountDown();
		}
	}

	__proto.updateBoss=function(){
		this._isBoss=true;
		this._has_boss=false;
		var datas=BossDataCenter.instance.getBossListByMapId(App.role.mapId,false);
		var num1=0,num2=0,bean,target;
		var boss;
		for(var $each_boss in datas){
			boss=datas[$each_boss];
			if(boss.remainTime > 0)continue ;
			bean=App.dataMgr.q_monsterContainer.getDataBean(boss.monsterModelId);
			if(EnumMonsterType.isMonster(bean.q_type,16)){
				num1++;
			}
			else if(EnumMonsterType.isMonster(bean.q_type,8)){
				num2++;
			}
			if(!target){
				target=boss;
			}
		}
		this._has_boss=num1+num2 > 0;
		this._view.bossTxt.text="剩余异界主宰数量："+GameHTML.setColor(num1,num1 > 0 ? "#00ff00" :"#ef0605")+"<br/>"
		+GameHTML.setColor("剩余异界入侵者数量：","#cdcdcb")+GameHTML.setColor(num2,num2 > 0 ? "#00ff00" :"#ef0605");
		if(this._has_boss){
			this._view.warning.removeSelf();
			this._view.btnGo.disabledString();
			this._view.btnGo.tag=target.monsterModelId;
			this._view.btnGo.labelColors=FontColor.LINK_BUTTON2;
			this._view.btnGo.showFlowEffect("viptask",0,0,"main");
		}
		else{
			target=datas[0];
			this._view.btnGo.tag=0;
			this._view.btnGo.hideFlowEffect();
			this._view.btnGo.labelColors=FontColor.LINK_BUTTON1;
		}
		if(target){
			this._view.btnGo.label=target.bean.q_name;
		}
	}

	__proto.onClickBtn=function(e){
		if(e.currentTarget==this._view.btnGo){
			BossCommandSender.gotoAttackMonster(this._view.btnGo.tag);
		}
		else{
			_super.prototype.onClickBtn.call(this,e);
		}
	}

	__proto.showCountDown=function(){
		if(!this._isAct || !this._isBoss || this._c_time==0 || this._e_time==0){
			return;
		}
		if(this._leftTotalTime > 0){
			if(!this._has_boss && this._c_time==this._e_time){
				this._view.timeTxt.text="提示："+GameHTML.setColor("最后一波怪已全部击杀","#00ff00");
				if(this._end_notice % 2==0){
					GameNotice.showXYCenterMessage(GameHTML.setColor("最后一波怪已全部击杀","#ffff00"));
				}
				this._end_notice++;
			}
			else{
				this._view.timeTxt.text="剩余活动时间："+GameHTML.setColor(DateUtils.convertTime(this._leftTotalTime--),"#00ff00");
			}
		}
		if(this._leftTime > 0){
			this._leftTime--;
			if(this._isAct && this._isBoss && (!this._has_boss || this._leftTime < 60)&& this._c_time <=this._last_time){
				if(!this._view.warning.parent){
					App.stageLayer.storyLayer.addChild(this._view.warning);
				}
				this._timeNum.show(this._leftTime+'');
				this._timeNum.x=-this._timeNum.width;
				this._view.warning.x=GameConfig.stageWidth-this._view.warning.width+this._timeNum.width >> 1;
			}
		}
		else{
			var time=ServerTime.getServerTime();
			while(this._c_time < time){
				if(this._e_time-this._c_time >=this._gap_time){
					this._c_time+=this._gap_time;
				}
				else{
					this._c_time+=(this._e_time-this._c_time);
					if(this._e_time==this._c_time){
						break ;
					}
				}
			}
			this._leftTime=this._c_time-time;
			this._view.warning.removeSelf();
			if(this._leftTime > 0){
				this._leftTotalTime++;
				this.showCountDown();
			}
		}
	}

	__proto.resize=function(e){
		_super.prototype.resize.call(this);
		if(this._view.warning.parent){
			this._view.warning.x=GameConfig.stageWidth-this._view.warning.width+this._timeNum.width >> 1;
		}
	}

	return CiyuanZoneInfo;
})(BaseZone)