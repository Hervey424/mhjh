var SetupGuajiView=(function(_super){
	function SetupGuajiView(){
		this._guaji_slider=null;
		this._ranks=null;
		this._wajues=null;
		SetupGuajiView.__super.call(this);
		this._guaji_slider=new AutoSlider(400,this,230,this.guaji_txt.y,200);
		if(Browser.onPC){
			this.btnGou8.visible=false;
		};
		var yb=EnumMoney.getName(EnumMoney.BIND_YUAN_BAO);
		this.btnGou1.label="自动拾取"+EnumMoney.getName(EnumMoney.BIND_JIN_BI);
		this.btnGou2.label="自动拾取"+EnumMoney.getName(EnumMoney.MONEY90);
		this.btnGou4.label="自动拾取"+yb;
		this.btnGou12.text.htmlText="自动反击玩家"+GameHTML.setColor("(仅野外地图生效)","#fffffe");
		this.btnGou11.label=ItemUtil.getItemName(18181)+"不足时使用"+yb+"（每个50"+yb+"）";
		this.wajueCombo.labels="最多5次,最多10次,最多20次,不限";
		this._wajues=[5,10,20,9999];
		this._ranks=JSON.parse(App.dataMgr.q_globalContainer.getDataBean(15097).q_string_value);
		var btnStr='';
		for(var i=0;i < this._ranks.length;i++){
			btnStr+=this._ranks[i]+"阶,";
		}
		this.btn_rank.labels=btnStr.substr(0,btnStr.length-1);
		TipMgr.addTip(this.btnGou7,new TipData("TEXT",StringFormat.getSubstitute(TipDescUtil.getTextTipDesc(142),App.dataMgr.q_globalContainer.getDataBean(204).q_int_value *0.001)));
	}

	__class(SetupGuajiView,'com.modules.setup.SetupGuajiView',_super);
	var __proto=SetupGuajiView.prototype;
	Laya.imps(__proto,{"com.modules.setup.IReset":true})
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		TipMgr.removeTip(this.btnGou7);
		this._guaji_slider=null;
		this._ranks=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.reset=function(isSend){
		(isSend===void 0)&& (isSend=false);
		if(isSend){
			SetupCenter.instance.reset3(true);
		}
		this.btnGou1.selected=EnumSetup.isGou(23);
		this.btnGou2.selected=EnumSetup.isGou(24);
		this.btnGou3.selected=EnumSetup.isGou(25);
		this.btnGou4.selected=EnumSetup.isGou(26);
		this.btnGou5.selected=EnumSetup.isGou(27);
		this.btnGou6.selected=EnumSetup.getValue(1007)==3;
		this.btnGou7.selected=EnumSetup.isGou(28);
		this.btnGou8.selected=EnumSetup.isGou(29);
		this.btnGou9.selected=EnumSetup.isGou(35);
		this.btnGou12.selected=EnumSetup.isGou(37);
		this.guaji_txt.text="挂机范围"+GameHTML.setColor(EnumSetup.getValue(1009),"#00ff00")+"步";
		this.btn_rank.selectedIndex=this._ranks.indexOf(EnumSetup.getValue(1006));
		this._guaji_slider.value=EnumSetup.getValue(1009);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		for(var i=1;i <=12;i++){
			(this ["btnGou"+i]).on("click",this,this.onClick);
		}
		this.btn_rank.on("change",this,this.onChange);
		this.wajueCombo.on("change",this,this.onChange);
		this._guaji_slider.on("change",this,this.onChange);
		this.reset();
		this.btnGou10.selected=SetupCenter.instance.autoWajue;
		this.btnGou11.selected=SetupCenter.instance.autoBuyWajue;
		this.wajueCombo.selectedIndex=this._wajues.indexOf(SetupCenter.instance.wajueCount);
	}

	__proto.hide=function(){
		for(var i=1;i <=12;i++){
			(this ["btnGou"+i]).off("click",this,this.onClick);
		}
		this.btn_rank.off("change",this,this.onChange);
		this.wajueCombo.off("change",this,this.onChange);
		this._guaji_slider.off("change",this,this.onChange);
	}

  __proto.onClick = function (e) {
		if(e.currentTarget==this.btnGou6){
			EnumSetup.save(1007,this.btnGou6.selected ? 3 :2);
			return;
		}
		if(e.currentTarget==this.btnGou10){
			SetupCenter.saveClient("85",this.btnGou10.selected);
			return;
		}
		if(e.currentTarget==this.btnGou11){
			SetupCenter.saveClient("87",this.btnGou11.selected);
			return;
		};
		var id=0,gou=e.currentTarget;
		switch(gou){
			case this.btnGou1:
				id=23;
				break ;
			case this.btnGou2:
				id=24;
				break ;
			case this.btnGou3:
				id=25;
				break ;
			case this.btnGou4:
				id=26;
				break ;
			case this.btnGou5:
				id=27;
				break ;
			case this.btnGou7:
				id=28;
				break ;
			case this.btnGou8:
				id=29;
				break ;
			case this.btnGou9:
				id=35;
				break ;
			case this.btnGou12:
				id=37;
				break ;
			}
		if(id > 0){
			EnumSetup.save(id,gou.selected ? 1 :0);
		}
	}

  __proto.onChange = function (e) {
		if(e.currentTarget==this.btn_rank){
			this.btn_rank.button.label=this._ranks[this.btn_rank.selectedIndex]+"阶及以上";
			EnumSetup.save(1006,this._ranks[this.btn_rank.selectedIndex]);
		}
		else if(e.currentTarget==this.wajueCombo){
			SetupCenter.saveClient("86",this._wajues[this.wajueCombo.selectedIndex]);
		}
		else{
			EnumSetup.save(1009,this._guaji_slider.value);
			this.guaji_txt.text="挂机范围"+GameHTML.setColor(this._guaji_slider.value,"#00ff00")+"步";
		}
	}

	return SetupGuajiView;
})(SetupGuajiViewUI)