var ZhuanShengView=(function(_super){
	function ZhuanShengView(){
		this._attrCon=null;
		this._balls={};
		this._ps=null;
		this._star=-1;
		this._lvEnough=false;
		this._itemId=0;
		this._tipData1=null;
		this._tipData2=null;
		ZhuanShengView.__super.call(this);
		this.init();
	}

	__class(ZhuanShengView,'com.modules.role.zhuansheng.ZhuanShengView',_super);
	var __proto=ZhuanShengView.prototype;
	Laya.imps(__proto,{"com.game.core.panel.ITabView":true})
	__proto.init=function(){
		this._attrCon=new AttrTextField(10,16,230);
		this._attrCon.move(540,180,this);
		var p0=[{x:189,y:85},{x:177,y:148},{x:230,y:124},{x:210,y:170},{x:194,y:211},{x:224,y:246},{x:264,y:288},{x:201,y:278},{x:145,y:268},{x:105,y:347}];
		var p1=[{x:140,y:66},{x:105,y:121},{x:149,y:147},{x:136,y:177},{x:125,y:208},{x:114,y:244},{x:164,y:266},{x:217,y:285},{x:232,y:323},{x:241,y:364}];
		var p2=[{x:179,y:66},{x:219,y:121},{x:135,y:143},{x:196,y:202},{x:156,y:235},{x:114,y:270},{x:178,y:266},{x:236,y:265},{x:264,y:307},{x:299,y:369}];
		var p3=[{x:196,y:71},{x:168,y:131},{x:222,y:151},{x:267,y:177},{x:214,y:201},{x:292,y:261},{x:249,y:268},{x:198,y:273},{x:153,y:279},{x:110,y:359}];
		var p4=[{x:189,y:98},{x:136,y:164},{x:170,y:178},{x:211,y:189},{x:203,y:227},{x:188,y:266},{x:116,y:319},{x:186,y:332},{x:252,y:342},{x:277,y:251}];
		var p5=[{x:182,y:60},{x:138,y:110},{x:152,y:144},{x:168,y:190},{x:196,y:153},{x:206,y:192},{x:220,y:247},{x:172,y:237},{x:130,y:228},{x:106,y:300}];
		this._ps=[p0,p1,p2,p3,p4,p5];
		TaskCommandSender.sendC2S_PanelTaskReturnMessage(1010004);
		this._tipData1=new TipData("ITEM");
		this._tipData2=new TipData("ITEM");
	}

	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._tipData1=null;
		this._tipData2=null;
		if(this._balls){
			for (var key in this._balls){
				var ball=this._balls[key];
				if(ball){
					ball.dispose();
				}
			}
			this._balls=null;
		}
		this._attrCon=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		this.addEvent("PE.JING_JIE",this.onChangeZhuanSheng);
		this.addEvent("PE.LEVEL_UP",this.onChangeLevel);
		this.addEvent("Bag.CHANGE",this.updateCost);
		this.addEvent("MoneyEvent.CHANGE",this.updateCost);
		this.btnLink.on("click",this,this.onClick);
		this.btn.on("click",this,this.onClick);
		this.btn_add.on("click",this,this.onClick);
		TipMgr.addTip(this.icon0,this._tipData1);
		TipMgr.addTip(this.icon1,this._tipData2);
		this.onChangeZhuanSheng();
	}

	__proto.hide=function(){
		EventMgr.removeAll(this);
		this.btnLink.off("click",this,this.onClick);
		this.btn.off("click",this,this.onClick);
		this.btn_add.off("click",this,this.onClick);
		TipMgr.removeTip(this.icon0);
		TipMgr.removeTip(this.icon1);
	}

	__proto.onChangeZhuanSheng=function(){
		var bean=ZhuanShengCenter.bean;
		var lv=ZhuanShengCenter.level;
		var star=ZhuanShengCenter.star;
		var index=lv % 6;
		var max=10;
		this.name_txt.text=bean.q_name;
		this.vip_txt.text=bean.q_panelid;
		this.imgName.skin=ResPathUtil.getImageRes("jingjie_"+lv,".png","role/zhuansheng");
		this.jianying.skin=ResPathUtil.getImageRes("bg_jianying_"+index,".png","role/zhuansheng");
		this._attrCon.showCurrentByJson_v2(bean.q_add_attribute1,bean.q_layer_attr,star);
		if(star < max){
			this._attrCon.showNextByJson_v2(bean.q_add_attribute1,bean.q_layer_attr,star+1,false);
		}
		else if(bean.q_next_id > 0){
			var next=App.dataMgr.q_jingjieContainer.getDataBean(bean.q_next_id);
			this._attrCon.showNextByJson_v2(next.q_add_attribute1,next.q_layer_attr,1,false);
		}
		else{
			this._attrCon.showNextByJson_v2(bean.q_add_attribute1,bean.q_layer_attr,star,false);
		}
		this.imgMax.visible=bean.q_next_id==0 && star==10;
		this.btn.visible=this.btnLink.visible=this.bg_cost.visible=this.needLv_txt.visible=!this.imgMax.visible;
		this.updateCost();
		this.onChangeLevel();
		var newStar=-1;
		if(this._star !=-1 && this._star !=star){
			newStar=star;
		}
		this._star=star;
		this.hideBall();
		var xys=this._ps[index];
		for (var i=0;i < max;i++){
			if(star > i){
				var bx=xys[max-i-1].x;
				var by=xys[max-i-1].y;
				this.showBall(i,bx,by);
				if(newStar==i+1){
					CPlayOnceEffect.play(ResPathUtil.getPanelEffect("activate","main/vipzone"),this.jianying,bx,by);
					App.sound.playSound("newstar");
				}
			}
		}
	}

	__proto.updateCost=function(){
		var needs;
		if(ZhuanShengCenter.star < 10){
			needs=JSON.parse(ZhuanShengCenter.bean.q_layer_cost);
		}
		else{
			needs=JSON.parse(ZhuanShengCenter.bean.q_jingjie_cost);
		}
		this._itemId=0;
		var w=10;
		var tips=[this._tipData1,this._tipData2];
		for (var i=0;i < 2;i++){
			var icon=this["icon"+i];
			var cost_txt=this["cost_txt"+i];
			if(i < needs.length){
				var itemId=needs[i].id;
				var num=needs[i].num;
				var own=BagItemCenter.getItemCount(itemId);
				icon.x=w;
				icon.url=ResPathUtil.getIcon(ItemUtil.getIcon(itemId),EnumImageType.ITEM_40);
				icon.visible=true;
				cost_txt.visible=true;
				cost_txt.x=w+33;
				cost_txt.text=own+"/"+num;
				cost_txt.color=own >=num ? GameHTML.GREEN :GameHTML.RED;
				w+=33+cost_txt.width+5;
				var tipData=tips[i];
				tipData.data=itemId;
				if(this._itemId==0){
					this._itemId=itemId;
				}
			}
			else{
				icon.visible=false;
				cost_txt.visible=false;
			}
		}
		this.bg_cost.width=w+10;
		this.bg_cost.x=this.btn.x-this.bg_cost.width / 2;
		this.btn_add.x=this.bg_cost.width+5;
		this.updateBtnState();
	}

	__proto.onChangeLevel=function(){
		var bean=ZhuanShengCenter.bean;
		this.needLv_txt.text=ZhuanShengCenter.star==10 && bean.q_lv_1 > 0 ? "需求等级："+bean.q_lv_1 :"";
		this.needLv_txt.color=App.role.allLevel >=bean.q_lv_1 ? GameHTML.GREEN :GameHTML.RED;
		this.updateBtnState();
	}

	__proto.updateBtnState=function(){
		this.btn.showRedPoint(this.btn.visible && ZhuanShengCenter.upgradePoint,125,5);
		this.btn.isRedPoint ? this.btnLink.hideFlowEffect():this.btnLink.showFlowEffect("btn",0,0,"common/guide");
	}

	__proto.showBall=function(index,bx,by){
		var ball=this._balls[index];
		if(ball==null){
			ball=GameEffect.getEffect();
			ball.url=ResPathUtil.getPanelEffect("ball","role");
			this._balls[index]=ball;
		}
		ball.move(bx,by,this.jianying);
		ball.play();
	}

	__proto.hideBall=function(){
		for (var i=0;i < 10;i++){
			var ball=this._balls[i];
			if(ball){
				ball.stopAndHide();
				ball.removeSelf();
			}
		}
	}

	__proto.onClick=function(e){
		switch(e.currentTarget){
			case this.btn_add:
				if(this._itemId==0){
					GameNotice.showMousePosMessage("暂无商品信息");
					return;
				};
				var itemBean=App.dataMgr.q_itemContainer.getDataBean(this._itemId);
				if(itemBean && itemBean.q_shop_id){
					var shopBean=App.dataMgr.q_shopContainer.getDataBean(itemBean.q_shop_id);
					PanelOpenManager.openBuyPanel(shopBean);
				}
				else{
					GameNotice.showMousePosMessage("暂无商品...");
				}
				break ;
			case this.btnLink:
				PanelOpenManager.openGetwayBuyAndJump(this._itemId);
				break ;
			case this.btn:
				if(ZhuanShengCenter.star < 10){
					if(!ConditionUtil.isItemEnoughJson(ZhuanShengCenter.bean.q_layer_cost)){
						PanelOpenManager.openGetwayBuyAndJump(this._itemId);
					}
				}
				else{
					if(!ConditionUtil.isItemEnoughJson(ZhuanShengCenter.bean.q_jingjie_cost)){
						PanelOpenManager.openGetwayBuyAndJump(this._itemId);
					}
				}
				if(ZhuanShengCenter.upgradePoint){
					ZhuanShengCenter.sendC2S_JingjieLvUpMessage();
					GlobalCenter.point.setTo(700,320);
					GlobalCenter.point=this.localToGlobal(GlobalCenter.point);
					CPlayOnceEffect.play(ResPathUtil.getPanelEffect("success2","common"),App.stageLayer.popLayer,GlobalCenter.point.x,GlobalCenter.point.y);
				}
				else{
					GameNotice.showMousePosMessage("未满足转生条件");
				}
				break ;
			}
	}

	return ZhuanShengView;
})(ZhuanShengViewUI)