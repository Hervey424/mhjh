var MainMenu=(function(_super){
	function MainMenu(){
		this._menus=null;
		this._hpTip=null;
		this._hpMask=null;
		this._hpEffect=null;
		this._hpLineEffect=null;
		this._ngTip=null;
		this._ngMask=null;
		this._ngEffect=null;
		this._ngLineEffect=null;
		this._guide=null;
		this._g_id=0;
		MainMenu.__super.call(this);
		this.gm_btn.visible=false;
		this.log_btn.visible=false;
		this.mobi_btn.visible=false;
		this.debug_btn.visible=false;
		this.return_btn.visible=false;
		EventMgr.add(this,"ET.SHOW_GM",this.onShowGM);
		this.bg.skin=ResPathUtil.getImageRes("bg_menu",".png","main/menu");
		this.hp_box.mouseThrough=false;
		this._hpTip=new TipData("TEXT");
		TipMgr.addTip(this.hp_box,this._hpTip);
		this._ngTip=new TipData("TEXT");
		TipMgr.addTip(this.ng_box,this._ngTip);
		TipMgr.addTip(this.role_btn,new TipData("TEXT",this.getTip("角色","C")));
		TipMgr.addTip(this.bag_btn,new TipData("TEXT",this.getTip("背包","B")));
		TipMgr.addTip(this.guild_btn,new TipData("TEXT",this.getTip("行会","G")));
		TipMgr.addTip(this.pk_btn,new TipData("TEXT",this.getTip("切换攻击模式","H")));
		TipMgr.addTip(this.hook_btn,new TipData("TEXT",this.getTip("挂机","Z")+"\nX打开挂机设置"));
		TipMgr.addTip(this.exp_txt,new TipData("STRING","1"));
		this._hpMask=new BaseMaskShape();
		this._hpMask.drawRect2(0,0,this.hp_box.width,this.hp_box.height);
		this._hpEffect=GameEffect.getEffect();
		this._hpEffect.url=ResPathUtil.getPanelEffect("hpBall100","main/menu");
		this._hpEffect.move(this.hp_box.width >> 1,55,this.hp_box);
		this._hpEffect.play();
		this.hp_box.mask=this._hpMask;
		var lineMask=new Sprite();
		lineMask.loadImage("mobile/main/mask_hp.png");
		this._hpLineEffect=GameEffect.getEffect();
		this._hpLineEffect.url=ResPathUtil.getPanelEffect("hpLine","main/menu");
		this._hpLineEffect.move(this.hpline_box.width-10,0,this.hpline_box);
		this._hpLineEffect.play();
		this.hpline_box.mask=lineMask;
		this._ngMask=new BaseMaskShape();
		this._ngMask.drawRect2(0,0,this.ng_box.width,this.ng_box.height);
		this._ngEffect=GameEffect.getEffect();
		this._ngEffect.url=ResPathUtil.getPanelEffect("ngBall100","main/menu");
		this._ngEffect.move(this.ng_box.width >> 1,55,this.ng_box);
		this._ngEffect.play();
		this.ng_box.mask=this._ngMask;
		var lineMask2=new Sprite();
		lineMask2.loadImage("mobile/main/mask_ng.png");
		this._ngLineEffect=GameEffect.getEffect();
		this._ngLineEffect.url=ResPathUtil.getPanelEffect("ngLine","main/menu");
		this._ngLineEffect.move(this.ngline_box.width-60,0,this.ngline_box);
		this._ngLineEffect.play();
		this.ngline_box.mask=lineMask2;
		this._menus=[];
		var m_btn,funIds=[3,101,51,50,287,239,201,188,22,20,95];
		for(var i=0;i < funIds.length;i++){
			m_btn=new Button("mobile/main/btn_main.png");
			m_btn.setRedPointStyle(Button.RED_TYPE1);
			m_btn.on("click",this,this.onClick);
			m_btn.move(0,116,this);
			m_btn.labelFont="syht";
			m_btn.labelSize=16;
			m_btn.labelStroke=1;
			m_btn.stateNum=1;
			m_btn.tag=funIds[i];
			this._menus.push(m_btn);
			switch(funIds[i]){
				case 3:
					m_btn.label="技能";
					TipMgr.addTip(m_btn,new TipData("TEXT",this.getTip("技能","V")));
					break ;
				case 50:m_btn.label="坐骑";break ;
				case 101:m_btn.label="龙魂";break ;
				case 287:m_btn.label="军衔";break ;
				case 51:m_btn.label="神炉";break ;
				case 188:m_btn.label="装扮";break ;
				case 22:m_btn.label="锻造";break ;
				case 20:m_btn.label="合成";break ;
				case 239:m_btn.label="古宝";break ;
				case 95:m_btn.label="摆摊";break ;
				case 201:
					m_btn.label="飞升";
					m_btn.showRedPoint(FeiShengCenter.red_add);
					break ;
				}
		}
		EventMgr.add(this,"ET.FUNCTION",this.onFunction);
		EventMgr.add(this,"ET.FUNCTION_TIP",this.onFunctionTip);
		EventMgr.add(this,"ET.FUNCTION_OPEN",this.onFunctionOpen);
		EventMgr.add(this,"ET.AFC",this.onAutoChange);
		this.hook_btn.on("click",this,this.onClick);
		this.role_btn.on("click",this,this.onClick);
		this.bag_btn.on("click",this,this.onClick);
		this.team_btn.on("click",this,this.onClick);
		this.friend_btn.on("click",this,this.onClick);
		this.guild_btn.on("click",this,this.onClick);
		this.ride_btn.on("click",this,this.onClick);
	}

	__class(MainMenu,'com.modules.main.view.MainMenu',_super);
	var __proto=MainMenu.prototype;
	// Laya.workerTimer.loop(1000,this,onTimer);
	__proto.switchMain=function(){
		var m_btn;
		for(var $each_m_btn in this._menus){
			m_btn=this._menus[$each_m_btn];
			switch(m_btn.tag){
				case 3:
					EnumPanelHideFlyToTarget.SKILL=m_btn;
					break ;
				case 50:
					EnumPanelHideFlyToTarget.ZUOQI=m_btn;
					break ;
				case 101:
					EnumPanelHideFlyToTarget.LONGHUN=m_btn;
					break ;
				case 287:
					EnumPanelHideFlyToTarget.JUNXIAN=m_btn;
					break ;
				case 201:
					EnumPanelHideFlyToTarget.FEISHENG=m_btn;
					break ;
				case 181:
					EnumPanelHideFlyToTarget.SHEN_YU=m_btn;
					break ;
				case 51:
					EnumPanelHideFlyToTarget.SHEN_LU=m_btn;
					break ;
				case 188:
					EnumPanelHideFlyToTarget.HUAXING=m_btn;
					break ;
				case 306:
					EnumPanelHideFlyToTarget.TEJIE=m_btn;
					break ;
				case 22:
					EnumPanelHideFlyToTarget.DUANZAO=m_btn;
					break ;
				case 20:
					EnumPanelHideFlyToTarget.HECHENG=m_btn;
					break ;
				case 95:
					EnumPanelHideFlyToTarget.BAITAN=m_btn;
					break ;
				}
		}
		EnumPanelHideFlyToTarget.ROLE=this.role_btn;
		EnumPanelHideFlyToTarget.GUILD=this.guild_btn;
		EnumPanelHideFlyToTarget.BAG=this.bag_btn;
		EnumPanelHideFlyToTarget.FRIEND=this.friend_btn;
		EnumPanelHideFlyToTarget.TEAM=this.team_btn;
	}

	__proto.setSimpleMode=function(bool){}
	// }
	__proto.onShowGM=function(){
		EventMgr.remove(this,"ET.SHOW_GM",this.onShowGM);
		this.gm_btn.visible=true;
		this.log_btn.visible=true;
		this.debug_btn.visible=true;
		this.return_btn.visible=true;
		this.mobi_btn.visible=!GameConfig.isRelease;
		this.gm_btn.on("click",this,this.onClick);
		this.log_btn.on("click",this,this.onClick);
		this.mobi_btn.on("click",this,this.onClick);
		this.debug_btn.on("click",this,this.onClick);
		this.return_btn.on("click",this,this.onClick);
	}

	// }
	__proto.onClick=function(e){
		if(e.currentTarget.tag > 0){
			App.menuProxy.clickOpen(e.currentTarget.tag);
		}
		else{
			switch(e.currentTarget){
				case this.role_btn:
					PanelOpenManager.openRole(null,-1,true);
					break ;
				case this.bag_btn:
					PanelOpenManager.openBag(null,-1,true);
					this.onGuide(3);
					break ;
				case this.team_btn:
					PanelOpenManager.openTeam(null,-1,true);
					break ;
				case this.friend_btn:
					PanelOpenManager.openMail(null,0,true);
					break ;
				case this.guild_btn:
					PanelOpenManager.openGuild(null,-1,true);
					break ;
				case this.ride_btn:
					ZuoQiCenter.sendShowOrHide(!ZuoQiCenter.isRiding,true);
					break ;
				case this.hook_btn:
					App.switchAutoFight();
					break ;
				case this.gm_btn:
					PanelOpenManager.openGM();
					break ;
				case this.log_btn:
					PanelOpenManager.openLog();
					break ;
				case this.return_btn:
					App.returnCity();
					break ;
				case this.debug_btn:
					GameConfig.isDebug=!GameConfig.isDebug;
					EventMgr.dispatch("ET.debug_mode_change");
					break ;
				case this.mobi_btn:
					EventMgr.dispatch("switch_main");
					break ;
				}
		}
	}

	__proto.getTip=function(desc,word){
		return "<font color='#B79F79'>"+desc+"</font><font color='#00ff00'>  "+word+"</font>";
	}

	__proto.onFunction=function(){
		EventMgr.remove(this,"ET.FUNCTION",this.onFunction);
		this.role_btn.disabled=FunctionManager.isFunctionOpen(1)? false :true;
		this.bag_btn.disabled=FunctionManager.isFunctionOpen(2)? false :true;
		this.team_btn.disabled=FunctionManager.isFunctionOpen(10)? false :true;
		this.friend_btn.disabled=FunctionManager.isFunctionOpen(9)? false :true;
		this.guild_btn.disabled=FunctionManager.isFunctionOpen(8)? false :true;
		var px=188;
		for(var i=0;i < this._menus.length;i++){
			this._menus[i].visible=FunctionManager.isFunctionOpen(this._menus[i].tag);
			if(this._menus[i].visible){
				this._menus[i].x=px;
				px+=50;
			}
		}
	}

	__proto.onFunctionOpen=function(id){
		if(id==1){
			this.role_btn.disabled=FunctionManager.isFunctionOpen(id)? false :true;
		}
		else if(id==2){
			this.bag_btn.disabled=FunctionManager.isFunctionOpen(id)? false :true;
		}
		else if(id==10){
			this.team_btn.disabled=FunctionManager.isFunctionOpen(id)? false :true;
		}
		else if(id==9){
			this.friend_btn.disabled=FunctionManager.isFunctionOpen(id)? false :true;
		}
		else if(id==8){
			this.guild_btn.disabled=FunctionManager.isFunctionOpen(id)? false :true;
		}
		else{
			var px=188;
			for(var i=0;i < this._menus.length;i++){
				if(this._menus[i].tag==id){
					this._menus[i].visible=FunctionManager.isFunctionOpen(this._menus[i].tag);
				}
				if(this._menus[i].visible){
					this._menus[i].x=px;
					px+=50;
				}
			}
		}
	}

	__proto.onFunctionTip=function(id,flag){
		if(id==8){
			this.guild_point.visible=flag;
		}
		else{
			var m_btn;
			for(var $each_m_btn in this._menus){
				m_btn=this._menus[$each_m_btn];
				if(m_btn.visible && m_btn.tag==id){
					m_btn.showRedPoint(flag);
					break ;
				}
			}
		}
	}

	__proto.onAutoChange=function(isAuto){
		this.hook_btn.skin="mobile/main/btn_hook"+(isAuto ? 2 :1)+".png";
		isAuto ? this.hook_btn.showFlowEffect("main_auto",0,0,"main"):this.hook_btn.hideFlowEffect();
		App.shortcutBar.onAutoStateChange(isAuto);
	}

	__proto.updateHp=function(){
		this._hpTip.data="当前生命值："+App.role.hp+"\n"+"最大生命值："+App.role.maxHp;
		var ratio=App.role.hp / App.role.maxHp;
		if(ratio > 1){
			ratio=1;
		};
		var posi=this.hp_box.height *(1-ratio);
		if(this._hpMask.y !=posi){
			TweenLite.to(this._hpMask,0.5,{y:posi});
		}
		if(this._hpLineEffect){
			this._hpLineEffect.visible=ratio < 1 && ratio !=0;
			if(this._hpLineEffect.y !=posi){
				TweenLite.to(this._hpLineEffect,0.5,{y:posi});
			}
		}
	}

	__proto.updateNg=function(){
		this._ngTip.data="当前内力："+App.role.ng+"\n"+"最大内力："+App.role.maxNg;
		var ratio=1;
		if(App.role.maxNg > 0){
			ratio=App.role.ng / App.role.maxNg;
			if(ratio > 1){
				ratio=1;
			}
		};
		var posi=this.ng_box.height *(1-ratio);
		if(this._ngMask.y !=posi){
			TweenLite.to(this._ngMask,0.5,{y:posi});
		}
		if(this._ngLineEffect){
			this._ngLineEffect.visible=ratio < 1 && ratio !=0;
			if(this._ngLineEffect.y !=posi){
				TweenLite.to(this._ngLineEffect,0.5,{y:posi});
			}
		}
	}

	__proto.getBtnByFunId=function(funId){
		var m_btn;
		for(var $each_m_btn in this._menus){
			m_btn=this._menus[$each_m_btn];
			if(m_btn.tag==funId){
				return m_btn;
			}
		}
		return null;
	}

	__proto.onGuide=function(id,bool){
		(bool===void 0)&& (bool=false);
		if(bool){
			var g_btn;
			switch(id){
				case 3:
					g_btn=this.bag_btn;
					break ;
				case 15:
					g_btn=this.role_btn;
					break ;
				case 10:
					g_btn=this.pet_head;
					break ;
				case 28:
					g_btn=this.getBtnByFunId(101);
					break ;
				}
			if(g_btn){
				this._g_id=id;
				if(!this._guide){
					this._guide=Guide.getGuide();
				}
				this._guide.showEffect2(g_btn,this);
			}
		}
		else if(id==this._g_id && this._guide){
			this._guide.hide();
			this._guide=null;
			this._g_id=0;
		}
	}

	__proto.resize=function(){
		this.pos(Laya.stage.width-this.width >> 1,Laya.stage.height-this.height-GameConfig.TX_BOTTOM_INFO_HEIGHT);
	}

	__getset(0,__proto,'bagFullBox',function(){return this.full_box;});
	return MainMenu;
})(MainMenuUI)