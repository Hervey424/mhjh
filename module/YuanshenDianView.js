/**
*
*@author Jian
*创建时间：2024-1-15
*/
//class com.modules.pet.YuanshenDianView extends ui.mobile.pet.view.YuanshenDianViewUI
var YuanshenDianView=(function(_super){
	function YuanshenDianView(){
		this._avatars=null;
		this._tabs=null;
		this._costLab=null;
		this._c_attr=null;
		this._n_attr=null;
		this._c_level=null;
		this._n_level=null;
		this._costs=null;
		this._id=0;
		this._guide=null;
		YuanshenDianView.__super.call(this);
		this._tabs=[];
		this._avatars=[];
		App.registerNumber("44","0123456789",0,120,17);
		var bean,ava,xys=[[330,304],[140,290],[504,290]],funs=PetCenter.PET_FUNS.concat(195),tx=[92,233,372,503];
		for(var i=0;i < 4;i++){
			this._tabs.push(new YuanshendianTab(i,funs[i]));
			this._tabs[i].move(tx[i],504,this);
			if(i > 2)continue ;
			ava=new UIPet();
			ava.move(xys[i][0],xys[i][1],this,0);
			if(i > 0){
				ava.scaleXY=0.8;
			}
			this._avatars.push(ava);
		}
		this._c_attr=new AttrTextField(6,18);
		this._c_attr.move(660,96,this);
		this._n_attr=new AttrTextField(6,18);
		this._n_attr.move(-35,36,this.n_font0);
		this._costLab=new ItemCostLabel2();
		this._costLab.move(0,472,this);
		this._c_level=NumberBitmap.show("44");
		this._n_level=NumberBitmap.show("44");
		this._c_level.move(106,2,this.c_font0);
		this._n_level.move(106,2,this.n_font0);
		this.btnUP2.isShowFlowEffect=false;
		this.btnUP0.tag=0;
		this.btnUP1.tag=1;
		this.btnUP2.tag=0;
	}

	__class(YuanshenDianView,'com.modules.pet.YuanshenDianView',_super);
	var __proto=YuanshenDianView.prototype;
	Laya.imps(__proto,{"com.game.core.panel.ITabView":true})
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._costLab=null;
		this._avatars=null;
		this._c_level=null;
		this._n_level=null;
		this._c_attr=null;
		this._n_attr=null;
		this._tabs=null;
		laya.ui.View.prototype.destroy.call(this);
	}

  __proto.show = function (data, tab) {
    (tab === void 0) && (tab = -1);
		this._costs=[];
		for(var i=0;i < 4;i++){
			this._tabs[i].on("click",this,this.onClick);
			if(i < 3){
				this._avatars[i].play();
			}
		}
		this.addEvent("ET.FUNCTION_OPEN",this.onFunction);
		this.addEvent(ShenShiCenter.YUANSHENDIAN,this.update);
		this.addEvent("MoneyEvent.CHANGE",this.onMoney);
		this.addEvent("PetCenter.GUIDE",this.onGuide);
		this.btnUP0.on("click",this,this.onClick);
		this.btnUP1.on("click",this,this.onClick);
		this.btnUP2.on("click",this,this.onClick);
		this.btnGet.on("click",this,this.onClick);
		this.update(false);
		this.onGuide();
	}

	__proto.hide=function(){
		EventMgr.removeAll(this);
		PanelManager.closeByClass(YuanshenFunPanel);
		this.btnUP0.off("click",this,this.onClick);
		this.btnUP1.off("click",this,this.onClick);
		this.btnUP2.off("click",this,this.onClick);
		this.btnGet.off("click",this,this.onClick);
		for(var i=0;i < 4;i++){
			this._tabs[i].off("click",this,this.onClick);
			if(i < 3){
				this._avatars[i].stop();
			}
		}
		if(this._guide){
			this._guide.hide();
			this._guide=null;
		}
	}

	__proto.update=function(isUP){
		(isUP===void 0)&& (isUP=true);
		if(isUP){
			CPlayOnceEffect.play(ResPathUtil.getPanelEffect("chenggong","common"),this,this.yimanji.x+this.yimanji.width *0.5,this.yimanji.y-100);
		};
		var info=ShenShiCenter.getData(22);
		var bean=App.dataMgr.q_shenjiContainer.getDataBean(info ? info.modelId :22 *10000,false);
		this.showAttr(bean,this._c_attr);
		this._c_level.show(bean.q_lv+'');
		this.c_font0.x=770-(127+this._c_level.width >> 1);
		this.c_font1.x=this._c_level.x+this._c_level.width;
		this.n_box.visible=bean.q_next_id > 0;
		this.yimanji.visible=!this.n_box.visible;
		this.m_icon0.visible=this.n_box.visible;
		this.m_icon1.visible=this.n_box.visible;
		this.m_txt0.visible=this.n_box.visible;
		this.m_txt1.visible=this.n_box.visible;
		this.btnUP0.visible=this.n_box.visible;
		this.btnUP1.visible=this.n_box.visible;
		if(bean.q_next_id > 0){
			this._id=bean.q_id;
			this._costs.length=0;
			var items=bean.q_choose_item.split(';');
			this._costLab.visible=items.length==1;
			this.btnUP2.visible=this._costLab.visible;
			this.btnBox.visible=!this.btnUP2.visible;
			for(var i=0;i < items.length;i++){
				this._costs.push(JSON.parse(items[i])[0]);
			}
			if(this.btnBox.visible){
				this.btnGet.visible=false;
				for(i=0;i < items.length;i++){
					this.showCost(i,BagItemCenter.getItemCount(this._costs[i].id),true);
				}
			}
			else{
				this._costLab.showObject(this._costs[0]);
				this._costLab.x=this.btnUP2.x-this._costLab.width / 2;
				this.btnUP2.label=ItemUtil.getItemName(this._costLab.itemId)+"升级";
				this.btnGet.visible=this._costLab.itemId==EnumMoney.MONEY90;
				this.updateBtn2();
			}
			bean=App.dataMgr.q_shenjiContainer.getDataBean(bean.q_next_id);
			this.showAttr(bean,this._n_attr);
			this._n_level.show(bean.q_lv+'');
			this.n_font0.x=this.n_box.width-127-this._n_level.width >> 1;
			this.n_font1.x=this._n_level.x+this._n_level.width;
		}
		else{
			this._costs=null;
			this._costLab.visible=false;
			this.btnUP2.visible=false;
			this.btnGet.visible=false;
			this.upfont.visible=false;
		}
		this.onFunction(PetCenter.PET_FUNS[0]);
		this.onFunction(195);
	}

	__proto.onFunction=function(funId){
		if(PetCenter.PET_FUNS.indexOf(funId)>=0){
			var sorts=[0,1,2];
			for(var i=0;i < PetCenter.PET_FUNS.length;i++){
				if(!FunctionManager.isFunctionOpen(PetCenter.PET_FUNS[i])){
					funId=PetCenter.PET_FUNS[i];
					for(var j=0;j < i;j++){
						sorts.push(sorts.shift());
					}
					break ;
				}
			};
			var bean,hhId=0,isXY=Q_globalCenter.getJsonData(15177).indexOf(WebParams.agent)< 0;
			for(i=0;i < 3;i++){
				this._tabs[i].update();
				bean=App.dataMgr.q_petContainer.petVec[sorts[i]];
				(this ["avaName"+i]).skin="mobile/pet/dn"+bean.q_pettype+".png";
				hhId=PetCenter.getSkinByPet(bean.q_pettype);
				if(hhId > 0){
					bean=App.dataMgr.q_petContainer.getDataBean(hhId,false);
				}
				else if(isXY){
					bean=App.dataMgr.q_petContainer.getDataBean((11101+sorts[i])+"001");
				}
				this._avatars[i].showPet(bean);
			}
		}
		else if(funId==195){
			this._tabs[3].update();
		}
	}

	__proto.onClick=function(e){
		switch(e.currentTarget){
			case this.btnUP1:
				if(!this.btnUP1.tag){
					ShenShiCenter.sendC2S_ShenjiUpgradeMessage(this._id,0,1);
				}
				else{
					PlatformCenter.popPay();
				}
				break ;
			case this.btnUP0:case this.btnUP2:
				if(e.currentTarget.tag){
					if(this._costs[0].id==EnumMoney.MONEY90){
						PanelManager.openByClass(TaskTuijianPanel,{tuijian:App.dataMgr.q_globalContainer.getDataBean(40017).q_string_value,click:e.currentTarget});
					}
					else{
						GameNotice.showMousePosMessage("消耗不足");
					}
				}
				else{
					ShenShiCenter.sendC2S_ShenjiUpgradeMessage(this._id);
				}
				break ;
			case this.btnGet:
				PanelManager.openByClass(TaskTuijianPanel,{tuijian:App.dataMgr.q_globalContainer.getDataBean(40017).q_string_value,click:this.btnGet});
				break ;
			default :
				if((e.currentTarget instanceof com.modules.pet.YuanshendianTab )){
					PanelManager.openByClass(YuanshenFunPanel,(e.currentTarget).funId);
				}
				break ;
			}
	}

	__proto.showCost=function(index,have,bool){
		(bool===void 0)&& (bool=false);
		var txt=this ["m_txt"+index];
		var btn=this ["btnUP"+index];
		if(bool){
			txt.text=StringFormat.formatMoney(this._costs[index].num,"万",10000,-1,true);
			txt.x=btn.x+(btn.width-txt.width+24 >> 1);
			btn.label=EnumMoney.getName(this._costs[index].id)+"升级";
			(this ["m_icon"+index]).skin=EnumMoney.getIcon(this._costs[index].id);
		}
		btn.tag=have < this._costs[index].num;
		if(btn.tag){
			txt.color="#ef0605";
			btn.showRedPoint(false);
		}
		else{
			txt.color="#00ff00";
			btn.showRedPoint(this._costs.length==1);
		}
	}

	__proto.onMoney=function(type,value){
		if(this._costs){
			if(this._costLab.visible){
				if(type==this._costLab.itemId){
					this._costLab.update();
					this.updateBtn2();
				}
			}
			else{
				for(var i=0;i < this._costs.length;i++){
					if(this._costs[i].id==type){
						this.showCost(i,value);
						break ;
					}
				}
			}
		}
	}

	__proto.updateBtn2=function(){
		this.btnUP2.tag=!this._costLab.itemEnough;
		this.btnUP2.showRedPoint(this._costLab.itemEnough);
		this.btnUP2.isRedPoint ? this.btnUP2.showFlowEffect("btn_6"):this.btnUP2.hideFlowEffect();
		if(this.btnGet.visible){
			this.btnUP2.isRedPoint ? this.btnGet.hideFlowEffect():this.btnGet.showFlowEffect("btn",0,0,"common/guide");
			this.btnGet.showRedPoint(!this.btnUP2.isRedPoint && BagItemCenter.getItemsByClientType(127),this.btnGet.width+4,2);
		}
	}

	__proto.showAttr=function(bean,attrTxt){
		var atts1=LazyUtil.getAttrList(bean.q_role_attr1);
		if(bean.q_pet_addattr){
			var atts2=LazyUtil.getAttrList(bean.q_pet_addattr);
			atts2[0].name="元神攻击加成";
			var attr;
			for(var $each_attr in atts2){
				attr=atts2[$each_attr];
				attr.color="#ff00ff";
			}
			atts1=atts1.concat(atts2)
		}
		attrTxt.setCurrent(atts1,false,true);
	}

	__proto.onGuide=function(){
		if(PetCenter.g_index==1){
			if(!this._guide){
				this._guide=Guide.getGuide();
				this._guide.showEffect2(this.btnUP2);
			}
		}
		else if(this._guide){
			this._guide.hide();
			this._guide=null;
		}
	}

	return YuanshenDianView;
})(YuanshenDianViewUI)