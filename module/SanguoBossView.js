/**
*
*@author Jian
*创建时间：2024-11-7
*/
//class com.modules.boss.shanggujindi.SanguoBossView extends ui.mobile.boss.shanggujindi.SanguoBossViewUI
var SanguoBossView=(function(_super){
	function SanguoBossView(){
		this._items=null;
		this._grids=null;
		this._monster=null;
		this._orders=null;
		this._dic=null;
		this._curr=null;
		this._center=null;
		SanguoBossView.__super.call(this);
		this._dic={};
		this._orders=[];
		this._items=[];
		this._grids=new ShowItemListTween(true,true,6,this,440,414);
		this._grids.setMaskByGrids(6);
		this._monster=new UIMonster();
		this._monster.move(606,380,this,0);
		var vec=BossDataCenter.sanguo;
		vec.sort(this.onSort);
		var sg,tabStr='';
		for(var i=0;i < vec.length;i++){
			sg=vec[i];
			if(!this._dic[sg.bean.q_order]){
				tabStr+=sg.bean.q_name+',';
				this._dic[sg.bean.q_order]=[];
				this._orders.push(sg.bean.q_order);
			}
			this._dic[sg.bean.q_order].push(sg);
		}
		this.l_select.removeSelf();
		this.l_panel.vScrollBarAllwaysShow="off";
		this.tabs_panel.vScrollBarAllwaysShow="off";
		this.tabs.labels=tabStr.substring(0,tabStr.length-1);
	}

	__class(SanguoBossView,'com.modules.boss.shanggujindi.SanguoBossView',_super);
	var __proto=SanguoBossView.prototype;
	Laya.imps(__proto,{"com.game.core.panel.ITabView":true})
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._monster=null;
		this._orders=null;
		this._grids=null;
		this._items=null;
		this._dic=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		this._center=BossDataCenter.instance;
		var item;
		for(var $each_item in this._items){
			item=this._items[$each_item];
			item.on("click",this,this.onClick);
		}
		this.addEvent("FIGHTBOSSSTATUE",this.updateBoss);
		this.addEvent("WearEquipCenter.WEAR",this.onWear);
		this.addEvent("ShenLuCenter.STAR",this.updateTabs);
		this.addEvent("ShenLuCenter.UP",this.updateTabs);
		this.btnYulan.on("click",this,this.onClick);
		this.btnLink.on("click",this,this.onClick);
		this.btnAct.on("click",this,this.onClick);
		this.btnGou.on("click",this,this.onClick);
		this.btnGo.on("click",this,this.onClick);
		this.tabs.on("change",this,this.onTab);
		this.btnAct.visible=ActivityUtil.isOpenByType(218);
		if(!SanguoBossView.isClick && this.btnAct.visible){
			this.btnAct.showFlowEffect("effect_6",0,0,"activityIconBtn");
			this.btnAct.showRedPoint(true,70,8);
		}
		if((data instanceof com.game.core.panel.PanelParam )){
			tab=(data).tab2;
		}
		this.updateTabs();
		this.updateBoss(tab);
	}

	__proto.hide=function(){
		var item;
		for(var $each_item in this._items){
			item=this._items[$each_item];
			item.off("click",this,this.onClick);
		}
		EventMgr.removeAll(this);
		this.btnYulan.off("click",this,this.onClick);
		this.btnLink.on("click",this,this.onClick);
		this.btnAct.off("click",this,this.onClick);
		this.btnGou.off("click",this,this.onClick);
		this.btnGo.off("click",this,this.onClick);
		this.tabs.off("change",this,this.onTab);
		this.tabs.selectedIndex=-1;
		this.btnAct.hideFlowEffect();
		this.nameImg.skin=null;
		this._monster.stop();
		this._center=null;
	}

	__proto.onTab=function(e){
		var item,py=0,tar,datas=this._dic[this._orders[this.tabs.selectedIndex]];
		for(var i=0;i < datas.length;i++){
			if(i < this._items.length){
				item=this._items[i];
			}
			else{
				item=new SanguoBossItem();
				item.on("click",this,this.onClick);
				this._items.push(item);
			}
			if(!item.parent){
				this.l_panel.addChild(item);
			}
			item.setData(datas[i],i==datas.length-1);
			item.y=py;
			py+=item.height;
			if(item.box.isRedPoint){
				tar=item;
			}
		}
		for(;i < this._items.length;i++){
			this._items[i].removeSelf();
		}
		this.l_panel.refresh();
		if(!tar)tar=this._items[0];
		if(tar){
			Event.EMPTY.setTo("click",tar,tar);
			this.onClick(Event.EMPTY);
			this.l_panel.scrollTo(0,tar.y > 208 ? tar.y-208 :0);
		}
		this.onTimer();
	}

	__proto.updateBoss=function(tab){
		(tab===void 0)&& (tab=-1);
		var datas,red=false,index=0;
		for(var i=0;i < this.tabs.items.length;i++){
			red=false;
			datas=this._dic[this._orders[i]];
			var sg;
			for(var $each_sg in datas){
				sg=datas[$each_sg];
				if(this._center.isGuanzhu(sg.maps[0],sg.ids[0])&&this._center.getMapsBossNum(sg.maps,[sg.bean.q_id],sg.ids,true)> 0){
					red=true;
					break ;
				}
			}
			this.tabs.showRedPointByIndex(i,red);
			if(red){
				index=i;
			}
		}
		if(this.tabs.selectedIndex < 0){
			if(tab >=0 && !(this.tabs.getItem(tab)).disabledStr){
				index=tab;
			}
			this.tabs.selectedIndex=index;
			index=(index-6)*120;
			this.tabs_panel.scrollTo(index < 0 ? 0 :index);
		}
		else{
			var item;
			for(var $each_item in this._items){
				item=this._items[$each_item];
				if(item.parent){
					item.update();
				}
			}
			this.onTimer();
			this.showNum();
		}
	}

	__proto.onClick=function(e){
		if(e.currentTarget==this.btnGo){
			TransferManager.toBossMap(12,this._curr.sg.maps[0]);
			PanelManager.removePanel(PanelRegister.SHANGGUJINDI);
			PanelManager.removePanel(PanelRegister.BOSS);
		}
		else if(e.currentTarget==this.btnAct){
			SanguoBossView.isClick=true;
			this.btnAct.hideFlowEffect();
			this.btnAct.showRedPoint(false);
			PanelOpenManager.openPanelById(1160014);
		}
		else if(e.currentTarget==this.btnYulan){
			PanelManager.openByClass(SanguoBossYulanPanel);
		}
		else if(e.currentTarget==this.btnLink){
			if(this._curr.isLast){
				PanelManager.openByClass(TaskTuijianPanel,{tuijian:{output:[552],fuse:850001},click:this.btnLink});
			}
			else{
				PanelOpenManager.openPanelById(7000004);
			}
		}
		else if(e.currentTarget==this.btnGou){
			for(var i=0;i < this._curr.sg.ids.length;i++){
				BossDataCenter.instance.setGuanzhu(this._curr.sg.maps[0],this._curr.sg.ids[i],this.btnGou.selected);
			}
			BossDataCenter.instance.updateSanguo();
			this.updateBoss();
		}
		else if((e.currentTarget instanceof com.modules.boss.shanggujindi.SanguoBossItem )){
			this._curr=e.currentTarget;
			this._curr.box.addChild(this.l_select);
			this._grids.showArr(this._center.getShowItem(this._curr.sg.bean.q_client_boss_show));
			this._monster.showMonster(App.dataMgr.q_monsterContainer.getDataBean(this._curr.sg.bean.q_client_boss_show));
			this.showNum();
			this.nameImg.skin=ResPathUtil.getImageRes(this._curr.sg.bean.q_id,".png","boss/sanguo");
			this.btnGo.disabledString(this._curr.limitTxt.tag ? null :"未达成条件");
			this.btnGou.visible=this._curr.limitTxt.tag;
			this.btnGou.selected=this._center.isGuanzhu(this._curr.sg.maps[0],this._curr.sg.ids[0]);
			this.btnLink.label=this._curr.isLast ? "提升将旗" :"提升官职";
		}
	}

	__proto.showNum=function(){
		if(this._curr){
			this.numTxt.tag=this._center.getMapsBossNum(this._curr.sg.maps,null,this._curr.sg.ids);
			this.numTxt.text="剩余本体数量："+GameHTML.setColor(this.numTxt.tag,this.numTxt.tag > 0 ? "#00ff00" :"#ef0605");
		}
	}

	__proto.updateTabs=function(type){
		(type===void 0)&& (type=0);
		if(type !=7){
			return;
		};
		var sg,map;
		for(var i=0;i < this._orders.length;i++){
			sg=this._dic[this._orders[i]][0];
			map=App.dataMgr.q_mapContainer.getDataBean(sg.maps[0]);
			(this.tabs.getItem(i)).disabledString(ConditionUtil.isMapCanEnter(map)? null :map.q_entry_condition_desc);
		}
		for(i=0;i < this._items.length;i++){
			if(this._items[i].parent){
				this._items[i].setData(this._items[i].sg,i==this._items.length-1);
			}
		}
		if(this._curr){
			Event.EMPTY.setTo("click",this._curr,this._curr);
			this.onClick(Event.EMPTY);
		}
	}

	__proto.onWear=function(equip){
		if(equip.getDataBean().q_client_type==149){
			this.updateTabs(7);
		}
	}

	__proto.onTimer=function(){
		var stime=ServerTime.getServerTime();
		var item;
		for(var $each_item in this._items){
			item=this._items[$each_item];
			if(item.parent){
				if(item.time > 0){
					item.numTxt.text=DateUtils.convertTime(item.time-stime)+"后复活";
				}
				else if(item.time==0){
					item.time=-1;
					item.numTxt.text="已复活";
					item.numTxt.color="#00ff00";
				}
			}
		}
	}

	__proto.onSort=function(v1,v2){
		if(v1.bean.q_order==v2.bean.q_order){
			return myparseInt(v1.bean.q_image)-myparseInt(v2.bean.q_image);
		}
		return v1.bean.q_order-v2.bean.q_order;
	}

	SanguoBossView.isClick=false;
	return SanguoBossView;
})(SanguoBossViewUI)


