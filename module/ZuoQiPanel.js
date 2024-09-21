/**
*坐骑
*@author zq
*创建时间：2024年7月10日14:50:14
*/
//class com.modules.zuoqi.ZuoQiPanel extends com.modules.window.TabPanel
var ZuoQiPanel=(function(_super){
	function ZuoQiPanel(){
		ZuoQiPanel.__super.call(this);
	}

	__class(ZuoQiPanel,'com.modules.zuoqi.ZuoQiPanel',_super);
	var __proto=ZuoQiPanel.prototype;
	__proto.init=function(){
		this.registerSubPanel(0,ZuoqiView,"坐 骑");
		this.registerSubPanel(1,LingShouView,"灵 兽",71);
		this.registerSubPanel(2,ZuJiView,"足 迹",139);
		this.registerSubPanel(3,FeijianView,"飞 剑",236);
		_super.prototype.init.call(this);
		this.doJumpRed();
		TaskCommandSender.sendC2S_PanelTaskReturnMessage(4060000);
	}

	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		_super.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=0);
		_super.prototype.show.call(this);
		this.addEvent("ET.FUNCTION_TIP",this.onFunction);
		this.onFunction(50,false);
	}

	__proto.onFunction=function(id,value){
		if(id==50){
			this.showRedPointByIndex(0,AdvanceCenter.reddic[1] || ZuoQiCenter.zuoqiRed || ZuoQiCenter.zuoqiSkillRed);
			this.showRedPointByIndex(1,LingShouCenter.getPoint());
			this.showRedPointByIndex(2,ZuJiCenter.getPoint());
			this.showRedPointByIndex(3,ZuoQiCenter.feijianRed);
		}
	}

	__proto.getHideFlyToTarget=function(){
		return EnumPanelHideFlyToTarget.ZUOQI;
	}

	return ZuoQiPanel;
})(TabPanel)