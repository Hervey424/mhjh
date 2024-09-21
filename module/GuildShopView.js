var GuildShopView=(function(_super){
	function GuildShopView(view){
		this._view=null;
		GuildShopView.__super.call(this);
		this._view=view;
		this.pos(-6,-41);
		this.list.spaceX=8;
		this.list.spaceY=6;
		this.list.size(560,416);
		this.bg.removeSelf();
		this._shopPage=1;
		this._shopType=12;
		view.m_nameTxt.text=EnumMoney.getName(EnumMoney.GUILD_HUOYUE_SELF)+"：";
		view.m_icon.skin=EnumMoney.getIcon(EnumMoney.GUILD_HUOYUE_SELF);
		view.m_icon.x=view.m_nameTxt.x+view.m_nameTxt.width-4;
		view.m_txt.x=view.m_icon.x+30;
	}

	__class(GuildShopView,'com.modules.guild.view.GuildShopView',_super);
	var __proto=GuildShopView.prototype;
	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=0);
		this._init=true;
		this.r_bg.skin=ResPathUtil.getImageRes("r_mallbg",".jpg","mall");
		this.addEvent("USI",this.onUpdateItem);
		this.addEvent("ShopEvent.SELECT_ITEM",this.onSelectItem);
		this.addEvent("PE.JING_JIE",this.onJingjie);
		this.addEvent("MoneyEvent.CHANGE",this.onMoney);
		this._view.m_btnGet.on("click",this,this.onClick);
		this.add10_btn.on("click",this,this.onClick);
		this.sub10_btn.on("click",this,this.onClick);
		this.sub_btn.on("click",this,this.onClick);
		this.add_btn.on("click",this,this.onClick);
		this.buy_btn.on("click",this,this.onClick);
		this.txt.on("change",this,this.onChange);
		this.onMoney(EnumMoney.GUILD_HUOYUE_SELF,MoneyCenter.getMoney(EnumMoney.GUILD_HUOYUE_SELF));
		this.onList(this._shopType);
	}

	__proto.hide=function(){
		_super.prototype.hide.call(this);
		this._view.m_btnGet.on("click",this,this.onClick);
	}

	__proto.onMoney=function(type,value){
		(value===void 0)&& (value=0);
		if(type==EnumMoney.GUILD_HUOYUE_SELF){
			this._view.m_txt.text=StringFormat.formatNum(value);
			this._view.m_btnGet.x=this._view.m_txt.x+this._view.m_txt.width+10;
		}
	}

	__proto.onClick=function(e){
		if(e.currentTarget==this._view.m_btnGet){
			PanelOpenManager.openGetway(EnumMoney.GUILD_HUOYUE_SELF,e.currentTarget);
		}
		else{
			_super.prototype.onClick.call(this,e);
		}
	}

	return GuildShopView;
})(MallShopView)