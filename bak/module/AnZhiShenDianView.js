
/**
*暗之神殿
*@author zq
*创建时间：2024年2月20日11:13:45
*/
//class com.modules.boss.fuli.AnZhiShenDianItem extends ui.mobile.boss.anzhishendian.AnZhiShenDianItemUI
var AnZhiShenDianItem=(function(_super){
	function AnZhiShenDianItem(){
		this._lvNum=null;
		this._mapid=0;
		this._mapBean=null;
		this._monsterid=0;
		this._monsterBean=null;
		this._avatar=null;
		this._dire=0;
		this._url=null;
		this._index=0;
		this._t=0;
		this._time=0;
		AnZhiShenDianItem.__super.call(this);
		this._avatar=new UIMonster();
		this._avatar.move(this.touchNode.width / 2,this.touchNode.width / 2,this.touchNode);
		this._lvNum=NumberBitmap.show("52");
		this._lvNum.move(30,1,this.lvFont);
	}

	__class(AnZhiShenDianItem,'com.modules.boss.fuli.AnZhiShenDianItem',_super);
	var __proto=AnZhiShenDianItem.prototype;
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._monsterBean=null;
		this._mapBean=null;
		this._avatar=null;
		this._lvNum=null;
		laya.ui.View.prototype.destroy.call(this,destroyChild);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		this.touchNode.on("click",this,this.onClick);
		this.touchNode.on("mouseover",this,this.onOver);
		this.showAvatar();
	}

	__proto.hide=function(){
		this.touchNode.off("click",this,this.onClick);
		this.touchNode.off("mouseover",this,this.onOver);
		this._avatar.stopAndHide();
		this.clearTimer(this,this.onTimer);
	}

	__proto.setBean=function(bean,index){
		this._index=index;
		this._mapid=JSON.parse(bean.q_refresh_maps)[0];
		this._mapBean=App.dataMgr.q_mapContainer.getDataBean(this._mapid);
		this._monsterid=JSON.parse(bean.q_monster_id)[0];
		this._monsterBean=App.dataMgr.q_monsterContainer.getDataBean(this._monsterid);
		this.imgName.skin=ResPathUtil.getImageRes("azsd_"+bean.q_id,".png","boss");
		this._url=ResPathUtil.getMapMonsterAvatarRes(this._monsterBean.q_featureid);
		this._lvNum.show(this._monsterBean.q_lvl+'');
		this.imgName.x=this.width-160-this.lvFont.width+30 >> 1;
		this.lvFont.x=this.imgName.x+160;
	}

	__proto.updateBoss=function(){
		this._time=BossDataCenter.instance.showState(this._monsterBean,this._mapid);
		this.timerLoop(1000,this,this.onTimer);
		this.onTimer();
		this.imgName.showRedPoint(this._time <=0 && BossDataCenter.instance.getTiliNum(177)> 0,-20,0);
	}

	__proto.onTimer=function(){
		if(this._time > 0){
			this.state_txt.htmlText=GameHTML.setColor(DateUtils.convertTime(this._time--)+"后刷新",GameHTML.RED);
		}
		else{
			this.imgName.showRedPoint(this._time <=0 && BossDataCenter.instance.getTiliNum(177)> 0,-20,0);
			this.state_txt.htmlText=GameHTML.setColor("已刷新",GameHTML.GREEN);
			this.clearTimer(this,this.onTimer);
		}
	}

	__proto.showAvatar=function(){
		var sx=1,sy=1;
		if(this._index==0){
			this._dire=3;
			sx=0.9;
			sy=0.9;
		}
		else if(this._index==1){
			this._dire=3;
			sx=-0.9;
			sy=0.9;
		}
		else if(this._index==2){
			this._dire=1;
			sx=0.8;
			sy=0.8;
		}
		else if(this._index==3){
			this._dire=1;
			sx=-0.8;
			sy=0.8;
		}
		this._avatar.updateCloth(this._url,"1",this._dire);
		this._avatar.play();
		this._avatar.scale(sx,sy);
	}

	__proto.onOver=function(e){
		var now=getTimer();
		if(now-this._t > 2000){
			this._t=now;
			this._avatar.playAction(this._url,"5",this._dire,"1",this._dire);
			App.sound.playSound(this._monsterBean.q_fire_soundid+"");
		}
	}

	__proto.remind=function(value){
		return BossDataCenter.instance.setGuanzhu(this._mapid,this._monsterid,value);
	}

	__proto.isRemind=function(){
		return BossDataCenter.instance.isGuanzhu(this._mapid,this._monsterid);
	}

	__proto.onClick=function(e){
		if(BossDataCenter.instance.getTiliNum(177)==0){
			GameNotice.showMousePosMessage("剩余归属次数不足，无法进入");
			return;
		}
		if(this._mapBean==null)
			return;
		if(this._mapBean.q_map_id==App.role.mapId){
			GameNotice.showMousePosMessage("你已在该地图！");
			return;
		}
		if(!ConditionUtil.isMapCanEnter(this._mapBean)){
			GameNotice.showMousePosMessage("未达成进入条件！");
			return;
		}
		TransferManager.transferByMapId(this._mapBean.q_map_id);
		PanelManager.removePanel(PanelRegister.FULIBOSS);
		PanelManager.removePanel(PanelRegister.BOSS);
	}

	return AnZhiShenDianItem;
})(AnZhiShenDianItemUI)


