/**
*坐骑化形
*@author Jian
*创建时间：2023-11-15
*/
//class com.modules.zuoqi.ZuoqiHuaxingView extends ui.mobile.zuoqi.ZuoqiHuaxingViewUI
var ZuoqiHuaxingView=(function(_super){
	function ZuoqiHuaxingView(){
		this._heads=null;
		this._starCon=null;
		this._avatar=null;
		this._costLab=null;
		this._head=null;
		this._starView=null;
		this._attr=null;
		this._dropId=24001;
		this._upcost=null;
		this._qqObj=null;
		this._isActive=false;
		this._m_types=null;
		ZuoqiHuaxingView.__super.call(this);
		this._starView=new ZuoQiShengXingView();
		this._starView.move(this.width,this.height-this._starView.height-13,this);
		this._attr=new AttrTextField();
		this._attr.move(630,100,this);
		this._attr.onlyBaseAttr(true);
		this.btnUP.delayClickEnabled=true;
		this._avatar=new GameDoubleEffect();
		this._avatar.move(352,368,this.bg);
		this._heads=[];
		var head,beans=App.dataMgr.q_mountContainer.mounts;
		for(var i=0;i < beans.length;i++){
			head=new ZuoQiHeadItem(beans[i]);
			head.move(0,i *76,this.l_panel.content);
			this._heads.push(head);
		}
		this.l_panel.vScrollBarAllwaysShow="off";
		this.l_panel.refresh();
		this.onScroll(null);
		this._starCon=new StarContainer(1,this.btnUP.x);
		this.upbox.addChild(this._starCon);
		this._costLab=new ItemCostLabel2();
		this._costLab.move(0,478,this);
		TipMgr.addTip(this.allFight,new TipData("ZUOQI_TOTAL",beans));
	}

	__class(ZuoqiHuaxingView,'com.modules.zuoqi.ZuoqiHuaxingView',_super);
	var __proto=ZuoqiHuaxingView.prototype;
	Laya.imps(__proto,{"com.game.core.panel.ITabView":true})
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		TipMgr.removeTip(this.allFight);
		this._starView=null;
		this._costLab=null;
		this._starCon=null;
		this._avatar=null;
		this._heads=null;
		this._head=null;
		this._attr=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=0);
		this.bg.skin=ResPathUtil.getImageRes("bg_huaxing",".jpg","zuoqi");
		this.l_panel.content.on("click",this,this.onClickHead);
		var head;
		for(var $each_head in this._heads){
			head=this._heads[$each_head];
			head.load(true);
			head.update();
		}
		this.addEvent(ActivityEvent.REFRESH_JIANYAO,this.updateAct);
		this.addEvent(ActivityEvent.REFRESH_DETAIL,this.updateAct);
		this.addEvent("ZuoQiCenter.ZUOQI_UPDATE",this.onUpdate);
		this.addEvent("ZuoQiCenter.ZUOQI_LIST",this.updateList);
		this.addEvent("Master.UPDATE",this.updateMaster);
		this.addEvent("Bag.CHANGE",this.onItemUpdate);
		this.l_panel.vScrollBar.on("change",this,this.onScroll);
		this.way_txt.on("click",this,this.onClick);
		this.qqLink.on("click",this,this.onClick);
		this.btnUP.on("click",this,this.onClick);
		this.btnQC.on("click",this,this.onClick);
		this.u_btn.on("click",this,this.onClick);
		this.d_btn.on("click",this,this.onClick);
		this._starView.show();
		this._width=920;
		if((data instanceof com.logic.data.item.ItemData )){
			tab=myparseInt((data).getDataBean().q_ui_param);
		}
		else{
			tab=myparseInt(data);
		}
		if(tab > 0){
			for(var i=0;i < this._heads.length;i++){
				if(this._heads[i].bean.q_id==tab){
					this._head=this._heads[i];
					this.l_panel.scrollTo(0,(i / 5 >> 0)*380);
					break ;
				}
			}
		}
		if(!this._head){
			this._head=this._heads[0];
			this.l_panel.scrollTo(0,0);
		}
		this.selectHead(this._head);
	}

	__proto.hide=function(){
		this.clearTimer(this,this.onStart);
		var head;
		for(var $each_head in this._heads){
			head=this._heads[$each_head];
			head.load(false);
		}
		EventMgr.removeAll(this);
		this.l_panel.vScrollBar.off("change",this,this.onScroll);
		this.l_panel.content.off("click",this,this.onClickHead);
		this.way_txt.off("click",this,this.onClick);
		this.qqLink.off("click",this,this.onClick);
		this.btnUP.off("click",this,this.onClick);
		this.btnQC.off("click",this,this.onClick);
		this.u_btn.off("click",this,this.onClick);
		this.d_btn.off("click",this,this.onClick);
		this.bg.skin=null;
		this._avatar.stop();
		this._m_types=null;
		this._upcost=null;
		this._qqObj=null;
		this._starView.hide();
	}

	__proto.update=function(isUp){
		(isUp===void 0)&& (isUp=0);
		var mount=this._head.bean;
		var info=ZuoQiCenter.getZuoqi(mount.q_id);
		this._isActive=Boolean(info);
		var param=!this._isActive && mount.q_open_demand ? JSON.parse(mount.q_open_demand)[0] :null;
		var bean=App.dataMgr.q_mountLvContainer.getDataBean(mount.q_id+(this._isActive ? info.lv :1));
		this.nameTxt.text=mount.q_name+(this._isActive ? "·"+bean.q_lv+"阶" :'');
		this.upbox.visible=ConditionUtil.isConditionEnough(param);
		this._starView.setBean(info,mount,bean);
		var cur=GlobalCenter.attributeDataBean;
		cur.convert(bean.q_add_attribute1);
		if(this.upbox.visible && info){
			this._starCon.visible=true;
			this._starCon.setNum(info.star,bean.q_max_layer,isUp==1 || isUp==2);
			this.yimanjie.visible=bean.q_next_id==0 && info.star >=bean.q_max_layer;
			if(info.star < bean.q_max_layer || bean.q_next_id > 0){
				var layer=new BaseAttributeDataBean();
				layer.convert(bean.q_layer_attr);
				cur.add(layer,info.star);
				this._attr.setCurrent(LazyUtil.getAttrList2(cur.attributeObject));
				this._attr.showNextByJson(bean.q_layer_attr,false,true);
				param=bean.q_level_demand ? JSON.parse(bean.q_level_demand)[0] :null;
				this.tiaojianTxt.visible=!ConditionUtil.isConditionEnough(param);
				this.btnUP.visible=!this.tiaojianTxt.visible;
				this.way_txt.visible=this.btnUP.visible;
				if(this.tiaojianTxt.visible){
					this.tiaojianTxt.text=AdvanceCenter.getTypeName(param["q_faqi"] / 100 >> 0)+"达到"+(param["q_faqi"] % 100)+"阶可升星";
				}
				this._costLab.visible=true;
				this._qqObj=bean.q_add_item ? JSON.parse(bean.q_add_item):null;
				this._upcost=JSON.parse(bean.q_levelup_consume)[0];
				this.updateAct();
				this.onItemUpdate(null);
			}
			else{
				this._attr.setCurrent(LazyUtil.getAttrList2(cur.attributeObject));
				this._attr.setNext();
				this.qipao.removeSelf();
				this.btnUP.visible=false;
				this.way_txt.visible=false;
				this.tiaojianTxt.visible=false;
				this._costLab.visible=false;
			}
		}
		else{
			this._isActive=false;
			this._costLab.visible=true;
			this._costLab.showJson(mount.q_open_cost);
			this._costLab.x=this.btnQC.x+(this.btnQC.width-this._costLab.width >> 1);
			this._attr.setCurrent(LazyUtil.getAttrList2(cur.attributeObject),true);
			this._attr.setNext(LazyUtil.getAttrList2(cur.attributeObject));
			this.tiaojianTxt.visible=!this.upbox.visible;
			if(this.upbox.visible){
				this.qipao.removeSelf();
				this.btnUP.label="激 活";
				this.btnUP.visible=true;
				this.way_txt.visible=true;
				this.yimanjie.visible=false;
				this._starCon.visible=false;
				this.btnUP.showRedPoint(this._costLab.itemEnough);
			}
			else{
				this.tiaojianTxt.text=AdvanceCenter.getTypeName(param["q_faqi"] / 100 >> 0)+"达到"+(param["q_faqi"] % 100)+"阶可激活";
			}
		}
		this._m_types=mount.q_master_type ? JSON.parse(mount.q_master_type):null;
		this.updateMaster();
	}

	__proto.onClickHead=function(e){
		var i=myparseInt(this.l_panel.content.mouseY / 76);
		var item=this.l_panel.content.getChildAt(i);
		this.selectHead(item);
	}

	__proto.selectHead=function(head){
		if(head){
			head.addChild(this.l_select);
			this._head=head;
			this._avatar.setURL(ResPathUtil.getMountPanelRes(head.bean.q_show_id),head.bean.q_show_effect > 0);
			this._avatar.play();
			this.update();
			this.changeChuzhan();
		}
	}

  __proto.onClick = function (e) {
    console.log(11111111111111111, this.head, this.head.bean.q_id);
		switch(e.currentTarget){
			case this.u_btn:
				this.l_panel.scrollTo(0,this.l_panel.vScrollBar.value-380);
				break ;
			case this.d_btn:
				this.l_panel.scrollTo(0,this.l_panel.vScrollBar.value+380);
				break ;
			case this.btnUP:
				if (this._isActive) {
					this.onStart();
				}
				if(this._costLab.itemEnough){
					HorseCommandSender.sendC2S_jihuoInfoMessage(1,this._head.bean.q_id);
					}else{
					this._costLab.onClick();
				}
				break ;
			case this.btnQC:
				HorseCommandSender.sendC2S_FaqiWearMessage(this._head.bean.q_id);
				this.changeChuzhan();
				break ;
			case this.qqLink:
				PanelOpenManager.openPanelById(this._qqObj.panelid);
				break ;
			case this.way_txt:
				PanelOpenManager.openGetway(this._costLab.itemId,this.way_txt);
				break ;
			}
	}

	__proto.onUpdate=function(type){
		this.update(type);
		if(type==0 || type==1 || type==-1){
			this._head.update();
		}
		if(type==1 || type==2){
			CPlayOnceEffect.play(ResPathUtil.getPanelEffect("shengxing_success","duanzao"),this,this.btnQC.x+this.btnQC.width *0.5,this.btnQC.y-40);
		}
	}

	__proto.updateList=function(){
		this.update();
		this.changeChuzhan();
		this._head.update();
	}

	__proto.onStart=function(){
		if(this._qqObj){
			if(this._costLab.itemId==this._qqObj.itemid){
				var item=BagItemCenter.getItemById(this._qqObj.itemid);
				if(item){
					ItemCommandSender.sendUseItemMessage(item.position,item.id,1);
				}
				return;
			}
			if(!ZuoqiHuaxingView._alertDic || !ZuoqiHuaxingView._alertDic[this._qqObj.actid]){
				var act=ActivityCenter.getData(this._qqObj.actid);
				if(act && act.activityStates==1 && act.playerStates > 0){
					if(!ZuoqiHuaxingView._alertDic)ZuoqiHuaxingView._alertDic={};
					ZuoqiHuaxingView._alertDic[this._qqObj.actid]=true;
					Alert.show(this._qqObj.desc,GameHandler.create(PanelOpenManager,PanelOpenManager.openPanelById),[this._qqObj.panelid],true,null,null,false,null,"前往查看");
					return;
				}
			}
		}
		if(this._costLab.itemEnough){
			App.sound.playSound("sound_jinjie");
			HorseCommandSender.sendC2S_FaqiUpgradeMessage(this._head.bean.q_id);
		}
		else{
			var info=ZuoQiCenter.getDrop(this._dropId);
			var data=AdvanceCenter.getFengChanLingActivityData(1);
			if(info && info.num >=info.maxNum && data){
				var id=AdvanceCenter.getFengChanLingID(1);
				if(id !=0){
					var panelId=AdvanceCenter.getFengChanLingJumpID(1);
					var bean=App.dataMgr.q_itemContainer.getDataBean(id);
					var str="激活："+GameHTML.setColor(ItemUtil.getItemName(id),GameHTML.GREEN)+"，"
					+"挂机产出的"+ItemUtil.getItemName(this._costLab.itemId)+"可从每日100个提升至"+GameHTML.setColor("每日200个",GameHTML.RED)+"，"
					+"激活后"+GameHTML.setColor("永久生效",GameHTML.RED)+"，今日累充"+GameHTML.setColor("30元",GameHTML.RED)+"可以免费领取";
					Alert.show(str,GameHandler.create(PanelOpenManager,PanelOpenManager.openPanelById,[panelId]),null,true,null,null,false,null,"查看冲榜累充");
				}
			}
			else{
				GameNotice.showMousePosMessage(ItemUtil.getItemName(this._costLab.itemId)+"不足");
			}
		}
	}

	__proto.changeChuzhan=function(){
		var info=ZuoQiCenter.getZuoqi(this._head.bean.q_id);
		if(info){
			this.chuzhan.visible=info.faqiId==ZuoQiCenter.wearId;
			this.btnQC.visible=!this.chuzhan.visible;
		}
		else{
			this.btnQC.visible=false;
			this.chuzhan.visible=false;
		}
	}

	__proto.onItemUpdate=function(ids){
		if(this._costLab.visible){
			if(this._isActive){
				if(this._qqObj && BagItemCenter.getItemCount(this._qqObj.itemid,true)> 0){
					this._costLab.showObject({id:this._qqObj.itemid,num:1},0);
					this.btnUP.label="使用直升丹";
					this.qipao.removeSelf();
				}
				else{
					this.btnUP.label="化形升星";
					this._costLab.showObject(this._upcost,0);
				}
			}
			else if(ids && ids.indexOf(this._costLab.itemId)>=0){
				this._costLab.update();
			}
			this._costLab.x=this.btnQC.x+(this.btnQC.width-this._costLab.width >> 1);
			this.btnUP.showRedPoint(this.btnUP.visible && this._costLab.itemEnough);
		}
		if(ids){
			var head;
			for(var $each_head in this._heads){
				head=this._heads[$each_head];
				head.update();
			}
		}
	}

	__proto.updateAct=function(type){
		(type===void 0)&& (type=-1);
		if(this._qqObj && BagItemCenter.getItemCount(this._qqObj.itemid)==0){
			var act=ActivityCenter.getData(this._qqObj.actid);
			if(act && act.activityStates==1 && act.playerStates > 0){
				this.qq_txt.text=this._qqObj.desc;
				this.upbox.addChild(this.qipao);
				this.qipao.skin=ResPathUtil.getImageRes("pao4",".png","common");
				return;
			}
		}
		this.qipao.removeSelf();
	}

	__proto.onScroll=function(e){
		this.u_btn.disabled=this.l_panel.vScrollBar.value <=this.l_panel.vScrollBar.min;
		this.d_btn.disabled=this.l_panel.vScrollBar.value >=this.l_panel.vScrollBar.max;
	}

	__proto.updateMaster=function(){
		if(this._m_types){
			var lvBean;
			var type=Math.max.apply(null,this._m_types);
			var m_info=MasterCenter.getMasterDataByType(type);
			var bean=m_info ? m_info.getBean():App.dataMgr.q_equip_masterContainer.getBean(type,1);
			if(!bean)return;
			var param=JSON.parse(bean.q_add_condition);
			var id=0,lv=0,n_lv=0,num=0,info,names=['',''],ids=param["mountlvs"];
			for(var i=0;i < ids.length;i++){
				n_lv=ids[i] % 100;
				id=ids[i]-n_lv;
				info=ZuoQiCenter.getZuoqi(id);
				lv=info ? info.lv :0;
				if(lv < n_lv){
					names[i % 2]+=GameHTML.setColor(App.dataMgr.q_mountContainer.getDataBean(id).q_name+(lv > 0 ? '+'+lv :''),"#b6b6b6");
				}
				else{
					num++;
					lvBean=App.dataMgr.q_mountLvContainer.getDataBean(id+lv);
					names[i % 2]+=App.dataMgr.q_mountContainer.getDataBean(id).q_name+("·"+(lvBean.q_next_id > 0 ? lv+"阶" :"Max"));
				}
				if(i < ids.length-2){
					names[i % 2]+="<br/>";
				}
			}
			this.zuoqiNT0.text=names[0];
			this.zuoqiNT1.text=names[1];
			this.suitTxt.y=this.zuoqiNT0.y+this.zuoqiNT0.getHeight();
			names[0]='';
			for(i=0;i < this._m_types.length;i++){
				m_info=MasterCenter.getMasterDataByType(this._m_types[i]);
				bean=m_info ? m_info.getBean():App.dataMgr.q_equip_masterContainer.getBean(this._m_types[i],1);
				if(bean){
					names[0]+=GameHTML.setColor(bean.q_name,"#d4c4aa")+GameHTML.setColor("("+(num > bean.q_suit_num ? bean.q_suit_num :num)+'/'+bean.q_suit_num+")",num < bean.q_suit_num ? "#ef0605" :"#00ff00")+"<br/>";
					names[0]+=num < bean.q_suit_num ? GameHTML.setColor(bean.q_add_attribute_client,"#b6b6b6"):bean.q_add_attribute_client;
					names[0]+="<br/>";
				}
			}
			this.suitTxt.text=names[0];
		}
		else{
			this.suitTxt.text='';
			this.zuoqiNT0.text='';
			this.zuoqiNT1.text='';
		}
	}

	ZuoqiHuaxingView._alertDic=null;
	return ZuoqiHuaxingView;
})(ZuoqiHuaxingViewUI)