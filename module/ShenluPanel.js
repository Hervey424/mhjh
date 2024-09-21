var ShenLuPanel=(function(_super){
	function ShenLuPanel(){
		this._view=null;
		this._attr=null;
		this._nextAttr=null;
		this._cost_txt=null;
		this._need=null;
		this._balls={};
		this._max=10;
		this._star=-1;
		this._end=false;
		this._tabs=null;
		this._type=0;
		this._effect=null;
		this._taskFinish=false;
		this._skillGrid=null;
		this._data=null;
		ShenLuPanel.__super.call(this);
	}

	__class(ShenLuPanel,'com.modules.shenLu.ShenLuPanel',_super);
	var __proto=ShenLuPanel.prototype;
	__proto.init=function(){
		this._view=new ShenLuViewUI();
		this.addChild(this._view);
		this._attr=new AttrTextField();
		this._attr.move(660,115,this);
		this._nextAttr=new AttrTextField();
		this._nextAttr.move(660,295,this);
		this._cost_txt=new ItemCostLabel(18);
		this._cost_txt.move(-50,-26,this._view.upgradeNode);
		this._skillGrid=new SkillBaseGrid("grid_62_1",EnumImageType.SKILL_56,66);
		this._skillGrid.move(8,8,this._view.skillNode,1);
		this._tabs=ComponentUtil.createPanelTab(ShenLuCenter.getTypeNames(),this);
	}

	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		if(this._balls){
			for (var key in this._balls){
				var ball=this._balls[key]
				if(ball){
					ball.dispose();
				}
			}
			this._balls=null;
		}
		this._tabs=null;
		this._view=null;
		this._data=null;
		this._effect=null;
		this._tabs=null;
		this._attr=null;
		this._nextAttr=null;
		this._cost_txt=null;
		this._need=null;
		_super.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		_super.prototype.show.call(this,data,tab);
		this.addEvent("ShenLuCenter.ACTIVE",this.updateShenLu);
		this.addEvent("ShenLuCenter.UP",this.updateShenLu);
		this.addEvent("ShenLuCenter.STAR",this.updateShenLu);
		this.addEvent("Bag.CHANGE",this.onItemChange);
		this.addEvent("PE.LEVEL_UP",this.onItemChange);
		this.addEvent("ET.FUNCTION_TIP",this.onFunctionTip);
		this.addEvent("SkillCenter.SKILL_PASS_ACTIVE",this.updateSkill);
		this._view.btn_up.on("click",this,this.onClick);
		this._view.btn_way.on("click",this,this.onClick);
		this._view.skillNode.on("click",this,this.onClick);
		this._tabs.on("change",this,this.onTab);
		this.adjustTab();
		this._view.bg.url=ResPathUtil.getImageRes("bg_sl",".jpg","shenlu");
		this.tabPoint();
	}

	__proto.onFunctionTip=function(funcId,bool){
		(bool===void 0)&& (bool=false);
		if(funcId==51){
			this.tabPoint();
		}
	}

	__proto.hide=function(){
		_super.prototype.hide.call(this);
		EventMgr.removeAll(this);
		this._view.btn_up.off("click",this,this.onClick);
		this._view.btn_way.off("click",this,this.onClick);
		this._view.skillNode.off("click",this,this.onClick);
		this._tabs.off("change",this,this.onTab);
		this._tabs.selectedIndex=-1;
		this._view.btn_up.showRedPoint(false);
	}

	__proto.updatePanel=function(data,tab){
		(tab===void 0)&& (tab=-1);
		if(tab < 0){
			for(var i=0;i < this._tabs.items.length;i++){
				if(ShenLuCenter.getData(ShenLuCenter.SHENLU_TYPES[i]).getPoint()){
					tab=i;
					break ;
				}
			}
		}
		this._tabs.selectedIndex=tab < 0 ? 0 :tab;
	}

	__proto.onTab=function(e){
		this._type=ShenLuCenter.SHENLU_TYPES[this._tabs.selectedIndex];
		if(this._type <=0){
			return;
		}
		this._star=-1;
		this.updateShenLu(this._type);
	}

	__proto.updateShenLu=function(type){
		if(ShenLuCenter.SHENLU_TYPES.indexOf(type)==-1)
			return;
		var data=ShenLuCenter.getData(type);
		this._data=data;
		var star=data.star;
		this._view.upgradeNode.visible=true;
		FilterUtil.clear(this._view.avatarNode);
		var bean=data.bean;
		if(!bean)
			return;
		if(data.needLv > 0){
			this._view.need_txt.visible=true;
		}
		else{
			this._view.need_txt.visible=false;
		}
		this._max=bean.q_max_layer;
		if(!data.activate){
			this._attr.showCurrentByJson_v2(bean.q_add_attribute1,bean.q_layer_attr,star);
			this._nextAttr.showCurrentByJson_v2(bean.q_add_attribute1,bean.q_layer_attr,1,false);
		}
		else{
			this._attr.showCurrentByJson_v2(bean.q_add_attribute1,bean.q_layer_attr,star);
			if(star < this._max){
				this._nextAttr.showCurrentByJson_v2(bean.q_add_attribute1,bean.q_layer_attr,star+1,false);
			}
			else if(bean.q_next_id > 0){
				var next=App.dataMgr.q_xuemaiContainer.getDataBean(bean.q_next_id);
				this._nextAttr.showCurrentByJson_v2(next.q_add_attribute1,next.q_layer_attr,1);
			}
			else{
				this._nextAttr.showCurrentByJson_v2(bean.q_add_attribute1,bean.q_layer_attr,star);
			}
		};
		var attrs=["药品效果","受怪减伤","对怪增伤","切割伤害","暴击附加伤害"];
		var key=attrs[type-1];
		if(bean.q_open_limit){
			this._need=ItemInfo.convert(bean.q_open_limit)[0];
		}
		else if(bean.q_cost){
			this._need=ItemInfo.convert(bean.q_cost)[0];
		}
		else{
			this._need=null;
		}
		this._end=bean.q_next_id==0 && star==this._max;
		this._view.btn_up.label=star !=this._max ? "升 级" :"突 破";
		this.onItemChange();
		this.showLv(bean.q_quality,star);
		this.showAvatar();
		this.updateSkill();
	}

	__proto.updateSkill=function(){
		var beans=App.dataMgr.q_xuemaiContainer.getPassiveSkillByType(this._type);
		if(beans && beans.length > 0){
			var bean=beans[0];
			this._skillGrid.setPassiveId(bean.q_passive,-1,true,false,true);
			if(this._skillGrid.passiveBean){
				this._view.imgSkillOpen.visible=!this._skillGrid.isActive;
				this._view.skillName_txt.text=this._skillGrid.passiveBean.q_name;
				this._view.skill_txt.htmlText=this._skillGrid.passiveBean.q_desc;
			}
		}
		this._view.skillNode.showRedPoint(this._data.skillPoint1);
	}

	__proto.onItemChange=function(__args){
		var args=arguments;
		if(this._need){
			this._cost_txt.show(this._need.id,this._need.num,ResPathUtil.getIcon(ItemUtil.getIcon(this._need.id),EnumImageType.ITEM_40),0,true,2,20,false,"消耗：","#eadabc");
			this._view.btn_up.showRedPoint(this._cost_txt.itemEnough && !this._end && App.role.allLevel >=this._data.needLv);
			this._view.need_txt.htmlText="升星需求："+GameHTML.setColor("人物等级达到","#cdcdce")+GameHTML.setColor(this._data.needLv+"级",App.role.allLevel >=this._data.needLv ? GameHTML.GREEN :GameHTML.RED);
		}
		this._cost_txt.visible=!this._end;
		this._view.btn_way.visible=!this._end;
		this._view.btn_up.visible=!this._end;
		this._view.imgMax.visible=this._end;
	}

	__proto.showLv=function(lv,star){
		var newStar=-1;
		if(this._star !=-1 && this._star !=star){
			newStar=star;
		}
		this._star=star;
		var hundred=(lv-1)/ 10 >> 0;
		var ten=lv % 10;
		if(ten==0){
			ten=10;
		}
		this._view.name_txt.text=ShenLuCenter.getName(this._type)+"·"+lv+"阶";
		this.hideBall();
		for (var i=0;i < this._max;i++){
			var ball=this._view["ball"+i];
			if(ball){
				if(star > i){
					this.showBall(i,ball);
					if(newStar==i+1){
						CPlayOnceEffect.play(ResPathUtil.getPanelEffect("activate","main/vipzone"),ball,ball.width / 2,ball.height / 2);
						App.sound.playSound("newstar");
					}
				}
			}
		}
	}

	__proto.showBall=function(index,b){
		var ball=this._balls[index];
		if(ball==null){
			ball=GameEffect.getEffect();
			this._balls[index]=ball;
		}
		ball.url=ResPathUtil.getPanelEffect(this._type+"_"+1,"shenlu");
		ball.move(21,21,b);
		ball.play();
	}

	__proto.hideBall=function(){
		for (var i=0;i < this._max;i++){
			var ball=this._balls[i];
			if(ball){
				ball.stopAndHide();
				ball.removeSelf();
			}
		}
	}

	__proto.showAvatar=function(){
		if(!this._effect){
			this._effect=GameEffect.getEffect();
			this._effect.move(20,20,this._view.avatarNode);
		}
		this._effect.url=ResPathUtil.getPanelEffect(this._type+"","shenlu");
		this._effect.restart();
	}

	__proto.adjustTab=function(){
		for(var i=0;i < ShenLuCenter.SHENLU_TYPES.length;i++){
			this._tabs.setItemVisibleByIndex(i,FunctionManager.isFunctionOpen(ShenLuCenter.getFuncIdByType(ShenLuCenter.SHENLU_TYPES[i])));
		}
	}

	__proto.tabPoint=function(){
		for(var i=0;i < ShenLuCenter.SHENLU_TYPES.length;i++){
			this._tabs.showRedPointByIndex(i,ShenLuCenter.getData(ShenLuCenter.SHENLU_TYPES[i]).getPoint());
		}
	}

	__proto.onClick=function(e){
		switch(e.currentTarget){
			case this._view.btn_up:{
					if(!this._cost_txt.itemEnough){
						GameNotice.showMousePosMessage(ItemUtil.getItemName(this._cost_txt.itemId)+"不足");
						return;
					}
					if(App.role.allLevel < this._data.needLv){
						GameNotice.showMousePosMessage("升级所需等级不足!");
						return;
					}
					ShenLuCenter.sendC2S_BloodActiveMessage(this._type,2);
					break ;
				}
			case this._view.btn_way:{
					if(this._need){
						PanelOpenManager.openGetway(this._need.id,e.currentTarget);
					}
					break ;
				}
			case this._view.skillNode:{
					e.stopImmediatePropagation();
					PanelManager.openByClass(ShenLuSkillPanel,this._skillGrid.passiveBean);
					break ;
				}
			}
	}

	__proto.getHideFlyToTarget=function(){
		return EnumPanelHideFlyToTarget.SHEN_LU;
	}

	return ShenLuPanel;
})(BasePanel)