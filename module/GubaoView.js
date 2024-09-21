/**
*
*@author Jian
*创建时间：2024-7-4
*/
//class com.modules.gubao.GubaoView extends ui.mobile.gubao.GubaoViewUI
var GubaoView=(function(_super){
	function GubaoView(){
		this._items=null;
		this._tabsImgs=null;
		this._effect=null;
		this._curr=null;
		this._c_tip=null;
		this._cost=null;
		this._sxd_id=0;
		GubaoView.__super.call(this);
		this.tabs_panel.vScrollBarAllwaysShow="off";
		this.r_suitTxt.scrollBarAllwaysShow="off";
		this.d_panel.vScrollBarAllwaysShow="off";
		this._tabsImgs=[];
		this._items=[];
		this._effect=GameEffect.getEffect();
		this._effect.move(296,226,this,0);
		this._c_tip=new TipData("GUBAO");
		TipMgr.addTip(this.c_icon,this._c_tip);
		var bean,tabStr='',types=Q_globalCenter.getJsonData(15156)["tabs_type"];
		for(var i=0;i < types.length;i++){
			bean=App.dataMgr.q_gubaoContainer.getBeans(types[i])[0];
			tabStr+=bean.q_title+',';
			this._tabsImgs.push(new Image());
			this._tabsImgs[i].pos(-8,-8);
		}
		this.tabs.labels=tabStr.substr(0,tabStr.length-1);
	}

	__class(GubaoView,'com.modules.gubao.GubaoView',_super);
	var __proto=GubaoView.prototype;
	Laya.imps(__proto,{"com.game.core.panel.ITabView":true})
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		TipMgr.removeTip(this.c_icon);
		this._tabsImgs=null;
		this._effect=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		var item;
		for(var $each_item in this._items){
			item=this._items[$each_item];
			item.on("click",this,this.onClick);
		}
		this.yijihuo.skin=ResPathUtil.getImageRes("yijihuo",".png","common");
		var len=0,day=ServerTime.getOpenDays();
		var opendays=Q_globalCenter.getJsonData(15156)["tabs_openday"];
		var showdays=Q_globalCenter.getJsonData(15156)["tabs_showday"];
		for(var i=0;i < opendays.length;i++){
			this.tabs.setItemVisibleByIndex(i,day >=showdays[i]);
			if(day >=showdays[i]){
				len++;
				(this.tabs.getItem(i)).disabledString(day < opendays[i] ? "开服第"+opendays[i]+"天开启" :null);
			}
		}
		this.tabs.width=len *108-2;
		this.tabs_panel.callChangeScroll();
		this.tabs.x=len < 5 ? this.tabs_panel.width-this.tabs.width >> 1 :0;
		this.tabs.on("change",this,this.onTab);
		this.get_way.on("click",this,this.onClick);
		this.btnTotal.on("click",this,this.onClick);
		this.btnUP.on("click",this,this.onClick);
		this.addEvent("ET.FUNCTION_TIP",this.updateRed);
		this.addEvent("GubaoCenter.UPDATE_TASK",this.update);
		this.addEvent("GubaoCenter.UPDATE",this.onActive);
		this.addEvent("Master.UPDATE",this.update);
		this.addEvent("Bag.CHANGE",this.onItemUpdate);
		this.updateRed(239);
	}

	__proto.hide=function(){
		EventMgr.removeAll(this);
		PanelManager.closeByClass(GubaoUPPanel);
		this.get_way.off("click",this,this.onClick);
		this.btnTotal.off("click",this,this.onClick);
		this.btnUP.off("click",this,this.onClick);
		this.tabs.off("change",this,this.onTab);
		this.tabs.selectedIndex=-1;
		this.yijihuo.skin=null;
		this._effect.stopAndHide();
		var item;
		for(var $each_item in this._items){
			item=this._items[$each_item];
			item.off("click",this,this.onClick);
		}
	}

	__proto.updateHead=function(){
		if(!this._curr)return;
		var bean=this._curr.bean;
		this.yijihuo.visible=GubaoCenter.isActive(bean.q_id);
		this.c_icon.visible=!this.yijihuo.visible;
		this.btnUP.visible=!this.yijihuo.visible;
		this.get_way.visible=this.btnUP.visible;
		if(this.btnUP.visible){
			this._cost=JSON.parse(bean.q_open_cost)[0];
			this.attrTxt.color="#b6b6b6";
			this.c_icon.skin=ResPathUtil.getIcon(ItemUtil.getIcon(this._cost.id),EnumImageType.ITEM_40);
			this._c_tip.data=this._cost.id;
			this.onItemUpdate([this._cost.id],false);
		}
		else{
			this.attrTxt.color="#00ff00";
		}
	}

	__proto.update=function(){
		if(!this._curr)return;
		if(this._curr.bean.q_master_type){
			var str,m_type=JSON.parse(this._curr.bean.q_master_type)[0];
			var beans=App.dataMgr.q_equip_masterContainer.getListByType(m_type);
			var task=GubaoCenter.getTask(this._curr.bean.q_type);
			var gb_bean=GubaoCenter.getTaskBean(this._curr.bean.q_type);
			var m_data=MasterCenter.getMasterDataByType(m_type);
			var m_level=m_data ? m_data.level :0;
			var color=m_level > 0 ? "#00ff00" :"#b6b6b6";
			var bean=beans[0];
			str=GameHTML.setColor(bean.q_suit_num+"件套","#50ade0")+"<br/>"+LazyUtil.getAttrStr(bean.q_add_attribute1,-1,null,true,color,color);
			bean=beans[1];
			str+="<br/>"+GameHTML.setColor(bean.q_suit_num+"件套","#50ade0");
			str+="<br/>"+bean.q_add_attribute_client;
			str+="<br/>"+GameHTML.setColor("当前累计：","#50ade0")+GameHTML.setColor(task.activationCount+"层","#fffffe");
			GlobalCenter.attributeDataBean.convert(gb_bean.q_add_attribute1);
			var attrObj=GlobalCenter.attributeDataBean.attributeObject;
			for(var pName in attrObj){
				attrObj[pName] *=task.activationCount;
			}
			str+="<br/>"+LazyUtil.getAttrStr(attrObj,0);
			if(this.getSxdLv(this._curr.bean.q_juexing)> 0){
				str+="<br/>"+GameHTML.setColor("觉醒属性：","#50ade0")+GameHTML.setColor("觉醒"+this.getSxdLv(this._curr.bean.q_juexing)+"级","#ffff00");
				str+="<br/>"+this.getShuxingdanAttrStr(this._curr.bean.q_juexing);
			}
			this.r_suitTxt.text=str;
			this.r_suitTxt.color=m_level > 1 ? "#00ff00" :"#b6b6b6";
			this.btnTotal.tag=m_type;
			this.totalTxt.text=task.activationCount+'/'+(task.extLimit+gb_bean.q_jiacheng_max);
			var red=task.count > 0 && (gb_bean.q_jiacheng_max==99999999 || task.activationCount < (gb_bean.q_jiacheng_max+task.extLimit));
			if(red){
				if(m_level > 1){
					this.btnTotal.showRedPoint(red);
				}
				else{
					this.btnTotal.showFlowEffect("btnEffect3");
				}
			}
			else{
				this.btnTotal.showRedPoint(false);
				this.btnTotal.hideFlowEffect();
			}
		}
		else{
			this.totalTxt.text='';
			this.r_suitTxt.text='';
		}
	}

	// btnTotal.visible=false;
	__proto.getSxdLv=function(sxdid){
		if(sxdid==0)
			return 0;
		var bean=App.dataMgr.q_shuxingdanContainer.getDataBean(sxdid,false);
		if(bean==null)
			return 0;
		var data=ShuxingdanCenter.getData(bean.q_id);
		if(data==null)
			return 0;
		return data.useCount;
	}

	__proto.getShuxingdanAttrStr=function(sxdid){
		if(sxdid==0)
			return "";
		var bean=App.dataMgr.q_shuxingdanContainer.getDataBean(sxdid,false);
		if(bean==null)
			return "";
		var data=ShuxingdanCenter.getData(bean.q_id);
		if(data==null)
			return "";
		var str="";
		var attrs=LazyUtil.getAttrList(bean.q_add_attribute1);
		for (var i=0;i < attrs.length;i++){
			var now=attrs[i];
			now.value=now.value *data.useCount;
			if(now.color){
				str+=GameHTML.setColor(LazyUtil.formatAttrName(now.name)+":&nbsp;"+now.value+now.isRatio,now.color);
			}
			else if(now.bean && now.bean.q_iszhizun > 0){
				str+=GameHTML.setColor(LazyUtil.formatAttrName(now.name)+":&nbsp;"+now.value+now.isRatio,GameColor.getColor(now.bean.q_color));
			}
			else{
				str+=GameHTML.setColor(LazyUtil.formatAttrName(now.name)+":&nbsp;","#968575")+now.value+now.isRatio;
			}
			if(i < attrs.length-1){
				str+="<br/>";
			}
		}
		return str;
	}

	__proto.onClick=function(e){
		if(e.currentTarget==this.btnUP){
			GubaoCenter.sendC2S_GubaoActivationMessage(this._curr.bean.q_id);
		}
		else if(e.currentTarget==this.btnTotal){
			PanelManager.openByClass(GubaoUPPanel,this._curr.bean,this._curr.bean.q_type);
		}
		else if(e.currentTarget==this.get_way){
			PanelOpenManager.openGetway(this._cost.id,this.get_way);
		}
		else if((e.currentTarget instanceof com.modules.gubao.GubaoItem )){
			this._curr=e.currentTarget;
			this._curr.addChild(this.d_select);
			this.attrTxt.text=LazyUtil.getAttrStr(this._curr.bean.q_add_attribute1);
			this.nameImg.skin=ResPathUtil.getImageRes(this._curr.bean.q_show_id,".png","gubao");
			this._effect.url=ResPathUtil.getPanelEffect(this._curr.bean.q_show_id,"gubao");
			this._effect.restart();
			this.updateHead();
		}
	}

	__proto.onTab=function(e){
		var beans=App.dataMgr.q_gubaoContainer.getBeans(Q_globalCenter.getJsonData(15156)["tabs_type"][this.tabs.selectedIndex]);
		if(!beans)return;
		var item,temp1,temp2;
		for(var i=0;i < beans.length-1;i++){
			if(i < this._items.length){
				item=this._items[i];
			}
			else{
				item=new GubaoItem();
				item.on("click",this,this.onClick);
				item.x=i *100;
				this._items.push(item);
			}
			if(!item.parent){
				this.d_panel.content.addChild(item);
			}
			if(item.update(beans[i+1])){
				if(!temp1 && item.isRedPoint){
					temp1=item;
				}
				if(!temp2){
					temp2=item;
				}
			}
		}
		for(;i < this._items.length;i++){
			this._items[i].removeSelf();
		}
		this.d_panel.refresh();
		if(!temp1){
			temp1=temp2 ? temp2 :this._items[0];
		}
		Event.EMPTY.setTo("click",temp1,temp1);
		this.onClick(Event.EMPTY);
		this.d_panel.scrollTo(temp1.x);
		this.update();
		var bean=beans[0];
		this._sxd_id=bean.q_juexing;
		this.r_icon.skin=ResPathUtil.getIcon(bean.q_show_id,EnumImageType.ITEM_56);
		this.r_nameTxt.text=bean.q_name;
		this.r_desTxt.text=bean.q_desc;
		this.r_suitTxt.y=this.r_desTxt.y+this.r_desTxt.height;
		this.r_suitTxt.height=560-this.r_suitTxt.y;
	}

	__proto.onItemUpdate=function(ids,bool){
		(bool===void 0)&& (bool=true);
		if(this.c_icon.visible && ids.indexOf(this._cost.id)>=0){
			var have=BagItemCenter.getItemCount(this._cost.id);
			this.c_txt.text=have+'/'+this._cost.num;
			this.c_txt.tag=have < this._cost.num;
			this.c_txt.color=this.c_txt.tag ? "#ef0605" :"#00ff00";
			this.c_icon.x=this.btnUP.x-(this.c_icon.width+this.c_txt.width-46 >> 1);
			this.btnUP.showRedPoint(!this.c_txt.tag);
			this.btnUP.disabledString(this.c_txt.tag ? "消耗不足" :null);
		}
		if(bool){
			var item;
			for(var $each_item in this._items){
				item=this._items[$each_item];
				if(item.parent){
					item.updateRed();
				}
			}
		}
	}

	__proto.onSxd=function(){}
	__proto.updateRed=function(funId,value){
		(value===void 0)&& (value=false);
		if(funId==239){
			var index1=-1,index2=-1;
			var res=ResPathUtil.getImageRes("yijihuo_tab",".png","gubao");
			var types=Q_globalCenter.getJsonData(15156)["tabs_type"];
			for(var i=0;i < types.length;i++){
				if(this.tabs.getItemVisibleByIndex(i)){
					this.tabs.showRedPointByIndex(i,GubaoCenter.isTabRed(types[i]),92);
					if(GubaoCenter.isAllActive(types[i])){
						this._tabsImgs[i].skin=res;
						(this.tabs.getItem(i)).addChild(this._tabsImgs[i]);
					}
					else{
						this._tabsImgs[i].removeSelf();
						if(index1 < 0){
							index1=i;
						}
					}
					index2=i;
				}
			}
			if(this.tabs.selectedIndex < 0){
				if(index1 < 0){
					index1=index2;
				}
				index2=this.tabs.getRedPointFirstIndex();
				this.tabs.selectedIndex=index2 < 0 ? index1 :index2;
				this.tabs_panel.scrollTo(this.tabs.selectedIndex *108);
			}
		}
	}

	__proto.onActive=function(){
		this._curr.update();
		this.updateHead();
	}

	return GubaoView;
})(GubaoViewUI)