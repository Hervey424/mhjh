var EnterButtonManager=(function(){
	function EnterButtonManager(){
		//------------------------------------------------------------
		this._register=null;
		//按钮数据类注册
		this._map={};
		//按钮数据
		this._menus={};
		//按钮容器
		this._delays={};
		//按钮数据延迟列表
		this._typeDic={};
		//根据按钮类型分类
		this._groups={};
		//按钮组分类
		this._actDic={};
		this._register=new EnterButtonRegister();
		var all=App.dataMgr.q_activity_iconContainer.getList();
		var count=all.length;
		for (var i=0;i < count;i++){
			var bean=all[i];
			var data=new EnterButtonData();
			data.setBean(bean);
			this._map[data.id]=data;
			var arr=this._typeDic[bean.q_show_type];
			if(arr==null){
				arr=[];
				this._typeDic[bean.q_show_type]=arr;
			}
			arr.push(data);
			if(bean.q_group > 0){
				arr=this._groups[bean.q_group];
				if(arr==null){
					arr=[];
					this._groups[bean.q_group]=arr;
				}
				arr.push(data);
			}
			if(data.types){
				var type;
				for(var $each_type in data.types){
					type=data.types[$each_type];
					arr=this._actDic[type];
					if(arr==null){
						arr=[];
						this._actDic[type]=arr;
					}
					arr.push(data);
				}
			}
		}
	}

	__class(EnterButtonManager,'com.modules.enterbutton.EnterButtonManager');
	var __proto=EnterButtonManager.prototype;
	/**
	*获得数据
	*@param id
	*@return
	*/
	__proto.getData=function(id){
		return this._map[id];
	}

	/**
	*获得分组数据列表
	*@return
	*/
	__proto.getDataListByGroup=function(groupid){
		return this._groups[groupid];
	}

	/**
	*获得菜单
	*@param place
	*@return
	*/
	__proto.getMenu=function(place){
		return this._menus[place];
	}

	/**
	*添加菜单关联
	*@param place
	*@param menu
	*/
	__proto.addMenu=function(place,menu){
		this._menus[place]=menu;
		var arr=this._delays[place];
		if(arr){
			for (var i=0;i < arr.length;i++){
				var data=arr[i];
				this.addButton(data.id);
			}
			this._delays[place]=null;
			delete this._delays[place];
		}
	}

	/**
	*显示或隐藏菜单
	*@param place
	*/
	__proto.showMenu=function(place,value){
		var menu=this.getMenu(place);
		if(menu==null)
			return;
		menu.showMenu(value);
	}

	/**
	*是否存在该菜单
	*@param place
	*@return
	*/
	__proto.hasMenu=function(place){
		return this.getMenu(place)!=null;
	}

	/**
	*添加按钮
	*@param id 按钮ID
	*@param tidy 是否整理菜单，整理菜单会执行缓动效果
	*/
	__proto.addButton=function(id,tidy){
		(tidy===void 0)&& (tidy=false);
		var data=this.getData(id);
		if(data==null)
			return;
		if(data.place==-1){
			if(!EnterButtonUtils.checkCondition(data)){
				return;
			}
			data.place=data.getBean().q_place;
		};
		var menu=this.getMenu(data.place);
		if(menu==null){
			this.addDelay(data,true,data.place);
			return;
		}
		menu.addButtonByData(data);
		if(tidy){
			menu.tidy(true);
		}
	}

	/**
	*删除按钮
	*@param id 按钮ID
	*@param tidy 是否整理菜单，整理菜单会执行缓动效果
	*/
	__proto.removeButton=function(id,tidy){
		(tidy===void 0)&& (tidy=false);
		var data=this.getData(id);
		if(data==null)
			return;
		data.place=-1;
		var menu=this.getMenu(data.getBean().q_place);
		if(menu==null){
			this.addDelay(data,false,data.getBean().q_place);
			return;
		}
		menu.removeButtonByData(data);
		if(tidy){
			menu.tidy(true);
		}
	}

	__proto.getButtonClass=function(id){
		return this._register.getClass(id);
	}

	/**
	*获得按钮
	*@param id
	*@return
	*/
	__proto.getButton=function(id){
		var data=this.getData(id);
		if(data==null || data.place==-1)
			return null;
		var menu=this.getMenu(data.place);
		if(menu==null)
			return null;
		return menu.getButton(id);
	}

	/**
	*是否存在按钮
	*@param id
	*@return
	*/
	__proto.hasButton=function(id){
		return this.getButton(id)!=null;
	}

	/**
	*添加或删除按钮光效
	*@param id 按钮ID
	*@param value true添加、false删除
	*/
	__proto.showEffect=function(id,value){
		var data=this.getData(id);
		if(data==null)
			return;
		data.playFlow=value;
		var btn=this.getButton(id);
		if(btn==null)
			return;
		btn.showEffect(data.playFlow);
	}

	/**
	*添加或删除按钮红点
	*@param id 按钮ID
	*@param value true添加、false删除
	*/
	__proto.showPoint=function(id,value){
		var data=this.getData(id);
		if(data==null)
			return;
		data.red=value;
		if(data.isStoraged){
			EnterButtonStorageManager.ins.updateStoragedPoint();
		};
		var btn=this.getButton(id);
		if(btn==null)
			return;
		btn.showPoint(data.red);
	}

	/**
	*显示按钮时间
	*@param id
	*@param value
	*@param endtime
	*@param status 1、进行中 2、预告 3、领奖
	*/
	__proto.showTime=function(id,value,endtime,status){
		(status===void 0)&& (status=1);
		var data=this.getData(id);
		if(data==null)
			return;
		if(endtime < 1000000000){
			endtime+=ServerTime.getServerTime();
		}
		data.endtime=endtime;
		data.timeStatus=status;
		var btn=this.getButton(id);
		if(btn==null)
			return;
		btn.showTime(value);
	}

	/**
	*显示按钮文本
	*@param id
	*@param value
	*@param msg
	*/
	__proto.showText=function(id,value,msg,tween){
		(msg===void 0)&& (msg="");
		(tween===void 0)&& (tween=false);
		var data=this.getData(id);
		if(data==null)
			return;
		data.txt=msg;
		var btn=this.getButton(id);
		if(btn==null)
			return;
		btn.showText(value);
	}

	/**
	*显示引导
	*@param id
	*@param value
	*@param msg
	*/
	__proto.showGuide=function(id,value,msg,dir){
		(dir===void 0)&& (dir=0);
		var data=this.getData(id);
		if(data==null)
			return;
		var btn=this.getButton(id);
		if(btn==null)
			return;
		if(dir==0){
			dir=Browser.onPC ? 4 :3;
		}
		btn.showGuide(value,msg,dir);
	}

	/**
	*放入延迟队列
	*@param data 按钮数据
	*@param value true、添加按钮，false、删除按钮
	*/
	__proto.addDelay=function(data,value,place){
		var arr=this._delays[place];
		if(arr==null){
			arr=[];
			this._delays[place]=arr;
		};
		var index=arr.indexOf(data);
		if(value){
			if(index==-1){
				arr.push(data);
			}
		}
		else{
			if(index !=-1){
				arr.splice(index,1);
			}
		}
	}

	/**
	*根据功能开放显示按钮
	*/
	__proto.showButtonByFunction=function(){
		var arr=[];
		var tmp1=this._typeDic[1];
		if(tmp1 !=null){
			arr=arr.concat(tmp1);
		};
		var tmp2=this._typeDic[0];
		if(tmp2 !=null){
			arr=arr.concat(tmp2);
		}
		for (var i=0;i < arr.length;i++){
			var data=arr[i];
			if(FunctionManager.isFunctionOpen(data.getBean().q_function)){
				this.addButton(data.id);
			}
		}
	}

	/**
	*根据时间显示按钮
	*/
	__proto.showButtonByStarttime=function(){
		var arr=this._typeDic[3];
		if(arr==null){
			return;
		};
		var endCount=0;
		var now=ServerTime.getServerTime();
		for (var i=0;i < arr.length;i++){
			var data=arr[i];
			var bean=data.getBean();
			if(now >=bean.q_starttime && now < bean.q_endtime){
				if(data.place==-1){
					this.addButton(data.id);
				}
			}
			else{
				if(data.place !=-1){
					this.removeButton(data.id);
				}
			}
			if(now >=bean.q_endtime){
				endCount++;
			}
		}
	}

	/**
	*根据活动状态显示按钮
	*/
	__proto.showButtonByActivity=function(){
		var arr=this._typeDic[2];
		if(arr==null)
			return;
		for (var i=0;i < arr.length;i++){
			var data=arr[i];
			var add=false;
			if(data.ids){
				for (var j=0;j < data.ids.length;j++){
					if(ActivityUtil.isOpenById(data.ids[j])){
						add=true;
						break ;
					}
				}
			}
			if(add){
				this.addButton(data.id);
			}
			else{
				this.removeButton(data.id);
			}
		}
	}

	/**
	*根据活动类型更新红点状态、倒计时、文本显示
	*@param type
	*/
	__proto.showPointByActivity=function(type){
		var arr=this._actDic[type];
		if(arr==null)
			return;
		var param,act,acts;
		var bean,bool=false,endtime=-1,msg="";
		var data;
		for(var $each_data in arr){
			data=arr[$each_data];
			if(!this.getButton(data.id)){
				continue ;
			}
			if(type==910){
				bool=false;
				acts=ActivityUtil.getOpenList(type);
				var $each_act;
				for($each_act in acts){
					act=acts[$each_act];
					if(act.playerStates==1){
						bool=true;
						break ;
					}
				}
				var $each_act;
				for($each_act in acts){
					act=acts[$each_act];
					if(act.bean.q_sort==1 && act.extendMap){
						endtime=myparseInt(JSON.parse(act.extendMap).remaintime);
						break ;
					}
				}
				this.showPoint(data.id,bool);
				this.showTime(data.id,true,endtime);
				continue ;
			}
			bean=data.getBean();
			if(bean.q_red_trigger==1){
				bool=ActivityUtil.isCanGetByTypes(data.types);
				this.showPoint(data.id,bool);
			}
			if(bean.q_show_time==0 || (bean.q_show_time !=1 && bean.q_show_time !=2 && bean.q_show_time !=3)){
				continue ;
			}
			for (var i=0;i < data.ids.length;i++){
				act=ActivityCenter.getData(data.ids[i]);
				if(act==null || act.activityStates !=1){
					continue ;
				}
				if(act.playerStates==1 && bean.q_show_time==3){
					endtime=0;
					msg=act.getBean().q_desc;
					break ;
				}
				if(act.extendMap !=null){
					param=JSON.parse(act.extendMap);
					if(param.remaintime > 0){
						endtime=param.remaintime;
						break ;
					}
				}
			}
			if(data.id !=3010){
				this.showTime(data.id,endtime > 0,endtime,bean.q_show_time);
			}
			if(endtime==0 && bean.q_show_time==3){
				this.showText(data.id,true,"可领取");
				if(data.guide){
					this.showGuide(data.id,true,msg);
				}
			}
		}
	}

	/**
	*重定位
	*/
	__proto.resize=function(){
		for(var key in this._menus){
			var menu=this._menus[key];
			if(menu){
				menu.resize();
			}
		}
	}

	__getset(1,EnterButtonManager,'ins',function(){
		if(!EnterButtonManager._ins){
			EnterButtonManager._ins=new EnterButtonManager();
		}
		return EnterButtonManager._ins;
	});

	EnterButtonManager._ins=null;
	return EnterButtonManager;
})()


