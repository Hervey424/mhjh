var LongHunView=(function(_super){
	function LongHunView(){
		this._attr=null;
		this._data=null;
		this._url=null;
		this._wayid=0;
		this._guide=null;
		this._effectMaker=new EffectMaker();
		LongHunView.__super.call(this);
		this._attr=new AttrTextField(10,18);
		this._attr.move(30,5,this.panel);
		this.btn_up.delayClickEnabled=true;
		this.list_menu.itemRender=LongHunMenuItem;
		this.list_menu.scrollBarAllwaysShow="off";
		this.list_cost.itemRender=LongHunCostItem;
		this.list_cost.scrollBarAllwaysShow="off";
		this.panel.vScrollBarAllwaysShow="off";
	}

	__class(LongHunView,'com.modules.longhun.view.LongHunView',_super);
	var __proto=LongHunView.prototype;
	Laya.imps(__proto,{"com.game.core.panel.ITabView":true})
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._attr=null;
		this._data=null;
		if(this._effectMaker){
			this._effectMaker.dispose();
			this._effectMaker=null;
		}
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		this.addEvent("ET.FUNCTION_TIP",this.onFunction);
		this.addEvent("MoneyEvent.CHANGE",this.onCostUpdate);
		this.addEvent("Bag.CHANGE",this.onCostUpdate);
		this.addEvent("WearEquipCenter.WEAR",this.onWear);
		this.btn_up.on("click",this,this.onClick);
		this.btn_way.on("click",this,this.onClick);
		this.list_menu.renderHandler=GameHandler.create(this,this.renderHandler);
		this.list_menu.selectHandler=GameHandler.create(this,this.selectHandler);
		this.list_menu.array=LongHunCenter.getDataProvider();
		this.updateMenu();
		this.list_cost.renderHandler=GameHandler.create(this,this.renderCostHandler);
		this.bg.skin=ResPathUtil.getImageRes("bg",".jpg","longhun");
		this.onGuide();
	}

	__proto.hide=function(){
		EventMgr.removeAll(this);
		this.btn_up.off("click",this,this.onClick);
		this.btn_way.off("click",this,this.onClick);
		this.list_menu.renderHandler=null;
		this.list_menu.selectHandler=null;
		this.list_menu.selectedIndex=-1;
		this.list_cost.renderHandler=null;
		this.bg.skin=null;
		this._url=null;
		this._effectMaker.clear();
		if(this._guide){
			this._guide.hide();
			this._guide=null;
		}
		if(App.needGuide(28)){
			App.mainProxy.onGuide(28,true);
		}
	}

	__proto.setCurrentData=function(data){
		this._data=data;
		this._attr.showCurrentByJson(data.attrs);
		this.list_cost.array=data.costs;
		this.list_cost.width=(data.costs.length *90+(data.costs.length-1)*25)+80;
		this.list_cost.x=this.btn_up.x-(this.list_cost.width-80)*0.5+5;
		this.des_txt.text=data.vip;
		this.onFunction(101);
		this.checkWay();
		if(this._url !=data.url){
			this._url=data.url;
			this._effectMaker.showEffect(data.url,false,this.effectNode);
		}
	}

	__proto.updateMenu=function(){
		var all=LongHunCenter.getDataProvider();
		var index=-1;
		for (var i=0;i < all.length;i++){
			var tmpData=all[i];
			if(BagItemCenter.getItemCount(tmpData.itemId,true,true)> 0){
				index=i;
				break ;
			}
		}
		if(index < all.length-1){
			index++;
		}
		if(this.list_menu.selectedIndex !=index){
			this.list_menu.selectedIndex=index;
			this.list_menu.scrollTo(index);
		}
	}

	__proto.renderHandler=function(cell,index){
		cell.setInfo(this.list_menu.array[index]);
	}

	__proto.selectHandler=function(index){
		this.setCurrentData(this.list_menu.array[index]);
	}

	__proto.renderCostHandler=function(cell,index){
		cell.setInfo(this.list_cost.array[index]);
	}

	__proto.onCostUpdate=function(__args){
		var args=arguments;
		this.list_cost.refresh();
		this.list_menu.refresh();
		this.checkWay();
		this.onFunction(101);
	}

	__proto.checkWay=function(){
		if(this._data==null)
			return;
		this._wayid=0;
		for (var i=1;i < this._data.costs.length;i++){
			var cost=this._data.costs[i];
			var now=BagItemCenter.getItemCount(cost.itemId,false,true);
			var need=cost.count;
			if(now < need){
				this._wayid=cost.itemId;
				break ;
			}
		}
		if(this._wayid==710001){
			this.updateGetWayRed();
		}
	}

	__proto.onFunction=function(funid,value){
		(value===void 0)&& (value=true);
		if(funid==101){
			if(this._data){
				this.btn_up.showRedPoint(this._data.redPoint,125,5);
			}
			else{
				this.btn_up.showRedPoint(false);
			}
			this.btn_up.isRedPoint ? this.btn_way.hideFlowEffect():this.btn_way.showFlowEffect("btn",0,0,"common/guide");
		}
	}

	__proto.onWear=function(equip){
		if(equip && equip.getDataBean().q_client_type==110){
			this.updateMenu();
		}
	}

	__proto.onClick=function(e){
		switch(e.currentTarget){
			case this.btn_up:{
					if(this._data==null){
						GameNotice.showMousePosMessage("暂无龙魂数据...");
						return;
					}
					for (var i=0;i < this._data.costs.length;i++){
						var cost=this._data.costs[i];
						var now=BagItemCenter.getItemCount(cost.itemId,false,true);
						var need=cost.count;
						if(now < need){
							PanelOpenManager.openGetwayBuyAndJump(cost.itemId,e.currentTarget);
							return;
						}
					}
					if(!this._data.redPoint){
						this._data.checkPoint();
						this.btn_up.showRedPoint(this._data.redPoint,125,5);
						GameNotice.showMousePosMessage("材料不足...");
						return;
					};
					var equip=this._data.costs[0];
					if(ItemUtil.isEquip(equip.itemId)){
						var item=BagItemCenter.getItemById(equip.itemId);
						if(!item){
							item=WearEquipCenter.getEquipByItemId(equip.itemId);
						}
						if(item){
							DuanzaoServer.sendC2S_EquipFuseMessage(this._data.fuseId,[item]);
							GlobalCenter.point.setTo(360,320);
							GlobalCenter.point=this.localToGlobal(GlobalCenter.point);
							CPlayOnceEffect.play(ResPathUtil.getPanelEffect("success","common"),App.stageLayer.popLayer,GlobalCenter.point.x,GlobalCenter.point.y);
						}
						else{
							GameNotice.showMousePosMessage("请稍等...");
						}
					}
					else{
						DuanzaoServer.sendC2S_EquipFuseMessage(this._data.fuseId);
					}
					break ;
				}
			case this.btn_way:{
					if(this._wayid==0){
						this._wayid=710001;
					}
					if(this._wayid==710001){
						this.updateGetWayRed();
					}
					PanelOpenManager.openGetwayBuyAndJump(this._wayid);
					break ;
				}
			}
	}

	__proto.updateGetWayRed=function(){
		var red=false,ids=JSON.parse(App.dataMgr.q_itemContainer.getDataBean(710001).q_input_intro);
		var id;
		for(var $each_id in ids){
			id=ids[$each_id];
			switch(id){
				case 2:red=VipCenter.vipRed;break ;
				case 8:red=DailyCenter.actRedPoint || DailyCenter.taskRedPoint;break ;
				case 78:red=JieriRedPoint.longhunBoss_red;break ;
				}
			if(red)break ;
		}
		this.btn_way.showRedPoint(red,this.btn_way.width+4,2);
	}

	__proto.onGuide=function(task){
		if(task && task.taskType !=1){
			return;
		}
		if(App.needGuide(28)){
			if(!this._guide){
				this._guide=Guide.getGuide();
				this._guide.showEffect2(this.btn_up);
				this.addEvent("TE.updateTaskTrack",this.onGuide);
			}
		}
		else if(this._guide){
			(PanelManager.getPanel(PanelRegister.LONGHUN)).doCloseGuide(this._guide,null);
		}
	}

	return LongHunView;
})(LongHunPanelUI)