/**
*暗之神殿
*@author zq
*创建时间：2024年2月20日11:03:47
*/
//class com.modules.boss.fuli.AnZhiShenDianView extends ui.mobile.boss.anzhishendian.AnZhiShenDianViewUI
var AnZhiShenDianView=(function(_super){
	function AnZhiShenDianView(){
		this._itemList=null;
		this._rewards=null;
		this._rewardJson=null;
		this._mapid=0;
		this._monsterid=0;
		AnZhiShenDianView.__super.call(this);
		App.registerNumber("52","0123456789",-2,170,24);
		this._itemList=[];
		var xs=[150,600,120,650];
		var ys=[52,52,288,300];
		var all=App.dataMgr.q_fightBossContainer.getListBy(26);
		if(all){
			for (var i=0;i < 4;i++){
				if(i < all.length){
					var item=new AnZhiShenDianItem();
					item.move(xs[i],ys[i],this,0);
					item.setBean(all[i],i);
					this._itemList.push(item);
				}
			}
			this._rewards=new ShowItemListTween(true,true,8,this,150,487,false,"grid_62_1",EnumImageType.ITEM_56);
			this._rewards.setMaskByGrids(7);
			var bean=all[0];
			this._mapid=JSON.parse(bean.q_refresh_maps)[0];
			var monsterid=JSON.parse(bean.q_monster_id)[0];
			var monsterBean=App.dataMgr.q_monsterContainer.getDataBean(monsterid);
			if(monsterBean && monsterBean.q_items){
				var dropid=myparseInt(monsterBean.q_items);
				var dropCfg=DataManager.getInstance().q_monster_dropprob.getDataBean(dropid,false);
				if(dropCfg && dropCfg.q_zs_items){
					this._rewardJson=dropCfg.q_zs_items;
				}
			}
		}
	}

	__class(AnZhiShenDianView,'com.modules.boss.fuli.AnZhiShenDianView',_super);
	var __proto=AnZhiShenDianView.prototype;
	Laya.imps(__proto,{"com.game.core.panel.ITabView":true})
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._rewards=null;
		this._itemList=null;
		laya.ui.View.prototype.destroy.call(this,destroyChild);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		this.addEvent("FIGHTBOSSSTATUE",this.onUpdateBoss);
		this.addEvent("FightBossEvent.TILI_CHANGE",this.onUpdateBoss);
		this.btn_one.on("click",this,this.onClick);
		this.check_remind.on("click",this,this.onClick);
		this.remind_txt.on("click",this,this.onClick);
		var bingo=true;
		for (var i=0;i < this._itemList.length;i++){
			this._itemList[i].show();
			if(!this._itemList[i].isRemind()){
				bingo=false;
			}
		}
		this.check_remind.selected=bingo;
		this._rewards.showJson(this._rewardJson);
		if(FunctionManager.isFunctionOpen(134)){
			this.btn_one.visible=true;
			this.num_txt.y=484;
		}
		else{
			this.btn_one.visible=false;
			this.num_txt.y=510;
		}
		this.onUpdateBoss();
	}

	__proto.hide=function(){
		EventMgr.removeAll(this);
		this.btn_one.off("click",this,this.onClick);
		this.check_remind.off("click",this,this.onClick);
		this.remind_txt.off("click",this,this.onClick);
		for (var i=0;i < this._itemList.length;i++){
			this._itemList[i].hide();
		}
	}

	__proto.onUpdateBoss=function(){
		var tili=BossDataCenter.instance.getMonsterTili(177);
		if(tili){
			this.num_txt.htmlText="归属次数："+GameHTML.setColor(tili.num,tili.num > 0 ? GameHTML.GREEN :GameHTML.RED)+"次";
			this.btn_one.showRedPoint(tili.num > 0);
		}
		for (var i=0;i < this._itemList.length;i++){
			this._itemList[i].updateBoss();
		}
	}

	__proto.remind=function(){
		var bingo=true;
		for (var i=0;i < this._itemList.length;i++){
			if(!this._itemList[i].remind(this.check_remind.selected)){
				bingo=false;
			}
		}
		if(!bingo){
			this.check_remind.selected=false;
		}
	}

	__proto.onClick=function(e){
		switch(e.currentTarget){
			case this.btn_one:{
					if(BossDataCenter.instance.getTiliNum(177)> 0){
						BossCommandSender.sendC2S_WildMapSweepMessage(this._mapid);
					}
					else{
						GameNotice.showMousePosMessage("可扫荡次数不足！");
					}
					break ;
				}
			case this.check_remind:{
					this.remind();
					break ;
				}
			case this.remind_txt:{
					this.check_remind.selected=!this.check_remind.selected;
					this.remind();
					break ;
				}
			}
	}

	return AnZhiShenDianView;
})(AnZhiShenDianViewUI)