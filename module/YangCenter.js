var YangCenter=(function(_super){
	function YangCenter(){
		YangCenter.__super.call(this);
	}

	__class(YangCenter,'com.modules.yanglegeyang.YangCenter',_super);
	var __proto=YangCenter.prototype;
	__proto.init=function(){
		GameServer.register(S2C_ClgsGetRewardMessage,GameHandler.create(this,this.onS2C_ClgsGetRewardMessage));
	}

	/**羊了个羊-信息返回*/
	__proto.onS2C_ClgsGetRewardMessage=function(cmd){
		com.modules.yanglegeyang.YangCenter.update(cmd.actionType,cmd.id,cmd.rewardRemainTimes,cmd.skillRemainTimes);
	}

	YangCenter.sendC2S_ClgsActionMessage=function(type,id,skillId){
		var cmd=new C2S_ClgsActionMessage();
		cmd.actionType=type;
		cmd.id=id;
		cmd.skillId=skillId;
		GameServer.sendCommand(cmd);
	}

	YangCenter.update=function(actionType,id,rewardRemainTimes,skillRemainTimes){
		if(actionType==0){
			YangCenter.chessData.rewardRemainTimes=rewardRemainTimes;
		}
		else{
			if(YangCenter.chessData.id !=id){
				YangCenter.chessData.initChessBoardData(id);
			}
			YangCenter.chessData.rewardRemainTimes=rewardRemainTimes;
			YangCenter.chessData.updateSkillCount(skillRemainTimes);
			EventMgr.dispatch(YangCenter.UPDATE);
		}
	}

	YangCenter.getSkill=function(skillId){
		switch(skillId){
			case 1:
				return YangCenter.chessData.lookData;
			case 2:
				return YangCenter.chessData.randomData;
			case 3:
				return YangCenter.chessData.removeData;
			case 4:
				return YangCenter.chessData.backData;
			}
		return null;
	}

	YangCenter.UPDATE="YangCenter.UPDATE";
	YangCenter.allowLook=false;
	YangCenter.allowRemove=false;
	YangCenter.allowBack=false;
	YangCenter.status=0;
	__static(YangCenter,
	['chessData',function(){return this.chessData=new YangChessBoardData();}
	]);
	return YangCenter;
})(GameServer)