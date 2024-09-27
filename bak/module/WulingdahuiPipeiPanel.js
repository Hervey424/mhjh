/**
*比武大会匹配
*@author mcc
*2024-3-1
*/
//class com.modules.wulingdahui.panel.WulingdahuiPipeiPanel extends com.game.core.panel.BasePanel
var WulingdahuiPipeiPanel=(function(_super){
	function WulingdahuiPipeiPanel(){
		this._view=null;
		this._time=0;
		this._num=0;
		WulingdahuiPipeiPanel.__super.call(this);
	}

	__class(WulingdahuiPipeiPanel,'com.modules.wulingdahui.panel.WulingdahuiPipeiPanel',_super);
	var __proto=WulingdahuiPipeiPanel.prototype;
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._view=null;
		_super.prototype.destroy.call(this);
	}

	__proto.init=function(){
		this._view=new WulingdahuiPipeiPanelUI();
		this.addChild(this._view);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		_super.prototype.show.call(this);
		this._view.bg.url=ResPathUtil.getImageRes("bgPipei",".png","wulingdahui");
		this._view.nameBg0.url=ResPathUtil.getImageRes("pipeiImg1",".png","wulingdahui");
		this._view.nameBg1.url=ResPathUtil.getImageRes("pipeiImg0",".png","wulingdahui");
		this._view.levelTxt0.text=data;
		this._view.nameTxt0.text=App.role.name;
		this._view.icon0.url=ResPathUtil.getImageRes("job"+App.role.job,".png","wulingdahui");
		App.addMask(App.stageLayer.popLayer);
		App.stageLayer.popLayer.addChild(this);
		this.addEvent("WulingdahuiCenter.WLDH_PIPEI_INFO",this.onPipei);
		this._view.pipeiTxt.visible=true;
		this.onTimer1();
	}

	__proto.hide=function(){
		_super.prototype.hide.call(this);
		App.removeMask();
		this._view.bg.url=null;
		this._view.nameBg0.url=null;
		this._view.nameBg1.url=null;
		this._view.icon0.url=null;
		this._view.icon1.url=null;
		this._view.nameTxt0.text="";
		this._view.levelTxt0.text="";
		this._view.nameTxt1.text="";
		this._view.levelTxt1.text="";
		this._view.timeTxt.text="";
		EventMgr.removeAll(this);
		Laya.timer.clear(this,this.onTimer);
		Laya.timer.clear(this,this.onTimer1);
		Laya.timer.clear(this,this.onTimer2);
		Laya.timer.clear(this,this.onTimer3);
		WulingdahuiCenter.sendWudaohuiPipeiReq(1,WulingdahuiCenter.doubleCost ? 1 :0);
		PanelManager.removePanel(PanelRegister.WULINGDAHUI);
		PanelManager.removePanel(PanelRegister.BOSS);
		this._num=0;
	}

	__proto.onPipei=function(cmd){
		Laya.timer.clear(this,this.onTimer1);
		Laya.timer.clear(this,this.onTimer2);
		Laya.timer.clear(this,this.onTimer3);
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
		}
		this._view.icon1.url=ResPathUtil.getImageRes("job"+cmd.job,".png","wulingdahui");
		this._view.nameTxt1.text=cmd.name;
		this._view.levelTxt1.text=bean.q_name;
		WulingdahuiCenter.job=cmd.job;
		this._time=3;
		this._view.pipeiTxt.visible=false;
		Laya.timer.loop(1000,this,this.onTimer);
		this._view.timeTxt.text=this._time+"秒后进入比武大会";
	}

	__proto.onTimer=function(){
		this._time--;
		this._view.timeTxt.text=this._time+"秒后进入比武大会";
		if(this._time <=0){
			this._time=0;
			PanelManager.closeByClass(WulingdahuiPipeiPanel);
		}
	}

	__proto.onTimer1=function(){
		Laya.timer.clear(this,this.onTimer1);
		Laya.timer.once(300,this,this.onTimer2);
		this._view.icon1.url=ResPathUtil.getImageRes("job1",".png","wulingdahui");
	}

	__proto.onTimer2=function(){
		Laya.timer.clear(this,this.onTimer2);
		this._view.icon1.url=ResPathUtil.getImageRes("job2",".png","wulingdahui");
		Laya.timer.once(300,this,this.onTimer3);
	}

	__proto.onTimer3=function(){
		this._num++;
		Laya.timer.clear(this,this.onTimer3);
		this._view.icon1.url=ResPathUtil.getImageRes("job3",".png","wulingdahui");
		if(this._num >=2){
			this._num=0;
			WulingdahuiCenter.sendWudaohuiPipeiReq(0,WulingdahuiCenter.doubleCost ? 1 :0);
		}
		Laya.timer.once(300,this,this.onTimer1);
	}

	return WulingdahuiPipeiPanel;
})(BasePanel)