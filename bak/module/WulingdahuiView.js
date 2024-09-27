/**
*比武大会
*@author mcc
*2024-3-1
*/
//class com.modules.wulingdahui.view.WulingdahuiView extends ui.mobile.wulingdahui.view.WulingdahuiViewUI
var WulingdahuiView=(function(_super){
	function WulingdahuiView(){
		this._remineTime=0;
		this._num=0;
		WulingdahuiView.__super.call(this);
		TipMgr.addTip(this.helpBox,new TipData("TEXT",App.dataMgr.q_tipContainer.getDataBean(392).q_tipDesc));
	}

	__class(WulingdahuiView,'com.modules.wulingdahui.view.WulingdahuiView',_super);
	var __proto=WulingdahuiView.prototype;
	Laya.imps(__proto,{"com.game.core.panel.ITabView":true})
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		TipMgr.removeTip(this.helpBox);
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		this.btn.on("click",this,this.onClick);
		this.btnAdd.on("click",this,this.onClick);
		this.btnRank.on("click",this,this.onClick);
		this.checkBox.on("change",this,this.onSelcet);
		this.addEvent("WulingdahuiCenter.WLDH_INFO",this.onWulingInfo);
		this.addEvent(ActivityEvent.REFRESH_DETAIL,this.onRefresh);
		this.addEvent("MoneyEvent.CHANGE",this.onMoney);
		ActivityCenter.sendDetailInfosByTypes([EnumActivityType.TYPE_10000,EnumActivityType.TYPE_10001]);
		WulingdahuiCenter.sendWudaohuiInfoReq();
		this.costBox.visible=FunctionManager.isFunctionOpen(184);
		this.checkBox.selected=WulingdahuiCenter.doubleCost;
		this.timeBox.x=this.costBox.visible ? 231 :354;
		this.onMoney(EnumMoney.JINGJI);
	}

	__proto.hide=function(){
		this.icon.url=null;
		this.descImg.url=null;
		this.descImg1.url=null;
		this.descImg2.url=null;
		this.btn.off("click",this,this.onClick);
		this.btnAdd.off("click",this,this.onClick);
		this.btnRank.off("click",this,this.onClick);
		this.checkBox.off("change",this,this.onSelcet);
		EventMgr.removeAll(this);
		App.timer.clearTimer(this._this,this.onTimer);
		App.timer.clearTimer(this._this,this.onTimer1);
		for(var i=0;i<5;i++){
			this["star"+i].url=null;
		}
		this.btn.showRedPoint(false);
		this.remove();
	}

	__proto.onClick=function(e){
		switch(e.currentTarget){
			case this.btn:
				if(!GlobalControl.isInZone){
					if(this._num > 0){
						PanelManager.openByClass(WulingdahuiPipeiPanel,this.levelTxt.text);
					}
					else{
						GameNotice.showMousePosMessage("挑战次数不足");
					}
				}
				else{
					GameNotice.showMousePosMessage("副本中，请稍后再操作");
				}
				break ;
			case this.btnAdd:
				PanelOpenManager.openBuyPanel(17072);
				break ;
			case this.btnRank:
				PanelManager.openPanel(PanelRegister.WLDH_RANK);
				break ;
			}
	}

	__proto.onSelcet=function(e){
		WulingdahuiCenter.doubleCost=this.checkBox.selected;
	}

	__proto.onMoney=function(type,value){
		(value===void 0)&& (value=0);
		if(type==EnumMoney.JINGJI){
			this._num=MoneyCenter.getMoney(type);
			this.numTxt.text="剩余挑战次数："+this._num+"/"+Q_globalCenter.getBean(10589).q_int_value;
			this.btn.showRedPoint(this._num > 0,120);
		}
	}

	__proto.onWulingInfo=function(cmd){
		this.stateimg.visible=cmd.winStreak > 1;
		var jifen=cmd.score;
		var bean;
		var list=App.dataMgr.q_jingjiLvContainer.getList();
		for(var i=0;i < list.length;i++){
			if(i < list.length-1){
				if(jifen >=list[i].q_exp_all && jifen < list[i+1].q_exp_all){
					bean=list[i];
					break ;
				}
			}
			else{
				bean=list[i];
			}
		};
		var showStar=jifen-bean.q_exp_all;
		var posArr=[];
		if(bean.q_exp==3){
			posArr=[[468,133],[524,120],[582,133]];
			}else if(bean.q_exp==4){
			posArr=[[439,146],[492,119],[556,119],[607,146]];
			}else if(bean.q_exp==5){
			posArr=[[426,161],[468,133],[524,120],[582,133],[624,165]];
		}
		for(i=0;i < 5;i++){
			if(i >=posArr.length){
				this["star"+i].url=null;
			}
			else{
				this["star"+i].x=posArr[i][0];
				this["star"+i].y=posArr[i][1];
				this["star"+i].url=i <=showStar-1 ? ResPathUtil.getImageRes("star0",".png","wulingdahui"):ResPathUtil.getImageRes("star1",".png","wulingdahui");
			}
		}
		this.levelTxt.text=bean.q_name;
		this.levelTxt0.text=""+bean.q_num;
		this.icon.url=ResPathUtil.getImageRes(bean.q_res,".png","wulingdahui");
		var time=cmd.recoverTime;
		App.timer.serverTimeEnd(this,this.onTimer,time);
	}

	__proto.onTimer=function(data){
		if(data.spuleTime > 0){
			this.timeTxt1.text="(次数恢复："+DateUtils.convertTime(data.spuleTime)+")";
		}
		else{
			this.timeTxt1.text="(每小时恢复1次)";
		}
	}

	__proto.onRefresh=function(type){
		if(type==EnumActivityType.TYPE_10000){
			var list=ActivityUtil.getOpenList(type);
			if(list.length > 0){
				var data=list[0];
				var obj=JSON.parse(data.extendMap);
				var descUrl1;
				if(obj.showtype==1){
					descUrl1="descImg0";
					this.descImg1.pos(202,576);
				}
				else if(obj.showtype==2){
					descUrl1="descImg2";
					this.descImg1.pos(241,578);
				}
				else if(obj.showtype==3){
					descUrl1="descImg1";
					this.descImg1.pos(241,578);
				}
				this.descImg1.url=ResPathUtil.getImageRes(descUrl1,".png","wulingdahui");
				this.descImg2.url=ResPathUtil.getImageRes("descImg"+obj.shownum,".png","wulingdahui");
			}
		}
		else if(type==EnumActivityType.TYPE_10001){
			list=ActivityUtil.getOpenList(type);
			if(list.length > 0){
				data=list[0];
				obj=JSON.parse(data.extendMap);
				this._remineTime=myparseInt(obj.remaintime)-ServerTime.getServerTime();
				if(this._remineTime > 0){
					App.timer.doTimeLoop(this._this,1000,this.onTimer1);
					this.onTimer1();
				}
				else{
					App.timer.clearTimer(this._this,this.onTimer1);
					this.timeTxt.text="";
				}
				this.btn.visible=true;
				this.descImg.url=null;
			}
			else{
				this.btn.visible=false;
				this.descImg.url=ResPathUtil.getImageRes("descImg5",".png","wulingdahui");
				App.timer.clearTimer(this._this,this.onTimer1);
				this.timeTxt.text="";
			}
		}
	}

	__proto.onTimer1=function(){
		this._remineTime--;
		if(this._remineTime > 0){
			this.timeTxt.htmlText="("+GameHTML.setColor(DateUtils.formatDay(this._remineTime),GameHTML.GREEN)+"后结束)";
		}
		else{
			App.timer.clearTimer(this._this,this.onTimer1);
			this.timeTxt.text="";
		}
	}

	return WulingdahuiView;
})(WulingdahuiViewUI)
