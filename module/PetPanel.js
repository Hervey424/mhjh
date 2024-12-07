var PetPanel=(function(_super){
	function PetPanel(){
		this._view=null;
		this._curView=null;
		this._param=null;
		this._old_index=0;
		this._old_guide=0;
		this._guide=null;
		this._funView=null;
		this._funIds=null;
		PetPanel.__super.call(this);
		this._height+=50;
	}

	__class(PetPanel,'com.modules.pet.PetPanel',_super);
	var __proto=PetPanel.prototype;
	__proto.init=function(){
		this._viewDict={};
		this._view=new PetPanelUI();
		this.addChild(this._view);
	}

	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._view=null;
		_super.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		_super.prototype.show.call(this);
		this._view.title.skin=ResPathUtil.getImageRes("title",".png","pet");
		this._view.bg1.skin=ResPathUtil.getImageRes("bg",".png","pet");
		this._view.bg2.skin=this._view.bg1.skin;
		this._view.tabs.on("change",this,this.onTab);
		this.addEvent(ShenShiCenter.YUANSHENDIAN,this.onUpdateTab);
		this.addEvent("ET.FUNCTION_OPEN",this.onFunction);
		this.addEvent("ET.FUNCTION_TIP",this.updateRed);
		this.addEvent("Master.UPDATE",this.onUpdateTab);
		this.addEvent("Bag.CHANGE",this.onUpdateTab);
		this.addEvent("PetCenter.GUIDE",this.onGuide);
		this.onUpdateTab();
		this.onGuide();
	}

	__proto.hide=function(){
		_super.prototype.hide.call(this);
		EventMgr.removeAll(this);
		this._view.tabs.selectedIndex=-1;
		this._view.tabs.off("change",this,this.onTab);
		this._view.title.skin=null;
		this._view.bg1.skin=null;
		this._view.bg2.skin=null;
		this._view.bg.skin=null;
		this._funIds=null;
		this._old_index=0;
		if(PetCenter.g_index > 0){
			App.mainProxy.onGuide(10,true);
		}
		else if(this._guide){
			this.clearGuide();
			TaskAuto.taskAutoOrStop(false,true,this.className);
			EventMgr.dispatch(TaskEvent.TASK_AUTO_RUN_NEXT_STEP);
		}
	}

	__proto.updatePanel=function(data,tab){
		(tab===void 0)&& (tab=-1);
		this._param=data;
		if(this._view.tabs.visible){
			if(tab < 0){
				tab=this._view.tabs.getRedPointFirstIndex();
			}
			this._view.tabs.selectedIndex=tab < 0 ? 0 :tab;
		}
	}

	__proto.onTab=function(e){
		if(this._curView){
			this._curView.hide();
			(this._curView).visible=true;
			(this._curView).removeSelf();
			this._curView=null;
		};
		var index=this._view.tabs.selectedIndex;
		if(index==-1)return;
		var index2=index;
		if(index==1 || index==2 || index==3){
			index2=1;
		}
		this._curView=this._viewDict[index2];
		if(!this._curView){
			switch(index2){
				case 0:
					this._curView=new YuanshenDianView();
					break ;
				case 1:
					this._curView=new HuanshenView();
					break ;
				case 4:
					this._curView=new YuanshenJibanView();
					break ;
				case 5:
					this._curView=new PetZhenfaView();
					break ;
				}
			(this._curView).pos(103,96);
			this._viewDict[index2]=this._curView;
		}
		if(this._curView){
			this.addChild(this._curView);
			if(index==this._old_index-1){
				this.clearGuide();
			}
			this._view.bg.skin=ResPathUtil.getImageRes("bg"+index2,".jpg","pet");
			if(index2==1){
				this._curView.show(null,index-1);
			}
			else{
				this._curView.show(this._param);
			}
		}
		this._param=null;
	}

	__proto.updateRed=function(funId,value){
		(value===void 0)&& (value=false);
		if(funId==15){
			this._view.tabs.showRedPointByIndex(0,ShenShiCenter.yuanshendianRed || PetCenter.redtab10,70,22);
			this._view.tabs.showRedPointByIndex(1,myparseInt(PetCenter.pet_red[PetCenter.PET_FUNS[0]])!=0 || SkillCenter.getYuanShenPoint(),70,22);
			this._view.tabs.showRedPointByIndex(2,myparseInt(PetCenter.pet_red[PetCenter.PET_FUNS[1]])!=0 || SkillCenter.getYuanShenPoint(),70,22);
			this._view.tabs.showRedPointByIndex(3,myparseInt(PetCenter.pet_red[PetCenter.PET_FUNS[2]])!=0 || SkillCenter.getYuanShenPoint(),70,22);
			this._view.tabs.showRedPointByIndex(4,PetCenter.jibanRed,70,22);
			this._view.tabs.showRedPointByIndex(5,PetCenter.zhenfa_red > 0,70,22);
		}
	}

	__proto.onFunction=function(funId,isOpen){
		(isOpen===void 0)&& (isOpen=true);
		if(EnumFunctionId.PET.indexOf(funId)< 0){
			return;
		}
		if(isOpen && this._funIds){
			var index=this._funIds.indexOf(funId);
			if(index >=0){
				this._funIds.splice(index,1);
				this.isOpenFun();
			}
		}
		for(var i=0;i < EnumFunctionId.PET.length;i++){
			isOpen=FunctionManager.isFunctionOpen(EnumFunctionId.PET[i]);
			if(EnumFunctionId.PET[i]==43){
				this._view.tabs.setItemVisibleByIndex(i,isOpen || this._view.tabs.getItemVisibleByIndex(2));
				(this._view.tabs.getItem(i)).gray=!isOpen;
			}
			else{
				this._view.tabs.setItemVisibleByIndex(i,isOpen);
			}
		}
	}

	__proto.onUpdateTab=function(ids){
		this._funIds=[];
		var bean;
		for(var i=0;i < PetCenter.PET_FUNS.length;i++){
			if(!FunctionManager.isFunctionOpen(PetCenter.PET_FUNS[i])){
				bean=App.dataMgr.q_functionContainer.getDataBean(PetCenter.PET_FUNS[i]);
				if(bean.q_open_needs){
					if(ConditionUtil.isItemEnoughJson(bean.q_open_needs)){
						this._funIds.push(bean.q_function_id);
					}
				}
				else if(ConditionUtil.isConditionEnoughJson(bean.q_open_demand)){
					this._funIds.push(bean.q_function_id);
				}
			}
    }
    console
		this.isOpenFun();
	}

	__proto.onGuide=function(){
		if(PetCenter.g_index !=this._old_index){
			if(!this._guide){
				this._guide=Guide.getGuide();
			}
			if(PetCenter.g_index > 0){
				if(PetCenter.g_index-1 !=this._view.tabs.selectedIndex){
					this._guide.showEffect2(this._view.tabs.getItem(PetCenter.g_index-1));
					App.mainProxy.onGuide(10,false);
					TaskAuto.taskAutoOrStop(true,false,this.className);
				}
			}
			else if(this._old_guide !=24){
				this.doCloseGuide(this._guide,null);
			}
			this._old_guide=PetCenter.guideId;
			this._old_index=PetCenter.g_index;
		}
	}

	__proto.clearGuide=function(){
		if(this._guide){
			this._guide.hide();
			this._guide=null;
		}
	}

	__proto.isOpenFun=function(){
		this._view.tabs.visible=this._funIds.length==0;
		if(this._curView){
			(this._curView).visible=this._view.tabs.visible;
		}
		if(this._view.tabs.visible){
			this.onFunction(15,false);
			this.updateRed(15);
			if(this._funView){
				this._funView.destroy();
				this._funView=null;
			}
			if(this._view.tabs.selectedIndex < 0){
				this._view.tabs.selectedIndex=0;
			}
		}
		else{
			if(!this._funView){
				this._funView=new PetCallPanel();
				this._funView.move(103,96,this);
			}
			else{
				this._funView.update();
			}
		}
	}

	return PetPanel;
})(BasePanel)