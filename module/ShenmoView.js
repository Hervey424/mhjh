var ShenmoView=(function(_super){
	function ShenmoView(){
		this._skills=null;
		this._curHeads=null;
		this._grids=null;
		this._heads=null;
		this._costs=null;
		this._avatar=null;
		this._s_tips=null;
		this._curHead=null;
		this._info=null;
		this._head_index=0;
		this._p_type=0;
		this._type=0;
		ShenmoView.__super.call(this);
		this._s_tips={};
		this._heads=[];
		this._grids=[];
		this._costs=[];
		this._skills=[];
		var grid;
		for(var i=0;i < 8;i++){
			if(i < 2){
				grid=new RoleEquipGrid(null,EnumImageType.ITEM_56,66);
				grid.move(68+i % 2 *466,370,this);
				(this ["grid"+i]).move(0,0,grid,0);
			}
			else{
				grid=new RoleEquipGrid("grid_62_1",EnumImageType.ITEM_56,66);
				grid.move(38+(i-2)% 2 *526,((7-i)/ 2 >> 0)*96+70,this);
			}
			grid.isShowBatter=false;
			this._grids.push(grid);
			if(i < 5){
				this._skills.push(this["ps_item"+i]);
			}
			if(i < 2){
				this._costs.push(new ItemCostLabel3(i==0));
				this.up_btnbox.addChild(this._costs[i]);
			}
		}
		this._costs[1].show(EnumMoney.BIND_YUAN_BAO,0);
		this.head_mask.scrollRect=new Rectangle(0,0,this.head_mask.width,this.head_mask.height);
		var shenmos=App.dataMgr.q_xuemaiContainer.shenmos;
		for(i=1;i < shenmos.length;i++){
			this._heads.push(new ShenmoHeadUI());
			this._heads[i-1].tag=shenmos[i];
			this.headBox.addChild(this._heads[i-1]);
		}
		this._avatar=GameEffect.getEffect();
		this._avatar.move(324,440,this.bg,0);
		this.head_select.removeSelf();
		this.btnUP.isDownPress=true;
		this.l_btn.delayClickTime=120;
		this.r_btn.delayClickTime=120;
		this.s1_c_attrTxt.scrollBarAllwaysShow="off";
		this.s1_n_attrTxt.scrollBarAllwaysShow="off";
		this.s0_attrTxt.scrollBarAllwaysShow="off";
		this.ps_item0DescTxt.scrollBarAllwaysShow="off";
	}

	__class(ShenmoView,'com.modules.shenmo.ShenmoView',_super);
	var __proto=ShenmoView.prototype;
	Laya.imps(__proto,{"com.game.core.panel.ITabView":true})
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		var item;
		for(var $each_item in this._s_tips){
			item=this._s_tips[$each_item];
			TipMgr.removeTip(item.item);
		}
		this._curHeads=null;
		this._avatar=null;
		this._s_tips=null;
		this._skills=null;
		this._costs=null;
		this._heads=null;
		this._grids=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		this._curHeads=[];
		var head;
		for(var $each_head in this._heads){
			head=this._heads[$each_head];
			head.on("click",this,this.onClickHead);
		}
		this.s0_titleLine.skin=ResPathUtil.getImageRes("tipLine2",".png","shenmo");
		this.addEvent("SkillCenter.SKILL_PASS_ACTIVE",this.updatePassive);
		this.addEvent("PE.ADVANCE_HUANHUA",this.updateHuanhua);
		this.addEvent("ET.FUNCTION_TIP",this.onFunction);
		this.addEvent("WearEquipCenter.UNWEAR",this.onWear);
		this.addEvent("WearEquipCenter.WEAR",this.onWear);
		this.addEvent("Bag.CHANGE",this.onItemUpdate);
		this.addEvent("MoneyEvent.CHANGE",this.onMoney);
		this.addEvent("ShenLuCenter.ACTIVE",this.onActive);
		this.addEvent("ShenLuCenter.STAR",this.onUpdate);
		this.addEvent("ShenLuCenter.UP",this.onUpdate);
		this.ps_item0.on("click",this,this.onClick);
		this.btnEquip.on("click",this,this.onClick);
		this.btnSkin.on("click",this,this.onClick);
		this.l_btn.on("click",this,this.onClick);
		this.r_btn.on("click",this,this.onClick);
		this.btnHH.on("click",this,this.onClick);
		this.btnUP.on("press",this,this.onPress);
		if((data instanceof com.logic.data.item.ItemData )){
			this._p_type=myparseInt((data).getDataBean().q_ui_param);
		}
		if(this._p_type > 100){
			this.updateHead();
		}
		else{
			this.changeTYPE(100);
		}
	}

	__proto.hide=function(){
		var head;
		for(var $each_head in this._heads){
			head=this._heads[$each_head];
			head.off("click",this,this.onClickHead);
		}
		this._avatar.stopAndHide();
		EventMgr.removeAll(this);
		this.clearTimer(this,this.onDelay);
		this.ps_item0.off("click",this,this.onClick);
		this.btnEquip.off("click",this,this.onClick);
		this.btnSkin.off("click",this,this.onClick);
		this.l_btn.off("click",this,this.onClick);
		this.r_btn.off("click",this,this.onClick);
		this.btnHH.off("click",this,this.onClick);
		this.btnUP.off("press",this,this.onPress);
		this.s0_titleLine.skin=null;
		this.imgFont0.skin=null;
		this.imgFont1.skin=null;
		this.nameImg.skin=null;
		this.bg.skin=null;
		this._curHeads=null;
		this._curHead=null;
		this._info=null;
		this._p_type=0;
	}

	__proto.update=function(){
		this._info=ShenLuCenter.getData(this._type);
		if(this._curHead){
			this._curHead.icon.filters=this._info.activate ? null :FilterUtil.GRAY_FILTER_ARRAY;
		};
		var i=0,bean=this._info.bean;
		if(!this._info.activate || (this._type==100 && bean.q_quality < 2 && this._info.star < bean.q_max_layer)){
			this.s0_box.visible=true;
			this.s1_box.visible=false;
			this.btnEquip.visible=false;
			this.yimanjie.visible=false;
			this.up_btnbox.visible=true;
			this.ps_item0_bg.visible=false;
			this.bg.skin=ResPathUtil.getImageRes("bg1",".jpg","shenmo");
			this.up_btnbox.pos(252,462);
			this.ps_item0.pos(746,72);
			this.ps_item0DescTxt.pos(666,178);
			this.ps_item0DescTxt.width=228;
			this.ps_item0DescTxt.height=104;
			this._costs[1].visible=false;
			this.btnUP.label=this._info.activate ? "神魔融合" :"激 活";
			for(i=0;i < 8;i++){
				this._grids[i].visible=false;
				if(i > 0 && i < 5){
					this._skills[i].visible=false;
				}
			}
			if(this._type==100){
				this.qipao.visible=true;
				this.btnSkin.visible=false;
				this.name_box.visible=false;
				this.imgFonts.visible=false;
				this.s0_titleBox.visible=true;
				this.s0_titleLine.visible=false;
				this.showItem(bean.q_cost);
				this.showAttr(this.s0_attrTxt,bean,this._info.star);
				this.s0_title.text="融合度"+(bean.q_quality_lv+this._info.star)+"%";
				this._avatar.url=ResPathUtil.replaceVersionUrl("avatar/role/shenmo/99/14_0.ani");
				this._avatar.restart();
			}
			else{
				this.qipao.visible=false;
				this.btnSkin.visible=true;
				this.name_box.visible=true;
				this.imgFonts.visible=true;
				this.s0_titleBox.visible=false;
				this.s0_titleLine.visible=true;
				this.showItem(bean.q_open_limit);
			}
			this.showPassive(this.ps_item0,bean.q_desc);
		}
		else{
			for(i=0;i < 8;i++){
				this._grids[i].part=this._info.parts[i];
				this._grids[i].hunhuanPart=this._info.parts[i];
				this._grids[i].visible=true;
				if(i > 0 && i < 5){
					this._skills[i].visible=true;
					this.showPassive(this._skills[i],this._info.zhanlingPassives[i-1].id);
				}
			}
			if(!this.btnEquip.visible){
				this.onWear();
				this.btnEquip.visible=true;
				this.onFunction(287,false,false);
			}
			this.s1_box.visible=true;
			this.s0_box.visible=false;
			this.btnSkin.visible=true;
			this.name_box.visible=true;
			this.ps_item0_bg.visible=true;
			this.bg.skin=ResPathUtil.getImageRes("bg2",".jpg","shenmo");
			this.up_btnbox.pos(691,476);
			this.ps_item0.pos(306,392);
			this.ps_item0DescTxt.pos(150,502);
			this.ps_item0DescTxt.width=370;
			this.ps_item0DescTxt.height=66;
			var star=bean.q_quality_lv+this._info.star-(this._type==100 ? App.dataMgr.q_xuemaiContainer.getDataBean(100 *10000+1).q_max_layer :0);
			this.btnUP.label="神魔觉醒";
			this.s1_c_title.text="觉醒度"+star+"%";
			this.showPassive(this.ps_item0,bean.q_desc);
			this.showAttr(this.s1_c_attrTxt,bean,this._info.star);
			this.yimanjie.visible=this._info.isMax();
			this.up_btnbox.visible=!this.yimanjie.visible;
			this.s1_n_box.visible=this.up_btnbox.visible;
			if(this.s1_n_box.visible){
				this.showAttr(this.s1_n_attrTxt,bean,this._info.star+1);
				this.s1_n_title.text="觉醒度"+(star+1)+"%";
				this._costs[1].tag=ShenLuCenter.getMoney(this._info);
				this._costs[1].visible=this._costs[1].tag > 0;
				if(this._costs[1].visible){
					this._costs[1].show(EnumMoney.BIND_YUAN_BAO,this._costs[1].tag);
				}
				this.showItem(bean.q_cost);
			}
			if(this._type==100){
				this._avatar.url=ResPathUtil.replaceVersionUrl("avatar/role/shenmo/"+this._type+"/14_0.ani");
				this._avatar.restart();
			}
			else{
				this.updateHuanhua(EnumSurfaceType.TYPE_1);
			}
		}
	}

	__proto.changeTYPE=function(type){
		this._type=type;
		if(type==100){
			this._curHead=null;
			this.l_btn.visible=false;
			this.r_btn.visible=false;
			this.btnHH.visible=false;
			this.head_mask.visible=false;
			this.title.skin="mobile/shenmo/title1.png";
			this.btnSkin.skin="mobile/shenmo/btn_hh.png";
		}
		else{
			this._avatar.url=ResPathUtil.replaceVersionUrl("avatar/role/shenmo/"+type+"/14_0.ani");
			this._avatar.restart();
			this.btnHH.visible=true;
			this.title.skin="mobile/shenmo/title2.png";
			this.btnSkin.skin="mobile/shenmo/btn_back.png";
		}
		this.update();
		this.onWear();
		this.onFunction(287,false,false);
		this.nameImg.skin=ResPathUtil.getImageRes("n_"+type,".png","shenmo");
		if(this.imgFonts.visible){
			this.imgFont0.skin=ResPathUtil.getImageRes("f1_"+this._type,".png","shenmo");
			this.imgFont1.skin=ResPathUtil.getImageRes("f2_"+this._type,".png","shenmo");
		}
	}

	__proto.onClick=function(e){
		switch(e.currentTarget){
			case this.btnEquip:
				PanelManager.openByClass(ShenmoEquipPanel);
				break ;
			case this.l_btn:
				this.page_head(this._head_index-1);
				break ;
			case this.r_btn:
				this.page_head(this._head_index+1);
				break ;
			case this.ps_item0:
				if(this.s1_box.visible && this._info.activate){
					PanelManager.openByClass(ShenmoSkillUPPanel,this.ps_item0.tag,this._type);
				}
				break ;
			case this.btnSkin:
				if(this._type==100){
					this.updateHead();
				}
				else{
					this.changeTYPE(100);
				}
				break ;
			case this.btnHH:
				if(this.btnHH.tag > 0){
					ShenLuCenter.sendC2S_ChangeShenMoSkinMessage(this._type);
				}
				else{
					ShenLuCenter.sendC2S_ChangeShenMoSkinMessage(0);
				}
				break ;
			}
	}

	__proto.onPress=function(e){
		if(!this.btnUP.isRedPoint){
			GameNotice.showMousePosMessage("消耗不足");
			return;
		}
		ShenLuCenter.sendC2S_BloodActiveMessage(this._type,this._info.activate ? 2 :1);
	}

	__proto.updateHead=function(){
		this._curHeads.length=0;
		this.head_mask.visible=true;
		var head,info,temp;
		for(var i=0;i < this._heads.length;i++){
			head=this._heads[i];
			info=ShenLuCenter.getData(head.tag);
			head.visible=i < 3 || info.activate || ShenLuCenter.isShenmoRed(head.tag,true,false);
			if(head.visible){
				head.showRedPoint(ShenLuCenter.isShenmoRed(info.type,true,false),74,12);
				head.icon.skin=ResPathUtil.getImageRes("h_"+info.type,".png","shenmo");
				head.icon.filters=info.activate ? null :FilterUtil.GRAY_FILTER_ARRAY;
				head.x=this._curHeads.length *110;
				this._curHeads.push(head);
				if(this._p_type > 0){
					if(this._p_type==info.type){
						temp=head;
					}
				}
				else if(!temp && head.isRedPoint){
					temp=head;
				}
			}
		}
		this._p_type=0;
		this.l_btn.visible=this._curHeads.length > 3;
		this.r_btn.visible=this._curHeads.length > 3;
		if(!this._curHead){
			if(!temp){
				temp=this._curHeads[0];
			}
			this._head_index=this._curHeads.indexOf(temp)-2;
			if(this._head_index < 0){
				this._head_index=0;
			}
			this.page_head(this._head_index,false);
			Event.EMPTY.setTo("click",temp,temp);
			this.onClickHead(Event.EMPTY);
		}
		else{
			this.page_head(this._head_index,false,false);
		}
	}

	__proto.page_head=function(value,isTween,bool){
		(isTween===void 0)&& (isTween=true);
		(bool===void 0)&& (bool=true);
		if(bool){
			this._head_index=value;
			if(isTween){
				TweenLite.to(this.headBox,0.1,{x:-value *110});
			}
			else{
				this.headBox.x=-value *110;
			}
		}
		if(this.l_btn.visible){
			this.l_btn.disabled=value <=0;
			this.r_btn.disabled=value >=this._curHeads.length-3;
			var red=false;
			if(!this.l_btn.disabled){
				for(var i=this._head_index;i >-1;i--){
					if(this._curHeads[i].isRedPoint){
						red=true;
						break ;
					}
				}
			}
			this.l_btn.showRedPoint(!this.l_btn.disabled && red,10,18);
			if(!this.r_btn.disabled){
				red=false;
				for(i=this._head_index+3;i < this._curHeads.length;i++){
					if(this._curHeads[i].isRedPoint){
						red=true;
						break ;
					}
				}
			}
			this.r_btn.showRedPoint(!this.r_btn.disabled && red,10,18);
		}
	}

	__proto.onClickHead=function(e){
		this._curHead=e.currentTarget;
		this._curHead.bg.addChild(this.head_select);
		this.changeTYPE(this._curHead.tag);
	}

	__proto.onWear=function(equip){
		if(!this._info.activate)return;
		var wear;
		var grid;
		for(var $each_grid in this._grids){
			grid=this._grids[$each_grid];
			if(!equip || grid.part==equip.position){
				wear=WearEquipCenter.getEquipByPart(grid.part);
				grid.isShowFlowEffect=Boolean(wear);
				grid.data=wear;
				if(equip)break ;
			}
		}
	}

	__proto.showPassive=function(item,pid){
		var bean=App.dataMgr.q_passiveContainer.getDataBean(item==this.ps_item0 ? pid+"001" :pid);
		if(!bean)return;
		var pass=SkillCenter.getPassSkill(bean.q_skillid);
		if(pass){
			bean=pass.getDataBean();
			item.icon.filters=null;
		}
		else{
			item.icon.filters=FilterUtil.GRAY_FILTER_ARRAY;
		}
		if(!this._s_tips[item.name]){
			this._s_tips[item.name]={item:item,tip:new TipData("SKILL_PASSIVE")};
			TipMgr.addTip(item,this._s_tips[item.name].tip);
		}
		this._s_tips[item.name].tip.data=bean.q_skillid;
		item.icon.skin=ResPathUtil.getIcon(bean.q_icon,"skill/mobile");
		item.tag=bean.q_skillid;
		if(item==this.ps_item0){
			this.ps_item0Txt.text=bean.q_name;
			this.ps_item0DescTxt.text=bean.q_desc;
			item.showRedPoint(this._type > 100 && this._info.bean.q_passive==0 && SkillCenter.isPassSkillCanUp(this._info.bean.q_desc),46,4);
			if(this.s0_box.visible && this._type > 100){
				if(pass && bean.q_next_id > 0){
					bean=App.dataMgr.q_passiveContainer.getDataBean(bean.q_next_id);
				}
				this.s0_attrTxt.text=LazyUtil.getAttrStr(bean.q_attribute1);
			}
		}
		else{
			item.txt.text=bean.q_name;
		}
	}

	__proto.updatePassive=function(id){
		var change=false;
		for(var i=0;i < this._skills.length;i++){
			if(!this._skills[i].visible){
				continue ;
			}
			if(id==this._skills[i].tag){
				change=true;
				this._skills[i].icon.filters=SkillCenter.getPassSkill(this._skills[i].tag)? null :FilterUtil.GRAY_FILTER_ARRAY;
				if(i==0){
					this._skills[i].showRedPoint(this._info.skillPoint1,46,4);
				}
				this.update();
				break ;
			}
		}
	}

	__proto.showAttr=function(txt,bean,star){
		var pBean,total=LazyUtil.getTotalAtt(bean.q_add_attribute1,bean.q_layer_attr,star);
		var grid;
		for(var $each_grid in this._skills){
			grid=this._skills[$each_grid];
			if(grid.visible && SkillCenter.getPassSkill(grid.tag)){
				pBean=SkillCenter.getPassSkill(grid.tag).getDataBean();
				if(pBean.q_attribute1){
					GlobalCenter.attributeDataBean.convert(pBean.q_attribute1);
					LazyUtil.addTwoAttr(total,GlobalCenter.attributeDataBean.attributeObject);
				}
			}
		}
		txt.text=LazyUtil.getAttrStr(total,1);
	}

	__proto.showItem=function(value){
		if(value){
			this._costs[0].btnVisible=!this._costs[1].visible;
			this._costs[0].showJson(value);
		}
		this.onItemUpdate(null,true);
	}

	__proto.onItemUpdate=function(ids,bool){
		(bool===void 0)&& (bool=false);
		if(!this.up_btnbox.visible){
			return;
		}
		if(!ids || ids.indexOf(this._costs[0].itemId)>=0){
			this._costs[0].update();
		}
		if(this._costs[1].visible && (!ids || ids.indexOf(this._costs[1].itemId)>=0)){
			this._costs[1].update();
		};
		var px=this._costs[0].width;
		var red=this._costs[0].itemEnough;
		if(this._costs[1].visible){
			px+=10+this._costs[1].width;
			if(!this._costs[1].itemEnough){
				red=false;
			}
		}
		px=this.up_btnbox.width-px >> 1;
		this._costs[0].x=px;
		this._costs[1].x=px+this._costs[0].width+10;
		if(this._costs[1].visible){
			this._costs[1].x=px+this._costs[0].width+10;
		}
		this.btnUP.showRedPoint(red);
		if(bool)return;
		this.timerOnce(200,this,this.onDelay);
	}

	__proto.onMoney=function(id,value){
		if(this._costs[1].visible && id==this._costs[1].itemId){
			this.onItemUpdate([id]);
		}
	}

	__proto.updateHuanhua=function(type){
		if(type !=EnumSurfaceType.TYPE_1){
			return;
		}
		if(this._type > 100){
			this.btnHH.tag=this._info.id==App.role.getWearId(-1)? 0 :1;
			this.btnHH.label=this.btnHH.tag > 0 ? "幻 化" :"取消幻化";
		}
	}

	__proto.onFunction=function(funId,red,value){
		(value===void 0)&& (value=true);
		if(funId==287){
			red=false;
			if(this.btnSkin.visible){
				if(this._type==100){
					if(this._info.activate){
						for(var i=1;i < App.dataMgr.q_xuemaiContainer.shenmos.length;i++){
							if(ShenLuCenter.isShenmoRed(App.dataMgr.q_xuemaiContainer.shenmos[i],true,false)){
								red=true;
								break ;
							}
						}
					}
				}
				else{
					red=ShenLuCenter.isShenmoRed(100,true,false);
				}
			}
			this.btnSkin.showRedPoint(red,64,12);
			this.btnEquip.showRedPoint(this.btnEquip.visible && ShenLuCenter.shenmoEquipRed,64,12);
			this.ps_item0.showRedPoint(this._type > 100 && SkillCenter.getPassSkill(this._info.bean.q_desc)&& SkillCenter.isPassSkillCanUp(this._info.bean.q_desc),46,4);
			if(value && this.head_mask.visible){
				this.updateHead();
			}
		}
	}

	__proto.onUpdate=function(type){
		if(type==this._type){
			this.update();
		}
	}

	__proto.onActive=function(type){
		if(type==this._type){
			this.update();
			this.onWear();
		}
	}

	__proto.onDelay=function(){
		if(this.head_mask.visible){
			this.updateHead();
		}
	}

	return ShenmoView;
})(ShenmoViewUI)