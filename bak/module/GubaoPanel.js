/**
*
*@author Jian
*创建时间：2024-2-22
*/
//class com.modules.gubao.GubaoPanel extends com.game.core.panel.BasePanel
var GubaoPanel=(function(_super){
	function GubaoPanel(){
		this._view=null;
		this._curView=null;
		this._title=null;
		this._bg=null;
		this._tabs=null;
		this._param=null;
		GubaoPanel.__super.call(this);
	}

	__class(GubaoPanel,'com.modules.gubao.GubaoPanel',_super);
	var __proto=GubaoPanel.prototype;
	__proto.init=function(){
		App.registerNumber("53","0123456789");
		this._viewDict={};
		this._view=new Window1UI();
		this.addChild(this._view);
		this._bg=new Image();
		this._bg.move(16,46,this);
		this._title=new Image();
		this._title.centerX=0;
		this._title.move(0,10,this);
		this._tabs=ComponentUtil.createPanelTab(["古 宝","神 骨","狂 暴套 装","无 尽炼 狱","秒 杀套 装","霸 体套 装"],this);
	}

	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._bg=null;
		this._title=null;
		this._tabs=null;
		this._view=null;
		_super.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		_super.prototype.show.call(this);
		this._tabs.setItemVisibleByIndex(1,FunctionManager.isFunctionOpen(75));
		this._tabs.setItemVisibleByIndex(2,FunctionManager.isFunctionOpen(255));
		this._tabs.setItemVisibleByIndex(3,FunctionManager.isFunctionOpen(254));
		this._tabs.setItemVisibleByIndex(4,FunctionManager.isFunctionOpen(110));
		this._tabs.setItemVisibleByIndex(5,FunctionManager.isFunctionOpen(142));
		this._tabs.on("change",this,this.onTab);
		this.addEvent("ET.FUNCTION_TIP",this.updateRed);
		this.updateRed(239);
	}

	__proto.hide=function(){
		_super.prototype.hide.call(this);
		EventMgr.removeAll(this);
		this._tabs.selectedIndex=-1;
		this._tabs.off("change",this,this.onTab);
		this._bg.skin=null;
	}

	__proto.updatePanel=function(data,tab){
		(tab===void 0)&& (tab=-1);
		this._param=data;
		tab=tab < 0 ? 0 :tab;
		if(tab !=this._tabs.selectedIndex){
			this._tabs.selectedIndex=tab;
		}
		else{
			this.onTab(null);
		}
	}

	__proto.onTab=function(e){
		if(this._curView !=null){
			(this._curView).removeSelf();
			this._curView.hide();
			this._curView=null;
		};
		var index=this._tabs.selectedIndex;
		if(index < 0)return;
		if(!this._tabs.getItemVisibleByIndex(index)){
			this._tabs.selectFirstVisible();
			return;
		}
		this._curView=this._viewDict[index];
		if(!this._curView){
			switch(index){
				case 0:this._curView=new GubaoView();break ;
				case 1:this._curView=new ShenGuView();break ;
				case 2:this._curView=new ShengWangView();break ;
				case 3:this._curView=new YuhunView();break ;
				case 4:this._curView=new MiaoShaView();break ;
				case 5:this._curView=new BatiView();break ;
				}
			this._viewDict[index]=this._curView;
		}
		if(this._curView !=null){
			this.addChild(this._curView);
			this._bg.skin=ResPathUtil.getImageRes("bg"+index,".jpg","gubao");
			this._title.skin=ResPathUtil.getImageRes("title"+index,".png","gubao");
			this._curView.show(this._param);
			this._param=null;
		}
	}

	__proto.updateRed=function(funId,value){
		(value===void 0)&& (value=false);
		if(funId==239){
			this._tabs.showRedPointByIndex(0,GubaoCenter.active_red || GubaoCenter.up_red);
			this._tabs.showRedPointByIndex(1,ShenGuCenter.getPoint());
			this._tabs.showRedPointByIndex(2,HechengRedPoint.shengwangRed1);
			this._tabs.showRedPointByIndex(3,HechengRedPoint.shengwangRed2);
			this._tabs.showRedPointByIndex(4,HechengRedPoint.miaoshaRed);
			this._tabs.showRedPointByIndex(5,HechengRedPoint.batiRed);
		}
	}

	__proto.getHideFlyToTarget=function(){
		return EnumPanelHideFlyToTarget.GUBAO;
	}

	return GubaoPanel;
})(BasePanel)