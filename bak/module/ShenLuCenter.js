var ShenLuCenter=(function(_super){
	function ShenLuCenter(){
		ShenLuCenter.__super.call(this);;
	}

	__class(ShenLuCenter,'com.modules.shenLu.ShenLuCenter',_super);
	var __proto=ShenLuCenter.prototype;
	//--------------------------------S2C-----------------------------------------
	__proto.init=function(){
		GameServer.register(S2C_BloodInfoMessage,GameHandler.create(this,this.onS2C_BloodInfoMessage));
		GameServer.register(S2C_BloodChangeMessage,GameHandler.create(this,this.onS2C_BloodChangeMessage));
	}

	__proto.onS2C_BloodInfoMessage=function(cmd){
		com.modules.shenLu.ShenLuCenter.load(cmd.bloodInfoList);
	}

	__proto.onS2C_BloodChangeMessage=function(cmd){
		if(cmd.blood.bloodType==6){
			NeiGongCenter.updateNeiGong(cmd.blood);
		}
		else{
			com.modules.shenLu.ShenLuCenter.change(cmd.blood);
		}
	}

	ShenLuCenter.getTypeNames=function(){
		var arr=[];
		for (var i=0;i < ShenLuCenter.SHENLU_TYPES.length;i++){
			arr.push(ShenLuCenter.getName(ShenLuCenter.SHENLU_TYPES[i]));
		}
		return arr;
	}

	ShenLuCenter.getName=function(type){
		return ShenLuCenter.getData(type).name;
	}

	ShenLuCenter.getFuncIdByType=function(type){
		switch(type){
			case 1:return 51;
			case 2:return 52;
			case 3:return 54;
			case 4:return 53;
			case 5:return 55;
			case 6:return 79;
			}
		return 51;
	}

	ShenLuCenter.sendC2S_BloodInfoMessage=function(){
		GameServer.sendCommand(new C2S_BloodInfoMessage());
	}

	ShenLuCenter.sendC2S_BloodActiveMessage=function(type,flag){
		var cmd=new C2S_BloodActiveMessage();
		cmd.bloodType=type;
		cmd.flag=flag;
		GameServer.sendCommand(cmd);
	}

	ShenLuCenter.sendC2S_ChangeShenMoSkinMessage=function(type){
		var cmd=new C2S_ChangeShenMoSkinMessage();
		cmd.skinType=type;
		GameServer.sendCommand(cmd);
	}

	ShenLuCenter.load=function(infos){
		if(infos==null)
			return;
		var bool=false;
		var info;
		for(var $each_info in infos){
			info=infos[$each_info];
			if(info.bloodType==6){
				NeiGongCenter.updateNeiGong(info);
			}
			else{
				bool=true;
				ShenLuCenter.getData(info.bloodType).convert(info);
				if(info.bloodType==100 && App.role){
					App.role.setWearId(EnumSurfaceType.TYPE_1,info.wearId);
					(App.role.roleView).changeShenmo(info.wearId);
				}
			}
		}
		if(bool){
			ShenLuCenter.isCanUp();
		}
	}

	ShenLuCenter.change=function(info){
		var data=ShenLuCenter.getData(info.bloodType);
		if(!data.activate){
			data.convert(info);
			ShenLuCenter.isCanUp(info.bloodType);
			EventMgr.dispatch("ShenLuCenter.ACTIVE",data.type);
		}
		else if(info.bloodId > data.id){
			if(App.dataMgr.q_xuemaiContainer.shenmos.indexOf(data.type)< 0){
				PanelManager.openByClass(SuccessPanel,data,2,true);
			}
			data.convert(info);
			ShenLuCenter.isCanUp(info.bloodType);
			EventMgr.dispatch("ShenLuCenter.UP",data.type);
			App.sound.playSound("newstar");
		}
		else if(info.star > data.star){
			data.convert(info);
			ShenLuCenter.isCanUp(info.bloodType);
			EventMgr.dispatch("ShenLuCenter.STAR",data.type);
		}
	}

	ShenLuCenter.getData=function(type){
		var data=ShenLuCenter._dict[type];
		if(data==null){
			data=new ShenluData(type);
			data.functionID=ShenLuCenter.getFuncIdByType(type);
			ShenLuCenter._dict[type]=data;
		}
		return data;
	}

	ShenLuCenter.isCanUp=function(type){
		(type===void 0)&& (type=0);
		var key=0;
		if(type==0 || type < 6){
			if(FunctionManager.isFunctionOpen(51)){
				if(type > 0){
					ShenLuCenter.getData(type).checkPoint();
				}
				else{
					var $each_key;
					for($each_key in ShenLuCenter.SHENLU_TYPES){
						key=ShenLuCenter.SHENLU_TYPES[$each_key];
						ShenLuCenter.getData(key).checkPoint();
					}
				}
				EventMgr.dispatch("ET.FUNCTION_TIP",51,ShenLuCenter.getShenLuPoint());
				App.menuProxy.openStrong(1050000,ShenLuCenter.getShenLuPoint());
			}
		}
		if(type==0 || App.dataMgr.q_xuemaiContainer.shenmos.indexOf(type)>=0){
			if(FunctionManager.isFunctionOpen(259)){
				ShenLuCenter.shenmoRed=0;
				ShenLuCenter.shenmoEquipRed=false;
				var info=ShenLuCenter.getData(100);
				ShenLuCenter.bool100=info.bean.q_quality > 1 || info.star >=info.bean.q_max_layer;
				if(ShenLuCenter.bool100){
					var item;
					for(var $each_item in BagItemCenter.itemList){
						item=BagItemCenter.itemList[$each_item];
						if(item && item.getDataBean().q_client_type==122 && item.getDataBean().q_huishou){
							ShenLuCenter.shenmoEquipRed=true;
							break ;
						}
					}
				}
				if(!ShenLuCenter.shenmoEquipRed){
					var $each_key;
					for($each_key in App.dataMgr.q_xuemaiContainer.shenmos){
						key=App.dataMgr.q_xuemaiContainer.shenmos[$each_key];
						if(ShenLuCenter.isShenmoRed(key,false,true)){
							ShenLuCenter.shenmoEquipRed=true;
							break ;
						}
					}
				}
				if(!ShenLuCenter.shenmoEquipRed){
					var $each_key;
					for($each_key in App.dataMgr.q_xuemaiContainer.shenmos){
						key=App.dataMgr.q_xuemaiContainer.shenmos[$each_key];
						if(ShenLuCenter.isShenmoRed(key,true,false)){
							ShenLuCenter.shenmoRed=key;
							break ;
						}
					}
				}
				JunXianCenter.dispatchPoint();
			}
		}
	}

	ShenLuCenter.isShenmoRed=function(type,isBody,isEquip){
		if(type > 100 && !ShenLuCenter.bool100){
			return false;
		};
		var info=ShenLuCenter.getData(type);
		if(info.activate){
			if(isBody){
				if(!info.isMax()&& ConditionUtil.isItemEnoughJson(info.bean.q_cost)&& MoneyCenter.getMoneyReplaceBind(EnumMoney.BIND_YUAN_BAO)>=ShenLuCenter.getMoney(info)){
					return true;
				}
				if(type > 100 && SkillCenter.getPassSkill(info.bean.q_desc)&& SkillCenter.isPassSkillCanUp(info.bean.q_desc)){
					return true;
				}
			}
			if(isEquip && ShenLuCenter.bool100){
				var part;
				for(var $each_part in info.parts){
					part=info.parts[$each_part];
					if(ShenLuCenter.isShenmoEquip(part)){
						return true;
					}
				}
			}
		}
		else if(isBody){
			if(type > 100){
				return info.bean.q_open_limit && ConditionUtil.isItemEnoughObject(JSON.parse(info.bean.q_open_limit)[0]);
			}
		}
		return false;
	}

	ShenLuCenter.isShenmoEquip=function(part){
		var wear=WearEquipCenter.getEquipByPart(part);
		var fuse;
		if(wear){
			fuse=App.dataMgr.q_equip_ComposeContainer.getDataBean(wear.getDataBean().q_fuse_id,false);
		}
		else{
			fuse=App.dataMgr.q_equip_ComposeContainer.getBeanByItemId(EnumEquipType.getDefaultId(part));
		}
		return HechengUtil.isCompose(fuse);
	}

	ShenLuCenter.getMoney=function(info){
		if(Q_globalCenter.getJsonData(40015).indexOf(info.type)< 0){
			return 0;
		}
		return (info.bean.q_quality_lv+info.star+1)*App.dataMgr.q_globalContainer.getDataBean(40015).q_int_value;
	}

	ShenLuCenter.getShenLuPoint=function(){
		var type;
		for(var $each_type in ShenLuCenter.SHENLU_TYPES){
			type=ShenLuCenter.SHENLU_TYPES[$each_type];
			if(ShenLuCenter.getData(type).getPoint()){
				return true;
			}
		}
		return false;
	}

	ShenLuCenter.ACTIVE="ShenLuCenter.ACTIVE";
	ShenLuCenter.STAR="ShenLuCenter.STAR";
	ShenLuCenter.UP="ShenLuCenter.UP";
	ShenLuCenter.TYPE_1=1;
	ShenLuCenter.TYPE_2=2;
	ShenLuCenter.TYPE_3=3;
	ShenLuCenter.TYPE_4=4;
	ShenLuCenter.TYPE_5=5;
	ShenLuCenter.TYPE_6=6;
	ShenLuCenter.TYPE_100=100;
	ShenLuCenter._dict={};
	ShenLuCenter.bool100=false;
	ShenLuCenter.shenmoRed=false;
	ShenLuCenter.shenmoEquipRed=false;
	__static(ShenLuCenter,
	['SHENLU_TYPES',function(){return this.SHENLU_TYPES=[1,2,3,4,5];}
	]);
	return ShenLuCenter;
})(GameServer)