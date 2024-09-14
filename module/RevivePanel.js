var RevivePanel=(function(_super){
	function RevivePanel(){
		this._view=null;
		this._c_tip=null;
		this._rev_type=0;
		this._l_time=0;
		this._r_time=0;
		this._cishu=0;
		this._l_str=null;
		this._r_str=null;
		this._map=null;
		this._cost=null;
		RevivePanel.__super.call(this);
	}

	__class(RevivePanel,'com.modules.main.RevivePanel',_super);
	var __proto=RevivePanel.prototype;
	__proto.isESC=function(){return false;}
	__proto.isAddMask=function(){return false;}
	__proto.isAddMoneyBar=function(){return App.role.mapId !=10019 && App.role.mapId !=10005;}
	__proto.init=function(){
		this._view=new RevivePanelUI();
		this.addChild(this._view);
		this._c_tip=new TipData("ITEM");
		TipMgr.addTip(this._view.c_icon,this._c_tip);
	}

	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		TipMgr.removeTip(this._view.c_icon);
		this._c_tip=null;
		this._view=null;
		this._map=null;
		_super.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=0);
		_super.prototype.show.call(this,data,tab);
		this._view.l_btn.on("click",this,this.onClick);
		this._view.r_btn.on("click",this,this.onClick);
	}

	__proto.hide=function(){
		_super.prototype.hide.call(this);
		App.stageLayer.isLife=true;
		Laya.workerTimer.clear(this,this.onTimer);
		this._view.l_btn.off("click",this,this.onClick);
		this._view.r_btn.off("click",this,this.onClick);
		this._l_time=0;
		this._r_time=0;
		this._cishu=0;
		this._cost=null;
		this._map=null;
	}

	__proto.updatePanel=function(data,tab){
		(tab===void 0)&& (tab=-1);
		var cmd=data;
		var str;
		if(!cmd.attackername && cmd.monstermodelid !=0){
			var arenaFightData=ArenaCenter.data;
			if(arenaFightData && arenaFightData.type==1 && cmd.personId.toString()==arenaFightData.personId){
				str="你被"+GameHTML.setColor(arenaFightData.getName(),"#ef0605");
			}
			else{
				str="你被 "+GameHTML.setColor(BossDataCenter.instance.getBossName(cmd.monstermodelid),"#ef0605")+" 击败了";
			}
		}
		else{
			str="你被 "+GameHTML.setColor(cmd.attackername,"#ef0605")+" 击败了";
		}
		this._view.name_txt.y=70;
		this._view.name_txt.text=str;
		this._map=App.role.mapBean;
		this._rev_type=this._map.q_revive_type;
		this._view.c_txt.visible=false;
		this._view.l_box.visible=false;
		this._view.r_box.visible=false;
		this._view.l_btn.disabled=false;
		this._view.r_btn.disabled=false;
		this._view.freeTxt.visible=false;
		this._view.l_timeTxt.color="#00ff00";
		this._view.l_timeTxt.text='';
		this._view.r_timeTxt.text='';
		this._view.r_timeTxt.y=0;
		this._view.r_box.x=230;
		this._view.l_box.x=38;
		this._l_time=0;
		this._r_time=0;
		this._l_str='';
		this._r_str='';
		App.stageLayer.isLife=this._map.q_die_ui > 0;
		if(this._rev_type==1){
			this._l_time=cmd.time-ServerTime.getServerTime();
			this._view.l_box.visible=true;
			this._view.l_box.x=this.width-this._view.l_box.width >> 1;
			this._view.l_btn.label=this._map.q_die_back==2 ? "回城复活" :"复活点复活";
			this._l_str="后"+this._view.l_btn.label;
		}
		else if(this._rev_type==3 || this._rev_type==6 || this._rev_type==34 || this._rev_type==130){
			this._l_time=this._map.q_auto_revive_daily / 1000 >> 0;
			this._view.l_box.visible=true;
			this._view.r_box.visible=true;
			if(this._map.q_revive_consume){
				if(cmd.dieCount > 0){
					this._cishu=cmd.dieCount;
					this._view.freeTxt.visible=true;
					this._view.freeTxt.text="剩余免费次数："+GameHTML.setColor(cmd.dieCount,"#00ff00");
				}
				else{
					this.showItem();
				}
			}
			if(this._rev_type==3){
				this._view.r_btn.label="原地复活";
				this._view.l_btn.label=this._map.q_die_back==2 ? "回城复活" :"复活点复活";
				this._l_str="后"+this._view.l_btn.label;
			}
			else if(this._rev_type==6){
				this._r_time=this._l_time;
				this._r_str="后当前地图复活";
				this._view.l_box.visible=false;
				this._view.r_box.x=this.width-this._view.r_box.width >> 1;
				this._view.r_btn.label="立即复活";
			}
			else if(this._rev_type==34){
				this._view.l_btn.label="阵营点复活";
				this._view.r_btn.label="原地复活";
			}
			else if(this._rev_type==130){
				this._r_time=this._l_time;
				this._r_str="后复活点复活";
				this._view.name_txt.y=60;
				this._view.l_box.visible=false;
				this._view.r_box.x=this.width-this._view.r_box.width >> 1;
				this._view.r_btn.label="立即复活";
			}
		}
		else if(this._rev_type==4 || this._rev_type==16 || this._rev_type==32){
			this._view.l_box.visible=true;
			this._view.l_box.x=this.width-this._view.l_box.width >> 1;
			this._l_time=cmd.time-ServerTime.getServerTime();
			if(this._rev_type==4){
				this._view.l_btn.visible=false;
				this._view.l_timeTxt.color="#e99e27";
				this._l_str=GameHTML.setColor("后当前地图复活","#cdcdcb");
			}
			else{
				if(this._rev_type==32){
					this._view.l_btn.disabled=false;
					this._view.l_btn.label="阵营点复活";
					}else{
					this._view.l_btn.label="自动复活";
					this._view.l_btn.disabled=this._l_time > 0;
				}
				this._l_str="后"+this._view.l_btn.label;
			}
		}
		if(this._view.freeTxt.visible || this._view.c_txt.visible){
			this._view.r_timeTxt.y=-24;
		}
		if(this._l_time > 0 || this._r_time > 0){
			if(this._l_time > 0)this._l_time++;
			if(this._r_time > 0)this._r_time++;
			Laya.workerTimer.loop(1000,this,this.onTimer);
			this.onTimer();
		}
	}

	__proto.onClick=function(e){
		if(e.currentTarget==this._view.l_btn){
			switch(this._rev_type){
				case 1:case 3:
					ReviveComandSender.sendLocalReviveMessage(1);
					break ;
				case 4:case 6:
					ReviveComandSender.sendLocalReviveMessage(4);
					break ;
				case 16:
					ReviveComandSender.sendLocalReviveMessage(16);
					break ;
				case 32:case 34:
					ReviveComandSender.sendLocalReviveMessage(32);
					break ;
				case 130:
					ReviveComandSender.sendLocalReviveMessage(128);
					break ;
				}
		}
		else if(e.currentTarget==this._view.r_btn){
			switch(this._rev_type){
				case 3:
				case 6:
				case 34:
				case 130:
					if(this._view.c_txt.visible && !this._view.c_txt.tag){
						GameNotice.showMousePosMessage("消耗不足");
						return;
					}
					ReviveComandSender.sendLocalReviveMessage(2,this._view.c_txt.visible ? this._view.c_icon.tag :0);
					break ;
				}
		}
	}

	__proto.showItem=function(){
		this._view.c_txt.visible=true;
		this._cost=GameUtils.replaceCostItem(this._map.q_revive_consume);
		var itemid=0,num=0;
		if(BagItemCenter.getItemCount(this._cost.id)< this._cost.num && this._cost.replaceId !=0){
			itemid=this._cost.replaceId;
			num=this._cost.replaceValue(0);
		}
		else{
			num=this._cost.num;
			itemid=this._cost.id;
		}
		this._c_tip.data=itemid;
		this._view.c_icon.tag=itemid;
		this._view.c_txt.text=num+'';
		this._view.c_txt.x=this._view.r_box.width-this._view.c_txt.width-this._view.c_icon.x >> 1;
		this._view.c_icon.skin=ResPathUtil.getIcon(ItemUtil.getIcon(itemid),EnumImageType.ITEM_40);
		this._view.c_txt.tag=BagItemCenter.getItemCount(itemid)>=num;
		this._view.c_txt.color=this._view.c_icon.tag ? "#00ff00" :"#ef0605";
	}

	__proto.onTimer=function(){
		if(this._l_time > 0){
			this._l_time--;
			if(this._l_time==0){
				this._view.l_timeTxt.text='';
				this._view.l_btn.disabled=false;
				Event.EMPTY.setTo("click",this._view.l_btn,null);
				this.onClick(Event.EMPTY);
			}
			else{
				this._view.l_timeTxt.text=this._l_time+"秒"+this._l_str;
			}
		}
		if(this._r_time > 0){
			this._r_time--;
			if(this._r_time==0){
				this._view.r_timeTxt.text='';
				if(this._cishu==0 && !this._view.c_txt.visible)
					Event.EMPTY.setTo("click",this._view.r_btn,null);
				this.onClick(Event.EMPTY);
			}
			else{
				this._view.r_timeTxt.text=this._r_time+"秒"+this._r_str;
			}
		}
		if(this._l_time==0 && this._r_time==0){
			Laya.workerTimer.clear(this,this.onTimer);
		}
	}

	return RevivePanel;
})(BasePanel)