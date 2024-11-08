var OnLineView=(function(_super){
	function OnLineView(){
		this._itemVec=null;
		OnLineView.__super.call(this);
		this.panel.vScrollBarAllwaysShow="off";
		this._itemVec=[];
	}

	__class(OnLineView,'com.modules.activity_xcq.leichong.view.OnLineView',_super);
	var __proto=OnLineView.prototype;
	Laya.imps(__proto,{"com.modules.window.IActivity":true})
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._itemVec=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=0);
		App.timer.doTimeLoop(this,1000,this.updateTimer);
	}

	__proto.hide=function(){
		App.timer.clearTimer(this,this.updateTimer);
		EventMgr.removeAll(this);
	}

	__proto.updateState=function(type){
		if(type !=115)
			return;
		var acts=ActivityUtil.getOpenList(115,0);
		acts.sort(this.onSort);
		var item,sTime=ServerTime.getServerTime();
		for(var i=0;i < acts.length;i++){
			if(i < this._itemVec.length){
				item=this._itemVec[i];
			}
			else{
				item=new OnLineItem();
				item.move(0,i *94,this.panel.content);
				this._itemVec.push(item);
			}
			item.updateInfo(acts[i],sTime);
		}
		while(i < this._itemVec.length){
			this._itemVec.pop().destroy();
		}
		this.panel.refresh();
	}

	__proto.updateTimer=function(){
		var item;
		for(var $each_item in this._itemVec){
			item=this._itemVec[$each_item];
			item.updateTimer();
		}
	}

	__proto.onSort=function(v1,v2){
		if(v1.playerStates==1 && v2.playerStates !=1)
			return-1;
		if(v1.playerStates !=1 && v2.playerStates==1)
			return 1;
		return v1.id-v2.id;
	}

	return OnLineView;
})(OnLineViewUI)