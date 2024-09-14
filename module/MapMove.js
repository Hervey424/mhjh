var MapMoveModel=(function(){
	function MapMoveModel(module){
		this.mapModule=null;
		this._mapSearchManager=null;
		this._emptyAction=[];
		this.mapModule=ClassUtils.asTo(module,MapModuleChildHouse);
		this.initialize();
	}

	__class(MapMoveModel,'com.modules.map.model.MapMoveModel');
	var __proto=MapMoveModel.prototype;
	__proto.initialize=function(){}
	// _mapSearchManager.setMapData(obj);
	__proto.initSearchManager=function(){
		this._mapSearchManager=new MapRoadSearch();
		var obj=App.dataMgr.q_transferContainer.getList();
		this._mapSearchManager.setMapData(obj);
	}

	__proto.clearSearchRoad=function(){
		AutoGameRobot.isSeachingBoss=false;
		RadarCenter.wayPoints=null;
		var role=App.role;
		role.actionList.clearList();
		role.searchToPoint=null;
		role.tempSearchToPointVo=null;
		if(GlobalCenter.isAutoWalk){
			(role.roleView).changeAutoSearchRoad(false);
		}
		if(this._mapSearchManager){
			this._mapSearchManager.params=null;
			this._mapSearchManager.clear();
		}
		this.mapModule.mapSkillModel.clearLastAttackRolePostion();
	}

	__proto.searchRoadToMap=function(endMapid,endPosX,endPosY,isNotice){
		(isNotice===void 0)&& (isNotice=true);
		if(GlobalControl.isploting){
			return this._mapSearchManager;
		};
		var role=App.role;
		if(role.isDujieing){
			return this._mapSearchManager;
		}
		if(role.isCanMove==false){
			GameNotice.showBottomMessage("你受到了定身类负面效果， 无法移动","#FF3300",1000);
			return this._mapSearchManager;
		}
		this._mapSearchManager.clear();
		this._mapSearchManager.setStartPoint(role.mapId.toString(),new Point(role.move_to_x,role.move_to_y));
		this._mapSearchManager.setEndPoint(endMapid.toString(),new Point(endPosX,endPosY));
		var bool=this._mapSearchManager.startSearch();
		if(bool){
			this.checkJumpSearch();
		}
		else{
			if(isNotice){
				GameNotice.showBottomMessage("没有路径能直接去往此地图");
			}
			return null;
		}
		return this._mapSearchManager;
	}

	__proto.checkJumpSearch=function(){
		if(this._mapSearchManager.isJumpMap==true && App.role.enterMap){
			var obj=this._mapSearchManager.getNextPoint();
			if(obj !=null){
				var caller;
				var data;
				var funcParam;
				var params;
				if(this._mapSearchManager.isLastPoint()==true){
					params=this._mapSearchManager.params;
					this._mapSearchManager.params=null;
					if(params !=null){
						if(params.type==1){
							if(params.data.taskType==3 || params.data.taskType==7){
								if(GlobalControl.isInZone || GlobalControl.isInCountryFightMap){
									params.clear();
									return;
								}
							}
							data=params.data;
							params.clear();
							EventMgr.dispatch("TE.taskClick",data,true);
							return;
						}
						if(params.type==2){
							params.clear();
							this.continueSearchRoad(obj.p,Handler.create(App,App.autoFightBoss));
							return;
						}
						if(params.type==3){
							data=params.data;
							caller=params.caller;
							funcParam=params.funcParam;
							params.clear();
							this.continueSearchRoad(obj.p,Handler.create(caller,data),funcParam);
							return;
						}
					};
					var finishHandler;
					if(params){
						funcParam=params.funcParam;
						if((params.data instanceof laya.utils.Handler )){
							finishHandler=params.data;
						}
						else{
							finishHandler=Handler.create(params.caller,params.data);
						}
						params.clear();
					}
					this.continueSearchRoad(obj.p,finishHandler,funcParam);
					return;
				}
				this.continueSearchRoad(obj.p);
			}
		}
	}

	// 不是最后一张图就不需要回调，而是继续寻路即可
	__proto.continueSearchRoad=function(p,finishHandler,param){
		var posX=p.x *MapConfig.MAP_NODE_WIDTH;
		var posY=p.y *MapConfig.MAP_NODE_HEIGHT;
		var vo=new SearchToPointVO();
		vo.px=posX;
		vo.py=posY;
		vo.type="MapMoveModel.checkJumpSearch";
		vo.finishHandler=finishHandler;
		vo.finishParam=param;
		var list=this.mapModule.mapMoveModel.searchRoadByAstar(vo);
		if(list && list.length > 0){
			this.mapModule.mapAvatarModel.character.roleData.actionList.resetActionList(list);
		}
	}

	/**
	*按鼠标方向往前走
	*/
	__proto.moveByDir=function(clickX,clickY){
		var roleData=App.role;
		var dir=MoveUtils.Diff2Dir(clickX-roleData.roleView.x,clickY-roleData.roleView.y);
		var p=MapVO.getNodeByPixelXY(roleData.move_to_x,roleData.move_to_y);
		var nx=MoveUtils.NextX(p.x,dir);
		var ny=MoveUtils.NextY(p.y,dir);
		var crtAct=ClassUtils.asTo(this.actList.crtAction,MoveAction);
		if(crtAct && crtAct.endNode.x==nx && crtAct.endNode.y==ny){
			return false;
		};
		var mapData=App.mapData;
		if(mapData==null){
			return false;
		};
		var end=mapData.getNode(nx,ny);
		if(!end.walkAble || !end.roleBlock){
			return false;
		};
		var act=this.makeMoveAction(-1,1,end);
		if(this.actList.length < 3){
			this.actList.pushAction(act);
		}
		return true;
	}

	/**
	*点击地面寻路
	*
	*/
	__proto.moveToPoint=function(clickX,clickY,leftMouseDown,rightMouseDown){
		if(GlobalControl.isploting){
			console.log('[samira]1')
			return false;
		};
		var roleData=App.role;
		if(roleData==null || App.mapData==null){
			console.log('[samira]2')
			return false;
		}
		this.clearSearchRoad();
		if(clickX==roleData.roleView.x && clickY==roleData.roleView.y){
			console.log('[samira]3')
			return false;
		}
		if(clickX==roleData.move_to_x && clickY==roleData.move_to_y){
			console.log('[samira]4')
			return false;
		}
		if(roleData.isDujieing){
			console.log('[samira]5')
			return false;
		}
		if(roleData.isCanMove==false){
			console.log('[samira]6')
			GameNotice.showBottomMessage("你受到了定身类负面效果， 无法移动","#FF3300",1000);
			return false;
		};
		var gridPos1=MapVO.getNodeByPixelXY(clickX,clickY);
		var gridPos2=MapVO.getNodeByPixelXY(roleData.roleView.x,roleData.roleView.y);
		if(gridPos1.x==gridPos2.x && gridPos1.y==gridPos2.y){
			console.log('[samira]7')
			return false;
		};
		var start=App.mapData.getNodeByXY(roleData.move_to_x,roleData.move_to_y);
		if(start==null){
			console.log('[samira]8')
			return false;
		};
		var dir=SceneType.getDretion(roleData.move_to_x,roleData.move_to_y,clickX,clickY);
		var step=0;
		if(Browser.onPC || !GlobalControl.isRockerDown){
			if(rightMouseDown){
				step=2;
			}
			else if(leftMouseDown){
				if(Math.abs(gridPos2.x-gridPos1.x)>=2 || Math.abs(gridPos2.y-gridPos1.y)>=2){
					step=2;
				}
				else{
					step=1;
				}
			}
		}
		else{
			step=GlobalControl.isRun ? 2 :1;
		};
		var obj=this.getEndNodeStepObj(start,dir,step);
		if(obj.end && obj.step > 0){
			return this.startMove(start,roleData,obj,dir);
		}
		else{
			var bool=false;
			var faceDirNode=this.getNodeByDir(start,roleData.roleView.faceDirection,1);
			if(faceDirNode !=null){
				var dirInLine=MathUnit.getPointDirInLine(clickX,clickY,roleData.move_to_x,roleData.move_to_y,MapVO.getPixelPos(faceDirNode,true),MapVO.getPixelPos(faceDirNode,false));
				if(dirInLine==-1){
					bool=true;
				}
			}
			if(bool){
				bool=this.neighborDirectACW(roleData,start,dir,step);
				if(!bool){
					bool=this.neighborDirectCW(roleData,start,dir,step);
				}
			}
			else{
				bool=this.neighborDirectCW(roleData,start,dir,step);
				if(!bool){
					bool=this.neighborDirectACW(roleData,start,dir,step);
				}
			}
			return bool;
		}
		return false;
	}

	__proto.moveStep=function(roleData,dire,step){
		var start=App.mapData.getNodeByXY(roleData.move_to_x,roleData.move_to_y);
		if(start){
			var obj=this.getEndNodeStepObj(start,dire,step);
			if(obj.end && obj.step > 0){
				return this.startMove(start,roleData,obj,dire);
			}
		}
		return false;
	}

	__proto.startMove=function(start,roleData,obj,dir){
		var end=obj.end;
		var endStep=obj.step;
		if(end && endStep > 0){
			var action=this.makeMoveAction(dir,endStep,end);
			roleData.actionList.setNext(action);
			return true;
		}
		return false;
	}

	/**
	*顺时针取相邻的方向
	*@param direct
	*@return
	*
	*/
	__proto.neighborDirectCW=function(role,start,direct,step,max){
		(max===void 0)&& (max=2);
		for(var i=0;i < max;i++){
			var dir=direct+1;
			direct=dir > 7 ? 0 :dir;
			var obj=this.getEndNodeStepObj(start,direct,step);
			if(obj.end && obj.step > 0){
				return this.startMove(start,role,obj,direct);
			}
		}
		return false;
	}

	/**
	*逆时针取相邻的方向
	*@param direct
	*@return
	*
	*/
	__proto.neighborDirectACW=function(role,start,direct,step,max){
		(max===void 0)&& (max=2);
		for(var i=0;i < max;i++){
			var dir=direct-1;
			direct=dir < 0 ? 7 :dir;
			var obj=this.getEndNodeStepObj(start,direct,step);
			if(obj.end && obj.step > 0){
				return this.startMove(start,role,obj,direct);
			}
		}
		return false;
	}

	__proto.getEndNodeStepObj=function(start,dir,maxStep){
		var end;
		var step=0;
		var temp;
		while(step < maxStep){
			step++;
			temp=this.getNodeByDir(start,dir,step);
			if(temp==null){
				step--;
				break ;
				}else if(!temp.walkAble || !temp.roleBlock){
				step--;
				break ;
				}else {
				end=temp;
			}
		}
		return {end:end,step:step};
	}

	/**
	*通过一个半径，跟起始点， 获取里面一个空白位置
	*@param endNode
	*@param gap
	*@return
	*
	*/
	__proto.getAroundEmptyInTheNodeByRangeLimit=function(endNode,gap){
		var p;
		var retNode;
		for(var i=1;i <=gap;i++){
			for(var j=-i;j < i;j++){
				for(var k=-i;k < i;k++){
					retNode=App.mapData.getNode(endNode.x+j,endNode.y-k);
					if(retNode && retNode.walkAble && retNode.roleBlock){
						return new Point(MapVO.getPixelPos(retNode,true),MapVO.getPixelPos(retNode,false));
					}
				}
			}
		}
		return p;
	}

	/**
	*判断格子周围是否可以行走，
	*@param endNode
	*@return
	*
	*/
	__proto.checkAroundEmptyInTheNode=function(endNode,gap){
		(gap===void 0)&& (gap=1);
		for(var i=0;i <=7;i++){
			var dir=i;
			var node=this.getNodeByDir(endNode,dir,gap);
			if(node && node.walkAble && node.roleBlock){
				return true;
			}
		}
		return false;
	}

	__proto.getNodeByDire=function(nodeX,nodeY,dir,step,isNear){
		(step===void 0)&& (step=1);
		(isNear===void 0)&& (isNear=false);
		var node=App.mapData.getNode(nodeX,nodeY);
		if(node){
			return this.getNodeByDir(node,dir,step,isNear);
		}
		return null;
	}

	/**
	*获得起始点方向前的一格
	*@param start
	*@param dir
	*@param step
	*@param isNear
	*@return
	*
	*/
	__proto.getNodeByDir=function(start,dir,step,isNear){
		(step===void 0)&& (step=1);
		(isNear===void 0)&& (isNear=false);
		if(!start || step <=0){
			return start;
		};
		var temp;
		switch(dir){
			case 0:
				temp=App.mapData.getNode(start.x,start.y-step);
				break ;
			case 1:
				temp=App.mapData.getNode(start.x+step,start.y-step);
				break ;
			case 2:
				temp=App.mapData.getNode(start.x+step,start.y);
				break ;
			case 3:
				temp=App.mapData.getNode(start.x+step,start.y+step);
				break ;
			case 4:
				temp=App.mapData.getNode(start.x,start.y+step);
				break ;
			case 5:
				temp=App.mapData.getNode(start.x-step,start.y+step);
				break ;
			case 6:
				temp=App.mapData.getNode(start.x-step,start.y);
				break ;
			case 7:
				temp=App.mapData.getNode(start.x-step,start.y-step);
				break ;
			}
		if(!temp){
			return this.getNodeByDir(start,dir,step-1);
		}
		return temp;
	}

	/**
	*是否可以寻路
	*
	*/
	__proto.needSearchRoad=function(){
		if(App.mapData==null){
			return false;
		};
		var role=App.role;
		if(role==null){
			return false;
		}
		if(!role.isCanMove || role.isDujieing){
			return false;
		}
		if(role.isDead || role.isJump){
			return false;
		}
		return true;
	}

	/**
	*移动通过A星寻路
	*@param vo
	*@param isUseClientPos
	*@param forceStep2 目的地仅剩一格时，是否强制跑过去
	*@return
	*
	*/
	__proto.searchRoadByAstar=function(vo,isUseClientPos,forceStep2){
		(isUseClientPos===void 0)&& (isUseClientPos=false);
		(forceStep2===void 0)&& (forceStep2=false);
		var role=App.role;
		if(vo.roleData==null && this.mapModule.mapAvatarModel.character){
			vo.roleData=role;
			role.searchToPoint=vo;
		}
		vo.searchCount++;
		if(vo.checkSearchMax()){
			return null;
		}
		if(vo.roleData){
			if((vo.roleData instanceof com.logic.data.role.MapFightRoleData )&& (vo.roleData).isDead)
				return null;
		};
		var mapData=App.mapData;
		if(mapData==null){
			return null;
		}
		if(role.isDujieing){
			return null;
		}
		if(role.isCanMove==false){
			GameNotice.showBottomMessage("你受到了定身类负面效果， 无法移动","#FF3300",1000);
			return null;
		};
		var end=mapData.getNodeByXY(vo.px,vo.py);
		if(end==null)
			return null;
		if(vo.px==vo.roleData.roleView.x && vo.py==vo.roleData.roleView.y)
			return null;
		var start;
		if(!isUseClientPos){
			start=mapData.getNodeByXY(vo.roleData.move_to_x,vo.roleData.move_to_y);
			}else{
			start=mapData.getNodeByXY(vo.roleData.roleView.x,vo.roleData.roleView.y);
		}
		if(start==null || start.walkAble==false)
			return null;
		if(this.checkAroundEmptyInTheNode(start)==false){
			return null;
		};
		var shift=vo.shift;
		if(vo.roleData==role){
			if(end.walkAble==false || end.roleBlock==false){
				if(!vo.isNearestPoint){
					return null;
				}
				end=MapUtil.getNearWalkNodeBy1Round(end,mapData,true,start);
				if(end !=null){
					shift--;
				}
				else{
					var chx=0;
					var chy=0;
					while(end && (end.walkAble==false || end.roleBlock==false)){
						if(end==start)
							break ;
						chx=start.x > end.x ? 1 :(start.x < end.x ?-1 :0);
						chy=start.y > end.y ? 1 :(start.y < end.y ?-1 :0);
						end=mapData.getNode(end.x+chx,end.y+chy);
						shift--;
					}
				}
			}
		}
		if(end==null){
			return null;
		}
		if(start==end){
			return this._emptyAction;
		}
		return this.findRoad(mapData,start,end,shift,vo.handler,vo.handlerParam,vo.finishHandler,vo.finishParam,true,forceStep2);
	}

	__proto.findRoad=function(mapData,startNode,endNode,shift,handler,handlerParam,finishHandler,finishParam,isMyRole,forceStep2){
		(shift===void 0)&& (shift=0);
		(isMyRole===void 0)&& (isMyRole=false);
		(forceStep2===void 0)&& (forceStep2=false);
		if(startNode==endNode){
			return null;
		};
		var vect;
		mapData.startNode=startNode;
		mapData.endNode=endNode;
		var list=Astart.findPath(mapData);
		if(list !=null){
			list.reverse();
			if(list.length > shift){
				while(shift > 0){
					list.pop();
					shift--;
				}
			}
			if(isMyRole){
				RadarCenter.wayPoints=list;
			}
			vect=this.getTurnStepNode(list,forceStep2);
			if(vect !=null && vect.length > 0){
				var leng=vect.length;
				if(handler !=null){
					for(var j=0;j < leng;j++){
						vect[j].callBackParam=handlerParam;
						vect[j].callBack=handler;
					}
				}
				if(finishHandler !=null){
					vect[leng-1].callBackParam=finishParam;
					vect[leng-1].callBack=finishHandler;
				}
			}
		}
		else if(endNode !=null){
			if(GameConfig.isDebug || !GameConfig.isRelease){
				Alert.show("联系客服，地图："+mapData.mapId+"寻路失败（起点("+startNode.x+","+startNode.y+")，终点("+endNode.x+","+endNode.y+")）");
			}
		}
		return vect;
	}

	/**
	*传奇的拐点走路法
	*@param list
	*@param forceStep2 目的地仅剩一格时，是否强制跑过去
	*@return
	*
	*/
	__proto.getTurnStepNode=function(list,forceStep2){
		var vect;
		if(list){
			vect=[];
			if(list.length==1){
				vect.push(this.makeMoveAction(-1,1,list [0]));
			}
			else{
				var leng=list.length;
				for(var i=0;i < leng;){
					var v=1;
					var f=list[i];
					var s=list[i+1];
					var t=list[i+2];
					var action;
					if(s==null)
						break ;
					var dir1=SceneType.getDretion(f.x,f.y,s.x,s.y);
					if(t !=null){
						var dir2=SceneType.getDretion(s.x,s.y,t.x,t.y);
						if(dir1==dir2){
							vect.push(this.makeMoveAction(-1,2,t));
							v=2;
						}
						else{
							action=this.makeMoveAction(-1,1,s);
							action.actionStep=2;
							vect.push(action);
						}
					}
					else{
						action=this.makeMoveAction(-1,1,s);
						if(forceStep2){
							action.actionStep=2;
						}
						vect.push(action);
						break ;
					}
					i+=v;
				}
			}
		}
		if(MoveAction.maxCount < vect.length){
			MoveAction.maxCount=vect.length;
		}
		return vect;
	}

	// return vect;
	__proto.makeMoveAction=function(dir,step,node){
		var action=MoveAction.getAction();
		action.faceDirection=dir;
		action.endNode=node;
		action.step=step;
		return action;
	}

	__proto.addMapClickEffect=function(px,py){
		CPlayOnceEffect.play(ResPathUtil.getSceneEffect("dianji","dianji"),this.mapModule.scene.mapGroundMagicContainer,px,py);
	}

	__proto.clear=function(){}
	/**
	*往周围随机跑动一格，如果在自动战斗中则重置状态
	*
	*/
	__proto.randomMove=function(){
		var characterData=App.role;
		var nodex=characterData.nodex;
		var nodey=characterData.nodey;
		var node;
		var map=App.mapData;
		var arr=[[-1,-1],[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1],[-1,0]];
		for(var i=0;i < arr.length;i++){
			node=map.getNode(nodex+arr[i][0],nodey+arr[i][1]);
			if(node !=null){
				if(node.walkAble && node.roleBlock){
					if(this.moveToPoint(MapVO.getPixelPos(node,true),MapVO.getPixelPos(node,false),false,false)){
						if(GlobalControl.isAutoFight){
							this.mapModule.autoFightRobot.resetState();
						}
					}
					break ;
				}
			}
		}
	}

	/**
	*寻路NPC
	*@param npcId npcId
	*@param autoFight
	*@param fromMapPanel 是否通过地图面板调用的，是的话寻路完毕后需要关闭地图面板
	*@param type 寻路类型，默认 SearchToPointVO.WALK，表示随机后继续寻路
	*@param taskId 任务寻路，用于判断是否显示小飞鞋
	*@param p 指定目的地坐标，不传则是npc的配置坐标
	*@param isWalkMap 目标NPC不在当前地图时是否走路过去
	*/
	__proto.walkToNpc=function(npcId,autoFight,fromMapPanel,type,taskId,p,closeNeigua,isWalkMap){
		(autoFight===void 0)&& (autoFight=false);
		(fromMapPanel===void 0)&& (fromMapPanel=false);
		(type===void 0)&& (type="walk");
		(taskId===void 0)&& (taskId=0);
		(closeNeigua===void 0)&& (closeNeigua=true);
		(isWalkMap===void 0)&& (isWalkMap=true);
		var npcBean=App.dataMgr.q_npcContainer.getDataBean(npcId,false);
		if(!npcBean){
			return;
		};
		var roleData=App.role;
		if(roleData==null || roleData.isDead || roleData.isJump || roleData.isDash){
			return;
		}
		GlobalControl.isEscortOpen=false;
		this.clearSearchRoad();
		App.mapModule.mapSkillModel.clear();
		App.closeAutoFight("walkToNpc寻路",false,true,closeNeigua);
		if(!p){
			if(npcBean.q_x==0 && npcBean.q_y==0){
				p=new Point(npcBean.q_px,npcBean.q_py);
				}else{
				p=MapVO.getCenterPoint(npcBean.q_x,npcBean.q_y);
			}
		}
		if(npcBean.q_map==roleData.mapId){
			var distanceGrid=MapVO.getDistanceBy2Point(roleData.move_to_x,roleData.move_to_y,p.x,p.y);
			if(distanceGrid > npcBean.q_Interactive){
				this.mapModule.mapAvatarModel.character.changeAutoSearchRoad(true,taskId);
				var vo=new SearchToPointVO();
				vo.px=p.x;
				vo.py=p.y;
				vo.type=type;
				vo.finishHandler=Handler.create(this,this.walkToNpcCallback);
				vo.finishParam=[npcId,autoFight,fromMapPanel,closeNeigua];
				vo.shift=2;
				var list=this.searchRoadByAstar(vo);
				if(list !=null && list.length > 0){
					this.mapModule.mapAvatarModel.character.roleData.actionList.resetActionList(list);
				}
				else{
					if(App.mapData !=null){
						var node=App.mapData.getNode(p.x,p.y);
						if(node){
							p=this.getAroundEmptyInTheNodeByRangeLimit(node,npcBean.q_Interactive);
						}
						if(p !=null){
							vo=new SearchToPointVO();
							vo.px=p.x;
							vo.py=p.y;
							vo.finishHandler=Handler.create(this,this.walkToNpcCallback);
							vo.finishParam=[npcId,autoFight,fromMapPanel,closeNeigua];
							list=this.searchRoadByAstar(vo);
							if(list !=null && list.length > 0){
								this.mapModule.mapAvatarModel.character.roleData.actionList.resetActionList(list);
							}
						}
					}
				}
				if(list !=null && list.length > 0){
					roleData.addShenxingshu(list.length,false);
				}
			}
			else{
				this.mapModule.mapAvatarModel.clickNpc(npcId);
				this.mapModule.mapAvatarModel.character.changeAutoSearchRoad(false);
				if(fromMapPanel){
					PanelManager.removePanel(PanelRegister.MAP,false);
				}
			}
		}
		else{
			if(isWalkMap){
				this.mapModule.mapAvatarModel.character.changeAutoSearchRoad(true,taskId);
				this._mapSearchManager.params=new SearchParams(0,this.walkToNpcCallback,this,[npcId,autoFight,fromMapPanel]);
				if(this.searchRoadToMap(npcBean.q_map,p.x / MapConfig.MAP_NODE_WIDTH,p.y / MapConfig.MAP_NODE_HEIGHT)!=null){
					roleData.addShenxingshu(0,true);
				}
			}
			else{
				TaskCommandSender.sendTransmint(JSON.stringify({"npcid":npcId}),1,false,false,null,npcId);
			}
		}
	}

	__proto.walkToNpcCallback=function(npcId,autoFight,fromMapPanel,closeNeigua){
		(closeNeigua===void 0)&& (closeNeigua=true);
		if(fromMapPanel){
			PanelManager.removePanel(PanelRegister.MAP,false);
		}
		if(autoFight){
			var role=App.role;
			if(this.mapModule.mapAvatarModel.getMonsterShortestDistance(role.map_x,role.map_y)){
				App.openAutoFight();
				return;
			}
		}
		App.mapModule.mapAvatarModel.clickNpc(npcId);
		App.mapModule.mapAvatarModel.character.changeAutoSearchRoad(false);
		if(!closeNeigua){
			if(NeiGuaFight.isRuning){
				App.mainProxy.changeAutoFightSign(true);
			}
		}
	}

	/**
	*寻路
	*@param mapId 地图id
	*@param nodex 格子x
	*@param nodey 格子y
	*@param autoFight 到目的地是否自动战斗
	*@param finishHandler 寻路完成的回调函数
	*@param shift 剔除的末位格子数
	*@param fromMapPanel 调用此方法的地方
	*@param closeAutoFight 调用此方法时是否停止当前的自动战斗
	*@param showSearchRoad 是否显示自动寻路中的特效
	*@param monsterId 强制攻击目标id
	*@param taskId 任务寻路，用于判断是否显示小飞鞋
	*@return
	*
	*/
	__proto.walkToMap=function(mapId,nodex,nodey,autoFight,finishHandler,shift,fromMapPanel,closeAutoFight,showSearchRoad,monsterId,taskId){
		(autoFight===void 0)&& (autoFight=false);
		(shift===void 0)&& (shift=1);
		(fromMapPanel===void 0)&& (fromMapPanel=false);
		(closeAutoFight===void 0)&& (closeAutoFight=true);
		(showSearchRoad===void 0)&& (showSearchRoad=true);
		(monsterId===void 0)&& (monsterId=0);
		(taskId===void 0)&& (taskId=0);
		var roleData=App.role;
		if(roleData==null || roleData.isDead || roleData.isJump || roleData.isDash){
			return false;
		}
		this.clearSearchRoad();
		App.mapModule.mapSkillModel.clear();
		if(closeAutoFight){
			App.closeAutoFight("walkToMap寻路");
		}
		AutoGameRobot.forceAttackTargetModelId=monsterId;
		if(mapId==-1){
			mapId=roleData.mapId;
		}
		if(mapId==roleData.mapId){
			var vo=new SearchToPointVO();
			vo.px=nodex *MapConfig.MAP_NODE_WIDTH;
			vo.py=nodey *MapConfig.MAP_NODE_HEIGHT;
			if(finishHandler !=null){
				vo.finishHandler=finishHandler;
			}
			else{
				vo.finishHandler=Handler.create(this,this.walkToMapCallback);
				vo.finishParam=[autoFight,fromMapPanel];
			}
			vo.shift=shift;
			var list=this.searchRoadByAstar(vo);
			if(list !=null){
				if(list.length > 0){
					if(showSearchRoad){
						App.mainProxy.changeAutoSearchRoad(true,taskId);
					}
					this.mapModule.mapAvatarModel.character.roleData.actionList.resetActionList(list);
					roleData.addShenxingshu(list.length,false);
					return true;
				}
				else{
					if(finishHandler !=null){
						finishHandler.run();
					}
					return true;
				}
			}
		}
		else{
			if(showSearchRoad){
				App.mainProxy.changeAutoSearchRoad(true,taskId);
			}
			if(finishHandler !=null){
				this._mapSearchManager.params=new SearchParams(0,finishHandler);
			}
			else{
				this._mapSearchManager.params=new SearchParams(0,this.walkToMapCallback,this,[autoFight,fromMapPanel]);
			}
			if(this.searchRoadToMap(mapId,nodex,nodey)!=null){
				roleData.addShenxingshu(0,true);
				return true;
			}
		}
		return false;
	}

	__proto.walkToMapCallback=function(autoFight,fromMapPanel){
		if(autoFight){
			App.openAutoFight();
		}
		else{
			this.mapModule.mapAvatarModel.character.changeAutoSearchRoad(false);
		}
		if(fromMapPanel){
			PanelManager.removePanel(PanelRegister.MAP,false);
		}
	}

	/**
	*寻路打怪
	*@param nodex 格子x
	*@param nodey 格子y
	*@param monsterModelId 怪物模板id（和唯一id只需传一个，优先判断唯一id）
	*@param monsterId 怪物唯一id
	*
	*/
	__proto.walkToMonster=function(nodex,nodey,monsterModelId,monsterId){
		AutoGameRobot.forceAttackTargetModelId=monsterModelId;
		var monster;
		if(monsterId){
			monster=App.mapModule.mapAvatarModel.getMonster(monsterId);
			}else{
			monster=App.mapModule.mapAvatarModel.getMonsterByModelId(monsterModelId);
		}
		if(monster){
			App.openAutoFight(monsterModelId);
		}
		else{
			var shiftGrid=0;
			var skillId=SkillSelect.getDanGongSkillId();
			if(skillId==1000){
				shiftGrid=1;
				}else{
				shiftGrid=App.role.job==1 ? 2 :5;
			};
			var role=App.role;
			if(Math.abs(role.nodex-nodex)<=shiftGrid && Math.abs(role.nodey-nodey)<=shiftGrid){
				App.openAutoFight(monsterModelId);
			}
			else{
				var fightToHandler=Handler.create(App,App.openAutoFight,[monsterModelId]);
				EventMgr.dispatch("ET.character_move_to_position",role.mapId,nodex,nodey,true,fightToHandler,shiftGrid);
			}
		}
	}

	/**
	*找人打
	*@param nodex
	*@param nodey
	*@param playerId
	*/
	__proto.walkToPlayer=function(nodex,nodey,personId){
		var player=App.mapModule.mapAvatarModel.getPlayerOrCharacterData(personId);
		if(player){
			App.mapModule.mapSkillModel.attack(personId);
		}
		else{
			var callFun=Handler.create(App.mapModule.mapSkillModel,App.mapModule.mapSkillModel.attack,[personId]);
			EventMgr.dispatch("ET.character_move_to_position",App.role.mapId,nodex,nodey,true,callFun,App.role.job==1 ? 2 :5);
		}
	}

	__getset(0,__proto,'mapSearchManager',function(){
		return this._mapSearchManager;
	});

	__getset(0,__proto,'actList',function(){
		return this.mapModule.mapAvatarModel.character.roleData.actionList;
	});

	return MapMoveModel;
})()
