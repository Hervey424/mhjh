var TaskEscortItem=(function(_super){
	function TaskEscortItem(isFeixie,isGrid){
		this._vo=null;
		(isFeixie===void 0)&& (isFeixie=true);
		(isGrid===void 0)&& (isGrid=false);
		TaskEscortItem.__super.call(this,isFeixie,isGrid);
		this.title.text="[日]◇";
		this.barTxt.visible=false;
		this.nameTxt.text="押镖任务";
	}

	__class(TaskEscortItem,'com.modules.track.task.TaskEscortItem',_super);
	var __proto=TaskEscortItem.prototype;
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._data=null;
		_super.prototype.destroy.call(this);
	}

  __proto.onClick = function (e) {
		if(!this._vo.taskData)
			return;
		var isCross=this._vo.taskID==640004 || this._vo.taskID==640005 || this._vo.taskID==640006;
		if(isCross){
			this._vo.taskData.taskAcceptID=2086;
			this._vo.taskData.taskFinishID=2087;
		}
		if(this._vo.taskState==0){
			this.transfer(FunctionManager.isFunctionOpen(171)? 2086 :2086);
		}
		else if(this._vo.taskState==1){
			this._vo.findCar();
		}
		else if(this._vo.taskState==2){
			this.transfer(isCross ? 2087 :2087);
		}
	}

	__proto.transfer=function(npcid){
		var data=this._vo.taskData.getConditionData();
		if(data){
			EventMgr.dispatch("TE.taskTransfer",data,JSON.stringify({"npcid":npcid}),1,true);
		}
	}

	__getset(0,__proto,'data',null,function(value){
		var vo=EscortCenter.getData();
		this._vo=vo;
		var topStr;
		var npcId=0;
		if(vo.taskState==1){
			topStr="";
			this.conTxt.text="护送镖车";
		}
		else{
			if(vo.taskState==2){
				topStr="回复";
				npcId=2087;
			}
			else{
				topStr="接取";
				npcId=2086;
			};
			var npc=App.dataMgr.q_npcContainer.getDataBean(npcId);
			if(npc){
				this.conTxt.text=npc.q_name;
			}
		}
		this.state_txt.text="("+vo.acceptCount+"/"+vo.maxCount+")";
		this.typeTxt.text=topStr;
		this.updatePosition();
		this.playFinishEff(vo.taskState==2);
	});

	return TaskEscortItem;
})(TaskItem)