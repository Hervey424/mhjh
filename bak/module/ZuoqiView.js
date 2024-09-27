/**
*
*@author Jian
*创建时间：2023-11-15
*/
//class com.modules.zuoqi.ZuoqiView extends ui.mobile.zuoqi.ZuoqiViewUI
var ZuoqiView=(function(_super){
	function ZuoqiView(){
		this._equipVec=null;
		this._advanEff=null;
		this._starCon=null;
		this._costLab=null;
		this._jie=null;
		this._jieAdd=null;
		this._upcost=null;
		this._qqObj=null;
		this._s_guide=null;
		this._partList=null;
		this._isAuto=false;
		this._type=0;
		this._attr=null;
		this._guide=null;
		ZuoqiView.__super.call(this);
		this.btnStart.delayClickEnabled=true;
		this._starCon=new StarContainer(1,125);
		this._starCon.move(0,-20,this.upbox);
		this._costLab=new ItemCostLabel2();
		this.addChild(this._costLab);
		this._attr=new AttrTextField();
		this._attr.move(630,100,this);
		this._attr.onlyBaseAttr(true);
		this._jie=NumberBitmap.show("6");
		this.jie.addChild(this._jie);
		this.addChild(this.upbox);
		this._equipVec=[];
		var grid;
		for(var i=0;i < 6;i++){
			grid=new AdvanceEquipGrid("grid_62_1",EnumImageType.ITEM_56);
			grid.isShowBatter=false;
			grid.move(60+i *78,54,this.equipBox);
			grid.owner=1;
			grid.shuaxin();
			grid.jiahao();
			this._equipVec.push(grid);
		}
	}

	__class(ZuoqiView,'com.modules.zuoqi.ZuoqiView',_super);
	var __proto=ZuoqiView.prototype;
	Laya.imps(__proto,{"com.game.core.panel.ITabView":true})
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._equipVec=null;
		this._costLab=null;
		this._starCon=null;
		this._jieAdd=null;
		this._attr=null;
		this._jie=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		this.bg.skin=ResPathUtil.getImageRes("bg_zuoqi",".jpg","zuoqi");
		this.addEvent(ActivityEvent.REFRESH_JIANYAO,this.updateAct);
		this.addEvent(ActivityEvent.REFRESH_DETAIL,this.updateAct);
		this.addEvent("WearEquipCenter.UNWEAR",this.updateEquip);
		this.addEvent("PE.ADVANCE_LEVEL",this.updateLv);
		this.addEvent("WearEquipCenter.WEAR",this.updateEquip);
		this.addEvent("ZuoQiCenter.ZUOQI_LIST",this.onZuoqi);
		this.addEvent("Bag.CHANGE",this.onItemUpdate);
		this.addEvent("HuaxingCenter.UPDATE",this.updateHX);
		this.addEvent("AdvanceEvent.UPDATE",this.update);
		this.addEvent("ET.FUNCTION_TIP",this.onFunction);
		this.btnActive.on("click",this,this.onClick);
		this.btnStart.on("click",this,this.onClick);
		this.btnLink.on("click",this,this.onClick);
		this.btnTab1.on("click",this,this.onClick);
		this.btnTab2.on("click",this,this.onClick);
		this.qqLink.on("click",this,this.onClick);
		this.btnGet.on("click",this,this.onClick);
		this.btn_change.on("click",this,this.onClick);
		this.changeType(1);
		this.onFunction(50,false);
	}

	__proto.onFunction=function(id,value){
		if(id==50){
			this.btn_change.showRedPoint(ZuoQiCenter.zuoqiRed || ZuoQiCenter.zuoqiSkillRed);
		}
	}

	__proto.hide=function(){
		EventMgr.removeAll(this);
		App.timer.clearTimer(this,this.onStart);
		this.btnActive.off("click",this,this.onClick);
		this.btnStart.off("click",this,this.onClick);
		this.btnLink.off("click",this,this.onClick);
		this.btnTab1.off("click",this,this.onClick);
		this.btnTab2.off("click",this,this.onClick);
		this.qqLink.off("click",this,this.onClick);
		this.btn_change.off("click",this,this.onClick);
		this.btnGet.off("click",this,this.onClick);
		this.qipao.skin=null;
		this.bg.skin=null;
		this._partList=null;
		this._upcost=null;
		this._qqObj=null;
		if(this._advanEff){
			this._advanEff.destroy();
			this._advanEff=null;
		}
		if(this._guide){
			this._guide.hide();
			this._guide=null;
		}
	}

	__proto.updateLv=function(type){
		if(type==this._type){
			this._jie.x=-this._jie.width-2;
			var jw=-2-this._jie.width+this.jie.width,addLv=App.role.getAdvanceAddLevel(this._type);
			this.add.visible=addLv > 0;
			if(addLv > 0){
				if(!this._jieAdd){
					this._jieAdd=NumberBitmap.show("6");
					this._jieAdd.move(20,0,this.add);
					this.addChild(this.upbox);
				}
				this._jieAdd.show(StringFormat.getChieseNum(addLv)+'');
				this.jie2.x=22+this._jieAdd.width;
				jw+=4+this.jie2.x+this.jie2.width;
			}
			this.jie.x=this.r_titleTxt.x+(this.r_titleTxt.width-jw >> 1);
		}
	}

	__proto.update=function(type,action){
		(action===void 0)&& (action=0);
		if(type !=this._type)
			return;
		var advance=AdvanceCenter.getData(this._type);
		var bean=advance.bean;
		var attrList=JSON.parse(bean.q_add_attribute1);
		GlobalCenter.attributeDataBean.convert(attrList[advance.star]);
		this._jie.show(StringFormat.getChieseNum(bean.q_level)+'');
		this._starCon.setNum(advance.star,bean.q_max_star,action==3);
		this.updateLv(type);
		this._attr.setCurrent(LazyUtil.getAttrList2(GlobalCenter.attributeDataBean.attributeObject));
		if(advance.star < bean.q_max_star-1){
			if(bean.q_next_id > 0){
				this._attr.setNext(LazyUtil.getAttrList(attrList[advance.star+1]));
			}
			else{
				this._attr.setNext();
			}
		}
		else if(bean.q_next_id > 0){
			this._attr.showNextByJson_v3(App.dataMgr.q_faqiContainer.getDataBean(bean.q_next_id).q_add_attribute1,0);
		}
		this.btnLink.visible=!ZuoQiCenter.getZuoqi(50000);
		this.btnActive.visible=this.btnLink.visible;
		this.jie.visible=!this.btnLink.visible;
		if(this.btnActive.visible){
			this._qqObj=null;
			this.upbox.visible=false;
			this.yimanjie.visible=false;
			var mount=App.dataMgr.q_mountContainer.getDataBean(50000);
			this._costLab.showJson(mount.q_open_cost);
			this._costLab.visible=true;
			this._costLab.pos(640,454);
			this.btnActive.showRedPoint(this._costLab.itemEnough);
			var out=GameUtils.getWayItemId(this._costLab.itemId);
			this.btnLink.visible=Boolean(out);
			if(this.btnLink.visible){
				this.btnLink.tag=out;
				this.btnLink.label=out.q_output_title;
			}
			this.updateAct();
		}
		else{
			this._costLab.visible=bean.q_next_id > 0;
			this.upbox.visible=bean.q_next_id > 0;
			this.yimanjie.visible=bean.q_next_id==0;
			if(this.upbox.visible){
				this._costLab.pos(this.upbox.x+30,this.upbox.y+34);
				this._qqObj=bean.q_add_item ? JSON.parse(bean.q_add_item):null;
				this._upcost=JSON.parse(bean.q_levelup_consume.split(';')[advance.star])[0];
				this.updateAct();
				this.onItemUpdate(null);
			}
		}
		if(this.btnLink.visible){
			if(!this._guide){
				this._guide=Guide.getGuide();
				this._guide.show2("前往获取",2);
				this._guide.guideTo(this.btnLink);
			}
		}
		else if(this._guide){
			this._guide.hide();
			this._guide=null;
		}
		if(action==2){
			this.updateEquip();
		}
		else if(this._isAuto){
			App.timer.doTimeOnce(this,250,this.onStart);
		}
		if(action==2 || action==3){
			CPlayOnceEffect.play(ResPathUtil.getPanelEffect("shengxing_success","duanzao"),this,760,410);
		}
	}

	__proto.changeType=function(type){
		this._type=type;
		this.r_titleTxt.text=AdvanceCenter.getTypeName(type)+"升阶";
		var lv=AdvanceCenter.getLevel(this._type);
		var index=AdvanceCenter.getPositionIndex(this._type);
		this._partList=[EnumEquipType.getParts(400+index),EnumEquipType.getParts(1000+index)];
		this.btnTab1.showRedPoint(AdvanceCenter.isRedBy(400+index,lv),24,0);
		this.btnTab2.showRedPoint(AdvanceCenter.isRedBy(1000+index,lv),50,0);
		Event.EMPTY.setTo("click",!this.btnTab1.isRedPoint && this.btnTab2.isRedPoint ? this.btnTab2 :this.btnTab1,null);
		this.onClick(Event.EMPTY);
		if(!this._advanEff){
			this._advanEff=new GameDoubleEffect();
			this._advanEff.move(280,380,this.bg);
		}
		this.update(this._type);
		this.updateHX(this._type);
		this.updateAct();
	}

	__proto.onClick=function(e){
		switch(e.currentTarget){
			case this.btnStart:
				this.onStart();
				break ;
			case this.qqLink:
				PanelOpenManager.openPanelById(this._qqObj.panelid);
				break ;
			case this.btnGet:
				PanelOpenManager.openGetway(this._costLab.itemId,this.btnGet);
				break ;
			case this.btnLink:
				GameUtils.gotoGetway(this.btnLink.tag);
				break ;
			case this.btn_change:
				PanelManager.openPanel(PanelRegister.ZuoQiHuaXing);
				break ;
			case this.btnActive:
				if(this._costLab.itemEnough){
					HorseCommandSender.sendC2S_jihuoInfoMessage(1,50000);
				}
				else{
					this._costLab.onClick();
				}
				break ;
			default :;
				var parts;
				if(e.currentTarget==this.btnTab1){
					this.btnTab1.selected=true;
					this.btnTab2.selected=false;
					parts=this._partList[0];
				}
				else if(e.currentTarget==this.btnTab2){
					this.btnTab2.selected=true;
					this.btnTab1.selected=false;
					parts=this._partList[1];
				}
				for(var i=0;i < parts.length;i++){
					this._equipVec[i].type=this._type;
					this._equipVec[i].part=parts[i];
				}
				this.updateEquip(null,false);
				break ;
			}
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
			if(!ZuoqiView._alertDic || !ZuoqiView._alertDic[this._qqObj.actid]){
				var act=ActivityCenter.getData(this._qqObj.actid);
				if(act && act.activityStates==1 && act.playerStates > 0){
					if(!ZuoqiView._alertDic)ZuoqiView._alertDic={};
					ZuoqiView._alertDic[this._qqObj.actid]=true;
					Alert.show(this._qqObj.desc,GameHandler.create(PanelOpenManager,PanelOpenManager.openPanelById),[this._qqObj.panelid],true,null,null,false,null,"前往查看");
					return;
				}
			}
		}
		if(this._costLab.itemEnough){
			App.sound.playSound("sound_jinjie");
			AdvanceCommandSender.sendC2S_AdvanceUpgradeMessage(this._type);
		}
		else{
			var data=AdvanceCenter.getFengChanLingActivityData(this._type);
			if(data){
				var id=AdvanceCenter.getFengChanLingID(this._type);
				if(id !=0){
					var panelId=AdvanceCenter.getFengChanLingJumpID(this._type);
					var bean=App.dataMgr.q_itemContainer.getDataBean(id);
					var add=10;
					var addObj=AdvanceCenter.getFengChanLingAddCount(id);
					if(addObj){
						add=addObj.num;
					};
					var str="激活："+GameHTML.setColor(ItemUtil.getItemName(id),GameHTML.GREEN)+"，"
					+"材料副本每次可额外领取"+GameHTML.setColor(add+"个"+ItemUtil.getItemName(this._costLab.itemId),GameHTML.RED)+"，"
					+"激活后"+GameHTML.setColor("永久生效",GameHTML.RED)+"，今日累充"+GameHTML.setColor("30元",GameHTML.RED)+"可以免费领取";
					Alert.show(str,GameHandler.create(PanelOpenManager,PanelOpenManager.openPanelById,[panelId]),null,true,null,null,false,null,"查看冲榜累充");
				}
			}
			else{
				this._costLab.onClick();
			}
		}
	}

	__proto.updateEquip=function(equip,bool){
		(bool===void 0)&& (bool=true);
		var grid;
		for(var $each_grid in this._equipVec){
			grid=this._equipVec[$each_grid];
			grid.update();
		}
		if(bool){
			var lv=AdvanceCenter.getLevel(this._type);
			this.btnTab1.showRedPoint(AdvanceCenter.isRedBy(400+AdvanceCenter.getPositionIndex(this._type),lv),24,0);
			this.btnTab2.showRedPoint(AdvanceCenter.isRedBy(1000+AdvanceCenter.getPositionIndex(this._type),lv),50,0);
		}
	}

	__proto.updateHX=function(type,chooseId){
		(chooseId===void 0)&& (chooseId=-1);
		if(type==this._type){
			var mount=App.dataMgr.q_mountContainer.getDataBean(ZuoQiCenter.getZuoqi(50000)? ZuoQiCenter.wearId :50000);
			if(mount.q_group==10){
				mount=App.dataMgr.q_mountContainer.getDataBean(50000);
			}
			this._advanEff.setURL(ResPathUtil.getMountPanelRes(mount.q_show_id),mount.q_show_effect > 0);
			this._advanEff.play();
		}
	}

	__proto.onItemUpdate=function(ids){
		if(this.upbox.visible){
			if(this._qqObj && BagItemCenter.getItemCount(this._qqObj.itemid,true)> 0){
				this._costLab.showObject({id:this._qqObj.itemid,num:1},0);
				this.btnStart.label="使用直升丹";
				this.qipao.removeSelf();
			}
			else{
				this.btnStart.label="升 阶";
				this._costLab.showObject(this._upcost,0);
			}
			this.btnStart.showRedPoint(this._costLab.itemEnough);
		}
		else if(this.btnActive.visible){
			this._costLab.update();
			this.btnActive.showRedPoint(this._costLab.itemEnough);
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

	__proto.onZuoqi=function(){
		this.update(1);
	}

	ZuoqiView._alertDic=null;
	return ZuoqiView;
})(ZuoqiViewUI)