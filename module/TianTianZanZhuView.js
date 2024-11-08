var TianTianZanZhuView=(function(_super){
	function TianTianZanZhuView(){
		this._reward=null;
		this._json=null;
		TianTianZanZhuView.__super.call(this);
		this.list.itemRender=TianTianZanZhuItem;
		this.list.scrollBarAllwaysShow="off";
		this.list.renderHandler=GameHandler.create(this,this.renderHandler);
		this.list.array=null;
		this._reward=new ShowItemListTween(true,true,5,this,224,126);
		this._reward.setMaskByGrids(9);
	}

	__class(TianTianZanZhuView,'com.modules.activity_xcq.leichong.view.TianTianZanZhuView',_super);
	var __proto=TianTianZanZhuView.prototype;
	Laya.imps(__proto,{"com.modules.window.IActivity":true})
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._reward=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.updateState=function(type){
		if(type !=293)
			return;
		var all=ActivityUtil.getOpenList(type,4);
		if(all==null || all.length==0){
			return;
		};
		var data=all.shift();
		if(this._json==null){
			this._json=data.getBean().q_show_rewards;
			this._reward.showJson(this._json);
		};
		var day=0;
		if(data.extendMap){
			var parse=JSON.parse(data.extendMap);
			day=myparseInt(parse.day);
		}
		this.day_txt.htmlText="连充天数："+GameHTML.setColor(day+"天",GameHTML.GREEN);
		var index_get=-1;
		var index_no=-1;
		for (var i=0;i < all.length;i++){
			var tmpData=all[i];
			if(index_get==-1 && tmpData.playerStates==1){
				index_get=i;
			}
			if(index_no==-1 && tmpData.playerStates==2){
				index_no=i;
			}
		};
		var index=0;
		if(index_get !=-1){
			index=index_get;
		}
		else if(index_no !=-1){
			index=index_no;
		}
		this.list.array=all;
		this.list.scrollTo(index);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
	}

	__proto.hide=function(){
		this._reward.stop();
		this._json=null;
	}

	__proto.renderHandler=function(cell,index){
		cell.setInfo(this.list.array[index],index);
	}

	return TianTianZanZhuView;
})(TianTianZanZhuViewUI)