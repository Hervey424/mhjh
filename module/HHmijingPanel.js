/**
*魂环秘境
*@author Jian
*创建时间：2024-10-23
*/
//class com.modules.boss.hhmj.HHmijingPanel extends com.game.core.panel.BasePanel
var HHmijingPanel=(function(_super){
	function HHmijingPanel(){
		this._view=null;
		this._items=null;
		this._grids=null;
		this._datas=null;
		this._center=null;
		this._data=null;
		this._cur_id=0;
		HHmijingPanel.__super.call(this);
	}

	__class(HHmijingPanel,'com.modules.boss.hhmj.HHmijingPanel',_super);
	var __proto=HHmijingPanel.prototype;
	__proto.init=function(){
		this._view=new HHmijingPanelUI();
		this._view.tabs_panel.vScrollBarAllwaysShow="off";
		this._view.g_select.removeSelf();
		this.addChild(this._view);
		this._grids=new ShowItemListTween(true,true,4,this,250,420);
		this._grids.setMaskByGrids(8);
		this._items=[];
		for(var i=0;i < 6;i++){
			this._items.push(new HHmijingItem());
			this._items[i].scaleXY=0.8;
			this._items[i].move(128+132 *i,147,this._view.headBox);
		}
		this._datas=BossDataCenter.hhmijing;
		var tabStr='';
		for(i=0;i < this._datas.length;i++){
			tabStr+=this._datas[i].bean.q_map_name;
			if(i < this._datas.length-1){
				tabStr+=',';
			}
		}
		this._view.tabs.labels=tabStr;
		this._view.tabs.width=this._datas.length *122-2;
		this._view.tabs_panel.callChangeScroll();
		this._view.tabs.x=this._datas.length < 6 ? this._view.tabs_panel.width-this._view.tabs.width >> 1 :0;
		this._view.tabs_line1.x=this._view.tabs_panel.x+this._view.tabs.x;
		this._view.tabs_line2.x=this._view.tabs_panel.x+(this._view.tabs.x > 0 ? this._view.tabs.x+this._view.tabs.width :this._view.tabs_panel.width);
		TipMgr.addTip(this._view.tipBox,new TipData("TEXT",TipDescUtil.getTextTipDesc(773)));
	}

	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._datas=null;
		this._grids=null;
		this._items=null;
		this._view=null;
		_super.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		_super.prototype.show.call(this);
		this._center=BossDataCenter.instance;
		this.addEvent("FIGHTBOSSSTATUE",this.updateBoss);
		this.addEvent(ActivityEvent.REFRESH_JIANYAO,this.updateAct);
		this.addEvent(ActivityEvent.REFRESH_DETAIL,this.updateAct);
		this.addEvent("FightBossEvent.TILI_CHANGE",this.updateTili);
		this._view.btnAdd.on("click",this,this.onClick);
		this._view.btnGou.on("click",this,this.onClick);
		this._view.btnGo.on("click",this,this.onClick);
		this._view.btnTQ.on("click",this,this.onClick);
		this._view.tabs.on("change",this,this.onTab);
		this._view.btnTQ.skin=ResPathUtil.getImageRes("btn_hhtq",".png","boss");
		this._view.bg.skin=ResPathUtil.getImageRes("bg13",".jpg","boss");
		data=ResPathUtil.getImageRes("itembghh",".png","boss");
		var hUrl=ResPathUtil.getImageRes("gui",".png","boss");
		var item;
		for(var $each_item in this._items){
			item=this._items[$each_item];
			item.on("click",this,this.onClick);
			item.tiliIcon.skin=hUrl;
			item.bg.skin=data;
		}
		this.updateTili();
		this.updateBoss();
		this.updateAct(EnumActivityType.TYPE_5501);
		this.timerLoop(1000,this,this.onTimer);
	}

	__proto.hide=function(){
		_super.prototype.hide.call(this);
		EventMgr.removeAll(this);
		this.clearTimer(this,this.onTimer);
		this._view.btnAdd.off("click",this,this.onClick);
		this._view.btnGou.off("click",this,this.onClick);
		this._view.btnGo.off("click",this,this.onClick);
		this._view.btnTQ.off("click",this,this.onClick);
		this._view.tabs.off("change",this,this.onTab);
		this._view.tabs.selectedIndex=-1;
		this._view.bg.skin=null;
		this._grids.stop();
		this._center=null;
		this._data=null;
		var item;
		for(var $each_item in this._items){
			item=this._items[$each_item];
			item.off("click",this,this.onClick);
			item.avatar.stopAndHide();
			item.tiliIcon.skin=null;
			item.bg.skin=null;
		}
	}

	__proto.updateBoss=function(){
		var btnTab,index=0,data;
		for(var i=0;i < this._datas.length;i++){
			data=this._datas[i];
			if(!data.isEnter){
				data.isEnter=ConditionUtil.isMapCanEnter(data.bean);
			}
			btnTab=this._view.tabs.getItem(i);
			if(data.isEnter){
				btnTab.disabledString(null);
				btnTab.showRedPoint(WanyaoCenter.hasLifeBoss(data,189),0,0);
				if(btnTab.isRedPoint){
					index=i;
				}
			}
			else{
				btnTab.showRedPoint(false,0,0);
				btnTab.disabledString(ConditionUtil.getMapEnterDesc(data.bean));
			}
		}
		if(this._view.tabs.selectedIndex < 0){
			this._view.tabs.selectedIndex=index;
		}
		else{
			this.updateHeadRed();
		}
	}

	__proto.updateHeadRed=function(){
		var boss,index=-1,red=this._data.isEnter && this._view.tiliTxt.tag > 0;
		for(var i=this._items.length-1;i >-1;i--){
			boss=this._center.getBossBy2(this._data.bean.q_map_id,this._items[i].bossId);
			this._items[i].remainTime=boss ? boss.remainTime :0;
			if(this._items[i].remainTime > 0){
				this._items[i].timeTxt.color="#ef0605";
			}
			else if(index < 0){
				index=i;
			}
		}
		if(this._cur_id < 1){
			if(index < 0)index=0;
			Event.EMPTY.setTo("click",this._items[index],this._items[index]);
			this.onClick(Event.EMPTY);
		}
	}

	__proto.onTab=function(e){
		this._cur_id=0;
		this._data=this._datas[this._view.tabs.selectedIndex];
		for(var i=0;i < this._items.length;i++){
			this._items[i].bossId=this._data.ids[i]["monster"];
		}
		this._view.btnGou.selected=this._center.isGuanzhu(this._data.bean.q_map_id,this._items[0].bossId);
		this._grids.showJson(this._data.bean.q_show_item);
		this.updateHeadRed();
	}

	__proto.updateTili=function(){
		this._view.tiliTxt.tag=this._center.getTiliNum(189);
		this._view.tiliTxt.text="剩余次数："+GameHTML.setColor(this._view.tiliTxt.tag,"#00ff00");
	}

	__proto.updateAct=function(type){
		if(type==EnumActivityType.TYPE_5501 || type==EnumActivityType.TYPE_5601){
			var act=ActivityCenter.getData(560101);
			this._view.btnAdd.visible=act && act.activityStates==1 && act.playerStates > 0;
			this._view.btnTQ.visible=ActivityUtil.isOpenByType(EnumActivityType.TYPE_5601)|| ActivityUtil.isOpenByType(EnumActivityType.TYPE_5501);
			this._view.btnTQ.showRedPoint(JieriRedPoint.isRed(EnumActivityType.TYPE_5501),50,10);
		}
	}

	__proto.onClick=function(e){
		if(e.currentTarget==this._view.btnAdd || e.currentTarget==this._view.btnTQ){
			PanelManager.openByClass(HHmijingTQPanel);
		}
		else{
			if(!this._data)return;
			if(e.currentTarget==this._view.btnGo){
				TransferManager.toBossMap(12,this._data.bean.q_map_id,this._cur_id);
				PanelManager.removePanel(PanelRegister.BOSS);
				this.onClose();
			}
			else{
				var item;
				if(e.currentTarget==this._view.btnGou){
					var $each_item;
					for($each_item in this._items){
						item=this._items[$each_item];
						this._center.setGuanzhu(this._data.bean.q_map_id,item.bossId,this._view.btnGou.selected);
					}
					BossDataCenter.instance.updateHHmijingRed();
					this.updateBoss();
				}
				else if((e.currentTarget instanceof com.modules.boss.hhmj.HHmijingItem )){
					var bool=false;
					for(var i=0;i < this._items.length;i++){
						item=this._items[i];
						bool ? this._view.headBox.addChildAt(item,0):this._view.headBox.addChild(item);
						item.gMask.visible=item !=e.currentTarget;
						if(item.gMask.visible){
							item.scaleXY=0.8;
						}
						else{
							bool=true;
							item.scaleXY=1;
							item.bg.addChildAt(this._view.g_select,0);
						}
					}
					this._cur_id=(e.currentTarget).bossId;
				}
			}
		}
	}

	__proto.onTimer=function(){
		var stime=ServerTime.getServerTime();
		var item;
		for(var $each_item in this._items){
			item=this._items[$each_item];
			if(item.remainTime > 0){
				item.timeTxt.text=DateUtils.convertTime(item.remainTime-stime)+"后复活";
			}
			else if(item.remainTime==0){
				item.remainTime=-1;
				item.timeTxt.text="已刷新";
				item.timeTxt.color="#00ff00";
			}
		}
	}

	return HHmijingPanel;
})(BasePanel)


