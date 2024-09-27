/**
*全局表经常使用的数据避免频繁解析，可以保存在这
*@author 胡剑
*创建时间：2022-8-6 下午4:31:15
*
*/
//class com.logic.data.Q_globalCenter
var Q_globalCenter=(function(){
	function Q_globalCenter(){}
	__class(Q_globalCenter,'com.logic.data.Q_globalCenter');
	/**
	*{"min":80,"max":999,"time":30,"openPanelTime":60,"closePanelTime":3}
	*@return
	*
	*/
	__getset(1,Q_globalCenter,'autoHookObj',function(){
		return com.logic.data.Q_globalCenter.getJsonData(279);
	});

	/**
	*临时背包格子数
	*/
	__getset(1,Q_globalCenter,'tempBagGrids',function(){
		return com.logic.data.Q_globalCenter.getInt(649);
	});

	Q_globalCenter.clear=function(){
		Q_globalCenter._intDic={};
		Q_globalCenter._dataDic={};
	}

	Q_globalCenter.getBean=function(id){
		return App.dataMgr.q_globalContainer.getDataBean(id,false);
	}

	Q_globalCenter.getInt=function(q_id){
		if(!Q_globalCenter._intDic[q_id]){
			var bean=Q_globalCenter.getBean(q_id);
			if(bean){
				Q_globalCenter._intDic[q_id]=bean.q_int_value;
			}
		}
		return myparseInt(Q_globalCenter._intDic[q_id]);
	}

	Q_globalCenter.getJsonData=function(q_id,isParse){
		(isParse===void 0)&& (isParse=true);
		if(!Q_globalCenter._dataDic[q_id]){
			var bean=Q_globalCenter.getBean(q_id);
			if(bean && bean.q_string_value){
				if(isParse){
					Q_globalCenter._dataDic[q_id]=JSON.parse(bean.q_string_value);
					}else{
					Q_globalCenter._dataDic[q_id]=bean.q_string_value;
				}
			}
		}
		return Q_globalCenter._dataDic[q_id];
	}

	Q_globalCenter.isTempItem=function(itemId){
		var arr=com.logic.data.Q_globalCenter.getJsonData(649);
		return arr.indexOf(itemId)!=-1;
	}

	Q_globalCenter.isAutoUseItem=function(itemId){
		var arr=com.logic.data.Q_globalCenter.getJsonData(15024);
		return arr.indexOf(itemId)!=-1;
	}

	Q_globalCenter.getUseItemTime=function(type){
		if(!Q_globalCenter._useItemTime){
			Q_globalCenter._useItemTime=Q_globalCenter.getBean(307).q_string_value.split("_");
		}
		return myparseInt(Q_globalCenter._useItemTime[type]);
	}

	Q_globalCenter.isMainMenuActId=function(actId){
		if(!Q_globalCenter._mainMenuActIds){
			Q_globalCenter._mainMenuActIds=[];
			var arr=com.logic.data.Q_globalCenter.getJsonData(15070);
			if(arr){
				var obj;
				for(var i=0;i < arr.length;i++){
					obj=arr[i];
					if(obj["activity"]){
						Q_globalCenter._mainMenuActIds.push(obj["activity"]);
					}
				}
			}
		}
		actId=Q_globalCenter._mainMenuActIds.indexOf(actId);
		return actId >-1;
	}

	Q_globalCenter._intDic={};
	Q_globalCenter._dataDic={};
	Q_globalCenter._useItemTime=null;
	Q_globalCenter._mainMenuActIds=null;
	return Q_globalCenter;
})()