/**
*异界入侵
*@author Jian
*创建时间：2024-3-15
*/
//class com.modules.boss.yijie.YiJieRuQinPanel extends com.game.core.panel.BasePanel
var YiJieRuQinPanel=(function(_super){
	function YiJieRuQinPanel(){
		this._view=null;
		this._heads=null;
		this._grids=null;
		this._monster=null;
		this._curr=null;
		this._joinAct=null;
		this._isOpen=false;
		YiJieRuQinPanel.__super.call(this);
	}

	__class(YiJieRuQinPanel,'com.modules.boss.yijie.YiJieRuQinPanel',_super);
	var __proto=YiJieRuQinPanel.prototype;
	__proto.init=function(){
		this._view=new YiJieRuQinPanelUI();
		this._view.p_panel.vScrollBarAllwaysShow="off";
		this.addChild(this._view);
		this._grids=new ShowItemListBigGrid(8,this,590,280);
		this._monster=new UIMonster();
		this._monster.move(284,342,this._view.bg);
		this._heads=[];
		TipMgr.addTip(this._view.tipBox,new TipData("TEXT",TipDescUtil.getTextTipDesc(723)));
	}

	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		TipMgr.removeTip(this._view.tipBox);
		this._monster=null;
		this._heads=null;
		this._grids=null;
		this._view=null;
		_super.prototype.destroy.call(this);
	}

  __proto.show = function (data, tab) {
		(tab===void 0)&& (tab=-1);
		_super.prototype.show.call(this);
		var head;
		for(var $each_head in this._heads){
			head=this._heads[$each_head];
			head.yijisha.skin=ResPathUtil.getImageRes("yijisha",".png","common/yin");
			head.on("click",this,this.onClick);
		}
		PanelManager.hidePanel(data);
		this.addEvent("FIGHTBOSSSTATUE",this.updateBoss);
		this.addEvent(ActivityEvent.REFRESH_JIANYAO,this.updateAct);
		this.addEvent("GuildEvent.MAP_MEMBER_NUM",this.updateNum);
		this._view.btnGo.on("click",this,this.onClick);
		this._view.l_name.skin=ResPathUtil.getImageRes("l_name",".png","boss/yijie");
		data=this.updateAct(3000);
		if(data){
			BossCommandSender.sendC2S_AliveWildBossMessage(data);
		}
	}

	__proto.hide=function(){
		_super.prototype.hide.call(this);
		this._monster.stop();
		EventMgr.removeAll(this);
		this._view.p_panel.content.off("click",this,this.onClick);
		this._view.btnGo.off("click",this,this.onClick);
		var head;
		for(var $each_head in this._heads){
			head=this._heads[$each_head];
			head.off("click",this,this.onClick);
			head.yijisha.skin=null;
		}
		this._view.t_name.skin=null;
		this._view.l_name.skin=null;
		this._view.bg.skin=null;
		this._joinAct=null;
		this._curr=null;
	}

  __proto.updateAct = function (type) {
		if(type==1 || type==3000){
			this._joinAct=null;
			this._isOpen=ActivityUtil.isOpenByFunType(25)!=null;
			var act,acts=[],beans=App.dataMgr.q_activitiesContainer.getListByType(type);
			for(var i=0;i < beans.length;i++){
				act=ActivityCenter.getData(beans[i].q_id);
				if(act && act.activityStates >-1){
					acts.push(act);
				}
			};
			var head,temp,mapids=[],px=acts.length > 5 ? 0 :this._view.p_panel.width-(acts.length *87-4)>> 1;
			for(i=0;i < acts.length;i++){
				if(i < this._heads.length){
					head=this._heads[i];
				}
				else{
					head=new YijieRuqinHead();
					head.yijisha.skin=ResPathUtil.getImageRes("yijisha",".png","common/yin");
					head.on("click",this,this.onClick);
					this._view.p_panel.content.addChild(head);
					this._heads.push(head);
				}
				if(!head.parent){
					this._view.p_panel.content.addChild(head);
				}
				head.x=px+i *87;
				head.isOpen=this._isOpen;
				head.update(acts[i]);
				mapids.push(head.mapid);
				if(head.act.playerStates==0){
					this._joinAct=head.act;
					if(!temp){
						temp=head;
					}
				}
			}
			for(;i < this._heads.length;i++){
				this._heads[i].removeSelf();
			}
			this._view.p_panel.refresh();
			if(!this._curr){
				if(!temp)temp=this._heads[0];
				Event.EMPTY.setTo("click",temp,null);
				this.onClick(Event.EMPTY);
			}
			else{
				this._view.btnGo.showRedPoint(this._curr.isRedPoint);
			}
		}
		return mapids;
	}

	__proto.onClick=function(e){
		if(e.currentTarget==this._view.btnGo){
			if(!GuildCenter.hasGuild()){
				GameNotice.showMousePosMessage("未加入行会，无法参与");
				return;
			}
			if(this._curr.act.playerStates==1){
				Alert.show(TipDescUtil.getTextTipDesc(724),GameHandler.create(ActivitiesCommandSender,ActivitiesCommandSender.C2S_JoinActivityById),[this._curr.act.id]);
			}
			else{
				ZoneCommandSender.enterZoneMap(this._curr.mapid);
			}
			PanelManager.removePanel(PanelRegister.BOSS);
		}
		else if((e.currentTarget instanceof com.modules.boss.yijie.YijieRuqinHead )){
			this._curr=e.currentTarget;
			this._curr.addChild(this._view.s_select);
			this._view.r_txt1.text=this._curr.param["info"];
			this._view.r_txt2.text=this._curr.param["info2"];
			this._view.btnGo.showRedPoint(this._curr.isRedPoint);
			this._view.bg.skin=ResPathUtil.getImageRes(this._curr.act.bean.q_info_spare,".png","boss/yijie");
			this._view.t_name.skin=ResPathUtil.getImageRes(this._curr.act.bean.q_info_spare2,".png","boss/yijie");
			this._monster.showMonster(App.dataMgr.q_monsterContainer.getDataBean(this._curr.bossid));
			this._grids.showOrderGridByArr(BossDataCenter.instance.getShowItem(0,this._curr.param["items"]),4,8,8,true,8);
			GuildCommandSender.sendC2S_GuildMemberNumInMapMessage(this._curr.mapid);
			this.updateBtnState();
		}
	}

	__proto.updateBtnState=function(){
		if(this._isOpen){
			if(this._curr.yijisha.visible){
				this._view.btnGo.disabled=true;
				this._view.timeTxt.text="BOSS已被击杀";
				this._view.timeTxt.color="#ef0605";
			}
			else if(this._curr.act.activityStates !=1){
				this._view.btnGo.disabled=true;
				this._view.timeTxt.text=this._curr.act.bean.q_desc;
				this._view.timeTxt.color="#cdcdcb";
			}
			else{
				this._view.btnGo.disabled=false;
				this._view.btnGo.disabledString(this._joinAct && this._curr.act.id !=this._joinAct.id ? "已选择挑战"+GameHTML.setColor(this._joinAct.bean.q_name,"#ef0605"):null,false);
				this._view.timeTxt.text="BOSS已出现";
				this._view.timeTxt.color="#00ff00";
			}
		}
		else{
			this._view.btnGo.disabled=true;
			this._view.timeTxt.text=GameHTML.removeHtml(App.dataMgr.q_activitiesContainer.getListByFunType(25)[0].q_icon);
			this._view.timeTxt.color="#cdcdcb";
		}
	}

	__proto.updateBoss=function(){
		var head;
		for(var $each_head in this._heads){
			head=this._heads[$each_head];
			head.updateState();
		}
		this.updateBtnState();
	}

	__proto.updateNum=function(cmd){
		if(cmd.mapId==this._curr.mapid){
			this._view.guildTxt.text="本帮人数："+cmd.num;
		}
	}

	return YiJieRuQinPanel;
})(BasePanel)