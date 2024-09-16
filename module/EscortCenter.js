var EscortCenter=(function(){
	function EscortCenter(){}
	__class(EscortCenter,'com.modules.escort.EscortCenter');
	//最大劫镖次数
	__getset(1,EscortCenter,'map',function(){
		if(EscortCenter._map==null){
			EscortCenter._map={};
			var all=App.dataMgr.q_yabiao_taskContainer.getList();
			for (var i=0;i < all.length;i++){
				var bean=all[i];
				var data=new EscortData();
				data.init(bean);
				data.maxCount=EscortCenter.getAcceptMaxCount();
				EscortCenter._map[data.taskID]=data;
			}
		}
		return EscortCenter._map;
	});

	EscortCenter.finishTask=function(taskData){
		var data=EscortCenter.change(taskData);
		if(App.role.mapId==250000){
			TransferManager.transferToNPC(2086);
		}
		else if(data && data.remainCount > 0){
			TransferManager.transferToNPC(2086);
		}
	}

	EscortCenter.showEscrotTips=function(arr,isShow){}
	EscortCenter.change=function(task,del){
		(del===void 0)&& (del=false);
		var data=EscortCenter.getData(task.taskID);
		if(data==null)
			return null;
		data.update(task,del);
		return data;
	}

	EscortCenter.getTask=function(){
		var data=EscortCenter.getData();
		if(data){
			return data.taskData;
		}
		return null;
	}

	EscortCenter.getCurrentDoingData=function(){
		var mapid=App.role ? App.role.mapId :0;
		for(var k in EscortCenter.map){
			var data=EscortCenter.map[k];
			if(data.mapId==mapid && (data.taskState==1 || data.taskState==2)){
				return data;
			}
		}
		return null;
	}

	EscortCenter.getData=function(taskID){
		(taskID===void 0)&& (taskID=-1);
		if(taskID==-1){
			var data=EscortCenter.getCurrentDoingData();
			if(data)return data;
			var $each_data;
			for($each_data in EscortCenter.map){
				data=EscortCenter.map[$each_data];
				return data;
			}
		}
		return EscortCenter.map[taskID];
	}

	EscortCenter.getList=function(npcid){
		var arr=[];
		for(var k in EscortCenter.map){
			if((EscortCenter.map [k]).npcid==npcid){
				arr.push(EscortCenter.map[k]);
			}
		}
		arr.sort(function(a,b){
			return a.bean.q_quality > b.bean.q_quality ? 1 :-1;
		});
		return arr;
	}

	EscortCenter.getRobMaxCount=function(){
		if(EscortCenter._robMaxCount==0){
			var bean=DataManager.getInstance().q_globalContainer.getDataBean(12060,false);
			EscortCenter._robMaxCount=bean ? bean.q_int_value :3;
		}
		return EscortCenter._robMaxCount;
	}

	EscortCenter.getAcceptMaxCount=function(){
		if(EscortCenter._acceptMaxCount==0){
			var bean=DataManager.getInstance().q_globalContainer.getDataBean(12059,false);
			EscortCenter._acceptMaxCount=bean ? bean.q_int_value :3;
		}
		return EscortCenter._acceptMaxCount;
	}

	EscortCenter._map=null;
	EscortCenter._robMaxCount=0;
	EscortCenter._acceptMaxCount=0;
	return EscortCenter;
})()