/**
*
*@author Jian
*创建时间：2024-9-4
*/
//class com.modules.feisheng.view.FeishengBossView extends ui.mobile.feisheng.FeishengBossViewUI
var FeishengBossView=(function(_super){
	function FeishengBossView(){
		this._heads=null;
		this._grids=null;
		this._headBox=null;
		this._actItem=null;
		this._c_map=null;
		this._cen=null;
		this._cishu=0;
		FeishengBossView.__super.call(this);
		this._headBox=new Sprite();
		this._headBox.setSize(886,420);
		this._headBox.move(17,46,this);
		this._heads=[];
		this._grids=new ShowItemListBigGrid(6,this,738,100);
		for(var i=0;i < 5;i++){
			this._heads.push(new FeishengBossHead());
			this.headBox.addChild(this._heads[i]);
		}
		this.map_list.scrollBarAllwaysShow="off";
		this.map_list.renderHandler=GameHandler.create(this,this.onRenFun);
		this.map_list.selectHandler=GameHandler.create(this,this.onSelect);
		TipMgr.addTip(this.tipBox,new TipData("TEXT",TipDescUtil.getTextTipDesc(755)));
	}

	__class(FeishengBossView,'com.modules.feisheng.view.FeishengBossView',_super);
	var __proto=FeishengBossView.prototype;
	Laya.imps(__proto,{"com.game.core.panel.ITabView":true})
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		TipMgr.removeTip(this.tipBox);
		this._actItem=null;
		this._headBox=null;
		this._heads=null;
		this._grids=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		this._cen=BossDataCenter.instance;
		var head;
		for(var $each_head in this._heads){
			head=this._heads[$each_head];
			head.on("click",this,this.onClick);
		}
		this.map_list.array=FeiShengCenter.fs_datas;
		this.addEvent("FIGHTBOSSSTATUE",this.updateBoss);
		this.addEvent("FightBossEvent.TILI_CHANGE",this.updateTili);
		this.addEvent(ActivityEvent.REFRESH_JIANYAO,this.updateAct);
		this.addEvent(ActivityEvent.REFRESH_DETAIL,this.updateAct);
		this.addEvent("DuanzaoEvent.QINGHUA_CHANGE",this.onQianghua);
		this.addEvent("Master.UP",this.updateMaster);
		this.act_btn.on("click",this,this.onClick);
		this.btnEnter.on("click",this,this.onClick);
		this.btnSet.on("click",this,this.onClick);
		this.updateAct(10301);
		this.updateTili(false);
		this.updateBoss(true);
		this.timerLoop(1000,this,this.onTimer);
	}

	__proto.hide=function(){
		this.act_btn.off("click",this,this.onClick);
		this.btnEnter.off("click",this,this.onClick);
		this.btnSet.off("click",this,this.onClick);
		var head;
		for(var $each_head in this._heads){
			head=this._heads[$each_head];
			head.off("click",this,this.onClick);
		}
		EventMgr.removeAll(this);
		this.clearTimer(this,this.onTimer);
		this.map_list.resetSelectedIndex();
		this.act_btn.skin=null;
		this.act_bg.skin=null;
		this.bg.skin=null;
		this._c_map=null;
		this._cen=null;
	}

	__proto.onClick=function(e){
		if(e.currentTarget==this.btnSet){
			var id;
			for(var $each_id in this._c_map.ids){
				id=this._c_map.ids[$each_id];
				this._cen.setGuanzhu(this._c_map.bean.q_map_id,id,this.btnSet.selected);
			}
			FeiShengCenter.updateBossRed();
			this.updateBoss(true);
		}
		else if(e.currentTarget==this.btnEnter){
			this.onSend();
		}
		else if(e.currentTarget==this.act_btn){
			FeishengBossView.isClickAct=true;
			PanelManager.openPanel(PanelRegister.FEISHENG_ACT,null,0);
		}
		else if((e.currentTarget instanceof com.modules.feisheng.view.FeishengBossHead )){
			this.onSend((e.currentTarget).id);
		}
	}

	__proto.onSelect=function(index){
		if(index < 0)return;
		this._c_map=this.map_list.array[index];
		this._grids.showOrderGridByJson(this._c_map.bean.q_show_item,2,6,4,true,10);
		this.bg.skin=ResPathUtil.getImageRes("fs1_"+this._c_map.bean.q_map_id,".jpg","feisheng");
		this.btnSet.selected=this._cen.isGuanzhu(this._c_map.bean.q_map_id,this._c_map.ids[0]);
		this.btnEnter.visible=this._c_map.isEnter;
		this.btnSet.visible=this._c_map.isEnter;
		this.onQianghua(null);
		var head;
		for(var i=0;i < this._heads.length;i++){
			this._heads[i].setData(this._c_map.datas[i]);
		}
		this.updateBoss(false);
	}

	__proto.onSend=function(bossId){
		(bossId===void 0)&& (bossId=0);
		if(!this._c_map)return;
		if(this._c_map.isEnter){
			TransferManager.toBossMap(12,this._c_map.bean.q_map_id,bossId);
			PanelManager.removePanel(PanelRegister.BOSS);
		}
		else{
			GameNotice.showMousePosMessage(ConditionUtil.getMapEnterDesc(this._c_map.bean));
		}
	}

	__proto.updateBoss=function(change){
		(change===void 0)&& (change=true);
		if(change){
			var fs,num=0;
			var item;
			for(var $each_item in this.map_list.content._childs){
				item=this.map_list.content._childs[$each_item];
				fs=item.tag;
				if(!fs || !fs.isEnter)continue ;
				num=this._cen.getMapsBossNum([fs.bean.q_map_id],null,fs.ids);
				item.numTxt.text="剩余BOSS数量："+num;
				item.showRedPoint(this._cishu > 0 && num > 0 && this._cen.isGuanzhu(fs.bean.q_map_id,fs.ids[0]),150,10);
			}
			if(this.map_list.selectedIndex < 0){
				var index1=0,index2=-1,index3=-1,fs_datas=FeiShengCenter.fs_datas;
				for(var i=0;i < fs_datas.length;i++){
					fs=fs_datas[i];
					if(!fs.isEnter)continue ;
					num=this._cen.getMapsBossNum([fs.bean.q_map_id],null,fs.ids);
					index1=i;
					if(num > 0){
						index2=i;
						if(this._cishu > 0 && this._cen.isGuanzhu(fs.bean.q_map_id,fs.ids[0])){
							index3=i;
						}
					}
				}
				this.map_list.selectedIndex=index3 < 0 ? (index2 < 0 ? index1 :index2):index3;
				this.map_list.scrollTo(this.map_list.selectedIndex);
				return;
			}
		}
		if(this.btnEnter.visible){
			this.btnEnter.showRedPoint(this._cishu > 0 && this._cen.isGuanzhu(this._c_map.bean.q_map_id,this._c_map.ids[0])&& this._cen.getMapsBossNum([this._c_map.bean.q_map_id],null,this._c_map.ids,true),this.btnEnter.width+4,4);
		};
		var info,stime=ServerTime.getServerTime();
		var head;
		for(var $each_head in this._heads){
			head=this._heads[$each_head];
			if(!head.visible)continue ;
			info=this._cen.getMonsterByMapAndId(head.id,this._c_map.bean.q_map_id);
			head.time=info && info.remainTime > 0 ? info.remainTime-stime :0;
			head.showRedPoint(this._cishu > 0 && head.time==0 && this._cen.isGuanzhu(this._c_map.bean.q_map_id,head.id),80,14);
			if(head.time > 0){
				head.timeTxt.color="#ef0605";
			}
		}
		this.onTimer();
	}

	__proto.onRenFun=function(item,index){
		var fs=this.map_list.array[index];
		item.bg.skin=ResPathUtil.getImageRes("fs2_"+fs.bean.q_map_id,".png","feisheng");
		item.lockBox.visible=!fs.isEnter;
		item.numTxt.visible=fs.isEnter;
		item.bg.gray=!fs.isEnter;
		item.tag=fs;
		if(fs.isEnter){
			item.numTxt.tag=this._cen.getMapsBossNum([fs.bean.q_map_id],null,fs.ids);
			item.numTxt.text="剩余BOSS数量："+item.numTxt.tag;
			item.showRedPoint(this._cishu > 0 && item.numTxt.tag > 0 && this._cen.isGuanzhu(fs.bean.q_map_id,fs.ids[0]),150,10);
		}
		else{
			item.infoTxt.text=ConditionUtil.getMapEnterDesc(fs.bean);
			item.showRedPoint(false);
		}
	}

	__proto.updateTili=function(change){
		(change===void 0)&& (change=true);
		this._cishu=BossDataCenter.instance.getTiliNum(183);
		this.cishuTxt.text="潜龙渊BOSS归属次数："+GameHTML.setColor(this._cishu,"#00ff00");
		if(change){
			this.updateBoss(true);
		}
	}

	__proto.onQianghua=function(cmd){
		if(!cmd || cmd.type==8){
			if(this._c_map.fsLv > 0){
				var num=MasterUtil.getEquipCount(2604,this._c_map.fsLv);
				this.equip_txt.text="飞升融合"+this._c_map.fsLv+"重："+GameHTML.setColor(num+'/10',num < 10 ? "#ef0605" :"#00ff00");
			}
			else{
				this.equip_txt.text='';
			}
		}
	}

	__proto.updateAct=function(type){
		if(type==10301){
			var act=ActivityUtil.getOpenList(type,4,true,true)[0];
			this.act_bg.visible=Boolean(act);
			if(this.act_bg.visible){
				if(!this._actItem){
					this._actItem=new ItemGrid(null,EnumImageType.ITEM_56,66);
					this._actItem.move(48,65,this.act_bg);
					this.act_btn.label="飞升礼包";
				}
				this._actItem.showJson(act.bean.q_info_spare);
				this.act_bg.skin=ResPathUtil.getImageRes("icon_bg",".png","activity/zuoqitehui/new");
				this.act_btn.skin=ResPathUtil.getImageRes("btn1",".png","common/btn");
				this.act_btn.visible=act.playerStates > 0;
				this.act_btn.showRedPoint(!FeishengBossView.isClickAct);
				this.act_getted.visible=!this.act_btn.visible;
			}
		}
	}

	__proto.updateMaster=function(type){
		if(type==2604){
			this.map_list.refresh();
		}
	}

	__proto.onTimer=function(){
		var head;
		for(var $each_head in this._heads){
			head=this._heads[$each_head];
			head.onTimer();
		}
	}

	FeishengBossView.isClickAct=false;
	return FeishengBossView;
})(FeishengBossViewUI)