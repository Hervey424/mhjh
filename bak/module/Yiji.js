var YijiView=(function(_super){
	function YijiView(){
		this._fightBeanArr=null;
		this._fightBean=null;
		this._itemVec=null;
		this._showItem=null;
		this._enterArr=null;
		//能进入的层数组
		this._tiliNum=0;
		this._isGou=false;
		YijiView.__super.call(this);
		this._itemVec=[];
		this._showItem=new ShowItemListTween(true,true,8,this,127,495);
		this._showItem.setMaskByGrids(8);
		this.tabs_panel.vScrollBarAllwaysShow="off";
	}

	__class(YijiView,'com.modules.kuafuBattle.view.YijiView',_super);
	var __proto=YijiView.prototype;
	Laya.imps(__proto,{"com.game.core.panel.ITabView":true})
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._itemVec=null;
		this._showItem=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		TipMgr.addTip(this.helpBox,new TipData("TEXT",App.dataMgr.q_tipContainer.getDataBean(728).q_tipDesc));
		this.btnEnter.on("click",this,this.onClick);
		this.btnGou.on("click",this,this.onClick);
		this.tabs.on("change",this,this.onTab);
		this.addEvent("FIGHTBOSSSTATUE",this.onUpdateBoss);
		this.addEvent("FightBossEvent.TILI_CHANGE",this.onTiliChange);
		this.addEvent("WearEquipCenter.WEAR",this.onWear);
		this.setTabInfo();
		this.onTiliChange();
	}

	__proto.hide=function(){
		TipMgr.removeTip(this.helpBox);
		this.tabs.selectedIndex=-1;
		this.tabs.off("change",this,this.onTab);
		this.btnEnter.off("click",this,this.onClick);
		this.btnGou.off("click",this,this.onClick);
		EventMgr.removeAll(this);
		this._fightBeanArr=null;
		this._fightBean=null;
		this._enterArr=null;
		for(var i=0;i < this._itemVec.length;i++){
			this._itemVec[i].clear();
		}
	}

	__proto.onClick=function(e){
		switch(e.currentTarget){
			case this.btnEnter:;
				var bossIds=JSON.parse(this._fightBean.q_monster_id);
				var mapids=JSON.parse(this._fightBean.q_refresh_maps);
				TransferManager.toBossMap(12,mapids[0],bossIds[0],this._fightBean.q_id);
				PanelManager.removePanel(PanelRegister.KUAFU_BATTLE);
				PanelManager.removePanel(PanelRegister.BOSS);
				break ;
			case this.btnGou:
				this.setGou();
				break ;
			}
	}

	__proto.setGou=function(){
		if(this._enterArr.indexOf(this.tabs.selectedIndex)==-1){
			this.btnGou.selected=false;
			this._isGou=this.btnGou.selected;
			GameNotice.showMousePosMessage("不满足条件");
			return;
		}
		this._isGou=!this._isGou;
		this.btnGou.selected=this._isGou;
		var bossIds=JSON.parse(this._fightBean.q_monster_id);
		var mapids=JSON.parse(this._fightBean.q_refresh_maps);
		for(var i=0;i < bossIds.length;i++){
			BossDataCenter.instance.setGuanzhu(mapids[i],bossIds[i],this.btnGou.selected);
		}
		this.showRedpoint();
	}

	__proto.onTab=function(e){
		if(this.tabs.selectedIndex==-1)return;
		this._fightBean=this._fightBeanArr[this.tabs.selectedIndex];
		var mapids=JSON.parse(this._fightBean.q_refresh_maps);
		var bossIds=JSON.parse(this._fightBean.q_monster_id);
		BossCommandSender.sendC2S_AliveWildBossMessage(mapids);
		this.btnGou.selected=BossDataCenter.instance.isGuanzhu(mapids[0],bossIds[0]);
		this._isGou=this.btnGou.selected;
		var mapBean=App.dataMgr.q_mapContainer.getDataBean(mapids[0]);
		var key=ConditionUtil.getMapEnterKey(mapBean);
		if(key){
			var attrArr=JunZhuangCenter.getSummaryAttrs();
			var condition=JSON.parse(key)[0];
			var index=0;
			var obj;
			var attrValue=0;
			var okNum=0;
			var battleId=0;
			var bean;
			var q_color;
			for(var i=0;i < 5;i++){
				this["attrName"+i].text="";
				this["valuext"+i].text="";
			}
			if(condition["q_tongshuai"]){
				battleId=137;
				bean=App.dataMgr.q_battle_param_nameContainer.getDataBean(battleId);
				q_color=GameColor.getColor(bean.q_color);
				attrValue=KuafuBattleCenter.getAttrValue(attrArr,"统率");
				this["attrName"+index].text="统率：";
				this["valuext"+index].text=attrValue+"/"+condition["q_tongshuai"];
				if(attrValue >=myparseInt(condition["q_tongshuai"])){
					this["valuext"+index].color=q_color;
					okNum++;
					}else{
					this["valuext"+index].color="#ef0605";
				}
				this["attrName"+index].color=q_color;
				index++;
			}
			if(condition["q_yongwu"]){
				battleId=138;
				bean=App.dataMgr.q_battle_param_nameContainer.getDataBean(battleId);
				q_color=GameColor.getColor(bean.q_color);
				attrValue=KuafuBattleCenter.getAttrValue(attrArr,"勇武");
				this["attrName"+index].text="勇武：";
				this["valuext"+index].text=attrValue+"/"+condition["q_yongwu"];
				if(attrValue >=myparseInt(condition["q_yongwu"])){
					this["valuext"+index].color=q_color;
					okNum++;
					}else{
					this["valuext"+index].color="#ef0605";
				}
				this["attrName"+index].color=q_color;
				index++;
			}
			if(condition["q_zhimou"]){
				battleId=139;
				bean=App.dataMgr.q_battle_param_nameContainer.getDataBean(battleId);
				q_color=GameColor.getColor(bean.q_color);
				attrValue=KuafuBattleCenter.getAttrValue(attrArr,"智谋");
				this["attrName"+index].text="智谋：";
				this["valuext"+index].text=attrValue+"/"+condition["q_zhimou"];
				if(attrValue >=myparseInt(condition["q_zhimou"])){
					this["valuext"+index].color=q_color;
					okNum++;
					}else{
					this["valuext"+index].color="#ef0605";
				}
				this["attrName"+index].color=q_color;
				index++;
			}
			if(condition["q_neizheng"]){
				battleId=140;
				bean=App.dataMgr.q_battle_param_nameContainer.getDataBean(battleId);
				q_color=GameColor.getColor(bean.q_color);
				attrValue=KuafuBattleCenter.getAttrValue(attrArr,"内政");
				this["attrName"+index].text="内政：";
				this["valuext"+index].text=attrValue+"/"+condition["q_neizheng"];
				if(attrValue >=myparseInt(condition["q_neizheng"])){
					this["valuext"+index].color=q_color;
					okNum++;
					}else{
					this["valuext"+index].color="#ef0605";
				}
				this["attrName"+index].color=q_color;
				index++;
			}
			if(condition["q_weiwang"]){
				battleId=141;
				bean=App.dataMgr.q_battle_param_nameContainer.getDataBean(battleId);
				q_color=GameColor.getColor(bean.q_color);
				attrValue=KuafuBattleCenter.getAttrValue(attrArr,"威望");
				this["attrName"+index].text="威望：";
				this["valuext"+index].text=attrValue+"/"+condition["q_weiwang"];
				if(attrValue >=myparseInt(condition["q_weiwang"])){
					this["valuext"+index].color=q_color;
					okNum++;
					}else{
					this["valuext"+index].color="#ef0605";
				}
				this["attrName"+index].color=q_color;
				index++;
			}
			if(okNum==index){
				this.btnEnter.visible=true;
				this.attrSp.visible=false;
				this.conditionTxt.visible=false;
			}
			else{
				this.attrSp.visible=true;
				this.conditionTxt.visible=true;
				this.btnEnter.visible=false;
			}
			this.attrSp.y=index > 3 ? 382 :420;
		}
		else{
			this.attrSp.visible=false;
			this.conditionTxt.visible=false;
			this.btnEnter.visible=true;
		};
		var monsterBean=App.dataMgr.q_monsterContainer.getDataBean(bossIds[0]);
		var drop=App.dataMgr.q_monster_dropprob.getDataBean(myparseInt(monsterBean.q_items),false);
		this._showItem.showJson(drop.q_zs_items);
		this.refreshBossInfo();
		this.showRedpoint();
	}

	__proto.onWear=function(data){
		if(JunZhuangCenter.parts.indexOf(data.position)!=-1){
			this.setTabInfo();
		}
	}

	__proto.onTiliChange=function(){
		var info=BossDataCenter.instance.getMonsterTili(179);
		if(info){
			this._tiliNum=info.num;
			this.numTxt.htmlText="剩余挑战次数："+GameHTML.setColor(info.num+"/"+info.maxnum,info.num > 0 ? "#00ff00" :"#ef0605");
			this.showRedpoint();
		}
	}

	__proto.onUpdateBoss=function(){
		this.refreshBossInfo();
		this.showRedpoint();
	}

	__proto.setTabInfo=function(){
		var all=App.dataMgr.q_fightBossContainer.getListBy(31);
		this._fightBeanArr=[];
		var bean;
		var mapid=0;
		var mapBean;
		var tabLabels="";
		this._enterArr=[]
		for(var i=0;i < all.length;i++){
			bean=all[i];
			mapid=JSON.parse(bean.q_refresh_maps)[0];
			mapBean=App.dataMgr.q_mapContainer.getDataBean(mapid);
			if(MapUtil.checkMapShowCondition(mapid)){
				if(i < 5){
					tabLabels+=bean.q_name+",";
					this._fightBeanArr.push(bean);
				}
				if(ConditionUtil.isMapCanEnter(mapBean)){
					this._enterArr.push(i);
					if(i >=5){
						tabLabels+=bean.q_name+",";
						this._fightBeanArr.push(bean);
					}
				}
			}
		}
		if(this._fightBeanArr.length < all.length){
			bean=all[this._fightBeanArr.length];
			tabLabels+=bean.q_name+",";
			this._fightBeanArr.push(bean);
		}
		this.tabs.labels=tabLabels.substring(0,tabLabels.length-1);
		var index=-1;
		var enterNewArr=this._enterArr;
		if(this._enterArr.length > 3){
			enterNewArr=this._enterArr.slice(this._enterArr.length-3);
		};
		var info=BossDataCenter.instance.getMonsterTili(179);
		if(info && enterNewArr.length > 0){
			var bossId=0;
			for(i=0;i < enterNewArr.length;i++){
				bean=all[enterNewArr[i]];
				mapid=JSON.parse(bean.q_refresh_maps)[0];
				bossId=JSON.parse(bean.q_monster_id)[0];
				if(BossDataCenter.instance.isGuanzhu(mapid,bossId)){
					index=enterNewArr[i];
				}
			}
			index=info.num > 0 ? (index !=-1 ? index :enterNewArr[enterNewArr.length-1]):enterNewArr[enterNewArr.length-1];
		}
		this.tabs.selectedIndex=index;
		if(index > 4){
			var scrollX=120 *index;
			this.tabs_panel.scrollTo(scrollX);
			}else{
			this.tabs_panel.scrollTo(0);
		}
	}

	__proto.refreshBossInfo=function(){
		var bossIds=JSON.parse(this._fightBean.q_monster_id);
		var mapids=JSON.parse(this._fightBean.q_refresh_maps);
		var item;
		var pos=[[29,99],[357,113],[654,97]];
		for(var i=0;i < bossIds.length;i++){
			if(this._itemVec[i]==null){
				item=new YijiItem();
				item.move(pos[i][0],pos[i][1],this,i);
				this._itemVec.push(item);
			}
			else{
				item=this._itemVec[i];
			}
			item.setInfo(mapids[i],bossIds[i]);
		}
	}

	__proto.showRedpoint=function(){
		if(!this._enterArr)return;
		if(!this._fightBean)return;
		var enterNewArr=this._enterArr;
		if(this._enterArr.length > 3){
			enterNewArr=this._enterArr.slice(this._enterArr.length-3);
		};
		var tiliNum=BossDataCenter.instance.getTiliNum(179);
		var fightBean,btnRed=false,red=false,mapids,bossIds;
		for(var i=0;i < this._fightBeanArr.length;i++){
			if(enterNewArr.indexOf(i)!=-1){
				fightBean=this._fightBeanArr[i];
				if(tiliNum > 0){
					mapids=JSON.parse(fightBean.q_refresh_maps);
					bossIds=JSON.parse(fightBean.q_monster_id);
					if(BossDataCenter.instance.isGuanzhu(mapids[0],bossIds[0])){
						red=BossDataCenter.instance.getMapsBossNum(mapids,null,bossIds,true)> 0;
						this.tabs.showRedPointByIndex(i,red);
						if(red && i==this.tabs.selectedIndex){
							btnRed=true;
						}
						continue ;
					}
				}
			}
			this.tabs.showRedPointByIndex(i,false);
		}
		this.btnEnter.showRedPoint(btnRed);
		this.btnEnter.disabled=tiliNum <=0;
	}

	return YijiView;
})(YijiViewUI)