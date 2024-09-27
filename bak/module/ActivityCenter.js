/**
*活动数据中心
*2016-1-28 下午5:20:53
*@author 卓琦
**/
//class com.logic.data.activity.ActivityCenter
var ActivityCenter=(function(){
	function ActivityCenter(){}
	__class(ActivityCenter,'com.logic.data.activity.ActivityCenter');
	__getset(1,ActivityCenter,'needPushActType',function(){return ActivityCenter._needPushActType;});
	ActivityCenter.addClickIcon=function(id){
		ActivityCenter._clickIconDict[id]=true;
	}

	ActivityCenter.showVersion=function(){
		return com.logic.data.activity.ActivityCenter.updateVersionInfo && com.logic.data.activity.ActivityCenter.updateVersionInfo.isGet==1;
	}

	ActivityCenter.getData=function(id){
		if(!id){
			return null;
		}
		return ActivityCenter._actDict[id];
	}

	ActivityCenter.getDataByType=function(type){
		var arr=App.dataMgr.q_activitiesContainer.getListByType(type);
		if(arr && arr.length > 0){
			return ActivityCenter.getData(arr[0]["q_id"]);
		}
		return null;
	}

	ActivityCenter.loadBrief=function(arr){
		var data,hasMainIcon=false,changeDic={};
		var info;
		for(var $each_info in arr){
			info=arr[$each_info];
			data=ActivityCenter._actDict[info.activityId];
			if(!data){
				data=new ActivityData();
				ActivityCenter._actDict[info.activityId]=data;
			}
			data.setBriefInfo(info);
			if(!changeDic[data.type]){
				changeDic[data.type]=data.type;
			}
			if(!hasMainIcon && Q_globalCenter.isMainMenuActId(data.id)){
				hasMainIcon=true;
			}
			ActivityCenter.updateFunctionTypeDict(data);
		}
		if(ActivityCenter.isFirstLogin){
			LoginNeedTipManager.loginRequestActivity();
			ActivityCenter.isOpenYYPanel();
		}
		ActivityCenter.sendChangeActivity(changeDic,ActivityEvent.REFRESH_JIANYAO);
		if(WebParams.agent==EnumPlatform.PLAT_360WAN){
			data=com.logic.data.activity.ActivityCenter.getData(10938);
			if(data !=null && data.activityStates==1 && data.playerStates !=0){
				if(!ActivityCenter._is360Smrz){
					ActivityCenter._is360Smrz=true;
					var panel=new Platform360Smrz();
					App.stageLayer.tipLayer.addChild(panel);
					panel.centerToStage(true);
					panel.show(data.id);
				}
			}
		}
		if(hasMainIcon){
			App.menuProxy.showSpecialIcon();
		}
		ActivityCenter.isFirstLogin=false;
	}

	ActivityCenter.changeActivity=function(data,isOpen,time){
		data.time=time;
		data.activityStates=isOpen ? 1 :0;
		com.logic.data.activity.ActivityCenter.updateFunctionTypeDict(data);
		if(App.role==null){
			Log.logError("ActivityCenter::changeActivity, 活动数据快于人物数据时，不处理此协议");
			return;
		}
		if(!ActivityCenter._changeDic){
			ActivityCenter._changeDic={};
			App.timer.doTimeOnce(ActivityCenter,100,ActivityCenter.delayChangeActivity);
		}
		ActivityCenter._changeDic[data.type]=data.type;
	}

	ActivityCenter.delayChangeActivity=function(){
		var type;
		for(var $each_type in ActivityCenter._changeDic){
			type=ActivityCenter._changeDic[$each_type];
			EventMgr.dispatch(ActivityEvent.REFRESH_DETAIL,type);
		}
		ActivityCenter._changeDic=null;
		ActivityCenter.executeActivityIcon();
	}

	ActivityCenter.loadDetail=function(arr){
		var data,hasMainIcon=false,changeDic={};
		var info;
		for(var $each_info in arr){
			info=arr[$each_info];
			data=ActivityCenter.getData(info.activityId);
			if(!data){
				data=new ActivityData();
				ActivityCenter._actDict[info.activityId]=data;
			}
			data.setDetailInfo(info);
			if(!changeDic[data.type]){
				changeDic[data.type]=data.type;
			}
			if(!hasMainIcon && Q_globalCenter.isMainMenuActId(data.id)){
				hasMainIcon=true;
			}
			ActivityCenter.updateFunctionTypeDict(data);
		}
		ActivityCenter.sendChangeActivity(changeDic,ActivityEvent.REFRESH_DETAIL);
		if(hasMainIcon){
			App.menuProxy.showSpecialIcon();
		}
	}

	ActivityCenter.sendChangeActivity=function(changeDic,event){
		ActivityCenter.executeActivityIcon();
		var type;
		for(var $each_type in changeDic){
			type=changeDic[$each_type];
			if(type==1){
				ActivityCenter.activityHallMsg(type);
			}
			ActivityCenter.refreshRedPoint(type);
			EventMgr.dispatch(event,type);
		}
	}

	ActivityCenter.refreshActivityIcon=function(actId){
		App.timer.doTimeOnce(ActivityCenter,130,ActivityCenter.executeActivityIcon);
	}

	ActivityCenter.executeActivityIcon=function(){
		EnterButtonManager.ins.showButtonByStarttime();
		EnterButtonManager.ins.showButtonByActivity();
		ActivityCenter.checkGCZ();
	}

	ActivityCenter.refreshRedPoint=function(type){
		var i=0,j=0;
		var data,data2,arr,obj,isRedPoint=false,icon=null;
		if(type==1){
			WulingdahuiCenter.setActivityTime();
		}
		else if(type==1420 || type==4058){
			JieriRedPoint.updateRed(type,1004);
		}
		else if(type==100){
			JieriRedPoint.setRed(type,ActivityUtil.isCanGet(App.dataMgr.q_activitiesContainer.getListByType(type)[0].q_id));
			if(Browser.onPC){
				App.mainPanel.mainHead.pay_btn.showRedPoint(JieriRedPoint.isRed(type),22,1);
			}
			else{
				App.mainPanel.mainHead.pay_btn.showRedPoint(JieriRedPoint.isRed(type));
			}
		}
		else if(type==338){
		}
		else if(type==339){
			ActivityCenter.updateShouchong();
			EventMgr.dispatch(ActivityEvent.refreshRedPoint,1088,ActivityUtil.isCanGetByType(type));
		}
		else if(type==1102){
			isRedPoint=ActivityUtil.isCanGetByType(type);
			EventMgr.dispatch(ActivityEvent.refreshRedPoint,1201,isRedPoint);
			App.menuProxy.openStrong(1103,isRedPoint);
		}
		else if(type==160){
			JieriRedPoint.updateRed(type,1045);
		}
		else if(type==145){
			MallRedPoint.updateHeizuan();
		}
		else if(EnumActivityType.TYPES2.indexOf(type)!=-1){
			JieriRedPoint.updateRed(type,2001);
		}
		else if(type==383 || type==384){
			isRedPoint=ActivityUtil.isCanGetByType(383);
			if(!isRedPoint){
				data=ActivityUtil.getOpenList(384)[0];
				if(data && data.extendMap){
					obj=JSON.parse(data.extendMap);
					isRedPoint=!Boolean(obj.isweiduan)|| myparseInt(obj.joinday)!=1;
				}
			}
			EventMgr.dispatch(ActivityEvent.refreshRedPoint,3119,isRedPoint);
		}
		else if(type==269){
			isRedPoint=ActivityUtil.isCanGetByType(type);
			EventMgr.dispatch(ActivityEvent.refreshRedPoint,1084,isRedPoint);
			EventMgr.dispatch(ActivityEvent.refreshRedPoint,1085,isRedPoint);
		}
		else if(type===182 || type===640){
			JieriRedPoint.updateRed(type);
			EventMgr.dispatch("RmbCenter.RED");
		}
		else if(EnumActivityType.YUEKA.indexOf(type)!=-1){
			JieriRedPoint.updateRed(type);
			DailyCenter.sendNotice();
		}
		else if(EnumActivityType.TYPES1.indexOf(type)!=-1){
			if(type==1261 || type==1267){
				type--;
			}
			JieriRedPoint.updateRed(type,2004);
		}
		else if(EnumActivityType.TYPES6.indexOf(type)!=-1){
			if(type !=10024 && type !=10025){
				JieriRedPoint.updateRed(type,8005);
			}
		}
		else if(EnumActivityType.TYPES7.indexOf(type)!=-1){
			if(type !=10035 && type !=10036){
				JieriRedPoint.updateRed(type,8009);
			}
		}
		else if(type==546){
			MallRedPoint.sendNotice();
		}
		else if(type==547 || type==840){
			JieriRedPoint.updateRedByType(type);
		}
		else if(type==62){
			isRedPoint=ActivityUtil.isCanGetByType(62);
			EventMgr.dispatch(ActivityEvent.refreshRedPoint,2005,isRedPoint);
		}
		else if(EnumActivityType.TYPES_XFTH.indexOf(type)!=-1){
			if(type !=123 || type !=EnumActivityType.TYPE_5600){
				JieriRedPoint.updateRed(type,4027);
			}
		}
		else if(type==915){
			JieriRedPoint.sendJianfuRed();
			JianfuCardCenter.settingHandler();
		}
		else if(type==4069){
			FeiShengCenter.checkYuGaoPoint();
			FeiShengCenter.autoAct();
		}
		else if(type==462){
			isRedPoint=ActivityUtil.isCanGetByType(type);
			EventMgr.dispatch(ActivityEvent.refreshRedPoint,3053,isRedPoint);
		}
		else if(JieriRedPoint.ADVANCE_PK_TYPES.indexOf(type)!=-1){
			JieriRedPoint.updateRed(type,3064);
		}
		else if(SevenFengshenCenter.TYPE.indexOf(type)!=-1){
			SevenFengshenCenter.onRedPoint();
		}
		else if(type==EnumActivityType.TYPE_350){
			JieriRedPoint.updateRed(type,1080);
		}
		else if(type==828 || type==845){
			isRedPoint=ActivityUtil.isCanGetByType(828)|| ActivityUtil.isCanGetByType(845);
			EventMgr.dispatch(ActivityEvent.refreshRedPoint,3103,isRedPoint);
		}
		else if(type==8000){
			if(Browser.onPC){}
				}
		else if(type==1008 || type==1009){
			JieriRedPoint.updateRed(type,4007);
		}
		else if(type==170){
			TaskLimitCenter.checkActivity();
		}
		else if(type==200){
			BaoTaLingZunCenter.check();
		}
		else if(EnumActivityType.TYPES4.indexOf(type)!=-1){
			JieriRedPoint.updateRed(type,4018);
		}
		else if(type==EnumActivityType.TUOGUAN_552){
			DailyCenter.updateTuoguanRedPoint();
		}
		else if(type==3000){
			JieriRedPoint.updateRed(type);
			BossDataCenter.onSend();
		}
		else if(EnumActivityType.TYPES5.indexOf(type)!=-1){
			JieriRedPoint.updateRed(type,1500);
		}
		else if(type==EnumActivityType.TYPE_340 || type==EnumActivityType.TYPE_343){
			App.menuProxy.updateXianshi();
		}
		else if(type==1413){
			EventMgr.dispatch(ActivityEvent.refreshRedPoint,1086,ActivityUtil.isCanGetByType(1413));
		}
		else if(type==EnumActivityType.HUANG_DI){
			EventMgr.dispatch(ActivityEvent.refreshRedPoint,1087,ActivityUtil.isCanGetByType(EnumActivityType.HUANG_DI));
		}
		else if(type==910){
			EventMgr.dispatch(ActivityEvent.refreshRedPoint,4035,ActivityUtil.isCanGetByType(910));
			var endtime=0;
			var list=ActivityUtil.getOpenList(type);
			if(list && list.length > 0){
				var $each_data;
				for($each_data in list){
					data=list[$each_data];
					if(data.getBean().q_sort==1 && data.extendMap){
						endtime=JSON.parse(data.extendMap).remaintime;
						break ;
					}
				}
				ActivityUtil.showIconTimer(4035,endtime);
			}
		}
		else if(type==EnumActivityType.TYPE_10001){
			WulingdahuiCenter.getTiaozhanRedpoint();
		}
		else if(type==10006){
			JieriRedPoint.updateRed(type,8001);
		}
		else if(type==10021){
			TitleCenter.updateActRed();
		}
		else if(type==10069 || type==10070){
			FashionCenter.updateActRed(type);
		}
		else if(type==10071 || type==10072){
			HuaxingCenter.updateActRed(type);
		}
		else if(EnumActivityType.TYPES6.indexOf(type)>=0){
			JieriRedPoint.updateRed(type,8005);
		}
		else if(EnumActivityType.TYPES8.indexOf(type)>=0){
			JieriRedPoint.updateRed(type,8004);
		}
		else if(type==320){
			ActivityCenter.isOpenYYPanel();
		}
		else if(type==10047){
			GongceQingdianCenter.gerZangzuRedpoint();
		}
		else if(type==10049){
			GongceQingdianCenter.gerPanRightRedpoint();
		}
		else if(type==10050){
			GongceQingdianCenter.gerShopRedpoint();
		}
		else if(type==10044){
			GongceQingdianCenter.setQingdianInfo();
			GongceQingdianCenter.gerHongzuanRedpoint();
		}
		else if(type==146){
			FuzhanCenter.setActivityTime();
			FuzhanCenter.setWorldActivityTime();
			FuzhanCenter.setFuzhanActivity();
		}
		else if(EnumActivityType.TYPES9.indexOf(type)!=-1){
			if(type !=10051 && type !=10052){
				JieriRedPoint.updateRed(type,8010);
			}
		}
		else if(EnumActivityType.TYPES10.indexOf(type)!=-1){
			if(type !=10058 && type !=10059){
				JieriRedPoint.updateRed(type,8011);
			}
		}
		else if(EnumActivityType.TYPES11.indexOf(type)!=-1){
			JieriRedPoint.updateRed(type,8013);
		}
		else if(BafuActCenter.TYPES.indexOf(type)!=-1){
			BafuActCenter.sendIconRed();
		}
		else if(EnumActivityType.TYPES12.indexOf(type)!=-1){
			if(type !=10087 && type !=10101 && type !=10102){
				JieriRedPoint.updateRed(type,8014);
			}
		}
		else if(EnumActivityType.TYPES13.indexOf(type)!=-1){
			if(type !=10105 && type !=10116 && type !=10119 && type !=10120){
				JieriRedPoint.updateRed(type,8016);
			}
		}
		else if(EnumActivityType.TYPES14.indexOf(type)!=-1){
			if(type !=10122 && type !=10133 && type !=10134){
				JieriRedPoint.updateRed(type,8018);
			}
		}
		else if(EnumActivityType.TYPES15.indexOf(type)!=-1){
			if(type !=10141 && type !=10142 && type !=10143){
				JieriRedPoint.updateRed(type,8019);
			}
		}
		else if(EnumActivityType.TYPES16.indexOf(type)!=-1){
			JieriRedPoint.updateRed(type,8020);
		}
		else if(EnumActivityType.TYPES17.indexOf(type)!=-1){
			if(type !=10171 && type !=10172){
				JieriRedPoint.updateRed(type,8021);
			}
		}
		else if(EnumActivityType.TYPES18.indexOf(type)!=-1){
			if(type !=10173 && type !=10185 && type !=10188 && type !=10189){
				JieriRedPoint.updateRed(type,8022);
			}
		}
		else if(EnumActivityType.TYPES19.indexOf(type)!=-1){
			if(type !=10197 && type !=10198){
				JieriRedPoint.updateRed(type,8023);
			}
		}
	}

	ActivityCenter.getNearOnlineVo=function(){
		var arr=ActivityUtil.getOpenList(115,4);
		var data;
		for(var i=0,leng=arr.length;i < leng;i++){
			data=arr[i];
			if(data==null)
				continue ;
			var obj=JSON.parse(data.extendMap);
			if(data.playerStates !=1 && data.playerStates !=0 &&obj.endtime > ServerTime.getServerTime()){
				return data;
			}
		}
		return null;
	}

	ActivityCenter.refreshPreviewIcon=function(){
		if(App.role.allLevel < Q_globalCenter.getInt(28))
			return;
		if(GlobalCenter.getAdvertise(1))
			return;
		if(ActivityRedPoint.isHasUpdateVersion()){
			if(ActivityCenter._isFirstOpenPreview){
				PanelOpenManager.openPanelById(1160010);
				ActivityCenter._isFirstOpenPreview=false;
			}
		}
	}

	ActivityCenter.activityHallMsg=function(type){
		var noticeData;
		var arr=ActivityUtil.getOpenList(type);
		var data;
		for(var $each_data in arr){
			data=arr[$each_data];
			if(data.activityStates==1 || (data.extendMap && JSON.parse(data.extendMap).laststate=='Activity_BeforeOpen')){
				if(noticeData==null){
					noticeData=data;
					}else if(data.bean.q_notice_weight >=noticeData.bean.q_notice_weight){
					noticeData=data;
				}
			}
		}
		EventMgr.dispatch("activitie_Notice_Refresh",noticeData);
	}

	ActivityCenter.updateFunctionTypeDict=function(data){
		if(!data || !data.bean)return;
		var bean=data.bean;
		if(bean.q_function_type > 0 && bean.q_type==1){
			if(bean.q_function_type==2){
				EventMgr.dispatch("ET.enter_exit_safe_area",App.role.isInSafeNode());
			}
			else if(bean.q_function_type==25){
				JieriRedPoint.updateRed(3000);
				BossDataCenter.onSend();
			}
			if(TuoguanCenter.run(data.id)){}
				else if(bean.q_tanchuang > 0){
				ActivityOpenPrompt.updateList();
			}
		}
	}

	ActivityCenter.getState=function(actId){
		if(ActivityCenter._stateDict !=null){
			return myparseInt(ActivityCenter._stateDict[actId]);
		}
		return 0;
	}

	ActivityCenter.setState=function(actId,state){
		if(ActivityCenter._stateDict==null){
			ActivityCenter._stateDict={};
		}
		ActivityCenter._stateDict[actId]=state;
	}

	ActivityCenter.sendDetailInfosMsg=function(__args){
		var args=arguments;
		var all=[];
		var list=[];
		for(var i=0;i < args.length;i++){
			list=ActivityUtil.getOpenList(args[i]);
			var data;
			for(var $each_data in list){
				data=list[$each_data];
				all.push(data.id);
			}
		}
		if(all.length > 0){
			ActivitiesCommandSender.C2S_ActivityDetailInfos(all);
		}
	}

	ActivityCenter.sendDetailInfos=function(type){
		ActivitiesCommandSender.C2S_ActivityDetailInfos(App.dataMgr.q_activitiesContainer.getIdsByType(type));
	}

	ActivityCenter.sendDetailInfosByTypes=function(types){
		var ids=[];
		for(var i=0;i < types.length;i++){
			ids=ids.concat(App.dataMgr.q_activitiesContainer.getIdsByType(types[i]));
		}
		ActivitiesCommandSender.C2S_ActivityDetailInfos(ids);
	}

	ActivityCenter.addPushActType=function(actType,type){
		var bool=false;
		var index=ActivityCenter._needPushActType.indexOf(actType);
		if(type==0){
			if(index==-1){
				ActivityCenter._needPushActType.push(actType);
				bool=true;
			}
			}else if(type==1){
			if(index !=-1){
				ActivityCenter._needPushActType.splice(index,1);
				bool=true;
			}
		}
		if(bool){
			EventMgr.dispatch("ET.ACT_PUSH");
		}
		return bool;
	}

	ActivityCenter.isOpenYYPanel=function(){
		if(ActivityCenter.isFirstYYOpen==1){
			ActivityCenter.isFirstYYOpen=2;
			var globalBean=App.dataMgr.q_globalContainer.getDataBean(15203);
			com.logic.data.activity.ActivityCenter.sendDetailInfos(myparseInt(globalBean.q_string_value));
		}
		else if(ActivityCenter.isFirstYYOpen==2){
			if(!WebParams.isWeiduan()){
				ActivityCenter.isFirstYYOpen=0;
				PlatformCenter.showDownloadAlert();
			}
		}
	}

	ActivityCenter.updateShouchong=function(){
		if(!ActivityUtil.isOpenByType(339)){
			return;
		};
		var str;
		var data=com.logic.data.activity.ActivityCenter.getData(3312);
		if(data && data.playerStates==0){
			data=com.logic.data.activity.ActivityCenter.getData(33105);
			if(data && data.playerStates !=0){
				str="明日领10元";
				ActivityUtil.showIconText(1088,str);
				return;
			}
		}
		str="已充值"+(MoneyCenter.rechargeHistory / GameConfig.rmb >> 0)+"元";
		ActivityUtil.showIconText(1088,str);
	}

	ActivityCenter.checkGCZ=function(){
		var iconId=3002;
		var bean=App.dataMgr.q_activity_iconContainer.getDataBean(iconId);
		if(bean==null || bean.q_activity_id==""){
			return;
		};
		var serverTime=ServerTime.getServerTime();
		var data,isShowTime=false,isAdd=false,shicha=0;
		var arr=JSON.parse(bean.q_activity_id);
		for (var i=0;i < arr.length;i++){
			data=ActivityCenter.getData(arr[i]);
			if(data==null || data.bean==null || data.activityStates < 0){
				continue ;
			}
			if(data.bean.q_function_type==8 && data.activityStates==0 && (data.actData || data.time > serverTime)){
				isAdd=true;
				var param;
				if(data.actData){
					param=JSON.parse(data.actData);
					data.time=myparseInt(param.time);
				}
				if(param && myparseInt(param["todayend"])==1){
					isAdd=false;
				}
				else{
					shicha=data.time-serverTime;
					if(shicha > 0){
						if(shicha < 244800){
							if(ServerTime.getOpenDays()> Q_globalCenter.getInt(86)&& shicha > 158400){
								isAdd=false;
							}
						}
						else{
							isAdd=false;
						}
					}
					else if(shicha <-1800){
						isAdd=false;
					}
				}
				isShowTime=true;
			}
			else if(data.activityStates==1 && data.time < StringFormat.getTodayMaxUtc()){
				isAdd=true;
				isShowTime=true;
			}
			else if(data.time > 0 && data.activityStates==0 && serverTime >=data.time-data.bean.q_daojishi && data.time < StringFormat.getTodayMaxUtc()){
				isAdd=true;
				isShowTime=true;
			}
			if(isAdd){
				break ;
			}
		}
		if(isAdd){
			if(isShowTime){
				if(data.activityStates==1 && data.finishTime > 0){
					ActivityUtil.showIconTimer(iconId,data.finishTime,data.activityStates==0 ? 2 :1);
				}
				else{
					ActivityUtil.showIconTimer(iconId,data.time,data.activityStates==0 ? 2 :1);
				}
			}
			ActivityUtil.addButton(iconId,true);
		}
		else{
			ActivityUtil.addButton(iconId,false);
		}
	}

	ActivityCenter._actDict={};
	ActivityCenter._clickIconDict={};
	ActivityCenter.longhuNum=0;
	ActivityCenter.YanWuChangInfo=null;
	ActivityCenter.updateVersionInfo=null;
	ActivityCenter.functionTypeDic={};
	ActivityCenter.isOpenServiceRank=false;
	ActivityCenter.isFirstLogin=true;
	ActivityCenter.voiceArr=[];
	ActivityCenter.dayNum=0;
	ActivityCenter.isFirstYYOpen=1;
	ActivityCenter._is360Smrz=false;
	ActivityCenter._changeDic=null;
	ActivityCenter._isFirstOpenPreview=true;
	ActivityCenter._stateDict=null;
	ActivityCenter._needPushActType=[];
	return ActivityCenter;
})()