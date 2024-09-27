/**
*进阶数据中心
*@author 胡剑
*创建时间：2018-4-11 下午10:45:26
*
*/
//class com.logic.data.advance.AdvanceCenter
var AdvanceCenter=(function(){
	function AdvanceCenter(){}
	__class(AdvanceCenter,'com.logic.data.advance.AdvanceCenter');
	AdvanceCenter.addData=function(data){
		AdvanceCenter._dict[data.type]=data;
	}

	AdvanceCenter.getData=function(type){
		return AdvanceCenter._dict[type];
	}

	AdvanceCenter.getLevel=function(type){
		var lv=App.role.getAdvanceAddLevel(type);
		var data=AdvanceCenter.getData(type);
		if(data){
			lv+=data.level;
		}
		return lv;
	}

	AdvanceCenter.isLevelEnough=function(faqiId){
		return AdvanceCenter.getLevel(faqiId / 100 >> 0)>=faqiId % 100;
	}

	AdvanceCenter.updateRed=function(delay){
		(delay===void 0)&& (delay=true);
		if(delay){
			App.redPoint.callLater(AdvanceCenter,AdvanceCenter.updateRed,[false]);
			return;
		}
		var type;
		for(var $each_type in AdvanceCenter.TYPE_ADVA){
			type=AdvanceCenter.TYPE_ADVA[$each_type];
			AdvanceCenter.updateAdvanceRed(type);
			HuaxingCenter.updateRed(type);
		}
		AdvanceCenter.updateAdvanceRed(1);
		FashionCenter.updateRed(1);
		FashionCenter.updateRed(2);
	}

	AdvanceCenter.updateAdvanceRed=function(type){
		if(type==1){
			if(!FunctionManager.isFunctionOpen(50)|| !ZuoQiCenter.getZuoqi(50000)){
				return;
			}
		}
		else if(!FunctionManager.isFunctionOpen(AdvanceCenter.funIds[AdvanceCenter.TYPE_ADVA.indexOf(type)])){
			return;
		};
		var advance=AdvanceCenter.getData(type);
		if(!advance)return;
		var red=false,arr,i=0,lv=AdvanceCenter.getLevel(type);
		var bean=App.dataMgr.q_faqiContainer.getDataBean(advance.id,false);
		if(!bean)return;
		if(bean.q_next_id > 0 && advance.star < bean.q_max_star && bean.q_levelup_consume){
			red=true;
			var have=0,bool=true,costs=JSON.parse(bean.q_levelup_consume.split(';')[advance.star]);
			for(i=0;i < costs.length;i++){
				have=BagItemCenter.getItemCount(costs[i].id);
				if(have < costs[i].num *3){
					bool=false;
					if(have < costs[i].num){
						red=false;
						break ;
					}
				}
			}
			if(bool && Browser.onPC && !AdvancePrompt.isPrompt(type)){
				PanelManager.openByClass(AdvancePrompt,type,-1,false,App.stageLayer.popLayer2);
			}
		}
		if(type==1){
			red=red || AdvanceCenter.isRedBy(400+com.logic.data.advance.AdvanceCenter.getPositionIndex(type),lv)|| AdvanceCenter.isRedBy(1000+com.logic.data.advance.AdvanceCenter.getPositionIndex(type),lv);
		}
		if(red !=AdvanceCenter.reddic[type]){
			AdvanceCenter.reddic[type]=red;
			if(type==1){
				ZuoQiCenter.sendNotice();
			}
			else{
				AdvanceCenter.sendNotice();
			}
		}
	}

	AdvanceCenter.isRedBy=function(group,lv){
		var bean,faqi,wear,item,items=BagItemCenter.itemList;
		var parts=EnumEquipType.getParts(group);
		var part;
		for(var $each_part in parts){
			part=parts[$each_part];
			wear=WearEquipCenter.getEquipByPart(part);
			var $each_item;
			for($each_item in items){
				item=items[$each_item];
				if(!item)continue ;
				bean=item.getDataBean();
				if(bean.q_type !=1 || item.part !=part){
					continue ;
				}
				if(bean.q_special_limit){
					var obj=JSON.parse(bean.q_special_limit);
					if(obj.hasOwnProperty("q_faqi")){
						if(lv < myparseInt(obj["q_faqi"])% 100){
							continue ;
						}
					}
				}
				if(wear ? bean.q_rank > wear.rank :true){
					return true;
				}
			}
		}
		return false;
	}

	AdvanceCenter.sendNotice=function(){
		if(!App.menuProxy){
			return;
		};
		var red=false;
		for(var i=0;i < AdvanceCenter.TYPE_ADVA.length;i++){
			if(AdvanceCenter.reddic[AdvanceCenter.TYPE_ADVA[i]]){
				red=true;
				break ;
			}
		}
		EventMgr.dispatch("ET.FUNCTION_TIP",81,red);
		App.menuProxy.openStrong(1030000,red);
	}

	AdvanceCenter.getTypeName=function(type){
		return Q_globalCenter.getJsonData(340)[type];
	}

	AdvanceCenter.getResId=function(modelId){
		var resId;
		var jinjieInfo=App.dataMgr.q_jinjieContainer.getDataBean(modelId,false);
		if(jinjieInfo){
			resId=jinjieInfo.q_show_id;
		}
		if(!resId){
			var itemCfg=App.dataMgr.q_itemContainer.getDataBean(modelId,false);
			if(itemCfg){
				resId=itemCfg.q_equip_resource;
			}
		}
		return resId;
	}

	AdvanceCenter.getPositionIndex=function(type){
		switch(type){
			case 1:return 7;
			case 3:return 1;
			case 2:return 2;
			case 5:return 3;
			case 6:return 4;
			case 9:return 5;
			case 8:return 6;
			}
		return 0;
	}

	AdvanceCenter.getFengChanLingID=function(type){
		switch(type){
			case 1:
				return 8727;
			case 3:
				return 8728;
			case 9:
				return 8729;
			case 8:
				return 8730;
			case 5:
				return 8731;
			}
		return 0;
	}

	AdvanceCenter.getFengChanLingAddCount=function(id){
		var type=0;
		switch(id){
			case 8728:{
					type=38;
					break ;
				}
			case 8729:{
					type=39;
					break ;
				}
			case 8730:{
					type=40;
					break ;
				}
			case 8731:{
					type=47;
					break ;
				}
			case 8727:{
					type=41;
					break ;
				}
			};
		var bean=App.dataMgr.q_globalContainer.getDataBean(15069);
		var parse=JSON.parse(bean.q_string_value);
		var arr=parse[type];
		if(arr){
			return arr[0];
		}
		return null;
	}

	AdvanceCenter.getFengChanLingActivityData=function(type){
		var id=0;
		switch(type){
			case 1:
				id=41012;
				break ;
			case 3:
				id=41022;
				break ;
			case 9:
				id=41042;
				break ;
			case 8:
				id=41032;
				break ;
			case 5:
				id=41052;
				break ;
			}
		if(id > 0){
			var data=ActivityCenter.getData(id);
			if(data && data.activityStates==1 && data.playerStates !=0){
				return data;
			}
		}
		return null;
	}

	AdvanceCenter.getFengChanLingJumpID=function(type){
		switch(type){
			case 1:
				return 1310201;
			case 3:
				return 1310202;
			case 9:
				return 1310204;
			case 8:
				return 1310206;
			case 5:
				return 1310208;
			}
		return 0;
	}

	AdvanceCenter.UPDATE="AdvanceEvent.UPDATE";
	AdvanceCenter.TYPE_1=1;
	AdvanceCenter.TYPE_2=2;
	AdvanceCenter.TYPE_3=3;
	AdvanceCenter.TYPE_4=4;
	AdvanceCenter.TYPE_5=5;
	AdvanceCenter.TYPE_6=6;
	AdvanceCenter.TYPE_7=7;
	AdvanceCenter.TYPE_8=8;
	AdvanceCenter.TYPE_9=9;
	AdvanceCenter._dict={};
	AdvanceCenter.reddic={};
	__static(AdvanceCenter,
	['TYPE_ADVA',function(){return this.TYPE_ADVA=[3,9,8,5,6];},'equipFunIds',function(){return this.equipFunIds={1:385,3:382,5:383,6:384};},'funIds',function(){return this.funIds=[81,146,138,139,137];}
	]);
	return AdvanceCenter;
})()