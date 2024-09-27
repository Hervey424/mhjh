var EscortFinishPanel=(function(_super){
	function EscortFinishPanel(){
		this._view=null;
		this._rewards=null;
		this._data=null;
		this._timeFrame=0;
		EscortFinishPanel.__super.call(this);
	}

	__class(EscortFinishPanel,'com.modules.escort.EscortFinishPanel',_super);
	var __proto=EscortFinishPanel.prototype;
	__proto.init=function(){
		this._view=new NpcDialogPanelUI();
		this.addChild(this._view);
		this._rewards=new ShowItemList(true,true,8,this,50,140,false,"grid_62_1",EnumImageType.ITEM_56);
	}

	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._data=null;
		this._rewards=null;
		this._view=null;
		_super.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=0);
		_super.prototype.show.call(this,data,tab);
		this._view.btnArea.on("click",this,this.onClick);
		this.update();
	}

	__proto.hide=function(){
		_super.prototype.hide.call(this);
		this._view.btnArea.off("click",this,this.onClick);
		App.timer.clearTimer(this,this.onTimer);
	}

	__proto.update=function(){
		var npc=App.dataMgr.q_npcContainer.getDataBean(2087);
		this._data=EscortCenter.getCurrentDoingData();
		if(this._data){
			if(this._data.isDouble){
				this._rewards.showOrderGridByJson(this._data.bean.q_success_doublerewards,10,2,5,true);
			}
			else{
				this._rewards.showOrderGridByJson(this._data.bean.q_success_rewards,10,2,5,true);
			}
			this._rewards.visible=true;
			if(this._data.taskState==2){
				if(this._data.remainCount > 0){
					this._view.btn.label="继续押运";
				}
				else{
					this._view.btn.label="确定";
				}
				this._view.time_txt.visible=true;
				if(this._timeFrame <=0){
					this._timeFrame=10;
				}
				App.timer.doTimeLoop(this,1000,this.onTimer);
				this.onTimer();
			}
			else{
				this._view.btn.label="确定";
				this._view.time_txt.visible=false;
				App.timer.clearTimer(this,this.onTimer);
			}
			this._view.content_txt.htmlText=npc.q_npc_ask+"\n"
			+GameHTML.setColor("今日剩余押镖次数：","#e7c162")
			+GameHTML.setColor(this._data.remainCount+"/"+this._data.maxCount,this._data.remainCount > 0 ? GameHTML.GREEN :GameHTML.RED)+"\n"
			+(this._data.taskState==2 ? GameHTML.setColor("押运成功！",GameHTML.GREEN):GameHTML.setColor("未完成押运",GameHTML.RED));
		}
		else{
			this._view.btn.label="确定";
			this._view.time_txt.visible=false;
			this._rewards.visible=false;
			this._view.content_txt.htmlText=npc.q_npc_ask;
		}
	}

	__proto.onTimer=function(){
		this._timeFrame--;
		this._view.time_txt.visible=this._timeFrame <=5;
		this._view.time_txt.text=this._timeFrame+"秒后自动操作";
		if(this._timeFrame <=0){
			this.onClick();
		}
	}

	__proto.onClick=function(event){
		App.timer.clearTimer(this,this.onTimer);
		if(this._data && this._data.taskState==2){
			TaskCommandSender.sendFinishTask(this._data.taskID,this._data.taskType);
		}
		this.onClose();
	}

	__proto.getNpcType=function(){
		return [45];
	}

	return EscortFinishPanel;
})(BasePanel)