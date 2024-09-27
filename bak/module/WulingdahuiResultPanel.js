/**
*比武大会结算面板
*@author mcc
*2024-3-2
*/
//class com.modules.wulingdahui.panel.WulingdahuiResultPanel extends com.game.core.panel.BasePanel
var WulingdahuiResultPanel=(function(_super){
	function WulingdahuiResultPanel(){
		this._view=null;
		this._time=0;
		this._showItem=null;
		WulingdahuiResultPanel.__super.call(this);
	}

	__class(WulingdahuiResultPanel,'com.modules.wulingdahui.panel.WulingdahuiResultPanel',_super);
	var __proto=WulingdahuiResultPanel.prototype;
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._showItem=null;
		this._view=null;
		_super.prototype.destroy.call(this);
	}

	__proto.init=function(){
		this._view=new WulingdahuiResultPanelUI();
		this.addChild(this._view);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		_super.prototype.show.call(this,data,tab);
		WulingdahuiCenter.isJingjiZone=true;
		this._view.bg1.url=ResPathUtil.getImageRes("result2",".png","wulingdahui");
		this._view.btn.on("click",this,this.onClick);
		this._time=5;
		this.timerLoop(1000,this,this.onTimer);
		this._view.btn.label="领取奖励("+this._time+")";
		this.onResult(data);
	}

	__proto.hide=function(){
		_super.prototype.hide.call(this);
		this._view.bg.url=null;
		this._view.bg1.url=null;
		this._view.icon.url=null;
		this._view.btn.off("click",this,this.onClick);
		this.clearTimer(this,this.onTimer);
		for(var i=0;i < 5;i++){
			this._view["star"+i].url=null;
		}
		for(i=0;i < 4;i++){
			this._view["curStar"+i].url=null;
		}
	}

	__proto.onClick=function(e){
		ZoneCommandSender.sendExit();
		PanelManager.closeByClass(WulingdahuiResultPanel);
	}

	__proto.onResult=function(cmd){
		if(!this._showItem){
			this._showItem=new ShowItemList(true,true,10,this,316,234,false,"grid_66_1",EnumImageType.ITEM_56,66);
		};
		var jifen=cmd.score;
		var bean;
		var list=App.dataMgr.q_jingjiLvContainer.getList();
		for(var i=0;i < list.length;i++){
			if(i < list.length-1){
				if(jifen >=list[i].q_exp_all && jifen < list[i+1].q_exp_all){
					bean=list[i];
					break ;
				}
			}
			else{
				bean=list[i];
			}
		};
		var multiple=1+SkillCenter.getPassSkillBySpecialType(2205);
		if(cmd.result==0){
			this._view.bg.url=ResPathUtil.getImageRes("result0",".png","wulingdahui");
			if(bean.q_exp > 0){
				this._view.starBox.visible=true;
				var curStar=cmd.star-1;
				for(i=0;i < 4;i++){
					this._view["curStar"+i].url=i <=curStar ? ResPathUtil.getImageRes("star0",".png","wulingdahui"):null;
				}
			}
			else{
				this._view.starBox.visible=false;
			}
		}
		else{
			this._view.bg.url=ResPathUtil.getImageRes("result1",".png","wulingdahui");
			this._view.starBox.visible=false;
		};
		var reward;
		var obj;
		var brr=[];
		for(i=0;i < cmd.info.length;i++){
			reward=cmd.info[i];
			for(var a=0;a < reward.wdhinfo.length;a++){
				obj=reward.wdhinfo[a];
				brr.push({"id":obj.id,"num":obj.num,"isbind":false});
			}
		}
		this._showItem.showArr(brr);
		var showStar=jifen-bean.q_exp_all;
		var posArr=[];
		if(bean.q_exp==3){
			posArr=[[90,117],[141,106],[195,118]];
			}else if(bean.q_exp==4){
			posArr=[[70,140],[114,109],[168,109],[214,140]];
			}else if(bean.q_exp==5){
			posArr=[[42,141],[90,117],[141,106],[195,118],[241,142]];
		}
		for(i=0;i < 5;i++){
			if(i >=posArr.length){
				this._view["star"+i].url=null;
			}
			else{
				this._view["star"+i].x=posArr[i][0];
				this._view["star"+i].y=posArr[i][1];
				this._view["star"+i].url=i <=showStar-1 ? ResPathUtil.getImageRes("star0",".png","wulingdahui"):ResPathUtil.getImageRes("star1",".png","wulingdahui");
			}
		}
		this._view.nameTxt.text=bean.q_name;
		this._view.levelTxt0.text=""+bean.q_num;
		this._view.icon.url=ResPathUtil.getImageRes(bean.q_res,".png","wulingdahui");
	}

	__proto.onTimer=function(){
		this._time--;
		this._view.btn.label="领取奖励("+this._time+")";
		if(this._time <=0){
			this._time=0;
			ZoneCommandSender.sendExit();
			PanelManager.closeByClass(WulingdahuiResultPanel);
		}
	}

	return WulingdahuiResultPanel;
})(BasePanel)