/**
*
*@author Jian
*创建时间：2024-10-24
*/
//class com.modules.boss.hhmj.HHmijingTQPanel extends com.game.core.panel.BasePanel
var HHmijingTQPanel=(function(_super){
	function HHmijingTQPanel(){
		this._view=null;
		this._grids=null;
		HHmijingTQPanel.__super.call(this);
	}

	__class(HHmijingTQPanel,'com.modules.boss.hhmj.HHmijingTQPanel',_super);
	var __proto=HHmijingTQPanel.prototype;
	__proto.init=function(){
		this._view=new HHmijingTQPanelUI();
		this.addChild(this._view);
		this._grids=[];
		for(var i=0;i < 2;i++){
			this._grids.push(new ShowItemListTween(true,true,4,this,this._view["btn"+i].x-138,240));
			this._grids[i].setMaskByGrids(4);
		}
	}

	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._grids=null;
		this._view=null;
		_super.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		_super.prototype.show.call(this);
		this.addEvent(ActivityEvent.REFRESH_JIANYAO,this.update);
		this.addEvent(ActivityEvent.REFRESH_DETAIL,this.update);
		this.addEvent("MoneyEvent.CHANGE",this.onMoney);
		this._view.btn0.on("click",this,this.onClick);
		this._view.btn1.on("click",this,this.onClick);
		this._view.bg.skin=ResPathUtil.getImageRes("bg_hhtq",".png","boss");
		this._view.closeBtn.skin=ResPathUtil.getImageRes("btn_close",".png","boss/zzx");
		this.update(EnumActivityType.TYPE_5501);
		this.update(EnumActivityType.TYPE_5601);
	}

	__proto.hide=function(){
		_super.prototype.hide.call(this);
		EventMgr.removeAll(this);
		this._view.btn0.off("click",this,this.onClick);
		this._view.btn1.off("click",this,this.onClick);
		this._view.closeBtn.skin=null;
		this._view.bg.skin=null;
		this._grids[0].stop();
		this._grids[1].stop();
	}

	__proto.update=function(type){
		if(type==EnumActivityType.TYPE_5601 || type==EnumActivityType.TYPE_5501){
			if(type==EnumActivityType.TYPE_5601){
				this.showAct(type,0);
			}
			else if(type==EnumActivityType.TYPE_5501){
				this.showAct(type,1);
			}
			if(!ActivityUtil.isOpenByType(EnumActivityType.TYPE_5601)&& !ActivityUtil.isOpenByType(EnumActivityType.TYPE_5501)){
				this.onClose();
			}
		}
	}

	__proto.showAct=function(type,index){
		var act=ActivityUtil.getDataByCanJoin(type);
		if(act){
			this._grids[index].showJson(act.bean.q_show_rewards);
			this._view["txt"+index].text=act.bean.q_info_spare+"<br/>"+act.bean.q_info_spare2;
			var btn=this._view["btn"+index];
			btn.label=act.bean.q_info;
			btn.tag=act.bean;
			btn.visible=act.playerStates > 0;
			(this._view ["yigoumai"+index]).visible=!btn.visible;
			if(type==EnumActivityType.TYPE_5501){
				this.onMoney(EnumMoney.BIND_YUAN_BAO,MoneyCenter.getMoneyReplaceBind(EnumMoney.BIND_YUAN_BAO));
			}
		}
	}

	__proto.onClick=function(e){
		var bean=e.currentTarget.tag;
		if(bean.q_type==EnumActivityType.TYPE_5501){
			if(ConditionUtil.isItemEnoughJson(bean.q_need_item,true)){
				ActivitiesCommandSender.C2S_JoinActivityById(bean.q_id);
			}
		}
		else{
			WebPurchaseProduct.getInstance().show(bean.q_desc);
		}
	}

	__proto.onMoney=function(type,value){
		if(type==EnumMoney.BIND_YUAN_BAO){
			this._view.btn1.showRedPoint(this._view.btn1.visible && this._view.btn1.tag && ConditionUtil.isItemEnoughJson(this._view.btn1.tag.q_need_item));
		}
	}

	return HHmijingTQPanel;
})(BasePanel)