var BossLianyuView=(function(_super){
	function BossLianyuView(){
		this._grids=null;
		this._heads=null;
		this._boxGrids=null;
		this._boxGet=null;
		this._monster=null;
		this._boxbg=null;
		this._beans=null;
		this._mapid=0;
		this._type=null;
		this._actItem=null;
		this._isActOpen=false;
		this._costs=null;
		this._curr=null;
		this._zone=null;
		this._isSweep=false;
		this._isOpen=false;
		this._isSend=0;
		this._tab=0;
		BossLianyuView.__super.call(this);
		this._heads=[];
		this._grids=new ShowItemListBigGrid(6,this,340,488);
		var xys=[[414,296],[180,170],[380,110],[748,260],[678,100]];
		for(var i=0;i < 5;i++){
			this._heads.push(new LianyuHead(this["select"+i]));
			this._heads[i].move(xys[i][0],xys[i][1],this);
		}
		this._monster=new UIMonster();
		this._monster.move(82,466,this.bg);
		this._beans=App.dataMgr.q_zone_boContainer.getListByType(10);
		var tabStr='';
		for(i=0;i < this._beans.length;i++){
			tabStr+=this._beans[i].q_desc+',';
		}
		this.tabs.labels=tabStr.substr(0,tabStr.length-1);
		this.tabs_panel.vScrollBarAllwaysShow="off";
		this._mapid=JSON.parse(App.dataMgr.q_zone_mapContainer.getDataBean(200000).q_mapid)[0];
		TipMgr.addTip(this.tipBox,new TipData("TEXT",TipDescUtil.getTextTipDesc(719)));
		this.star_box.removeSelf();
		this._type=[10022,10023];
		this._actItem=new ItemGrid(null,EnumImageType.ITEM_56,66);
		this._actItem.move(0,0,this.act_item);
	}

	__class(BossLianyuView,'com.modules.boss.lianyu.BossLianyuView',_super);
	var __proto=BossLianyuView.prototype;
	Laya.imps(__proto,{"com.game.core.panel.ITabView":true})
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		TipMgr.removeTip(this.tipBox);
		this._boxGrids=null;
		this._monster=null;
		this._boxbg=null;
		this._heads=null;
		this._grids=null;
		this._beans=null;
		this._curr=null;
		this._actItem=null;
		this._type=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		this._tab=tab;
		this._isOpen=true;
		this.bg.skin=ResPathUtil.getImageRes("bg_lianyu",".jpg","boss");
		this.act_btn.skin=ResPathUtil.getImageRes("btn1",".png","common/btn");
		this.act_bg.skin=ResPathUtil.getImageRes("icon_bg",".png","activity/zuoqitehui/new");
		this.addEvent(ActivityEvent.refreshRedPoint,this.updateRed);
		this.addEvent(ActivityEvent.REFRESH_JIANYAO,this.refresh);
		this.addEvent(ActivityEvent.REFRESH_DETAIL,this.refresh);
		this.addEvent("TE.updateTaskTrack",this.updateTask);
		this.addEvent("LianyuCenter.UPDATE",this.update);
		this.addEvent("MoneyEvent.CHANGE",this.onMoney);
		this.star_box.on("click",this,this.onClick);
		this.btnEnter.on("click",this,this.onClick);
		this.btnGou.on("click",this,this.onClick);
		this.tabs.on("change",this,this.onTab);
		data=ResPathUtil.getImageRes("yijisha",".png","common/yin");
		var head;
		for(var $each_head in this._heads){
			head=this._heads[$each_head];
			head.on("click",this,this.onClick);
			head.yijisha.skin=data;
		}
		this.act_btn.on("click",this,this.onClick);
		ZoneTowerCenter.sendC2S_WushenZoneInfoMessage(200000);
		this.timerLoop(1000,this,this.onTimer);
	}

	__proto.hide=function(){
		this._monster.stop();
		this.showTaskReweard(false);
		EventMgr.removeAll(this);
		this.clearTimer(this,this.onTimer);
		this.act_btn.off("click",this,this.onClick);
		this.star_box.off("click",this,this.onClick);
		this.btnEnter.off("click",this,this.onClick);
		this.btnGou.off("click",this,this.onClick);
		this.tabs.off("change",this,this.onTab);
		this.tabs.selectedIndex=-1;
		var head;
		for(var $each_head in this._heads){
			head=this._heads[$each_head];
			head.off("click",this,this.onClick);
			head.yijisha.skin=null;
		}
		this.act_btn.skin=null;
		this.act_bg.skin=null;
		this.bg.skin=null;
		this._costs=null;
		this._zone=null;
	}

	__proto.onMoney=function(type,value){
		if(this._costs){
			if(this._costs.itemId==type){
				this.act_btn.showRedPoint(value >=this._costs.count,this.act_btn.width-20,5);
			}
		}
	}

	__proto.refresh=function(type){
		if(this._type.indexOf(type)!=-1){
			var list=ActivityUtil.getOpenList(type,0,true,this._type.indexOf(type)==0);
			if(list.length<=0)return;
			var bean=this._beans[this.tabs.selectedIndex];
			var arr=JSON.parse(bean.q_activities);
			var data;
			for (var i=0;i < list.length;i++){
				data=list[i];
				if(arr.indexOf(data.id)!=-1){
					this._isActOpen=true;
					this._actItem.showJson(data.bean.q_info);
					if(data.bean.q_desc){
						this._costs=null;
						var dirBean=App.dataMgr.q_direct_shopContainer.getDataBean(data.bean.q_desc,false);
						this.act_btn.label=dirBean.q_price/1000+"元购买";
						this.act_btn.showRedPoint(false);
					}
					else{
						this._costs=ItemUtil.getRewardDataList(data.bean.q_need_item)[0];
						this.act_btn.showRedPoint(BagItemCenter.getItemCount(this._costs.itemId)>=this._costs.count,this.act_btn.width-20,5);
						this.act_btn.label="购买";
					}
					this.act_btn.tag={'data':data,'actIdArr':arr};
					this.act_btn.visible=data.playerStates!=0;
					this.act_getted.visible=!this.act_btn.visible;
					break ;
				}
			}
			this.act_box.visible=this._isActOpen;
		}
	}

	__proto.onClick=function(e){
		if(e.currentTarget==this._boxbg){
			e.stopImmediatePropagation();
		}
		else if(e.currentTarget==this._boxGet){
			e.stopImmediatePropagation();
			TaskCommandSender.finishTask(TaskModel.getTaskData(this.star_box.tag.q_id));
			this._boxGrids.flyMoneyItems();
			this._boxGet.disabled=true;
		}
		else if(e.currentTarget==this.star_box){
			this.showTaskReweard(true);
			e.stopImmediatePropagation();
			Laya.stage.on("click",this,this.onStageClick);
		}
		else if(e.currentTarget==this.act_btn){
			if(!this.act_btn.tag)return;
			PanelManager.openByClass(ZuoqiTehuiPanel,this.act_btn.tag);
		}
		else if((e.currentTarget instanceof com.modules.boss.lianyu.LianyuHead )){
			if(this._curr)this._curr.selected=false;
			this._curr=e.currentTarget;
			this._curr.selected=true;
			if(this._curr.bean){
				this._monster.showMonster(this._curr.bean,"1",3);
				this._grids.showOrderGridByArr(BossDataCenter.instance.getShowItem(this._curr.bean.q_id),5,6,0,true,5);
				this.btnGou.selected=BossDataCenter.instance.isGuanzhu(this._mapid,this._curr.bean.q_id);
				this.updateEnterRed();
			}
		}
		else{
			if(this._curr && this._curr.bean){
				if(e.currentTarget==this.btnEnter){
					LianyuCenter.cur_boss=this._curr.bean.q_id;
					if(this._beans){
						var bean=this._beans[this.tabs.selectedIndex];
						if(bean){
							ZoneTowerCenter.sendC2S_IntoPurgatoryZoneMessage(200000,bean.q_bo,this.btnEnter.tag ? 1 :0);
							if(this.btnEnter.tag){
								this._isSend=1;
							}
						}
					}
					if(!this.btnEnter.tag){
						PanelManager.removePanel(PanelRegister.BOSS);
					}
				}
				else if(e.currentTarget==this.btnGou){
					if(!BossDataCenter.instance.setGuanzhu(this._mapid,this._curr.bean.q_id,this.btnGou.selected)){
						this.btnGou.selected=false;
					}
					this._zone.updateRed();
					this._curr.update(this._zone.getLayer(this._beans[this.tabs.selectedIndex].q_id),this._mapid);
					BossDataCenter.onSend();
				}
			}
		}
	}

	__proto.updateEnterRed=function(){
		var has=false;
		if(this._isSweep){
			var head;
			for(var $each_head in this._heads){
				head=this._heads[$each_head];
				if(head.isRedPoint){
					has=true;
					break ;
				}
			}
			this.btnEnter.disabledString(has ? null :"扫荡次数不足");
		}
		else if(this._curr){
			has=this._curr.isRedPoint;
			this.btnEnter.disabledString();
		}
		this.btnEnter.showRedPoint(has);
	}

	__proto.update=function(){
		var i=0;
		if(this._isOpen){
			this._zone=LianyuCenter.getData(200000);
			var len=-1,enough,bean,param,openday=ServerTime.getOpenDays();
			for(i=0;i < this._beans.length;i++){
				enough=[];
				bean=this._beans[i];
				if(i > 3 && bean.q_entry_condition){
					param=JSON.parse(bean.q_entry_condition)[0];
					enough.push(this._zone.isFinish(param["q_bo_id"]));
					enough.push(openday >=myparseInt(param["openday"]));
				}
				else{
					enough.push(true);
				}
				this.tabs.setItemVisibleByIndex(i,enough[0]);
				if(enough[0]){
					len=i+1;
					(this.tabs.getItem(i)).disabledString(enough.indexOf(false)< 0 ? null :"通关"+(enough[0] ? bean.q_info2 :bean.q_desc)+"开启");
				}
			}
			this.tabs.width=len *122-2;
			this.tabs_panel.callChangeScroll();
			this.tabs.x=len < 6 ? this.tabs_panel.width-this.tabs.width >> 1 :0;
			this.tabs_line1.x=this.tabs_panel.x+this.tabs.x;
			this.tabs_line2.x=this.tabs_panel.x+(this.tabs.x > 0 ? this.tabs.x+this.tabs.width :this.tabs_panel.width);
			this.updateRed(1001,false);
		}
		else{
			var boInfo=this._zone.getLayer(this._beans[this.tabs.selectedIndex].q_id);
			this._isSweep=boInfo.canSweep;
			var isAllFull=this._isSweep;
			for(i=0;i < 5;i++){
				this._heads[i].update(boInfo,this._mapid);
				if(isAllFull && !this._heads[i].isFull){
					isAllFull=false;
				}
			}
			this.hourFullImg.visible=isAllFull;
			this.btnEnter.tag=boInfo.canSweep;
			this.btnEnter.label=this._isSweep ? "扫 荡" :"挑 战";
			this.updateEnterRed();
		}
	}

	__proto.onTab=function(e){
		var ids=JSON.parse(this._beans[this.tabs.selectedIndex].q_info);
		for(var i=0;i < 5;i++){
			this._heads[i].id=ids[i];
		}
		this.update();
		var head;
		for(i=0;i < 5;i++){
			if(this._heads[i].isLife){
				head=this._heads[i];
				break ;
			}
		}
		if(!head){
			head=this._heads[0];
		}
		Event.EMPTY.setTo("click",head,head);
		this.onClick(Event.EMPTY);
		this.updateTask();
		this.desc_txt.text=this._beans[this.tabs.selectedIndex].q_saodang_condition_show;
		this.act_box.visible=this._isActOpen=false;
		ActivityCenter.sendDetailInfosByTypes(this._type);
	}

	__proto.updateRed=function(iconid,value){
		if(iconid==1001){
			if(!this._zone)return;
			for(var i=0;i < this._beans.length;i++){
				if(this.tabs.getItemVisibleByIndex(i)){
					this.tabs.showRedPointByIndex(i,this._zone.isTabRed(this._beans[i].q_id));
				}
			}
			if(this._isOpen){
				this._isOpen=false;
				if(this._tab < 0){
					this._tab=this.tabs.getRedPointFirstIndex();
				}
				if(this._tab < 0){
					this._tab=0;
				}
				if(!this.tabs.getItemVisibleByIndex(this._tab)){
					this.tabs.selectFirstVisible();
					this.tabs_panel.scrollTo(0);
				}
				else{
					this.tabs.selectedIndex=this._tab;
					if(this._tab > 4){
						this.tabs_panel.scrollTo(this._tab *120);
					}
				}
				this._tab=-1;
			}
			else{
				i=this.tabs.getRedPointFirstIndex();
				if(this._isSend==1){
					this._isSend=0;
					if(i >-1 && i !=this.tabs.selectedIndex){
						this.tabs.selectedIndex=i;
						return;
					}
				}
				this.updateEnterRed();
			}
		}
	}

	__proto.updateTask=function(task){
		if(task && task.branchType !=69){
			return;
		}
		task=TaskModel.getBranchTaskList(69)[0];
		if(task){
			var bean=App.dataMgr.q_taskBranchContainer.getDataBean(task.taskID);
			var id=myparseInt(bean.q_task_des);
			var item;
			for(var $each_item in this._heads){
				item=this._heads[$each_item];
				if(item.bean.q_id==id){
					this.star_box.move(item.x-36,item.y+96,this);
					this.star_box.showRedPoint(task.taskState==2,40,4);
					this.star_box.tag=bean;
					return;
				}
			}
		}
		this.star_box.removeSelf();
		this.showTaskReweard(false);
	}

	__proto.showTaskReweard=function(value){
		if(value){
			if(!this._boxbg){
				this._boxbg=new Image();
				this._boxbg.size(380,87);
				this._boxGrids=new ShowItemListBigGrid(4,this._boxbg,0,10);
			}
			if(!this._boxbg.skin){
				this._boxbg.skin=ResPathUtil.getImageRes("drop_bg",".png","main");
			}
			this._boxbg.move(this.star_box.x+(this.star_box.width-this._boxbg.width >> 1),this.star_box.y-90,this);
			this._boxbg.on("click",this,this.onClick);
			this._boxGrids.showJson(this.star_box.tag.q_tesk_rewards,true,-1,1,4);
			if(this.star_box.isRedPoint){
				if(!this._boxGet){
					this._boxGet=new Button("mobile/common/btn_1.png");
					this._boxGet.label="领取奖励";
					this._boxGet.stateNum=1;
				}
				this._boxGet.disabled=false;
				this._boxGet.on("click",this,this.onClick);
				this._boxGrids.x=this._boxbg.width-this._boxGrids.width-10-this._boxGet.width >> 1;
				this._boxGet.move(this._boxGrids.x+this._boxGrids.width+10,this._boxGrids.y+10,this._boxbg);
			}
			else{
				this._boxGrids.x=this._boxbg.width-this._boxGrids.width >> 1;
				if(this._boxGet){
					this._boxGet.removeSelf();
				}
			}
		}
		else if(this._boxbg && this._boxbg.parent){
			if(this._boxGet){
				this._boxGet.off("click",this,this.onClick);
			}
			this._boxbg.off("click",this,this.onClick);
			this._boxbg.removeSelf();
		}
	}

	__proto.onStageClick=function(e){
		Laya.stage.off("click",this,this.onStageClick);
		this.showTaskReweard(false);
	}

	__proto.onTimer=function(){
		var head;
		for(var $each_head in this._heads){
			head=this._heads[$each_head];
			head.onTimer();
		}
	}

	return BossLianyuView;
})(BossLianyuViewUI)