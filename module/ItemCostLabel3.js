var ItemCostLabel3=(function(_super){
	function ItemCostLabel3(isAdd){
		this._btnAdd=null;
		this._tip=null;
		this._itemId=0;
		this._num=0;
		this._have=0;
		/**默认显示消耗数量，1.拥有/需求量*/
		this.showType=0;
		(isAdd===void 0)&& (isAdd=false);
		ItemCostLabel3.__super.call(this);
		this._tip=new TipData('');
		if(isAdd){
			this._btnAdd=new Button("mobile/common/btn_add1.png");
			this._btnAdd.on("click",this,this.onClick);
			this._btnAdd.stateNum=1;
			this.addChild(this._btnAdd);
		}
	}

	__class(ItemCostLabel3,'com.components.game.ItemCostLabel3',_super);
	var __proto=ItemCostLabel3.prototype;
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		if(this._btnAdd){
			this._btnAdd.off("click",this,this.onClick);
		}
		TipMgr.removeTip(this.icon);
		this._btnAdd=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.onClick=function(e){
		PanelOpenManager.openGetway(this._itemId,this._btnAdd);
	}

	__proto.showJson=function(value){
		if(value){
			if((typeof value=='string')){
				value=JSON.parse(value)[0];
			}
			this.show(value.id,value.num);
		}
		else{
			this.icon.skin=null;
			this.txt.text="参数异常";
		}
	}

	__proto.show=function(id,num){
		this._num=num;
		this._itemId=id;
		this.update();
		var bean=App.dataMgr.q_itemContainer.getDataBean(id);
		if(!bean)return;
		this.icon.skin=ResPathUtil.getIcon(bean.q_tiny_icon,EnumImageType.ITEM_40);
		if(id < 0){
			this._tip.type="TEXT";
			this._tip.data=bean.q_name+"："+StringFormat.formatNum(num,false);
		}
		else{
			var item=new ItemData();
			item.itemId=id;
			TipMgr.addTip(this.icon,this._tip);
			this._tip.type=TipUtil.getTipType(id);
			this._tip.data=item;
		}
	}

	__proto.update=function(){
		this._have=BagItemCenter.getItemCount(this._itemId);
		this.txt.text=StringFormat.formatMoney2(this._have)+'/'+StringFormat.formatMoney2(this._num);
		this.txt.color=this.itemEnough ? "#00ff00" :"#ef0605";
		this._width=this.txt.x+this.txt.width;
		if(this._btnAdd && this._btnAdd.visible){
			this._width+=10;
			this._btnAdd.x=this._width;
			this._width+=this._btnAdd.width;
		}
	}

	__getset(0,__proto,'itemId',function(){return this._itemId;});
	__getset(0,__proto,'have',function(){return this._have;});
	__getset(0,__proto,'btnVisible',null,function(value){
		if(this._btnAdd){
			this._btnAdd.visible=value;
		}
	});

	__getset(0,__proto,'itemEnough',function(){return this._have >=this._num;});
	__getset(0,__proto,'itemNum',function(){return this._num;});
	return ItemCostLabel3;
})(ItemCostLabel3UI)