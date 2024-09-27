var ActivitiesCommandSender=(function(_super){
	function ActivitiesCommandSender(){
		ActivitiesCommandSender.__super.call(this);;
	}

	__class(ActivitiesCommandSender,'com.logic.connect.sender.ActivitiesCommandSender',_super);
	ActivitiesCommandSender.C2S_ActivityDetailInfos=function(ids){
		if(ids.length > 0){
			var cmd=new C2S_ActivityDetailInfosMessage();
			cmd.activityIds=ids;
			GameServer.sendCommand(cmd);
		}
	}

	ActivitiesCommandSender.C2S_JoinActivityById=function(id,count,extendMap){
		(count===void 0)&& (count=1);
		(extendMap===void 0)&& (extendMap='');
		if(id){
			var cmd=new C2S_JoinActivityMessage();
			cmd.activityId=id;
			cmd.count=count;
			cmd.extendMap=extendMap;
			GameServer.sendCommand(cmd);
			Log.logInfo("ActivitiesCommandSender，参加活动的活动id为："+id);
		}
	}

	ActivitiesCommandSender.C2S_JoinActivitybyIds=function(ids){
		if(ids && ids.length > 0){
			var info;
			var cmd=new C2S_JoinMultipleActivityMessage();
			cmd.joinActivityInfos=[];
			var id;
			for(var $each_id in ids){
				id=ids[$each_id];
				info=new JoinActivityInfo();
				info.activityId=id;
				info.count=1;
				info.extendMap='';
				cmd.joinActivityInfos.push(info);
			}
			GameServer.sendCommand(cmd);
			Log.logInfo("ActivitiesCommandSender，参加活动的活动id为："+ids);
		}
	}

	ActivitiesCommandSender.joinByFuncType=function(type,count,extendMap){
		(count===void 0)&& (count=1);
		(extendMap===void 0)&& (extendMap="");
		var act=ActivityUtil.isOpenByFunType(type,true);
		if(act){
			var cmd=new C2S_JoinActivityMessage();
			cmd.activityId=act.id;
			cmd.count=count;
			cmd.extendMap=extendMap;
			GameServer.sendCommand(cmd);
			return true;
		}
		else{
			if(type==23){
				GameNotice.showMousePosMessage("转生达到5转可参与活动");
			}
			else{
				GameNotice.showMousePosMessage("该活动当前并未开启！");
			}
			return false;
		}
	}

	ActivitiesCommandSender.sendC2S_CardMessage=function(card){
		if(!card){
			GameNotice.showMousePosMessage("请输入激活码");
			return false;
		};
		var cmd=new C2S_CardMessage();
		cmd.card=card;
		GameServer.sendCommand(cmd);
		return true;
	}

	ActivitiesCommandSender.sendC2S_SignMessage=function(day){
		var cmd=new C2S_SignMessage();
		cmd.monthOfDay=day;
		GameServer.sendCommand(cmd);
	}

	ActivitiesCommandSender.sendTencentInviteFriendMessage=function(){
		var cmd=new C2S_TencentInviteFriendMessage();
		GameServer.sendCommand(cmd);
		Log.logInfo("ActivitiesCommandSender，成功发送了一次好友邀请的回调请求");
	}

	ActivitiesCommandSender.sendC2S_PlayerLoginTypeMessage=function(type){
		var cmd=new C2S_PlayerLoginTypeMessage();
		cmd.loginType=type;
		GameServer.sendCommand(cmd);
		Log.logInfo("ActivitiesCommandSender，成功发送了一次登录类型消息的回调请求");
	}

	ActivitiesCommandSender.sendC2S_GetActivityAwardMessage=function(id){
		var cmd=new C2S_GetActivityAwardMessage();
		cmd.activityId=id;
		GameServer.sendCommand(cmd);
	}

	ActivitiesCommandSender.sendC2S_C2S_GameUpdateInfoMessage=function(){
		GameServer.sendCommand(new C2S_GameUpdateInfoMessage());
	}

	ActivitiesCommandSender.sendC2S_GetGameUpdateRewardMessage=function(){
		GameServer.sendCommand(new C2S_GetGameUpdateRewardMessage());
	}

	ActivitiesCommandSender.sendC2S_GetFirstKilledInfoMessage=function(tab){
		(tab===void 0)&& (tab=-1);
		var cmd=new C2S_GetFirstKilledInfoMessage();
		cmd.tab=tab;
		GameServer.sendCommand(cmd);
	}

	ActivitiesCommandSender.sendC2S_MergeAdvZhuanpanInfoMessage=function(activityId){
		var cmd=new C2S_MergeAdvZhuanpanInfoMessage();
		cmd.actid=activityId;
		GameServer.sendCommand(cmd);
	}

	ActivitiesCommandSender.sendC2S_MergeAdvZhuanpanMessage=function(actId,times){
		var cmd=new C2S_MergeAdvZhuanpanMessage();
		cmd.actid=actId;
		cmd.times=times;
		GameServer.sendCommand(cmd);
	}

	ActivitiesCommandSender.sendC2S_GetLuckyFinshTaskIdMessage=function(type){
		var cmd=new C2S_GetLuckyFinshTaskIdMessage();
		cmd.type=type;
		GameServer.sendCommand(cmd);
	}

	ActivitiesCommandSender.sendC2S_ActivityMonsterInfoMessage=function(){
		GameServer.sendCommand(new C2S_ActivityMonsterInfoMessage());
	}

	ActivitiesCommandSender.sendC2S_MyRankTopMessage=function(){
		GameServer.sendCommand(new C2S_MyRankTopMessage());
	}

	ActivitiesCommandSender.getFirstReward=function(id,isAllSever){
		(isAllSever===void 0)&& (isAllSever=false);
		var cmd=new C2S_ReceiveFirstKilledAwardMessage();
		cmd.flg=isAllSever ? 1 :0;
		if((id instanceof Array)){
			cmd.confIds=id;
		}
		else{
			cmd.confId=id;
			cmd.confIds=[];
		}
		GameServer.sendCommand(cmd);
	}

	ActivitiesCommandSender.endZhuanpan=function(actId){
		var cmd=new C2S_EndJueXingZhuanPanMessage();
		cmd.zptype=actId;
		GameServer.sendCommand(cmd);
	}

	ActivitiesCommandSender.sendC2S_OpenTheRedTodayMessage=function(){
		var cmd=new C2S_OpenTheRedTodayMessage();
		cmd.type=2;
		GameServer.sendCommand(cmd);
	}

	ActivitiesCommandSender.sendC2S_TaskCountInfoMessage=function(){
		GameServer.sendCommand(new C2S_TaskCountInfoMessage());
	}

	ActivitiesCommandSender.sendC2S_GetRewardMessage=function(type){
		(type===void 0)&& (type=0);
		var cmd=new C2S_GetRewardMessage();
		cmd.type=type;
		GameServer.sendCommand(cmd);
	}

	ActivitiesCommandSender.sendC2S_PlayerPrayMessage=function(type){
		(type===void 0)&& (type=0);
		var cmd=new C2S_PlayerPrayMessage();
		cmd.type=type;
		GameServer.sendCommand(cmd);
	}

	ActivitiesCommandSender.sendC2S_SetActDetialMessage=function(actType,type){
		(type===void 0)&& (type=1);
		var bool=ActivityCenter.addPushActType(actType,type);
		if(bool){
			var cmd=new C2S_SetActDetialMessage();
			cmd.id=actType;
			cmd.type=type;
			GameServer.sendCommand(cmd);
		}
	}

	ActivitiesCommandSender.sendC2S_GetActivityLogsMessage=function(logId){
		var cmd=new C2S_GetActivityLogsMessage();
		cmd.logId=logId;
		GameServer.sendCommand(cmd);
	}

	ActivitiesCommandSender.sendC2S_QifuMessage=function(type){
		var cmd=new C2S_QifuMessage();
		cmd.type=type;
		GameServer.sendCommand(cmd);
	}

	ActivitiesCommandSender.sendC2S_LuckyDirectInfoMessage=function(type){
		var msg=new C2S_LuckyDirectInfoMessage();
		msg.type=type;
		GameServer.sendCommand(msg);
	}

	ActivitiesCommandSender.sendC2S_HongbaoOpenMessage=function(id,roleId){
		var cmd=new C2S_HongbaoOpenMessage();
		cmd.id=id;
		cmd.roleId=Int64.parseInt64(roleId);
		GameServer.sendCommand(cmd);
	}

	return ActivitiesCommandSender;
})(GameServer)