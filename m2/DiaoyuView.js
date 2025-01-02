/**
*
*@author Jian
*创建时间：2024-9-24
*/
//class com.modules.feisheng.diaoyu.DiaoyuView extends ui.mobile.feisheng.diaoyu.DiaoyuViewUI
var DiaoyuView=(function(_super){
	function DiaoyuView(){
		this._grids=null;
		this._reward=null;
		this._avatar=null;
		this._yugan=null;
		this._bean=null;
		this._isTimer=false;
		this._time=0;
		DiaoyuView.__super.call(this);
		this._reward=new ShowItemListBigGrid();
		this._reward.move(0,48,this.reward_box);
		this._grids=[];
		for(var i=0;i < 4;i++){
			this._grids.push(new ShowItemListBigGrid(0,this,144,90+126 *i));
		}
		this.logTxt.scrollBarAllwaysShow="off";
		TipMgr.addTip(this.tipBox,new TipData("TEXT",TipDescUtil.getTextTipDesc(758)));
		this.addChild(this.onekey);
		this._yugan=GameEffect.getEffect();
		this._yugan.pos(580,258);
	}

	__class(DiaoyuView,'com.modules.feisheng.diaoyu.DiaoyuView',_super);
	var __proto=DiaoyuView.prototype;
	Laya.imps(__proto,{"com.game.core.panel.ITabView":true})
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		TipMgr.removeTip(this.tipBox);
		this._reward=null;
		this._grids=null;
		this._yugan=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		var role=App.role;
		this._avatar=new MapPlayerRoleData();
		this._avatar.isInVisableArea=true;
		this._avatar.roleView.pos(574,286);
		this._avatar.roleView.addParent(this.bg);
		this._avatar.sex=role.sex;
		this._avatar.job=role.job;
		this._avatar.setAvatar(role.cloth,role.szCloth,0,0,role.guangyi,role.szWing)
		this._avatar.roleView.changeDirAction("1",3,true,true);
		this.bg.addChild(this._yugan);
		this.bg.skin=ResPathUtil.getImageRes("bg_diaoyu1","jpg","feisheng");
		this.addEvent("FightBossEvent.TILI_CHANGE",this.updateTili);
		this.addEvent(FeiShengCenter.DIAOYU_UPDATE,this.update);
		this.addEvent("ET.FUNCTION_TIP",this.onFunction);
		this.addEvent("MoneyEvent.CHANGE",this.onMoney);
		this.onekey.on("click",this,this.onClick);
		this.btnXZ.on("click",this,this.onClick);
		this.l_btn.on("click",this,this.onClick);
		this.r_btn.on("click",this,this.onClick);
		for(var i=0;i < 4;i++){
			this._grids[i].showJson(App.dataMgr.q_fishermanContainer.getDataBean(i+1).q_rewards);
		}
		FeiShengCenter.sendC2S_FisherActionMessage(1);
	}

	__proto.hide=function(){
		EventMgr.removeAll(this);
		this.clearTimer(this,this.onTimer);
		this.onekey.off("click",this,this.onClick);
		this.btnXZ.off("click",this,this.onClick);
		this.l_btn.off("click",this,this.onClick);
		this.r_btn.off("click",this,this.onClick);
		this.bg.skin=null;
		this._yugan.stopAndHide();
		this._isTimer=false;
		this._bean=null;
		this._avatar.dispose();
		this._avatar=null;
	}

	__proto.update=function(action,isUP){
		(action===void 0)&& (action=0);
		(isUP===void 0)&& (isUP=false);
		this._time=0;
		this._bean=App.dataMgr.q_fishermanContainer.getDataBean(FeiShengCenter.diaoyu.currLv,false);
		this._yugan.url=ResPathUtil.getPanelEffect("yugan"+this._bean.q_id,"feisheng");
		this._yugan.restart();
		this.g_select.y=54+(this._bean.q_id-1)*126;
		var param;
		if(FeiShengCenter.diaoyu_end==0){
			this.r_txt.x=665;
			this.r_btn.x=685;
			this.r_btn.label="开始抛竿";
			this.c_txt.visible=Boolean(this._bean.q_zhufu_need);
			if(this.c_txt.visible){
				param=JSON.parse(this._bean.q_zhufu_need)[0];
				this.c_icon.skin=EnumMoney.getIcon(param.id);
				this.c_txt.text=param.num+'';
				this.c_icon.tag=param;
				this.c_txt.x=this.l_btn.width-this.c_txt.width-this.c_icon.x >> 1;
			}
			this.barBox.visible=true;
			this.reward_box.visible=false;
			this.onekey.visible=this.c_txt.visible;
			this.l_btn.visible=true;
			this.l_btn.disabled=!this.onekey.visible;
			this.l_btn.label=this.onekey.visible ? "提升品质" :"已达上限";
			if(this.onekey.visible){
				this.barTxt.text=FeiShengCenter.diaoyu.blessVal+'/'+this._bean.q_zhufu_max;
				this.bar.scaleX=FeiShengCenter.diaoyu.blessVal < this._bean.q_zhufu_max ? FeiShengCenter.diaoyu.blessVal / this._bean.q_zhufu_max :1;
				param=JSON.parse(this._bean.q_zhizun_need)[0];
				this.o_icon.skin=EnumMoney.getIcon(param.id);
				this.o_txt.text=param.num+'';
				this.o_icon.tag=param;
				this.o_txt.x=this.onekey.width-this.o_txt.width-this.o_icon.x >> 1;
			}
			else{
				this.bar.scaleX=1;
				this.barTxt.text='';
			}
			this.onMoney(EnumMoney.BIND_YUAN_BAO,MoneyCenter.getMoneyReplaceBind(EnumMoney.BIND_YUAN_BAO));
		}
		else{
			this._time=FeiShengCenter.diaoyu_end-ServerTime.getServerTime();
			this.barBox.visible=false;
			this.onekey.visible=false;
			this.reward_box.visible=this._time <=0;
			this.l_btn.visible=!this.reward_box.visible;
			if(this.reward_box.visible){
				this.r_btn.x=590;
				this.r_txt.text='';
				this.r_btn.label="领取奖励";
				this.r_btn.showRedPoint(true);
				this._reward.showJson(this._bean.q_rewards);
				this._reward.x=213-this._reward.width *0.5;
			}
			else{
				this.r_txt.x=570;
				this.r_btn.x=685;
				this.r_btn.label="立即完成";
				this.r_btn.showRedPoint(false);
				this.l_btn.label="邀请协助";
				this.l_btn.disabled=false;
				if(!this._isTimer){
					this._isTimer=true;
					this.timerLoop(1000,this,this.onTimer);
				}
			}
		}
		this.onTimer();
		this.updateTili();
		var info,ygBean,logStr='',myid=App.role.personId;
		for(var i=FeiShengCenter.diaoyu.fisherEncourageInfo.length-1;i >-1;i--){
			info=FeiShengCenter.diaoyu.fisherEncourageInfo[i];
			ygBean=App.dataMgr.q_fishermanContainer.getDataBean(info.fisherModelId,false);
			logStr+=GameHTML.setColor('S'+info.tSid+'.'+info.tPName,"#50ade0")+"使用"+(ygBean ? ygBean.q_name :'')+"受到"+GameHTML.setColor('S'+info.serverId+'.'+info.playerName,"#50ade0")+"协助";
			if(i > 0){
				logStr+="<br/>";
			}
		}
		this.logTxt.text=logStr;
		if(action==3 || action==7){
			CPlayOnceEffect.play(ResPathUtil.getPanelEffect(isUP ? "tisheng1" :"tisheng2","common"),this.bg,676,300);
		}
	}

	__proto.onClick=function(e){
		if(e.currentTarget==this.l_btn){
			if(this.l_btn.label=="邀请协助"){
				FeiShengCenter.sendC2S_FisherActionMessage(8);
			}
			else{
				this.showAlert(3,this.c_icon.tag,'');
			}
		}
		else if(e.currentTarget==this.r_btn){
			if(this.r_btn.label=="开始抛竿"){
				if(this.r_txt.tag > 0){
					if(this.onekey.visible){
						Alert.show("当前鱼竿未达到至尊品质，是否抛竿？",GameHandler.create(FeiShengCenter,FeiShengCenter.sendC2S_FisherActionMessage),[5]);
					}
					else{
						FeiShengCenter.sendC2S_FisherActionMessage(5);
					}
				}
				else{
					GameNotice.showMousePosMessage("钓鱼次数不足");
				}
			}
			else if(this.r_btn.label=="立即完成"){
				if(this._bean && this._bean.q_finish_need){
					this.showAlert(6,JSON.parse(this._bean.q_finish_need)[0],"是否消耗{0}立即完成垂钓？");
				}
			}
			else if(this.r_btn.label=="领取奖励"){
				FeiShengCenter.sendC2S_FisherActionMessage(4);
			}
		}
		else if(e.currentTarget==this.btnXZ){
			PanelManager.openByClass(DiaoyuXiezhuPanel);
		}
		else if(e.currentTarget==this.onekey){
			this.showAlert(7,this.o_icon.tag,"是否消耗{0}一键升到最高品质？");
		}
	}

	__proto.showAlert=function(action,param,str){
		if(this.r_txt.tag > 0 || action==6){
			var enough=BagItemCenter.getItemCount(param.id)>=param.num;
			if(action==3){
				this.onSend(action,enough);
			}
			else{
				str=str.replace("{0}",GameHTML.setColor(param.num+ItemUtil.getItemName(param.id),enough ? "#00ff00" :"#ef0605"));
				Alert.show(str,GameHandler.create(this,this.onSend),[action,enough]);
			}
		}
		else{
			GameNotice.showMousePosMessage("钓鱼次数不足");
		}
	}

	__proto.onSend=function(action,enough){
		if(enough){
			FeiShengCenter.sendC2S_FisherActionMessage(action);
		}
		else{
			GameNotice.showMousePosMessage("消耗不足");
		}
	}

	__proto.updateTili=function(){
		if(this.barBox.visible){
			var tili=BossDataCenter.instance.getMonsterTili(185);
			if(tili){
				this.r_txt.tag=tili.num;
				this.r_txt.text="剩余钓鱼次数："+GameHTML.setColor(tili.num+'/'+tili.maxnum,tili.num > 0 ? "#00ff00" :"#ef0605");
			}
			else{
				this.r_txt.tag=0;
				this.r_txt.text="剩余钓鱼次数："+GameHTML.setColor("0/0","#ef0605");
			}
			this.r_btn.showRedPoint(FeiShengCenter.diaoyu_end==0 && this.r_txt.tag > 0 && !this.onekey.visible);
		}
	}

	__proto.onMoney=function(type,value){
		if(this.barBox.visible){
			if(this.c_txt.visible && this.c_icon.tag && type==this.c_icon.tag.id){
				this.c_txt.color=value < this.c_icon.tag ? "#ef0605" :"#00ff00";
			}
		}
		if(this.onekey.visible && this.o_icon.tag && type==this.o_icon.tag.id){
			this.o_txt.color=value < this.o_icon.tag.num ? "#ef0605" :"#00ff00";
		}
	}

	__proto.onFunction=function(funId,value){
		if(funId==201){
			this.btnXZ.showRedPoint(FeiShengCenter.diaoyu_xz_red,46,4);
		}
	}

	__proto.onTimer=function(){
		if(this._time > 0){
			this.r_txt.text="剩余时间："+GameHTML.setColor(DateUtils.convertTime(this._time--),"#00ff00");
		}
		else if(this._isTimer){
			this._isTimer=false;
			this.r_txt.text='';
			this.clearTimer(this,this.onTimer);
			FeiShengCenter.sendC2S_FisherActionMessage(1);
		}
	}

	return DiaoyuView;
})(DiaoyuViewUI)