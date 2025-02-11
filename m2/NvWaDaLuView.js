/**
*女娲大陆-女娲大陆
*@author zq
*创建时间：2023年11月9日 14:58:29
*/
//class com.modules.kuafu.nwdl.NvWaDaLuView extends ui.mobile.kuafu.nwdl.NvWaDaLuViewUI
var NvWaDaLuView=(function(_super){
	function NvWaDaLuView(){
		this._reward=null;
		this._costNum=null;
		this._acc=null;
		this._time=0;
		this._vo=null;
		this._boss=new EffectMaker();
		NvWaDaLuView.__super.call(this);
		App.registerNumber("taofa_num","0123456789",0,200,27);
		this._costNum=NumberBitmap.show("taofa_num");
		this._costNum.move(216,32,this.bgNeed);
		this._acc=new Accordion(272,516,GameHandler.create(this,this.onClickItem));
		this._acc.move(18,50,this);
		this._acc.setItemStyle(NvWaDaLuAccordionHead,NvWaDaLuAccordionItem,49,90);
		this._acc.setSelectStyle("mobile/common/listselect1.png",272,90,"10,10,10,10");
		this._reward=new ShowItemListTween(true,true,5,this,405,488);
		this._reward.setMaskByGrids(6.5);
		var dataProvider=[];
		var map={};
		var beans=App.dataMgr.q_fightBossContainer.getListBy(17);
		for (var i=0;i < beans.length;i++){
			var bean=beans[i];
			var vo=map[bean.q_boss_type_name];
			if(vo==null){
				vo={};
				vo.label=bean.q_name;
				vo.data=[];
				map[bean.q_boss_type_name]=vo;
				dataProvider.push(vo);
			};
			var mapid=JSON.parse(bean.q_refresh_maps)[0];
			var monsterids=JSON.parse(bean.q_monster_id);
			for (var j=0;j < monsterids.length;j++){
				var monsterBean=App.dataMgr.q_monsterContainer.getDataBean(monsterids[j]);
				vo.data.push({bean:bean,mapid:mapid,monsterBean:monsterBean});
			}
		}
		this._acc.dataProvider=dataProvider;
		TipMgr.addTip(this.tipBox,new TipData("TEXT",TipDescUtil.getTextTipDesc(393)));
	}

	__class(NvWaDaLuView,'com.modules.kuafu.nwdl.NvWaDaLuView',_super);
	var __proto=NvWaDaLuView.prototype;
	Laya.imps(__proto,{"com.game.core.panel.ITabView":true})
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._costNum=null;
		this._reward=null;
		this._acc=null;
		this._vo=null;
		if(this._boss){
			this._boss.dispose();
			this._boss=null;
		}
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		this.addEvent("FIGHTBOSSSTATUE",this.updateBoss);
		this.addEvent("FightBossEvent.TILI_CHANGE",this.updateTili);
		this.btnGou.on("click",this,this.onClick);
		this.btn.on("click",this,this.onClick);
		this.updateBoss();
	}

	__proto.hide=function(){
		EventMgr.removeAll(this);
		this.btn.off("click",this,this.onClick);
		this.btnGou.off("click",this,this.onClick);
		this._acc.setSelectedIndex(-1);
		this._boss.clear();
		this.clearTimer(this,this.onTimer);
		this._vo=null;
	}

	__proto.updateBoss=function(){
		this._acc.refresh();
		if(!this._vo){
			var datas,myfsV=App.role.getAttr(18)*0.01;
			for(var i=this._acc.dataProvider.length-1;i >-1;i--){
				datas=this._acc.dataProvider[i]["data"];
				if(ConditionUtil.isMapCanEnter(datas[0].mapid)){
					for(var j=datas.length-1;j >-1;j--){
						if(myparseInt(datas[j]["monsterBean"]["q_say_content_client"])<=myfsV){
							this._acc.setSelectedIndex(i,j,true,true);
							return;
						}
					}
				}
			}
			this._acc.setSelectedIndex(0,0,true,true);
		}
		else{
			this.showBoss(this._vo);
		}
	}

	__proto.showBoss=function(vo){
		this._vo=vo;
		var fightBean=vo.bean;
		var monsterBean=vo.monsterBean;
		var fsV=myparseInt(monsterBean.q_say_content_client);
		var mapid=vo.mapid;
		this.btn.tag=mapid;
		this.descTxt.text="[BOSS附带荆棘反伤"+fsV+"%]";
		this.btnGou.selected=BossDataCenter.instance.isGuanzhu(mapid,monsterBean.q_id);
		this._reward.showArr(BossDataCenter.instance.getShowItem(0,monsterBean.q_blonger_drop_id ? JSON.parse(monsterBean.q_blonger_drop_id).dropId :0));
		this._boss.showMonsterAvatar(ResPathUtil.getMapMonsterAvatarRes(monsterBean.q_featureid),false,this.avatarNode);
		if(monsterBean.q_blonger_tili){
			this._costNum.show(JSON.parse(monsterBean.q_blonger_tili).num+"");
		};
		var mapBean=App.dataMgr.q_mapContainer.getDataBean(mapid);
		if(mapBean){
			this.need_txt.text=GameHTML.setColor("进入条件：","#ecc180")+ConditionUtil.getMapEnterDesc(mapBean);
			this.need_txt.tag=ConditionUtil.isMapCanEnter(mapBean);
			this.need_txt.color=this.need_txt.tag ? GameHTML.GREEN :GameHTML.RED;
		}
		this._time=BossDataCenter.instance.showState(monsterBean,mapid);
		this.timerLoop(1000,this,this.onTimer);
		this.onTimer();
		this.updateTili();
	}

	__proto.onTimer=function(){
		if(this._time > 0){
			this.time_txt.htmlText="刷新时间:"+GameHTML.setColor(DateUtils.convertTime(this._time--),GameHTML.RED);
			this.bg_time.visible=true;
		}
		else{
			this.bg_time.visible=false;
			this.clearTimer(this,this.onTimer);
		}
	}

	__proto.onClickItem=function(item){
		this.showBoss(item.data);
	}

	__proto.onClick=function(e){
		if(e.currentTarget==this.btn){
			if(this.need_txt.tag){
				TransferManager.transferByMapId(this.btn.tag,true);
				PanelManager.removePanel(PanelRegister.NVWA_BOSS);
				PanelManager.removePanel(PanelRegister.BOSS);
			}
			else{
				GameNotice.showMousePosMessage("未达成进入条件！");
			}
		}
		else if(e.currentTarget==this.btnGou){
			if(this._vo){
				BossDataCenter.instance.setGuanzhu(this._vo.mapid,this._vo.monsterBean.q_id,this.btnGou.selected);
			}
		}
	}

	__proto.updateTili=function(){
		var num=BossDataCenter.instance.getTiliNum(147);
		this.tiliTxt.text="当前拥有讨伐令："+GameHTML.setColor(num,"#cdcdcb");
		this.btn.showRedPoint(this.need_txt.tag && num > 0);
	}

	return NvWaDaLuView;
})(NvWaDaLuViewUI)