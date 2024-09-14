
(function(window,document,Laya){
	var __un=Laya.un,__uns=Laya.uns,__static=Laya.static,__class=Laya.class,__getset=Laya.getset,__newvec=Laya.__newvec;

	var Box=laya.ui.Box,Button=laya.ui.Button,CheckBox=laya.ui.CheckBox,Clip=laya.ui.Clip,ComboBox=laya.ui.ComboBox;
	var Image=laya.ui.Image,Label=laya.ui.Label,List=laya.ui.List,Panel=laya.ui.Panel,Radio=laya.ui.Radio,Sprite=laya.display.Sprite;
	var Tab=laya.ui.Tab,TextArea=laya.ui.TextArea,TextInput=laya.ui.TextInput,View=laya.ui.View,ZLinkButton=zxk.ZLinkButton;
//class ui.mobile.comp.ItemCostLabel2UI extends laya.ui.View
var ItemCostLabel2UI=(function(_super){
	function ItemCostLabel2UI(){
		this.qianzuiTxt=null;
		this.icon=null;
		this.itemTxt=null;
		this.numTxt=null;
		ItemCostLabel2UI.__super.call(this);
	}

	__class(ItemCostLabel2UI,'ui.mobile.comp.ItemCostLabel2UI',_super);
	var __proto=ItemCostLabel2UI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/comp/ItemCostLabel2");
	}

	return ItemCostLabel2UI;
})(View)


//class ui.mobile.comp.ItemCostLabel3UI extends laya.ui.View
var ItemCostLabel3UI=(function(_super){
	function ItemCostLabel3UI(){
		this.txt=null;
		this.icon=null;
		ItemCostLabel3UI.__super.call(this);
	}

	__class(ItemCostLabel3UI,'ui.mobile.comp.ItemCostLabel3UI',_super);
	var __proto=ItemCostLabel3UI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/comp/ItemCostLabel3");
	}

	return ItemCostLabel3UI;
})(View)


//class ui.mobile.comp.RoleFightPowerUI extends laya.ui.View
var RoleFightPowerUI=(function(_super){
	function RoleFightPowerUI(){
		this.fightFont=null;
		this.arrow=null;
		this.power_txt=null;
		RoleFightPowerUI.__super.call(this);
	}

	__class(RoleFightPowerUI,'ui.mobile.comp.RoleFightPowerUI',_super);
	var __proto=RoleFightPowerUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/comp/RoleFightPower");
	}

	return RoleFightPowerUI;
})(View)


//class ui.mobile.tip.BuffTipUI extends laya.ui.View
var BuffTipUI=(function(_super){
	function BuffTipUI(){
		this.buffBg=null;
		this.buffName_txt=null;
		this.time_txt=null;
		this.content_txt=null;
		BuffTipUI.__super.call(this);
	}

	__class(BuffTipUI,'ui.mobile.tip.BuffTipUI',_super);
	var __proto=BuffTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tip/BuffTip");
	}

	return BuffTipUI;
})(View)


//class ui.mobile.tip.item.EquipSuitAttrItemUI extends laya.ui.View
var EquipSuitAttrItemUI=(function(_super){
	function EquipSuitAttrItemUI(){
		this.num_txt=null;
		this.active_txt=null;
		this.attr_txt=null;
		EquipSuitAttrItemUI.__super.call(this);
	}

	__class(EquipSuitAttrItemUI,'ui.mobile.tip.item.EquipSuitAttrItemUI',_super);
	var __proto=EquipSuitAttrItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tip/item/EquipSuitAttrItem");
	}

	return EquipSuitAttrItemUI;
})(View)


//class ui.mobile.tip.EquipTejieTipUI extends laya.ui.View
var EquipTejieTipUI=(function(_super){
	function EquipTejieTipUI(){
		this.suit_box=null;
		this.bg1=null;
		this.suitQua_txt=null;
		this.suit0=null;
		this.suit1=null;
		this.bg=null;
		this.equiped=null;
		this.grid=null;
		this.bind_txt=null;
		this.name_txt=null;
		this.type_txt=null;
		this.job_txt=null;
		this.lv_txt=null;
		this.box=null;
		this.attr_box=null;
		this.attr_txt=null;
		this.zz_attrTxt=null;
		this.pass_attr=null;
		this.juexing_attrTxt=null;
		this.juexingNameBox=null;
		this.juexingNumTxt=null;
		this.nameArr0=null;
		this.nameArr1=null;
		this.nameArr2=null;
		this.nameArr3=null;
		this.nameArr4=null;
		this.nameArr5=null;
		this.jinglian_txt=null;
		this.qianghua_txt=null;
		this.huishou_txt=null;
		EquipTejieTipUI.__super.call(this);
	}

	__class(EquipTejieTipUI,'ui.mobile.tip.EquipTejieTipUI',_super);
	var __proto=EquipTejieTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tip/EquipTejieTip");
	}

	return EquipTejieTipUI;
})(View)


//class ui.mobile.tip.HongMengSuitTipUI extends laya.ui.View
var HongMengSuitTipUI=(function(_super){
	function HongMengSuitTipUI(){
		this.suitQua_txt=null;
		this.skill_txt=null;
		HongMengSuitTipUI.__super.call(this);
	}

	__class(HongMengSuitTipUI,'ui.mobile.tip.HongMengSuitTipUI',_super);
	var __proto=HongMengSuitTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tip/HongMengSuitTip");
	}

	return HongMengSuitTipUI;
})(View)


//class ui.mobile.tip.ItemTejieTipUI extends laya.ui.View
var ItemTejieTipUI=(function(_super){
	function ItemTejieTipUI(){
		this.bg=null;
		this.bg1=null;
		this.nameImg=null;
		this.descBg=null;
		this.descImg=null;
		this.box=null;
		this.box0=null;
		this.title0=null;
		this.attrTxt0=null;
		this.box1=null;
		this.title1=null;
		this.attrTxt1=null;
		ItemTejieTipUI.__super.call(this);
	}

	__class(ItemTejieTipUI,'ui.mobile.tip.ItemTejieTipUI',_super);
	var __proto=ItemTejieTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tip/ItemTejieTip");
	}

	return ItemTejieTipUI;
})(View)


//class ui.mobile.tip.SkillMijiTipUI extends laya.ui.View
var SkillMijiTipUI=(function(_super){
	function SkillMijiTipUI(){
		this.bg=null;
		this.itemIcon=null;
		this.name_txt=null;
		this.type_txt=null;
		this.attr_txt1=null;
		this.next_box=null;
		this.attr_txt2=null;
		this.box=null;
		this.skillIcon=null;
		this.skill_txt=null;
		this.desc_txt=null;
		this.from_txt=null;
		this.tip_txt=null;
		SkillMijiTipUI.__super.call(this);
	}

	__class(SkillMijiTipUI,'ui.mobile.tip.SkillMijiTipUI',_super);
	var __proto=SkillMijiTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tip/SkillMijiTip");
	}

	return SkillMijiTipUI;
})(View)


//class ui.mobile.tip.SkillPassiveTipUI extends laya.ui.View
var SkillPassiveTipUI=(function(_super){
	function SkillPassiveTipUI(){
		this.bg=null;
		this.grid=null;
		this.name_txt=null;
		this.maxlv_txt=null;
		this.lv_txt=null;
		this.active_txt=null;
		this.desc_txt=null;
		this.condition_txt=null;
		this.imgTitle=null;
		this.h_list=null;
		this.h_attrTxt=null;
		this.partTxt0=null;
		this.partTxt1=null;
		SkillPassiveTipUI.__super.call(this);
	}

	__class(SkillPassiveTipUI,'ui.mobile.tip.SkillPassiveTipUI',_super);
	var __proto=SkillPassiveTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tip/SkillPassiveTip");
	}

	return SkillPassiveTipUI;
})(View)


//class ui.mobile.tip.SkillTipUI extends laya.ui.View
var SkillTipUI=(function(_super){
	function SkillTipUI(){
		this.bg=null;
		this.grid=null;
		this.name_txt=null;
		this.cd_txt=null;
		this.active_txt=null;
		this.lv_txt=null;
		this.desc_txt=null;
		this.active_box=null;
		this.book_txt=null;
		SkillTipUI.__super.call(this);
	}

	__class(SkillTipUI,'ui.mobile.tip.SkillTipUI',_super);
	var __proto=SkillTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tip/SkillTip");
	}

	return SkillTipUI;
})(View)


//class ui.mobile.tip.item.TejieAttrItemUI extends laya.ui.View
var TejieAttrItemUI=(function(_super){
	function TejieAttrItemUI(){
		this.nameTxt=null;
		this.descTxt=null;
		TejieAttrItemUI.__super.call(this);
	}

	__class(TejieAttrItemUI,'ui.mobile.tip.item.TejieAttrItemUI',_super);
	var __proto=TejieAttrItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tip/item/TejieAttrItem");
	}

	return TejieAttrItemUI;
})(View)


//class ui.mobile.tip.TipStoneListUI extends laya.ui.View
var TipStoneListUI=(function(_super){
	function TipStoneListUI(){
		this.title=null;
		TipStoneListUI.__super.call(this);
	}

	__class(TipStoneListUI,'ui.mobile.tip.TipStoneListUI',_super);
	var __proto=TipStoneListUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tip/TipStoneList");
	}

	return TipStoneListUI;
})(View)


//class ui.mobile.tip.EquipTipUI extends laya.ui.View
var EquipTipUI=(function(_super){
	function EquipTipUI(){
		this.bg=null;
		this.equiped=null;
		this.grid=null;
		this.pojie=null;
		this.font_shenzhu=null;
		this.hunhuanjie=null;
		this.box=null;
		this.attr_box=null;
		this.attr_title=null;
		this.attr_txt=null;
		this.qianghua_txt=null;
		this.zz_attrTxt=null;
		this.suit_box=null;
		this.suitQua_txt=null;
		this.suit0=null;
		this.suit1=null;
		this.suitSkill_txt=null;
		this.suitSkillDescTxt=null;
		this.suitSkillNameTxt=null;
		this.suitSkillDescTxt2=null;
		this.suitSkillNameTxt2=null;
		this.skill_box=null;
		this.skill_name=null;
		this.skill_desc=null;
		this.huishou_txt=null;
		this.from_txt=null;
		this.lostTime_txt=null;
		this.useTime_txt=null;
		this.jipin_attrTxt=null;
		this.jipin_title=null;
		this.descTxt=null;
		this.tip_txt=null;
		this.qianghua6_txt=null;
		this.qianghua6_title=null;
		this.star_attrBox=null;
		this.qianghua7_txt=null;
		this.qianghua7_title=null;
		this.juexing_attrTxt=null;
		this.juexingNameBox=null;
		this.juexingNumTxt=null;
		this.nameArr0=null;
		this.nameArr1=null;
		this.nameArr2=null;
		this.nameArr3=null;
		this.nameArr4=null;
		this.nameArr5=null;
		this.qianghua8_txt=null;
		this.qianghua8_title=null;
		this.qianghua9_txt=null;
		this.qianghua9_title=null;
		this.bind_txt=null;
		this.name_txt=null;
		this.type_txt=null;
		this.job_txt=null;
		this.lv_txt=null;
		this.pinzhi_txt=null;
		this.ani_box=null;
		this.ani_txt=null;
		EquipTipUI.__super.call(this);
	}

	__class(EquipTipUI,'ui.mobile.tip.EquipTipUI',_super);
	var __proto=EquipTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tip/EquipTip");
	}

	return EquipTipUI;
})(View)


//class ui.mobile.tip.ItemTipUI extends laya.ui.View
var ItemTipUI=(function(_super){
	function ItemTipUI(){
		this.bg=null;
		this.grid=null;
		this.name_txt=null;
		this.type_txt=null;
		this.count_txt=null;
		this.lv_txt=null;
		this.bind_txt=null;
		this.box=null;
		this.price_box=null;
		this.price_img=null;
		this.price_txt=null;
		this.sell_box=null;
		this.sell_img=null;
		this.sell_txt=null;
		this.desc_txt=null;
		this.from_txt=null;
		this.day_useTxt=null;
		this.coolingTime_txt=null;
		this.lostTime_txt=null;
		this.useTime_txt=null;
		this.tip_txt=null;
		this.skill_box=null;
		this.bs_attr_txt1=null;
		this.bs_title_txt1=null;
		this.bs_attr_txt2=null;
		this.bs_title_txt2=null;
		this.jlyl_box=null;
		this.jlyl_img=null;
		this.shixian_txt=null;
		this.ani_box=null;
		ItemTipUI.__super.call(this);
	}

	__class(ItemTipUI,'ui.mobile.tip.ItemTipUI',_super);
	var __proto=ItemTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tip/ItemTip");
	}

	return ItemTipUI;
})(View)


//class ui.mobile.tip.TipButtonUI extends laya.ui.View
var TipButtonUI=(function(_super){
	function TipButtonUI(){
		this.bag_btn=null;
		this.action_btn=null;
		this.menu_btn=null;
		TipButtonUI.__super.call(this);
	}

	__class(TipButtonUI,'ui.mobile.tip.TipButtonUI',_super);
	var __proto=TipButtonUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tip/TipButton");
	}

	return TipButtonUI;
})(View)


//class ui.mobile.tip.WulingStoneTipUI extends laya.ui.View
var WulingStoneTipUI=(function(_super){
	function WulingStoneTipUI(){
		this.bg=null;
		this.bg1=null;
		this.icon=null;
		this.nameImg=null;
		this.attrTxt=null;
		this.titleImg=null;
		WulingStoneTipUI.__super.call(this);
	}

	__class(WulingStoneTipUI,'ui.mobile.tip.WulingStoneTipUI',_super);
	var __proto=WulingStoneTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tip/WulingStoneTip");
	}

	return WulingStoneTipUI;
})(View)


//class ui.mobile.comp.AttrTextField2ItemUI extends laya.ui.View
var AttrTextField2ItemUI=(function(_super){
	function AttrTextField2ItemUI(){
		this.r_bg=null;
		this.nameTxt=null;
		this.attrTxt=null;
		AttrTextField2ItemUI.__super.call(this);
	}

	__class(AttrTextField2ItemUI,'ui.mobile.comp.AttrTextField2ItemUI',_super);
	var __proto=AttrTextField2ItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/comp/AttrTextField2Item");
	}

	return AttrTextField2ItemUI;
})(View)


//class ui.mobile.comp.GuideUI extends laya.ui.View
var GuideUI=(function(_super){
	function GuideUI(){
		this.box=null;
		this.bg=null;
		this.txt=null;
		this.arrow=null;
		GuideUI.__super.call(this);
	}

	__class(GuideUI,'ui.mobile.comp.GuideUI',_super);
	var __proto=GuideUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/comp/Guide");
	}

	return GuideUI;
})(View)


//class ui.mobile.comp.GuideEffectUI extends laya.ui.View
var GuideEffectUI=(function(_super){
	function GuideEffectUI(){
		this.lt=null;
		this.rt=null;
		this.lb=null;
		this.rb=null;
		GuideEffectUI.__super.call(this);
	}

	__class(GuideEffectUI,'ui.mobile.comp.GuideEffectUI',_super);
	var __proto=GuideEffectUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/comp/GuideEffect");
	}

	return GuideEffectUI;
})(View)


//class ui.mobile.main.ReconnectPromptUI extends laya.ui.View
var ReconnectPromptUI=(function(_super){
	function ReconnectPromptUI(){
		this.horse=null;
		this.dot1=null;
		this.dot2=null;
		this.dot3=null;
		this.reconnect_txt=null;
		this.alertNode=null;
		this.window=null;
		this.txt1=null;
		this.btn_sure=null;
		this.txt2=null;
		ReconnectPromptUI.__super.call(this);
	}

	__class(ReconnectPromptUI,'ui.mobile.main.ReconnectPromptUI',_super);
	var __proto=ReconnectPromptUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/ReconnectPrompt");
	}

	return ReconnectPromptUI;
})(View)


//class ui.mobile.scene.DropYaodanUI extends laya.ui.View
var DropYaodanUI=(function(_super){
	function DropYaodanUI(){
		this.bg=null;
		this.qua=null;
		this.icon=null;
		this.name_img=null;
		DropYaodanUI.__super.call(this);
	}

	__class(DropYaodanUI,'ui.mobile.scene.DropYaodanUI',_super);
	var __proto=DropYaodanUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/scene/DropYaodan");
	}

	return DropYaodanUI;
})(View)


//class ui.mobile.scene.RoleHeadChatUI extends laya.ui.View
var RoleHeadChatUI=(function(_super){
	function RoleHeadChatUI(){
		this.arrow=null;
		this.bg=null;
		this.btn=null;
		this.txt=null;
		RoleHeadChatUI.__super.call(this);
	}

	__class(RoleHeadChatUI,'ui.mobile.scene.RoleHeadChatUI',_super);
	var __proto=RoleHeadChatUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/scene/RoleHeadChat");
	}

	return RoleHeadChatUI;
})(View)


//class ui.mobile.scene.RoleHeadHpBarUI extends laya.ui.View
var RoleHeadHpBarUI=(function(_super){
	function RoleHeadHpBarUI(){
		this.txt=null;
		this.hpCon=null;
		this.bg=null;
		this.bar=null;
		RoleHeadHpBarUI.__super.call(this);
	}

	__class(RoleHeadHpBarUI,'ui.mobile.scene.RoleHeadHpBarUI',_super);
	var __proto=RoleHeadHpBarUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/scene/RoleHeadHpBar");
	}

	return RoleHeadHpBarUI;
})(View)


//class ui.mobile.scene.SceneDropPanelUI extends laya.ui.View
var SceneDropPanelUI=(function(_super){
	function SceneDropPanelUI(){
		this.bg=null;
		this.time_bg=null;
		this.time_txt=null;
		this.count_txt=null;
		this.btn=null;
		SceneDropPanelUI.__super.call(this);
	}

	__class(SceneDropPanelUI,'ui.mobile.scene.SceneDropPanelUI',_super);
	var __proto=SceneDropPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/scene/SceneDropPanel");
	}

	return SceneDropPanelUI;
})(View)


//class ui.mobile.scene.SceneDropPanel2UI extends laya.ui.View
var SceneDropPanel2UI=(function(_super){
	function SceneDropPanel2UI(){
		this.bg=null;
		this.btn1=null;
		this.btn2=null;
		this.time_txt=null;
		SceneDropPanel2UI.__super.call(this);
	}

	__class(SceneDropPanel2UI,'ui.mobile.scene.SceneDropPanel2UI',_super);
	var __proto=SceneDropPanel2UI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/scene/SceneDropPanel2");
	}

	return SceneDropPanel2UI;
})(View)


//class ui.mobile.AlertEditorUI extends laya.ui.View
var AlertEditorUI=(function(_super){
	function AlertEditorUI(){
		this.window=null;
		this.title_img=null;
		this.ok_btn=null;
		this.cancel_btn=null;
		this.txt=null;
		AlertEditorUI.__super.call(this);
	}

	__class(AlertEditorUI,'ui.mobile.AlertEditorUI',_super);
	var __proto=AlertEditorUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/AlertEditor");
	}

	return AlertEditorUI;
})(View)


//class ui.mobile.activity.bafuAct.item.BafuActDoubleItemUI extends laya.ui.View
var BafuActDoubleItemUI=(function(_super){
	function BafuActDoubleItemUI(){
		this.bg=null;
		this.info_txt=null;
		this.icon_txt=null;
		this.item_box=null;
		this.btn=null;
		this.getted=null;
		BafuActDoubleItemUI.__super.call(this);
	}

	__class(BafuActDoubleItemUI,'ui.mobile.activity.bafuAct.item.BafuActDoubleItemUI',_super);
	var __proto=BafuActDoubleItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/bafuAct/item/BafuActDoubleItem");
	}

	return BafuActDoubleItemUI;
})(View)


//class ui.mobile.activity.bafuAct.item.BafuActLoginItemUI extends laya.ui.View
var BafuActLoginItemUI=(function(_super){
	function BafuActLoginItemUI(){
		this.item_box=null;
		this.btn=null;
		this.getted=null;
		BafuActLoginItemUI.__super.call(this);
	}

	__class(BafuActLoginItemUI,'ui.mobile.activity.bafuAct.item.BafuActLoginItemUI',_super);
	var __proto=BafuActLoginItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/bafuAct/item/BafuActLoginItem");
	}

	return BafuActLoginItemUI;
})(View)


//class ui.mobile.activity.bafuAct.view.BafuActDoubleViewUI extends laya.ui.View
var BafuActDoubleViewUI=(function(_super){
	function BafuActDoubleViewUI(){
		this.time_txt=null;
		this.l_list=null;
		this.r_list=null;
		this.l_btn=null;
		this.l_getted=null;
		this.r_btn=null;
		this.r_getted=null;
		BafuActDoubleViewUI.__super.call(this);
	}

	__class(BafuActDoubleViewUI,'ui.mobile.activity.bafuAct.view.BafuActDoubleViewUI',_super);
	var __proto=BafuActDoubleViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/bafuAct/view/BafuActDoubleView");
	}

	return BafuActDoubleViewUI;
})(View)


//class ui.mobile.activity.bafuAct.view.BafuActFudaiViewUI extends laya.ui.View
var BafuActFudaiViewUI=(function(_super){
	function BafuActFudaiViewUI(){
		this.btnGo=null;
		this.timeTxt=null;
		this.item_box=null;
		BafuActFudaiViewUI.__super.call(this);
	}

	__class(BafuActFudaiViewUI,'ui.mobile.activity.bafuAct.view.BafuActFudaiViewUI',_super);
	var __proto=BafuActFudaiViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/bafuAct/view/BafuActFudaiView");
	}

	return BafuActFudaiViewUI;
})(View)


//class ui.mobile.activity.bafuAct.view.BafuActLoginViewUI extends laya.ui.View
var BafuActLoginViewUI=(function(_super){
	function BafuActLoginViewUI(){
		this.time_txt=null;
		this.t_list=null;
		this.b_list=null;
		this.jihuo_txt=null;
		this.jihuo_btn=null;
		BafuActLoginViewUI.__super.call(this);
	}

	__class(BafuActLoginViewUI,'ui.mobile.activity.bafuAct.view.BafuActLoginViewUI',_super);
	var __proto=BafuActLoginViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/bafuAct/view/BafuActLoginView");
	}

	return BafuActLoginViewUI;
})(View)


//class ui.mobile.activity.bafuAct.view.BafuActViewUI extends laya.ui.View
var BafuActViewUI=(function(_super){
	function BafuActViewUI(){
		this.btnGo=null;
		BafuActViewUI.__super.call(this);
	}

	__class(BafuActViewUI,'ui.mobile.activity.bafuAct.view.BafuActViewUI',_super);
	var __proto=BafuActViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/bafuAct/view/BafuActView");
	}

	return BafuActViewUI;
})(View)


//class ui.mobile.activity.dasheng.DashengKBZLItemUI extends laya.ui.View
var DashengKBZLItemUI=(function(_super){
	function DashengKBZLItemUI(){
		this.bg=null;
		this.name=null;
		this.btnGo=null;
		this.yilingqu=null;
		this.yuan=null;
		DashengKBZLItemUI.__super.call(this);
	}

	__class(DashengKBZLItemUI,'ui.mobile.activity.dasheng.DashengKBZLItemUI',_super);
	var __proto=DashengKBZLItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/dasheng/DashengKBZLItem");
	}

	return DashengKBZLItemUI;
})(View)


//class ui.mobile.activity.dasheng.DashengKBZLViewUI extends laya.ui.View
var DashengKBZLViewUI=(function(_super){
	function DashengKBZLViewUI(){
		this.p_list=null;
		this.timeTxt=null;
		this.infoTxt=null;
		DashengKBZLViewUI.__super.call(this);
	}

	__class(DashengKBZLViewUI,'ui.mobile.activity.dasheng.DashengKBZLViewUI',_super);
	var __proto=DashengKBZLViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/dasheng/DashengKBZLView");
	}

	return DashengKBZLViewUI;
})(View)


//class ui.mobile.activity.dasheng.DashengShopItemUI extends laya.ui.View
var DashengShopItemUI=(function(_super){
	function DashengShopItemUI(){
		this.bg=null;
		this.btnBuy=null;
		this.c_txt=null;
		this.c_icon=null;
		this.title=null;
		this.yigoumai=null;
		this.zhe=null;
		DashengShopItemUI.__super.call(this);
	}

	__class(DashengShopItemUI,'ui.mobile.activity.dasheng.DashengShopItemUI',_super);
	var __proto=DashengShopItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/dasheng/DashengShopItem");
	}

	return DashengShopItemUI;
})(View)


//class ui.mobile.activity.dasheng.DashengShopViewUI extends laya.ui.View
var DashengShopViewUI=(function(_super){
	function DashengShopViewUI(){
		this.p_list=null;
		this.c_txt=null;
		this.c_icon=null;
		this.timeTxt=null;
		this.sx_timeTxt=null;
		this.btnSX=null;
		DashengShopViewUI.__super.call(this);
	}

	__class(DashengShopViewUI,'ui.mobile.activity.dasheng.DashengShopViewUI',_super);
	var __proto=DashengShopViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/dasheng/DashengShopView");
	}

	return DashengShopViewUI;
})(View)


//class ui.mobile.activity.flower.item.GetRedPacketItemUI extends laya.ui.View
var GetRedPacketItemUI=(function(_super){
	function GetRedPacketItemUI(){
		this.bg=null;
		this.item_bg=null;
		this.name_txt=null;
		this.time_txt=null;
		this.btn=null;
		this.open_box=null;
		this.name_txt1=null;
		this.item_img=null;
		this.item_num=null;
		this.getted=null;
		GetRedPacketItemUI.__super.call(this);
	}

	__class(GetRedPacketItemUI,'ui.mobile.activity.flower.item.GetRedPacketItemUI',_super);
	var __proto=GetRedPacketItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/flower/item/GetRedPacketItem");
	}

	return GetRedPacketItemUI;
})(View)


//class ui.mobile.activity.flower.item.SendRedPacketItemUI extends laya.ui.View
var SendRedPacketItemUI=(function(_super){
	function SendRedPacketItemUI(){
		this.icon_txt=null;
		this.num_txt=null;
		this.btn=null;
		SendRedPacketItemUI.__super.call(this);
	}

	__class(SendRedPacketItemUI,'ui.mobile.activity.flower.item.SendRedPacketItemUI',_super);
	var __proto=SendRedPacketItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/flower/item/SendRedPacketItem");
	}

	return SendRedPacketItemUI;
})(View)


//class ui.mobile.activity.flower.redPacket.RedPacketChatItemUI extends laya.ui.View
var RedPacketChatItemUI=(function(_super){
	function RedPacketChatItemUI(){
		this.bg=null;
		this.states_txt=null;
		RedPacketChatItemUI.__super.call(this);
	}

	__class(RedPacketChatItemUI,'ui.mobile.activity.flower.redPacket.RedPacketChatItemUI',_super);
	var __proto=RedPacketChatItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/flower/redPacket/RedPacketChatItem");
	}

	return RedPacketChatItemUI;
})(View)


//class ui.mobile.activity.flower.redPacket.MainRedPacketIconUI extends laya.ui.View
var MainRedPacketIconUI=(function(_super){
	function MainRedPacketIconUI(){
		this.btn=null;
		MainRedPacketIconUI.__super.call(this);
	}

	__class(MainRedPacketIconUI,'ui.mobile.activity.flower.redPacket.MainRedPacketIconUI',_super);
	var __proto=MainRedPacketIconUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/flower/redPacket/MainRedPacketIcon");
	}

	return MainRedPacketIconUI;
})(View)


//class ui.mobile.activity.flower.redPacket.RedPacketItemUI extends laya.ui.View
var RedPacketItemUI=(function(_super){
	function RedPacketItemUI(){
		this.bg=null;
		this.name_txt=null;
		this.item_num=null;
		this.item_img=null;
		RedPacketItemUI.__super.call(this);
	}

	__class(RedPacketItemUI,'ui.mobile.activity.flower.redPacket.RedPacketItemUI',_super);
	var __proto=RedPacketItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/flower/redPacket/RedPacketItem");
	}

	return RedPacketItemUI;
})(View)


//class ui.mobile.activity.flower.view.RedPacketViewUI extends laya.ui.View
var RedPacketViewUI=(function(_super){
	function RedPacketViewUI(){
		this.r_list=null;
		this.l_list=null;
		this.info_txt=null;
		this.time_txt=null;
		this.tip_box=null;
		RedPacketViewUI.__super.call(this);
	}

	__class(RedPacketViewUI,'ui.mobile.activity.flower.view.RedPacketViewUI',_super);
	var __proto=RedPacketViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/flower/view/RedPacketView");
	}

	return RedPacketViewUI;
})(View)


//class ui.mobile.fulihall.item.LianjiZhanlingItemUI extends laya.ui.View
var LianjiZhanlingItemUI=(function(_super){
	function LianjiZhanlingItemUI(){
		this.bg=null;
		this.dayTxt=null;
		this.yilingqu0=null;
		this.yilingqu1=null;
		this.yilingqu2=null;
		LianjiZhanlingItemUI.__super.call(this);
	}

	__class(LianjiZhanlingItemUI,'ui.mobile.fulihall.item.LianjiZhanlingItemUI',_super);
	var __proto=LianjiZhanlingItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fulihall/item/LianjiZhanlingItem");
	}

	return LianjiZhanlingItemUI;
})(View)


//class ui.mobile.fulihall.item.SignItemUI extends laya.ui.View
var SignItemUI=(function(_super){
	function SignItemUI(){
		this.bgImg=null;
		this.daybg=null;
		this.dayTxt=null;
		this.signedImg=null;
		this.btn=null;
		this.duobei_jb=null;
		SignItemUI.__super.call(this);
	}

	__class(SignItemUI,'ui.mobile.fulihall.item.SignItemUI',_super);
	var __proto=SignItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fulihall/item/SignItem");
	}

	return SignItemUI;
})(View)


//class ui.mobile.fulihall.item.ResourceBackItemUI extends laya.ui.View
var ResourceBackItemUI=(function(_super){
	function ResourceBackItemUI(){
		this.times_txt=null;
		this.name_txt=null;
		this.yb_txt=null;
		this.zs_txt=null;
		this.back_yb_txt=null;
		this.back_zs_txt=null;
		this.btn_yb=null;
		this.money_ybTxt=null;
		this.btn_zs=null;
		this.money_zsTxt=null;
		ResourceBackItemUI.__super.call(this);
	}

	__class(ResourceBackItemUI,'ui.mobile.fulihall.item.ResourceBackItemUI',_super);
	var __proto=ResourceBackItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fulihall/item/ResourceBackItem");
	}

	return ResourceBackItemUI;
})(View)


//class ui.mobile.fulihall.view.ResourceBackViewUI extends laya.ui.View
var ResourceBackViewUI=(function(_super){
	function ResourceBackViewUI(){
		this.btn_onekey_yb=null;
		this.btn_onekey_zs=null;
		this.back_yb_txt=null;
		this.back_zs_txt=null;
		this.list=null;
		ResourceBackViewUI.__super.call(this);
	}

	__class(ResourceBackViewUI,'ui.mobile.fulihall.view.ResourceBackViewUI',_super);
	var __proto=ResourceBackViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fulihall/view/ResourceBackView");
	}

	return ResourceBackViewUI;
})(View)


//class ui.mobile.fulihall.view.ActivateExchangeViewUI extends laya.ui.View
var ActivateExchangeViewUI=(function(_super){
	function ActivateExchangeViewUI(){
		this.cdTxt=null;
		this.btnGetAward=null;
		this.txt=null;
		this.btnShop=null;
		this.timeTxt=null;
		ActivateExchangeViewUI.__super.call(this);
	}

	__class(ActivateExchangeViewUI,'ui.mobile.fulihall.view.ActivateExchangeViewUI',_super);
	var __proto=ActivateExchangeViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fulihall/view/ActivateExchangeView");
	}

	return ActivateExchangeViewUI;
})(View)


//class ui.mobile.fulihall.view.LianjiZhanlingViewUI extends laya.ui.View
var LianjiZhanlingViewUI=(function(_super){
	function LianjiZhanlingViewUI(){
		this.timeTxt=null;
		this.btnBuy=null;
		this.l_list=null;
		LianjiZhanlingViewUI.__super.call(this);
	}

	__class(LianjiZhanlingViewUI,'ui.mobile.fulihall.view.LianjiZhanlingViewUI',_super);
	var __proto=LianjiZhanlingViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fulihall/view/LianjiZhanlingView");
	}

	return LianjiZhanlingViewUI;
})(View)


//class ui.mobile.fulihall.view.OnLineViewUI extends laya.ui.View
var OnLineViewUI=(function(_super){
	function OnLineViewUI(){
		this.panel=null;
		OnLineViewUI.__super.call(this);
	}

	__class(OnLineViewUI,'ui.mobile.fulihall.view.OnLineViewUI',_super);
	var __proto=OnLineViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fulihall/view/OnLineView");
	}

	return OnLineViewUI;
})(View)


//class ui.mobile.fulihall.view.QifuViewUI extends laya.ui.View
var QifuViewUI=(function(_super){
	function QifuViewUI(){
		this.btn1=null;
		this.txt1=null;
		this.l_txt2=null;
		this.l_txt3=null;
		this.l_txt4=null;
		this.r_box=null;
		this.btn2=null;
		this.txt2=null;
		this.r_txt2=null;
		this.r_txt3=null;
		this.r_txt4=null;
		this.r_price=null;
		this.r_icon=null;
		this.l_price=null;
		this.l_icon=null;
		this.r_img=null;
		QifuViewUI.__super.call(this);
	}

	__class(QifuViewUI,'ui.mobile.fulihall.view.QifuViewUI',_super);
	var __proto=QifuViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fulihall/view/QifuView");
	}

	return QifuViewUI;
})(View)


//class ui.mobile.fulihall.view.SignViewUI extends laya.ui.View
var SignViewUI=(function(_super){
	function SignViewUI(){
		this.yueFont=null;
		this.panel=null;
		this.barbg=null;
		this.bar=null;
		SignViewUI.__super.call(this);
	}

	__class(SignViewUI,'ui.mobile.fulihall.view.SignViewUI',_super);
	var __proto=SignViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fulihall/view/SignView");
	}

	return SignViewUI;
})(View)


//class ui.mobile.fulihall.view.YuanshenAdViewUI extends laya.ui.View
var YuanshenAdViewUI=(function(_super){
	function YuanshenAdViewUI(){
		this.bg=null;
		this.btnGo=null;
		this.txtbg=null;
		this.txt1=null;
		this.txt2=null;
		this.img_font=null;
		YuanshenAdViewUI.__super.call(this);
	}

	__class(YuanshenAdViewUI,'ui.mobile.fulihall.view.YuanshenAdViewUI',_super);
	var __proto=YuanshenAdViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fulihall/view/YuanshenAdView");
	}

	return YuanshenAdViewUI;
})(View)


//class ui.mobile.fulihall.view.YuanshenTanbaoViewUI extends laya.ui.View
var YuanshenTanbaoViewUI=(function(_super){
	function YuanshenTanbaoViewUI(){
		this.btnTB=null;
		this.btnZB=null;
		this.todayTotalTxt=null;
		this.totalTimeTxt=null;
		this.descTxt=null;
		this.btn_txt0=null;
		this.p_txt0=null;
		this.p_icon0=null;
		this.btn_txt1=null;
		this.p_txt1=null;
		this.p_icon1=null;
		this.btn_txt2=null;
		this.p_txt2=null;
		this.p_icon2=null;
		this.redline=null;
		this.p_txt21=null;
		this.tipBox=null;
		this.btn0=null;
		this.btn1=null;
		this.btn2=null;
		this.first=null;
		YuanshenTanbaoViewUI.__super.call(this);
	}

	__class(YuanshenTanbaoViewUI,'ui.mobile.fulihall.view.YuanshenTanbaoViewUI',_super);
	var __proto=YuanshenTanbaoViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fulihall/view/YuanshenTanbaoView");
	}

	return YuanshenTanbaoViewUI;
})(View)


//class ui.mobile.activity.kuangbao.KBBimaiItemUI extends laya.ui.View
var KBBimaiItemUI=(function(_super){
	function KBBimaiItemUI(){
		this.bg=null;
		this.btnBuy=null;
		this.yibuy=null;
		this.r_font=null;
		this.tipBox=null;
		KBBimaiItemUI.__super.call(this);
	}

	__class(KBBimaiItemUI,'ui.mobile.activity.kuangbao.KBBimaiItemUI',_super);
	var __proto=KBBimaiItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/kuangbao/KBBimaiItem");
	}

	return KBBimaiItemUI;
})(View)


//class ui.mobile.activity.kuangbao.KBBimaiViewUI extends laya.ui.View
var KBBimaiViewUI=(function(_super){
	function KBBimaiViewUI(){
		this.p_list=null;
		this.timeTxt=null;
		KBBimaiViewUI.__super.call(this);
	}

	__class(KBBimaiViewUI,'ui.mobile.activity.kuangbao.KBBimaiViewUI',_super);
	var __proto=KBBimaiViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/kuangbao/KBBimaiView");
	}

	return KBBimaiViewUI;
})(View)


//class ui.mobile.activity.kuangbao.KBHaoliItemUI extends laya.ui.View
var KBHaoliItemUI=(function(_super){
	function KBHaoliItemUI(){
		this.bg=null;
		this.title=null;
		this.btnBuy=null;
		this.limitTxt=null;
		this.yibuy=null;
		KBHaoliItemUI.__super.call(this);
	}

	__class(KBHaoliItemUI,'ui.mobile.activity.kuangbao.KBHaoliItemUI',_super);
	var __proto=KBHaoliItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/kuangbao/KBHaoliItem");
	}

	return KBHaoliItemUI;
})(View)


//class ui.mobile.activity.kuangbao.KBHaoliViewUI extends laya.ui.View
var KBHaoliViewUI=(function(_super){
	function KBHaoliViewUI(){
		this.p_list=null;
		this.timeTxt=null;
		KBHaoliViewUI.__super.call(this);
	}

	__class(KBHaoliViewUI,'ui.mobile.activity.kuangbao.KBHaoliViewUI',_super);
	var __proto=KBHaoliViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/kuangbao/KBHaoliView");
	}

	return KBHaoliViewUI;
})(View)


//class ui.mobile.activity.kuangbao.KBMeiriItemUI extends laya.ui.View
var KBMeiriItemUI=(function(_super){
	function KBMeiriItemUI(){
		this.bg=null;
		this.title=null;
		this.btnBuy=null;
		this.limitTxt=null;
		this.yibuy=null;
		this.o_txt=null;
		this.o_icon=null;
		this.o_txt1=null;
		KBMeiriItemUI.__super.call(this);
	}

	__class(KBMeiriItemUI,'ui.mobile.activity.kuangbao.KBMeiriItemUI',_super);
	var __proto=KBMeiriItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/kuangbao/KBMeiriItem");
	}

	return KBMeiriItemUI;
})(View)


//class ui.mobile.activity.kuangbao.KBMeiriViewUI extends laya.ui.View
var KBMeiriViewUI=(function(_super){
	function KBMeiriViewUI(){
		this.p_list=null;
		this.timeTxt=null;
		this.info_txt=null;
		KBMeiriViewUI.__super.call(this);
	}

	__class(KBMeiriViewUI,'ui.mobile.activity.kuangbao.KBMeiriViewUI',_super);
	var __proto=KBMeiriViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/kuangbao/KBMeiriView");
	}

	return KBMeiriViewUI;
})(View)


//class ui.mobile.activity.kuangbao.KBShilianItemUI extends laya.ui.View
var KBShilianItemUI=(function(_super){
	function KBShilianItemUI(){
		this.bg=null;
		this.infoTxt=null;
		this.btn=null;
		this.yilingqu=null;
		KBShilianItemUI.__super.call(this);
	}

	__class(KBShilianItemUI,'ui.mobile.activity.kuangbao.KBShilianItemUI',_super);
	var __proto=KBShilianItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/kuangbao/KBShilianItem");
	}

	return KBShilianItemUI;
})(View)


//class ui.mobile.activity.kuangbao.KBShilianViewUI extends laya.ui.View
var KBShilianViewUI=(function(_super){
	function KBShilianViewUI(){
		this.tabs=null;
		this.p_list=null;
		this.timeTxt=null;
		KBShilianViewUI.__super.call(this);
	}

	__class(KBShilianViewUI,'ui.mobile.activity.kuangbao.KBShilianViewUI',_super);
	var __proto=KBShilianViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/kuangbao/KBShilianView");
	}

	return KBShilianViewUI;
})(View)


//class ui.mobile.activity.kuangbao.KBZhuanpanViewUI extends laya.ui.View
var KBZhuanpanViewUI=(function(_super){
	function KBZhuanpanViewUI(){
		this.btnStart=null;
		this.c_txt=null;
		this.c_icon=null;
		this.timeTxt=null;
		this.logTxt=null;
		this.tipBox=null;
		this.grid0=null;
		this.grid1=null;
		this.grid2=null;
		this.grid3=null;
		this.grid4=null;
		this.grid5=null;
		this.grid6=null;
		this.grid7=null;
		this.grid8=null;
		this.grid9=null;
		this.grid10=null;
		this.grid11=null;
		this.g_select=null;
		this.yichouqu0=null;
		this.yichouqu1=null;
		this.yichouqu2=null;
		this.yichouqu3=null;
		this.yichouqu4=null;
		this.yichouqu5=null;
		this.yichouqu6=null;
		this.yichouqu7=null;
		this.yichouqu8=null;
		this.yichouqu9=null;
		this.yichouqu10=null;
		this.yichouqu11=null;
		KBZhuanpanViewUI.__super.call(this);
	}

	__class(KBZhuanpanViewUI,'ui.mobile.activity.kuangbao.KBZhuanpanViewUI',_super);
	var __proto=KBZhuanpanViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/kuangbao/KBZhuanpanView");
	}

	return KBZhuanpanViewUI;
})(View)


//class ui.mobile.activity.lianyuAct.item.LianyuActLeichongItemUI extends laya.ui.View
var LianyuActLeichongItemUI=(function(_super){
	function LianyuActLeichongItemUI(){
		this.bg=null;
		this.expBar=null;
		this.exp_txt=null;
		this.info_txt=null;
		this.item_box=null;
		this.btn=null;
		this.getted=null;
		LianyuActLeichongItemUI.__super.call(this);
	}

	__class(LianyuActLeichongItemUI,'ui.mobile.activity.lianyuAct.item.LianyuActLeichongItemUI',_super);
	var __proto=LianyuActLeichongItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/lianyuAct/item/LianyuActLeichongItem");
	}

	return LianyuActLeichongItemUI;
})(View)


//class ui.mobile.activity.lianyuAct.item.LianyuActRankItemUI extends laya.ui.View
var LianyuActRankItemUI=(function(_super){
	function LianyuActRankItemUI(){
		this.bg=null;
		this.ranking=null;
		this.name_txt=null;
		this.guild_txt=null;
		this.cost_num=null;
		LianyuActRankItemUI.__super.call(this);
	}

	__class(LianyuActRankItemUI,'ui.mobile.activity.lianyuAct.item.LianyuActRankItemUI',_super);
	var __proto=LianyuActRankItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/lianyuAct/item/LianyuActRankItem");
	}

	return LianyuActRankItemUI;
})(View)


//class ui.mobile.activity.lianyuAct.item.LianyuActTaskDownItemUI extends laya.ui.View
var LianyuActTaskDownItemUI=(function(_super){
	function LianyuActTaskDownItemUI(){
		this.btn=null;
		LianyuActTaskDownItemUI.__super.call(this);
	}

	__class(LianyuActTaskDownItemUI,'ui.mobile.activity.lianyuAct.item.LianyuActTaskDownItemUI',_super);
	var __proto=LianyuActTaskDownItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/lianyuAct/item/LianyuActTaskDownItem");
	}

	return LianyuActTaskDownItemUI;
})(View)


//class ui.mobile.activity.lianyuAct.item.LianyuActTaskTopItemUI extends laya.ui.View
var LianyuActTaskTopItemUI=(function(_super){
	function LianyuActTaskTopItemUI(){
		this.bg=null;
		this.name_txt=null;
		this.item_box=null;
		this.btn=null;
		this.getted=null;
		LianyuActTaskTopItemUI.__super.call(this);
	}

	__class(LianyuActTaskTopItemUI,'ui.mobile.activity.lianyuAct.item.LianyuActTaskTopItemUI',_super);
	var __proto=LianyuActTaskTopItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/lianyuAct/item/LianyuActTaskTopItem");
	}

	return LianyuActTaskTopItemUI;
})(View)


//class ui.mobile.activity.lianyuAct.LianyuActRewardItemUI extends laya.ui.View
var LianyuActRewardItemUI=(function(_super){
	function LianyuActRewardItemUI(){
		this.cost_txt=null;
		this.item_box=null;
		this.btn=null;
		this.getted=null;
		this.desc_txt=null;
		LianyuActRewardItemUI.__super.call(this);
	}

	__class(LianyuActRewardItemUI,'ui.mobile.activity.lianyuAct.LianyuActRewardItemUI',_super);
	var __proto=LianyuActRewardItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/lianyuAct/LianyuActRewardItem");
	}

	return LianyuActRewardItemUI;
})(View)


//class ui.mobile.activity.lianyuAct.LianyuActShowRankItemUI extends laya.ui.View
var LianyuActShowRankItemUI=(function(_super){
	function LianyuActShowRankItemUI(){
		this.imgRank=null;
		this.guild_txt=null;
		this.rank_txt=null;
		this.item_box=null;
		LianyuActShowRankItemUI.__super.call(this);
	}

	__class(LianyuActShowRankItemUI,'ui.mobile.activity.lianyuAct.LianyuActShowRankItemUI',_super);
	var __proto=LianyuActShowRankItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/lianyuAct/LianyuActShowRankItem");
	}

	return LianyuActShowRankItemUI;
})(View)


//class ui.mobile.activity.lianyuAct.view.LianyuActBaokuViewUI extends laya.ui.View
var LianyuActBaokuViewUI=(function(_super){
	function LianyuActBaokuViewUI(){
		this.timeTxt=null;
		this.rizhi_btn=null;
		this.eff_box=null;
		this.item_box=null;
		this.item0=null;
		this.item1=null;
		this.item2=null;
		this.item3=null;
		this.item4=null;
		this.item5=null;
		this.item6=null;
		this.item7=null;
		this.item8=null;
		this.item9=null;
		this.item10=null;
		this.item11=null;
		this.item12=null;
		this.item13=null;
		this.item14=null;
		this.item15=null;
		this.item16=null;
		this.item17=null;
		this.one_box=null;
		this.btn1=null;
		this.moneyIcon0=null;
		this.moneyNum0=null;
		this.itemIcon0=null;
		this.itemNum0=null;
		this.ten_box=null;
		this.btn10=null;
		this.moneyIcon1=null;
		this.moneyNum1=null;
		this.itemIcon1=null;
		this.itemNum1=null;
		this.tipNode=null;
		LianyuActBaokuViewUI.__super.call(this);
	}

	__class(LianyuActBaokuViewUI,'ui.mobile.activity.lianyuAct.view.LianyuActBaokuViewUI',_super);
	var __proto=LianyuActBaokuViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/lianyuAct/view/LianyuActBaokuView");
	}

	return LianyuActBaokuViewUI;
})(View)


//class ui.mobile.activity.lianyuAct.view.LianyuActLeichongViewUI extends laya.ui.View
var LianyuActLeichongViewUI=(function(_super){
	function LianyuActLeichongViewUI(){
		this.time_txt=null;
		this.b_list=null;
		this.info_txt=null;
		LianyuActLeichongViewUI.__super.call(this);
	}

	__class(LianyuActLeichongViewUI,'ui.mobile.activity.lianyuAct.view.LianyuActLeichongViewUI',_super);
	var __proto=LianyuActLeichongViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/lianyuAct/view/LianyuActLeichongView");
	}

	return LianyuActLeichongViewUI;
})(View)


//class ui.mobile.activity.lianyuAct.view.LianyuActRankViewUI extends laya.ui.View
var LianyuActRankViewUI=(function(_super){
	function LianyuActRankViewUI(){
		this.time_txt=null;
		this.list_box=null;
		this.ma_num=null;
		this.my_use=null;
		this.desc_txt=null;
		this.reward_icon=null;
		this.rank_icon=null;
		this.eff_box=null;
		this.avatarNode2=null;
		this.avatarNode1=null;
		this.avatarNode0=null;
		this.rank0=null;
		this.name_txt0=null;
		this.cost_txt0=null;
		this.rank1=null;
		this.name_txt1=null;
		this.cost_txt1=null;
		this.rank2=null;
		this.name_txt2=null;
		this.cost_txt2=null;
		this.tipNode=null;
		LianyuActRankViewUI.__super.call(this);
	}

	__class(LianyuActRankViewUI,'ui.mobile.activity.lianyuAct.view.LianyuActRankViewUI',_super);
	var __proto=LianyuActRankViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/lianyuAct/view/LianyuActRankView");
	}

	return LianyuActRankViewUI;
})(View)


//class ui.mobile.activity.lianyuAct.view.LianyuActTaskViewUI extends laya.ui.View
var LianyuActTaskViewUI=(function(_super){
	function LianyuActTaskViewUI(){
		this.time_txt=null;
		this.t_list=null;
		this.b_list=null;
		this.item_box=null;
		this.btn=null;
		this.getted=null;
		this.info_txt=null;
		LianyuActTaskViewUI.__super.call(this);
	}

	__class(LianyuActTaskViewUI,'ui.mobile.activity.lianyuAct.view.LianyuActTaskViewUI',_super);
	var __proto=LianyuActTaskViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/lianyuAct/view/LianyuActTaskView");
	}

	return LianyuActTaskViewUI;
})(View)


//class ui.mobile.activity.lingshouAct.LingshouActDabiaoItemUI extends laya.ui.View
var LingshouActDabiaoItemUI=(function(_super){
	function LingshouActDabiaoItemUI(){
		this.bg=null;
		this.name_img=null;
		this.num_img=null;
		this.jie=null;
		this.info_txt=null;
		this.getted=null;
		this.red_img=null;
		LingshouActDabiaoItemUI.__super.call(this);
	}

	__class(LingshouActDabiaoItemUI,'ui.mobile.activity.lingshouAct.LingshouActDabiaoItemUI',_super);
	var __proto=LingshouActDabiaoItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/lingshouAct/LingshouActDabiaoItem");
	}

	return LingshouActDabiaoItemUI;
})(View)


//class ui.mobile.activity.lingshouAct.LingshouActDabiaoViewUI extends laya.ui.View
var LingshouActDabiaoViewUI=(function(_super){
	function LingshouActDabiaoViewUI(){
		this.timeTxt=null;
		this.info_txt=null;
		this.item_box=null;
		this.btn=null;
		this.getted=null;
		this.eff=null;
		this.list_box=null;
		LingshouActDabiaoViewUI.__super.call(this);
	}

	__class(LingshouActDabiaoViewUI,'ui.mobile.activity.lingshouAct.LingshouActDabiaoViewUI',_super);
	var __proto=LingshouActDabiaoViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/lingshouAct/LingshouActDabiaoView");
	}

	return LingshouActDabiaoViewUI;
})(View)


//class ui.mobile.activity.lingshouAct.LingshouActTehuiViewUI extends laya.ui.View
var LingshouActTehuiViewUI=(function(_super){
	function LingshouActTehuiViewUI(){
		this.timeTxt=null;
		this.tip_img=null;
		this.item_box=null;
		this.desc_txt=null;
		this.btn=null;
		this.getted=null;
		this.item_box2=null;
		this.cost_box=null;
		this.old_box=null;
		this.old_icon=null;
		this.old_price=null;
		this.new_icon=null;
		this.new_price=null;
		this.eff_box=null;
		LingshouActTehuiViewUI.__super.call(this);
	}

	__class(LingshouActTehuiViewUI,'ui.mobile.activity.lingshouAct.LingshouActTehuiViewUI',_super);
	var __proto=LingshouActTehuiViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/lingshouAct/LingshouActTehuiView");
	}

	return LingshouActTehuiViewUI;
})(View)


//class ui.mobile.activity.mibaoAct.item.MiBaoActTaskItemUI extends laya.ui.View
var MiBaoActTaskItemUI=(function(_super){
	function MiBaoActTaskItemUI(){
		this.bg=null;
		this.infoTxt=null;
		this.btn=null;
		this.yilingqu=null;
		MiBaoActTaskItemUI.__super.call(this);
	}

	__class(MiBaoActTaskItemUI,'ui.mobile.activity.mibaoAct.item.MiBaoActTaskItemUI',_super);
	var __proto=MiBaoActTaskItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/mibaoAct/item/MiBaoActTaskItem");
	}

	return MiBaoActTaskItemUI;
})(View)


//class ui.mobile.activity.mibaoAct.item.MiBaoActTouziItemUI extends laya.ui.View
var MiBaoActTouziItemUI=(function(_super){
	function MiBaoActTouziItemUI(){
		this.bg=null;
		this.btn=null;
		this.getted=null;
		this.desc_txt=null;
		MiBaoActTouziItemUI.__super.call(this);
	}

	__class(MiBaoActTouziItemUI,'ui.mobile.activity.mibaoAct.item.MiBaoActTouziItemUI',_super);
	var __proto=MiBaoActTouziItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/mibaoAct/item/MiBaoActTouziItem");
	}

	return MiBaoActTouziItemUI;
})(View)


//class ui.mobile.activity.mibaoAct.milu.MiluRewardTabUI extends laya.ui.View
var MiluRewardTabUI=(function(_super){
	function MiluRewardTabUI(){
		this.bg=null;
		this.name_txt=null;
		MiluRewardTabUI.__super.call(this);
	}

	__class(MiluRewardTabUI,'ui.mobile.activity.mibaoAct.milu.MiluRewardTabUI',_super);
	var __proto=MiluRewardTabUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/mibaoAct/milu/MiluRewardTab");
	}

	return MiluRewardTabUI;
})(View)


//class ui.mobile.activity.mibaoAct.milu.MiluRewardItemUI extends laya.ui.View
var MiluRewardItemUI=(function(_super){
	function MiluRewardItemUI(){
		this.bg=null;
		this.count_txt=null;
		this.name_txt=null;
		this.lock_box=null;
		this.open_txt=null;
		MiluRewardItemUI.__super.call(this);
	}

	__class(MiluRewardItemUI,'ui.mobile.activity.mibaoAct.milu.MiluRewardItemUI',_super);
	var __proto=MiluRewardItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/mibaoAct/milu/MiluRewardItem");
	}

	return MiluRewardItemUI;
})(View)


//class ui.mobile.activity.mibaoAct.milu.MiluViewUI extends laya.ui.View
var MiluViewUI=(function(_super){
	function MiluViewUI(){
		this.grid_box=null;
		this.add_btn=null;
		this.select_btn=null;
		this.time_txt=null;
		this.cost_txt1=null;
		this.cost_txt2=null;
		this.skip_btn=null;
		this.help_img=null;
		this.cost_icon1=null;
		this.cost_icon2=null;
		this.btn=null;
		MiluViewUI.__super.call(this);
	}

	__class(MiluViewUI,'ui.mobile.activity.mibaoAct.milu.MiluViewUI',_super);
	var __proto=MiluViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/mibaoAct/milu/MiluView");
	}

	return MiluViewUI;
})(View)


//class ui.mobile.activity.mibaoAct.view.MiBaoActTaskViewUI extends laya.ui.View
var MiBaoActTaskViewUI=(function(_super){
	function MiBaoActTaskViewUI(){
		this.list_box=null;
		this.tabs=null;
		this.p_list=null;
		this.timeTxt=null;
		this.item_box=null;
		this.btn=null;
		this.getted=null;
		this.pro_txt=null;
		MiBaoActTaskViewUI.__super.call(this);
	}

	__class(MiBaoActTaskViewUI,'ui.mobile.activity.mibaoAct.view.MiBaoActTaskViewUI',_super);
	var __proto=MiBaoActTaskViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/mibaoAct/view/MiBaoActTaskView");
	}

	return MiBaoActTaskViewUI;
})(View)


//class ui.mobile.activity.mibaoAct.view.MiBaoActTouziViewUI extends laya.ui.View
var MiBaoActTouziViewUI=(function(_super){
	function MiBaoActTouziViewUI(){
		this.tabs=null;
		this.p_list=null;
		this.timeTxt=null;
		this.btn=null;
		this.yigoumai=null;
		MiBaoActTouziViewUI.__super.call(this);
	}

	__class(MiBaoActTouziViewUI,'ui.mobile.activity.mibaoAct.view.MiBaoActTouziViewUI',_super);
	var __proto=MiBaoActTouziViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/mibaoAct/view/MiBaoActTouziView");
	}

	return MiBaoActTouziViewUI;
})(View)


//class ui.mobile.activity.qingdian.item.QingdianPanItemUI extends laya.ui.View
var QingdianPanItemUI=(function(_super){
	function QingdianPanItemUI(){
		this.line=null;
		this.btn=null;
		this.getted=null;
		this.infoTxt=null;
		this.numTxt=null;
		QingdianPanItemUI.__super.call(this);
	}

	__class(QingdianPanItemUI,'ui.mobile.activity.qingdian.item.QingdianPanItemUI',_super);
	var __proto=QingdianPanItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qingdian/item/QingdianPanItem");
	}

	return QingdianPanItemUI;
})(View)


//class ui.mobile.activity.qingdian.item.QingdianShopItemUI extends laya.ui.View
var QingdianShopItemUI=(function(_super){
	function QingdianShopItemUI(){
		this.bg=null;
		this.nameTxt=null;
		this.numTxt=null;
		this.priceTxt=null;
		this.btn=null;
		this.getted=null;
		this.moneyUrl=null;
		this.descSp=null;
		this.descImg=null;
		this.descTxt=null;
		QingdianShopItemUI.__super.call(this);
	}

	__class(QingdianShopItemUI,'ui.mobile.activity.qingdian.item.QingdianShopItemUI',_super);
	var __proto=QingdianShopItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qingdian/item/QingdianShopItem");
	}

	return QingdianShopItemUI;
})(View)


//class ui.mobile.activity.qingdian.item.QingdianZangzuItemUI extends laya.ui.View
var QingdianZangzuItemUI=(function(_super){
	function QingdianZangzuItemUI(){
		this.bg=null;
		this.numTxt=null;
		this.descImg=null;
		this.btn=null;
		this.getted=null;
		QingdianZangzuItemUI.__super.call(this);
	}

	__class(QingdianZangzuItemUI,'ui.mobile.activity.qingdian.item.QingdianZangzuItemUI',_super);
	var __proto=QingdianZangzuItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qingdian/item/QingdianZangzuItem");
	}

	return QingdianZangzuItemUI;
})(View)


//class ui.mobile.activity.qingdian.view.QingdianDajingViewUI extends laya.ui.View
var QingdianDajingViewUI=(function(_super){
	function QingdianDajingViewUI(){
		this.timeTxt=null;
		this.btn=null;
		QingdianDajingViewUI.__super.call(this);
	}

	__class(QingdianDajingViewUI,'ui.mobile.activity.qingdian.view.QingdianDajingViewUI',_super);
	var __proto=QingdianDajingViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qingdian/view/QingdianDajingView");
	}

	return QingdianDajingViewUI;
})(View)


//class ui.mobile.activity.qingdian.view.QingdianFudaiViewUI extends laya.ui.View
var QingdianFudaiViewUI=(function(_super){
	function QingdianFudaiViewUI(){
		this.timeTxt=null;
		this.btn=null;
		QingdianFudaiViewUI.__super.call(this);
	}

	__class(QingdianFudaiViewUI,'ui.mobile.activity.qingdian.view.QingdianFudaiViewUI',_super);
	var __proto=QingdianFudaiViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qingdian/view/QingdianFudaiView");
	}

	return QingdianFudaiViewUI;
})(View)


//class ui.mobile.activity.qingdian.view.QingdianHongzuanViewUI extends laya.ui.View
var QingdianHongzuanViewUI=(function(_super){
	function QingdianHongzuanViewUI(){
		this.input=null;
		this.btn=null;
		this.getted=null;
		this.cardImg0=null;
		this.cardImg1=null;
		this.cardImg2=null;
		this.timeDhTxt=null;
		this.timeTxt=null;
		this.bgHz=null;
		this.btnHongzuan=null;
		this.hzImg=null;
		this.moneySp=null;
		this.moneyUrl=null;
		this.numTxt=null;
		QingdianHongzuanViewUI.__super.call(this);
	}

	__class(QingdianHongzuanViewUI,'ui.mobile.activity.qingdian.view.QingdianHongzuanViewUI',_super);
	var __proto=QingdianHongzuanViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qingdian/view/QingdianHongzuanView");
	}

	return QingdianHongzuanViewUI;
})(View)


//class ui.mobile.activity.qingdian.view.QingdianPanViewUI extends laya.ui.View
var QingdianPanViewUI=(function(_super){
	function QingdianPanViewUI(){
		this.grid0=null;
		this.grid1=null;
		this.grid2=null;
		this.grid3=null;
		this.grid4=null;
		this.grid5=null;
		this.grid6=null;
		this.grid7=null;
		this.grid8=null;
		this.grid9=null;
		this.grid10=null;
		this.grid11=null;
		this.grid12=null;
		this.grid13=null;
		this.g_select=null;
		this.yichouqu0=null;
		this.yichouqu1=null;
		this.yichouqu2=null;
		this.yichouqu3=null;
		this.yichouqu4=null;
		this.yichouqu5=null;
		this.yichouqu6=null;
		this.yichouqu7=null;
		this.yichouqu8=null;
		this.yichouqu9=null;
		this.yichouqu10=null;
		this.yichouqu11=null;
		this.yichouqu12=null;
		this.yichouqu13=null;
		this.list=null;
		this.btnStart=null;
		this.c_txt=null;
		this.c_icon=null;
		this.timeTxt=null;
		QingdianPanViewUI.__super.call(this);
	}

	__class(QingdianPanViewUI,'ui.mobile.activity.qingdian.view.QingdianPanViewUI',_super);
	var __proto=QingdianPanViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qingdian/view/QingdianPanView");
	}

	return QingdianPanViewUI;
})(View)


//class ui.mobile.activity.qingdian.view.QingdianShopViewUI extends laya.ui.View
var QingdianShopViewUI=(function(_super){
	function QingdianShopViewUI(){
		this.list=null;
		this.moneyUrl=null;
		this.timeTxt=null;
		this.descTxt=null;
		this.numTxt=null;
		this.tabBtn=null;
		this.btn=null;
		QingdianShopViewUI.__super.call(this);
	}

	__class(QingdianShopViewUI,'ui.mobile.activity.qingdian.view.QingdianShopViewUI',_super);
	var __proto=QingdianShopViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qingdian/view/QingdianShopView");
	}

	return QingdianShopViewUI;
})(View)


//class ui.mobile.activity.qingdian.view.QingdianZangzuViewUI extends laya.ui.View
var QingdianZangzuViewUI=(function(_super){
	function QingdianZangzuViewUI(){
		this.timeTxt=null;
		this.list=null;
		this.btn=null;
		this.tabBtn=null;
		QingdianZangzuViewUI.__super.call(this);
	}

	__class(QingdianZangzuViewUI,'ui.mobile.activity.qingdian.view.QingdianZangzuViewUI',_super);
	var __proto=QingdianZangzuViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qingdian/view/QingdianZangzuView");
	}

	return QingdianZangzuViewUI;
})(View)


//class ui.mobile.activity.qixiAct.item.QixiActFanliItemUI extends laya.ui.View
var QixiActFanliItemUI=(function(_super){
	function QixiActFanliItemUI(){
		this.bg=null;
		this.btnBuy=null;
		this.yibuy=null;
		this.beishu=null;
		this.item_img=null;
		this.num_box=null;
		this.num0_img=null;
		this.num0_txt=null;
		this.img_up=null;
		this.num1_img=null;
		this.num1_txt=null;
		QixiActFanliItemUI.__super.call(this);
	}

	__class(QixiActFanliItemUI,'ui.mobile.activity.qixiAct.item.QixiActFanliItemUI',_super);
	var __proto=QixiActFanliItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qixiAct/item/QixiActFanliItem");
	}

	return QixiActFanliItemUI;
})(View)


//class ui.mobile.activity.qixiAct.item.QixiActHaoliItemUI extends laya.ui.View
var QixiActHaoliItemUI=(function(_super){
	function QixiActHaoliItemUI(){
		this.bg=null;
		this.btnBuy=null;
		this.limit_box=null;
		this.limit_img=null;
		this.limit_txt=null;
		this.yibuy=null;
		this.item_box=null;
		this.tip_box0=null;
		this.tip_img0=null;
		this.tip_txt0=null;
		this.tip_box1=null;
		this.tip_img1=null;
		this.tip_txt1=null;
		QixiActHaoliItemUI.__super.call(this);
	}

	__class(QixiActHaoliItemUI,'ui.mobile.activity.qixiAct.item.QixiActHaoliItemUI',_super);
	var __proto=QixiActHaoliItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qixiAct/item/QixiActHaoliItem");
	}

	return QixiActHaoliItemUI;
})(View)


//class ui.mobile.activity.qixiAct.item.QixiActDayItemUI extends laya.ui.View
var QixiActDayItemUI=(function(_super){
	function QixiActDayItemUI(){
		this.bg=null;
		this.title=null;
		this.btnBuy=null;
		this.limitTxt=null;
		this.yibuy=null;
		this.o_txt=null;
		this.o_txt1=null;
		this.o_icon=null;
		this.o_line=null;
		this.n_txt=null;
		this.n_txt1=null;
		this.n_icon=null;
		this.n_line=null;
		this.item_box=null;
		this.info_txt=null;
		QixiActDayItemUI.__super.call(this);
	}

	__class(QixiActDayItemUI,'ui.mobile.activity.qixiAct.item.QixiActDayItemUI',_super);
	var __proto=QixiActDayItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qixiAct/item/QixiActDayItem");
	}

	return QixiActDayItemUI;
})(View)


//class ui.mobile.activity.qixiAct.item.QixiActShopItemUI extends laya.ui.View
var QixiActShopItemUI=(function(_super){
	function QixiActShopItemUI(){
		this.bg=null;
		this.name_txt=null;
		this.limit=null;
		this.moneyIcon=null;
		this.moneyNum=null;
		this.item_box=null;
		this.mask_img=null;
		this.info_txt=null;
		this.getted=null;
		QixiActShopItemUI.__super.call(this);
	}

	__class(QixiActShopItemUI,'ui.mobile.activity.qixiAct.item.QixiActShopItemUI',_super);
	var __proto=QixiActShopItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qixiAct/item/QixiActShopItem");
	}

	return QixiActShopItemUI;
})(View)


//class ui.mobile.activity.qixiAct.view.QixiActFanliViewUI extends laya.ui.View
var QixiActFanliViewUI=(function(_super){
	function QixiActFanliViewUI(){
		this.p_list=null;
		this.timeTxt=null;
		QixiActFanliViewUI.__super.call(this);
	}

	__class(QixiActFanliViewUI,'ui.mobile.activity.qixiAct.view.QixiActFanliViewUI',_super);
	var __proto=QixiActFanliViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qixiAct/view/QixiActFanliView");
	}

	return QixiActFanliViewUI;
})(View)


//class ui.mobile.activity.qixiAct.view.QixiActHaoliViewUI extends laya.ui.View
var QixiActHaoliViewUI=(function(_super){
	function QixiActHaoliViewUI(){
		this.p_list=null;
		this.timeTxt=null;
		this.chongzhi_txt=null;
		this.xiaofei_txt=null;
		QixiActHaoliViewUI.__super.call(this);
	}

	__class(QixiActHaoliViewUI,'ui.mobile.activity.qixiAct.view.QixiActHaoliViewUI',_super);
	var __proto=QixiActHaoliViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qixiAct/view/QixiActHaoliView");
	}

	return QixiActHaoliViewUI;
})(View)


//class ui.mobile.activity.qixiAct.view.QixiActKHViewUI extends laya.ui.View
var QixiActKHViewUI=(function(_super){
	function QixiActKHViewUI(){
		this.item0=null;
		this.item1=null;
		this.img1=null;
		this.item2=null;
		this.img2=null;
		this.item3=null;
		this.img3=null;
		this.timeTxt=null;
		QixiActKHViewUI.__super.call(this);
	}

	__class(QixiActKHViewUI,'ui.mobile.activity.qixiAct.view.QixiActKHViewUI',_super);
	var __proto=QixiActKHViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qixiAct/view/QixiActKHView");
	}

	return QixiActKHViewUI;
})(View)


//class ui.mobile.activity.zhanqu.view.ZhanquShopViewUI extends laya.ui.View
var ZhanquShopViewUI=(function(_super){
	function ZhanquShopViewUI(){
		this.p_list=null;
		this.time_txt=null;
		this.goto_btn=null;
		this.moneyNum=null;
		this.moneyIcon=null;
		this.skill_box=null;
		this.skill_bg=null;
		this.icon_img=null;
		this.goto_skill=null;
		ZhanquShopViewUI.__super.call(this);
	}

	__class(ZhanquShopViewUI,'ui.mobile.activity.zhanqu.view.ZhanquShopViewUI',_super);
	var __proto=ZhanquShopViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/zhanqu/view/ZhanquShopView");
	}

	return ZhanquShopViewUI;
})(View)


//class ui.mobile.activity.qixiAct.view.QixiActZhuanpanViewUI extends laya.ui.View
var QixiActZhuanpanViewUI=(function(_super){
	function QixiActZhuanpanViewUI(){
		this.timeTxt=null;
		this.rizhi_btn=null;
		this.item_box=null;
		this.item0=null;
		this.item1=null;
		this.reward0=null;
		this.item2=null;
		this.reward1=null;
		this.item3=null;
		this.reward2=null;
		this.item4=null;
		this.item5=null;
		this.reward3=null;
		this.item6=null;
		this.reward4=null;
		this.item7=null;
		this.reward5=null;
		this.item8=null;
		this.item9=null;
		this.reward6=null;
		this.item10=null;
		this.reward7=null;
		this.item11=null;
		this.reward8=null;
		this.item12=null;
		this.item13=null;
		this.reward9=null;
		this.item14=null;
		this.reward10=null;
		this.item15=null;
		this.reward11=null;
		this.one_box=null;
		this.pointer1=null;
		this.startBtn=null;
		this.moneyIcon0=null;
		this.moneyNum0=null;
		this.itemIcon0=null;
		this.itemNum0=null;
		this.select_ten=null;
		this.skip_box=null;
		this.money_box=null;
		this.num_box=null;
		this.desc_img=null;
		this.money_num=null;
		this.tipNode=null;
		QixiActZhuanpanViewUI.__super.call(this);
	}

	__class(QixiActZhuanpanViewUI,'ui.mobile.activity.qixiAct.view.QixiActZhuanpanViewUI',_super);
	var __proto=QixiActZhuanpanViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qixiAct/view/QixiActZhuanpanView");
	}

	return QixiActZhuanpanViewUI;
})(View)


//class ui.mobile.activity.qiyuAct.item.QiyuActDayItemUI extends laya.ui.View
var QiyuActDayItemUI=(function(_super){
	function QiyuActDayItemUI(){
		this.bg=null;
		this.btn=null;
		this.getted=null;
		this.desc_txt=null;
		this.item_box=null;
		QiyuActDayItemUI.__super.call(this);
	}

	__class(QiyuActDayItemUI,'ui.mobile.activity.qiyuAct.item.QiyuActDayItemUI',_super);
	var __proto=QiyuActDayItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qiyuAct/item/QiyuActDayItem");
	}

	return QiyuActDayItemUI;
})(View)


//class ui.mobile.activity.qiyuAct.item.QiyuActTouziItemUI extends laya.ui.View
var QiyuActTouziItemUI=(function(_super){
	function QiyuActTouziItemUI(){
		this.bg=null;
		this.name_txt=null;
		this.item_box=null;
		this.desc_txt=null;
		this.btn=null;
		this.getted=null;
		QiyuActTouziItemUI.__super.call(this);
	}

	__class(QiyuActTouziItemUI,'ui.mobile.activity.qiyuAct.item.QiyuActTouziItemUI',_super);
	var __proto=QiyuActTouziItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qiyuAct/item/QiyuActTouziItem");
	}

	return QiyuActTouziItemUI;
})(View)


//class ui.mobile.activity.qiyuAct.view.QiyuActDayViewUI extends laya.ui.View
var QiyuActDayViewUI=(function(_super){
	function QiyuActDayViewUI(){
		this.tabs=null;
		this.p_list=null;
		this.timeTxt=null;
		this.desc_img=null;
		this.eff_box=null;
		this.item_box=null;
		this.btn=null;
		this.getted=null;
		this.info_txt=null;
		this.chongzhi_txt=null;
		QiyuActDayViewUI.__super.call(this);
	}

	__class(QiyuActDayViewUI,'ui.mobile.activity.qiyuAct.view.QiyuActDayViewUI',_super);
	var __proto=QiyuActDayViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qiyuAct/view/QiyuActDayView");
	}

	return QiyuActDayViewUI;
})(View)


//class ui.mobile.activity.qiyuAct.view.QiyuActTouziViewUI extends laya.ui.View
var QiyuActTouziViewUI=(function(_super){
	function QiyuActTouziViewUI(){
		this.tabs=null;
		this.p_list=null;
		this.timeTxt=null;
		this.btn=null;
		this.yigoumai=null;
		QiyuActTouziViewUI.__super.call(this);
	}

	__class(QiyuActTouziViewUI,'ui.mobile.activity.qiyuAct.view.QiyuActTouziViewUI',_super);
	var __proto=QiyuActTouziViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qiyuAct/view/QiyuActTouziView");
	}

	return QiyuActTouziViewUI;
})(View)


//class ui.mobile.activity.SevenFengshen.FengshenRewardItemUI extends laya.ui.View
var FengshenRewardItemUI=(function(_super){
	function FengshenRewardItemUI(){
		this.pro_txt=null;
		this.g_txt=null;
		this.title=null;
		this.btn=null;
		this.getted=null;
		FengshenRewardItemUI.__super.call(this);
	}

	__class(FengshenRewardItemUI,'ui.mobile.activity.SevenFengshen.FengshenRewardItemUI',_super);
	var __proto=FengshenRewardItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/SevenFengshen/FengshenRewardItem");
	}

	return FengshenRewardItemUI;
})(View)


//class ui.mobile.activity.SevenFengshen.FengshenRItemUI extends laya.ui.View
var FengshenRItemUI=(function(_super){
	function FengshenRItemUI(){
		this.nameTxt=null;
		this.priceTxt=null;
		this.priceIcon=null;
		this.btn=null;
		this.limitTxt=null;
		this.yibuy=null;
		FengshenRItemUI.__super.call(this);
	}

	__class(FengshenRItemUI,'ui.mobile.activity.SevenFengshen.FengshenRItemUI',_super);
	var __proto=FengshenRItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/SevenFengshen/FengshenRItem");
	}

	return FengshenRItemUI;
})(View)


//class ui.mobile.activity.SevenFengshen.FengshenTaskItemUI extends laya.ui.View
var FengshenTaskItemUI=(function(_super){
	function FengshenTaskItemUI(){
		this.bg=null;
		this.btn=null;
		this.pro_txt=null;
		this.timeTxt=null;
		this.g_txt=null;
		this.getted=null;
		this.stateImg=null;
		this.open=null;
		FengshenTaskItemUI.__super.call(this);
	}

	__class(FengshenTaskItemUI,'ui.mobile.activity.SevenFengshen.FengshenTaskItemUI',_super);
	var __proto=FengshenTaskItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/SevenFengshen/FengshenTaskItem");
	}

	return FengshenTaskItemUI;
})(View)


//class ui.mobile.activity.shabake.SbkBimaiItemUI extends laya.ui.View
var SbkBimaiItemUI=(function(_super){
	function SbkBimaiItemUI(){
		this.bg=null;
		this.nameimg=null;
		this.btnBuy=null;
		this.yibuy=null;
		SbkBimaiItemUI.__super.call(this);
	}

	__class(SbkBimaiItemUI,'ui.mobile.activity.shabake.SbkBimaiItemUI',_super);
	var __proto=SbkBimaiItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/shabake/SbkBimaiItem");
	}

	return SbkBimaiItemUI;
})(View)


//class ui.mobile.activity.shouchong.ShouchongQipaoUI extends laya.ui.View
var ShouchongQipaoUI=(function(_super){
	function ShouchongQipaoUI(){
		this.bg2=null;
		this.bg1=null;
		this.timeTxt=null;
		this.imgFont=null;
		ShouchongQipaoUI.__super.call(this);
	}

	__class(ShouchongQipaoUI,'ui.mobile.activity.shouchong.ShouchongQipaoUI',_super);
	var __proto=ShouchongQipaoUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/shouchong/ShouchongQipao");
	}

	return ShouchongQipaoUI;
})(View)


//class ui.mobile.activity.tanbao_cs.TanbaoCSViewUI extends laya.ui.View
var TanbaoCSViewUI=(function(_super){
	function TanbaoCSViewUI(){
		this.grid3=null;
		this.grid1=null;
		this.grid0=null;
		this.grid2=null;
		this.grid4=null;
		this.grid6=null;
		this.grid8=null;
		this.grid10=null;
		this.grid5=null;
		this.grid7=null;
		this.grid9=null;
		this.grid11=null;
		this.btnOne=null;
		this.btnTen=null;
		this.btnBC=null;
		this.btnCK=null;
		this.btnLog=null;
		this.o_txt0=null;
		this.o_icon0=null;
		this.o_txt1=null;
		this.o_icon1=null;
		this.t_txt0=null;
		this.t_icon0=null;
		this.t_txt1=null;
		this.t_icon1=null;
		this.timeTxt=null;
		this.tipBox=null;
		this.cishuTxt=null;
		TanbaoCSViewUI.__super.call(this);
	}

	__class(TanbaoCSViewUI,'ui.mobile.activity.tanbao_cs.TanbaoCSViewUI',_super);
	var __proto=TanbaoCSViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/tanbao_cs/TanbaoCSView");
	}

	return TanbaoCSViewUI;
})(View)


//class ui.mobile.activity.tanbao_cs.TanbaoDabiaoCSViewUI extends laya.ui.View
var TanbaoDabiaoCSViewUI=(function(_super){
	function TanbaoDabiaoCSViewUI(){
		this.p_list=null;
		this.timeTxt=null;
		this.totalTxt=null;
		TanbaoDabiaoCSViewUI.__super.call(this);
	}

	__class(TanbaoDabiaoCSViewUI,'ui.mobile.activity.tanbao_cs.TanbaoDabiaoCSViewUI',_super);
	var __proto=TanbaoDabiaoCSViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/tanbao_cs/TanbaoDabiaoCSView");
	}

	return TanbaoDabiaoCSViewUI;
})(View)


//class ui.mobile.activity.tanbao_cs.TequanBCViewUI extends laya.ui.View
var TequanBCViewUI=(function(_super){
	function TequanBCViewUI(){
		this.cishuTxt=null;
		this.btnGo=null;
		this.timeTxt=null;
		TequanBCViewUI.__super.call(this);
	}

	__class(TequanBCViewUI,'ui.mobile.activity.tanbao_cs.TequanBCViewUI',_super);
	var __proto=TequanBCViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/tanbao_cs/TequanBCView");
	}

	return TequanBCViewUI;
})(View)


//class ui.mobile.activity.tanbao_cs.TouziCSItemUI extends laya.ui.View
var TouziCSItemUI=(function(_super){
	function TouziCSItemUI(){
		this.title=null;
		this.btn=null;
		this.yilingqu=null;
		TouziCSItemUI.__super.call(this);
	}

	__class(TouziCSItemUI,'ui.mobile.activity.tanbao_cs.TouziCSItemUI',_super);
	var __proto=TouziCSItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/tanbao_cs/TouziCSItem");
	}

	return TouziCSItemUI;
})(View)


//class ui.mobile.activity.tanbao_cs.TouziCSViewUI extends laya.ui.View
var TouziCSViewUI=(function(_super){
	function TouziCSViewUI(){
		this.timeTxt=null;
		this.l_list=null;
		this.r_list=null;
		this.l_btn=null;
		this.l_yigoumai=null;
		this.r_btn=null;
		this.r_yigoumai=null;
		TouziCSViewUI.__super.call(this);
	}

	__class(TouziCSViewUI,'ui.mobile.activity.tanbao_cs.TouziCSViewUI',_super);
	var __proto=TouziCSViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/tanbao_cs/TouziCSView");
	}

	return TouziCSViewUI;
})(View)


//class ui.mobile.activity.wujinKH.WujinKHDayItemUI extends laya.ui.View
var WujinKHDayItemUI=(function(_super){
	function WujinKHDayItemUI(){
		this.bg=null;
		this.name=null;
		this.btnGo=null;
		this.yilingqu=null;
		this.yuan=null;
		WujinKHDayItemUI.__super.call(this);
	}

	__class(WujinKHDayItemUI,'ui.mobile.activity.wujinKH.WujinKHDayItemUI',_super);
	var __proto=WujinKHDayItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/wujinKH/WujinKHDayItem");
	}

	return WujinKHDayItemUI;
})(View)


//class ui.mobile.activity.wujinKH.WujinKHDayViewUI extends laya.ui.View
var WujinKHDayViewUI=(function(_super){
	function WujinKHDayViewUI(){
		this.p_list=null;
		this.time_txt=null;
		this.info_txt=null;
		WujinKHDayViewUI.__super.call(this);
	}

	__class(WujinKHDayViewUI,'ui.mobile.activity.wujinKH.WujinKHDayViewUI',_super);
	var __proto=WujinKHDayViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/wujinKH/WujinKHDayView");
	}

	return WujinKHDayViewUI;
})(View)


//class ui.mobile.activity.wujinKH.WujinKHLoginViewUI extends laya.ui.View
var WujinKHLoginViewUI=(function(_super){
	function WujinKHLoginViewUI(){
		this.time_txt=null;
		this.left_box=null;
		this.left_desc=null;
		this.left_item=null;
		this.left_btn=null;
		this.left_getted=null;
		this.right_box=null;
		this.right_desc=null;
		this.right_item=null;
		this.right_btn=null;
		this.right_getted=null;
		this.progress_txt=null;
		WujinKHLoginViewUI.__super.call(this);
	}

	__class(WujinKHLoginViewUI,'ui.mobile.activity.wujinKH.WujinKHLoginViewUI',_super);
	var __proto=WujinKHLoginViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/wujinKH/WujinKHLoginView");
	}

	return WujinKHLoginViewUI;
})(View)


//class ui.mobile.activity.zhanqu.item.ZhanquJuexingItemUI extends laya.ui.View
var ZhanquJuexingItemUI=(function(_super){
	function ZhanquJuexingItemUI(){
		this.bg=null;
		this.nameimg=null;
		this.item_box=null;
		this.btnBuy=null;
		this.yibuy=null;
		this.info_txt=null;
		ZhanquJuexingItemUI.__super.call(this);
	}

	__class(ZhanquJuexingItemUI,'ui.mobile.activity.zhanqu.item.ZhanquJuexingItemUI',_super);
	var __proto=ZhanquJuexingItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/zhanqu/item/ZhanquJuexingItem");
	}

	return ZhanquJuexingItemUI;
})(View)


//class ui.mobile.activity.zhanqu.item.ZhanquShopItemUI extends laya.ui.View
var ZhanquShopItemUI=(function(_super){
	function ZhanquShopItemUI(){
		this.bg=null;
		this.name_txt=null;
		this.item_box=null;
		this.limit=null;
		this.moneyIcon=null;
		this.moneyNum=null;
		this.getted=null;
		ZhanquShopItemUI.__super.call(this);
	}

	__class(ZhanquShopItemUI,'ui.mobile.activity.zhanqu.item.ZhanquShopItemUI',_super);
	var __proto=ZhanquShopItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/zhanqu/item/ZhanquShopItem");
	}

	return ZhanquShopItemUI;
})(View)


//class ui.mobile.activity.zhanqu.item.ZhanquZhigouItemUI extends laya.ui.View
var ZhanquZhigouItemUI=(function(_super){
	function ZhanquZhigouItemUI(){
		this.bg=null;
		this.icon=null;
		this.titleIcon=null;
		this.title=null;
		this.yueka=null;
		this.song=null;
		this.price=null;
		this.getted=null;
		ZhanquZhigouItemUI.__super.call(this);
	}

	__class(ZhanquZhigouItemUI,'ui.mobile.activity.zhanqu.item.ZhanquZhigouItemUI',_super);
	var __proto=ZhanquZhigouItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/zhanqu/item/ZhanquZhigouItem");
	}

	return ZhanquZhigouItemUI;
})(View)


//class ui.mobile.activity.zhanqu.RizhiItemUI extends laya.ui.View
var RizhiItemUI=(function(_super){
	function RizhiItemUI(){
		this.infoTxt=null;
		RizhiItemUI.__super.call(this);
	}

	__class(RizhiItemUI,'ui.mobile.activity.zhanqu.RizhiItemUI',_super);
	var __proto=RizhiItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/zhanqu/RizhiItem");
	}

	return RizhiItemUI;
})(View)


//class ui.mobile.activity.zhanqu.view.ZhanquBaokuViewUI extends laya.ui.View
var ZhanquBaokuViewUI=(function(_super){
	function ZhanquBaokuViewUI(){
		this.timeTxt=null;
		this.rizhi_btn=null;
		this.eff_box=null;
		this.item_box=null;
		this.item0=null;
		this.item1=null;
		this.item2=null;
		this.item3=null;
		this.item4=null;
		this.item5=null;
		this.item6=null;
		this.item7=null;
		this.item8=null;
		this.item9=null;
		this.item10=null;
		this.item11=null;
		this.item12=null;
		this.item13=null;
		this.item14=null;
		this.item15=null;
		this.item16=null;
		this.item17=null;
		this.item18=null;
		this.one_box=null;
		this.btn1=null;
		this.moneyIcon0=null;
		this.moneyNum0=null;
		this.itemIcon0=null;
		this.itemNum0=null;
		this.ten_box=null;
		this.btn10=null;
		this.moneyIcon1=null;
		this.moneyNum1=null;
		this.itemIcon1=null;
		this.itemNum1=null;
		this.tipNode=null;
		ZhanquBaokuViewUI.__super.call(this);
	}

	__class(ZhanquBaokuViewUI,'ui.mobile.activity.zhanqu.view.ZhanquBaokuViewUI',_super);
	var __proto=ZhanquBaokuViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/zhanqu/view/ZhanquBaokuView");
	}

	return ZhanquBaokuViewUI;
})(View)


//class ui.mobile.activity.zhanqu.view.ZhanquDiaoluoViewUI extends laya.ui.View
var ZhanquDiaoluoViewUI=(function(_super){
	function ZhanquDiaoluoViewUI(){
		this.btnGo=null;
		this.timeTxt=null;
		ZhanquDiaoluoViewUI.__super.call(this);
	}

	__class(ZhanquDiaoluoViewUI,'ui.mobile.activity.zhanqu.view.ZhanquDiaoluoViewUI',_super);
	var __proto=ZhanquDiaoluoViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/zhanqu/view/ZhanquDiaoluoView");
	}

	return ZhanquDiaoluoViewUI;
})(View)


//class ui.mobile.activity.zhanqu.view.ZhanquJuexingViewUI extends laya.ui.View
var ZhanquJuexingViewUI=(function(_super){
	function ZhanquJuexingViewUI(){
		this.p_list=null;
		this.time_txt=null;
		ZhanquJuexingViewUI.__super.call(this);
	}

	__class(ZhanquJuexingViewUI,'ui.mobile.activity.zhanqu.view.ZhanquJuexingViewUI',_super);
	var __proto=ZhanquJuexingViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/zhanqu/view/ZhanquJuexingView");
	}

	return ZhanquJuexingViewUI;
})(View)


//class ui.mobile.activity.zhanqu.view.ZhanquUpViewUI extends laya.ui.View
var ZhanquUpViewUI=(function(_super){
	function ZhanquUpViewUI(){
		this.timeTxt=null;
		this.item_box=null;
		this.desc_txt=null;
		this.btn=null;
		this.getted=null;
		ZhanquUpViewUI.__super.call(this);
	}

	__class(ZhanquUpViewUI,'ui.mobile.activity.zhanqu.view.ZhanquUpViewUI',_super);
	var __proto=ZhanquUpViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/zhanqu/view/ZhanquUpView");
	}

	return ZhanquUpViewUI;
})(View)


//class ui.mobile.activity.zhanqu.view.ZhanquZhigouViewUI extends laya.ui.View
var ZhanquZhigouViewUI=(function(_super){
	function ZhanquZhigouViewUI(){
		this.p_list=null;
		this.time_txt=null;
		this.info_txt=null;
		ZhanquZhigouViewUI.__super.call(this);
	}

	__class(ZhanquZhigouViewUI,'ui.mobile.activity.zhanqu.view.ZhanquZhigouViewUI',_super);
	var __proto=ZhanquZhigouViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/zhanqu/view/ZhanquZhigouView");
	}

	return ZhanquZhigouViewUI;
})(View)


//class ui.mobile.activity.zhanqu.view.ZhanquZhuanpanViewUI extends laya.ui.View
var ZhanquZhuanpanViewUI=(function(_super){
	function ZhanquZhuanpanViewUI(){
		this.timeTxt=null;
		this.times_box=null;
		this.pointer=null;
		this.pointer1=null;
		this.startBtn=null;
		this.btn=null;
		this.desc_txt=null;
		this.item_box=null;
		this.getted=null;
		ZhanquZhuanpanViewUI.__super.call(this);
	}

	__class(ZhanquZhuanpanViewUI,'ui.mobile.activity.zhanqu.view.ZhanquZhuanpanViewUI',_super);
	var __proto=ZhanquZhuanpanViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/zhanqu/view/ZhanquZhuanpanView");
	}

	return ZhanquZhuanpanViewUI;
})(View)


//class ui.mobile.activity.zhigou.LuckyZhiGouItemUI extends laya.ui.View
var LuckyZhiGouItemUI=(function(_super){
	function LuckyZhiGouItemUI(){
		this.bg=null;
		this.imgBuy=null;
		this.btn=null;
		this.zk=null;
		this.imgZk=null;
		this.name_txt=null;
		LuckyZhiGouItemUI.__super.call(this);
	}

	__class(LuckyZhiGouItemUI,'ui.mobile.activity.zhigou.LuckyZhiGouItemUI',_super);
	var __proto=LuckyZhiGouItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/zhigou/LuckyZhiGouItem");
	}

	return LuckyZhiGouItemUI;
})(View)


//class ui.mobile.activity_xcq.leichong.HuoDongWindowUI extends laya.ui.View
var HuoDongWindowUI=(function(_super){
	function HuoDongWindowUI(){
		this.viewContainer=null;
		this.bg=null;
		this.imgTitle=null;
		this.tabsFather=null;
		this.tabContainer=null;
		this.l_bg=null;
		this.r_bg=null;
		this.closeBtn=null;
		this.closeBtn2=null;
		HuoDongWindowUI.__super.call(this);
	}

	__class(HuoDongWindowUI,'ui.mobile.activity_xcq.leichong.HuoDongWindowUI',_super);
	var __proto=HuoDongWindowUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/HuoDongWindow");
	}

	return HuoDongWindowUI;
})(View)


//class ui.mobile.activity_xcq.leichong.LianXuItemUI extends laya.ui.View
var LianXuItemUI=(function(_super){
	function LianXuItemUI(){
		this.info_txt=null;
		this.imgGot=null;
		this.imgGot2=null;
		LianXuItemUI.__super.call(this);
	}

	__class(LianXuItemUI,'ui.mobile.activity_xcq.leichong.LianXuItemUI',_super);
	var __proto=LianXuItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/LianXuItem");
	}

	return LianXuItemUI;
})(View)


//class ui.mobile.activity_xcq.leichong.MeiriItemUI extends laya.ui.View
var MeiriItemUI=(function(_super){
	function MeiriItemUI(){
		this.btn=null;
		this.yilingqu=null;
		this.txt=null;
		this.up_txt=null;
		MeiriItemUI.__super.call(this);
	}

	__class(MeiriItemUI,'ui.mobile.activity_xcq.leichong.MeiriItemUI',_super);
	var __proto=MeiriItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/MeiriItem");
	}

	return MeiriItemUI;
})(View)


//class ui.mobile.fulihall.item.OnLineItemUI extends laya.ui.View
var OnLineItemUI=(function(_super){
	function OnLineItemUI(){
		this.getedImg=null;
		this.timeTxt=null;
		this.progressImg=null;
		this.onlineTimeTxt=null;
		this.cishuTxt=null;
		this.btnGet=null;
		OnLineItemUI.__super.call(this);
	}

	__class(OnLineItemUI,'ui.mobile.fulihall.item.OnLineItemUI',_super);
	var __proto=OnLineItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fulihall/item/OnLineItem");
	}

	return OnLineItemUI;
})(View)


//class ui.mobile.activity_xcq.leichong.QiriLianchongItemUI extends laya.ui.View
var QiriLianchongItemUI=(function(_super){
	function QiriLianchongItemUI(){
		this.dayImg=null;
		this.btnGo=null;
		this.yilingqu=null;
		QiriLianchongItemUI.__super.call(this);
	}

	__class(QiriLianchongItemUI,'ui.mobile.activity_xcq.leichong.QiriLianchongItemUI',_super);
	var __proto=QiriLianchongItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/QiriLianchongItem");
	}

	return QiriLianchongItemUI;
})(View)


//class ui.mobile.activity.rename.RenameServerRankItemUI extends laya.ui.View
var RenameServerRankItemUI=(function(_super){
	function RenameServerRankItemUI(){
		this.imgNo=null;
		this.name_txt=null;
		this.job_txt=null;
		this.money_txt=null;
		this.no_txt=null;
		RenameServerRankItemUI.__super.call(this);
	}

	__class(RenameServerRankItemUI,'ui.mobile.activity.rename.RenameServerRankItemUI',_super);
	var __proto=RenameServerRankItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/rename/RenameServerRankItem");
	}

	return RenameServerRankItemUI;
})(View)


//class ui.mobile.activity.rename.RenameServerRedItemUI extends laya.ui.View
var RenameServerRedItemUI=(function(_super){
	function RenameServerRedItemUI(){
		this.name_txt=null;
		this.money_txt=null;
		RenameServerRedItemUI.__super.call(this);
	}

	__class(RenameServerRedItemUI,'ui.mobile.activity.rename.RenameServerRedItemUI',_super);
	var __proto=RenameServerRedItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/rename/RenameServerRedItem");
	}

	return RenameServerRedItemUI;
})(View)


//class ui.mobile.activity.rename.RenameServerPanelUI extends laya.ui.View
var RenameServerPanelUI=(function(_super){
	function RenameServerPanelUI(){
		this.imgPlayer=null;
		this.avatarNode=null;
		this.imgOwner=null;
		this.name_txt=null;
		this.time_txt=null;
		this.reg_txt=null;
		this.redNode=null;
		this.banner=null;
		this.sendNode=null;
		this.btn_send=null;
		this.btn_getred=null;
		this.imgSend=null;
		this.getNode=null;
		this.money_txt=null;
		this.imgMoney=null;
		this.listNode=null;
		this.list_red=null;
		this.renameNode=null;
		this.btn_rank=null;
		this.desPanel=null;
		this.des_txt=null;
		this.renameTime_txt=null;
		this.serverName_txt=null;
		this.free_txt=null;
		this.imgGot=null;
		this.btn_recharge=null;
		this.btn_rename=null;
		this.btn_get=null;
		this.gridNode=null;
		this.input_txt=null;
		this.btn_write=null;
		this.btn_yulan=null;
		RenameServerPanelUI.__super.call(this);
	}

	__class(RenameServerPanelUI,'ui.mobile.activity.rename.RenameServerPanelUI',_super);
	var __proto=RenameServerPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/rename/RenameServerPanel");
	}

	return RenameServerPanelUI;
})(View)


//class ui.mobile.activity_xcq.leichong.FuLiTouZiItemUI extends laya.ui.View
var FuLiTouZiItemUI=(function(_super){
	function FuLiTouZiItemUI(){
		this.dayImg=null;
		this.btnGet=null;
		this.yilingqu=null;
		FuLiTouZiItemUI.__super.call(this);
	}

	__class(FuLiTouZiItemUI,'ui.mobile.activity_xcq.leichong.FuLiTouZiItemUI',_super);
	var __proto=FuLiTouZiItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/FuLiTouZiItem");
	}

	return FuLiTouZiItemUI;
})(View)


//class ui.mobile.activity_xcq.leichong.FuLiTouZiViewUI extends laya.ui.View
var FuLiTouZiViewUI=(function(_super){
	function FuLiTouZiViewUI(){
		this.banner=null;
		this.tabs=null;
		this.timeTxt=null;
		this.p_list=null;
		this.yigoumai=null;
		this.btnBox=null;
		this.c_icon=null;
		this.c_txt=null;
		this.btnGo=null;
		this.infoTxt=null;
		FuLiTouZiViewUI.__super.call(this);
	}

	__class(FuLiTouZiViewUI,'ui.mobile.activity_xcq.leichong.FuLiTouZiViewUI',_super);
	var __proto=FuLiTouZiViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/FuLiTouZiView");
	}

	return FuLiTouZiViewUI;
})(View)


//class ui.mobile.activity_xcq.leichong.GuangYiTeHuiViewUI extends laya.ui.View
var GuangYiTeHuiViewUI=(function(_super){
	function GuangYiTeHuiViewUI(){
		this.timeTxt=null;
		this.list=null;
		this.total_txt=null;
		this.items_box=null;
		this.info_txt=null;
		this.price_box=null;
		this.btn=null;
		this.nowPrice_txt=null;
		this.imgNowMoney=null;
		this.old_box=null;
		this.oldPrice_txt=null;
		this.imgOldMoney=null;
		this.grid_box=null;
		this.getted=null;
		GuangYiTeHuiViewUI.__super.call(this);
	}

	__class(GuangYiTeHuiViewUI,'ui.mobile.activity_xcq.leichong.GuangYiTeHuiViewUI',_super);
	var __proto=GuangYiTeHuiViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/GuangYiTeHuiView");
	}

	return GuangYiTeHuiViewUI;
})(View)


//class ui.mobile.activity_xcq.leichong.IntroductionGameViewUI extends laya.ui.View
var IntroductionGameViewUI=(function(_super){
	function IntroductionGameViewUI(){
		this.txtPanel=null;
		this.txt=null;
		IntroductionGameViewUI.__super.call(this);
	}

	__class(IntroductionGameViewUI,'ui.mobile.activity_xcq.leichong.IntroductionGameViewUI',_super);
	var __proto=IntroductionGameViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/IntroductionGameView");
	}

	return IntroductionGameViewUI;
})(View)


//class ui.mobile.activity_xcq.leichong.ZSFuliViewUI extends laya.ui.View
var ZSFuliViewUI=(function(_super){
	function ZSFuliViewUI(){
		this.boxImg=null;
		this.t_list=null;
		this.fontImg=null;
		this.btnGet=null;
		this.yilingqu=null;
		this.limitTxt=null;
		ZSFuliViewUI.__super.call(this);
	}

	__class(ZSFuliViewUI,'ui.mobile.activity_xcq.leichong.ZSFuliViewUI',_super);
	var __proto=ZSFuliViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.activity_xcq.leichong.ZSFuliTabUI",ZSFuliTabUI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/ZSFuliView");
	}

	return ZSFuliViewUI;
})(View)


//class ui.mobile.activity_xcq.leichong.LianXuViewUI extends laya.ui.View
var LianXuViewUI=(function(_super){
	function LianXuViewUI(){
		this.effectNode=null;
		this.list=null;
		this.bg_des=null;
		this.bg_day=null;
		this.imgName=null;
		this.btn_recharge=null;
		this.total_txt=null;
		this.numNode=null;
		LianXuViewUI.__super.call(this);
	}

	__class(LianXuViewUI,'ui.mobile.activity_xcq.leichong.LianXuViewUI',_super);
	var __proto=LianXuViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/LianXuView");
	}

	return LianXuViewUI;
})(View)


//class ui.mobile.activity_xcq.leichong.LingYuanGouItemUI extends laya.ui.View
var LingYuanGouItemUI=(function(_super){
	function LingYuanGouItemUI(){
		this.bg=null;
		this.imgDes=null;
		this.des_txt=null;
		this.touchNode=null;
		this.imgGot=null;
		this.btn=null;
		this.money_txt=null;
		this.imgMoney=null;
		LingYuanGouItemUI.__super.call(this);
	}

	__class(LingYuanGouItemUI,'ui.mobile.activity_xcq.leichong.LingYuanGouItemUI',_super);
	var __proto=LingYuanGouItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/LingYuanGouItem");
	}

	return LingYuanGouItemUI;
})(View)


//class ui.mobile.activity_xcq.leichong.LingYuanGouViewUI extends laya.ui.View
var LingYuanGouViewUI=(function(_super){
	function LingYuanGouViewUI(){
		this.bg=null;
		this.time_txt=null;
		this.list=null;
		this.maxNode=null;
		this.bg_grid=null;
		this.num_txt=null;
		this.imgGot=null;
		LingYuanGouViewUI.__super.call(this);
	}

	__class(LingYuanGouViewUI,'ui.mobile.activity_xcq.leichong.LingYuanGouViewUI',_super);
	var __proto=LingYuanGouViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/LingYuanGouView");
	}

	return LingYuanGouViewUI;
})(View)


//class ui.mobile.activity_xcq.leichong.LongHunBossItemUI extends laya.ui.View
var LongHunBossItemUI=(function(_super){
	function LongHunBossItemUI(){
		this.bg=null;
		this.imgMoney=null;
		this.btn_reward=null;
		this.imgKill=null;
		this.btn=null;
		LongHunBossItemUI.__super.call(this);
	}

	__class(LongHunBossItemUI,'ui.mobile.activity_xcq.leichong.LongHunBossItemUI',_super);
	var __proto=LongHunBossItemUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/LongHunBossItem");
	}

	return LongHunBossItemUI;
})(View)


//class ui.mobile.activity_xcq.leichong.LongHunBossViewUI extends laya.ui.View
var LongHunBossViewUI=(function(_super){
	function LongHunBossViewUI(){
		this.money_txt=null;
		this.list=null;
		LongHunBossViewUI.__super.call(this);
	}

	__class(LongHunBossViewUI,'ui.mobile.activity_xcq.leichong.LongHunBossViewUI',_super);
	var __proto=LongHunBossViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/LongHunBossView");
	}

	return LongHunBossViewUI;
})(View)


//class ui.mobile.activity_xcq.leichong.LongHunLiBaoViewUI extends laya.ui.View
var LongHunLiBaoViewUI=(function(_super){
	function LongHunLiBaoViewUI(){
		this.list=null;
		this.btn_left=null;
		this.btn_right=null;
		this.timeTxt=null;
		LongHunLiBaoViewUI.__super.call(this);
	}

	__class(LongHunLiBaoViewUI,'ui.mobile.activity_xcq.leichong.LongHunLiBaoViewUI',_super);
	var __proto=LongHunLiBaoViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/LongHunLiBaoView");
	}

	return LongHunLiBaoViewUI;
})(View)


//class ui.mobile.activity_xcq.leichong.LonghunXianshiViewUI extends laya.ui.View
var LonghunXianshiViewUI=(function(_super){
	function LonghunXianshiViewUI(){
		this.tabs=null;
		this.timeTxt=null;
		this.infoTxt=null;
		this.btnBuy=null;
		this.yigoumai=null;
		LonghunXianshiViewUI.__super.call(this);
	}

	__class(LonghunXianshiViewUI,'ui.mobile.activity_xcq.leichong.LonghunXianshiViewUI',_super);
	var __proto=LonghunXianshiViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/LonghunXianshiView");
	}

	return LonghunXianshiViewUI;
})(View)


//class ui.mobile.activity_xcq.leichong.MeiRiViewUI extends laya.ui.View
var MeiRiViewUI=(function(_super){
	function MeiRiViewUI(){
		this.p_list=null;
		this.btnCZ=null;
		this.totalTxt=null;
		this.info_txt=null;
		this.joinTxt=null;
		this.reset_box=null;
		this.btnReset=null;
		MeiRiViewUI.__super.call(this);
	}

	__class(MeiRiViewUI,'ui.mobile.activity_xcq.leichong.MeiRiViewUI',_super);
	var __proto=MeiRiViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/MeiRiView");
	}

	return MeiRiViewUI;
})(View)


//class ui.mobile.activity_xcq.leichong.MeiRiZhiGouViewUI extends laya.ui.View
var MeiRiZhiGouViewUI=(function(_super){
	function MeiRiZhiGouViewUI(){
		this.list=null;
		this.btn_left=null;
		this.btn_right=null;
		this.timeTxt=null;
		MeiRiZhiGouViewUI.__super.call(this);
	}

	__class(MeiRiZhiGouViewUI,'ui.mobile.activity_xcq.leichong.MeiRiZhiGouViewUI',_super);
	var __proto=MeiRiZhiGouViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/MeiRiZhiGouView");
	}

	return MeiRiZhiGouViewUI;
})(View)


//class ui.mobile.activity_xcq.leichong.NiTiWoGaiViewUI extends laya.ui.View
var NiTiWoGaiViewUI=(function(_super){
	function NiTiWoGaiViewUI(){
		this.btn=null;
		NiTiWoGaiViewUI.__super.call(this);
	}

	__class(NiTiWoGaiViewUI,'ui.mobile.activity_xcq.leichong.NiTiWoGaiViewUI',_super);
	var __proto=NiTiWoGaiViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/NiTiWoGaiView");
	}

	return NiTiWoGaiViewUI;
})(View)


//class ui.mobile.activity_xcq.leichong.QiriLianchongViewUI extends laya.ui.View
var QiriLianchongViewUI=(function(_super){
	function QiriLianchongViewUI(){
		this.bg=null;
		this.r_font=null;
		this.p_list=null;
		this.tabs=null;
		this.timeTxt=null;
		this.chongzhiTxt=null;
		this.yilingqu=null;
		QiriLianchongViewUI.__super.call(this);
	}

	__class(QiriLianchongViewUI,'ui.mobile.activity_xcq.leichong.QiriLianchongViewUI',_super);
	var __proto=QiriLianchongViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/QiriLianchongView");
	}

	return QiriLianchongViewUI;
})(View)


//class ui.mobile.activity.seven.SevenLoginPanelUI extends laya.ui.View
var SevenLoginPanelUI=(function(_super){
	function SevenLoginPanelUI(){
		this.bg0=null;
		this.dayimg0=null;
		this.icon0=null;
		this.dayTxt0=null;
		this.mask0=null;
		this.bg1=null;
		this.dayimg1=null;
		this.icon1=null;
		this.dayTxt1=null;
		this.mask1=null;
		this.bg2=null;
		this.dayimg2=null;
		this.icon2=null;
		this.dayTxt2=null;
		this.mask2=null;
		this.bg3=null;
		this.dayimg3=null;
		this.icon3=null;
		this.dayTxt3=null;
		this.mask3=null;
		this.bg4=null;
		this.dayimg4=null;
		this.icon4=null;
		this.dayTxt4=null;
		this.mask4=null;
		this.bg5=null;
		this.dayimg5=null;
		this.icon5=null;
		this.dayTxt5=null;
		this.mask5=null;
		this.bg6=null;
		this.dayimg6=null;
		this.icon6=null;
		this.dayTxt6=null;
		this.mask6=null;
		this.loginTxt=null;
		this.descTxt=null;
		this.timeTxt=null;
		this.l_select=null;
		this.btnGet=null;
		this.yilingqu0=null;
		this.yilingqu1=null;
		this.yilingqu2=null;
		this.yilingqu3=null;
		this.yilingqu4=null;
		this.yilingqu5=null;
		this.yilingqu6=null;
		SevenLoginPanelUI.__super.call(this);
	}

	__class(SevenLoginPanelUI,'ui.mobile.activity.seven.SevenLoginPanelUI',_super);
	var __proto=SevenLoginPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/seven/SevenLoginPanel");
	}

	return SevenLoginPanelUI;
})(View)


//class ui.mobile.activity_xcq.leichong.ShuaXinJianBanViewUI extends laya.ui.View
var ShuaXinJianBanViewUI=(function(_super){
	function ShuaXinJianBanViewUI(){
		this.time_txt=null;
		this.btn=null;
		ShuaXinJianBanViewUI.__super.call(this);
	}

	__class(ShuaXinJianBanViewUI,'ui.mobile.activity_xcq.leichong.ShuaXinJianBanViewUI',_super);
	var __proto=ShuaXinJianBanViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/ShuaXinJianBanView");
	}

	return ShuaXinJianBanViewUI;
})(View)


//class ui.mobile.activity_xcq.leichong.TianTianZanZhuItemUI extends laya.ui.View
var TianTianZanZhuItemUI=(function(_super){
	function TianTianZanZhuItemUI(){
		this.bg=null;
		this.imgGet=null;
		this.imgNo=null;
		this.btnGet=null;
		this.txt1=null;
		this.txt2=null;
		TianTianZanZhuItemUI.__super.call(this);
	}

	__class(TianTianZanZhuItemUI,'ui.mobile.activity_xcq.leichong.TianTianZanZhuItemUI',_super);
	var __proto=TianTianZanZhuItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/TianTianZanZhuItem");
	}

	return TianTianZanZhuItemUI;
})(View)


//class ui.mobile.activity_xcq.leichong.TianTianZanZhuViewUI extends laya.ui.View
var TianTianZanZhuViewUI=(function(_super){
	function TianTianZanZhuViewUI(){
		this.day_txt=null;
		this.list=null;
		TianTianZanZhuViewUI.__super.call(this);
	}

	__class(TianTianZanZhuViewUI,'ui.mobile.activity_xcq.leichong.TianTianZanZhuViewUI',_super);
	var __proto=TianTianZanZhuViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/TianTianZanZhuView");
	}

	return TianTianZanZhuViewUI;
})(View)


//class ui.mobile.activity_xcq.leichong.UpdateNoticeViewUI extends laya.ui.View
var UpdateNoticeViewUI=(function(_super){
	function UpdateNoticeViewUI(){
		this.contentTxt=null;
		this.imgGot=null;
		this.btn_get=null;
		UpdateNoticeViewUI.__super.call(this);
	}

	__class(UpdateNoticeViewUI,'ui.mobile.activity_xcq.leichong.UpdateNoticeViewUI',_super);
	var __proto=UpdateNoticeViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/UpdateNoticeView");
	}

	return UpdateNoticeViewUI;
})(View)


//class ui.mobile.activity_xcq.leichong.XinFuGongChengViewUI extends laya.ui.View
var XinFuGongChengViewUI=(function(_super){
	function XinFuGongChengViewUI(){
		this.time_txt=null;
		this.imgMoney=null;
		this.gridNode=null;
		this.btn_go=null;
		XinFuGongChengViewUI.__super.call(this);
	}

	__class(XinFuGongChengViewUI,'ui.mobile.activity_xcq.leichong.XinFuGongChengViewUI',_super);
	var __proto=XinFuGongChengViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/XinFuGongChengView");
	}

	return XinFuGongChengViewUI;
})(View)


//class ui.mobile.activity_xcq.leichong.GongJiKaoShangViewUI extends laya.ui.View
var GongJiKaoShangViewUI=(function(_super){
	function GongJiKaoShangViewUI(){
		this.time_txt=null;
		this.list=null;
		this.btn_all=null;
		this.btn_buy=null;
		GongJiKaoShangViewUI.__super.call(this);
	}

	__class(GongJiKaoShangViewUI,'ui.mobile.activity_xcq.leichong.GongJiKaoShangViewUI',_super);
	var __proto=GongJiKaoShangViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/GongJiKaoShangView");
	}

	return GongJiKaoShangViewUI;
})(View)


//class ui.mobile.activity_xcq.leichong.ChaoZhiYuaKaViewUI extends laya.ui.View
var ChaoZhiYuaKaViewUI=(function(_super){
	function ChaoZhiYuaKaViewUI(){
		this.txt1=null;
		this.txt2=null;
		this.money_txt1=null;
		this.money_txt2=null;
		this.money_txt3=null;
		this.time_txt=null;
		this.icon3=null;
		this.icon2=null;
		this.icon1=null;
		this.btn_help=null;
		this.btn=null;
		this.double_txt=null;
		this.buytime_txt=null;
		ChaoZhiYuaKaViewUI.__super.call(this);
	}

	__class(ChaoZhiYuaKaViewUI,'ui.mobile.activity_xcq.leichong.ChaoZhiYuaKaViewUI',_super);
	var __proto=ChaoZhiYuaKaViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/ChaoZhiYuaKaView");
	}

	return ChaoZhiYuaKaViewUI;
})(View)


//class ui.mobile.activity_xcq.leichong.GongJiKaoShangItemUI extends laya.ui.View
var GongJiKaoShangItemUI=(function(_super){
	function GongJiKaoShangItemUI(){
		this.name_txt=null;
		this.num_txt=null;
		this.bg_grid1=null;
		this.bg_grid2=null;
		this.btn=null;
		this.imgGot1=null;
		this.imgGot2=null;
		this.imgGot3=null;
		this.imgGot4=null;
		GongJiKaoShangItemUI.__super.call(this);
	}

	__class(GongJiKaoShangItemUI,'ui.mobile.activity_xcq.leichong.GongJiKaoShangItemUI',_super);
	var __proto=GongJiKaoShangItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/GongJiKaoShangItem");
	}

	return GongJiKaoShangItemUI;
})(View)


//class ui.mobile.activity_xcq.leichong.HuoYueZhanLingItemUI extends laya.ui.View
var HuoYueZhanLingItemUI=(function(_super){
	function HuoYueZhanLingItemUI(){
		this.bg_grid=null;
		this.bg_grid2=null;
		this.imgGot=null;
		this.imgGot2=null;
		this.name_txt=null;
		this.name_txt2=null;
		this.lv_txt=null;
		HuoYueZhanLingItemUI.__super.call(this);
	}

	__class(HuoYueZhanLingItemUI,'ui.mobile.activity_xcq.leichong.HuoYueZhanLingItemUI',_super);
	var __proto=HuoYueZhanLingItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/HuoYueZhanLingItem");
	}

	return HuoYueZhanLingItemUI;
})(View)


//class ui.mobile.activity_xcq.leichong.HuoYueZhanLingViewUI extends laya.ui.View
var HuoYueZhanLingViewUI=(function(_super){
	function HuoYueZhanLingViewUI(){
		this.btn_vip=null;
		this.list=null;
		this.expBar=null;
		this.bg_grid=null;
		this.bg_grid2=null;
		this.imgGot=null;
		this.imgGot2=null;
		this.name_txt=null;
		this.lv_txt=null;
		this.name_txt2=null;
		this.lv_txt2=null;
		this.time_txt=null;
		this.exp_txt=null;
		this.des_txt=null;
		this.btn_task=null;
		this.numNode=null;
		HuoYueZhanLingViewUI.__super.call(this);
	}

	__class(HuoYueZhanLingViewUI,'ui.mobile.activity_xcq.leichong.HuoYueZhanLingViewUI',_super);
	var __proto=HuoYueZhanLingViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/HuoYueZhanLingView");
	}

	return HuoYueZhanLingViewUI;
})(View)


//class ui.mobile.activity_xcq.leichong.WuYouLiBaoViewUI extends laya.ui.View
var WuYouLiBaoViewUI=(function(_super){
	function WuYouLiBaoViewUI(){
		this.time_txt=null;
		this.des_txt=null;
		this.backNode=null;
		this.imgMoney=null;
		this.back_txt=null;
		this.rewardNode=null;
		this.price_txt=null;
		this.imgGot=null;
		this.btn_buy=null;
		this.imgFire1=null;
		this.imgFire2=null;
		WuYouLiBaoViewUI.__super.call(this);
	}

	__class(WuYouLiBaoViewUI,'ui.mobile.activity_xcq.leichong.WuYouLiBaoViewUI',_super);
	var __proto=WuYouLiBaoViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/WuYouLiBaoView");
	}

	return WuYouLiBaoViewUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.NitiwogaiViewUI extends laya.ui.View
var NitiwogaiViewUI=(function(_super){
	function NitiwogaiViewUI(){
		this.bg=null;
		this.btnGo=null;
		NitiwogaiViewUI.__super.call(this);
	}

	__class(NitiwogaiViewUI,'ui.mobile.activity_xcq.xinfutehui.NitiwogaiViewUI',_super);
	var __proto=NitiwogaiViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/NitiwogaiView");
	}

	return NitiwogaiViewUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFFanPaiItemUI extends laya.ui.View
var XFFanPaiItemUI=(function(_super){
	function XFFanPaiItemUI(){
		this.box=null;
		this.card_on=null;
		this.card_off=null;
		XFFanPaiItemUI.__super.call(this);
	}

	__class(XFFanPaiItemUI,'ui.mobile.activity_xcq.xinfutehui.XFFanPaiItemUI',_super);
	var __proto=XFFanPaiItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFFanPaiItem");
	}

	return XFFanPaiItemUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFFanPaiViewUI extends laya.ui.View
var XFFanPaiViewUI=(function(_super){
	function XFFanPaiViewUI(){
		this.bg=null;
		this.btn=null;
		this.time_txt=null;
		this.des_txt=null;
		this.num_txt=null;
		this.gridNode=null;
		this.need_txt=null;
		this.cardNode=null;
		this.icon=null;
		XFFanPaiViewUI.__super.call(this);
	}

	__class(XFFanPaiViewUI,'ui.mobile.activity_xcq.xinfutehui.XFFanPaiViewUI',_super);
	var __proto=XFFanPaiViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFFanPaiView");
	}

	return XFFanPaiViewUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFHunhuanZGViewUI extends laya.ui.View
var XFHunhuanZGViewUI=(function(_super){
	function XFHunhuanZGViewUI(){
		this.itembg0=null;
		this.btn0=null;
		this.itemTitle0=null;
		this.jiaobiao0=null;
		this.pTxt0=null;
		this.pIcon0=null;
		this.gridTxt0=null;
		this.yibuy0=null;
		this.o_pTxt0=null;
		this.o_pIcon0=null;
		this.itembg1=null;
		this.btn1=null;
		this.itemTitle1=null;
		this.jiaobiao1=null;
		this.pTxt1=null;
		this.pIcon1=null;
		this.gridTxt1=null;
		this.yibuy1=null;
		this.o_pTxt1=null;
		this.o_pIcon1=null;
		this.itembg2=null;
		this.btn2=null;
		this.itemTitle2=null;
		this.jiaobiao2=null;
		this.pTxt2=null;
		this.pIcon2=null;
		this.gridTxt2=null;
		this.yibuy2=null;
		this.o_pTxt2=null;
		this.o_pIcon2=null;
		this.timeTxt=null;
		this.descTxt=null;
		XFHunhuanZGViewUI.__super.call(this);
	}

	__class(XFHunhuanZGViewUI,'ui.mobile.activity_xcq.xinfutehui.XFHunhuanZGViewUI',_super);
	var __proto=XFHunhuanZGViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFHunhuanZGView");
	}

	return XFHunhuanZGViewUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFJianBanViewUI extends laya.ui.View
var XFJianBanViewUI=(function(_super){
	function XFJianBanViewUI(){
		this.bg=null;
		this.time_txt=null;
		this.btn=null;
		XFJianBanViewUI.__super.call(this);
	}

	__class(XFJianBanViewUI,'ui.mobile.activity_xcq.xinfutehui.XFJianBanViewUI',_super);
	var __proto=XFJianBanViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFJianBanView");
	}

	return XFJianBanViewUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFJueBanViewUI extends laya.ui.View
var XFJueBanViewUI=(function(_super){
	function XFJueBanViewUI(){
		this.bg=null;
		this.l_yilingqu=null;
		this.r_yilingqu=null;
		this.free_yilingqu=null;
		this.btnFree=null;
		this.l_nameTxt=null;
		this.r_nameTxt=null;
		this.l_priceTxt=null;
		this.l_icon=null;
		this.r_priceTxt=null;
		this.r_icon=null;
		this.suitTxt=null;
		this.l_btn=null;
		this.r_btn=null;
		XFJueBanViewUI.__super.call(this);
	}

	__class(XFJueBanViewUI,'ui.mobile.activity_xcq.xinfutehui.XFJueBanViewUI',_super);
	var __proto=XFJueBanViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFJueBanView");
	}

	return XFJueBanViewUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFKaiFuTeHuiItemUI extends laya.ui.View
var XFKaiFuTeHuiItemUI=(function(_super){
	function XFKaiFuTeHuiItemUI(){
		this.btn=null;
		this.imgTab=null;
		this.imgSelected=null;
		this.imgName=null;
		XFKaiFuTeHuiItemUI.__super.call(this);
	}

	__class(XFKaiFuTeHuiItemUI,'ui.mobile.activity_xcq.xinfutehui.XFKaiFuTeHuiItemUI',_super);
	var __proto=XFKaiFuTeHuiItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFKaiFuTeHuiItem");
	}

	return XFKaiFuTeHuiItemUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFKaiFuTeHuiViewUI extends laya.ui.View
var XFKaiFuTeHuiViewUI=(function(_super){
	function XFKaiFuTeHuiViewUI(){
		this.bg=null;
		this.list=null;
		this.imgDes=null;
		this.imgGot=null;
		this.buyNode=null;
		this.btn=null;
		this.infoTxt=null;
		this.nowPrice_txt=null;
		this.imgNowMoney=null;
		this.oldPrice_box=null;
		this.oldPrice_txt=null;
		this.imgOldMoney=null;
		this.effectNode=null;
		this.gridNode=null;
		this.numNode=null;
		XFKaiFuTeHuiViewUI.__super.call(this);
	}

	__class(XFKaiFuTeHuiViewUI,'ui.mobile.activity_xcq.xinfutehui.XFKaiFuTeHuiViewUI',_super);
	var __proto=XFKaiFuTeHuiViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFKaiFuTeHuiView");
	}

	return XFKaiFuTeHuiViewUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFLabaViewUI extends laya.ui.View
var XFLabaViewUI=(function(_super){
	function XFLabaViewUI(){
		this.bg=null;
		this.time_txt=null;
		this.num_txt=null;
		this.btn=null;
		this.des_txt=null;
		this.numNode=null;
		this.check_txt=null;
		this.checkbox=null;
		XFLabaViewUI.__super.call(this);
	}

	__class(XFLabaViewUI,'ui.mobile.activity_xcq.xinfutehui.XFLabaViewUI',_super);
	var __proto=XFLabaViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFLabaView");
	}

	return XFLabaViewUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFLingYuanGouItemUI extends laya.ui.View
var XFLingYuanGouItemUI=(function(_super){
	function XFLingYuanGouItemUI(){
		this.bg=null;
		this.imgDes=null;
		this.imgGot=null;
		this.btn=null;
		this.des_txt=null;
		this.money_txt=null;
		this.imgMoney=null;
		this.touchNode=null;
		XFLingYuanGouItemUI.__super.call(this);
	}

	__class(XFLingYuanGouItemUI,'ui.mobile.activity_xcq.xinfutehui.XFLingYuanGouItemUI',_super);
	var __proto=XFLingYuanGouItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFLingYuanGouItem");
	}

	return XFLingYuanGouItemUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFLingYuanGouViewUI extends laya.ui.View
var XFLingYuanGouViewUI=(function(_super){
	function XFLingYuanGouViewUI(){
		this.bg=null;
		this.time_txt=null;
		this.list=null;
		this.maxNode=null;
		this.bg_grid=null;
		this.num_txt=null;
		this.imgGot=null;
		XFLingYuanGouViewUI.__super.call(this);
	}

	__class(XFLingYuanGouViewUI,'ui.mobile.activity_xcq.xinfutehui.XFLingYuanGouViewUI',_super);
	var __proto=XFLingYuanGouViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFLingYuanGouView");
	}

	return XFLingYuanGouViewUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFZuanShiLiBaoViewUI extends laya.ui.View
var XFZuanShiLiBaoViewUI=(function(_super){
	function XFZuanShiLiBaoViewUI(){
		this.bg=null;
		this.list=null;
		this.btn_left=null;
		this.btn_right=null;
		this.timeTxt=null;
		XFZuanShiLiBaoViewUI.__super.call(this);
	}

	__class(XFZuanShiLiBaoViewUI,'ui.mobile.activity_xcq.xinfutehui.XFZuanShiLiBaoViewUI',_super);
	var __proto=XFZuanShiLiBaoViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFZuanShiLiBaoView");
	}

	return XFZuanShiLiBaoViewUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFQiFuViewUI extends laya.ui.View
var XFQiFuViewUI=(function(_super){
	function XFQiFuViewUI(){
		this.bg=null;
		this.btn_go=null;
		this.btn_1=null;
		this.btn_10=null;
		this.icon0=null;
		this.icon1=null;
		this.cost_txt0=null;
		this.cost_txt1=null;
		this.info_txt=null;
		this.effectNode=null;
		this.bestNode=null;
		this.shopNode=null;
		this.imgDes=null;
		this.recharge_bar=null;
		this.total_bar=null;
		this.total_txt=null;
		this.item0=null;
		this.item1=null;
		this.item2=null;
		this.des_txt=null;
		this.bar_txt=null;
		this.tipNode=null;
		this.time_txt=null;
		XFQiFuViewUI.__super.call(this);
	}

	__class(XFQiFuViewUI,'ui.mobile.activity_xcq.xinfutehui.XFQiFuViewUI',_super);
	var __proto=XFQiFuViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFQiFuView");
	}

	return XFQiFuViewUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFQIRIItemUI extends laya.ui.View
var XFQIRIItemUI=(function(_super){
	function XFQIRIItemUI(){
		this.imgYuan=null;
		this.btn=null;
		this.imgGot=null;
		XFQIRIItemUI.__super.call(this);
	}

	__class(XFQIRIItemUI,'ui.mobile.activity_xcq.xinfutehui.XFQIRIItemUI',_super);
	var __proto=XFQIRIItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFQIRIItem");
	}

	return XFQIRIItemUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFQIRIViewUI extends laya.ui.View
var XFQIRIViewUI=(function(_super){
	function XFQIRIViewUI(){
		this.list=null;
		this.total_txt=null;
		XFQIRIViewUI.__super.call(this);
	}

	__class(XFQIRIViewUI,'ui.mobile.activity_xcq.xinfutehui.XFQIRIViewUI',_super);
	var __proto=XFQIRIViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFQIRIView");
	}

	return XFQIRIViewUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFShaChengViewUI extends laya.ui.View
var XFShaChengViewUI=(function(_super){
	function XFShaChengViewUI(){
		this.bg=null;
		this.time_txt=null;
		this.imgMoney=null;
		this.gridNode=null;
		this.btn_go=null;
		XFShaChengViewUI.__super.call(this);
	}

	__class(XFShaChengViewUI,'ui.mobile.activity_xcq.xinfutehui.XFShaChengViewUI',_super);
	var __proto=XFShaChengViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFShaChengView");
	}

	return XFShaChengViewUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFShenYuTeHuiItemUI extends laya.ui.View
var XFShenYuTeHuiItemUI=(function(_super){
	function XFShenYuTeHuiItemUI(){
		this.bg=null;
		this.info_txt=null;
		this.grid_box=null;
		this.btn=null;
		this.getted=null;
		XFShenYuTeHuiItemUI.__super.call(this);
	}

	__class(XFShenYuTeHuiItemUI,'ui.mobile.activity_xcq.xinfutehui.XFShenYuTeHuiItemUI',_super);
	var __proto=XFShenYuTeHuiItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFShenYuTeHuiItem");
	}

	return XFShenYuTeHuiItemUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFShenYuTeHuiViewUI extends laya.ui.View
var XFShenYuTeHuiViewUI=(function(_super){
	function XFShenYuTeHuiViewUI(){
		this.bg=null;
		this.timeTxt=null;
		this.list=null;
		this.total_txt=null;
		this.items_box=null;
		this.info_txt=null;
		this.price_box=null;
		this.btn=null;
		this.nowPrice_txt=null;
		this.imgNowMoney=null;
		this.old_box=null;
		this.oldPrice_txt=null;
		this.imgOldMoney=null;
		this.grid_box=null;
		this.getted=null;
		XFShenYuTeHuiViewUI.__super.call(this);
	}

	__class(XFShenYuTeHuiViewUI,'ui.mobile.activity_xcq.xinfutehui.XFShenYuTeHuiViewUI',_super);
	var __proto=XFShenYuTeHuiViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFShenYuTeHuiView");
	}

	return XFShenYuTeHuiViewUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFTeJieLiBaoItemUI extends laya.ui.View
var XFTeJieLiBaoItemUI=(function(_super){
	function XFTeJieLiBaoItemUI(){
		this.name_txt=null;
		this.vip_txt=null;
		this.money_txt=null;
		this.imgMoney=null;
		this.btn=null;
		this.imgGot=null;
		XFTeJieLiBaoItemUI.__super.call(this);
	}

	__class(XFTeJieLiBaoItemUI,'ui.mobile.activity_xcq.xinfutehui.XFTeJieLiBaoItemUI',_super);
	var __proto=XFTeJieLiBaoItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFTeJieLiBaoItem");
	}

	return XFTeJieLiBaoItemUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFTeJieLiBaoViewUI extends laya.ui.View
var XFTeJieLiBaoViewUI=(function(_super){
	function XFTeJieLiBaoViewUI(){
		this.bg=null;
		this.des_txt=null;
		XFTeJieLiBaoViewUI.__super.call(this);
	}

	__class(XFTeJieLiBaoViewUI,'ui.mobile.activity_xcq.xinfutehui.XFTeJieLiBaoViewUI',_super);
	var __proto=XFTeJieLiBaoViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFTeJieLiBaoView");
	}

	return XFTeJieLiBaoViewUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFTeJieZhiGouItemUI extends laya.ui.View
var XFTeJieZhiGouItemUI=(function(_super){
	function XFTeJieZhiGouItemUI(){
		this.btn=null;
		this.imgTitle=null;
		this.imgSong=null;
		this.imgGot=null;
		this.name_txt=null;
		this.des_txt=null;
		this.imgGrid=null;
		this.moneyNode=null;
		XFTeJieZhiGouItemUI.__super.call(this);
	}

	__class(XFTeJieZhiGouItemUI,'ui.mobile.activity_xcq.xinfutehui.XFTeJieZhiGouItemUI',_super);
	var __proto=XFTeJieZhiGouItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFTeJieZhiGouItem");
	}

	return XFTeJieZhiGouItemUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFTeJieZhiGouViewUI extends laya.ui.View
var XFTeJieZhiGouViewUI=(function(_super){
	function XFTeJieZhiGouViewUI(){
		this.bg=null;
		this.btn_left=null;
		this.btn_right=null;
		XFTeJieZhiGouViewUI.__super.call(this);
	}

	__class(XFTeJieZhiGouViewUI,'ui.mobile.activity_xcq.xinfutehui.XFTeJieZhiGouViewUI',_super);
	var __proto=XFTeJieZhiGouViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFTeJieZhiGouView");
	}

	return XFTeJieZhiGouViewUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFTouziItemUI extends laya.ui.View
var XFTouziItemUI=(function(_super){
	function XFTouziItemUI(){
		this.dayImg=null;
		this.btnGet=null;
		this.yilingqu=null;
		XFTouziItemUI.__super.call(this);
	}

	__class(XFTouziItemUI,'ui.mobile.activity_xcq.xinfutehui.XFTouziItemUI',_super);
	var __proto=XFTouziItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFTouziItem");
	}

	return XFTouziItemUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFTouziViewUI extends laya.ui.View
var XFTouziViewUI=(function(_super){
	function XFTouziViewUI(){
		this.bg=null;
		this.banner=null;
		this.tabs=null;
		this.timeTxt=null;
		this.yigoumai=null;
		this.p_list=null;
		this.btnBox=null;
		this.c_icon=null;
		this.c_txt=null;
		this.btnGo=null;
		this.infoTxt=null;
		XFTouziViewUI.__super.call(this);
	}

	__class(XFTouziViewUI,'ui.mobile.activity_xcq.xinfutehui.XFTouziViewUI',_super);
	var __proto=XFTouziViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFTouziView");
	}

	return XFTouziViewUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFZhiZunLiBaoItemUI extends laya.ui.View
var XFZhiZunLiBaoItemUI=(function(_super){
	function XFZhiZunLiBaoItemUI(){
		this.bg=null;
		this.imgTitle=null;
		this.imgSale=null;
		this.imgGot=null;
		this.num_txt=null;
		this.btn=null;
		XFZhiZunLiBaoItemUI.__super.call(this);
	}

	__class(XFZhiZunLiBaoItemUI,'ui.mobile.activity_xcq.xinfutehui.XFZhiZunLiBaoItemUI',_super);
	var __proto=XFZhiZunLiBaoItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFZhiZunLiBaoItem");
	}

	return XFZhiZunLiBaoItemUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFZhiZunLiBaoViewUI extends laya.ui.View
var XFZhiZunLiBaoViewUI=(function(_super){
	function XFZhiZunLiBaoViewUI(){
		this.bg=null;
		this.list=null;
		this.imgBar=null;
		this.time_txt=null;
		this.total_txt=null;
		this.item0=null;
		this.num_txt0=null;
		this.imgGot0=null;
		this.item1=null;
		this.num_txt1=null;
		this.imgGot1=null;
		this.item2=null;
		this.num_txt2=null;
		this.imgGot2=null;
		XFZhiZunLiBaoViewUI.__super.call(this);
	}

	__class(XFZhiZunLiBaoViewUI,'ui.mobile.activity_xcq.xinfutehui.XFZhiZunLiBaoViewUI',_super);
	var __proto=XFZhiZunLiBaoViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFZhiZunLiBaoView");
	}

	return XFZhiZunLiBaoViewUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFZuanShiLiBaoItemUI extends laya.ui.View
var XFZuanShiLiBaoItemUI=(function(_super){
	function XFZuanShiLiBaoItemUI(){
		this.bg=null;
		this.btn=null;
		this.name_txt=null;
		this.num_txt=null;
		this.imgGot=null;
		this.o_icon=null;
		this.o_txt2=null;
		this.o_txt1=null;
		this.red_line=null;
		this.zhekou=null;
		XFZuanShiLiBaoItemUI.__super.call(this);
	}

	__class(XFZuanShiLiBaoItemUI,'ui.mobile.activity_xcq.xinfutehui.XFZuanShiLiBaoItemUI',_super);
	var __proto=XFZuanShiLiBaoItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFZuanShiLiBaoItem");
	}

	return XFZuanShiLiBaoItemUI;
})(View)


//class ui.mobile.activity_xcq.xinfutehui.XFTeHuiWindowUI extends laya.ui.View
var XFTeHuiWindowUI=(function(_super){
	function XFTeHuiWindowUI(){
		this.bg_window=null;
		this.viewContainer=null;
		this.closeBtn=null;
		this.closeBtn2=null;
		this.l_panel=null;
		this.tab=null;
		XFTeHuiWindowUI.__super.call(this);
	}

	__class(XFTeHuiWindowUI,'ui.mobile.activity_xcq.xinfutehui.XFTeHuiWindowUI',_super);
	var __proto=XFTeHuiWindowUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/xinfutehui/XFTeHuiWindow");
	}

	return XFTeHuiWindowUI;
})(View)


//class ui.mobile.zuoqi.ZuoqiHeadItemUI extends laya.ui.View
var ZuoqiHeadItemUI=(function(_super){
	function ZuoqiHeadItemUI(){
		this.bg=null;
		this.icon=null;
		this.nameTxt=null;
		this.txt=null;
		this.jiaobiao=null;
		ZuoqiHeadItemUI.__super.call(this);
	}

	__class(ZuoqiHeadItemUI,'ui.mobile.zuoqi.ZuoqiHeadItemUI',_super);
	var __proto=ZuoqiHeadItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zuoqi/ZuoqiHeadItem");
	}

	return ZuoqiHeadItemUI;
})(View)


//class ui.mobile.zuoqi.ZuoqiSkillGridUI extends laya.ui.View
var ZuoqiSkillGridUI=(function(_super){
	function ZuoqiSkillGridUI(){
		this.txt=null;
		this.icon=null;
		ZuoqiSkillGridUI.__super.call(this);
	}

	__class(ZuoqiSkillGridUI,'ui.mobile.zuoqi.ZuoqiSkillGridUI',_super);
	var __proto=ZuoqiSkillGridUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zuoqi/ZuoqiSkillGrid");
	}

	return ZuoqiSkillGridUI;
})(View)


//class ui.mobile.advance.HuaxingViewUI extends laya.ui.View
var HuaxingViewUI=(function(_super){
	function HuaxingViewUI(){
		this.l_panel=null;
		this.allFight=null;
		this.nameImg=null;
		this.attrTxt=null;
		this.l_huan=null;
		this.timeTxt=null;
		this.timeTxt2=null;
		this.limitTxt=null;
		this.l_select=null;
		this.btnUPHH=null;
		this.btnUP=null;
		this.btn_total=null;
		HuaxingViewUI.__super.call(this);
	}

	__class(HuaxingViewUI,'ui.mobile.advance.HuaxingViewUI',_super);
	var __proto=HuaxingViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/advance/HuaxingView");
	}

	return HuaxingViewUI;
})(View)


//class ui.mobile.advance.SpecialComeOnEffectUI extends laya.ui.View
var SpecialComeOnEffectUI=(function(_super){
	function SpecialComeOnEffectUI(){
		this.txtBox=null;
		this.info_txt1=null;
		this.info_txt2=null;
		SpecialComeOnEffectUI.__super.call(this);
	}

	__class(SpecialComeOnEffectUI,'ui.mobile.advance.SpecialComeOnEffectUI',_super);
	var __proto=SpecialComeOnEffectUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/advance/SpecialComeOnEffect");
	}

	return SpecialComeOnEffectUI;
})(View)


//class ui.mobile.advance.SpecialComeOnItemUI extends laya.ui.View
var SpecialComeOnItemUI=(function(_super){
	function SpecialComeOnItemUI(){
		this.bg=null;
		this.imgUse=null;
		this.name_txt=null;
		this.bg_icon=null;
		this.icon=null;
		SpecialComeOnItemUI.__super.call(this);
	}

	__class(SpecialComeOnItemUI,'ui.mobile.advance.SpecialComeOnItemUI',_super);
	var __proto=SpecialComeOnItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/advance/SpecialComeOnItem");
	}

	return SpecialComeOnItemUI;
})(View)


//class ui.mobile.advance.SpecialComeOnViewUI extends laya.ui.View
var SpecialComeOnViewUI=(function(_super){
	function SpecialComeOnViewUI(){
		this.list=null;
		this.btn_way=null;
		this.btn=null;
		this.limitTxt=null;
		SpecialComeOnViewUI.__super.call(this);
	}

	__class(SpecialComeOnViewUI,'ui.mobile.advance.SpecialComeOnViewUI',_super);
	var __proto=SpecialComeOnViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/advance/SpecialComeOnView");
	}

	return SpecialComeOnViewUI;
})(View)


//class ui.mobile.advance.SpecialFasionTabViewUI extends laya.ui.View
var SpecialFasionTabViewUI=(function(_super){
	function SpecialFasionTabViewUI(){
		this.tabs=null;
		SpecialFasionTabViewUI.__super.call(this);
	}

	__class(SpecialFasionTabViewUI,'ui.mobile.advance.SpecialFasionTabViewUI',_super);
	var __proto=SpecialFasionTabViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/advance/SpecialFasionTabView");
	}

	return SpecialFasionTabViewUI;
})(View)


//class ui.mobile.advance.TitleItemUI extends laya.ui.View
var TitleItemUI=(function(_super){
	function TitleItemUI(){
		this.bg=null;
		this.wear=null;
		TitleItemUI.__super.call(this);
	}

	__class(TitleItemUI,'ui.mobile.advance.TitleItemUI',_super);
	var __proto=TitleItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/advance/TitleItem");
	}

	return TitleItemUI;
})(View)


//class ui.mobile.advance.TitleViewUI extends laya.ui.View
var TitleViewUI=(function(_super){
	function TitleViewUI(){
		this.yijihuo=null;
		this.p_list=null;
		this.txt=null;
		this.timeTxt=null;
		this.btn=null;
		this.btnWear=null;
		this.attr_List=null;
		this.skillTxt=null;
		this.btn_up=null;
		this.btn_total=null;
		TitleViewUI.__super.call(this);
	}

	__class(TitleViewUI,'ui.mobile.advance.TitleViewUI',_super);
	var __proto=TitleViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.advance.TitleAttrItemUI",TitleAttrItemUI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/advance/TitleView");
	}

	return TitleViewUI;
})(View)


//class ui.mobile.arena.ArenaFightItemUI extends laya.ui.View
var ArenaFightItemUI=(function(_super){
	function ArenaFightItemUI(){
		this.bg=null;
		this.avatarNode=null;
		this.playerNode=null;
		this.bg2=null;
		this.fightPower_txt=null;
		this.point_txt=null;
		this.specialNode=null;
		this.specail_txt=null;
		this.specialPoint_txt=null;
		this.name_txt=null;
		ArenaFightItemUI.__super.call(this);
	}

	__class(ArenaFightItemUI,'ui.mobile.arena.ArenaFightItemUI',_super);
	var __proto=ArenaFightItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/arena/ArenaFightItem");
	}

	return ArenaFightItemUI;
})(View)


//class ui.mobile.arena.ArenaGiftItemUI extends laya.ui.View
var ArenaGiftItemUI=(function(_super){
	function ArenaGiftItemUI(){
		this.title=null;
		this.btnBuy=null;
		this.xgTxt=null;
		this.pTxt=null;
		this.pIcon=null;
		this.yibuy=null;
		ArenaGiftItemUI.__super.call(this);
	}

	__class(ArenaGiftItemUI,'ui.mobile.arena.ArenaGiftItemUI',_super);
	var __proto=ArenaGiftItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/arena/ArenaGiftItem");
	}

	return ArenaGiftItemUI;
})(View)


//class ui.mobile.arena.ArenaGiftViewUI extends laya.ui.View
var ArenaGiftViewUI=(function(_super){
	function ArenaGiftViewUI(){
		this.bg=null;
		this.l_list=null;
		ArenaGiftViewUI.__super.call(this);
	}

	__class(ArenaGiftViewUI,'ui.mobile.arena.ArenaGiftViewUI',_super);
	var __proto=ArenaGiftViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/arena/ArenaGiftView");
	}

	return ArenaGiftViewUI;
})(View)


//class ui.mobile.arena.ArenaListItemUI extends laya.ui.View
var ArenaListItemUI=(function(_super){
	function ArenaListItemUI(){
		this.icon=null;
		this.btn=null;
		this.money_txt=null;
		this.name_txt=null;
		this.imgGet=null;
		ArenaListItemUI.__super.call(this);
	}

	__class(ArenaListItemUI,'ui.mobile.arena.ArenaListItemUI',_super);
	var __proto=ArenaListItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/arena/ArenaListItem");
	}

	return ArenaListItemUI;
})(View)


//class ui.mobile.arena.ArenaRankItemUI extends laya.ui.View
var ArenaRankItemUI=(function(_super){
	function ArenaRankItemUI(){
		this.bg_on=null;
		this.bg_off=null;
		this.point_txt=null;
		this.name_txt=null;
		this.imgNo=null;
		this.no_txt=null;
		ArenaRankItemUI.__super.call(this);
	}

	__class(ArenaRankItemUI,'ui.mobile.arena.ArenaRankItemUI',_super);
	var __proto=ArenaRankItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/arena/ArenaRankItem");
	}

	return ArenaRankItemUI;
})(View)


//class ui.mobile.arena.ArenaRankRewardItemUI extends laya.ui.View
var ArenaRankRewardItemUI=(function(_super){
	function ArenaRankRewardItemUI(){
		this.bg_on=null;
		this.bg_off=null;
		this.imgNo=null;
		this.no_txt=null;
		this.name_txt=null;
		this.point_txt=null;
		ArenaRankRewardItemUI.__super.call(this);
	}

	__class(ArenaRankRewardItemUI,'ui.mobile.arena.ArenaRankRewardItemUI',_super);
	var __proto=ArenaRankRewardItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/arena/ArenaRankRewardItem");
	}

	return ArenaRankRewardItemUI;
})(View)


//class ui.mobile.arena.ArenaShopDetailItemUI extends laya.ui.View
var ArenaShopDetailItemUI=(function(_super){
	function ArenaShopDetailItemUI(){
		this.grid=null;
		this.desc_txt=null;
		this.name_txt=null;
		this.cost_txt=null;
		this.add_btn=null;
		this.sub_btn=null;
		this.sub10_btn=null;
		this.add10_btn=null;
		this.buy_btn=null;
		this.icon3=null;
		this.money_txt3=null;
		this.txt=null;
		this.have_txt=null;
		ArenaShopDetailItemUI.__super.call(this);
	}

	__class(ArenaShopDetailItemUI,'ui.mobile.arena.ArenaShopDetailItemUI',_super);
	var __proto=ArenaShopDetailItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/arena/ArenaShopDetailItem");
	}

	return ArenaShopDetailItemUI;
})(View)


//class ui.mobile.arena.ArenaShopViewUI extends laya.ui.View
var ArenaShopViewUI=(function(_super){
	function ArenaShopViewUI(){
		this.bg=null;
		this.list=null;
		this.moneyNode=null;
		this.moneyIcon=null;
		this.money_txt=null;
		this.select_img=null;
		this.title=null;
		this.moneyNode2=null;
		this.moneyIcon2=null;
		this.money_txt2=null;
		ArenaShopViewUI.__super.call(this);
	}

	__class(ArenaShopViewUI,'ui.mobile.arena.ArenaShopViewUI',_super);
	var __proto=ArenaShopViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/arena/ArenaShopView");
	}

	return ArenaShopViewUI;
})(View)


//class ui.mobile.arena.ArenaPanelUI extends laya.ui.View
var ArenaPanelUI=(function(_super){
	function ArenaPanelUI(){
		this.bg=null;
		this.btn_point=null;
		this.btn_target=null;
		this.btn_refresh=null;
		this.btn_add=null;
		this.btn_rank=null;
		this.tipNode=null;
		this.money_txt=null;
		this.remaintimes_txt=null;
		this.addtimes_txt=null;
		this.point_txt=null;
		this.endtime_txt=null;
		this.myPoint_txt=null;
		this.myBest_txt=null;
		this.myRank_txt=null;
		this.rank_list=null;
		this.logNode=null;
		this.log_txt1=null;
		this.log_txt2=null;
		ArenaPanelUI.__super.call(this);
	}

	__class(ArenaPanelUI,'ui.mobile.arena.ArenaPanelUI',_super);
	var __proto=ArenaPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/arena/ArenaPanel");
	}

	return ArenaPanelUI;
})(View)


//class ui.mobile.bag.ChooseGiftItemUI extends laya.ui.View
var ChooseGiftItemUI=(function(_super){
	function ChooseGiftItemUI(){
		this.name_txt=null;
		this.num_txt=null;
		ChooseGiftItemUI.__super.call(this);
	}

	__class(ChooseGiftItemUI,'ui.mobile.bag.ChooseGiftItemUI',_super);
	var __proto=ChooseGiftItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/bag/ChooseGiftItem");
	}

	return ChooseGiftItemUI;
})(View)


//class ui.mobile.bag.quickuse.QuickUseItemUI extends laya.ui.View
var QuickUseItemUI=(function(_super){
	function QuickUseItemUI(){
		this.bg=null;
		this.name_txt=null;
		this.btn=null;
		QuickUseItemUI.__super.call(this);
	}

	__class(QuickUseItemUI,'ui.mobile.bag.quickuse.QuickUseItemUI',_super);
	var __proto=QuickUseItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/bag/quickuse/QuickUseItem");
	}

	return QuickUseItemUI;
})(View)


//class ui.mobile.baitan.item.BaitanItemUI extends laya.ui.View
var BaitanItemUI=(function(_super){
	function BaitanItemUI(){
		this.bg=null;
		this.nameTxt=null;
		BaitanItemUI.__super.call(this);
	}

	__class(BaitanItemUI,'ui.mobile.baitan.item.BaitanItemUI',_super);
	var __proto=BaitanItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/baitan/item/BaitanItem");
	}

	return BaitanItemUI;
})(View)


//class ui.mobile.baitan.item.BaitanShowItemUI extends laya.ui.View
var BaitanShowItemUI=(function(_super){
	function BaitanShowItemUI(){
		this.bg=null;
		this.gridCtn=null;
		this.moneyUrl=null;
		this.nameTxt=null;
		this.moneyTxt=null;
		this.btn=null;
		this.getted=null;
		BaitanShowItemUI.__super.call(this);
	}

	__class(BaitanShowItemUI,'ui.mobile.baitan.item.BaitanShowItemUI',_super);
	var __proto=BaitanShowItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/baitan/item/BaitanShowItem");
	}

	return BaitanShowItemUI;
})(View)


//class ui.mobile.baitan.item.MyBaitanItemUI extends laya.ui.View
var MyBaitanItemUI=(function(_super){
	function MyBaitanItemUI(){
		this.bg=null;
		this.gridCtn=null;
		this.itemSp=null;
		this.moneyUrl=null;
		this.nameTxt=null;
		this.moneyTxt=null;
		this.btn=null;
		this.noItemTxt=null;
		MyBaitanItemUI.__super.call(this);
	}

	__class(MyBaitanItemUI,'ui.mobile.baitan.item.MyBaitanItemUI',_super);
	var __proto=MyBaitanItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/baitan/item/MyBaitanItem");
	}

	return MyBaitanItemUI;
})(View)


//class ui.mobile.baitan.view.BaitanViewUI extends laya.ui.View
var BaitanViewUI=(function(_super){
	function BaitanViewUI(){
		this.list=null;
		this.btnLeft=null;
		this.btnGz=null;
		this.btnRight=null;
		this.pageTxt=null;
		this.moneyBox=null;
		this.moneyUrl=null;
		this.moneyTxt=null;
		BaitanViewUI.__super.call(this);
	}

	__class(BaitanViewUI,'ui.mobile.baitan.view.BaitanViewUI',_super);
	var __proto=BaitanViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/baitan/view/BaitanView");
	}

	return BaitanViewUI;
})(View)


//class ui.mobile.baitan.view.MyBaitanViewUI extends laya.ui.View
var MyBaitanViewUI=(function(_super){
	function MyBaitanViewUI(){
		this.list=null;
		this.btnBag=null;
		this.btn=null;
		this.checkBox=null;
		this.panel=null;
		this.timeTxt=null;
		MyBaitanViewUI.__super.call(this);
	}

	__class(MyBaitanViewUI,'ui.mobile.baitan.view.MyBaitanViewUI',_super);
	var __proto=MyBaitanViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/baitan/view/MyBaitanView");
	}

	return MyBaitanViewUI;
})(View)


//class ui.mobile.boss.act.ActListItemUI extends laya.ui.View
var ActListItemUI=(function(_super){
	function ActListItemUI(){
		this.bg=null;
		this.icon=null;
		this.txt=null;
		this.title=null;
		this.kuafu=null;
		this.runImg=null;
		this.bgMask=null;
		this.stateIcon=null;
		ActListItemUI.__super.call(this);
	}

	__class(ActListItemUI,'ui.mobile.boss.act.ActListItemUI',_super);
	var __proto=ActListItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/act/ActListItem");
	}

	return ActListItemUI;
})(View)


//class ui.mobile.boss.act.ActListViewUI extends laya.ui.View
var ActListViewUI=(function(_super){
	function ActListViewUI(){
		this.tabs=null;
		this.p_list=null;
		ActListViewUI.__super.call(this);
	}

	__class(ActListViewUI,'ui.mobile.boss.act.ActListViewUI',_super);
	var __proto=ActListViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/act/ActListView");
	}

	return ActListViewUI;
})(View)


//class ui.mobile.boss.drop.BossDropItemUI extends laya.ui.View
var BossDropItemUI=(function(_super){
	function BossDropItemUI(){
		this.timeTxt=null;
		this.itemTxt=null;
		BossDropItemUI.__super.call(this);
	}

	__class(BossDropItemUI,'ui.mobile.boss.drop.BossDropItemUI',_super);
	var __proto=BossDropItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/drop/BossDropItem");
	}

	return BossDropItemUI;
})(View)


//class ui.mobile.boss.drop.BossDropViewUI extends laya.ui.View
var BossDropViewUI=(function(_super){
	function BossDropViewUI(){
		this.bg=null;
		this.p_list=null;
		BossDropViewUI.__super.call(this);
	}

	__class(BossDropViewUI,'ui.mobile.boss.drop.BossDropViewUI',_super);
	var __proto=BossDropViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.boss.drop.BossDropItemUI",BossDropItemUI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/drop/BossDropView");
	}

	return BossDropViewUI;
})(View)


//class ui.mobile.boss.anzhishendian.AnZhiShenDianItemUI extends laya.ui.View
var AnZhiShenDianItemUI=(function(_super){
	function AnZhiShenDianItemUI(){
		this.touchNode=null;
		this.imgName=null;
		this.state_txt=null;
		this.lvFont=null;
		AnZhiShenDianItemUI.__super.call(this);
	}

	__class(AnZhiShenDianItemUI,'ui.mobile.boss.anzhishendian.AnZhiShenDianItemUI',_super);
	var __proto=AnZhiShenDianItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/anzhishendian/AnZhiShenDianItem");
	}

	return AnZhiShenDianItemUI;
})(View)


//class ui.mobile.boss.anzhishendian.AnZhiShenDianViewUI extends laya.ui.View
var AnZhiShenDianViewUI=(function(_super){
	function AnZhiShenDianViewUI(){
		this.num_txt=null;
		this.remind_txt=null;
		this.check_remind=null;
		this.btn_one=null;
		AnZhiShenDianViewUI.__super.call(this);
	}

	__class(AnZhiShenDianViewUI,'ui.mobile.boss.anzhishendian.AnZhiShenDianViewUI',_super);
	var __proto=AnZhiShenDianViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/anzhishendian/AnZhiShenDianView");
	}

	return AnZhiShenDianViewUI;
})(View)


//class ui.mobile.boss.fuli.FuLiBossItemUI extends laya.ui.View
var FuLiBossItemUI=(function(_super){
	function FuLiBossItemUI(){
		this.bg=null;
		this.name_txt=null;
		this.state_txt=null;
		FuLiBossItemUI.__super.call(this);
	}

	__class(FuLiBossItemUI,'ui.mobile.boss.fuli.FuLiBossItemUI',_super);
	var __proto=FuLiBossItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/fuli/FuLiBossItem");
	}

	return FuLiBossItemUI;
})(View)


//class ui.mobile.boss.fuli.FuLiBossTrackUI extends laya.ui.View
var FuLiBossTrackUI=(function(_super){
	function FuLiBossTrackUI(){
		this.bg=null;
		this.titleBox=null;
		this.title=null;
		this.playerTxt=null;
		this.name_txt=null;
		this.state_txt=null;
		this.num_txt=null;
		this.des_txt=null;
		this.btn_out=null;
		this.btnExit=null;
		this.btnHide=null;
		FuLiBossTrackUI.__super.call(this);
	}

	__class(FuLiBossTrackUI,'ui.mobile.boss.fuli.FuLiBossTrackUI',_super);
	var __proto=FuLiBossTrackUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/fuli/FuLiBossTrack");
	}

	return FuLiBossTrackUI;
})(View)


//class ui.mobile.boss.fuli.FuLiBossPanelUI extends laya.ui.View
var FuLiBossPanelUI=(function(_super){
	function FuLiBossPanelUI(){
		this.imgTitle=null;
		this.owner_txt=null;
		this.time_txt=null;
		this.reward_txt=null;
		this.name_txt=null;
		this.lv_txt=null;
		this.btn_add=null;
		this.btn_go=null;
		this.imgTip=null;
		this.check_remind=null;
		this.list=null;
		this.avatarNode=null;
		this.imgLv=null;
		this.imgHelp=null;
		this.bg_boss=null;
		this.imgBar=null;
		this.hp_txt=null;
		this.boss_txt=null;
		this.btn_sweep=null;
		FuLiBossPanelUI.__super.call(this);
	}

	__class(FuLiBossPanelUI,'ui.mobile.boss.fuli.FuLiBossPanelUI',_super);
	var __proto=FuLiBossPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/fuli/FuLiBossPanel");
	}

	return FuLiBossPanelUI;
})(View)


//class ui.mobile.boss.jitan.ZuojiJitanHeadUI extends laya.ui.View
var ZuojiJitanHeadUI=(function(_super){
	function ZuojiJitanHeadUI(){
		this.bg=null;
		this.timeTxt=null;
		this.nameTxt=null;
		this.lvTxt=null;
		ZuojiJitanHeadUI.__super.call(this);
	}

	__class(ZuojiJitanHeadUI,'ui.mobile.boss.jitan.ZuojiJitanHeadUI',_super);
	var __proto=ZuojiJitanHeadUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/jitan/ZuojiJitanHead");
	}

	return ZuojiJitanHeadUI;
})(View)


//class ui.mobile.boss.lianyu.BossLianyuViewUI extends laya.ui.View
var BossLianyuViewUI=(function(_super){
	function BossLianyuViewUI(){
		this.bg=null;
		this.select4=null;
		this.select3=null;
		this.select0=null;
		this.select2=null;
		this.select1=null;
		this.tabs_line1=null;
		this.tabs_line2=null;
		this.btnGou=null;
		this.btnEnter=null;
		this.hourFullImg=null;
		this.tipBox=null;
		this.tabs_panel=null;
		this.tabs=null;
		this.star_box=null;
		this.act_box=null;
		this.act_bg=null;
		this.act_item=null;
		this.act_btn=null;
		this.act_getted=null;
		this.desc_txt=null;
		BossLianyuViewUI.__super.call(this);
	}

	__class(BossLianyuViewUI,'ui.mobile.boss.lianyu.BossLianyuViewUI',_super);
	var __proto=BossLianyuViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/lianyu/BossLianyuView");
	}

	return BossLianyuViewUI;
})(View)


//class ui.mobile.boss.lianyu.LianyuHeadUI extends laya.ui.View
var LianyuHeadUI=(function(_super){
	function LianyuHeadUI(){
		this.bg=null;
		this.lvTxt=null;
		this.nameTxt=null;
		this.cishuTxt=null;
		this.timeTxt=null;
		this.yijisha=null;
		LianyuHeadUI.__super.call(this);
	}

	__class(LianyuHeadUI,'ui.mobile.boss.lianyu.LianyuHeadUI',_super);
	var __proto=LianyuHeadUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/lianyu/LianyuHead");
	}

	return LianyuHeadUI;
})(View)


//class ui.mobile.boss.shanggujindi.ShangGuJinDiBossItemUI extends laya.ui.View
var ShangGuJinDiBossItemUI=(function(_super){
	function ShangGuJinDiBossItemUI(){
		this.bg=null;
		this.bg_item=null;
		this.icon=null;
		this.name_txt=null;
		this.state_txt=null;
		this.num_txt=null;
		this.imgOK=null;
		ShangGuJinDiBossItemUI.__super.call(this);
	}

	__class(ShangGuJinDiBossItemUI,'ui.mobile.boss.shanggujindi.ShangGuJinDiBossItemUI',_super);
	var __proto=ShangGuJinDiBossItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/shanggujindi/ShangGuJinDiBossItem");
	}

	return ShangGuJinDiBossItemUI;
})(View)


//class ui.mobile.boss.shanggujindi.ShangGuJinDiMenuItemUI extends laya.ui.View
var ShangGuJinDiMenuItemUI=(function(_super){
	function ShangGuJinDiMenuItemUI(){
		this.bg=null;
		this.imgKF=null;
		this.name_txt=null;
		this.imgNo=null;
		this.tip_txt=null;
		ShangGuJinDiMenuItemUI.__super.call(this);
	}

	__class(ShangGuJinDiMenuItemUI,'ui.mobile.boss.shanggujindi.ShangGuJinDiMenuItemUI',_super);
	var __proto=ShangGuJinDiMenuItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/shanggujindi/ShangGuJinDiMenuItem");
	}

	return ShangGuJinDiMenuItemUI;
})(View)


//class ui.mobile.boss.shanggujindi.ShangGuJinDiViewUI extends laya.ui.View
var ShangGuJinDiViewUI=(function(_super){
	function ShangGuJinDiViewUI(){
		this.avatarNode=null;
		this.btn_go=null;
		this.check_remind=null;
		this.list_boss=null;
		this.list_menu=null;
		this.name_txt=null;
		this.num_txt=null;
		this.imgNo=null;
		this.no_txt=null;
		ShangGuJinDiViewUI.__super.call(this);
	}

	__class(ShangGuJinDiViewUI,'ui.mobile.boss.shanggujindi.ShangGuJinDiViewUI',_super);
	var __proto=ShangGuJinDiViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/shanggujindi/ShangGuJinDiView");
	}

	return ShangGuJinDiViewUI;
})(View)


//class ui.mobile.boss.wanfa.WanfaIconUI extends laya.ui.View
var WanfaIconUI=(function(_super){
	function WanfaIconUI(){
		this.bg=null;
		this.jiaobiao=null;
		this.txtBox=null;
		this.txt0=null;
		this.txt1=null;
		this.txt2=null;
		this.txt3=null;
		WanfaIconUI.__super.call(this);
	}

	__class(WanfaIconUI,'ui.mobile.boss.wanfa.WanfaIconUI',_super);
	var __proto=WanfaIconUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/wanfa/WanfaIcon");
	}

	return WanfaIconUI;
})(View)


//class ui.mobile.boss.wanfa.WanfaViewUI extends laya.ui.View
var WanfaViewUI=(function(_super){
	function WanfaViewUI(){
		this.p_panel=null;
		this.bg=null;
		this.btnWF3=null;
		this.btnWF2=null;
		this.btnWF1_bg=null;
		this.btnWF1=null;
		this.wf_txt1=null;
		this.wf_txt2=null;
		this.wf_txt3=null;
		WanfaViewUI.__super.call(this);
	}

	__class(WanfaViewUI,'ui.mobile.boss.wanfa.WanfaViewUI',_super);
	var __proto=WanfaViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/wanfa/WanfaView");
	}

	return WanfaViewUI;
})(View)


//class ui.mobile.boss.wanyao.WanyaoHeadUI extends laya.ui.View
var WanyaoHeadUI=(function(_super){
	function WanyaoHeadUI(){
		this.nameTxt=null;
		this.lvTxt=null;
		this.timeTxt=null;
		WanyaoHeadUI.__super.call(this);
	}

	__class(WanyaoHeadUI,'ui.mobile.boss.wanyao.WanyaoHeadUI',_super);
	var __proto=WanyaoHeadUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/wanyao/WanyaoHead");
	}

	return WanyaoHeadUI;
})(View)


//class ui.mobile.boss.xinxi.BossXinxiItemUI extends laya.ui.View
var BossXinxiItemUI=(function(_super){
	function BossXinxiItemUI(){
		this.nameTxt=null;
		this.conTxt=null;
		this.numTxt=null;
		this.quzhaohuan=null;
		this.guaji_img=null;
		BossXinxiItemUI.__super.call(this);
	}

	__class(BossXinxiItemUI,'ui.mobile.boss.xinxi.BossXinxiItemUI',_super);
	var __proto=BossXinxiItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/xinxi/BossXinxiItem");
	}

	return BossXinxiItemUI;
})(View)


//class ui.mobile.boss.xinxi.BossXinxiTabUI extends laya.ui.View
var BossXinxiTabUI=(function(_super){
	function BossXinxiTabUI(){
		this.head=null;
		this.nameTxt=null;
		this.numTxt=null;
		this.levelTxt=null;
		this.jiebg=null;
		this.jieFont=null;
		this.guaji_img=null;
		BossXinxiTabUI.__super.call(this);
	}

	__class(BossXinxiTabUI,'ui.mobile.boss.xinxi.BossXinxiTabUI',_super);
	var __proto=BossXinxiTabUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/xinxi/BossXinxiTab");
	}

	return BossXinxiTabUI;
})(View)


//class ui.mobile.boss.xinxi.BossXinxiViewUI extends laya.ui.View
var BossXinxiViewUI=(function(_super){
	function BossXinxiViewUI(){
		this.bg=null;
		this.tabs=null;
		this.timeTxt=null;
		this.d_list0=null;
		this.l_list=null;
		this.d_list1=null;
		this.d_list2=null;
		this.gotoMask1=null;
		this.gotoBtn1=null;
		this.gotoMask0=null;
		this.gotoBtn0=null;
		BossXinxiViewUI.__super.call(this);
	}

	__class(BossXinxiViewUI,'ui.mobile.boss.xinxi.BossXinxiViewUI',_super);
	var __proto=BossXinxiViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/xinxi/BossXinxiView");
	}

	return BossXinxiViewUI;
})(View)


//class ui.mobile.boss.yijie.YijieRuqinHeadUI extends laya.ui.View
var YijieRuqinHeadUI=(function(_super){
	function YijieRuqinHeadUI(){
		this.icon=null;
		this.yijisha=null;
		YijieRuqinHeadUI.__super.call(this);
	}

	__class(YijieRuqinHeadUI,'ui.mobile.boss.yijie.YijieRuqinHeadUI',_super);
	var __proto=YijieRuqinHeadUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/yijie/YijieRuqinHead");
	}

	return YijieRuqinHeadUI;
})(View)


//class ui.mobile.comp.AutoBuyDrugUI extends laya.ui.View
var AutoBuyDrugUI=(function(_super){
	function AutoBuyDrugUI(){
		this.jihuo_txt=null;
		this.jihuo_btn=null;
		this.check=null;
		AutoBuyDrugUI.__super.call(this);
	}

	__class(AutoBuyDrugUI,'ui.mobile.comp.AutoBuyDrugUI',_super);
	var __proto=AutoBuyDrugUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/comp/AutoBuyDrug");
	}

	return AutoBuyDrugUI;
})(View)


//class ui.mobile.main.PanelLoaderUI extends laya.ui.View
var PanelLoaderUI=(function(_super){
	function PanelLoaderUI(){
		this.bg=null;
		this.bar=null;
		this.txt=null;
		PanelLoaderUI.__super.call(this);
	}

	__class(PanelLoaderUI,'ui.mobile.main.PanelLoaderUI',_super);
	var __proto=PanelLoaderUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/PanelLoader");
	}

	return PanelLoaderUI;
})(View)


//class ui.mobile.country.huangcheng.HuangchengJifenItemUI extends laya.ui.View
var HuangchengJifenItemUI=(function(_super){
	function HuangchengJifenItemUI(){
		this.txt=null;
		this.yilingqu=null;
		HuangchengJifenItemUI.__super.call(this);
	}

	__class(HuangchengJifenItemUI,'ui.mobile.country.huangcheng.HuangchengJifenItemUI',_super);
	var __proto=HuangchengJifenItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/country/huangcheng/HuangchengJifenItem");
	}

	return HuangchengJifenItemUI;
})(View)


//class ui.mobile.country.huangcheng.HuangchengRewardItemUI extends laya.ui.View
var HuangchengRewardItemUI=(function(_super){
	function HuangchengRewardItemUI(){
		this.img1=null;
		this.img2=null;
		HuangchengRewardItemUI.__super.call(this);
	}

	__class(HuangchengRewardItemUI,'ui.mobile.country.huangcheng.HuangchengRewardItemUI',_super);
	var __proto=HuangchengRewardItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/country/huangcheng/HuangchengRewardItem");
	}

	return HuangchengRewardItemUI;
})(View)


//class ui.mobile.country.huangcheng.HuangchengZhanViewUI extends laya.ui.View
var HuangchengZhanViewUI=(function(_super){
	function HuangchengZhanViewUI(){
		this.bg=null;
		this.btn1=null;
		this.btn2=null;
		this.timeTxt=null;
		this.guildNameLab=null;
		this.cn2=null;
		this.yingzi2=null;
		this.role_box2=null;
		this.cn1=null;
		this.yingzi1=null;
		this.role_box1=null;
		this.cn0=null;
		this.yingzi0=null;
		this.role_box0=null;
		this.nameTxt1=null;
		this.nameTxt2=null;
		this.nameTxt0=null;
		HuangchengZhanViewUI.__super.call(this);
	}

	__class(HuangchengZhanViewUI,'ui.mobile.country.huangcheng.HuangchengZhanViewUI',_super);
	var __proto=HuangchengZhanViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/country/huangcheng/HuangchengZhanView");
	}

	return HuangchengZhanViewUI;
})(View)


//class ui.mobile.cqroad.CQRoadOpenViewUI extends laya.ui.View
var CQRoadOpenViewUI=(function(_super){
	function CQRoadOpenViewUI(){
		this.txt=null;
		this.mazk=null;
		this.btn=null;
		CQRoadOpenViewUI.__super.call(this);
	}

	__class(CQRoadOpenViewUI,'ui.mobile.cqroad.CQRoadOpenViewUI',_super);
	var __proto=CQRoadOpenViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/cqroad/CQRoadOpenView");
	}

	return CQRoadOpenViewUI;
})(View)


//class ui.mobile.cqroad.CQRoadTaskItemUI extends laya.ui.View
var CQRoadTaskItemUI=(function(_super){
	function CQRoadTaskItemUI(){
		this.bg=null;
		this.icon=null;
		this.line=null;
		this.lock=null;
		this.finish=null;
		this.itemBox=null;
		this.txt1=null;
		this.txt2=null;
		this.txt3=null;
		CQRoadTaskItemUI.__super.call(this);
	}

	__class(CQRoadTaskItemUI,'ui.mobile.cqroad.CQRoadTaskItemUI',_super);
	var __proto=CQRoadTaskItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/cqroad/CQRoadTaskItem");
	}

	return CQRoadTaskItemUI;
})(View)


//class ui.mobile.cqroad.CQRoadTaskViewUI extends laya.ui.View
var CQRoadTaskViewUI=(function(_super){
	function CQRoadTaskViewUI(){
		this.grid=null;
		this.bar=null;
		this.yilingqu=null;
		this.selected_img=null;
		this.btn0=null;
		this.btn1=null;
		this.btn2=null;
		this.btn3=null;
		this.btn4=null;
		this.pro_txt=null;
		this.tab=null;
		this.lock2=null;
		this.lock1=null;
		this.lock0=null;
		CQRoadTaskViewUI.__super.call(this);
	}

	__class(CQRoadTaskViewUI,'ui.mobile.cqroad.CQRoadTaskViewUI',_super);
	var __proto=CQRoadTaskViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/cqroad/CQRoadTaskView");
	}

	return CQRoadTaskViewUI;
})(View)


//class ui.mobile.daily.ActivityOpenHintUI extends laya.ui.View
var ActivityOpenHintUI=(function(_super){
	function ActivityOpenHintUI(){
		this.window=null;
		this.timeTxt=null;
		this.title=null;
		this.btnGo=null;
		this.nameTxt=null;
		ActivityOpenHintUI.__super.call(this);
	}

	__class(ActivityOpenHintUI,'ui.mobile.daily.ActivityOpenHintUI',_super);
	var __proto=ActivityOpenHintUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/daily/ActivityOpenHint");
	}

	return ActivityOpenHintUI;
})(View)


//class ui.mobile.daily.DailyViewUI extends laya.ui.View
var DailyViewUI=(function(_super){
	function DailyViewUI(){
		this.bar=null;
		this.d_list=null;
		DailyViewUI.__super.call(this);
	}

	__class(DailyViewUI,'ui.mobile.daily.DailyViewUI',_super);
	var __proto=DailyViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/daily/DailyView");
	}

	return DailyViewUI;
})(View)


//class ui.mobile.daily.DailyGridUI extends laya.ui.View
var DailyGridUI=(function(_super){
	function DailyGridUI(){
		this.bg=null;
		this.txt=null;
		this.yilingqu=null;
		DailyGridUI.__super.call(this);
	}

	__class(DailyGridUI,'ui.mobile.daily.DailyGridUI',_super);
	var __proto=DailyGridUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/daily/DailyGrid");
	}

	return DailyGridUI;
})(View)


//class ui.mobile.daily.DailyGrid2UI extends laya.ui.View
var DailyGrid2UI=(function(_super){
	function DailyGrid2UI(){
		this.txt=null;
		this.yilingqu1=null;
		this.yilingqu2=null;
		DailyGrid2UI.__super.call(this);
	}

	__class(DailyGrid2UI,'ui.mobile.daily.DailyGrid2UI',_super);
	var __proto=DailyGrid2UI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/daily/DailyGrid2");
	}

	return DailyGrid2UI;
})(View)


//class ui.mobile.daily.DailyItemUI extends laya.ui.View
var DailyItemUI=(function(_super){
	function DailyItemUI(){
		this.bg=null;
		this.has_img=null;
		this.get_txt=null;
		this.des_txt=null;
		this.time_txt=null;
		this.btnGo=null;
		this.icon=null;
		this.name_txt=null;
		DailyItemUI.__super.call(this);
	}

	__class(DailyItemUI,'ui.mobile.daily.DailyItemUI',_super);
	var __proto=DailyItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/daily/DailyItem");
	}

	return DailyItemUI;
})(View)


//class ui.mobile.daily.kuafuTask.KuafuAwardTipUI extends laya.ui.View
var KuafuAwardTipUI=(function(_super){
	function KuafuAwardTipUI(){
		this.title=null;
		this.descTxt=null;
		KuafuAwardTipUI.__super.call(this);
	}

	__class(KuafuAwardTipUI,'ui.mobile.daily.kuafuTask.KuafuAwardTipUI',_super);
	var __proto=KuafuAwardTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/daily/kuafuTask/KuafuAwardTip");
	}

	return KuafuAwardTipUI;
})(View)


//class ui.mobile.daily.kuafuTask.KuafuFuliItemUI extends laya.ui.View
var KuafuFuliItemUI=(function(_super){
	function KuafuFuliItemUI(){
		this.bg=null;
		this.descBg=null;
		this.btn=null;
		this.getted=null;
		this.descTxt=null;
		this.countTxt=null;
		KuafuFuliItemUI.__super.call(this);
	}

	__class(KuafuFuliItemUI,'ui.mobile.daily.kuafuTask.KuafuFuliItemUI',_super);
	var __proto=KuafuFuliItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/daily/kuafuTask/KuafuFuliItem");
	}

	return KuafuFuliItemUI;
})(View)


//class ui.mobile.daily.kuafuTask.KuafuTaskBoxUI extends laya.ui.View
var KuafuTaskBoxUI=(function(_super){
	function KuafuTaskBoxUI(){
		this.icon=null;
		this.numTxt=null;
		this.getted=null;
		KuafuTaskBoxUI.__super.call(this);
	}

	__class(KuafuTaskBoxUI,'ui.mobile.daily.kuafuTask.KuafuTaskBoxUI',_super);
	var __proto=KuafuTaskBoxUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/daily/kuafuTask/KuafuTaskBox");
	}

	return KuafuTaskBoxUI;
})(View)


//class ui.mobile.daily.kuafuTask.KuafuTaskItemUI extends laya.ui.View
var KuafuTaskItemUI=(function(_super){
	function KuafuTaskItemUI(){
		this.descTxt=null;
		this.countTxt=null;
		this.numTxt=null;
		this.btn=null;
		this.getted=null;
		this.split=null;
		KuafuTaskItemUI.__super.call(this);
	}

	__class(KuafuTaskItemUI,'ui.mobile.daily.kuafuTask.KuafuTaskItemUI',_super);
	var __proto=KuafuTaskItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/daily/kuafuTask/KuafuTaskItem");
	}

	return KuafuTaskItemUI;
})(View)


//class ui.mobile.daily.kuafuTask.KuafuTaskViewUI extends laya.ui.View
var KuafuTaskViewUI=(function(_super){
	function KuafuTaskViewUI(){
		this.pro=null;
		this.fuliImg=null;
		this.numTxt=null;
		this.weekNumTxt=null;
		this.list=null;
		KuafuTaskViewUI.__super.call(this);
	}

	__class(KuafuTaskViewUI,'ui.mobile.daily.kuafuTask.KuafuTaskViewUI',_super);
	var __proto=KuafuTaskViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/daily/kuafuTask/KuafuTaskView");
	}

	return KuafuTaskViewUI;
})(View)


//class ui.mobile.daily.LiemorenViewUI extends laya.ui.View
var LiemorenViewUI=(function(_super){
	function LiemorenViewUI(){
		this.descTxt=null;
		this.list=null;
		this.btnAuto=null;
		this.itemTxt=null;
		this.btnGo=null;
		LiemorenViewUI.__super.call(this);
	}

	__class(LiemorenViewUI,'ui.mobile.daily.LiemorenViewUI',_super);
	var __proto=LiemorenViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.daily.LiemorenItemUI",LiemorenItemUI);
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/daily/LiemorenView");
	}

	return LiemorenViewUI;
})(View)


//class ui.mobile.daily.TuoguanViewUI extends laya.ui.View
var TuoguanViewUI=(function(_super){
	function TuoguanViewUI(){
		this.money_txt=null;
		this.time_txt=null;
		this.grid=null;
		this.bc_combo=null;
		this.money_icon=null;
		this.btn1=null;
		this.btn2=null;
		this.yilingqu=null;
		this.list=null;
		TuoguanViewUI.__super.call(this);
	}

	__class(TuoguanViewUI,'ui.mobile.daily.TuoguanViewUI',_super);
	var __proto=TuoguanViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.daily.TuoguanItemUI",TuoguanItemUI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/daily/TuoguanView");
	}

	return TuoguanViewUI;
})(View)


//class ui.mobile.duanzao.fenjie.FenJieHunhuanViewUI extends laya.ui.View
var FenJieHunhuanViewUI=(function(_super){
	function FenJieHunhuanViewUI(){
		this.bag_list=null;
		this.choose_list=null;
		this.title_txt1=null;
		this.title_txt2=null;
		this.title_txt3=null;
		this.vip_txt=null;
		this.set_txt=null;
		this.btn=null;
		this.check_click=null;
		this.check_auto=null;
		this.btnRank=null;
		FenJieHunhuanViewUI.__super.call(this);
	}

	__class(FenJieHunhuanViewUI,'ui.mobile.duanzao.fenjie.FenJieHunhuanViewUI',_super);
	var __proto=FenJieHunhuanViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/fenjie/FenJieHunhuanView");
	}

	return FenJieHunhuanViewUI;
})(View)


//class ui.mobile.duanzao.fenjie.FenJieItemUI extends laya.ui.View
var FenJieItemUI=(function(_super){
	function FenJieItemUI(){
		this.bg=null;
		this.imgSelected=null;
		FenJieItemUI.__super.call(this);
	}

	__class(FenJieItemUI,'ui.mobile.duanzao.fenjie.FenJieItemUI',_super);
	var __proto=FenJieItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/fenjie/FenJieItem");
	}

	return FenJieItemUI;
})(View)


//class ui.mobile.duanzao.fenjie.FenJieSettingItemUI extends laya.ui.View
var FenJieSettingItemUI=(function(_super){
	function FenJieSettingItemUI(){
		this.check_1=null;
		this.check_2=null;
		this.check_3=null;
		this.name_txt=null;
		this.quality_txt1=null;
		this.quality_txt2=null;
		this.quality_txt3=null;
		this.line=null;
		FenJieSettingItemUI.__super.call(this);
	}

	__class(FenJieSettingItemUI,'ui.mobile.duanzao.fenjie.FenJieSettingItemUI',_super);
	var __proto=FenJieSettingItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/fenjie/FenJieSettingItem");
	}

	return FenJieSettingItemUI;
})(View)


//class ui.mobile.duanzao.fenjie.FenJieViewUI extends laya.ui.View
var FenJieViewUI=(function(_super){
	function FenJieViewUI(){
		this.bg=null;
		this.tabs=null;
		FenJieViewUI.__super.call(this);
	}

	__class(FenJieViewUI,'ui.mobile.duanzao.fenjie.FenJieViewUI',_super);
	var __proto=FenJieViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/fenjie/FenJieView");
	}

	return FenJieViewUI;
})(View)


//class ui.mobile.duanzao.hecheng.EquipStarItemUI extends laya.ui.View
var EquipStarItemUI=(function(_super){
	function EquipStarItemUI(){
		this.imgMoney=null;
		this.btn=null;
		this.num_txt1=null;
		this.num_txt2=null;
		this.name_txt1=null;
		this.name_txt2=null;
		this.name_txt3=null;
		this.success_txt=null;
		this.money_txt=null;
		this.btn_bb=null;
		EquipStarItemUI.__super.call(this);
	}

	__class(EquipStarItemUI,'ui.mobile.duanzao.hecheng.EquipStarItemUI',_super);
	var __proto=EquipStarItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/hecheng/EquipStarItem");
	}

	return EquipStarItemUI;
})(View)


//class ui.mobile.duanzao.hecheng.EquipStarPartItemUI extends laya.ui.View
var EquipStarPartItemUI=(function(_super){
	function EquipStarPartItemUI(){
		this.name_txt=null;
		EquipStarPartItemUI.__super.call(this);
	}

	__class(EquipStarPartItemUI,'ui.mobile.duanzao.hecheng.EquipStarPartItemUI',_super);
	var __proto=EquipStarPartItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/hecheng/EquipStarPartItem");
	}

	return EquipStarPartItemUI;
})(View)


//class ui.mobile.duanzao.hecheng.EquipStarViewUI extends laya.ui.View
var EquipStarViewUI=(function(_super){
	function EquipStarViewUI(){
		this.bg=null;
		this.list_item=null;
		this.list_part=null;
		this.tip_txt=null;
		this.imgVip=null;
		this.vip_txt=null;
		this.btn_go=null;
		this.singleNode=null;
		this.name_txt=null;
		this.success_txt=null;
		this.money_txt=null;
		this.num_txt=null;
		this.imgMoney=null;
		this.btn=null;
		this.btn_bb=null;
		this.channelNode=null;
		this.btn_world=null;
		this.btn_team=null;
		this.btn_guild=null;
		this.stoneNode=null;
		this.check_stone=null;
		this.stone_txt=null;
		this.stoneNum_txt=null;
		this.autoNode=null;
		this.auto_ck=null;
		this.auto_btn=null;
		EquipStarViewUI.__super.call(this);
	}

	__class(EquipStarViewUI,'ui.mobile.duanzao.hecheng.EquipStarViewUI',_super);
	var __proto=EquipStarViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/hecheng/EquipStarView");
	}

	return EquipStarViewUI;
})(View)


//class ui.mobile.duanzao.hecheng.HechengViewUI extends laya.ui.View
var HechengViewUI=(function(_super){
	function HechengViewUI(){
		this.box0=null;
		this.pro0=null;
		this.grid0=null;
		this.get0=null;
		this.yi_wear0=null;
		this.box1=null;
		this.pro1=null;
		this.grid1=null;
		this.get1=null;
		this.yi_wear1=null;
		this.count_box=null;
		this.add_btn=null;
		this.sub_btn=null;
		this.max_btn=null;
		this.inputTxt=null;
		this.get2=null;
		this.get4=null;
		this.get3=null;
		this.pro3=null;
		this.pro2=null;
		this.pro4=null;
		this.grid=null;
		this.grid2=null;
		this.grid3=null;
		this.grid4=null;
		this.lock2=null;
		this.lock4=null;
		this.lock3=null;
		this.limitBox=null;
		this.limitTxt=null;
		this.jia2=null;
		this.jia3=null;
		this.jia4=null;
		this.btnAuto=null;
		this.btn=null;
		this.ck1=null;
		this.ck2=null;
		this.chenggongBox=null;
		this.chenggongTxt=null;
		this.shibai_addTxt=null;
		this.name_txt=null;
		this.yi_wear2=null;
		this.yi_wear3=null;
		this.yi_wear4=null;
		HechengViewUI.__super.call(this);
	}

	__class(HechengViewUI,'ui.mobile.duanzao.hecheng.HechengViewUI',_super);
	var __proto=HechengViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/hecheng/HechengView");
	}

	return HechengViewUI;
})(View)


//class ui.mobile.duanzao.hecheng.YaohuViewUI extends laya.ui.View
var YaohuViewUI=(function(_super){
	function YaohuViewUI(){
		this.bg=null;
		this.box0=null;
		this.pro0=null;
		this.grid0=null;
		this.get0=null;
		this.box1=null;
		this.pro1=null;
		this.grid1=null;
		this.get1=null;
		this.lock1=null;
		this.name_txt=null;
		this.l_txt=null;
		this.l_title=null;
		this.r_txt=null;
		this.descTxt=null;
		this.btn=null;
		YaohuViewUI.__super.call(this);
	}

	__class(YaohuViewUI,'ui.mobile.duanzao.hecheng.YaohuViewUI',_super);
	var __proto=YaohuViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/hecheng/YaohuView");
	}

	return YaohuViewUI;
})(View)


//class ui.mobile.duanzao.hecheng.YishouHcViewUI extends laya.ui.View
var YishouHcViewUI=(function(_super){
	function YishouHcViewUI(){
		this.grid2=null;
		this.grid0=null;
		this.grid1=null;
		this.btnUP=null;
		this.c_txt=null;
		this.c_icon=null;
		YishouHcViewUI.__super.call(this);
	}

	__class(YishouHcViewUI,'ui.mobile.duanzao.hecheng.YishouHcViewUI',_super);
	var __proto=YishouHcViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/hecheng/YishouHcView");
	}

	return YishouHcViewUI;
})(View)


//class ui.mobile.duanzao.jinglian.JinglianItemUI extends laya.ui.View
var JinglianItemUI=(function(_super){
	function JinglianItemUI(){
		this.equip_item=null;
		this.equip_name=null;
		this.equip_type=null;
		this.equip_level=null;
		JinglianItemUI.__super.call(this);
	}

	__class(JinglianItemUI,'ui.mobile.duanzao.jinglian.JinglianItemUI',_super);
	var __proto=JinglianItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/jinglian/JinglianItem");
	}

	return JinglianItemUI;
})(View)


//class ui.mobile.duanzao.jinglian.JinglianViewUI extends laya.ui.View
var JinglianViewUI=(function(_super){
	function JinglianViewUI(){
		this.attr_box=null;
		this.max_txt=null;
		this.left_panel=null;
		this.attr0=null;
		this.next_attr_box=null;
		this.next_max_txt=null;
		this.right_panel=null;
		this.next_attr0=null;
		this.cailiao_box=null;
		this.btn=null;
		this.cost_txt=null;
		this.need_icon=null;
		this.need_num=null;
		this.grid_select=null;
		this.grid=null;
		this.all_btn=null;
		this.tabBtn=null;
		this.tab_one=null;
		this.list_menu=null;
		this.tip_img=null;
		this.part_img=null;
		this.star_box=null;
		JinglianViewUI.__super.call(this);
	}

	__class(JinglianViewUI,'ui.mobile.duanzao.jinglian.JinglianViewUI',_super);
	var __proto=JinglianViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/jinglian/JinglianView");
	}

	return JinglianViewUI;
})(View)


//class ui.mobile.duanzao.newQiangHua.NewQianghuaItemUI extends laya.ui.View
var NewQianghuaItemUI=(function(_super){
	function NewQianghuaItemUI(){
		this.equip_item=null;
		this.equip_name=null;
		this.equip_type=null;
		this.equip_level=null;
		NewQianghuaItemUI.__super.call(this);
	}

	__class(NewQianghuaItemUI,'ui.mobile.duanzao.newQiangHua.NewQianghuaItemUI',_super);
	var __proto=NewQianghuaItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/newQiangHua/NewQianghuaItem");
	}

	return NewQianghuaItemUI;
})(View)


//class ui.mobile.duanzao.newQiangHua.NewQianghuaViewUI extends laya.ui.View
var NewQianghuaViewUI=(function(_super){
	function NewQianghuaViewUI(){
		this.attr_box=null;
		this.attr0=null;
		this.next_attr_box=null;
		this.next_attr0=null;
		this.cailiao_box=null;
		this.btn=null;
		this.cost_txt=null;
		this.need_icon=null;
		this.need_num=null;
		this.grid_select=null;
		this.grid=null;
		this.name_txt=null;
		this.all_btn=null;
		this.tabBtn=null;
		this.tab_one=null;
		this.list_menu=null;
		this.tip_img=null;
		this.level_img=null;
		this.level_num=null;
		NewQianghuaViewUI.__super.call(this);
	}

	__class(NewQianghuaViewUI,'ui.mobile.duanzao.newQiangHua.NewQianghuaViewUI',_super);
	var __proto=NewQianghuaViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/newQiangHua/NewQianghuaView");
	}

	return NewQianghuaViewUI;
})(View)


//class ui.mobile.duanzao.tianshen.TianshenItemTipUI extends laya.ui.View
var TianshenItemTipUI=(function(_super){
	function TianshenItemTipUI(){
		this.bg=null;
		this.box_add=null;
		this.p_panel1=null;
		this.nameImg=null;
		this.p_panel0=null;
		this.btnUse=null;
		this.line1=null;
		TianshenItemTipUI.__super.call(this);
	}

	__class(TianshenItemTipUI,'ui.mobile.duanzao.tianshen.TianshenItemTipUI',_super);
	var __proto=TianshenItemTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/tianshen/TianshenItemTip");
	}

	return TianshenItemTipUI;
})(View)


//class ui.mobile.duanzao.tianshen.TianshenSuitTipUI extends laya.ui.View
var TianshenSuitTipUI=(function(_super){
	function TianshenSuitTipUI(){
		this.bg=null;
		this.titleTxt=null;
		this.partTxt0=null;
		this.partTxt1=null;
		this.attr_title1=null;
		this.attr_txt1=null;
		this.attr_title2=null;
		this.attr_txt2=null;
		TianshenSuitTipUI.__super.call(this);
	}

	__class(TianshenSuitTipUI,'ui.mobile.duanzao.tianshen.TianshenSuitTipUI',_super);
	var __proto=TianshenSuitTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/tianshen/TianshenSuitTip");
	}

	return TianshenSuitTipUI;
})(View)


//class ui.mobile.duanzao.view.StoneEquipItemUI extends laya.ui.View
var StoneEquipItemUI=(function(_super){
	function StoneEquipItemUI(){
		this.nameTxt=null;
		this.icon0=null;
		this.icon1=null;
		this.icon2=null;
		this.icon3=null;
		this.icon4=null;
		StoneEquipItemUI.__super.call(this);
	}

	__class(StoneEquipItemUI,'ui.mobile.duanzao.view.StoneEquipItemUI',_super);
	var __proto=StoneEquipItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/view/StoneEquipItem");
	}

	return StoneEquipItemUI;
})(View)


//class ui.mobile.duanzao.view.StoneViewUI extends laya.ui.View
var StoneViewUI=(function(_super){
	function StoneViewUI(){
		this.tabs=null;
		this.xiangqianBox=null;
		this.l_btn=null;
		this.r_btn=null;
		this.xq_panel=null;
		this.g_select=null;
		this.partImg=null;
		this.l_select=null;
		this.fuseBox=null;
		this.btnHC=null;
		StoneViewUI.__super.call(this);
	}

	__class(StoneViewUI,'ui.mobile.duanzao.view.StoneViewUI',_super);
	var __proto=StoneViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/view/StoneView");
	}

	return StoneViewUI;
})(View)


//class ui.mobile.duanzao.view.ZhulongViewUI extends laya.ui.View
var ZhulongViewUI=(function(_super){
	function ZhulongViewUI(){
		this.tabs=null;
		this.star0=null;
		this.star1=null;
		this.star2=null;
		this.star3=null;
		this.star4=null;
		this.btnLink=null;
		this.btnUP=null;
		this.yimanji=null;
		ZhulongViewUI.__super.call(this);
	}

	__class(ZhulongViewUI,'ui.mobile.duanzao.view.ZhulongViewUI',_super);
	var __proto=ZhulongViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/view/ZhulongView");
	}

	return ZhulongViewUI;
})(View)


//class ui.mobile.escort.EscortAcceptItemUI extends laya.ui.View
var EscortAcceptItemUI=(function(_super){
	function EscortAcceptItemUI(){
		this.times_txt=null;
		this.btn=null;
		this.imgHelp=null;
		EscortAcceptItemUI.__super.call(this);
	}

	__class(EscortAcceptItemUI,'ui.mobile.escort.EscortAcceptItemUI',_super);
	var __proto=EscortAcceptItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/escort/EscortAcceptItem");
	}

	return EscortAcceptItemUI;
})(View)


//class ui.mobile.escort.EscortTraceViewUI extends laya.ui.View
var EscortTraceViewUI=(function(_super){
	function EscortTraceViewUI(){
		this.mainBox=null;
		this.bg=null;
		this.name_txt=null;
		this.btn_auto=null;
		this.btn_find=null;
		this.btn_help=null;
		this.time_txt=null;
		this.hideBtn=null;
		EscortTraceViewUI.__super.call(this);
	}

	__class(EscortTraceViewUI,'ui.mobile.escort.EscortTraceViewUI',_super);
	var __proto=EscortTraceViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/escort/EscortTraceView");
	}

	return EscortTraceViewUI;
})(View)


//class ui.mobile.exp.ExpBossIconUI extends laya.ui.View
var ExpBossIconUI=(function(_super){
	function ExpBossIconUI(){
		this.bg=null;
		this.imgGet=null;
		this.effectNode=null;
		this.bg2=null;
		this.numNode=null;
		ExpBossIconUI.__super.call(this);
	}

	__class(ExpBossIconUI,'ui.mobile.exp.ExpBossIconUI',_super);
	var __proto=ExpBossIconUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/exp/ExpBossIcon");
	}

	return ExpBossIconUI;
})(View)


//class ui.mobile.feisheng.FeiShengAttrItemUI extends laya.ui.View
var FeiShengAttrItemUI=(function(_super){
	function FeiShengAttrItemUI(){
		this.icon=null;
		this.name_txt=null;
		this.num_txt=null;
		this.attrNode=null;
		this.attr_txt=null;
		this.add_txt=null;
		FeiShengAttrItemUI.__super.call(this);
	}

	__class(FeiShengAttrItemUI,'ui.mobile.feisheng.FeiShengAttrItemUI',_super);
	var __proto=FeiShengAttrItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/feisheng/FeiShengAttrItem");
	}

	return FeiShengAttrItemUI;
})(View)


//class ui.mobile.feisheng.FeiShengAttrViewUI extends laya.ui.View
var FeiShengAttrViewUI=(function(_super){
	function FeiShengAttrViewUI(){
		this.bg=null;
		this.btn_reset=null;
		this.btn_sure=null;
		this.attrNode=null;
		this.total_txt=null;
		this.imgHelp=null;
		FeiShengAttrViewUI.__super.call(this);
	}

	__class(FeiShengAttrViewUI,'ui.mobile.feisheng.FeiShengAttrViewUI',_super);
	var __proto=FeiShengAttrViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/feisheng/FeiShengAttrView");
	}

	return FeiShengAttrViewUI;
})(View)


//class ui.mobile.feisheng.FeiShengSliderUI extends laya.ui.View
var FeiShengSliderUI=(function(_super){
	function FeiShengSliderUI(){
		this.change_txt=null;
		this.bar1=null;
		this.bar2=null;
		this.btn_add=null;
		this.btn_slider=null;
		this.btn_sub=null;
		FeiShengSliderUI.__super.call(this);
	}

	__class(FeiShengSliderUI,'ui.mobile.feisheng.FeiShengSliderUI',_super);
	var __proto=FeiShengSliderUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/feisheng/FeiShengSlider");
	}

	return FeiShengSliderUI;
})(View)


//class ui.mobile.feisheng.FeiShengTaskViewUI extends laya.ui.View
var FeiShengTaskViewUI=(function(_super){
	function FeiShengTaskViewUI(){
		this.bg=null;
		this.effectNode=null;
		this.bg_task=null;
		this.task_txt=null;
		this.imgLv=null;
		this.btn_task=null;
		this.bar=null;
		this.btn_system=null;
		this.btn_attr=null;
		this.btn_lv=null;
		this.btn_open=null;
		this.imgDes=null;
		this.imgYugao=null;
		this.open_txt=null;
		FeiShengTaskViewUI.__super.call(this);
	}

	__class(FeiShengTaskViewUI,'ui.mobile.feisheng.FeiShengTaskViewUI',_super);
	var __proto=FeiShengTaskViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/feisheng/FeiShengTaskView");
	}

	return FeiShengTaskViewUI;
})(View)


//class ui.mobile.fengmo.FengmoInfoItemUI extends laya.ui.View
var FengmoInfoItemUI=(function(_super){
	function FengmoInfoItemUI(){
		this.bg=null;
		this.txt=null;
		this.yidacheng=null;
		FengmoInfoItemUI.__super.call(this);
	}

	__class(FengmoInfoItemUI,'ui.mobile.fengmo.FengmoInfoItemUI',_super);
	var __proto=FengmoInfoItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fengmo/FengmoInfoItem");
	}

	return FengmoInfoItemUI;
})(View)


//class ui.mobile.funcOpen.FuncOpenItemUI extends laya.ui.View
var FuncOpenItemUI=(function(_super){
	function FuncOpenItemUI(){
		this.bg=null;
		this.icon=null;
		this.font=null;
		this.img=null;
		this.box=null;
		this.grid=null;
		this.yilingqu=null;
		this.tj_btn=null;
		this.btn=null;
		this.tj_txt=null;
		FuncOpenItemUI.__super.call(this);
	}

	__class(FuncOpenItemUI,'ui.mobile.funcOpen.FuncOpenItemUI',_super);
	var __proto=FuncOpenItemUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/funcOpen/FuncOpenItem");
	}

	return FuncOpenItemUI;
})(View)


//class ui.mobile.fuzhan.item.FuzhanAwardZlItem1UI extends laya.ui.View
var FuzhanAwardZlItem1UI=(function(_super){
	function FuzhanAwardZlItem1UI(){
		this.bg=null;
		this.list=null;
		this.rankImg=null;
		FuzhanAwardZlItem1UI.__super.call(this);
	}

	__class(FuzhanAwardZlItem1UI,'ui.mobile.fuzhan.item.FuzhanAwardZlItem1UI',_super);
	var __proto=FuzhanAwardZlItem1UI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/item/FuzhanAwardZlItem1");
	}

	return FuzhanAwardZlItem1UI;
})(View)


//class ui.mobile.fuzhan.item.FuzhanAwardZlItem2UI extends laya.ui.View
var FuzhanAwardZlItem2UI=(function(_super){
	function FuzhanAwardZlItem2UI(){
		this.bg=null;
		this.list=null;
		this.rankImg=null;
		this.fpImg=null;
		FuzhanAwardZlItem2UI.__super.call(this);
	}

	__class(FuzhanAwardZlItem2UI,'ui.mobile.fuzhan.item.FuzhanAwardZlItem2UI',_super);
	var __proto=FuzhanAwardZlItem2UI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/item/FuzhanAwardZlItem2");
	}

	return FuzhanAwardZlItem2UI;
})(View)


//class ui.mobile.fuzhan.item.FuzhanCheckPlayerItemUI extends laya.ui.View
var FuzhanCheckPlayerItemUI=(function(_super){
	function FuzhanCheckPlayerItemUI(){
		this.nameBg=null;
		this.nameTxt=null;
		this.rankImg=null;
		FuzhanCheckPlayerItemUI.__super.call(this);
	}

	__class(FuzhanCheckPlayerItemUI,'ui.mobile.fuzhan.item.FuzhanCheckPlayerItemUI',_super);
	var __proto=FuzhanCheckPlayerItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/item/FuzhanCheckPlayerItem");
	}

	return FuzhanCheckPlayerItemUI;
})(View)


//class ui.mobile.fuzhan.item.FuzhanFenpieItemUI extends laya.ui.View
var FuzhanFenpieItemUI=(function(_super){
	function FuzhanFenpieItemUI(){
		this.imgTop=null;
		this.gridCtn=null;
		this.getted=null;
		this.nameTxt=null;
		this.rankTxt=null;
		this.numTxt0=null;
		this.numTxt1=null;
		this.numTxt2=null;
		FuzhanFenpieItemUI.__super.call(this);
	}

	__class(FuzhanFenpieItemUI,'ui.mobile.fuzhan.item.FuzhanFenpieItemUI',_super);
	var __proto=FuzhanFenpieItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/item/FuzhanFenpieItem");
	}

	return FuzhanFenpieItemUI;
})(View)


//class ui.mobile.fuzhan.item.FuzhanFinishResultItemUI extends laya.ui.View
var FuzhanFinishResultItemUI=(function(_super){
	function FuzhanFinishResultItemUI(){
		this.bg=null;
		this.imgTop=null;
		this.mvp=null;
		this.nameTxt=null;
		this.kdaTxt=null;
		this.judianTxt=null;
		this.molongTxt=null;
		this.rankTxt=null;
		FuzhanFinishResultItemUI.__super.call(this);
	}

	__class(FuzhanFinishResultItemUI,'ui.mobile.fuzhan.item.FuzhanFinishResultItemUI',_super);
	var __proto=FuzhanFinishResultItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/item/FuzhanFinishResultItem");
	}

	return FuzhanFinishResultItemUI;
})(View)


//class ui.mobile.fuzhan.item.FuzhanGuildShengqingItemUI extends laya.ui.View
var FuzhanGuildShengqingItemUI=(function(_super){
	function FuzhanGuildShengqingItemUI(){
		this.bg=null;
		this.nameTxt=null;
		this.guildTxt=null;
		this.attackTxt=null;
		this.imgBorder=null;
		this.imgHead=null;
		this.imgVip=null;
		this.btnOk=null;
		this.btnNo=null;
		FuzhanGuildShengqingItemUI.__super.call(this);
	}

	__class(FuzhanGuildShengqingItemUI,'ui.mobile.fuzhan.item.FuzhanGuildShengqingItemUI',_super);
	var __proto=FuzhanGuildShengqingItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/item/FuzhanGuildShengqingItem");
	}

	return FuzhanGuildShengqingItemUI;
})(View)


//class ui.mobile.fuzhan.item.FuzhanGuildXuanbaItemUI extends laya.ui.View
var FuzhanGuildXuanbaItemUI=(function(_super){
	function FuzhanGuildXuanbaItemUI(){
		this.imgTop=null;
		this.nameTxt0=null;
		this.nameTxt1=null;
		this.rankTxt=null;
		this.shengqingTxt=null;
		this.btn=null;
		FuzhanGuildXuanbaItemUI.__super.call(this);
	}

	__class(FuzhanGuildXuanbaItemUI,'ui.mobile.fuzhan.item.FuzhanGuildXuanbaItemUI',_super);
	var __proto=FuzhanGuildXuanbaItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/item/FuzhanGuildXuanbaItem");
	}

	return FuzhanGuildXuanbaItemUI;
})(View)


//class ui.mobile.fuzhan.item.FuzhanJifenItemUI extends laya.ui.View
var FuzhanJifenItemUI=(function(_super){
	function FuzhanJifenItemUI(){
		this.jifenTxt=null;
		this.getted=null;
		FuzhanJifenItemUI.__super.call(this);
	}

	__class(FuzhanJifenItemUI,'ui.mobile.fuzhan.item.FuzhanJifenItemUI',_super);
	var __proto=FuzhanJifenItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/item/FuzhanJifenItem");
	}

	return FuzhanJifenItemUI;
})(View)


//class ui.mobile.fuzhan.item.FuzhanMrtAvatarUI extends laya.ui.View
var FuzhanMrtAvatarUI=(function(_super){
	function FuzhanMrtAvatarUI(){
		this.nameBg=null;
		this.levelImg=null;
		this.guildTxt=null;
		FuzhanMrtAvatarUI.__super.call(this);
	}

	__class(FuzhanMrtAvatarUI,'ui.mobile.fuzhan.item.FuzhanMrtAvatarUI',_super);
	var __proto=FuzhanMrtAvatarUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/item/FuzhanMrtAvatar");
	}

	return FuzhanMrtAvatarUI;
})(View)


//class ui.mobile.fuzhan.item.FuzhanMrtItem1UI extends laya.ui.View
var FuzhanMrtItem1UI=(function(_super){
	function FuzhanMrtItem1UI(){
		this.qizhiImg=null;
		this.nationTxt=null;
		this.serverTxt=null;
		this.guildTxt=null;
		FuzhanMrtItem1UI.__super.call(this);
	}

	__class(FuzhanMrtItem1UI,'ui.mobile.fuzhan.item.FuzhanMrtItem1UI',_super);
	var __proto=FuzhanMrtItem1UI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/item/FuzhanMrtItem1");
	}

	return FuzhanMrtItem1UI;
})(View)


//class ui.mobile.fuzhan.item.FuzhanMrtItem2UI extends laya.ui.View
var FuzhanMrtItem2UI=(function(_super){
	function FuzhanMrtItem2UI(){
		this.nationTxt=null;
		this.serverTxt=null;
		this.guildTxt=null;
		FuzhanMrtItem2UI.__super.call(this);
	}

	__class(FuzhanMrtItem2UI,'ui.mobile.fuzhan.item.FuzhanMrtItem2UI',_super);
	var __proto=FuzhanMrtItem2UI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/item/FuzhanMrtItem2");
	}

	return FuzhanMrtItem2UI;
})(View)


//class ui.mobile.fuzhan.item.FuzhanPkCheckItemUI extends laya.ui.View
var FuzhanPkCheckItemUI=(function(_super){
	function FuzhanPkCheckItemUI(){
		this.bg=null;
		this.icon0=null;
		this.icon1=null;
		this.nameTxt0=null;
		this.guildNameTxt0=null;
		this.nameTxt1=null;
		this.guildNameTxt1=null;
		FuzhanPkCheckItemUI.__super.call(this);
	}

	__class(FuzhanPkCheckItemUI,'ui.mobile.fuzhan.item.FuzhanPkCheckItemUI',_super);
	var __proto=FuzhanPkCheckItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/item/FuzhanPkCheckItem");
	}

	return FuzhanPkCheckItemUI;
})(View)


//class ui.mobile.fuzhan.item.FuzhanPkCheckTabUI extends laya.ui.View
var FuzhanPkCheckTabUI=(function(_super){
	function FuzhanPkCheckTabUI(){
		this.btn=null;
		this.flag=null;
		FuzhanPkCheckTabUI.__super.call(this);
	}

	__class(FuzhanPkCheckTabUI,'ui.mobile.fuzhan.item.FuzhanPkCheckTabUI',_super);
	var __proto=FuzhanPkCheckTabUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/item/FuzhanPkCheckTab");
	}

	return FuzhanPkCheckTabUI;
})(View)


//class ui.mobile.fuzhan.item.FuzhanPkInfoItemUI extends laya.ui.View
var FuzhanPkInfoItemUI=(function(_super){
	function FuzhanPkInfoItemUI(){
		this.icon=null;
		this.rankImg=null;
		this.noRole=null;
		this.nameTxt=null;
		FuzhanPkInfoItemUI.__super.call(this);
	}

	__class(FuzhanPkInfoItemUI,'ui.mobile.fuzhan.item.FuzhanPkInfoItemUI',_super);
	var __proto=FuzhanPkInfoItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/item/FuzhanPkInfoItem");
	}

	return FuzhanPkInfoItemUI;
})(View)


//class ui.mobile.fuzhan.item.FuzhanPkStartLeftItemUI extends laya.ui.View
var FuzhanPkStartLeftItemUI=(function(_super){
	function FuzhanPkStartLeftItemUI(){
		this.headImg=null;
		this.stateImg=null;
		this.noRole=null;
		this.nameTxt=null;
		FuzhanPkStartLeftItemUI.__super.call(this);
	}

	__class(FuzhanPkStartLeftItemUI,'ui.mobile.fuzhan.item.FuzhanPkStartLeftItemUI',_super);
	var __proto=FuzhanPkStartLeftItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/item/FuzhanPkStartLeftItem");
	}

	return FuzhanPkStartLeftItemUI;
})(View)


//class ui.mobile.fuzhan.item.FuzhanPkStartRightItemUI extends laya.ui.View
var FuzhanPkStartRightItemUI=(function(_super){
	function FuzhanPkStartRightItemUI(){
		this.headImg=null;
		this.stateImg=null;
		this.noRole=null;
		this.nameTxt=null;
		this.btn0=null;
		this.btn1=null;
		this.btn2=null;
		this.btn3=null;
		this.btn4=null;
		this.qipaoImg=null;
		FuzhanPkStartRightItemUI.__super.call(this);
	}

	__class(FuzhanPkStartRightItemUI,'ui.mobile.fuzhan.item.FuzhanPkStartRightItemUI',_super);
	var __proto=FuzhanPkStartRightItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/item/FuzhanPkStartRightItem");
	}

	return FuzhanPkStartRightItemUI;
})(View)


//class ui.mobile.fuzhan.item.FuzhanShenqingItemUI extends laya.ui.View
var FuzhanShenqingItemUI=(function(_super){
	function FuzhanShenqingItemUI(){
		this.nameTxt=null;
		this.gridCtn=null;
		this.btn=null;
		this.split=null;
		FuzhanShenqingItemUI.__super.call(this);
	}

	__class(FuzhanShenqingItemUI,'ui.mobile.fuzhan.item.FuzhanShenqingItemUI',_super);
	var __proto=FuzhanShenqingItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/item/FuzhanShenqingItem");
	}

	return FuzhanShenqingItemUI;
})(View)


//class ui.mobile.fuzhan.item.FuzhanSideItemUI extends laya.ui.View
var FuzhanSideItemUI=(function(_super){
	function FuzhanSideItemUI(){
		this.timeTxt=null;
		this.jifenTxt=null;
		this.gridCtn=null;
		this.help=null;
		this.iocn0=null;
		this.iocn1=null;
		this.iocn2=null;
		this.getted0=null;
		this.getted1=null;
		this.getted2=null;
		this.bossIcon=null;
		this.gotoLink=null;
		this.bossTime=null;
		this.nameSp=null;
		this.nameTxt=null;
		this.hpSp=null;
		this.pro=null;
		this.hp_txt=null;
		this.lingqu=null;
		this.btnIcon=null;
		this.pkSp=null;
		this.bg=null;
		this.nationTxt0=null;
		this.nationTxt1=null;
		this.pkTopSp=null;
		this.bg1=null;
		this.nameTxt0=null;
		this.nameTxt1=null;
		this.jifenTxt0=null;
		this.jifenTxt1=null;
		FuzhanSideItemUI.__super.call(this);
	}

	__class(FuzhanSideItemUI,'ui.mobile.fuzhan.item.FuzhanSideItemUI',_super);
	var __proto=FuzhanSideItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/item/FuzhanSideItem");
	}

	return FuzhanSideItemUI;
})(View)


//class ui.mobile.fuzhan.item.FuzhanWorldZhanjiItemUI extends laya.ui.View
var FuzhanWorldZhanjiItemUI=(function(_super){
	function FuzhanWorldZhanjiItemUI(){
		this.txt0=null;
		this.nameTxt=null;
		this.stateTxt=null;
		FuzhanWorldZhanjiItemUI.__super.call(this);
	}

	__class(FuzhanWorldZhanjiItemUI,'ui.mobile.fuzhan.item.FuzhanWorldZhanjiItemUI',_super);
	var __proto=FuzhanWorldZhanjiItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/item/FuzhanWorldZhanjiItem");
	}

	return FuzhanWorldZhanjiItemUI;
})(View)


//class ui.mobile.fuzhan.item.FuzhanZhanjiRankItemUI extends laya.ui.View
var FuzhanZhanjiRankItemUI=(function(_super){
	function FuzhanZhanjiRankItemUI(){
		this.imgTop=null;
		this.nameTxt=null;
		this.pkTxt=null;
		this.jifenTxt=null;
		this.rankTxt=null;
		FuzhanZhanjiRankItemUI.__super.call(this);
	}

	__class(FuzhanZhanjiRankItemUI,'ui.mobile.fuzhan.item.FuzhanZhanjiRankItemUI',_super);
	var __proto=FuzhanZhanjiRankItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/item/FuzhanZhanjiRankItem");
	}

	return FuzhanZhanjiRankItemUI;
})(View)


//class ui.mobile.fuzhan.view.FuzhanAwardLeftViewUI extends laya.ui.View
var FuzhanAwardLeftViewUI=(function(_super){
	function FuzhanAwardLeftViewUI(){
		this.list=null;
		FuzhanAwardLeftViewUI.__super.call(this);
	}

	__class(FuzhanAwardLeftViewUI,'ui.mobile.fuzhan.view.FuzhanAwardLeftViewUI',_super);
	var __proto=FuzhanAwardLeftViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/view/FuzhanAwardLeftView");
	}

	return FuzhanAwardLeftViewUI;
})(View)


//class ui.mobile.fuzhan.view.FuzhanAwardRightViewUI extends laya.ui.View
var FuzhanAwardRightViewUI=(function(_super){
	function FuzhanAwardRightViewUI(){
		this.list=null;
		FuzhanAwardRightViewUI.__super.call(this);
	}

	__class(FuzhanAwardRightViewUI,'ui.mobile.fuzhan.view.FuzhanAwardRightViewUI',_super);
	var __proto=FuzhanAwardRightViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/view/FuzhanAwardRightView");
	}

	return FuzhanAwardRightViewUI;
})(View)


//class ui.mobile.fuzhan.view.FuzhanAwardZlViewUI extends laya.ui.View
var FuzhanAwardZlViewUI=(function(_super){
	function FuzhanAwardZlViewUI(){
		this.bg=null;
		FuzhanAwardZlViewUI.__super.call(this);
	}

	__class(FuzhanAwardZlViewUI,'ui.mobile.fuzhan.view.FuzhanAwardZlViewUI',_super);
	var __proto=FuzhanAwardZlViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/view/FuzhanAwardZlView");
	}

	return FuzhanAwardZlViewUI;
})(View)


//class ui.mobile.fuzhan.view.FuzhanGuildXuanbaViewUI extends laya.ui.View
var FuzhanGuildXuanbaViewUI=(function(_super){
	function FuzhanGuildXuanbaViewUI(){
		this.bg=null;
		this.moneyUrl=null;
		this.timeTxt=null;
		this.tipsTxt=null;
		this.linkBtn=null;
		this.list=null;
		FuzhanGuildXuanbaViewUI.__super.call(this);
	}

	__class(FuzhanGuildXuanbaViewUI,'ui.mobile.fuzhan.view.FuzhanGuildXuanbaViewUI',_super);
	var __proto=FuzhanGuildXuanbaViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/view/FuzhanGuildXuanbaView");
	}

	return FuzhanGuildXuanbaViewUI;
})(View)


//class ui.mobile.fuzhan.view.FuzhanMrtViewUI extends laya.ui.View
var FuzhanMrtViewUI=(function(_super){
	function FuzhanMrtViewUI(){
		this.bg=null;
		this.guildTxt=null;
		this.list=null;
		this.noSp0=null;
		this.noSp1=null;
		this.noSp2=null;
		this.btnLeft=null;
		this.btnRight=null;
		this.img1=null;
		this.img0=null;
		FuzhanMrtViewUI.__super.call(this);
	}

	__class(FuzhanMrtViewUI,'ui.mobile.fuzhan.view.FuzhanMrtViewUI',_super);
	var __proto=FuzhanMrtViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/view/FuzhanMrtView");
	}

	return FuzhanMrtViewUI;
})(View)


//class ui.mobile.fuzhan.view.FuzhanPkZonglanViewUI extends laya.ui.View
var FuzhanPkZonglanViewUI=(function(_super){
	function FuzhanPkZonglanViewUI(){
		this.bg=null;
		this.pro=null;
		this.icon0=null;
		this.icon1=null;
		this.icon2=null;
		this.state0=null;
		this.state1=null;
		this.state2=null;
		this.descTxt=null;
		this.timeTxt0=null;
		this.timeTxt1=null;
		this.timeTxt2=null;
		this.timeSp=null;
		this.hbIcon=null;
		this.hbTtxt=null;
		this.hbTimeTxt=null;
		this.linkBtn=null;
		FuzhanPkZonglanViewUI.__super.call(this);
	}

	__class(FuzhanPkZonglanViewUI,'ui.mobile.fuzhan.view.FuzhanPkZonglanViewUI',_super);
	var __proto=FuzhanPkZonglanViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/view/FuzhanPkZonglanView");
	}

	return FuzhanPkZonglanViewUI;
})(View)


//class ui.mobile.fuzhan.view.FuzhanWorldAfter16ViewUI extends laya.ui.View
var FuzhanWorldAfter16ViewUI=(function(_super){
	function FuzhanWorldAfter16ViewUI(){
		this.allSp=null;
		this.anLine=null;
		this.textBgSp=null;
		this.qizhiSp=null;
		this.qizhi0=null;
		this.qizhi1=null;
		this.qizhi2=null;
		this.qizhi3=null;
		this.qizhi4=null;
		this.qizhi5=null;
		this.qizhi6=null;
		this.qizhi7=null;
		this.qizhi8=null;
		this.qizhi9=null;
		this.qizhi10=null;
		this.qizhi11=null;
		this.qizhi12=null;
		this.qizhi13=null;
		this.qizhi14=null;
		this.qizhi15=null;
		this.qizhiEight0=null;
		this.qizhiEight1=null;
		this.qizhiEight2=null;
		this.qizhiEight3=null;
		this.qizhiEight4=null;
		this.qizhiEight5=null;
		this.qizhiEight6=null;
		this.qizhiEight7=null;
		this.qizhiFour0=null;
		this.qizhiFour1=null;
		this.qizhiFour2=null;
		this.qizhiFour3=null;
		this.qizhiTwo0=null;
		this.qizhiTwo1=null;
		this.qizhiKing=null;
		this.textSp=null;
		this.btn0=null;
		this.btn1=null;
		this.btn2=null;
		this.btn3=null;
		this.btn4=null;
		this.btn5=null;
		this.btn6=null;
		this.btn7=null;
		this.btn8=null;
		this.btn9=null;
		this.btn10=null;
		this.btn11=null;
		this.btn12=null;
		this.btn13=null;
		this.btn14=null;
		this.btn15=null;
		this.btnEight0=null;
		this.btnEight1=null;
		this.btnEight2=null;
		this.btnEight3=null;
		this.btnEight4=null;
		this.btnEight5=null;
		this.btnEight6=null;
		this.btnEight7=null;
		this.btnFour0=null;
		this.btnFour1=null;
		this.btnFour2=null;
		this.btnFour3=null;
		this.btnTwo0=null;
		this.btnTwo1=null;
		this.btnking=null;
		this.nationSp=null;
		this.nationTxt0=null;
		this.nationTxt1=null;
		this.nationTxt2=null;
		this.nationTxt3=null;
		this.nationTxt4=null;
		this.nationTxt5=null;
		this.nationTxt6=null;
		this.nationTxt7=null;
		this.nationTxt8=null;
		this.nationTxt9=null;
		this.nationTxt10=null;
		this.nationTxt11=null;
		this.nationTxt12=null;
		this.nationTxt13=null;
		this.nationTxt14=null;
		this.nationTxt15=null;
		this.nationEight0=null;
		this.nationEight1=null;
		this.nationEight2=null;
		this.nationEight3=null;
		this.nationEight4=null;
		this.nationEight5=null;
		this.nationEight6=null;
		this.nationEight7=null;
		this.nationFour0=null;
		this.nationFour1=null;
		this.nationFour2=null;
		this.nationFour3=null;
		this.nationTwo1=null;
		this.nationTwo0=null;
		this.nationKing=null;
		this.timeTxt0=null;
		this.timeTxt1=null;
		this.tabBtnTop=null;
		FuzhanWorldAfter16ViewUI.__super.call(this);
	}

	__class(FuzhanWorldAfter16ViewUI,'ui.mobile.fuzhan.view.FuzhanWorldAfter16ViewUI',_super);
	var __proto=FuzhanWorldAfter16ViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/view/FuzhanWorldAfter16View");
	}

	return FuzhanWorldAfter16ViewUI;
})(View)


//class ui.mobile.fuzhan.view.FuzhanWorldAfterViewUI extends laya.ui.View
var FuzhanWorldAfterViewUI=(function(_super){
	function FuzhanWorldAfterViewUI(){
		this.bg=null;
		this.btnZhanji=null;
		this.btnGl=null;
		FuzhanWorldAfterViewUI.__super.call(this);
	}

	__class(FuzhanWorldAfterViewUI,'ui.mobile.fuzhan.view.FuzhanWorldAfterViewUI',_super);
	var __proto=FuzhanWorldAfterViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/view/FuzhanWorldAfterView");
	}

	return FuzhanWorldAfterViewUI;
})(View)


//class ui.mobile.fuzhan.view.FuzhanPkStartViewUI extends laya.ui.View
var FuzhanPkStartViewUI=(function(_super){
	function FuzhanPkStartViewUI(){
		this.bg=null;
		this.diImg=null;
		this.myImg=null;
		this.pkImg=null;
		this.infoSp=null;
		this.numTxt=null;
		this.guildTxt0=null;
		this.guildTxt1=null;
		this.selectTxt=null;
		this.huizhangTxt=null;
		this.timeImg=null;
		this.btn=null;
		this.linkBtn=null;
		this.btnGonglue=null;
		this.btnWeixin=null;
		this.btnGz=null;
		this.timeTxt=null;
		FuzhanPkStartViewUI.__super.call(this);
	}

	__class(FuzhanPkStartViewUI,'ui.mobile.fuzhan.view.FuzhanPkStartViewUI',_super);
	var __proto=FuzhanPkStartViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/view/FuzhanPkStartView");
	}

	return FuzhanPkStartViewUI;
})(View)


//class ui.mobile.fuzhan.view.FuzhanPkCheckViewUI extends laya.ui.View
var FuzhanPkCheckViewUI=(function(_super){
	function FuzhanPkCheckViewUI(){
		this.list=null;
		this.listTab=null;
		this.timeTxt=null;
		FuzhanPkCheckViewUI.__super.call(this);
	}

	__class(FuzhanPkCheckViewUI,'ui.mobile.fuzhan.view.FuzhanPkCheckViewUI',_super);
	var __proto=FuzhanPkCheckViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/view/FuzhanPkCheckView");
	}

	return FuzhanPkCheckViewUI;
})(View)


//class ui.mobile.fuzhan.view.FuzhanPkInfoViewUI extends laya.ui.View
var FuzhanPkInfoViewUI=(function(_super){
	function FuzhanPkInfoViewUI(){
		this.nameTxt0=null;
		this.guildTxt0=null;
		this.nameTxt1=null;
		this.guildTxt1=null;
		this.timeTxt=null;
		FuzhanPkInfoViewUI.__super.call(this);
	}

	__class(FuzhanPkInfoViewUI,'ui.mobile.fuzhan.view.FuzhanPkInfoViewUI',_super);
	var __proto=FuzhanPkInfoViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/view/FuzhanPkInfoView");
	}

	return FuzhanPkInfoViewUI;
})(View)


//class ui.mobile.fuzhan.view.FuzhanXuanbaAfterViewUI extends laya.ui.View
var FuzhanXuanbaAfterViewUI=(function(_super){
	function FuzhanXuanbaAfterViewUI(){
		this.bg=null;
		this.tabBtn=null;
		this.linkBtn=null;
		this.btnWheel=null;
		this.btnFenpei=null;
		this.moneyUrl=null;
		FuzhanXuanbaAfterViewUI.__super.call(this);
	}

	__class(FuzhanXuanbaAfterViewUI,'ui.mobile.fuzhan.view.FuzhanXuanbaAfterViewUI',_super);
	var __proto=FuzhanXuanbaAfterViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/view/FuzhanXuanbaAfterView");
	}

	return FuzhanXuanbaAfterViewUI;
})(View)


//class ui.mobile.fuzhan.view.FuzhanZhanjiRankViewUI extends laya.ui.View
var FuzhanZhanjiRankViewUI=(function(_super){
	function FuzhanZhanjiRankViewUI(){
		this.list=null;
		this.txt0=null;
		this.txt1=null;
		FuzhanZhanjiRankViewUI.__super.call(this);
	}

	__class(FuzhanZhanjiRankViewUI,'ui.mobile.fuzhan.view.FuzhanZhanjiRankViewUI',_super);
	var __proto=FuzhanZhanjiRankViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/view/FuzhanZhanjiRankView");
	}

	return FuzhanZhanjiRankViewUI;
})(View)


//class ui.mobile.gm.view.GmActivityViewUI extends laya.ui.View
var GmActivityViewUI=(function(_super){
	function GmActivityViewUI(){
		this.actInfo_txt=null;
		this.activity_open=null;
		this.activity_close=null;
		this.vip_box1=null;
		this.vip_box2=null;
		this.vip_txt=null;
		this.vip_box=null;
		this.vip_btn=null;
		this.activity_box=null;
		this.pay_box=null;
		this.pay_btn=null;
		this.pf_box=null;
		this.pf_btn=null;
		this.pay_box37=null;
		this.pay_btn37=null;
		this.smrz37_check=null;
		this.param_txt=null;
		this.actId_txt=null;
		this.actId_btn1=null;
		this.actId_btn2=null;
		this.actId_box=null;
		this.ad_box=null;
		this.ad_btn=null;
		this.pf_txt=null;
		this.open_kuafuBtn=null;
		this.serverIdTxt=null;
		this.func_name=null;
		this.func_args=null;
		this.func_info=null;
		this.func_btn=null;
		this.push_txt=null;
		GmActivityViewUI.__super.call(this);
	}

	__class(GmActivityViewUI,'ui.mobile.gm.view.GmActivityViewUI',_super);
	var __proto=GmActivityViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gm/view/GmActivityView");
	}

	return GmActivityViewUI;
})(View)


//class ui.mobile.gm.view.GMBuffViewUI extends laya.ui.View
var GMBuffViewUI=(function(_super){
	function GMBuffViewUI(){
		this.id_txt=null;
		this.buff_btn=null;
		this.copy_btn1=null;
		this.func_btn=null;
		this.copy_btn2=null;
		this.master_btn=null;
		this.copy_btn3=null;
		this.funcId_txt=null;
		this.funcId_btn=null;
		this.state_txt=null;
		this.buff_txt=null;
		this.func_txt=null;
		this.master_txt=null;
		GMBuffViewUI.__super.call(this);
	}

	__class(GMBuffViewUI,'ui.mobile.gm.view.GMBuffViewUI',_super);
	var __proto=GMBuffViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gm/view/GMBuffView");
	}

	return GMBuffViewUI;
})(View)


//class ui.mobile.gm.view.GmDebugViewUI extends laya.ui.View
var GmDebugViewUI=(function(_super){
	function GmDebugViewUI(){
		this.version_txt=null;
		this.mouse_txt=null;
		this.debug_box=null;
		this.stat_box=null;
		this.platform_box=null;
		this.scale_box=null;
		this.click_box=null;
		this.save_btn=null;
		this.refresh_btn=null;
		this.refresh_box=null;
		this.func_box=null;
		this.panel_box=null;
		this.mouse_box=null;
		this.mouse_btn=null;
		this.js_txt=null;
		this.js_btn=null;
		this.url_box=null;
		this.url_btn=null;
		this.tx_btn=null;
		this.tx_txt=null;
		this.server_btn=null;
		this.panel_txt1=null;
		this.panel_btn1=null;
		this.friend_txt=null;
		this.friend_btn=null;
		this.warstart_btn=null;
		this.warend_btn=null;
		this.icon_txt=null;
		this.icon_btn=null;
		this.pd_txt=null;
		this.pd_btn=null;
		this.task_box=null;
		this.fps_txt=null;
		this.fps_btn=null;
		this.mask_box=null;
		this.drag_box=null;
		this.stage_txt=null;
		this.stage_btn=null;
		this.panel_txt2=null;
		this.panel_btn2=null;
		this.fast_box=null;
		GmDebugViewUI.__super.call(this);
	}

	__class(GmDebugViewUI,'ui.mobile.gm.view.GmDebugViewUI',_super);
	var __proto=GmDebugViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gm/view/GmDebugView");
	}

	return GmDebugViewUI;
})(View)


//class ui.mobile.gm.view.GmItemViewUI extends laya.ui.View
var GmItemViewUI=(function(_super){
	function GmItemViewUI(){
		this.item_box_btn=null;
		this.item_box_txt=null;
		this.item_box=null;
		this.item_exp_btn=null;
		this.item_exp_txt=null;
		this.item_exp_box=null;
		this.addItem_btn=null;
		this.itemId_txt=null;
		this.itemCount_txt=null;
		this.removeAllBag_btn=null;
		this.itemTime_txt=null;
		this.itemBind_box=null;
		this.useTime_txt=null;
		this.last_btn=null;
		this.next_btn=null;
		this.add_btn=null;
		this.del_btn=null;
		this.addItem_btn2=null;
		this.itemCount_txt2=null;
		this.itemTime_txt2=null;
		this.itemBind_box2=null;
		this.item_box2=null;
		this.miandan_box=null;
		this.item_qianghua_btn=null;
		this.item_qianghua_txt=null;
		this.search_txt=null;
		GmItemViewUI.__super.call(this);
	}

	__class(GmItemViewUI,'ui.mobile.gm.view.GmItemViewUI',_super);
	var __proto=GmItemViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gm/view/GmItemView");
	}

	return GmItemViewUI;
})(View)


//class ui.mobile.gm.view.GmMailViewUI extends laya.ui.View
var GmMailViewUI=(function(_super){
	function GmMailViewUI(){
		this.mail_content_txt=null;
		this.mail_item1_txt=null;
		this.mail_count1_txt=null;
		this.mail_receiver_txt=null;
		this.mail_title_txt=null;
		this.mail_item2_txt=null;
		this.mail_count2_txt=null;
		this.mail_item3_txt=null;
		this.mail_count3_txt=null;
		this.mail_item4_txt=null;
		this.mail_count4_txt=null;
		this.mail_item5_txt=null;
		this.mail_count5_txt=null;
		this.mail_item6_txt=null;
		this.mail_count6_txt=null;
		this.mail_item7_txt=null;
		this.mail_count7_txt=null;
		this.mail_item8_txt=null;
		this.mail_count8_txt=null;
		this.mail_item9_txt=null;
		this.mail_count9_txt=null;
		this.mail_item10_txt=null;
		this.mail_count10_txt=null;
		this.mail_send_btn=null;
		this.mail_box=null;
		this.mail_fujian_txt=null;
		this.mail_area_txt=null;
		this.mail_box2=null;
		this.mail_time_txt=null;
		this.mail_level_txt=null;
		this.mail_send_btn2=null;
		this.mail_playerId_txt=null;
		this.mail_key_txt=null;
		this.mail_condition_txt=null;
		this.mail_flag1_box=null;
		this.mail_flag3_box=null;
		this.mail_flag4_box=null;
		this.mail_flag5_box=null;
		this.mail_flag2_box=null;
		this.mail_flag6_box=null;
		this.mail_flag7_box=null;
		this.mail_flag8_box=null;
		this.mail_flag9_box=null;
		this.mail_flag10_box=null;
		GmMailViewUI.__super.call(this);
	}

	__class(GmMailViewUI,'ui.mobile.gm.view.GmMailViewUI',_super);
	var __proto=GmMailViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gm/view/GmMailView");
	}

	return GmMailViewUI;
})(View)


//class ui.mobile.gm.view.GmMapViewUI extends laya.ui.View
var GmMapViewUI=(function(_super){
	function GmMapViewUI(){
		this.map_areax_txt=null;
		this.map_areay_txt=null;
		this.map_area_btn=null;
		this.map_killAll_txt=null;
		this.map_killAll_btn=null;
		this.plot_open=null;
		this.plot_box=null;
		this.plot_load=null;
		this.plot_btn=null;
		this.map_x_txt=null;
		this.map_combox=null;
		this.map_y_txt=null;
		this.map_cs_btn=null;
		this.map_txt=null;
		this.monster_count_txt1=null;
		this.monster_count_btn1=null;
		this.monster_combox1=null;
		this.monster_count_txt7=null;
		this.monster_count_btn7=null;
		this.monster_combox7=null;
		this.monster_count_txt6=null;
		this.monster_count_btn6=null;
		this.monster_combox6=null;
		this.monster_count_txt5=null;
		this.monster_count_btn5=null;
		this.monster_combox5=null;
		this.monster_count_txt4=null;
		this.monster_count_btn4=null;
		this.monster_combox4=null;
		this.monster_count_txt3=null;
		this.monster_count_btn3=null;
		this.monster_combox3=null;
		this.monster_count_txt2=null;
		this.monster_count_btn2=null;
		this.monster_combox2=null;
		this.monster_combox0=null;
		this.monster_count_txt0=null;
		this.monster_count_btn0=null;
		this.boss_btn=null;
		this.map_scroll_txt=null;
		this.map_scroll_btn=null;
		this.nationWarstart_btn=null;
		this.fuliBoss_txt=null;
		this.fuliBoss_btn=null;
		this.say_btn=null;
		this.say_txt=null;
		this.xunlu_txt=null;
		GmMapViewUI.__super.call(this);
	}

	__class(GmMapViewUI,'ui.mobile.gm.view.GmMapViewUI',_super);
	var __proto=GmMapViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gm/view/GmMapView");
	}

	return GmMapViewUI;
})(View)


//class ui.mobile.gm.view.GmOtherViewUI extends laya.ui.View
var GmOtherViewUI=(function(_super){
	function GmOtherViewUI(){
		this.test_btn=null;
		this.test_txt1=null;
		this.test_txt2=null;
		this.test_txt3=null;
		this.test_txt4=null;
		this.test_txt5=null;
		this.test_txt6=null;
		this.test_txt=null;
		this.btn0=null;
		this.btn1=null;
		this.btn2=null;
		this.btn3=null;
		this.btn4=null;
		this.btn5=null;
		this.ck=null;
		GmOtherViewUI.__super.call(this);
	}

	__class(GmOtherViewUI,'ui.mobile.gm.view.GmOtherViewUI',_super);
	var __proto=GmOtherViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gm/view/GmOtherView");
	}

	return GmOtherViewUI;
})(View)


//class ui.mobile.gm.view.GmRoleViewUI extends laya.ui.View
var GmRoleViewUI=(function(_super){
	function GmRoleViewUI(){
		this.huobiSee_txt=null;
		this.huobiSee_btn=null;
		this.roleJinBi_txt=null;
		this.roleJinBi_btn=null;
		this.huobiId_txt=null;
		this.roleBJinBi_txt=null;
		this.roleYuanBao_txt=null;
		this.roleBYuanBao_txt=null;
		this.roleBJinBi_btn=null;
		this.roleYuanBao_btn=null;
		this.roleBYuanBao_btn=null;
		this.roleLiemo_txt=null;
		this.daily_btn=null;
		this.advance_btn=null;
		this.roleCYuanBao_txt=null;
		this.roleCYuanBao_btn=null;
		this.roleGongxun_txt=null;
		this.roleGongxun_btn=null;
		this.roleFuerdai_txt=null;
		this.roleFuerdai_btn=null;
		this.roleXiaoqiang_txt=null;
		this.roleXiaoqiang_btn=null;
		this.roleSaiyaren_txt=null;
		this.roleSaiyaren_btn=null;
		this.roleXiuwei_txt=null;
		this.roleXiuwei_btn=null;
		this.huobi_btn=null;
		this.huobi_txt=null;
		this.roleChongzhi_btn=null;
		this.roleCYuanBao_box=null;
		this.role_huobi_box=null;
		this.roleKillSelf_btn=null;
		this.roleCrit_txt=null;
		this.roleHit_txt=null;
		this.roleJuck_txt=null;
		this.roleLuck_txt=null;
		this.roleCrit_btn=null;
		this.roleHit_btn=null;
		this.roleJuck_btn=null;
		this.roleLuck_btn=null;
		this.roleTenacity_txt=null;
		this.roleTenacity_btn=null;
		this.roleMinAttack_txt=null;
		this.roleMaxAttack_txt=null;
		this.roleMinMAttack_txt=null;
		this.roleMaxMAttack_txt=null;
		this.roleMinDAttack_txt=null;
		this.roleMaxDAttack_txt=null;
		this.roleAttackSpeed_txt=null;
		this.roleMoveSpeed_txt=null;
		this.roleAttackSpeed_btn=null;
		this.roleMoveSpeed_btn=null;
		this.roleMinAttack_btn=null;
		this.roleMaxAttack_btn=null;
		this.roleMinMAttack_btn=null;
		this.roleMaxMAttack_btn=null;
		this.roleMinDAttack_btn=null;
		this.roleMaxDAttack_btn=null;
		this.roleLevel_txt=null;
		this.roleLevel_btn=null;
		this.roleExp_txt=null;
		this.roleExp_btn=null;
		this.roleMinDefense_txt=null;
		this.roleMaxDefense_txt=null;
		this.roleMinMDefense_txt=null;
		this.roleMaxMDefense_txt=null;
		this.roleMinDefense_btn=null;
		this.roleMaxDefense_btn=null;
		this.roleMinMDefense_btn=null;
		this.roleMaxMDefense_btn=null;
		this.roleHp_txt=null;
		this.roleMaxHp_txt=null;
		this.roleMp_txt=null;
		this.roleMaxMp_txt=null;
		this.roleHp_btn=null;
		this.roleMaxHp_btn=null;
		this.roleMp_btn=null;
		this.roleMaxMp_btn=null;
		this.roleRemoveCD_btn=null;
		this.rolePk_txt=null;
		this.rolePk_btn=null;
		this.roleVipTxt=null;
		this.roleVipBtn=null;
		this.advance_type=null;
		this.zhigouBox=null;
		this.zhigou_btn=null;
		this.zuoqi_btn=null;
		this.zuoqi_lv=null;
		this.zuoqi_id=null;
		this.shenshi_txt1=null;
		this.btn_shenshi=null;
		this.shenshi_txt2=null;
		this.tili_id=null;
		this.tili_btn=null;
		this.tili_value=null;
		this.advance_txt=null;
		this.freeVipTxt=null;
		this.freeVipBtn=null;
		this.huobiSee_txt2=null;
		this.addAttr_txt=null;
		this.addAttr_box=null;
		this.addAttr_btn=null;
		this.zhigou_btn2=null;
		this.zhigou_txt=null;
		this.mtype_txt1=null;
		this.mtype_txt2=null;
		this.mtype_txt3=null;
		this.mtype_txt4=null;
		this.mtype_txt5=null;
		GmRoleViewUI.__super.call(this);
	}

	__class(GmRoleViewUI,'ui.mobile.gm.view.GmRoleViewUI',_super);
	var __proto=GmRoleViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gm/view/GmRoleView");
	}

	return GmRoleViewUI;
})(View)


//class ui.mobile.gm.view.GMSearchItemUI extends laya.ui.View
var GMSearchItemUI=(function(_super){
	function GMSearchItemUI(){
		this.name_txt=null;
		GMSearchItemUI.__super.call(this);
	}

	__class(GMSearchItemUI,'ui.mobile.gm.view.GMSearchItemUI',_super);
	var __proto=GMSearchItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gm/view/GMSearchItem");
	}

	return GMSearchItemUI;
})(View)


//class ui.mobile.gm.view.GmShuxingViewUI extends laya.ui.View
var GmShuxingViewUI=(function(_super){
	function GmShuxingViewUI(){
		this.shuxing_prev_btn=null;
		this.shuxing_self_btn=null;
		this.shuxing_next_btn=null;
		this.shuxing_clear_btn=null;
		this.shuxing_copy_btn=null;
		this.shuxing_txt=null;
		GmShuxingViewUI.__super.call(this);
	}

	__class(GmShuxingViewUI,'ui.mobile.gm.view.GmShuxingViewUI',_super);
	var __proto=GmShuxingViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gm/view/GmShuxingView");
	}

	return GmShuxingViewUI;
})(View)


//class ui.mobile.gm.view.GmSkillViewUI extends laya.ui.View
var GmSkillViewUI=(function(_super){
	function GmSkillViewUI(){
		this.screenSkill_btn=null;
		this.screenSkill_box=null;
		this.skillGuide_btn=null;
		this.skillGuide_txt=null;
		this.skillTo_btn=null;
		this.skillTo_txt=null;
		this.hejiSkill_btn=null;
		this.allAddSkill_btn=null;
		this.skillLevel_txt=null;
		this.removeSkill_btn=null;
		this.allRemoveSkill_btn=null;
		this.addSkill_btn1=null;
		this.skill_combox1=null;
		this.skill_combox2=null;
		this.id_txt=null;
		this.addSkill_btn2=null;
		this.removeSkill_btn2=null;
		this.cd_box=null;
		this.skillId_btn=null;
		this.skillId_btn2=null;
		this.skill_combox3=null;
		this.skillId_txt=null;
		this.skillLv_txt=null;
		this.json_txt=null;
		this.json_box=null;
		this.force_box=null;
		this.titlegmAccount_txt=null;
		this.addTitlegm_btn=null;
		this.titlegmTime_txt=null;
		this.beidongSkillTxt=null;
		this.beidongSkillBtn=null;
		this.pSkill_txt=null;
		this.addPSkill_btn=null;
		this.key_txt=null;
		this.key_box=null;
		this.key_time_txt=null;
		GmSkillViewUI.__super.call(this);
	}

	__class(GmSkillViewUI,'ui.mobile.gm.view.GmSkillViewUI',_super);
	var __proto=GmSkillViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gm/view/GmSkillView");
	}

	return GmSkillViewUI;
})(View)


//class ui.mobile.gm.view.GmTaskViewUI extends laya.ui.View
var GmTaskViewUI=(function(_super){
	function GmTaskViewUI(){
		this.chengjiu_btn=null;
		this.chengjiu_combox=null;
		this.duihuaBtn=null;
		this.guild_btn=null;
		this.guild_btn2=null;
		this.finishIdTxt=null;
		this.finishNameTxt=null;
		this.btnFinish=null;
		this.task_btn2=null;
		this.task_combox=null;
		this.task_txt=null;
		this.task_btn1=null;
		this.plot_skip=null;
		this.guide_txt=null;
		this.guide_btn=null;
		this.task_btn4=null;
		this.btnFun=null;
		this.copyTaskBtn1=null;
		this.copyTaskBtn2=null;
		this.copyFunBtn=null;
		this.task_log_txt=null;
		this.task_log_btn=null;
		this.notice_txt=null;
		this.notice_btn=null;
		this.notice_ck=null;
		this.cq_txt1=null;
		this.cq_btn1=null;
		this.cq_txt2=null;
		this.cq_txt3=null;
		this.cq_btn2=null;
		this.reload_txt=null;
		this.reload_btn=null;
		this.taskLog_txt=null;
		this.noticetype_txt=null;
		GmTaskViewUI.__super.call(this);
	}

	__class(GmTaskViewUI,'ui.mobile.gm.view.GmTaskViewUI',_super);
	var __proto=GmTaskViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gm/view/GmTaskView");
	}

	return GmTaskViewUI;
})(View)


//class ui.mobile.gm.view.GmYunyingViewUI extends laya.ui.View
var GmYunyingViewUI=(function(_super){
	function GmYunyingViewUI(){
		this.guangbo=null;
		this.yun_bo_area_txt=null;
		this.yun_bo_content_txt=null;
		this.yun_bo_btn=null;
		this.yun_bo_box0=null;
		this.yun_bo_box1=null;
		this.yun_bo_box2=null;
		this.yun_bo_box3=null;
		this.yun_bo_box4=null;
		this.yun_bo_box5=null;
		this.phone_txt=null;
		this.cdkGetBtn=null;
		this.cdkTxt=null;
		this.checkCdkBtn=null;
		this.jinyan=null;
		this.yun_jin_area_txt=null;
		this.yun_jin_area_txt2=null;
		this.yun_jin_account_txt=null;
		this.yun_jin_name_txt=null;
		this.yun_jin_btn=null;
		this.yun_jin_time_txt=null;
		this.fuli_txt1=null;
		this.fuli_txt2=null;
		this.fuli_txt3=null;
		this.btnFuli=null;
		this.tiren=null;
		this.yun_ti_id_txt=null;
		this.yun_ti_id_btn=null;
		this.yun_ti_name_txt=null;
		this.yun_see_online_btn=null;
		this.yun_ti_server_btn=null;
		this.yun_ti_server_txt=null;
		this.yun_guild_area_txt=null;
		this.yun_guild_btn=null;
		this.yun_guild_name_txt=null;
		this.fenghao=null;
		this.yun_feng_area_txt=null;
		this.yun_feng_area_txt2=null;
		this.yun_feng_account_txt=null;
		this.yun_feng_name_txt=null;
		this.yun_feng_btn1=null;
		this.yun_feng_box=null;
		this.yun_feng_btn2=null;
		this.yun_feng_btn3=null;
		this.yun_feng_time_txt=null;
		this.yun_feng_radioBtn1=null;
		this.yun_feng_radioBtn2=null;
		this.yun_feng_radioBtn3=null;
		this.yun_feng_radioBtn4=null;
		this.yun_feng_radioBtn5=null;
		GmYunyingViewUI.__super.call(this);
	}

	__class(GmYunyingViewUI,'ui.mobile.gm.view.GmYunyingViewUI',_super);
	var __proto=GmYunyingViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gm/view/GmYunyingView");
	}

	return GmYunyingViewUI;
})(View)


//class ui.mobile.gubao.GubaoItemUI extends laya.ui.View
var GubaoItemUI=(function(_super){
	function GubaoItemUI(){
		this.stateTxt=null;
		this.nameTxt=null;
		this.icon=null;
		GubaoItemUI.__super.call(this);
	}

	__class(GubaoItemUI,'ui.mobile.gubao.GubaoItemUI',_super);
	var __proto=GubaoItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gubao/GubaoItem");
	}

	return GubaoItemUI;
})(View)


//class ui.mobile.gubao.GubaoTipUI extends laya.ui.View
var GubaoTipUI=(function(_super){
	function GubaoTipUI(){
		this.bg=null;
		this.grid=null;
		this.name_txt=null;
		this.type_txt=null;
		this.box=null;
		this.attr_box=null;
		this.attr_txt=null;
		this.suit_box=null;
		this.suitQua_txt=null;
		this.suit0=null;
		this.suit1=null;
		this.icon=null;
		GubaoTipUI.__super.call(this);
	}

	__class(GubaoTipUI,'ui.mobile.gubao.GubaoTipUI',_super);
	var __proto=GubaoTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gubao/GubaoTip");
	}

	return GubaoTipUI;
})(View)


//class ui.mobile.gubao.GubaoViewUI extends laya.ui.View
var GubaoViewUI=(function(_super){
	function GubaoViewUI(){
		this.btnTotal=null;
		this.yijihuo=null;
		this.r_suitTxt=null;
		this.r_desTxt=null;
		this.r_nameTxt=null;
		this.attrTxt=null;
		this.nameImg=null;
		this.c_icon=null;
		this.c_txt=null;
		this.d_select=null;
		this.btnUP=null;
		this.r_icon=null;
		this.tabs_panel=null;
		this.tabs=null;
		this.d_panel=null;
		this.get_way=null;
		this.totalTxt=null;
		GubaoViewUI.__super.call(this);
	}

	__class(GubaoViewUI,'ui.mobile.gubao.GubaoViewUI',_super);
	var __proto=GubaoViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gubao/GubaoView");
	}

	return GubaoViewUI;
})(View)


//class ui.mobile.gubao.miaosha.MiaoShaBigGridUI extends laya.ui.View
var MiaoShaBigGridUI=(function(_super){
	function MiaoShaBigGridUI(){
		this.item_box=null;
		this.icon=null;
		this.select_img=null;
		this.num_box=null;
		this.tip_box=null;
		this.red_box=null;
		MiaoShaBigGridUI.__super.call(this);
	}

	__class(MiaoShaBigGridUI,'ui.mobile.gubao.miaosha.MiaoShaBigGridUI',_super);
	var __proto=MiaoShaBigGridUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gubao/miaosha/MiaoShaBigGrid");
	}

	return MiaoShaBigGridUI;
})(View)


//class ui.mobile.gubao.miaosha.MiaoShaGridUI extends laya.ui.View
var MiaoShaGridUI=(function(_super){
	function MiaoShaGridUI(){
		this.item_box=null;
		this.icon=null;
		this.select_img=null;
		this.num_box=null;
		this.tip_box=null;
		this.red_box=null;
		MiaoShaGridUI.__super.call(this);
	}

	__class(MiaoShaGridUI,'ui.mobile.gubao.miaosha.MiaoShaGridUI',_super);
	var __proto=MiaoShaGridUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gubao/miaosha/MiaoShaGrid");
	}

	return MiaoShaGridUI;
})(View)


//class ui.mobile.gubao.miaosha.MiaoShaTipUI extends laya.ui.View
var MiaoShaTipUI=(function(_super){
	function MiaoShaTipUI(){
		this.bg=null;
		this.eff_box=null;
		this.name_img=null;
		this.attr_img=null;
		this.c_attrTxt=null;
		this.desc_img=null;
		MiaoShaTipUI.__super.call(this);
	}

	__class(MiaoShaTipUI,'ui.mobile.gubao.miaosha.MiaoShaTipUI',_super);
	var __proto=MiaoShaTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gubao/miaosha/MiaoShaTip");
	}

	return MiaoShaTipUI;
})(View)


//class ui.mobile.gubao.miaosha.MiaoShaViewUI extends laya.ui.View
var MiaoShaViewUI=(function(_super){
	function MiaoShaViewUI(){
		this.other_box=null;
		this.tip_txt=null;
		this.item0=null;
		this.item1=null;
		this.item2=null;
		this.item3=null;
		this.item4=null;
		this.item5=null;
		this.item6=null;
		this.item7=null;
		this.item8=null;
		this.item9=null;
		this.eff_box=null;
		this.tip_box=null;
		this.tip_img=null;
		this.tip_view=null;
		MiaoShaViewUI.__super.call(this);
	}

	__class(MiaoShaViewUI,'ui.mobile.gubao.miaosha.MiaoShaViewUI',_super);
	var __proto=MiaoShaViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.gubao.miaosha.MiaoShaUpPanelUI",MiaoShaUpPanelUI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gubao/miaosha/MiaoShaView");
	}

	return MiaoShaViewUI;
})(View)


//class ui.mobile.gubao.ShenGuMasterViewUI extends laya.ui.View
var ShenGuMasterViewUI=(function(_super){
	function ShenGuMasterViewUI(){
		this.bg=null;
		this.suitNode=null;
		this.suitTitle_txt=null;
		this.suit_txt1=null;
		this.suit_txt2=null;
		ShenGuMasterViewUI.__super.call(this);
	}

	__class(ShenGuMasterViewUI,'ui.mobile.gubao.ShenGuMasterViewUI',_super);
	var __proto=ShenGuMasterViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gubao/ShenGuMasterView");
	}

	return ShenGuMasterViewUI;
})(View)


//class ui.mobile.gubao.ShenGuUpItemUI extends laya.ui.View
var ShenGuUpItemUI=(function(_super){
	function ShenGuUpItemUI(){
		this.bg=null;
		this.name_txt=null;
		ShenGuUpItemUI.__super.call(this);
	}

	__class(ShenGuUpItemUI,'ui.mobile.gubao.ShenGuUpItemUI',_super);
	var __proto=ShenGuUpItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gubao/ShenGuUpItem");
	}

	return ShenGuUpItemUI;
})(View)


//class ui.mobile.gubao.ShenGuViewUI extends laya.ui.View
var ShenGuViewUI=(function(_super){
	function ShenGuViewUI(){
		this.avatarNode=null;
		this.touchNode=null;
		this.line1=null;
		this.line2=null;
		this.line3=null;
		this.line4=null;
		this.line5=null;
		this.line6=null;
		this.line7=null;
		this.line8=null;
		this.line9=null;
		this.line10=null;
		this.bg_grid1=null;
		this.bg_grid2=null;
		this.bg_grid3=null;
		this.bg_grid4=null;
		this.bg_grid5=null;
		this.bg_grid6=null;
		this.bg_grid7=null;
		this.bg_grid8=null;
		this.bg_grid9=null;
		this.bg_grid10=null;
		this.btn_mx=null;
		this.btn_sx=null;
		this.btn_way=null;
		this.btn_up=null;
		this.imgTitle=null;
		this.upPanel=null;
		this.arrow=null;
		this.base_txt=null;
		this.qh_txt=null;
		this.master_mx_txt=null;
		this.mx_txt=null;
		this.sx_txt=null;
		this.master_sx_txt=null;
		this.imgSelected=null;
		this.imgNo=null;
		ShenGuViewUI.__super.call(this);
	}

	__class(ShenGuViewUI,'ui.mobile.gubao.ShenGuViewUI',_super);
	var __proto=ShenGuViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gubao/ShenGuView");
	}

	return ShenGuViewUI;
})(View)


//class ui.mobile.gubao.ShengWangSkillTipUI extends laya.ui.View
var ShengWangSkillTipUI=(function(_super){
	function ShengWangSkillTipUI(){
		this.bg=null;
		this.r_box=null;
		this.r_title=null;
		this.suit_nTxt=null;
		this.partTxt0=null;
		this.partTxt1=null;
		this.suitTxt=null;
		ShengWangSkillTipUI.__super.call(this);
	}

	__class(ShengWangSkillTipUI,'ui.mobile.gubao.ShengWangSkillTipUI',_super);
	var __proto=ShengWangSkillTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gubao/ShengWangSkillTip");
	}

	return ShengWangSkillTipUI;
})(View)


//class ui.mobile.gubao.ShengWangTipUI extends laya.ui.View
var ShengWangTipUI=(function(_super){
	function ShengWangTipUI(){
		this.bg=null;
		this.tip_title=null;
		this.tip_attr=null;
		ShengWangTipUI.__super.call(this);
	}

	__class(ShengWangTipUI,'ui.mobile.gubao.ShengWangTipUI',_super);
	var __proto=ShengWangTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gubao/ShengWangTip");
	}

	return ShengWangTipUI;
})(View)


//class ui.mobile.gubao.ShengWangViewUI extends laya.ui.View
var ShengWangViewUI=(function(_super){
	function ShengWangViewUI(){
		this.grid0=null;
		this.jiaobiao0=null;
		this.grid2=null;
		this.jiaobiao2=null;
		this.grid4=null;
		this.jiaobiao4=null;
		this.grid6=null;
		this.jiaobiao6=null;
		this.grid8=null;
		this.jiaobiao8=null;
		this.grid1=null;
		this.jiaobiao1=null;
		this.grid3=null;
		this.g_select=null;
		this.jiaobiao3=null;
		this.grid5=null;
		this.jiaobiao5=null;
		this.grid7=null;
		this.jiaobiao7=null;
		this.grid9=null;
		this.jiaobiao9=null;
		this.btnUP=null;
		this.yimanjie=null;
		this.btnTotal=null;
		this.btnHH=null;
		this.bottomBg=null;
		this.skillbg0=null;
		this.skillTxt0=null;
		this.skillbg1=null;
		this.skillTxt1=null;
		this.nameTxt=null;
		this.attrTxt=null;
		this.cost_txt=null;
		this.r_grid=null;
		this.r_jiaobiao=null;
		this.btnGet=null;
		ShengWangViewUI.__super.call(this);
	}

	__class(ShengWangViewUI,'ui.mobile.gubao.ShengWangViewUI',_super);
	var __proto=ShengWangViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gubao/ShengWangView");
	}

	return ShengWangViewUI;
})(View)


//class ui.mobile.gubao.YuhunViewUI extends laya.ui.View
var YuhunViewUI=(function(_super){
	function YuhunViewUI(){
		this.tipBox=null;
		this.grid0=null;
		this.grid1=null;
		this.grid2=null;
		this.grid3=null;
		this.grid4=null;
		this.grid5=null;
		this.grid8=null;
		this.grid6=null;
		this.grid7=null;
		this.grid9=null;
		YuhunViewUI.__super.call(this);
	}

	__class(YuhunViewUI,'ui.mobile.gubao.YuhunViewUI',_super);
	var __proto=YuhunViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.gubao.YuhunGridUI",YuhunGridUI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gubao/YuhunView");
	}

	return YuhunViewUI;
})(View)


//class ui.mobile.guild.GuildViewUI extends laya.ui.View
var GuildViewUI=(function(_super){
	function GuildViewUI(){
		this.bg=null;
		this.tabs=null;
		this.m_box=null;
		this.m_icon=null;
		this.m_txt=null;
		this.m_nameTxt=null;
		this.m_btnGet=null;
		GuildViewUI.__super.call(this);
	}

	__class(GuildViewUI,'ui.mobile.guild.GuildViewUI',_super);
	var __proto=GuildViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/guild/GuildView");
	}

	return GuildViewUI;
})(View)


//class ui.mobile.guild.list.GuildListHasItemUI extends laya.ui.View
var GuildListHasItemUI=(function(_super){
	function GuildListHasItemUI(){
		this.rank_txt=null;
		this.guildName_txt=null;
		this.level_txt=null;
		this.count_txt=null;
		this.power_txt=null;
		this.my_img=null;
		this.btn1=null;
		this.btn2=null;
		this.btn3=null;
		this.tip_txt=null;
		GuildListHasItemUI.__super.call(this);
	}

	__class(GuildListHasItemUI,'ui.mobile.guild.list.GuildListHasItemUI',_super);
	var __proto=GuildListHasItemUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/guild/list/GuildListHasItem");
	}

	return GuildListHasItemUI;
})(View)


//class ui.mobile.guild.list.GuildListItemUI extends laya.ui.View
var GuildListItemUI=(function(_super){
	function GuildListItemUI(){
		this.guildName_txt=null;
		this.level_txt=null;
		this.count_txt=null;
		this.tip_txt=null;
		this.btn=null;
		GuildListItemUI.__super.call(this);
	}

	__class(GuildListItemUI,'ui.mobile.guild.list.GuildListItemUI',_super);
	var __proto=GuildListItemUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/guild/list/GuildListItem");
	}

	return GuildListItemUI;
})(View)


//class ui.mobile.guild.tip.GuildTanheTipUI extends laya.ui.View
var GuildTanheTipUI=(function(_super){
	function GuildTanheTipUI(){
		this.bg=null;
		this.day_txt=null;
		this.desc_txt=null;
		GuildTanheTipUI.__super.call(this);
	}

	__class(GuildTanheTipUI,'ui.mobile.guild.tip.GuildTanheTipUI',_super);
	var __proto=GuildTanheTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/guild/tip/GuildTanheTip");
	}

	return GuildTanheTipUI;
})(View)


//class ui.mobile.guild.view.GuildCangkuViewUI extends laya.ui.View
var GuildCangkuViewUI=(function(_super){
	function GuildCangkuViewUI(){
		this.haveTxt=null;
		this.haveIcon=null;
		this.l_list=null;
		this.r_list=null;
		this.btn1=null;
		this.btn2=null;
		this.btn3=null;
		this.btnSX=null;
		this.btn4=null;
		GuildCangkuViewUI.__super.call(this);
	}

	__class(GuildCangkuViewUI,'ui.mobile.guild.view.GuildCangkuViewUI',_super);
	var __proto=GuildCangkuViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/guild/view/GuildCangkuView");
	}

	return GuildCangkuViewUI;
})(View)


//class ui.mobile.guild.view.GuildInfoViewUI extends laya.ui.View
var GuildInfoViewUI=(function(_super){
	function GuildInfoViewUI(){
		this.bar=null;
		this.expbar=null;
		this.en_txt=null;
		this.lv_txt1=null;
		this.lv_txt2=null;
		this.exp_txt=null;
		this.name_txt=null;
		this.level_txt=null;
		this.count_txt=null;
		this.rank_txt=null;
		this.role_txt=null;
		this.btn1=null;
		this.btn2=null;
		this.btnHB=null;
		this.notice_box=null;
		this.notice_txt=null;
		this.noticeTip_txt=null;
		this.dissolve_btn=null;
		this.name_btn=null;
		this.notice_btn=null;
		GuildInfoViewUI.__super.call(this);
	}

	__class(GuildInfoViewUI,'ui.mobile.guild.view.GuildInfoViewUI',_super);
	var __proto=GuildInfoViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/guild/view/GuildInfoView");
	}

	return GuildInfoViewUI;
})(View)


//class ui.mobile.guild.view.GuildLogViewUI extends laya.ui.View
var GuildLogViewUI=(function(_super){
	function GuildLogViewUI(){
		this.right_btn=null;
		this.left_btn=null;
		this.page_txt=null;
		GuildLogViewUI.__super.call(this);
	}

	__class(GuildLogViewUI,'ui.mobile.guild.view.GuildLogViewUI',_super);
	var __proto=GuildLogViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/guild/view/GuildLogView");
	}

	return GuildLogViewUI;
})(View)


//class ui.mobile.guild.view.GuildMemberViewUI extends laya.ui.View
var GuildMemberViewUI=(function(_super){
	function GuildMemberViewUI(){
		this.title0=null;
		this.title1=null;
		this.title2=null;
		this.title3=null;
		this.title4=null;
		this.cd_txt=null;
		this.online_txt=null;
		this.online_btn=null;
		this.right_btn=null;
		this.left_btn=null;
		this.page_txt=null;
		this.btn=null;
		this.list_btn=null;
		GuildMemberViewUI.__super.call(this);
	}

	__class(GuildMemberViewUI,'ui.mobile.guild.view.GuildMemberViewUI',_super);
	var __proto=GuildMemberViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/guild/view/GuildMemberView");
	}

	return GuildMemberViewUI;
})(View)


//class ui.mobile.mall.view.MallShopViewUI extends laya.ui.View
var MallShopViewUI=(function(_super){
	function MallShopViewUI(){
		this.bg=null;
		this.r_bg=null;
		this.list=null;
		this.desc_txt=null;
		this.name_txt=null;
		this.cost_txt=null;
		this.money_txt3=null;
		this.have_txt=null;
		this.grid=null;
		this.buy_btn=null;
		this.icon3=null;
		this.txt=null;
		this.select_img=null;
		this.add_btn=null;
		this.sub_btn=null;
		this.sub10_btn=null;
		this.add10_btn=null;
		MallShopViewUI.__super.call(this);
	}

	__class(MallShopViewUI,'ui.mobile.mall.view.MallShopViewUI',_super);
	var __proto=MallShopViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/mall/view/MallShopView");
	}

	return MallShopViewUI;
})(View)


//class ui.mobile.guild.view.item.GuildLogItemUI extends laya.ui.View
var GuildLogItemUI=(function(_super){
	function GuildLogItemUI(){
		this.date_txt=null;
		this.content_txt=null;
		GuildLogItemUI.__super.call(this);
	}

	__class(GuildLogItemUI,'ui.mobile.guild.view.item.GuildLogItemUI',_super);
	var __proto=GuildLogItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/guild/view/item/GuildLogItem");
	}

	return GuildLogItemUI;
})(View)


//class ui.mobile.guild.view.item.GuildMemberItemUI extends laya.ui.View
var GuildMemberItemUI=(function(_super){
	function GuildMemberItemUI(){
		this.pos_txt=null;
		this.level_txt=null;
		this.gongxian_txt=null;
		this.state_txt=null;
		GuildMemberItemUI.__super.call(this);
	}

	__class(GuildMemberItemUI,'ui.mobile.guild.view.item.GuildMemberItemUI',_super);
	var __proto=GuildMemberItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/guild/view/item/GuildMemberItem");
	}

	return GuildMemberItemUI;
})(View)


//class ui.mobile.guild.xuanba.GuildXuanbaViewUI extends laya.ui.View
var GuildXuanbaViewUI=(function(_super){
	function GuildXuanbaViewUI(){
		this.timebg=null;
		this.fightTxt=null;
		this.btn_fight=null;
		this.rank1=null;
		this.rank2=null;
		this.rank0=null;
		this.r_list=null;
		GuildXuanbaViewUI.__super.call(this);
	}

	__class(GuildXuanbaViewUI,'ui.mobile.guild.xuanba.GuildXuanbaViewUI',_super);
	var __proto=GuildXuanbaViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.guild.xuanba.GuildXuanbaItemUI",GuildXuanbaItemUI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/guild/xuanba/GuildXuanbaView");
	}

	return GuildXuanbaViewUI;
})(View)


//class ui.mobile.guild.xuanba.GuildXuanyanViewUI extends laya.ui.View
var GuildXuanyanViewUI=(function(_super){
	function GuildXuanyanViewUI(){
		this.content_txt=null;
		this.yuanbao_box=null;
		this.txt1=null;
		this.btn_2=null;
		this.btnTxt2=null;
		this.txt2=null;
		this.btn_1=null;
		this.btnXuanshi=null;
		this.nameTxt=null;
		this.timer_txt=null;
		this.btn_reward=null;
		GuildXuanyanViewUI.__super.call(this);
	}

	__class(GuildXuanyanViewUI,'ui.mobile.guild.xuanba.GuildXuanyanViewUI',_super);
	var __proto=GuildXuanyanViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/guild/xuanba/GuildXuanyanView");
	}

	return GuildXuanyanViewUI;
})(View)


//class ui.mobile.guild.xuanba.XuanbaAvatarUI extends laya.ui.View
var XuanbaAvatarUI=(function(_super){
	function XuanbaAvatarUI(){
		this.taizi=null;
		this.txtbg=null;
		this.zdl=null;
		this.nameTxt=null;
		this.yingzi=null;
		XuanbaAvatarUI.__super.call(this);
	}

	__class(XuanbaAvatarUI,'ui.mobile.guild.xuanba.XuanbaAvatarUI',_super);
	var __proto=XuanbaAvatarUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/guild/xuanba/XuanbaAvatar");
	}

	return XuanbaAvatarUI;
})(View)


//class ui.mobile.help.BaoKuJiangLiItemUI extends laya.ui.View
var BaoKuJiangLiItemUI=(function(_super){
	function BaoKuJiangLiItemUI(){
		this.bg=null;
		this.icon=null;
		this.odds_txt=null;
		BaoKuJiangLiItemUI.__super.call(this);
	}

	__class(BaoKuJiangLiItemUI,'ui.mobile.help.BaoKuJiangLiItemUI',_super);
	var __proto=BaoKuJiangLiItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/help/BaoKuJiangLiItem");
	}

	return BaoKuJiangLiItemUI;
})(View)


//class ui.mobile.help.GetwayItemUI extends laya.ui.View
var GetwayItemUI=(function(_super){
	function GetwayItemUI(){
		this.bg=null;
		this.jump_txt=null;
		this.name_txt=null;
		GetwayItemUI.__super.call(this);
	}

	__class(GetwayItemUI,'ui.mobile.help.GetwayItemUI',_super);
	var __proto=GetwayItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/help/GetwayItem");
	}

	return GetwayItemUI;
})(View)


//class ui.mobile.jianfu.JianfuPromptUI extends laya.ui.View
var JianfuPromptUI=(function(_super){
	function JianfuPromptUI(){
		this.closeBtn=null;
		this.title=null;
		this.iconbg=null;
		this.btnGo=null;
		this.btnQuxiao=null;
		this.txt=null;
		this.timeTxt=null;
		this.icon=null;
		JianfuPromptUI.__super.call(this);
	}

	__class(JianfuPromptUI,'ui.mobile.jianfu.JianfuPromptUI',_super);
	var __proto=JianfuPromptUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/jianfu/JianfuPrompt");
	}

	return JianfuPromptUI;
})(View)


//class ui.mobile.friend.FriendApplyItemUI extends laya.ui.View
var FriendApplyItemUI=(function(_super){
	function FriendApplyItemUI(){
		this.itembg=null;
		this.job_txt=null;
		this.name_txt=null;
		this.lv_txt=null;
		this.btn_yes=null;
		this.btn_no=null;
		FriendApplyItemUI.__super.call(this);
	}

	__class(FriendApplyItemUI,'ui.mobile.friend.FriendApplyItemUI',_super);
	var __proto=FriendApplyItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/friend/FriendApplyItem");
	}

	return FriendApplyItemUI;
})(View)


//class ui.mobile.map.view.BossSignUI extends laya.ui.View
var BossSignUI=(function(_super){
	function BossSignUI(){
		this.btn=null;
		this.name_txt=null;
		this.time_txt=null;
		BossSignUI.__super.call(this);
	}

	__class(BossSignUI,'ui.mobile.map.view.BossSignUI',_super);
	var __proto=BossSignUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/map/view/BossSign");
	}

	return BossSignUI;
})(View)


//class ui.mobile.map.view.TransferSignUI extends laya.ui.View
var TransferSignUI=(function(_super){
	function TransferSignUI(){
		this.name_txt=null;
		this.count_txt=null;
		this.btn=null;
		TransferSignUI.__super.call(this);
	}

	__class(TransferSignUI,'ui.mobile.map.view.TransferSignUI',_super);
	var __proto=TransferSignUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/map/view/TransferSign");
	}

	return TransferSignUI;
})(View)


//class ui.mobile.map.view.MapNpcItemUI extends laya.ui.View
var MapNpcItemUI=(function(_super){
	function MapNpcItemUI(){
		this.bg=null;
		this.flag=null;
		this.name_txt=null;
		MapNpcItemUI.__super.call(this);
	}

	__class(MapNpcItemUI,'ui.mobile.map.view.MapNpcItemUI',_super);
	var __proto=MapNpcItemUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/map/view/MapNpcItem");
	}

	return MapNpcItemUI;
})(View)


//class ui.mobile.map.view.MapViewUI extends laya.ui.View
var MapViewUI=(function(_super){
	function MapViewUI(){
		this.mapbg=null;
		this.city_btn=null;
		this.suiji_btn=null;
		this.flag_box=null;
		this.txt1=null;
		this.txt2=null;
		this.txt3=null;
		this.name_txt=null;
		this.pos_txt=null;
		this.pk_txt=null;
		this.use_txt=null;
		this.r_grid=null;
		this.r_gTxt=null;
		this.r_list=null;
		this.pos_btn=null;
		MapViewUI.__super.call(this);
	}

	__class(MapViewUI,'ui.mobile.map.view.MapViewUI',_super);
	var __proto=MapViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/map/view/MapView");
	}

	return MapViewUI;
})(View)


//class ui.mobile.kuafu.fxsm.FuXiShenMuAccordionItemUI extends laya.ui.View
var FuXiShenMuAccordionItemUI=(function(_super){
	function FuXiShenMuAccordionItemUI(){
		this.lv_txt=null;
		this.name_txt=null;
		this.icon=null;
		FuXiShenMuAccordionItemUI.__super.call(this);
	}

	__class(FuXiShenMuAccordionItemUI,'ui.mobile.kuafu.fxsm.FuXiShenMuAccordionItemUI',_super);
	var __proto=FuXiShenMuAccordionItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafu/fxsm/FuXiShenMuAccordionItem");
	}

	return FuXiShenMuAccordionItemUI;
})(View)


//class ui.mobile.kuafu.szsd.ShengZhuangShenDianTrackUI extends laya.ui.View
var ShengZhuangShenDianTrackUI=(function(_super){
	function ShengZhuangShenDianTrackUI(){
		this.bg=null;
		this.titleBox=null;
		this.title=null;
		this.line=null;
		this.money_txt=null;
		this.btn_buy=null;
		this.tip_txt1=null;
		this.tip_txt2=null;
		this.list=null;
		this.btnHide=null;
		this.btnExit=null;
		ShengZhuangShenDianTrackUI.__super.call(this);
	}

	__class(ShengZhuangShenDianTrackUI,'ui.mobile.kuafu.szsd.ShengZhuangShenDianTrackUI',_super);
	var __proto=ShengZhuangShenDianTrackUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafu/szsd/ShengZhuangShenDianTrack");
	}

	return ShengZhuangShenDianTrackUI;
})(View)


//class ui.mobile.kuafu.szsd.ShengZhuangShenDianTrackItemUI extends laya.ui.View
var ShengZhuangShenDianTrackItemUI=(function(_super){
	function ShengZhuangShenDianTrackItemUI(){
		this.name_txt=null;
		this.state_txt=null;
		ShengZhuangShenDianTrackItemUI.__super.call(this);
	}

	__class(ShengZhuangShenDianTrackItemUI,'ui.mobile.kuafu.szsd.ShengZhuangShenDianTrackItemUI',_super);
	var __proto=ShengZhuangShenDianTrackItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafu/szsd/ShengZhuangShenDianTrackItem");
	}

	return ShengZhuangShenDianTrackItemUI;
})(View)


//class ui.mobile.kuafu.fxsm.FuXiShenMuViewUI extends laya.ui.View
var FuXiShenMuViewUI=(function(_super){
	function FuXiShenMuViewUI(){
		this.avatarNode=null;
		this.bg_time=null;
		this.time_txt=null;
		this.btn=null;
		this.need_txt=null;
		this.tips_txt=null;
		this.dropImg=null;
		this.bgNeed=null;
		this.add_txt=null;
		this.own_txt=null;
		this.check_remind=null;
		this.liudao=null;
		FuXiShenMuViewUI.__super.call(this);
	}

	__class(FuXiShenMuViewUI,'ui.mobile.kuafu.fxsm.FuXiShenMuViewUI',_super);
	var __proto=FuXiShenMuViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafu/fxsm/FuXiShenMuView");
	}

	return FuXiShenMuViewUI;
})(View)


//class ui.mobile.kuafu.lhsd.LunhuiJiaozhuViewUI extends laya.ui.View
var LunhuiJiaozhuViewUI=(function(_super){
	function LunhuiJiaozhuViewUI(){
		this.btn=null;
		this.need_txt=null;
		this.yeliTxt=null;
		this.mapTxt=null;
		LunhuiJiaozhuViewUI.__super.call(this);
	}

	__class(LunhuiJiaozhuViewUI,'ui.mobile.kuafu.lhsd.LunhuiJiaozhuViewUI',_super);
	var __proto=LunhuiJiaozhuViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafu/lhsd/LunhuiJiaozhuView");
	}

	return LunhuiJiaozhuViewUI;
})(View)


//class ui.mobile.kuafu.nwdl.NvWaDaLuAccordionItemUI extends laya.ui.View
var NvWaDaLuAccordionItemUI=(function(_super){
	function NvWaDaLuAccordionItemUI(){
		this.lv_txt=null;
		this.name_txt=null;
		NvWaDaLuAccordionItemUI.__super.call(this);
	}

	__class(NvWaDaLuAccordionItemUI,'ui.mobile.kuafu.nwdl.NvWaDaLuAccordionItemUI',_super);
	var __proto=NvWaDaLuAccordionItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafu/nwdl/NvWaDaLuAccordionItem");
	}

	return NvWaDaLuAccordionItemUI;
})(View)


//class ui.mobile.kuafu.nwdl.NvWaDaLuViewUI extends laya.ui.View
var NvWaDaLuViewUI=(function(_super){
	function NvWaDaLuViewUI(){
		this.need_txt=null;
		this.bg_time=null;
		this.time_txt=null;
		this.avatarNode=null;
		this.btn=null;
		NvWaDaLuViewUI.__super.call(this);
	}

	__class(NvWaDaLuViewUI,'ui.mobile.kuafu.nwdl.NvWaDaLuViewUI',_super);
	var __proto=NvWaDaLuViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafu/nwdl/NvWaDaLuView");
	}

	return NvWaDaLuViewUI;
})(View)


//class ui.mobile.kuafu.szsd.ShengZhuangShenDianItemUI extends laya.ui.View
var ShengZhuangShenDianItemUI=(function(_super){
	function ShengZhuangShenDianItemUI(){
		this.imgSelected=null;
		this.bg=null;
		this.floor_txt=null;
		this.name_txt1=null;
		this.state_txt1=null;
		this.name_txt2=null;
		this.state_txt2=null;
		this.name_txt3=null;
		this.state_txt3=null;
		ShengZhuangShenDianItemUI.__super.call(this);
	}

	__class(ShengZhuangShenDianItemUI,'ui.mobile.kuafu.szsd.ShengZhuangShenDianItemUI',_super);
	var __proto=ShengZhuangShenDianItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafu/szsd/ShengZhuangShenDianItem");
	}

	return ShengZhuangShenDianItemUI;
})(View)


//class ui.mobile.kuafu.szsd.ShengZhuangShenDianViewUI extends laya.ui.View
var ShengZhuangShenDianViewUI=(function(_super){
	function ShengZhuangShenDianViewUI(){
		this.list=null;
		this.add_txt=null;
		this.money_txt=null;
		this.need_txt=null;
		this.btn=null;
		ShengZhuangShenDianViewUI.__super.call(this);
	}

	__class(ShengZhuangShenDianViewUI,'ui.mobile.kuafu.szsd.ShengZhuangShenDianViewUI',_super);
	var __proto=ShengZhuangShenDianViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafu/szsd/ShengZhuangShenDianView");
	}

	return ShengZhuangShenDianViewUI;
})(View)


//class ui.mobile.kuafu.wlsz.WoLongShanZhuangViewUI extends laya.ui.View
var WoLongShanZhuangViewUI=(function(_super){
	function WoLongShanZhuangViewUI(){
		this.bossNode1=null;
		this.time_txt1=null;
		this.name_txt1=null;
		this.bossNode2=null;
		this.time_txt2=null;
		this.name_txt2=null;
		this.times_txt=null;
		this.btn_up=null;
		WoLongShanZhuangViewUI.__super.call(this);
	}

	__class(WoLongShanZhuangViewUI,'ui.mobile.kuafu.wlsz.WoLongShanZhuangViewUI',_super);
	var __proto=WoLongShanZhuangViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafu/wlsz/WoLongShanZhuangView");
	}

	return WoLongShanZhuangViewUI;
})(View)


//class ui.mobile.kuafu.wlsz.WoLongShopItemUI extends laya.ui.View
var WoLongShopItemUI=(function(_super){
	function WoLongShopItemUI(){
		this.bg=null;
		this.btn=null;
		this.name_txt=null;
		this.need_txt=null;
		this.limit_txt=null;
		WoLongShopItemUI.__super.call(this);
	}

	__class(WoLongShopItemUI,'ui.mobile.kuafu.wlsz.WoLongShopItemUI',_super);
	var __proto=WoLongShopItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafu/wlsz/WoLongShopItem");
	}

	return WoLongShopItemUI;
})(View)


//class ui.mobile.kuafu.wlsz.WoLongTrackUI extends laya.ui.View
var WoLongTrackUI=(function(_super){
	function WoLongTrackUI(){
		this.bg=null;
		this.titleBox=null;
		this.title=null;
		this.btnShop=null;
		this.kill_txt1=null;
		this.kill_txt2=null;
		this.kill_txt3=null;
		this.kill_txt4=null;
		this.num_txt=null;
		this.btnHide=null;
		this.btnExit=null;
		WoLongTrackUI.__super.call(this);
	}

	__class(WoLongTrackUI,'ui.mobile.kuafu.wlsz.WoLongTrackUI',_super);
	var __proto=WoLongTrackUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafu/wlsz/WoLongTrack");
	}

	return WoLongTrackUI;
})(View)


//class ui.mobile.kuafu.zyz.KuaFuCampWarRankItemUI extends laya.ui.View
var KuaFuCampWarRankItemUI=(function(_super){
	function KuaFuCampWarRankItemUI(){
		this.imgRank=null;
		this.name_txt=null;
		this.guild_txt=null;
		this.point_txt=null;
		this.rank_txt=null;
		KuaFuCampWarRankItemUI.__super.call(this);
	}

	__class(KuaFuCampWarRankItemUI,'ui.mobile.kuafu.zyz.KuaFuCampWarRankItemUI',_super);
	var __proto=KuaFuCampWarRankItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafu/zyz/KuaFuCampWarRankItem");
	}

	return KuaFuCampWarRankItemUI;
})(View)


//class ui.mobile.kuafu.zyz.KuaFuCampWarRankPanelUI extends laya.ui.View
var KuaFuCampWarRankPanelUI=(function(_super){
	function KuaFuCampWarRankPanelUI(){
		this.list=null;
		this.myRank_txt=null;
		this.myPoint_txt=null;
		KuaFuCampWarRankPanelUI.__super.call(this);
	}

	__class(KuaFuCampWarRankPanelUI,'ui.mobile.kuafu.zyz.KuaFuCampWarRankPanelUI',_super);
	var __proto=KuaFuCampWarRankPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafu/zyz/KuaFuCampWarRankPanel");
	}

	return KuaFuCampWarRankPanelUI;
})(View)


//class ui.mobile.kuafu.zyz.KuaFuCampWarRewardItemUI extends laya.ui.View
var KuaFuCampWarRewardItemUI=(function(_super){
	function KuaFuCampWarRewardItemUI(){
		this.point_txt=null;
		this.imgGot1=null;
		this.imgGot2=null;
		KuaFuCampWarRewardItemUI.__super.call(this);
	}

	__class(KuaFuCampWarRewardItemUI,'ui.mobile.kuafu.zyz.KuaFuCampWarRewardItemUI',_super);
	var __proto=KuaFuCampWarRewardItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafu/zyz/KuaFuCampWarRewardItem");
	}

	return KuaFuCampWarRewardItemUI;
})(View)


//class ui.mobile.kuafu.zyz.KuaFuCampWarRewardPanelUI extends laya.ui.View
var KuaFuCampWarRewardPanelUI=(function(_super){
	function KuaFuCampWarRewardPanelUI(){
		this.list=null;
		KuaFuCampWarRewardPanelUI.__super.call(this);
	}

	__class(KuaFuCampWarRewardPanelUI,'ui.mobile.kuafu.zyz.KuaFuCampWarRewardPanelUI',_super);
	var __proto=KuaFuCampWarRewardPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafu/zyz/KuaFuCampWarRewardPanel");
	}

	return KuaFuCampWarRewardPanelUI;
})(View)


//class ui.mobile.kuafu.zyz.KuaFuCampWarTrackItemUI extends laya.ui.View
var KuaFuCampWarTrackItemUI=(function(_super){
	function KuaFuCampWarTrackItemUI(){
		this.rank_txt=null;
		this.point_txt=null;
		this.name_txt=null;
		this.imgRank=null;
		KuaFuCampWarTrackItemUI.__super.call(this);
	}

	__class(KuaFuCampWarTrackItemUI,'ui.mobile.kuafu.zyz.KuaFuCampWarTrackItemUI',_super);
	var __proto=KuaFuCampWarTrackItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafu/zyz/KuaFuCampWarTrackItem");
	}

	return KuaFuCampWarTrackItemUI;
})(View)


//class ui.mobile.Window5UI extends laya.ui.View
var Window5UI=(function(_super){
	function Window5UI(){
		this.bg=null;
		this.closeBtn=null;
		Window5UI.__super.call(this);
	}

	__class(Window5UI,'ui.mobile.Window5UI',_super);
	var __proto=Window5UI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/Window5");
	}

	return Window5UI;
})(View)


//class ui.mobile.kuafuBattle.item.BattleBigItemUI extends laya.ui.View
var BattleBigItemUI=(function(_super){
	function BattleBigItemUI(){
		this.headBg=null;
		this.timeTxt=null;
		this.nameTxt=null;
		BattleBigItemUI.__super.call(this);
	}

	__class(BattleBigItemUI,'ui.mobile.kuafuBattle.item.BattleBigItemUI',_super);
	var __proto=BattleBigItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafuBattle/item/BattleBigItem");
	}

	return BattleBigItemUI;
})(View)


//class ui.mobile.kuafuBattle.item.BattleItemUI extends laya.ui.View
var BattleItemUI=(function(_super){
	function BattleItemUI(){
		this.hasBox=null;
		this.headbg=null;
		this.timeTxt=null;
		this.nameTxt=null;
		this.playerTxt=null;
		this.noTxt=null;
		BattleItemUI.__super.call(this);
	}

	__class(BattleItemUI,'ui.mobile.kuafuBattle.item.BattleItemUI',_super);
	var __proto=BattleItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafuBattle/item/BattleItem");
	}

	return BattleItemUI;
})(View)


//class ui.mobile.kuafuBattle.panel.KuafuBattleSideItemUI extends laya.ui.View
var KuafuBattleSideItemUI=(function(_super){
	function KuafuBattleSideItemUI(){
		this.btn=null;
		this.headBg=null;
		this.proBg=null;
		this.pro=null;
		this.helpBox=null;
		this.ownerTxt=null;
		this.countTxt=null;
		this.nameTxt=null;
		this.proTxt=null;
		this.buffSp=null;
		this.buffPro=null;
		KuafuBattleSideItemUI.__super.call(this);
	}

	__class(KuafuBattleSideItemUI,'ui.mobile.kuafuBattle.panel.KuafuBattleSideItemUI',_super);
	var __proto=KuafuBattleSideItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafuBattle/panel/KuafuBattleSideItem");
	}

	return KuafuBattleSideItemUI;
})(View)


//class ui.mobile.kuafuBattle.item.KuafuBossTishenItemUI extends laya.ui.View
var KuafuBossTishenItemUI=(function(_super){
	function KuafuBossTishenItemUI(){
		this.checkBox=null;
		this.bossNameTxt=null;
		this.split=null;
		KuafuBossTishenItemUI.__super.call(this);
	}

	__class(KuafuBossTishenItemUI,'ui.mobile.kuafuBattle.item.KuafuBossTishenItemUI',_super);
	var __proto=KuafuBossTishenItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafuBattle/item/KuafuBossTishenItem");
	}

	return KuafuBossTishenItemUI;
})(View)


//class ui.mobile.kuafuBattle.item.ShenyuItemUI extends laya.ui.View
var ShenyuItemUI=(function(_super){
	function ShenyuItemUI(){
		this.avatarSp=null;
		this.timeTxt=null;
		this.zhuanSp=null;
		this.zhuanImg=null;
		this.nameImg=null;
		ShenyuItemUI.__super.call(this);
	}

	__class(ShenyuItemUI,'ui.mobile.kuafuBattle.item.ShenyuItemUI',_super);
	var __proto=ShenyuItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafuBattle/item/ShenyuItem");
	}

	return ShenyuItemUI;
})(View)


//class ui.mobile.kuafuBattle.item.YijiItemUI extends laya.ui.View
var YijiItemUI=(function(_super){
	function YijiItemUI(){
		this.avatarSp=null;
		this.nameTxt=null;
		this.levelTxt=null;
		this.timeTxt=null;
		YijiItemUI.__super.call(this);
	}

	__class(YijiItemUI,'ui.mobile.kuafuBattle.item.YijiItemUI',_super);
	var __proto=YijiItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafuBattle/item/YijiItem");
	}

	return YijiItemUI;
})(View)


//class ui.mobile.kuafuBattle.panel.KuafuBattleSideUI extends laya.ui.View
var KuafuBattleSideUI=(function(_super){
	function KuafuBattleSideUI(){
		this.bg=null;
		this.fj_box=null;
		this.fj_panel=null;
		this.fj_select=null;
		this.p_team=null;
		this.btnHide=null;
		this.l_tabs1=null;
		this.l_tabs2=null;
		this.btnSwitch=null;
		KuafuBattleSideUI.__super.call(this);
	}

	__class(KuafuBattleSideUI,'ui.mobile.kuafuBattle.panel.KuafuBattleSideUI',_super);
	var __proto=KuafuBattleSideUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafuBattle/panel/KuafuBattleSide");
	}

	return KuafuBattleSideUI;
})(View)


//class ui.mobile.kuafuBattle.panel.RewardTipsUI extends laya.ui.View
var RewardTipsUI=(function(_super){
	function RewardTipsUI(){
		this.tipsTxt=null;
		this.awardImg=null;
		RewardTipsUI.__super.call(this);
	}

	__class(RewardTipsUI,'ui.mobile.kuafuBattle.panel.RewardTipsUI',_super);
	var __proto=RewardTipsUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafuBattle/panel/RewardTips");
	}

	return RewardTipsUI;
})(View)


//class ui.mobile.kuafuBattle.item.RewardTipsItemUI extends laya.ui.View
var RewardTipsItemUI=(function(_super){
	function RewardTipsItemUI(){
		this.bg=null;
		this.valueTxt=null;
		this.nameTxt=null;
		RewardTipsItemUI.__super.call(this);
	}

	__class(RewardTipsItemUI,'ui.mobile.kuafuBattle.item.RewardTipsItemUI',_super);
	var __proto=RewardTipsItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafuBattle/item/RewardTipsItem");
	}

	return RewardTipsItemUI;
})(View)


//class ui.mobile.kuafuBattle.view.BattleViewUI extends laya.ui.View
var BattleViewUI=(function(_super){
	function BattleViewUI(){
		this.helpBox=null;
		this.link=null;
		this.noJihuoBox=null;
		this.descTxt=null;
		this.gridCtn=null;
		this.jihuoBox=null;
		this.countTxt=null;
		this.tishenLink=null;
		this.btnTask=null;
		BattleViewUI.__super.call(this);
	}

	__class(BattleViewUI,'ui.mobile.kuafuBattle.view.BattleViewUI',_super);
	var __proto=BattleViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafuBattle/view/BattleView");
	}

	return BattleViewUI;
})(View)


//class ui.mobile.kuafuBattle.view.ShenyuViewUI extends laya.ui.View
var ShenyuViewUI=(function(_super){
	function ShenyuViewUI(){
		this.itemCtn=null;
		this.selectImg0=null;
		this.selectImg1=null;
		this.selectImg2=null;
		this.countTxt=null;
		this.btnGou=null;
		this.btnEnter=null;
		this.helpBox=null;
		ShenyuViewUI.__super.call(this);
	}

	__class(ShenyuViewUI,'ui.mobile.kuafuBattle.view.ShenyuViewUI',_super);
	var __proto=ShenyuViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafuBattle/view/ShenyuView");
	}

	return ShenyuViewUI;
})(View)


//class ui.mobile.kuafuBattle.view.YijiViewUI extends laya.ui.View
var YijiViewUI=(function(_super){
	function YijiViewUI(){
		this.tabs_panel=null;
		this.tabs=null;
		this.attrSp=null;
		this.attrName0=null;
		this.attrName1=null;
		this.attrName2=null;
		this.attrName3=null;
		this.attrName4=null;
		this.valuext0=null;
		this.valuext1=null;
		this.valuext2=null;
		this.valuext3=null;
		this.valuext4=null;
		this.helpBox=null;
		this.btnGou=null;
		this.btnEnter=null;
		this.numTxt=null;
		this.conditionTxt=null;
		this.descTxt=null;
		YijiViewUI.__super.call(this);
	}

	__class(YijiViewUI,'ui.mobile.kuafuBattle.view.YijiViewUI',_super);
	var __proto=YijiViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafuBattle/view/YijiView");
	}

	return YijiViewUI;
})(View)


//class ui.mobile.lilian.LilianReweardItemUI extends laya.ui.View
var LilianReweardItemUI=(function(_super){
	function LilianReweardItemUI(){
		this.img_h=null;
		LilianReweardItemUI.__super.call(this);
	}

	__class(LilianReweardItemUI,'ui.mobile.lilian.LilianReweardItemUI',_super);
	var __proto=LilianReweardItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/lilian/LilianReweardItem");
	}

	return LilianReweardItemUI;
})(View)


//class ui.mobile.lilian.LilianShopItemUI extends laya.ui.View
var LilianShopItemUI=(function(_super){
	function LilianShopItemUI(){
		this.title=null;
		this.c_txt=null;
		this.c_icon=null;
		this.btn=null;
		LilianShopItemUI.__super.call(this);
	}

	__class(LilianShopItemUI,'ui.mobile.lilian.LilianShopItemUI',_super);
	var __proto=LilianShopItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/lilian/LilianShopItem");
	}

	return LilianShopItemUI;
})(View)


//class ui.mobile.longhun.LongHunCostItemUI extends laya.ui.View
var LongHunCostItemUI=(function(_super){
	function LongHunCostItemUI(){
		this.bg=null;
		this.num_txt=null;
		LongHunCostItemUI.__super.call(this);
	}

	__class(LongHunCostItemUI,'ui.mobile.longhun.LongHunCostItemUI',_super);
	var __proto=LongHunCostItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/longhun/LongHunCostItem");
	}

	return LongHunCostItemUI;
})(View)


//class ui.mobile.longhun.LongHunMenuItemUI extends laya.ui.View
var LongHunMenuItemUI=(function(_super){
	function LongHunMenuItemUI(){
		this.jiaobiao=null;
		this.name_txt=null;
		LongHunMenuItemUI.__super.call(this);
	}

	__class(LongHunMenuItemUI,'ui.mobile.longhun.LongHunMenuItemUI',_super);
	var __proto=LongHunMenuItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/longhun/LongHunMenuItem");
	}

	return LongHunMenuItemUI;
})(View)


//class ui.mobile.longhun.LongHunPanelUI extends laya.ui.View
var LongHunPanelUI=(function(_super){
	function LongHunPanelUI(){
		this.bg=null;
		this.effectNode=null;
		this.list_cost=null;
		this.list_menu=null;
		this.btn_up=null;
		this.des_txt=null;
		this.panel=null;
		this.btn_way=null;
		LongHunPanelUI.__super.call(this);
	}

	__class(LongHunPanelUI,'ui.mobile.longhun.LongHunPanelUI',_super);
	var __proto=LongHunPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/longhun/LongHunPanel");
	}

	return LongHunPanelUI;
})(View)


//class ui.mobile.mail.ChatDialogUI extends laya.ui.View
var ChatDialogUI=(function(_super){
	function ChatDialogUI(){
		this.chatPanel=null;
		this.inputNode=null;
		this.btn_roll=null;
		this.btn_add=null;
		this.btn_send=null;
		this.input_txt=null;
		this.reportNode=null;
		ChatDialogUI.__super.call(this);
	}

	__class(ChatDialogUI,'ui.mobile.mail.ChatDialogUI',_super);
	var __proto=ChatDialogUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/mail/ChatDialog");
	}

	return ChatDialogUI;
})(View)


//class ui.mobile.mail.ChatRollItemUI extends laya.ui.View
var ChatRollItemUI=(function(_super){
	function ChatRollItemUI(){
		this.roll_txt=null;
		ChatRollItemUI.__super.call(this);
	}

	__class(ChatRollItemUI,'ui.mobile.mail.ChatRollItemUI',_super);
	var __proto=ChatRollItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/mail/ChatRollItem");
	}

	return ChatRollItemUI;
})(View)


//class ui.mobile.mail.ChatToolsEquipItemUI extends laya.ui.View
var ChatToolsEquipItemUI=(function(_super){
	function ChatToolsEquipItemUI(){
		this.bg=null;
		ChatToolsEquipItemUI.__super.call(this);
	}

	__class(ChatToolsEquipItemUI,'ui.mobile.mail.ChatToolsEquipItemUI',_super);
	var __proto=ChatToolsEquipItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/mail/ChatToolsEquipItem");
	}

	return ChatToolsEquipItemUI;
})(View)


//class ui.mobile.mail.ChatToolsPanelUI extends laya.ui.View
var ChatToolsPanelUI=(function(_super){
	function ChatToolsPanelUI(){
		this.bg=null;
		this.list_quick=null;
		this.panel_face=null;
		this.equipNode=null;
		this.tab_equip=null;
		this.list_equip=null;
		this.settingNode=null;
		this.check_lower=null;
		this.lower_txt=null;
		this.tabs=null;
		this.btn_quick=null;
		this.btn_face=null;
		this.btn_share=null;
		this.btn_setting=null;
		this.btn_place=null;
		this.closeBtn=null;
		ChatToolsPanelUI.__super.call(this);
	}

	__class(ChatToolsPanelUI,'ui.mobile.mail.ChatToolsPanelUI',_super);
	var __proto=ChatToolsPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/mail/ChatToolsPanel");
	}

	return ChatToolsPanelUI;
})(View)


//class ui.mobile.mail.ChatToolsQuickItemUI extends laya.ui.View
var ChatToolsQuickItemUI=(function(_super){
	function ChatToolsQuickItemUI(){
		this.bg=null;
		this.content_txt=null;
		ChatToolsQuickItemUI.__super.call(this);
	}

	__class(ChatToolsQuickItemUI,'ui.mobile.mail.ChatToolsQuickItemUI',_super);
	var __proto=ChatToolsQuickItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/mail/ChatToolsQuickItem");
	}

	return ChatToolsQuickItemUI;
})(View)


//class ui.mobile.main.view.ChatPanelItemUI extends laya.ui.View
var ChatPanelItemUI=(function(_super){
	function ChatPanelItemUI(){
		this.channel_img=null;
		this.bg=null;
		ChatPanelItemUI.__super.call(this);
	}

	__class(ChatPanelItemUI,'ui.mobile.main.view.ChatPanelItemUI',_super);
	var __proto=ChatPanelItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/view/ChatPanelItem");
	}

	return ChatPanelItemUI;
})(View)


//class ui.mobile.mail.FeedBackViewUI extends laya.ui.View
var FeedBackViewUI=(function(_super){
	function FeedBackViewUI(){
		this.imgTitle=null;
		this.bg=null;
		this.btn=null;
		this.check_0=null;
		this.check_1=null;
		this.check_2=null;
		this.check_4=null;
		this.check_3=null;
		this.type_txt=null;
		this.times_txt=null;
		this.check_txt0=null;
		this.check_txt1=null;
		this.check_txt2=null;
		this.check_txt4=null;
		this.check_txt3=null;
		this.tip_txt=null;
		this.input_txt=null;
		this.playItem=null;
		FeedBackViewUI.__super.call(this);
	}

	__class(FeedBackViewUI,'ui.mobile.mail.FeedBackViewUI',_super);
	var __proto=FeedBackViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.mail.GuildChatPlayerItemUI",GuildChatPlayerItemUI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/mail/FeedBackView");
	}

	return FeedBackViewUI;
})(View)


//class ui.mobile.friend.FriendItemUI extends laya.ui.View
var FriendItemUI=(function(_super){
	function FriendItemUI(){
		this.bg=null;
		this.imgRed=null;
		this.job_txt=null;
		this.name_txt=null;
		this.red_txt=null;
		FriendItemUI.__super.call(this);
	}

	__class(FriendItemUI,'ui.mobile.friend.FriendItemUI',_super);
	var __proto=FriendItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/friend/FriendItem");
	}

	return FriendItemUI;
})(View)


//class ui.mobile.friend.FriendMenuUI extends laya.ui.View
var FriendMenuUI=(function(_super){
	function FriendMenuUI(){
		this.list=null;
		this.btn_friend=null;
		this.btn_enemy=null;
		this.btn_black=null;
		this.imgSelected=null;
		FriendMenuUI.__super.call(this);
	}

	__class(FriendMenuUI,'ui.mobile.friend.FriendMenuUI',_super);
	var __proto=FriendMenuUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/friend/FriendMenu");
	}

	return FriendMenuUI;
})(View)


//class ui.mobile.friend.FriendPanelUI extends laya.ui.View
var FriendPanelUI=(function(_super){
	function FriendPanelUI(){
		this.bg=null;
		this.btn_addfriend=null;
		this.btn_apply=null;
		this.bg_no=null;
		this.no_txt=null;
		FriendPanelUI.__super.call(this);
	}

	__class(FriendPanelUI,'ui.mobile.friend.FriendPanelUI',_super);
	var __proto=FriendPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/friend/FriendPanel");
	}

	return FriendPanelUI;
})(View)


//class ui.mobile.mail.GuildChatPlayerItemUI extends laya.ui.View
var GuildChatPlayerItemUI=(function(_super){
	function GuildChatPlayerItemUI(){
		this.bg=null;
		this.job_txt=null;
		this.name_txt=null;
		GuildChatPlayerItemUI.__super.call(this);
	}

	__class(GuildChatPlayerItemUI,'ui.mobile.mail.GuildChatPlayerItemUI',_super);
	var __proto=GuildChatPlayerItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/mail/GuildChatPlayerItem");
	}

	return GuildChatPlayerItemUI;
})(View)


//class ui.mobile.mail.GuildChatViewUI extends laya.ui.View
var GuildChatViewUI=(function(_super){
	function GuildChatViewUI(){
		this.bg=null;
		this.total_txt=null;
		this.list=null;
		GuildChatViewUI.__super.call(this);
	}

	__class(GuildChatViewUI,'ui.mobile.mail.GuildChatViewUI',_super);
	var __proto=GuildChatViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/mail/GuildChatView");
	}

	return GuildChatViewUI;
})(View)


//class ui.mobile.mail.MailPanelUI extends laya.ui.View
var MailPanelUI=(function(_super){
	function MailPanelUI(){
		this.title=null;
		this.nomail_img=null;
		this.bg=null;
		this.box=null;
		this.prev_btn=null;
		this.top_btn=null;
		this.next_btn=null;
		this.bottom_btn=null;
		this.getAll_btn=null;
		this.del_btn=null;
		this.page_txt=null;
		this.item_txt=null;
		this.title_txt=null;
		this.content_txt=null;
		this.sender_txt=null;
		this.time_txt=null;
		this.grid_list=null;
		this.get_btn=null;
		this.select_img=null;
		MailPanelUI.__super.call(this);
	}

	__class(MailPanelUI,'ui.mobile.mail.MailPanelUI',_super);
	var __proto=MailPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/mail/MailPanel");
	}

	return MailPanelUI;
})(View)


//class ui.mobile.main.attack.AttackerListItemUI extends laya.ui.View
var AttackerListItemUI=(function(_super){
	function AttackerListItemUI(){
		this.head=null;
		this.hpbg=null;
		this.bar=null;
		this.name_txt=null;
		this.barTxt=null;
		AttackerListItemUI.__super.call(this);
	}

	__class(AttackerListItemUI,'ui.mobile.main.attack.AttackerListItemUI',_super);
	var __proto=AttackerListItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/attack/AttackerListItem");
	}

	return AttackerListItemUI;
})(View)


//class ui.mobile.main.attack.AttackerListPanelUI extends laya.ui.View
var AttackerListPanelUI=(function(_super){
	function AttackerListPanelUI(){
		this.p_list=null;
		this.p_select=null;
		this.tabs=null;
		AttackerListPanelUI.__super.call(this);
	}

	__class(AttackerListPanelUI,'ui.mobile.main.attack.AttackerListPanelUI',_super);
	var __proto=AttackerListPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/attack/AttackerListPanel");
	}

	return AttackerListPanelUI;
})(View)


//class ui.mobile.main.effect.AttributeUpEffectItemUI extends laya.ui.View
var AttributeUpEffectItemUI=(function(_super){
	function AttributeUpEffectItemUI(){
		this.bg=null;
		this.type_img=null;
		this.arrow=null;
		AttributeUpEffectItemUI.__super.call(this);
	}

	__class(AttributeUpEffectItemUI,'ui.mobile.main.effect.AttributeUpEffectItemUI',_super);
	var __proto=AttributeUpEffectItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/effect/AttributeUpEffectItem");
	}

	return AttributeUpEffectItemUI;
})(View)


//class ui.mobile.main.GatherProgressBarUI extends laya.ui.View
var GatherProgressBarUI=(function(_super){
	function GatherProgressBarUI(){
		this.bg=null;
		this.txt=null;
		GatherProgressBarUI.__super.call(this);
	}

	__class(GatherProgressBarUI,'ui.mobile.main.GatherProgressBarUI',_super);
	var __proto=GatherProgressBarUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/GatherProgressBar");
	}

	return GatherProgressBarUI;
})(View)


//class ui.mobile.main.menu.MainMenuIcon2UI extends laya.ui.View
var MainMenuIcon2UI=(function(_super){
	function MainMenuIcon2UI(){
		this.bg=null;
		this.icon=null;
		this.font=null;
		this.qq=null;
		this.qq_txt=null;
		MainMenuIcon2UI.__super.call(this);
	}

	__class(MainMenuIcon2UI,'ui.mobile.main.menu.MainMenuIcon2UI',_super);
	var __proto=MainMenuIcon2UI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/menu/MainMenuIcon2");
	}

	return MainMenuIcon2UI;
})(View)


//class ui.mobile.main.mobi.buff.MobiMainBuffItemUI extends laya.ui.View
var MobiMainBuffItemUI=(function(_super){
	function MobiMainBuffItemUI(){
		this.bg=null;
		this.name_txt=null;
		this.desc_txt=null;
		this.time_txt=null;
		MobiMainBuffItemUI.__super.call(this);
	}

	__class(MobiMainBuffItemUI,'ui.mobile.main.mobi.buff.MobiMainBuffItemUI',_super);
	var __proto=MobiMainBuffItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/mobi/buff/MobiMainBuffItem");
	}

	return MobiMainBuffItemUI;
})(View)


//class ui.mobile.main.mobi.buff.MobiMainTequanItemUI extends laya.ui.View
var MobiMainTequanItemUI=(function(_super){
	function MobiMainTequanItemUI(){
		this.bg=null;
		this.name_txt=null;
		this.desPanel=null;
		this.desc_txt=null;
		MobiMainTequanItemUI.__super.call(this);
	}

	__class(MobiMainTequanItemUI,'ui.mobile.main.mobi.buff.MobiMainTequanItemUI',_super);
	var __proto=MobiMainTequanItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/mobi/buff/MobiMainTequanItem");
	}

	return MobiMainTequanItemUI;
})(View)


//class ui.mobile.main.mobi.MobiMainHeadUI extends laya.ui.View
var MobiMainHeadUI=(function(_super){
	function MobiMainHeadUI(){
		this.bg=null;
		this.money_box1=null;
		this.money_img1=null;
		this.imgWan1=null;
		this.money_box2=null;
		this.money_img2=null;
		this.imgWan2=null;
		this.money_box3=null;
		this.money_img3=null;
		this.imgWan3=null;
		this.pay_btn=null;
		this.buff_btn=null;
		this.btn_vip6exp=null;
		this.platform_txt=null;
		this.pos_txt=null;
		this.tqskill_img=null;
		this.tqskill_txt=null;
		MobiMainHeadUI.__super.call(this);
	}

	__class(MobiMainHeadUI,'ui.mobile.main.mobi.MobiMainHeadUI',_super);
	var __proto=MobiMainHeadUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/mobi/MobiMainHead");
	}

	return MobiMainHeadUI;
})(View)


//class ui.mobile.main.mobi.MobiMainMenuUI extends laya.ui.View
var MobiMainMenuUI=(function(_super){
	function MobiMainMenuUI(){
		this.hpBox_jj=null;
		this.hp_box_jj=null;
		this.ng_box_jj=null;
		this.hpBox=null;
		this.hp_box=null;
		this.hp_img=null;
		this.ng_box=null;
		this.ng_img=null;
		this.bg=null;
		this.pk_btn=null;
		this.pk_img=null;
		this.exp_img=null;
		this.mode_btn=null;
		this.guild_btn=null;
		this.guild_point=null;
		this.lv_txt=null;
		this.exp_txt=null;
		this.chatPanel=null;
		this.logClickNode=null;
		this.gm_box=null;
		this.log_btn=null;
		this.mobi_btn=null;
		this.return_btn=null;
		this.debug_btn=null;
		this.gm_btn=null;
		this.pet_box=null;
		this.pet_hpBox=null;
		this.pet_hp=null;
		this.pet_head=null;
		this.pet_stateTxt=null;
		this.pet_lock=null;
		MobiMainMenuUI.__super.call(this);
	}

	__class(MobiMainMenuUI,'ui.mobile.main.mobi.MobiMainMenuUI',_super);
	var __proto=MobiMainMenuUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/mobi/MobiMainMenu");
	}

	return MobiMainMenuUI;
})(View)


//class ui.mobile.main.view.MainNpcClickUI extends laya.ui.View
var MainNpcClickUI=(function(_super){
	function MainNpcClickUI(){
		this.bg=null;
		this.name_txt=null;
		MainNpcClickUI.__super.call(this);
	}

	__class(MainNpcClickUI,'ui.mobile.main.view.MainNpcClickUI',_super);
	var __proto=MainNpcClickUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/view/MainNpcClick");
	}

	return MainNpcClickUI;
})(View)


//class ui.mobile.main.mobi.MobiMainRadarUI extends laya.ui.View
var MobiMainRadarUI=(function(_super){
	function MobiMainRadarUI(){
		this.map_box=null;
		this.role_box=null;
		this.bg=null;
		this.act_btn=null;
		this.setup_btn=null;
		this.name_txt=null;
		this.pk_txt=null;
		this.pos_txt=null;
		this.rank_btn=null;
		MobiMainRadarUI.__super.call(this);
	}

	__class(MobiMainRadarUI,'ui.mobile.main.mobi.MobiMainRadarUI',_super);
	var __proto=MobiMainRadarUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/mobi/MobiMainRadar");
	}

	return MobiMainRadarUI;
})(View)


//class ui.mobile.main.mobi.MobiMainRockerUI extends laya.ui.View
var MobiMainRockerUI=(function(_super){
	function MobiMainRockerUI(){
		this.bg=null;
		this.ball=null;
		this.ride_btn=null;
		MobiMainRockerUI.__super.call(this);
	}

	__class(MobiMainRockerUI,'ui.mobile.main.mobi.MobiMainRockerUI',_super);
	var __proto=MobiMainRockerUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/mobi/MobiMainRocker");
	}

	return MobiMainRockerUI;
})(View)


//class ui.mobile.main.mobi.MobiMainSkillUI extends laya.ui.View
var MobiMainSkillUI=(function(_super){
	function MobiMainSkillUI(){
		this.open_btn=null;
		this.open_point=null;
		this.openArrow=null;
		this.hook_btn=null;
		this.role_btn=null;
		this.role_point=null;
		this.bag_btn=null;
		this.bag_point=null;
		this.full_box=null;
		this.full_bg=null;
		this.wear_img=null;
		this.skill_box=null;
		this.set_btn=null;
		this.img0=null;
		this.img1=null;
		this.img2=null;
		this.img3=null;
		this.img4=null;
		this.img5=null;
		this.img6=null;
		this.img7=null;
		this.monster_btn=null;
		this.player_btn=null;
		this.target_btn=null;
		MobiMainSkillUI.__super.call(this);
	}

	__class(MobiMainSkillUI,'ui.mobile.main.mobi.MobiMainSkillUI',_super);
	var __proto=MobiMainSkillUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/mobi/MobiMainSkill");
	}

	return MobiMainSkillUI;
})(View)


//class ui.mobile.main.mobi.MobiMainStatusBarUI extends laya.ui.View
var MobiMainStatusBarUI=(function(_super){
	function MobiMainStatusBarUI(){
		this.flow_img=null;
		this.wifi_img=null;
		this.battery_img=null;
		this.time_txt=null;
		this.battery_txt=null;
		this.status_txt=null;
		this.skill_txt=null;
		MobiMainStatusBarUI.__super.call(this);
	}

	__class(MobiMainStatusBarUI,'ui.mobile.main.mobi.MobiMainStatusBarUI',_super);
	var __proto=MobiMainStatusBarUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/mobi/MobiMainStatusBar");
	}

	return MobiMainStatusBarUI;
})(View)


//class ui.mobile.main.mobi.MobiMainTopBarUI extends laya.ui.View
var MobiMainTopBarUI=(function(_super){
	function MobiMainTopBarUI(){
		this.btn1=null;
		this.btn2=null;
		this.btn3=null;
		this.money_img1=null;
		this.money_img2=null;
		this.money_img3=null;
		this.money_txt1=null;
		this.money_txt2=null;
		this.money_txt3=null;
		MobiMainTopBarUI.__super.call(this);
	}

	__class(MobiMainTopBarUI,'ui.mobile.main.mobi.MobiMainTopBarUI',_super);
	var __proto=MobiMainTopBarUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/mobi/MobiMainTopBar");
	}

	return MobiMainTopBarUI;
})(View)


//class ui.mobile.main.prompt.EquipGetPromptPanelUI extends laya.ui.View
var EquipGetPromptPanelUI=(function(_super){
	function EquipGetPromptPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.title_txt=null;
		this.name_txt=null;
		this.ok_btn=null;
		EquipGetPromptPanelUI.__super.call(this);
	}

	__class(EquipGetPromptPanelUI,'ui.mobile.main.prompt.EquipGetPromptPanelUI',_super);
	var __proto=EquipGetPromptPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/prompt/EquipGetPromptPanel");
	}

	return EquipGetPromptPanelUI;
})(View)


//class ui.mobile.main.prompt.ItemGetPromptPanelUI extends laya.ui.View
var ItemGetPromptPanelUI=(function(_super){
	function ItemGetPromptPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.grid=null;
		this.ok_btn=null;
		this.ck=null;
		this.box=null;
		this.btn2=null;
		this.btn1=null;
		this.txt=null;
		this.auto_btn=null;
		this.title_txt=null;
		this.name_txt=null;
		ItemGetPromptPanelUI.__super.call(this);
	}

	__class(ItemGetPromptPanelUI,'ui.mobile.main.prompt.ItemGetPromptPanelUI',_super);
	var __proto=ItemGetPromptPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/prompt/ItemGetPromptPanel");
	}

	return ItemGetPromptPanelUI;
})(View)


//class ui.mobile.main.right.OLYuanbaoIconUI extends laya.ui.View
var OLYuanbaoIconUI=(function(_super){
	function OLYuanbaoIconUI(){
		this.ybBox=null;
		this.bg=null;
		this.stateImg=null;
		this.statebg=null;
		this.stateTxt=null;
		this.count_txt=null;
		this.btn=null;
		this.qipaoBox=null;
		this.qipao=null;
		OLYuanbaoIconUI.__super.call(this);
	}

	__class(OLYuanbaoIconUI,'ui.mobile.main.right.OLYuanbaoIconUI',_super);
	var __proto=OLYuanbaoIconUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/right/OLYuanbaoIcon");
	}

	return OLYuanbaoIconUI;
})(View)


//class ui.mobile.main.target.SelectBossInfoUI extends laya.ui.View
var SelectBossInfoUI=(function(_super){
	function SelectBossInfoUI(){
		this.drop_img=null;
		this.zz_bg=null;
		this.zz_icon=null;
		this.zz_arrow=null;
		this.cd_txt=null;
		this.hpbg=null;
		this.headbg=null;
		this.name_txt=null;
		this.hp_txt=null;
		this.lv_txt=null;
		this.owner_txt1=null;
		this.owner_txt=null;
		SelectBossInfoUI.__super.call(this);
	}

	__class(SelectBossInfoUI,'ui.mobile.main.target.SelectBossInfoUI',_super);
	var __proto=SelectBossInfoUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/target/SelectBossInfo");
	}

	return SelectBossInfoUI;
})(View)


//class ui.mobile.main.target.SelectMonsterInfoUI extends laya.ui.View
var SelectMonsterInfoUI=(function(_super){
	function SelectMonsterInfoUI(){
		this.bg=null;
		this.icon=null;
		this.hp_bg=null;
		this.name_txt=null;
		this.hp_txt=null;
		this.lv_txt=null;
		SelectMonsterInfoUI.__super.call(this);
	}

	__class(SelectMonsterInfoUI,'ui.mobile.main.target.SelectMonsterInfoUI',_super);
	var __proto=SelectMonsterInfoUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/target/SelectMonsterInfo");
	}

	return SelectMonsterInfoUI;
})(View)


//class ui.mobile.main.target.SelectPlayerInfoUI extends laya.ui.View
var SelectPlayerInfoUI=(function(_super){
	function SelectPlayerInfoUI(){
		this.hpBar=null;
		this.headbg=null;
		this.hp_txt=null;
		this.lv_txt=null;
		this.name_txt=null;
		SelectPlayerInfoUI.__super.call(this);
	}

	__class(SelectPlayerInfoUI,'ui.mobile.main.target.SelectPlayerInfoUI',_super);
	var __proto=SelectPlayerInfoUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/target/SelectPlayerInfo");
	}

	return SelectPlayerInfoUI;
})(View)


//class ui.mobile.main.right.ToushiIconUI extends laya.ui.View
var ToushiIconUI=(function(_super){
	function ToushiIconUI(){
		this.ball=null;
		this.bg=null;
		this.bar=null;
		this.txt1=null;
		this.bar_txt=null;
		this.time_txt=null;
		this.btn=null;
		ToushiIconUI.__super.call(this);
	}

	__class(ToushiIconUI,'ui.mobile.main.right.ToushiIconUI',_super);
	var __proto=ToushiIconUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/right/ToushiIcon");
	}

	return ToushiIconUI;
})(View)


//class ui.mobile.main.menu.PKModelItemUI extends laya.ui.View
var PKModelItemUI=(function(_super){
	function PKModelItemUI(){
		this.bg=null;
		this.txt=null;
		this.icon=null;
		PKModelItemUI.__super.call(this);
	}

	__class(PKModelItemUI,'ui.mobile.main.menu.PKModelItemUI',_super);
	var __proto=PKModelItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/menu/PKModelItem");
	}

	return PKModelItemUI;
})(View)


//class ui.mobile.main.view.MainChatUI extends laya.ui.View
var MainChatUI=(function(_super){
	function MainChatUI(){
		this.channel_btn=null;
		this.open_btn=null;
		this.face_btn=null;
		this.pos_btn=null;
		this.send_btn=null;
		this.chatPanel=null;
		this.channel_box=null;
		this.channel_select=null;
		this.chat_box=null;
		this.chat_txt=null;
		MainChatUI.__super.call(this);
	}

	__class(MainChatUI,'ui.mobile.main.view.MainChatUI',_super);
	var __proto=MainChatUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/view/MainChat");
	}

	return MainChatUI;
})(View)


//class ui.mobile.main.view.MainChatPanelUI extends laya.ui.View
var MainChatPanelUI=(function(_super){
	function MainChatPanelUI(){
		this.bg=null;
		this.face_btn=null;
		this.pos_btn=null;
		this.send_btn=null;
		this.channel_txt=null;
		this.chatPanel=null;
		this.close_btn=null;
		this.tab0=null;
		this.tab1=null;
		this.input_txt=null;
		this.channel_box=null;
		this.btn0=null;
		this.btn1=null;
		this.btn2=null;
		this.btn3=null;
		this.btn4=null;
		this.btn5=null;
		this.box1=null;
		this.num1=null;
		this.box3=null;
		this.num3=null;
		this.box7=null;
		this.num7=null;
		this.siliao_box=null;
		this.nochat_img=null;
		this.siliao_txt=null;
		this.red0=null;
		this.red1=null;
		this.btn_add=null;
		this.btn_send=null;
		MainChatPanelUI.__super.call(this);
	}

	__class(MainChatPanelUI,'ui.mobile.main.view.MainChatPanelUI',_super);
	var __proto=MainChatPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/view/MainChatPanel");
	}

	return MainChatPanelUI;
})(View)


//class ui.mobile.main.view.MainHeadUI extends laya.ui.View
var MainHeadUI=(function(_super){
	function MainHeadUI(){
		this.mainCon=null;
		this.head_img=null;
		this.bg=null;
		this.job_img=null;
		this.pay_btn=null;
		this.buff_btn=null;
		this.money_box1=null;
		this.money_img1=null;
		this.money_txt1=null;
		this.money_box2=null;
		this.money_img2=null;
		this.money_txt2=null;
		this.money_box3=null;
		this.money_img3=null;
		this.money_txt3=null;
		this.btn_vip6exp=null;
		this.tqskill_img=null;
		this.tqskill_txt=null;
		this.skill_txt=null;
		this.platform_txt=null;
		this.pos_txt=null;
		MainHeadUI.__super.call(this);
	}

	__class(MainHeadUI,'ui.mobile.main.view.MainHeadUI',_super);
	var __proto=MainHeadUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/view/MainHead");
	}

	return MainHeadUI;
})(View)


//class ui.mobile.main.view.MainMenuUI extends laya.ui.View
var MainMenuUI=(function(_super){
	function MainMenuUI(){
		this.hp_box=null;
		this.hpline_box=null;
		this.ng_box=null;
		this.ngline_box=null;
		this.bg=null;
		this.pk_btn=null;
		this.pk_img=null;
		this.role_btn=null;
		this.bag_btn=null;
		this.team_btn=null;
		this.friend_btn=null;
		this.guild_btn=null;
		this.exp_img=null;
		this.hook_btn=null;
		this.ride_btn=null;
		this.debug_btn=null;
		this.mobi_btn=null;
		this.return_btn=null;
		this.log_btn=null;
		this.gm_btn=null;
		this.role_point=null;
		this.guild_point=null;
		this.bag_point=null;
		this.red_friend=null;
		this.full_box=null;
		this.full_bg=null;
		this.exp_txt=null;
		this.lv_txt=null;
		this.wear_img=null;
		this.pet_box=null;
		this.pet_hpBox=null;
		this.pet_hp=null;
		this.pet_head=null;
		this.pet_stateTxt=null;
		this.pet_lock=null;
		MainMenuUI.__super.call(this);
	}

	__class(MainMenuUI,'ui.mobile.main.view.MainMenuUI',_super);
	var __proto=MainMenuUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/view/MainMenu");
	}

	return MainMenuUI;
})(View)


//class ui.mobile.main.view.MainRadarUI extends laya.ui.View
var MainRadarUI=(function(_super){
	function MainRadarUI(){
		this.map_box=null;
		this.role_box=null;
		this.bg=null;
		this.name_txt=null;
		this.pk_txt=null;
		this.pos_txt=null;
		this.setup_btn=null;
		this.sound_btn=null;
		this.rank_btn=null;
		this.act_btn=null;
		this.yin_btn=null;
		this.pickup_btn=null;
		this.mail_btn=null;
		this.mail_box=null;
		this.mail_txt=null;
		this.guide_box=null;
		this.guide_txt=null;
		MainRadarUI.__super.call(this);
	}

	__class(MainRadarUI,'ui.mobile.main.view.MainRadarUI',_super);
	var __proto=MainRadarUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/view/MainRadar");
	}

	return MainRadarUI;
})(View)


//class ui.mobile.main.view.MainTopBarUI extends laya.ui.View
var MainTopBarUI=(function(_super){
	function MainTopBarUI(){
		this.bg=null;
		MainTopBarUI.__super.call(this);
	}

	__class(MainTopBarUI,'ui.mobile.main.view.MainTopBarUI',_super);
	var __proto=MainTopBarUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/view/MainTopBar");
	}

	return MainTopBarUI;
})(View)


//class ui.mobile.mall.item.MallItemUI extends laya.ui.View
var MallItemUI=(function(_super){
	function MallItemUI(){
		this.bg=null;
		this.name_txt=null;
		this.flag=null;
		this.detailBox=null;
		this.buy_img=null;
		this.price_box=null;
		this.desc_txt=null;
		this.money_img=null;
		this.price_txt=null;
		this.oldPrice_box=null;
		this.oldPrice_txt=null;
		this.money_img1=null;
		this.count_txt=null;
		this.limitTxt=null;
		MallItemUI.__super.call(this);
	}

	__class(MallItemUI,'ui.mobile.mall.item.MallItemUI',_super);
	var __proto=MallItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/mall/item/MallItem");
	}

	return MallItemUI;
})(View)


//class ui.mobile.mall.item.MallVipPageItemUI extends laya.ui.View
var MallVipPageItemUI=(function(_super){
	function MallVipPageItemUI(){
		this.name_txt=null;
		this.count_txt=null;
		this.btn=null;
		this.vip_limit=null;
		this.oldPrice_box=null;
		this.money_img1=null;
		this.yuanjia_txt=null;
		this.oldPrice_txt=null;
		this.price_box=null;
		this.money_img=null;
		this.desc_txt=null;
		this.price_txt=null;
		this.flag=null;
		MallVipPageItemUI.__super.call(this);
	}

	__class(MallVipPageItemUI,'ui.mobile.mall.item.MallVipPageItemUI',_super);
	var __proto=MallVipPageItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/mall/item/MallVipPageItem");
	}

	return MallVipPageItemUI;
})(View)


//class ui.mobile.mall.item.RongyuShopItemUI extends laya.ui.View
var RongyuShopItemUI=(function(_super){
	function RongyuShopItemUI(){
		this.bg=null;
		this.nameTxt=null;
		this.zhe=null;
		this.detailBox=null;
		this.btn=null;
		this.oldPriceTxt=null;
		this.m_oldIcon=null;
		this.priceTxt=null;
		this.m_icon=null;
		this.yibuy=null;
		this.limitTxt=null;
		RongyuShopItemUI.__super.call(this);
	}

	__class(RongyuShopItemUI,'ui.mobile.mall.item.RongyuShopItemUI',_super);
	var __proto=RongyuShopItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/mall/item/RongyuShopItem");
	}

	return RongyuShopItemUI;
})(View)


//class ui.mobile.mall.view.MallVipPageViewUI extends laya.ui.View
var MallVipPageViewUI=(function(_super){
	function MallVipPageViewUI(){
		this.bg=null;
		this.list=null;
		this.tabs=null;
		this.vip_txt=null;
		MallVipPageViewUI.__super.call(this);
	}

	__class(MallVipPageViewUI,'ui.mobile.mall.view.MallVipPageViewUI',_super);
	var __proto=MallVipPageViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/mall/view/MallVipPageView");
	}

	return MallVipPageViewUI;
})(View)


//class ui.mobile.mall.view.RongyuShopViewUI extends laya.ui.View
var RongyuShopViewUI=(function(_super){
	function RongyuShopViewUI(){
		this.logTxt=null;
		this.m_panel=null;
		this.l_txt1=null;
		this.l_txt2=null;
		this.btnRefresh=null;
		this.sx_txt=null;
		this.sx_icon=null;
		this.s_select=null;
		RongyuShopViewUI.__super.call(this);
	}

	__class(RongyuShopViewUI,'ui.mobile.mall.view.RongyuShopViewUI',_super);
	var __proto=RongyuShopViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/mall/view/RongyuShopView");
	}

	return RongyuShopViewUI;
})(View)


//class ui.mobile.npc.NpcHpItemUI extends laya.ui.View
var NpcHpItemUI=(function(_super){
	function NpcHpItemUI(){
		this.bg=null;
		this.txt=null;
		this.btn=null;
		NpcHpItemUI.__super.call(this);
	}

	__class(NpcHpItemUI,'ui.mobile.npc.NpcHpItemUI',_super);
	var __proto=NpcHpItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/npc/NpcHpItem");
	}

	return NpcHpItemUI;
})(View)


//class ui.mobile.npc.view.JNTaskItemUI extends laya.ui.View
var JNTaskItemUI=(function(_super){
	function JNTaskItemUI(){
		this.bg=null;
		this.kuang=null;
		this.btn=null;
		this.contentTxt=null;
		this.yijisha=null;
		JNTaskItemUI.__super.call(this);
	}

	__class(JNTaskItemUI,'ui.mobile.npc.view.JNTaskItemUI',_super);
	var __proto=JNTaskItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/npc/view/JNTaskItem");
	}

	return JNTaskItemUI;
})(View)


//class ui.mobile.npc.view.NpcMapItemUI extends laya.ui.View
var NpcMapItemUI=(function(_super){
	function NpcMapItemUI(){
		this.box=null;
		this.map=null;
		this.txt=null;
		NpcMapItemUI.__super.call(this);
	}

	__class(NpcMapItemUI,'ui.mobile.npc.view.NpcMapItemUI',_super);
	var __proto=NpcMapItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/npc/view/NpcMapItem");
	}

	return NpcMapItemUI;
})(View)


//class ui.mobile.kuafu.szsd.NpcShengZhuangShenDianItemUI extends laya.ui.View
var NpcShengZhuangShenDianItemUI=(function(_super){
	function NpcShengZhuangShenDianItemUI(){
		this.bg=null;
		this.bg2=null;
		this.btn=null;
		this.need_txt=null;
		this.name_txt=null;
		NpcShengZhuangShenDianItemUI.__super.call(this);
	}

	__class(NpcShengZhuangShenDianItemUI,'ui.mobile.kuafu.szsd.NpcShengZhuangShenDianItemUI',_super);
	var __proto=NpcShengZhuangShenDianItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafu/szsd/NpcShengZhuangShenDianItem");
	}

	return NpcShengZhuangShenDianItemUI;
})(View)


//class ui.mobile.npc.view.NPC_DailyActUI extends laya.ui.View
var NPC_DailyActUI=(function(_super){
	function NPC_DailyActUI(){
		this.btn=null;
		this.timeTxt=null;
		NPC_DailyActUI.__super.call(this);
	}

	__class(NPC_DailyActUI,'ui.mobile.npc.view.NPC_DailyActUI',_super);
	var __proto=NPC_DailyActUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/npc/view/NPC_DailyAct");
	}

	return NPC_DailyActUI;
})(View)


//class ui.mobile.kuafu.wlsz.NpcWoLongShanZhuangPanelUI extends laya.ui.View
var NpcWoLongShanZhuangPanelUI=(function(_super){
	function NpcWoLongShanZhuangPanelUI(){
		this.btn_go=null;
		NpcWoLongShanZhuangPanelUI.__super.call(this);
	}

	__class(NpcWoLongShanZhuangPanelUI,'ui.mobile.kuafu.wlsz.NpcWoLongShanZhuangPanelUI',_super);
	var __proto=NpcWoLongShanZhuangPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafu/wlsz/NpcWoLongShanZhuangPanel");
	}

	return NpcWoLongShanZhuangPanelUI;
})(View)


//class ui.mobile.order.OrderItemUI extends laya.ui.View
var OrderItemUI=(function(_super){
	function OrderItemUI(){
		this.freeNode=null;
		this.bgFree=null;
		this.imgSelected=null;
		this.vipNode=null;
		this.bgVip=null;
		this.imgSelected2=null;
		this.bgTitle=null;
		this.lv_txt=null;
		this.imgFreeGet=null;
		this.imgVipGet1=null;
		this.imgVipGet2=null;
		OrderItemUI.__super.call(this);
	}

	__class(OrderItemUI,'ui.mobile.order.OrderItemUI',_super);
	var __proto=OrderItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/order/OrderItem");
	}

	return OrderItemUI;
})(View)


//class ui.mobile.order.OrderPanelUI extends laya.ui.View
var OrderPanelUI=(function(_super){
	function OrderPanelUI(){
		this.btn_vip=null;
		this.expBar=null;
		this.imgLock=null;
		this.exp_txt=null;
		this.buy_txt=null;
		this.give_txt=null;
		this.max_txt=null;
		this.time_txt=null;
		this.list=null;
		this.imgFinishMask=null;
		this.imgMask=null;
		this.imgNo=null;
		this.imgFinish=null;
		this.imgUnlock=null;
		this.btn_onekey=null;
		this.tipNode=null;
		this.lvNode=null;
		this.imgBuy=null;
		this.buyNode=null;
		this.money_txt=null;
		this.btn_buy=null;
		OrderPanelUI.__super.call(this);
	}

	__class(OrderPanelUI,'ui.mobile.order.OrderPanelUI',_super);
	var __proto=OrderPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/order/OrderPanel");
	}

	return OrderPanelUI;
})(View)


//class ui.mobile.pet.view.HuanshenViewUI extends laya.ui.View
var HuanshenViewUI=(function(_super){
	function HuanshenViewUI(){
		this.yimanjie=null;
		this.limitTxt=null;
		this.btnUP=null;
		this.titleBox=null;
		this.titleTxt=null;
		this.btnHX=null;
		this.btnSkill=null;
		this.btnMain=null;
		this.fontImg=null;
		HuanshenViewUI.__super.call(this);
	}

	__class(HuanshenViewUI,'ui.mobile.pet.view.HuanshenViewUI',_super);
	var __proto=HuanshenViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/pet/view/HuanshenView");
	}

	return HuanshenViewUI;
})(View)


//class ui.mobile.pet.item.JibanItemUI extends laya.ui.View
var JibanItemUI=(function(_super){
	function JibanItemUI(){
		this.bg=null;
		this.lockTxt=null;
		JibanItemUI.__super.call(this);
	}

	__class(JibanItemUI,'ui.mobile.pet.item.JibanItemUI',_super);
	var __proto=JibanItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/pet/item/JibanItem");
	}

	return JibanItemUI;
})(View)


//class ui.mobile.pet.PetBarUI extends laya.ui.View
var PetBarUI=(function(_super){
	function PetBarUI(){
		this.huxi=null;
		this.bg=null;
		this.bar=null;
		this.pro_txt=null;
		this.barMask=null;
		PetBarUI.__super.call(this);
	}

	__class(PetBarUI,'ui.mobile.pet.PetBarUI',_super);
	var __proto=PetBarUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/pet/PetBar");
	}

	return PetBarUI;
})(View)


//class ui.mobile.pet.PetCallPanelUI extends laya.ui.View
var PetCallPanelUI=(function(_super){
	function PetCallPanelUI(){
		this.bg=null;
		this.btn0=null;
		this.font0=null;
		this.yijihuo0=null;
		this.font1=null;
		this.btn1=null;
		this.yijihuo1=null;
		this.btn2=null;
		this.yijihuo2=null;
		PetCallPanelUI.__super.call(this);
	}

	__class(PetCallPanelUI,'ui.mobile.pet.PetCallPanelUI',_super);
	var __proto=PetCallPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/pet/PetCallPanel");
	}

	return PetCallPanelUI;
})(View)


//class ui.mobile.pet.item.PetHeadItemUI extends laya.ui.View
var PetHeadItemUI=(function(_super){
	function PetHeadItemUI(){
		this.bg=null;
		this.icon=null;
		this.mbg=null;
		this.nameTxt=null;
		this.sjob=null;
		this.yihuanhua=null;
		PetHeadItemUI.__super.call(this);
	}

	__class(PetHeadItemUI,'ui.mobile.pet.item.PetHeadItemUI',_super);
	var __proto=PetHeadItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/pet/item/PetHeadItem");
	}

	return PetHeadItemUI;
})(View)


//class ui.mobile.pet.view.YuanshendianTabUI extends laya.ui.View
var YuanshendianTabUI=(function(_super){
	function YuanshendianTabUI(){
		this.btn=null;
		this.lockImg=null;
		this.fontimg=null;
		this.lockTxt=null;
		YuanshendianTabUI.__super.call(this);
	}

	__class(YuanshendianTabUI,'ui.mobile.pet.view.YuanshendianTabUI',_super);
	var __proto=YuanshendianTabUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/pet/view/YuanshendianTab");
	}

	return YuanshendianTabUI;
})(View)


//class ui.mobile.pet.view.YuanshenDianViewUI extends laya.ui.View
var YuanshenDianViewUI=(function(_super){
	function YuanshenDianViewUI(){
		this.upfont=null;
		this.n_box=null;
		this.n_font0=null;
		this.n_font1=null;
		this.c_font0=null;
		this.c_font1=null;
		this.avaName0=null;
		this.avaName1=null;
		this.avaName2=null;
		this.btnBox=null;
		this.btnUP0=null;
		this.btnUP1=null;
		this.m_txt0=null;
		this.m_icon0=null;
		this.m_txt1=null;
		this.m_icon1=null;
		this.btnUP2=null;
		this.yimanji=null;
		this.btnGet=null;
		YuanshenDianViewUI.__super.call(this);
	}

	__class(YuanshenDianViewUI,'ui.mobile.pet.view.YuanshenDianViewUI',_super);
	var __proto=YuanshenDianViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/pet/view/YuanshenDianView");
	}

	return YuanshenDianViewUI;
})(View)


//class ui.mobile.pet.view.YuanshenJibanViewUI extends laya.ui.View
var YuanshenJibanViewUI=(function(_super){
	function YuanshenJibanViewUI(){
		this.btnSel=null;
		this.btnUP=null;
		this.btnJH=null;
		this.useing=null;
		this.desc_txt=null;
		this.l_select=null;
		YuanshenJibanViewUI.__super.call(this);
	}

	__class(YuanshenJibanViewUI,'ui.mobile.pet.view.YuanshenJibanViewUI',_super);
	var __proto=YuanshenJibanViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/pet/view/YuanshenJibanView");
	}

	return YuanshenJibanViewUI;
})(View)


//class ui.mobile.pet.view.YuanShenSkillItemUI extends laya.ui.View
var YuanShenSkillItemUI=(function(_super){
	function YuanShenSkillItemUI(){
		this.bg=null;
		this.name_txt=null;
		this.lv_txt=null;
		this.pro_txt=null;
		YuanShenSkillItemUI.__super.call(this);
	}

	__class(YuanShenSkillItemUI,'ui.mobile.pet.view.YuanShenSkillItemUI',_super);
	var __proto=YuanShenSkillItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/pet/view/YuanShenSkillItem");
	}

	return YuanShenSkillItemUI;
})(View)


//class ui.mobile.platform.baidu.PlatformBaiduLevelItemUI extends laya.ui.View
var PlatformBaiduLevelItemUI=(function(_super){
	function PlatformBaiduLevelItemUI(){
		this.bg=null;
		this.descImg=null;
		this.vipLevelTxt=null;
		this.btn=null;
		this.getted=null;
		this.item_box=null;
		PlatformBaiduLevelItemUI.__super.call(this);
	}

	__class(PlatformBaiduLevelItemUI,'ui.mobile.platform.baidu.PlatformBaiduLevelItemUI',_super);
	var __proto=PlatformBaiduLevelItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/baidu/PlatformBaiduLevelItem");
	}

	return PlatformBaiduLevelItemUI;
})(View)


//class ui.mobile.platform.douyu.PlatformVipLevelViewUI extends laya.ui.View
var PlatformVipLevelViewUI=(function(_super){
	function PlatformVipLevelViewUI(){
		this.bg=null;
		this.banner=null;
		this.list=null;
		this.link_btn=null;
		this.desc_txt=null;
		PlatformVipLevelViewUI.__super.call(this);
	}

	__class(PlatformVipLevelViewUI,'ui.mobile.platform.douyu.PlatformVipLevelViewUI',_super);
	var __proto=PlatformVipLevelViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/douyu/PlatformVipLevelView");
	}

	return PlatformVipLevelViewUI;
})(View)


//class ui.mobile.platform.tanwan.PlatformTanwanWeixinGiftViewUI extends laya.ui.View
var PlatformTanwanWeixinGiftViewUI=(function(_super){
	function PlatformTanwanWeixinGiftViewUI(){
		this.bg=null;
		this.jihuoBg=null;
		this.descImg=null;
		this.img_ma=null;
		this.jihuomaImg=null;
		this.btn=null;
		this.cdTxt=null;
		PlatformTanwanWeixinGiftViewUI.__super.call(this);
	}

	__class(PlatformTanwanWeixinGiftViewUI,'ui.mobile.platform.tanwan.PlatformTanwanWeixinGiftViewUI',_super);
	var __proto=PlatformTanwanWeixinGiftViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/tanwan/PlatformTanwanWeixinGiftView");
	}

	return PlatformTanwanWeixinGiftViewUI;
})(View)


//class ui.mobile.platform.douyu.PlatformGiftBannerViewUI extends laya.ui.View
var PlatformGiftBannerViewUI=(function(_super){
	function PlatformGiftBannerViewUI(){
		this.bg=null;
		this.banner=null;
		this.btn=null;
		this.getted=null;
		PlatformGiftBannerViewUI.__super.call(this);
	}

	__class(PlatformGiftBannerViewUI,'ui.mobile.platform.douyu.PlatformGiftBannerViewUI',_super);
	var __proto=PlatformGiftBannerViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/douyu/PlatformGiftBannerView");
	}

	return PlatformGiftBannerViewUI;
})(View)


//class ui.mobile.platform.douyu.PlatformVipLevelItemUI extends laya.ui.View
var PlatformVipLevelItemUI=(function(_super){
	function PlatformVipLevelItemUI(){
		this.bg=null;
		this.descImg=null;
		this.vipLevelTxt=null;
		this.btn=null;
		this.getted=null;
		PlatformVipLevelItemUI.__super.call(this);
	}

	__class(PlatformVipLevelItemUI,'ui.mobile.platform.douyu.PlatformVipLevelItemUI',_super);
	var __proto=PlatformVipLevelItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/douyu/PlatformVipLevelItem");
	}

	return PlatformVipLevelItemUI;
})(View)


//class ui.mobile.platform.douyu.PlatformVipTitleViewUI extends laya.ui.View
var PlatformVipTitleViewUI=(function(_super){
	function PlatformVipTitleViewUI(){
		this.bg=null;
		this.banner=null;
		this.desc_txt=null;
		this.btn=null;
		this.getted=null;
		PlatformVipTitleViewUI.__super.call(this);
	}

	__class(PlatformVipTitleViewUI,'ui.mobile.platform.douyu.PlatformVipTitleViewUI',_super);
	var __proto=PlatformVipTitleViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/douyu/PlatformVipTitleView");
	}

	return PlatformVipTitleViewUI;
})(View)


//class ui.mobile.platform.download.DownLoadPromptPanelUI extends laya.ui.View
var DownLoadPromptPanelUI=(function(_super){
	function DownLoadPromptPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.title_img=null;
		this.desc_img=null;
		this.item_box=null;
		this.ok_btn=null;
		DownLoadPromptPanelUI.__super.call(this);
	}

	__class(DownLoadPromptPanelUI,'ui.mobile.platform.download.DownLoadPromptPanelUI',_super);
	var __proto=DownLoadPromptPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/download/DownLoadPromptPanel");
	}

	return DownLoadPromptPanelUI;
})(View)


//class ui.mobile.platform.flash.PlatformFlashVipViewUI extends laya.ui.View
var PlatformFlashVipViewUI=(function(_super){
	function PlatformFlashVipViewUI(){
		this.descBg=null;
		this.descimg=null;
		this.descVip=null;
		this.girlImg=null;
		this.img_ma=null;
		this.world=null;
		this.top_txt=null;
		this.bottom_txt=null;
		this.num_txt=null;
		this.btn_num=null;
		this.btn=null;
		PlatformFlashVipViewUI.__super.call(this);
	}

	__class(PlatformFlashVipViewUI,'ui.mobile.platform.flash.PlatformFlashVipViewUI',_super);
	var __proto=PlatformFlashVipViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/flash/PlatformFlashVipView");
	}

	return PlatformFlashVipViewUI;
})(View)


//class ui.mobile.platform.ku25.PlatformKu25BoxViewUI extends laya.ui.View
var PlatformKu25BoxViewUI=(function(_super){
	function PlatformKu25BoxViewUI(){
		this.bg=null;
		this.banner=null;
		this.btn=null;
		this.getted=null;
		this.item_box=null;
		this.link_btn=null;
		PlatformKu25BoxViewUI.__super.call(this);
	}

	__class(PlatformKu25BoxViewUI,'ui.mobile.platform.ku25.PlatformKu25BoxViewUI',_super);
	var __proto=PlatformKu25BoxViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/ku25/PlatformKu25BoxView");
	}

	return PlatformKu25BoxViewUI;
})(View)


//class ui.mobile.platform.ku25.PlatformKu25DayItemUI extends laya.ui.View
var PlatformKu25DayItemUI=(function(_super){
	function PlatformKu25DayItemUI(){
		this.bg=null;
		this.info_txt=null;
		this.btn=null;
		this.getted=null;
		this.item_box=null;
		PlatformKu25DayItemUI.__super.call(this);
	}

	__class(PlatformKu25DayItemUI,'ui.mobile.platform.ku25.PlatformKu25DayItemUI',_super);
	var __proto=PlatformKu25DayItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/ku25/PlatformKu25DayItem");
	}

	return PlatformKu25DayItemUI;
})(View)


//class ui.mobile.platform.PlatformGiftViewUI extends laya.ui.View
var PlatformGiftViewUI=(function(_super){
	function PlatformGiftViewUI(){
		this.btnGo=null;
		this.yilingqu=null;
		PlatformGiftViewUI.__super.call(this);
	}

	__class(PlatformGiftViewUI,'ui.mobile.platform.PlatformGiftViewUI',_super);
	var __proto=PlatformGiftViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/PlatformGiftView");
	}

	return PlatformGiftViewUI;
})(View)


//class ui.mobile.platform.p360.Platform360SmrzUI extends laya.ui.View
var Platform360SmrzUI=(function(_super){
	function Platform360SmrzUI(){
		this.bg=null;
		this.btn=null;
		this.img2=null;
		this.error_txt=null;
		this.box=null;
		this.img1=null;
		this.name_txt2=null;
		this.card_txt2=null;
		this.card_txt=null;
		this.name_txt=null;
		Platform360SmrzUI.__super.call(this);
	}

	__class(Platform360SmrzUI,'ui.mobile.platform.p360.Platform360SmrzUI',_super);
	var __proto=Platform360SmrzUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/p360/Platform360Smrz");
	}

	return Platform360SmrzUI;
})(View)


//class ui.mobile.platform.p4366.Platform4366LevelItemUI extends laya.ui.View
var Platform4366LevelItemUI=(function(_super){
	function Platform4366LevelItemUI(){
		this.bg=null;
		this.descImg=null;
		this.vipLevelTxt=null;
		this.btn=null;
		this.getted=null;
		Platform4366LevelItemUI.__super.call(this);
	}

	__class(Platform4366LevelItemUI,'ui.mobile.platform.p4366.Platform4366LevelItemUI',_super);
	var __proto=Platform4366LevelItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/p4366/Platform4366LevelItem");
	}

	return Platform4366LevelItemUI;
})(View)


//class ui.mobile.platform.p4366.Platform4366WeixinGiftViewUI extends laya.ui.View
var Platform4366WeixinGiftViewUI=(function(_super){
	function Platform4366WeixinGiftViewUI(){
		this.bg=null;
		this.jihuoBg=null;
		this.descImg=null;
		this.img_ma=null;
		this.jihuomaImg=null;
		this.btn=null;
		this.cdTxt=null;
		this.tip_btn=null;
		Platform4366WeixinGiftViewUI.__super.call(this);
	}

	__class(Platform4366WeixinGiftViewUI,'ui.mobile.platform.p4366.Platform4366WeixinGiftViewUI',_super);
	var __proto=Platform4366WeixinGiftViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/p4366/Platform4366WeixinGiftView");
	}

	return Platform4366WeixinGiftViewUI;
})(View)


//class ui.mobile.platform.p602.Platform602VipViewUI extends laya.ui.View
var Platform602VipViewUI=(function(_super){
	function Platform602VipViewUI(){
		this.descBg=null;
		this.descimg=null;
		this.descVip=null;
		this.girlImg=null;
		this.img_ma=null;
		this.world=null;
		this.top_txt=null;
		this.bottom_txt=null;
		this.num_txt=null;
		this.btn_num=null;
		this.btn_ma=null;
		this.btn=null;
		Platform602VipViewUI.__super.call(this);
	}

	__class(Platform602VipViewUI,'ui.mobile.platform.p602.Platform602VipViewUI',_super);
	var __proto=Platform602VipViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/p602/Platform602VipView");
	}

	return Platform602VipViewUI;
})(View)


//class ui.mobile.platform.PlatformCDKViewUI extends laya.ui.View
var PlatformCDKViewUI=(function(_super){
	function PlatformCDKViewUI(){
		this.cdk_txt=null;
		this.btnDH=null;
		PlatformCDKViewUI.__super.call(this);
	}

	__class(PlatformCDKViewUI,'ui.mobile.platform.PlatformCDKViewUI',_super);
	var __proto=PlatformCDKViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/PlatformCDKView");
	}

	return PlatformCDKViewUI;
})(View)


//class ui.mobile.platform.PlatformLevelItemUI extends laya.ui.View
var PlatformLevelItemUI=(function(_super){
	function PlatformLevelItemUI(){
		this.bg=null;
		this.infoTxt=null;
		this.btnGet=null;
		this.yilingqu=null;
		PlatformLevelItemUI.__super.call(this);
	}

	__class(PlatformLevelItemUI,'ui.mobile.platform.PlatformLevelItemUI',_super);
	var __proto=PlatformLevelItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/PlatformLevelItem");
	}

	return PlatformLevelItemUI;
})(View)


//class ui.mobile.platform.PlatformLevelViewUI extends laya.ui.View
var PlatformLevelViewUI=(function(_super){
	function PlatformLevelViewUI(){
		this.btnGo=null;
		this.btnLink=null;
		this.p_list=null;
		PlatformLevelViewUI.__super.call(this);
	}

	__class(PlatformLevelViewUI,'ui.mobile.platform.PlatformLevelViewUI',_super);
	var __proto=PlatformLevelViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/PlatformLevelView");
	}

	return PlatformLevelViewUI;
})(View)


//class ui.mobile.platform.dawanka.QQdawankaItem1UI extends laya.ui.View
var QQdawankaItem1UI=(function(_super){
	function QQdawankaItem1UI(){
		this.bg=null;
		this.descImg1=null;
		this.descImg0=null;
		this.descTxt=null;
		this.btn=null;
		this.getted=null;
		this.icon=null;
		QQdawankaItem1UI.__super.call(this);
	}

	__class(QQdawankaItem1UI,'ui.mobile.platform.dawanka.QQdawankaItem1UI',_super);
	var __proto=QQdawankaItem1UI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/dawanka/QQdawankaItem1");
	}

	return QQdawankaItem1UI;
})(View)


//class ui.mobile.platform.dawanka.QQdawankaItem2UI extends laya.ui.View
var QQdawankaItem2UI=(function(_super){
	function QQdawankaItem2UI(){
		this.bg=null;
		this.descImg1=null;
		this.descImg0=null;
		this.descTxt=null;
		this.icon=null;
		this.btn=null;
		QQdawankaItem2UI.__super.call(this);
	}

	__class(QQdawankaItem2UI,'ui.mobile.platform.dawanka.QQdawankaItem2UI',_super);
	var __proto=QQdawankaItem2UI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/dawanka/QQdawankaItem2");
	}

	return QQdawankaItem2UI;
})(View)


//class ui.mobile.platform.dawanka.QQdawankaViewUI extends laya.ui.View
var QQdawankaViewUI=(function(_super){
	function QQdawankaViewUI(){
		QQdawankaViewUI.__super.call(this);;
	}

	__class(QQdawankaViewUI,'ui.mobile.platform.dawanka.QQdawankaViewUI',_super);
	var __proto=QQdawankaViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/dawanka/QQdawankaView");
	}

	return QQdawankaViewUI;
})(View)


//class ui.mobile.platform.tanwan.PlatformTanwanVipViewUI extends laya.ui.View
var PlatformTanwanVipViewUI=(function(_super){
	function PlatformTanwanVipViewUI(){
		this.bg=null;
		this.descBg=null;
		this.descimg=null;
		this.descVip=null;
		this.girlImg=null;
		this.img_ma=null;
		this.top_txt=null;
		this.bottom_txt=null;
		this.btn=null;
		PlatformTanwanVipViewUI.__super.call(this);
	}

	__class(PlatformTanwanVipViewUI,'ui.mobile.platform.tanwan.PlatformTanwanVipViewUI',_super);
	var __proto=PlatformTanwanVipViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/tanwan/PlatformTanwanVipView");
	}

	return PlatformTanwanVipViewUI;
})(View)


//class ui.mobile.platform.xunwan.XunwanHallTitleItemUI extends laya.ui.View
var XunwanHallTitleItemUI=(function(_super){
	function XunwanHallTitleItemUI(){
		this.bg=null;
		this.info_txt=null;
		this.btn=null;
		this.getted=null;
		this.eff_box=null;
		XunwanHallTitleItemUI.__super.call(this);
	}

	__class(XunwanHallTitleItemUI,'ui.mobile.platform.xunwan.XunwanHallTitleItemUI',_super);
	var __proto=XunwanHallTitleItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/xunwan/XunwanHallTitleItem");
	}

	return XunwanHallTitleItemUI;
})(View)


//class ui.mobile.platform.xunwan.XunwanHallTitleViewUI extends laya.ui.View
var XunwanHallTitleViewUI=(function(_super){
	function XunwanHallTitleViewUI(){
		this.list=null;
		XunwanHallTitleViewUI.__super.call(this);
	}

	__class(XunwanHallTitleViewUI,'ui.mobile.platform.xunwan.XunwanHallTitleViewUI',_super);
	var __proto=XunwanHallTitleViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/xunwan/XunwanHallTitleView");
	}

	return XunwanHallTitleViewUI;
})(View)


//class ui.mobile.rank.RankItemUI extends laya.ui.View
var RankItemUI=(function(_super){
	function RankItemUI(){
		this.bg=null;
		this.imgTop=null;
		this.name_txt=null;
		this.guild_txt=null;
		this.num_txt=null;
		this.no_txt=null;
		RankItemUI.__super.call(this);
	}

	__class(RankItemUI,'ui.mobile.rank.RankItemUI',_super);
	var __proto=RankItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/rank/RankItem");
	}

	return RankItemUI;
})(View)


//class ui.mobile.rmbHongbao.EquipFirstdropItemUI extends laya.ui.View
var EquipFirstdropItemUI=(function(_super){
	function EquipFirstdropItemUI(){
		this.bg=null;
		this.nameTxt=null;
		this.lessTxt=null;
		this.btn=null;
		this.yihuishou=null;
		EquipFirstdropItemUI.__super.call(this);
	}

	__class(EquipFirstdropItemUI,'ui.mobile.rmbHongbao.EquipFirstdropItemUI',_super);
	var __proto=EquipFirstdropItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/rmbHongbao/EquipFirstdropItem");
	}

	return EquipFirstdropItemUI;
})(View)


//class ui.mobile.rmbHongbao.EquipFirstdropViewUI extends laya.ui.View
var EquipFirstdropViewUI=(function(_super){
	function EquipFirstdropViewUI(){
		this.p_list=null;
		this.banner=null;
		this.timeTxt=null;
		this.t_panel=null;
		this.tabs=null;
		this.btnAll=null;
		EquipFirstdropViewUI.__super.call(this);
	}

	__class(EquipFirstdropViewUI,'ui.mobile.rmbHongbao.EquipFirstdropViewUI',_super);
	var __proto=EquipFirstdropViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/rmbHongbao/EquipFirstdropView");
	}

	return EquipFirstdropViewUI;
})(View)


//class ui.mobile.role.bagua.BaguaViewUI extends laya.ui.View
var BaguaViewUI=(function(_super){
	function BaguaViewUI(){
		this.btnSuit=null;
		this.icon0=null;
		this.icon1=null;
		this.icon2=null;
		this.icon3=null;
		this.icon4=null;
		this.icon5=null;
		this.icon6=null;
		this.icon7=null;
		this.attrTxt=null;
		this.suitTxt=null;
		this.pTxt7=null;
		this.pTxt6=null;
		this.pTxt5=null;
		this.pTxt4=null;
		this.pTxt3=null;
		this.pTxt2=null;
		this.pTxt1=null;
		this.pTxt0=null;
		this.hitBox0=null;
		this.hitBox1=null;
		this.hitBox2=null;
		this.hitBox3=null;
		this.hitBox4=null;
		this.hitBox5=null;
		this.hitBox6=null;
		this.hitBox7=null;
		BaguaViewUI.__super.call(this);
	}

	__class(BaguaViewUI,'ui.mobile.role.bagua.BaguaViewUI',_super);
	var __proto=BaguaViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/bagua/BaguaView");
	}

	return BaguaViewUI;
})(View)


//class ui.mobile.role.guanzhi.GuanZhiPreviewItemUI extends laya.ui.View
var GuanZhiPreviewItemUI=(function(_super){
	function GuanZhiPreviewItemUI(){
		this.bg=null;
		this.icon=null;
		this.lv_txt=null;
		this.jie_txt=null;
		GuanZhiPreviewItemUI.__super.call(this);
	}

	__class(GuanZhiPreviewItemUI,'ui.mobile.role.guanzhi.GuanZhiPreviewItemUI',_super);
	var __proto=GuanZhiPreviewItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/guanzhi/GuanZhiPreviewItem");
	}

	return GuanZhiPreviewItemUI;
})(View)


//class ui.mobile.role.guanzhi.GuanZhiShopItemUI extends laya.ui.View
var GuanZhiShopItemUI=(function(_super){
	function GuanZhiShopItemUI(){
		this.bg=null;
		this.btn=null;
		this.name_txt=null;
		this.need_txt=null;
		GuanZhiShopItemUI.__super.call(this);
	}

	__class(GuanZhiShopItemUI,'ui.mobile.role.guanzhi.GuanZhiShopItemUI',_super);
	var __proto=GuanZhiShopItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/guanzhi/GuanZhiShopItem");
	}

	return GuanZhiShopItemUI;
})(View)


//class ui.mobile.role.guanzhi.GuanZhiViewUI extends laya.ui.View
var GuanZhiViewUI=(function(_super){
	function GuanZhiViewUI(){
		this.effectNode=null;
		this.btn_daily=null;
		this.btn_shop=null;
		this.btn_up=null;
		this.btn_preview=null;
		this.name_txt=null;
		this.attrName_txt1=null;
		this.attrName_txt2=null;
		this.attr_txt1=null;
		this.attr_txt2=null;
		this.nextNode=null;
		this.attrName_txt3=null;
		this.attrName_txt4=null;
		this.attr_txt3=null;
		this.attr_txt4=null;
		this.max_txt=null;
		this.fightNode=null;
		this.fight_txt=null;
		GuanZhiViewUI.__super.call(this);
	}

	__class(GuanZhiViewUI,'ui.mobile.role.guanzhi.GuanZhiViewUI',_super);
	var __proto=GuanZhiViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/guanzhi/GuanZhiView");
	}

	return GuanZhiViewUI;
})(View)


//class ui.mobile.role.hunhuan.HunGuItemUI extends laya.ui.View
var HunGuItemUI=(function(_super){
	function HunGuItemUI(){
		this.bgGrid=null;
		this.bgNo=null;
		this.imgAdd=null;
		this.bgName=null;
		this.imgJie=null;
		this.name_txt=null;
		HunGuItemUI.__super.call(this);
	}

	__class(HunGuItemUI,'ui.mobile.role.hunhuan.HunGuItemUI',_super);
	var __proto=HunGuItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/hunhuan/HunGuItem");
	}

	return HunGuItemUI;
})(View)


//class ui.mobile.role.hunhuan.HunGuViewUI extends laya.ui.View
var HunGuViewUI=(function(_super){
	function HunGuViewUI(){
		this.bg=null;
		this.masterNode=null;
		this.master_txt=null;
		this.hungu_txt1=null;
		this.hungu_txt2=null;
		this.hungu_txt3=null;
		this.hungu_txt4=null;
		this.hungu_txt5=null;
		this.hungu_txt6=null;
		this.skill_panel=null;
		this.skillNode=null;
		this.skillName_txt=null;
		this.skillDes_txt=null;
		this.skillNode2=null;
		this.skillName_txt2=null;
		this.skillDes_txt2=null;
		this.imgHelp=null;
		HunGuViewUI.__super.call(this);
	}

	__class(HunGuViewUI,'ui.mobile.role.hunhuan.HunGuViewUI',_super);
	var __proto=HunGuViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/hunhuan/HunGuView");
	}

	return HunGuViewUI;
})(View)


//class ui.mobile.role.hunhuan.HunHuanChangeItemUI extends laya.ui.View
var HunHuanChangeItemUI=(function(_super){
	function HunHuanChangeItemUI(){
		this.imgWear=null;
		this.btn=null;
		this.attr_txt=null;
		this.name_txt=null;
		HunHuanChangeItemUI.__super.call(this);
	}

	__class(HunHuanChangeItemUI,'ui.mobile.role.hunhuan.HunHuanChangeItemUI',_super);
	var __proto=HunHuanChangeItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/hunhuan/HunHuanChangeItem");
	}

	return HunHuanChangeItemUI;
})(View)


//class ui.mobile.role.hunhuan.HunHuanChangeMenuUI extends laya.ui.View
var HunHuanChangeMenuUI=(function(_super){
	function HunHuanChangeMenuUI(){
		this.btn_change=null;
		this.btn_unwear=null;
		HunHuanChangeMenuUI.__super.call(this);
	}

	__class(HunHuanChangeMenuUI,'ui.mobile.role.hunhuan.HunHuanChangeMenuUI',_super);
	var __proto=HunHuanChangeMenuUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/hunhuan/HunHuanChangeMenu");
	}

	return HunHuanChangeMenuUI;
})(View)


//class ui.mobile.role.hunhuan.HunHuanComposeViewUI extends laya.ui.View
var HunHuanComposeViewUI=(function(_super){
	function HunHuanComposeViewUI(){
		this.bg=null;
		this.imgHelp=null;
		this.btn=null;
		this.tabs=null;
		this.no_txt=null;
		HunHuanComposeViewUI.__super.call(this);
	}

	__class(HunHuanComposeViewUI,'ui.mobile.role.hunhuan.HunHuanComposeViewUI',_super);
	var __proto=HunHuanComposeViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/hunhuan/HunHuanComposeView");
	}

	return HunHuanComposeViewUI;
})(View)


//class ui.mobile.role.hunhuan.HunHuanEquipItemUI extends laya.ui.View
var HunHuanEquipItemUI=(function(_super){
	function HunHuanEquipItemUI(){
		this.bg=null;
		this.imgSelected=null;
		HunHuanEquipItemUI.__super.call(this);
	}

	__class(HunHuanEquipItemUI,'ui.mobile.role.hunhuan.HunHuanEquipItemUI',_super);
	var __proto=HunHuanEquipItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/hunhuan/HunHuanEquipItem");
	}

	return HunHuanEquipItemUI;
})(View)


//class ui.mobile.role.hunhuan.HunHuanMenuItemUI extends laya.ui.View
var HunHuanMenuItemUI=(function(_super){
	function HunHuanMenuItemUI(){
		this.btn=null;
		this.imgAdd=null;
		this.imgLock=null;
		this.bg_jie=null;
		this.imgJie=null;
		this.name_txt=null;
		this.year_txt=null;
		this.des_txt=null;
		HunHuanMenuItemUI.__super.call(this);
	}

	__class(HunHuanMenuItemUI,'ui.mobile.role.hunhuan.HunHuanMenuItemUI',_super);
	var __proto=HunHuanMenuItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/hunhuan/HunHuanMenuItem");
	}

	return HunHuanMenuItemUI;
})(View)


//class ui.mobile.role.hunhuan.HunHuanTabViewUI extends laya.ui.View
var HunHuanTabViewUI=(function(_super){
	function HunHuanTabViewUI(){
		this.tabs=null;
		HunHuanTabViewUI.__super.call(this);
	}

	__class(HunHuanTabViewUI,'ui.mobile.role.hunhuan.HunHuanTabViewUI',_super);
	var __proto=HunHuanTabViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/hunhuan/HunHuanTabView");
	}

	return HunHuanTabViewUI;
})(View)


//class ui.mobile.role.hunhuan.HunHuanUpgradeItemUI extends laya.ui.View
var HunHuanUpgradeItemUI=(function(_super){
	function HunHuanUpgradeItemUI(){
		this.bg_grid=null;
		this.bg_title=null;
		this.imgJie=null;
		this.imgLock=null;
		this.imgAdd=null;
		this.imgWhat=null;
		this.title_txt=null;
		this.need_txt=null;
		HunHuanUpgradeItemUI.__super.call(this);
	}

	__class(HunHuanUpgradeItemUI,'ui.mobile.role.hunhuan.HunHuanUpgradeItemUI',_super);
	var __proto=HunHuanUpgradeItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/hunhuan/HunHuanUpgradeItem");
	}

	return HunHuanUpgradeItemUI;
})(View)


//class ui.mobile.role.hunhuan.HunHuanUpgradeViewUI extends laya.ui.View
var HunHuanUpgradeViewUI=(function(_super){
	function HunHuanUpgradeViewUI(){
		this.bg=null;
		this.imgHelp=null;
		this.upNode=null;
		this.btn_auto=null;
		this.btn_up=null;
		this.hunguNode=null;
		this.success_txt=null;
		this.hunhuanNode=null;
		this.imgBar=null;
		this.bar_txt=null;
		this.no_txt=null;
		HunHuanUpgradeViewUI.__super.call(this);
	}

	__class(HunHuanUpgradeViewUI,'ui.mobile.role.hunhuan.HunHuanUpgradeViewUI',_super);
	var __proto=HunHuanUpgradeViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/hunhuan/HunHuanUpgradeView");
	}

	return HunHuanUpgradeViewUI;
})(View)


//class ui.mobile.role.hunhuan.HunHuanViewUI extends laya.ui.View
var HunHuanViewUI=(function(_super){
	function HunHuanViewUI(){
		this.bg=null;
		this.imgHelp=null;
		this.noNode=null;
		this.no_txt=null;
		this.noOpen_txt=null;
		this.noEquip_txt=null;
		this.jumpBoss_txt=null;
		this.noOpen_txt2=null;
		this.attrNode=null;
		this.attr_txt=null;
		this.btn_up=null;
		HunHuanViewUI.__super.call(this);
	}

	__class(HunHuanViewUI,'ui.mobile.role.hunhuan.HunHuanViewUI',_super);
	var __proto=HunHuanViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/hunhuan/HunHuanView");
	}

	return HunHuanViewUI;
})(View)


//class ui.mobile.role.junxian.JunXianViewUI extends laya.ui.View
var JunXianViewUI=(function(_super){
	function JunXianViewUI(){
		this.effectNode=null;
		this.name_txt=null;
		this.bg_grid=null;
		this.imgMax=null;
		this.btn_up=null;
		this.btn_way=null;
		this.bg_cost0=null;
		this.icon0=null;
		this.cost_txt0=null;
		this.bg_cost1=null;
		this.icon1=null;
		this.cost_txt1=null;
		JunXianViewUI.__super.call(this);
	}

	__class(JunXianViewUI,'ui.mobile.role.junxian.JunXianViewUI',_super);
	var __proto=JunXianViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/junxian/JunXianView");
	}

	return JunXianViewUI;
})(View)


//class ui.mobile.role.junxian.JunZhuangItemUI extends laya.ui.View
var JunZhuangItemUI=(function(_super){
	function JunZhuangItemUI(){
		this.border=null;
		this.equipNode=null;
		this.icon=null;
		this.num_txt=null;
		this.imgLv=null;
		this.touchNode=null;
		JunZhuangItemUI.__super.call(this);
	}

	__class(JunZhuangItemUI,'ui.mobile.role.junxian.JunZhuangItemUI',_super);
	var __proto=JunZhuangItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/junxian/JunZhuangItem");
	}

	return JunZhuangItemUI;
})(View)


//class ui.mobile.role.junxian.JunZhuangSummaryTipUI extends laya.ui.View
var JunZhuangSummaryTipUI=(function(_super){
	function JunZhuangSummaryTipUI(){
		JunZhuangSummaryTipUI.__super.call(this);;
	}

	__class(JunZhuangSummaryTipUI,'ui.mobile.role.junxian.JunZhuangSummaryTipUI',_super);
	var __proto=JunZhuangSummaryTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/junxian/JunZhuangSummaryTip");
	}

	return JunZhuangSummaryTipUI;
})(View)


//class ui.mobile.role.junxian.JunZhuangViewUI extends laya.ui.View
var JunZhuangViewUI=(function(_super){
	function JunZhuangViewUI(){
		this.attrPanel=null;
		this.suitNode=null;
		this.suitTitle_txt=null;
		this.suit_txt1=null;
		this.suit_txt2=null;
		this.no_txt=null;
		this.imgMax=null;
		this.upNode=null;
		this.btn_up=null;
		this.btn_way=null;
		this.btn_summary=null;
		this.gridNode=null;
		this.name_txt=null;
		this.num_txt=null;
		this.imgSelected=null;
		JunZhuangViewUI.__super.call(this);
	}

	__class(JunZhuangViewUI,'ui.mobile.role.junxian.JunZhuangViewUI',_super);
	var __proto=JunZhuangViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/junxian/JunZhuangView");
	}

	return JunZhuangViewUI;
})(View)


//class ui.mobile.role.lunhui.LunhuiViewUI extends laya.ui.View
var LunhuiViewUI=(function(_super){
	function LunhuiViewUI(){
		this.bg=null;
		this.qiu0=null;
		this.qiu1=null;
		this.qiu2=null;
		this.qiu3=null;
		this.qiu4=null;
		this.qiu5=null;
		this.qiu6=null;
		this.qiu7=null;
		this.qiu8=null;
		this.qiu9=null;
		this.equipBox=null;
		this.btnTab1=null;
		this.btnTab2=null;
		this.btn1=null;
		this.btn2=null;
		this.title=null;
		this.barBox=null;
		this.bar=null;
		this.barTxt=null;
		this.btnUP=null;
		this.btnDH=null;
		this.nameImg=null;
		this.buyCostTxt=null;
		this.buyTimeTxt=null;
		this.levelTxt=null;
		this.newLevelTxt=null;
		this.numTxt=null;
		this.yimanjie=null;
		this.btnBuy=null;
		LunhuiViewUI.__super.call(this);
	}

	__class(LunhuiViewUI,'ui.mobile.role.lunhui.LunhuiViewUI',_super);
	var __proto=LunhuiViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/lunhui/LunhuiView");
	}

	return LunhuiViewUI;
})(View)


//class ui.mobile.neigong.NeiGongTaskItemUI extends laya.ui.View
var NeiGongTaskItemUI=(function(_super){
	function NeiGongTaskItemUI(){
		this.need_txt=null;
		this.reward_txt=null;
		this.need_count_txt=null;
		this.reward_count_txt=null;
		this.icon_need=null;
		this.icon_reward=null;
		this.btn=null;
		NeiGongTaskItemUI.__super.call(this);
	}

	__class(NeiGongTaskItemUI,'ui.mobile.neigong.NeiGongTaskItemUI',_super);
	var __proto=NeiGongTaskItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/neigong/NeiGongTaskItem");
	}

	return NeiGongTaskItemUI;
})(View)


//class ui.mobile.neigong.NeiGongViewUI extends laya.ui.View
var NeiGongViewUI=(function(_super){
	function NeiGongViewUI(){
		this.line1=null;
		this.line2=null;
		this.line3=null;
		this.line4=null;
		this.line5=null;
		this.line6=null;
		this.line7=null;
		this.line8=null;
		this.line9=null;
		this.bg_ball1=null;
		this.bg_ball2=null;
		this.bg_ball3=null;
		this.bg_ball4=null;
		this.bg_ball5=null;
		this.bg_ball6=null;
		this.bg_ball7=null;
		this.bg_ball8=null;
		this.bg_ball9=null;
		this.bg_ball10=null;
		this.imgMax=null;
		this.lv_chong=null;
		this.lv_xing=null;
		this.lv_name=null;
		this.tip_txt=null;
		this.lv_txt=null;
		this.btn_up=null;
		this.btn_way=null;
		NeiGongViewUI.__super.call(this);
	}

	__class(NeiGongViewUI,'ui.mobile.neigong.NeiGongViewUI',_super);
	var __proto=NeiGongViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/neigong/NeiGongView");
	}

	return NeiGongViewUI;
})(View)


//class ui.mobile.role.otherPlayer.OtherPlayerHeadUI extends laya.ui.View
var OtherPlayerHeadUI=(function(_super){
	function OtherPlayerHeadUI(){
		this.imgBorder=null;
		this.imgHead=null;
		this.imgVip=null;
		OtherPlayerHeadUI.__super.call(this);
	}

	__class(OtherPlayerHeadUI,'ui.mobile.role.otherPlayer.OtherPlayerHeadUI',_super);
	var __proto=OtherPlayerHeadUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/otherPlayer/OtherPlayerHead");
	}

	return OtherPlayerHeadUI;
})(View)


//class ui.mobile.role.otherPlayer.OtherPlayerMenuUI extends laya.ui.View
var OtherPlayerMenuUI=(function(_super){
	function OtherPlayerMenuUI(){
		this.bg=null;
		this.btn_check=null;
		this.btn_chat=null;
		this.btn_team=null;
		this.btn_deal=null;
		this.btn_friend=null;
		this.btn_delete=null;
		this.btn_black=null;
		this.btn_remove_black=null;
		this.btn_report=null;
		this.lv_txt=null;
		this.guild_txt=null;
		this.name_txt=null;
		OtherPlayerMenuUI.__super.call(this);
	}

	__class(OtherPlayerMenuUI,'ui.mobile.role.otherPlayer.OtherPlayerMenuUI',_super);
	var __proto=OtherPlayerMenuUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/otherPlayer/OtherPlayerMenu");
	}

	return OtherPlayerMenuUI;
})(View)


//class ui.mobile.role.otherPlayer.OtherPlayerMoZhuang.OtherPlayerKBViewUI extends laya.ui.View
var OtherPlayerKBViewUI=(function(_super){
	function OtherPlayerKBViewUI(){
		this.grid0=null;
		this.jiaobiao0=null;
		this.grid2=null;
		this.jiaobiao2=null;
		this.grid4=null;
		this.jiaobiao4=null;
		this.grid6=null;
		this.jiaobiao6=null;
		this.grid8=null;
		this.jiaobiao8=null;
		this.grid1=null;
		this.jiaobiao1=null;
		this.grid3=null;
		this.jiaobiao3=null;
		this.grid5=null;
		this.jiaobiao5=null;
		this.grid7=null;
		this.jiaobiao7=null;
		this.grid9=null;
		this.jiaobiao9=null;
		this.grid10=null;
		this.grid12=null;
		this.grid14=null;
		this.grid16=null;
		this.grid18=null;
		this.grid11=null;
		this.grid13=null;
		this.grid15=null;
		this.grid17=null;
		this.grid19=null;
		OtherPlayerKBViewUI.__super.call(this);
	}

	__class(OtherPlayerKBViewUI,'ui.mobile.role.otherPlayer.OtherPlayerMoZhuang.OtherPlayerKBViewUI',_super);
	var __proto=OtherPlayerKBViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.gubao.YuhunGridUI",YuhunGridUI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/otherPlayer/OtherPlayerMoZhuang/OtherPlayerKBView");
	}

	return OtherPlayerKBViewUI;
})(View)


//class ui.mobile.role.otherPlayer.OtherPlayerMoZhuang.OtherPlayerMiaoShaViewUI extends laya.ui.View
var OtherPlayerMiaoShaViewUI=(function(_super){
	function OtherPlayerMiaoShaViewUI(){
		this.item0=null;
		this.item1=null;
		this.item2=null;
		this.item3=null;
		this.item4=null;
		this.item5=null;
		this.item6=null;
		this.item7=null;
		this.item8=null;
		this.item9=null;
		OtherPlayerMiaoShaViewUI.__super.call(this);
	}

	__class(OtherPlayerMiaoShaViewUI,'ui.mobile.role.otherPlayer.OtherPlayerMoZhuang.OtherPlayerMiaoShaViewUI',_super);
	var __proto=OtherPlayerMiaoShaViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/otherPlayer/OtherPlayerMoZhuang/OtherPlayerMiaoShaView");
	}

	return OtherPlayerMiaoShaViewUI;
})(View)


//class ui.mobile.role.otherPlayer.OtherPlayerMoZhuangViewUI extends laya.ui.View
var OtherPlayerMoZhuangViewUI=(function(_super){
	function OtherPlayerMoZhuangViewUI(){
		this.bg=null;
		this.tabs=null;
		OtherPlayerMoZhuangViewUI.__super.call(this);
	}

	__class(OtherPlayerMoZhuangViewUI,'ui.mobile.role.otherPlayer.OtherPlayerMoZhuangViewUI',_super);
	var __proto=OtherPlayerMoZhuangViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/otherPlayer/OtherPlayerMoZhuangView");
	}

	return OtherPlayerMoZhuangViewUI;
})(View)


//class ui.mobile.role.otherPlayer.OtherPlayerRoleViewUI extends laya.ui.View
var OtherPlayerRoleViewUI=(function(_super){
	function OtherPlayerRoleViewUI(){
		this.bg=null;
		this.roleBox=null;
		this.bottomBox=null;
		this.other_tabs=null;
		this.btnBack=null;
		this.other_box=null;
		this.namebg=null;
		this.btnSwitch=null;
		this.switchFont=null;
		this.btnSxBox=null;
		this.btnShengxiao=null;
		this.btnRuishou=null;
		OtherPlayerRoleViewUI.__super.call(this);
	}

	__class(OtherPlayerRoleViewUI,'ui.mobile.role.otherPlayer.OtherPlayerRoleViewUI',_super);
	var __proto=OtherPlayerRoleViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/otherPlayer/OtherPlayerRoleView");
	}

	return OtherPlayerRoleViewUI;
})(View)


//class ui.mobile.role.otherPlayer.OtherPlayerShengZhuangViewUI extends laya.ui.View
var OtherPlayerShengZhuangViewUI=(function(_super){
	function OtherPlayerShengZhuangViewUI(){
		this.bg=null;
		this.grid0=null;
		this.jiaobiao0=null;
		this.grid1=null;
		this.jiaobiao1=null;
		this.grid4=null;
		this.jiaobiao4=null;
		this.grid5=null;
		this.jiaobiao5=null;
		this.grid2=null;
		this.jiaobiao2=null;
		this.grid3=null;
		this.jiaobiao3=null;
		this.grid7=null;
		this.jiaobiao7=null;
		this.grid6=null;
		this.jiaobiao6=null;
		this.tabs=null;
		this.btnZhibao=null;
		OtherPlayerShengZhuangViewUI.__super.call(this);
	}

	__class(OtherPlayerShengZhuangViewUI,'ui.mobile.role.otherPlayer.OtherPlayerShengZhuangViewUI',_super);
	var __proto=OtherPlayerShengZhuangViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/otherPlayer/OtherPlayerShengZhuangView");
	}

	return OtherPlayerShengZhuangViewUI;
})(View)


//class ui.mobile.role.otherPlayer.OtherPlayerWindowUI extends laya.ui.View
var OtherPlayerWindowUI=(function(_super){
	function OtherPlayerWindowUI(){
		this.closeBtn=null;
		OtherPlayerWindowUI.__super.call(this);
	}

	__class(OtherPlayerWindowUI,'ui.mobile.role.otherPlayer.OtherPlayerWindowUI',_super);
	var __proto=OtherPlayerWindowUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/otherPlayer/OtherPlayerWindow");
	}

	return OtherPlayerWindowUI;
})(View)


//class ui.mobile.role.role.JingdianEquipViewUI extends laya.ui.View
var JingdianEquipViewUI=(function(_super){
	function JingdianEquipViewUI(){
		this.role_img=null;
		this.tabs=null;
		this.box0=null;
		this.box3=null;
		this.box1=null;
		this.box2=null;
		this.box4=null;
		this.box5=null;
		this.attr_box=null;
		this.hp_txt=null;
		this.gj_txt=null;
		this.fy_txt=null;
		this.noattr_img=null;
		this.font=null;
		this.suit_txt0=null;
		this.suit_txt1=null;
		this.suit_txt2=null;
		this.open_txt=null;
		this.get_box=null;
		this.get_btn0=null;
		this.get_btn1=null;
		JingdianEquipViewUI.__super.call(this);
	}

	__class(JingdianEquipViewUI,'ui.mobile.role.role.JingdianEquipViewUI',_super);
	var __proto=JingdianEquipViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/role/JingdianEquipView");
	}

	return JingdianEquipViewUI;
})(View)


//class ui.mobile.role.role.RoleViewUI extends laya.ui.View
var RoleViewUI=(function(_super){
	function RoleViewUI(){
		this.roleBox=null;
		this.bottomBox=null;
		this.other_box=null;
		this.namebg=null;
		this.btnSwitch=null;
		this.switchFont=null;
		this.cs_grid=null;
		this.btnYulan=null;
		this.ip_txt=null;
		this.other_tabs=null;
		this.btnNo=null;
		this.btnRuishou=null;
		this.btnBack=null;
		this.btnSxBox=null;
		this.btnShengxiao=null;
		this.attr_btn1=null;
		this.attr_btn2=null;
		this.help_box=null;
		this.lv_txt=null;
		this.job_txt=null;
		this.guild_txt=null;
		this.id_txt=null;
		this.copy_btn=null;
		this.pk_box=null;
		this.pk_txt=null;
		this.exp_box=null;
		this.exp_bar=null;
		this.exp_txt=null;
		this.hp_box=null;
		this.hp_bar=null;
		this.hp_txt=null;
		this.neigong_box=null;
		this.neigong_bar=null;
		this.neigong_txt=null;
		this.mp_box=null;
		this.mp_bar=null;
		this.mp_txt=null;
		this.atk_box=null;
		this.atk_txt=null;
		this.def_box=null;
		this.def_txt=null;
		this.attr_box2=null;
		this.txt14=null;
		this.txt15=null;
		this.txt16=null;
		this.txt17=null;
		this.txt18=null;
		this.txt19=null;
		this.txt20=null;
		this.txt21=null;
		this.attr_box1=null;
		this.hpHui_txt=null;
		this.hit_txt=null;
		this.dodge_txt=null;
		this.crit_txt=null;
		this.crit_txt2=null;
		this.crit_txt3=null;
		this.crit_txt4=null;
		this.blood_txt1=null;
		this.blood_txt2=null;
		this.blood_txt3=null;
		this.luck_txt=null;
		this.baolv_txt=null;
		this.qiege_txt=null;
		this.mabi_txt=null;
		this.mabi_txt2=null;
		this.monsterAdd_txt=null;
		this.monsterDel_txt=null;
		this.zhanshi_txt=null;
		this.zhanshi_txt2=null;
		this.fashi_txt=null;
		this.fashi_txt2=null;
		this.daoshi_txt=null;
		this.daoshi_txt2=null;
		this.ysdel_txt=null;
		this.hurtAdd_txt=null;
		this.hurtDel_txt=null;
		this.pkAdd_txt=null;
		this.pkDel_txt=null;
		this.hpPer_txt=null;
		this.atkPer_txt=null;
		this.defPer_txt=null;
		this.neilijiacheng_txt=null;
		this.neigongshanghai_txt=null;
		this.neishangjiacheng_txt=null;
		this.neigongjianshang_txt=null;
		this.pkAddHurt_txt=null;
		this.pkDelHurt_txt=null;
		this.fanshang_txt=null;
		this.atkSpeed_txt=null;
		this.yichangkangxing_txt=null;
		this.feishengyiji_txt=null;
		this.feishengdikang_txt=null;
		RoleViewUI.__super.call(this);
	}

	__class(RoleViewUI,'ui.mobile.role.role.RoleViewUI',_super);
	var __proto=RoleViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/role/RoleView");
	}

	return RoleViewUI;
})(View)


//class ui.mobile.role.role.ui.DouliGridUI extends laya.ui.View
var DouliGridUI=(function(_super){
	function DouliGridUI(){
		this.bg=null;
		this.pinzhi=null;
		this.icon=null;
		this.btn=null;
		this.jiaobiaoTxt=null;
		DouliGridUI.__super.call(this);
	}

	__class(DouliGridUI,'ui.mobile.role.role.ui.DouliGridUI',_super);
	var __proto=DouliGridUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/role/ui/DouliGrid");
	}

	return DouliGridUI;
})(View)


//class ui.mobile.tip.DouliTipUI extends laya.ui.View
var DouliTipUI=(function(_super){
	function DouliTipUI(){
		this.bg=null;
		this.name_txt=null;
		this.bind_txt=null;
		this.type_txt=null;
		this.lv_txt=null;
		this.attr_box=null;
		this.attr_txt=null;
		this.desc_box=null;
		this.desc_txt=null;
		this.from_box=null;
		this.from_txt=null;
		this.skill_box=null;
		this.skill_txt=null;
		this.suit_box=null;
		this.suit_part_txt1=null;
		this.suit_attr_txt=null;
		this.suit_part_txt2=null;
		this.suit_txt=null;
		DouliTipUI.__super.call(this);
	}

	__class(DouliTipUI,'ui.mobile.tip.DouliTipUI',_super);
	var __proto=DouliTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tip/DouliTip");
	}

	return DouliTipUI;
})(View)


//class ui.mobile.tip.LingchongTipUI extends laya.ui.View
var LingchongTipUI=(function(_super){
	function LingchongTipUI(){
		this.bg=null;
		this.name_txt=null;
		this.bind_txt=null;
		this.type_txt=null;
		this.lv_txt=null;
		this.attr_txt=null;
		this.from_txt=null;
		this.suit_box=null;
		this.suit_part_txt1=null;
		this.suit_attr_txt=null;
		this.suit_part_txt2=null;
		this.suit_txt=null;
		this.n_attr_txt=null;
		this.desc_txt=null;
		LingchongTipUI.__super.call(this);
	}

	__class(LingchongTipUI,'ui.mobile.tip.LingchongTipUI',_super);
	var __proto=LingchongTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tip/LingchongTip");
	}

	return LingchongTipUI;
})(View)


//class ui.mobile.role.yishou.YishouViewUI extends laya.ui.View
var YishouViewUI=(function(_super){
	function YishouViewUI(){
		this.m_titleTxt=null;
		this.btnAct=null;
		YishouViewUI.__super.call(this);
	}

	__class(YishouViewUI,'ui.mobile.role.yishou.YishouViewUI',_super);
	var __proto=YishouViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/yishou/YishouView");
	}

	return YishouViewUI;
})(View)


//class ui.mobile.role.zhuansheng.ZhuanShengViewUI extends laya.ui.View
var ZhuanShengViewUI=(function(_super){
	function ZhuanShengViewUI(){
		this.jianying=null;
		this.imgArrow=null;
		this.imgMax=null;
		this.imgName=null;
		this.btn=null;
		this.btnLink=null;
		this.needLv_txt=null;
		this.name_txt=null;
		this.nowName_txt=null;
		this.nextName_txt=null;
		this.vip_txt=null;
		this.bg_cost=null;
		this.icon0=null;
		this.icon1=null;
		this.cost_txt0=null;
		this.cost_txt1=null;
		this.btn_add=null;
		ZhuanShengViewUI.__super.call(this);
	}

	__class(ZhuanShengViewUI,'ui.mobile.role.zhuansheng.ZhuanShengViewUI',_super);
	var __proto=ZhuanShengViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/zhuansheng/ZhuanShengView");
	}

	return ZhuanShengViewUI;
})(View)


//class ui.mobile.setup.AutoSliderUI extends laya.ui.View
var AutoSliderUI=(function(_super){
	function AutoSliderUI(){
		this.bg=null;
		this.pro=null;
		this.bar=null;
		AutoSliderUI.__super.call(this);
	}

	__class(AutoSliderUI,'ui.mobile.setup.AutoSliderUI',_super);
	var __proto=AutoSliderUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/setup/AutoSlider");
	}

	return AutoSliderUI;
})(View)


//class ui.mobile.setup.neigua.SetupNeiguaItemUI extends laya.ui.View
var SetupNeiguaItemUI=(function(_super){
	function SetupNeiguaItemUI(){
		this.bg=null;
		this.name_txt=null;
		this.map_txt=null;
		this.clear_btn=null;
		this.btn=null;
		this.lock_btn=null;
		SetupNeiguaItemUI.__super.call(this);
	}

	__class(SetupNeiguaItemUI,'ui.mobile.setup.neigua.SetupNeiguaItemUI',_super);
	var __proto=SetupNeiguaItemUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/setup/neigua/SetupNeiguaItem");
	}

	return SetupNeiguaItemUI;
})(View)


//class ui.mobile.setup.neigua.SetupNeiguaViewUI extends laya.ui.View
var SetupNeiguaViewUI=(function(_super){
	function SetupNeiguaViewUI(){
		this.list=null;
		this.fanji_ck=null;
		this.btn=null;
		this.hecheng_ck=null;
		this.hecheng_btn=null;
		this.desc_txt=null;
		SetupNeiguaViewUI.__super.call(this);
	}

	__class(SetupNeiguaViewUI,'ui.mobile.setup.neigua.SetupNeiguaViewUI',_super);
	var __proto=SetupNeiguaViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/setup/neigua/SetupNeiguaView");
	}

	return SetupNeiguaViewUI;
})(View)


//class ui.mobile.setup.SetupBaohuViewUI extends laya.ui.View
var SetupBaohuViewUI=(function(_super){
	function SetupBaohuViewUI(){
		this.btnGou1=null;
		this.btnGou2=null;
		this.btnGou3=null;
		this.btnGou4=null;
		this.btnGou2_link=null;
		this.btnGou1_txt=null;
		this.btnGou3_txt=null;
		this.btnGou4_txt=null;
		SetupBaohuViewUI.__super.call(this);
	}

	__class(SetupBaohuViewUI,'ui.mobile.setup.SetupBaohuViewUI',_super);
	var __proto=SetupBaohuViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/setup/SetupBaohuView");
	}

	return SetupBaohuViewUI;
})(View)


//class ui.mobile.setup.SetupFuzhuViewUI extends laya.ui.View
var SetupFuzhuViewUI=(function(_super){
	function SetupFuzhuViewUI(){
		this.btnGou1=null;
		this.btnGou2=null;
		this.btnGou3=null;
		this.btnGou4=null;
		this.btnGou5=null;
		this.btnGou6=null;
		this.btnGou7=null;
		this.btnGou8=null;
		this.btnGou9=null;
		this.btnGou10=null;
		this.btnGou11=null;
		this.btnGou12=null;
		this.btnGou13=null;
		this.btnGou14=null;
		this.btnGou15=null;
		this.btnGou16=null;
		this.btnGou17=null;
		this.btnGou18=null;
		this.btnGou19=null;
		this.btnGou20=null;
		this.btnGou21=null;
		this.btnGou22=null;
		this.ratio1=null;
		this.ratio2=null;
		this.btnQuxiao=null;
		SetupFuzhuViewUI.__super.call(this);
	}

	__class(SetupFuzhuViewUI,'ui.mobile.setup.SetupFuzhuViewUI',_super);
	var __proto=SetupFuzhuViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/setup/SetupFuzhuView");
	}

	return SetupFuzhuViewUI;
})(View)


//class ui.mobile.setup.SetupGuajiViewUI extends laya.ui.View
var SetupGuajiViewUI=(function(_super){
	function SetupGuajiViewUI(){
		this.btnGou1=null;
		this.btnGou2=null;
		this.btnGou3=null;
		this.btnGou4=null;
		this.btnGou5=null;
		this.btnGou6=null;
		this.btnGou7=null;
		this.btnGou8=null;
		this.btnGou9=null;
		this.btnGou12=null;
		this.guaji_txt=null;
		this.btn_rank=null;
		this.wajueBox=null;
		this.btnGou10=null;
		this.btnGou11=null;
		this.wajueCombo=null;
		SetupGuajiViewUI.__super.call(this);
	}

	__class(SetupGuajiViewUI,'ui.mobile.setup.SetupGuajiViewUI',_super);
	var __proto=SetupGuajiViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/setup/SetupGuajiView");
	}

	return SetupGuajiViewUI;
})(View)


//class ui.mobile.setup.SetupOfflineItemUI extends laya.ui.View
var SetupOfflineItemUI=(function(_super){
	function SetupOfflineItemUI(){
		this.txt1=null;
		this.txt2=null;
		this.btn=null;
		SetupOfflineItemUI.__super.call(this);
	}

	__class(SetupOfflineItemUI,'ui.mobile.setup.SetupOfflineItemUI',_super);
	var __proto=SetupOfflineItemUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/setup/SetupOfflineItem");
	}

	return SetupOfflineItemUI;
})(View)


//class ui.mobile.setup.SetupOfflineViewUI extends laya.ui.View
var SetupOfflineViewUI=(function(_super){
	function SetupOfflineViewUI(){
		this.btnRule=null;
		this.l_panel=null;
		SetupOfflineViewUI.__super.call(this);
	}

	__class(SetupOfflineViewUI,'ui.mobile.setup.SetupOfflineViewUI',_super);
	var __proto=SetupOfflineViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/setup/SetupOfflineView");
	}

	return SetupOfflineViewUI;
})(View)


//class ui.mobile.shenhua.fuxi.FuxiJinglianItemUI extends laya.ui.View
var FuxiJinglianItemUI=(function(_super){
	function FuxiJinglianItemUI(){
		this.bg=null;
		this.nameTxt=null;
		FuxiJinglianItemUI.__super.call(this);
	}

	__class(FuxiJinglianItemUI,'ui.mobile.shenhua.fuxi.FuxiJinglianItemUI',_super);
	var __proto=FuxiJinglianItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenhua/fuxi/FuxiJinglianItem");
	}

	return FuxiJinglianItemUI;
})(View)


//class ui.mobile.shenhua.fuxi.FuxiViewUI extends laya.ui.View
var FuxiViewUI=(function(_super){
	function FuxiViewUI(){
		this.btnJinglian=null;
		this.btnFenjie=null;
		this.btnSuit=null;
		this.zuzhouImg=null;
		this.rs_txt=null;
		this.rs_nameTxt=null;
		this.re_nameTxt=null;
		this.re_txt=null;
		this.a_panel=null;
		FuxiViewUI.__super.call(this);
	}

	__class(FuxiViewUI,'ui.mobile.shenhua.fuxi.FuxiViewUI',_super);
	var __proto=FuxiViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenhua/fuxi/FuxiView");
	}

	return FuxiViewUI;
})(View)


//class ui.mobile.shenhua.nvwa.NvwaShopItemUI extends laya.ui.View
var NvwaShopItemUI=(function(_super){
	function NvwaShopItemUI(){
		this.bg=null;
		this.tuijian=null;
		this.nameTxt=null;
		this.needTxt=null;
		this.btnBuy=null;
		this.haveTxt=null;
		NvwaShopItemUI.__super.call(this);
	}

	__class(NvwaShopItemUI,'ui.mobile.shenhua.nvwa.NvwaShopItemUI',_super);
	var __proto=NvwaShopItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenhua/nvwa/NvwaShopItem");
	}

	return NvwaShopItemUI;
})(View)


//class ui.mobile.shenhua.nvwa.NvwaViewUI extends laya.ui.View
var NvwaViewUI=(function(_super){
	function NvwaViewUI(){
		this.attrPanel=null;
		this.btnZhibao=null;
		this.btnFenjie=null;
		this.btnShop=null;
		this.btnUpStar=null;
		this.pingfenBox=null;
		this.starBox=null;
		this.btnSkill=null;
		this.starImg=null;
		this.btnHecheng=null;
		this.btnLink=null;
		this.skillBox=null;
		this.s_grid0=null;
		this.s_nameTxt0=null;
		this.s_grid1=null;
		this.s_nameTxt1=null;
		NvwaViewUI.__super.call(this);
	}

	__class(NvwaViewUI,'ui.mobile.shenhua.nvwa.NvwaViewUI',_super);
	var __proto=NvwaViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenhua/nvwa/NvwaView");
	}

	return NvwaViewUI;
})(View)


//class ui.mobile.shenhua.pangu.PanguMallItemUI extends laya.ui.View
var PanguMallItemUI=(function(_super){
	function PanguMallItemUI(){
		this.nameTxt=null;
		this.p_txt=null;
		this.p_icon=null;
		this.descTxt=null;
		this.yigoumai=null;
		this.btnBuy=null;
		this.xiangouTxt=null;
		PanguMallItemUI.__super.call(this);
	}

	__class(PanguMallItemUI,'ui.mobile.shenhua.pangu.PanguMallItemUI',_super);
	var __proto=PanguMallItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenhua/pangu/PanguMallItem");
	}

	return PanguMallItemUI;
})(View)


//class ui.mobile.shenhua.pangu.PanguOutItemUI extends laya.ui.View
var PanguOutItemUI=(function(_super){
	function PanguOutItemUI(){
		this.icon=null;
		this.txt=null;
		this.nameImg=null;
		this.btnLink=null;
		PanguOutItemUI.__super.call(this);
	}

	__class(PanguOutItemUI,'ui.mobile.shenhua.pangu.PanguOutItemUI',_super);
	var __proto=PanguOutItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenhua/pangu/PanguOutItem");
	}

	return PanguOutItemUI;
})(View)


//class ui.mobile.shenhua.pangu.PanguViewUI extends laya.ui.View
var PanguViewUI=(function(_super){
	function PanguViewUI(){
		this.grid0=null;
		this.jiaobiao0=null;
		this.grid1=null;
		this.jiaobiao1=null;
		this.grid4=null;
		this.jiaobiao4=null;
		this.grid5=null;
		this.jiaobiao5=null;
		this.grid2=null;
		this.jiaobiao2=null;
		this.grid3=null;
		this.jiaobiao3=null;
		this.grid7=null;
		this.jiaobiao7=null;
		this.grid6=null;
		this.jiaobiao6=null;
		this.btnHC=null;
		this.nameTxt=null;
		this.r_panel=null;
		this.c_attrTxt=null;
		this.c_partTxt=null;
		this.c_suitTxt=null;
		this.n_suitTxt=null;
		this.n_partTxt=null;
		this.n_attrTxt=null;
		this.btnTH=null;
		PanguViewUI.__super.call(this);
	}

	__class(PanguViewUI,'ui.mobile.shenhua.pangu.PanguViewUI',_super);
	var __proto=PanguViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenhua/pangu/PanguView");
	}

	return PanguViewUI;
})(View)


//class ui.mobile.shenhua.ShenhuaViewUI extends laya.ui.View
var ShenhuaViewUI=(function(_super){
	function ShenhuaViewUI(){
		this.tabs=null;
		ShenhuaViewUI.__super.call(this);
	}

	__class(ShenhuaViewUI,'ui.mobile.shenhua.ShenhuaViewUI',_super);
	var __proto=ShenhuaViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenhua/ShenhuaView");
	}

	return ShenhuaViewUI;
})(View)


//class ui.mobile.shenmo.ShenmoItemTipUI extends laya.ui.View
var ShenmoItemTipUI=(function(_super){
	function ShenmoItemTipUI(){
		this.bg=null;
		this.nameImg=null;
		this.p_panel=null;
		this.line1=null;
		this.line2=null;
		this.line3=null;
		this.attrTxt=null;
		ShenmoItemTipUI.__super.call(this);
	}

	__class(ShenmoItemTipUI,'ui.mobile.shenmo.ShenmoItemTipUI',_super);
	var __proto=ShenmoItemTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenmo/ShenmoItemTip");
	}

	return ShenmoItemTipUI;
})(View)


//class ui.mobile.shenmo.ShenmoViewUI extends laya.ui.View
var ShenmoViewUI=(function(_super){
	function ShenmoViewUI(){
		this.bg=null;
		this.title=null;
		this.name_box=null;
		this.nameImg=null;
		this.ps_item0_bg=null;
		this.s1_box=null;
		this.s1_c_title=null;
		this.s1_c_attrTxt=null;
		this.s1_n_box=null;
		this.s1_n_title=null;
		this.s1_n_attrTxt=null;
		this.btnHH=null;
		this.s0_box=null;
		this.s0_attrTxt=null;
		this.imgFonts=null;
		this.imgFont0=null;
		this.imgFont1=null;
		this.qipao=null;
		this.s0_titleBox=null;
		this.s0_title=null;
		this.s0_titleLine=null;
		this.yimanjie=null;
		this.btnEquip=null;
		this.btnSkin=null;
		this.grid1=null;
		this.grid0=null;
		this.head_select=null;
		this.ps_item0=null;
		this.ps_item0Txt=null;
		this.ps_item2=null;
		this.ps_item3=null;
		this.ps_item1=null;
		this.ps_item4=null;
		this.head_mask=null;
		this.headBox=null;
		this.up_btnbox=null;
		this.btnUP=null;
		this.ps_item0DescTxt=null;
		this.l_btn=null;
		this.r_btn=null;
		ShenmoViewUI.__super.call(this);
	}

	__class(ShenmoViewUI,'ui.mobile.shenmo.ShenmoViewUI',_super);
	var __proto=ShenmoViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.shenmo.ShenmoSkillGridUI",ShenmoSkillGridUI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenmo/ShenmoView");
	}

	return ShenmoViewUI;
})(View)


//class ui.mobile.shenqi.ShenqiSelectItemUI extends laya.ui.View
var ShenqiSelectItemUI=(function(_super){
	function ShenqiSelectItemUI(){
		this.tuijian=null;
		this.btn=null;
		this.nameTxt=null;
		ShenqiSelectItemUI.__super.call(this);
	}

	__class(ShenqiSelectItemUI,'ui.mobile.shenqi.ShenqiSelectItemUI',_super);
	var __proto=ShenqiSelectItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenqi/ShenqiSelectItem");
	}

	return ShenqiSelectItemUI;
})(View)


//class ui.mobile.shenshou.ShenshouEquipGridUI extends laya.ui.View
var ShenshouEquipGridUI=(function(_super){
	function ShenshouEquipGridUI(){
		this.box=null;
		this.icon=null;
		this.star_box=null;
		this.qhbg=null;
		this.btnOther=null;
		this.txt=null;
		ShenshouEquipGridUI.__super.call(this);
	}

	__class(ShenshouEquipGridUI,'ui.mobile.shenshou.ShenshouEquipGridUI',_super);
	var __proto=ShenshouEquipGridUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenshou/ShenshouEquipGrid");
	}

	return ShenshouEquipGridUI;
})(View)


//class ui.mobile.shenshou.ShenshouHeadUI extends laya.ui.View
var ShenshouHeadUI=(function(_super){
	function ShenshouHeadUI(){
		this.bg=null;
		this.selectImg=null;
		this.icon=null;
		this.zhan=null;
		ShenshouHeadUI.__super.call(this);
	}

	__class(ShenshouHeadUI,'ui.mobile.shenshou.ShenshouHeadUI',_super);
	var __proto=ShenshouHeadUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenshou/ShenshouHead");
	}

	return ShenshouHeadUI;
})(View)


//class ui.mobile.shenshou.ShenshouItemTipUI extends laya.ui.View
var ShenshouItemTipUI=(function(_super){
	function ShenshouItemTipUI(){
		this.bg=null;
		this.titleImg=null;
		this.nameTxt=null;
		this.attr_box=null;
		this.attr_txt=null;
		this.jipin_box=null;
		this.jipin_txt=null;
		this.titleTxt=null;
		this.desc_box=null;
		this.desc_txt=null;
		ShenshouItemTipUI.__super.call(this);
	}

	__class(ShenshouItemTipUI,'ui.mobile.shenshou.ShenshouItemTipUI',_super);
	var __proto=ShenshouItemTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenshou/ShenshouItemTip");
	}

	return ShenshouItemTipUI;
})(View)


//class ui.mobile.shenshou.ShenshouViewUI extends laya.ui.View
var ShenshouViewUI=(function(_super){
	function ShenshouViewUI(){
		this.shenshouImg=null;
		this.shenshouSoul=null;
		this.nameImg=null;
		this.zhanTxt=null;
		this.attrTxt=null;
		this.btnAdd=null;
		this.tipBox=null;
		this.r_btn=null;
		this.l_btn=null;
		this.btnTab=null;
		this.btnTabTxt=null;
		this.tabs=null;
		this.all_parts=null;
		this.part0=null;
		this.part1=null;
		this.part2=null;
		this.part3=null;
		this.part4=null;
		this.not_wear=null;
		this.l_list=null;
		this.btnQH=null;
		this.shengxiaoTxt=null;
		ShenshouViewUI.__super.call(this);
	}

	__class(ShenshouViewUI,'ui.mobile.shenshou.ShenshouViewUI',_super);
	var __proto=ShenshouViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenshou/ShenshouView");
	}

	return ShenshouViewUI;
})(View)


//class ui.mobile.shenyu.ShenYuViewUI extends laya.ui.View
var ShenYuViewUI=(function(_super){
	function ShenYuViewUI(){
		this.bg=null;
		this.effectNode=null;
		this.name_txt=null;
		this.imgMax=null;
		this.bg_now=null;
		this.now_txt=null;
		this.imgLock=null;
		this.bg_next=null;
		this.next_txt=null;
		this.btn_up=null;
		this.btn_way=null;
		this.bg_cost0=null;
		this.icon0=null;
		this.cost_txt0=null;
		this.bg_cost1=null;
		this.icon1=null;
		this.cost_txt1=null;
		this.tj_txt=null;
		ShenYuViewUI.__super.call(this);
	}

	__class(ShenYuViewUI,'ui.mobile.shenyu.ShenYuViewUI',_super);
	var __proto=ShenYuViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenyu/ShenYuView");
	}

	return ShenYuViewUI;
})(View)


//class ui.mobile.shouji.EquipShoujiItemUI extends laya.ui.View
var EquipShoujiItemUI=(function(_super){
	function EquipShoujiItemUI(){
		this.btnGet=null;
		this.btnLink=null;
		this.m_txt=null;
		this.m_icon=null;
		this.yilingqu=null;
		EquipShoujiItemUI.__super.call(this);
	}

	__class(EquipShoujiItemUI,'ui.mobile.shouji.EquipShoujiItemUI',_super);
	var __proto=EquipShoujiItemUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shouji/EquipShoujiItem");
	}

	return EquipShoujiItemUI;
})(View)


//class ui.mobile.shouji.EquipShoujiViewUI extends laya.ui.View
var EquipShoujiViewUI=(function(_super){
	function EquipShoujiViewUI(){
		this.yijihuo=null;
		this.d_btn=null;
		this.u_btn=null;
		this.btnTab=null;
		this.tipBox=null;
		this.btnUP=null;
		this.bar=null;
		this.dian1=null;
		this.dianTxt1=null;
		this.dian2=null;
		this.dianTxt2=null;
		this.dian0=null;
		this.dianTxt0=null;
		this.txt01=null;
		this.txt11=null;
		this.money1=null;
		this.txt00=null;
		this.txt10=null;
		this.money0=null;
		this.txt02=null;
		this.suitTxt=null;
		this.arrow=null;
		this.tabBox=null;
		this.tabSp=null;
		EquipShoujiViewUI.__super.call(this);
	}

	__class(EquipShoujiViewUI,'ui.mobile.shouji.EquipShoujiViewUI',_super);
	var __proto=EquipShoujiViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shouji/EquipShoujiView");
	}

	return EquipShoujiViewUI;
})(View)


//class ui.mobile.activity_xcq.hongbao.HongbaoPartyGridUI extends laya.ui.View
var HongbaoPartyGridUI=(function(_super){
	function HongbaoPartyGridUI(){
		this.yilingqu=null;
		this.numTxt=null;
		HongbaoPartyGridUI.__super.call(this);
	}

	__class(HongbaoPartyGridUI,'ui.mobile.activity_xcq.hongbao.HongbaoPartyGridUI',_super);
	var __proto=HongbaoPartyGridUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/hongbao/HongbaoPartyGrid");
	}

	return HongbaoPartyGridUI;
})(View)


//class ui.mobile.shouji.KaifuHzShopItemUI extends laya.ui.View
var KaifuHzShopItemUI=(function(_super){
	function KaifuHzShopItemUI(){
		this.yibuy=null;
		this.limitTxt=null;
		this.p_txt=null;
		this.p_icon=null;
		this.itemTxt=null;
		this.btnBuy=null;
		KaifuHzShopItemUI.__super.call(this);
	}

	__class(KaifuHzShopItemUI,'ui.mobile.shouji.KaifuHzShopItemUI',_super);
	var __proto=KaifuHzShopItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shouji/KaifuHzShopItem");
	}

	return KaifuHzShopItemUI;
})(View)


//class ui.mobile.shouji.KaifuHzShopViewUI extends laya.ui.View
var KaifuHzShopViewUI=(function(_super){
	function KaifuHzShopViewUI(){
		this.timeTxt=null;
		this.s_list=null;
		KaifuHzShopViewUI.__super.call(this);
	}

	__class(KaifuHzShopViewUI,'ui.mobile.shouji.KaifuHzShopViewUI',_super);
	var __proto=KaifuHzShopViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shouji/KaifuHzShopView");
	}

	return KaifuHzShopViewUI;
})(View)


//class ui.mobile.shouji.XuanshangHeadUI extends laya.ui.View
var XuanshangHeadUI=(function(_super){
	function XuanshangHeadUI(){
		this.bg=null;
		this.txtbg=null;
		this.txt3=null;
		this.txt1=null;
		this.txt2=null;
		this.gou=null;
		XuanshangHeadUI.__super.call(this);
	}

	__class(XuanshangHeadUI,'ui.mobile.shouji.XuanshangHeadUI',_super);
	var __proto=XuanshangHeadUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shouji/XuanshangHead");
	}

	return XuanshangHeadUI;
})(View)


//class ui.mobile.shouji.XuanshangViewUI extends laya.ui.View
var XuanshangViewUI=(function(_super){
	function XuanshangViewUI(){
		this.detailBox=null;
		this.btnGo=null;
		XuanshangViewUI.__super.call(this);
	}

	__class(XuanshangViewUI,'ui.mobile.shouji.XuanshangViewUI',_super);
	var __proto=XuanshangViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shouji/XuanshangView");
	}

	return XuanshangViewUI;
})(View)


//class ui.mobile.skill.fuzhanMiji.FuzhanMijiAttrItemUI extends laya.ui.View
var FuzhanMijiAttrItemUI=(function(_super){
	function FuzhanMijiAttrItemUI(){
		this.bg=null;
		this.gridCtn=null;
		this.nameTxt=null;
		this.descTxt=null;
		FuzhanMijiAttrItemUI.__super.call(this);
	}

	__class(FuzhanMijiAttrItemUI,'ui.mobile.skill.fuzhanMiji.FuzhanMijiAttrItemUI',_super);
	var __proto=FuzhanMijiAttrItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/skill/fuzhanMiji/FuzhanMijiAttrItem");
	}

	return FuzhanMijiAttrItemUI;
})(View)


//class ui.mobile.skill.fuzhanMiji.FuzhanMijiAttrListUI extends laya.ui.View
var FuzhanMijiAttrListUI=(function(_super){
	function FuzhanMijiAttrListUI(){
		this.attrSp=null;
		this.attrTxt=null;
		this.title=null;
		FuzhanMijiAttrListUI.__super.call(this);
	}

	__class(FuzhanMijiAttrListUI,'ui.mobile.skill.fuzhanMiji.FuzhanMijiAttrListUI',_super);
	var __proto=FuzhanMijiAttrListUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/skill/fuzhanMiji/FuzhanMijiAttrList");
	}

	return FuzhanMijiAttrListUI;
})(View)


//class ui.mobile.skill.fuzhanMiji.FuzhanMijIGridUI extends laya.ui.View
var FuzhanMijIGridUI=(function(_super){
	function FuzhanMijIGridUI(){
		this.iocnBg=null;
		this.gridCtn=null;
		this.getted=null;
		this.nameTxt=null;
		this.gou=null;
		FuzhanMijIGridUI.__super.call(this);
	}

	__class(FuzhanMijIGridUI,'ui.mobile.skill.fuzhanMiji.FuzhanMijIGridUI',_super);
	var __proto=FuzhanMijIGridUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/skill/fuzhanMiji/FuzhanMijIGrid");
	}

	return FuzhanMijIGridUI;
})(View)


//class ui.mobile.skill.fuzhanMiji.FuzhanMijiViewUI extends laya.ui.View
var FuzhanMijiViewUI=(function(_super){
	function FuzhanMijiViewUI(){
		this.bg0=null;
		this.bg1=null;
		this.helpBox=null;
		this.btnAttr=null;
		this.btnZl=null;
		this.btnZh=null;
		this.tipsBox=null;
		this.tipTxt=null;
		this.xqSp=null;
		this.list=null;
		this.nameTxt=null;
		this.descTxt=null;
		this.btnXq=null;
		this.xqImg=null;
		this.restSp=null;
		this.curGrid=null;
		this.nextGrid=null;
		this.curNameTxt=null;
		this.nextNameTxt=null;
		this.curDestTxt=null;
		this.nextDescTxt=null;
		this.btnRest=null;
		this.btnOk=null;
		this.selectImg=null;
		this.g_select=null;
		FuzhanMijiViewUI.__super.call(this);
	}

	__class(FuzhanMijiViewUI,'ui.mobile.skill.fuzhanMiji.FuzhanMijiViewUI',_super);
	var __proto=FuzhanMijiViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/skill/fuzhanMiji/FuzhanMijiView");
	}

	return FuzhanMijiViewUI;
})(View)


//class ui.mobile.skill.fuzhanMiji.FuzhanMijiZonglanItemUI extends laya.ui.View
var FuzhanMijiZonglanItemUI=(function(_super){
	function FuzhanMijiZonglanItemUI(){
		this.bg=null;
		this.nameImg=null;
		FuzhanMijiZonglanItemUI.__super.call(this);
	}

	__class(FuzhanMijiZonglanItemUI,'ui.mobile.skill.fuzhanMiji.FuzhanMijiZonglanItemUI',_super);
	var __proto=FuzhanMijiZonglanItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/skill/fuzhanMiji/FuzhanMijiZonglanItem");
	}

	return FuzhanMijiZonglanItemUI;
})(View)


//class ui.mobile.skill.item.SkillMenuUI extends laya.ui.View
var SkillMenuUI=(function(_super){
	function SkillMenuUI(){
		this.bg=null;
		SkillMenuUI.__super.call(this);
	}

	__class(SkillMenuUI,'ui.mobile.skill.item.SkillMenuUI',_super);
	var __proto=SkillMenuUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/skill/item/SkillMenu");
	}

	return SkillMenuUI;
})(View)


//class ui.mobile.skill.SkillItemUI extends laya.ui.View
var SkillItemUI=(function(_super){
	function SkillItemUI(){
		this.container=null;
		this.bg=null;
		this.lv_txt=null;
		this.pro_txt=null;
		this.box=null;
		this.turn_box=null;
		this.turn_txt=null;
		this.turn_btn=null;
		this.name_txt=null;
		SkillItemUI.__super.call(this);
	}

	__class(SkillItemUI,'ui.mobile.skill.SkillItemUI',_super);
	var __proto=SkillItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/skill/SkillItem");
	}

	return SkillItemUI;
})(View)


//class ui.mobile.skill.SkillMijiHechengViewUI extends laya.ui.View
var SkillMijiHechengViewUI=(function(_super){
	function SkillMijiHechengViewUI(){
		this.img1=null;
		this.img2=null;
		this.pro1=null;
		this.pro0=null;
		this.pro2=null;
		this.grid0=null;
		this.grid1=null;
		this.grid2=null;
		this.btn=null;
		this.ck1=null;
		this.ck2=null;
		this.name_txt=null;
		SkillMijiHechengViewUI.__super.call(this);
	}

	__class(SkillMijiHechengViewUI,'ui.mobile.skill.SkillMijiHechengViewUI',_super);
	var __proto=SkillMijiHechengViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/skill/SkillMijiHechengView");
	}

	return SkillMijiHechengViewUI;
})(View)


//class ui.mobile.skill.SkillMijiItemUI extends laya.ui.View
var SkillMijiItemUI=(function(_super){
	function SkillMijiItemUI(){
		this.name_txt=null;
		SkillMijiItemUI.__super.call(this);
	}

	__class(SkillMijiItemUI,'ui.mobile.skill.SkillMijiItemUI',_super);
	var __proto=SkillMijiItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/skill/SkillMijiItem");
	}

	return SkillMijiItemUI;
})(View)


//class ui.mobile.skill.SkillMijiViewUI extends laya.ui.View
var SkillMijiViewUI=(function(_super){
	function SkillMijiViewUI(){
		this.attr_txt=null;
		this.name_txt=null;
		this.desc_txt=null;
		this.btn=null;
		this.get_btn=null;
		this.select_img=null;
		SkillMijiViewUI.__super.call(this);
	}

	__class(SkillMijiViewUI,'ui.mobile.skill.SkillMijiViewUI',_super);
	var __proto=SkillMijiViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/skill/SkillMijiView");
	}

	return SkillMijiViewUI;
})(View)


//class ui.mobile.skill.SkillPanelGridUI extends laya.ui.View
var SkillPanelGridUI=(function(_super){
	function SkillPanelGridUI(){
		this.bg=null;
		this.box=null;
		this.lv_txt=null;
		SkillPanelGridUI.__super.call(this);
	}

	__class(SkillPanelGridUI,'ui.mobile.skill.SkillPanelGridUI',_super);
	var __proto=SkillPanelGridUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/skill/SkillPanelGrid");
	}

	return SkillPanelGridUI;
})(View)


//class ui.mobile.skill.SkillSetViewUI extends laya.ui.View
var SkillSetViewUI=(function(_super){
	function SkillSetViewUI(){
		this.select_img=null;
		this.select_img2=null;
		this.btn=null;
		this.name_txt0=null;
		this.name_txt1=null;
		this.name_txt2=null;
		SkillSetViewUI.__super.call(this);
	}

	__class(SkillSetViewUI,'ui.mobile.skill.SkillSetViewUI',_super);
	var __proto=SkillSetViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/skill/SkillSetView");
	}

	return SkillSetViewUI;
})(View)


//class ui.mobile.skill.SkillShenjiItemUI extends laya.ui.View
var SkillShenjiItemUI=(function(_super){
	function SkillShenjiItemUI(){
		this.nameTxt=null;
		this.lvTxt=null;
		this.stateTxt=null;
		this.icon=null;
		this.turn_box=null;
		this.turn_txt=null;
		this.turn_btn=null;
		SkillShenjiItemUI.__super.call(this);
	}

	__class(SkillShenjiItemUI,'ui.mobile.skill.SkillShenjiItemUI',_super);
	var __proto=SkillShenjiItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/skill/SkillShenjiItem");
	}

	return SkillShenjiItemUI;
})(View)


//class ui.mobile.skill.SkillShenjiViewUI extends laya.ui.View
var SkillShenjiViewUI=(function(_super){
	function SkillShenjiViewUI(){
		this.l_list=null;
		this.btnUP=null;
		this.l_txt=null;
		this.l_title=null;
		this.l_cdTxt=null;
		this.r_txt=null;
		this.r_title=null;
		this.r_cdTxt=null;
		this.skillTxt=null;
		this.yimanji=null;
		this.icon=null;
		this.btnLink=null;
		SkillShenjiViewUI.__super.call(this);
	}

	__class(SkillShenjiViewUI,'ui.mobile.skill.SkillShenjiViewUI',_super);
	var __proto=SkillShenjiViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/skill/SkillShenjiView");
	}

	return SkillShenjiViewUI;
})(View)


//class ui.mobile.skill.SkillViewUI extends laya.ui.View
var SkillViewUI=(function(_super){
	function SkillViewUI(){
		this.list=null;
		this.grid=null;
		this.box=null;
		this.name_txt=null;
		this.cd_txt=null;
		this.lv_txt=null;
		this.desc_txt=null;
		this.up_btn=null;
		this.select_img=null;
		this.full_img=null;
		this.attrNode=null;
		this.zhuanshuNode=null;
		this.zhuanshu_txt=null;
		this.juexingNode=null;
		this.juexing_txt=null;
		SkillViewUI.__super.call(this);
	}

	__class(SkillViewUI,'ui.mobile.skill.SkillViewUI',_super);
	var __proto=SkillViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/skill/SkillView");
	}

	return SkillViewUI;
})(View)


//class ui.mobile.tanbao.cangbaotu.CangbaotuGridUI extends laya.ui.View
var CangbaotuGridUI=(function(_super){
	function CangbaotuGridUI(){
		this.gridCtn=null;
		this.yihuode=null;
		CangbaotuGridUI.__super.call(this);
	}

	__class(CangbaotuGridUI,'ui.mobile.tanbao.cangbaotu.CangbaotuGridUI',_super);
	var __proto=CangbaotuGridUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tanbao/cangbaotu/CangbaotuGrid");
	}

	return CangbaotuGridUI;
})(View)


//class ui.mobile.tanbao.cangbaotu.CangbaotuTrackUI extends laya.ui.View
var CangbaotuTrackUI=(function(_super){
	function CangbaotuTrackUI(){
		this.bg=null;
		this.pro_bg=null;
		this.pro_img=null;
		this.playing_img=null;
		this.btn=null;
		this.map_txt=null;
		this.numTxt=null;
		this.closeBtn=null;
		CangbaotuTrackUI.__super.call(this);
	}

	__class(CangbaotuTrackUI,'ui.mobile.tanbao.cangbaotu.CangbaotuTrackUI',_super);
	var __proto=CangbaotuTrackUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tanbao/cangbaotu/CangbaotuTrack");
	}

	return CangbaotuTrackUI;
})(View)


//class ui.mobile.tanbao.TanbaoBuyPanelUI extends laya.ui.View
var TanbaoBuyPanelUI=(function(_super){
	function TanbaoBuyPanelUI(){
		this.window=null;
		this.txt1=null;
		this.money_txt=null;
		this.ok_btn=null;
		this.cancel_btn=null;
		this.descTxt=null;
		TanbaoBuyPanelUI.__super.call(this);
	}

	__class(TanbaoBuyPanelUI,'ui.mobile.tanbao.TanbaoBuyPanelUI',_super);
	var __proto=TanbaoBuyPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tanbao/TanbaoBuyPanel");
	}

	return TanbaoBuyPanelUI;
})(View)


//class ui.mobile.tanbao.TanbaoJifenItemUI extends laya.ui.View
var TanbaoJifenItemUI=(function(_super){
	function TanbaoJifenItemUI(){
		this.bg=null;
		this.itemTxt=null;
		this.icon=null;
		this.yibuy=null;
		this.limitTxt=null;
		this.btn=null;
		TanbaoJifenItemUI.__super.call(this);
	}

	__class(TanbaoJifenItemUI,'ui.mobile.tanbao.TanbaoJifenItemUI',_super);
	var __proto=TanbaoJifenItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tanbao/TanbaoJifenItem");
	}

	return TanbaoJifenItemUI;
})(View)


//class ui.mobile.tanbao.TanbaoJifenViewUI extends laya.ui.View
var TanbaoJifenViewUI=(function(_super){
	function TanbaoJifenViewUI(){
		this.desc_txt=null;
		this.getLink=null;
		this.panel=null;
		this.tabs=null;
		this.logBox=null;
		this.logTxt1=null;
		this.logTxt2=null;
		TanbaoJifenViewUI.__super.call(this);
	}

	__class(TanbaoJifenViewUI,'ui.mobile.tanbao.TanbaoJifenViewUI',_super);
	var __proto=TanbaoJifenViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tanbao/TanbaoJifenView");
	}

	return TanbaoJifenViewUI;
})(View)


//class ui.mobile.tanbao.TanbaoRuleTipUI extends laya.ui.View
var TanbaoRuleTipUI=(function(_super){
	function TanbaoRuleTipUI(){
		this.bg=null;
		this.line=null;
		this.txt1=null;
		this.txt2=null;
		TanbaoRuleTipUI.__super.call(this);
	}

	__class(TanbaoRuleTipUI,'ui.mobile.tanbao.TanbaoRuleTipUI',_super);
	var __proto=TanbaoRuleTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tanbao/TanbaoRuleTip");
	}

	return TanbaoRuleTipUI;
})(View)


//class ui.mobile.tanbao.TanbaoView2UI extends laya.ui.View
var TanbaoView2UI=(function(_super){
	function TanbaoView2UI(){
		this.rule_box=null;
		this.count_txt=null;
		this.lingpai_txt=null;
		this.jifen_txt=null;
		this.free_txt=null;
		this.txt1=null;
		this.icon1=null;
		this.txt10=null;
		this.icon10=null;
		this.txt50=null;
		this.icon50=null;
		this.logTxt=null;
		this.desc_txt1=null;
		this.btnAuto=null;
		this.desc_txt2=null;
		this.depot_btn=null;
		this.grid0=null;
		this.grid1=null;
		this.grid2=null;
		this.grid3=null;
		this.grid4=null;
		this.grid5=null;
		this.grid7=null;
		this.grid8=null;
		this.grid6=null;
		this.grid10=null;
		this.grid11=null;
		this.grid9=null;
		this.grid12=null;
		this.grid15=null;
		this.grid14=null;
		this.grid13=null;
		this.btn1=null;
		this.btn10=null;
		this.btn50=null;
		this.gailv_btn=null;
		this.luck_box=null;
		this.lucky_img=null;
		this.luckBar=null;
		this.lucky_txt=null;
		TanbaoView2UI.__super.call(this);
	}

	__class(TanbaoView2UI,'ui.mobile.tanbao.TanbaoView2UI',_super);
	var __proto=TanbaoView2UI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tanbao/TanbaoView2");
	}

	return TanbaoView2UI;
})(View)


//class ui.mobile.taskLimit.TaskLimitIconUI extends laya.ui.View
var TaskLimitIconUI=(function(_super){
	function TaskLimitIconUI(){
		this.bg1=null;
		this.imgDes=null;
		this.imgBar=null;
		this.time_txt=null;
		TaskLimitIconUI.__super.call(this);
	}

	__class(TaskLimitIconUI,'ui.mobile.taskLimit.TaskLimitIconUI',_super);
	var __proto=TaskLimitIconUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/taskLimit/TaskLimitIcon");
	}

	return TaskLimitIconUI;
})(View)


//class ui.mobile.taskLimit.TaskLimitItemUI extends laya.ui.View
var TaskLimitItemUI=(function(_super){
	function TaskLimitItemUI(){
		this.bg=null;
		this.imgOK=null;
		this.btn=null;
		this.taskName_txt=null;
		this.taskDes_txt=null;
		TaskLimitItemUI.__super.call(this);
	}

	__class(TaskLimitItemUI,'ui.mobile.taskLimit.TaskLimitItemUI',_super);
	var __proto=TaskLimitItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/taskLimit/TaskLimitItem");
	}

	return TaskLimitItemUI;
})(View)


//class ui.mobile.team.PlayerItemUI extends laya.ui.View
var PlayerItemUI=(function(_super){
	function PlayerItemUI(){
		this.levelTxt=null;
		this.infoTxt=null;
		this.headbg=null;
		this.jobIcon=null;
		this.btnYQ=null;
		this.head=null;
		PlayerItemUI.__super.call(this);
	}

	__class(PlayerItemUI,'ui.mobile.team.PlayerItemUI',_super);
	var __proto=PlayerItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/team/PlayerItem");
	}

	return PlayerItemUI;
})(View)


//class ui.mobile.team.TeamListItemUI extends laya.ui.View
var TeamListItemUI=(function(_super){
	function TeamListItemUI(){
		this.headbg=null;
		this.head=null;
		this.btn=null;
		this.numTxt=null;
		TeamListItemUI.__super.call(this);
	}

	__class(TeamListItemUI,'ui.mobile.team.TeamListItemUI',_super);
	var __proto=TeamListItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/team/TeamListItem");
	}

	return TeamListItemUI;
})(View)


//class ui.mobile.team.TeamPanelUI extends laya.ui.View
var TeamPanelUI=(function(_super){
	function TeamPanelUI(){
		this.bg=null;
		this.tabs=null;
		this.title=null;
		TeamPanelUI.__super.call(this);
	}

	__class(TeamPanelUI,'ui.mobile.team.TeamPanelUI',_super);
	var __proto=TeamPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/team/TeamPanel");
	}

	return TeamPanelUI;
})(View)


//class ui.mobile.team.TeamMyViewUI extends laya.ui.View
var TeamMyViewUI=(function(_super){
	function TeamMyViewUI(){
		this.count_txt=null;
		this.l_select=null;
		this.r_btn=null;
		this.l_btn=null;
		this.btnCK=null;
		this.captain=null;
		this.t_panel=null;
		TeamMyViewUI.__super.call(this);
	}

	__class(TeamMyViewUI,'ui.mobile.team.TeamMyViewUI',_super);
	var __proto=TeamMyViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/team/TeamMyView");
	}

	return TeamMyViewUI;
})(View)


//class ui.mobile.tejie.TejieEquipTipUI extends laya.ui.View
var TejieEquipTipUI=(function(_super){
	function TejieEquipTipUI(){
		this.equip_attr_txt=null;
		this.equip_skill_txt=null;
		this.suit_txt=null;
		this.suit_attr_txt=null;
		this.suit_part1=null;
		this.suit_part2=null;
		TejieEquipTipUI.__super.call(this);
	}

	__class(TejieEquipTipUI,'ui.mobile.tejie.TejieEquipTipUI',_super);
	var __proto=TejieEquipTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tejie/TejieEquipTip");
	}

	return TejieEquipTipUI;
})(View)


//class ui.mobile.tiyan.TiyanOutPanelUI extends laya.ui.View
var TiyanOutPanelUI=(function(_super){
	function TiyanOutPanelUI(){
		this.bg=null;
		this.desc_img=null;
		this.btn=null;
		TiyanOutPanelUI.__super.call(this);
	}

	__class(TiyanOutPanelUI,'ui.mobile.tiyan.TiyanOutPanelUI',_super);
	var __proto=TiyanOutPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tiyan/TiyanOutPanel");
	}

	return TiyanOutPanelUI;
})(View)


//class ui.mobile.track.boss.BossTrackUI extends laya.ui.View
var BossTrackUI=(function(_super){
	function BossTrackUI(){
		this.bg=null;
		this.p_panel=null;
		this.descTxt=null;
		this.l_select=null;
		this.btnAdd=null;
		this.fontImg=null;
		this.btnZK=null;
		this.zkImg=null;
		this.txtZK=null;
		this.btnTeam=null;
		this.btnHide=null;
		this.btnExit=null;
		BossTrackUI.__super.call(this);
	}

	__class(BossTrackUI,'ui.mobile.track.boss.BossTrackUI',_super);
	var __proto=BossTrackUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/track/boss/BossTrack");
	}

	return BossTrackUI;
})(View)


//class ui.mobile.track.boss.BossTrackItemUI extends laya.ui.View
var BossTrackItemUI=(function(_super){
	function BossTrackItemUI(){
		this.icon=null;
		this.iconTxt=null;
		this.nameTxt=null;
		this.timeTxt=null;
		this.line=null;
		BossTrackItemUI.__super.call(this);
	}

	__class(BossTrackItemUI,'ui.mobile.track.boss.BossTrackItemUI',_super);
	var __proto=BossTrackItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/track/boss/BossTrackItem");
	}

	return BossTrackItemUI;
})(View)


//class ui.mobile.track.boss.YewaiTrackUI extends laya.ui.View
var YewaiTrackUI=(function(_super){
	function YewaiTrackUI(){
		this.bg=null;
		this.vipTxt=null;
		this.timeTxt=null;
		this.btnAdd=null;
		this.btnExit=null;
		this.titleBox=null;
		this.title=null;
		this.btnLink=null;
		this.btnHide=null;
		YewaiTrackUI.__super.call(this);
	}

	__class(YewaiTrackUI,'ui.mobile.track.boss.YewaiTrackUI',_super);
	var __proto=YewaiTrackUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/track/boss/YewaiTrack");
	}

	return YewaiTrackUI;
})(View)


//class ui.mobile.main.FirstIntoGamePanelUI extends laya.ui.View
var FirstIntoGamePanelUI=(function(_super){
	function FirstIntoGamePanelUI(){
		this.bg=null;
		this.desc_img=null;
		this.time_txt=null;
		FirstIntoGamePanelUI.__super.call(this);
	}

	__class(FirstIntoGamePanelUI,'ui.mobile.main.FirstIntoGamePanelUI',_super);
	var __proto=FirstIntoGamePanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/FirstIntoGamePanel");
	}

	return FirstIntoGamePanelUI;
})(View)


//class ui.mobile.track.KuafuTuchengTrackUI extends laya.ui.View
var KuafuTuchengTrackUI=(function(_super){
	function KuafuTuchengTrackUI(){
		this.bg=null;
		this.titleBox=null;
		this.title=null;
		this.l_list=null;
		this.btnHide=null;
		this.btnExit=null;
		KuafuTuchengTrackUI.__super.call(this);
	}

	__class(KuafuTuchengTrackUI,'ui.mobile.track.KuafuTuchengTrackUI',_super);
	var __proto=KuafuTuchengTrackUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/track/KuafuTuchengTrack");
	}

	return KuafuTuchengTrackUI;
})(View)


//class ui.mobile.track.RoleInfoTrackUI extends laya.ui.View
var RoleInfoTrackUI=(function(_super){
	function RoleInfoTrackUI(){
		this.bg=null;
		this.font0=null;
		this.font1=null;
		this.font2=null;
		this.font3=null;
		this.font4=null;
		this.font5=null;
		this.title=null;
		this.txt0=null;
		this.txt1=null;
		this.txt2=null;
		this.txt3=null;
		this.txt4=null;
		this.txt5=null;
		this.btnHide=null;
		RoleInfoTrackUI.__super.call(this);
	}

	__class(RoleInfoTrackUI,'ui.mobile.track.RoleInfoTrackUI',_super);
	var __proto=RoleInfoTrackUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/track/RoleInfoTrack");
	}

	return RoleInfoTrackUI;
})(View)


//class ui.mobile.track.task.TaskItemUI extends laya.ui.View
var TaskItemUI=(function(_super){
	function TaskItemUI(){
		this.title=null;
		this.barTxt=null;
		this.conTxt=null;
		this.typeTxt=null;
		this.nameTxt=null;
		this.state_txt=null;
		this.btnFly=null;
		TaskItemUI.__super.call(this);
	}

	__class(TaskItemUI,'ui.mobile.track.task.TaskItemUI',_super);
	var __proto=TaskItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/track/task/TaskItem");
	}

	return TaskItemUI;
})(View)


//class ui.mobile.track.task.TrackTaskUI extends laya.ui.View
var TrackTaskUI=(function(_super){
	function TrackTaskUI(){
		this.bg=null;
		this.fj_box=null;
		this.fj_panel=null;
		this.fj_select=null;
		this.p_team=null;
		this.p_task=null;
		this.btnHide=null;
		this.l_tabs1=null;
		this.l_tabs2=null;
		this.btnSwitch=null;
		TrackTaskUI.__super.call(this);
	}

	__class(TrackTaskUI,'ui.mobile.track.task.TrackTaskUI',_super);
	var __proto=TrackTaskUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/track/task/TrackTask");
	}

	return TrackTaskUI;
})(View)


//class ui.mobile.tiangong.TiangongEquipTipUI extends laya.ui.View
var TiangongEquipTipUI=(function(_super){
	function TiangongEquipTipUI(){
		this.bg=null;
		this.grid=null;
		this.name_txt=null;
		this.bind_txt=null;
		this.type_txt=null;
		this.job_txt=null;
		this.lv_txt=null;
		this.attr_box=null;
		this.attr_txt=null;
		this.attrZS_box=null;
		this.attrZS_txt=null;
		this.suit_box=null;
		this.suit_txt=null;
		this.from_txt=null;
		this.r_bg=null;
		this.equiped=null;
		TiangongEquipTipUI.__super.call(this);
	}

	__class(TiangongEquipTipUI,'ui.mobile.tiangong.TiangongEquipTipUI',_super);
	var __proto=TiangongEquipTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tiangong/TiangongEquipTip");
	}

	return TiangongEquipTipUI;
})(View)


//class ui.mobile.tiangong.TiangongPanelUI extends laya.ui.View
var TiangongPanelUI=(function(_super){
	function TiangongPanelUI(){
		this.bg=null;
		this.skillTxt0=null;
		this.skillTxt1=null;
		this.l_btn=null;
		this.r_btn=null;
		this.skillBox=null;
		this.openBox=null;
		this.openTxt=null;
		this.btnHH=null;
		this.tabs=null;
		this.grid0=null;
		this.g_select=null;
		this.g_nameTxt0=null;
		this.grid1=null;
		this.g_nameTxt1=null;
		this.grid2=null;
		this.g_nameTxt2=null;
		this.noimg=null;
		this.r_title=null;
		this.tipTxt=null;
		this.r_txt21=null;
		this.r_txt1=null;
		this.r_txt22=null;
		this.upBox=null;
		this.btnUP=null;
		this.needTxt=null;
		this.yimanjie=null;
		this.notxt=null;
		TiangongPanelUI.__super.call(this);
	}

	__class(TiangongPanelUI,'ui.mobile.tiangong.TiangongPanelUI',_super);
	var __proto=TiangongPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tiangong/TiangongPanel");
	}

	return TiangongPanelUI;
})(View)


//class ui.mobile.tiangong.TiangongTipUI extends laya.ui.View
var TiangongTipUI=(function(_super){
	function TiangongTipUI(){
		this.bg=null;
		this.fightTxt=null;
		this.attrTxt1=null;
		this.attrTxt2=null;
		this.attrTxt3=null;
		TiangongTipUI.__super.call(this);
	}

	__class(TiangongTipUI,'ui.mobile.tiangong.TiangongTipUI',_super);
	var __proto=TiangongTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tiangong/TiangongTip");
	}

	return TiangongTipUI;
})(View)


//class ui.mobile.treasure.TreasureChipItemUI extends laya.ui.View
var TreasureChipItemUI=(function(_super){
	function TreasureChipItemUI(){
		this.name_txt=null;
		TreasureChipItemUI.__super.call(this);
	}

	__class(TreasureChipItemUI,'ui.mobile.treasure.TreasureChipItemUI',_super);
	var __proto=TreasureChipItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/treasure/TreasureChipItem");
	}

	return TreasureChipItemUI;
})(View)


//class ui.mobile.treasure.TreasureTabUI extends laya.ui.View
var TreasureTabUI=(function(_super){
	function TreasureTabUI(){
		this.bg=null;
		this.icon=null;
		this.state_txt=null;
		this.name_txt=null;
		TreasureTabUI.__super.call(this);
	}

	__class(TreasureTabUI,'ui.mobile.treasure.TreasureTabUI',_super);
	var __proto=TreasureTabUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/treasure/TreasureTab");
	}

	return TreasureTabUI;
})(View)


//class ui.mobile.treasure.TreasureViewUI extends laya.ui.View
var TreasureViewUI=(function(_super){
	function TreasureViewUI(){
		this.bg=null;
		this.list_tab=null;
		this.imgName=null;
		this.imgPrivate=null;
		this.btn_left=null;
		this.btn_right=null;
		this.imgTitle=null;
		this.avatarNode=null;
		this.imgAvatar=null;
		this.imgChip1=null;
		this.imgChip2=null;
		this.imgChip3=null;
		this.imgChip4=null;
		this.imgBall1=null;
		this.imgBall2=null;
		this.imgBall3=null;
		this.imgBall4=null;
		this.barNode=null;
		this.imgBar=null;
		this.bar_txt=null;
		this.chipNode=null;
		this.list_clip=null;
		this.activeNode=null;
		this.need_txt=null;
		this.free_txt=null;
		this.btn_active=null;
		this.activityNode=null;
		this.bg_act=null;
		this.time_txt=null;
		this.gridNode=null;
		this.imgGot=null;
		this.popNode=null;
		this.pop_txt=null;
		this.imgActive=null;
		this.btnGet=null;
		TreasureViewUI.__super.call(this);
	}

	__class(TreasureViewUI,'ui.mobile.treasure.TreasureViewUI',_super);
	var __proto=TreasureViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/treasure/TreasureView");
	}

	return TreasureViewUI;
})(View)


//class ui.mobile.vip.xin.VipChongzhiItemUI extends laya.ui.View
var VipChongzhiItemUI=(function(_super){
	function VipChongzhiItemUI(){
		this.bg=null;
		this.shouchi=null;
		this.titleIcon=null;
		this.title=null;
		this.priceTxt=null;
		this.desc_txt=null;
		this.txt=null;
		this.icon=null;
		this.yueka=null;
		this.beilv=null;
		this.song=null;
		this.limitTxt=null;
		VipChongzhiItemUI.__super.call(this);
	}

	__class(VipChongzhiItemUI,'ui.mobile.vip.xin.VipChongzhiItemUI',_super);
	var __proto=VipChongzhiItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/vip/xin/VipChongzhiItem");
	}

	return VipChongzhiItemUI;
})(View)


//class ui.mobile.vip.xin.VipChongzhiViewUI extends laya.ui.View
var VipChongzhiViewUI=(function(_super){
	function VipChongzhiViewUI(){
		this.bg=null;
		this.p_list=null;
		this.qqtxt=null;
		VipChongzhiViewUI.__super.call(this);
	}

	__class(VipChongzhiViewUI,'ui.mobile.vip.xin.VipChongzhiViewUI',_super);
	var __proto=VipChongzhiViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/vip/xin/VipChongzhiView");
	}

	return VipChongzhiViewUI;
})(View)


//class ui.mobile.vip.xin.VipLevelViewUI extends laya.ui.View
var VipLevelViewUI=(function(_super){
	function VipLevelViewUI(){
		this.banner=null;
		this.bg=null;
		this.descPanel=null;
		this.tabsPanel=null;
		this.btnBuy=null;
		this.btnFree=null;
		this.yilingqu2=null;
		this.yilingqu1=null;
		this.p_txt=null;
		this.p_icon=null;
		this.limitTxt=null;
		VipLevelViewUI.__super.call(this);
	}

	__class(VipLevelViewUI,'ui.mobile.vip.xin.VipLevelViewUI',_super);
	var __proto=VipLevelViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/vip/xin/VipLevelView");
	}

	return VipLevelViewUI;
})(View)


//class ui.mobile.vip.xin.YuekaViewUI extends laya.ui.View
var YuekaViewUI=(function(_super){
	function YuekaViewUI(){
		this.btnBuy2=null;
		this.btnBuy1=null;
		this.yilingqu0=null;
		this.yilingqu1=null;
		this.yilingqu2=null;
		this.yilingqu3=null;
		this.timeTxt1=null;
		this.timeTxt2=null;
		this.cishuTxt1=null;
		this.cishuTxt3=null;
		this.btnLink=null;
		this.tipTxt=null;
		this.vip1=null;
		this.vip2=null;
		YuekaViewUI.__super.call(this);
	}

	__class(YuekaViewUI,'ui.mobile.vip.xin.YuekaViewUI',_super);
	var __proto=YuekaViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/vip/xin/YuekaView");
	}

	return YuekaViewUI;
})(View)


//class ui.mobile.dailyActivitys.HuangchengTrackUI extends laya.ui.View
var HuangchengTrackUI=(function(_super){
	function HuangchengTrackUI(){
		this.bg=null;
		this.timebg=null;
		this.titleBox=null;
		this.title=null;
		this.tipBox=null;
		this.guildTxt=null;
		this.timeTxt=null;
		this.btnGo=null;
		this.fenshuTxt=null;
		this.yilingqu=null;
		this.btnHide=null;
		this.btnYulan=null;
		this.gc_box=null;
		this.gc_txt1=null;
		this.gc_txt2=null;
		this.btnExit=null;
		HuangchengTrackUI.__super.call(this);
	}

	__class(HuangchengTrackUI,'ui.mobile.dailyActivitys.HuangchengTrackUI',_super);
	var __proto=HuangchengTrackUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/dailyActivitys/HuangchengTrack");
	}

	return HuangchengTrackUI;
})(View)


//class ui.mobile.Window1UI extends laya.ui.View
var Window1UI=(function(_super){
	function Window1UI(){
		this.bg=null;
		this.closeBtn=null;
		this.closeBtn2=null;
		Window1UI.__super.call(this);
	}

	__class(Window1UI,'ui.mobile.Window1UI',_super);
	var __proto=Window1UI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/Window1");
	}

	return Window1UI;
})(View)


//class ui.mobile.Window11UI extends laya.ui.View
var Window11UI=(function(_super){
	function Window11UI(){
		this.bg_window=null;
		this.bg_view=null;
		this.viewContainer=null;
		this.imgTitle=null;
		this.closeBtn=null;
		this.closeBtn2=null;
		Window11UI.__super.call(this);
	}

	__class(Window11UI,'ui.mobile.Window11UI',_super);
	var __proto=Window11UI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/Window11");
	}

	return Window11UI;
})(View)


//class ui.mobile.wulingdahui.item.WulingdahuiRankItemUI extends laya.ui.View
var WulingdahuiRankItemUI=(function(_super){
	function WulingdahuiRankItemUI(){
		this.bg=null;
		this.imgTop=null;
		this.name_txt=null;
		this.guild_txt=null;
		this.num_txt=null;
		this.no_txt=null;
		WulingdahuiRankItemUI.__super.call(this);
	}

	__class(WulingdahuiRankItemUI,'ui.mobile.wulingdahui.item.WulingdahuiRankItemUI',_super);
	var __proto=WulingdahuiRankItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/item/WulingdahuiRankItem");
	}

	return WulingdahuiRankItemUI;
})(View)


//class ui.mobile.wulingdahui.item.WulingRewardsItemUI extends laya.ui.View
var WulingRewardsItemUI=(function(_super){
	function WulingRewardsItemUI(){
		this.bg=null;
		this.rankImg=null;
		this.txt=null;
		WulingRewardsItemUI.__super.call(this);
	}

	__class(WulingRewardsItemUI,'ui.mobile.wulingdahui.item.WulingRewardsItemUI',_super);
	var __proto=WulingRewardsItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/item/WulingRewardsItem");
	}

	return WulingRewardsItemUI;
})(View)


//class ui.mobile.wulingdahui.item.WulingShopItemUI extends laya.ui.View
var WulingShopItemUI=(function(_super){
	function WulingShopItemUI(){
		this.bg=null;
		this.gridCtn=null;
		this.m_icon=null;
		this.nameTxt=null;
		this.priceTxt=null;
		this.btn=null;
		WulingShopItemUI.__super.call(this);
	}

	__class(WulingShopItemUI,'ui.mobile.wulingdahui.item.WulingShopItemUI',_super);
	var __proto=WulingShopItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/item/WulingShopItem");
	}

	return WulingShopItemUI;
})(View)


//class ui.mobile.wulingdahui.item.WulingTimeItemUI extends laya.ui.View
var WulingTimeItemUI=(function(_super){
	function WulingTimeItemUI(){
		this.groupTxt=null;
		this.timeTxt=null;
		WulingTimeItemUI.__super.call(this);
	}

	__class(WulingTimeItemUI,'ui.mobile.wulingdahui.item.WulingTimeItemUI',_super);
	var __proto=WulingTimeItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/item/WulingTimeItem");
	}

	return WulingTimeItemUI;
})(View)


//class ui.mobile.wulingdahui.item.WulingZhanbaoItemUI extends laya.ui.View
var WulingZhanbaoItemUI=(function(_super){
	function WulingZhanbaoItemUI(){
		this.txt0=null;
		this.txt1=null;
		WulingZhanbaoItemUI.__super.call(this);
	}

	__class(WulingZhanbaoItemUI,'ui.mobile.wulingdahui.item.WulingZhanbaoItemUI',_super);
	var __proto=WulingZhanbaoItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/item/WulingZhanbaoItem");
	}

	return WulingZhanbaoItemUI;
})(View)


//class ui.mobile.wulingdahui.item.WulingZhanjiItemUI extends laya.ui.View
var WulingZhanjiItemUI=(function(_super){
	function WulingZhanjiItemUI(){
		this.txt0=null;
		this.nameTxt=null;
		this.stateTxt=null;
		WulingZhanjiItemUI.__super.call(this);
	}

	__class(WulingZhanjiItemUI,'ui.mobile.wulingdahui.item.WulingZhanjiItemUI',_super);
	var __proto=WulingZhanjiItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/item/WulingZhanjiItem");
	}

	return WulingZhanjiItemUI;
})(View)


//class ui.mobile.wulingdahui.item.WulingZhichiItemUI extends laya.ui.View
var WulingZhichiItemUI=(function(_super){
	function WulingZhichiItemUI(){
		this.txt0=null;
		this.txt1=null;
		WulingZhichiItemUI.__super.call(this);
	}

	__class(WulingZhichiItemUI,'ui.mobile.wulingdahui.item.WulingZhichiItemUI',_super);
	var __proto=WulingZhichiItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/item/WulingZhichiItem");
	}

	return WulingZhichiItemUI;
})(View)


//class ui.mobile.wulingdahui.panel.WulingSidePanelUI extends laya.ui.View
var WulingSidePanelUI=(function(_super){
	function WulingSidePanelUI(){
		this.bg=null;
		this.nameImg=null;
		this.moneyUrl=null;
		this.sideImg=null;
		this.boxImg=null;
		this.levelTxt0=null;
		this.levelTxt1=null;
		this.moneyDesc=null;
		this.valueTxt=null;
		this.timeShow=null;
		this.timeTxt0=null;
		this.timeTxt1=null;
		this.btnHide=null;
		WulingSidePanelUI.__super.call(this);
	}

	__class(WulingSidePanelUI,'ui.mobile.wulingdahui.panel.WulingSidePanelUI',_super);
	var __proto=WulingSidePanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/panel/WulingSidePanel");
	}

	return WulingSidePanelUI;
})(View)


//class ui.mobile.wulingdahui.view.WulingdahuiViewUI extends laya.ui.View
var WulingdahuiViewUI=(function(_super){
	function WulingdahuiViewUI(){
		this.star0=null;
		this.star1=null;
		this.star2=null;
		this.star3=null;
		this.star4=null;
		this.stateimg=null;
		this.descImg=null;
		this.descImg1=null;
		this.descImg2=null;
		this.icon=null;
		this.levelTxt0=null;
		this.levelTxt=null;
		this.timeTxt=null;
		this.costBox=null;
		this.checkBox=null;
		this.btn=null;
		this.btnRank=null;
		this.timeBox=null;
		this.numTxt=null;
		this.timeTxt1=null;
		this.btnAdd=null;
		this.helpBox=null;
		WulingdahuiViewUI.__super.call(this);
	}

	__class(WulingdahuiViewUI,'ui.mobile.wulingdahui.view.WulingdahuiViewUI',_super);
	var __proto=WulingdahuiViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/view/WulingdahuiView");
	}

	return WulingdahuiViewUI;
})(View)


//class ui.mobile.wulingdahui.view.WulingMobaiViewUI extends laya.ui.View
var WulingMobaiViewUI=(function(_super){
	function WulingMobaiViewUI(){
		this.roleImg=null;
		this.numBg=null;
		this.numTxt=null;
		this.guildTxt=null;
		this.nameTxt=null;
		this.tipBox=null;
		this.tipTxt=null;
		this.btn=null;
		WulingMobaiViewUI.__super.call(this);
	}

	__class(WulingMobaiViewUI,'ui.mobile.wulingdahui.view.WulingMobaiViewUI',_super);
	var __proto=WulingMobaiViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/view/WulingMobaiView");
	}

	return WulingMobaiViewUI;
})(View)


//class ui.mobile.wulingdahui.view.WulingPKActivityViewUI extends laya.ui.View
var WulingPKActivityViewUI=(function(_super){
	function WulingPKActivityViewUI(){
		this.descImg=null;
		this.timeSp=null;
		this.groupImg=null;
		this.timeTxt=null;
		this.startImg0=null;
		this.startImg1=null;
		this.startImg2=null;
		this.endImg0=null;
		this.endImg1=null;
		this.endImg2=null;
		this.endImg3=null;
		this.endImg4=null;
		this.endImg5=null;
		this.endImg6=null;
		this.endImg7=null;
		WulingPKActivityViewUI.__super.call(this);
	}

	__class(WulingPKActivityViewUI,'ui.mobile.wulingdahui.view.WulingPKActivityViewUI',_super);
	var __proto=WulingPKActivityViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/view/WulingPKActivityView");
	}

	return WulingPKActivityViewUI;
})(View)


//class ui.mobile.wulingdahui.view.WulingPKOneViewUI extends laya.ui.View
var WulingPKOneViewUI=(function(_super){
	function WulingPKOneViewUI(){
		this.allSp=null;
		this.lineSp=null;
		this.textBgSp=null;
		this.textSp=null;
		this.btn0=null;
		this.btn1=null;
		this.btn2=null;
		this.btn3=null;
		this.btn4=null;
		this.btn5=null;
		this.btn6=null;
		this.btn7=null;
		this.btn8=null;
		this.btn9=null;
		this.btn10=null;
		this.btn11=null;
		this.btn12=null;
		this.btn13=null;
		this.btn14=null;
		this.btn15=null;
		this.btnEight0=null;
		this.btnEight1=null;
		this.btnEight2=null;
		this.btnEight3=null;
		this.btnEight4=null;
		this.btnEight5=null;
		this.btnEight6=null;
		this.btnEight7=null;
		this.btnFout0=null;
		this.btnFout1=null;
		this.btnFout2=null;
		this.btnFout3=null;
		this.winnerSp=null;
		this.winnerDesc=null;
		this.jobImg=null;
		this.nameTxt=null;
		this.icon=null;
		this.twoSp=null;
		this.btnTwo0=null;
		this.btnTwo1=null;
		this.btnCheck=null;
		this.timeTxt=null;
		this.btnChEight0=null;
		this.btnChEight1=null;
		this.btnChEight2=null;
		this.btnChEight3=null;
		this.btnChEight4=null;
		this.btnChEight5=null;
		this.btnChEight6=null;
		this.btnChEight7=null;
		this.btnChFour0=null;
		this.btnChFour1=null;
		this.btnChFour2=null;
		this.btnChFour3=null;
		this.btnChTwo0=null;
		this.btnChTwo1=null;
		this.btnGoto=null;
		this.tabBg=null;
		this.tabBtnOne=null;
		this.tabBtnTow=null;
		this.tabBtnTop=null;
		this.btnZhanji=null;
		this.btnZc=null;
		this.timeSp=null;
		WulingPKOneViewUI.__super.call(this);
	}

	__class(WulingPKOneViewUI,'ui.mobile.wulingdahui.view.WulingPKOneViewUI',_super);
	var __proto=WulingPKOneViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/view/WulingPKOneView");
	}

	return WulingPKOneViewUI;
})(View)


//class ui.mobile.wulingdahui.view.WulingRewardsListUI extends laya.ui.View
var WulingRewardsListUI=(function(_super){
	function WulingRewardsListUI(){
		this.nameImg=null;
		this.list=null;
		WulingRewardsListUI.__super.call(this);
	}

	__class(WulingRewardsListUI,'ui.mobile.wulingdahui.view.WulingRewardsListUI',_super);
	var __proto=WulingRewardsListUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/view/WulingRewardsList");
	}

	return WulingRewardsListUI;
})(View)


//class ui.mobile.wulingdahui.view.WulingRewardsViewUI extends laya.ui.View
var WulingRewardsViewUI=(function(_super){
	function WulingRewardsViewUI(){
		this.list=null;
		WulingRewardsViewUI.__super.call(this);
	}

	__class(WulingRewardsViewUI,'ui.mobile.wulingdahui.view.WulingRewardsViewUI',_super);
	var __proto=WulingRewardsViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/view/WulingRewardsView");
	}

	return WulingRewardsViewUI;
})(View)


//class ui.mobile.wulingdahui.view.WulingShopViewUI extends laya.ui.View
var WulingShopViewUI=(function(_super){
	function WulingShopViewUI(){
		this.selectImg=null;
		this.list=null;
		this.moneyNode=null;
		this.lingIcon=null;
		this.lingTxt=null;
		this.moneyNode2=null;
		this.moneyIcon=null;
		this.moneyTxt=null;
		WulingShopViewUI.__super.call(this);
	}

	__class(WulingShopViewUI,'ui.mobile.wulingdahui.view.WulingShopViewUI',_super);
	var __proto=WulingShopViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/view/WulingShopView");
	}

	return WulingShopViewUI;
})(View)


//class ui.mobile.ylgy.YangPanelUI extends laya.ui.View
var YangPanelUI=(function(_super){
	function YangPanelUI(){
		this.bg=null;
		this.bg_center=null;
		this.num_txt=null;
		this.tipNode=null;
		this.bg_left=null;
		this.bg_grid0=null;
		this.bg_grid1=null;
		this.bg_grid2=null;
		this.bg_grid3=null;
		this.bg_grid4=null;
		this.bg_grid5=null;
		this.imgGot=null;
		this.bg_right=null;
		this.btn_look=null;
		this.btn_random=null;
		this.btn_remove=null;
		this.btn_back=null;
		this.look_txt=null;
		this.random_txt=null;
		this.remove_txt=null;
		this.back_txt=null;
		this.closeBtn=null;
		this.bg_result=null;
		this.btn_new=null;
		this.btn_continue=null;
		this.btn_no=null;
		this.btn_get=null;
		this.result_txt=null;
		this.btn_restart=null;
		YangPanelUI.__super.call(this);
	}

	__class(YangPanelUI,'ui.mobile.ylgy.YangPanelUI',_super);
	var __proto=YangPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/ylgy/YangPanel");
	}

	return YangPanelUI;
})(View)


//class ui.mobile.zanzhu.ShouChongWeaponItemUI extends laya.ui.View
var ShouChongWeaponItemUI=(function(_super){
	function ShouChongWeaponItemUI(){
		this.bg=null;
		this.des_txt=null;
		this.btnNode=null;
		this.btn_add=null;
		this.btn_buy=null;
		this.num_txt=null;
		this.imgGot=null;
		ShouChongWeaponItemUI.__super.call(this);
	}

	__class(ShouChongWeaponItemUI,'ui.mobile.zanzhu.ShouChongWeaponItemUI',_super);
	var __proto=ShouChongWeaponItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zanzhu/ShouChongWeaponItem");
	}

	return ShouChongWeaponItemUI;
})(View)


//class ui.mobile.zanzhu.ShouChongWeaponViewUI extends laya.ui.View
var ShouChongWeaponViewUI=(function(_super){
	function ShouChongWeaponViewUI(){
		this.bg=null;
		this.imgTitle=null;
		this.list=null;
		ShouChongWeaponViewUI.__super.call(this);
	}

	__class(ShouChongWeaponViewUI,'ui.mobile.zanzhu.ShouChongWeaponViewUI',_super);
	var __proto=ShouChongWeaponViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zanzhu/ShouChongWeaponView");
	}

	return ShouChongWeaponViewUI;
})(View)


//class ui.mobile.zanzhu.ZanzhuItemUI extends laya.ui.View
var ZanzhuItemUI=(function(_super){
	function ZanzhuItemUI(){
		this.bg=null;
		this.p_panel=null;
		this.btn=null;
		this.cishuBox=null;
		this.cishuTxt=null;
		this.expBall=null;
		this.expBallTxt=null;
		this.yijihuo=null;
		this.n_txt=null;
		this.n_icon=null;
		this.n_btn=null;
		this.icon=null;
		ZanzhuItemUI.__super.call(this);
	}

	__class(ZanzhuItemUI,'ui.mobile.zanzhu.ZanzhuItemUI',_super);
	var __proto=ZanzhuItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zanzhu/ZanzhuItem");
	}

	return ZanzhuItemUI;
})(View)


//class ui.mobile.zanzhu.ZanzhuPanelUI extends laya.ui.View
var ZanzhuPanelUI=(function(_super){
	function ZanzhuPanelUI(){
		this.bg=null;
		this.title=null;
		this.p_list=null;
		ZanzhuPanelUI.__super.call(this);
	}

	__class(ZanzhuPanelUI,'ui.mobile.zanzhu.ZanzhuPanelUI',_super);
	var __proto=ZanzhuPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zanzhu/ZanzhuPanel");
	}

	return ZanzhuPanelUI;
})(View)


//class ui.mobile.zone.cailiao.CailiaoZoneItemUI extends laya.ui.View
var CailiaoZoneItemUI=(function(_super){
	function CailiaoZoneItemUI(){
		this.bg=null;
		this.nanduImg=null;
		this.descTxt=null;
		this.openTxt=null;
		CailiaoZoneItemUI.__super.call(this);
	}

	__class(CailiaoZoneItemUI,'ui.mobile.zone.cailiao.CailiaoZoneItemUI',_super);
	var __proto=CailiaoZoneItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/cailiao/CailiaoZoneItem");
	}

	return CailiaoZoneItemUI;
})(View)


//class ui.mobile.zone.cailiao.CailiaoZoneViewUI extends laya.ui.View
var CailiaoZoneViewUI=(function(_super){
	function CailiaoZoneViewUI(){
		this.r_bg=null;
		this.btnEnter=null;
		this.cishuTxt=null;
		this.currImg=null;
		this.tequanTxt=null;
		this.l_btn=null;
		this.r_btn=null;
		this.tabs=null;
		this.btnTQ=null;
		this.l_select=null;
		this.fengchanBox=null;
		this.jump_txt=null;
		this.name_txt=null;
		this.getExTxt=null;
		this.bg_grid=null;
		this.imgYes=null;
		this.imgNo=null;
		CailiaoZoneViewUI.__super.call(this);
	}

	__class(CailiaoZoneViewUI,'ui.mobile.zone.cailiao.CailiaoZoneViewUI',_super);
	var __proto=CailiaoZoneViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/cailiao/CailiaoZoneView");
	}

	return CailiaoZoneViewUI;
})(View)


//class ui.mobile.zone.cailiao.ExpZoneItemUI extends laya.ui.View
var ExpZoneItemUI=(function(_super){
	function ExpZoneItemUI(){
		this.bg=null;
		this.zimu=null;
		this.txt=null;
		ExpZoneItemUI.__super.call(this);
	}

	__class(ExpZoneItemUI,'ui.mobile.zone.cailiao.ExpZoneItemUI',_super);
	var __proto=ExpZoneItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/cailiao/ExpZoneItem");
	}

	return ExpZoneItemUI;
})(View)


//class ui.mobile.zone.cailiao.ExpZoneViewUI extends laya.ui.View
var ExpZoneViewUI=(function(_super){
	function ExpZoneViewUI(){
		this.g_select=null;
		this.btnGo=null;
		this.beishuBox=null;
		this.btnGet1=null;
		this.priceTxt1=null;
		this.priceIcon1=null;
		this.exp_txt=null;
		this.tipBox=null;
		this.cur_txt=null;
		this.cishuTxt=null;
		this.linkTxt=null;
		this.btnLink=null;
		ExpZoneViewUI.__super.call(this);
	}

	__class(ExpZoneViewUI,'ui.mobile.zone.cailiao.ExpZoneViewUI',_super);
	var __proto=ExpZoneViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/cailiao/ExpZoneView");
	}

	return ExpZoneViewUI;
})(View)


//class ui.mobile.zone.cailiao.QungongTiyanViewUI extends laya.ui.View
var QungongTiyanViewUI=(function(_super){
	function QungongTiyanViewUI(){
		this.tiyanBox=null;
		this.tiyan_icon=null;
		this.tiyan_btn=null;
		this.tiyan_txt=null;
		this.qunImg=null;
		this.btnGet=null;
		QungongTiyanViewUI.__super.call(this);
	}

	__class(QungongTiyanViewUI,'ui.mobile.zone.cailiao.QungongTiyanViewUI',_super);
	var __proto=QungongTiyanViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/cailiao/QungongTiyanView");
	}

	return QungongTiyanViewUI;
})(View)


//class ui.mobile.zone.ZoneSuccessPanelUI extends laya.ui.View
var ZoneSuccessPanelUI=(function(_super){
	function ZoneSuccessPanelUI(){
		this.bg=null;
		this.r_btn=null;
		this.l_btn=null;
		this.l_txt=null;
		this.r_txt=null;
		this.timeTxt=null;
		this.txt=null;
		ZoneSuccessPanelUI.__super.call(this);
	}

	__class(ZoneSuccessPanelUI,'ui.mobile.zone.ZoneSuccessPanelUI',_super);
	var __proto=ZoneSuccessPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/ZoneSuccessPanel");
	}

	return ZoneSuccessPanelUI;
})(View)


//class ui.mobile.zone.tower.BaoshiTaAlertUI extends laya.ui.View
var BaoshiTaAlertUI=(function(_super){
	function BaoshiTaAlertUI(){
		this.window=null;
		this.g_select=null;
		BaoshiTaAlertUI.__super.call(this);
	}

	__class(BaoshiTaAlertUI,'ui.mobile.zone.tower.BaoshiTaAlertUI',_super);
	var __proto=BaoshiTaAlertUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/tower/BaoshiTaAlert");
	}

	return BaoshiTaAlertUI;
})(View)


//class ui.mobile.zone.tower.BaoshiTaItemUI extends laya.ui.View
var BaoshiTaItemUI=(function(_super){
	function BaoshiTaItemUI(){
		this.mapTxt=null;
		this.nameTxt=null;
		this.timeTxt=null;
		BaoshiTaItemUI.__super.call(this);
	}

	__class(BaoshiTaItemUI,'ui.mobile.zone.tower.BaoshiTaItemUI',_super);
	var __proto=BaoshiTaItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/tower/BaoshiTaItem");
	}

	return BaoshiTaItemUI;
})(View)


//class ui.mobile.zone.tower.BaoshiTaViewUI extends laya.ui.View
var BaoshiTaViewUI=(function(_super){
	function BaoshiTaViewUI(){
		this.bossNameTxt=null;
		this.tipBox=null;
		this.mubei=null;
		this.timeTxt=null;
		this.hpBar=null;
		this.barTxt=null;
		this.levelTxt=null;
		this.layer_num=null;
		this.txt=null;
		this.l_btn=null;
		this.r_btn=null;
		this.taskTxt=null;
		this.btnEnter=null;
		BaoshiTaViewUI.__super.call(this);
	}

	__class(BaoshiTaViewUI,'ui.mobile.zone.tower.BaoshiTaViewUI',_super);
	var __proto=BaoshiTaViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/tower/BaoshiTaView");
	}

	return BaoshiTaViewUI;
})(View)


//class ui.mobile.zone.tower.ChuangtianguanViewUI extends laya.ui.View
var ChuangtianguanViewUI=(function(_super){
	function ChuangtianguanViewUI(){
		this.box0=null;
		this.kill0=null;
		this.cengTxt0=null;
		this.box1=null;
		this.kill1=null;
		this.cengTxt1=null;
		this.box2=null;
		this.kill2=null;
		this.cengTxt2=null;
		this.r_titleTxt=null;
		this.r_descTxt=null;
		this.tipTxt=null;
		this.btnEnter=null;
		this.maxImg=null;
		ChuangtianguanViewUI.__super.call(this);
	}

	__class(ChuangtianguanViewUI,'ui.mobile.zone.tower.ChuangtianguanViewUI',_super);
	var __proto=ChuangtianguanViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/tower/ChuangtianguanView");
	}

	return ChuangtianguanViewUI;
})(View)


//class ui.mobile.zone.tower.ShiLianTaRewardListUI extends laya.ui.View
var ShiLianTaRewardListUI=(function(_super){
	function ShiLianTaRewardListUI(){
		this.gridNode=null;
		ShiLianTaRewardListUI.__super.call(this);
	}

	__class(ShiLianTaRewardListUI,'ui.mobile.zone.tower.ShiLianTaRewardListUI',_super);
	var __proto=ShiLianTaRewardListUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/tower/ShiLianTaRewardList");
	}

	return ShiLianTaRewardListUI;
})(View)


//class ui.mobile.zone.tower.ShiliantaViewUI extends laya.ui.View
var ShiliantaViewUI=(function(_super){
	function ShiliantaViewUI(){
		this.btn=null;
		this.btnGet=null;
		this.yilingqu=null;
		this.limitTxt=null;
		this.cengFont=null;
		this.chixuTxt=null;
		this.moneyTxt10=null;
		this.money10=null;
		this.moneyTxt11=null;
		this.money11=null;
		this.moneyTxt20=null;
		this.money20=null;
		this.moneyTxt21=null;
		this.money21=null;
		this.moneyTxt30=null;
		this.money30=null;
		this.moneyTxt31=null;
		this.money31=null;
		this.l_txtTQ=null;
		this.r_txtTQ=null;
		this.l_btnTQ=null;
		this.r_btnTQ=null;
		this.btlzNode=null;
		this.btn_btlz=null;
		this.time_btlz=null;
		ShiliantaViewUI.__super.call(this);
	}

	__class(ShiliantaViewUI,'ui.mobile.zone.tower.ShiliantaViewUI',_super);
	var __proto=ShiliantaViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/tower/ShiliantaView");
	}

	return ShiliantaViewUI;
})(View)


//class ui.mobile.zone.tower.ZhenyaotaViewUI extends laya.ui.View
var ZhenyaotaViewUI=(function(_super){
	function ZhenyaotaViewUI(){
		this.l_panel=null;
		this.bg=null;
		this.bg2=null;
		this.yilingqu=null;
		this.descTxt=null;
		this.nameTxt=null;
		this.cengTxt=null;
		this.yijisha=null;
		this.btnGo=null;
		this.btnGet=null;
		ZhenyaotaViewUI.__super.call(this);
	}

	__class(ZhenyaotaViewUI,'ui.mobile.zone.tower.ZhenyaotaViewUI',_super);
	var __proto=ZhenyaotaViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/tower/ZhenyaotaView");
	}

	return ZhenyaotaViewUI;
})(View)


//class ui.mobile.zone.ZoneTimePanelUI extends laya.ui.View
var ZoneTimePanelUI=(function(_super){
	function ZoneTimePanelUI(){
		this.bg=null;
		this.timeTxt=null;
		this.fontTxt=null;
		ZoneTimePanelUI.__super.call(this);
	}

	__class(ZoneTimePanelUI,'ui.mobile.zone.ZoneTimePanelUI',_super);
	var __proto=ZoneTimePanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/ZoneTimePanel");
	}

	return ZoneTimePanelUI;
})(View)


//class ui.mobile.lingshou.LingShouHuaXingItemUI extends laya.ui.View
var LingShouHuaXingItemUI=(function(_super){
	function LingShouHuaXingItemUI(){
		this.imgNo=null;
		this.name_txt=null;
		this.lv_txt=null;
		LingShouHuaXingItemUI.__super.call(this);
	}

	__class(LingShouHuaXingItemUI,'ui.mobile.lingshou.LingShouHuaXingItemUI',_super);
	var __proto=LingShouHuaXingItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/lingshou/LingShouHuaXingItem");
	}

	return LingShouHuaXingItemUI;
})(View)


//class ui.mobile.lingshou.LingShouHuaXingViewUI extends laya.ui.View
var LingShouHuaXingViewUI=(function(_super){
	function LingShouHuaXingViewUI(){
		this.bg=null;
		this.imgName=null;
		this.imgTitle=null;
		this.bg_cost=null;
		this.icon0=null;
		this.icon1=null;
		this.cost_txt0=null;
		this.cost_txt1=null;
		this.btn_add=null;
		this.imgMax=null;
		this.btn_up=null;
		this.list=null;
		this.arrow=null;
		this.imgChanged=null;
		this.btn_change=null;
		this.bgSkill=null;
		this.skill1=null;
		this.skillName_txt=null;
		this.skilldes_txt=null;
		this.bgSkill2=null;
		this.skill2=null;
		this.skillName_txt2=null;
		this.skilldes_txt2=null;
		LingShouHuaXingViewUI.__super.call(this);
	}

	__class(LingShouHuaXingViewUI,'ui.mobile.lingshou.LingShouHuaXingViewUI',_super);
	var __proto=LingShouHuaXingViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/lingshou/LingShouHuaXingView");
	}

	return LingShouHuaXingViewUI;
})(View)


//class ui.mobile.lingshou.LingShouTipUI extends laya.ui.View
var LingShouTipUI=(function(_super){
	function LingShouTipUI(){
		this.bg=null;
		this.imgName=null;
		this.imgDes=null;
		this.skill1=null;
		this.bg_name=null;
		this.skillName_txt=null;
		this.skilldes_txt=null;
		LingShouTipUI.__super.call(this);
	}

	__class(LingShouTipUI,'ui.mobile.lingshou.LingShouTipUI',_super);
	var __proto=LingShouTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/lingshou/LingShouTip");
	}

	return LingShouTipUI;
})(View)


//class ui.mobile.lingshou.LingshouUpTipUI extends laya.ui.View
var LingshouUpTipUI=(function(_super){
	function LingshouUpTipUI(){
		this.bg=null;
		this.nameImg=null;
		this.name_txt=null;
		this.desc_img=null;
		this.p_panel=null;
		this.attrTxt=null;
		this.descTxt=null;
		LingshouUpTipUI.__super.call(this);
	}

	__class(LingshouUpTipUI,'ui.mobile.lingshou.LingshouUpTipUI',_super);
	var __proto=LingshouUpTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/lingshou/LingshouUpTip");
	}

	return LingshouUpTipUI;
})(View)


//class ui.mobile.lingshou.LingShouViewUI extends laya.ui.View
var LingShouViewUI=(function(_super){
	function LingShouViewUI(){
		this.bg=null;
		this.avatarNode=null;
		this.imgName=null;
		this.btn_stop=null;
		this.btn_go=null;
		this.btn_more=null;
		this.btn_left=null;
		this.btn_right=null;
		this.imgChanged=null;
		this.btn_change=null;
		this.lv_txt=null;
		this.costNode=null;
		this.cost_txt1=null;
		this.cost_txt0=null;
		this.icon1=null;
		this.icon0=null;
		this.imgMax=null;
		this.btn_up=null;
		LingShouViewUI.__super.call(this);
	}

	__class(LingShouViewUI,'ui.mobile.lingshou.LingShouViewUI',_super);
	var __proto=LingShouViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/lingshou/LingShouView");
	}

	return LingShouViewUI;
})(View)


//class ui.mobile.zuji.ZuJiHuaXingItemUI extends laya.ui.View
var ZuJiHuaXingItemUI=(function(_super){
	function ZuJiHuaXingItemUI(){
		this.imgNo=null;
		this.name_txt=null;
		this.lv_txt=null;
		ZuJiHuaXingItemUI.__super.call(this);
	}

	__class(ZuJiHuaXingItemUI,'ui.mobile.zuji.ZuJiHuaXingItemUI',_super);
	var __proto=ZuJiHuaXingItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zuji/ZuJiHuaXingItem");
	}

	return ZuJiHuaXingItemUI;
})(View)


//class ui.mobile.zuji.ZuJiHuaXingViewUI extends laya.ui.View
var ZuJiHuaXingViewUI=(function(_super){
	function ZuJiHuaXingViewUI(){
		this.bg=null;
		this.list=null;
		this.imgName=null;
		this.bg_attr=null;
		this.bg_review=null;
		this.bg_skill=null;
		this.skillicon=null;
		this.skilldes_txt=null;
		this.skillName_txt=null;
		this.runNode=null;
		this.imgMax=null;
		this.upNode=null;
		this.bg_need=null;
		this.need_txt=null;
		this.bg_grid=null;
		this.btn_up=null;
		this.btn_qxyx=null;
		this.btn_yx=null;
		ZuJiHuaXingViewUI.__super.call(this);
	}

	__class(ZuJiHuaXingViewUI,'ui.mobile.zuji.ZuJiHuaXingViewUI',_super);
	var __proto=ZuJiHuaXingViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zuji/ZuJiHuaXingView");
	}

	return ZuJiHuaXingViewUI;
})(View)


//class ui.mobile.zuji.ZuJiTipUI extends laya.ui.View
var ZuJiTipUI=(function(_super){
	function ZuJiTipUI(){
		this.bg=null;
		this.imgName=null;
		this.runNode=null;
		this.bg_review=null;
		this.bg_skill=null;
		this.skillicon=null;
		this.skilldes_txt=null;
		this.skillName_txt=null;
		this.descTxt=null;
		ZuJiTipUI.__super.call(this);
	}

	__class(ZuJiTipUI,'ui.mobile.zuji.ZuJiTipUI',_super);
	var __proto=ZuJiTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zuji/ZuJiTip");
	}

	return ZuJiTipUI;
})(View)


//class ui.mobile.zuji.ZuJiViewUI extends laya.ui.View
var ZuJiViewUI=(function(_super){
	function ZuJiViewUI(){
		this.bg=null;
		this.runNode=null;
		this.bg_bb=null;
		this.tip_txt=null;
		this.bg_now=null;
		this.bg_next=null;
		this.name_txt=null;
		this.imgName=null;
		this.btn_left=null;
		this.btn_right=null;
		this.imgMax=null;
		this.upNode=null;
		this.bg_money=null;
		this.money_txt=null;
		this.imgMoney=null;
		this.bg_need=null;
		this.need_txt=null;
		this.bg_grid=null;
		this.btn_up=null;
		this.btn_qxyx=null;
		this.btn_yx=null;
		this.btn_hx=null;
		this.imgHelp=null;
		ZuJiViewUI.__super.call(this);
	}

	__class(ZuJiViewUI,'ui.mobile.zuji.ZuJiViewUI',_super);
	var __proto=ZuJiViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zuji/ZuJiView");
	}

	return ZuJiViewUI;
})(View)


//class ui.mobile.zuoqi.ZuoqiHuaxingViewUI extends laya.ui.View
var ZuoqiHuaxingViewUI=(function(_super){
	function ZuoqiHuaxingViewUI(){
		this.bg=null;
		this.chuzhan=null;
		this.allFight=null;
		this.tiaojianTxt=null;
		this.u_btn=null;
		this.d_btn=null;
		this.l_select=null;
		this.btnQC=null;
		this.l_panel=null;
		this.upbox=null;
		this.yimanjie=null;
		this.btnUP=null;
		this.way_txt=null;
		this.qipao=null;
		this.qq_txt=null;
		this.qqLink=null;
		this.zuoqiNT0=null;
		this.zuoqiNT1=null;
		this.suitTxt=null;
		this.nameTxt=null;
		ZuoqiHuaxingViewUI.__super.call(this);
	}

	__class(ZuoqiHuaxingViewUI,'ui.mobile.zuoqi.ZuoqiHuaxingViewUI',_super);
	var __proto=ZuoqiHuaxingViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zuoqi/ZuoqiHuaxingView");
	}

	return ZuoqiHuaxingViewUI;
})(View)


//class ui.mobile.zuoqi.ZuoQiShengXingViewUI extends laya.ui.View
var ZuoQiShengXingViewUI=(function(_super){
	function ZuoQiShengXingViewUI(){
		this.window=null;
		this.imgTitle=null;
		this.name_txt=null;
		this.num_txt=null;
		this.btn=null;
		ZuoQiShengXingViewUI.__super.call(this);
	}

	__class(ZuoQiShengXingViewUI,'ui.mobile.zuoqi.ZuoQiShengXingViewUI',_super);
	var __proto=ZuoQiShengXingViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window5UI",Window5UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zuoqi/ZuoQiShengXingView");
	}

	return ZuoQiShengXingViewUI;
})(View)


//class ui.mobile.zuoqi.ZuoqiTotalAttrTipUI extends laya.ui.View
var ZuoqiTotalAttrTipUI=(function(_super){
	function ZuoqiTotalAttrTipUI(){
		this.bg=null;
		this.attrTxt=null;
		this.barTxt=null;
		this.txt1=null;
		this.txt0=null;
		this.txt2=null;
		ZuoqiTotalAttrTipUI.__super.call(this);
	}

	__class(ZuoqiTotalAttrTipUI,'ui.mobile.zuoqi.ZuoqiTotalAttrTipUI',_super);
	var __proto=ZuoqiTotalAttrTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zuoqi/ZuoqiTotalAttrTip");
	}

	return ZuoqiTotalAttrTipUI;
})(View)


//class ui.mobile.zuoqi.ZuoqiViewUI extends laya.ui.View
var ZuoqiViewUI=(function(_super){
	function ZuoqiViewUI(){
		this.bg=null;
		this.equipBox=null;
		this.btnTab1=null;
		this.btnTab2=null;
		this.title=null;
		this.yimanjie=null;
		this.jie=null;
		this.add=null;
		this.jie2=null;
		this.r_titleTxt=null;
		this.upbox=null;
		this.qipao=null;
		this.qq_txt=null;
		this.qqLink=null;
		this.btnStart=null;
		this.btnGet=null;
		this.btnLink=null;
		this.btnActive=null;
		this.btn_change=null;
		ZuoqiViewUI.__super.call(this);
	}

	__class(ZuoqiViewUI,'ui.mobile.zuoqi.ZuoqiViewUI',_super);
	var __proto=ZuoqiViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zuoqi/ZuoqiView");
	}

	return ZuoqiViewUI;
})(View)


//class ui.mobile.activity.bafuAct.BafuActPanelUI extends laya.ui.View
var BafuActPanelUI=(function(_super){
	function BafuActPanelUI(){
		this.bg=null;
		this.bg0=null;
		this.tabBtn=null;
		this.view_box=null;
		this.closeBtn=null;
		this.title=null;
		BafuActPanelUI.__super.call(this);
	}

	__class(BafuActPanelUI,'ui.mobile.activity.bafuAct.BafuActPanelUI',_super);
	var __proto=BafuActPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/bafuAct/BafuActPanel");
	}

	return BafuActPanelUI;
})(View)


//class ui.mobile.activity.baota.BaoTaLingZunPanelUI extends laya.ui.View
var BaoTaLingZunPanelUI=(function(_super){
	function BaoTaLingZunPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.btn_get=null;
		this.btn_go=null;
		this.gridNode=null;
		this.time_txt=null;
		this.des_txt=null;
		this.imgGot=null;
		BaoTaLingZunPanelUI.__super.call(this);
	}

	__class(BaoTaLingZunPanelUI,'ui.mobile.activity.baota.BaoTaLingZunPanelUI',_super);
	var __proto=BaoTaLingZunPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/baota/BaoTaLingZunPanel");
	}

	return BaoTaLingZunPanelUI;
})(View)


//class ui.mobile.activity.dabao.DropJipinPanelUI extends laya.ui.View
var DropJipinPanelUI=(function(_super){
	function DropJipinPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.txt=null;
		DropJipinPanelUI.__super.call(this);
	}

	__class(DropJipinPanelUI,'ui.mobile.activity.dabao.DropJipinPanelUI',_super);
	var __proto=DropJipinPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/dabao/DropJipinPanel");
	}

	return DropJipinPanelUI;
})(View)


//class ui.mobile.activity.DanBiShuangBeiPanelUI extends laya.ui.View
var DanBiShuangBeiPanelUI=(function(_super){
	function DanBiShuangBeiPanelUI(){
		this.bg=null;
		this.btn_mall=null;
		this.gridNode=null;
		this.closeBtn=null;
		this.imgGot=null;
		this.btn_buy=null;
		this.imgMoney=null;
		this.imgNew=null;
		DanBiShuangBeiPanelUI.__super.call(this);
	}

	__class(DanBiShuangBeiPanelUI,'ui.mobile.activity.DanBiShuangBeiPanelUI',_super);
	var __proto=DanBiShuangBeiPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/DanBiShuangBeiPanel");
	}

	return DanBiShuangBeiPanelUI;
})(View)


//class ui.mobile.activity.EquipGiftPanelUI extends laya.ui.View
var EquipGiftPanelUI=(function(_super){
	function EquipGiftPanelUI(){
		this.bg=null;
		this.btn=null;
		this.old_priceIcon=null;
		this.old_priceTxt=null;
		this.priceIcon=null;
		this.priceTxt=null;
		this.closeBtn=null;
		this.yigoumai=null;
		this.imgFont=null;
		EquipGiftPanelUI.__super.call(this);
	}

	__class(EquipGiftPanelUI,'ui.mobile.activity.EquipGiftPanelUI',_super);
	var __proto=EquipGiftPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/EquipGiftPanel");
	}

	return EquipGiftPanelUI;
})(View)


//class ui.mobile.activity.FastModePanelUI extends laya.ui.View
var FastModePanelUI=(function(_super){
	function FastModePanelUI(){
		this.bg1=null;
		this.btnGet=null;
		this.awardBox=null;
		this.closeBtn=null;
		FastModePanelUI.__super.call(this);
	}

	__class(FastModePanelUI,'ui.mobile.activity.FastModePanelUI',_super);
	var __proto=FastModePanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/FastModePanel");
	}

	return FastModePanelUI;
})(View)


//class ui.mobile.activity.flower.FlowerPanelUI extends laya.ui.View
var FlowerPanelUI=(function(_super){
	function FlowerPanelUI(){
		this.bg=null;
		this.bg0=null;
		this.list_box=null;
		this.tabBtn=null;
		this.view_box=null;
		this.closeBtn=null;
		this.title=null;
		this.trim_img=null;
		FlowerPanelUI.__super.call(this);
	}

	__class(FlowerPanelUI,'ui.mobile.activity.flower.FlowerPanelUI',_super);
	var __proto=FlowerPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/flower/FlowerPanel");
	}

	return FlowerPanelUI;
})(View)


//class ui.mobile.activity.flower.redPacket.RedPacketPanelUI extends laya.ui.View
var RedPacketPanelUI=(function(_super){
	function RedPacketPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.btn=null;
		this.name_txt=null;
		this.open_box=null;
		this.num_txt0=null;
		this.num_txt=null;
		this.num_txt1=null;
		this.zuanshi_img=null;
		this.close_box=null;
		this.item_img=null;
		this.item_num=null;
		this.desc_txt=null;
		this.item_bg=null;
		this.p_list=null;
		RedPacketPanelUI.__super.call(this);
	}

	__class(RedPacketPanelUI,'ui.mobile.activity.flower.redPacket.RedPacketPanelUI',_super);
	var __proto=RedPacketPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/flower/redPacket/RedPacketPanel");
	}

	return RedPacketPanelUI;
})(View)


//class ui.mobile.activity.FunYugaoActPanelUI extends laya.ui.View
var FunYugaoActPanelUI=(function(_super){
	function FunYugaoActPanelUI(){
		this.window=null;
		this.tabs=null;
		this.bg=null;
		this.infoTxt=null;
		this.closeBtn=null;
		this.closeBtn2=null;
		FunYugaoActPanelUI.__super.call(this);
	}

	__class(FunYugaoActPanelUI,'ui.mobile.activity.FunYugaoActPanelUI',_super);
	var __proto=FunYugaoActPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/FunYugaoActPanel");
	}

	return FunYugaoActPanelUI;
})(View)


//class ui.mobile.activity.growup.GrowUpAlertUI extends laya.ui.View
var GrowUpAlertUI=(function(_super){
	function GrowUpAlertUI(){
		this.window=null;
		this.btn_ok=null;
		this.btn_jump=null;
		this.des_txt1=null;
		this.des_txt2=null;
		this.money_txt=null;
		GrowUpAlertUI.__super.call(this);
	}

	__class(GrowUpAlertUI,'ui.mobile.activity.growup.GrowUpAlertUI',_super);
	var __proto=GrowUpAlertUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/growup/GrowUpAlert");
	}

	return GrowUpAlertUI;
})(View)


//class ui.mobile.activity.HeChengJinBiActPanelUI extends laya.ui.View
var HeChengJinBiActPanelUI=(function(_super){
	function HeChengJinBiActPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.effectNode=null;
		this.gridNode=null;
		this.imgDes=null;
		this.time_txt=null;
		this.imgGot=null;
		this.btn_buy=null;
		HeChengJinBiActPanelUI.__super.call(this);
	}

	__class(HeChengJinBiActPanelUI,'ui.mobile.activity.HeChengJinBiActPanelUI',_super);
	var __proto=HeChengJinBiActPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/HeChengJinBiActPanel");
	}

	return HeChengJinBiActPanelUI;
})(View)


//class ui.mobile.activity.hfAct.HfActPanelUI extends laya.ui.View
var HfActPanelUI=(function(_super){
	function HfActPanelUI(){
		this.bg=null;
		this.bg0=null;
		this.tabBtn=null;
		this.view_box=null;
		this.closeBtn=null;
		this.title=null;
		HfActPanelUI.__super.call(this);
	}

	__class(HfActPanelUI,'ui.mobile.activity.hfAct.HfActPanelUI',_super);
	var __proto=HfActPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/hfAct/HfActPanel");
	}

	return HfActPanelUI;
})(View)


//class ui.mobile.activity.HuangDiKaoShangPanelUI extends laya.ui.View
var HuangDiKaoShangPanelUI=(function(_super){
	function HuangDiKaoShangPanelUI(){
		this.bg=null;
		this.imgKing=null;
		this.effectNode=null;
		this.imgTitle=null;
		this.imgGot=null;
		this.btn=null;
		this.imgTips=null;
		this.page1=null;
		this.gridNode=null;
		this.imgDes=null;
		this.page2=null;
		this.itemBtn0=null;
		this.itemBtn1=null;
		this.itemBtn2=null;
		this.bg_grid=null;
		this.imgState2=null;
		this.imgState1=null;
		this.imgState0=null;
		this.song_txt=null;
		this.tabContainer=null;
		this.tab=null;
		this.closeBtn=null;
		HuangDiKaoShangPanelUI.__super.call(this);
	}

	__class(HuangDiKaoShangPanelUI,'ui.mobile.activity.HuangDiKaoShangPanelUI',_super);
	var __proto=HuangDiKaoShangPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/HuangDiKaoShangPanel");
	}

	return HuangDiKaoShangPanelUI;
})(View)


//class ui.mobile.activity.lianyuAct.LianyuActPanelUI extends laya.ui.View
var LianyuActPanelUI=(function(_super){
	function LianyuActPanelUI(){
		this.bg=null;
		this.bg0=null;
		this.list_box=null;
		this.tabBtn=null;
		this.view_box=null;
		this.closeBtn=null;
		this.title=null;
		LianyuActPanelUI.__super.call(this);
	}

	__class(LianyuActPanelUI,'ui.mobile.activity.lianyuAct.LianyuActPanelUI',_super);
	var __proto=LianyuActPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/lianyuAct/LianyuActPanel");
	}

	return LianyuActPanelUI;
})(View)


//class ui.mobile.activity.lianyuAct.LianyuActRankPanelUI extends laya.ui.View
var LianyuActRankPanelUI=(function(_super){
	function LianyuActRankPanelUI(){
		this.bg=null;
		this.title=null;
		this.closeBtn=null;
		this.list_box=null;
		this.cost_txt=null;
		this.rank_num=null;
		LianyuActRankPanelUI.__super.call(this);
	}

	__class(LianyuActRankPanelUI,'ui.mobile.activity.lianyuAct.LianyuActRankPanelUI',_super);
	var __proto=LianyuActRankPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/lianyuAct/LianyuActRankPanel");
	}

	return LianyuActRankPanelUI;
})(View)


//class ui.mobile.activity.lianyuAct.LianyuActRewardPanelUI extends laya.ui.View
var LianyuActRewardPanelUI=(function(_super){
	function LianyuActRewardPanelUI(){
		this.bg=null;
		this.title=null;
		this.closeBtn=null;
		this.list_box=null;
		this.cost_txt=null;
		LianyuActRewardPanelUI.__super.call(this);
	}

	__class(LianyuActRewardPanelUI,'ui.mobile.activity.lianyuAct.LianyuActRewardPanelUI',_super);
	var __proto=LianyuActRewardPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/lianyuAct/LianyuActRewardPanel");
	}

	return LianyuActRewardPanelUI;
})(View)


//class ui.mobile.activity.LimitTargetPanelUI extends laya.ui.View
var LimitTargetPanelUI=(function(_super){
	function LimitTargetPanelUI(){
		this.bg=null;
		this.txt=null;
		this.btn=null;
		this.closeBtn=null;
		this.yin=null;
		this.buy_box=null;
		this.buy_btn=null;
		this.buy_img=null;
		LimitTargetPanelUI.__super.call(this);
	}

	__class(LimitTargetPanelUI,'ui.mobile.activity.LimitTargetPanelUI',_super);
	var __proto=LimitTargetPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/LimitTargetPanel");
	}

	return LimitTargetPanelUI;
})(View)


//class ui.mobile.activity.LingChongLaiXiPanelUI extends laya.ui.View
var LingChongLaiXiPanelUI=(function(_super){
	function LingChongLaiXiPanelUI(){
		this.bg=null;
		this.imgBody=null;
		this.imgName1=null;
		this.imgName2=null;
		this.imgTQ=null;
		this.imgZuan=null;
		this.closeBtn=null;
		this.oldPrice_txt=null;
		this.time_txt=null;
		this.imgGot1=null;
		this.imgGot2=null;
		this.btn_1=null;
		this.btn_2=null;
		this.attrNode1=null;
		this.attrNode2=null;
		LingChongLaiXiPanelUI.__super.call(this);
	}

	__class(LingChongLaiXiPanelUI,'ui.mobile.activity.LingChongLaiXiPanelUI',_super);
	var __proto=LingChongLaiXiPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/LingChongLaiXiPanel");
	}

	return LingChongLaiXiPanelUI;
})(View)


//class ui.mobile.activity.mibaoAct.MiBaoActPanelUI extends laya.ui.View
var MiBaoActPanelUI=(function(_super){
	function MiBaoActPanelUI(){
		this.bg0=null;
		this.list_box=null;
		this.tabBtn=null;
		this.view_box=null;
		this.title=null;
		this.closeBtn=null;
		this.trim_img=null;
		MiBaoActPanelUI.__super.call(this);
	}

	__class(MiBaoActPanelUI,'ui.mobile.activity.mibaoAct.MiBaoActPanelUI',_super);
	var __proto=MiBaoActPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/mibaoAct/MiBaoActPanel");
	}

	return MiBaoActPanelUI;
})(View)


//class ui.mobile.activity.mibaoAct.milu.MiluSelectRewardPanelUI extends laya.ui.View
var MiluSelectRewardPanelUI=(function(_super){
	function MiluSelectRewardPanelUI(){
		this.left_btn=null;
		this.right_btn=null;
		this.btn=null;
		this.closeBtn=null;
		this.txt=null;
		this.tablist=null;
		this.itemlist=null;
		MiluSelectRewardPanelUI.__super.call(this);
	}

	__class(MiluSelectRewardPanelUI,'ui.mobile.activity.mibaoAct.milu.MiluSelectRewardPanelUI',_super);
	var __proto=MiluSelectRewardPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/mibaoAct/milu/MiluSelectRewardPanel");
	}

	return MiluSelectRewardPanelUI;
})(View)


//class ui.mobile.activity.qingdian.GongceQingdianPanelUI extends laya.ui.View
var GongceQingdianPanelUI=(function(_super){
	function GongceQingdianPanelUI(){
		this.bg=null;
		this.bg0=null;
		this.tabBtn=null;
		this.closeBtn=null;
		this.title=null;
		GongceQingdianPanelUI.__super.call(this);
	}

	__class(GongceQingdianPanelUI,'ui.mobile.activity.qingdian.GongceQingdianPanelUI',_super);
	var __proto=GongceQingdianPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qingdian/GongceQingdianPanel");
	}

	return GongceQingdianPanelUI;
})(View)


//class ui.mobile.activity.qixiAct.QixiActAlertPanelUI extends laya.ui.View
var QixiActAlertPanelUI=(function(_super){
	function QixiActAlertPanelUI(){
		this.window=null;
		this.txt=null;
		this.ok_btn=null;
		this.cancel_btn=null;
		this.title_img=null;
		QixiActAlertPanelUI.__super.call(this);
	}

	__class(QixiActAlertPanelUI,'ui.mobile.activity.qixiAct.QixiActAlertPanelUI',_super);
	var __proto=QixiActAlertPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qixiAct/QixiActAlertPanel");
	}

	return QixiActAlertPanelUI;
})(View)


//class ui.mobile.activity.qixiAct.QixiActPanelUI extends laya.ui.View
var QixiActPanelUI=(function(_super){
	function QixiActPanelUI(){
		this.bg=null;
		this.bg0=null;
		this.list_box=null;
		this.tabBtn=null;
		this.view_box=null;
		this.closeBtn=null;
		this.title=null;
		this.trim_img=null;
		QixiActPanelUI.__super.call(this);
	}

	__class(QixiActPanelUI,'ui.mobile.activity.qixiAct.QixiActPanelUI',_super);
	var __proto=QixiActPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qixiAct/QixiActPanel");
	}

	return QixiActPanelUI;
})(View)


//class ui.mobile.activity.qiyuAct.QiyuActPanelUI extends laya.ui.View
var QiyuActPanelUI=(function(_super){
	function QiyuActPanelUI(){
		this.bg=null;
		this.bg0=null;
		this.list_box=null;
		this.tabBtn=null;
		this.view_box=null;
		this.closeBtn=null;
		this.title=null;
		QiyuActPanelUI.__super.call(this);
	}

	__class(QiyuActPanelUI,'ui.mobile.activity.qiyuAct.QiyuActPanelUI',_super);
	var __proto=QiyuActPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/qiyuAct/QiyuActPanel");
	}

	return QiyuActPanelUI;
})(View)


//class ui.mobile.activity.rename.RenameServerRankPanelUI extends laya.ui.View
var RenameServerRankPanelUI=(function(_super){
	function RenameServerRankPanelUI(){
		this.window=null;
		this.list=null;
		this.money_txt=null;
		this.no_txt=null;
		RenameServerRankPanelUI.__super.call(this);
	}

	__class(RenameServerRankPanelUI,'ui.mobile.activity.rename.RenameServerRankPanelUI',_super);
	var __proto=RenameServerRankPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window5UI",Window5UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/rename/RenameServerRankPanel");
	}

	return RenameServerRankPanelUI;
})(View)


//class ui.mobile.activity.SaveGamePanelUI extends laya.ui.View
var SaveGamePanelUI=(function(_super){
	function SaveGamePanelUI(){
		this.bg=null;
		this.btn=null;
		this.closeBtn=null;
		SaveGamePanelUI.__super.call(this);
	}

	__class(SaveGamePanelUI,'ui.mobile.activity.SaveGamePanelUI',_super);
	var __proto=SaveGamePanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/SaveGamePanel");
	}

	return SaveGamePanelUI;
})(View)


//class ui.mobile.activity.SevenFengshen.SevenFangshenPanelUI extends laya.ui.View
var SevenFangshenPanelUI=(function(_super){
	function SevenFangshenPanelUI(){
		this.rr_box=null;
		this.rr_bg=null;
		this.rr_list=null;
		this.window=null;
		this.taskBox=null;
		this.taskSp=null;
		this.finishFont=null;
		this.leftTitle=null;
		this.rightTitle=null;
		this.closeBtn=null;
		this.left_btn=null;
		this.right_btn=null;
		this.box_lock2=null;
		this.lock=null;
		this.g_txt2=null;
		this.txt_cost=null;
		this.btn_restart=null;
		this.g_txt2Desc=null;
		this.r_box=null;
		this.r_descTxt=null;
		this.r_ruleTxt=null;
		this.r_timeTxt=null;
		this.r_btn=null;
		this.txt=null;
		this.tabs=null;
		this.title=null;
		this.skillTxt=null;
		this.skillDescTxt=null;
		this.rank_box=null;
		this.rank_txt=null;
		this.btn_rank=null;
		SevenFangshenPanelUI.__super.call(this);
	}

	__class(SevenFangshenPanelUI,'ui.mobile.activity.SevenFengshen.SevenFangshenPanelUI',_super);
	var __proto=SevenFangshenPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/SevenFengshen/SevenFangshenPanel");
	}

	return SevenFangshenPanelUI;
})(View)


//class ui.mobile.activity.shabake.JQSbkPanelUI extends laya.ui.View
var JQSbkPanelUI=(function(_super){
	function JQSbkPanelUI(){
		this.window=null;
		this.bg=null;
		this.p_list=null;
		this.tabs=null;
		this.btnGo=null;
		this.timeTxt=null;
		this.title=null;
		this.l_border=null;
		this.r_border=null;
		this.yilingqu=null;
		this.l_btn=null;
		this.r_btn=null;
		JQSbkPanelUI.__super.call(this);
	}

	__class(JQSbkPanelUI,'ui.mobile.activity.shabake.JQSbkPanelUI',_super);
	var __proto=JQSbkPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/shabake/JQSbkPanel");
	}

	return JQSbkPanelUI;
})(View)


//class ui.mobile.activity.ShenjiaLaixiPanelUI extends laya.ui.View
var ShenjiaLaixiPanelUI=(function(_super){
	function ShenjiaLaixiPanelUI(){
		this.bg=null;
		this.fontImg=null;
		this.btn=null;
		this.icon0=null;
		this.txt0=null;
		this.btnLink0=null;
		this.yiwancheng0=null;
		this.icon1=null;
		this.txt1=null;
		this.btnLink1=null;
		this.yiwancheng1=null;
		this.icon2=null;
		this.txt2=null;
		this.btnLink2=null;
		this.yiwancheng2=null;
		this.icon3=null;
		this.txt3=null;
		this.btnLink3=null;
		this.yiwancheng3=null;
		this.timeTxt=null;
		this.yilingqu=null;
		this.closeBtn=null;
		this.finishTxt=null;
		this.grid=null;
		ShenjiaLaixiPanelUI.__super.call(this);
	}

	__class(ShenjiaLaixiPanelUI,'ui.mobile.activity.ShenjiaLaixiPanelUI',_super);
	var __proto=ShenjiaLaixiPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/ShenjiaLaixiPanel");
	}

	return ShenjiaLaixiPanelUI;
})(View)


//class ui.mobile.activity.ShenqiGiftPanelUI extends laya.ui.View
var ShenqiGiftPanelUI=(function(_super){
	function ShenqiGiftPanelUI(){
		this.bg=null;
		this.btnGet=null;
		this.closeBtn=null;
		this.img_font=null;
		this.img_name=null;
		this.txt=null;
		this.yilingqu=null;
		this.timeTxt=null;
		ShenqiGiftPanelUI.__super.call(this);
	}

	__class(ShenqiGiftPanelUI,'ui.mobile.activity.ShenqiGiftPanelUI',_super);
	var __proto=ShenqiGiftPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/ShenqiGiftPanel");
	}

	return ShenqiGiftPanelUI;
})(View)


//class ui.mobile.activity.shouchong.JiaShouchongPanelUI extends laya.ui.View
var JiaShouchongPanelUI=(function(_super){
	function JiaShouchongPanelUI(){
		this.bg=null;
		this.desc_img=null;
		this.font_img=null;
		this.day0=null;
		this.day1=null;
		this.day2=null;
		this.day3=null;
		this.day4=null;
		this.day5=null;
		this.day6=null;
		this.btn=null;
		this.closeBtn=null;
		this.yilingqu=null;
		this.desc_txt=null;
		this.tabbox=null;
		this.btn0=null;
		this.btn1=null;
		this.btn2=null;
		this.jb0=null;
		this.jb1=null;
		this.jb2=null;
		this.btnZanzhu=null;
		JiaShouchongPanelUI.__super.call(this);
	}

	__class(JiaShouchongPanelUI,'ui.mobile.activity.shouchong.JiaShouchongPanelUI',_super);
	var __proto=JiaShouchongPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/shouchong/JiaShouchongPanel");
	}

	return JiaShouchongPanelUI;
})(View)


//class ui.mobile.activity.SongShenjiPanelUI extends laya.ui.View
var SongShenjiPanelUI=(function(_super){
	function SongShenjiPanelUI(){
		this.bg=null;
		this.btnGet=null;
		this.skillTxt=null;
		this.finishTxt=null;
		this.timeTxt=null;
		this.yilingqu=null;
		this.closeBtn=null;
		this.t_list=null;
		SongShenjiPanelUI.__super.call(this);
	}

	__class(SongShenjiPanelUI,'ui.mobile.activity.SongShenjiPanelUI',_super);
	var __proto=SongShenjiPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/SongShenjiPanel");
	}

	return SongShenjiPanelUI;
})(View)


//class ui.mobile.activity.tanbao_cs.TanbaoBCPanelUI extends laya.ui.View
var TanbaoBCPanelUI=(function(_super){
	function TanbaoBCPanelUI(){
		this.bg=null;
		this.timeTxt=null;
		this.cishuTxt=null;
		this.o_txt=null;
		this.o_icon=null;
		this.p_txt=null;
		this.p_icon=null;
		this.btnGet=null;
		this.closeBtn=null;
		TanbaoBCPanelUI.__super.call(this);
	}

	__class(TanbaoBCPanelUI,'ui.mobile.activity.tanbao_cs.TanbaoBCPanelUI',_super);
	var __proto=TanbaoBCPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/tanbao_cs/TanbaoBCPanel");
	}

	return TanbaoBCPanelUI;
})(View)


//class ui.mobile.activity.tanbao_cs.TanbaoCSPanelUI extends laya.ui.View
var TanbaoCSPanelUI=(function(_super){
	function TanbaoCSPanelUI(){
		this.bg=null;
		this.p_tabs=null;
		this.tabs=null;
		this.closeBtn=null;
		TanbaoCSPanelUI.__super.call(this);
	}

	__class(TanbaoCSPanelUI,'ui.mobile.activity.tanbao_cs.TanbaoCSPanelUI',_super);
	var __proto=TanbaoCSPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/tanbao_cs/TanbaoCSPanel");
	}

	return TanbaoCSPanelUI;
})(View)


//class ui.mobile.activity.tejieJuexing.TejieJuexingPanelUI extends laya.ui.View
var TejieJuexingPanelUI=(function(_super){
	function TejieJuexingPanelUI(){
		this.bg=null;
		this.title=null;
		this.l_panel=null;
		this.tab=null;
		this.desc_img=null;
		this.closeBtn=null;
		this.btn_buy=null;
		this.imgGot=null;
		this.effect_box=null;
		this.name_img=null;
		this.item_bg=null;
		this.item_box=null;
		this.tiem_txt=null;
		this.skill_box=null;
		this.skill_bg=null;
		this.goto_skill=null;
		TejieJuexingPanelUI.__super.call(this);
	}

	__class(TejieJuexingPanelUI,'ui.mobile.activity.tejieJuexing.TejieJuexingPanelUI',_super);
	var __proto=TejieJuexingPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/tejieJuexing/TejieJuexingPanel");
	}

	return TejieJuexingPanelUI;
})(View)


//class ui.mobile.activity.TequanSkillPanelUI extends laya.ui.View
var TequanSkillPanelUI=(function(_super){
	function TequanSkillPanelUI(){
		this.bg=null;
		this.book_img=null;
		this.desc_img=null;
		this.noactive_img=null;
		this.closeBtn=null;
		this.jihuo2=null;
		this.jihuo1=null;
		this.yijihuo=null;
		this.timeTxt=null;
		this.btn=null;
		TequanSkillPanelUI.__super.call(this);
	}

	__class(TequanSkillPanelUI,'ui.mobile.activity.TequanSkillPanelUI',_super);
	var __proto=TequanSkillPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/TequanSkillPanel");
	}

	return TequanSkillPanelUI;
})(View)


//class ui.mobile.activity.TuBiaoShouNaPanelUI extends laya.ui.View
var TuBiaoShouNaPanelUI=(function(_super){
	function TuBiaoShouNaPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.title_txt=null;
		this.btnPanel=null;
		this.storagePanel=null;
		this.txt1=null;
		this.txt2=null;
		TuBiaoShouNaPanelUI.__super.call(this);
	}

	__class(TuBiaoShouNaPanelUI,'ui.mobile.activity.TuBiaoShouNaPanelUI',_super);
	var __proto=TuBiaoShouNaPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/TuBiaoShouNaPanel");
	}

	return TuBiaoShouNaPanelUI;
})(View)


//class ui.mobile.activity.WeiDuanDownloadPanelUI extends laya.ui.View
var WeiDuanDownloadPanelUI=(function(_super){
	function WeiDuanDownloadPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.btn=null;
		this.item_box=null;
		WeiDuanDownloadPanelUI.__super.call(this);
	}

	__class(WeiDuanDownloadPanelUI,'ui.mobile.activity.WeiDuanDownloadPanelUI',_super);
	var __proto=WeiDuanDownloadPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/WeiDuanDownloadPanel");
	}

	return WeiDuanDownloadPanelUI;
})(View)


//class ui.mobile.activity.ZanzhuDoublePanelUI extends laya.ui.View
var ZanzhuDoublePanelUI=(function(_super){
	function ZanzhuDoublePanelUI(){
		this.bg=null;
		this.title=null;
		this.closeBtn=null;
		this.tabs=null;
		this.btn=null;
		this.imgFont1=null;
		this.imgFont2=null;
		this.yibuy=null;
		ZanzhuDoublePanelUI.__super.call(this);
	}

	__class(ZanzhuDoublePanelUI,'ui.mobile.activity.ZanzhuDoublePanelUI',_super);
	var __proto=ZanzhuDoublePanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/ZanzhuDoublePanel");
	}

	return ZanzhuDoublePanelUI;
})(View)


//class ui.mobile.activity.zanzhuhaoli.ZanZhuHaoLiPanelUI extends laya.ui.View
var ZanZhuHaoLiPanelUI=(function(_super){
	function ZanZhuHaoLiPanelUI(){
		this.bg=null;
		this.arrow=null;
		this.imgGot=null;
		this.imgName2=null;
		this.imgDes1=null;
		this.imgDes2=null;
		this.imgName1=null;
		this.closeBtn=null;
		this.btn_buy=null;
		this.gridNode=null;
		this.effectNode1=null;
		this.effectNode2=null;
		this.petBtn=null;
		this.petTxt=null;
		this.tabs_recharge=null;
		this.tabs_day=null;
		ZanZhuHaoLiPanelUI.__super.call(this);
	}

	__class(ZanZhuHaoLiPanelUI,'ui.mobile.activity.zanzhuhaoli.ZanZhuHaoLiPanelUI',_super);
	var __proto=ZanZhuHaoLiPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/zanzhuhaoli/ZanZhuHaoLiPanel");
	}

	return ZanZhuHaoLiPanelUI;
})(View)


//class ui.mobile.activity.zhanqu.RizhiPanelUI extends laya.ui.View
var RizhiPanelUI=(function(_super){
	function RizhiPanelUI(){
		this.window=null;
		this.title=null;
		this._panel=null;
		RizhiPanelUI.__super.call(this);
	}

	__class(RizhiPanelUI,'ui.mobile.activity.zhanqu.RizhiPanelUI',_super);
	var __proto=RizhiPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window4UI",Window4UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/zhanqu/RizhiPanel");
	}

	return RizhiPanelUI;
})(View)


//class ui.mobile.activity.zhanqu.ZhanquPanelUI extends laya.ui.View
var ZhanquPanelUI=(function(_super){
	function ZhanquPanelUI(){
		this.viewContainer=null;
		this.bg=null;
		this.l_panel=null;
		this.tab=null;
		this.closeBtn=null;
		this.closeBtn2=null;
		this.imgTitle=null;
		ZhanquPanelUI.__super.call(this);
	}

	__class(ZhanquPanelUI,'ui.mobile.activity.zhanqu.ZhanquPanelUI',_super);
	var __proto=ZhanquPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/zhanqu/ZhanquPanel");
	}

	return ZhanquPanelUI;
})(View)


//class ui.mobile.activity.zhanqu.ZhanquResultPanelUI extends laya.ui.View
var ZhanquResultPanelUI=(function(_super){
	function ZhanquResultPanelUI(){
		this.bg=null;
		this.title=null;
		this.nameImg=null;
		this.times=null;
		this.closeBtn=null;
		this._panel=null;
		ZhanquResultPanelUI.__super.call(this);
	}

	__class(ZhanquResultPanelUI,'ui.mobile.activity.zhanqu.ZhanquResultPanelUI',_super);
	var __proto=ZhanquResultPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/zhanqu/ZhanquResultPanel");
	}

	return ZhanquResultPanelUI;
})(View)


//class ui.mobile.activity.ZhaocaiPanelUI extends laya.ui.View
var ZhaocaiPanelUI=(function(_super){
	function ZhaocaiPanelUI(){
		this.bg=null;
		this.clickBox=null;
		this.m_price=null;
		this.m_icon=null;
		this.maxTxt=null;
		this.btn=null;
		this.closeBtn=null;
		this.logTxt=null;
		this.txt=null;
		this.ruleTxt=null;
		this.timeTxt=null;
		this.icon0=null;
		this.beishu0=null;
		this.icon1=null;
		this.beishu1=null;
		this.icon2=null;
		this.beishu2=null;
		this.icon3=null;
		this.beishu3=null;
		this.icon4=null;
		this.beishu4=null;
		this.arrow=null;
		this.yilingqu0=null;
		this.yilingqu1=null;
		this.yilingqu2=null;
		this.yilingqu3=null;
		this.yilingqu4=null;
		ZhaocaiPanelUI.__super.call(this);
	}

	__class(ZhaocaiPanelUI,'ui.mobile.activity.ZhaocaiPanelUI',_super);
	var __proto=ZhaocaiPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/ZhaocaiPanel");
	}

	return ZhaocaiPanelUI;
})(View)


//class ui.mobile.activity.zhigou.LuckyZhiGouPanelUI extends laya.ui.View
var LuckyZhiGouPanelUI=(function(_super){
	function LuckyZhiGouPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.imgTitle=null;
		this.money_txt=null;
		this.btn=null;
		LuckyZhiGouPanelUI.__super.call(this);
	}

	__class(LuckyZhiGouPanelUI,'ui.mobile.activity.zhigou.LuckyZhiGouPanelUI',_super);
	var __proto=LuckyZhiGouPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/zhigou/LuckyZhiGouPanel");
	}

	return LuckyZhiGouPanelUI;
})(View)


//class ui.mobile.activity.zuoqiTehui.ZuoqiTehuiPanelUI extends laya.ui.View
var ZuoqiTehuiPanelUI=(function(_super){
	function ZuoqiTehuiPanelUI(){
		this.bg=null;
		this.eff_box=null;
		this.tip_img=null;
		this.name_bg=null;
		this.name_img=null;
		this.item_box=null;
		this.btn=null;
		this.desc_img=null;
		this.need_box=null;
		this.moneyIcon=null;
		this.moneyNum=null;
		this.getted=null;
		this.closeBtn=null;
		ZuoqiTehuiPanelUI.__super.call(this);
	}

	__class(ZuoqiTehuiPanelUI,'ui.mobile.activity.zuoqiTehui.ZuoqiTehuiPanelUI',_super);
	var __proto=ZuoqiTehuiPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity/zuoqiTehui/ZuoqiTehuiPanel");
	}

	return ZuoqiTehuiPanelUI;
})(View)


//class ui.mobile.activity_xcq.hongbao.HongBaoPartyPanelUI extends laya.ui.View
var HongBaoPartyPanelUI=(function(_super){
	function HongBaoPartyPanelUI(){
		this.bg=null;
		this.title=null;
		this.barBox=null;
		this.bar=null;
		this.btn_go=null;
		this.closeBtn=null;
		this.infoTxt=null;
		this.total_txt=null;
		this.reset_txt=null;
		this.timeTxt=null;
		this.tipNode=null;
		this.chenghao=null;
		this.touchNode=null;
		this.imgDes=null;
		HongBaoPartyPanelUI.__super.call(this);
	}

	__class(HongBaoPartyPanelUI,'ui.mobile.activity_xcq.hongbao.HongBaoPartyPanelUI',_super);
	var __proto=HongBaoPartyPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/hongbao/HongBaoPartyPanel");
	}

	return HongBaoPartyPanelUI;
})(View)


//class ui.mobile.activity_xcq.leichong.HuoYueZhanLingBuyPanelUI extends laya.ui.View
var HuoYueZhanLingBuyPanelUI=(function(_super){
	function HuoYueZhanLingBuyPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.btn=null;
		HuoYueZhanLingBuyPanelUI.__super.call(this);
	}

	__class(HuoYueZhanLingBuyPanelUI,'ui.mobile.activity_xcq.leichong.HuoYueZhanLingBuyPanelUI',_super);
	var __proto=HuoYueZhanLingBuyPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/HuoYueZhanLingBuyPanel");
	}

	return HuoYueZhanLingBuyPanelUI;
})(View)


//class ui.mobile.activity_xcq.leichong.KaoShangBuyPanelUI extends laya.ui.View
var KaoShangBuyPanelUI=(function(_super){
	function KaoShangBuyPanelUI(){
		this.window=null;
		this.txt=null;
		this.title_img=null;
		this.btn=null;
		this.bg_tip=null;
		this.btn_go=null;
		KaoShangBuyPanelUI.__super.call(this);
	}

	__class(KaoShangBuyPanelUI,'ui.mobile.activity_xcq.leichong.KaoShangBuyPanelUI',_super);
	var __proto=KaoShangBuyPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/KaoShangBuyPanel");
	}

	return KaoShangBuyPanelUI;
})(View)


//class ui.mobile.activity_xcq.leichong.LongHunBossRewardPanelUI extends laya.ui.View
var LongHunBossRewardPanelUI=(function(_super){
	function LongHunBossRewardPanelUI(){
		this.window=null;
		LongHunBossRewardPanelUI.__super.call(this);
	}

	__class(LongHunBossRewardPanelUI,'ui.mobile.activity_xcq.leichong.LongHunBossRewardPanelUI',_super);
	var __proto=LongHunBossRewardPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window5UI",Window5UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/LongHunBossRewardPanel");
	}

	return LongHunBossRewardPanelUI;
})(View)


//class ui.mobile.activity_xcq.leichong.ZSFuliTabUI extends laya.ui.View
var ZSFuliTabUI=(function(_super){
	function ZSFuliTabUI(){
		this.icon=null;
		this.txt=null;
		this.yilingqu=null;
		ZSFuliTabUI.__super.call(this);
	}

	__class(ZSFuliTabUI,'ui.mobile.activity_xcq.leichong.ZSFuliTabUI',_super);
	var __proto=ZSFuliTabUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/activity_xcq/leichong/ZSFuliTab");
	}

	return ZSFuliTabUI;
})(View)


//class ui.mobile.advance.AdvancePromptUI extends laya.ui.View
var AdvancePromptUI=(function(_super){
	function AdvancePromptUI(){
		this.icon=null;
		this.txt=null;
		this.btnGou=null;
		this.closeBtn=null;
		this.btn=null;
		AdvancePromptUI.__super.call(this);
	}

	__class(AdvancePromptUI,'ui.mobile.advance.AdvancePromptUI',_super);
	var __proto=AdvancePromptUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/advance/AdvancePrompt");
	}

	return AdvancePromptUI;
})(View)


//class ui.mobile.advance.HuaxingLostPanel2UI extends laya.ui.View
var HuaxingLostPanel2UI=(function(_super){
	function HuaxingLostPanel2UI(){
		this.bg=null;
		this.closeBtn=null;
		this.btnGo=null;
		HuaxingLostPanel2UI.__super.call(this);
	}

	__class(HuaxingLostPanel2UI,'ui.mobile.advance.HuaxingLostPanel2UI',_super);
	var __proto=HuaxingLostPanel2UI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/advance/HuaxingLostPanel2");
	}

	return HuaxingLostPanel2UI;
})(View)


//class ui.mobile.advance.HuaxingLostPanelUI extends laya.ui.View
var HuaxingLostPanelUI=(function(_super){
	function HuaxingLostPanelUI(){
		this.bg=null;
		this.fontImg=null;
		this.timeTxt=null;
		this.btn=null;
		this.closeBtn=null;
		this.yin=null;
		HuaxingLostPanelUI.__super.call(this);
	}

	__class(HuaxingLostPanelUI,'ui.mobile.advance.HuaxingLostPanelUI',_super);
	var __proto=HuaxingLostPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/advance/HuaxingLostPanel");
	}

	return HuaxingLostPanelUI;
})(View)


//class ui.mobile.advance.HuaxingPanelUI extends laya.ui.View
var HuaxingPanelUI=(function(_super){
	function HuaxingPanelUI(){
		this.window=null;
		this.title=null;
		this.bg=null;
		this.l_bg=null;
		this.r_panel=null;
		this.btnGubao=null;
		HuaxingPanelUI.__super.call(this);
	}

	__class(HuaxingPanelUI,'ui.mobile.advance.HuaxingPanelUI',_super);
	var __proto=HuaxingPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/advance/HuaxingPanel");
	}

	return HuaxingPanelUI;
})(View)


//class ui.mobile.advance.TitleAttrItemUI extends laya.ui.View
var TitleAttrItemUI=(function(_super){
	function TitleAttrItemUI(){
		this.nameTxt=null;
		this.valueTxt=null;
		TitleAttrItemUI.__super.call(this);
	}

	__class(TitleAttrItemUI,'ui.mobile.advance.TitleAttrItemUI',_super);
	var __proto=TitleAttrItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/advance/TitleAttrItem");
	}

	return TitleAttrItemUI;
})(View)


//class ui.mobile.advance.TitleUpgradePanelUI extends laya.ui.View
var TitleUpgradePanelUI=(function(_super){
	function TitleUpgradePanelUI(){
		this.bg_window=null;
		this.bg=null;
		this.closeBtn=null;
		this.btn_up=null;
		this.title=null;
		this.bg_cost=null;
		this.icon0=null;
		this.icon1=null;
		this.cost_txt0=null;
		this.cost_txt1=null;
		this.btn_add=null;
		this.imgMax=null;
		this.attrNode=null;
		this.nextNode=null;
		TitleUpgradePanelUI.__super.call(this);
	}

	__class(TitleUpgradePanelUI,'ui.mobile.advance.TitleUpgradePanelUI',_super);
	var __proto=TitleUpgradePanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/advance/TitleUpgradePanel");
	}

	return TitleUpgradePanelUI;
})(View)


//class ui.mobile.advance.TotalPanelUI extends laya.ui.View
var TotalPanelUI=(function(_super){
	function TotalPanelUI(){
		this.window=null;
		this.title=null;
		this.info_txt=null;
		this.item_box=null;
		this.btn=null;
		this.getted=null;
		TotalPanelUI.__super.call(this);
	}

	__class(TotalPanelUI,'ui.mobile.advance.TotalPanelUI',_super);
	var __proto=TotalPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window5UI",Window5UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/advance/TotalPanel");
	}

	return TotalPanelUI;
})(View)


//class ui.mobile.AlertPanelUI extends laya.ui.View
var AlertPanelUI=(function(_super){
	function AlertPanelUI(){
		this.window=null;
		this.cancel_txt=null;
		this.ok_txt=null;
		this.txt=null;
		this.info_txt=null;
		this.box=null;
		this.ok_btn=null;
		this.cancel_btn=null;
		this.title_img=null;
		AlertPanelUI.__super.call(this);
	}

	__class(AlertPanelUI,'ui.mobile.AlertPanelUI',_super);
	var __proto=AlertPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/AlertPanel");
	}

	return AlertPanelUI;
})(View)


//class ui.mobile.arena.ArenaCardViewUI extends laya.ui.View
var ArenaCardViewUI=(function(_super){
	function ArenaCardViewUI(){
		this.bg=null;
		this.bg2=null;
		this.des_txt=null;
		this.cardNode1=null;
		this.cardNode2=null;
		this.cardNode3=null;
		this.closeBtn=null;
		ArenaCardViewUI.__super.call(this);
	}

	__class(ArenaCardViewUI,'ui.mobile.arena.ArenaCardViewUI',_super);
	var __proto=ArenaCardViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/arena/ArenaCardView");
	}

	return ArenaCardViewUI;
})(View)


//class ui.mobile.arena.ArenaChanllengeViewUI extends laya.ui.View
var ArenaChanllengeViewUI=(function(_super){
	function ArenaChanllengeViewUI(){
		this.bg=null;
		this.imgRecommend=null;
		this.btn=null;
		this.askNode=null;
		this.closeBtn=null;
		ArenaChanllengeViewUI.__super.call(this);
	}

	__class(ArenaChanllengeViewUI,'ui.mobile.arena.ArenaChanllengeViewUI',_super);
	var __proto=ArenaChanllengeViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/arena/ArenaChanllengeView");
	}

	return ArenaChanllengeViewUI;
})(View)


//class ui.mobile.arena.ArenaListViewUI extends laya.ui.View
var ArenaListViewUI=(function(_super){
	function ArenaListViewUI(){
		this.window=null;
		this.list=null;
		this.imgTitle=null;
		ArenaListViewUI.__super.call(this);
	}

	__class(ArenaListViewUI,'ui.mobile.arena.ArenaListViewUI',_super);
	var __proto=ArenaListViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window5UI",Window5UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/arena/ArenaListView");
	}

	return ArenaListViewUI;
})(View)


//class ui.mobile.arena.ArenaMonsterViewUI extends laya.ui.View
var ArenaMonsterViewUI=(function(_super){
	function ArenaMonsterViewUI(){
		this.bg=null;
		this.bg2=null;
		this.btn=null;
		this.imgRecommend=null;
		this.closeBtn=null;
		this.imgNo=null;
		ArenaMonsterViewUI.__super.call(this);
	}

	__class(ArenaMonsterViewUI,'ui.mobile.arena.ArenaMonsterViewUI',_super);
	var __proto=ArenaMonsterViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/arena/ArenaMonsterView");
	}

	return ArenaMonsterViewUI;
})(View)


//class ui.mobile.arena.ArenaQuestionViewUI extends laya.ui.View
var ArenaQuestionViewUI=(function(_super){
	function ArenaQuestionViewUI(){
		this.bg=null;
		this.bg2=null;
		this.item0=null;
		this.item1=null;
		this.item2=null;
		this.item3=null;
		this.imgSelected=null;
		this.des_txt=null;
		this.question_txt=null;
		this.answer_txt1=null;
		this.answer_txt2=null;
		this.answer_txt3=null;
		this.answer_txt4=null;
		this.imgTrue=null;
		this.imgFalse=null;
		this.closeBtn=null;
		ArenaQuestionViewUI.__super.call(this);
	}

	__class(ArenaQuestionViewUI,'ui.mobile.arena.ArenaQuestionViewUI',_super);
	var __proto=ArenaQuestionViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/arena/ArenaQuestionView");
	}

	return ArenaQuestionViewUI;
})(View)


//class ui.mobile.arena.ArenaRankRewardViewUI extends laya.ui.View
var ArenaRankRewardViewUI=(function(_super){
	function ArenaRankRewardViewUI(){
		this.window=null;
		this.imgTitle=null;
		this.list=null;
		ArenaRankRewardViewUI.__super.call(this);
	}

	__class(ArenaRankRewardViewUI,'ui.mobile.arena.ArenaRankRewardViewUI',_super);
	var __proto=ArenaRankRewardViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window5UI",Window5UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/arena/ArenaRankRewardView");
	}

	return ArenaRankRewardViewUI;
})(View)


//class ui.mobile.arena.ArenaResultViewUI extends laya.ui.View
var ArenaResultViewUI=(function(_super){
	function ArenaResultViewUI(){
		this.bg=null;
		this.imgTitle=null;
		this.des_txt=null;
		this.btn=null;
		this.time_txt=null;
		ArenaResultViewUI.__super.call(this);
	}

	__class(ArenaResultViewUI,'ui.mobile.arena.ArenaResultViewUI',_super);
	var __proto=ArenaResultViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/arena/ArenaResultView");
	}

	return ArenaResultViewUI;
})(View)


//class ui.mobile.arena.ArenaRewardViewUI extends laya.ui.View
var ArenaRewardViewUI=(function(_super){
	function ArenaRewardViewUI(){
		this.bg=null;
		this.imgTitle=null;
		this.time_txt=null;
		ArenaRewardViewUI.__super.call(this);
	}

	__class(ArenaRewardViewUI,'ui.mobile.arena.ArenaRewardViewUI',_super);
	var __proto=ArenaRewardViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/arena/ArenaRewardView");
	}

	return ArenaRewardViewUI;
})(View)


//class ui.mobile.arena.ArenaSecretViewUI extends laya.ui.View
var ArenaSecretViewUI=(function(_super){
	function ArenaSecretViewUI(){
		this.bg=null;
		this.bg2=null;
		this.btn=null;
		this.icon=null;
		this.closeBtn=null;
		this.money_txt=null;
		ArenaSecretViewUI.__super.call(this);
	}

	__class(ArenaSecretViewUI,'ui.mobile.arena.ArenaSecretViewUI',_super);
	var __proto=ArenaSecretViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/arena/ArenaSecretView");
	}

	return ArenaSecretViewUI;
})(View)


//class ui.mobile.bag.BagFreeUseTipUI extends laya.ui.View
var BagFreeUseTipUI=(function(_super){
	function BagFreeUseTipUI(){
		this.bg=null;
		BagFreeUseTipUI.__super.call(this);
	}

	__class(BagFreeUseTipUI,'ui.mobile.bag.BagFreeUseTipUI',_super);
	var __proto=BagFreeUseTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/bag/BagFreeUseTip");
	}

	return BagFreeUseTipUI;
})(View)


//class ui.mobile.bag.BagFullTipPanel2UI extends laya.ui.View
var BagFullTipPanel2UI=(function(_super){
	function BagFullTipPanel2UI(){
		this.window=null;
		this.title_img=null;
		this.tip_txt=null;
		this.npcBtn=null;
		this.tequanBtn=null;
		this.tiyanTxt=null;
		this.box2=null;
		this.npc_btn=null;
		this.feixie_btn=null;
		this.box1=null;
		this.open_txt2=null;
		this.zan_btn=null;
		BagFullTipPanel2UI.__super.call(this);
	}

	__class(BagFullTipPanel2UI,'ui.mobile.bag.BagFullTipPanel2UI',_super);
	var __proto=BagFullTipPanel2UI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/bag/BagFullTipPanel2");
	}

	return BagFullTipPanel2UI;
})(View)


//class ui.mobile.bag.BagPanelUI extends laya.ui.View
var BagPanelUI=(function(_super){
	function BagPanelUI(){
		this.bg=null;
		this.tab=null;
		this.box_yuanbao=null;
		this.yuanbao_txt=null;
		this.box_jinbi=null;
		this.jinbi_txt=null;
		this.box_tulong=null;
		this.tulong_txt=null;
		this.xianshi_box=null;
		this.xianshibg=null;
		this.close_btn=null;
		this.xianshi_btn=null;
		this.open_btn=null;
		this.free_txt=null;
		this.free_tip=null;
		this.count_txt=null;
		this.pageTab=null;
		this.depot_btn=null;
		this.tidy_btn=null;
		this.huishou_btn=null;
		this.closeBtn=null;
		this.drug_ck=null;
		this.exp_ck=null;
		this.ronglian_btn=null;
		this.ronglian_point=null;
		this.ronglian_txt=null;
		this.free_btn=null;
		this.qipao=null;
		this.closeBtn2=null;
		this.btnBaitan=null;
		BagPanelUI.__super.call(this);
	}

	__class(BagPanelUI,'ui.mobile.bag.BagPanelUI',_super);
	var __proto=BagPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/bag/BagPanel");
	}

	return BagPanelUI;
})(View)


//class ui.mobile.bag.ChaojiBaowuPanelUI extends laya.ui.View
var ChaojiBaowuPanelUI=(function(_super){
	function ChaojiBaowuPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.btn=null;
		ChaojiBaowuPanelUI.__super.call(this);
	}

	__class(ChaojiBaowuPanelUI,'ui.mobile.bag.ChaojiBaowuPanelUI',_super);
	var __proto=ChaojiBaowuPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/bag/ChaojiBaowuPanel");
	}

	return ChaojiBaowuPanelUI;
})(View)


//class ui.mobile.bag.ChooseGiftPanelUI extends laya.ui.View
var ChooseGiftPanelUI=(function(_super){
	function ChooseGiftPanelUI(){
		this.bg=null;
		this.btn_add_10=null;
		this.btn_add=null;
		this.btn_reduce=null;
		this.btn_reduce_10=null;
		this.btn_max=null;
		this.name_txt=null;
		this.btn_sure=null;
		this.btn_cancel=null;
		this.num_txt=null;
		this.gridPanel=null;
		this.selectImg=null;
		ChooseGiftPanelUI.__super.call(this);
	}

	__class(ChooseGiftPanelUI,'ui.mobile.bag.ChooseGiftPanelUI',_super);
	var __proto=ChooseGiftPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/bag/ChooseGiftPanel");
	}

	return ChooseGiftPanelUI;
})(View)


//class ui.mobile.bag.DepotPanelUI extends laya.ui.View
var DepotPanelUI=(function(_super){
	function DepotPanelUI(){
		this.window=null;
		this.bg=null;
		this.title=null;
		this.count_txt=null;
		this.tidy_btn=null;
		this.pageTab=null;
		this.prev_btn=null;
		this.next_btn=null;
		DepotPanelUI.__super.call(this);
	}

	__class(DepotPanelUI,'ui.mobile.bag.DepotPanelUI',_super);
	var __proto=DepotPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window2UI",Window2UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/bag/DepotPanel");
	}

	return DepotPanelUI;
})(View)


//class ui.mobile.bag.DropPanelUI extends laya.ui.View
var DropPanelUI=(function(_super){
	function DropPanelUI(){
		this.window=null;
		this.title=null;
		this.grid=null;
		this.cancel_btn=null;
		this.ok_btn=null;
		this.content_txt=null;
		this.name_txt=null;
		DropPanelUI.__super.call(this);
	}

	__class(DropPanelUI,'ui.mobile.bag.DropPanelUI',_super);
	var __proto=DropPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/bag/DropPanel");
	}

	return DropPanelUI;
})(View)


//class ui.mobile.bag.GiftUseAlertUI extends laya.ui.View
var GiftUseAlertUI=(function(_super){
	function GiftUseAlertUI(){
		this.window=null;
		this.descTxt=null;
		this.nameTxt=null;
		this.btn=null;
		this.txt=null;
		GiftUseAlertUI.__super.call(this);
	}

	__class(GiftUseAlertUI,'ui.mobile.bag.GiftUseAlertUI',_super);
	var __proto=GiftUseAlertUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/bag/GiftUseAlert");
	}

	return GiftUseAlertUI;
})(View)


//class ui.mobile.bag.HuigouPanelUI extends laya.ui.View
var HuigouPanelUI=(function(_super){
	function HuigouPanelUI(){
		this.bg=null;
		this.desc_txt=null;
		this.sell_box=null;
		this.sell_img=null;
		this.sell_txt=null;
		this.closeBtn=null;
		this.title=null;
		HuigouPanelUI.__super.call(this);
	}

	__class(HuigouPanelUI,'ui.mobile.bag.HuigouPanelUI',_super);
	var __proto=HuigouPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/bag/HuigouPanel");
	}

	return HuigouPanelUI;
})(View)


//class ui.mobile.bag.huishou.HuishouAutoPanelUI extends laya.ui.View
var HuishouAutoPanelUI=(function(_super){
	function HuishouAutoPanelUI(){
		this.bg=null;
		this.imgFont=null;
		this.closeBtn=null;
		HuishouAutoPanelUI.__super.call(this);
	}

	__class(HuishouAutoPanelUI,'ui.mobile.bag.huishou.HuishouAutoPanelUI',_super);
	var __proto=HuishouAutoPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/bag/huishou/HuishouAutoPanel");
	}

	return HuishouAutoPanelUI;
})(View)


//class ui.mobile.bag.huishou.HuishouItemUI extends laya.ui.View
var HuishouItemUI=(function(_super){
	function HuishouItemUI(){
		this.txt=null;
		this.ck=null;
		this.combo=null;
		HuishouItemUI.__super.call(this);
	}

	__class(HuishouItemUI,'ui.mobile.bag.huishou.HuishouItemUI',_super);
	var __proto=HuishouItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/bag/huishou/HuishouItem");
	}

	return HuishouItemUI;
})(View)


//class ui.mobile.bag.huishou.HuishouPanelUI extends laya.ui.View
var HuishouPanelUI=(function(_super){
	function HuishouPanelUI(){
		this.window=null;
		this.bg=null;
		this.tab1=null;
		this.tab2=null;
		this.line0=null;
		this.line1=null;
		this.line2=null;
		this.line3=null;
		this.line4=null;
		this.line5=null;
		this.line6=null;
		this.line7=null;
		this.btn=null;
		this.auto_check=null;
		this.left_btn=null;
		this.right_btn=null;
		this.result_txt=null;
		this.tiyanTxt=null;
		this.title_txt1=null;
		this.title_txt2=null;
		this.condition_txt=null;
		this.box2=null;
		this.box1=null;
		this.ck0=null;
		this.ck1=null;
		this.ck3=null;
		this.ck2=null;
		this.ck4=null;
		this.ck5=null;
		this.ck7=null;
		this.ck6=null;
		this.ck8=null;
		this.ck9=null;
		this.ck11=null;
		this.ck10=null;
		this.ck12=null;
		this.ck13=null;
		this.ck15=null;
		this.ck14=null;
		this.guide=null;
		this.gtime_txt=null;
		HuishouPanelUI.__super.call(this);
	}

	__class(HuishouPanelUI,'ui.mobile.bag.huishou.HuishouPanelUI',_super);
	var __proto=HuishouPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window2UI",Window2UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/bag/huishou/HuishouPanel");
	}

	return HuishouPanelUI;
})(View)


//class ui.mobile.bag.huishou.HuishouResultPanelUI extends laya.ui.View
var HuishouResultPanelUI=(function(_super){
	function HuishouResultPanelUI(){
		this.bg=null;
		this.ck=null;
		this.closeBtn=null;
		this.time_txt=null;
		this.txt=null;
		this.yin=null;
		HuishouResultPanelUI.__super.call(this);
	}

	__class(HuishouResultPanelUI,'ui.mobile.bag.huishou.HuishouResultPanelUI',_super);
	var __proto=HuishouResultPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/bag/huishou/HuishouResultPanel");
	}

	return HuishouResultPanelUI;
})(View)


//class ui.mobile.bag.huishou.HuishouTipItemUI extends laya.ui.View
var HuishouTipItemUI=(function(_super){
	function HuishouTipItemUI(){
		this.txt=null;
		this.name_txt=null;
		HuishouTipItemUI.__super.call(this);
	}

	__class(HuishouTipItemUI,'ui.mobile.bag.huishou.HuishouTipItemUI',_super);
	var __proto=HuishouTipItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/bag/huishou/HuishouTipItem");
	}

	return HuishouTipItemUI;
})(View)


//class ui.mobile.bag.ItemUseAlertUI extends laya.ui.View
var ItemUseAlertUI=(function(_super){
	function ItemUseAlertUI(){
		this.window=null;
		this.bg=null;
		this.bg2=null;
		this.btn=null;
		this.des_txt=null;
		this.time_txt=null;
		this.bar=null;
		this.bar_txt=null;
		this.name_txt=null;
		ItemUseAlertUI.__super.call(this);
	}

	__class(ItemUseAlertUI,'ui.mobile.bag.ItemUseAlertUI',_super);
	var __proto=ItemUseAlertUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/bag/ItemUseAlert");
	}

	return ItemUseAlertUI;
})(View)


//class ui.mobile.bag.PiLiangUsePanelUI extends laya.ui.View
var PiLiangUsePanelUI=(function(_super){
	function PiLiangUsePanelUI(){
		this.window=null;
		this.title=null;
		this.cancel_btn=null;
		this.ok_btn=null;
		this.grid=null;
		this.add_btn=null;
		this.sub_btn=null;
		this.max_btn=null;
		this.num_txt=null;
		this.name_txt=null;
		PiLiangUsePanelUI.__super.call(this);
	}

	__class(PiLiangUsePanelUI,'ui.mobile.bag.PiLiangUsePanelUI',_super);
	var __proto=PiLiangUsePanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/bag/PiLiangUsePanel");
	}

	return PiLiangUsePanelUI;
})(View)


//class ui.mobile.bag.quickuse.QuickUsePanelUI extends laya.ui.View
var QuickUsePanelUI=(function(_super){
	function QuickUsePanelUI(){
		this.bg=null;
		this.titlebg=null;
		this.title=null;
		this.closeBtn=null;
		this.btn=null;
		this.list=null;
		QuickUsePanelUI.__super.call(this);
	}

	__class(QuickUsePanelUI,'ui.mobile.bag.quickuse.QuickUsePanelUI',_super);
	var __proto=QuickUsePanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/bag/quickuse/QuickUsePanel");
	}

	return QuickUsePanelUI;
})(View)


//class ui.mobile.bag.ronglian.RonglianPanelUI extends laya.ui.View
var RonglianPanelUI=(function(_super){
	function RonglianPanelUI(){
		this.window=null;
		this.bg=null;
		this.title=null;
		this.p_list=null;
		this.btnAuto=null;
		this.btnAdd=null;
		this.btnRL=null;
		this.tipBox=null;
		this.c_txt=null;
		this.c_icon=null;
		this.btnSetup=null;
		this.btnClick=null;
		this.btnBT=null;
		this.bt_txt=null;
		RonglianPanelUI.__super.call(this);
	}

	__class(RonglianPanelUI,'ui.mobile.bag.ronglian.RonglianPanelUI',_super);
	var __proto=RonglianPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/bag/ronglian/RonglianPanel");
	}

	return RonglianPanelUI;
})(View)


//class ui.mobile.bag.ronglian.RonglianSetupItemUI extends laya.ui.View
var RonglianSetupItemUI=(function(_super){
	function RonglianSetupItemUI(){
		this.btn0=null;
		this.btn1=null;
		this.btn2=null;
		RonglianSetupItemUI.__super.call(this);
	}

	__class(RonglianSetupItemUI,'ui.mobile.bag.ronglian.RonglianSetupItemUI',_super);
	var __proto=RonglianSetupItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/bag/ronglian/RonglianSetupItem");
	}

	return RonglianSetupItemUI;
})(View)


//class ui.mobile.bag.ronglian.RonglianSetupPanelUI extends laya.ui.View
var RonglianSetupPanelUI=(function(_super){
	function RonglianSetupPanelUI(){
		this.bg=null;
		this.title=null;
		this.p_list=null;
		this.closeBtn=null;
		this.btnAuto=null;
		this.btnSex=null;
		RonglianSetupPanelUI.__super.call(this);
	}

	__class(RonglianSetupPanelUI,'ui.mobile.bag.ronglian.RonglianSetupPanelUI',_super);
	var __proto=RonglianSetupPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.bag.ronglian.RonglianSetupItemUI",RonglianSetupItemUI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/bag/ronglian/RonglianSetupPanel");
	}

	return RonglianSetupPanelUI;
})(View)


//class ui.mobile.baitan.BaiTanPanelUI extends laya.ui.View
var BaiTanPanelUI=(function(_super){
	function BaiTanPanelUI(){
		this.window=null;
		this.bg=null;
		this.title=null;
		this.tabBtn=null;
		BaiTanPanelUI.__super.call(this);
	}

	__class(BaiTanPanelUI,'ui.mobile.baitan.BaiTanPanelUI',_super);
	var __proto=BaiTanPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/baitan/BaiTanPanel");
	}

	return BaiTanPanelUI;
})(View)


//class ui.mobile.baitan.panel.BaitanBagPanelUI extends laya.ui.View
var BaitanBagPanelUI=(function(_super){
	function BaitanBagPanelUI(){
		this.bg=null;
		this.numTxt=null;
		this.title=null;
		this.btn=null;
		this.closeBtn=null;
		this.list=null;
		BaitanBagPanelUI.__super.call(this);
	}

	__class(BaitanBagPanelUI,'ui.mobile.baitan.panel.BaitanBagPanelUI',_super);
	var __proto=BaitanBagPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/baitan/panel/BaitanBagPanel");
	}

	return BaitanBagPanelUI;
})(View)


//class ui.mobile.baitan.panel.BaitanSendPanelUI extends laya.ui.View
var BaitanSendPanelUI=(function(_super){
	function BaitanSendPanelUI(){
		this.bg=null;
		this.title=null;
		this.input0=null;
		this.input1=null;
		this.gridCtn=null;
		this.moneyUrl0=null;
		this.moneyUrl1=null;
		this.moneyUrl2=null;
		this.nameTxt=null;
		this.priceTxt=null;
		this.descTxt=null;
		this.closeBtn=null;
		this.btn=null;
		BaitanSendPanelUI.__super.call(this);
	}

	__class(BaitanSendPanelUI,'ui.mobile.baitan.panel.BaitanSendPanelUI',_super);
	var __proto=BaitanSendPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/baitan/panel/BaitanSendPanel");
	}

	return BaitanSendPanelUI;
})(View)


//class ui.mobile.baitan.panel.BaitanShowPanelUI extends laya.ui.View
var BaitanShowPanelUI=(function(_super){
	function BaitanShowPanelUI(){
		this.bg=null;
		this.list=null;
		this.nameTxt=null;
		this.closeBtn=null;
		BaitanShowPanelUI.__super.call(this);
	}

	__class(BaitanShowPanelUI,'ui.mobile.baitan.panel.BaitanShowPanelUI',_super);
	var __proto=BaitanShowPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/baitan/panel/BaitanShowPanel");
	}

	return BaitanShowPanelUI;
})(View)


//class ui.mobile.baitan.panel.BaitanTuisongTipPanelUI extends laya.ui.View
var BaitanTuisongTipPanelUI=(function(_super){
	function BaitanTuisongTipPanelUI(){
		this.title=null;
		this.gridCtn=null;
		this.nameTxt=null;
		this.btn=null;
		this.closeBtn=null;
		this.checkBox=null;
		BaitanTuisongTipPanelUI.__super.call(this);
	}

	__class(BaitanTuisongTipPanelUI,'ui.mobile.baitan.panel.BaitanTuisongTipPanelUI',_super);
	var __proto=BaitanTuisongTipPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/baitan/panel/BaitanTuisongTipPanel");
	}

	return BaitanTuisongTipPanelUI;
})(View)


//class ui.mobile.boss.anzhishendian.SweepResultPanelUI extends laya.ui.View
var SweepResultPanelUI=(function(_super){
	function SweepResultPanelUI(){
		this.bg=null;
		this.imgTitle=null;
		this.gridNode=null;
		this.closeBtn=null;
		SweepResultPanelUI.__super.call(this);
	}

	__class(SweepResultPanelUI,'ui.mobile.boss.anzhishendian.SweepResultPanelUI',_super);
	var __proto=SweepResultPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/anzhishendian/SweepResultPanel");
	}

	return SweepResultPanelUI;
})(View)


//class ui.mobile.boss.BossPromptUI extends laya.ui.View
var BossPromptUI=(function(_super){
	function BossPromptUI(){
		this.bg=null;
		this.title=null;
		this.closeBtn=null;
		this.bossNameLab=null;
		this.check=null;
		this.headbg=null;
		this.btnGo=null;
		BossPromptUI.__super.call(this);
	}

	__class(BossPromptUI,'ui.mobile.boss.BossPromptUI',_super);
	var __proto=BossPromptUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/BossPrompt");
	}

	return BossPromptUI;
})(View)


//class ui.mobile.boss.jitan.ZuojiJitanMapPanelUI extends laya.ui.View
var ZuojiJitanMapPanelUI=(function(_super){
	function ZuojiJitanMapPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.mapNT0=null;
		this.mapNT1=null;
		this.mapNT2=null;
		this.mapNT3=null;
		this.mapBox=null;
		this.mapImg=null;
		this.btnGZ=null;
		this.mapDescTxt=null;
		this.bossNameTxt=null;
		this.btnGo=null;
		this.timeTxt=null;
		this.cishuTxt=null;
		this.h_select=null;
		ZuojiJitanMapPanelUI.__super.call(this);
	}

	__class(ZuojiJitanMapPanelUI,'ui.mobile.boss.jitan.ZuojiJitanMapPanelUI',_super);
	var __proto=ZuojiJitanMapPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/jitan/ZuojiJitanMapPanel");
	}

	return ZuojiJitanMapPanelUI;
})(View)


//class ui.mobile.boss.jitan.ZuojiJitanPanelUI extends laya.ui.View
var ZuojiJitanPanelUI=(function(_super){
	function ZuojiJitanPanelUI(){
		this.window=null;
		this.bg=null;
		this.box3=null;
		this.yun3=null;
		this.mapDB3=null;
		this.mapDT03=null;
		this.mapDT13=null;
		this.mapNB3=null;
		this.mapNT3=null;
		this.box2=null;
		this.yun2=null;
		this.mapDB2=null;
		this.mapDT02=null;
		this.mapDT12=null;
		this.mapNB2=null;
		this.mapNT2=null;
		this.box0=null;
		this.yun0=null;
		this.mapNB0=null;
		this.mapNT0=null;
		this.mapDB0=null;
		this.mapDT00=null;
		this.mapDT10=null;
		this.box4=null;
		this.yun4=null;
		this.mapDB4=null;
		this.mapDT04=null;
		this.mapDT14=null;
		this.mapNB4=null;
		this.mapNT4=null;
		this.box1=null;
		this.yun1=null;
		this.mapDB1=null;
		this.mapDT01=null;
		this.mapDT11=null;
		this.mapNB1=null;
		this.mapNT1=null;
		this.tipBox=null;
		this.tabs_panel=null;
		this.tabs=null;
		this.tabs_line1=null;
		this.tabs_line2=null;
		ZuojiJitanPanelUI.__super.call(this);
	}

	__class(ZuojiJitanPanelUI,'ui.mobile.boss.jitan.ZuojiJitanPanelUI',_super);
	var __proto=ZuojiJitanPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/jitan/ZuojiJitanPanel");
	}

	return ZuojiJitanPanelUI;
})(View)


//class ui.mobile.boss.wanyao.WanyaoLaoyuPanelUI extends laya.ui.View
var WanyaoLaoyuPanelUI=(function(_super){
	function WanyaoLaoyuPanelUI(){
		this.window=null;
		this.bg=null;
		this.l_list=null;
		this.cishuTxt180=null;
		this.cishuTxt181=null;
		this.t_icon181=null;
		this.cishuTxt182=null;
		this.t_icon182=null;
		this.shuijingTxt=null;
		this.tipBox=null;
		this.btnSB=null;
		this.btnFH=null;
		this.btnGo=null;
		this.r_select=null;
		this.nameImg=null;
		WanyaoLaoyuPanelUI.__super.call(this);
	}

	__class(WanyaoLaoyuPanelUI,'ui.mobile.boss.wanyao.WanyaoLaoyuPanelUI',_super);
	var __proto=WanyaoLaoyuPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		View.regComponent("ui.mobile.boss.wanyao.WanyaoTabUI",WanyaoTabUI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/wanyao/WanyaoLaoyuPanel");
	}

	return WanyaoLaoyuPanelUI;
})(View)


//class ui.mobile.boss.wanyao.WanyaoTabUI extends laya.ui.View
var WanyaoTabUI=(function(_super){
	function WanyaoTabUI(){
		this.nameTxt=null;
		this.limitTxt=null;
		WanyaoTabUI.__super.call(this);
	}

	__class(WanyaoTabUI,'ui.mobile.boss.wanyao.WanyaoTabUI',_super);
	var __proto=WanyaoTabUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/wanyao/WanyaoTab");
	}

	return WanyaoTabUI;
})(View)


//class ui.mobile.boss.XingyunBoxPanelUI extends laya.ui.View
var XingyunBoxPanelUI=(function(_super){
	function XingyunBoxPanelUI(){
		this.window=null;
		this.title=null;
		this.btnJump=null;
		this.cishuTxt=null;
		this.moneyTxt=null;
		this.moneyIcon=null;
		this.btnTQ=null;
		this.btn=null;
		this.l_select=null;
		this.closeBtn=null;
		XingyunBoxPanelUI.__super.call(this);
	}

	__class(XingyunBoxPanelUI,'ui.mobile.boss.XingyunBoxPanelUI',_super);
	var __proto=XingyunBoxPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/XingyunBoxPanel");
	}

	return XingyunBoxPanelUI;
})(View)


//class ui.mobile.boss.xinxi.YishouGetPanelUI extends laya.ui.View
var YishouGetPanelUI=(function(_super){
	function YishouGetPanelUI(){
		this.window=null;
		this.bg=null;
		this.title=null;
		this.conTxt=null;
		this.btnLink=null;
		YishouGetPanelUI.__super.call(this);
	}

	__class(YishouGetPanelUI,'ui.mobile.boss.xinxi.YishouGetPanelUI',_super);
	var __proto=YishouGetPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window5UI",Window5UI);
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/xinxi/YishouGetPanel");
	}

	return YishouGetPanelUI;
})(View)


//class ui.mobile.boss.yijie.YiJieRuQinPanelUI extends laya.ui.View
var YiJieRuQinPanelUI=(function(_super){
	function YiJieRuQinPanelUI(){
		this.window=null;
		this.bg=null;
		this.t_name=null;
		this.l_name=null;
		this.p_panel=null;
		this.s_select=null;
		this.r_txt1=null;
		this.r_txt2=null;
		this.timeTxt=null;
		this.guildTxt=null;
		this.btnGo=null;
		this.tipBox=null;
		YiJieRuQinPanelUI.__super.call(this);
	}

	__class(YiJieRuQinPanelUI,'ui.mobile.boss.yijie.YiJieRuQinPanelUI',_super);
	var __proto=YiJieRuQinPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/yijie/YiJieRuQinPanel");
	}

	return YiJieRuQinPanelUI;
})(View)


//class ui.mobile.boss.yijie.YijieRuqinZoneUI extends laya.ui.View
var YijieRuqinZoneUI=(function(_super){
	function YijieRuqinZoneUI(){
		this.bg=null;
		this.titleBox=null;
		this.title=null;
		this.btnGo=null;
		this.headbg=null;
		this.head=null;
		this.barbg=null;
		this.bar=null;
		this.barMask=null;
		this.barTxt=null;
		this.guishuTxt2=null;
		this.guishuTxt1=null;
		this.bossTxt=null;
		this.btnHide=null;
		this.btnExit=null;
		YijieRuqinZoneUI.__super.call(this);
	}

	__class(YijieRuqinZoneUI,'ui.mobile.boss.yijie.YijieRuqinZoneUI',_super);
	var __proto=YijieRuqinZoneUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/yijie/YijieRuqinZone");
	}

	return YijieRuqinZoneUI;
})(View)


//class ui.mobile.boss.ZhuzhanPanelUI extends laya.ui.View
var ZhuzhanPanelUI=(function(_super){
	function ZhuzhanPanelUI(){
		this.window=null;
		this.btnGo=null;
		this.btnGou=null;
		this.btnQX=null;
		this.txt=null;
		this.cishuTxt=null;
		ZhuzhanPanelUI.__super.call(this);
	}

	__class(ZhuzhanPanelUI,'ui.mobile.boss.ZhuzhanPanelUI',_super);
	var __proto=ZhuzhanPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/boss/ZhuzhanPanel");
	}

	return ZhuzhanPanelUI;
})(View)


//class ui.mobile.BreakConnectPanelUI extends laya.ui.View
var BreakConnectPanelUI=(function(_super){
	function BreakConnectPanelUI(){
		this.window=null;
		this.lab1=null;
		this.lab2=null;
		this.lab3=null;
		this.title_img=null;
		this.ok_btn=null;
		this.copy_btn=null;
		BreakConnectPanelUI.__super.call(this);
	}

	__class(BreakConnectPanelUI,'ui.mobile.BreakConnectPanelUI',_super);
	var __proto=BreakConnectPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/BreakConnectPanel");
	}

	return BreakConnectPanelUI;
})(View)


//class ui.mobile.comp.CanActivePanelUI extends laya.ui.View
var CanActivePanelUI=(function(_super){
	function CanActivePanelUI(){
		this.window=null;
		this.btn=null;
		this.iconbg=null;
		this.icon=null;
		CanActivePanelUI.__super.call(this);
	}

	__class(CanActivePanelUI,'ui.mobile.comp.CanActivePanelUI',_super);
	var __proto=CanActivePanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/comp/CanActivePanel");
	}

	return CanActivePanelUI;
})(View)


//class ui.mobile.comp.SelectItemPanelUI extends laya.ui.View
var SelectItemPanelUI=(function(_super){
	function SelectItemPanelUI(){
		this.window=null;
		this.titleImg=null;
		this.list=null;
		this.ck=null;
		SelectItemPanelUI.__super.call(this);
	}

	__class(SelectItemPanelUI,'ui.mobile.comp.SelectItemPanelUI',_super);
	var __proto=SelectItemPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window5UI",Window5UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/comp/SelectItemPanel");
	}

	return SelectItemPanelUI;
})(View)


//class ui.mobile.comp.SuccessPanelUI extends laya.ui.View
var SuccessPanelUI=(function(_super){
	function SuccessPanelUI(){
		this.bg=null;
		this.box1=null;
		this.img=null;
		this.lv_txt1=null;
		this.lv_txt2=null;
		this.desc_txt=null;
		this.box2=null;
		this.arrow=null;
		this.time_txt=null;
		this.btn=null;
		SuccessPanelUI.__super.call(this);
	}

	__class(SuccessPanelUI,'ui.mobile.comp.SuccessPanelUI',_super);
	var __proto=SuccessPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/comp/SuccessPanel");
	}

	return SuccessPanelUI;
})(View)


//class ui.mobile.country.hongbao.HongbaoLogItemUI extends laya.ui.View
var HongbaoLogItemUI=(function(_super){
	function HongbaoLogItemUI(){
		this.txt=null;
		this.icon=null;
		HongbaoLogItemUI.__super.call(this);
	}

	__class(HongbaoLogItemUI,'ui.mobile.country.hongbao.HongbaoLogItemUI',_super);
	var __proto=HongbaoLogItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/country/hongbao/HongbaoLogItem");
	}

	return HongbaoLogItemUI;
})(View)


//class ui.mobile.country.hongbao.HongbaoPanelUI extends laya.ui.View
var HongbaoPanelUI=(function(_super){
	function HongbaoPanelUI(){
		this.window=null;
		this.bg=null;
		this.btnSend=null;
		this.closeBtn=null;
		this.m_icon=null;
		this.l_txt1=null;
		this.l_txt2=null;
		this.jiyuTxt=null;
		this.m_txt=null;
		this.title=null;
		this.canyu1=null;
		this.canyu2=null;
		this.shengyu1=null;
		this.shengyu2=null;
		this.r_list=null;
		this.btnGet=null;
		this.m_numTxt=null;
		HongbaoPanelUI.__super.call(this);
	}

	__class(HongbaoPanelUI,'ui.mobile.country.hongbao.HongbaoPanelUI',_super);
	var __proto=HongbaoPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.country.hongbao.HongbaoLogItemUI",HongbaoLogItemUI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/country/hongbao/HongbaoPanel");
	}

	return HongbaoPanelUI;
})(View)


//class ui.mobile.country.huangcheng.HuangchengEndPanelUI extends laya.ui.View
var HuangchengEndPanelUI=(function(_super){
	function HuangchengEndPanelUI(){
		this.bg=null;
		this.txt1=null;
		this.txt2=null;
		this.closeBtn=null;
		this.p_panel=null;
		HuangchengEndPanelUI.__super.call(this);
	}

	__class(HuangchengEndPanelUI,'ui.mobile.country.huangcheng.HuangchengEndPanelUI',_super);
	var __proto=HuangchengEndPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/country/huangcheng/HuangchengEndPanel");
	}

	return HuangchengEndPanelUI;
})(View)


//class ui.mobile.country.huangcheng.HuangchengJifenPanelUI extends laya.ui.View
var HuangchengJifenPanelUI=(function(_super){
	function HuangchengJifenPanelUI(){
		this.window=null;
		this.title=null;
		this.titlebg=null;
		this.p_list=null;
		this.huizhang=null;
		HuangchengJifenPanelUI.__super.call(this);
	}

	__class(HuangchengJifenPanelUI,'ui.mobile.country.huangcheng.HuangchengJifenPanelUI',_super);
	var __proto=HuangchengJifenPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window5UI",Window5UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/country/huangcheng/HuangchengJifenPanel");
	}

	return HuangchengJifenPanelUI;
})(View)


//class ui.mobile.country.huangcheng.HuangchengRewardViewUI extends laya.ui.View
var HuangchengRewardViewUI=(function(_super){
	function HuangchengRewardViewUI(){
		this.window=null;
		this.p_list=null;
		HuangchengRewardViewUI.__super.call(this);
	}

	__class(HuangchengRewardViewUI,'ui.mobile.country.huangcheng.HuangchengRewardViewUI',_super);
	var __proto=HuangchengRewardViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window5UI",Window5UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/country/huangcheng/HuangchengRewardView");
	}

	return HuangchengRewardViewUI;
})(View)


//class ui.mobile.cqroad.CQRoadPanelUI extends laya.ui.View
var CQRoadPanelUI=(function(_super){
	function CQRoadPanelUI(){
		this.zhu1=null;
		this.box=null;
		this.window=null;
		this.bg=null;
		this.zhu2=null;
		this.closeBtn=null;
		CQRoadPanelUI.__super.call(this);
	}

	__class(CQRoadPanelUI,'ui.mobile.cqroad.CQRoadPanelUI',_super);
	var __proto=CQRoadPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/cqroad/CQRoadPanel");
	}

	return CQRoadPanelUI;
})(View)


//class ui.mobile.daily.DailyPanelUI extends laya.ui.View
var DailyPanelUI=(function(_super){
	function DailyPanelUI(){
		this.window=null;
		this.bg=null;
		DailyPanelUI.__super.call(this);
	}

	__class(DailyPanelUI,'ui.mobile.daily.DailyPanelUI',_super);
	var __proto=DailyPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/daily/DailyPanel");
	}

	return DailyPanelUI;
})(View)


//class ui.mobile.daily.kuafuTask.KuafuFuliPanelUI extends laya.ui.View
var KuafuFuliPanelUI=(function(_super){
	function KuafuFuliPanelUI(){
		this.title=null;
		this.closeBtn=null;
		this.list=null;
		KuafuFuliPanelUI.__super.call(this);
	}

	__class(KuafuFuliPanelUI,'ui.mobile.daily.kuafuTask.KuafuFuliPanelUI',_super);
	var __proto=KuafuFuliPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/daily/kuafuTask/KuafuFuliPanel");
	}

	return KuafuFuliPanelUI;
})(View)


//class ui.mobile.daily.LiemorenItemUI extends laya.ui.View
var LiemorenItemUI=(function(_super){
	function LiemorenItemUI(){
		this.icon=null;
		this.txt=null;
		this.cishuTxt=null;
		this.btn=null;
		LiemorenItemUI.__super.call(this);
	}

	__class(LiemorenItemUI,'ui.mobile.daily.LiemorenItemUI',_super);
	var __proto=LiemorenItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/daily/LiemorenItem");
	}

	return LiemorenItemUI;
})(View)


//class ui.mobile.daily.TuoguanItemUI extends laya.ui.View
var TuoguanItemUI=(function(_super){
	function TuoguanItemUI(){
		this.bg=null;
		this.tg_btn=null;
		this.btn=null;
		this.name_txt=null;
		this.time_txt=null;
		TuoguanItemUI.__super.call(this);
	}

	__class(TuoguanItemUI,'ui.mobile.daily.TuoguanItemUI',_super);
	var __proto=TuoguanItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/daily/TuoguanItem");
	}

	return TuoguanItemUI;
})(View)


//class ui.mobile.dailyActivitys.CiyuanZoneInfoUI extends laya.ui.View
var CiyuanZoneInfoUI=(function(_super){
	function CiyuanZoneInfoUI(){
		this.bg=null;
		this.titleBox=null;
		this.title=null;
		this.tipBox=null;
		this.timeTxt=null;
		this.bossTxt=null;
		this.btnGo=null;
		this.btnHide=null;
		this.btnExit=null;
		this.warning=null;
		CiyuanZoneInfoUI.__super.call(this);
	}

	__class(CiyuanZoneInfoUI,'ui.mobile.dailyActivitys.CiyuanZoneInfoUI',_super);
	var __proto=CiyuanZoneInfoUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/dailyActivitys/CiyuanZoneInfo");
	}

	return CiyuanZoneInfoUI;
})(View)


//class ui.mobile.dailyActivitys.DailyRewardPanelUI extends laya.ui.View
var DailyRewardPanelUI=(function(_super){
	function DailyRewardPanelUI(){
		this.bg=null;
		this.title=null;
		this.closeBtn=null;
		this.btn=null;
		this.txt1=null;
		this.txt2=null;
		DailyRewardPanelUI.__super.call(this);
	}

	__class(DailyRewardPanelUI,'ui.mobile.dailyActivitys.DailyRewardPanelUI',_super);
	var __proto=DailyRewardPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/dailyActivitys/DailyRewardPanel");
	}

	return DailyRewardPanelUI;
})(View)


//class ui.mobile.DebugPanelUI extends laya.ui.View
var DebugPanelUI=(function(_super){
	function DebugPanelUI(){
		this.window=null;
		this.title=null;
		this.textArea=null;
		this.recover_btn=null;
		this.clear_btn=null;
		this.copy_btn=null;
		this.close_btn=null;
		DebugPanelUI.__super.call(this);
	}

	__class(DebugPanelUI,'ui.mobile.DebugPanelUI',_super);
	var __proto=DebugPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/DebugPanel");
	}

	return DebugPanelUI;
})(View)


//class ui.mobile.duanzao.AllAttrPanelUI extends laya.ui.View
var AllAttrPanelUI=(function(_super){
	function AllAttrPanelUI(){
		this.window=null;
		this.title=null;
		this.attr_title=null;
		this.attr0=null;
		this.part_box=null;
		this.part_up=null;
		this.part_attr=null;
		AllAttrPanelUI.__super.call(this);
	}

	__class(AllAttrPanelUI,'ui.mobile.duanzao.AllAttrPanelUI',_super);
	var __proto=AllAttrPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window2UI",Window2UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/AllAttrPanel");
	}

	return AllAttrPanelUI;
})(View)


//class ui.mobile.duanzao.DuanzaoPanelUI extends laya.ui.View
var DuanzaoPanelUI=(function(_super){
	function DuanzaoPanelUI(){
		this.window=null;
		this.title=null;
		this.bg=null;
		DuanzaoPanelUI.__super.call(this);
	}

	__class(DuanzaoPanelUI,'ui.mobile.duanzao.DuanzaoPanelUI',_super);
	var __proto=DuanzaoPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/DuanzaoPanel");
	}

	return DuanzaoPanelUI;
})(View)


//class ui.mobile.duanzao.fenjie.FenJieSettingDetailItemUI extends laya.ui.View
var FenJieSettingDetailItemUI=(function(_super){
	function FenJieSettingDetailItemUI(){
		this.checkbox=null;
		this.name_txt=null;
		FenJieSettingDetailItemUI.__super.call(this);
	}

	__class(FenJieSettingDetailItemUI,'ui.mobile.duanzao.fenjie.FenJieSettingDetailItemUI',_super);
	var __proto=FenJieSettingDetailItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/fenjie/FenJieSettingDetailItem");
	}

	return FenJieSettingDetailItemUI;
})(View)


//class ui.mobile.duanzao.fenjie.FenJieSettingDetailTitleUI extends laya.ui.View
var FenJieSettingDetailTitleUI=(function(_super){
	function FenJieSettingDetailTitleUI(){
		this.title_txt=null;
		FenJieSettingDetailTitleUI.__super.call(this);
	}

	__class(FenJieSettingDetailTitleUI,'ui.mobile.duanzao.fenjie.FenJieSettingDetailTitleUI',_super);
	var __proto=FenJieSettingDetailTitleUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/fenjie/FenJieSettingDetailTitle");
	}

	return FenJieSettingDetailTitleUI;
})(View)


//class ui.mobile.duanzao.fenjie.FenJieSettingDetailViewUI extends laya.ui.View
var FenJieSettingDetailViewUI=(function(_super){
	function FenJieSettingDetailViewUI(){
		this.bg=null;
		FenJieSettingDetailViewUI.__super.call(this);
	}

	__class(FenJieSettingDetailViewUI,'ui.mobile.duanzao.fenjie.FenJieSettingDetailViewUI',_super);
	var __proto=FenJieSettingDetailViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/fenjie/FenJieSettingDetailView");
	}

	return FenJieSettingDetailViewUI;
})(View)


//class ui.mobile.duanzao.fenjie.FenJieSettingPanelUI extends laya.ui.View
var FenJieSettingPanelUI=(function(_super){
	function FenJieSettingPanelUI(){
		this.window=null;
		this.bg=null;
		this.imgTitle=null;
		this.hungu_list=null;
		this.hunhuan_list=null;
		this.bg_title1=null;
		this.bg_title2=null;
		FenJieSettingPanelUI.__super.call(this);
	}

	__class(FenJieSettingPanelUI,'ui.mobile.duanzao.fenjie.FenJieSettingPanelUI',_super);
	var __proto=FenJieSettingPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window5UI",Window5UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/fenjie/FenJieSettingPanel");
	}

	return FenJieSettingPanelUI;
})(View)


//class ui.mobile.duanzao.hecheng.HechengPanelUI extends laya.ui.View
var HechengPanelUI=(function(_super){
	function HechengPanelUI(){
		this.window=null;
		this.bg=null;
		this.bg2=null;
		this.tabs=null;
		this.help_box=null;
		HechengPanelUI.__super.call(this);
	}

	__class(HechengPanelUI,'ui.mobile.duanzao.hecheng.HechengPanelUI',_super);
	var __proto=HechengPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/hecheng/HechengPanel");
	}

	return HechengPanelUI;
})(View)


//class ui.mobile.duanzao.tianshen.TianshenGuanzhuPanelUI extends laya.ui.View
var TianshenGuanzhuPanelUI=(function(_super){
	function TianshenGuanzhuPanelUI(){
		this.bg=null;
		this.btnUP=null;
		this.closeBtn=null;
		this.grid1=null;
		this.grid0=null;
		this.grid2=null;
		this.descTxt=null;
		this.gridTxt0=null;
		this.gridTxt1=null;
		this.no_wear=null;
		this.yimanji=null;
		TianshenGuanzhuPanelUI.__super.call(this);
	}

	__class(TianshenGuanzhuPanelUI,'ui.mobile.duanzao.tianshen.TianshenGuanzhuPanelUI',_super);
	var __proto=TianshenGuanzhuPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/duanzao/tianshen/TianshenGuanzhuPanel");
	}

	return TianshenGuanzhuPanelUI;
})(View)


//class ui.mobile.escort.EscortAcceptPanelUI extends laya.ui.View
var EscortAcceptPanelUI=(function(_super){
	function EscortAcceptPanelUI(){
		this.window=null;
		this.bg=null;
		this.title=null;
		this.double_txt=null;
		this.rob_txt=null;
		EscortAcceptPanelUI.__super.call(this);
	}

	__class(EscortAcceptPanelUI,'ui.mobile.escort.EscortAcceptPanelUI',_super);
	var __proto=EscortAcceptPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/escort/EscortAcceptPanel");
	}

	return EscortAcceptPanelUI;
})(View)


//class ui.mobile.exp.ExpBossPanelUI extends laya.ui.View
var ExpBossPanelUI=(function(_super){
	function ExpBossPanelUI(){
		this.window=null;
		this.bg=null;
		this.ballNode=null;
		this.btn=null;
		this.des_txt=null;
		this.des_txt2=null;
		this.num_txt=null;
		this.now_txt=null;
		this.numNode=null;
		this.checkbox=null;
		this.check_txt=null;
		ExpBossPanelUI.__super.call(this);
	}

	__class(ExpBossPanelUI,'ui.mobile.exp.ExpBossPanelUI',_super);
	var __proto=ExpBossPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window2UI",Window2UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/exp/ExpBossPanel");
	}

	return ExpBossPanelUI;
})(View)


//class ui.mobile.feisheng.FeiShengDialogPanelUI extends laya.ui.View
var FeiShengDialogPanelUI=(function(_super){
	function FeiShengDialogPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.btn_sure=null;
		this.content_txt=null;
		FeiShengDialogPanelUI.__super.call(this);
	}

	__class(FeiShengDialogPanelUI,'ui.mobile.feisheng.FeiShengDialogPanelUI',_super);
	var __proto=FeiShengDialogPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/feisheng/FeiShengDialogPanel");
	}

	return FeiShengDialogPanelUI;
})(View)


//class ui.mobile.feisheng.FeiShengDuJieTrackUI extends laya.ui.View
var FeiShengDuJieTrackUI=(function(_super){
	function FeiShengDuJieTrackUI(){
		this.succ_panel=null;
		this.time_txt=null;
		this.btn=null;
		this.succ_img=null;
		this.num_img=null;
		FeiShengDuJieTrackUI.__super.call(this);
	}

	__class(FeiShengDuJieTrackUI,'ui.mobile.feisheng.FeiShengDuJieTrackUI',_super);
	var __proto=FeiShengDuJieTrackUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/feisheng/FeiShengDuJieTrack");
	}

	return FeiShengDuJieTrackUI;
})(View)


//class ui.mobile.feisheng.FeiShengQuestionPanelUI extends laya.ui.View
var FeiShengQuestionPanelUI=(function(_super){
	function FeiShengQuestionPanelUI(){
		this.bg=null;
		this.item0=null;
		this.txt0=null;
		this.xx0=null;
		this.item1=null;
		this.txt1=null;
		this.xx1=null;
		this.gouImg=null;
		this.item2=null;
		this.txt2=null;
		this.xx2=null;
		this.item3=null;
		this.txt3=null;
		this.xx3=null;
		this.closeBtn=null;
		this.btn=null;
		this.timuTxt=null;
		FeiShengQuestionPanelUI.__super.call(this);
	}

	__class(FeiShengQuestionPanelUI,'ui.mobile.feisheng.FeiShengQuestionPanelUI',_super);
	var __proto=FeiShengQuestionPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/feisheng/FeiShengQuestionPanel");
	}

	return FeiShengQuestionPanelUI;
})(View)


//class ui.mobile.fengmo.FengmoFinishPanelUI extends laya.ui.View
var FengmoFinishPanelUI=(function(_super){
	function FengmoFinishPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		FengmoFinishPanelUI.__super.call(this);
	}

	__class(FengmoFinishPanelUI,'ui.mobile.fengmo.FengmoFinishPanelUI',_super);
	var __proto=FengmoFinishPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fengmo/FengmoFinishPanel");
	}

	return FengmoFinishPanelUI;
})(View)


//class ui.mobile.fengmo.FengmoItemUI extends laya.ui.View
var FengmoItemUI=(function(_super){
	function FengmoItemUI(){
		this.btn=null;
		this.txt=null;
		this.yiwancheng=null;
		this.btnLink=null;
		FengmoItemUI.__super.call(this);
	}

	__class(FengmoItemUI,'ui.mobile.fengmo.FengmoItemUI',_super);
	var __proto=FengmoItemUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fengmo/FengmoItem");
	}

	return FengmoItemUI;
})(View)


//class ui.mobile.fengmo.FengmoPanelUI extends laya.ui.View
var FengmoPanelUI=(function(_super){
	function FengmoPanelUI(){
		this.bg=null;
		this.r_panel=null;
		this.yilingqu=null;
		this.btnGet=null;
		this.closeBtn=null;
		this.titleTxt=null;
		this.tipTxt=null;
		FengmoPanelUI.__super.call(this);
	}

	__class(FengmoPanelUI,'ui.mobile.fengmo.FengmoPanelUI',_super);
	var __proto=FengmoPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fengmo/FengmoPanel");
	}

	return FengmoPanelUI;
})(View)


//class ui.mobile.fengmo.FMAccordionHeadUI extends laya.ui.View
var FMAccordionHeadUI=(function(_super){
	function FMAccordionHeadUI(){
		this.btn=null;
		this.ing=null;
		this.numTxt=null;
		FMAccordionHeadUI.__super.call(this);
	}

	__class(FMAccordionHeadUI,'ui.mobile.fengmo.FMAccordionHeadUI',_super);
	var __proto=FMAccordionHeadUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fengmo/FMAccordionHead");
	}

	return FMAccordionHeadUI;
})(View)


//class ui.mobile.friend.AddFriendPanelUI extends laya.ui.View
var AddFriendPanelUI=(function(_super){
	function AddFriendPanelUI(){
		this.input_txt=null;
		this.btn_add=null;
		this.closeBtn=null;
		AddFriendPanelUI.__super.call(this);
	}

	__class(AddFriendPanelUI,'ui.mobile.friend.AddFriendPanelUI',_super);
	var __proto=AddFriendPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/friend/AddFriendPanel");
	}

	return AddFriendPanelUI;
})(View)


//class ui.mobile.friend.FriendApplyPanelUI extends laya.ui.View
var FriendApplyPanelUI=(function(_super){
	function FriendApplyPanelUI(){
		this.bg=null;
		this.bg2=null;
		this.list=null;
		this.btn_yes=null;
		this.btn_no=null;
		this.closeBtn=null;
		FriendApplyPanelUI.__super.call(this);
	}

	__class(FriendApplyPanelUI,'ui.mobile.friend.FriendApplyPanelUI',_super);
	var __proto=FriendApplyPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/friend/FriendApplyPanel");
	}

	return FriendApplyPanelUI;
})(View)


//class ui.mobile.fulihall.FuLiHallPanelUI extends laya.ui.View
var FuLiHallPanelUI=(function(_super){
	function FuLiHallPanelUI(){
		this.window=null;
		this.bg=null;
		this.panel_tree=null;
		this.tabs=null;
		this.title=null;
		FuLiHallPanelUI.__super.call(this);
	}

	__class(FuLiHallPanelUI,'ui.mobile.fulihall.FuLiHallPanelUI',_super);
	var __proto=FuLiHallPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fulihall/FuLiHallPanel");
	}

	return FuLiHallPanelUI;
})(View)


//class ui.mobile.fulihall.ZhanlingBuyPanelUI extends laya.ui.View
var ZhanlingBuyPanelUI=(function(_super){
	function ZhanlingBuyPanelUI(){
		this.window=null;
		this.bg0=null;
		this.bg1=null;
		this.btn0=null;
		this.btn1=null;
		this.txt0=null;
		this.txt1=null;
		this.yibuy0=null;
		this.yibuy1=null;
		ZhanlingBuyPanelUI.__super.call(this);
	}

	__class(ZhanlingBuyPanelUI,'ui.mobile.fulihall.ZhanlingBuyPanelUI',_super);
	var __proto=ZhanlingBuyPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window5UI",Window5UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fulihall/ZhanlingBuyPanel");
	}

	return ZhanlingBuyPanelUI;
})(View)


//class ui.mobile.funcOpen.FuncOpenPanelUI extends laya.ui.View
var FuncOpenPanelUI=(function(_super){
	function FuncOpenPanelUI(){
		this.window=null;
		this.closeBtn=null;
		this.btn_left=null;
		this.btn_right=null;
		FuncOpenPanelUI.__super.call(this);
	}

	__class(FuncOpenPanelUI,'ui.mobile.funcOpen.FuncOpenPanelUI',_super);
	var __proto=FuncOpenPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/funcOpen/FuncOpenPanel");
	}

	return FuncOpenPanelUI;
})(View)


//class ui.mobile.funcOpen.FuncOpenTipUI extends laya.ui.View
var FuncOpenTipUI=(function(_super){
	function FuncOpenTipUI(){
		this.bg=null;
		this.icon=null;
		this.font=null;
		this.desc_txt=null;
		this.btn=null;
		FuncOpenTipUI.__super.call(this);
	}

	__class(FuncOpenTipUI,'ui.mobile.funcOpen.FuncOpenTipUI',_super);
	var __proto=FuncOpenTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/funcOpen/FuncOpenTip");
	}

	return FuncOpenTipUI;
})(View)


//class ui.mobile.fuzhan.FuzhanGuanggaoPanelUI extends laya.ui.View
var FuzhanGuanggaoPanelUI=(function(_super){
	function FuzhanGuanggaoPanelUI(){
		this.bg=null;
		this.btn=null;
		this.closeBtn=null;
		this.desc_txt=null;
		this.info_txt=null;
		this.name_txt=null;
		FuzhanGuanggaoPanelUI.__super.call(this);
	}

	__class(FuzhanGuanggaoPanelUI,'ui.mobile.fuzhan.FuzhanGuanggaoPanelUI',_super);
	var __proto=FuzhanGuanggaoPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/FuzhanGuanggaoPanel");
	}

	return FuzhanGuanggaoPanelUI;
})(View)


//class ui.mobile.fuzhan.FuzhanPanelUI extends laya.ui.View
var FuzhanPanelUI=(function(_super){
	function FuzhanPanelUI(){
		this.bg=null;
		this.viewSp=null;
		this.bg0=null;
		this.bg1=null;
		this.tabBtn=null;
		this.closeBtn=null;
		this.title=null;
		FuzhanPanelUI.__super.call(this);
	}

	__class(FuzhanPanelUI,'ui.mobile.fuzhan.FuzhanPanelUI',_super);
	var __proto=FuzhanPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/FuzhanPanel");
	}

	return FuzhanPanelUI;
})(View)


//class ui.mobile.fuzhan.panel.FuzhanCheckPlayerPanelUI extends laya.ui.View
var FuzhanCheckPlayerPanelUI=(function(_super){
	function FuzhanCheckPlayerPanelUI(){
		this.bg=null;
		this.bg1=null;
		this.closeBtn=null;
		FuzhanCheckPlayerPanelUI.__super.call(this);
	}

	__class(FuzhanCheckPlayerPanelUI,'ui.mobile.fuzhan.panel.FuzhanCheckPlayerPanelUI',_super);
	var __proto=FuzhanCheckPlayerPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/panel/FuzhanCheckPlayerPanel");
	}

	return FuzhanCheckPlayerPanelUI;
})(View)


//class ui.mobile.fuzhan.panel.FuzhanFenpiePanelUI extends laya.ui.View
var FuzhanFenpiePanelUI=(function(_super){
	function FuzhanFenpiePanelUI(){
		this.window=null;
		this.bg=null;
		this.list1=null;
		this.list2=null;
		this.l_bg=null;
		this.r_bg=null;
		this.fenpeiImg=null;
		this.infoTxt=null;
		this.descTxt=null;
		this.numTxt=null;
		this.btn=null;
		this.btnFenpie=null;
		this.btnShenqing=null;
		this.title=null;
		FuzhanFenpiePanelUI.__super.call(this);
	}

	__class(FuzhanFenpiePanelUI,'ui.mobile.fuzhan.panel.FuzhanFenpiePanelUI',_super);
	var __proto=FuzhanFenpiePanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/panel/FuzhanFenpiePanel");
	}

	return FuzhanFenpiePanelUI;
})(View)


//class ui.mobile.fuzhan.panel.FuzhanFinishResultPanelUI extends laya.ui.View
var FuzhanFinishResultPanelUI=(function(_super){
	function FuzhanFinishResultPanelUI(){
		this.bg=null;
		this.list=null;
		this.meImg=null;
		this.otherImg=null;
		this.myImg=null;
		this.diImg=null;
		this.btn=null;
		FuzhanFinishResultPanelUI.__super.call(this);
	}

	__class(FuzhanFinishResultPanelUI,'ui.mobile.fuzhan.panel.FuzhanFinishResultPanelUI',_super);
	var __proto=FuzhanFinishResultPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/panel/FuzhanFinishResultPanel");
	}

	return FuzhanFinishResultPanelUI;
})(View)


//class ui.mobile.fuzhan.panel.FuzhanGongluePanelUI extends laya.ui.View
var FuzhanGongluePanelUI=(function(_super){
	function FuzhanGongluePanelUI(){
		this.bg=null;
		this.gonglueImg2=null;
		this.gonglueImg3=null;
		this.gonglueImg0=null;
		this.gonglueImg1=null;
		this.gonglueImg4=null;
		this.descTxt=null;
		this.closeBtn=null;
		this.tipTxt0=null;
		this.tipTxt1=null;
		FuzhanGongluePanelUI.__super.call(this);
	}

	__class(FuzhanGongluePanelUI,'ui.mobile.fuzhan.panel.FuzhanGongluePanelUI',_super);
	var __proto=FuzhanGongluePanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/panel/FuzhanGongluePanel");
	}

	return FuzhanGongluePanelUI;
})(View)


//class ui.mobile.fuzhan.panel.FuzhanGuildShengqingPanelUI extends laya.ui.View
var FuzhanGuildShengqingPanelUI=(function(_super){
	function FuzhanGuildShengqingPanelUI(){
		this.bg=null;
		this.bg2=null;
		this.nameTxt=null;
		this.tipsTxt=null;
		this.list=null;
		this.btnOk=null;
		this.btnNo=null;
		this.closeBtn=null;
		FuzhanGuildShengqingPanelUI.__super.call(this);
	}

	__class(FuzhanGuildShengqingPanelUI,'ui.mobile.fuzhan.panel.FuzhanGuildShengqingPanelUI',_super);
	var __proto=FuzhanGuildShengqingPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/panel/FuzhanGuildShengqingPanel");
	}

	return FuzhanGuildShengqingPanelUI;
})(View)


//class ui.mobile.fuzhan.panel.FuzhanGuildTipsPanelUI extends laya.ui.View
var FuzhanGuildTipsPanelUI=(function(_super){
	function FuzhanGuildTipsPanelUI(){
		this.bg=null;
		this.bg1=null;
		this.title=null;
		this.descTxt=null;
		this.guildTxt0=null;
		this.guildTxt1=null;
		this.closeBtn=null;
		this.btnHb=null;
		this.btnXb=null;
		this.checkBox=null;
		FuzhanGuildTipsPanelUI.__super.call(this);
	}

	__class(FuzhanGuildTipsPanelUI,'ui.mobile.fuzhan.panel.FuzhanGuildTipsPanelUI',_super);
	var __proto=FuzhanGuildTipsPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/panel/FuzhanGuildTipsPanel");
	}

	return FuzhanGuildTipsPanelUI;
})(View)


//class ui.mobile.fuzhan.panel.FuzhanJifenPanelUI extends laya.ui.View
var FuzhanJifenPanelUI=(function(_super){
	function FuzhanJifenPanelUI(){
		this.bg=null;
		this.title=null;
		this.list=null;
		this.closeBtn=null;
		FuzhanJifenPanelUI.__super.call(this);
	}

	__class(FuzhanJifenPanelUI,'ui.mobile.fuzhan.panel.FuzhanJifenPanelUI',_super);
	var __proto=FuzhanJifenPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/panel/FuzhanJifenPanel");
	}

	return FuzhanJifenPanelUI;
})(View)


//class ui.mobile.fuzhan.panel.FuzhanPkResultPanelUI extends laya.ui.View
var FuzhanPkResultPanelUI=(function(_super){
	function FuzhanPkResultPanelUI(){
		this.bg=null;
		this.leftImg=null;
		this.rightImg=null;
		this.stateImg=null;
		this.jifenImg0=null;
		this.jifenImg1=null;
		this.leftSp=null;
		this.nameTxt0=null;
		this.guildTxt0=null;
		this.rightSp=null;
		this.nameTxt1=null;
		this.guildTxt1=null;
		this.btn=null;
		FuzhanPkResultPanelUI.__super.call(this);
	}

	__class(FuzhanPkResultPanelUI,'ui.mobile.fuzhan.panel.FuzhanPkResultPanelUI',_super);
	var __proto=FuzhanPkResultPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/panel/FuzhanPkResultPanel");
	}

	return FuzhanPkResultPanelUI;
})(View)


//class ui.mobile.fuzhan.panel.FuzhanPkTopTimeUI extends laya.ui.View
var FuzhanPkTopTimeUI=(function(_super){
	function FuzhanPkTopTimeUI(){
		this.bg=null;
		FuzhanPkTopTimeUI.__super.call(this);
	}

	__class(FuzhanPkTopTimeUI,'ui.mobile.fuzhan.panel.FuzhanPkTopTimeUI',_super);
	var __proto=FuzhanPkTopTimeUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/panel/FuzhanPkTopTime");
	}

	return FuzhanPkTopTimeUI;
})(View)


//class ui.mobile.fuzhan.panel.FuzhanShenqingPanelUI extends laya.ui.View
var FuzhanShenqingPanelUI=(function(_super){
	function FuzhanShenqingPanelUI(){
		this.bg=null;
		this.list=null;
		this.closeBtn=null;
		this.title=null;
		FuzhanShenqingPanelUI.__super.call(this);
	}

	__class(FuzhanShenqingPanelUI,'ui.mobile.fuzhan.panel.FuzhanShenqingPanelUI',_super);
	var __proto=FuzhanShenqingPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/panel/FuzhanShenqingPanel");
	}

	return FuzhanShenqingPanelUI;
})(View)


//class ui.mobile.fuzhan.panel.FuzhanSideProUI extends laya.ui.View
var FuzhanSideProUI=(function(_super){
	function FuzhanSideProUI(){
		this.bg=null;
		this.pro=null;
		this.bgKuang=null;
		this.proTxt=null;
		FuzhanSideProUI.__super.call(this);
	}

	__class(FuzhanSideProUI,'ui.mobile.fuzhan.panel.FuzhanSideProUI',_super);
	var __proto=FuzhanSideProUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/panel/FuzhanSidePro");
	}

	return FuzhanSideProUI;
})(View)


//class ui.mobile.fuzhan.panel.FuzhanWheelPanelUI extends laya.ui.View
var FuzhanWheelPanelUI=(function(_super){
	function FuzhanWheelPanelUI(){
		this.bg=null;
		this.list1=null;
		this.list2=null;
		this.closeBtn=null;
		this.btn=null;
		this.getted=null;
		this.descTxt=null;
		this.nameTxt=null;
		FuzhanWheelPanelUI.__super.call(this);
	}

	__class(FuzhanWheelPanelUI,'ui.mobile.fuzhan.panel.FuzhanWheelPanelUI',_super);
	var __proto=FuzhanWheelPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/panel/FuzhanWheelPanel");
	}

	return FuzhanWheelPanelUI;
})(View)


//class ui.mobile.fuzhan.panel.FuzhanWorldZhanjiPanelUI extends laya.ui.View
var FuzhanWorldZhanjiPanelUI=(function(_super){
	function FuzhanWorldZhanjiPanelUI(){
		this.closeBtn=null;
		this.title=null;
		this.list=null;
		FuzhanWorldZhanjiPanelUI.__super.call(this);
	}

	__class(FuzhanWorldZhanjiPanelUI,'ui.mobile.fuzhan.panel.FuzhanWorldZhanjiPanelUI',_super);
	var __proto=FuzhanWorldZhanjiPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/fuzhan/panel/FuzhanWorldZhanjiPanel");
	}

	return FuzhanWorldZhanjiPanelUI;
})(View)


//class ui.mobile.gm.GmActionPanelUI extends laya.ui.View
var GmActionPanelUI=(function(_super){
	function GmActionPanelUI(){
		this.window=null;
		this.container=null;
		this.txt=null;
		this.closeBtn=null;
		this.copy_btn=null;
		this.see_btn=null;
		GmActionPanelUI.__super.call(this);
	}

	__class(GmActionPanelUI,'ui.mobile.gm.GmActionPanelUI',_super);
	var __proto=GmActionPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gm/GmActionPanel");
	}

	return GmActionPanelUI;
})(View)


//class ui.mobile.gm.GmPanelUI extends laya.ui.View
var GmPanelUI=(function(_super){
	function GmPanelUI(){
		this.window=null;
		this.tab=null;
		this.roleName_txt=null;
		this.closeBtn=null;
		this.time_txt=null;
		this.date_txt=null;
		GmPanelUI.__super.call(this);
	}

	__class(GmPanelUI,'ui.mobile.gm.GmPanelUI',_super);
	var __proto=GmPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gm/GmPanel");
	}

	return GmPanelUI;
})(View)


//class ui.mobile.gm.view.GMSearchPanelUI extends laya.ui.View
var GMSearchPanelUI=(function(_super){
	function GMSearchPanelUI(){
		this.window=null;
		this.list=null;
		this.btn=null;
		this.no_txt=null;
		this.input_txt=null;
		GMSearchPanelUI.__super.call(this);
	}

	__class(GMSearchPanelUI,'ui.mobile.gm.view.GMSearchPanelUI',_super);
	var __proto=GMSearchPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window2UI",Window2UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gm/view/GMSearchPanel");
	}

	return GMSearchPanelUI;
})(View)


//class ui.mobile.gubao.GubaoUPPanelUI extends laya.ui.View
var GubaoUPPanelUI=(function(_super){
	function GubaoUPPanelUI(){
		this.window=null;
		this.c_box=null;
		this.c_txt=null;
		this.c_title=null;
		this.n_box=null;
		this.n_title=null;
		this.n_txt=null;
		this.btnUP=null;
		this.costTxt=null;
		this.maxTxt=null;
		this.yimanji=null;
		GubaoUPPanelUI.__super.call(this);
	}

	__class(GubaoUPPanelUI,'ui.mobile.gubao.GubaoUPPanelUI',_super);
	var __proto=GubaoUPPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window5UI",Window5UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gubao/GubaoUPPanel");
	}

	return GubaoUPPanelUI;
})(View)


//class ui.mobile.gubao.miaosha.MiaoShaUpPanelUI extends laya.ui.View
var MiaoShaUpPanelUI=(function(_super){
	function MiaoShaUpPanelUI(){
		this.bg=null;
		this.eff_box=null;
		this.name_img=null;
		this.attr_img=null;
		this.c_attrTxt=null;
		this.upbox=null;
		this.item_box=null;
		this.cost_txt=null;
		this.btnUP=null;
		this.yimanjie=null;
		MiaoShaUpPanelUI.__super.call(this);
	}

	__class(MiaoShaUpPanelUI,'ui.mobile.gubao.miaosha.MiaoShaUpPanelUI',_super);
	var __proto=MiaoShaUpPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gubao/miaosha/MiaoShaUpPanel");
	}

	return MiaoShaUpPanelUI;
})(View)


//class ui.mobile.gubao.WaiFuShenGuPanelUI extends laya.ui.View
var WaiFuShenGuPanelUI=(function(_super){
	function WaiFuShenGuPanelUI(){
		this.bg_window=null;
		this.closeBtn=null;
		this.title=null;
		this.bg=null;
		this.imgBody=null;
		this.imgPart=null;
		this.name_txt=null;
		this.line1=null;
		this.line2=null;
		this.line3=null;
		this.line4=null;
		this.line5=null;
		this.line6=null;
		this.bg_grid1=null;
		this.qh1=null;
		this.lock1=null;
		this.bg_grid2=null;
		this.qh2=null;
		this.lock2=null;
		this.bg_grid3=null;
		this.qh3=null;
		this.lock3=null;
		this.bg_grid4=null;
		this.qh4=null;
		this.lock4=null;
		this.bg_grid5=null;
		this.qh5=null;
		this.lock5=null;
		this.bg_grid6=null;
		this.qh6=null;
		this.lock6=null;
		this.imgSelected=null;
		this.bg_cost=null;
		this.icon0=null;
		this.icon1=null;
		this.cost_txt0=null;
		this.cost_txt1=null;
		this.btn_add=null;
		this.bg_attr=null;
		this.no_txt=null;
		this.btn=null;
		WaiFuShenGuPanelUI.__super.call(this);
	}

	__class(WaiFuShenGuPanelUI,'ui.mobile.gubao.WaiFuShenGuPanelUI',_super);
	var __proto=WaiFuShenGuPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gubao/WaiFuShenGuPanel");
	}

	return WaiFuShenGuPanelUI;
})(View)


//class ui.mobile.gubao.YuhunGridUI extends laya.ui.View
var YuhunGridUI=(function(_super){
	function YuhunGridUI(){
		this.box=null;
		this.bg=null;
		YuhunGridUI.__super.call(this);
	}

	__class(YuhunGridUI,'ui.mobile.gubao.YuhunGridUI',_super);
	var __proto=YuhunGridUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gubao/YuhunGrid");
	}

	return YuhunGridUI;
})(View)


//class ui.mobile.gubao.YuhunUPPanelUI extends laya.ui.View
var YuhunUPPanelUI=(function(_super){
	function YuhunUPPanelUI(){
		this.bg1=null;
		this.bg2=null;
		this.grid=null;
		this.yimanjie=null;
		this.closeBtn=null;
		this.n_box=null;
		this.n_attrTxt=null;
		this.nameTxt=null;
		this.c_attrTxt=null;
		this.upbox=null;
		this.cost_txt=null;
		this.btnUP=null;
		this.btnGet=null;
		YuhunUPPanelUI.__super.call(this);
	}

	__class(YuhunUPPanelUI,'ui.mobile.gubao.YuhunUPPanelUI',_super);
	var __proto=YuhunUPPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.gubao.YuhunGridUI",YuhunGridUI);
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/gubao/YuhunUPPanel");
	}

	return YuhunUPPanelUI;
})(View)


//class ui.mobile.guild.GuildCreatePanelUI extends laya.ui.View
var GuildCreatePanelUI=(function(_super){
	function GuildCreatePanelUI(){
		this.window=null;
		this.title=null;
		this.txt=null;
		this.name_txt=null;
		this.item_txt=null;
		this.checkBox=null;
		this.ok_btn=null;
		GuildCreatePanelUI.__super.call(this);
	}

	__class(GuildCreatePanelUI,'ui.mobile.guild.GuildCreatePanelUI',_super);
	var __proto=GuildCreatePanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/guild/GuildCreatePanel");
	}

	return GuildCreatePanelUI;
})(View)


//class ui.mobile.guild.GuildHiPanelUI extends laya.ui.View
var GuildHiPanelUI=(function(_super){
	function GuildHiPanelUI(){
		this.window=null;
		this.btn1=null;
		this.btn3=null;
		this.btn2=null;
		this.btn4=null;
		this.time_txt=null;
		this.exp4=null;
		this.exp3=null;
		this.exp1=null;
		this.exp2=null;
		this.font=null;
		this.title=null;
		this.btn=null;
		GuildHiPanelUI.__super.call(this);
	}

	__class(GuildHiPanelUI,'ui.mobile.guild.GuildHiPanelUI',_super);
	var __proto=GuildHiPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/guild/GuildHiPanel");
	}

	return GuildHiPanelUI;
})(View)


//class ui.mobile.guild.GuildPanelUI extends laya.ui.View
var GuildPanelUI$1=(function(_super){
	function GuildPanelUI(){
		this.window=null;
		this.bg=null;
		this.tabs=null;
		this.m_box=null;
		this.m_icon=null;
		this.m_txt=null;
		this.m_nameTxt=null;
		this.m_btnGet=null;
		GuildPanelUI.__super.call(this);
	}

	__class(GuildPanelUI,'ui.mobile.guild.GuildPanelUI',_super,'GuildPanelUI$1');
	var __proto=GuildPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/guild/GuildPanel");
	}

	return GuildPanelUI;
})(View)


//class ui.mobile.guild.GuildQifuPanelUI extends laya.ui.View
var GuildQifuPanelUI=(function(_super){
	function GuildQifuPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.bar=null;
		this.item1=null;
		this.ylq1=null;
		this.money_txt1=null;
		this.btn1=null;
		this.item2=null;
		this.ylq2=null;
		this.money_txt2=null;
		this.btn2=null;
		this.link2=null;
		this.item3=null;
		this.ylq3=null;
		this.money_txt3=null;
		this.btn3=null;
		this.link3=null;
		this.item4=null;
		this.ylq4=null;
		this.free_txt4=null;
		this.money_txt4=null;
		this.btn4=null;
		this.reward0=null;
		this.box0=null;
		this.txt0=null;
		this.yilingqu0=null;
		this.reward1=null;
		this.box1=null;
		this.txt1=null;
		this.yilingqu1=null;
		this.reward2=null;
		this.box2=null;
		this.txt2=null;
		this.yilingqu2=null;
		this.reward3=null;
		this.box3=null;
		this.txt3=null;
		this.yilingqu3=null;
		this.reward4=null;
		this.box4=null;
		this.txt4=null;
		this.yilingqu4=null;
		GuildQifuPanelUI.__super.call(this);
	}

	__class(GuildQifuPanelUI,'ui.mobile.guild.GuildQifuPanelUI',_super);
	var __proto=GuildQifuPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/guild/GuildQifuPanel");
	}

	return GuildQifuPanelUI;
})(View)


//class ui.mobile.guild.GuildSelectPanelUI extends laya.ui.View
var GuildSelectPanelUI=(function(_super){
	function GuildSelectPanelUI(){
		this.window=null;
		this.title=null;
		this.name_txt=null;
		this.yuanbao_txt=null;
		this.time_txt=null;
		this.yuanbao_icon=null;
		this.btn=null;
		GuildSelectPanelUI.__super.call(this);
	}

	__class(GuildSelectPanelUI,'ui.mobile.guild.GuildSelectPanelUI',_super);
	var __proto=GuildSelectPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/guild/GuildSelectPanel");
	}

	return GuildSelectPanelUI;
})(View)


//class ui.mobile.guild.GuildVotePanelUI extends laya.ui.View
var GuildVotePanelUI=(function(_super){
	function GuildVotePanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.desc_txt=null;
		this.time_txt=null;
		this.name_txt1=null;
		this.name_txt2=null;
		this.btn1=null;
		this.btn2=null;
		this.title=null;
		GuildVotePanelUI.__super.call(this);
	}

	__class(GuildVotePanelUI,'ui.mobile.guild.GuildVotePanelUI',_super);
	var __proto=GuildVotePanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/guild/GuildVotePanel");
	}

	return GuildVotePanelUI;
})(View)


//class ui.mobile.guild.GuildZhaohuanPanelUI extends laya.ui.View
var GuildZhaohuanPanelUI=(function(_super){
	function GuildZhaohuanPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.btnGou1=null;
		this.btnGo=null;
		this.nameTxt=null;
		this.btnGou2=null;
		GuildZhaohuanPanelUI.__super.call(this);
	}

	__class(GuildZhaohuanPanelUI,'ui.mobile.guild.GuildZhaohuanPanelUI',_super);
	var __proto=GuildZhaohuanPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/guild/GuildZhaohuanPanel");
	}

	return GuildZhaohuanPanelUI;
})(View)


//class ui.mobile.guild.list.GuildListPanelUI extends laya.ui.View
var GuildListPanelUI=(function(_super){
	function GuildListPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.no_box=null;
		this.cd_txt=null;
		this.cd_btn=null;
		this.create_btn=null;
		this.apply_btn=null;
		this.list=null;
		this.has_box=null;
		this.list_has=null;
		GuildListPanelUI.__super.call(this);
	}

	__class(GuildListPanelUI,'ui.mobile.guild.list.GuildListPanelUI',_super);
	var __proto=GuildListPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/guild/list/GuildListPanel");
	}

	return GuildListPanelUI;
})(View)


//class ui.mobile.guild.xuanba.GuildXuanbaItemUI extends laya.ui.View
var GuildXuanbaItemUI=(function(_super){
	function GuildXuanbaItemUI(){
		this.bg=null;
		this.rank_txt=null;
		this.name_txt=null;
		this.level_txt=null;
		GuildXuanbaItemUI.__super.call(this);
	}

	__class(GuildXuanbaItemUI,'ui.mobile.guild.xuanba.GuildXuanbaItemUI',_super);
	var __proto=GuildXuanbaItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/guild/xuanba/GuildXuanbaItem");
	}

	return GuildXuanbaItemUI;
})(View)


//class ui.mobile.help.BaoKuJiangLiPanelUI extends laya.ui.View
var BaoKuJiangLiPanelUI=(function(_super){
	function BaoKuJiangLiPanelUI(){
		this.window=null;
		this.title_txt=null;
		this.itemPanel=null;
		this.des_txt=null;
		BaoKuJiangLiPanelUI.__super.call(this);
	}

	__class(BaoKuJiangLiPanelUI,'ui.mobile.help.BaoKuJiangLiPanelUI',_super);
	var __proto=BaoKuJiangLiPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window5UI",Window5UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/help/BaoKuJiangLiPanel");
	}

	return BaoKuJiangLiPanelUI;
})(View)


//class ui.mobile.help.GetWayJumpPanelUI extends laya.ui.View
var GetWayJumpPanelUI=(function(_super){
	function GetWayJumpPanelUI(){
		this.bg=null;
		this.bg2=null;
		this.name_txt=null;
		this.closeBtn=null;
		this.itemPanel=null;
		GetWayJumpPanelUI.__super.call(this);
	}

	__class(GetWayJumpPanelUI,'ui.mobile.help.GetWayJumpPanelUI',_super);
	var __proto=GetWayJumpPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/help/GetWayJumpPanel");
	}

	return GetWayJumpPanelUI;
})(View)


//class ui.mobile.help.GetwayPanelUI extends laya.ui.View
var GetwayPanelUI=(function(_super){
	function GetwayPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.list=null;
		this.shop_box=null;
		this.grid=null;
		this.buy_btn=null;
		this.limit_txt=null;
		this.name_txt=null;
		this.money_txt=null;
		this.icon=null;
		GetwayPanelUI.__super.call(this);
	}

	__class(GetwayPanelUI,'ui.mobile.help.GetwayPanelUI',_super);
	var __proto=GetwayPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/help/GetwayPanel");
	}

	return GetwayPanelUI;
})(View)


//class ui.mobile.help.GetWayQuickBuyPanelUI extends laya.ui.View
var GetWayQuickBuyPanelUI=(function(_super){
	function GetWayQuickBuyPanelUI(){
		this.bg=null;
		this.bg2=null;
		this.closeBtn=null;
		this.btn_add_10=null;
		this.btn_add=null;
		this.btn_reduce=null;
		this.btn_reduce_10=null;
		this.num_txt=null;
		this.btn_buy=null;
		this.icon=null;
		this.name_txt=null;
		this.need_txt=null;
		this.money_txt=null;
		this.buyCount_txt=null;
		GetWayQuickBuyPanelUI.__super.call(this);
	}

	__class(GetWayQuickBuyPanelUI,'ui.mobile.help.GetWayQuickBuyPanelUI',_super);
	var __proto=GetWayQuickBuyPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/help/GetWayQuickBuyPanel");
	}

	return GetWayQuickBuyPanelUI;
})(View)


//class ui.mobile.help.QuickComposePanelUI extends laya.ui.View
var QuickComposePanelUI=(function(_super){
	function QuickComposePanelUI(){
		this.bg=null;
		this.btn_add_10=null;
		this.btn_add=null;
		this.btn_reduce=null;
		this.btn_reduce_10=null;
		this.closeBtn=null;
		this.btn_sure=null;
		this.num_txt=null;
		this.name_txt2=null;
		this.name_txt=null;
		this.need_txt=null;
		this.des_txt=null;
		QuickComposePanelUI.__super.call(this);
	}

	__class(QuickComposePanelUI,'ui.mobile.help.QuickComposePanelUI',_super);
	var __proto=QuickComposePanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/help/QuickComposePanel");
	}

	return QuickComposePanelUI;
})(View)


//class ui.mobile.jiaoyi.JiaoyiApplyPanelUI extends laya.ui.View
var JiaoyiApplyPanelUI=(function(_super){
	function JiaoyiApplyPanelUI(){
		this.bg=null;
		this.bg2=null;
		this.list=null;
		this.closeBtn=null;
		JiaoyiApplyPanelUI.__super.call(this);
	}

	__class(JiaoyiApplyPanelUI,'ui.mobile.jiaoyi.JiaoyiApplyPanelUI',_super);
	var __proto=JiaoyiApplyPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/jiaoyi/JiaoyiApplyPanel");
	}

	return JiaoyiApplyPanelUI;
})(View)


//class ui.mobile.jiaoyi.JiaoyiPanelUI extends laya.ui.View
var JiaoyiPanelUI=(function(_super){
	function JiaoyiPanelUI(){
		this.window=null;
		this.title=null;
		this.bg=null;
		this.op_nameTxt=null;
		this.b_list=null;
		this.m_box=null;
		this.btnGou=null;
		this.btnSend=null;
		this.btnLock=null;
		this.m_lockBox=null;
		this.m_lock=null;
		this.m_jiaoyi=null;
		this.o_lockBox=null;
		this.o_lock=null;
		this.o_jiaoyi=null;
		JiaoyiPanelUI.__super.call(this);
	}

	__class(JiaoyiPanelUI,'ui.mobile.jiaoyi.JiaoyiPanelUI',_super);
	var __proto=JiaoyiPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/jiaoyi/JiaoyiPanel");
	}

	return JiaoyiPanelUI;
})(View)


//class ui.mobile.kuafu.lhsd.LunhuiJiaozhuZoneUI extends laya.ui.View
var LunhuiJiaozhuZoneUI=(function(_super){
	function LunhuiJiaozhuZoneUI(){
		this.bg=null;
		this.titleBox=null;
		this.title=null;
		this.descTxt=null;
		this.btnHide=null;
		this.btnExit=null;
		LunhuiJiaozhuZoneUI.__super.call(this);
	}

	__class(LunhuiJiaozhuZoneUI,'ui.mobile.kuafu.lhsd.LunhuiJiaozhuZoneUI',_super);
	var __proto=LunhuiJiaozhuZoneUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafu/lhsd/LunhuiJiaozhuZone");
	}

	return LunhuiJiaozhuZoneUI;
})(View)


//class ui.mobile.kuafu.szsd.NpcShengZhuangShenDianPanelUI extends laya.ui.View
var NpcShengZhuangShenDianPanelUI=(function(_super){
	function NpcShengZhuangShenDianPanelUI(){
		this.window=null;
		this.title=null;
		this.title1=null;
		this.desc_txt1=null;
		this.line2=null;
		this.list=null;
		NpcShengZhuangShenDianPanelUI.__super.call(this);
	}

	__class(NpcShengZhuangShenDianPanelUI,'ui.mobile.kuafu.szsd.NpcShengZhuangShenDianPanelUI',_super);
	var __proto=NpcShengZhuangShenDianPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window2UI",Window2UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafu/szsd/NpcShengZhuangShenDianPanel");
	}

	return NpcShengZhuangShenDianPanelUI;
})(View)


//class ui.mobile.kuafu.wlsz.WoLongShopPanelUI extends laya.ui.View
var WoLongShopPanelUI=(function(_super){
	function WoLongShopPanelUI(){
		this.bg=null;
		this.bg2=null;
		this.imgTitle=null;
		this.closeBtn=null;
		this.num_txt=null;
		this.list=null;
		WoLongShopPanelUI.__super.call(this);
	}

	__class(WoLongShopPanelUI,'ui.mobile.kuafu.wlsz.WoLongShopPanelUI',_super);
	var __proto=WoLongShopPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafu/wlsz/WoLongShopPanel");
	}

	return WoLongShopPanelUI;
})(View)


//class ui.mobile.kuafu.zyz.KuaFuCampWarResultPanelUI extends laya.ui.View
var KuaFuCampWarResultPanelUI=(function(_super){
	function KuaFuCampWarResultPanelUI(){
		this.bg=null;
		this.top1=null;
		this.top2=null;
		this.top3=null;
		this.name_txt1=null;
		this.name_txt2=null;
		this.name_txt3=null;
		this.guild_txt1=null;
		this.guild_txt2=null;
		this.guild_txt3=null;
		this.point_txt1=null;
		this.point_txt2=null;
		this.point_txt3=null;
		this.myRank_txt=null;
		this.myPoint_txt=null;
		this.btn=null;
		this.reward_txt=null;
		KuaFuCampWarResultPanelUI.__super.call(this);
	}

	__class(KuaFuCampWarResultPanelUI,'ui.mobile.kuafu.zyz.KuaFuCampWarResultPanelUI',_super);
	var __proto=KuaFuCampWarResultPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafu/zyz/KuaFuCampWarResultPanel");
	}

	return KuaFuCampWarResultPanelUI;
})(View)


//class ui.mobile.kuafu.zyz.KuaFuCampWarTrackUI extends laya.ui.View
var KuaFuCampWarTrackUI=(function(_super){
	function KuaFuCampWarTrackUI(){
		this.bg=null;
		this.titleBox=null;
		this.title=null;
		this.btn_rank=null;
		this.btn_tip=null;
		this.list=null;
		this.point_txt=null;
		this.time_txt=null;
		this.chang_txt=null;
		this.btnHide=null;
		this.btnExit=null;
		this.timeNode=null;
		this.imgChange=null;
		this.rewardNode=null;
		KuaFuCampWarTrackUI.__super.call(this);
	}

	__class(KuaFuCampWarTrackUI,'ui.mobile.kuafu.zyz.KuaFuCampWarTrackUI',_super);
	var __proto=KuaFuCampWarTrackUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafu/zyz/KuaFuCampWarTrack");
	}

	return KuaFuCampWarTrackUI;
})(View)


//class ui.mobile.kuafuBattle.KuafuBattlePanelUI extends laya.ui.View
var KuafuBattlePanelUI=(function(_super){
	function KuafuBattlePanelUI(){
		this.window=null;
		this.bg=null;
		this.title=null;
		KuafuBattlePanelUI.__super.call(this);
	}

	__class(KuafuBattlePanelUI,'ui.mobile.kuafuBattle.KuafuBattlePanelUI',_super);
	var __proto=KuafuBattlePanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafuBattle/KuafuBattlePanel");
	}

	return KuafuBattlePanelUI;
})(View)


//class ui.mobile.kuafuBattle.panel.KuafuBossTishenPanelUI extends laya.ui.View
var KuafuBossTishenPanelUI=(function(_super){
	function KuafuBossTishenPanelUI(){
		this.bg=null;
		this.tishengBg=null;
		this.title=null;
		this.list=null;
		this.closeBtn=null;
		KuafuBossTishenPanelUI.__super.call(this);
	}

	__class(KuafuBossTishenPanelUI,'ui.mobile.kuafuBattle.panel.KuafuBossTishenPanelUI',_super);
	var __proto=KuafuBossTishenPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafuBattle/panel/KuafuBossTishenPanel");
	}

	return KuafuBossTishenPanelUI;
})(View)


//class ui.mobile.kuafuBattle.panel.RewardTipsPanelUI extends laya.ui.View
var RewardTipsPanelUI=(function(_super){
	function RewardTipsPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.title=null;
		RewardTipsPanelUI.__super.call(this);
	}

	__class(RewardTipsPanelUI,'ui.mobile.kuafuBattle.panel.RewardTipsPanelUI',_super);
	var __proto=RewardTipsPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuafuBattle/panel/RewardTipsPanel");
	}

	return RewardTipsPanelUI;
})(View)


//class ui.mobile.kuaisu_sj.KuaisuSJItemUI extends laya.ui.View
var KuaisuSJItemUI=(function(_super){
	function KuaisuSJItemUI(){
		this.iconImg=null;
		this.flag=null;
		this.titleTxt=null;
		this.typeTxt=null;
		this.txt=null;
		this.btn=null;
		KuaisuSJItemUI.__super.call(this);
	}

	__class(KuaisuSJItemUI,'ui.mobile.kuaisu_sj.KuaisuSJItemUI',_super);
	var __proto=KuaisuSJItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuaisu_sj/KuaisuSJItem");
	}

	return KuaisuSJItemUI;
})(View)


//class ui.mobile.kuaisu_sj.KuaisuSJPanelUI extends laya.ui.View
var KuaisuSJPanelUI=(function(_super){
	function KuaisuSJPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.p_list=null;
		KuaisuSJPanelUI.__super.call(this);
	}

	__class(KuaisuSJPanelUI,'ui.mobile.kuaisu_sj.KuaisuSJPanelUI',_super);
	var __proto=KuaisuSJPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.kuaisu_sj.KuaisuSJItemUI",KuaisuSJItemUI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/kuaisu_sj/KuaisuSJPanel");
	}

	return KuaisuSJPanelUI;
})(View)


//class ui.mobile.lilian.LilianDatiPanelUI extends laya.ui.View
var LilianDatiPanelUI=(function(_super){
	function LilianDatiPanelUI(){
		this.bg=null;
		this.item0=null;
		this.txt0=null;
		this.xx0=null;
		this.item1=null;
		this.txt1=null;
		this.xx1=null;
		this.gouImg=null;
		this.item2=null;
		this.txt2=null;
		this.xx2=null;
		this.item3=null;
		this.txt3=null;
		this.xx3=null;
		this.closeBtn=null;
		this.btn=null;
		this.timuTxt=null;
		LilianDatiPanelUI.__super.call(this);
	}

	__class(LilianDatiPanelUI,'ui.mobile.lilian.LilianDatiPanelUI',_super);
	var __proto=LilianDatiPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/lilian/LilianDatiPanel");
	}

	return LilianDatiPanelUI;
})(View)


//class ui.mobile.lilian.LilianDialogPanelUI extends laya.ui.View
var LilianDialogPanelUI=(function(_super){
	function LilianDialogPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.r_btn=null;
		this.l_btn=null;
		this.content_txt=null;
		LilianDialogPanelUI.__super.call(this);
	}

	__class(LilianDialogPanelUI,'ui.mobile.lilian.LilianDialogPanelUI',_super);
	var __proto=LilianDialogPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/lilian/LilianDialogPanel");
	}

	return LilianDialogPanelUI;
})(View)


//class ui.mobile.lilian.LilianPanelUI extends laya.ui.View
var LilianPanelUI=(function(_super){
	function LilianPanelUI(){
		this.window=null;
		this.openBox=null;
		this.btnOpen=null;
		this.taskBox=null;
		this.btnMenu4=null;
		this.btnMenu3=null;
		this.btnMenu2=null;
		this.btnMenu1=null;
		this.miaosuTxt=null;
		this.l_txt1=null;
		this.l_txt2=null;
		this.l_txt4=null;
		this.l_txt3=null;
		this.r_txt1=null;
		this.c_txt=null;
		this.c_icon=null;
		this.btnAuto1=null;
		this.btnAuto2=null;
		this.btnGo=null;
		this.tipBox=null;
		this.btnBuy=null;
		this.btnLink=null;
		this.closeBtn=null;
		LilianPanelUI.__super.call(this);
	}

	__class(LilianPanelUI,'ui.mobile.lilian.LilianPanelUI',_super);
	var __proto=LilianPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/lilian/LilianPanel");
	}

	return LilianPanelUI;
})(View)


//class ui.mobile.lilian.LilianReweardPanelUI extends laya.ui.View
var LilianReweardPanelUI=(function(_super){
	function LilianReweardPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.p_list=null;
		LilianReweardPanelUI.__super.call(this);
	}

	__class(LilianReweardPanelUI,'ui.mobile.lilian.LilianReweardPanelUI',_super);
	var __proto=LilianReweardPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/lilian/LilianReweardPanel");
	}

	return LilianReweardPanelUI;
})(View)


//class ui.mobile.lilian.LilianSetupPanelUI extends laya.ui.View
var LilianSetupPanelUI=(function(_super){
	function LilianSetupPanelUI(){
		this.window=null;
		this.title=null;
		this.btnCK0=null;
		this.btnCKT0=null;
		this.btnCK1=null;
		this.btnCKT1=null;
		this.btnCK2=null;
		this.btnCKT2=null;
		this.btnCK3=null;
		this.btnCKT3=null;
		this.btnCK4=null;
		this.btnCKT4=null;
		this.zhanliTxt=null;
		this.failTxt=null;
		LilianSetupPanelUI.__super.call(this);
	}

	__class(LilianSetupPanelUI,'ui.mobile.lilian.LilianSetupPanelUI',_super);
	var __proto=LilianSetupPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window5UI",Window5UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/lilian/LilianSetupPanel");
	}

	return LilianSetupPanelUI;
})(View)


//class ui.mobile.lilian.LilianShopPanelUI extends laya.ui.View
var LilianShopPanelUI=(function(_super){
	function LilianShopPanelUI(){
		this.window=null;
		this.p_list=null;
		this.m_box0=null;
		this.m_txt0=null;
		this.m_icon0=null;
		this.m_box1=null;
		this.m_txt1=null;
		this.m_icon1=null;
		LilianShopPanelUI.__super.call(this);
	}

	__class(LilianShopPanelUI,'ui.mobile.lilian.LilianShopPanelUI',_super);
	var __proto=LilianShopPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/lilian/LilianShopPanel");
	}

	return LilianShopPanelUI;
})(View)


//class ui.mobile.lilian.LilianTeamPanelUI extends laya.ui.View
var LilianTeamPanelUI=(function(_super){
	function LilianTeamPanelUI(){
		this.window=null;
		this.bg=null;
		this.jianyin2=null;
		this.jianyin0=null;
		this.jianyin1=null;
		this.nameBox0=null;
		this.nameTxt0=null;
		this.duizhang=null;
		this.nameBox2=null;
		this.nameTxt2=null;
		this.nameBox1=null;
		this.nameTxt1=null;
		this.btnAction=null;
		this.l_btn=null;
		this.r_btn=null;
		this.title=null;
		this.btnStart=null;
		this.timeBox=null;
		this.timeTxt=null;
		LilianTeamPanelUI.__super.call(this);
	}

	__class(LilianTeamPanelUI,'ui.mobile.lilian.LilianTeamPanelUI',_super);
	var __proto=LilianTeamPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/lilian/LilianTeamPanel");
	}

	return LilianTeamPanelUI;
})(View)


//class ui.mobile.lilian.LilianZoneInfoUI extends laya.ui.View
var LilianZoneInfoUI=(function(_super){
	function LilianZoneInfoUI(){
		this.bg=null;
		this.titleBox=null;
		this.title=null;
		this.txt0=null;
		this.txt1=null;
		this.txt2=null;
		this.txt3=null;
		this.btnHide=null;
		this.btnExit=null;
		LilianZoneInfoUI.__super.call(this);
	}

	__class(LilianZoneInfoUI,'ui.mobile.lilian.LilianZoneInfoUI',_super);
	var __proto=LilianZoneInfoUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/lilian/LilianZoneInfo");
	}

	return LilianZoneInfoUI;
})(View)


//class ui.mobile.lilian.LilianZoneResultPanelUI extends laya.ui.View
var LilianZoneResultPanelUI=(function(_super){
	function LilianZoneResultPanelUI(){
		this.bg=null;
		this.h_box0=null;
		this.h_icon0=null;
		this.h_txt0=null;
		this.h_box2=null;
		this.h_icon2=null;
		this.h_txt2=null;
		this.c_txt=null;
		this.c_icon=null;
		this.closeBtn=null;
		this.timeTxt=null;
		this.h_box1=null;
		this.h_icon1=null;
		this.h_txt1=null;
		LilianZoneResultPanelUI.__super.call(this);
	}

	__class(LilianZoneResultPanelUI,'ui.mobile.lilian.LilianZoneResultPanelUI',_super);
	var __proto=LilianZoneResultPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/lilian/LilianZoneResultPanel");
	}

	return LilianZoneResultPanelUI;
})(View)


//class ui.mobile.log.LogPanelUI extends laya.ui.View
var LogPanelUI=(function(_super){
	function LogPanelUI(){
		this.window=null;
		this.tab=null;
		this.scroll_box=null;
		this.copy_btn=null;
		this.clear_btn=null;
		this.panel=null;
		this.pingbi_box=null;
		this.id_btn=null;
		this.id_txt=null;
		this.id_txt2=null;
		this.pingbi_box2=null;
		this.id_btn2=null;
		this.pingbi_box3=null;
		this.pingbi_box4=null;
		LogPanelUI.__super.call(this);
	}

	__class(LogPanelUI,'ui.mobile.log.LogPanelUI',_super);
	var __proto=LogPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/log/LogPanel");
	}

	return LogPanelUI;
})(View)


//class ui.mobile.mail.MailItemUI extends laya.ui.View
var MailItemUI=(function(_super){
	function MailItemUI(){
		this.bg=null;
		this.isRead=null;
		this.hasItem=null;
		this.title_txt=null;
		this.isRead_txt=null;
		this.sender_txt=null;
		this.fujian=null;
		MailItemUI.__super.call(this);
	}

	__class(MailItemUI,'ui.mobile.mail.MailItemUI',_super);
	var __proto=MailItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/mail/MailItem");
	}

	return MailItemUI;
})(View)


//class ui.mobile.main.common.HpQipaoUI extends laya.ui.View
var HpQipaoUI=(function(_super){
	function HpQipaoUI(){
		this.bg=null;
		this.txt=null;
		HpQipaoUI.__super.call(this);
	}

	__class(HpQipaoUI,'ui.mobile.main.common.HpQipaoUI',_super);
	var __proto=HpQipaoUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/common/HpQipao");
	}

	return HpQipaoUI;
})(View)


//class ui.mobile.main.effect.AttributeUpMobiItemUI extends laya.ui.View
var AttributeUpMobiItemUI=(function(_super){
	function AttributeUpMobiItemUI(){
		this.txt=null;
		AttributeUpMobiItemUI.__super.call(this);
	}

	__class(AttributeUpMobiItemUI,'ui.mobile.main.effect.AttributeUpMobiItemUI',_super);
	var __proto=AttributeUpMobiItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/effect/AttributeUpMobiItem");
	}

	return AttributeUpMobiItemUI;
})(View)


//class ui.mobile.main.ExtractYuanbaoPanelUI extends laya.ui.View
var ExtractYuanbaoPanelUI=(function(_super){
	function ExtractYuanbaoPanelUI(){
		this.window=null;
		this.txt1=null;
		this.ok_btn=null;
		this.cancel_btn=null;
		this.txt=null;
		ExtractYuanbaoPanelUI.__super.call(this);
	}

	__class(ExtractYuanbaoPanelUI,'ui.mobile.main.ExtractYuanbaoPanelUI',_super);
	var __proto=ExtractYuanbaoPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/ExtractYuanbaoPanel");
	}

	return ExtractYuanbaoPanelUI;
})(View)


//class ui.mobile.main.ExtractZuanshiPanelUI extends laya.ui.View
var ExtractZuanshiPanelUI=(function(_super){
	function ExtractZuanshiPanelUI(){
		this.window=null;
		this.btn=null;
		this.txt1=null;
		this.txt2=null;
		this.txt3=null;
		this.txt=null;
		this.ok_btn=null;
		this.cancel_btn=null;
		ExtractZuanshiPanelUI.__super.call(this);
	}

	__class(ExtractZuanshiPanelUI,'ui.mobile.main.ExtractZuanshiPanelUI',_super);
	var __proto=ExtractZuanshiPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/ExtractZuanshiPanel");
	}

	return ExtractZuanshiPanelUI;
})(View)


//class ui.mobile.main.FpsAlertUI extends laya.ui.View
var FpsAlertUI=(function(_super){
	function FpsAlertUI(){
		this.time_txt=null;
		this.btn1=null;
		this.btn2=null;
		this.closeBtn=null;
		FpsAlertUI.__super.call(this);
	}

	__class(FpsAlertUI,'ui.mobile.main.FpsAlertUI',_super);
	var __proto=FpsAlertUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/FpsAlert");
	}

	return FpsAlertUI;
})(View)


//class ui.mobile.main.gift.TimeGiftPanelUI extends laya.ui.View
var TimeGiftPanelUI=(function(_super){
	function TimeGiftPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.priceTxt1=null;
		this.time_txt=null;
		this.flag_img=null;
		this.ljgmBtn=null;
		this.money_txt=null;
		this.descTxt=null;
		TimeGiftPanelUI.__super.call(this);
	}

	__class(TimeGiftPanelUI,'ui.mobile.main.gift.TimeGiftPanelUI',_super);
	var __proto=TimeGiftPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/gift/TimeGiftPanel");
	}

	return TimeGiftPanelUI;
})(View)


//class ui.mobile.main.LowHPPanelUI extends laya.ui.View
var LowHPPanelUI=(function(_super){
	function LowHPPanelUI(){
		this.window=null;
		this.timeTxt=null;
		this.title_img=null;
		this.btnGo=null;
		LowHPPanelUI.__super.call(this);
	}

	__class(LowHPPanelUI,'ui.mobile.main.LowHPPanelUI',_super);
	var __proto=LowHPPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/LowHPPanel");
	}

	return LowHPPanelUI;
})(View)


//class ui.mobile.main.map.ShowHideViewUI extends laya.ui.View
var ShowHideViewUI=(function(_super){
	function ShowHideViewUI(){
		this.checkAll=null;
		this.checkPlayers=null;
		this.checkMyGuilder=null;
		this.checkNorMonster=null;
		this.checkPet=null;
		this.checkTitle=null;
		this.checkWing=null;
		this.checkSkill=null;
		this.checkDanger=null;
		this.checkFightNumber=null;
		this.checkBoss=null;
		this.checkDropEffect=null;
		this.checkSkillSound=null;
		ShowHideViewUI.__super.call(this);
	}

	__class(ShowHideViewUI,'ui.mobile.main.map.ShowHideViewUI',_super);
	var __proto=ShowHideViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/map/ShowHideView");
	}

	return ShowHideViewUI;
})(View)


//class ui.mobile.main.menu.MainMenuIconUI extends laya.ui.View
var MainMenuIconUI=(function(_super){
	function MainMenuIconUI(){
		this.icon=null;
		this.jb=null;
		this.name_txt=null;
		this.time_txt=null;
		MainMenuIconUI.__super.call(this);
	}

	__class(MainMenuIconUI,'ui.mobile.main.menu.MainMenuIconUI',_super);
	var __proto=MainMenuIconUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/menu/MainMenuIcon");
	}

	return MainMenuIconUI;
})(View)


//class ui.mobile.main.mobi.buff.MobiMainBuffUI extends laya.ui.View
var MobiMainBuffUI=(function(_super){
	function MobiMainBuffUI(){
		this.bg=null;
		this.closeBtn=null;
		this.buff_list=null;
		this.tq_list=null;
		this.title=null;
		MobiMainBuffUI.__super.call(this);
	}

	__class(MobiMainBuffUI,'ui.mobile.main.mobi.buff.MobiMainBuffUI',_super);
	var __proto=MobiMainBuffUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/mobi/buff/MobiMainBuff");
	}

	return MobiMainBuffUI;
})(View)


//class ui.mobile.main.msg.MessageDieItemRenderUI extends laya.ui.View
var MessageDieItemRenderUI=(function(_super){
	function MessageDieItemRenderUI(){
		this.lb=null;
		MessageDieItemRenderUI.__super.call(this);
	}

	__class(MessageDieItemRenderUI,'ui.mobile.main.msg.MessageDieItemRenderUI',_super);
	var __proto=MessageDieItemRenderUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/msg/MessageDieItemRender");
	}

	return MessageDieItemRenderUI;
})(View)


//class ui.mobile.main.msg.MessageItemRenderUI extends laya.ui.View
var MessageItemRenderUI=(function(_super){
	function MessageItemRenderUI(){
		this.lb=null;
		MessageItemRenderUI.__super.call(this);
	}

	__class(MessageItemRenderUI,'ui.mobile.main.msg.MessageItemRenderUI',_super);
	var __proto=MessageItemRenderUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/msg/MessageItemRender");
	}

	return MessageItemRenderUI;
})(View)


//class ui.mobile.main.msg.MessagePanelUI extends laya.ui.View
var MessagePanelUI=(function(_super){
	function MessagePanelUI(){
		this.window=null;
		this.diePanel=null;
		this.mainPanel=null;
		this.tab=null;
		MessagePanelUI.__super.call(this);
	}

	__class(MessagePanelUI,'ui.mobile.main.msg.MessagePanelUI',_super);
	var __proto=MessagePanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window4UI",Window4UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/msg/MessagePanel");
	}

	return MessagePanelUI;
})(View)


//class ui.mobile.main.notice.MiddleNoticeUI extends laya.ui.View
var MiddleNoticeUI=(function(_super){
	function MiddleNoticeUI(){
		this.bg=null;
		this.txt=null;
		MiddleNoticeUI.__super.call(this);
	}

	__class(MiddleNoticeUI,'ui.mobile.main.notice.MiddleNoticeUI',_super);
	var __proto=MiddleNoticeUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/notice/MiddleNotice");
	}

	return MiddleNoticeUI;
})(View)


//class ui.mobile.main.NoticeUI extends laya.ui.View
var NoticeUI=(function(_super){
	function NoticeUI(){
		this.bg=null;
		this.icon=null;
		this.txt=null;
		NoticeUI.__super.call(this);
	}

	__class(NoticeUI,'ui.mobile.main.NoticeUI',_super);
	var __proto=NoticeUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/Notice");
	}

	return NoticeUI;
})(View)


//class ui.mobile.main.NpcDialogPanel2ItemUI extends laya.ui.View
var NpcDialogPanel2ItemUI=(function(_super){
	function NpcDialogPanel2ItemUI(){
		this.txt=null;
		this.btn=null;
		NpcDialogPanel2ItemUI.__super.call(this);
	}

	__class(NpcDialogPanel2ItemUI,'ui.mobile.main.NpcDialogPanel2ItemUI',_super);
	var __proto=NpcDialogPanel2ItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/NpcDialogPanel2Item");
	}

	return NpcDialogPanel2ItemUI;
})(View)


//class ui.mobile.main.NpcDialogPanel2UI extends laya.ui.View
var NpcDialogPanel2UI=(function(_super){
	function NpcDialogPanel2UI(){
		this.btn=null;
		this.txt=null;
		NpcDialogPanel2UI.__super.call(this);
	}

	__class(NpcDialogPanel2UI,'ui.mobile.main.NpcDialogPanel2UI',_super);
	var __proto=NpcDialogPanel2UI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/NpcDialogPanel2");
	}

	return NpcDialogPanel2UI;
})(View)


//class ui.mobile.main.NpcDialogPanel3UI extends laya.ui.View
var NpcDialogPanel3UI=(function(_super){
	function NpcDialogPanel3UI(){
		this.bg=null;
		this.panel=null;
		this.btn=null;
		NpcDialogPanel3UI.__super.call(this);
	}

	__class(NpcDialogPanel3UI,'ui.mobile.main.NpcDialogPanel3UI',_super);
	var __proto=NpcDialogPanel3UI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/NpcDialogPanel3");
	}

	return NpcDialogPanel3UI;
})(View)


//class ui.mobile.main.NpcDialogPanelUI extends laya.ui.View
var NpcDialogPanelUI=(function(_super){
	function NpcDialogPanelUI(){
		this.bg=null;
		this.content_txt=null;
		this.closeBtn=null;
		this.btnArea=null;
		this.btn=null;
		this.time_txt=null;
		NpcDialogPanelUI.__super.call(this);
	}

	__class(NpcDialogPanelUI,'ui.mobile.main.NpcDialogPanelUI',_super);
	var __proto=NpcDialogPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/NpcDialogPanel");
	}

	return NpcDialogPanelUI;
})(View)


//class ui.mobile.main.prompt.BagFullPromptUI extends laya.ui.View
var BagFullPromptUI=(function(_super){
	function BagFullPromptUI(){
		this.closeBtn=null;
		this.btnGou=null;
		this.l_btn=null;
		this.r_btn=null;
		BagFullPromptUI.__super.call(this);
	}

	__class(BagFullPromptUI,'ui.mobile.main.prompt.BagFullPromptUI',_super);
	var __proto=BagFullPromptUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/prompt/BagFullPrompt");
	}

	return BagFullPromptUI;
})(View)


//class ui.mobile.main.prompt.QuickBuyPromptPanelUI extends laya.ui.View
var QuickBuyPromptPanelUI=(function(_super){
	function QuickBuyPromptPanelUI(){
		this.window=null;
		this.title_img=null;
		this.item_box=null;
		this.yuanbao_img=null;
		this.allPrice_txt=null;
		this.name_txt=null;
		this.autoBuyTxt=null;
		this.grid=null;
		this.txt_bg=null;
		this.ok_btn=null;
		this.add_btn=null;
		this.sub_btn=null;
		this.sub10_btn=null;
		this.add10_btn=null;
		QuickBuyPromptPanelUI.__super.call(this);
	}

	__class(QuickBuyPromptPanelUI,'ui.mobile.main.prompt.QuickBuyPromptPanelUI',_super);
	var __proto=QuickBuyPromptPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/prompt/QuickBuyPromptPanel");
	}

	return QuickBuyPromptPanelUI;
})(View)


//class ui.mobile.main.RenamePanelUI extends laya.ui.View
var RenamePanelUI=(function(_super){
	function RenamePanelUI(){
		this.window=null;
		this.name_Input=null;
		this.tip_txt=null;
		this.ok_btn=null;
		this.cancel_btn=null;
		RenamePanelUI.__super.call(this);
	}

	__class(RenamePanelUI,'ui.mobile.main.RenamePanelUI',_super);
	var __proto=RenamePanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/RenamePanel");
	}

	return RenamePanelUI;
})(View)


//class ui.mobile.main.RevivePanelUI extends laya.ui.View
var RevivePanelUI=(function(_super){
	function RevivePanelUI(){
		this.bg=null;
		this.name_txt=null;
		this.l_box=null;
		this.l_timeTxt=null;
		this.l_btn=null;
		this.r_box=null;
		this.r_timeTxt=null;
		this.r_btn=null;
		this.c_txt=null;
		this.c_icon=null;
		this.freeTxt=null;
		RevivePanelUI.__super.call(this);
	}

	__class(RevivePanelUI,'ui.mobile.main.RevivePanelUI',_super);
	var __proto=RevivePanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/RevivePanel");
	}

	return RevivePanelUI;
})(View)


//class ui.mobile.main.ShowGotItemsPanelUI extends laya.ui.View
var ShowGotItemsPanelUI=(function(_super){
	function ShowGotItemsPanelUI(){
		this.bg=null;
		this.p_panel=null;
		this.btn=null;
		this.info_txt=null;
		ShowGotItemsPanelUI.__super.call(this);
	}

	__class(ShowGotItemsPanelUI,'ui.mobile.main.ShowGotItemsPanelUI',_super);
	var __proto=ShowGotItemsPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/ShowGotItemsPanel");
	}

	return ShowGotItemsPanelUI;
})(View)


//class ui.mobile.main.SkillGetPanelUI extends laya.ui.View
var SkillGetPanelUI=(function(_super){
	function SkillGetPanelUI(){
		this.bg=null;
		this.name_img=null;
		this.icon=null;
		this.txt=null;
		SkillGetPanelUI.__super.call(this);
	}

	__class(SkillGetPanelUI,'ui.mobile.main.SkillGetPanelUI',_super);
	var __proto=SkillGetPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/SkillGetPanel");
	}

	return SkillGetPanelUI;
})(View)


//class ui.mobile.main.strong.StrongPanelUI extends laya.ui.View
var StrongPanelUI=(function(_super){
	function StrongPanelUI(){
		this.bg=null;
		this.p_panel=null;
		StrongPanelUI.__super.call(this);
	}

	__class(StrongPanelUI,'ui.mobile.main.strong.StrongPanelUI',_super);
	var __proto=StrongPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/strong/StrongPanel");
	}

	return StrongPanelUI;
})(View)


//class ui.mobile.main.target.SelectDpsQipaoUI extends laya.ui.View
var SelectDpsQipaoUI=(function(_super){
	function SelectDpsQipaoUI(){
		this.bg=null;
		SelectDpsQipaoUI.__super.call(this);
	}

	__class(SelectDpsQipaoUI,'ui.mobile.main.target.SelectDpsQipaoUI',_super);
	var __proto=SelectDpsQipaoUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/target/SelectDpsQipao");
	}

	return SelectDpsQipaoUI;
})(View)


//class ui.mobile.main.target.SelectDpsUI extends laya.ui.View
var SelectDpsUI=(function(_super){
	function SelectDpsUI(){
		this.bg=null;
		this.txt=null;
		SelectDpsUI.__super.call(this);
	}

	__class(SelectDpsUI,'ui.mobile.main.target.SelectDpsUI',_super);
	var __proto=SelectDpsUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/target/SelectDps");
	}

	return SelectDpsUI;
})(View)


//class ui.mobile.main.view.ChaterItemUI extends laya.ui.View
var ChaterItemUI=(function(_super){
	function ChaterItemUI(){
		this.btn=null;
		this.closeBtn=null;
		this.red=null;
		ChaterItemUI.__super.call(this);
	}

	__class(ChaterItemUI,'ui.mobile.main.view.ChaterItemUI',_super);
	var __proto=ChaterItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/main/view/ChaterItem");
	}

	return ChaterItemUI;
})(View)


//class ui.mobile.mall.BuyItemPanelUI extends laya.ui.View
var BuyItemPanelUI=(function(_super){
	function BuyItemPanelUI(){
		this.window=null;
		this.title=null;
		this.name_txt=null;
		this.priceBox=null;
		this.yuanbao_img=null;
		this.allPrice_txt=null;
		this.info_box=null;
		this.buyCount_txt=null;
		this.add_btn=null;
		this.sub_btn=null;
		this.sub10_btn=null;
		this.add10_btn=null;
		this.inputTxt=null;
		this.grid=null;
		this.ok_btn=null;
		BuyItemPanelUI.__super.call(this);
	}

	__class(BuyItemPanelUI,'ui.mobile.mall.BuyItemPanelUI',_super);
	var __proto=BuyItemPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/mall/BuyItemPanel");
	}

	return BuyItemPanelUI;
})(View)


//class ui.mobile.mall.BuyOutputPanelUI extends laya.ui.View
var BuyOutputPanelUI=(function(_super){
	function BuyOutputPanelUI(){
		this.window=null;
		this.nameTxt=null;
		this.limitTxt=null;
		this.btnBuy=null;
		this.p_txt=null;
		this.p_icon=null;
		BuyOutputPanelUI.__super.call(this);
	}

	__class(BuyOutputPanelUI,'ui.mobile.mall.BuyOutputPanelUI',_super);
	var __proto=BuyOutputPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window5UI",Window5UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/mall/BuyOutputPanel");
	}

	return BuyOutputPanelUI;
})(View)


//class ui.mobile.mall.MallPanelUI extends laya.ui.View
var MallPanelUI=(function(_super){
	function MallPanelUI(){
		this.window=null;
		this.closeBtn=null;
		this.tab=null;
		this.money_box1=null;
		this.icon1=null;
		this.money_txt1=null;
		this.money_box2=null;
		this.icon2=null;
		this.money_txt2=null;
		this.money_box3=null;
		this.icon3=null;
		this.money_txt3=null;
		this.pay_btn=null;
		this.closeBtn2=null;
		this.linkTxt=null;
		this.btnLink=null;
		MallPanelUI.__super.call(this);
	}

	__class(MallPanelUI,'ui.mobile.mall.MallPanelUI',_super);
	var __proto=MallPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/mall/MallPanel");
	}

	return MallPanelUI;
})(View)


//class ui.mobile.map.MapPanelUI extends laya.ui.View
var MapPanelUI=(function(_super){
	function MapPanelUI(){
		this.window=null;
		this.title=null;
		MapPanelUI.__super.call(this);
	}

	__class(MapPanelUI,'ui.mobile.map.MapPanelUI',_super);
	var __proto=MapPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/map/MapPanel");
	}

	return MapPanelUI;
})(View)


//class ui.mobile.master.MasterActivePanelUI extends laya.ui.View
var MasterActivePanelUI=(function(_super){
	function MasterActivePanelUI(){
		this.window=null;
		this.title=null;
		this.l_box=null;
		this.l_nameTxt=null;
		this.l_txt=null;
		this.r_box=null;
		this.r_nameTxt=null;
		this.r_txt=null;
		this.txt=null;
		this.btn=null;
		MasterActivePanelUI.__super.call(this);
	}

	__class(MasterActivePanelUI,'ui.mobile.master.MasterActivePanelUI',_super);
	var __proto=MasterActivePanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window5UI",Window5UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/master/MasterActivePanel");
	}

	return MasterActivePanelUI;
})(View)


//class ui.mobile.moneyTree.MoneyTreePanelUI extends laya.ui.View
var MoneyTreePanelUI=(function(_super){
	function MoneyTreePanelUI(){
		this.bg=null;
		this.treeImg=null;
		this.hongzuanImg=null;
		this.jingbiImg=null;
		this.img2=null;
		this.img3=null;
		this.img4=null;
		this.closeBtn=null;
		this.btnGet=null;
		this.getSp=null;
		this.descImg=null;
		this.btn=null;
		this.descTxt0=null;
		this.timeTxt=null;
		this.descTxt1=null;
		this.allTimeTxt=null;
		this.link=null;
		this.cardLink=null;
		this.img5=null;
		this.img6=null;
		MoneyTreePanelUI.__super.call(this);
	}

	__class(MoneyTreePanelUI,'ui.mobile.moneyTree.MoneyTreePanelUI',_super);
	var __proto=MoneyTreePanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/moneyTree/MoneyTreePanel");
	}

	return MoneyTreePanelUI;
})(View)


//class ui.mobile.neigong.NeiGongTaskViewUI extends laya.ui.View
var NeiGongTaskViewUI=(function(_super){
	function NeiGongTaskViewUI(){
		this.window=null;
		this.btn_go=null;
		this.name_txt=null;
		this.task_txt=null;
		this.count_txt=null;
		this.times_txt=null;
		this.list=null;
		NeiGongTaskViewUI.__super.call(this);
	}

	__class(NeiGongTaskViewUI,'ui.mobile.neigong.NeiGongTaskViewUI',_super);
	var __proto=NeiGongTaskViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window2UI",Window2UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/neigong/NeiGongTaskView");
	}

	return NeiGongTaskViewUI;
})(View)


//class ui.mobile.npc.NPC_hpPanelUI extends laya.ui.View
var NPC_hpPanelUI=(function(_super){
	function NPC_hpPanelUI(){
		this.window=null;
		this.line2=null;
		this.money_icon=null;
		this.btnHP=null;
		this.btnCD=null;
		this.time_txt=null;
		this.money_txt=null;
		this.title=null;
		this.title2=null;
		this.l_list=null;
		this.btnSet=null;
		NPC_hpPanelUI.__super.call(this);
	}

	__class(NPC_hpPanelUI,'ui.mobile.npc.NPC_hpPanelUI',_super);
	var __proto=NPC_hpPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window2UI",Window2UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/npc/NPC_hpPanel");
	}

	return NPC_hpPanelUI;
})(View)


//class ui.mobile.npc.NPC_PanelUI extends laya.ui.View
var NPC_PanelUI=(function(_super){
	function NPC_PanelUI(){
		this.window=null;
		this.title=null;
		this.title1=null;
		this.desc_txt1=null;
		this.line2=null;
		this.titleBox2=null;
		this.title2=null;
		this.desc_txt2=null;
		this.titleBox3=null;
		this.title3=null;
		NPC_PanelUI.__super.call(this);
	}

	__class(NPC_PanelUI,'ui.mobile.npc.NPC_PanelUI',_super);
	var __proto=NPC_PanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window2UI",Window2UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/npc/NPC_Panel");
	}

	return NPC_PanelUI;
})(View)


//class ui.mobile.npc.view.ExpDailyGetPanelUI extends laya.ui.View
var ExpDailyGetPanelUI=(function(_super){
	function ExpDailyGetPanelUI(){
		this.window=null;
		this.title=null;
		this.fontImg=null;
		this.l_btn=null;
		this.r_btn=null;
		this.priceTxt=null;
		this.priceIcon=null;
		this.qqTip=null;
		this.closeBtn=null;
		ExpDailyGetPanelUI.__super.call(this);
	}

	__class(ExpDailyGetPanelUI,'ui.mobile.npc.view.ExpDailyGetPanelUI',_super);
	var __proto=ExpDailyGetPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/npc/view/ExpDailyGetPanel");
	}

	return ExpDailyGetPanelUI;
})(View)


//class ui.mobile.npc.view.NpcBossJNPanelUI extends laya.ui.View
var NpcBossJNPanelUI=(function(_super){
	function NpcBossJNPanelUI(){
		this.window=null;
		this.closeBtn=null;
		this.btnRefresh=null;
		this.btnAllStar=null;
		this.toadyTxt=null;
		this.freeTxt=null;
		this.manxingTxt=null;
		this.ruleTxt=null;
		this.btnFinish=null;
		this.btnTQ=null;
		this.moneyTxt=null;
		this.moneyIcon=null;
		this.zhekou=null;
		NpcBossJNPanelUI.__super.call(this);
	}

	__class(NpcBossJNPanelUI,'ui.mobile.npc.view.NpcBossJNPanelUI',_super);
	var __proto=NpcBossJNPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		View.regComponent("ui.mobile.shop.ZhekouUI",ZhekouUI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/npc/view/NpcBossJNPanel");
	}

	return NpcBossJNPanelUI;
})(View)


//class ui.mobile.npc.view.NPCExpDailyPanelUI extends laya.ui.View
var NPCExpDailyPanelUI=(function(_super){
	function NPCExpDailyPanelUI(){
		this.window=null;
		this.bg=null;
		this.l_btn=null;
		this.huanTxt=null;
		this.taskTxt=null;
		this.r_btn=null;
		this.btnTQ=null;
		this.priceTxt=null;
		this.priceIcon=null;
		this.zhekou=null;
		this.freeTxt=null;
		this.qqTip=null;
		this.btnGou=null;
		NPCExpDailyPanelUI.__super.call(this);
	}

	__class(NPCExpDailyPanelUI,'ui.mobile.npc.view.NPCExpDailyPanelUI',_super);
	var __proto=NPCExpDailyPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window2UI",Window2UI);
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		View.regComponent("ui.mobile.shop.ZhekouUI",ZhekouUI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/npc/view/NPCExpDailyPanel");
	}

	return NPCExpDailyPanelUI;
})(View)


//class ui.mobile.npc.view.NpcLianyuPanelUI extends laya.ui.View
var NpcLianyuPanelUI=(function(_super){
	function NpcLianyuPanelUI(){
		this.window=null;
		this.bg=null;
		this.title=null;
		this.btnEnter=null;
		this.timeTxt=null;
		this.descTxt=null;
		this.l_select=null;
		this.l_panel=null;
		this.btnVip=null;
		this.conditionTxt=null;
		this.btnAdd=null;
		this.tipBox=null;
		this.g_panel=null;
		NpcLianyuPanelUI.__super.call(this);
	}

	__class(NpcLianyuPanelUI,'ui.mobile.npc.view.NpcLianyuPanelUI',_super);
	var __proto=NpcLianyuPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/npc/view/NpcLianyuPanel");
	}

	return NpcLianyuPanelUI;
})(View)


//class ui.mobile.npc.view.NpcMapPanelUI extends laya.ui.View
var NpcMapPanelUI=(function(_super){
	function NpcMapPanelUI(){
		this.window=null;
		this.bg=null;
		this.title=null;
		this.descTxt=null;
		this.mapTxt=null;
		this.conditionTxt=null;
		this.bossTxt=null;
		this.mapImg=null;
		this.btnEnter=null;
		NpcMapPanelUI.__super.call(this);
	}

	__class(NpcMapPanelUI,'ui.mobile.npc.view.NpcMapPanelUI',_super);
	var __proto=NpcMapPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/npc/view/NpcMapPanel");
	}

	return NpcMapPanelUI;
})(View)


//class ui.mobile.npc.view.NpcYewaiPanelUI extends laya.ui.View
var NpcYewaiPanelUI=(function(_super){
	function NpcYewaiPanelUI(){
		this.window=null;
		this.bg=null;
		this.title=null;
		this.conditionTxt=null;
		this.l_txt=null;
		this.l_select=null;
		this.l_panel=null;
		this.nameTxt=null;
		this.r_txt=null;
		this.r_panel=null;
		this.btnEnter=null;
		NpcYewaiPanelUI.__super.call(this);
	}

	__class(NpcYewaiPanelUI,'ui.mobile.npc.view.NpcYewaiPanelUI',_super);
	var __proto=NpcYewaiPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/npc/view/NpcYewaiPanel");
	}

	return NpcYewaiPanelUI;
})(View)


//class ui.mobile.pet.item.PetSkillGridUI extends laya.ui.View
var PetSkillGridUI=(function(_super){
	function PetSkillGridUI(){
		this.icon=null;
		PetSkillGridUI.__super.call(this);
	}

	__class(PetSkillGridUI,'ui.mobile.pet.item.PetSkillGridUI',_super);
	var __proto=PetSkillGridUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/pet/item/PetSkillGrid");
	}

	return PetSkillGridUI;
})(View)


//class ui.mobile.pet.PetPanelUI extends laya.ui.View
var PetPanelUI=(function(_super){
	function PetPanelUI(){
		this.bg=null;
		this.bg1=null;
		this.bg2=null;
		this.closeBtn=null;
		this.tabs=null;
		this.title=null;
		this.closeBtn2=null;
		PetPanelUI.__super.call(this);
	}

	__class(PetPanelUI,'ui.mobile.pet.PetPanelUI',_super);
	var __proto=PetPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/pet/PetPanel");
	}

	return PetPanelUI;
})(View)


//class ui.mobile.pet.view.HuanshenHuaxingViewUI extends laya.ui.View
var HuanshenHuaxingViewUI=(function(_super){
	function HuanshenHuaxingViewUI(){
		this.bg1=null;
		this.bg2=null;
		this.bg=null;
		this.closeBtn=null;
		this.title=null;
		this.u_btn=null;
		this.d_btn=null;
		this.limitTxt=null;
		this.btnUp=null;
		this.nameFont=null;
		this.closeBtn2=null;
		this.l_list=null;
		this.btnSkill=null;
		this.yihuanhua=null;
		HuanshenHuaxingViewUI.__super.call(this);
	}

	__class(HuanshenHuaxingViewUI,'ui.mobile.pet.view.HuanshenHuaxingViewUI',_super);
	var __proto=HuanshenHuaxingViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/pet/view/HuanshenHuaxingView");
	}

	return HuanshenHuaxingViewUI;
})(View)


//class ui.mobile.pet.view.YuanshenFunPanelUI extends laya.ui.View
var YuanshenFunPanelUI=(function(_super){
	function YuanshenFunPanelUI(){
		this.bg=null;
		this.funimg=null;
		this.closeBtn=null;
		YuanshenFunPanelUI.__super.call(this);
	}

	__class(YuanshenFunPanelUI,'ui.mobile.pet.view.YuanshenFunPanelUI',_super);
	var __proto=YuanshenFunPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/pet/view/YuanshenFunPanel");
	}

	return YuanshenFunPanelUI;
})(View)


//class ui.mobile.pet.view.YuanShenSkillViewUI extends laya.ui.View
var YuanShenSkillViewUI=(function(_super){
	function YuanShenSkillViewUI(){
		this.bg1=null;
		this.bg2=null;
		this.bg=null;
		this.closeBtn=null;
		this.title=null;
		this.list=null;
		this.grid=null;
		this.name_txt=null;
		this.cd_txt=null;
		this.lv_txt=null;
		this.desc_txt=null;
		this.buy_box=null;
		this.buy_btn=null;
		this.full_img=null;
		this.panel=null;
		this.closeBtn2=null;
		YuanShenSkillViewUI.__super.call(this);
	}

	__class(YuanShenSkillViewUI,'ui.mobile.pet.view.YuanShenSkillViewUI',_super);
	var __proto=YuanShenSkillViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/pet/view/YuanShenSkillView");
	}

	return YuanShenSkillViewUI;
})(View)


//class ui.mobile.platform.common.erweima.QrCodePanelUI extends laya.ui.View
var QrCodePanelUI=(function(_super){
	function QrCodePanelUI(){
		this.bg=null;
		this.box=null;
		this.btn=null;
		this.closeBtn=null;
		QrCodePanelUI.__super.call(this);
	}

	__class(QrCodePanelUI,'ui.mobile.platform.common.erweima.QrCodePanelUI',_super);
	var __proto=QrCodePanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/common/erweima/QrCodePanel");
	}

	return QrCodePanelUI;
})(View)


//class ui.mobile.platform.dawanka.QQdawankaPanelUI extends laya.ui.View
var QQdawankaPanelUI=(function(_super){
	function QQdawankaPanelUI(){
		this.bg=null;
		this.jihuoImg=null;
		this.linkBtn=null;
		this.levelTxt=null;
		this.kaValueTxt=null;
		this.tabBtn=null;
		this.btn=null;
		this.closeBtn=null;
		QQdawankaPanelUI.__super.call(this);
	}

	__class(QQdawankaPanelUI,'ui.mobile.platform.dawanka.QQdawankaPanelUI',_super);
	var __proto=QQdawankaPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/dawanka/QQdawankaPanel");
	}

	return QQdawankaPanelUI;
})(View)


//class ui.mobile.platform.douyu.PlatformDouyuPanelUI extends laya.ui.View
var PlatformDouyuPanelUI=(function(_super){
	function PlatformDouyuPanelUI(){
		this.window=null;
		this.bg=null;
		this.title=null;
		this.tabs=null;
		this.topSp=null;
		this.banner=null;
		this.vipLevelTxt=null;
		this.text_btn=null;
		this.link_btn=null;
		PlatformDouyuPanelUI.__super.call(this);
	}

	__class(PlatformDouyuPanelUI,'ui.mobile.platform.douyu.PlatformDouyuPanelUI',_super);
	var __proto=PlatformDouyuPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/douyu/PlatformDouyuPanel");
	}

	return PlatformDouyuPanelUI;
})(View)


//class ui.mobile.platform.liebao.LiebaoWeiduanPanelUI extends laya.ui.View
var LiebaoWeiduanPanelUI=(function(_super){
	function LiebaoWeiduanPanelUI(){
		this.bg=null;
		this.desc_img=null;
		this.log_img=null;
		this.closeBtn=null;
		this.btn=null;
		this.item_box=null;
		this.getted=null;
		LiebaoWeiduanPanelUI.__super.call(this);
	}

	__class(LiebaoWeiduanPanelUI,'ui.mobile.platform.liebao.LiebaoWeiduanPanelUI',_super);
	var __proto=LiebaoWeiduanPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/liebao/LiebaoWeiduanPanel");
	}

	return LiebaoWeiduanPanelUI;
})(View)


//class ui.mobile.platform.p360.Platform360DawanjiaPanelUI extends laya.ui.View
var Platform360DawanjiaPanelUI=(function(_super){
	function Platform360DawanjiaPanelUI(){
		this.bg=null;
		this.btn=null;
		this.closeBtn=null;
		this.getted=null;
		Platform360DawanjiaPanelUI.__super.call(this);
	}

	__class(Platform360DawanjiaPanelUI,'ui.mobile.platform.p360.Platform360DawanjiaPanelUI',_super);
	var __proto=Platform360DawanjiaPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/p360/Platform360DawanjiaPanel");
	}

	return Platform360DawanjiaPanelUI;
})(View)


//class ui.mobile.platform.p37.Platform37QiweiPanelUI extends laya.ui.View
var Platform37QiweiPanelUI=(function(_super){
	function Platform37QiweiPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		Platform37QiweiPanelUI.__super.call(this);
	}

	__class(Platform37QiweiPanelUI,'ui.mobile.platform.p37.Platform37QiweiPanelUI',_super);
	var __proto=Platform37QiweiPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/p37/Platform37QiweiPanel");
	}

	return Platform37QiweiPanelUI;
})(View)


//class ui.mobile.platform.PlatformPanelUI extends laya.ui.View
var PlatformPanelUI=(function(_super){
	function PlatformPanelUI(){
		this.window=null;
		this.title=null;
		this.bg=null;
		this.tabs=null;
		this.btnGo=null;
		this.btnLink=null;
		PlatformPanelUI.__super.call(this);
	}

	__class(PlatformPanelUI,'ui.mobile.platform.PlatformPanelUI',_super);
	var __proto=PlatformPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/PlatformPanel");
	}

	return PlatformPanelUI;
})(View)


//class ui.mobile.platform.SuperVipPanelUI extends laya.ui.View
var SuperVipPanelUI=(function(_super){
	function SuperVipPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.num_txt=null;
		this.btn_num=null;
		this.btn_ma=null;
		this.btn=null;
		this.top_txt=null;
		this.bottom_txt=null;
		this.left_img=null;
		this.desc_img=null;
		this.img_ma=null;
		SuperVipPanelUI.__super.call(this);
	}

	__class(SuperVipPanelUI,'ui.mobile.platform.SuperVipPanelUI',_super);
	var __proto=SuperVipPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/SuperVipPanel");
	}

	return SuperVipPanelUI;
})(View)


//class ui.mobile.platform.WeiduanSignPanelUI extends laya.ui.View
var WeiduanSignPanelUI=(function(_super){
	function WeiduanSignPanelUI(){
		this.bg=null;
		this.txt1=null;
		this.txt2=null;
		this.txt=null;
		this.btn1=null;
		this.btn2=null;
		this.btn=null;
		this.yilingqu1=null;
		this.yilingqu2=null;
		this.yilingqu=null;
		this.closeBtn=null;
		WeiduanSignPanelUI.__super.call(this);
	}

	__class(WeiduanSignPanelUI,'ui.mobile.platform.WeiduanSignPanelUI',_super);
	var __proto=WeiduanSignPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/WeiduanSignPanel");
	}

	return WeiduanSignPanelUI;
})(View)


//class ui.mobile.platform.WeiXinGiftPanelUI extends laya.ui.View
var WeiXinGiftPanelUI=(function(_super){
	function WeiXinGiftPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.btn=null;
		this.title_img=null;
		this.ma_img=null;
		this.cdTxt=null;
		WeiXinGiftPanelUI.__super.call(this);
	}

	__class(WeiXinGiftPanelUI,'ui.mobile.platform.WeiXinGiftPanelUI',_super);
	var __proto=WeiXinGiftPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/WeiXinGiftPanel");
	}

	return WeiXinGiftPanelUI;
})(View)


//class ui.mobile.platform.xunwan.XunwanHallPanelUI extends laya.ui.View
var XunwanHallPanelUI=(function(_super){
	function XunwanHallPanelUI(){
		this.window=null;
		this.title=null;
		this.bg=null;
		this.tabs=null;
		this.topSp=null;
		this.banner=null;
		this.vip_txt=null;
		this.more_txt=null;
		this.btnLink=null;
		XunwanHallPanelUI.__super.call(this);
	}

	__class(XunwanHallPanelUI,'ui.mobile.platform.xunwan.XunwanHallPanelUI',_super);
	var __proto=XunwanHallPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/platform/xunwan/XunwanHallPanel");
	}

	return XunwanHallPanelUI;
})(View)


//class ui.mobile.qipao.QiPaoView2UI extends laya.ui.View
var QiPaoView2UI=(function(_super){
	function QiPaoView2UI(){
		this.bg_img=null;
		this.des_txt=null;
		this.link_btn=null;
		QiPaoView2UI.__super.call(this);
	}

	__class(QiPaoView2UI,'ui.mobile.qipao.QiPaoView2UI',_super);
	var __proto=QiPaoView2UI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/qipao/QiPaoView2");
	}

	return QiPaoView2UI;
})(View)


//class ui.mobile.rank.RankPanelUI extends laya.ui.View
var RankPanelUI=(function(_super){
	function RankPanelUI(){
		this.window=null;
		this.bg=null;
		this.tabContainer=null;
		this.item1=null;
		this.item2=null;
		this.item3=null;
		this.item4=null;
		this.item7=null;
		this.avatarNode=null;
		this.list=null;
		this.title_txt=null;
		this.imgHelp=null;
		RankPanelUI.__super.call(this);
	}

	__class(RankPanelUI,'ui.mobile.rank.RankPanelUI',_super);
	var __proto=RankPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/rank/RankPanel");
	}

	return RankPanelUI;
})(View)


//class ui.mobile.rmbHongbao.RmbUseGetPanelUI extends laya.ui.View
var RmbUseGetPanelUI=(function(_super){
	function RmbUseGetPanelUI(){
		this.bg=null;
		this.timeTxt=null;
		this.img1=null;
		this.img2=null;
		this.img3=null;
		this.zcz1=null;
		this.zcz2=null;
		RmbUseGetPanelUI.__super.call(this);
	}

	__class(RmbUseGetPanelUI,'ui.mobile.rmbHongbao.RmbUseGetPanelUI',_super);
	var __proto=RmbUseGetPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/rmbHongbao/RmbUseGetPanel");
	}

	return RmbUseGetPanelUI;
})(View)


//class ui.mobile.role.bagua.BaguaSuitPanelUI extends laya.ui.View
var BaguaSuitPanelUI=(function(_super){
	function BaguaSuitPanelUI(){
		this.window=null;
		this.txt=null;
		BaguaSuitPanelUI.__super.call(this);
	}

	__class(BaguaSuitPanelUI,'ui.mobile.role.bagua.BaguaSuitPanelUI',_super);
	var __proto=BaguaSuitPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window5UI",Window5UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/bagua/BaguaSuitPanel");
	}

	return BaguaSuitPanelUI;
})(View)


//class ui.mobile.role.chuanshi.ChuanshiYulanViewUI extends laya.ui.View
var ChuanshiYulanViewUI=(function(_super){
	function ChuanshiYulanViewUI(){
		this.bg=null;
		this.box=null;
		this.viewNode=null;
		this.btn=null;
		this.tips_txt=null;
		this.title=null;
		this.skill_txt=null;
		this.nextSkill_txt=null;
		this.awake_txt=null;
		this.nextAwake_txt=null;
		this.closeBtn=null;
		ChuanshiYulanViewUI.__super.call(this);
	}

	__class(ChuanshiYulanViewUI,'ui.mobile.role.chuanshi.ChuanshiYulanViewUI',_super);
	var __proto=ChuanshiYulanViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/chuanshi/ChuanshiYulanView");
	}

	return ChuanshiYulanViewUI;
})(View)


//class ui.mobile.role.guanzhi.GuanZhiPreviewPanelUI extends laya.ui.View
var GuanZhiPreviewPanelUI=(function(_super){
	function GuanZhiPreviewPanelUI(){
		this.bg=null;
		this.bg2=null;
		this.list=null;
		this.title_txt=null;
		this.closeBtn=null;
		GuanZhiPreviewPanelUI.__super.call(this);
	}

	__class(GuanZhiPreviewPanelUI,'ui.mobile.role.guanzhi.GuanZhiPreviewPanelUI',_super);
	var __proto=GuanZhiPreviewPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/guanzhi/GuanZhiPreviewPanel");
	}

	return GuanZhiPreviewPanelUI;
})(View)


//class ui.mobile.role.guanzhi.GuanZhiShopPanelUI extends laya.ui.View
var GuanZhiShopPanelUI=(function(_super){
	function GuanZhiShopPanelUI(){
		this.bg=null;
		this.bg2=null;
		this.bg3=null;
		this.list=null;
		this.title_txt=null;
		this.name_txt=null;
		this.num_txt=null;
		this.closeBtn=null;
		GuanZhiShopPanelUI.__super.call(this);
	}

	__class(GuanZhiShopPanelUI,'ui.mobile.role.guanzhi.GuanZhiShopPanelUI',_super);
	var __proto=GuanZhiShopPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/guanzhi/GuanZhiShopPanel");
	}

	return GuanZhiShopPanelUI;
})(View)


//class ui.mobile.role.guanzhi.GuanZhiUpViewUI extends laya.ui.View
var GuanZhiUpViewUI=(function(_super){
	function GuanZhiUpViewUI(){
		this.bg=null;
		this.icon=null;
		this.closeBtn=null;
		GuanZhiUpViewUI.__super.call(this);
	}

	__class(GuanZhiUpViewUI,'ui.mobile.role.guanzhi.GuanZhiUpViewUI',_super);
	var __proto=GuanZhiUpViewUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/guanzhi/GuanZhiUpView");
	}

	return GuanZhiUpViewUI;
})(View)


//class ui.mobile.role.hunhuan.HunHuanChangePanelUI extends laya.ui.View
var HunHuanChangePanelUI=(function(_super){
	function HunHuanChangePanelUI(){
		this.window=null;
		this.list=null;
		this.imgTitle=null;
		this.no_txt=null;
		HunHuanChangePanelUI.__super.call(this);
	}

	__class(HunHuanChangePanelUI,'ui.mobile.role.hunhuan.HunHuanChangePanelUI',_super);
	var __proto=HunHuanChangePanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window5UI",Window5UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/hunhuan/HunHuanChangePanel");
	}

	return HunHuanChangePanelUI;
})(View)


//class ui.mobile.role.lunhui.LunhuiQHPanelUI extends laya.ui.View
var LunhuiQHPanelUI=(function(_super){
	function LunhuiQHPanelUI(){
		this.bg=null;
		this.txtbg0=null;
		this.txtbg2=null;
		this.txtbg1=null;
		this.btnUP=null;
		this.closeBtn=null;
		this.tipBox=null;
		this.s_select=null;
		this.l_font=null;
		this.descTxt=null;
		this.numTxt2=null;
		this.haveTxt=null;
		this.needTxt=null;
		this.numTxt0=null;
		this.numTxt1=null;
		this.nameTxt1=null;
		this.nameTxt0=null;
		this.nameTxt3=null;
		this.btnLink=null;
		this.p_panel=null;
		this.title=null;
		LunhuiQHPanelUI.__super.call(this);
	}

	__class(LunhuiQHPanelUI,'ui.mobile.role.lunhui.LunhuiQHPanelUI',_super);
	var __proto=LunhuiQHPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/lunhui/LunhuiQHPanel");
	}

	return LunhuiQHPanelUI;
})(View)


//class ui.mobile.role.lunhui.YeliBuyPanelUI extends laya.ui.View
var YeliBuyPanelUI=(function(_super){
	function YeliBuyPanelUI(){
		this.window=null;
		this.btn3=null;
		this.btn2=null;
		this.btn1=null;
		this.btn4=null;
		this.numTxt=null;
		this.r_btn=null;
		this.l_btn=null;
		this.txt1=null;
		this.txt2=null;
		YeliBuyPanelUI.__super.call(this);
	}

	__class(YeliBuyPanelUI,'ui.mobile.role.lunhui.YeliBuyPanelUI',_super);
	var __proto=YeliBuyPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/lunhui/YeliBuyPanel");
	}

	return YeliBuyPanelUI;
})(View)


//class ui.mobile.role.role.ui.LingchongActivePanelUI extends laya.ui.View
var LingchongActivePanelUI=(function(_super){
	function LingchongActivePanelUI(){
		this.window=null;
		this.btn=null;
		this.title=null;
		this.attr_txt=null;
		LingchongActivePanelUI.__super.call(this);
	}

	__class(LingchongActivePanelUI,'ui.mobile.role.role.ui.LingchongActivePanelUI',_super);
	var __proto=LingchongActivePanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/role/ui/LingchongActivePanel");
	}

	return LingchongActivePanelUI;
})(View)


//class ui.mobile.role.role.ui.RoleGridLockUI extends laya.ui.View
var RoleGridLockUI=(function(_super){
	function RoleGridLockUI(){
		this.btn=null;
		this.lockImg=null;
		RoleGridLockUI.__super.call(this);
	}

	__class(RoleGridLockUI,'ui.mobile.role.role.ui.RoleGridLockUI',_super);
	var __proto=RoleGridLockUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/role/ui/RoleGridLock");
	}

	return RoleGridLockUI;
})(View)


//class ui.mobile.role.role.ui.RoleGridOpenTipUI extends laya.ui.View
var RoleGridOpenTipUI=(function(_super){
	function RoleGridOpenTipUI(){
		this.bg=null;
		this.txt=null;
		RoleGridOpenTipUI.__super.call(this);
	}

	__class(RoleGridOpenTipUI,'ui.mobile.role.role.ui.RoleGridOpenTipUI',_super);
	var __proto=RoleGridOpenTipUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/role/ui/RoleGridOpenTip");
	}

	return RoleGridOpenTipUI;
})(View)


//class ui.mobile.role.RolePanelUI extends laya.ui.View
var RolePanelUI=(function(_super){
	function RolePanelUI(){
		this.window=null;
		this.title=null;
		this.bg=null;
		RolePanelUI.__super.call(this);
	}

	__class(RolePanelUI,'ui.mobile.role.RolePanelUI',_super);
	var __proto=RolePanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/RolePanel");
	}

	return RolePanelUI;
})(View)


//class ui.mobile.role.RuishouPanelUI extends laya.ui.View
var RuishouPanelUI=(function(_super){
	function RuishouPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		RuishouPanelUI.__super.call(this);
	}

	__class(RuishouPanelUI,'ui.mobile.role.RuishouPanelUI',_super);
	var __proto=RuishouPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/RuishouPanel");
	}

	return RuishouPanelUI;
})(View)


//class ui.mobile.role.ShengxiaoPanelUI extends laya.ui.View
var ShengxiaoPanelUI=(function(_super){
	function ShengxiaoPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		ShengxiaoPanelUI.__super.call(this);
	}

	__class(ShengxiaoPanelUI,'ui.mobile.role.ShengxiaoPanelUI',_super);
	var __proto=ShengxiaoPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/ShengxiaoPanel");
	}

	return ShengxiaoPanelUI;
})(View)


//class ui.mobile.role.suit.RoleSuitActivePanelUI extends laya.ui.View
var RoleSuitActivePanelUI=(function(_super){
	function RoleSuitActivePanelUI(){
		this.bg=null;
		this.name_txt=null;
		this.attr_txt=null;
		this.time_txt=null;
		RoleSuitActivePanelUI.__super.call(this);
	}

	__class(RoleSuitActivePanelUI,'ui.mobile.role.suit.RoleSuitActivePanelUI',_super);
	var __proto=RoleSuitActivePanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/suit/RoleSuitActivePanel");
	}

	return RoleSuitActivePanelUI;
})(View)


//class ui.mobile.role.yishou.YishouFuhuaPanelUI extends laya.ui.View
var YishouFuhuaPanelUI=(function(_super){
	function YishouFuhuaPanelUI(){
		this.window=null;
		this.bg=null;
		this.barBox=null;
		this.bar=null;
		this.btn=null;
		this.closeBtn=null;
		this.title=null;
		YishouFuhuaPanelUI.__super.call(this);
	}

	__class(YishouFuhuaPanelUI,'ui.mobile.role.yishou.YishouFuhuaPanelUI',_super);
	var __proto=YishouFuhuaPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/yishou/YishouFuhuaPanel");
	}

	return YishouFuhuaPanelUI;
})(View)


//class ui.mobile.role.ZhuanzhiPanelUI extends laya.ui.View
var ZhuanzhiPanelUI=(function(_super){
	function ZhuanzhiPanelUI(){
		this.window=null;
		this.bg=null;
		this.box1=null;
		this.jobbox1=null;
		this.job1=null;
		this.jobbox2=null;
		this.job2=null;
		this.selectImg=null;
		this.box2=null;
		this.back_btn=null;
		this.libao_box=null;
		this.desc_txt=null;
		this.btn=null;
		ZhuanzhiPanelUI.__super.call(this);
	}

	__class(ZhuanzhiPanelUI,'ui.mobile.role.ZhuanzhiPanelUI',_super);
	var __proto=ZhuanzhiPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/role/ZhuanzhiPanel");
	}

	return ZhuanzhiPanelUI;
})(View)


//class ui.mobile.setup.InviteCodePanelUI extends laya.ui.View
var InviteCodePanelUI=(function(_super){
	function InviteCodePanelUI(){
		this.closeBtn=null;
		this.code_txt=null;
		this.btn_copy=null;
		InviteCodePanelUI.__super.call(this);
	}

	__class(InviteCodePanelUI,'ui.mobile.setup.InviteCodePanelUI',_super);
	var __proto=InviteCodePanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/setup/InviteCodePanel");
	}

	return InviteCodePanelUI;
})(View)


//class ui.mobile.setup.neigua.SetupNeiguaBuyPanelUI extends laya.ui.View
var SetupNeiguaBuyPanelUI=(function(_super){
	function SetupNeiguaBuyPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.btn=null;
		SetupNeiguaBuyPanelUI.__super.call(this);
	}

	__class(SetupNeiguaBuyPanelUI,'ui.mobile.setup.neigua.SetupNeiguaBuyPanelUI',_super);
	var __proto=SetupNeiguaBuyPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/setup/neigua/SetupNeiguaBuyPanel");
	}

	return SetupNeiguaBuyPanelUI;
})(View)


//class ui.mobile.setup.neigua.SetupNeiguaMapItemUI extends laya.ui.View
var SetupNeiguaMapItemUI=(function(_super){
	function SetupNeiguaMapItemUI(){
		this.bg=null;
		this.ck=null;
		this.name_txt=null;
		this.desc_txt=null;
		SetupNeiguaMapItemUI.__super.call(this);
	}

	__class(SetupNeiguaMapItemUI,'ui.mobile.setup.neigua.SetupNeiguaMapItemUI',_super);
	var __proto=SetupNeiguaMapItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/setup/neigua/SetupNeiguaMapItem");
	}

	return SetupNeiguaMapItemUI;
})(View)


//class ui.mobile.setup.neigua.SetupNeiguaMapPanelUI extends laya.ui.View
var SetupNeiguaMapPanelUI=(function(_super){
	function SetupNeiguaMapPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.title=null;
		this.select_img=null;
		this.tablist=null;
		this.itemlist=null;
		SetupNeiguaMapPanelUI.__super.call(this);
	}

	__class(SetupNeiguaMapPanelUI,'ui.mobile.setup.neigua.SetupNeiguaMapPanelUI',_super);
	var __proto=SetupNeiguaMapPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/setup/neigua/SetupNeiguaMapPanel");
	}

	return SetupNeiguaMapPanelUI;
})(View)


//class ui.mobile.setup.neigua.SetupNeiguaMapTabUI extends laya.ui.View
var SetupNeiguaMapTabUI=(function(_super){
	function SetupNeiguaMapTabUI(){
		this.btn=null;
		SetupNeiguaMapTabUI.__super.call(this);
	}

	__class(SetupNeiguaMapTabUI,'ui.mobile.setup.neigua.SetupNeiguaMapTabUI',_super);
	var __proto=SetupNeiguaMapTabUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/setup/neigua/SetupNeiguaMapTab");
	}

	return SetupNeiguaMapTabUI;
})(View)


//class ui.mobile.setup.OfflineShouyiPanelUI extends laya.ui.View
var OfflineShouyiPanelUI=(function(_super){
	function OfflineShouyiPanelUI(){
		this.bg=null;
		this.i_list=null;
		this.txt=null;
		this.closeBtn=null;
		this.tipBox=null;
		this.btn=null;
		OfflineShouyiPanelUI.__super.call(this);
	}

	__class(OfflineShouyiPanelUI,'ui.mobile.setup.OfflineShouyiPanelUI',_super);
	var __proto=OfflineShouyiPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/setup/OfflineShouyiPanel");
	}

	return OfflineShouyiPanelUI;
})(View)


//class ui.mobile.setup.SetupAIOfflinePanelUI extends laya.ui.View
var SetupAIOfflinePanelUI=(function(_super){
	function SetupAIOfflinePanelUI(){
		this.window=null;
		this.ruleTxt=null;
		SetupAIOfflinePanelUI.__super.call(this);
	}

	__class(SetupAIOfflinePanelUI,'ui.mobile.setup.SetupAIOfflinePanelUI',_super);
	var __proto=SetupAIOfflinePanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window5UI",Window5UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/setup/SetupAIOfflinePanel");
	}

	return SetupAIOfflinePanelUI;
})(View)


//class ui.mobile.setup.SetupAutoFusePanelUI extends laya.ui.View
var SetupAutoFusePanelUI=(function(_super){
	function SetupAutoFusePanelUI(){
		this.bg=null;
		this.p_list=null;
		this.closeBtn=null;
		this.btnGou2=null;
		this.btnGou1=null;
		this.tipTxt=null;
		SetupAutoFusePanelUI.__super.call(this);
	}

	__class(SetupAutoFusePanelUI,'ui.mobile.setup.SetupAutoFusePanelUI',_super);
	var __proto=SetupAutoFusePanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.bag.ronglian.RonglianSetupItemUI",RonglianSetupItemUI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/setup/SetupAutoFusePanel");
	}

	return SetupAutoFusePanelUI;
})(View)


//class ui.mobile.setup.SetupOfflineMapItemUI extends laya.ui.View
var SetupOfflineMapItemUI=(function(_super){
	function SetupOfflineMapItemUI(){
		this.mapTxt=null;
		this.conTxt=null;
		this.btn=null;
		this.max_shouyi=null;
		SetupOfflineMapItemUI.__super.call(this);
	}

	__class(SetupOfflineMapItemUI,'ui.mobile.setup.SetupOfflineMapItemUI',_super);
	var __proto=SetupOfflineMapItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/setup/SetupOfflineMapItem");
	}

	return SetupOfflineMapItemUI;
})(View)


//class ui.mobile.setup.SetupOfflineMapPanelUI extends laya.ui.View
var SetupOfflineMapPanelUI=(function(_super){
	function SetupOfflineMapPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.m_list=null;
		this.map_txt=null;
		SetupOfflineMapPanelUI.__super.call(this);
	}

	__class(SetupOfflineMapPanelUI,'ui.mobile.setup.SetupOfflineMapPanelUI',_super);
	var __proto=SetupOfflineMapPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.setup.SetupOfflineMapItemUI",SetupOfflineMapItemUI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/setup/SetupOfflineMapPanel");
	}

	return SetupOfflineMapPanelUI;
})(View)


//class ui.mobile.setup.SetupPanelUI extends laya.ui.View
var SetupPanelUI=(function(_super){
	function SetupPanelUI(){
		this.window=null;
		this.bg=null;
		this.btnLogin=null;
		this.btnReset=null;
		this.btnRole=null;
		this.btnCode=null;
		SetupPanelUI.__super.call(this);
	}

	__class(SetupPanelUI,'ui.mobile.setup.SetupPanelUI',_super);
	var __proto=SetupPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/setup/SetupPanel");
	}

	return SetupPanelUI;
})(View)


//class ui.mobile.shenhua.fuxi.FuxiJinglianPanelUI extends laya.ui.View
var FuxiJinglianPanelUI=(function(_super){
	function FuxiJinglianPanelUI(){
		this.bg=null;
		this.p_panel=null;
		this.nameTxt0=null;
		this.nameTxt1=null;
		this.nameTxt2=null;
		this.numTxt2=null;
		this.numTxt1=null;
		this.needTxt=null;
		this.haveTxt=null;
		this.descTxt=null;
		this.btnUP=null;
		this.closeBtn=null;
		this.btnLink=null;
		this.s_select=null;
		FuxiJinglianPanelUI.__super.call(this);
	}

	__class(FuxiJinglianPanelUI,'ui.mobile.shenhua.fuxi.FuxiJinglianPanelUI',_super);
	var __proto=FuxiJinglianPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenhua/fuxi/FuxiJinglianPanel");
	}

	return FuxiJinglianPanelUI;
})(View)


//class ui.mobile.shenhua.fuxi.FuxiSuitItemUI extends laya.ui.View
var FuxiSuitItemUI=(function(_super){
	function FuxiSuitItemUI(){
		this.titleTxt=null;
		this.txt=null;
		FuxiSuitItemUI.__super.call(this);
	}

	__class(FuxiSuitItemUI,'ui.mobile.shenhua.fuxi.FuxiSuitItemUI',_super);
	var __proto=FuxiSuitItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenhua/fuxi/FuxiSuitItem");
	}

	return FuxiSuitItemUI;
})(View)


//class ui.mobile.shenhua.fuxi.FuxiSuitPanelUI extends laya.ui.View
var FuxiSuitPanelUI=(function(_super){
	function FuxiSuitPanelUI(){
		this.bg=null;
		this.p_panel=null;
		this.closeBtn=null;
		FuxiSuitPanelUI.__super.call(this);
	}

	__class(FuxiSuitPanelUI,'ui.mobile.shenhua.fuxi.FuxiSuitPanelUI',_super);
	var __proto=FuxiSuitPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenhua/fuxi/FuxiSuitPanel");
	}

	return FuxiSuitPanelUI;
})(View)


//class ui.mobile.shenhua.nvwa.NvwaShengxingPanelUI extends laya.ui.View
var NvwaShengxingPanelUI=(function(_super){
	function NvwaShengxingPanelUI(){
		this.bg=null;
		this.bg2=null;
		this.descTxt=null;
		this.yimanxing=null;
		this.r_btn=null;
		this.l_btn=null;
		this.attrTxt0=null;
		this.attrTxt1=null;
		this.attrTxt2=null;
		this.attrTxt3=null;
		this.attrTxt4=null;
		this.closeBtn=null;
		this.g_select=null;
		NvwaShengxingPanelUI.__super.call(this);
	}

	__class(NvwaShengxingPanelUI,'ui.mobile.shenhua.nvwa.NvwaShengxingPanelUI',_super);
	var __proto=NvwaShengxingPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenhua/nvwa/NvwaShengxingPanel");
	}

	return NvwaShengxingPanelUI;
})(View)


//class ui.mobile.shenhua.nvwa.NvwaShopPanelUI extends laya.ui.View
var NvwaShopPanelUI=(function(_super){
	function NvwaShopPanelUI(){
		this.bg=null;
		this.p_panel=null;
		this.btnFenjie=null;
		this.closeBtn=null;
		NvwaShopPanelUI.__super.call(this);
	}

	__class(NvwaShopPanelUI,'ui.mobile.shenhua.nvwa.NvwaShopPanelUI',_super);
	var __proto=NvwaShopPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenhua/nvwa/NvwaShopPanel");
	}

	return NvwaShopPanelUI;
})(View)


//class ui.mobile.shenhua.nvwa.NvwaSkillActivePanelUI extends laya.ui.View
var NvwaSkillActivePanelUI=(function(_super){
	function NvwaSkillActivePanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.descTxt=null;
		this.btn=null;
		this.s_boxs=null;
		this.s_box0=null;
		this.s_txt0=null;
		this.icon0=null;
		this.s_box1=null;
		this.s_txt1=null;
		this.icon1=null;
		this.s_box2=null;
		this.s_txt2=null;
		this.icon2=null;
		this.s_select=null;
		this.yijihuo=null;
		NvwaSkillActivePanelUI.__super.call(this);
	}

	__class(NvwaSkillActivePanelUI,'ui.mobile.shenhua.nvwa.NvwaSkillActivePanelUI',_super);
	var __proto=NvwaSkillActivePanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenhua/nvwa/NvwaSkillActivePanel");
	}

	return NvwaSkillActivePanelUI;
})(View)


//class ui.mobile.shenhua.nvwa.NvwaSkillItem1UI extends laya.ui.View
var NvwaSkillItem1UI=(function(_super){
	function NvwaSkillItem1UI(){
		this.icon=null;
		this.starImg=null;
		this.starTxt=null;
		NvwaSkillItem1UI.__super.call(this);
	}

	__class(NvwaSkillItem1UI,'ui.mobile.shenhua.nvwa.NvwaSkillItem1UI',_super);
	var __proto=NvwaSkillItem1UI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenhua/nvwa/NvwaSkillItem1");
	}

	return NvwaSkillItem1UI;
})(View)


//class ui.mobile.shenhua.nvwa.NvwaSkillItem2UI extends laya.ui.View
var NvwaSkillItem2UI=(function(_super){
	function NvwaSkillItem2UI(){
		this.starImg=null;
		this.starTxt=null;
		this.icon=null;
		NvwaSkillItem2UI.__super.call(this);
	}

	__class(NvwaSkillItem2UI,'ui.mobile.shenhua.nvwa.NvwaSkillItem2UI',_super);
	var __proto=NvwaSkillItem2UI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenhua/nvwa/NvwaSkillItem2");
	}

	return NvwaSkillItem2UI;
})(View)


//class ui.mobile.shenhua.nvwa.NvwaSkillPanelUI extends laya.ui.View
var NvwaSkillPanelUI=(function(_super){
	function NvwaSkillPanelUI(){
		this.bg=null;
		this.s_line=null;
		this.closeBtn=null;
		this.dian0=null;
		this.dian1=null;
		this.dian3=null;
		this.dian4=null;
		this.dian6=null;
		this.dian7=null;
		this.dian9=null;
		this.dian10=null;
		this.dian2=null;
		this.dian5=null;
		this.dian8=null;
		this.dian11=null;
		this.btnReset=null;
		this.totalTxt=null;
		NvwaSkillPanelUI.__super.call(this);
	}

	__class(NvwaSkillPanelUI,'ui.mobile.shenhua.nvwa.NvwaSkillPanelUI',_super);
	var __proto=NvwaSkillPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.shenhua.nvwa.NvwaSkillItem1UI",NvwaSkillItem1UI);
		View.regComponent("ui.mobile.shenhua.nvwa.NvwaSkillItem2UI",NvwaSkillItem2UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenhua/nvwa/NvwaSkillPanel");
	}

	return NvwaSkillPanelUI;
})(View)


//class ui.mobile.shenhua.pangu.PanguMallPanelUI extends laya.ui.View
var PanguMallPanelUI=(function(_super){
	function PanguMallPanelUI(){
		this.window=null;
		this.closeBtn=null;
		this.tabs=null;
		this.r_title=null;
		this.moneyTxt0=null;
		this.moneyTxt1=null;
		this.moneyTxt2=null;
		this.moneyTxt3=null;
		this.getIcon=null;
		this.r_getTxt=null;
		this.re_max=null;
		this.btnRE=null;
		this.timeTxt=null;
		this.r_nameTxt=null;
		this.m_list=null;
		this.r_list=null;
		this.btnTxt=null;
		this.btnGet=null;
		this.r_haveTxt=null;
		this.closeBtn2=null;
		PanguMallPanelUI.__super.call(this);
	}

	__class(PanguMallPanelUI,'ui.mobile.shenhua.pangu.PanguMallPanelUI',_super);
	var __proto=PanguMallPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenhua/pangu/PanguMallPanel");
	}

	return PanguMallPanelUI;
})(View)


//class ui.mobile.shenhua.ShenhuaFenjiePanelUI extends laya.ui.View
var ShenhuaFenjiePanelUI=(function(_super){
	function ShenhuaFenjiePanelUI(){
		this.bg=null;
		this.p_list=null;
		this.r_btn=null;
		this.closeBtn=null;
		this.txt=null;
		this.btnGou=null;
		this.gouTxt=null;
		this.btnRank=null;
		this.l_btn=null;
		ShenhuaFenjiePanelUI.__super.call(this);
	}

	__class(ShenhuaFenjiePanelUI,'ui.mobile.shenhua.ShenhuaFenjiePanelUI',_super);
	var __proto=ShenhuaFenjiePanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenhua/ShenhuaFenjiePanel");
	}

	return ShenhuaFenjiePanelUI;
})(View)


//class ui.mobile.shenjiang.EquipListViewUI extends laya.ui.View
var EquipListViewUI=(function(_super){
	function EquipListViewUI(){
		this.window=null;
		this.title=null;
		this.pageBox=null;
		this.pageTxt=null;
		this.r_btn=null;
		this.l_btn=null;
		this.btnClick=null;
		EquipListViewUI.__super.call(this);
	}

	__class(EquipListViewUI,'ui.mobile.shenjiang.EquipListViewUI',_super);
	var __proto=EquipListViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenjiang/EquipListView");
	}

	return EquipListViewUI;
})(View)


//class ui.mobile.shenlu.ShenLuSkillPanelUI extends laya.ui.View
var ShenLuSkillPanelUI=(function(_super){
	function ShenLuSkillPanelUI(){
		this.bg=null;
		this.bg2=null;
		this.closeBtn=null;
		this.nowNode=null;
		this.name_txt=null;
		this.state_txt=null;
		this.des_txt=null;
		this.nextNode=null;
		this.nextName_txt=null;
		this.nextState_txt=null;
		this.nextDes_txt=null;
		this.upgradeNode=null;
		this.btn_up=null;
		this.need_txt=null;
		ShenLuSkillPanelUI.__super.call(this);
	}

	__class(ShenLuSkillPanelUI,'ui.mobile.shenlu.ShenLuSkillPanelUI',_super);
	var __proto=ShenLuSkillPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenlu/ShenLuSkillPanel");
	}

	return ShenLuSkillPanelUI;
})(View)


//class ui.mobile.shenlu.ShenLuViewUI extends laya.ui.View
var ShenLuViewUI=(function(_super){
	function ShenLuViewUI(){
		this.window=null;
		this.bg=null;
		this.upgradeNode=null;
		this.imgMax=null;
		this.need_txt=null;
		this.btn_way=null;
		this.btn_up=null;
		this.skillNode=null;
		this.imgSkillOpen=null;
		this.skillName_txt=null;
		this.skill_txt=null;
		this.avatarNode=null;
		this.ball0=null;
		this.ball1=null;
		this.ball2=null;
		this.ball3=null;
		this.ball4=null;
		this.ball5=null;
		this.ball6=null;
		this.ball7=null;
		this.ball8=null;
		this.ball9=null;
		this.name_txt=null;
		ShenLuViewUI.__super.call(this);
	}

	__class(ShenLuViewUI,'ui.mobile.shenlu.ShenLuViewUI',_super);
	var __proto=ShenLuViewUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenlu/ShenLuView");
	}

	return ShenLuViewUI;
})(View)


//class ui.mobile.shenmo.ShenmoEquipPanelUI extends laya.ui.View
var ShenmoEquipPanelUI=(function(_super){
	function ShenmoEquipPanelUI(){
		this.window=null;
		this.bg=null;
		this.yimanjie=null;
		this.head_select=null;
		this.grid0=null;
		this.grid1=null;
		this.l_btn=null;
		this.r_btn=null;
		this.g_select=null;
		this.btnUP=null;
		this.s5_box=null;
		this.s5_c_title=null;
		this.s5_n_title=null;
		this.s5_n_attrTxt=null;
		this.s5_c_attrTxt=null;
		this.head_mask=null;
		this.headBox=null;
		this.backBox=null;
		this.c_icon=null;
		this.btnAdd=null;
		this.c_txt=null;
		this.wusunTxt=null;
		this.nameImg=null;
		this.s4_list=null;
		ShenmoEquipPanelUI.__super.call(this);
	}

	__class(ShenmoEquipPanelUI,'ui.mobile.shenmo.ShenmoEquipPanelUI',_super);
	var __proto=ShenmoEquipPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenmo/ShenmoEquipPanel");
	}

	return ShenmoEquipPanelUI;
})(View)


//class ui.mobile.shenmo.ShenmoHeadUI extends laya.ui.View
var ShenmoHeadUI=(function(_super){
	function ShenmoHeadUI(){
		this.bg=null;
		this.icon=null;
		ShenmoHeadUI.__super.call(this);
	}

	__class(ShenmoHeadUI,'ui.mobile.shenmo.ShenmoHeadUI',_super);
	var __proto=ShenmoHeadUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenmo/ShenmoHead");
	}

	return ShenmoHeadUI;
})(View)


//class ui.mobile.shenmo.ShenmoSkillGridUI extends laya.ui.View
var ShenmoSkillGridUI=(function(_super){
	function ShenmoSkillGridUI(){
		this.bg=null;
		this.icon=null;
		this.txt=null;
		ShenmoSkillGridUI.__super.call(this);
	}

	__class(ShenmoSkillGridUI,'ui.mobile.shenmo.ShenmoSkillGridUI',_super);
	var __proto=ShenmoSkillGridUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenmo/ShenmoSkillGrid");
	}

	return ShenmoSkillGridUI;
})(View)


//class ui.mobile.shenmo.ShenmoSkillItemUI extends laya.ui.View
var ShenmoSkillItemUI=(function(_super){
	function ShenmoSkillItemUI(){
		this.bg=null;
		this.icon=null;
		this.nameTxt=null;
		this.txt=null;
		ShenmoSkillItemUI.__super.call(this);
	}

	__class(ShenmoSkillItemUI,'ui.mobile.shenmo.ShenmoSkillItemUI',_super);
	var __proto=ShenmoSkillItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenmo/ShenmoSkillItem");
	}

	return ShenmoSkillItemUI;
})(View)


//class ui.mobile.shenmo.ShenmoSkillUPPanelUI extends laya.ui.View
var ShenmoSkillUPPanelUI=(function(_super){
	function ShenmoSkillUPPanelUI(){
		this.bg=null;
		this.n_box=null;
		this.ns_titleTxt=null;
		this.ns_attrTxt=null;
		this.ns_icon=null;
		this.ns_d_txt=null;
		this.cs_titleTxt=null;
		this.cs_attrTxt=null;
		this.cs_icon=null;
		this.cs_d_txt=null;
		this.yimanjie=null;
		this.descTxt=null;
		this.upbox=null;
		this.btnUP=null;
		this.c_icon=null;
		this.btnAdd=null;
		this.c_txt=null;
		this.jiefont=null;
		this.jienum=null;
		this.closeBtn=null;
		this.closeBtn2=null;
		ShenmoSkillUPPanelUI.__super.call(this);
	}

	__class(ShenmoSkillUPPanelUI,'ui.mobile.shenmo.ShenmoSkillUPPanelUI',_super);
	var __proto=ShenmoSkillUPPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenmo/ShenmoSkillUPPanel");
	}

	return ShenmoSkillUPPanelUI;
})(View)


//class ui.mobile.shenqi.ShenqiPanelUI extends laya.ui.View
var ShenqiPanelUI=(function(_super){
	function ShenqiPanelUI(){
		this.bg=null;
		this.yangBox=null;
		this.grid1=null;
		this.grid0=null;
		this.grid5=null;
		this.grid6=null;
		this.grid7=null;
		this.grid2=null;
		this.grid3=null;
		this.grid8=null;
		this.grid4=null;
		this.grid9=null;
		this.grid10=null;
		this.grid11=null;
		this.closeBtn2=null;
		this.closeBtn=null;
		this.r_grid=null;
		this.tipBox=null;
		this.r_descTxt=null;
		this.r_nameTxt=null;
		this.r_attrTxt=null;
		ShenqiPanelUI.__super.call(this);
	}

	__class(ShenqiPanelUI,'ui.mobile.shenqi.ShenqiPanelUI',_super);
	var __proto=ShenqiPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenqi/ShenqiPanel");
	}

	return ShenqiPanelUI;
})(View)


//class ui.mobile.shenqi.ShenqiSelectPanelUI extends laya.ui.View
var ShenqiSelectPanelUI=(function(_super){
	function ShenqiSelectPanelUI(){
		this.bg=null;
		this.l_list=null;
		this.closeBtn=null;
		ShenqiSelectPanelUI.__super.call(this);
	}

	__class(ShenqiSelectPanelUI,'ui.mobile.shenqi.ShenqiSelectPanelUI',_super);
	var __proto=ShenqiSelectPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenqi/ShenqiSelectPanel");
	}

	return ShenqiSelectPanelUI;
})(View)


//class ui.mobile.shenshou.ShenshouAddPanelUI extends laya.ui.View
var ShenshouAddPanelUI=(function(_super){
	function ShenshouAddPanelUI(){
		this.window=null;
		this.btn=null;
		this.btnWay=null;
		ShenshouAddPanelUI.__super.call(this);
	}

	__class(ShenshouAddPanelUI,'ui.mobile.shenshou.ShenshouAddPanelUI',_super);
	var __proto=ShenshouAddPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenshou/ShenshouAddPanel");
	}

	return ShenshouAddPanelUI;
})(View)


//class ui.mobile.shenshou.ShenshouQHPanelUI extends laya.ui.View
var ShenshouQHPanelUI=(function(_super){
	function ShenshouQHPanelUI(){
		this.window=null;
		this.bg=null;
		this.shenshouImg=null;
		this.shenshouSoul=null;
		this.nameTxt=null;
		this.wearTxt=null;
		this.attrTxt=null;
		this.bar1=null;
		this.bar=null;
		this.bar2=null;
		this.barTxt=null;
		this.r_list=null;
		this.btnSend=null;
		this.yimanji=null;
		this.not_img=null;
		this.g_select=null;
		this.qhAddTxt=null;
		ShenshouQHPanelUI.__super.call(this);
	}

	__class(ShenshouQHPanelUI,'ui.mobile.shenshou.ShenshouQHPanelUI',_super);
	var __proto=ShenshouQHPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shenshou/ShenshouQHPanel");
	}

	return ShenshouQHPanelUI;
})(View)


//class ui.mobile.shop.ZhekouUI extends laya.ui.View
var ZhekouUI=(function(_super){
	function ZhekouUI(){
		this.bg=null;
		this.txt=null;
		ZhekouUI.__super.call(this);
	}

	__class(ZhekouUI,'ui.mobile.shop.ZhekouUI',_super);
	var __proto=ZhekouUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shop/Zhekou");
	}

	return ZhekouUI;
})(View)


//class ui.mobile.shouji.EquipShoujiPanelUI extends laya.ui.View
var EquipShoujiPanelUI=(function(_super){
	function EquipShoujiPanelUI(){
		this.window=null;
		this.bg=null;
		this.title=null;
		EquipShoujiPanelUI.__super.call(this);
	}

	__class(EquipShoujiPanelUI,'ui.mobile.shouji.EquipShoujiPanelUI',_super);
	var __proto=EquipShoujiPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shouji/EquipShoujiPanel");
	}

	return EquipShoujiPanelUI;
})(View)


//class ui.mobile.shouji.XuanshangItemUI extends laya.ui.View
var XuanshangItemUI=(function(_super){
	function XuanshangItemUI(){
		this.txt=null;
		this.gou=null;
		XuanshangItemUI.__super.call(this);
	}

	__class(XuanshangItemUI,'ui.mobile.shouji.XuanshangItemUI',_super);
	var __proto=XuanshangItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/shouji/XuanshangItem");
	}

	return XuanshangItemUI;
})(View)


//class ui.mobile.skill.fuzhanMiji.FuzhanMijiAttrPanelUI extends laya.ui.View
var FuzhanMijiAttrPanelUI=(function(_super){
	function FuzhanMijiAttrPanelUI(){
		this.bg=null;
		this.list=null;
		this.title=null;
		this.closeBtn=null;
		FuzhanMijiAttrPanelUI.__super.call(this);
	}

	__class(FuzhanMijiAttrPanelUI,'ui.mobile.skill.fuzhanMiji.FuzhanMijiAttrPanelUI',_super);
	var __proto=FuzhanMijiAttrPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/skill/fuzhanMiji/FuzhanMijiAttrPanel");
	}

	return FuzhanMijiAttrPanelUI;
})(View)


//class ui.mobile.skill.fuzhanMiji.FuzhanMijiZhihuanPanelUI extends laya.ui.View
var FuzhanMijiZhihuanPanelUI=(function(_super){
	function FuzhanMijiZhihuanPanelUI(){
		this.bg=null;
		this.bg0=null;
		this.list=null;
		this.grid0=null;
		this.grid1=null;
		this.grid2=null;
		this.curGrid=null;
		this.btn=null;
		this.helpBox=null;
		this.closeBtn=null;
		FuzhanMijiZhihuanPanelUI.__super.call(this);
	}

	__class(FuzhanMijiZhihuanPanelUI,'ui.mobile.skill.fuzhanMiji.FuzhanMijiZhihuanPanelUI',_super);
	var __proto=FuzhanMijiZhihuanPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/skill/fuzhanMiji/FuzhanMijiZhihuanPanel");
	}

	return FuzhanMijiZhihuanPanelUI;
})(View)


//class ui.mobile.skill.fuzhanMiji.FuzhanMijiZhSuccesPanelUI extends laya.ui.View
var FuzhanMijiZhSuccesPanelUI=(function(_super){
	function FuzhanMijiZhSuccesPanelUI(){
		this.bg=null;
		this.title=null;
		this.btn=null;
		FuzhanMijiZhSuccesPanelUI.__super.call(this);
	}

	__class(FuzhanMijiZhSuccesPanelUI,'ui.mobile.skill.fuzhanMiji.FuzhanMijiZhSuccesPanelUI',_super);
	var __proto=FuzhanMijiZhSuccesPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/skill/fuzhanMiji/FuzhanMijiZhSuccesPanel");
	}

	return FuzhanMijiZhSuccesPanelUI;
})(View)


//class ui.mobile.skill.fuzhanMiji.FuzhanMijiZonglanPanelUI extends laya.ui.View
var FuzhanMijiZonglanPanelUI=(function(_super){
	function FuzhanMijiZonglanPanelUI(){
		this.window=null;
		this.bg=null;
		this.noSp=null;
		this.attrSp=null;
		this.gridCtn=null;
		this.nameTxt=null;
		this.descTxt=null;
		this.attrTxt=null;
		this.list=null;
		this.title=null;
		this.selectImg=null;
		FuzhanMijiZonglanPanelUI.__super.call(this);
	}

	__class(FuzhanMijiZonglanPanelUI,'ui.mobile.skill.fuzhanMiji.FuzhanMijiZonglanPanelUI',_super);
	var __proto=FuzhanMijiZonglanPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/skill/fuzhanMiji/FuzhanMijiZonglanPanel");
	}

	return FuzhanMijiZonglanPanelUI;
})(View)


//class ui.mobile.skill.SkillLvDescTextUI extends laya.ui.View
var SkillLvDescTextUI=(function(_super){
	function SkillLvDescTextUI(){
		this.lv_txt=null;
		this.desc_txt=null;
		SkillLvDescTextUI.__super.call(this);
	}

	__class(SkillLvDescTextUI,'ui.mobile.skill.SkillLvDescTextUI',_super);
	var __proto=SkillLvDescTextUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/skill/SkillLvDescText");
	}

	return SkillLvDescTextUI;
})(View)


//class ui.mobile.skill.SkillPanelUI extends laya.ui.View
var SkillPanelUI=(function(_super){
	function SkillPanelUI(){
		this.window=null;
		this.bg=null;
		this.title=null;
		SkillPanelUI.__super.call(this);
	}

	__class(SkillPanelUI,'ui.mobile.skill.SkillPanelUI',_super);
	var __proto=SkillPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/skill/SkillPanel");
	}

	return SkillPanelUI;
})(View)


//class ui.mobile.skill.SkillSetItemUI extends laya.ui.View
var SkillSetItemUI=(function(_super){
	function SkillSetItemUI(){
		this.icon=null;
		this.name_txt=null;
		SkillSetItemUI.__super.call(this);
	}

	__class(SkillSetItemUI,'ui.mobile.skill.SkillSetItemUI',_super);
	var __proto=SkillSetItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/skill/SkillSetItem");
	}

	return SkillSetItemUI;
})(View)


//class ui.mobile.skill.SkillSetMobiUI extends laya.ui.View
var SkillSetMobiUI=(function(_super){
	function SkillSetMobiUI(){
		this.iconbg0=null;
		this.icon0=null;
		this.iconbg1=null;
		this.icon1=null;
		this.iconbg2=null;
		this.icon2=null;
		this.iconbg3=null;
		this.icon3=null;
		this.iconbg4=null;
		this.icon4=null;
		this.iconbg5=null;
		this.icon5=null;
		this.iconbg6=null;
		this.icon6=null;
		this.iconbg7=null;
		this.icon7=null;
		this.iconbg100=null;
		this.icon100=null;
		this.iconbg101=null;
		this.icon101=null;
		this.iconbg102=null;
		this.icon102=null;
		this.iconbg103=null;
		this.icon103=null;
		this.iconbg104=null;
		this.icon104=null;
		SkillSetMobiUI.__super.call(this);
	}

	__class(SkillSetMobiUI,'ui.mobile.skill.SkillSetMobiUI',_super);
	var __proto=SkillSetMobiUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/skill/SkillSetMobi");
	}

	return SkillSetMobiUI;
})(View)


//class ui.mobile.skill.SkillSetPCUI extends laya.ui.View
var SkillSetPCUI=(function(_super){
	function SkillSetPCUI(){
		this.iconbg0=null;
		this.icon0=null;
		this.iconbg1=null;
		this.icon1=null;
		this.iconbg2=null;
		this.icon2=null;
		this.iconbg3=null;
		this.icon3=null;
		this.iconbg4=null;
		this.icon4=null;
		this.iconbg5=null;
		this.icon5=null;
		this.iconbg6=null;
		this.icon6=null;
		this.iconbg7=null;
		this.icon7=null;
		this.iconbg8=null;
		this.icon8=null;
		this.iconbg9=null;
		this.icon9=null;
		SkillSetPCUI.__super.call(this);
	}

	__class(SkillSetPCUI,'ui.mobile.skill.SkillSetPCUI',_super);
	var __proto=SkillSetPCUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/skill/SkillSetPC");
	}

	return SkillSetPCUI;
})(View)


//class ui.mobile.tanbao.cangbaotu.CangbaotuEnterPanelUI extends laya.ui.View
var CangbaotuEnterPanelUI=(function(_super){
	function CangbaotuEnterPanelUI(){
		this.bg=null;
		this.map_txt=null;
		this.closeBtn=null;
		this.itemTxt=null;
		this.cishuTxt=null;
		this.btn=null;
		CangbaotuEnterPanelUI.__super.call(this);
	}

	__class(CangbaotuEnterPanelUI,'ui.mobile.tanbao.cangbaotu.CangbaotuEnterPanelUI',_super);
	var __proto=CangbaotuEnterPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tanbao/cangbaotu/CangbaotuEnterPanel");
	}

	return CangbaotuEnterPanelUI;
})(View)


//class ui.mobile.tanbao.cangbaotu.CangbaotuNpcPanelUI extends laya.ui.View
var CangbaotuNpcPanelUI=(function(_super){
	function CangbaotuNpcPanelUI(){
		this.bg=null;
		this.txt0=null;
		this.moneyIcon1=null;
		this.moneyTxt1=null;
		this.moneyIcon0=null;
		this.moneyTxt0=null;
		this.descTxt=null;
		this.closeBtn=null;
		this.txt1=null;
		this.btn0=null;
		this.btn1=null;
		CangbaotuNpcPanelUI.__super.call(this);
	}

	__class(CangbaotuNpcPanelUI,'ui.mobile.tanbao.cangbaotu.CangbaotuNpcPanelUI',_super);
	var __proto=CangbaotuNpcPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tanbao/cangbaotu/CangbaotuNpcPanel");
	}

	return CangbaotuNpcPanelUI;
})(View)


//class ui.mobile.tanbao.cangbaotu.CangbaotuPanel2UI extends laya.ui.View
var CangbaotuPanel2UI=(function(_super){
	function CangbaotuPanel2UI(){
		this.san0=null;
		this.san1=null;
		this.san2=null;
		this.san3=null;
		this.san4=null;
		this.san5=null;
		this.san6=null;
		this.san7=null;
		this.arrow=null;
		this.bg=null;
		this.txt=null;
		this.closeBtn=null;
		this.timeTxt=null;
		this.costTxt=null;
		this.btn=null;
		this.img=null;
		this.btnJump=null;
		CangbaotuPanel2UI.__super.call(this);
	}

	__class(CangbaotuPanel2UI,'ui.mobile.tanbao.cangbaotu.CangbaotuPanel2UI',_super);
	var __proto=CangbaotuPanel2UI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tanbao/cangbaotu/CangbaotuPanel2");
	}

	return CangbaotuPanel2UI;
})(View)


//class ui.mobile.tanbao.cangbaotu.CangbaotuPrompt2UI extends laya.ui.View
var CangbaotuPrompt2UI=(function(_super){
	function CangbaotuPrompt2UI(){
		this.window=null;
		this.txt=null;
		this.btn=null;
		CangbaotuPrompt2UI.__super.call(this);
	}

	__class(CangbaotuPrompt2UI,'ui.mobile.tanbao.cangbaotu.CangbaotuPrompt2UI',_super);
	var __proto=CangbaotuPrompt2UI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tanbao/cangbaotu/CangbaotuPrompt2");
	}

	return CangbaotuPrompt2UI;
})(View)


//class ui.mobile.tanbao.cangbaotu.CangbaotuPromptUI extends laya.ui.View
var CangbaotuPromptUI=(function(_super){
	function CangbaotuPromptUI(){
		this.bg=null;
		this.txt=null;
		this.ok_btn=null;
		CangbaotuPromptUI.__super.call(this);
	}

	__class(CangbaotuPromptUI,'ui.mobile.tanbao.cangbaotu.CangbaotuPromptUI',_super);
	var __proto=CangbaotuPromptUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tanbao/cangbaotu/CangbaotuPrompt");
	}

	return CangbaotuPromptUI;
})(View)


//class ui.mobile.tanbao.cangbaotu.CangbaotuZoneInfoUI extends laya.ui.View
var CangbaotuZoneInfoUI=(function(_super){
	function CangbaotuZoneInfoUI(){
		this.bg=null;
		this.timeTxt=null;
		this.line=null;
		this.freeTxt=null;
		this.btnExit=null;
		CangbaotuZoneInfoUI.__super.call(this);
	}

	__class(CangbaotuZoneInfoUI,'ui.mobile.tanbao.cangbaotu.CangbaotuZoneInfoUI',_super);
	var __proto=CangbaotuZoneInfoUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tanbao/cangbaotu/CangbaotuZoneInfo");
	}

	return CangbaotuZoneInfoUI;
})(View)


//class ui.mobile.tanbao.TanbaoDepotPanelUI extends laya.ui.View
var TanbaoDepotPanelUI=(function(_super){
	function TanbaoDepotPanelUI(){
		this.bg=null;
		this.title=null;
		this.closeBtn=null;
		this.get_btn=null;
		this.tidy_btn=null;
		this.p_box=null;
		this.huishou_btn=null;
		this.btn_rank=null;
		this.page_box=null;
		this.l_btn=null;
		this.r_btn=null;
		TanbaoDepotPanelUI.__super.call(this);
	}

	__class(TanbaoDepotPanelUI,'ui.mobile.tanbao.TanbaoDepotPanelUI',_super);
	var __proto=TanbaoDepotPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tanbao/TanbaoDepotPanel");
	}

	return TanbaoDepotPanelUI;
})(View)


//class ui.mobile.tanbao.TanbaoPanelUI extends laya.ui.View
var TanbaoPanelUI=(function(_super){
	function TanbaoPanelUI(){
		this.window=null;
		this.closeBtn=null;
		this.bg=null;
		this.closeBtn2=null;
		TanbaoPanelUI.__super.call(this);
	}

	__class(TanbaoPanelUI,'ui.mobile.tanbao.TanbaoPanelUI',_super);
	var __proto=TanbaoPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tanbao/TanbaoPanel");
	}

	return TanbaoPanelUI;
})(View)


//class ui.mobile.tanbao.TanbaoResultPanelUI extends laya.ui.View
var TanbaoResultPanelUI=(function(_super){
	function TanbaoResultPanelUI(){
		this.bg=null;
		this.title=null;
		this.closeBtn=null;
		this.p_list=null;
		TanbaoResultPanelUI.__super.call(this);
	}

	__class(TanbaoResultPanelUI,'ui.mobile.tanbao.TanbaoResultPanelUI',_super);
	var __proto=TanbaoResultPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tanbao/TanbaoResultPanel");
	}

	return TanbaoResultPanelUI;
})(View)


//class ui.mobile.target.TimeLimitedTargetPanelUI extends laya.ui.View
var TimeLimitedTargetPanelUI=(function(_super){
	function TimeLimitedTargetPanelUI(){
		this.bg=null;
		this.imgDes=null;
		this.closeBtn=null;
		this.avatarNode=null;
		this.btn_get=null;
		this.btn_jump=null;
		this.lv_txt=null;
		this.time_txt=null;
		this.gridNode=null;
		this.jumpNode=null;
		this.btn_buy=null;
		this.btn_rank=null;
		TimeLimitedTargetPanelUI.__super.call(this);
	}

	__class(TimeLimitedTargetPanelUI,'ui.mobile.target.TimeLimitedTargetPanelUI',_super);
	var __proto=TimeLimitedTargetPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/target/TimeLimitedTargetPanel");
	}

	return TimeLimitedTargetPanelUI;
})(View)


//class ui.mobile.taskLimit.TaskLimitPanelUI extends laya.ui.View
var TaskLimitPanelUI=(function(_super){
	function TaskLimitPanelUI(){
		this.window=null;
		this.bg=null;
		this.imgDes=null;
		this.imgTitle=null;
		this.imgGet=null;
		this.btn=null;
		this.imgBar=null;
		this.num_txt=null;
		this.skill_txt=null;
		this.skillDes_txt=null;
		this.time_txt=null;
		this.tip_txt=null;
		TaskLimitPanelUI.__super.call(this);
	}

	__class(TaskLimitPanelUI,'ui.mobile.taskLimit.TaskLimitPanelUI',_super);
	var __proto=TaskLimitPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/taskLimit/TaskLimitPanel");
	}

	return TaskLimitPanelUI;
})(View)


//class ui.mobile.taskLimit.TaskLimitResultPanelUI extends laya.ui.View
var TaskLimitResultPanelUI=(function(_super){
	function TaskLimitResultPanelUI(){
		this.bg=null;
		this.imgGet=null;
		this.effectNode=null;
		this.imgName=null;
		this.btn=null;
		TaskLimitResultPanelUI.__super.call(this);
	}

	__class(TaskLimitResultPanelUI,'ui.mobile.taskLimit.TaskLimitResultPanelUI',_super);
	var __proto=TaskLimitResultPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/taskLimit/TaskLimitResultPanel");
	}

	return TaskLimitResultPanelUI;
})(View)


//class ui.mobile.team.TeamApplyPanelUI extends laya.ui.View
var TeamApplyPanelUI=(function(_super){
	function TeamApplyPanelUI(){
		this.window=null;
		this.title=null;
		this.levelTxt=null;
		this.headbg=null;
		this.head=null;
		this.jobIcon=null;
		this.nameTxt=null;
		this.l_btn=null;
		this.r_btn=null;
		this.tipTxt=null;
		TeamApplyPanelUI.__super.call(this);
	}

	__class(TeamApplyPanelUI,'ui.mobile.team.TeamApplyPanelUI',_super);
	var __proto=TeamApplyPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window3UI",Window3UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/team/TeamApplyPanel");
	}

	return TeamApplyPanelUI;
})(View)


//class ui.mobile.team.TeamYaoqingPanelUI extends laya.ui.View
var TeamYaoqingPanelUI=(function(_super){
	function TeamYaoqingPanelUI(){
		this.title=null;
		this.tabs=null;
		this.p_panel=null;
		this.closeBtn=null;
		TeamYaoqingPanelUI.__super.call(this);
	}

	__class(TeamYaoqingPanelUI,'ui.mobile.team.TeamYaoqingPanelUI',_super);
	var __proto=TeamYaoqingPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/team/TeamYaoqingPanel");
	}

	return TeamYaoqingPanelUI;
})(View)


//class ui.mobile.tejie.TejiePanelUI extends laya.ui.View
var TejiePanelUI=(function(_super){
	function TejiePanelUI(){
		this.window=null;
		this.bg=null;
		this.l_box=null;
		this.l_skillTxt=null;
		this.l_attrTxt=null;
		this.r_box=null;
		this.r_skillTxt=null;
		this.r_attrTxt=null;
		this.nameTxt=null;
		this.l_nameTxt=null;
		this.l_haveTxt=null;
		this.r_haveTxt=null;
		this.r_nameTxt=null;
		this.btnGou=null;
		this.gouTxt=null;
		this.yimanjie=null;
		this.skillTxt=null;
		this.qhLimitTxt=null;
		this.btnUP=null;
		this.btnLink=null;
		TejiePanelUI.__super.call(this);
	}

	__class(TejiePanelUI,'ui.mobile.tejie.TejiePanelUI',_super);
	var __proto=TejiePanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tejie/TejiePanel");
	}

	return TejiePanelUI;
})(View)


//class ui.mobile.TestUIUI extends laya.ui.View
var TestUIUI=(function(_super){
	function TestUIUI(){
		TestUIUI.__super.call(this);;
	}

	__class(TestUIUI,'ui.mobile.TestUIUI',_super);
	var __proto=TestUIUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/TestUI");
	}

	return TestUIUI;
})(View)


//class ui.mobile.tip.item.StarTxtUI extends laya.ui.View
var StarTxtUI=(function(_super){
	function StarTxtUI(){
		this.star=null;
		this.txt=null;
		StarTxtUI.__super.call(this);
	}

	__class(StarTxtUI,'ui.mobile.tip.item.StarTxtUI',_super);
	var __proto=StarTxtUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tip/item/StarTxt");
	}

	return StarTxtUI;
})(View)


//class ui.mobile.tip.item.TipSkillItem2UI extends laya.ui.View
var TipSkillItem2UI=(function(_super){
	function TipSkillItem2UI(){
		this.skillTxt=null;
		this.icon=null;
		this.line=null;
		TipSkillItem2UI.__super.call(this);
	}

	__class(TipSkillItem2UI,'ui.mobile.tip.item.TipSkillItem2UI',_super);
	var __proto=TipSkillItem2UI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tip/item/TipSkillItem2");
	}

	return TipSkillItem2UI;
})(View)


//class ui.mobile.tip.item.TipSkillItemUI extends laya.ui.View
var TipSkillItemUI=(function(_super){
	function TipSkillItemUI(){
		this.name_txt=null;
		this.grid=null;
		this.desc_txt=null;
		this.line=null;
		this.icon=null;
		TipSkillItemUI.__super.call(this);
	}

	__class(TipSkillItemUI,'ui.mobile.tip.item.TipSkillItemUI',_super);
	var __proto=TipSkillItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tip/item/TipSkillItem");
	}

	return TipSkillItemUI;
})(View)


//class ui.mobile.tip.item.TipStoneItemUI extends laya.ui.View
var TipStoneItemUI=(function(_super){
	function TipStoneItemUI(){
		this.attrTxt=null;
		this.icon=null;
		TipStoneItemUI.__super.call(this);
	}

	__class(TipStoneItemUI,'ui.mobile.tip.item.TipStoneItemUI',_super);
	var __proto=TipStoneItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tip/item/TipStoneItem");
	}

	return TipStoneItemUI;
})(View)


//class ui.mobile.tip.TipButtonMenuUI extends laya.ui.View
var TipButtonMenuUI=(function(_super){
	function TipButtonMenuUI(){
		this.drop_btn=null;
		this.use_btn=null;
		TipButtonMenuUI.__super.call(this);
	}

	__class(TipButtonMenuUI,'ui.mobile.tip.TipButtonMenuUI',_super);
	var __proto=TipButtonMenuUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/tip/TipButtonMenu");
	}

	return TipButtonMenuUI;
})(View)


//class ui.mobile.track.LabelItemUI extends laya.ui.View
var LabelItemUI=(function(_super){
	function LabelItemUI(){
		this.conTxt=null;
		this.typeTxt=null;
		LabelItemUI.__super.call(this);
	}

	__class(LabelItemUI,'ui.mobile.track.LabelItemUI',_super);
	var __proto=LabelItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/track/LabelItem");
	}

	return LabelItemUI;
})(View)


//class ui.mobile.track.task.FJHeadItemUI extends laya.ui.View
var FJHeadItemUI=(function(_super){
	function FJHeadItemUI(){
		this.head=null;
		this.hpBar=null;
		this.nameTxt=null;
		FJHeadItemUI.__super.call(this);
	}

	__class(FJHeadItemUI,'ui.mobile.track.task.FJHeadItemUI',_super);
	var __proto=FJHeadItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/track/task/FJHeadItem");
	}

	return FJHeadItemUI;
})(View)


//class ui.mobile.track.TaskTuijianPanelUI extends laya.ui.View
var TaskTuijianPanelUI=(function(_super){
	function TaskTuijianPanelUI(){
		this.bg=null;
		this.bgline=null;
		this.p_panel=null;
		this.closeBtn=null;
		TaskTuijianPanelUI.__super.call(this);
	}

	__class(TaskTuijianPanelUI,'ui.mobile.track.TaskTuijianPanelUI',_super);
	var __proto=TaskTuijianPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/track/TaskTuijianPanel");
	}

	return TaskTuijianPanelUI;
})(View)


//class ui.mobile.treasure.TreasureChipPanelUI extends laya.ui.View
var TreasureChipPanelUI=(function(_super){
	function TreasureChipPanelUI(){
		this.window=null;
		this.imgTitle=null;
		this.btn=null;
		this.num_txt=null;
		TreasureChipPanelUI.__super.call(this);
	}

	__class(TreasureChipPanelUI,'ui.mobile.treasure.TreasureChipPanelUI',_super);
	var __proto=TreasureChipPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window5UI",Window5UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/treasure/TreasureChipPanel");
	}

	return TreasureChipPanelUI;
})(View)


//class ui.mobile.vip.xin.VipLevelDescItemUI extends laya.ui.View
var VipLevelDescItemUI=(function(_super){
	function VipLevelDescItemUI(){
		this.icon=null;
		this.txt=null;
		VipLevelDescItemUI.__super.call(this);
	}

	__class(VipLevelDescItemUI,'ui.mobile.vip.xin.VipLevelDescItemUI',_super);
	var __proto=VipLevelDescItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/vip/xin/VipLevelDescItem");
	}

	return VipLevelDescItemUI;
})(View)


//class ui.mobile.vip.xin.VipPanelUI extends laya.ui.View
var VipPanelUI=(function(_super){
	function VipPanelUI(){
		this.window=null;
		this.closeBtn=null;
		this.closeBtn2=null;
		this.title=null;
		VipPanelUI.__super.call(this);
	}

	__class(VipPanelUI,'ui.mobile.vip.xin.VipPanelUI',_super);
	var __proto=VipPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/vip/xin/VipPanel");
	}

	return VipPanelUI;
})(View)


//class ui.mobile.vip.xin.YuekaLostPanelUI extends laya.ui.View
var YuekaLostPanelUI=(function(_super){
	function YuekaLostPanelUI(){
		this.bg=null;
		this.btnGo=null;
		this.closeBtn=null;
		YuekaLostPanelUI.__super.call(this);
	}

	__class(YuekaLostPanelUI,'ui.mobile.vip.xin.YuekaLostPanelUI',_super);
	var __proto=YuekaLostPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/vip/xin/YuekaLostPanel");
	}

	return YuekaLostPanelUI;
})(View)


//class ui.mobile.Window2UI extends laya.ui.View
var Window2UI=(function(_super){
	function Window2UI(){
		this.bg=null;
		this.closeBtn=null;
		this.closeBtn2=null;
		Window2UI.__super.call(this);
	}

	__class(Window2UI,'ui.mobile.Window2UI',_super);
	var __proto=Window2UI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/Window2");
	}

	return Window2UI;
})(View)


//class ui.mobile.Window3UI extends laya.ui.View
var Window3UI=(function(_super){
	function Window3UI(){
		this.bg=null;
		this.closeBtn=null;
		Window3UI.__super.call(this);
	}

	__class(Window3UI,'ui.mobile.Window3UI',_super);
	var __proto=Window3UI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/Window3");
	}

	return Window3UI;
})(View)


//class ui.mobile.Window4UI extends laya.ui.View
var Window4UI=(function(_super){
	function Window4UI(){
		this.bg=null;
		this.closeBtn=null;
		this.closeBtn2=null;
		Window4UI.__super.call(this);
	}

	__class(Window4UI,'ui.mobile.Window4UI',_super);
	var __proto=Window4UI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/Window4");
	}

	return Window4UI;
})(View)


//class ui.mobile.wulingdahui.panel.WulingdahuiPipeiPanelUI extends laya.ui.View
var WulingdahuiPipeiPanelUI=(function(_super){
	function WulingdahuiPipeiPanelUI(){
		this.bg=null;
		this.nameBg0=null;
		this.nameBg1=null;
		this.icon0=null;
		this.icon1=null;
		this.levelTxt0=null;
		this.nameTxt0=null;
		this.timeTxt=null;
		this.levelTxt1=null;
		this.nameTxt1=null;
		this.pipeiTxt=null;
		WulingdahuiPipeiPanelUI.__super.call(this);
	}

	__class(WulingdahuiPipeiPanelUI,'ui.mobile.wulingdahui.panel.WulingdahuiPipeiPanelUI',_super);
	var __proto=WulingdahuiPipeiPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/panel/WulingdahuiPipeiPanel");
	}

	return WulingdahuiPipeiPanelUI;
})(View)


//class ui.mobile.wulingdahui.panel.WulingdahuiRankPanelUI extends laya.ui.View
var WulingdahuiRankPanelUI=(function(_super){
	function WulingdahuiRankPanelUI(){
		this.window=null;
		this.title=null;
		this.bg0=null;
		this.bg1=null;
		this.avatarNode=null;
		this.list=null;
		this.closeBtn=null;
		this.closeBtn2=null;
		this.btn=null;
		WulingdahuiRankPanelUI.__super.call(this);
	}

	__class(WulingdahuiRankPanelUI,'ui.mobile.wulingdahui.panel.WulingdahuiRankPanelUI',_super);
	var __proto=WulingdahuiRankPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/panel/WulingdahuiRankPanel");
	}

	return WulingdahuiRankPanelUI;
})(View)


//class ui.mobile.wulingdahui.panel.WulingdahuiResultPanelUI extends laya.ui.View
var WulingdahuiResultPanelUI=(function(_super){
	function WulingdahuiResultPanelUI(){
		this.bg=null;
		this.bg1=null;
		this.star0=null;
		this.star1=null;
		this.star2=null;
		this.star3=null;
		this.star4=null;
		this.icon=null;
		this.nameTxt=null;
		this.levelTxt0=null;
		this.starBox=null;
		this.curStar0=null;
		this.curStar1=null;
		this.curStar2=null;
		this.curStar3=null;
		this.btn=null;
		WulingdahuiResultPanelUI.__super.call(this);
	}

	__class(WulingdahuiResultPanelUI,'ui.mobile.wulingdahui.panel.WulingdahuiResultPanelUI',_super);
	var __proto=WulingdahuiResultPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/panel/WulingdahuiResultPanel");
	}

	return WulingdahuiResultPanelUI;
})(View)


//class ui.mobile.wulingdahui.panel.WulingKingPanelUI extends laya.ui.View
var WulingKingPanelUI=(function(_super){
	function WulingKingPanelUI(){
		this.bg=null;
		this.nameTxt=null;
		this.myRankTxt=null;
		this.nameTxt0=null;
		this.nameTxt1=null;
		this.nameTxt2=null;
		this.nameTxt3=null;
		this.btn=null;
		this.closeBtn=null;
		WulingKingPanelUI.__super.call(this);
	}

	__class(WulingKingPanelUI,'ui.mobile.wulingdahui.panel.WulingKingPanelUI',_super);
	var __proto=WulingKingPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/panel/WulingKingPanel");
	}

	return WulingKingPanelUI;
})(View)


//class ui.mobile.wulingdahui.panel.WulingPKResultPanelUI extends laya.ui.View
var WulingPKResultPanelUI=(function(_super){
	function WulingPKResultPanelUI(){
		this.bg=null;
		this.txt=null;
		this.btn=null;
		this.icon=null;
		WulingPKResultPanelUI.__super.call(this);
	}

	__class(WulingPKResultPanelUI,'ui.mobile.wulingdahui.panel.WulingPKResultPanelUI',_super);
	var __proto=WulingPKResultPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/panel/WulingPKResultPanel");
	}

	return WulingPKResultPanelUI;
})(View)


//class ui.mobile.wulingdahui.panel.WulingPKTimePanelUI extends laya.ui.View
var WulingPKTimePanelUI=(function(_super){
	function WulingPKTimePanelUI(){
		this.bg=null;
		this.groupImg=null;
		this.roomImg=null;
		this.txt0=null;
		this.playerTxt=null;
		this.timeTxt=null;
		this.closeBtn=null;
		this.btn=null;
		WulingPKTimePanelUI.__super.call(this);
	}

	__class(WulingPKTimePanelUI,'ui.mobile.wulingdahui.panel.WulingPKTimePanelUI',_super);
	var __proto=WulingPKTimePanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/panel/WulingPKTimePanel");
	}

	return WulingPKTimePanelUI;
})(View)


//class ui.mobile.wulingdahui.panel.WulingPKTipPanelUI extends laya.ui.View
var WulingPKTipPanelUI=(function(_super){
	function WulingPKTipPanelUI(){
		this.stateTxt=null;
		this.icon=null;
		this.groupImg=null;
		this.btn=null;
		this.closeBtn=null;
		WulingPKTipPanelUI.__super.call(this);
	}

	__class(WulingPKTipPanelUI,'ui.mobile.wulingdahui.panel.WulingPKTipPanelUI',_super);
	var __proto=WulingPKTipPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/panel/WulingPKTipPanel");
	}

	return WulingPKTipPanelUI;
})(View)


//class ui.mobile.wulingdahui.panel.WulingPkTopTimeUI extends laya.ui.View
var WulingPkTopTimeUI=(function(_super){
	function WulingPkTopTimeUI(){
		this.bg=null;
		this.descImg=null;
		WulingPkTopTimeUI.__super.call(this);
	}

	__class(WulingPkTopTimeUI,'ui.mobile.wulingdahui.panel.WulingPkTopTimeUI',_super);
	var __proto=WulingPkTopTimeUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/panel/WulingPkTopTime");
	}

	return WulingPkTopTimeUI;
})(View)


//class ui.mobile.wulingdahui.panel.WulingTouziPanelUI extends laya.ui.View
var WulingTouziPanelUI=(function(_super){
	function WulingTouziPanelUI(){
		this.bg=null;
		this.zhichiBg0=null;
		this.zhichiBg1=null;
		this.moneyIcon=null;
		this.selectImg=null;
		this.moneyUrl0=null;
		this.moneyUrl1=null;
		this.icon0=null;
		this.icon1=null;
		this.winnerDesc0=null;
		this.winnerDesc1=null;
		this.nameTxt0=null;
		this.nameTxt1=null;
		this.numTxt1=null;
		this.tatalNumTxt0=null;
		this.tatalNumTxt1=null;
		this.helpTip=null;
		this.input=null;
		this.maxBtn=null;
		this.btn=null;
		this.closeBtn=null;
		WulingTouziPanelUI.__super.call(this);
	}

	__class(WulingTouziPanelUI,'ui.mobile.wulingdahui.panel.WulingTouziPanelUI',_super);
	var __proto=WulingTouziPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/panel/WulingTouziPanel");
	}

	return WulingTouziPanelUI;
})(View)


//class ui.mobile.wulingdahui.panel.WulingZhanbaoPanelUI extends laya.ui.View
var WulingZhanbaoPanelUI=(function(_super){
	function WulingZhanbaoPanelUI(){
		this.bg=null;
		this.bg_zhanbao=null;
		this.moneyIcon0=null;
		this.nameTxt0=null;
		this.nameTxt1=null;
		this.numTxt0=null;
		this.numTxt1=null;
		this.valueTxt=null;
		this.list=null;
		this.title=null;
		this.closeBtn=null;
		WulingZhanbaoPanelUI.__super.call(this);
	}

	__class(WulingZhanbaoPanelUI,'ui.mobile.wulingdahui.panel.WulingZhanbaoPanelUI',_super);
	var __proto=WulingZhanbaoPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/panel/WulingZhanbaoPanel");
	}

	return WulingZhanbaoPanelUI;
})(View)


//class ui.mobile.wulingdahui.panel.WulingZhanjiPanelUI extends laya.ui.View
var WulingZhanjiPanelUI=(function(_super){
	function WulingZhanjiPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.bg_zhichi1=null;
		this.bg_zhichi2=null;
		this.bg_zhichi3=null;
		this.title=null;
		this.list=null;
		WulingZhanjiPanelUI.__super.call(this);
	}

	__class(WulingZhanjiPanelUI,'ui.mobile.wulingdahui.panel.WulingZhanjiPanelUI',_super);
	var __proto=WulingZhanjiPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/panel/WulingZhanjiPanel");
	}

	return WulingZhanjiPanelUI;
})(View)


//class ui.mobile.wulingdahui.panel.WulingZhichiPanelUI extends laya.ui.View
var WulingZhichiPanelUI=(function(_super){
	function WulingZhichiPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.title=null;
		this.bg_zhichi0=null;
		this.bg_zhichi1=null;
		this.bg_zhichi2=null;
		this.list=null;
		this.numTxt=null;
		WulingZhichiPanelUI.__super.call(this);
	}

	__class(WulingZhichiPanelUI,'ui.mobile.wulingdahui.panel.WulingZhichiPanelUI',_super);
	var __proto=WulingZhichiPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/panel/WulingZhichiPanel");
	}

	return WulingZhichiPanelUI;
})(View)


//class ui.mobile.wulingdahui.WulingdaluiPanelUI extends laya.ui.View
var WulingdaluiPanelUI=(function(_super){
	function WulingdaluiPanelUI(){
		this.bg=null;
		this.bg0=null;
		this.bg1=null;
		this.title=null;
		this.tabBtn=null;
		this.closeBtn=null;
		WulingdaluiPanelUI.__super.call(this);
	}

	__class(WulingdaluiPanelUI,'ui.mobile.wulingdahui.WulingdaluiPanelUI',_super);
	var __proto=WulingdaluiPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/wulingdahui/WulingdaluiPanel");
	}

	return WulingdaluiPanelUI;
})(View)


//class ui.mobile.yugao.BenfuPanelUI extends laya.ui.View
var BenfuPanelUI=(function(_super){
	function BenfuPanelUI(){
		this.bg=null;
		this.bg1=null;
		this.bg0=null;
		this.bg2=null;
		this.bg3=null;
		this.closeBtn=null;
		BenfuPanelUI.__super.call(this);
	}

	__class(BenfuPanelUI,'ui.mobile.yugao.BenfuPanelUI',_super);
	var __proto=BenfuPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/yugao/BenfuPanel");
	}

	return BenfuPanelUI;
})(View)


//class ui.mobile.yugao.YugaoPanelUI extends laya.ui.View
var YugaoPanelUI=(function(_super){
	function YugaoPanelUI(){
		this.bg=null;
		this.bgTitle=null;
		this.bg0=null;
		this.title=null;
		this.descImg=null;
		this.closeBtn=null;
		YugaoPanelUI.__super.call(this);
	}

	__class(YugaoPanelUI,'ui.mobile.yugao.YugaoPanelUI',_super);
	var __proto=YugaoPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/yugao/YugaoPanel");
	}

	return YugaoPanelUI;
})(View)


//class ui.mobile.zanzhu.ZanzhuDescItemUI extends laya.ui.View
var ZanzhuDescItemUI=(function(_super){
	function ZanzhuDescItemUI(){
		this.icon=null;
		this.txt=null;
		ZanzhuDescItemUI.__super.call(this);
	}

	__class(ZanzhuDescItemUI,'ui.mobile.zanzhu.ZanzhuDescItemUI',_super);
	var __proto=ZanzhuDescItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zanzhu/ZanzhuDescItem");
	}

	return ZanzhuDescItemUI;
})(View)


//class ui.mobile.zone.cailiao.CailiaoZoneResultPanelUI extends laya.ui.View
var CailiaoZoneResultPanelUI=(function(_super){
	function CailiaoZoneResultPanelUI(){
		this.bg=null;
		this.r_btn=null;
		this.l_btn=null;
		this.killTxt=null;
		this.star1=null;
		this.star2=null;
		this.star0=null;
		this.closeBtn=null;
		CailiaoZoneResultPanelUI.__super.call(this);
	}

	__class(CailiaoZoneResultPanelUI,'ui.mobile.zone.cailiao.CailiaoZoneResultPanelUI',_super);
	var __proto=CailiaoZoneResultPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/cailiao/CailiaoZoneResultPanel");
	}

	return CailiaoZoneResultPanelUI;
})(View)


//class ui.mobile.zone.cailiao.ExpZoneInfoUI extends laya.ui.View
var ExpZoneInfoUI=(function(_super){
	function ExpZoneInfoUI(){
		this.bg=null;
		this.titleBox=null;
		this.title=null;
		this.infoTxt=null;
		this.pingfenBox=null;
		this.pingfen=null;
		this.timeTxt=null;
		this.txt2=null;
		this.txt1=null;
		this.btnExit=null;
		this.btnHide=null;
		ExpZoneInfoUI.__super.call(this);
	}

	__class(ExpZoneInfoUI,'ui.mobile.zone.cailiao.ExpZoneInfoUI',_super);
	var __proto=ExpZoneInfoUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/cailiao/ExpZoneInfo");
	}

	return ExpZoneInfoUI;
})(View)


//class ui.mobile.zone.cailiao.ExpZoneResultPanelUI extends laya.ui.View
var ExpZoneResultPanelUI=(function(_super){
	function ExpZoneResultPanelUI(){
		this.bg=null;
		this.r_btn=null;
		this.l_btn=null;
		this.l_txt=null;
		this.r_txt=null;
		this.map_txt=null;
		this.pingfenBox=null;
		this.pingfen=null;
		this.infoTxt=null;
		this.p_txt=null;
		this.p_icon=null;
		this.btnExit=null;
		ExpZoneResultPanelUI.__super.call(this);
	}

	__class(ExpZoneResultPanelUI,'ui.mobile.zone.cailiao.ExpZoneResultPanelUI',_super);
	var __proto=ExpZoneResultPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/cailiao/ExpZoneResultPanel");
	}

	return ExpZoneResultPanelUI;
})(View)


//class ui.mobile.zone.cailiao.ZoneCailiaoInfoUI extends laya.ui.View
var ZoneCailiaoInfoUI=(function(_super){
	function ZoneCailiaoInfoUI(){
		this.bg=null;
		this.titleBox=null;
		this.title=null;
		this.conTxt=null;
		this.nanduTxt=null;
		this.timeTxt=null;
		this.star0=null;
		this.star1=null;
		this.star2=null;
		this.btnExit=null;
		this.btnHide=null;
		ZoneCailiaoInfoUI.__super.call(this);
	}

	__class(ZoneCailiaoInfoUI,'ui.mobile.zone.cailiao.ZoneCailiaoInfoUI',_super);
	var __proto=ZoneCailiaoInfoUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/cailiao/ZoneCailiaoInfo");
	}

	return ZoneCailiaoInfoUI;
})(View)


//class ui.mobile.zone.cailiao.ZonePanelUI extends laya.ui.View
var ZonePanelUI=(function(_super){
	function ZonePanelUI(){
		this.window=null;
		this.title=null;
		this.bg=null;
		ZonePanelUI.__super.call(this);
	}

	__class(ZonePanelUI,'ui.mobile.zone.cailiao.ZonePanelUI',_super);
	var __proto=ZonePanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/cailiao/ZonePanel");
	}

	return ZonePanelUI;
})(View)


//class ui.mobile.zone.inner.CommonZoneInfoUI extends laya.ui.View
var CommonZoneInfoUI=(function(_super){
	function CommonZoneInfoUI(){
		this.bg=null;
		this.bar=null;
		this.btnExit=null;
		this.titleBox=null;
		this.title=null;
		this.timeTxt=null;
		this.descTxt=null;
		this.btnHide=null;
		CommonZoneInfoUI.__super.call(this);
	}

	__class(CommonZoneInfoUI,'ui.mobile.zone.inner.CommonZoneInfoUI',_super);
	var __proto=CommonZoneInfoUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/inner/CommonZoneInfo");
	}

	return CommonZoneInfoUI;
})(View)


//class ui.mobile.zone.inner.ZoneBossVipInfoUI extends laya.ui.View
var ZoneBossVipInfoUI=(function(_super){
	function ZoneBossVipInfoUI(){
		this.bg=null;
		this.descFont=null;
		this.btnExit=null;
		this.bar=null;
		this.timeTxt=null;
		this.tabs=null;
		this.btnZK=null;
		this.btnTeam=null;
		this.btnHide=null;
		ZoneBossVipInfoUI.__super.call(this);
	}

	__class(ZoneBossVipInfoUI,'ui.mobile.zone.inner.ZoneBossVipInfoUI',_super);
	var __proto=ZoneBossVipInfoUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/inner/ZoneBossVipInfo");
	}

	return ZoneBossVipInfoUI;
})(View)


//class ui.mobile.zone.result.RewardPanelUI extends laya.ui.View
var RewardPanelUI=(function(_super){
	function RewardPanelUI(){
		this.bg=null;
		this.owner_reward=null;
		this.bg_reward=null;
		this.boss_owner=null;
		this.bg_head=null;
		this.icon=null;
		this.p_panel=null;
		this.btn=null;
		this.ownerTxt=null;
		this.name_txt=null;
		RewardPanelUI.__super.call(this);
	}

	__class(RewardPanelUI,'ui.mobile.zone.result.RewardPanelUI',_super);
	var __proto=RewardPanelUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/result/RewardPanel");
	}

	return RewardPanelUI;
})(View)


//class ui.mobile.zone.tower.BaoshiTaInfoUI extends laya.ui.View
var BaoshiTaInfoUI=(function(_super){
	function BaoshiTaInfoUI(){
		this.bg=null;
		this.titleBox=null;
		this.mapTxt=null;
		this.txt_layer=null;
		this.txt_info=null;
		this.txt_desc=null;
		this.bossTimeTxt=null;
		this.bossLayerTxt=null;
		this.infoBox=null;
		this.pc_box=null;
		this.txt_freecount=null;
		this.txt_total=null;
		this.taskTxt=null;
		this.shouTTxt1=null;
		this.btnTask=null;
		this.btn_good=null;
		this.btn_low=null;
		this.img_shaizi0=null;
		this.img_shaizi1=null;
		this.txt_low_cost=null;
		this.btn_good_cost=null;
		this.mobi_box=null;
		this.shouTTxt2=null;
		this.mobi_yilingqu=null;
		this.txt_time=null;
		this.btnHide=null;
		this.btnExit=null;
		BaoshiTaInfoUI.__super.call(this);
	}

	__class(BaoshiTaInfoUI,'ui.mobile.zone.tower.BaoshiTaInfoUI',_super);
	var __proto=BaoshiTaInfoUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/tower/BaoshiTaInfo");
	}

	return BaoshiTaInfoUI;
})(View)


//class ui.mobile.zone.tower.ChuangtianguanZoneInfoUI extends laya.ui.View
var ChuangtianguanZoneInfoUI=(function(_super){
	function ChuangtianguanZoneInfoUI(){
		this.bg=null;
		this.titleBox=null;
		this.title=null;
		this.timeTxt=null;
		this.dunTxt=null;
		this.bossTxt=null;
		this.podunTxt=null;
		this.btnExit=null;
		this.btnNext=null;
		this.btnHide=null;
		this.adbox=null;
		this.adbg=null;
		this.btnGetSkill=null;
		ChuangtianguanZoneInfoUI.__super.call(this);
	}

	__class(ChuangtianguanZoneInfoUI,'ui.mobile.zone.tower.ChuangtianguanZoneInfoUI',_super);
	var __proto=ChuangtianguanZoneInfoUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/tower/ChuangtianguanZoneInfo");
	}

	return ChuangtianguanZoneInfoUI;
})(View)


//class ui.mobile.zone.tower.ShiliantaInfoUI extends laya.ui.View
var ShiliantaInfoUI=(function(_super){
	function ShiliantaInfoUI(){
		this.bg=null;
		this.titleBox=null;
		this.title=null;
		this.timeTxt=null;
		this.powerTxt=null;
		this.next_box=null;
		this.n_txt1=null;
		this.n_txt2=null;
		this.mijiBox=null;
		this.mj_txt1=null;
		this.mj_txt2=null;
		this.btnLink=null;
		this.btnExit=null;
		this.btnHide=null;
		ShiliantaInfoUI.__super.call(this);
	}

	__class(ShiliantaInfoUI,'ui.mobile.zone.tower.ShiliantaInfoUI',_super);
	var __proto=ShiliantaInfoUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("zxk.ZLinkButton",ZLinkButton);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/tower/ShiliantaInfo");
	}

	return ShiliantaInfoUI;
})(View)


//class ui.mobile.zone.tower.ZhenyaotaInfoUI extends laya.ui.View
var ZhenyaotaInfoUI=(function(_super){
	function ZhenyaotaInfoUI(){
		this.bg=null;
		this.titleBox=null;
		this.title=null;
		this.zuzhouTxt2=null;
		this.bossTxt=null;
		this.zuzhouTxt1=null;
		this.btnExit=null;
		this.btnNext=null;
		this.btnHide=null;
		ZhenyaotaInfoUI.__super.call(this);
	}

	__class(ZhenyaotaInfoUI,'ui.mobile.zone.tower.ZhenyaotaInfoUI',_super);
	var __proto=ZhenyaotaInfoUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/tower/ZhenyaotaInfo");
	}

	return ZhenyaotaInfoUI;
})(View)


//class ui.mobile.zone.tower.ZoneTowerPanelUI extends laya.ui.View
var ZoneTowerPanelUI=(function(_super){
	function ZoneTowerPanelUI(){
		this.window=null;
		this.title=null;
		this.bg=null;
		ZoneTowerPanelUI.__super.call(this);
	}

	__class(ZoneTowerPanelUI,'ui.mobile.zone.tower.ZoneTowerPanelUI',_super);
	var __proto=ZoneTowerPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.Window1UI",Window1UI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/tower/ZoneTowerPanel");
	}

	return ZoneTowerPanelUI;
})(View)


//class ui.mobile.zone.ZoneFailItemUI extends laya.ui.View
var ZoneFailItemUI=(function(_super){
	function ZoneFailItemUI(){
		this.bg=null;
		this.txt=null;
		this.btn=null;
		this.icon=null;
		ZoneFailItemUI.__super.call(this);
	}

	__class(ZoneFailItemUI,'ui.mobile.zone.ZoneFailItemUI',_super);
	var __proto=ZoneFailItemUI.prototype;
	__proto.createChildren=function(){
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/ZoneFailItem");
	}

	return ZoneFailItemUI;
})(View)


//class ui.mobile.zone.ZoneFailPanelUI extends laya.ui.View
var ZoneFailPanelUI=(function(_super){
	function ZoneFailPanelUI(){
		this.bg=null;
		this.closeBtn=null;
		this.l_list=null;
		this.timeTxt=null;
		ZoneFailPanelUI.__super.call(this);
	}

	__class(ZoneFailPanelUI,'ui.mobile.zone.ZoneFailPanelUI',_super);
	var __proto=ZoneFailPanelUI.prototype;
	__proto.createChildren=function(){
		View.regComponent("ui.mobile.zone.ZoneFailItemUI",ZoneFailItemUI);
		laya.ui.Component.prototype.createChildren.call(this);
		this.loadUI("mobile/zone/ZoneFailPanel");
	}

	return ZoneFailPanelUI;
})(View)



})(window,document,Laya);

if (typeof define === 'function' && define.amd){
	define('laya.core', ['require', "exports"], function(require, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        for (var i in Laya) {
			var o = Laya[i];
            o && o.__isclass && (exports[i] = o);
        }
    });
}