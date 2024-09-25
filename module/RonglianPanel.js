var RonglianPanel=(function(_super){
	function RonglianPanel(){
		this._view=null;
		this._grids=null;
		this._isSend=false;
		this._gouDic=null;
		this._ids=null;
		this._bt_num=0;
		this._m_val=0;
		this._m_id=0;
		this._num=0;
		RonglianPanel.__super.call(this);
	}

	__class(RonglianPanel,'com.modules.bag.ronglian.RonglianPanel',_super);
	var __proto=RonglianPanel.prototype;
	__proto.init=function(){
		this._view=new RonglianPanelUI();
		this._view.p_list.scrollBarAllwaysShow="off";
		this._view.p_list.renderHandler=GameHandler.create(this,this.onRenItem);
		this._view.p_list.itemRender=JiaoyiGrid;
		this.addChild(this._view);
		this._grids=[];
		var xys=[[281,162],[283,361],[62,280],[500,280],[122,120],[440,120],[122,440],[440,440]];
		for(var i=0;i < 8;i++){
			this._grids.push(new ItemGrid(i < 2 ? null :"grid_62_1",EnumImageType.ITEM_56,66));
			this._grids[i].move(xys[i][0],xys[i][1],this);
		}
		TipMgr.addTip(this._view.tipBox,new TipData("TEXT",TipDescUtil.getTextTipDesc(721)));
		this._view.btnClick.visible=!Browser.onPC;
		this._view.btnClick.selected=this._view.btnClick.visible;
		this._view.btnAuto.x=this._view.btnClick.visible ? 640 :706;
	}

	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		TipMgr.removeTip(this._view.tipBox);
		this._gouDic=null;
		this._grids=null;
		this._view=null;
		_super.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		_super.prototype.show.call(this);
		this._gouDic={};
		this._view.title.skin=ResPathUtil.getImageRes("title_ronglian1",".png","bag");
		this._view.btnSetup.skin=ResPathUtil.getImageRes("btn_setup",".png","bag");
		this._view.bg.skin=ResPathUtil.getImageRes("bg_ronglian",".jpg","bag");
		this._view.p_list.content.on("click",this,this.onClickGrid);
		this._view.btnSetup.on("click",this,this.onClick);
		this._view.btnClick.on("click",this,this.onClick);
		this._view.btnAuto.on("click",this,this.onClick);
		this._view.btnAdd.on("click",this,this.onClick);
		this._view.btnRL.on("click",this,this.onClick);
		this._view.btnBT.on("click",this,this.onClick);
		this.addEvent("HSC.RONGLIAN_AUTO",this.onAuto);
		this.addEvent("HSC.RONGLIAN_SET",this.onSet);
		this.addEvent("MoneyEvent.CHANGE",this.onMoney);
		this.addEvent("Bag.CHANGE",this.onChange);
		var ids=JSON.parse(App.dataMgr.q_globalContainer.getDataBean(15158).q_string_value);
		for(var i=0;i < 8;i++){
			this._grids[i].itemId=ids[i];
		}
		this.update();
		this.onAuto();
	}

	__proto.hide=function(){
		_super.prototype.hide.call(this);
		EventMgr.removeAll(this);
		this.clearTimer(this,this.update);
		this._view.p_list.content.off("click",this,this.onClickGrid);
		this._view.btnSetup.off("click",this,this.onClick);
		this._view.btnAuto.off("click",this,this.onClick);
		this._view.btnAdd.off("click",this,this.onClick);
		this._view.btnRL.off("click",this,this.onClick);
		this._view.btnBT.off("click",this,this.onClick);
		this._view.btnSetup.skin=null;
		this._view.title.skin=null;
		this._view.bg.skin=null;
		this._ids=null;
	}

	__proto.update=function(){
		this._ids={};
		var item,ebean,datas=[],bags=BagItemCenter.itemList;
		for(var i=0;i < bags.length;i++){
			item=bags[i];
			if(!item)continue ;
			ebean=item.getEquipDataBean();
			if(ebean && ebean.q_smelt_reward){
				datas.push(item);
				this._ids[item.id]=true;
			}
		}
		datas.length=datas.length < 24 ? 24 :Math.ceil(datas.length / 4)*4;
		this._view.p_list.array=datas;
		this.onSet(false);
	}

	__proto.onClick=function(e){
		if(e.currentTarget==this._view.btnSetup){
			PanelManager.openByClass(RonglianSetupPanel);
		}
		else if(e.currentTarget==this._view.btnBT){
			PanelOpenManager.openBaitan(null,1);
		}
		else if(e.currentTarget==this._view.btnAuto){
			if(FunctionManager.isFunctionOpen(343)){
				HuishouCenter.isAutoSmelt=this._view.btnAuto.selected;
			}
			else{
				this._view.btnAuto.selected=false;
				PanelOpenManager.openPanelById(1220004);
			}
		}
		else if(e.currentTarget==this._view.btnAdd){
			if(this._m_id !=0){
				PanelOpenManager.openGetwayBuyAndJump(this._m_id);
			}
		}
		else if(e.currentTarget==this._view.btnClick){
			var grid;
			for(var $each_grid in this._view.p_list.cells){
				grid=this._view.p_list.cells[$each_grid];
				grid.tipEnabled=!this._view.btnClick.selected;
			}
		}
		else if(e.currentTarget==this._view.btnRL){
			if(this._num < 1){
				GameNotice.showMousePosMessage("点击装备勾选后可熔炼");
				return;
			}
			if(this._view.btnRL.tag){
				return;
			};
			var ids=[];
			var item;
			for(var $each_item in this._gouDic){
				item=this._gouDic[$each_item];
				ids.push(Int64.parseInt64(item.id));
			}
			if(ids.length > 0){
				this._isSend=true;
				HuishouCenter.sendC2S_EquipHuiShouMessage(ids,1,1);
			}
		}
	}

	__proto.onClickGrid=function(e){
		if(this._view.btnClick.visible && !this._view.btnClick.selected){
			return;
		};
		var grid=e.target;
		if(grid && grid.data){
			grid.gou=!grid.gou;
			if(grid.gou){
				this._gouDic[grid.data.id]=grid.data;
			}
			else{
				delete this._gouDic[grid.data.id];
			}
			this.updateCost();
		}
	}

	__proto.updateCost=function(){
		this._num=0;
		this._m_id=0;
		this._m_val=0;
		var temp;
		var item;
		for(var $each_item in this._gouDic){
			item=this._gouDic[$each_item];
			if(this._ids[item.id]){
				this._num++;
				if(item.getEquipDataBean().q_smelt_cost){
					temp=JSON.parse(item.getEquipDataBean().q_smelt_cost)[0];
					this._m_id=temp.id;
					this._m_val+=temp.num;
				}
			}
			else{
				delete this._gouDic[item.id];
			}
		}
		this._view.c_txt.visible=this._m_id !=0;
		this._view.btnAdd.visible=this._view.c_txt.visible;
		if(this._view.c_txt.visible){
			this._view.c_icon.skin=ResPathUtil.getIcon(ItemUtil.getIcon(this._m_id),EnumImageType.ITEM_20);
			this.onMoney(this._m_id,BagItemCenter.getItemCount(this._m_id));
		}
		else{
			this._view.btnRL.tag=false;
		}
	}

	__proto.onRenItem=function(grid,index){
		grid.place=1;
		grid.data=this._view.p_list.array[index];
		grid.tipEnabled=!this._view.btnClick.visible || !this._view.btnClick.selected;
		if(grid.data !=null && this._gouDic[grid.data.id] !=null){
			grid.gou=true;
			}else{
			grid.gou=false;
		}
	}

	__proto.onMoney=function(id,value){
		if(this._view.c_txt.visible && id==this._m_id){
			this._view.btnRL.tag=value < this._m_val;
			this._view.c_txt.text=GameHTML.setColor(StringFormat.formatMoney(value),value < this._m_val ? "#ef0605" :"#00ff00")+'/'+StringFormat.formatMoney(this._m_val);
			this._view.c_txt.x=this._view.btnRL.x-(this._view.c_txt.width-24 >> 1);
		}
	}

	__proto.onSet=function(change){
		(change===void 0)&& (change=true);
		if(change){
			this._gouDic={};
		}
		this._bt_num=0;
		var bean,job=App.role.job,sex=App.role.sex,isSex=HuishouCenter.isRLOtherSex;
		var item;
		for(var $each_item in this._view.p_list.array){
			item=this._view.p_list.array[$each_item];
			if(!item)continue ;
			bean=item.getDataBean();
			if(bean.q_job !=job && bean.q_job !=0){
				this._bt_num++;
			}
			else if(bean.q_sex !=0 && bean.q_sex !=sex){
				this._bt_num++;
				if(isSex){
					this._gouDic[item.id]=item;
					continue ;
				}
			}
			if(HuishouCenter.isAutoSmeltByRank(bean.q_job,item.rank)){
				this._gouDic[item.id]=item;
			}
		}
		if(change){
			this._view.p_list.refresh();
		}
		this._view.bt_txt.text="非本职业的极品装备可在摆摊处上架"+GameHTML.setColor("("+this._bt_num+"件可上架)","#00ff00");
		this._view.bt_txt.x=318-(this._view.bt_txt.width+this._view.btnBT.width >> 1);
		this._view.btnBT.x=this._view.bt_txt.x+this._view.bt_txt.width;
		this.updateCost();
	}

	__proto.onChange=function(ids){
		if(this._isSend){
			this._isSend=false;
			this._gouDic={};
		}
		this.timerOnce(200,this,this.update);
	}

	__proto.onAuto=function(){
		this._view.btnAuto.selected=HuishouCenter.isAutoSmelt;
	}

	return RonglianPanel;
})(BasePanel)