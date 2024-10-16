var JiaoyiPanel=(function(_super){
	function JiaoyiPanel(){
		this._view=null;
		this._other=null;
		this._grids=null;
		this._isPC=false;
		this._gouDic=null;
		this._bags=null;
		this._items=null;
		JiaoyiPanel.__super.call(this);
	}

	__class(JiaoyiPanel,'com.modules.jiaoyi.JiaoyiPanel',_super);
	var __proto=JiaoyiPanel.prototype;
	__proto.isESC=function(){return false;}
	__proto.init=function(){
		this._view=new JiaoyiPanelUI();
		this.addChild(this._view);
		this._view.b_list.renderHandler=GameHandler.create(this,this.onRenFunBag);
		this._view.b_list.scrollBarAllwaysShow="off";
		this._view.b_list.itemRender=JiaoyiGrid;
		this._isPC=Browser.onPC;
		this._view.btnGou.visible=!this._isPC;
		this._other=[];
		this._grids=[];
		for(var i=0;i < 12;i++){
			this._other.push(new JiaoyiGrid());
			this._other[i].place=0;
			this._other[i].move(438+i % 6 *74,116+(i / 6 >> 0)*74,this);
			this._grids.push(new JiaoyiGrid());
			this._grids[i].place=25;
			this._grids[i].move(i % 6 *74,(i / 6 >> 0)*74,this._view.m_box);
		}
		this.addChild(this._view.o_lockBox);
	}

	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._other=null;
		this._grids=null;
		this._view=null;
		_super.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		_super.prototype.show.call(this);
		this._bags=JSON.parse(App.dataMgr.q_globalContainer.getDataBean(15101).q_string_value);
		this.addEvent("BagOtherItemCenter.CHANGE",this.onOtherBag);
		this.addEvent("BagOtherItemCenter.ADD",this.onOtherBag);
		this.addEvent("Bag.CHANGE",this.updateBag);
		this.addEvent("DealCenter.ITEM",this.onItem);
		this.addEvent("DealCenter.DEAL",this.onDeal);
		this._view.bg.skin=ResPathUtil.getImageRes("bg_jiaoyi",".jpg","mall");
		this._view.title.skin=ResPathUtil.getImageRes("jiaoyi",".png","mall");
		this._view.o_jiaoyi.skin=ResPathUtil.getImageRes("yiqueren",".png","mall");
		this._view.o_lock.skin=ResPathUtil.getImageRes("lock",".png","mall");
		this._view.m_lock.skin=this._view.o_lock.skin;
		this._view.m_jiaoyi.skin=this._view.o_jiaoyi.skin;
		this._view.b_list.content.on("click",this,this.onClickBag);
		this._view.btnSend.on("click",this,this.onClick);
		this._view.btnLock.on("click",this,this.onClick);
		this._view.btnGou.on("click",this,this.onClick);
		this._view.m_box.on("click",this,this.onClick);
		this._view.o_lockBox.visible=false;
		this._view.m_lockBox.visible=false;
		this._view.o_jiaoyi.visible=false;
		this._view.m_jiaoyi.visible=false;
		this._view.b_list.scrollTo(0);
		this._view.op_nameTxt.text=data;
		this._gouDic={};
		this._items={};
		this.updateBag();
		this.onOtherBag();
	}

	__proto.hide=function(){
		_super.prototype.hide.call(this);
		EventMgr.removeAll(this);
		this._view.b_list.content.off("click",this,this.onClickBag);
		this._view.btnSend.off("click",this,this.onClick);
		this._view.btnLock.off("click",this,this.onClick);
		this._view.btnGou.off("click",this,this.onClick);
		this._view.m_box.off("click",this,this.onClick);
		this._view.o_jiaoyi.skin=null;
		this._view.m_jiaoyi.skin=null;
		this._view.o_lock.skin=null;
		this._view.m_lock.skin=null;
		this._view.bg.skin=null;
		this._gouDic=null;
		this._items=null;
		this._bags=null;
	}

	__proto.onItem=function(cmd){
		var isMe=cmd.playerId.toString()==App.role.personId;
		if(cmd.type==2){
			isMe ? this._view.m_lockBox.visible=true :this._view.o_lockBox.visible=true;
			GameNotice.showMiddleMessage(GameHTML.setColor(isMe ? "您已锁定交易" :"对方已锁定交易","#ffff00"));
		}
		else{
			var item=new ItemData(cmd.itemInfo);
			var grid,gou,grids=isMe ? this._grids :this._other;
			for(var i=0;i < 12;i++){
				grid=grids[i];
				if(cmd.type==0){
					if(!grid.data){
						grid.data=item;
						this._gouDic[item.id]=true;
						break ;
					}
				}
				else if(grid.data && grid.data.id==item.id){
					delete this._gouDic[item.id];
					grid.clear();
					break ;
				}
			}
			for(i=0;i < this._view.b_list.content.numChildren;i++){
				grid=this._view.b_list.content.getChildAt(i);
				if(grid.data && grid.data.id==item.id){
					grid.gou=Boolean(this._gouDic[grid.data.id]);
					break ;
				}
			}
		}
	}

	__proto.onClick=function(e){
		if(GameUtils.isDead()){
			return;
		};
		var grid;
		switch(e.currentTarget){
			case this._view.btnSend:
				if(this._view.o_lockBox.visible && this._view.m_lockBox.visible){
					if(!this._view.m_jiaoyi.visible){
						DealCenter.sendC2S_ConfirmTransactionMessage();
					}
				}
				else{
					GameNotice.showMousePosMessage("双方锁定后方可交易");
				}
				break ;
			case this._view.btnLock:
				if(!this._view.m_lockBox.visible){
					DealCenter.sendC2S_AddTransactionItemMessage(2,null);
				}
				break ;
			case this._view.btnGou:;
				var isGou=this._view.btnGou.selected;
				var $each_grid;
				for($each_grid in this._grids){
					grid=this._grids[$each_grid];
					grid.tipEnabled=!isGou;
				}
				for(var i=0;i < this._view.b_list.content.numChildren;i++){
					grid=this._view.b_list.content.getChildAt(i);
					grid.tipEnabled=!isGou;
				}
				break ;
			default :
				if(this._view.btnGou.visible && !this._view.btnGou.selected){
					return;
				}
				grid=e.target;
				if(grid && grid.data){
					if(this._isPC || this._view.btnGou.selected){
						DealCenter.sendC2S_AddTransactionItemMessage(1,grid.data.id);
						if(!this._isPC){
							e.stopImmediatePropagation();
						}
					}
				}
				break ;
			}
	}

	__proto.updateBag=function(ids){
		var data,items=[],bags=BagItemCenter.itemList;
		for(var i=0;i < bags.length;i++){
			data=bags[i];
			if(data && !data.isbind && !data.islock){
				items.push(data);
			}
		}
		this._items[1]=items;
		if(ids){
			this.showBag();
		}
	}

	__proto.onOtherBag=function(type,bool){
		(type===void 0)&& (type=0);
		(bool===void 0)&& (bool=true);
		var i=0;
		if(type > 0){
			if(this._bags.indexOf(type)< 1){
				return;
			};
			var items=[],vec=BagOtherItemCenter.getList(type);
			if(vec){
				for(i=0;i < vec.length;i++){
					if(vec[i] && !vec[i].isbind && !vec[i].islock){
						items.push(vec[i]);
					}
				}
				this._items[type]=items;
			}
			if(bool){
				this.showBag();
			}
		}
		else{
			for(i=1;i < this._bags.length;i++){
				this.onOtherBag(this._bags[i],i==this._bags.length-1);
			}
		}
	}

	__proto.showBag=function(){
		var items=this._items[1];
		for(var i=1;i < this._bags.length;i++){
			if(this._items[this._bags[i]]){
				items=items.concat(this._items[this._bags[i]]);
			}
		}
		if(items.length < 30){
			items.length=30;
		}
		this._view.b_list.array=items;
	}

	__proto.onClickBag=function(e){
		if(GameUtils.isDead()){
			return;
		};
		var grid=e.target;
		if(!this._view.btnGou.visible || this._view.btnGou.selected){
			if(grid && grid.data){
				if(this._isPC || this._view.btnGou.selected){
					DealCenter.sendC2S_AddTransactionItemMessage(0,grid.data.id);
					if(!this._isPC){
						e.stopImmediatePropagation();
					}
				}
			}
		}
	}

	__proto.onDeal=function(isMe){
		isMe ? this._view.m_jiaoyi.visible=true :this._view.o_jiaoyi.visible=true;
		GameNotice.showMiddleMessage(GameHTML.setColor(isMe ? "您已确认交易" :"对方已确认交易","#ffff00"));
	}

	__proto.onRenFunBag=function(grid,index){
		if(!this._gouDic)return;
		grid.data=this._view.b_list.array[index];
		grid.gou=grid.data && this._gouDic[grid.data.id];
	}

	__proto.onClose=function(e){
		DealCenter.sendC2S_SuspendTransactionMessage();
		_super.prototype.onClose.call(this,e);
	}

	return JiaoyiPanel;
})(BasePanel)