var LongHunCenter=(function(){
	function LongHunCenter(){}
	__class(LongHunCenter,'com.modules.longhun.data.LongHunCenter');
	LongHunCenter.getDataProvider=function(){
		if(LongHunCenter._dataProvider==null || LongHunCenter._dataProvider.length==0){
			LongHunCenter._dataProvider=[];
			var all=App.dataMgr.q_equip_ComposeContainer.getBeansByType(710);
			if(all){
				for (var i=0;i < all.length;i++){
					var data=new LongHunData();
					data.init(all[i]);
					LongHunCenter._dataProvider.push(data);
				}
			}
		}
		return LongHunCenter._dataProvider;
	}

	LongHunCenter.getResId=function(longhunId){
		var itemBean=App.dataMgr.q_itemContainer.getDataBean(longhunId,false);
		if(itemBean){
			return itemBean.q_equip_resource;
		}
		return null;
	}

	LongHunCenter.checkPoint=function(){
		if(!FunctionManager.isFunctionOpen(101)){
			return;
		};
		var redPoint=false;
		var arr=LongHunCenter.getDataProvider();
		for (var i=0;i < arr.length;i++){
			var data=arr[i];
			data.checkPoint();
			if(data.redPoint){
				redPoint=true;
			}
		}
		if(LongHunCenter.red !=redPoint){
			LongHunCenter.red=redPoint;
			App.openStrong(710,LongHunCenter.red);
			EventMgr.dispatch("ET.FUNCTION_TIP",101,LongHunCenter.getSumPoint());
		}
	}

	LongHunCenter.getSumPoint=function(){
		return LongHunCenter.red || ShenYuCenter.data.redPoint;
	}

	LongHunCenter._dataProvider=null;
	LongHunCenter.red=false;
	return LongHunCenter;
})()