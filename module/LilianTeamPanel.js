/**
*历练队伍
*@author Jian
*创建时间：2024-8-6
*/
//class com.modules.lilian.LilianTeamPanel extends com.game.core.panel.BasePanel
var LilianTeamPanel=(function(_super){
	function LilianTeamPanel(){
		this._view=null;
		this._uiAvas=null;
		this._pds=null;
		LilianTeamPanel.__super.call(this);
	}

	__class(LilianTeamPanel,'com.modules.lilian.LilianTeamPanel',_super);
	var __proto=LilianTeamPanel.prototype;
	__proto.isESC=function(){return false;}
	__proto.init=function(){
		this._view=new LilianTeamPanelUI();
		this.addChild(this._view);
		this._uiAvas=[];
	}

	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._uiAvas=null;
		this._view=null;
		_super.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		_super.prototype.show.call(this);
		this._view.jianyin0.skin=ResPathUtil.getImageRes("jianyin",".png","lilian");
		this._view.duizhang.skin=ResPathUtil.getImageRes("duizhang",".png","lilian");
		this._view.l_btn.skin=ResPathUtil.getImageRes("btn_5",".png","lilian");
		this._view.r_btn.skin=ResPathUtil.getImageRes("btn_6",".png","lilian");
		this._view.title.skin=ResPathUtil.getImageRes("title2",".png","lilian");
		this._view.bg.skin=ResPathUtil.getImageRes("bg1",".jpg","lilian");
		this._view.jianyin1.skin=this._view.jianyin0.skin;
		this._view.jianyin2.skin=this._view.jianyin0.skin;
		this._view.btnAction.on("click",this,this.onClick);
		this._view.btnStart.on("click",this,this.onClick);
		this._view.jianyin0.on("click",this,this.onClick);
		this._view.jianyin1.on("click",this,this.onClick);
		this._view.jianyin2.on("click",this,this.onClick);
		this._view.l_btn.on("click",this,this.onClick);
		this._view.r_btn.on("click",this,this.onClick);
		this.addEvent("TEAMEvent.TEAM",this.update);
		PanelManager.closeByClass(TeamYaoqingPanel);
		if(TeamCenter.hasTeam(3)){
			this.update();
		}
		else{
			TeamCommandSender.sendC2S_CreateTeamMessage(3);
		}
	}

	__proto.hide=function(){
		_super.prototype.hide.call(this);
		this.clearTimer(this,this.onTimer);
		PanelManager.closeByClass(TeamYaoqingPanel);
		EventMgr.remove(this,"TEAMEvent.TEAM",this.update);
		this._view.btnAction.off("click",this,this.onClick);
		this._view.btnStart.off("click",this,this.onClick);
		this._view.jianyin0.off("click",this,this.onClick);
		this._view.jianyin1.off("click",this,this.onClick);
		this._view.jianyin2.off("click",this,this.onClick);
		this._view.l_btn.off("click",this,this.onClick);
		this._view.r_btn.off("click",this,this.onClick);
		this._view.duizhang.skin=null;
		this._view.jianyin0.skin=null;
		this._view.jianyin1.skin=null;
		this._view.jianyin2.skin=null;
		this._view.l_btn.skin=null;
		this._view.r_btn.skin=null;
		this._view.title.skin=null;
		this._view.bg.skin=null;
		this._pds=null;
	}

	__proto.update=function(type,teamType){
		(type===void 0)&& (type=0);
		(teamType===void 0)&& (teamType=3);
		if(type==0 && teamType==3){
			var team=TeamCenter.getTeamData(teamType);
			var ava,yin,info;
			for(var i=0;i < 3;i++){
				yin=this._view["jianyin"+i];
				yin.visible=!team.memberList[i];
				this._view["nameBox"+i].visible=!yin.visible;
				ava=this._uiAvas[i];
				if(yin.visible){
					if(ava)ava.stopAndHide();
				}
				else{
					if(!ava){
						ava=new UIPlayer();
						ava.scaleXY=0.8;
						ava.move(yin.x+135,yin.y+130,this._view.bg,0);
						this._uiAvas[i]=ava;
					}
					info=team.memberList[i];
					ava.update(info.clothId,info.weaponId,0,info.playerSex,info.playerJob,info.clothId,info.weaponId);
					this._view["nameTxt"+i].text=info.playerName;
				}
			}
			this._view.btnStart.visible=TaskModel.lilianTask && TaskModel.lilianTask.lilian_type==4 && team.captainId==App.role.personId;
			this._view.btnAction.label=team.captainId==App.role.personId ? "解散队伍" :"退出队伍";
			this._view.btnAction.x=this._view.btnStart.visible ? 360 :460;
			this._view.timeBox.visible=TeamCenter.team_type3_time > 0;
			if(TeamCenter.team_type3_time > 0){
				this.timerLoop(1000,this,this.onTimer);
				this.onTimer();
			}
		}
	}

	__proto.onClick=function(e){
		switch(e.currentTarget){
			case this._view.l_btn:
				PanelManager.openPanel(PanelRegister.LILIAN_SET);
				break ;
			case this._view.r_btn:
				this._pds=["跨服频道","本服频道"];
				if(GuildCenter.hasGuild()){
					this._pds.push("行会频道");
				}
				MenuList.show(this._pds,GameHandler.create(this,this.onMenu));
				break ;
			case this._view.jianyin0:case this._view.jianyin1:case this._view.jianyin2:
				PanelManager.openByClass(TeamYaoqingPanel,3);
				break ;
			case this._view.btnStart:
				ZoneCommandSender.enterZoneMap(TaskModel.lilianTask.getConditionData().zoneId);
				TeamCenter.team_type3_time=0;
				this.onClose();
				break ;
			case this._view.btnAction:
				if(TeamCenter.hasTeam(3)){
					TeamCommandSender.sendC2S_QuitTeamMessage(3);
				}
				else{
					TeamCommandSender.sendC2S_CreateTeamMessage(3);
				}
				TeamCenter.team_type3_time=0;
				this.onClose();
				break ;
			}
	}

	__proto.onMenu=function(value){
		var types=[5,4,7];
		ChatCenter.sendChat(types[this._pds.indexOf(value)],"~lilian_invite~",'',false,null,"LilianTeamPanel");
	}

	__proto.onTimer=function(){
		if(TeamCenter.team_type3_time > 0){
			TeamCenter.team_type3_time--;
			this._view.timeTxt.text=TeamCenter.team_type3_time+"秒后开始挑战副本";
		}
		else if(this._view.btnStart.visible){
			Event.EMPTY.setTo("click",this._view.btnStart,this._view.btnStart);
			this.onClick(Event.EMPTY);
		}
	}

	__proto.onClose=function(e){
		if(TeamCenter.team_type3_time > 0){
			return;
		}
		_super.prototype.onClose.call(this);
	}

	return LilianTeamPanel;
})(BasePanel)