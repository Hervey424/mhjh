/**
*神炉技能
*@author zq
*创建时间：2023年10月24日 10:50:50
*/
//class com.modules.shenLu.ShenLuSkillPanel extends com.game.core.panel.BasePanel
var ShenLuSkillPanel=(function(_super){
	function ShenLuSkillPanel(){
		this._view=null;
		this._bean=null;
		this._q_open_demand=null;
		ShenLuSkillPanel.__super.call(this);
	}

	__class(ShenLuSkillPanel,'com.modules.shenLu.ShenLuSkillPanel',_super);
	var __proto=ShenLuSkillPanel.prototype;
	__proto.init=function(){
		this._view=new ShenLuSkillPanelUI();
		this.addChild(this._view);
	}

	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._view=null;
		_super.prototype.destroy.call(this);
	}

  __proto.show = function (data, tab) {
		(tab===void 0)&& (tab=-1);
    _super.prototype.show.call(this, data, tab);
		this.addEvent("SkillCenter.SKILL_PASS_ACTIVE",this.updateSkill);
		this._view.btn_up.on("click",this,this.onClick);
		this._view.bg.skin=ResPathUtil.getImageRes("bg",".png","common");
		this._view.bg2.skin=ResPathUtil.getImageRes("border",".png","common");
		Laya.stage.on("click",this,this.onStageClick);
	}

	__proto.hide=function(){
		_super.prototype.hide.call(this);
		EventMgr.removeAll(this);
		this._view.btn_up.off("click",this,this.onClick);
		this._view.bg.skin=null;
		this._view.bg2.skin=null;
		Laya.stage.off("click",this,this.onStageClick);
	}

	__proto.updatePanel=function(data,tab){
		(tab===void 0)&& (tab=-1);
		this.toPassive(data)
	}

	__proto.updateSkill=function(){
		this.toPassive(this._bean);
	}

	__proto.toPassive=function(bean){
		this.clear();
		var data=SkillCenter.getPassSkill(bean.q_skillid);
		if(data){
			bean=data.getDataBean();
		}
		this._bean=bean;
		this._view.name_txt.htmlText=bean.q_name+GameHTML.setColor(" Lv."+bean.q_skill_level,GameHTML.BLUE);
		this._view.des_txt.htmlText=bean.q_desc;
		this._view.state_txt.text="已激活";
		this._view.state_txt.color=GameHTML.GREEN;
		this._view.btn_up.label="升 级";
		if(bean.q_next_id > 0){
			var nextBean=App.dataMgr.q_passiveContainer.getDataBean(bean.q_next_id);
			if(nextBean){
				this.height=this._view.height=500;
				this._view.nextNode.visible=true;
				this._view.nextName_txt.htmlText=nextBean.q_name+GameHTML.setColor(" Lv."+nextBean.q_skill_level,GameHTML.BLUE);
				this._view.nextDes_txt.htmlText=nextBean.q_desc;
				this._view.nextState_txt.text="未激活";
				this._view.nextState_txt.color=GameHTML.RED;
				this._q_open_demand=nextBean.q_open_demand;
				if(nextBean.q_channel){
					this._view.need_txt.text=JSON.parse(nextBean.q_channel)[0].desc;
					if(SkillCenter.checkPassSkillActivateContidion(this._q_open_demand)){
						this._view.need_txt.color=GameHTML.GREEN;
						this._view.btn_up.showRedPoint(true);
					}
					else{
						this._view.need_txt.color=GameHTML.RED;
						this._view.btn_up.showRedPoint(false);
					}
				}
			}
		}
	}

	__proto.clear=function(){
		this.height=this._view.height=350;
		this._view.nextNode.visible=false;
		this._view.need_txt.text="";
		this._q_open_demand="";
	}

	__proto.onClick=function(e){
		if(this._bean==null)
			return;
		if(!SkillCenter.checkPassSkillActivateContidion(this._q_open_demand)){
			GameNotice.showMousePosMessage("未达成激活条件！");
			return;
		};
		var data=SkillCenter.getPassSkill(this._bean.q_skillid);
		if(data){
			SkillCommandSender.sendC2S_PassiveActivationMessage(this._bean.q_next_id);
		}
		else{
			SkillCommandSender.sendC2S_PassiveActivationMessage(this._bean.q_id);
		}
	}

	__proto.onStageClick=function(e){
		if(this.contains(e.target)){
			return;
		}
		if(TipMgr.contains(e)){
			return;
		}
		this.onClose();
	}

	return ShenLuSkillPanel;
})(BasePanel)