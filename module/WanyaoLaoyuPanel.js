/**
*万妖牢狱
*@author Jian
*创建时间：2024-5-29
*/
//class com.modules.boss.wanyao.WanyaoLaoyuPanel extends com.game.core.panel.BasePanel
var WanyaoLaoyuPanel=(function(_super){
	function WanyaoLaoyuPanel(){
		this._view=null;
		this._heads=null;
		this._grids=null;
		this._avatar=null;
		this._data=null;
		this._curr=null;
		this._curr_head=null;
		this._hasCaiji=false;
		this._hasKill=false;
		this._old_index=0;
		this._sj_num=0;
		this._n_time=0;
		WanyaoLaoyuPanel.__super.call(this);
	}

	__class(WanyaoLaoyuPanel,'com.modules.boss.wanyao.WanyaoLaoyuPanel',_super);
	var __proto=WanyaoLaoyuPanel.prototype;
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		TipMgr.removeTip(this._view.tipBox);
		this._view=null;
		this._heads=null;
		this._grids=null;
		this._avatar=null;
		this._data=null;
		this._curr=null;
		this._curr_head=null;
		_super.prototype.destroy.call(this);
	}

	__proto.init=function(){
		this._view=new WanyaoLaoyuPanelUI();
		this._view.r_select.removeSelf();
		this.addChild(this._view);
		this._heads=[];
		for(var i=0;i < 6;i++){
			this._heads.push(new WanyaoHead());
			this._heads[i].move(604+i % 2 *148,(i / 2 >> 0)*160+83,this);
		}
		this._grids=new ShowItemListBigGrid(0,this,270,398);
		this._avatar=new UIMonster();
		this._avatar.move(384,320,this._view.bg);
		this._view.l_list.scrollBarAllwaysShow="off";
		this._view.l_list.selectHandler=GameHandler.create(this,this.onSelectLeft);
		this._view.l_list.renderHandler=GameHandler.create(this,this.onRenTab);
		TipMgr.addTip(this._view.tipBox,new TipData("TEXT",TipDescUtil.getTextTipDesc(735)));
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		_super.prototype.show.call(this);
		this._old_index=-1;
		this._data=BossDataCenter.instance;
		this._view.l_list.array=WanyaoCenter.datas;
		this._view.btnSB.selected=SetupCenter.instance.wanyao;
		this._view.btnSB.visible=FunctionManager.isFunctionOpen(271);
		this._view.bg.skin=ResPathUtil.getImageRes("bg",".jpg","wanyao");
		this._view.t_icon181.skin=ResPathUtil.getImageRes("t_icon181",".png","boss");
		this._view.t_icon182.skin=ResPathUtil.getImageRes("t_icon182",".png","boss");
		this._view.btnFH.on("click",this,this.onClick);
		this._view.btnSB.on("click",this,this.onClick);
		this._view.btnGo.on("click",this,this.onClick);
		this.addEvent("FIGHTBOSSSTATUE",this.updateBoss);
		this.addEvent(ActivityEvent.refreshRedPoint,this.onShenshou);
		this.addEvent("FightBossEvent.TILI_CHANGE",this.updateTili);
		this.addEvent("WanyaoCenter.NPC_UPDATE",this.updateNpc);
		this.addEvent("ShenshouCenter.UPDATE",this.onShenshou);
		var head;
		for(var $each_head in this._heads){
			head=this._heads[$each_head];
			head.on("click",this,this.onClick);
		}
		if(!this._view.btnSB.selected){
			this._view.btnSB.showFlowEffect("btn_2");
		}
		WanyaoCenter.sendC2S_NpcInfoMessage();
		Laya.workerTimer.loop(1000,this,this.onTimer);
		this.updateTili(false);
	}

	__proto.hide=function(){
		_super.prototype.hide.call(this);
		EventMgr.removeAll(this);
		Laya.workerTimer.clear(this,this.onTimer);
		var head;
		for(var $each_head in this._heads){
			head=this._heads[$each_head];
			head.off("click",this,this.onClick);
		}
		this._avatar.stopAndHide();
		this._view.btnFH.off("click",this,this.onClick);
		this._view.btnSB.off("click",this,this.onClick);
		this._view.btnGo.off("click",this,this.onClick);
		this._view.l_list.resetSelectedIndex();
		this._view.btnSB.hideFlowEffect();
		this._view.t_icon181.skin=null;
		this._view.t_icon182.skin=null;
		this._view.nameImg.skin=null;
		this._view.bg.skin=null;
		this._curr_head=null;
		this._data=null;
	}

	__proto.onClick=function(e){
		if(e.currentTarget==this._view.btnSB){
			this._view.btnSB.hideFlowEffect();
			SetupCenter.saveClient("15",this._view.btnSB.selected ? 1 :0);
		}
		else{
			if(!this._curr){
				return;
			}
			switch(e.currentTarget){
				case this._view.btnGo:
					TransferManager.toBossMap(12,this._curr.bean.q_map_id,this._curr_head.tag);
					PanelManager.removePanel(PanelRegister.BOSS);
					this.onClose();
					break ;
				case this._view.btnFH:
					if(!this._data.setGuanzhu(this._curr.bean.q_map_id,this._curr_head.tag,this._view.btnFH.selected)){
						this._view.btnFH.selected=false;
						return;
					}
					this.updateBoss();
					WanyaoCenter.updateWanyao();
					break ;
				default :
					this._curr_head=e.currentTarget;
					this._curr_head.addChild(this._view.r_select);
					var bean=App.dataMgr.q_monsterContainer.getDataBean(this._curr_head.tag);
					if(!bean)return;
					this._grids.showArr(this._data.getShowItem(0,myparseInt(bean.q_items)),true,-1,1,5);
					this._view.btnFH.selected=this._data.isGuanzhu(this._curr.bean.q_map_id,this._curr_head.tag);
					this._view.nameImg.skin=ResPathUtil.getImageRes("n_"+bean.q_faceid,".png","wanyao");
					this._avatar.showMonster(bean);
					this.updateBtnRed();
					break ;
				}
		}
	}

	__proto.onSelectLeft=function(index){
		this._curr=this._view.l_list.array[index];
		if(!this._curr.isEnter && index > 0){
			if(ConditionUtil.getMapEnterDesc(this._curr.bean)){
				GameNotice.showMousePosMessage(ConditionUtil.getMapEnterDesc(this._curr.bean));
			}
			this._view.l_list.selectedIndex=this._old_index < 0 ? 0 :this._old_index;
			return;
		}
		this._old_index=index;
		index=-1;
		var head;
		for(var i=0;i < this._heads.length;i++){
			head=this._heads[i];
			head.visible=i < this._curr.ids.length;
			if(!head.visible)continue ;
			head.id=this._curr.ids[i]["monster"];
			this.updateHead(head);
			if(head.isRedPoint && index < 0){
				index=i;
			}
		}
		Event.EMPTY.setTo("click",this._heads[index < 0 ? 0 :index],null);
		this.onClick(Event.EMPTY);
		this.updateNpc();
		this.onTimer();
	}

	__proto.onRenTab=function(item,index){
		var data=this._view.l_list.array[index];
		item.tag=data;
		item.nameTxt.text=data.bean.q_map_name;
		item.limitTxt.visible=!data.isEnter;
		if(item.limitTxt.visible){
			item.nameTxt.y=24;
			item.showRedPoint(false);
			item.limitTxt.text=ConditionUtil.getMapEnterDesc(data.bean);
		}
		else{
			item.nameTxt.y=40;
			item.showRedPoint(WanyaoCenter.wanyaoIsRed(data),140,20);
		}
	}

	__proto.updateBoss=function(){
		var item;
		for(var $each_item in this._view.l_list.content._childs){
			item=this._view.l_list.content._childs[$each_item];
			if(!item.limitTxt.visible){
				item.showRedPoint(WanyaoCenter.wanyaoIsRed(item.tag),140,20);
			}
		}
		if(this._view.l_list.selectedIndex < 0){
			var index1=-1,index2=-1;
			for(var i=this._view.l_list.array.length-1;i >-1;i--){
				if(this._view.l_list.array[i].isEnter){
					if(index1 < 0){
						index1=i;
					}
					if(WanyaoCenter.wanyaoIsRed(this._view.l_list.array[i],true)){
						index2=i;
						break ;
					}
				}
			}
			if(index2 < 0){
				index2=index1 < 0 ? 0 :index1;
			}
			this._view.l_list.scrollTo(index2);
			this._view.l_list.selectedIndex=index2;
		}
		else if(this._curr){
			this.updateBtnRed();
			var head;
			for(var $each_head in this._heads){
				head=this._heads[$each_head];
				if(head.visible){
					this.updateHead(head);
				}
			}
			this.onTimer();
		}
	}

	__proto.updateBtnRed=function(){
		this._view.btnGo.showRedPoint(((this._hasCaiji && this._sj_num > 0))|| (this._hasKill && this._curr_head.time <=0));
	}

	__proto.updateHead=function(head){
		var boss=this._data.getBossBy2(this._curr.bean.q_map_id,head.tag);
		if(boss){
			head.time=boss.remainTime > 0 ? boss.remainTime-ServerTime.getServerTime():0;
			head.showRedPoint(this._hasKill && boss.remainTime <=0 && this._data.isGuanzhu(this._curr.bean.q_map_id,head.tag),120,24);
		}
		else{
			head.time=0;
			head.showRedPoint(false);
		}
		head.icon.filters=head.time > 0 ? FilterUtil.GRAY_FILTER_ARRAY :null;
	}

	__proto.updateNpc=function(){
		if(this._view.l_list.selectedIndex < 0){
			this.updateBoss();
			return;
		};
		var arr=WanyaoCenter.getNpcInfo(this._curr.bean.q_map_id);
		this._sj_num=arr[0];
		this.updateBtnRed();
		if(arr[0] > 0 || arr[2] < 0){
			this._n_time=-1;
			this._view.shuijingTxt.text="剩余龙鳞水晶："+GameHTML.setColor(arr[0]+'/'+arr[1],arr[0] > 0 ? "#00ff00" :"#ef0605");
		}
		else{
			this._n_time=arr[2];
		}
	}

	__proto.onShenshou=function(iconId,value){
		(iconId===void 0)&& (iconId=0);
		(value===void 0)&& (value=false);
		if(iconId > 0 && iconId !=1420){
			return;
		}
		this._view.l_list.updateList();
	}

	__proto.onTimer=function(){
		var head;
		for(var $each_head in this._heads){
			head=this._heads[$each_head];
			if(!head.visible)continue ;
			if(head.time > 0){
				head.timeTxt.text=DateUtils.convertTime(head.time--);
			}
			else if(head.time==0){
				head.time=-1;
				head.timeTxt.text='';
				head.icon.filters=null;
			}
		}
		if(this._n_time > 0){
			this._view.shuijingTxt.text="龙鳞水晶刷新时间："+GameHTML.setColor(DateUtils.convertTime(this._n_time--),"#ef0605");
		}
		else if(this._n_time==0){
			this.updateNpc();
		}
	}

	__proto.updateTili=function(change){
		(change===void 0)&& (change=true);
		this._hasKill=false;
		this._hasCaiji=false;
		var cishuTxt,tili;
		for(var type=180;type <=182;type++){
			cishuTxt=this._view["cishuTxt"+type];
			tili=this._data.getMonsterTili(type);
			if(tili){
				if(type==180){
					this._hasKill=tili.num > 0;
					cishuTxt.text="剩余次数："+GameHTML.setColor(tili.num+'/'+tili.maxnum,this._hasKill ? "#00ff00" :"#ef0605");
				}
				else{
					if(tili.num > 0){
						this._hasCaiji=true;
					}
					cishuTxt.text=GameHTML.setColor(tili.num+'/'+tili.maxnum,tili.num > 0 ? "#00ff00" :"#ef0605");
				}
			}
			else{
				cishuTxt.text=(type==180 ? "剩余次数：" :'')+GameHTML.setColor("0/0","#ef0605");
			}
		}
		if(change){
			this.updateBoss();
		}
	}

	return WanyaoLaoyuPanel;
})(BasePanel)