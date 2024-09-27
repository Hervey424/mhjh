var BossXinxiView=(function(_super){
	function BossXinxiView(){
		this._grids=null;
		this._monster=null;
		this._curTab=null;
		this._tj_fightId=0;
		this._quan=null;
		BossXinxiView.__super.call(this);
		this.tabs.labels="等级BOSS,斗笠BOSS,生肖BOSS,八卦BOSS,异兽BOSS";
		this._monster=new UIMonster();
		this._monster.move(428,256,this.bg);
		this._grids=new ShowItemListBigGrid(4,this,676,150);
		App.registerNumber("43","123456789十",-6,220,22);
		this.l_list.scrollBarAllwaysShow="off";
		this.l_list.renderHandler=GameHandler.create(this,this.onRenTab);
		this.l_list.selectHandler=GameHandler.create(this,this.onSelectLeft);
		this.l_list.itemRender=BossXinxiTab;
		var list;
		for(var i=0;i < 3;i++){
			list=this["d_list"+i];
			list.renderHandler=GameHandler.create(this,this["onRenFun"+i]);
			list.scrollBarAllwaysShow="off";
			list.itemRender=BossXinxiItem;
		}
	}

	__class(BossXinxiView,'com.modules.boss.xinxi.BossXinxiView',_super);
	var __proto=BossXinxiView.prototype;
	Laya.imps(__proto,{"com.game.core.panel.ITabView":true})
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._monster=null;
		this._grids=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		if(data=="tuijianguaji"){
			data=-2;
		}
		else if(tab==0 || data==PanelRegister.FENGMO){
			var task,temp,tbeans=App.dataMgr.q_taskBranchContainer.getTaskList(68);
			for(var i=0;i < tbeans.length;i++){
				temp=TaskModel.getTaskData(tbeans[i].q_id);
				if(temp && temp.taskState < 2){
					task=temp;
					break ;
				}
			}
			if(task){
				var con=TaskModel.getXuanshangCon(task);
				if(con && con.conditionObj && con.conditionObj.hasOwnProperty("tuijianrank")){
					var p=App.dataMgr.q_panelContainer.getDataBean(con.conditionObj["panel"],false);
					tab=p ? p.q_tab2-1 :0;
					data=myparseInt(con.conditionObj["tuijianrank"]);
				}
			}
		}
		BossXinxiView._s_index=myparseInt(data);
		this.bg.skin=ResPathUtil.getImageRes("bg0",".jpg","boss");
		this.gotoBtn0.on("click",this,this.onClick);
		this.gotoBtn1.on("click",this,this.onClick);
		this.tabs.on("change",this,this.onTab);
		this.tabs.selectedIndex=tab < 0 ? 0 :tab;
		this._quan={};
		var bags=BagItemCenter.itemList;
		var item;
		for(var $each_item in bags){
			item=bags[$each_item];
			if(item && !this._quan[item.itemId] && item.getDataBean().q_client_type==120){
				this._quan[item.itemId]=JSON.parse(item.getDataBean().q_script_par);
			}
		}
		this.addEvent("TE.taskFinish",this.updateTask);
		this.addEvent("ET.FUNCTION_TIP",this.onFunction);
		this.addEvent("FIGHTBOSSSTATUE",this.updateBoss);
	}

	__proto.hide=function(){
		this._monster.stop();
		this.clearTimer(this,this.updateBoss);
		EventMgr.removeAll(this);
		this.gotoBtn0.off("click",this,this.onClick);
		this.gotoBtn1.off("click",this,this.onClick);
		this.tabs.off("change",this,this.onTab);
		this.tabs.selectedIndex=-1;
		this.bg.skin=null;
		this._quan=null;
	}

	__proto.initTab=function(c_type,index){
		if(index > 0){
			index--;
		}
		else if(index >-2){
			index=this.l_list.selectedIndex;
		};
		var beans=App.dataMgr.q_fightBossContainer.getListBy(c_type);
		if(!beans)return;
		this._tj_fightId=0;
		var guaji=-1,maps=[],tj_mapid=SetupCenter.instance.offlineMapId;
		var unLock=-1,datas=[];
		for(var i=0,count=0;i < beans.length;i++){
			if(TaskModel.getTaskData(beans[i].q_jingjie)){
				continue ;
			}
			datas.push(new BossXinxiTabData(beans[i]));
			maps=maps.concat(datas[count].maps);
			if(datas[count].maps.indexOf(tj_mapid)>=0){
				this._tj_fightId=datas[count].fightId;
				guaji=unLock;
			}
			if(datas[count].isLock){
				break ;
			}
			count++;
			unLock++;
		}
		if(index < 0){
			index=guaji >-1 ? guaji+1 :0;
		}
		else if(index >=datas.length){
			index=datas.length-1;
		}
		if(datas[index].isLock){
			index=unLock;
		}
		this.l_list.array=datas;
		this.l_list.updateList(false);
		if(this.l_list.selectedIndex !=index){
			this.l_list.scrollTo(index);
			this.l_list.selectedIndex=index;
		}
		else{
			this.onSelectLeft(index);
		}
		BossCommandSender.sendC2S_AliveWildBossMessage(maps);
	}

	__proto.updateBoss=function(bool){
		(bool===void 0)&& (bool=true);
		var btnTab;
		for(var $each_btnTab in this.l_list.content._childs){
			btnTab=this.l_list.content._childs[$each_btnTab];
			if(btnTab.data){
				btnTab.numTxt.text="（"+BossDataCenter.instance.getMapsBossNum(btnTab.data.maps,[btnTab.data.fightId],btnTab.data.ids)+"）";
			}
		};
		var boss=BossDataCenter.instance.getBossBy(this._curTab.maps[0],this._curTab.fightId,this._curTab.ids[0],false);
		this.timeTxt.text="刷新时间："+GameHTML.setColor(boss ? (boss.reviveTime / 60 >> 0)+"分钟" :"----","#00ff00");
		if(!bool)return;
		var list;
		for(var i=0;i < 3;i++){
			list=this ["d_list"+i];
			var item;
			for(var $each_item in list.content._childs){
				item=list.content._childs[$each_item];
				item.update();
				if(item.enough && item.num==0){
					item.itemId=this.isZH(item.rankid);
					item.quzhaohuan.visible=item.itemId > 0;
				}
				else{
					item.itemId=0;
					item.quzhaohuan.visible=false;
				}
			}
		}
	}

	__proto.onSelectLeft=function(index){
		if(index < 0)return;
		this._curTab=this.l_list.array[index];
		this._grids.showOrderGridByArr(BossDataCenter.instance.getShowItem(this._curTab.ids[0]),3,4,4,true,6);
		this._monster.showMonster(App.dataMgr.q_monsterContainer.getDataBean(this._curTab.ids[0]));
		for(var i=0;i < 3;i++){
			(this ["d_list"+i]).array=this._curTab.datas[i];
		}
		this.updateBoss(false);
		this.onFunction(101,LongHunCenter.red,false);
		this.onFunction(1,false,false);
	}

	__proto.onTab=function(e){
		switch(this.tabs.selectedIndex){
			case 0:
				this.initTab(21,BossXinxiView._s_index);
				break ;
			case 1:
				this.initTab(24,BossXinxiView._s_index);
				break ;
			case 2:
				this.initTab(23,BossXinxiView._s_index);
				break ;
			case 3:
				this.initTab(22,BossXinxiView._s_index);
				break ;
			case 4:
				this.initTab(28,BossXinxiView._s_index);
				break ;
			}
	}

	__proto.onClick=function(e){
		if(e.currentTarget==this.gotoBtn1){
			PanelOpenManager.openLongHun();
		}
		else if(e.currentTarget==this.gotoBtn0){
			PanelManager.openByClass(YishouGetPanel,this._curTab.datas[0][0]);
		}
	}

	__proto.onRenTab=function(item,index){
		item.update(this.l_list.array[index]);
		item.guaji_img.visible=item.data.fightId==this._tj_fightId;
	}

	__proto.renderItem=function(item,value){
		item.fightId=this._curTab.fightId;
		item.q_rankid=this._curTab.q_rankid;
		item.q_rank_lv=this._curTab.q_rank_lv;
		item.setData(value);
		item.update();
		item.guaji_img.visible=item.mapid==SetupCenter.instance.offlineMapId;
		if(item.enough && item.num==0){
			item.itemId=this.isZH(item.rankid);
			item.quzhaohuan.visible=item.itemId > 0;
		}
		else{
			item.itemId=0;
			item.quzhaohuan.visible=false;
		}
	}

	__proto.isZH=function(rank){
		for(var key in this._quan){
			if(this._quan[key].indexOf(rank)>=0){
				return myparseInt(key);
			}
		}
		return 0;
	}

	__proto.onFunction=function(funId,value,bool){
		(bool===void 0)&& (bool=true);
		var index=-1;
		if(funId==101){
			index=1;
		}
		else if(funId==1){
			if(this.tabs.selectedIndex==4){
				index=0;
			}
			else{
				this.gotoMask0.visible=false;
			}
		}
		if(index < 0)return;
		var isShow=true;
		var gotoBtn=this["gotoBtn"+index];
		var obj;
		for(var $each_obj in this._curTab.datas[index]){
			obj=this._curTab.datas[index][$each_obj];
			if(ConditionUtil.isMapCanEnterByMapId(obj.map)){
				isShow=false;
				break ;
			}
		}
		if(isShow && index==0 && obj){
			isShow=false;
			obj=this._curTab.datas[0][0];
			obj=JSON.parse(ConditionUtil.getMapEnterKey(App.dataMgr.q_mapContainer.getDataBean(obj.map)))[0];
			if(myparseInt(obj["q_position_group"])==90){
				isShow=true;
			}
		}
		(this ["gotoMask"+index]).visible=isShow;
		if(bool){
			var item;
			for(var $each_item in this["d_list"+index].content._childs){
				item=this["d_list"+index].content._childs[$each_item];
				item.updateEnter();
			}
		}
		gotoBtn.showRedPoint(index==1 && isShow && (LongHunCenter.red || JieriRedPoint.isRed(227)),gotoBtn.width+4,4);
	}

	__proto.updateTask=function(task){
		if(task.branchType==68){
			this.onTab(null);
		}
	}

	__proto.onRenFun0=function(item,index){
		this.renderItem(item,this.d_list0.array[index]);
	}

	__proto.onRenFun1=function(item,index){
		this.renderItem(item,this.d_list1.array[index]);
	}

	__proto.onRenFun2=function(item,index){
		this.renderItem(item,this.d_list2.array[index]);
	}

	BossXinxiView._s_index=0;
	return BossXinxiView;
})(BossXinxiViewUI)