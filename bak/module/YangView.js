var YangView=(function(_super){
	function YangView(){
		this._rewards=null;
		this._rewards2=null;
		YangView.__super.call(this);
		this.imgGot.visible=false;
	}

	__class(YangView,'com.modules.yanglegeyang.view.YangView',_super);
	var __proto=YangView.prototype;
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._rewards=null;
		this._rewards2=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		this.bg.skin=ResPathUtil.getImageRes("bg",".jpg","ylgy");
		this.bg_center.skin=ResPathUtil.getImageRes("bg_center",".png","ylgy");
		this.bg_left.skin=ResPathUtil.getImageRes("bg_left",".png","ylgy");
		this.bg_right.skin=ResPathUtil.getImageRes("bg_right",".png","ylgy");
		this.showReward(YangCenter.chessData.rewards);
	}

	__proto.hide=function(){
		this.bg.skin=null;
		this.bg_center.skin=null;
		this.bg_left.skin=null;
		this.bg_right.skin=null;
		if(this._rewards){
			this._rewards.destroy();
			this._rewards=null;
		}
		if(this._rewards2){
			this._rewards2.destroy();
			this._rewards2=null;
		}
	}

	__proto.updateCount=function(num){
		this.num_txt.text="剩余："+num;
	}

	__proto.changeSkill=function(){
		var skills=[YangCenter.chessData.lookData,YangCenter.chessData.randomData,YangCenter.chessData.removeData,YangCenter.chessData.backData];
		var btns=[this.btn_look,this.btn_random,this.btn_remove,this.btn_back];
		var labels=[this.look_txt,this.random_txt,this.remove_txt,this.back_txt];
		var urls=["look","random","remove","back"];
		var bingo=[!YangCenter.allowLook,true,YangCenter.allowRemove,YangCenter.allowBack];
		for (var i=0;i < btns.length;i++){
			var skill=skills[i];
			var btn=btns[i];
			var txt=labels[i];
			txt.htmlText=GameHTML.setColor(skill.remaintimes,skill.remaintimes > 0 ? GameHTML.GREEN :GameHTML.RED)+"/"+skill.max;
			btn.skin="mobile/ylgy/btn_"+urls[i]+"_"+(skill.remaintimes > 0 && bingo[i] ? "on" :"off")+".png";
		}
		this.showGot();
	}

	__proto.showReward=function(json){
		if(!json)
			return;
		if(this._rewards==null){
			this._rewards=new ShowItemList(true,true,10,this.bg_left,22,155,false,null,EnumImageType.ITEM_56,62);
		}
		this._rewards.showOrderGridByJson(json,2,15,13);
	}

	__proto.showFail=function(value){
		this.bg_result.visible=value;
		this.bg_result.skin=ResPathUtil.getImageRes("bg_fail",".png","ylgy");
		this.btn_new.visible=value;
		this.btn_no.visible=value;
		this.btn_get.visible=false;
		this.result_txt.y=123;
		if(value){
			if(YangCenter.chessData.removeData.remaintimes > 0 && YangCenter.chessData.removeData.needJson){
				var parse=JSON.parse(YangCenter.chessData.removeData.needJson)[0];
				this.result_txt.text="是否花费"+(parse.num+ItemUtil.getItemName(parse.id))+"移除3张牌至桌面";
				this.btn_continue.visible=true;
			}
			else{
				this.result_txt.text="挑战失败，是否再来一局？";
				this.btn_continue.visible=false;
			}
		}
		if(this._rewards2){
			this._rewards2.visible=false;
		}
		this.showGot();
	}

	__proto.showSuccess=function(value){
		this.bg_result.visible=value;
		this.bg_result.skin=ResPathUtil.getImageRes("bg_success",".png","ylgy");
		this.btn_continue.visible=false;
		this.btn_new.visible=YangCenter.chessData.rewardRemainTimes==0;
		this.btn_no.visible=YangCenter.chessData.rewardRemainTimes==0;
		this.btn_get.visible=YangCenter.chessData.rewardRemainTimes > 0;
		this.result_txt.text="恭喜你通关成功，今日可领取以下奖励！";
		this.result_txt.y=98;
		if(this._rewards2==null){
			this._rewards2=new ShowItemList(true,true,10,this.bg_result,0,120,false,"grid_62_1",EnumImageType.ITEM_56,62);
		}
		this._rewards2.visible=true;
		this._rewards2.showJson(YangCenter.chessData.rewards);
		this._rewards2.center();
		this.showGot();
	}

	__proto.showGot=function(){
		this.imgGot.visible=YangCenter.chessData.rewardRemainTimes <=0;
	}

	return YangView;
})(YangPanelUI)