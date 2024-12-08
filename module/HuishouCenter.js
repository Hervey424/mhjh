var HuishouCenter=(function(_super){
	function HuishouCenter(){
		HuishouCenter.__super.call(this);;
	}

	__class(HuishouCenter,'com.logic.data.item.HuishouCenter',_super);
	var __proto=HuishouCenter.prototype;
	__proto.init=function(){
		GameServer.register(S2C_AutoshuishourankMessage,GameHandler.create(this,HuishouCenter.onS2C_AutoshuishourankMessage));
		GameServer.register(S2C_EquipHuiShouResultMessage,GameHandler.create(this,this.onS2C_EquipHuiShouResultMessage));
		GameServer.register(S2C_EquipSmeltRankMessage,GameHandler.create(this,HuishouCenter.onS2C_EquipSmeltRankMessage));
		GameServer.register(S2C_EquipSmeltResultMessage,GameHandler.create(this,HuishouCenter.onS2C_EquipSmeltResultMessage));
	}

	/**
	*回收结果
	*@param cmd
	*
	*/
	__proto.onS2C_EquipHuiShouResultMessage=function(cmd){
		if(!EnumSetup.isGou(33)){
			PanelManager.openByClass(HuishouResultPanel,{"ids":cmd.modelIds,"nums":cmd.nums,"type":cmd.type});
		}
		EventMgr.dispatch("HSC.HUISHOU_RESULT");
	}

	/**是否自动回收 */
	__getset(1,HuishouCenter,'isAutoHuishou',function(){return HuishouCenter._isAutoHuishou;},function(value){
		if(HuishouCenter._isAutoHuishou !=value){
			HuishouCenter._isAutoHuishou=value;
			HuishouCenter.sendC2S_setAutoshuishourankMessage([-1]);
			EventMgr.dispatch("HSC.HUISHOU_AUTO");
		}
	});

	/**是否自动熔炼 */
	__getset(1,HuishouCenter,'isRLOtherSex',function(){return HuishouCenter._isRLOtherSex;},function(value){
		if(HuishouCenter._isRLOtherSex !=value){
			HuishouCenter._isRLOtherSex=value;
			HuishouCenter.sendC2S_setEquipSmeltRankMessage(HuishouCenter._isAutoSmelt,false,value);
			EventMgr.dispatch("HSC.RONGLIAN_SET");
		}
	});

	/**是否自动熔炼 */
	__getset(1,HuishouCenter,'isAutoSmelt',function(){return HuishouCenter._isAutoSmelt;},function(value){
		if(HuishouCenter._isAutoSmelt !=value){
			HuishouCenter._isAutoSmelt=value;
			HuishouCenter.sendC2S_setEquipSmeltRankMessage(value,false,HuishouCenter._isRLOtherSex);
			EventMgr.dispatch("HSC.RONGLIAN_AUTO");
		}
	});

	HuishouCenter.getHuishouRank=function(huishouId){
		return myparseInt(HuishouCenter._huishouRankDict[huishouId]);
	}

	HuishouCenter.setHuishouRank=function(huishouId,rank){
		HuishouCenter._huishouRankDict[huishouId]=rank;
	}

	HuishouCenter.isAutoHuishouId=function(huishouId){
		return HuishouCenter._huishouIds.indexOf(huishouId)>-1;
	}

	HuishouCenter.setAutoHuishouId=function(huishouId,bool){
		var i=HuishouCenter._huishouIds.indexOf(huishouId);
		if(bool){
			if(i==-1){
				HuishouCenter._huishouIds.push(huishouId);
				HuishouCenter.sendC2S_setAutoshuishourankMessage(HuishouCenter._huishouIds);
			}
			}else{
			if(i !=-1){
				HuishouCenter._huishouIds.splice(i,1);
				HuishouCenter.sendC2S_setAutoshuishourankMessage(HuishouCenter._huishouIds);
			}
		}
	}

	HuishouCenter.getHuishouString=function(arr,formatType){
		(formatType===void 0)&& (formatType=1);
		var obj={};
		var id=0,arr1,bean;
		for(var i=0;i < arr.length;i++){
			bean=arr[i].getDataBean();
			if(bean.q_huishou){
				arr1=JSON.parse(bean.q_huishou);
				for(var j=0;j < arr1.length;j++){
					id=arr1[j]["id"];
					if(!obj[id]){
						obj[id]=0;
					}
					obj[id]+=MoneyCenter.getRecover(arr1[j]["num"] *arr[i]["count"],id,myparseInt(arr1[j]["nogrow"])==0);
				}
			}
		};
		var inc=0;
		var str="";
		for(i in obj){
			if(formatType==1){
				if(str.length > 0){
					str+="\n";
				}
				str+=ItemUtil.getItemName(i)+"×"+obj[i];
			}
			else if(formatType==2){
				inc++;
				if(inc % 4==0){
					str+="\n";
					}else if(str.length > 0){
					str+=GameHTML.addHtmlSpace(2);
				}
				str+=ItemUtil.getItemName(i)+":&nbsp;"+obj[i];
			}
		}
		return str;
	}

	HuishouCenter.updateHuishouGou=function(){
		HuishouCenter.baoliuDic={};
		var bags=BagItemCenter.itemList;
		var len=bags.length;
		for(var i=0;i < len;i++){
			HuishouCenter.updateItemHuishou(bags[i]);
		}
	}

	HuishouCenter.updateItemHuishou=function(item){
		if(item){
			var huishouId=0,bean,m_data,skill,isGou=false;
			if(com.logic.data.item.HuishouCenter.huishouOperateDict[item.id]){
				isGou=Boolean(com.logic.data.item.HuishouCenter.huishouItemDict[item.id]);
			}
			else{
				bean=item.getDataBean();
				huishouId=bean.q_huishou_type;
				if(huishouId > 0){
					isGou=com.logic.data.item.HuishouCenter.isAutoHuishouId(huishouId);
					if(isGou){
						if(huishouId==3011){
							m_data=MasterCenter.getMasterDataByType(bean.q_client_script / 100 >> 0);
							if(!m_data || m_data.level < bean.q_client_script % 100){
								isGou=false;
							}
						}
						else if(huishouId==3012){
							if(!GubaoCenter.isActive(bean.q_client_script)){
								isGou=false;
							}
						}
						else if(huishouId==3013){
							skill=SkillCenter.getSkill(bean.q_add_value / 1000 >> 0);
							if(!skill || skill.skillLevel < bean.q_add_value % 1000){
								isGou=false;
							}
						}
						else if(huishouId==3018){
							isGou=Boolean(WearEquipCenter.getEquipByPart(bean.q_add_type));
						}
						else if(huishouId==3019){
							isGou=bean.q_rank <=EquipPartCenter.getPartQiangHuaLevel(bean.q_add_value,8);
						}
						else if(bean.q_client_type==66){
							if(App.role.jingJieId < bean.q_add_type){
								isGou=false;
							}
						}
						else{
							var rank=com.logic.data.item.HuishouCenter.getHuishouRank(huishouId);
							if(rank > 0){
								if(bean.q_rank > rank){
									isGou=false;
								}
								else if(bean.q_client_type==116){
									if(bean.q_rank >=BagItemCenter.min_rank116_90 && bean.q_rank > 2 && !HuishouCenter.baoliuDic["yishou_"+bean.q_rank]){
										isGou=false;
										HuishouCenter.baoliuDic["yishou_"+bean.q_rank]=true;
									}
								}
							}
							if(isGou){
								if(!ItemUtil.isSexAndJobSame(item.itemId)){
									isGou=true;
								}
								else{
									rank=WearEquipCenter.isBetterThanWear(bean,false,false);
									if(rank==-3){
										if(HuishouCenter.baoliuDic.hasOwnProperty("part_rank"+item.part)){
											if(HuishouCenter.baoliuDic["part_rank"+item.part] < bean.q_rank){
												com.logic.data.item.HuishouCenter.huishouItemDict[HuishouCenter.baoliuDic["part_"+item.part]]=true;
												HuishouCenter.baoliuDic["part_rank"+item.part]=bean.q_rank;
												HuishouCenter.baoliuDic["part_"+item.part]=item.id;
												isGou=false;
											}
										}
										else{
											isGou=false;
											HuishouCenter.baoliuDic["part_"+item.part]=item.id;
											HuishouCenter.baoliuDic["part_rank"+item.part]=bean.q_rank;
										}
									}
									else if(rank >-1){
										isGou=false;
										if(item.rank <=3){
											var part=EquipPartCenter.getPartInfo(item.part);
											if(part && !part.isOpen){
												isGou=true;
											}
										}
									}
								}
							}
						}
					}
				}
				com.logic.data.item.HuishouCenter.huishouItemDict[item.id]=isGou;
			}
		}
	}

	HuishouCenter.sendC2S_setAutoshuishourankMessage=function(huishouId,type){
		(type===void 0)&& (type=0);
		var cmd=new C2S_setAutoshuishourankMessage();
		cmd.type=type;
		if(type==0){
			if(!huishouId){
				huishouId=HuishouCenter._huishouIds;
			}
			cmd.huishouId=huishouId;
			cmd.huishouRank=[];
			for(var i=0;i < huishouId.length;i++){
				cmd.huishouRank[i]=HuishouCenter.getHuishouRank(huishouId[i]);
			}
			cmd.isset=HuishouCenter._isAutoHuishou ? 1 :0;
		}
		else if(type==1){
			huishouId=[];
			var hdic=SetupCenter.instance.fenjieDic;
			for(var itemId in hdic){
				if(hdic[itemId]==1){
					huishouId.push(myparseInt(itemId));
				}
			}
			cmd.huishouId=huishouId;
			cmd.huishouRank=[];
			cmd.isset=HuishouCenter.isAutoHun ? 1 :0;
		}
		GameServer.sendCommand(cmd);
	}

	HuishouCenter.onS2C_AutoshuishourankMessage=function(cmd){
		if(cmd.type==0){
			HuishouCenter._huishouIds=cmd.huishouId;
			HuishouCenter._huishouRankDict={};
			for(var i=0;i < cmd.huishouRank.length;i++){
				HuishouCenter._huishouRankDict[HuishouCenter._huishouIds[i]]=cmd.huishouRank[i];
			}
			HuishouCenter._isAutoHuishou=cmd.isset==1;
		}
		else if(cmd.type==1){
			HuishouCenter.isAutoHun=cmd.isset==1;
		}
	}

	HuishouCenter.sendC2S_EquipHuiShouMessage=function(ids,store,type){
		(store===void 0)&& (store=1);
		(type===void 0)&& (type=0);
		if(ids && ids.length > 0){
			var cmd=new C2S_EquipHuiShouMessage();
			cmd.equipIds=ids;
			cmd.store=store;
			cmd.type=type;
			GameServer.sendCommand(cmd);
		}
	}

	HuishouCenter.isAutoFly=function(bean){
		if(bean.q_type !=1){
			return false;
		}
		if(!com.logic.data.item.HuishouCenter.isAutoHuishouId(bean.q_huishou_type)){
			return false;
		}
		if(WearEquipCenter.isBetterThanWear(bean)>-1){
			return false;
		}
		return true;
	}

	HuishouCenter.changeJob=function(){
		HuishouCenter.isChangeJob=true;
		HuishouCenter._smeltRankDict[1]=[];
		HuishouCenter._smeltRankDict[2]=[];
		HuishouCenter._smeltRankDict[3]=[];
	}

	HuishouCenter.isAutoSmeltByRank=function(job,rank,star){
		(star===void 0)&& (star=-1);
		var arr=HuishouCenter._smeltRankDict[job];
		var kv;
		for(var $each_kv in arr){
			kv=arr[$each_kv];
			if(kv.key==rank){
				if(star < 0){
					if((kv.value & 1)!=0 || (kv.value & 1 << 1)!=0 || (kv.value & 1 << 2)!=0){
						return true;
					}
				}
				else{
					return (kv.value & (1 << (star-1)))!=0;
				}
			}
		}
		return false;
	}

	HuishouCenter.isAutoSmeltByItemId=function(itemId){
		var job=0;
		var rank=0;
		var bean=App.dataMgr.q_itemContainer.getDataBean(itemId,false);
		if(bean){
			job=bean.q_job;
			var equip=App.dataMgr.q_equipContainer.getDataBean(itemId,false);
			if(equip){
				rank=equip.q_rank;
				return HuishouCenter.isAutoSmeltByRank(job,rank,equip.q_star);
			}
		}
		return false;
	}

	HuishouCenter.setAutoSmeltRank=function(job,rank,bool,star){
		(star===void 0)&& (star=-1);
		var arr=HuishouCenter._smeltRankDict[job];
		if(!arr){
			arr=[];
			HuishouCenter._smeltRankDict[job]=arr;
		};
		var kv,has=false;
		for(var i=0;i < arr.length;i++){
			kv=arr[i];
			if(kv.key==rank){
				has=true;
				if(star < 0 && !bool){
					arr.splice(i,1);
				}
				else{
					HuishouCenter.setKeyValue(kv,bool,star);
				}
				break ;
			}
		}
		if(bool && !has){
			kv=new KeyValueInt();
			kv.key=rank;
			HuishouCenter.setKeyValue(kv,true,star);
			arr.push(kv);
		}
		HuishouCenter.sendC2S_setEquipSmeltRankMessage(HuishouCenter._isAutoSmelt,true,HuishouCenter._isRLOtherSex);
	}

	HuishouCenter.setKeyValue=function(kv,bool,star){
		(star===void 0)&& (star=-1);
		if(bool){
			if(star < 0){
				kv.value=kv.value | 1;
				kv.value=kv.value | (1 << 1);
				kv.value=kv.value | (1 << 2);
			}
			else{
				kv.value=kv.value | (1 << (star-1));
			}
		}
		else{
			if(star < 0){
				kv.value=0;
			}
			else{
				kv.value=kv.value ^ (1 << (star-1));
			}
		}
	}

	HuishouCenter.sendC2S_setEquipSmeltRankMessage=function(isAuto,isSetRank,rlOtherSex){
		(isAuto===void 0)&& (isAuto=false);
		(isSetRank===void 0)&& (isSetRank=true);
		(rlOtherSex===void 0)&& (rlOtherSex=false);
		var cmd=new C2S_setEquipSmeltRankMessage();
		cmd.autoSmelt=isAuto ? 1 :0;
		cmd.jobSex=rlOtherSex ? 1 :0;
		if(isSetRank){
			cmd.rankList1=HuishouCenter._smeltRankDict[1];
			cmd.rankList2=HuishouCenter._smeltRankDict[2];
			cmd.rankList3=HuishouCenter._smeltRankDict[3];
		}
		else{
			var kv=new KeyValueInt();
			kv.key=-1;
			cmd.rankList1=[kv];
			cmd.rankList2=[];
			cmd.rankList3=[];
		}
		GameServer.sendCommand(cmd);
	}

	HuishouCenter.onS2C_EquipSmeltRankMessage=function(cmd){
		HuishouCenter._isRLOtherSex=cmd.jobSex==1;
		HuishouCenter._isAutoSmelt=cmd.autoSmelt==1;
		HuishouCenter._smeltRankDict[1]=cmd.rankList1;
		HuishouCenter._smeltRankDict[2]=cmd.rankList2;
		HuishouCenter._smeltRankDict[3]=cmd.rankList3;
	}

	HuishouCenter.onS2C_EquipSmeltResultMessage=function(cmd){
		PanelManager.openByClass(RonglianResultPanel,{"ids":cmd.ids,"nums":cmd.nums});
	}

	HuishouCenter.HUISHOU_OPEN="HSC.HUISHOU_OPEN";
	HuishouCenter.HUISHOU_RESULT="HSC.HUISHOU_RESULT";
	HuishouCenter.HUISHOU_AUTO="HSC.HUISHOU_AUTO";
	HuishouCenter.EQUIP_HUISHOU_UPDATE="HSC.EQUIP_HUISHOU_UPDATE";
	HuishouCenter.RONGLIAN_AUTO="HSC.RONGLIAN_AUTO";
	HuishouCenter.RONGLIAN_SET="HSC.RONGLIAN_SET";
	HuishouCenter._huishouRankDict={};
	HuishouCenter._huishouIds=[];
	HuishouCenter._isAutoHuishou=false;
	HuishouCenter.isAutoHun=false;
	HuishouCenter.huishouItemDict={};
	HuishouCenter.huishouOperateDict={};
	HuishouCenter.baoliuDic={};
	HuishouCenter.clickSmeltDict={};
	HuishouCenter.isChangeJob=false;
	HuishouCenter._isAutoSmelt=false;
	HuishouCenter._isRLOtherSex=false;
	__static(HuishouCenter,
	['_smeltRankDict',function(){return this._smeltRankDict={"1":[],"2":[],"3":[]};}
	]);
	return HuishouCenter;
})(GameServer)