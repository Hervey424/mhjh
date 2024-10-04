
/**
*龙魂BOSS
*@author zq
*创建时间：2024年4月19日20:20:16
*/
//class com.modules.activity_xcq.leichong.view.LongHunBossItem extends ui.mobile.activity_xcq.leichong.LongHunBossItemUI
var LongHunBossItem=(function(_super){
	function LongHunBossItem(){
		this._rewards=null;
		this._state=0;
		this._bean=null;
		this._sureJson=null;
		this._maybeJson=null;
		this._effectMaker=new EffectMaker();
		LongHunBossItem.__super.call(this);
		this._rewards=new ShowItemList(true,true,3,this,84,388,false,"grid_62_1",EnumImageType.ITEM_56);
		this.btn.on("click",this,this.onClick);
		this.btn_reward.on("click",this,this.onClick);
		this.bg.skin=ResPathUtil.getImageRes("lh_item",".png","leichong");
	}

	__class(LongHunBossItem,'com.modules.activity_xcq.leichong.view.LongHunBossItem',_super);
	var __proto=LongHunBossItem.prototype;
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this.btn.showRedPoint(false);
		this.btn_reward.off("click",this,this.onClick);
		this.btn.off("click",this,this.onClick);
		this.bg.skin=null;
		if(this._effectMaker){
			this._effectMaker.dispose();
			this._effectMaker=null;
		}
		this._rewards=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.setInfo=function(bean,index){
		this._bean=bean;
		var mapid=JSON.parse(bean.q_mapid)[0];
		var mapBean=App.dataMgr.q_mapContainer.getDataBean(mapid);
		if(mapBean==null || mapBean.q_boss=="")
			return;
		this._sureJson=mapBean.q_map_info;
		var monsterid=JSON.parse(mapBean.q_boss)[0].monster;
		var monsterBean=App.dataMgr.q_monsterContainer.getDataBean(monsterid);
		if(monsterBean==null)
			return;
		var scale=Number(bean.q_tips);
		if(scale==0){
			scale=1;
		}
		this._effectMaker.showMonsterAvatar(ResPathUtil.getMapMonsterAvatarRes(monsterBean.q_featureid),false,this,117,300,1,scale);
		if(monsterBean.q_items){
			var dropid=myparseInt(monsterBean.q_items);
			var dropCfg=DataManager.getInstance().q_monster_dropprob.getDataBean(dropid,false);
			if(dropCfg && dropCfg.q_zs_items){
				this._maybeJson=mapBean.q_show_item;
				var arr=JSON.parse(dropCfg.q_zs_items);
				arr=arr.slice(0,3);
				this._rewards.showArr(arr);
				this._rewards.center();
			}
		};
		var key=ConditionUtil.getMapEnterKey(mapBean);
		if(key){
			var parse=JSON.parse(key)[0];
			var need=parse.todayreg / GameConfig.rmb;
			this.imgMoney.skin="mobile/leichong/lh_"+need+".png";
		};
		var data=ZoneCenter.getZone(bean.q_id);
		if(data==null)
			return;
		if(ConditionUtil.isMapCanEnter(mapBean)){
			if(data.syCanEnterTimes > 0){
				if(ConditionUtil.isConditionEnoughJson(bean.q_saodang_free_condition)){
					this._state=2;
					this.btn.label="立即扫荡";
				}
				else{
					this.btn.label="立即挑战";
					this._state=1;
				}
				this.btn.showRedPoint(true);
				this.btn.visible=true;
				this.imgKill.visible=false;
			}
			else{
				this.btn.showRedPoint(false);
				this._state=0;
				this.btn.visible=false;
				this.imgKill.visible=true;
			}
		}
		else{
			this.btn.showRedPoint(false);
			this.btn.visible=true;
			this.imgKill.visible=false;
			this.btn.label="前往充值";
		}
	}

	__proto.onClick=function(e){
		switch(e.currentTarget){
			case this.btn_reward:{
					PanelManager.openByClass(LongHunBossRewardPanel,{sure:this._sureJson,maybe:this._maybeJson});
					break ;
				}
			case this.btn:{
					if(this._state==2){
						ZoneCommandSender.enterZoneMap(this._bean.q_id,1);
					}
					else if(this._state==1){
						ZoneCommandSender.enterZoneMap(this._bean.q_id);
					}
					else{
						PanelOpenManager.openVIP(null,0);
					}
					break ;
				}
			}
	}

	return LongHunBossItem;
})(LongHunBossItemUI)


/**
*龙魂BOSS
*@author zq
*创建时间：2024年4月19日20:20:16
*/
//class com.modules.activity_xcq.leichong.view.LongHunBossView extends ui.mobile.activity_xcq.leichong.LongHunBossViewUI
var LongHunBossView=(function(_super){
	function LongHunBossView(){
		this._type=0;
		LongHunBossView.__super.call(this);
		this._type=344;
		this.list.itemRender=LongHunBossItem;
		this.list.scrollBarAllwaysShow="off";
		this.list.renderHandler=GameHandler.create(this,this.renderHandler);
	}

	__class(LongHunBossView,'com.modules.activity_xcq.leichong.view.LongHunBossView',_super);
	var __proto=LongHunBossView.prototype;
	Laya.imps(__proto,{"com.modules.window.IActivity":true})
	__proto.updateState=function(type){
		if(this._type !=type)
			return;
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		this.addEvent("ZoneEvent.ZONE_LIST_UPDATE",this.onUpdateZoneList);
		this.addEvent("ZoneEvent.ZONE_INFO_UPDATE",this.onUpdateZoneInfo);
		this.addEvent("ET.MONEY_CHANGE",this.onMoney);
		var all=App.dataMgr.q_zone_mapContainer.getZoneListByType(100);
		this.list.array=all;
		var index=0;
		for (var i=0;i < all.length;i++){
			var bean=all[i];
			var data=ZoneCenter.getZone(bean.q_id);
			if(data !=null && data.syCanEnterTimes > 0){
				index=i;
				break ;
			}
		}
		if(index > 0){
			index--;
		}
		this.list.scrollTo(index);
		this.onMoney();
		ZoneCommandSender.zoneInfoList(100);
	}

	__proto.hide=function(){
		EventMgr.removeAll(this);
		this.list.array=null;
	}

	__proto.onUpdateZoneList=function(type){
		if(type !=100)
			return;
		this.list.refresh();
	}

	__proto.onUpdateZoneInfo=function(zoneId){
		var bean=App.dataMgr.q_zone_mapContainer.getDataBean(zoneId);
		if(bean && bean.q_zone_client_type !=100)
			return;
		this.list.refresh();
	}

	__proto.onMoney=function(){
		this.money_txt.htmlText="今日累充："+GameHTML.setColor(MoneyCenter.rechargeToday / GameConfig.rmb+"元",GameHTML.GREEN);
	}

	__proto.renderHandler=function(cell,index){
		cell.setInfo(this.list.array[index],index);
	}

	return LongHunBossView;
})(LongHunBossViewUI)