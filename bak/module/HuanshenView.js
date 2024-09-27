var HuanshenView=(function(_super){
	function HuanshenView(){
		this._d_skills=null;
		this._r_skills=null;
		this._roleAttr=null;
		this._petAttr=null;
		this._costLab=null;
		this._attrs=null;
		this._d_tips=null;
		this._avatar=null;
		this._curr=null;
		this._bean=null;
		this._guide2=null;
		this._d_ids=null;
		this._funId=0;
		HuanshenView.__super.call(this);
		this.btnUP.pressRepeatTime=300;
		this.btnUP.isDownPress=true;
		this.btnUP.delayClickEnabled=true;
		this._d_skills=[];
		this._r_skills=[];
		this._d_tips=[];
		this._costLab=new ItemCostLabel3(true);
		this._costLab.move(650,460,this);
		this._avatar=new UIPet();
		this._avatar.move(314,270,this,0);
		this._petAttr=new AttrTextField(10,18);
		this._petAttr.move(640,114,this);
		this._roleAttr=new AttrTextField(10,18);
		this._roleAttr.move(640,256,this);
		this._attrs=[];
		var arr=["生命上限","物攻上限","物防上限"];
		for(var i=0;i < 3;i++){
			this._attrs.push(new LazyAttr(arr[i],(App.dataMgr.q_battle_param_nameContainer.attrNameDic [arr[i]]).q_name));
		}
		for(i=0;i < 6;i++){
			if(i < 2){
				this._r_skills.push(new SkillBaseGrid("grid_62_1",EnumImageType.SKILL_56));
				this._r_skills[i].move(532,330+i *74,this);
			}
			this._d_skills.push(new PetSkillGridUI());
			this._d_skills[i].move(86+i *74,490,this);
			this._d_tips.push(new TipData("SKILL"));
			TipMgr.addTip(this._d_skills[i],this._d_tips[i]);
		}
	}

	__class(HuanshenView,'com.modules.pet.HuanshenView',_super);
	var __proto=HuanshenView.prototype;
	Laya.imps(__proto,{"com.game.core.panel.ITabView":true})
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		var item;
		for(var $each_item in this._d_skills){
			item=this._d_skills[$each_item];
			TipMgr.removeTip(item);
		}
		this._d_skills=null;
		this._r_skills=null;
		this._costLab=null;
		this._avatar=null;
		this._d_tips=null;
		this._attrs=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=0);
		this._bean=App.dataMgr.q_petContainer.petVec[tab];
		this._d_ids=SkillCenter.getYuanShenSkillList(tab);
		this._funId=PetCenter.PET_FUNS[tab];
		var ids=this._bean.q_passive_skill ? JSON.parse(this._bean.q_passive_skill):[];
		for(var i=0;i < ids.length;i++){
			this._r_skills[i].tag=ids[i][0] / 1000 >> 0;
			this._r_skills[i].on("click",this,this.onClick);
		}
		this.fontImg.skin=ResPathUtil.getImageRes("pet_font"+this._bean.q_pettype,".png","pet");
		this.addEvent("SkillCenter.SKILL_PASS_ACTIVE",this.updatePassSkill);
		this.addEvent("PetCenter.HUANSHEN_ATTR_CHANGE",this.updateAttrs);
		this.addEvent("PetCenter.HUANSHEN_CHANGE",this.updateHuanshen);
		this.addEvent("PetCenter.HUANSHEN_SKIN_LIST",this.updateSkin);
		this.addEvent("PetCenter.HUANSHEN_UP",this.onYuanshenUp);
		this.addEvent("ET.FUNCTION_TIP",this.onFunction);
		this.addEvent("PetCenter.HUANSHEN_LIST",this.update);
		this.addEvent("Bag.CHANGE",this.onItemChange);
		this.addEvent("SkillCenter.ADD",this.updateSkill);
		this.addEvent("MoneyEvent.CHANGE",this.onMoney);
		this.btnSkill.on("click",this,this.onClick);
		this.btnMain.on("click",this,this.onClick);
		this.btnHX.on("click",this,this.onClick);
		this.btnUP.on("press",this,this.onPress);
		this.onTab();
		this.updateSkin();
		this.updateSkill(null);
		this.updatePassSkill();
		this.onFunction(15);
		if(PetCenter.g_index > 0){
			this.addEvent("PetCenter.GUIDE",this.onGuide);
		}
		if(this.btnUP.visible){
			this.btnUP.label=this._costLab.have < this._costLab.itemNum *10 ? "升 级" :"长按升级";
		}
	}

	__proto.hide=function(){
		var grid;
		for(var $each_grid in this._r_skills){
			grid=this._r_skills[$each_grid];
			grid.off("click",this,this.onClick);
		}
		this.showGuide(false);
		EventMgr.removeAll(this);
		this.btnSkill.off("click",this,this.onClick);
		this.btnHX.off("click",this,this.onClick);
		this.btnUP.off("press",this,this.onPress);
		this.fontImg.skin=null;
		this._avatar.stopAndHide();
		this._curr=null;
	}

	__proto.update=function(isPlay){
		(isPlay===void 0)&& (isPlay=false);
		var star=0;
		var pet=PetCenter.getHuanshen(this._bean.q_pet_id);
		if(pet || this._bean.q_pettype==PetCenter.PET_TYPES[2]){
			this.btnUP.tag=true;
			var lv=0;
			if(pet){
				this._curr=App.dataMgr.q_huanshen_lvContainer.getDataBean(this._bean.q_pettype *10000+pet.marsLevel);
				lv=pet.marsStairs;
				star=lv-this._curr.q_star;
				this.btnMain.selected=pet.shizhuangState==1;
				this.btnMain.visible=true;
				this.btnUP.disabledString();
			}
			else{
				this._curr=App.dataMgr.q_huanshen_lvContainer.getDataBean(this._bean.q_pettype *10000+1);
				this.btnUP.disabledString(FunctionManager.getFunDescribe(PetCenter.PET_FUNS[PetCenter.PET_TYPES.indexOf(this._bean.q_pettype)]));
				this.btnMain.visible=false;
			}
			this.titleTxt.text=this._bean.q_name+'★'+lv+"级★";
			this.yimanjie.visible=this._curr.q_nextid==0 && lv >=this._curr.q_star;
			this.btnUP.visible=!this.yimanjie.visible;
			this._costLab.visible=this.btnUP.visible;
			if(this.btnUP.visible){
				var param=this._curr.q_upgrade_limit ? JSON.parse(this._curr.q_upgrade_limit):{};
				this.limitTxt.visible=!ConditionUtil.isConditionEnough(param);
				this.btnUP.visible=!this.limitTxt.visible;
				this._costLab.visible=this.btnUP.visible;
				if(this.limitTxt.visible){
					var sjbean=App.dataMgr.q_shenjiContainer.getDataBean(param["q_shenji"]);
					this.limitTxt.text="元神殿达到"+sjbean.q_lv+"级可升级";
				}
				else{
					this._costLab.showJson(this._curr.q_need_item);
					this._costLab.x=this.btnUP.x-this._costLab.width / 2;
					this.btnUP.showRedPoint(this._costLab.itemEnough);
				}
			}
		}
		else{
			this._costLab.visible=false;
			this._curr=App.dataMgr.q_huanshen_lvContainer.getDataBean(this._bean.q_pettype *10000+1);
			this.titleTxt.text=this._bean.q_name;
			this.yimanjie.visible=false;
			this.btnMain.visible=false;
			this.btnUP.disabledString(FunctionManager.getFunDescribe(PetCenter.PET_FUNS[PetCenter.PET_TYPES.indexOf(this._bean.q_pettype)]));
			this.btnUP.visible=true;
			this.btnUP.label="激 活";
			this.btnUP.tag=false;
		}
		this._roleAttr.setCurrent(LazyUtil.getAttrList2(LazyUtil.getTotalAtt(this._curr.q_role_attr1,this._curr.q_role_layer_attr,star)),false,true);
		this.updateAttrs();
	}

	__proto.updateAttrs=function(){
		var info=PetCenter.getAttr(this._bean.q_pet_id);
		this._attrs[0].value=info.maxHp.toNumber();
		this._attrs[1].value=info.dcmax.toNumber();
		this._attrs[1].value2=info.dcmin.toNumber();
		this._attrs[2].value=info.acmax.toNumber();
		this._attrs[2].value2=info.acmin.toNumber();
		this._petAttr.setCurrent(this._attrs,false,true);
	}

	__proto.onClick=function(e){
		if(e.currentTarget==this.btnSkill){
			PanelManager.openPanel(PanelRegister.HUOBAN_SKILL,null,-1,false);
		}
		else if(e.currentTarget==this.btnHX){
			PanelManager.openPanel(PanelRegister.HUOBAN_HX,null,-1,false);
		}
		else if(e.currentTarget==this.btnMain){
			HuobanCommandSender.sendC2S_PetChangeSkinMessage(this.btnMain.selected ? 1 :0,3,this._bean.q_pettype);
		}
		else if(e.currentTarget==this.btnUP){
			if(!this._costLab.itemEnough){
				PanelOpenManager.openGetway(this._costLab.itemId,e.currentTarget);
				return;
			}
			if(this.btnUP.tag){
				HuobanCommandSender.sendC2S_yuanshengUpgradeMessage(this._bean.q_pettype);
			}
		}
		else if((e.currentTarget instanceof com.components.grids.SkillBaseGrid )){
			var grid=e.currentTarget;
			if(grid.isRedPoint){
				var data=SkillCenter.getPassSkill(grid.tag);
				if(data){
					SkillCommandSender.sendC2S_PassiveActivationMessage(grid.passiveBean.q_next_id);
				}
				else{
					SkillCommandSender.sendC2S_PassiveActivationMessage(grid.passiveBean.q_id);
				}
			}
			else{
				grid.gotoGetway();
			}
		}
	}

	__proto.onPress=function(e){
		Event.EMPTY.setTo("click",this.btnUP,this.btnUP);
		this.onClick(Event.EMPTY);
	}

	__proto.onSend=function(){
		App.sound.playSound("star");
		HuobanCommandSender.sendC2S_yuanshengUpgradeMessage(this._curr.q_pettype);
	}

	__proto.onTab=function(){
		this.onGuide();
		this.update(false);
	}

	__proto.updatePassSkill=function(skillId){
		(skillId===void 0)&& (skillId=0);
		var grid;
		for(var i=0;i < this._r_skills.length;i++){
			grid=this._r_skills[i];
			if(!grid.visible){
				continue ;
			}
			grid.setPassiveId(grid.tag,-1,true,true,true);
			grid.showRedPoint(SkillCenter.isPassSkillCanUp(grid.tag));
		}
	}

	__proto.onItemChange=function(ids){
		if(this._costLab.visible && ids.indexOf(this._costLab.itemId)!=-1){
			this._costLab.update();
			this._costLab.x=this.btnUP.x-this._costLab.width / 2;
			this.btnUP.showRedPoint(this._costLab.itemEnough);
		}
		this.updatePassSkill();
	}

	__proto.onMoney=function(type,value){
		if(this._costLab.visible && type==this._costLab.itemId){
			this._costLab.update();
		}
	}

	__proto.onYuanshenUp=function(){
		this.update(true);
		CPlayOnceEffect.play(ResPathUtil.getPanelEffect("huoban_shuxingdan","mars"),this,340,280);
		CPlayOnceEffect.play(ResPathUtil.getPanelEffect("success","mars"),this,this.btnUP.x,this.btnUP.y);
	}

	__proto.onGuide=function(){
		this.showGuide(this._bean.q_pettype==PetCenter.PET_TYPES[0]);
	}

	__proto.updateHuanshen=function(cmd){
		this.update();
		if(cmd.changedType==0 || 7){
			this.updateSkin();
		}
	}

	__proto.onFunction=function(funId,value){
		(value===void 0)&& (value=false);
		if(funId==15){
			this.btnHX.showRedPoint(PetCenter.redtab10,52,8);
			this.btnSkill.showRedPoint(SkillCenter.getYuanShenPoint(),52,8);
		}
	}

	__proto.updateSkill=function(skill){
		if(skill && this._d_ids.indexOf(skill.skillId)< 0){
			return;
		};
		var ids1=[],ids2=[];
		for(var i=0;i < this._d_ids.length;i++){
			skill=SkillCenter.getSkill(this._d_ids[i]);
			skill ? ids1.push(skill.getDataBean().q_skillID_q_grade):ids2.push(this._d_ids[i] *1000+1);
		}
		ids2=ids1.concat(ids2);
		for(i=0;i < 6;i++){
			this._d_skills[i].visible=i < ids2.length;
			if(this._d_skills[i].visible){
				this._d_skills[i].icon.skin=ResPathUtil.getIcon(App.dataMgr.q_skillModelContainer.getDataBean(ids2[i]).q_small_ico,"skill/mobile");
				this._d_skills[i].icon.filters=i < ids1.length ? null :FilterUtil.GRAY_FILTER_ARRAY;
				this._d_tips[i].data=ids2[i] / 1000 >> 0;
			}
		}
	}

	__proto.updateSkin=function(){
		var id=PetCenter.getSkinByPet(this._bean.q_pettype);
		if(id==0){
			id=Q_globalCenter.getJsonData(15177).indexOf(WebParams.agent);
			id=id < 0 ? 11101+PetCenter.PET_TYPES.indexOf(this._bean.q_pettype)+"001" :this._bean.q_petID_q_grade;
		}
		this._avatar.showPet(App.dataMgr.q_petContainer.getDataBean(id,false));
	}

	__proto.showGuide=function(value){
		if(value && PetCenter.g_index==2 && PetCenter.guideId==10){
			if(!this._guide2){
				this._guide2=Guide.getGuide();
			}
			this._guide2.showEffect2(this.btnUP,this);
			return;
		}
		if(this._guide2){
			this._guide2.hide();
			this._guide2=null;
		}
	}

	return HuanshenView;
})(HuanshenViewUI)