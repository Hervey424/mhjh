var NewQiangHuaView=(function(_super){
	function NewQiangHuaView(){
		this._gridDict=null;
		this._gridKeyArr=null;
		this._tipData=null;
		this._part=-1;
		this._targetGrid=null;
		this._enough=false;
		this._cailiao=null;
		this._itemVec=null;
		this._isCurrMax=false;
		this._num=null;
		this._guide=null;
		this._type=10;
		this._parts=EnumEquipType.qianghua_parts;
		NewQiangHuaView.__super.call(this);
		this._tipData=new TipData("ITEM");
		this.next_attr0.isHtml=this.attr0.isHtml=true;
		this.list_menu.itemRender=NewQiangHuaItem;
		this.list_menu.scrollBarAllwaysShow="off";
		this._itemVec=[];
		var item;
		for(var i=0;i < this._parts.length;i++){
			item=new NewQiangHuaItem();
			if(!Browser.onPC){
				item.mouseEnabled=true;
			}
			this._itemVec.push(item);
		}
		this._targetGrid=new DuanzaoGrid(null,EnumImageType.ITEM_56,66,true);
		this._targetGrid.showType=1;
		this._targetGrid.owner=1;
		this._targetGrid.setType(this._type);
		this._targetGrid.move(this.grid.width-this._targetGrid.width >> 1,this.grid.height-this._targetGrid.height >> 1,this.grid);
		this._cailiao={};
		this._num=NumberBitmap.show("qh_level");
		this._num.move(0,0,this.level_num);
	}

	__class(NewQiangHuaView,'com.modules.duanzao.newQiangHua.NewQiangHuaView',_super);
	var __proto=NewQiangHuaView.prototype;
	Laya.imps(__proto,{"com.modules.duanzao.IDuanzaoView":true})
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._gridDict=null;
		this._gridKeyArr=null;
		this._targetGrid=null;
		this._cailiao=null;
		this._num=null;
		this._tipData=null;
		var item;
		for(var $each_item in this._itemVec){
			item=this._itemVec[$each_item];
			item.destroy();
			item=null;
		}
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		this.tip_img.url=ResPathUtil.getImageRes("donot_qh",".png","duanzao");
		EnumPanelHideFlyToTarget.ALLATTR=this.all_btn;
		this.btn.on("click",this,this.onClick);
		this.all_btn.on("click",this,this.onClick);
		this.addEvent("WearEquipCenter.WEAR",this.onWear);
		this.addEvent("WearEquipCenter.UNWEAR",this.onWear);
		this.addEvent("Bag.CHANGE",this.onItemChange);
		this.addEvent("DuanzaoEvent.QINGHUA_CHANGE",this.onSuccess);
		this.addEvent("ET.FUNCTION_TIP",this.onRedPoint);
		this.addEvent("ET.FUNCTION",this.adjustTab);
		this.onRedPoint(22);
		this.adjustTab();
		this.list_menu.renderHandler=GameHandler.create(this,this.renderHandler);
		this.list_menu.selectHandler=GameHandler.create(this,this.selectHandler);
		this.tabBtn.on("change",this,this.selectTabHandler);
		this.tabBtn.selectedIndex=(DuanzaoRedPoint.qianghuaPoint || (DuanzaoRedPoint.qianghuaPoint==DuanzaoRedPoint.qhShenShiPoint))?0:1;
	}

	__proto.hide=function(){
		this._part=-1;
		EventMgr.removeAll(this);
		this.btn.off("click",this,this.onClick);
		this.all_btn.off("click",this,this.onClick);
		this.list_menu.renderHandler=null;
		this.list_menu.selectHandler=null;
		this.list_menu.selectedIndex=-1;
		this.tabBtn.off("change",this,this.selectTabHandler);
		this.tabBtn.selectedIndex=-1;
		this._parts=null;
		this.tip_img.url=null;
		TipMgr.removeTip(this.need_icon);
		PanelManager.closeByClass(PanelRegister.ALLATTR);
		this.clearGuide();
	}

	__proto.onRedPoint=function(id,value){
		(value===void 0)&& (value=false);
		if(id==22){
			this.tabBtn.showRedPointByIndex(0,DuanzaoRedPoint.qianghuaPoint);
			this.tabBtn.showRedPointByIndex(1,DuanzaoRedPoint.qhShenShiPoint);
		}
	}

	__proto.adjustTab=function(){
		var funcIds=[88,193];
		for(var i=0;i < funcIds.length;i++){
			this.tabBtn.setItemVisibleByIndex(i,FunctionManager.isFunctionOpen(funcIds[i]));
		}
		this.tab_one.visible=!FunctionManager.isFunctionOpen(funcIds[1]);
		this.tabBtn.visible=FunctionManager.isFunctionOpen(funcIds[1]);
	}

	__proto.selectTabHandler=function(e){
		var index=this.tabBtn.selectedIndex;
		if(index<0)return;
		this._parts=index==0 ? EnumEquipType.qianghua_parts :EnumEquipType.shenshi_parts;
		this.list_menu.array=this._parts;
		this.list_menu.selectedIndex=-1;
		this.selectJingjie(1000);
		this.listSelect();
		this.showGuide();
	}

	__proto.listSelect=function(){
		var targetGrid=this.getCanOperateMinGrid();
		var flag=this._gridKeyArr.indexOf(targetGrid);
		if(this.list_menu.selectedIndex==flag){
			this.selectHandler(flag);
		}
		this.list_menu.selectedIndex=flag==-1?0:flag;
	}

	__proto.renderHandler=function(cell,index){
		var part=this.list_menu.array[index];
		cell.setInfo(WearEquipCenter.getEquipByPart(part),part);
	}

	__proto.selectHandler=function(index){
		if(index<0)return;
		this._targetGrid.clear();
		this._targetGrid.data=null;
		if(this._itemVec[index].grid && this._itemVec[index].grid.data){
			this._targetGrid.part=this._itemVec[index].grid.part;
			this.selectGrid(this._itemVec[index].grid);
		}
		else{
			this._part=this._targetGrid.part=this._itemVec[index].grid.part;
			this.updateInfo();
		}
	}

	// tip_img.visible=true;
	__proto.onWear=function(itemData){
		var grid=this._gridDict[itemData.part];
		if(grid){
			this.list_menu.updateList();
			this.refreshGrid();
			this.selectDefaultEquip();
		}
	}

	__proto.selectJingjie=function(id){
		this._gridDict={};
		this._gridKeyArr=[];
		var part=0;
		var item;
		var grid;
		var parts=this._parts;
		for(var i=0;i < parts.length;i++){
			part=parts[i];
			item=this._itemVec[i];
			grid=item.grid;
			grid.showType=1;
			grid.part=part;
			this._gridDict[part]=grid;
			this._gridKeyArr.push(item.grid);
		}
		this.refreshGrid();
	}

	// selectDefaultEquip();
	__proto.refreshGrid=function(updateData){
		(updateData===void 0)&& (updateData=true);
		var grid;
		for(var $each_grid in this._gridDict){
			grid=this._gridDict[$each_grid];
			if(updateData){
				grid.data=WearEquipCenter.getEquipByPart(grid.part);
			}
			if(DuanzaoUtil.canQianghuaNewByPart(grid.part,this._type)){
				grid.showOperateFont(1,30);
			}
			else{
				grid.showOperateFont(-1);
			}
		}
	}

	__proto.selectDefaultEquip=function(){
		var targetGrid=this.getCanOperateMinGrid();
		if(targetGrid==null){
			this.clearInfo();
			return true;
		}
		return this.selectGrid(targetGrid);
	}

	__proto.getCanOperateMinGrid=function(){
		var targetGrid;
		var value=0;
		var temp=0;
		var item;
		var parts=this._parts;
		for(var i=0;i < parts.length;i++){
			item=this._itemVec[i];
			if(DuanzaoUtil.canQianghuaNewByPart(item.grid.part,this._type)){
				temp=EquipPartCenter.getPartInfo(item.grid.part).getQianghuaLevel(this._type);
				if(targetGrid==null || temp < value){
					value=temp;
					targetGrid=item.grid;
				}
			}
		}
		if(targetGrid==null){
			for(i=0;i < parts.length;i++){
				item=this._itemVec[i];
				if(item.grid.data !=null){
					temp=EquipPartCenter.getPartInfo(item.grid.part).getQianghuaLevel(this._type);
					if(targetGrid==null || temp < value){
						value=temp;
						targetGrid=item.grid;
					}
				}
			}
		}
		return targetGrid;
	}

	__proto.clearInfo=function(){
		this._part=-1;
		this._enough=false;
		this.name_txt.text="";
		this._targetGrid.clear();
		this.grid_select.visible=this.attr_box.visible=this.level_img.visible=this.next_attr_box.visible=false;
		this.cailiao_box.visible=false;
	}

	__proto.selectGrid=function(grid){
		if(this._part !=grid.part){
			this._part=grid.part;
			var items=[grid.data];
			var index=this._gridKeyArr.indexOf(grid);
			var item;
			if(this.list_menu.getCell(index)){
				item=this.list_menu.getCell(index);
			}
			else{
				var part=this.list_menu.getItem(index);
				item=this._itemVec[this._parts.indexOf(part)];
			};
			var pos=[item.localToGlobal(new Point())];
			var targetPos=this._targetGrid.localToGlobal(new Point());
			targetPos.x+=this._targetGrid.gridSize-56 >> 1;
			targetPos.y+=this._targetGrid.gridSize-56 >> 1;
			ItemFlyToBagEffect.flyToBag(items,pos,EnumImageType.ITEM_56,0,targetPos,false,GameHandler.create(this,this.updateInfo),0.1);
			return true;
		}
		else{
			this.updateInfo();
			return false;
		}
	}

	__proto.updateInfo=function(){
		var itemData=WearEquipCenter.getEquipByPart(this._part);
		if(itemData==null){
			this.name_txt.text="无装备";
			this.name_txt.color=GameHTML.GRAY;
			this._part=this._targetGrid.part;
			this._targetGrid.showPartIcon();
			this.cailiao_box.visible=false;
			this.tip_img.visible=true;
		}
		else{
			this.name_txt.showItemName(itemData.itemId);
			this._targetGrid.data=itemData;
			this.cailiao_box.visible=true;
			this.tip_img.visible=false;
		}
		this._targetGrid.part=this._part;
		this._targetGrid.updateGridInfo();
		this.grid_select.visible=this.attr_box.visible=this.level_img.visible=this.next_attr_box.visible=true;
		var level=EquipPartCenter.getPartInfo(this._part).getQianghuaLevel(this._targetGrid.getType());
		this._num.show(level+'');
		level=this.tabBtn.selectedIndex==0?level:10000+level;
		var bean=App.dataMgr.q_equip_qianghua_newContainer.getDataBean(level,false);
		var next;
		this._isCurrMax=bean.q_next_id==0;
		this.btn.label=this._isCurrMax ? "已满级" :"强化";
		this.cost_txt.visible=this.need_icon.visible=this.need_num.visible=!this._isCurrMax;
		next=App.dataMgr.q_equip_qianghua_newContainer.getDataBean(!this._isCurrMax ? level+1 :level,false);
		var attrs;
		if(level==0 || level==10000){
			attrs=LazyUtil.splitAttr(LazyUtil.getAttrList(next.q_add_attribute1));
			this.attr0.text=LazyUtil.getAttrStr(attrs[0],1,null,true,"#fffffe","#fffffe",false,0)
			+"<br/>"
			+LazyUtil.getAttrStr(attrs[1],1,null,true,"#00ff00","#00ff00",false,0)
		}
		else{
			attrs=LazyUtil.splitAttr(LazyUtil.getAttrList(bean.q_add_attribute1));
			this.attr0.text=LazyUtil.getAttrStr(attrs[0],1)
			+"<br/>"
			+LazyUtil.getAttrStr(attrs[1],1)
		}
		attrs=LazyUtil.splitAttr(LazyUtil.getAttrList(next.q_add_attribute1));
		this.next_attr0.text=LazyUtil.getAttrStr(attrs[0],1)
		+"<br/>"
		+LazyUtil.getAttrStr(attrs[1],1)
		this._cailiao=JSON.parse(next.q_cost_qianghua)[0];
		this.onItemChange();
	}

	__proto.onItemChange=function(ids){
		if(!ids || ids.indexOf(this._cailiao.id)!=-1){
			var has=BagItemCenter.getItemCountJson(this._cailiao,false,false);
			this._enough=has >=this._cailiao.num;
			this.need_icon.url=ResPathUtil.getIcon(ItemUtil.getIcon(this._cailiao.id),EnumImageType.ITEM_40);
			if(this._cailiao){
				this._tipData.data=this._cailiao.id;
				TipMgr.addTip(this.need_icon,this._tipData);
			}
			this.need_num.text=has+"/"+this._cailiao.num;
			this.need_num.color=this._enough ? "#00ff00" :"#ef0605";
			this.btn.showRedPoint(DuanzaoUtil.canQianghuaNewByPart(this._part,this._targetGrid.getType()));
			this.list_menu.updateList();
		}
	}

	__proto.onClick=function(e){
		if(this._part !=-1){
			if(e.currentTarget==this.btn){
				if(this._isCurrMax){
					GameNotice.showMousePosMessage("强化已满级");
					return;
				}
				if(this._enough){
					DuanzaoServer.sendC2S_Qianghua2ItemMessage(this._part,0,10);
				}
				else{
					PanelOpenManager.openGetway(this._cailiao.id,e.currentTarget);
				}
			}
		}
		if(e.currentTarget==this.all_btn){
			PanelOpenManager.open(PanelRegister.ALLATTR,false,false,0,this._type);
		}
	}

	__proto.onSuccess=function(cmd){
		App.sound.playSound("strengthen");
		var grid;
		if(cmd.p==-1){
			for(var i=0;i < cmd.pos.length;i++){
				grid=this._gridDict[cmd.pos[i]];
				if(grid){
					CPlayOnceEffect.play(ResPathUtil.getPanelEffect("qianghua_key_success","duanzao"),grid,grid.width *0.5,grid.height *0.5);
				}
			}
		}
		else{
			grid=this._gridDict[cmd.p];
			if(grid){
				CPlayOnceEffect.play(ResPathUtil.getPanelEffect("qianghua_success","duanzao"),this,this.grid_select.x+this.grid_select.width *0.5,this.grid_select.y+this.grid_select.height *0.5);
			}
		}
		this._targetGrid.updateGridInfo();
		this.refreshGrid(false);
		this.listSelect();
	}

	__proto.showGuide=function(task){
		if(task && task.taskType !=1){
			return;
		}
		if(App.needGuide(7)){
			if(!this._guide){
				TaskAuto.taskAutoOrStop(true,false,this.className);
				this.addEvent("TE.updateTaskTrack",this.showGuide);
				this._guide=Guide.getGuide();
				this._guide.showEffect2(this.btn,this);
			}
			App.timer.doTimeOnce(this,TaskModel.getGuideStayLength(),this.autoGuide);
		}
		else if(this._guide){
			PanelManager.getPanel(PanelRegister.DUANZAO).doCloseGuide(this._guide,null);
		}
	}

	__proto.autoGuide=function(){
		Event.EMPTY.setTo("click",this.btn,this.btn);
		this.onClick(Event.EMPTY);
	}

	__proto.clearGuide=function(){
		if(this._guide){
			App.timer.clearTimer(this,this.autoGuide);
			this._guide.hide();
			this._guide=null;
		}
	}

	return NewQiangHuaView;
})(NewQianghuaViewUI)