/**
*入口按钮数据注册
*@author zq
*创建时间：2024年7月24日17:41:31
*/
//class com.modules.enterbutton.EnterButtonRegister
var EnterButtonRegister=(function(){
	function EnterButtonRegister(){
		//按钮类
		this._map={};
		this.init();
	}

	__class(EnterButtonRegister,'com.modules.enterbutton.EnterButtonRegister');
	var __proto=EnterButtonRegister.prototype;
	__proto.init=function(){
		this.registerClass(3002,EnterButton_SBK);
	}

	__proto.registerClass=function(id,cls){
		this._map[id]=cls;
	}

	__proto.getClass=function(id){
		var cls=this._map[id];
		if(cls !=null)
			return cls;
		return EnterButton;
	}

	return EnterButtonRegister;
})()


/**
*入口按钮 工具类
*@author zq
*创建时间：2024年7月24日17:41:31
*/
//class com.modules.enterbutton.EnterButtonUtils
var EnterButtonUtils=(function(){
	function EnterButtonUtils(){}
	__class(EnterButtonUtils,'com.modules.enterbutton.EnterButtonUtils');
	EnterButtonUtils.checkCondition=function(data){
		var bean=data.getBean();
		if(bean==null)
			return false;
		if(bean.q_function > 0 && !FunctionManager.isFunctionOpen(bean.q_function)){
			return false;
		}
		if(bean.q_hide==1 || (bean.q_hide==2 && Browser.onPC)|| (bean.q_hide==3 && !Browser.onPC)){
			return false;
		};
		var now=ServerTime.getServerTime();
		if(bean.q_starttime > 0 && now < bean.q_starttime){
			return false;
		}
		if(bean.q_endtime > 0 && now > bean.q_endtime){
			return false;
		}
		if(!GameUtils.checkPlatformLimit(bean.q_limit_platform))
			return false;
		if(!GameUtils.checkADLimit(bean.q_not_ad))
			return false;
		if(bean.q_lv > 0 && (App.role==null || bean.q_lv > App.role.allLevel)){
			return false;
		}
		if(bean.q_loading_trigger==4 && data.touchCount > 0){
			return false;
		}
		return true;
	}

	EnterButtonUtils.checkGroupMaxWeight=function(data){
		var group=data.getBean().q_group;
		if(group==0)
			return true;
		var weight=data.getBean().q_weight;
		var all=EnterButtonManager.ins.getDataListByGroup(group);
		for (var i=0;i < all.length;i++){
			var tmpData=all[i];
			if(tmpData.place !=-1 && tmpData.getBean().q_weight < weight){
				return false;
			}
		}
		return true;
	}

	return EnterButtonUtils;
})()


