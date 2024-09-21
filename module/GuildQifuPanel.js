var GuildQifuPanel=(function(_super){
	function GuildQifuPanel(){
		this._view=null;
		this._num=null;
		this._barMax=0;
		this._barWidth=0;
		this._guide=null;
		GuildQifuPanel.__super.call(this);
	}

	__class(GuildQifuPanel,'com.modules.guild.GuildQifuPanel',_super);
	var __proto=GuildQifuPanel.prototype;
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._view=null;
		this._num=null;
		_super.prototype.destroy.call(this);
	}

	__proto.init=function(){
		this._view=new GuildQifuPanelUI();
		this.addChild(this._view);
		this._num=NumberBitmap.show("2");
		this._num.move(100,98,this);
		this._num.scale(1.2,1.2);
		this._barWidth=this._view.bar.width;
		var arr=Q_globalCenter.getJsonData(525);
		this._barMax=arr[arr.length-1]["active"];
		var active=0;
		for(var i=0;i < 5;i++){
			active=arr[i]["active"];
			this._view["txt"+i].text=active+"";
			this._view["reward"+i].x=this._view.bar.x+active / this._barMax *this._barWidth-50;
			new ButtonLightEffect(this._view["box"+i]);
			var str="";
			for(var j=0;j < arr[i]["reward"].length;j++){
				if(str.length > 0){
					str+="\n";
				};
				var obj=arr[i]["reward"][j];
				var color=ItemUtil.getItemNameColor(obj["id"]);
				var name=ItemUtil.getItemName(obj["id"]);
				str+=GameHTML.setColor(name+"×"+obj["num"],color);
			};
			var tip=new TipData("TEXT",str);
			tip.tipGapH=5;
			tip.tipGapV=5;
			TipMgr.addTip(this._view["reward"+i],tip);
		}
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		_super.prototype.show.call(this);
		PanelCloseMgr.add(this);
		for(var i=0;i < 5;i++){
			this._view["box"+i].on("click",this,this.onReward);
		}
		this._view.btn1.on("click",this,this.onClick);
		this._view.btn2.on("click",this,this.onClick);
		this._view.btn3.on("click",this,this.onClick);
		this._view.btn4.on("click",this,this.onClick);
		this._view.link2.on("click",this,this.onClick);
		this._view.link3.on("click",this,this.onClick);
		this.addEvent("MoonCardCenter.ACTIVE",this.onMoonCard);
		this.addEvent("ET.MONEY_CHANGE",this.onDayMoney);
		this.addEvent("MoneyEvent.CHANGE",this.onMoneyChange);
		this.onMoneyChange(EnumMoney.GUILD_QIFU);
		this.addEvent("GuildEvent.QIFU_JUAN_XIAN",this.updateByType);
		if(GuildQifuCenter.isHasData){
			this.onRefresh();
			}else{
			this.addEvent("GuildEvent.QIFU_INFO",this.onRefresh);
			GuildQifuCenter.sendC2S_GetGuildCliffordInfoMessage();
		}
		if(App.needGuide(19,false)){
			if(!this._guide){
				this._guide=Guide.getGuide();
			}
			this._guide.showEffect2(this._view.btn1);
		}
	}

	__proto.hide=function(){
		_super.prototype.hide.call(this);
		for(var i=0;i < 5;i++){
			this._view["box"+i].off("click",this,this.onReward);
		}
		this._view.btn1.off("click",this,this.onClick);
		this._view.btn2.off("click",this,this.onClick);
		this._view.btn3.off("click",this,this.onClick);
		this._view.btn4.off("click",this,this.onClick);
		this._view.link2.off("click",this,this.onClick);
		this._view.link3.off("click",this,this.onClick);
		EventMgr.removeAll(this);
		if(this._guide){
			TaskAuto.taskAutoOrStop(false,false,this.className);
			PanelManager.removePanel(PanelRegister.GUILD);
			this._guide.hide();
			this._guide=null;
		}
	}

  __proto.onReward = function (e) {
		var index=myparseInt(e.target.name);
		if(ByteUtils.readBit(GuildQifuCenter.record,index)==0){
			GuildQifuCenter.sendC2S_GuildQiandaoMessage(index);
		}
	}

	__proto.onClick=function(e){
		if(e.currentTarget==this._view.link2){
			PanelOpenManager.openZanzhu();
			return;
		}
		if(e.currentTarget==this._view.link3){
			PanelOpenManager.openVIP(null,0);
			return;
		};
		var type=myparseInt(e.target.name);
		var bean=App.dataMgr.q_building_juanxianContainer.getDataBean(type,false);
		if(bean){
			if(GuildQifuCenter.isFree(type)){
				GuildQifuCenter.sendC2S_BuildDonateMessage(type);
				if(this._guide){
					this.doCloseGuide(this._guide,null);
				}
			}
			else if(App.isMoneyEnoughJson(bean.q_currency_type)){
				GuildQifuCenter.sendC2S_BuildDonateMessage(type);
				if(this._guide){
					this.doCloseGuide(this._guide,null);
				}
			}
		}
	}

	__proto.onMoonCard=function(){
		this.updateByType(2);
	}

	__proto.onDayMoney=function(){
		this.updateByType(3);
	}

	__proto.onMoneyChange=function(type,value){
		(value===void 0)&& (value=0);
		if(type==EnumMoney.GUILD_QIFU){
			value=MoneyCenter.getMoney(type);
			this._num.show(value+"");
			this._view.bar.scaleX=value >=this._barMax ? 1 :(value / this._barMax);
			type=GuildQifuCenter.record;
			for(var i=0;i < 5;i++){
				var bool=ByteUtils.readBit(type,i)==1;
				this._view["yilingqu"+i].visible=bool;
				var box=this._view["box"+i];
				if(bool){
					box.disabled=false;
					box.showRedPoint(false);
					}else{
					if(value >=myparseInt(this._view["txt"+i].text)){
						box.disabled=false;
						box.showRedPoint(true);
						}else{
						box.disabled=true;
						box.showRedPoint(false);
					}
				}
			}
		}
	}

	__proto.updateByType=function(i,result){
		(result===void 0)&& (result=1);
		if(result==1){
			var bean=App.dataMgr.q_building_juanxianContainer.getDataBean(i,false);
			if(bean){
				var ui;
				var info=GuildQifuCenter.getInfo(i);
				if(info && info.cliffordTimes >=bean.q_times){
					this._view["ylq"+i].visible=true;
					this._view["money_txt"+i].text="";
					ui=this._view["btn"+i];
					if(ui){
						ui.visible=false;
					}
					ui=this._view["link"+i];
					if(ui){
						ui.visible=false;
					}
					ui=this._view["free_txt"+i];
					if(ui){
						ui.text="";
					}
				}
				else{
					this._view["ylq"+i].visible=false;
					if(bool){
						this._view["money_txt"+i].text="免费";
					}
					else{
						this._view["money_txt"+i].text=bean.q_info_spare;
					}
					ui=this._view["btn"+i];
					if(ui){
						ui.visible=true;
						var bool=GuildQifuCenter.isFree(i);
						ui.showRedPoint(bool);
					}
					ui=this._view["link"+i];
					if(ui){
						ui.visible=true;
						ui.label=bean.q_reward_show_special;
						ui.x=186-ui.width >> 1;
					}
					ui=this._view["free_txt"+i];
					if(ui){
						if(bean.q_times > 1){
							ui.text="剩余祈福次数："+GameHTML.setColor((bean.q_times-(info ? info.cliffordTimes :0)),"#00ff00");
							}else{
							ui.text="";
						}
					}
				}
			}
		}
	}

	__proto.onRefresh=function(){
		var obj;
		var item;
		var items;
		var bean;
		for(var i=1;i < 5;i++){
			item=this._view["item"+i];
			bean=App.dataMgr.q_building_juanxianContainer.getDataBean(i,false);
			if(bean){
				if(bean.q_items){
					items=item.getChildByName("sil");
					if(!items){
						items=new ShowItemListBigGrid(8,item,21,66);
						items.name="sil";
					};
					var arr=JSON.parse(bean.q_items);
					items.showArr(arr,false,-1,1,2);
					item.getLabelByName("item1_txt").showObject(arr[0],"","",true,false);
					item.getLabelByName("item2_txt").showObject(arr[1],"","",true,false);
					item.getLabelByName("item3_txt").showObject(arr[2],"","",true,false);
				}
				this.updateByType(i);
			}
		}
	}

	return GuildQifuPanel;
})(BasePanel)