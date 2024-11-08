var MeiRiZhiGouView=(function(_super){
	function MeiRiZhiGouView(){
		this._types=null;
		this._time=0;
		this._isOpen=false;
		MeiRiZhiGouView.__super.call(this);
		this.list.itemRender=XFZuanShiLiBaoItem;
		this.list.scrollBarAllwaysShow="off";
		this.list.renderHandler=GameHandler.create(this,this.renderHandler);
		this.list.array=null;
		this._types=[216];
	}

	__class(MeiRiZhiGouView,'com.modules.activity_xcq.leichong.view.MeiRiZhiGouView',_super);
	var __proto=MeiRiZhiGouView.prototype;
	Laya.imps(__proto,{"com.modules.window.IActivity":true})
	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		this._isOpen=true;
		this.btn_left.y=330;
		this.btn_right.y=330;
		TweenMax.to(this.btn_left,1,{y:"-5",yoyo:true,repeat:-1});
		TweenMax.to(this.btn_right,1,{y:"-5",yoyo:true,repeat:-1});
		this.btn_right.on("click",this,this.onClick);
		this.btn_left.on("click",this,this.onClick);
		this.timerLoop(1000,this,this.onTimer);
	}

	__proto.hide=function(){
		this.clearTimer(this,this.onTimer);
		this.btn_right.off("click",this,this.onClick);
		this.btn_left.off("click",this,this.onClick);
		TweenMax.killTweensOf(this.btn_right);
		TweenMax.killTweensOf(this.btn_left);
	}

	__proto.onClick=function(e){
		switch(e.currentTarget){
			case this.btn_left:{
					this.list.jump(false,true);
					break ;
				}
			case this.btn_right:{
					this.list.jump(true,true);
					break ;
				}
			}
	}

	__proto.updateState=function(type){
		if(this._types.indexOf(type)>=0){
			var acts=ActivityUtil.getOpenList(type,4);
			var act=acts[0];
			this.list.array=acts;
			this._time=act && act.extendMap ? myparseInt(JSON.parse(act.extendMap)["remaintime"])-ServerTime.getServerTime():0;
			this.initTween();
		}
	}

	__proto.initTween=function(){
		if(this._isOpen){
			this._isOpen=false;
			var index=0,acts=this.list.array;
			for(var i=0;i < acts.length;i++){
				if(acts[i].playerStates > 0){
					index=i;
					break ;
				}
			}
			this.list.scrollTo(index);
		}
	}

	__proto.renderHandler=function(cell,index){
		cell.setInfo(this.list.array[index],index);
		if(cell.zhekou.visible){
			cell.zhekou.skin=ResPathUtil.getImageRes("zhe5",".png","activity/xinfutehui");
		}
	}

	__proto.onTimer=function(){
		if(this._time > 0){
			this.timeTxt.text="剩余时间："+GameHTML.setColor(DateUtils.formatDay(this._time--),"#00ff00");
		}
		else{
			this.timeTxt.text='';
			this.clearTimer(this,this.onTimer);
		}
	}

	return MeiRiZhiGouView;
})(MeiRiZhiGouViewUI)