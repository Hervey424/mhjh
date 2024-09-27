/**
*自动使用
*@author 胡剑
*创建时间：2023-2-28 下午4:18:37
*
*/
//class com.logic.data.item.AutoUseCenter
var AutoUseCenter=(function(){
	function AutoUseCenter(){}
	__class(AutoUseCenter,'com.logic.data.item.AutoUseCenter');
	AutoUseCenter.setAutoUse=function(type,value,remainTime){
		(remainTime===void 0)&& (remainTime=0);
		var info=AutoUseCenter._dict[type];
		if(!info){
			info=new AutoUseInfo();
			info.type=type;
			AutoUseCenter._dict[type]=info;
		}
		info.value=value;
		info.time=remainTime;
		info.remainTime=myparseInt((remainTime-ServerTime.serverTime)*0.001);
		if(info.remainTime > 0){
			if(type==1){
				AutoUseCenter.add(info);
			}
		}
	}

	AutoUseCenter.getAutoUse=function(type){
		return AutoUseCenter._dict[type];
	}

	AutoUseCenter.isAutoUse=function(type){
		var info=AutoUseCenter._dict[type];
		if(info){
			return info.value !=0;
		}
		return false;
	}

	AutoUseCenter.add=function(info){
		var key=info.type;
		if(key){
			if(!AutoUseCenter._timeDownDict[key]){
				AutoUseCenter._timeCount++;
				AutoUseCenter._timeDownDict[key]=info;
				if(!AutoUseCenter._timeing){
					AutoUseCenter._timeing=true;
					Laya.workerTimer.loop(1000,AutoUseCenter,AutoUseCenter.onTimer);
				}
			}
		}
	}

	AutoUseCenter.onTimer=function(){
		var info;
		for(var key in AutoUseCenter._timeDownDict){
			info=AutoUseCenter._timeDownDict[key];
			if(info){
				info.remainTime--;
				if(info.remainTime <=0){
					AutoUseCenter._timeDownDict[key]=null;
					delete AutoUseCenter._timeDownDict[key];
					AutoUseCenter._timeCount--;
					if(AutoUseCenter._timeCount <=0){
						AutoUseCenter._timeCount=0;
						AutoUseCenter._timeing=false;
						Laya.workerTimer.clear(PanelDispose,AutoUseCenter.onTimer);
						if(GameConfig.isDebug){
							Log.clearLog(6);
						}
					}
					if(info.type==1){
						ItemCommandSender.sendC2S_AutoUseItemMessage(1,0,2);
						if(!MoonCardCenter.hasAutoUseExpMoney()){
							Alert.show("自动使用经验金币时间不足，激活"+MoonCardCenter.getMoonCardName(2,true)+"可永久开启",
							GameHandler.create(PanelOpenManager,PanelOpenManager.openZanzhu),null,true,null,null,true,null,"前往激活");
						}
					}
				}
			}
		}
	}

	AutoUseCenter.EXP=1;
	AutoUseCenter._dict={};
	AutoUseCenter._timeCount=0;
	AutoUseCenter._timeing=false;
	AutoUseCenter._timeDownDict={};
	return AutoUseCenter;
})()