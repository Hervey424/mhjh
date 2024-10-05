var JinglianView=(function(_super){
	function JinglianView(){
		this._gridDict=null;
		this._gridKeyArr=null;
		this._tipData=null;
		this._part=-1;
		this._targetGrid=null;
		this._enough=false;
		this._cailiao=null;
		this._itemVec=null;
		this._isCurrMax=false;
		this._starCon=null;
		this._type=11;
		this._parts=EnumEquipType.qianghua_parts;
		this._allParts=EnumEquipType.qianghua_parts.concat(EnumEquipType.shenshi_parts);
		JinglianView.__super.call(this);
		this.next_attr0.isHtml=this.attr0.isHtml=true;
		this._tipData=new TipData("ITEM");
		this.list_menu.itemRender=JinglianItem;
		this.list_menu.scrollBarAllwaysShow="off";
		this.left_panel.vScrollBarAllwaysShow="off";
		this.right_panel.vScrollBarAllwaysShow="off";
		this._starCon=new StarContainer(25,125);
		this._starCon.move(0,0,this.star_box);
		this._itemVec=[];
		var item;
		for(var i=0;i < this._parts.length;i++){
			item=new JinglianItem();
			if(!Browser.onPC){
				item.mouseEnabled=true;
			}
			this._itemVec.push(item);
		}
		this._targetGrid=new DuanzaoGrid(null,EnumImageType.ITEM_56,66,true);
		this._targetGrid.showType=6;
		this._targetGrid.owner=1;
		this._targetGrid.setType(this._type);
		this._targetGrid.move(this.grid.width-this._targetGrid.width >> 1,this.grid.height-this._targetGrid.height >> 1,this.grid);
		this._cailiao={};
	}

	__class(JinglianView,'com.modules.duanzao.jinglian.JinglianView',_super);
	var __proto=JinglianView.prototype;
	Laya.imps(__proto,{"com.modules.duanzao.IDuanzaoView":true})
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._gridDict=null;
		this._gridKeyArr=null;
		this._targetGrid=null;
		this._cailiao=null;
		this._parts=null;
		this._allParts=null;
		this._starCon=null;
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
		this.tip_img.url=ResPathUtil.getImageRes("donot_jl",".png","duanzao");
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
		this.tabBtn.selectedIndex=(DuanzaoRedPoint.jinglianPoint || (DuanzaoRedPoint.jinglianPoint==DuanzaoRedPoint.jlShenShiPoint))? 0 :1;
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
		this.part_img.url=null;
		TipMgr.removeTip(this.need_icon);
		PanelManager.closeByClass(PanelRegister.ALLATTR);
	}

	__proto.onRedPoint=function(id,value){
		(value===void 0)&& (value=false);
		if(id==22){
			this.tabBtn.showRedPointByIndex(0,DuanzaoRedPoint.jinglianPoint);
			this.tabBtn.showRedPointByIndex(1,DuanzaoRedPoint.jlShenShiPoint);
		}
	}

	__proto.adjustTab=function(){
		var funcIds=[87,345];
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
	}

	__proto.listSelect=function(){
		var targetGrid=this.getCanOperateMinGrid();
		var flag=this._gridKeyArr.indexOf(targetGrid);
		if(this.list_menu.selectedIndex==flag){
			this.selectDefaultEquip();
		}
		this.list_menu.selectedIndex=flag==-1?0:flag;
	}

	__proto.renderHandler=function(cell,index){
		var part=this.list_menu.array[index];
		cell.setInfo(WearEquipCenter.getEquipByPart(part),part);
	}

	__proto.selectHandler=function(index){
		if(index<0)return;
		if(this._itemVec[index].grid && this._itemVec[index].grid.data){
			this.selectGrid(this._itemVec[index].grid);
		}
		else{
			this._targetGrid.data=null;
			this._part=this._targetGrid.part=this._itemVec[index].grid.part;
			this._targetGrid.showPartIcon();
			this._starCon.visible=this.grid_select.visible=this.attr_box.visible=this.next_attr_box.visible=false;
			this.cailiao_box.visible=false;
			this.tip_img.visible=true;
		}
		this.part_img.url=ResPathUtil.getImageRes("part_"+this._part,".png","duanzao/jinglian");
	}

	__proto.onWear=function(itemData){
		var grid=this._gridDict[itemData.part];
		if(grid){
			this.refreshGrid();
			this.selectDefaultEquip();
			this.list_menu.updateList();
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
			grid.showType=6;
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
			if(DuanzaoUtil.canJinglianByPart(item.grid.part,this._type)){
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
		this._targetGrid.clear();
		this._starCon.visible=this.grid_select.visible=this.attr_box.visible=this.next_attr_box.visible=false;
		this.cailiao_box.visible=false;
	}

	__proto.selectGrid=function(grid){
		if(this._part !=grid.part){
			this._part=grid.part;
			this._targetGrid.clear();
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
			this.clearInfo();
		}
		else{
			this._targetGrid.part=this._part;
			this._targetGrid.data=itemData;
			this._targetGrid.updateGridInfo();
			this.setStarNum();
			this.grid_select.visible=this.attr_box.visible=this.next_attr_box.visible=true;
			this.cailiao_box.visible=true;
			this.tip_img.visible=false;
			var level=EquipPartCenter.getPartInfo(this._part).getQianghuaLevel(this._targetGrid.getType());
			var bean=App.dataMgr.q_equip_jinglianContainer.getDataBean(this._allParts.indexOf(this._targetGrid.part)+1,false);
			this._isCurrMax=bean.q_maxlv==level;
			this.btn.label=this._isCurrMax ? "已满级" :"精炼";
			this._starCon.visible=level !=bean.q_maxlv;
			this.cost_txt.visible=this.need_icon.visible=this.need_num.visible=!this._isCurrMax;
			var attrs;
			attrs=LazyUtil.splitAttr(LazyUtil.getAttrList(bean.q_add_attribute1));
			this.attr0.text=LazyUtil.getAttrStr(attrs[0],1,null,true,"#fffffe","#fffffe",false,level)
			+"<br/>"
			+LazyUtil.getAttrStr(attrs[1],1,null,true,"#fffffe","#fffffe",false,level)
			+(LazyUtil.getAttrStr(attrs[1],1,null,true,"#00ff00","#00ff00",false,level)!=""?"<br/>":"")
			+GameHTML.setColor(EnumEquipType.getEquipTypeName(this._targetGrid.part)+"基础属性+ "+(Number(bean.q_equip_percent*level / 100)+"%"),"#ef0605");
			level=this._isCurrMax ? level :level+1;
			this.next_attr0.text=LazyUtil.getAttrStr(attrs[0],1,null,true,"#00ff00","#00ff00",false,level)
			+"<br/>"
			+LazyUtil.getAttrStr(attrs[1],1,null,true,"#00ff00","#00ff00",false,level)
			+(LazyUtil.getAttrStr(attrs[1],1,null,true,"#00ff00","#00ff00",false,level)!=""?"<br/>":"")
			+GameHTML.setColor(EnumEquipType.getEquipTypeName(this._targetGrid.part)+"基础属性+ "+(Number(bean.q_equip_percent*level / 100)+"%"),"#ef0605");
			this.attr0.height=this.attr0.getHeight();
			this.next_attr0.height=this.next_attr0.getHeight();
			this.left_panel.scrollTo(0,0);
			this.right_panel.scrollTo(0,0);
			this._cailiao=JSON.parse(bean.q_cost_jinglian)[0];
			this.onItemChange();
		}
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
			this.btn.showRedPoint(DuanzaoUtil.canJinglianByPart(this._part,this._targetGrid.getType()));
			this.list_menu.updateList();
		}
	}

	__proto.onClick=function(e){
		if(this._part !=-1){
			if(e.currentTarget==this.btn){
				if(this._isCurrMax){
					GameNotice.showMousePosMessage("精炼已满级");
					return;
				}
				if(this._enough){
					DuanzaoServer.sendC2S_Qianghua2ItemMessage(this._part,0,11);
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
				this.setStarNum(true);
			}
		}
		this._targetGrid.updateGridInfo();
		this.refreshGrid(false);
		this.listSelect();
	}

	__proto.setStarNum=function(flag){
		(flag===void 0)&& (flag=false);
		var level=EquipPartCenter.getPartInfo(this._part).getQianghuaLevel(this._targetGrid.getType());
		this._starCon.setNum(level%40,10,flag,true,1);
	}

	return JinglianView;
})(JinglianViewUI)