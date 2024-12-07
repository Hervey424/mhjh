/**
*传世宝物
*@author zq
*创建时间：2023年4月25日 11:31:01
*/
//class com.modules.treasure.view.TreasureView extends ui.mobile.treasure.TreasureViewUI
var TreasureView=(function(_super){
	function TreasureView(){
		this._attrCon=null;
		this._dragon=null;
		this._balls={};
		this._data=null;
		this._grid=null;
		this._initActivity=[];
		this._target=null;
		this._chipCount=-1;
		TreasureView.__super.call(this);
		this.init();
	}

	__class(TreasureView,'com.modules.treasure.view.TreasureView',_super);
	var __proto=TreasureView.prototype;
	Laya.imps(__proto,{"com.game.core.panel.ITabView":true})
	__proto.init=function(){
		this._attrCon=new AttrTextField();
		this._attrCon.move(651,270,this);
		this.list_tab.itemRender=TreasureTab;
		this.list_tab.scrollBarAllwaysShow="off";
		this.list_clip.itemRender=TreasureChipItem;
		this.list_clip.scrollBarAllwaysShow="off";
		this.list_clip.renderHandler=GameHandler.create(this,this.clipRenderHandler);
		this.list_tab.renderHandler=GameHandler.create(this,this.tabRenderHandler);
		this.list_tab.selectHandler=GameHandler.create(this,this.tabSelectHandler);
		this._grid=new ItemGrid("grid_62_1",EnumImageType.ITEM_56,66);
		this._grid.move(0,0,this.gridNode);
		this.need_txt.isHtml=true;
		this.free_txt.isHtml=true;
	}

	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._grid=null;
		this._initActivity=null;
		this._data=null;
		this._attrCon=null;
		this._dragon=null;
		if(this._balls){
			for (var key in this._balls){
				var ball=this._balls[key];
				if(ball){
					ball.dispose();
				}
			}
			this._balls=null;
		}
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		this.addEvent(ActivityEvent.REFRESH_DETAIL,this.onActUpdate);
		this.addEvent(TreasureCenter.TREASURE_UPDATE_LIST,this.onUpdate);
		this.addEvent(TreasureCenter.TREASURE_CHANGE,this.onChange);
		this.btn_left.on("click",this,this.onClick);
		this.btn_right.on("click",this,this.onClick);
		this.btn_active.on("click",this,this.onClick);
		this.btnGet.on("click",this,this.onClick);
		this.gridNode.on("click",this,this.onClick);
		this.bg.url=ResPathUtil.getImageRes("bg",".jpg","treasure");
		this._target=data;
		TreasureCenter.sendC2S_ArtifactListMessage();
	}

	__proto.hide=function(){
		EventMgr.removeAll(this);
		this.btn_left.off("click",this,this.onClick);
		this.btn_right.off("click",this,this.onClick);
		this.btn_active.off("click",this,this.onClick);
		this.btnGet.off("click",this,this.onClick);
		this.gridNode.off("click",this,this.onClick);
		this.list_tab.resetSelectedIndex();
		this.btn_active.showRedPoint(false);
		this.gridNode.showRedPoint(false);
		this.bg.url=null;
		this.clear();
	}

	__proto.onUpdate=function(){
		var all=TreasureCenter.getList();
		this.list_tab.array=all;
		var data,index=0,i=0;
		if(this._target){
			if((this._target instanceof com.logic.data.item.ItemData )){
				for (i=0;i < all.length;i++){
					data=all[i];
					if(data.parts && data.parts.indexOf(this._target.itemId)!=-1){
						index=i;
						break ;
					}
				}
			}
			else{
				for (i=0;i < all.length;i++){
					if(all[i].id==this._target){
						index=i;
						break ;
					}
				}
			}
			this._target=null;
			this.list_tab.selectedIndex=index;
			this.list_tab.scrollTo(index > 5 ? index-5 :0);
		}
		else{
			if(this.list_tab.selectedIndex !=-1){
				this.tabSelectHandler(this.list_tab.selectedIndex);
			}
			else{
				index=-1;
				for (i=0;i < all.length;i++){
					data=all[i];
					if(data.state==0){
						index=i;
						break ;
					}
				}
				if(index==-1){
					index=all.length-1;
				}
				this.list_tab.selectedIndex=index;
				this.list_tab.scrollTo(index > 4 ? index-4 :0);
			}
		}
	}

	__proto.onChange=function(){
		this.list_tab.refresh();
		this.updateTreasure(this._data);
	}

	__proto.onActUpdate=function(type){
		if(type !=201)
			return;
		this.activityNode.visible=false;
		if(this._data==null || this._data.activityId==0)
			return;
		var data=ActivityCenter.getData(this._data.activityId);
		if(data==null || data.activityStates !=1)
			return;
		this.activityNode.visible=true;
		this.imgGot.visible=data.playerStates==0;
		this.gridNode.visible=data.playerStates !=2;
		this.gridNode.tag=data.playerStates==1;
		this.gridNode.showRedPoint(data.playerStates==1);
		if(data.extendMap){
			var endtime=JSON.parse(data.extendMap).remaintime;
			App.timer.serverTimeEnd(this,this.onTimer,endtime);
		}
		this._grid.data=ItemUtil.getRewardDataList(data.getBean().q_rewards)[0];
	}

	__proto.updateTreasure=function(data){
		if(data==null)
			return;
		this._data=data;
		this.btnGet.visible=data.id < 5;
		this.imgName.skin=ResPathUtil.getImageRes("name"+data.bean.q_icon,".png","treasure");
		var endStr="";
		if(data.bean.q_resource_job > 0){
			endStr="_"+App.role.job;
		}
		this.imgPrivate.setURL(this,ResPathUtil.getImageRes("des"+data.bean.q_icon+endStr,".png","treasure"),this.onCom);
		this.showAvatar(data.state==1 || data.maxCount==1,data.bean.q_icon);
		this.showChip(data);
		this.imgActive.visible=data.state==1;
		if(data.parts){
			var chips=[];
			for (var i=0;i < data.parts.length;i++){
				chips.push(data);
			}
			this.list_clip.array=chips;
		}
		this.chipNode.visible=data.state !=1 && data.maxCount !=1 && data.activeCount < data.maxCount;
		this.activeNode.visible=data.state !=1 && (data.activeCount==data.maxCount || data.maxCount==1);
		if(this.activeNode.visible){
			if(data.needId){
				var money=MoneyCenter.getMoneyReplaceBind(data.needId);
				this.need_txt.text="消耗"+GameHTML.setColor(data.needCount+ItemUtil.getItemName(data.needId),money < data.needCount ? GameHTML.RED :GameHTML.GREEN)+"激活";
				if(data.vipLv > 0){
					this.free_txt.text="("+GameHTML.setColor("VIP"+data.vipLv,App.role.vipLevel >=this._data.vipLv ? GameHTML.GREEN :GameHTML.RED)+"免费激活)";
				}
				else{
					this.free_txt.text="";
				}
				this.btn_active.showRedPoint(money >=data.needCount || (App.role.vipLevel >=data.vipLv && data.vipLv > 0));
			}
			else{
				this.btn_active.showRedPoint(true);
				this.need_txt.text="";
				this.free_txt.text="";
			}
		}
		else{
			this.btn_active.showRedPoint(false);
		}
		this._attrCon.setCurrent(data.getAttrs(data.activeCount));
		if(data.activeCount < data.maxCount){
			this._attrCon.setNext(data.getAttrs(data.activeCount+1));
		}
		else{
			this._attrCon.setNext(null);
		}
		this.barNode.visible=data.killMax > 0;
		if(data.killMax > 0){
			this.bar_txt.text=data.killCount+"/"+data.killMax;
			this.imgBar.width=data.killCount / data.killMax *196;
		}
		this.popNode.visible=data.bean.q_desc !="";
		this.pop_txt.text=data.bean.q_desc;
		if(data.activityId > 0 && this._initActivity.indexOf(data.activityId)==-1){
			this._initActivity.push(data.activityId);
			ActivitiesCommandSender.C2S_ActivityDetailInfos([data.activityId]);
		}
		this.onActUpdate(201);
	}

	__proto.tabRenderHandler=function(cell,index){
		cell.setInfo(this.list_tab.array[index],index);
	}

	__proto.tabSelectHandler=function(index){
		this.updateTreasure(this.list_tab.array[index]);
	}

	__proto.clipRenderHandler=function(cell,index){
		cell.setInfo(this.list_clip.array[index],index);
	}

	__proto.showAvatar=function(value,urlName){
		if(value){
			if(this._dragon==null){
				this._dragon=GameEffect.getEffect();
				this._dragon.move(this.avatarNode.x+this.avatarNode.width / 2,this.avatarNode.y+this.avatarNode.height / 2,this);
			}
			this._dragon.url=ResPathUtil.getPanelEffect("csbw"+urlName,"treasure");
			this._dragon.restart();
		}
		else{
			if(this._dragon){
				this._dragon.stopAndHide();
				this._dragon.toPool();
				this._dragon=null;
			}
		}
	}

	__proto.showChip=function(data){
		TweenMax.killTweensOf(this.avatarNode);
		this.hideBall();
		if(data.state==1 || data.maxCount==1){
			this.avatarNode.visible=false;
		}
		else{
			this.avatarNode.visible=true;
			this.avatarNode.y=168;
			TweenMax.to(this.avatarNode,0.6,{y:"+10",yoyo:true,repeat:-1});
			var index=-1;
			this.imgAvatar.skin=ResPathUtil.getImageRes("csbw"+data.bean.q_icon,".png","treasure");
			var chips=[this.imgChip1,this.imgChip2,this.imgChip3,this.imgChip4];
			var balls=[this.imgBall1,this.imgBall2,this.imgBall3,this.imgBall4];
			for (var i=0;i < chips.length;i++){
				var c=chips[i];
				var b=balls[i];
				b.visible=false;
				c.visible=false;
				if(i < data.maxCount){
					var bingo=data.getChipBingo(i);
					if(!bingo){
						c.visible=true;
						c.skin=ResPathUtil.getImageRes("csbw"+data.bean.q_icon+"_"+(i+1),".png","treasure");
					}
					b.visible=true;
					b.move(data.xys[i][0],data.xys[i][1]);
					if(c.visible){
						c.addChild(b);
						}else{
						this.imgAvatar.addChild(b);
					}
					if(bingo){
						this.showBall(i,b);
						if(data.newChip==data.parts[i]){
							CPlayOnceEffect.play(ResPathUtil.getPanelEffect("activate","main/vipzone"),b,b.width / 2,b.height / 2);
							App.sound.playSound("newstar");
							data.newChip=0;
						}
					}
					else if(data.getChipCanActive(i)){
						if(index==-1){
							index=i;
						}
					}
				}
			}
			if(index !=-1){
				PanelManager.openByClass(TreasureChipPanel,data,index);
			}
		}
	}

	__proto.showBall=function(index,b){
		var ball=this._balls[index];
		if(ball==null){
			ball=GameEffect.getEffect();
			ball.url=ResPathUtil.getPanelEffect("ball","treasure");
			this._balls[index]=ball;
		}
		ball.move(0,0,b);
		ball.play();
	}

	__proto.hideBall=function(){
		for (var key in this._balls){
			var ball=this._balls[key];
			if(ball){
				ball.stopAndHide();
				ball.removeSelf();
			}
		}
	}

	__proto.clear=function(){
		this.showAvatar(false,"");
		this.hideBall();
		TweenMax.killTweensOf(this.avatarNode);
		App.timer.clearTimer(this,this.onTimer);
	}

	__proto.onClick=function(e){
		var target=e.currentTarget;
		switch(target){
			case this.btn_left:{
					this.list_tab.jump(false);
					break ;
				}
			case this.btn_right:{
					this.list_tab.jump(true);
					break ;
				}
			case this.btn_active:{
					if(this._data){
						if(this._data.needCount > 0){
							if(this._data.vipLv > 0 && App.role.vipLevel >=this._data.vipLv){}
								else if(!App.isMoneyEnough(this._data.needCount,this._data.needId)){
								return;
							}
						}
						App.sound.playSound("jinjie");
						GlobalCenter.point.setTo(310,380);
						GlobalCenter.point=this.localToGlobal(GlobalCenter.point);
						CPlayOnceEffect.play(ResPathUtil.getPanelEffect("jihuochenggong","target"),App.stageLayer.popLayer,GlobalCenter.point.x,GlobalCenter.point.y);
						TreasureCenter.sendC2S_ArtifactDebrisMessage(this._data.id,0);
					}
					break ;
				}
			case this.gridNode:{
					if(this.gridNode.tag){
						ActivitiesCommandSender.C2S_JoinActivityById(this._data.activityId);
					}
					break ;
				}
			case this.btnGet:
				if(this._data && this._data.parts && this._data.parts[0]){
					PanelOpenManager.openGetway(this._data.parts[0],this.btnGet);
				}
				break ;
			}
	}

	__proto.onCom=function(bmd){
		this.imgPrivate.x=this.barNode.x+(this.barNode.width-bmd.width >> 1);
		this.imgPrivate.y=406+((this.barNode.visible ? 120 :166)-bmd.height >> 1);
	}

	__proto.onTimer=function(data){
		if(data.spuleTime >=0){
			this.time_txt.text="剩余时间："+StringFormat.formatToTime_V11(data.spuleTime);
		}
		else{
			this.activityNode.visible=false;
			App.timer.clearTimer(this,this.onTimer);
		}
	}

	return TreasureView;
})(TreasureViewUI)