/**
*存贮货币的地方
*@author 胡剑
*创建时间：2021-12-10 下午1:47:33
*
*/
//class com.logic.data.MoneyCenter
var MoneyCenter=(function(){
	function MoneyCenter(){}
	__class(MoneyCenter,'com.logic.data.MoneyCenter');
	MoneyCenter.getName=function(type){
		return EnumMoney.getName(type);
	}

	MoneyCenter.getIcon=function(type){
		return EnumMoney.getIcon(type);
	}

	MoneyCenter.setMoney=function(type,value){
		if(type < 0){type *=-1;}
			MoneyCenter._moneyList[type]=value;
	}

	MoneyCenter.getMoney=function(type){
		if(type < 0){type *=-1;}
			if(MoneyCenter._moneyList){
			return myparseInt(MoneyCenter._moneyList[type]);
		}
		return 0;
	}

	MoneyCenter.getMoneyReplaceBind=function(type,replace){
		(replace===void 0)&& (replace=true);
		var value=MoneyCenter.getMoney(type);
		if(replace){
			if(type==EnumMoney.BIND_YUAN_BAO){
				value+=MoneyCenter.getMoney(EnumMoney.YUAN_BAO);
			}
			else if(type==EnumMoney.BIND_JIN_BI){
				value+=MoneyCenter.getMoney(EnumMoney.JIN_BI);
			}
		}
		return value;
	}

	MoneyCenter.getTotalYuanbao=function(){
		return MoneyCenter.getMoney(EnumMoney.YUAN_BAO)+MoneyCenter.getMoney(EnumMoney.BIND_YUAN_BAO);
	}

	MoneyCenter.getTotalJinbi=function(){
		return MoneyCenter.getMoney(EnumMoney.JIN_BI)+MoneyCenter.getMoney(EnumMoney.BIND_JIN_BI);
	}

	MoneyCenter.getRecover=function(value,type,hasAdd){
		(type===void 0)&& (type=EnumMoney.BIND_JIN_BI);
		(hasAdd===void 0)&& (hasAdd=true);
		value=myparseInt(value);
		if(hasAdd && type==EnumMoney.BIND_JIN_BI){
			var goldRecovery=App.role.abilityInfo.goldRecovery+10000;
			return Math.floor(value *goldRecovery *0.0001);
		}
		return value;
	}

	MoneyCenter.setMoneyLimit=function(type,value){
		MoneyCenter._moneyLimitList[type]=value;
	}

	MoneyCenter.getMoneyLimit=function(type){
		if(MoneyCenter._moneyLimitList==null || isNaN(MoneyCenter._moneyLimitList[type])){
			return 0;
		}
		return MoneyCenter._moneyLimitList[type];
	}

	MoneyCenter.rechargeToday=-1;
	MoneyCenter.rechargeHistory=0;
	MoneyCenter.costToday=0;
	MoneyCenter.costHistory=0;
	MoneyCenter.hongbaoRechargeToday=0;
	MoneyCenter.hongbaoRecharge=0;
	MoneyCenter._moneyList=[];
	MoneyCenter._moneyLimitList=[];
	return MoneyCenter;
})()