/**
*入口按钮枚举
*@author zq
*创建时间：2024年7月24日17:41:31
*/
//class com.modules.enterbutton.enum.EnumEnterButtonID
var EnumEnterButtonID=(function(){
	function EnumEnterButtonID(){}
	__class(EnumEnterButtonID,'com.modules.enterbutton.enum.EnumEnterButtonID');
	EnumEnterButtonID.BOSS=1001;
	EnumEnterButtonID.SBK=3002;
	EnumEnterButtonID.ZDHS=6101;
	EnumEnterButtonID.STORAGE=9999;
	return EnumEnterButtonID;
})()


/**
*入口按钮位置类型
*@author zq
*创建时间：2024年7月24日17:41:31
*/
//class com.modules.enterbutton.enum.EnumEnterButtonPlace
var EnumEnterButtonPlace=(function(){
	function EnumEnterButtonPlace(){}
	__class(EnumEnterButtonPlace,'com.modules.enterbutton.enum.EnumEnterButtonPlace');
	EnumEnterButtonPlace.TOP=1;
	EnumEnterButtonPlace.RADAR=2;
	EnumEnterButtonPlace.RIGHT=3;
	EnumEnterButtonPlace.DRAG=99999;
	return EnumEnterButtonPlace;
})()


/**
*入口按钮开启分类
*@author zq
*创建时间：2024年7月24日17:41:31
*/
//class com.modules.enterbutton.enum.EnumEnterButtonType
var EnumEnterButtonType=(function(){
	function EnumEnterButtonType(){}
	__class(EnumEnterButtonType,'com.modules.enterbutton.enum.EnumEnterButtonType');
	EnumEnterButtonType.OPEN_TYPE_0=0;
	EnumEnterButtonType.OPEN_TYPE_1=1;
	EnumEnterButtonType.OPEN_TYPE_2=2;
	EnumEnterButtonType.OPEN_TYPE_3=3;
	EnumEnterButtonType.OPEN_TYPE_4=4;
	EnumEnterButtonType.OPEN_TYPE_5=5;
	EnumEnterButtonType.TIME_TYPE_1=1;
	EnumEnterButtonType.TIME_TYPE_2=2;
	EnumEnterButtonType.TIME_TYPE_3=3;
	return EnumEnterButtonType;
})()


