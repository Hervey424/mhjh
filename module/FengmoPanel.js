var FengmoPanel=(function(_super){
	function FengmoPanel(){
		this._view=null;
		this._itemList=null;
		this._itemVec=null;
		this._acc=null;
		this._bean=null;
		this._tips=null;
		this._guide=null;
		FengmoPanel.__super.call(this);
	}

	__class(FengmoPanel,'com.modules.fengmo.FengmoPanel',_super);
	var __proto=FengmoPanel.prototype;
	__proto.init=function(){
		this._view=new FengmoPanelUI();
		this._view.r_panel.vScrollBarAllwaysShow="off";
		this._view.tipTxt.scrollBarAllwaysShow="off";
		this.addChild(this._view);
		this._acc=new Accordion(144,526,GameHandler.create(this,this.onSelectItem));
		this._acc.setItemStyle(FMAccordionHead,FMAccordionItem,44,32);
		this._acc.setSelectStyle("mobile/fengmo/select.png",0,0,'',false);
		this._acc.showHeadLabel=false;
		this._acc.move(224,68,this);
		this._itemList=new ShowItemListBigGrid(4,this,480,504);
		this._itemVec=[];
	}

	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._itemList=null;
		this._itemVec=null;
		this._view=null;
		this._acc=null;
		_super.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=0);
		_super.prototype.show.call(this);
		this._view.bg.skin=ResPathUtil.getImageRes("fengmobg",".png","task");
		PanelManager.hidePanel(data);
		this.addEvent("TE.UPDATE_LUCKY_TASK",this.onFinishList);
		this.addEvent("TE.updateTaskTrack",this.updateTask);
		this.addEvent("PE.JING_JIE",this.onJingjie);
		this._view.btnGet.on("click",this,this.onClick);
		ActivitiesCommandSender.sendC2S_GetLuckyFinshTaskIdMessage(17+1000);
		var item;
		for(var $each_item in this._itemVec){
			item=this._itemVec[$each_item];
			item.btnLink.on("click",this,this.onClick);
			item.btn.on("click",this,this.onClick);
		}
	}

	__proto.hide=function(){
		_super.prototype.hide.call(this);
		var item;
		for(var $each_item in this._itemVec){
			item=this._itemVec[$each_item];
			item.btnLink.off("click",this,this.onClick);
			item.btn.off("click",this,this.onClick);
		}
		EventMgr.removeAll(this);
		this.clearTimer(this,this.showGuide);
		this._view.btnGet.off("click",this,this.onClick);
		this._view.yilingqu.skin=null;
		this._view.bg.skin=null;
		this._bean=null;
		this._tips=null;
		FengmoPanel.fengmo=null;
		if(this._guide){
			this._guide.hide();
			this._guide=null;
		}
	}

	__proto.onJingjie=function(lv){
		var bean,dic={},datas=[],beans=App.dataMgr.q_taskBranchContainer.getTaskList(17);
		var index1=0,index2=0;
		var id=0,showtype=0,param,cons,jingjie=App.role.jingJieId,level=App.role.allLevel;
		FengmoPanel.fengmo=TaskModel.fengmo;
		if(FengmoPanel.fengmo){
			id=FengmoPanel.fengmo.taskID;
			showtype=App.dataMgr.q_taskBranchContainer.getDataBean(id).q_show_type;
		}
		for(var i=0;i < beans.length;i++){
			bean=beans[i];
			param=bean.q_show_condition ? JSON.parse(bean.q_show_condition):null;
			if(!param || (jingjie >=myparseInt(param["jingjie"])&& level >=myparseInt(param["levelmin"]))){
				if(!dic[bean.q_show_type]){
					if(bean.q_show_type==showtype){
						index1=datas.length;
					}
					cons=bean.q_condition_des.split('|');
					dic[bean.q_show_type]={label:cons[0],yuan:cons[3],data:[]};
					datas.push(dic[bean.q_show_type]);
				}
				else{
					cons=bean.q_condition_des.split('|');
				}
				if(bean.q_id==id){
					index2=dic[bean.q_show_type]["data"].length;
				}
				dic[bean.q_show_type]["data"].push({bean:bean,tips:cons});
			}
		}
		this._acc.dataProvider=datas;
		this._acc.setSelectedIndex(index1,index2);
	}

	__proto.update=function(isTop){
		(isTop===void 0)&& (isTop=false);
		if(!this._bean)return;
		var isGuide=0;
		this._itemList.showJson(this._bean.q_tesk_rewards);
		this._view.titleTxt.text=this._tips[1];
		this._view.tipTxt.text=this._tips[2];
		if(FengmoPanel.fengmo && this._bean.q_id > FengmoPanel.fengmo.taskID){
			this._view.btnGet.visible=false;
			this._view.r_panel.visible=false;
			this._view.yilingqu.visible=false;
		}
		else{
			if(App.needGuide(22)|| App.needGuide(26)){
				isGuide=1;
			};
			var finish=this._bean.q_id <=TaskModel.fm_finishId || (FengmoPanel.fengmo && this._bean.q_id < FengmoPanel.fengmo.taskID);
			this._view.r_panel.visible=true;
			this._view.btnGet.visible=!finish;
			this._view.yilingqu.visible=finish;
			if(!finish && FengmoPanel.fengmo){
				this._view.btnGet.disabled=FengmoPanel.fengmo.taskState < 2;
				this._view.btnGet.showRedPoint(FengmoPanel.fengmo.taskState==2);
			}
			else{
				this._view.btnGet.disabled=true;
				this._view.btnGet.showRedPoint(false);
				if(!this._view.yilingqu.skin){
					this._view.yilingqu.skin="mobile/common2/yilingqu.png";
				}
			};
			var cons=JSON.parse(this._bean.q_finish_condition_ids);
			var txts=this._bean.q_task_des.split('|');
			var item,temp,value=0,max=0;
			for(var i=0;i < cons.length;i++){
				if(i < this._itemVec.length){
					item=this._itemVec[i];
				}
				else{
					item=new FengmoItemUI();
					item.btnLink.on("click",this,this.onClick);
					item.btn.on("click",this,this.onClick);
					item.btn.isShowFlowEffect=false;
					item.btn.text.isDrawLine=true;
					this._itemVec.push(item);
				}
				if(!item.parent){
					this._view.r_panel.content.addChild(item);
				}
				max=TaskConditionData.getTotal(cons[i]);
				if(finish){
					value=max;
				}
				else if(FengmoPanel.fengmo){
					value=FengmoPanel.fengmo.vecConditionData[i].enough ? max :FengmoPanel.fengmo.vecConditionData[i].pro;
				}
				else{
					value=0;
				}
				item.txt.text=txts[i]+"&nbsp;"+GameHTML.setColor(value+'/'+max,value < max ? "#ef0605" :"#00ff00");
				item.btnLink.visible=cons[i].hasOwnProperty("taskid");
				item.txt.y=item.height-item.txt.getHeight()>> 1;
				item.yiwancheng.visible=value >=max;
				item.btn.visible=value < max;
				item.btn.tag=cons[i];
				item.tag=1;
				if(!item.yiwancheng.visible){
					item.btn.showFlowEffect("btn_go");
					if(!temp && isGuide==1){
						temp=item;
						if(!cons[i].hasOwnProperty("clienttuijianmap")|| JSON.parse(cons[i]["clienttuijianmap"]).indexOf(App.role.mapId)< 0){
							isGuide=2;
						}
					}
				}
				else{
					item.btn.hideFlowEffect();
					if(item.yiwancheng.visible && !item.yiwancheng.skin){
						item.yiwancheng.skin=ResPathUtil.getImageRes("yiwancheng",".png","common/yin");
					}
				}
			}
			for(;i < this._itemVec.length;i++){
				this._itemVec[i].removeSelf();
				this._itemVec[i].tag=-1;
			}
			this._itemVec.sort(this.onSort);
			for(i=0;i < this._itemVec.length;i++){
				this._itemVec[i].y=i *68;
			}
			this._view.r_panel.refresh();
			if(isTop){
				this._view.r_panel.scrollTo(0,0);
			}
		}
		if(isGuide==2){
			this.timerOnce(200,this,this.showGuide,[temp]);
		}
		else if(this._guide){
			App.onClickGuideTarget();
			this._guide.hide();
			this._guide=null;
		}
	}

	__proto.updateTask=function(task){
		if(task && task.branchType !=17){
			return;
		}
		FengmoPanel.fengmo=TaskModel.fengmo;
		this._acc.refresh();
		this.update();
	}

	__proto.onSelectItem=function(item){
		this._bean=item.data["bean"];
		this._tips=item.data["tips"];
		this.update(true);
	}

	__proto.onClick=function(e){
		if(e.currentTarget==this._view.btnGet){
			TaskCommandSender.finishTask(FengmoPanel.fengmo);
			if(TaskModel.mainTask){
				var con=TaskModel.mainTask.getConditionData();
				if(con.conditionObj){
					var bean=App.dataMgr.q_taskBranchContainer.getDataBean(con.conditionObj["taskid"],false);
					if(bean && bean.q_branch_type==17){
						this.onClose();
					}
				}
			}
		}
		else if((e.currentTarget instanceof zxk.ZLinkButton )){
			if(this._bean !=null){
				PanelManager.openPanel(PanelRegister.EQUIP_SHOUJI,this._bean.q_id,1,false);
			}
		}
		else if((e.currentTarget instanceof laya.ui.Button )){
			if(this._guide){
				App.isMainGuide=false;
				this._guide.hide();
				this._guide=null;
			};
			var param=e.target.tag;
			if(param.hasOwnProperty("tuijian")){
				PanelManager.openByClass(TaskTuijianPanel,{tuijian:param.tuijian,click:e.target});
			}
			else{
				FengmoPanel.gotoFengmo(e.target.tag,2);
				this.onClose();
			}
		}
	}

	__proto.onFinishList=function(type){
		if(type==17+1000){
			this.onJingjie(0);
		}
	}

	__proto.showGuide=function(temp){
		App.onClickGuideTarget();
		if(!this._guide){
			this._guide=Guide.getGuide();
			this._guide.show2("前往任务",4);
		}
		this._guide.guideTo(temp.btn,temp.btn);
		this._view.r_panel.scrollTo(0,temp.y);
		if(App.needGuide(22)){
			App.addGuideMask(temp.btn);
		}
	}

	__proto.onSort=function(a,b){
		if(a.tag < 0 && b.tag > 0)
			return 1;
		if(a.tag > 0 && b.tag < 0)
			return-1;
		if(!a.yiwancheng.visible && b.yiwancheng.visible){
			return-1;
		}
		if(a.yiwancheng.visible && !b.yiwancheng.visible){
			return 1;
		}
		return 0;
	}

	FengmoPanel.gotoFengmo=function(param,clickParam){
		if(!param)return;
		if(param.hasOwnProperty("panel")){
			PanelOpenManager.openPanelById(param["panel"],PanelRegister.FENGMO);
		}
		else if(param.hasOwnProperty("clienttuijiannpc")){
			var maps=param.hasOwnProperty("clienttuijianmap")? JSON.parse(param["clienttuijianmap"]):null;
			if(!maps || maps.indexOf(App.role.mapId)< 0){
				var npc=App.dataMgr.q_npcContainer.getDataBean(param["clienttuijiannpc"]);
				if(!npc)return;
				if(npc.q_map !=App.role.mapId){
					TransferManager.transferToNPC(npc.q_id);
				}
				else{
					App.mapModule.mapMoveModel.walkToNpc(npc.q_id);
				}
				if(maps){
					GlobalCenter.clickNpcParams=maps[0];
				}
			}
			else if(param.hasOwnProperty("clientmonster")){
				BossCommandSender.getMonsterXYByType(myparseInt(param.clientmonster));
			}
			else if(param.hasOwnProperty("mtype")){
				BossCommandSender.getMonsterXYByType(myparseInt(param.mtype));
			}
			else{
				App.openAutoFight();
			}
		}
	}

	FengmoPanel.fengmo=null;
	return FengmoPanel;
})(BasePanel)