/**
*
*@author Jian
*创建时间：2024-11-7
*/
//class com.modules.boss.shanggujindi.SanguoBossItem extends ui.mobile.boss.shanggujindi.SanguoBossItemUI
var SanguoBossItem=(function(_super){
	function SanguoBossItem(){
		this.isLast=false;
		this.sg=null;
		this.time=0;
		SanguoBossItem.__super.call(this);
	}

	__class(SanguoBossItem,'com.modules.boss.shanggujindi.SanguoBossItem',_super);
	var __proto=SanguoBossItem.prototype;
	__proto.setData=function(sg,isLast){
		this.sg=sg;
		this.isLast=isLast;
		this.nameTxt.text=GameUtils.getMapName(sg.maps[0]);
		this.head.skin=GameUtils.getMonsterHead(sg.bean.q_client_boss_show);
		var map=App.dataMgr.q_mapContainer.getDataBean(sg.maps[0]);
		this.limitTxt.tag=ConditionUtil.isMapCanEnter(map);
		this.limitTxt.text=map.q_entry_condition_desc;
		this.limitTxt.color=this.limitTxt.tag ? "#00ff00" :"#ef0605";
		this.update();
		if(isLast){
			this._height=180;
			this.box.y=31;
			this.bg.y=-50;
			this.bg.skin="mobile/shanggujindi/itembg2.png";
		}
		else{
			this._height=104;
			this.box.y=-5;
			this.bg.y=0;
			this.bg.skin="mobile/shanggujindi/itembg1.png";
		}
	}

	__proto.update=function(){
		var boss=BossDataCenter.instance.getBossBy(this.sg.maps[0],this.sg.bean.q_id,this.sg.ids[0]);
		if(boss){
			this.time=boss.remainTime;
			this.box.showRedPoint(BossDataCenter.instance.isGuanzhu(this.sg.maps[0],this.sg.ids[0])&& BossDataCenter.instance.getMapsBossNum(this.sg.maps,[this.sg.bean.q_id],this.sg.ids,true)> 0,266,16);
			if(this.time > 0){
				this.numTxt.color="#ef0605";
			}
		}
		else{
			this.time=-1;
			this.numTxt.text="";
			this.numTxt.color="#ef0605";
			this.box.showRedPoint(false);
		}
	}

	return SanguoBossItem;
})(SanguoBossItemUI)



/**
*
*@author Jian
*创建时间：2024-11-11
*/
//class com.modules.boss.shanggujindi.SanguoBossYulanItem extends ui.mobile.boss.shanggujindi.SanguoBossYulanItemUI
var SanguoBossYulanItem=(function(_super){
	function SanguoBossYulanItem(){
		this._grids=null;
		this._grid=null;
		SanguoBossYulanItem.__super.call(this);
		this._grids=new ShowItemListBigGrid(10,this,0,50);
		this._grid=new ItemGrid(null,EnumImageType.ITEM_56,66);
		this._grid.move(52,34,this);
	}

	__class(SanguoBossYulanItem,'com.modules.boss.shanggujindi.SanguoBossYulanItem',_super);
	var __proto=SanguoBossYulanItem.prototype;
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._grids=null;
		this._grid=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.update=function(bean){
		this._grid.itemId=bean.q_equip_model_id;
		this._grids.showJson(bean.q_cost_equip);
		this._grids.x=432-this._grids.width / 2;
		this.btnGo.tag=bean;
	}

	return SanguoBossYulanItem;
})(SanguoBossYulanItemUI)