/**
*入口按钮收纳管理
*@author zq
*创建时间：2024年7月24日17:41:31
*/
//class com.modules.enterbutton.storage.EnterButtonStorageManager
var EnterButtonStorageManager=(function(){
	function EnterButtonStorageManager(){
		//--------------------------------------------------
		this._draging=false;
		this._dragHandler=null;
		this._dragBtn=null;
		this._mx=-1;
		this._my=-1;
		this._storages=[];
		//收纳按钮数据列表
		this._map={};
		this._loaded=false;
		//菜单的索引
		this._menu=null;
		this._dragMenu=null;
	}

	__class(EnterButtonStorageManager,'com.modules.enterbutton.storage.EnterButtonStorageManager');
	var __proto=EnterButtonStorageManager.prototype;
	__proto.load=function(json){
		if(this._loaded)
			return;
		this._loaded=true;
		if(json){
			var arr=JSON.parse(json);
			for (var i=0;i < arr.length;i++){
				var data=EnterButtonManager.ins.getData(arr[i]);
				if(data !=null && data.getBean().q_shouna==1 && this._storages.indexOf(data)==-1){
					EnterButtonManager.ins.removeButton(data.id);
					data.isStoraged=true;
					data.storagedtime=ServerTime.getServerTime()+i;
					this._storages.push(data);
					this._map[data.id]=data;
				}
			}
		}
	}

	/**
	*已收纳的按钮数据列表 EnterButtonData[]
	*@return
	*/
	__proto.getStoragedList=function(){
		return this._storages;
	}

	/**
	*是否已收纳
	*@return
	*/
	__proto.isStoraged=function(id){
		return this._map[id] !=null;
	}

	/**
	*更新收纳红点
	*/
	__proto.updateStoragedPoint=function(){
		var storagedData=EnterButtonManager.ins.getData(9999);
		if(storagedData==null)
			return;
		var red=false;
		for (var i=0;i < this._storages.length;i++){
			var data=this._storages[i];
			if(data.red){
				red=true;
				break ;
			}
		}
		if(red !=storagedData.red){
			storagedData.red=red;
			var btn=EnterButtonManager.ins.getButton(9999);
			if(btn){
				btn.showPoint(storagedData.red);
			}
		}
	}

	/**
	*设置收纳-保存数据
	*@param data 按钮数据
	*@param result 是否收纳
	*/
	__proto.save=function(data,result){
		var change=false;
		if(result){
			if(!data.isStoraged){
				data.isStoraged=true;
				data.storagedtime=ServerTime.getServerTime();
				if(this._storages.indexOf(data)==-1){
					this._storages.push(data);
				}
				this._map[data.id]=data;
				change=true;
			}
		}
		else{
			if(data.isStoraged){
				data.isStoraged=false;
				data.storagedtime=-1;
				var index=this._storages.indexOf(data);
				if(index !=-1){
					this._storages.splice(index,1);
				}
				delete this._map[data.id];
				change=true;
			}
		}
		if(change){
			this.updateStoragedPoint();
			var ids=[];
			for (var i=0;i < this._storages.length;i++){
				var tmpData=this._storages[i];
				ids.push(tmpData.id);
			}
			SetupCenter.saveClient("77",JSON.stringify(ids));
		}
	}

	/**
	*准备拖拽
	*@param btns 要执行拖拽的按钮列表
	*@param value 是否要拖拽按钮
	*@param menu 拖拽的菜单（临时）
	*@param dragMenu 收纳区域菜单（临时）
	*@param callback 每次拖拽的回调函数，会返回拖拽的按钮和拖拽结果
	*/
	__proto.readyDrag=function(btns,value,menu,dragMenu,callback){
		if(value){
			this._menu=menu;
			this._dragMenu=dragMenu;
			this._dragHandler=callback;
		}
		else{
			this._menu=null;
			this._dragMenu=null;
			this._dragBtn=null;
			this._dragHandler=null;
			Laya.stage.off("mousemove",this,this.onMouseMove);
			Laya.stage.off("mouseup",this,this.onMouseUp);
		}
		this._draging=false;
		for (var i=0;i < btns.length;i++){
			var btn=btns[i];
			btn.readyDragable(value,GameHandler.create(this,this.onDoubleClick));
			if(value){
				btn.on("mousedown",this,this.onMouseDown);
			}
			else{
				btn.off("mousedown",this,this.onMouseDown);
			}
		}
	}

	__proto.onDoubleClick=function(e){
		console.log("------------------------onDoubleClick-------------------------");
	}

	__proto.onMouseDown=function(e){
		this._mx=Laya.stage.mouseX;
		this._my=Laya.stage.mouseY;
		this._dragBtn=e.currentTarget;
		var btn=(this._dragBtn);
		if(!this._draging){
			Laya.stage.on("mousemove",this,this.onMouseMove);
			Laya.stage.on("mouseup",this,this.onMouseUp);
			if(btn.getBean().q_shouna==1){
				this._draging=true;
				var p=btn.localToGlobal(new Point());
				btn.move(p.x,p.y,Laya.stage);
				btn.startDrag(new Rectangle(0,0,GameConfig.stageWidth-btn.width,GameConfig.stageHeight-btn.height));
			}
		}
		e.stopImmediatePropagation();
	}

	__proto.onMouseMove=function(e){
		if(Math.abs(Laya.stage.mouseX-this._mx)> 20 || Math.abs(Laya.stage.mouseY-this._my)> 20){
			var btn=(this._dragBtn);
			btn.setDragable(true);
		}
	}

	__proto.onMouseUp=function(e){
		Laya.stage.off("mousemove",this,this.onMouseMove);
		Laya.stage.off("mouseup",this,this.onMouseUp);
		e.stopImmediatePropagation();
		var btn=(this._dragBtn);
		if(btn.getBean().q_shouna==0 && btn.getDragable()){
			btn.setDragable(false);
			GameNotice.showMousePosMessage("此按钮无法收纳");
			return;
		}
		if(this._draging){
			this._draging=false;
			btn.stopDrag();
			this.dragEnd(btn);
			this._dragBtn=null;
		}
	}

	__proto.dragEnd=function(btn){
		var data=btn.getData();
		if(data==null)
			return;
		var result=this.checkDragIn(btn);
		this.save(data,result);
		if(result){
			var p1=this._dragMenu.localToGlobal(new Point());
			btn.move(btn.x-p1.x,btn.y-p1.y);
			this._menu.removeButton(btn,false);
			this._menu.tidy(true);
			this._dragMenu.addButton(btn);
			this._dragMenu.tidy(true);
			EnterButtonManager.ins.removeButton(data.id,true);
		}
		else{
			var p2=this._menu.localToGlobal(new Point());
			btn.move(btn.x-p2.x,btn.y-p2.y);
			this._dragMenu.removeButton(btn,false);
			this._dragMenu.tidy(true);
			this._menu.addButton(btn);
			this._menu.tidy(true);
			EnterButtonManager.ins.addButton(data.id,true);
		}
		if(this._dragHandler !=null){
			this._dragHandler.runWith([btn,result]);
		}
	}

	__proto.checkDragIn=function(btn){
		var arr=FUtils.getObjectsUnderPoint(Laya.stage,new Point(Laya.stage.mouseX,Laya.stage.mouseY));
		for (var i=0;i < arr.length;i++){
			var child=arr[i];
			if(child.visible && Laya.__typeof(child,'com.modules.enterbutton.base.IEnterButtonDrag')){
				return (child).dragIn(btn);
			}
		}
		return false;
	}

	__getset(1,EnterButtonStorageManager,'ins',function(){
		if(!EnterButtonStorageManager._ins){
			EnterButtonStorageManager._ins=new EnterButtonStorageManager();
		}
		return EnterButtonStorageManager._ins;
	});

	EnterButtonStorageManager._ins=null;
	return EnterButtonStorageManager;
})()