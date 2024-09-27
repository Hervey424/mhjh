/**
*当前地图
*@author 胡剑
*创建时间：2016-5-31 下午3:30:56
*
*/
//class com.modules.kmap.view.MapView extends ui.mobile.map.view.MapViewUI
var MapView=(function(_super){
	function MapView(){
		this._pkFlag=null;
		this._container=null;
		this._upLayer=null;
		// 存放名字，在上层
		this._topLayer=null;
		// private var _rightMask:Image;
		this._mapBitmap=null;
		// private var _mapLoader:NetResourceLoader;
		this._pointWayContainer=null;
		// 寻路路线
		this._myCountryPlayerContainer=null;
		// 本国国家成员
		this._monsterContainer=null;
		// 怪物
		this._monsterDict=null;
		this._bossContainer=null;
		// BOSS
		this._bossPool=null;
		this._teamTxt=null;
		this._teamContainer=null;
		// 队友
		this._teamDict=null;
		this._holdContainer=null;
		// 据点和NPC
		this._holdPool=null;
		this._npcPool=null;
		this._transferContainer=null;
		// 传送门
		this._transferPool=null;
		this._r_grid=null;
		this._myIcon=null;
		this._posText=null;
		this._scaleW=1;
		this._scaleH=1;
		this._mapName="";
		this._npcs=null;
		this._doors=null;
		/**跨服战场小地图显示区服*/
		this._serverIdVec=null;
		//----------------------------------------服战小地图信息-----------------------
		this._fuzhanVec=null;
		this._cs_cd=0;
		this._guide=null;
		MapView.__super.call(this);
		this.flag_box.removeSelf();
		this._npcs=[];
		this._doors=[];
		this._container=new BaseSprite();
		this.addChild(this._container);
		this._upLayer=new BaseSprite();
		this.addChild(this._upLayer);
		this._topLayer=new BaseSprite();
		this.addChild(this._topLayer);
		this._mapBitmap=new Image();
		this._container.addChild(this._mapBitmap);
		this._mapBitmap.mouseEnabled=true;
		this._monsterDict={};
		this._monsterContainer=new BaseSprite();
		this._container.addChild(this._monsterContainer);
		this._bossContainer=new BaseSprite();
		this._container.addChild(this._bossContainer);
		this._bossPool=[];
		this._myCountryPlayerContainer=new BaseSprite();
		this._container.addChild(this._myCountryPlayerContainer);
		this._teamDict={};
		this._teamContainer=new BaseSprite();
		this._container.addChild(this._teamContainer);
		this._holdContainer=new BaseSprite();
		this._container.addChild(this._holdContainer);
		this._holdPool=[];
		this._npcPool=[];
		this._transferContainer=new BaseSprite();
		this._container.addChild(this._transferContainer);
		this._transferPool=[];
		this._pointWayContainer=new BaseSprite();
		this._topLayer.addChild(this._pointWayContainer);
		var img=new Image(ResPathUtil.getImageRes("0",".png","main/map"),false);
		this._myIcon=new BaseSprite();
		img.move(-11,-18,this._myIcon);
		this._topLayer.addChild(this._myIcon);
		this._pkFlag=new PKFlag();
		this._pkFlag.move(33,102,this);
		this.addChild(this.pk_txt);
		this._posText=new FText(false);
		this._posText.fontSize=16;
		this._posText.filter=true;
		this._container.addChild(this._posText);
		this._r_grid=new ItemGrid(null,EnumImageType.ITEM_56,66);
		this.r_grid.addChild(this._r_grid);
		this.r_list.renderHandler=GameHandler.create(this,this.renderFunc);
		this.r_list.scrollBarAllwaysShow="on";
		this.r_list.itemRender=MapNpcItem;
		TipMgr.addTip(this.pos_btn,new TipData("TEXT","<font color='#D1C0A6'>发送自己当前位置至聊天框</font>"));
	}

	__class(MapView,'com.modules.kmap.view.MapView',_super);
	var __proto=MapView.prototype;
	Laya.imps(__proto,{"com.game.core.panel.ITabView":true})
	__proto.renderFunc=function(cell,index){
		if(index < this.r_list.array.length){
			(cell).setInfo(this.r_list.array[index],index);
		}
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=0);
		this._r_grid.itemId=EnumEquipType.getDefaultId(1017);
		this.addEvent("ET.change_map_finish",this.onMapChange);
		this.addEvent("CountryWarEvent.MAP_WARN",this.onMapWarn);
		this.addEvent("ET.WAYPOINT",this.onShowPointLine);
		this.addEvent("ET.WAYPOINT_REMOVE",this.onShowPointLine2);
		this.addEvent("ET.character_update_position",this.onCharacterUpdatePosition);
		this.addEvent("ET.UPDATE_MONSTER_POS",this.onUpdateMonster);
		this.addEvent("ET.CREATE_MONSTER",this.onCreateMonster);
		this.addEvent("ET.DELETE_MONSTER",this.onDeleteMonster);
		this.addEvent("TeamEvent.UPDATE",this.onUpdateMember);
		this.addEvent("TeamEvent.radar_removeAllMember",this.onRemoveAllMembers);
		this.addEvent("FightBossEvent.ALIVE_DEAD",this.onBossChange);
		this.addEvent("CountryWarEvent.STRONGHOLD_CHANGE",this.onStrongHoldNumChange);
		this.addEvent("LianyuCenter.UPDATE_ZONE",this.updateBoss);
		this.addEvent("SkillCenter.SKILL_PASS_ACTIVE",this.onPassCD);
		this.addEvent("SkillCenter.SKILL_PASS_CD",this.onPassCD);
		this.addEvent("WanyaoCenter.NPC_UPDATE",this.updateNpc);
		this._container.on("mousemove",this,this.onMapMouse);
		this._container.on("mouseout",this,this.onMapMouse);
		this._container.on("click",this,this.onMapMouse);
		this.r_gTxt.on("click",this,this.onClick);
		this.pos_btn.on("click",this,this.onClick);
		this.city_btn.on("click",this,this.onClick);
		this.suiji_btn.on("click",this,this.onClick);
		this.onMapChange();
		this.showKuafuServerIdName();
		this.showFuzhanMapInfo();
		this.onPassCD(7601);
	}

	__proto.hide=function(){
		EventMgr.removeAll(this);
		Laya.workerTimer.clear(this,this.onCsTimer);
		this._container.off("mousemove",this,this.onMapMouse);
		this._container.off("mouseout",this,this.onMapMouse);
		this._container.off("click",this,this.onMapMouse);
		this.r_gTxt.off("click",this,this.onClick);
		this.pos_btn.off("click",this,this.onClick);
		this.city_btn.off("click",this,this.onClick);
		this.suiji_btn.off("click",this,this.onClick);
		this.recycle();
		this._posText.text='';
		this.removeBoss();
		this.removeKuafuServerIdName();
		this.removeFuzhanInfo();
		this.removeSelf();
		this.onRadarGuide(false);
	}

	// }
	__proto.onStrongHoldNumChange=function(value){
		this.txt1.text=GameHTML.setColor(CountryWarCenter.getCountryName(1)+"旗帜数：",CountryWarCenter.getCountryHtmlColor(1))+CountryWarCenter.getCountryInfo(1).occupyNum;
		this.txt2.text=GameHTML.setColor(CountryWarCenter.getCountryName(2)+"旗帜数：",CountryWarCenter.getCountryHtmlColor(2))+CountryWarCenter.getCountryInfo(2).occupyNum;
		this.txt3.text=GameHTML.setColor(CountryWarCenter.getCountryName(3)+"旗帜数：",CountryWarCenter.getCountryHtmlColor(3))+CountryWarCenter.getCountryInfo(3).occupyNum;
	}

	__proto.onMapChange=function(){
		this.onRemoveAllMembers();
		var role=App.role;
		if(role !=null){
			var bean=role.mapBean;
			if(bean !=null){
				if(MapUtil.isCountryMap(bean)&& CountryWarCenter.isCountryKuafu()){
					this.onStrongHoldNumChange();
					this.addChild(this.flag_box);
				}
				else{
					this.flag_box.remove();
				}
				this._mapName=GameUtils.getMapName(role.mapId);
				this.name_txt.text=this._mapName;
				this.pos_txt.text="("+role.nodex+","+role.nodey+")";
				this.pos_txt.x=this.name_txt.x+this.name_txt.width;
				var isUse=!bean.q_item_sotp || JSON.parse(bean.q_item_sotp).indexOf(101017001)< 0;
				var arr=this._pkFlag.update();
				this.pk_txt.text=arr[0];
				this.pk_txt.color=arr[1];
				this.use_txt.color=isUse ? "#00ff00" :"#ef0605";
				this.use_txt.text=isUse ? "传送特权：点击地图可直接到达" :"传送特权：本地图禁用";
				var url=ResPathUtil.getMKeyMapDataPreview(bean.q_mapresid);
				this._mapBitmap.texture=BaseResLoader.getResLoaded(url);
				this.onComplete();
			}
		}
	}

	__proto.onComplete=function(){
		var bmd=this._mapBitmap.texture;
		if(!bmd)return;
		var role=App.role;
		var bean=GameUtils.getMapConfigData(role.mapId);
		var maxWidth=680;
		var maxHeight=456;
		var maxScaleX=bmd.width >=maxWidth ? maxWidth / bmd.width :1;
		var maxScaleY=NaN;
		var h=bmd.height *maxScaleX;
		if(h > maxHeight){
			maxScaleY=bmd.height >=maxHeight ? maxHeight / bmd.height :1;
			maxScaleY=Math.min(maxScaleX,maxScaleY);
			maxScaleX=maxScaleY;
		}
		else{
			maxScaleY=maxScaleX;
		}
		this._container.width=bmd.width *maxScaleX;
		this._container.height=bmd.height *maxScaleY;
		this._mapBitmap.scaleX=maxScaleX;
		this._mapBitmap.scaleY=maxScaleY;
		this._container.x=this.mapbg.x+(this.mapbg.width-bmd.width *maxScaleX >> 1);
		this._container.y=this.mapbg.y+(this.mapbg.height-bmd.height *maxScaleY >> 1);
		this._upLayer.pos(this._container.x,this._container.y);
		this._topLayer.pos(this._container.x,this._container.y);
		this._scaleW=bmd.width / bean.q_map_width *maxScaleX;
		this._scaleH=bmd.height / bean.q_map_height *maxScaleY;
		this._npcs.length=0;
		this._doors.length=0;
		this.updateNpc();
		this.updateTransport();
		this.updateBoss();
		var npcs=[];
		for(var i=0;i < this._npcs.length;i++){
			if(this._npcs[i].q_newtype==0){
				npcs.push(this._npcs[i]);
			}
			else{
				this._doors.push(this._npcs[i]);
			}
		}
		if(npcs.length > 1){
			npcs=npcs.sort(SortTools.sortByFlash("q_priority",16 | 2));
		}
		if(this._doors.length > 1){
			this._doors=this._doors.sort(SortTools.sortByFlash("q_priority",16 | 2));
		}
		for(i=0;i < npcs.length;i++){
			this._doors.push(npcs[i]);
		}
		this.r_list.array=this._doors;
		this.onCharacterUpdatePosition(role.map_x,role.map_y);
		this.onShowPointLine(RadarCenter.wayPoints);
		this._monsterDict={};
		this.recycle(1);
		var values=App.mapModule.mapAvatarModel.monsterHash.values;
		var monster;
		for(var $each_monster in values){
			monster=values[$each_monster];
			this.onCreateMonster(monster);
		};
		var memberList=TeamCenter.memberList;
		if(memberList !=null && !EnumZoneClientType.isInYanwuChang()){
			for(i=0;i < memberList.length;i++){
				this.onUpdateMember(memberList[i]);
			}
		}
		else{
			this.onRemoveAllMembers();
		}
		BossCommandSender.sendC2S_AliveWildBossMessage([role.mapId]);
	}

	__proto.onClick=function(event){
		var itemId=0;
		switch(event.currentTarget){
			case this.pos_btn:{
					EventMgr.dispatch("CE.set_position");
					break ;
				}
			case this.r_gTxt:
				PlatformCenter.gotoPay();
				break ;
			case this.city_btn:{
					itemId=8151;
					break ;
				}
			case this.suiji_btn:{
					itemId=8152;
					break ;
				}
			}
		if(itemId > 0){
			if(BagItemCenter.getItemCount(itemId,true)> 0){
				ItemUseManager.useItemByItemId(itemId);
			}
			else{
				QuickBuyPromptPanel.show(App.dataMgr.q_itemContainer.getDataBean(itemId).q_shop_id);
			}
		}
	}

	__proto.onMapMouse=function(e){
		if(e.type=="mouseout"){
			this._posText.text='';
		}
		else{
			var tempP=this.globalToLocal(new Point(e.stageX-this._container.x,e.stageY-this._container.y));
			var xpos=Math.floor(tempP.x / this._scaleW / MapConfig.MAP_NODE_WIDTH);
			var ypos=Math.floor(tempP.y / this._scaleH / MapConfig.MAP_NODE_HEIGHT);
			if(e.type=="mousemove"){
				this._posText.text=xpos+","+ypos;
				this._posText.x=this.mouseX-this._posText.width *0.5-this._container.x;
				this._posText.y=this.mouseY-this._posText.height-this._container.y;
				if(this._posText.x < 0){
					this._posText.x=0;
				}
				if(this._posText.x+this._posText.width > this._container.width){
					this._posText.x=this._container.width-this._posText.width;
				}
				if(this._posText.y < 0){
					this._posText.y=0;
				}
			}
			else if(e.type=="click" && !GameUtils.isDead()){
				var xy=this.getClickPos(e);
				this.gotoWhere(xy[0],xy[1],xy[2],e.ctrlKey);
			}
		}
	}

	__proto.getClickPos=function(e){
		var tp=null,xpos=0,ypos=0,func=null;
		if(e.currentTarget.name=="bossname"){
			tp=e.currentTarget.tag;
			}else{
			tp=e.target.parent2;
		}
		if((tp instanceof com.modules.kmap.item.BossSign )){
			xpos=Math.floor((tp.x+tp.width / 2)/ this._scaleW / MapConfig.MAP_NODE_WIDTH);
			ypos=Math.floor((tp.y+tp.height / 2)/ this._scaleH / MapConfig.MAP_NODE_HEIGHT);
			func=GameHandler.create(App,App.openAutoFight,[tp.tag]);
			if(this._guide && tp==this._guide.tag){
				SetupCenter.instance.map_guide((tp).rankLv,true);
			}
			}else if((tp instanceof com.modules.kmap.item.TransferShape )){
			xpos=Math.floor((tp.x+tp.width / 2)/ this._scaleW / MapConfig.MAP_NODE_WIDTH);
			ypos=Math.floor((tp.y+tp.height / 2)/ this._scaleH / MapConfig.MAP_NODE_HEIGHT);
			}else{
			var tempP=this.globalToLocal(new Point(e.stageX-this._container.x,e.stageY-this._container.y));
			xpos=Math.floor(tempP.x / this._scaleW / MapConfig.MAP_NODE_WIDTH);
			ypos=Math.floor(tempP.y / this._scaleH / MapConfig.MAP_NODE_HEIGHT);
		}
		return [xpos,ypos,func];
	}

	__proto.gotoWhere=function(xpos,ypos,func,ctrlKey){
		(xpos===void 0)&& (xpos=0);
		(ypos===void 0)&& (ypos=0);
		(ctrlKey===void 0)&& (ctrlKey=false);
		var mapId=App.role.mapId;
		if(ctrlKey && GameConfig.isDebug){
			ChatCommandSender.sendChatRequestMessage(0,"@changemap id:"+mapId+",mid:"+mapId+",x:"+xpos+",y:"+ypos,"");
		}
		else{
			var skill=SkillCenter.getPassSkill(7601);
			if(skill){
				if(skill.isInCD()){
					GameNotice.showMousePosMessage("传送特戒冷却中，冷却"+(skill.cd-ServerTime.getServerTime())+"秒");
					}else{
					if(ItemUseManager.isMapCanUse(101017001,false)){
						var af=func !=null ? 1 :0;
						TransferManager.sendTransmint(mapId,xpos,ypos,17,false,af);
						return;
					}
				}
			}
			this.onRadarGuide(false);
			App.mapModule.mapSkillModel.clearSelectTarget();
			EventMgr.dispatch("ET.character_move_to_position",mapId,xpos,ypos,true,func);
		}
	}

	__proto.onClickBossText=function(e){
		var xy=this.getClickPos(e);
		this.gotoWhere(xy[0],xy[1],xy[2],e.ctrlKey);
	}

	__proto.onMapWarn=function(px,py){
		var effect=GameEffect.getEffect();
		effect.url=ResPathUtil.getPanelEffect("go","countrywar");
		this._container.addChild(effect);
		effect.x=px *this._scaleW;
		effect.y=py *this._scaleH;
		effect.playOnce();
	}

	__proto.updateNpc=function(){
		CountryWarCenter.clearStrongholdView2();
		var obj;
		while(this._holdContainer.numChildren > 0){
			obj=this._holdContainer.removeChildAt(0);
			if((obj instanceof com.modules.kmap.item.StrongholdShape )){
				this._holdPool.push(obj);
			}
			else if((obj instanceof com.modules.kmap.item.NpcShape )){
				this._npcPool.push(obj);
			}
		};
		var tasks,mapId=App.role.mapId;
		var allNpc=App.dataMgr.q_npcContainer.getList();
		var bean;
		for(var $each_bean in allNpc){
			bean=allNpc[$each_bean];
			if(bean.q_map==mapId && bean.q_energy_type !=5){
				if(bean.q_displaynpc==1 || bean.q_displaynpc==3){
					this._npcs.push(bean);
				}
				else if(bean.q_displaynpc==4 && bean.q_task){
					tasks=JSON.parse(bean.q_task);
					var tid;
					for(var $each_tid in tasks){
						tid=tasks[$each_tid];
						if(TaskModel.getTaskData(tid)){
							this._npcs.push(bean);
							this.showNpc(bean);
							break ;
						}
					}
					continue ;
				}
				if(bean.q_displaynpc==0 || bean.q_displaynpc==3){
					continue ;
				}
				this.showNpc(bean);
			}
		};
		var time=ServerTime.getServerTime();
		var mapnpc=WanyaoCenter.getMapNpcs(mapId);
		var r_npc;
		for(var $each_r_npc in mapnpc){
			r_npc=mapnpc[$each_r_npc];
			bean=App.dataMgr.q_npcContainer.getDataBean(r_npc.modelId,false);
			if(bean && bean.q_displaynpc==1 && r_npc.refreshTime <=time){
				this.showNpc(bean,MapVO.getCenterPoint(r_npc.x,r_npc.y));
			}
		}
	}

	__proto.showNpc=function(bean,point){
		var npc,stronghold,hold;
		if(!point){
			if(bean.q_px !=0 || bean.q_py !=0){
				point=new Point(bean.q_px,bean.q_py);
			}
			else{
				point=MapVO.getCenterPoint(bean.q_x,bean.q_y);
			}
		}
		if(bean.q_stronghold==0){
			if(this._npcPool.length > 0){
				npc=this._npcPool.pop();
			}
			else{
				npc=new NpcShape();
			}
			npc.setName(GameUtils.getContainCountryName(bean.q_name));
			npc.x=point.x *this._scaleW;
			npc.y=point.y *this._scaleH;
			this._holdContainer.addChild(npc);
		}
		else if(bean.q_stronghold==1){
			stronghold=CountryWarCenter.getStrongholdInfo(bean.q_id);
			if(stronghold !=null){
				if(this._holdPool.length > 0){
					hold=this._holdPool.pop();
				}
				else{
					hold=new StrongholdShape(false);
				}
				hold.setInfo(bean.q_name,stronghold.nationType,CountryWarCenter.getCountryColor(stronghold.nationType),CountryWarCenter.getCountryName(stronghold.nationType),stronghold.strongholdId);
				CountryWarCenter.addStrongholdView2(stronghold.strongholdId,hold);
				hold.x=point.x *this._scaleW;
				hold.y=point.y *this._scaleH;
				this._holdContainer.addChild(hold);
			}
		}
	}

	__proto.updateTransport=function(){
		CountryWarCenter.clearTransferView2();
		var sign;
		while(this._transferContainer.numChildren > 0){
			sign=ClassUtils.asTo(this._transferContainer.getChildAt(0),TransferShape);
			if(sign){
				sign.clear();
				this._transferPool.push(sign);
			}
		};
		var allTrans=App.dataMgr.q_transferContainer.getList();
		if(allTrans !=null){
			var mapId=App.role.mapId;
			var nation=App.role.nation;
			var data;
			var point;
			var length=allTrans.length;
			for (var i=0;i < length;i++){
				if(allTrans[i].q_tran_from_map==mapId){
					if(allTrans[i].q_nation > 0 && allTrans[i].q_nation !=nation){
						continue ;
					}
					this._doors.push(allTrans[i]);
					if(allTrans[i].q_displaytrans==1){
						continue ;
					}
					data=MapRoadSearch.getTransPoint(allTrans[i].q_tran_from_range);
					point=MapVO.getCenterPoint(data.p.x,data.p.y);
					if(this._transferPool.length > 0){
						sign=this._transferPool.pop();
						}else{
						sign=new TransferShape();
					}
					sign.update(allTrans[i].q_tran_id);
					sign.x=point.x *this._scaleW-sign.width / 2;
					sign.y=point.y *this._scaleH-sign.height / 2;
					this._transferContainer.addChild(sign);
					this._upLayer.addChild(sign.name_txt);
					this._upLayer.addChild(sign.count_txt);
					CountryWarCenter.addtransferView2(allTrans[i].q_tran_id,sign);
				}
			}
		}
	}

	__proto.onBossChange=function(arr){
		var len=this._bossContainer.numChildren;
		var sign;
		var info;
		for(var i=0;i < arr.length;i++){
			info=arr[i];
			for(var j=0;j < len;j++){
				sign=ClassUtils.asTo(this._bossContainer.getChildAt(j),BossSign);
				if(sign && sign.nodex==info.birthx && sign.nodey==info.birthy && myparseInt(sign.tag)==info.monsterModelId){
					sign.update(info.remainTime-ServerTime.getServerTime());
				}
			}
		}
	}

	__proto.removeBoss=function(){
		var sign;
		while(this._bossContainer.numChildren > 0){
			sign=ClassUtils.asTo(this._bossContainer.getChildAt(0),BossSign);
			if(sign){
				sign.name_txt.off("click",this,this.onClickBossText);
				sign.time_txt.off("click",this,this.onClickBossText);
				sign.clear();
				this._bossPool.push(sign);
			}
		}
	}

	__proto.updateBoss=function(){
		this.removeBoss();
		var allBoss=App.dataMgr.q_mapbossContainer.getMapBoss(App.role.mapId);
		if(allBoss !=null){
			var point,sign;
			var bean;
			for(var $each_bean in allBoss){
				bean=allBoss[$each_bean];
				if(bean.q_hide==0 && bean.q_xy && (LianyuCenter.cur_layer==0 || bean.q_bo_id==LianyuCenter.cur_layer)){
					var monster=App.dataMgr.q_monsterContainer.getDataBean(bean.q_bossid,false);
					if(monster){
						var arr=bean.q_xy.split(",");
						for (var j=0;j < arr.length;j++){
							var brr=arr[j].split("_");
							point=MapVO.getCenterPoint(brr[0],brr[1]);
							if(this._bossPool.length > 0){
								sign=this._bossPool.shift();
								}else{
								sign=new BossSign();
							}
							sign.tag=monster.q_id;
							sign.name_txt.on("click",this,this.onClickBossText);
							sign.time_txt.on("click",this,this.onClickBossText);
							sign.setInfo(monster,(bean.q_showlv > 0 ? "Lv."+monster.q_lvl :'')+GameUtils.getBossName(monster.q_id),myparseInt(brr[0]),myparseInt(brr[1]));
							sign.x=point.x *this._scaleW-sign.width / 2;
							sign.y=point.y *this._scaleH-sign.height / 2;
							this._bossContainer.addChild(sign);
							this._upLayer.addChild(sign.name_txt);
							this._upLayer.addChild(sign.time_txt);
							sign.name_txt.tag=sign;
							sign.time_txt.tag=sign;
							if(GlobalCenter.radar_guide && bean.q_bossid==GlobalCenter.radar_guide.id && monster.q_boss_title_type==GlobalCenter.radar_guide.rankid){
								sign.rankLv=GlobalCenter.radar_guide.rankLv;
								this.onRadarGuide(true,sign);
							}
						}
					}
				}
			}
		}
	}

	// }
	__proto.onCreateMonster=function(monsterData){
		var shape=this._monsterDict[monsterData.personId];
		if(shape==null){
			shape=RadarCenter.getRole(2);
			this._monsterContainer.addChild(shape);
			this._monsterDict[monsterData.personId]=shape;
		}
		this.onUpdateMonster(monsterData.personId,monsterData.map_x,monsterData.map_y);
	}

	__proto.onUpdateMonster=function(monId,px,py){
		var shape=this._monsterDict[monId];
		if(shape !=null){
			shape.x=px *this._scaleW;
			shape.y=py *this._scaleH;
		}
	}

	__proto.onDeleteMonster=function(monId){
		var shape=this._monsterDict[monId];
		if(shape !=null){
			shape.removeSelf();
			RadarCenter.putRole(shape);
			this._monsterDict[monId]=null;
			delete this._monsterDict[monId];
		}
	}

	__proto.onUpdateMember=function(member){
		if(!EnumZoneClientType.isInYanwuChang()){
			var characterData=App.role;
			if(characterData.personId !=member.playerId.toString()){
				if(member.lineId==characterData.line && member.mapId==characterData.mapId){
					this.addMember(member);
				}
				else{
					this.removeMember(member.playerId.toString());
				}
			}
		}
	}

	__proto.addMember=function(member){
		var playerId=member.playerId.toString();
		var image=this._teamDict[playerId];
		if(image==null){
			image=new Image(ResPathUtil.getImageRes("3",".png","main/map"));
			this._teamDict[playerId]=image;
			this._teamContainer.addChild(image);
			image.on("mouseover",this,this.onMouseTeamMember);
			image.on("mouseout",this,this.onMouseTeamMember);
		}
		image['tag']=member.playerName;
		image.x=member.position.px *this._scaleW;
		image.y=member.position.py *this._scaleH;
	}

	__proto.removeMember=function(playerId){
		var image=this._teamDict[playerId];
		if(image !=null){
			image.tag=null;
			image.off("mouseover",this,this.onMouseTeamMember);
			image.off("mouseout",this,this.onMouseTeamMember);
			image.remove();
			this._teamDict[playerId]=null;
			delete this._teamDict[playerId];
		}
	}

	__proto.onRemoveAllMembers=function(){
		for (var playerId in this._teamDict){
			this.removeMember(playerId);
		}
	}

	__proto.onMouseTeamMember=function(e){
		var image=ClassUtils.asTo(e.target,Image);
		if(image !=null && image['tag'] !=null && this._posText !=null){
			if(e.type=="mouseout"){
				if(this._teamTxt !=null){
					this._teamTxt.removeSelf();
				}
			}
			else if(e.type=="mouseover"){
				if(this._teamTxt==null){
					this._teamTxt=new FText(false);
					this._teamTxt.fontSize=16;
					this._teamTxt.filter=true;
					this._teamTxt.color=GameHTML.GREEN;
				}
				this._teamTxt.text=String(image['tag']);
				this._teamTxt.x=this._posText.x+this._posText.width;
				this._teamTxt.y=this._posText.y;
				this._container.addChild(this._teamTxt);
			}
		}
	}

	/**
	*更新人物自己的位置
	*@param px
	*@param py
	*@param gx
	*@param gy
	*
	*/
	__proto.onCharacterUpdatePosition=function(px,py,gx,gy){
		(gx===void 0)&& (gx=0);
		(gy===void 0)&& (gy=0);
		this._myIcon.x=px *this._scaleW;
		this._myIcon.y=py *this._scaleH;
		var role=App.role;
		if(role !=null){
			this.pos_txt.text="("+role.nodex+","+role.nodey+")";
		}
		if(role.isSuiji){
			role.isSuiji=false;
			CPlayOnceEffect.play(ResPathUtil.getPanelEffect("suiji_tip"),this._myIcon);
		}
	}

	/**
	*更新寻路路线图
	*@param list
	*
	*/
	__proto.onShowPointLine=function(list){
		this.recycle(0);
		if(list !=null && list.length > 0){
			var shape;
			var length=list.length;
			for(var i=0;i < length;i++){
				shape=RadarCenter.getWayShape();
				shape.x=MapVO.getPixelPos(list[i],true)*this._scaleW;
				shape.y=MapVO.getPixelPos(list[i],false)*this._scaleH;
				this._pointWayContainer.addChild(shape);
			}
		}
	}

	__proto.onShowPointLine2=function(step){
		while(step > 0){
			step--;
			RadarCenter.putWayShape(this._pointWayContainer.removeChildAt(0));
		}
	}

	// }
	__proto.recycle=function(type){
		(type===void 0)&& (type=-1);
		if(type==0 || type==-1){
			while(this._pointWayContainer.numChildren > 0){
				RadarCenter.putWayShape(this._pointWayContainer.removeChildAt(0));
			}
		}
		if(type==1 || type==-1){
			while(this._monsterContainer.numChildren > 0){
				RadarCenter.putRole(this._monsterContainer.removeChildAt(0));
			}
		}
	}

	__proto.showKuafuServerIdName=function(){
		if(App.role.mapId !=300011)return;
		if(!this._serverIdVec){
			this._serverIdVec=[];
		};
		var showNum=8;
		if(KuafuBattleCenter.battle_type==0){
			showNum=4;
		};
		var infos=KuafuBattleCenter.battleInfos;
		if(infos){
			var bean=App.dataMgr.q_globalContainer.getDataBean(21010,false);
			var posArr=JSON.parse(bean.q_string_value);
			var singlePos;
			var label;
			var info;
			for(var i=0;i < infos.length;i++){
				singlePos=posArr[i];
				info=infos[i];
				if(this._serverIdVec[i]==null){
					label=this.getLabel(78);
					this._container.addChild(label);
					this._serverIdVec.push(label);
				}
				else{
					label=this._serverIdVec[i];
				}
				label.color="#ef0605";
				label.text="S"+info.serverIndex+"."+info.serverName;
				label.visible=true;
				label.pos(this._scaleW *MapConfig.MAP_NODE_WIDTH*singlePos[0]-(label.width / 2),this._scaleW *MapConfig.MAP_NODE_HEIGHT*singlePos[1]);
			}
			for(i;i < this._serverIdVec.length;i++){
				this._serverIdVec[i].visible=false;
			}
		}
	}

	__proto.getLabel=function(labelWidth){
		var label=new Label();
		label.stroke=1;
		label.width=labelWidth;
		label.fontSize=16;
		label.align="center";
		return label;
	}

	__proto.removeKuafuServerIdName=function(){
		if(this._serverIdVec){
			var label;
			while(this._serverIdVec.length > 0){
				label=this._serverIdVec.pop();
				label.remove();
			}
			this._serverIdVec=null;
		}
	}

	__proto.showFuzhanMapInfo=function(){
		if(App.role.mapId !=210043 && App.role.mapId !=210045)return;
		if(!this._fuzhanVec){
			this._fuzhanVec=[];
		};
		var label;
		var cmd=FuzhanCenter.fuzhanZoneZhanlingInfo;
		var info;
		var guildId;
		var posX=0;
		var posY=0;
		var infos=JSON.parse(App.dataMgr.q_globalContainer.getDataBean(21022).q_string_value);
		for(var i=0;i < infos.length;i++){
			if(this._fuzhanVec[i]==null){
				label=this.getLabel(100);
				this._container.addChild(label);
				this._fuzhanVec.push(label);
			}
			else{
				label=this._fuzhanVec[i];
			}
			info=null;
			if(cmd && cmd.areaInfo){
				if(i < cmd.areaInfo.length){
					info=cmd.areaInfo[i];
				}
			}
			if(info && info.guildName){
				guildId=info.guildId.toString();
				if(App.role.guildId==guildId){
					label.text="我方占领";
					label.color="#50ade0";
				}
				else{
					label.text="敌方占领";
					label.color="#ef0605";
				}
				label.visible=true;
				posX=this._scaleW *MapConfig.MAP_NODE_WIDTH*infos[i][0]-(label.width / 2);
				posY=this._scaleW *MapConfig.MAP_NODE_HEIGHT*infos[i][1];
				if(i==0){
					posX-=30;
					posY-=12;
					}else if(i==1){
					posX-=15;
					posY+=12;
					}else{
					posX+=53;
					posY+=35;
				}
				label.pos(posX,posY);
			}
			else{
				label.text="";
				label.visible=false;
			}
		}
	}

	__proto.removeFuzhanInfo=function(){
		if(this._fuzhanVec){
			var label;
			while(this._fuzhanVec.length > 0){
				label=this._fuzhanVec.pop();
				label.remove();
			}
			this._fuzhanVec=null;
		}
	}

	__proto.onPassCD=function(id){
		if(id==7601){
			var skill=SkillCenter.getPassSkill(id);
			this.r_gTxt.mouseEnabled=!skill;
			this.r_gTxt.isDrawLine=!skill;
			if(this.r_gTxt.mouseEnabled){
				this.r_gTxt.color="#ef0605";
				this.r_gTxt.text="传送特戒(未激活)";
			}
			else{
				this._cs_cd=skill.cd-ServerTime.getServerTime();
				this.r_gTxt.color="#00ff00";
				if(this._cs_cd > 0){
					this._cs_cd++;
					Laya.workerTimer.loop(1000,this,this.onCsTimer);
				}
				this.onCsTimer();
			}
		}
	}

	__proto.onCsTimer=function(){
		if(this._cs_cd > 0){
			this._cs_cd--;
			this.r_gTxt.text="传送特戒("+this._cs_cd+"秒)";
		}
		else{
			this.r_gTxt.text="传送特戒(已就绪)";
			Laya.workerTimer.clear(this,this.onCsTimer);
		}
	}

	__proto.onRadarGuide=function(value,box){
		GlobalCenter.radar_guide=null;
		if(value){
			if(!this._guide){
				this._guide=Guide.getGuide();
				this._guide.showEffect3(box);
				this._guide.tag=box;
			}
		}
		else if(this._guide){
			this._guide.hide();
			this._guide=null;
		}
	}

	return MapView;
})(MapViewUI)