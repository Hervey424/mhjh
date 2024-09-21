/**
*背包物品管理类
*@author 胡剑
*创建时间：2015-5-11 上午11:55:12
*
*/
//class com.logic.data.item.BagItemCenter
var BagItemCenter=(function(){
	function BagItemCenter(){}
	__class(BagItemCenter,'com.logic.data.item.BagItemCenter');
	/**
	*已开格子数
	*/
	__getset(1,BagItemCenter,'openGridCount',function(){
		return EnumContainer.getGrids(1);
	});

	/**
	*背包默认开格数
	*@return
	*
	*/
	__getset(1,BagItemCenter,'initGrids',function(){
		if(BagItemCenter._initGrids==0){
			var bean=App.dataMgr.q_globalContainer.getDataBean(171,false);
			if(bean !=null){
				BagItemCenter._initGrids=bean.q_int_value;
			}
		}
		return BagItemCenter._initGrids;
	});

	/**
	*背包物品集合，位置对应索引
	*/
	__getset(1,BagItemCenter,'itemList',function(){return BagItemCenter._itemList;});
	/**
	*背包格子上限
	*@return
	*
	*/
	__getset(1,BagItemCenter,'maxGrids',function(){
		if(BagItemCenter._maxGrids==0){
			var bean=App.dataMgr.q_globalContainer.getDataBean(172,false);
			if(bean !=null){
				BagItemCenter._maxGrids+=bean.q_int_value;
			}
		}
		return BagItemCenter._maxGrids;
	});

	/**
	*物品所占格子数量（也就是有多少个格子上面有物品，包括临时格子）
	*/
	__getset(1,BagItemCenter,'itemsLength',function(){return BagItemCenter._itemsLength;});
	BagItemCenter.setLength=function(value){
		BagItemCenter._itemsLength=value;
		BagItemCenter.checkFullTip();
	}

	BagItemCenter.checkFullTip=function(){
		var bool=BagItemCenter.isFull(5);
		EventMgr.dispatch("ET.FUNCTION_TIP",2,bool);
	}

	BagItemCenter.getGrids=function(){
		var grids=EnumContainer.getGrids(1);
		grids-=Q_globalCenter.tempBagGrids;
		return grids;
	}

	BagItemCenter.getEmptyGridCount=function(){
		var grids=BagItemCenter.getGrids();
		var count=BagItemCenter.getTempItemCount();
		count=BagItemCenter._itemsLength-count;
		count=grids-count;
		return count;
	}

	BagItemCenter.isFull=function(leftGirds){
		(leftGirds===void 0)&& (leftGirds=0);
		var count=BagItemCenter.getEmptyGridCount();
		return count <=leftGirds;
	}

	BagItemCenter.isTempFull=function(){
		var count=BagItemCenter.getTempItemCount();
		var grids=Q_globalCenter.tempBagGrids;
		return count >=grids;
	}

	BagItemCenter.getTempItemCount=function(){
		var grids=EnumContainer.getGrids(1);
		var index=BagItemCenter.getGrids();
		var count=0;
		for(var i=index;i < grids;i++){
			if(BagItemCenter.getItem(i)!=null){
				count++;
			}
		}
		return count;
	}

	BagItemCenter.loadItems=function(arr){
		BagItemCenter._itemCountDict={};
		BagItemCenter._itemCountDict2={};
		BagItemCenter._itemList=[];
		BagItemCenter.ronglian_num=0;
		var bool=GameConfig.isInnerNet()|| GameConfig.isLocal();
		var item,delId='',dict=App.dataMgr.q_itemContainer.getHashMap();
		BagItemCenter.setLength(arr.length);
		for(var i=0;i < BagItemCenter._itemsLength;i++){
			if(!dict[arr[i].itemModelId]){
				if(bool){
					delId+=arr[i].itemModelId+',';
					continue ;
				}
			}
			item=new ItemData(arr[i]);
			BagItemCenter._itemList[item.position]=item;
			BagItemCenter.setItemCount(item,item.count);
			BagItemCenter.updateEquipInfo(item.getDataBean(),true);
		}
		if(delId.length > 0){
			Log.logInfo("背包中存在的已删除配置表道具ID："+delId);
			Alert.show("背包中存在已删除配置表的道具，ID可在日志中查看");
		}
		EventMgr.dispatch("Bag.UPDATE",null);
		EventMgr.dispatch("IET.LOADBAGITEM",null);
		App.timer.doTimeOnce(BagItemCenter,2000,com.logic.data.item.BagItemCenter.delayRed1);
		App.timer.doTimeOnce(BagItemCenter,5000,com.logic.data.item.BagItemCenter.delayRed2);
	}

	BagItemCenter.updateEquipInfo=function(bean,isAdd){
		if(bean.q_type !=1){
			return;
		};
		var equip=App.dataMgr.q_equipContainer.getDataBean(bean.q_id,false);
		if(!equip)return;
		if(equip.q_smelt_reward){
			if(isAdd){
				BagItemCenter.ronglian_num++;
			}
			else{
				BagItemCenter.ronglian_num--;
			}
		}
		if(bean.q_client_type==116){
			if(!BagItemCenter._yishouEquips.hasOwnProperty(bean.q_rank+'')){
				BagItemCenter._yishouEquips[bean.q_rank]=0;
			}
			if(isAdd){
				BagItemCenter._yishouEquips[bean.q_rank]++;
			}
			else{
				BagItemCenter._yishouEquips[bean.q_rank]--;
			}
		}
	}

	BagItemCenter.delayRed1=function(){
		if(App.menuProxy){
			App.menuProxy.showSpecialIcon();
		}
		BagRedPoint.updateItemUse();
		BagRedPoint.updateEquipWear();
		SkillCenter.updateRedPoint();
		SkillCenter.updateRedPoint2();
		SkillCenter.updateRedPoint3();
		SkillCenter.updateYuanShenRedPoint();
		DuanzaoRedPoint.updateQianghuaPoint();
		DuanzaoRedPoint.updateJinglianPoint();
		HechengPanelRedPoint.updateAll();
		ZuoQiCenter.updateZuoqiRed();
		LongHunCenter.checkPoint();
		JunXianCenter.updateCurrentData();
		ShenYuCenter.updateCurrentData();
		ZhuanShengCenter.checkUpgrade();
	}

	BagItemCenter.delayRed2=function(){
		RmbCenter.update();
		BagItemCenter.update116min_rank();
		PetCenter.updateRed0();
		PetCenter.updateSkinRed();
		PetCenter.updateJibanRed();
		DouliCenter.updateRed();
		TitleCenter.updateRed();
		NvwaCenter.updateEquip();
		AdvanceCenter.updateRed();
		SpecialFashionCenter.check();
		StoneCenter.updateBaoshiRed();
		ShenShiCenter.checkUpgrade2();
		GuildRedPoint.updateJuanxian();
		HechengRedPoint.updateTejieRed();
		HechengRedPoint.updateGubaoPanelRed();
		RolePanelRedPoint.updateFuxiRed();
		RolePanelRedPoint.updateBagua();
		RolePanelRedPoint.updateYishou();
		RolePanelRedPoint.updateGuanzhu();
		SkillCenter.updateRedPoint4(false);
		RolePanelRedPoint.updateShenqi();
		RolePanelRedPoint.updateRuishou();
		DuanzaoRedPoint.updateZhulongRed();
		ShenshouCenter.updateRed();
		GongceQingdianCenter.gerPanLeftRedpoint();
		MallRedPoint.updateHeizuan();
		StoneCenter.updateFuseRed();
		ZuoQiCenter.updateFeijianRed();
		SkillCenter.getFuzhanRedpoint();
	}

	BagItemCenter.setItem=function(position,itemData){
		BagItemCenter._itemList[position]=itemData;
	}

	BagItemCenter.getItem=function(position){
		return BagItemCenter._itemList[position];
	}

	BagItemCenter.getItemById=function(id,isReverse){
		(isReverse===void 0)&& (isReverse=false);
		if(id){
			var item;
			var i=0;
			var length=BagItemCenter._itemList.length;
			if(isReverse){
				for(i=length-1;i >=0;i--){
					item=BagItemCenter._itemList[i];
					if(item !=null){
						if(item.id==id || item.itemId==id){
							return item;
						}
					}
				}
			}
			else{
				for(i=0;i < length;i++){
					item=BagItemCenter._itemList[i];
					if(item !=null){
						if(item.id==id || item.itemId==id){
							return item;
						}
					}
				}
			}
		}
		return null;
	}

	BagItemCenter.hasItem=function(itemData){
		return BagItemCenter.hasItemById(itemData.id);
	}

	BagItemCenter.hasItemById=function(id){
		var item;
		var length=BagItemCenter._itemList.length;
		for(var i=0;i < length;i++){
			item=BagItemCenter._itemList[i];
			if(item !=null){
				if(item.id==id){
					return true;
				}
			}
		}
		return false;
	}

	BagItemCenter.getItemsByPart=function(part,min_rank){
		(min_rank===void 0)&& (min_rank=0);
		var arr=[];
		var item;
		var bean;
		var length=BagItemCenter._itemList.length;
		for(var i=0;i < length;i++){
			item=BagItemCenter._itemList[i];
			if(item !=null && item.isEquip()){
				bean=App.dataMgr.q_equipContainer.getDataBean(item.itemId,false);
				if(bean !=null && bean.q_kind==part && (min_rank==0 || item.rank >=min_rank)){
					arr.push(item);
				}
			}
		}
		return arr;
	}

	BagItemCenter.hasEquipBetter=function(part){
		var item;
		var bean;
		var length=BagItemCenter._itemList.length;
		for(var i=0;i < length;i++){
			item=BagItemCenter._itemList[i];
			if(item !=null && item.part==part){
				if(WearEquipCenter.isBetterThanWear(item)>-1){
					return item;
				}
			}
		}
		return null;
	}

	BagItemCenter.hasBetterByPart=function(part){
		var wear=WearEquipCenter.getEquipByPart(part);
		var item;
		for(var $each_item in BagItemCenter._itemList){
			item=BagItemCenter._itemList[$each_item];
			if(item && item.part==part && ConditionUtil.isConditionEnoughJson(item.getDataBean().q_special_limit)&& (!wear || item.rank > wear.rank)){
				return item;
			}
		}
		return null;
	}

	BagItemCenter.hasBetterByC_TYPE=function(type){
		var wear;
		var item;
		for(var $each_item in BagItemCenter._itemList){
			item=BagItemCenter._itemList[$each_item];
			if(item && item.getDataBean().q_client_type==type){
				wear=WearEquipCenter.getEquipByPart(item.part);
				if(!wear || item.rank > wear.rank){
					return true;
				}
			}
		}
		return false;
	}

	BagItemCenter.changeItem=function(items,reason){
		var tipItemData;
		var tipItemArray=[];
		var changeIdArray=[];
		var updatePosArray=[];
		var shortArray=[];
		var data;
		var info;
		var changeNum=0;
		for(var i=0;i < items.length;i++){
			info=items[i];
			data=BagItemCenter.getItem(info.gridId);
			if(data !=null){
				if(data.itemId==1731){
					App.sound.playVoice("yindao_hongbao_02");
				}
				changeNum=info.itemNum-data.count;
				if(data.count < info.itemNum){
					tipItemData=new ItemData();
					tipItemData.count=changeNum;
					tipItemData.isbind=info.isbind==1;
					tipItemData.id=data.id;
					tipItemData.itemId=data.itemId;
					tipItemData.islock=info.islock==1;
					tipItemData.lostTime=info.userendtime;
					tipItemArray.push(tipItemData);
				}
				else{
					GameNotice.itemRemoveMessage(data.itemId,changeNum *-1,reason);
				}
				BagItemCenter.setItemCount(data,changeNum);
				data.count=info.itemNum;
				data.isbind=info.isbind==1;
				data.islock=info.islock==1;
				data.lostTime=info.userendtime;
				data.bossId=info.bossid;
				data.mapId=info.mapid;
				data.playName=info.pname;
				changeIdArray.push(data.itemId);
				updatePosArray.push(data.position);
				var pos=BagItemCenter.isSetShortcut(info.itemModelId);
				if(pos !=-1){
					shortArray.push(pos);
				}
				if(reason==23 || reason==32){
					Log.logInfo("BagItemCenter","拾取物品（更新数量） -> 唯一id:"+info.itemId.toString()+",配置id:"+info.itemModelId+",拾取数量:"+changeNum+",是否绑定:"+(info.isbind==1)+",是否不可交易:"+(info.isbind==1)+",背包位置:"+info.gridId);
					info.itemNum=changeNum;
					EventMgr.dispatch("Bag.PAI",info.itemModelId,changeNum);
				}
			}
			else{
				Log.logError("BagItemCenter","要更新数量的物品在前端背包中找不到, item.gridId: "+info.gridId+"，item.itemId: "+info.itemId.toString());
			}
			if(reason==30107){
				tipItemData=new ItemData();
				tipItemData.count=info.itemNum;
				tipItemData.isbind=info.isbind==1;
				tipItemData.id=info.itemId.toString();
				tipItemData.itemId=info.itemModelId;
				tipItemData.lostTime=info.userendtime;
				tipItemArray.push(tipItemData);
				var equips=WearEquipCenter.equips;
				var $each_data;
				for($each_data in equips){
					data=equips[$each_data];
					if(data.itemId==info.itemModelId){
						data.lostTime=info.userendtime;
						break ;
					}
				}
			}
		}
		BagItemCenter.sendNotice(tipItemArray);
		if(updatePosArray.length > 0){
			EventMgr.dispatch("Bag.UPDATE",updatePosArray);
		}
		if(changeIdArray.length > 0){
			com.logic.data.item.BagItemCenter.checkDrug(changeIdArray);
			EventMgr.dispatch("Bag.CHANGE",changeIdArray);
		}
		if(shortArray.length > 0){
			EventMgr.dispatch("IET.SHORTCUT",shortArray);
		}
	}

	BagItemCenter.isSetShortcut=function(itemId){
		var info=ShortcutCenter.getShortcutInfoById(itemId,2);
		if(info !=null){
			return info.position;
		};
		var bean=GameUtils.getItemConfigData(itemId);
		if(bean !=null){
			if(myparseInt(bean.q_gift)!=0){
				var gift=App.dataMgr.q_gift_Container.getDataBean(myparseInt(bean.q_gift),false);
				if(gift !=null){
					if(gift.q_gift_data){
						var json=JSON.parse(gift.q_gift_data);
						info=ShortcutCenter.getShortcutInfoById(myparseInt(json[0].id),2);
						if(info !=null){
							return info.position;
						}
					}
				}
			}
		}
		return-1;
	}

	BagItemCenter.addItem=function(items,reason){
		(reason===void 0)&& (reason=0);
		var length=items.length;
		if(length > 0){
			var tipItemArray=[];
			var changeIdArray=[];
			var addItemArray=[];
			var removePosArray=[];
			var updatePosArray=[];
			var shortArray=[];
			var data;
			var info;
			var bean;
			var hasEquip=false;
			var hasMainIcon=false;
			var hasSkillMiji=false;
			var isHuishouOpen=PanelManager.isShowing(PanelRegister.HUISHOU);
			for(var i=0;i < length;i++){
				info=items[i];
				if(reason==23 || reason==32){
					Log.logInfo("BagItemCenter","拾取物品（新增） -> 唯一id:"+info.itemId.toString()+",配置id:"+info.itemModelId+",数量:"+info.num+",是否绑定:"+(info.isbind==1)+",是否不可交易:"+(info.isbind==1)+",背包位置:"+info.gridId);
					EventMgr.dispatch("Bag.PAI",info.itemModelId,0,true);
				}
				data=new ItemData(info);
				if(data !=null){
					if(data.itemId==1731){
						App.sound.playVoice("yindao_hongbao_02");
					}
					if(isHuishouOpen){
						HuishouCenter.updateItemHuishou(data);
					}
					bean=data.getDataBean();
					if(bean.q_type==1){
						hasEquip=true;
						if(!hasSkillMiji){
							hasSkillMiji=EnumEquipType.isSkillMiji(EnumEquipType.getPartByID(bean.q_id));
						}
						BagItemCenter.updateEquipInfo(bean,true);
					}
					if(!hasMainIcon && bean.q_client_type==69){
						hasMainIcon=true;
					}
					if(bean.q_client_type==69){
						if(data.lostTime > 0){
							PanelManager.openPanel(PanelRegister.TARGET,data,0,false);
						}
					}
					else if(bean.q_client_type==128){
						PanelOpenManager.openPanelById(bean.q_ui);
					}
					changeIdArray.push(data.itemId);
					if(data.count > 0){
						if(reason !=36){
							var pos=BagItemCenter.isSetShortcut(data.itemId);
							if(pos !=-1){
								shortArray.push(pos);
							}
						};
						var isAdd=false;
						var old=BagItemCenter._itemList[data.position];
						if(old==null){
							BagItemCenter.setLength(BagItemCenter._itemsLength+1);
							addItemArray.push(data);
							if(bean.q_auto_use !=1){
								tipItemArray.push(data);
							}
							else{
								var glb=App.dataMgr.q_globalContainer.getDataBean(15105,false);
								if(glb && !MoonCardCenter.isMoonCardActive(glb.q_int_value)){
									if(Q_globalCenter.isAutoUseItem(data.itemId)){
										tipItemArray.push(data);
									}
								}
							}
							isAdd=true;
							BagItemCenter.setItemCount(data,data.count);
						}
						BagItemCenter._itemList[data.position]=data;
						Log.logInfo("BagItemCenter 背包添加物品 -> itemId:"+data.id+"，itemModelId:"+data.itemId+"，gridId:"+data.position+"，name:"+data.name);
						if(isAdd){
							if(reason==50){
								if(!SetupCenter.instance.isBuyDrug && bean.q_client_type==1){
									if(bean.q_shortcut !=0){
										SetupCenter.saveClient("2",true);
										ItemFlyToShortcutEffect.flyTo(data.itemId);
									}
									else{
										var q_gift_data=App.dataMgr.q_gift_Container.getDataBean(data.itemId,false);
										if(q_gift_data !=null){
											if(q_gift_data.q_gift_data){
												var arr=ClassUtils.asTo(JSON.parse(q_gift_data.q_gift_data),Array);
												if(App.dataMgr.q_itemContainer.getDataBean(myparseInt(arr[0].id)).q_shortcut !=0){
													SetupCenter.saveClient("2",true);
													ItemFlyToShortcutEffect.flyTo(myparseInt(arr[0].id),null,-1,false);
												}
											}
										}
									}
								}
							}
						}
						updatePosArray.push(data.position);
					}
					else{
						removePosArray.push(data.position);
					}
				}
			}
			if(hasEquip){
				BagRedPoint.updateEquipWear();
			}
			if(hasMainIcon){
				App.menuProxy.showSpecialIcon();
			}
			if(addItemArray.length > 0){
				if(App.role !=null){
					var level=App.role.allLevel;
					var itemData=addItemArray[0];
					bean=itemData.getDataBean();
					if(bean && bean.q_client_type==15 && bean.q_level <=level){
						PanelOpenManager.openPanelById(bean.q_ui,itemData);
					}
				}
			}
			BagItemCenter.sendNotice(tipItemArray);
			if(updatePosArray.length > 0){
				EventMgr.dispatch("Bag.UPDATE",updatePosArray);
			}
			BagItemCenter.removeItem(removePosArray,reason);
			if(shortArray.length > 0){
				EventMgr.dispatch("IET.SHORTCUT",shortArray);
			}
			if(changeIdArray.length > 0){
				EventMgr.dispatch("Bag.CHANGE",changeIdArray);
			}
			if(hasSkillMiji){
				SkillCenter.updateRedPoint3();
			}
		}
	}

	BagItemCenter.sendNotice=function(tipItemArray){
		if(tipItemArray !=null && tipItemArray.length > 0){
			ItemPromptManager.addItem(tipItemArray);
			com.logic.data.item.BagItemCenter.checkDrug(tipItemArray);
			TreasureCenter.checkPoint();
		}
	}

	BagItemCenter.removeItem=function(idArray,reason){
		var id;
		var posArray=[];
		var grids=BagItemCenter.maxGrids;
		for(var i=0;i < idArray.length;i++){
			id=(idArray[i]).toString();
			for(var j=0;j < grids;j++){
				if(BagItemCenter._itemList[j] !=null){
					if(BagItemCenter._itemList[j].id==id){
						posArray.push(BagItemCenter._itemList[j].position);
						break ;
					}
				}
			}
		};
		var length=posArray.length;
		if(length > 0){
			var changeIdArray=[];
			var removeItemArray=[];
			var shortArray=[];
			var data;
			var bean;
			var hasEquip=false;
			var hasMainIcon=false;
			for(i=0;i < length;i++){
				data=BagItemCenter._itemList[posArray[i]];
				if(data !=null){
					bean=data.getDataBean();
					if(bean.q_type==1){
						BagItemCenter.updateEquipInfo(bean,false);
						if(!hasEquip){
							hasEquip=true;
						}
					}
					if(bean.q_client_type==49){
						EventMgr.dispatch("Bag.PAI",data.itemId,data.count);
					}
					else if(!hasMainIcon && bean.q_client_type==69){
						hasMainIcon=true;
					}
					changeIdArray.push(data.itemId);
					removeItemArray.push(data);
					GameNotice.itemRemoveMessage(data.itemId,data.count,reason);
					BagItemCenter.setLength(BagItemCenter._itemsLength-1);
					BagItemCenter._itemList[posArray[i]]=null;
					Log.logInfo("BagItemCenter 背包移除物品 -> itemId:"+data.id+"，itemModelId:"+data.itemId+"，gridId:"+data.position+"，name:"+data.name);
					BagItemCenter.setItemCount(data,-data.count);
					if(reason !=36){
						var pos=0;
						if(bean.q_gift==0){
							pos=BagItemCenter.isSetShortcut(data.itemId);
							if(pos !=-1){
								shortArray.push(pos);
							}
						}
						else{
							var gift=App.dataMgr.q_gift_Container.getDataBean(bean.q_gift,false);
							if(gift !=null && gift.q_gift_data){
								var json=ClassUtils.asTo(JSON.parse(gift.q_gift_data),Array);
								pos=BagItemCenter.isSetShortcut(myparseInt(json[0].id));
								if(pos !=-1){
									shortArray.push(pos);
								}
							}
						}
					}
				}
			}
			EventMgr.dispatch("Bag.UPDATE",posArray);
			if(hasEquip){
				BagRedPoint.updateEquipWear();
			}
			if(hasMainIcon){
				App.menuProxy.showSpecialIcon();
			}
			if(removeItemArray.length > 0){
				com.logic.data.item.BagItemCenter.checkDrug(removeItemArray);
				com.logic.data.item.BagItemCenter.checkSuiji(removeItemArray);
				var $each_data;
				for($each_data in removeItemArray){
					data=removeItemArray[$each_data];
					ItemPromptManager.updateEquipQueue(data);
				}
			}
			if(shortArray.length > 0){
				EventMgr.dispatch("IET.SHORTCUT",shortArray);
			}
			if(changeIdArray.length > 0){
				EventMgr.dispatch("Bag.CHANGE",changeIdArray);
			}
		}
	}

	BagItemCenter.tidy=function(arr){
		var temp=0;
		var result=[];
		var itemCountDict={};
		var itemCountDict2={};
		var len=arr.length;
		Log.logInfo("BagItemCenter 背包整理前物品个数为 -> "+len);
		BagItemCenter._itemsLength=len;
		var length=BagItemCenter._itemList.length;
		var clearItem;
		var item;
		var clearItemId;
		var has=false;
		for(var i=0;i < len;i++){
			has=false;
			clearItem=arr[i];
			clearItemId=clearItem.itemId.toString();
			for(var j=0;j < length;j++){
				item=BagItemCenter._itemList[j];
				if(item !=null){
					if(item.id==clearItemId){
						item.count=clearItem.num;
						item.position=clearItem.gridId;
						item.itemId=clearItem.itemModelId;
						item.isbind=clearItem.isbind==1;
						item.islock=clearItem.islock==1;
						result[item.position]=item;
						temp++;
						has=true;
						itemCountDict[item.itemId]=myparseInt(itemCountDict[item.itemId])+item.count;
						if(!item.isXianshi){
							itemCountDict2[item.itemId]=myparseInt(itemCountDict2[item.itemId])+item.count;
						}
						break ;
					}
				}
			}
			if(!has){
				Log.logError("BagItemCenter 背包整理发现物品不存在 -> clearItemId:"+clearItemId+"，itemModelId:"+clearItem.itemModelId+"，gridId"+clearItem.gridId);
			}
		}
		BagItemCenter._itemList=result;
		EventMgr.dispatch("Bag.TIDY");
		BagItemCenter.setLength(temp);
		var changeIdArray=[];
		for(temp in itemCountDict){
			if(itemCountDict[temp] !=BagItemCenter.getItemCount(temp)){
				changeIdArray.push(myparseInt(temp));
			}
		}
		BagItemCenter._itemCountDict=itemCountDict;
		BagItemCenter._itemCountDict2=itemCountDict2;
		if(changeIdArray.length > 0){
			EventMgr.dispatch("Bag.CHANGE",changeIdArray);
		}
		Log.logInfo("BagItemCenter 背包整理后物品个数为 -> "+temp);
	}

	BagItemCenter.getQuickUseList=function(){
		var arr=[];
		var item;
		var length=BagItemCenter._itemList.length;
		for(var i=0;i < length;i++){
			item=BagItemCenter._itemList[i];
			if(item !=null && item.getDataBean().q_quick_use > 0){
				arr.push(item);
			}
		}
		return arr;
	}

	BagItemCenter.setItemCount=function(item,count){
		if(!item.isXianshi){
			if(BagItemCenter._itemCountDict2){
				BagItemCenter._itemCountDict2[item.itemId]=myparseInt(BagItemCenter._itemCountDict2[item.itemId])+count;
			}
		}
		if(BagItemCenter._itemCountDict){
			BagItemCenter._itemCountDict[item.itemId]=myparseInt(BagItemCenter._itemCountDict[item.itemId])+count;
		}
	}

	BagItemCenter.getItemCountJson=function(json,isHasCount,isAddWear,addReplace,filterTime){
		(isHasCount===void 0)&& (isHasCount=false);
		(isAddWear===void 0)&& (isAddWear=false);
		(addReplace===void 0)&& (addReplace=false);
		(filterTime===void 0)&& (filterTime=false);
		var count=0;
		if(json){
			if((typeof json=='string')){
				json=JSON.parse(json);
			}
			count=BagItemCenter.getItemCount(json["id"],isHasCount,isAddWear,filterTime);
			if(addReplace){
				var replace=json["replace"];
				if(replace){
					replace=replace[0][0];
					if(replace){
						var rate1=myparseInt(json["rate"]);
						if(rate1 <=0)rate1=1;
						var rate2=myparseInt(replace["rate"]);
						if(rate2 <=0)rate2=1;
						replace=myparseInt(com.logic.data.item.BagItemCenter.getItemCount(replace["id"],false,false,filterTime)*rate2 / rate1);
						count+=replace;
					}
				}
			}
		}
		return count;
	}

	BagItemCenter.getItemCount=function(itemId,isHasCount,isAddWear,filterTime){
		(isHasCount===void 0)&& (isHasCount=false);
		(isAddWear===void 0)&& (isAddWear=false);
		(filterTime===void 0)&& (filterTime=false);
		if(itemId==0){
			return 0;
		}
		if(itemId < 0){
			return MoneyCenter.getMoneyReplaceBind(itemId);
		};
		var count=0;
		if(isAddWear){
			isAddWear=false;
			var bean=App.dataMgr.q_itemContainer.getDataBean(itemId,false);
			if(bean && bean.q_client_type==4){
				var pInfo,hole;
				var part;
				for(var $each_part in EnumEquipType.role_parts){
					part=EnumEquipType.role_parts[$each_part];
					pInfo=EquipPartCenter.getPartInfo(EnumEquipType.getPartByJingjieLv(part));
					for(var i=0;i < 5;i++){
						if(pInfo.getHole(i+1).itemId==itemId){
							count=1;
							break ;
						}
					}
					if(count > 0){
						break ;
					}
				}
				if(isHasCount){
					return 1;
				}
			}
			else if(WearEquipCenter.getEquipByItemId(itemId,filterTime)!=null){
				count+=1;
				if(isHasCount){
					return 1;
				}
			}
		}
		if(EnumContainer.getContainerTypeByItemId(itemId)!=1){
			return count+BagOtherItemCenter.getItemCount(itemId,isHasCount,isAddWear,filterTime);
		}
		if(filterTime){
			if(BagItemCenter._itemCountDict2){
				return count+myparseInt(BagItemCenter._itemCountDict2[itemId]);
			}
		}
		else if(BagItemCenter._itemCountDict){
			return count+myparseInt(BagItemCenter._itemCountDict[itemId]);
		}
		return count;
	}

	BagItemCenter.getGridCount=function(id,isHasCount){
		(isHasCount===void 0)&& (isHasCount=false);
		if(id < 0){
			return MoneyCenter.getMoneyReplaceBind(id);
		};
		var count=0;
		var grids=BagItemCenter.maxGrids;
		for(var i=0;i < grids;i++){
			if(BagItemCenter._itemList[i] !=null){
				if(BagItemCenter._itemList[i].itemId==id){
					if(isHasCount){
						return 1;
					}
					else{
						count+=1;
					}
				}
			}
		}
		return count;
	}

	BagItemCenter.getItemFirstPosition=function(id){
		var grids=BagItemCenter.maxGrids;
		for(var i=0;i < grids;i++){
			if(BagItemCenter._itemList[i] !=null){
				if(BagItemCenter._itemList[i].itemId==id){
					return i;
				}
			}
		}
		return-1;
	}

	BagItemCenter.getFirstEmptyPosition=function(){
		var grids=BagItemCenter.maxGrids;
		if(BagItemCenter._itemsLength==grids){
			return-1;
		}
		for(var i=0;i < grids;i++){
			if(BagItemCenter._itemList[i]==null){
				return i;
			}
		}
		return-1;
	}

	BagItemCenter.getBagEquipList=function(isNeedSort,isIgnoreBind,isIgnoreSz){
		(isNeedSort===void 0)&& (isNeedSort=false);
		(isIgnoreBind===void 0)&& (isIgnoreBind=true);
		(isIgnoreSz===void 0)&& (isIgnoreSz=true);
		var vec=[];
		var item;
		var grids=BagItemCenter.maxGrids;
		for(var i=0;i < grids;i++){
			item=BagItemCenter._itemList[i];
			if(item !=null){
				if(isIgnoreBind || !item.isbind){
					if(item.getDataBean().q_type==1){
						if(!isIgnoreSz || (item.part !=16 && item.part !=15)){
							vec.push(item);
						}
					}
				}
			}
		}
		if(isNeedSort){
			vec.sort(BagItemCenter.sortFunc);
		}
		return vec;
	}

	BagItemCenter.getHuishouGuideId=function(){
		var huishouId=0;
		var item,m_data;
		var grids=BagItemCenter.maxGrids;
		for(var i=0;i < grids;i++){
			item=BagItemCenter._itemList[i];
			if(item !=null){
				var temp=item.getDataBean().q_huishou_type;
				if(temp >=1001 && temp <=1008){
					if(!HuishouCenter.isAutoHuishouId(temp)){
						if(WearEquipCenter.isBetterThanWear(item)==-1){
							if(huishouId==0 || huishouId > temp){
								huishouId=temp;
							}
						}
					}
				}
			}
		}
		return huishouId;
	}

	BagItemCenter.update116min_rank=function(){
		BagItemCenter.min_rank116_91=-1;
		BagItemCenter.min_rank116_90=-1;
		var wear,rank=0,parts1=EnumEquipType.getParts(90),parts2=EnumEquipType.getParts(91);
		var part;
		for(var $each_part in parts1){
			part=parts1[$each_part];
			wear=WearEquipCenter.getEquipByPart(part);
			if(!wear){
				BagItemCenter.min_rank116_90=0;
				if(parts2.indexOf(part)>=0){
					BagItemCenter.min_rank116_91=0;
				}
			}
			else{
				rank=wear.rank;
				if(BagItemCenter.min_rank116_90 < 0 || rank < BagItemCenter.min_rank116_90){
					BagItemCenter.min_rank116_90=rank;
				}
				if((BagItemCenter.min_rank116_91 < 0 || rank < BagItemCenter.min_rank116_91)&& parts2.indexOf(part)>=0){
					BagItemCenter.min_rank116_91=rank;
				}
			}
		}
	}

	BagItemCenter.hasYishouEquip=function(rank){
		return myparseInt(BagItemCenter._yishouEquips[rank])> 0;
	}

	BagItemCenter.sortFunc=function(item1,item2){
		return item1.itemId < item2.itemId ?-1 :1;
	}

	BagItemCenter.getAdvanceEquip=function(type,part,vec){
		if(vec !=null){
			vec.length=0;
			}else{
			vec=[];
		};
		var advance=AdvanceCenter.getData(type);
		if(!advance)return vec;
		var item,bean,lv=AdvanceCenter.getLevel(type);
		var grids=BagItemCenter.maxGrids;
		for(var i=0;i < grids;i++){
			item=BagItemCenter._itemList[i];
			if(item && item.part==part){
				bean=item.getDataBean();
				if(bean.q_special_limit){
					var obj=JSON.parse(bean.q_special_limit);
					if(obj.hasOwnProperty("q_faqi")){
						if(lv < myparseInt(obj["q_faqi"])% 100){
							continue ;
						}
					}
				}
				vec.push(item);
			}
		}
		return vec;
	}

	BagItemCenter.getItemsByItemId=function(itemIds,isNeedSort,isIgnoreBind,count,isAddWear){
		(isNeedSort===void 0)&& (isNeedSort=false);
		(isIgnoreBind===void 0)&& (isIgnoreBind=true);
		(count===void 0)&& (count=0);
		(isAddWear===void 0)&& (isAddWear=false);
		var arr=[];
		var i=0,item;
		if(isAddWear){
			for(i=0;i < itemIds.length;i++){
				item=WearEquipCenter.getEquipByItemId(itemIds[i]);
				if(item){
					arr.push(item);
					if(count > 0 && arr.length >=count){
						return arr;
					}
				}
			}
		};
		var grids=BagItemCenter.maxGrids;
		for(i=0;i < grids;i++){
			item=BagItemCenter._itemList[i];
			if(item !=null){
				if(isIgnoreBind || !item.isbind){
					if(itemIds.indexOf(item.itemId)!=-1){
						arr.push(item);
						if(count > 0 && arr.length >=count){
							break ;
						}
					}
				}
			}
		}
		if(isNeedSort){
			arr.sort(BagItemCenter.sortFunc);
		}
		return arr;
	}

	BagItemCenter.checkSuiji=function(items){
		if(GameUtils.isAutoCheckDrug()){
			var bool=false;
			if(items !=null){
				for(var i=0;i < items.length;i++){
					if(items[i].itemId==8152){
						bool=true;
						break ;
					}
				}
			}
			else{
				bool=true;
			}
			if(bool){
				if(BagItemCenter.getItemCount(8152,true)> 0){
					return;
				}
				QuickBuyPromptPanel.show(MallCenter.getItemShopBean(8152));
			}
		}
	}

	BagItemCenter.checkDrug=function(items){
		var bool=false;
		if(items){
			var yaopin=Q_globalCenter.getJsonData(20,false);
			if(yaopin){
				var itemId;
				for(var i=0;i < items.length;i++){
					if(((items[i])instanceof com.logic.data.item.ItemData )){
						itemId=items[i].itemId;
						}else{
						itemId=items[i];
					}
					if(yaopin.indexOf(itemId)!=-1){
						bool=true;
						break ;
					}
				}
			}
		}
		else{
			bool=true;
		}
		if(bool){
			BagItemCenter.autoBuyDrug();
		}
	}

	BagItemCenter.autoBuyDrug=function(){
		if(GameUtils.isAutoCheckDrug()){
			var count=BagItemCenter.getDrugCount();
			var isCanAutoBuy=VipCenter.isCanAutoBuyDrug();
			if(!EnumSetup.isGou(19)|| !isCanAutoBuy){
				if(count < 5){
					App.role.showTalk1();
				}
			}
			if(count <=0){
				var vec=QuickPurchaseShopCenter.getQuickPurchaseShopItemList(1);
				var shopItem=vec[0];
				if(!shopItem)return;
				if(EnumSetup.isGou(19)&& isCanAutoBuy){
					if(App.isMoneyEnough(shopItem.q_price,shopItem.q_currency_type,false,false)){
						if(BagItemCenter.isFull()){
							GameNotice.showBottomMessage("背包空间不足，无法自动购药");
						}
						else{
							ItemBuyManager.buy(shopItem,1,false,0,shopItem.q_price,2);
						}
					}
					else{
						GameNotice.showBottomMessage("您的"+EnumMoney.getName(shopItem.q_currency_type)+"不足，无法自动购药");
					}
				}
				else{
					QuickBuyPromptPanel.show(shopItem,0,true,1);
				}
			}
		}
	}

	BagItemCenter.getDrugCount=function(){
		var count=0;
		var yaopin=Q_globalCenter.getJsonData(20,false);
		if(yaopin){
			var itemList=yaopin.split(";");
			var length=itemList.length;
			if(length > 0){
				var bean;
				for(var i=0;i < length;i++){
					bean=App.dataMgr.q_itemContainer.getDataBean(itemList[i],false);
					if(bean && bean.q_type==7){
						if(BagItemCenter.getItemCount(itemList[i],true)> 0){
							count=6;
							break ;
						}
					}
					else{
						count+=BagItemCenter.getItemCount(itemList[i]);
						if(count > 4){
							break ;
						}
					}
				}
			}
		}
		return count;
	}

	BagItemCenter.hasUseEquip=function(){
		var itemData;
		for(var i=0;i < BagItemCenter._itemList.length;i++){
			itemData=BagItemCenter._itemList[i];
			if(itemData !=null){
				if(itemData.isBatterInBag()){
					return true;
				}
			}
		}
		return false;
	}

	BagItemCenter.getItemsByTab=function(tab){
		if(tab==2){
			return BagOtherItemCenter.getList(5);
		}
		if(tab==7){
			return BagOtherItemCenter.getList(13);
		}
		if(tab==3){
			return BagOtherItemCenter.getList(12);
		}
		if(tab==4){
			return BagOtherItemCenter.getList(9);
		};
		var list=[];
		if(tab==5){
			var bean;
			var itemData;
			for(var i=0;i < BagItemCenter._itemList.length;i++){
				itemData=BagItemCenter._itemList[i];
				if(itemData !=null){
					bean=itemData.getDataBean();
					if(bean.q_sell==1 && bean.q_sell_price){
						list.push(itemData);
					}
				}
			};
			var suipian=BagOtherItemCenter.getList(9);
			if(suipian !=null){
				for(i=0;i < suipian.length;i++){
					itemData=suipian[i];
					if(itemData !=null){
						bean=itemData.getDataBean();
						if(bean.q_sell==1 && bean.q_sell_price){
							list.push(itemData);
						}
					}
				}
			}
		}
		else if(tab==6){
			for(i=0;i < BagItemCenter._itemList.length;i++){
				itemData=BagItemCenter._itemList[i];
				if(itemData !=null){
					bean=itemData.getDataBean();
					if(bean.q_use_bag==1){
						list.push(itemData);
					}
					else if(itemData.isBatterInBag()){
						list.push(itemData);
					}
				}
			}
			if(list.length > 1){
				list.sort(BagItemCenter.sortUseItem);
			}
		}
		return list;
	}

	BagItemCenter.sortUseItem=function(a,b){
		if(a.isEquip()&& !b.isEquip()){
			return-1;
		}
		if(!a.isEquip()&& b.isEquip()){
			return 1;
		}
		return a.itemId > b.itemId ?-1 :1;
	}

	BagItemCenter.getItemsByType=function(type){
		var list=[];
		var itemData;
		for(var i=0;i < BagItemCenter._itemList.length;i++){
			itemData=BagItemCenter._itemList[i];
			if(itemData !=null){
				if(itemData.getDataBean().q_type==type){
					list.push(itemData);
				}
			}
		}
		return list;
	}

	BagItemCenter.getItemsByClientType=function(clientType,limitTime,has){
		(limitTime===void 0)&& (limitTime=false);
		(has===void 0)&& (has=false);
		var list=[];
		var itemData;
		for(var i=0;i < BagItemCenter._itemList.length;i++){
			itemData=BagItemCenter._itemList[i];
			if(itemData && itemData.getDataBean().q_client_type==clientType || (limitTime && itemData.lostTime > 0)){
				list.push(itemData);
				if(has)break ;
			}
		}
		return list;
	}

	BagItemCenter.addLimit=function(limitGroupModelId,remainNum){
		if(BagItemCenter._itemCountLimit==null){
			BagItemCenter._itemCountLimit={};
		}
		BagItemCenter._itemCountLimit[limitGroupModelId]=remainNum;
	}

	BagItemCenter.getItemRemainNum=function(itemModelId){
		if(BagItemCenter._itemCountLimit !=null){
			var bean=GameUtils.getItemConfigData(itemModelId);
			if(bean !=null && bean.q_limit_use_time > 0 && bean.q_use_group > 0){
				return myparseInt(BagItemCenter._itemCountLimit[bean.q_use_group]);
			}
			else{
				return 1;
			}
		}
		return 0;
	}

	BagItemCenter.getOkEquipList=function(rank,isLonghun){
		(isLonghun===void 0)&& (isLonghun=false);
		var vec=[];
		vec.sort(BagItemCenter.sortFunc);
		return vec;
	}

	BagItemCenter.getFrom=function(data){
		if(data.diaoluoTime > 0 && data.playName && data.getDataBean().q_isrecord > 0){
			if(data.bossId > 0 && data.mapId > 0){
				var bossName="BOSS："+BossDataCenter.instance.getBossName(data.bossId)+"<br/>";
				var mapBean=App.dataMgr.q_mapContainer.getDataBean(data.mapId,false);
				var mapName="地点："+(mapBean !=null ? mapBean.q_map_name :"无");
				var playName="击败："+(data.playName ? data.playName :"无");
			}
			else{
				bossName="";
				mapName="作者："+data.playName;
				if(data.bossId > 0){
					var bean=App.dataMgr.q_activitiesContainer.getDataBean(data.bossId,false);
					if(bean !=null){
						playName="活动："+bean.q_name;
					}
				}
				else{
					switch(data.bossId){
						case-1:
							playName="来源：锻造";
							break ;
						case-2:
							playName="来源：探宝";
							break ;
						case-3:
							playName="来源：藏宝图";
							break ;
						case-4:
							playName="来源：神兽降临";
							break ;
						case-5:
							playName="来源：炼器";
							break ;
						case-6:
							playName="来源：BOSS归属礼包";
							break ;
						default :
							playName="来源：NPC制造";
							break ;
						}
				}
			}
			return bossName+mapName+"<br/>"+playName+"<br/>"+"时间："+StringFormat.formatTimeToLog(data.diaoluoTime);
		}
		return null;
	}

	BagItemCenter.openGrid=function(itemId){
		var item;
		if((itemId instanceof com.logic.data.item.ItemData )){
			item=itemId;
			}else{
			item=com.logic.data.item.BagItemCenter.getItemById(itemId);
		}
		if(item){
			Alert.show("是否消耗"+GameHTML.setColor(item.count+"个","#00ff00")+ItemUtil.getItemName(item.itemId)+"开启"+GameHTML.setColor(item.count+"个格子","#00ff00")+"？",GameHandler.create(BagItemCenter,BagItemCenter.sendOpenGrid),[item],true,null,null,false);
		}
	}

	BagItemCenter.sendOpenGrid=function(item){
		if(item){
			ItemUseManager.useItemByItemData(item,item.count);
			}else{
			GameNotice.showMousePosMessage(ItemUtil.getItemName(item.itemId)+"数量不足");
		}
	}

	BagItemCenter.checkTimeLimitedTarget=function(itemId){
		var bean=App.dataMgr.q_itemContainer.getDataBean(itemId,false);
		if(bean){
			var lvs=ItemUtil.analysisSpecialLimitJson(bean.q_special_limit);
			if(lvs)
				return lvs[0] >=lvs[1];
		}
		return false;
	}

	BagItemCenter.checkEquipWear=function(){
		var arr=[];
		var item;
		var length=BagItemCenter._itemList.length;
		for(var i=0;i < length;i++){
			item=BagItemCenter._itemList[i];
			if(item !=null && item.isEquip()){
				arr.push(item);
			}
		}
		if(arr.length > 0){
			ItemPromptManager.addItem(arr);
		}
	}

	BagItemCenter._itemCountDict=null;
	BagItemCenter._itemCountDict2=null;
	BagItemCenter._initGrids=0;
	BagItemCenter._maxGrids=0;
	BagItemCenter.nextTidyTime=3;
	BagItemCenter.lockPosition=-1;
	BagItemCenter._itemList=[];
	BagItemCenter._itemsLength=0;
	BagItemCenter.min_rank116_90=0;
	BagItemCenter.min_rank116_91=0;
	BagItemCenter._yishouEquips={};
	BagItemCenter._itemCountLimit=null;
	BagItemCenter.ronglian_num=0;
	return BagItemCenter;
})()