/**
*七登录奖励
*@author Jian
*2023-4-19
*/
//class com.modules.activity_xcq.leichong.view.SevenLoginPanel extends ui.mobile.activity.seven.SevenLoginPanelUI
var SevenLoginPanel=(function(_super){
	function SevenLoginPanel(){
		this._grids=null;
		this._curr=null;
		this._time=0;
		SevenLoginPanel.__super.call(this);
		this._grids=new ShowItemListBigGrid(10,this,0,206);
	}

	__class(SevenLoginPanel,'com.modules.activity_xcq.leichong.view.SevenLoginPanel',_super);
	var __proto=SevenLoginPanel.prototype;
	Laya.imps(__proto,{"com.modules.window.IActivity":true})
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._grids=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=0);
		for(var i=0;i < 7;i++){
			(this ["dayimg"+i]).skin=ResPathUtil.getImageRes("day"+i,".png","fulihall");
			(this ["icon"+i]).skin=ResPathUtil.getImageRes("qt"+i,".png","fulihall");
			(this ["bg"+i]).on("click",this,this.onClick);
		}
		this.btnGet.on("click",this,this.onClick);
	}

	__proto.hide=function(){
		EventMgr.removeAll(this);
		this.clearTimer(this,this.onTimer);
		this.btnGet.off("click",this,this.onClick);
		for(var i=0;i < 7;i++){
			(this ["bg"+i]).off("click",this,this.onClick);
			(this ["dayimg"+i]).skin=null;
			(this ["icon"+i]).skin=null;
		}
		this._curr=null;
	}

	__proto.updateState=function(type){
		if(type==9){
			var openday=ServerTime.getOpenDays();
			var bg,temp1,temp2,items1,items2,iname,act,acts=ActivityUtil.getOpenList(type,4);
			for(var i=0;i < 7;i++){
				act=acts[i];
				(this ["mask"+i]).visible=act.playerStates==0;
				(this ["yilingqu"+i]).visible=act.playerStates==0;
				iname='';
				items2=[];
				items1=JSON.parse(act.bean.q_show_rewards);
				for(var j=0;j < items1.length;j++){
					if(openday >=myparseInt(items1[j]["opendaymin"])&& openday <=myparseInt(items1[j]["opendaymax"])){
						items2.push(items1[j]);
						if(!iname){
							iname=ItemUtil.getItemName(items1[j]["id"]);
						}
					}
				}
				(this ["dayTxt"+i]).text=iname;
				bg=this ["bg"+i];
				bg.tag={act:act,items:items2};
				if(i < 6){
					bg.showRedPoint(act.playerStates==1,bg.width-18,6);
				}
				else{
					bg.showRedPoint(act.playerStates==1,bg.width-28,14);
				}
				if(act.playerStates > 0){
					if(!temp1){
						temp1=bg;
					}
					if(!temp2 && bg.isRedPoint){
						temp2=bg;
					}
				}
			}
			if(!this._curr){
				if(!temp2){
					temp2=temp1 ? temp1 :this.bg6;
				}
				Event.EMPTY.setTo("click",temp2,temp2);
				this.onClick(Event.EMPTY);
			}
			else{
				this.update();
			}
		}
	}

	__proto.update=function(){
		var act=this._curr.tag.act;
		this.btnGet.visible=act.playerStates < 2;
		this.btnGet.disabled=act.playerStates < 1;
		this.btnGet.showRedPoint(act.playerStates==1);
		var param=act.extendMap ? JSON.parse(act.extendMap):{};
		this._time=myparseInt(param["reamaintime"])-ServerTime.getServerTime();
		this.btnGet.visible=act.playerStates < 2;
		if(act.playerStates==2 && this._time / 86400 < 1){
			this.btnGet.visible=false;
			this.descTxt.text="活动剩余时间不足";
		}
		else if(!this.btnGet.visible && param.hasOwnProperty("lqday")){
			this.descTxt.text=GameHTML.setColor(JSON.parse(act.extendMap)["lqday"],"#00ff00")+"天后可领取";
		}
		else{
			this.descTxt.text='';
		}
		if(this._time > 0){
			this._time++;
			this.timerLoop(1000,this,this.onTimer);
		}
		this.onTimer();
	}

	__proto.onClick=function(e){
		if(e.currentTarget==this.btnGet){
			ActivitiesCommandSender.C2S_JoinActivityById(this.btnGet.tag);
		}
		else{
			this._curr=e.currentTarget;
			this._curr.addChild(this.l_select);
			this.l_select.size(this._curr.width,this._curr.height);
			if(!this._curr.tag)return;
			var act=this._curr.tag.act;
			this.btnGet.tag=act.id;
			this.loginTxt.text="登录"+GameHTML.setColor(act.bean.q_sort,"#00ff00")+"天可领取";
			this._grids.showArr(this._curr.tag.items);
			this._grids.x=this.loginTxt.x+(this.loginTxt.width-this._grids.width >> 1);
			this.update();
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

	return SevenLoginPanel;
})(SevenLoginPanelUI)