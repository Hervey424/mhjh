var VipCenter=(function(){
	function VipCenter(){}
	__class(VipCenter,'com.modules.vip.VipCenter');
	__getset(1,VipCenter,'awardState',null,function(value){
		for(var i=0;i < value.length;i++){
			VipCenter._awardDic[1+"_"+2+"_"+(i+1)]=value[i];
		}
	});

	//--------------------------至尊会员领取奖励状态------------------
	__getset(1,VipCenter,'awardZhizunState',null,function(value){
		for(var i=0;i < value.length;i++){
			VipCenter._awardDic[2+"_"+2+"_"+i]=value[i];
		}
	});

	__getset(1,VipCenter,'freeAwardState',null,function(value){
		VipCenter.vipRed=false;
		var vipLv=App.role.vipLevel;
		for(var i=0;i < value.length;i++){
			VipCenter._awardDic[1+"_"+1+"_"+(i+1)]=value[i];
			if(!VipCenter.vipRed && vipLv >=i+1 && value[i]==0){
				VipCenter.vipRed=true;
			}
		}
	});

	VipCenter.isCanAutoHuishou=function(){
		if(FunctionManager.isFunctionOpen(65)){
			return true;
		};
		var act=ActivityCenter.getData(App.dataMgr.q_activitiesContainer.getListByType(339)[0].q_id);
		if(act && act.playerStates==0){
			return true;
		}
		return false;
	}

	VipCenter.isCanAutoBuyDrug=function(needNotice){
		(needNotice===void 0)&& (needNotice=false);
		if(FunctionManager.isFunctionOpen(67,needNotice)){
			return true;
		}
		return false;
	}

	VipCenter.initVipExtraExp=function(value1,value2){
		VipCenter.vipExtraExp=value1;
		VipCenter.vipExtraRecharge=value2;
		EventMgr.dispatch("VIPEXP_EXTRA_CHANGE");
	}

	VipCenter.getTypeName=function(type){
		return type==1 ? "VIP" :"至尊";
	}

	VipCenter.getAwardState=function(vipLv,type,libao){
		(type===void 0)&& (type=1);
		(libao===void 0)&& (libao=2);
		return VipCenter._awardDic[type+"_"+libao+"_"+vipLv] > 0;
	}

	VipCenter.updateAwardSate=function(vipLv,result){
		VipCenter._awardDic[1+"_"+2+"_"+vipLv]=result;
	}

	VipCenter.setClick=function(vipLv){
		VipCenter._awardDic["click_"+1+"_"+2+"_"+vipLv]=1;
	}

	VipCenter.hasVipRed=function(level){
		if(level > 0){
			if((level==1 || VipCenter.getAwardState(level-1,1,1))&& !VipCenter.getAwardState(level,1,1)){
				return true;
			}
			if((level==1 || VipCenter.getAwardState(level-1,1,2))&& !VipCenter.getAwardState(level,1,2)){
				return !VipCenter._awardDic.hasOwnProperty("click_"+1+"_"+2+"_"+level)&& ConditionUtil.isItemEnoughJson(App.dataMgr.q_vipContainer.getDataBean(1000+level).q_vip_need);
			}
		}
		return false;
	}

	VipCenter.updateVipRed=function(){
		VipCenter.vipRed=false;
		var vipLv=App.role.vipLevel;
		for(var i=1;i <=vipLv;i++){
			if(VipCenter.hasVipRed(i)){
				VipCenter.vipRed=true;
				break ;
			}
		}
		EventMgr.dispatch(ActivityEvent.refreshRedPoint,4032,VipCenter.vipRed);
	}

	VipCenter.TYPE_1=1;
	VipCenter.TYPE_2=2;
	VipCenter.LIBAO_1=1;
	VipCenter.LIBAO_2=2;
	VipCenter.isUpShow=false;
	VipCenter.VIP_CHANGE=15;
	VipCenter.isFirst=true;
	VipCenter.vipShareValue=-1;
	VipCenter.vipShareNum=-1;
	VipCenter.vipShareAddNum=0;
	VipCenter.vipExtraExp=0;
	VipCenter.vipExtraRecharge=0;
	VipCenter.totalVip=0;
	VipCenter._awardDic={};
	VipCenter.redPackageNum=0;
	VipCenter.vipRed=false;
	return VipCenter;
})()