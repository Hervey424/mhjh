//class com.modules.map.model.MapAvatarModel
var MapAvatarModel=(function(){
	var DeadMonster;
	function MapAvatarModel(module){
		this.mapModule=null;
		/**
		*人物列表
		*/
		this._playerHash=null;
		/**
		*怪物列表
		*/
		this._monsterHash=null;
		/**
		*npc列表
		*/
		this._npcHash=null;
		/**
		*宠物列表
		*/
		this._petHash=null;
		/**
		*分身列表
		*/
		this._fenshenHash=null;
		this._character=null;
		this._crtVisRoleNum=0;
		this._nodeBlockHash=null;
		this._petTalk=null;
		this._deadCount=0;
		this._deadDict={};
		this.myPetDict=new Dict();
		this.mapModule=ClassUtils.asTo(module,MapModuleChildHouse);
		this.initialize();
	}

	__class(MapAvatarModel,'com.modules.map.model.MapAvatarModel');
	var __proto=MapAvatarModel.prototype;
	__proto.initialize=function(){
		this._playerHash=new Dict();
		this._petHash=new Dict();
		this._fenshenHash=new Dict();
		this._monsterHash=new Dict();
		this._npcHash=new Dict();
		this._nodeBlockHash=new Dict();
	}

	__proto.checkIsCharcter=function(id){
		if(this._character==null)
			return false;
		return id==this._character.roleData.personId;
	}

	__proto.getRoleData=function(id){
		if(id=="99999999"){
			return MengchongAI.ins.roleData;
		};
		var role=this.getPlayerOrCharacterData(id);
		if(!role)
			role=this.getMonster(id);
		if(!role)
			role=this.getPet(id);
		if(!role)
			role=this.getFenshen(id);
		if(!role)
			role=this.getNpc(id);
		return role;
	}

	__proto.getFightRoleData=function(id){
		return this.getRoleData(id);
	}

	/**
	*获得玩家或者主角的数据
	*@param id
	*@return
	*
	*/
	__proto.getPlayerOrCharacterData=function(id){
		if(this.checkIsCharcter(id)){
			return App.role;
		}
		return this.getPlayer(id);
	}

	__proto.getPlayer=function(id){
		return this._playerHash.get(id);
	}

	__proto.delPlayer=function(id){
		this.deleteRole(this.getPlayer(id),this._playerHash,true);
	}

	__proto.getMonsterByModelId=function(id){
		var values=this._monsterHash.values;
		var role;
		for(var $each_role in values){
			role=values[$each_role];
			if(role.monsterModelId==id){
				return role;
			}
		}
		return null;
	}

	__proto.getMonstersByModelId=function(id){
		var arr=[];
		var values=this._monsterHash.values;
		var role;
		for(var $each_role in values){
			role=values[$each_role];
			if(role.monsterModelId==id){
				arr.push(role);
			}
		}
		return arr;
	}

	__proto.updateToushi=function(){
		var values=this._monsterHash.values;
		var role;
		for(var $each_role in values){
			role=values[$each_role];
			role.updateToushi();
		}
	}

	/**周围是否含有怪 */
	__proto.hasMonster=function(){
		return this._monsterHash.size > 0;
	}

	__proto.getMonster=function(id){
		return this._monsterHash.get(id);
	}

	__proto.delMonster=function(id,dispose){
		(dispose===void 0)&& (dispose=true);
		this.deleteRole(this.getMonster(id),this._monsterHash,dispose);
	}

	__proto.getShiti=function(){
		var values=this._npcHash.values;
		var npc;
		for(var $each_npc in values){
			npc=values[$each_npc];
			if(npc.npcModelId==82){
				if(npc.sex-myparseInt(GlobalCenter.npcWajueDict[npc.job])> 0){
					if(npc.isMyOwner()){
						return npc;
					}
				}
			}
		}
		return null;
	}

	__proto.getNpcByModelId=function(id){
		var values=this._npcHash.values;
		var role;
		for(var $each_role in values){
			role=values[$each_role];
			if(role.npcModelId==id || role.job==id){
				return role;
			}
		}
		return null;
	}

	__proto.getNpcNearby=function(){
		var nodex=App.role.nodex;
		var nodey=App.role.nodey;
		var priority=0;
		var npc;
		var values=this._npcHash.values;
		var role;
		for(var $each_role in values){
			role=values[$each_role];
			if(Math.abs(role.nodex-nodex)<=2 && Math.abs(role.nodey-nodey)<=2){
				if(!npc || role.npcModelBean.q_priority > priority){
					npc=role;
					priority=role.npcModelBean.q_priority;
				}
			}
		}
		return npc;
	}

	__proto.getNpc=function(id){
		return this._npcHash.get(id);
	}

	__proto.delNpc=function(id){
		var role=this.getNpc(id);
		if(role){
			this._npcHash.remove(id);
			var bean=role.npcModelBean;
			if(bean.q_flash_effects){
				CPlayOnceEffect.play(ResPathUtil.getSceneEffect(bean.q_flash_effects,"npc"),this.mapModule.scene.mapGroundMagicContainer,role.map_x,role.map_y);
			}
			if(bean.q_walkable==1){
				App.mapData.getNode(bean.q_x,bean.q_y).walkAble=true;
			}
			EventMgr.dispatch("ET.DELETE_NPC",id);
			role.dispose();
			if(bean.q_id==81 && App.role){
				App.role.showChangeMapXY(true);
			}
		}
		if(GatherCenter.wajueId==id){
			GatherCenter.clear();
		}
	}

	__proto.clickNpc=function(id){
		var role=this.getNpcByModelId(id);
		if(role){
			TaskCommandSender.sendNpcServices(role);
		}
	}

	// role.roleView.mouseDown();
	__proto.showMarsTalk=function(content,panelId){
		(panelId===void 0)&& (panelId=0);
		var pet=this.getMyMars();
		if(pet !=null){
			pet.roleView.showChatBubble(content,10000,false,panelId);
		}
	}

	__proto.getMyMars=function(){
		var values=this._petHash.values;
		var pet;
		for(var $each_pet in values){
			pet=values[$each_pet];
			if(pet.isMyPet && pet.isMars){
				return pet;
			}
		}
		return null;
	}

	__proto.getMyPet=function(petType){
		var values=this._petHash.values;
		var pet;
		for(var $each_pet in values){
			pet=values[$each_pet];
			if(pet.isMyPet && pet.petModelBean.q_pettype==petType){
				return pet;
			}
		}
		return null;
	}

	__proto.getPets=function(ownerId,petTypes){
		var arr=[];
		var values=this._petHash.values;
		var pet;
		for(var $each_pet in values){
			pet=values[$each_pet];
			if(ownerId && pet.ownerId !=ownerId){
				continue ;
			}
			if(petTypes && petTypes.indexOf(pet.petModelBean.q_pettype)==-1){
				continue ;
			}
			arr.push(pet);
		}
		return arr;
	}

	__proto.getFenshens=function(ownerId){
		var arr=[];
		var values=this._fenshenHash.values;
		var pet;
		for(var $each_pet in values){
			pet=values[$each_pet];
			if(ownerId && pet.ownerId !=ownerId){
				continue ;
			}
			arr.push(pet);
		}
		return arr;
	}

	__proto.getPet=function(id){
		return this._petHash.get(id);
	}

	__proto.getFenshen=function(id){
		return this._fenshenHash.get(id);
	}

	__proto.getPetOrFenshen=function(id){
		var pet=this._petHash.get(id);
		if(!pet){
			pet=this._fenshenHash.get(id);
		}
		return pet;
	}

	__proto.hasFenshen=function(){
		var values=this._fenshenHash.values;
		var pet;
		for(var $each_pet in values){
			pet=values[$each_pet];
			if(pet.isMyPet){
				return true;
			}
		}
		return false;
	}

	__proto.delPet=function(id,dispose,showEffect){
		(dispose===void 0)&& (dispose=true);
		(showEffect===void 0)&& (showEffect=false);
		var pet=this.getPet(id);
		if(pet !=null){
			if(showEffect){
				pet.roleView.showEffect(ResPathUtil.getSceneEffect("shenhun_zhaohuan","chuansong"),0,0,null,true,App.mapModule.scene.mapFlyMagicContainer);
			}
			if(pet.isShenjiang && pet.ownerId==App.role.personId){
				ShenjiangAI.getInstance().remove(id);
			}
			this.deleteRole(pet,this._petHash,dispose);
		}
	}

	__proto.delFenshen=function(id,dispose){
		(dispose===void 0)&& (dispose=true);
		var pet=this.getFenshen(id);
		if(pet !=null){
			this.deleteRole(pet,this._fenshenHash,dispose);
		}
	}

	__proto.deleteRole=function(role,hash,dispose){
		(dispose===void 0)&& (dispose=true);
		if(role !=null){
			if(App.mapData !=null){
				var preNode=App.mapData.getNode(role.nodex,role.nodey);
				if(preNode){
					this.deleteBlockNodeInHash(preNode,role);
				}
			}
			hash.remove(role.personId);
			AttackerListCenter.remove(role.personId);
			if((role instanceof com.logic.data.role.MapMonsterRoleData )){
				EventMgr.dispatch("ET.DELETE_MONSTER",role.personId);
				KuafuBattleCenter.setKuafuBossHide(role);
			}
			else if((role instanceof com.logic.data.role.MapPlayerRoleData )){
				if(role !=App.role){
					EventMgr.dispatch("ET.PLAYER_REMOVE",role.personId);
				}
			}
			if(dispose){
				role.dispose();
			}
		}
	}

	/**
	*创建宠物
	*@param pet
	*
	*/
	__proto.createPet=function(petInfo,isZhaohuan){
		(isZhaohuan===void 0)&& (isZhaohuan=false);
		if(petInfo.showgroup !=App.role.showGroup && petInfo.showgroup !=0){
			return;
		}
		if(App.mapData==null){
			return;
		}
		this.delPet(petInfo.petId.toString());
		var petData=new MapPetRoleData();
		petData.initRoldData(petInfo);
		this._petHash.set(petData.personId,petData);
		var dir=petInfo.dir;
		var act="1";
		if(petData.isMars && petData.ownerId==this.character.roleData.personId){
			if(this.myPetDict.has(petData.personId)==false){
				petData.roleView.showEffect(ResPathUtil.getSceneEffect("zhanshenzhaohuan","zhanshenzhaohuan"));
			}
			}else if(petData.isShenhunCallPet){
			if(isZhaohuan){
				dir=0;
				act="zhaohuan";
			}
		}
		this.makePlayer(petData,act,dir);
		this.addRoleToScene(petData);
		if(petData.isMyPet){
			if(petData.isShenjiang){
				ShenjiangAI.getInstance().add(petData);
			}
			if(petData.isMars){
				EventMgr.dispatch("ET.CREATE_PET",petData);
			}
			petData.roleView.headContainer.changeHpStyle(3);
		}
	}

	/**
	*创建分身
	*@param pet
	*
	*/
	__proto.createFenshen=function(info){
		if(info.showgroup !=0 && info.showgroup !=App.role.showGroup){
			return;
		}
		if(App.mapData==null){
			return;
		}
		this.delFenshen(info.id.toString());
		var petData=new MapFenshenRoleData();
		petData.initRoldData(info);
		this._fenshenHash.set(petData.personId,petData);
		this.makePlayer(petData,"1",petData.dir);
		this.addRoleToScene(petData);
		if(petData.isMyPet){
			petData.roleView.headContainer.changeHpStyle(3);
		}
	}

	/**
	*创建怪物
	*@param monsterInfo
	*
	*/
	__proto.createMonster=function(monsterInfo){
		var roleData=App.role;
		if(monsterInfo.showgroup !=0 && monsterInfo.showgroup !=roleData.showGroup){
			return;
		}
		if(App.mapData==null){
			return;
		}
		this.delMonster(monsterInfo.monsterId.toString());
		var bean=DataManager.getInstance().q_monsterContainer.getDataBean(monsterInfo.monsterModelId,false);
		if(bean==null){
			return;
		};
		var monsterData=MapMonsterRoleData.getRoleData();
		monsterData.initRoldData(monsterInfo);
		monsterData.isDispose=false;
		this._monsterHash.set(monsterData.personId,monsterData);
		this.makePlayer(monsterData,"1",monsterData.dir);
		this.addRoleToScene(monsterData);
		monsterData.updateToushi();
		KuafuBattleCenter.setKuafuBossShow(monsterData,bean);
		if(bean.q_guanghuan){
			var obj=JSON.parse(bean.q_guanghuan);
			if(obj["guanghuan"]){
				monsterData.roleView.addEffect(4,ResPathUtil.getSceneEffect("guanghuan_"+obj["guanghuan"],"monster_select"),false);
			}
			if(obj["baoqi"]){
				var scale=1;
				if(obj["baoqiscale"]){
					scale=bean.q_modelHeight / obj["baoqiscale"];
				}
				monsterData.roleView.addEffect(15,ResPathUtil.getSceneEffect("baoqi_"+obj["baoqi"],"monster_select"),true,scale,scale);
			}
		}
		if(monsterInfo.passiveCall==1){
			monsterData.roleView.showTitleEffect(ResPathUtil.getTitleEffect("bstj"));
		}
		if(bean.q_type==32 && monsterData.creatorId==App.role.personId){
			var vo=EscortCenter.getCurrentDoingData();
			if(vo){
				var distanceGrid=Math.abs(vo.x-App.role.nodex)+Math.abs(vo.y-App.role.nodey);
				var yes=distanceGrid <=vo.range;
				(monsterData.roleView).showYabiaoEffect(yes);
			}
		}
		if(EnumMonsterType.isBossOrElite(bean.q_type)){
			roleData.playBossMarsVoice();
		}
		if(bean.q_greet){
			App.mainProxy.showDialog(bean.q_greet,monsterInfo.monsterName);
		};
		var equips;
		var crossData;
		if(ZoneCenter.getZoneClientType()==91){
			var data=WulingdahuiCenter.jingjieInfo;
			if(data && monsterData.personId !=App.role.personId){
				crossData=new RoleCrossDressData();
				crossData.name=data.name;
				crossData.sex=data.sex;
				crossData.job=data.job;
				crossData.szCloth=data.fashion;
				crossData.weapon=data.weapon;
				crossData.wingId=data.wings;
				crossData.zhenfaid=data.zhenfaid;
				monsterData.setCrossDressData(crossData);
				monsterData.roleView.headContainer.mustShowHpText=true;
				monsterData.roleView.headContainer.layout();
			}
		}
		EventMgr.dispatch("ET.CREATE_MONSTER",monsterData);
		if(bean.q_prompt > 0){
			var map=roleData.mapBean;
			if(map && map.q_client_type==3){
				this.addMonsterTip(monsterData);
			}
		}
	}

	__proto.addMonsterTip=function(monsterData){
		if(monsterData && monsterData.monsterModelBean){
			var monsterType=monsterData.monsterModelBean.q_type;
			if(EnumMonsterType.isMonster(monsterType,8)|| EnumMonsterType.isMonster(monsterType,16)){
				var dire=SceneType.getDretion(App.role.nodex,App.role.nodey,monsterData.nodex,monsterData.nodey);
				var dire1;
				var dire2;
				switch(dire){
					case 0:{
							dire1="上";
							dire2="↑";
							break ;
						}
					case 1:{
							dire1="右上";
							dire2="↗";
							break ;
						}
					case 2:{
							dire1="右";
							dire2="→";
							break ;
						}
					case 3:{
							dire1="右下";
							dire2="↘";
							break ;
						}
					case 4:{
							dire1="下";
							dire2="↓";
							break ;
						}
					case 5:{
							dire1="左下";
							dire2="↙";
							break ;
						}
					case 6:{
							dire1="左";
							dire2="←";
							break ;
						}
					case 7:{
							dire1="左上";
							dire2="↖";
							break ;
						}
					};
				var chat=new ChatInfo();
				chat.type=3;
				chat.head="0";
				chat.sender="<font color='"+EnumChatType.getChannelColor(3)+"'>"+EnumChatType.TYPE_NAME[0]+"</font>";
				if(Browser.onPC){
					chat.chat="发现怪物：「"+EnumMonsterType.getMonsterTitle(monsterType)+"」"+monsterData.monsterModelBean.q_name+"，方向："+dire1+dire2+"，坐标：（"+monsterData.nodex+","+monsterData.nodey+"）";
					}else{
					chat.chat="发现「"+EnumMonsterType.getMonsterTitle(monsterType)+"」"+monsterData.monsterModelBean.q_name+"，方向："+dire2+"（"+monsterData.nodex+","+monsterData.nodey+"）";
				}
				chat.content=chat.chat;
				chat.isFindBoss=true;
				ChatCenter.addChannelData(3,chat);
				EventMgr.dispatch("CE.chat_response",chat);
				App.mainProxy.showBossTip(chat.chat);
				return true;
			}
		}
		return false;
	}

	/**
	*创建NPC
	*/
	__proto.createNpc=function(npcInfo){
		if(npcInfo.showgroup !=App.role.showGroup && npcInfo.showgroup !=0){
			return;
		}
		if(App.mapData==null){
			return;
		}
		this.delNpc(npcInfo.npcId.toString());
		var bean=DataManager.getInstance().q_npcContainer.getDataBean(npcInfo.npcModelId,false);
		if(bean==null){
			return;
		};
		var npcData=new MapNpcRoleData();
		npcData.initRoldData(npcInfo);
		this._npcHash.set(npcData.personId,npcData);
		this.makePlayer(npcData,"1",npcData.dir);
		this.addRoleToScene(npcData);
		if(npcInfo.npcModelId==82 || bean.q_energy_type==54){
			(npcData.roleView).showDrop(true);
		}
		else if(npcInfo.npcModelId==182){
			(npcData.roleView).showDrop2(true);
		}
		if(bean.q_id==81 && App.role){
			App.role.showChangeMapXY(true);
		}
		if(bean.q_walkable==1){
			var node=App.mapData.getNodeByXY(npcData.map_x,npcData.map_y);
			if(node !=null){
				node.walkAble=false;
			}
		}
		if(ActivityUtil.isOpenByFunType(4)){
			if(npcInfo.npcModelId==77 || npcInfo.npcModelId==94){
				npcData.roleView.changeDirAction("3");
			}
		}
		if(npcInfo.npcModelId==73){
			(npcData.roleView).getHeadContainer().setGuildName(bean.q_npcdesc,"#ef0605");
		};
		var taskDict=TaskModel.taskDict;
		var taskData;
		for(var $each_taskData in taskDict){
			taskData=taskDict[$each_taskData];
			if(npcInfo.npcModelId==taskData.taskFinishID){
				if(taskData.hasDialogTask()){
					(npcData.roleView).addStateEffect(2);
				}
				else{
					(npcData.roleView).addStateEffect(taskData.taskState);
				}
			}
			if(taskData.taskType==1){
				(npcData.roleView).addCaijiEffect(taskData.vecConditionData[0].taskConditionType==32 && taskData.vecConditionData[0].targetId==npcInfo.npcModelId);
			}
		}
		EventMgr.dispatch("ET.CREATE_NPC",npcData);
	}

	/**
	*创建场景上的别的玩家人物
	*@param roleData
	*
	*/
	__proto.createPlayer=function(playInfo){
		if(playInfo.showgroup !=App.role.showGroup && playInfo.showgroup !=0){
			return;
		}
		if(App.mapData==null){
			return;
		}
		this.delPlayer(playInfo.personId.toString());
		var playerData=new MapPlayerRoleData();
		playerData.initRoldData(playInfo);
		this._playerHash.set(playerData.personId,playerData);
		var color="#fffffe";
		if(App.role.group==0){
			if(EnumMapId.isChangeNameColor(App.role.mapId)){
				if(this.mapModule.mapAvatarModel.isEnemy(playerData)){
					color="#ef0605";
					}else{
					color="#50ade0";
				}
			}
			}else{
			if(this.mapModule.mapAvatarModel.isSameGroup(App.role,playerData)){
				color="#50ade0";
				}else{
				color="#ef0605";
			}
		}
		if(App.role.mapId==210043 || App.role.mapId==210045){
			if(GuildCenter.isGuildMySame(playerData.guildId)){
				color="#50ade0";
				}else{
				color="#ef0605";
			}
		}
		playerData.nameColor=color;
		playerData.setName(playerData.name,color);
		this.makePlayer(playerData,"1",playerData.dir);
		playerData.roleView.showLongshenEffect(playInfo.longShenId);
		this.addRoleToScene(playerData);
		this.mapModule.mapSkillModel.checkIsLastSelect(playerData.personId,playerData.roleView);
		EventMgr.dispatch("ET.PLAYER_CREATE",playerData);
	}

	__proto.changeOtherGroup=function(id,data){
		if(data){
			if(App.role.group==0){
				data.nameColor="#fffffe";
				}else{
				if(this.mapModule.mapAvatarModel.isSameGroup(App.role,data)){
					data.nameColor="#50ade0";
					}else{
					data.nameColor="#ef0605";
				}
			}
		}
	}

	__proto.checkIsNodeWalkAble=function(role,crtNodex,crtNodey,preNodex,preNodey){
		if(this.mapModule.mapLoader.isSafeMap==false){
			var mapData=App.mapData;
			if(!mapData){
				return;
			};
			var crtNode=mapData.getNode(crtNodex,crtNodey);
			var preNode=mapData.getNode(preNodex,preNodey);
			if(preNode){
				this.deleteBlockNodeInHash(preNode,role);
			}
			if(crtNode){
				switch(Object(role).constructor){
					case MapPetRoleData:
						if(crtNode.isSafe==false){
							if(this.mapModule.mapLoader.q_map_player_cross_pet==false){
								crtNode.roleBlock=false;
								this.putBlockNodeInHash(crtNode,role);
							}
						}
						break ;
					case MapPlayerRoleData:
						if(crtNode.isSafe==false){
							if(this.mapModule.mapLoader.q_map_player_cross_player==false
								&& (role).isDead==false){
								crtNode.roleBlock=false;
								this.putBlockNodeInHash(crtNode,role);
							}
						}
						break ;
					case MapMonsterRoleData:
						if(crtNode.isSafe==false){
							if(this.mapModule.mapLoader.isCanMapPlayer==false){
								crtNode.roleBlock=false;
								this.putBlockNodeInHash(crtNode,role);
							}
						}
						break ;
					}
			}
		}
	}

	__proto.deleteBlockNodeInHash=function(preNode,role){
		var nodeRoleHash=this._nodeBlockHash.get(preNode);
		if(nodeRoleHash){
			nodeRoleHash.remove(role);
			if(nodeRoleHash.size <=0){
				preNode.roleBlock=true;
				this._nodeBlockHash.remove(preNode);
			}
		}
	}

	__proto.putBlockNodeInHash=function(crtNode,role){
		var nodeRoleHash=this._nodeBlockHash.get(crtNode);
		if(nodeRoleHash){
			if(nodeRoleHash.has(role)==false){
				nodeRoleHash.set(role,role);
			}
		}
		else{
			nodeRoleHash=new Dict();
			nodeRoleHash.set(role,role);
			this._nodeBlockHash.set(crtNode,nodeRoleHash);
			crtNode.roleBlock=false;
		}
	}

	__proto.changeRoleDataHash=function(bool,role,vishash){
		if((role instanceof com.logic.data.role.MapPetRoleData )){
			if((role).isVirtualPet){
				return;
			}
		}
		if(bool){
			vishash.set(role.personId,role)
		}
		else{
			vishash.remove(role.personId);
		}
	}

	__proto.addRoleToScene=function(roleData){
		this.mapModule.scene.mapAvatarHeadContainer.addChild(roleData.roleView.headContainer);
		if((roleData instanceof com.logic.data.role.MapPlayerRoleData )){
			var bool=true;
			if(MapAvatarModel._hideData.hide_allPlayer){
				bool=false;
			}
			else if(MapAvatarModel._hideData.hide_myGuildPlayer && GuildCenter.isGuildSame((roleData).guildId,App.role.guildId)){
				bool=false;
			}
			roleData.roleView.addToParent(this.mapModule.scene.mapAvatarContainer,bool);
		}
		else if((roleData instanceof com.logic.data.role.MapMonsterRoleData )){
			if(MapAvatarModel._hideData.hide_commonMonster && EnumMonsterType.isMonster((roleData).monsterType,2)){
				return;
			}
			else{
				roleData.roleView.addToParent(this.mapModule.scene.mapAvatarContainer);
			}
		}
		else if((roleData instanceof com.logic.data.role.MapPetRoleData )){
			if(MapAvatarModel._hideData.isHidePet(roleData)){
				roleData.roleView.headContainer.showNameBar();
				roleData.roleView.headContainer.layout();
				return;
			}
			else{
				roleData.roleView.addToParent(this.mapModule.scene.mapAvatarContainer);
			}
		}
		else{
			roleData.roleView.addToParent(this.mapModule.scene.mapAvatarContainer);
		}
	}

	__proto.petHashEach=function(id,roleData){
		if(MapAvatarModel._hideData.isHidePet(roleData)){
			this.removeNoMouseRoleAvatar(roleData.personId,roleData);
		}
		else{
			this.showNoMouseRoleAvatar(roleData.personId,roleData);
			roleData.changeFeature();
		}
	}

	// }
	__proto.changePlayerNameColor=function(){
		this._playerHash.foEach(GameHandler.create(this,this.playerNameColorEach));
	}

	__proto.playerNameColorEach=function(id,roleData){
		var color="#50ade0";
		if(this.isEnemy(roleData)){
			color="#ef0605";
		}
		roleData.nameColor=color;
	}

	__proto.playerHashEach=function(id,roleData){
		if(!GuildCenter.isGuildSame(roleData.guildId,App.role.guildId)|| AttackerListCenter.isAttackMe(roleData.personId)){
			this.showRoleAvatar(roleData.personId,roleData);
		}
	}

	__proto.monsterHashEach=function(id,roleData){
		if(EnumMonsterType.isBossOrElite(roleData.monsterType)){
			roleData.changeFeature();
		}
	}

	__proto.monsterHashEach2=function(id,roleData,data){
		if(EnumMonsterType.isMonster(roleData.monsterType,2)){
			if(data.hide_commonMonster){
				this.removeNoMouseRoleAvatar(roleData.personId,roleData);
			}
			else{
				this.showNoMouseRoleAvatar(roleData.personId,roleData);
				roleData.changeFeature();
			}
		}
	}

	__proto.playerHashEach2=function(id,roleData,data){
		if(GuildCenter.isGuildSame(roleData.guildId,App.role.guildId)){
			data.hide_myGuildPlayer && !AttackerListCenter.isAttackMe(roleData.personId)? this.removeRoleAvatar(roleData.personId,roleData):this.showRoleAvatar(roleData.personId,roleData);
		}
	}

	__proto.playerHashEach3=function(id,roleData,data){
		data.hide_playerTitles ? roleData.roleView.showTitleEffect(null):roleData.roleView.showTitleEffect("");
	}

	__proto.playerHashEach4=function(id,roleData,bool){
		roleData.roleView.showZhenfa(bool);
		roleData.roleView.changePartVisible(5,bool);
		roleData.roleView.changePartVisible(13,bool);
	}

	__proto.playerHashEach5=function(id,roleData,data){
		(!data.hide_allPlayer || AttackerListCenter.isAttackMe(roleData.personId))? this.showRoleAvatar(id,roleData):this.removeRoleAvatar(id,roleData);
	}

	__proto.showHideRole=function(data){
		if(MapAvatarModel._hideData.hide_allPet !=data.hide_allPet){
			MapAvatarModel._hideData.hide_allPet=data.hide_allPet;
			this._petHash.foEach(GameHandler.create(this,this.petHashEach));
			ShenhunAI.getInstance().hideAllShenhun(MapAvatarModel._hideData.hide_allPet);
		}
		if(MapAvatarModel._hideData.hide_allPlayer !=data.hide_allPlayer){
			MapAvatarModel._hideData.hide_allPlayer=data.hide_allPlayer;
			if(data.hide_allPlayer){
				this._playerHash.foEach(GameHandler.create(this,this.playerHashEach5),[data]);
			}
			else if(data.hide_myGuildPlayer){
				this._playerHash.foEach(GameHandler.create(this,this.playerHashEach));
			}
			else{
				this._playerHash.foEach(GameHandler.create(this,this.showRoleAvatar));
			}
		}
		if(MapAvatarModel._hideData.hide_boss !=data.hide_boss){
			MapAvatarModel._hideData.hide_boss=data.hide_boss;
			this._monsterHash.foEach(GameHandler.create(this,this.monsterHashEach));
		}
		if(MapAvatarModel._hideData.hide_commonMonster !=data.hide_commonMonster){
			MapAvatarModel._hideData.hide_commonMonster=data.hide_commonMonster;
			this._monsterHash.foEach(GameHandler.create(this,this.monsterHashEach2),[data]);
		}
		if(MapAvatarModel._hideData.hide_myGuildPlayer !=data.hide_myGuildPlayer){
			MapAvatarModel._hideData.hide_myGuildPlayer=data.hide_myGuildPlayer;
			if(MapAvatarModel._hideData.hide_allPlayer==false){
				this._playerHash.foEach(GameHandler.create(this,this.playerHashEach2),[data]);
			}
		}
		if(MapAvatarModel._hideData.hide_playerTitles !=data.hide_playerTitles){
			MapAvatarModel._hideData.hide_playerTitles=data.hide_playerTitles;
			this._playerHash.foEach(GameHandler.create(this,this.playerHashEach3),[data]);
		}
		if(MapAvatarModel._hideData.hide_playerWing !=data.hide_playerWing){
			MapAvatarModel._hideData.hide_playerWing=data.hide_playerWing;
			var bool=data.hide_playerWing ? false :true;
			this._playerHash.foEach(GameHandler.create(this,this.playerHashEach4),[bool]);
			this._character.showZhenfa(bool);
			this._character.changePartVisible(5,bool);
			this._character.changePartVisible(13,bool);
		}
	}

	__proto.checkAvatarShowHide=function(roleData){
		if(roleData !=App.role){
			if((roleData instanceof com.logic.data.role.MapPetRoleData )){
				if(MapAvatarModel._hideData.isHidePet(roleData)){
					this.removeNoMouseRoleAvatar(roleData.personId,roleData);
					return;
				}
			}
			if((roleData instanceof com.logic.data.role.MapPlayerRoleData )){
				if(MapAvatarModel._hideData.hide_playerWing){
					roleData.roleView.showZhenfa(false);
					roleData.roleView.changePartVisible(5,false);
					roleData.roleView.changePartVisible(13,false);
				}
				if(MapAvatarModel._hideData.hide_allPlayer){
					this.removeRoleAvatar(roleData.personId,roleData);
					return;
				}
				if(MapAvatarModel._hideData.hide_myGuildPlayer){
					if(GuildCenter.isGuildSame((roleData).guildId,App.role.guildId)){
						this.removeRoleAvatar(roleData.personId,roleData);
						return;
					}
				}
			}
			if(MapAvatarModel._hideData.hide_commonMonster && ((roleData instanceof com.logic.data.role.MapMonsterRoleData ))&& EnumMonsterType.isMonster((roleData).monsterType,2)){
				this.removeNoMouseRoleAvatar(roleData.personId,roleData);
				return;
			}
		}
	}

	__proto.showNoMouseRoleAvatar=function(persionID,roleData){
		if(roleData.isDispose){
			return;
		}
		if(roleData.isInVisableArea){
			roleData.roleView.addToParent(this.mapModule.scene.mapAvatarContainer);
		}
	}

	// roleData.roleView.addAvatar();
	__proto.removeNoMouseRoleAvatar=function(persionID,roleData){
		if(roleData.isDispose){
			return;
		}
		roleData.roleView.removeFromToParent();
	}

	// roleData.roleView.removeAvatar(true);
	__proto.showRoleAvatar=function(persionID,roleData){
		if(roleData.isDispose){
			return;
		}
		roleData.roleView.addAvatar();
	}

	__proto.removeRoleAvatar=function(persionID,roleData){
		if(roleData.isDispose){
			return;
		}
		roleData.roleView.removeAvatar();
	}

	__proto.makePlayer=function(roleData,action,direction,needWear){
		(action===void 0)&& (action="1");
		(direction===void 0)&& (direction=4);
		(needWear===void 0)&& (needWear=true);
		this.checkAvatarShowHide(roleData);
		if(App.mapData){
			this.setRoleNodeAplha(roleData,App.mapData.getNodeByXY(roleData.map_x,roleData.map_y));
		}
		if(((roleData instanceof com.logic.data.role.MapFightRoleData ))&& (roleData).isDead){
			roleData.roleView.changeDirAction("11",3,false,true,-1);
			}else {
			if(((roleData instanceof com.logic.data.role.MapNpcRoleData ))&& (EnumNpcId.isWajue(((roleData).npcModelId))|| (roleData).npcModelBean.q_energy_type==54)){
				roleData.roleView.changeDirAction("11",3,false,true,-1);
				}else{
				roleData.roleView.changeDirAction(action,direction);
			}
		}
		roleData.roleView.x=roleData.map_x;
		roleData.roleView.y=roleData.map_y;
		if(needWear){
			roleData.roleView.wearZhenfa();
		}
	}

	/**
	*获得国战据点NPC
	*@param centerX
	*@param centerY
	*@return
	*
	*/
	__proto.getQizhiNpc=function(){
		var charData=App.role;
		var npcData;
		var values=this._npcHash.values;
		var role;
		for(var $each_role in values){
			role=values[$each_role];
			if(role.nation !=charData.nation && role.npcModelBean.q_stronghold==1){
				if(LookVisibleScreenAreaUtils.isInVisiBleAreaByNode(role.nodex,role.nodey)){
					npcData=role;
					break ;
				}
			}
		}
		return npcData;
	}

	/**获得国战物资NPC*/
	__proto.getWuziNpc=function(){
		var npcData;
		var values=this._npcHash.values;
		var role;
		for(var $each_role in values){
			role=values[$each_role];
			if(role.npcModelBean.q_stronghold !=1 && role.npcModelBean.q_collecttime > 0){
				if(LookVisibleScreenAreaUtils.isInVisiBleAreaByNode(role.nodex,role.nodey)){
					npcData=role;
					break ;
				}
			}
		}
		return npcData;
	}

	// }
	__proto.getPlayerShortestDistance=function(centerX,centerY,pool,checkEnemy){
		(checkEnemy===void 0)&& (checkEnemy=false);
		if(pool==null){
			pool=this._playerHash.values;
		};
		var minGrid=0;
		var distanceGrid=0;
		var target;
		var roleData;
		for(var $each_roleData in pool){
			roleData=pool[$each_roleData];
			if(roleData.isDead || roleData.hp==0){
				continue ;
			}
			if(checkEnemy && !this.isEnemy(roleData)){
				continue ;
			}
			if(this.isSameGroup(roleData,App.role)){
				continue ;
			}
			distanceGrid=MapVO.getDistanceBy2Point(centerX,centerY,roleData.map_x,roleData.map_y);
			if(minGrid==0 || distanceGrid < minGrid){
				minGrid=distanceGrid;
				target=roleData;
			}
		}
		return target;
	}

	/**
	*获取中心点内属于半径内得， 最近的怪物对象
	*@param centerX
	*@param centerY
	*@return
	*/
	__proto.getMonsterShortestDistance=function(centerX,centerY,monsterModelId,splusPersonid,searchAll,onlyBazhu){
		(monsterModelId===void 0)&& (monsterModelId=0);
		(searchAll===void 0)&& (searchAll=false);
		(onlyBazhu===void 0)&& (onlyBazhu=false);
		var values=this._monsterHash.values;
		if(values.length <=0){
			return null;
		};
		var ary=[];
		var bossArray=[];
		var bazhuArray=[];
		var role=App.role;
		var isCommon=false,isElite=false,isBoss=false,isBazhu=false,isDebug=GameConfig.isDebug;
		var monster;
		for(var $each_monster in values){
			monster=values[$each_monster];
			if(monster.isDead || monster.hp <=0){
				if(isDebug){
					console.log("怪物筛选：已死亡 -> isDead："+monster.isDead+", hp："+monster.hp);
				}
				continue ;
			}
			if(this.isSameGroup(monster,role)){
				if(isDebug){
					console.log("怪物筛选：同阵营 -> monsterModelId："+monster.monsterModelId);
				}
				continue ;
			}
			if(GlobalControl.isInNationMap && role.mapId !=10019 && monster.nation==role.nation){
				if(isDebug){
					console.log("怪物筛选：连服地图同国家 -> monsterModelId："+monster.monsterModelId);
				}
				continue ;
			}
			if(monster.monsterModelId==12000001 && monster.campGroupType==role.showGroup){
				continue ;
			}
			if(this.isDeadMonster(monster.personId,monster.nodex,monster.nodey)){
				console.log("怪物筛选：假死怪 -> monsterModelId："+monster.monsterModelId+" ,id："+monster.personId);
				continue ;
			}
			isCommon=EnumMonsterType.isMonster(monster.monsterType,2);
			isElite=EnumMonsterType.isElite(monster.monsterType);
			isBazhu=EnumMonsterType.isMonster(monster.monsterType,16);
			isBoss=EnumMonsterType.isBoss(monster.monsterType)|| EnumMonsterType.isPkBoss(monster.monsterType);
			if(isCommon || isElite || isBazhu || isBoss){
				var bool=true;
				if(monsterModelId > 0 && monsterModelId !=monster.monsterModelId){
					bool=false;
				}
				else if(splusPersonid && splusPersonid[monster.personId] > 5){
					bool=false;
				}
				if(bool){
					var xDis=Math.abs(Math.ceil(monster.map_x / MapConfig.MAP_NODE_WIDTH)-Math.ceil(centerX / MapConfig.MAP_NODE_WIDTH));
					var yDis=Math.abs(Math.ceil(monster.map_y / MapConfig.MAP_NODE_HEIGHT)-Math.ceil(centerY / MapConfig.MAP_NODE_HEIGHT));
					var distanceGrid=xDis > yDis ? xDis :yDis;
					monster.dtc=distanceGrid;
					ary.push(monster);
					if(isBazhu){
						bazhuArray.push(monster);
					}
					if(isBoss){
						bossArray.push(monster);
					}
				}
			}
		};
		var monsterData;
		if(onlyBazhu){
			if(bazhuArray.length > 1){
				bazhuArray.sort(SortTools.sortFunc(["dtc"],[16]));
			}
			monsterData=bazhuArray[0];
		}
		else if(ary.length==1){
			monsterData=ary[0];
		}
		else if(bazhuArray.length > 0){
			if(bazhuArray.length > 1){
				bazhuArray.sort(SortTools.sortFunc(["dtc"],[16]));
			}
			monsterData=bazhuArray[0];
		}
		else if(bossArray.length > 0){
			if(bossArray.length > 1){
				bossArray.sort(SortTools.sortFunc(["dtc"],[16]));
			}
			monsterData=bossArray[0];
		}
		else if(ary.length > 1){
			ary.sort(SortTools.sortFunc(["dtc"],[16]));
			monsterData=ary[0];
		}
		return monsterData;
	}

	// }
	__proto.setRoleNodeAplha=function(roleData,node,nodex,nodey){
		(nodex===void 0)&& (nodex=0);
		(nodey===void 0)&& (nodey=0);
		if(roleData){
			if(node==null && App.mapData){
				node=App.mapData.getNode(nodex,nodey);
			}
			if(node){
				roleData.roleView.alpha=node.isMask ? GlobalCenter.MASK_ALPHA :1;
			}
		}
	}

	/**
	*是否在同一个阵营
	*@param a 对方
	*@param b 自己
	*@return
	*
	*/
	__proto.isSameGroup=function(a,b){
		if(a==null || b==null){
			return true;
		}
		if(a.group < 0 || b.group < 0){
			return a.group==b.group;
		}
		if((a.group & 0x20)==0x20){
			return true;
		}
		if((a.group & b.group)==0){
			return false;
		}
		return a.group==b.group;
	}

	/**
	*是否是敌方目标
	*@param dataOrId MapFightRoleData 或者 id
	*@return
	*
	*/
	__proto.isEnemy=function(dataOrId){
		var data=dataOrId;
		if((typeof dataOrId=='string')){
			data=this.getFightRoleData(dataOrId);
		}
		if(data){
			var me=App.role;
			if((data instanceof com.logic.data.role.MapMonsterRoleData )){
				return !this.isSameGroup(data,me);
			}
			else{
				var playerData;
				if((data instanceof com.logic.data.role.MapPetRoleData )){
					if((data).isCanAttack==false){
						return false;
					}
					playerData=this.getPlayerOrCharacterData((data).ownerId);
					}else{
					playerData=ClassUtils.asTo(data,MapPlayerRoleData);
				};
				var bool=false;
				switch(me.pkModel){
					case 1:{
							bool=false;
							break ;
						}
					case 2:{
							bool=(playerData ? Boolean(playerData.teamId !=me.teamId):Boolean(data.teamId !=me.teamId));
							break ;
						}
					case 3:{
							if(playerData){
								bool=!GuildCenter.isGuildSame(playerData.guildId,me.guildId);
								}else{
								bool=!GuildCenter.isGuildSame(data.guildId,me.guildId);
							}
							break ;
						}
					case 4:{
							if(playerData && (playerData.pkState==PkModelCenter.GRAY || playerData.pkState==PkModelCenter.RED))
								bool=true;
							break ;
						}
					case 5:{
							bool=true;
							break ;
						}
					case 6:{
							if(GlobalControl.isInkuafu || FuzhanCenter.isBenfu){
								bool=(playerData ? Boolean(playerData.serverid !=me.serverid):Boolean(data.serverid !=me.serverid));
							}
							else{
								bool=(playerData ? Boolean(playerData.nation !=me.nation):Boolean(data.nation !=me.nation));
							}
							break ;
						}
					case 7:{
							bool=(playerData ? !this.isSameGroup(playerData,me):!this.isSameGroup(data,me));
							break ;
						}
					case 8:{
							if(playerData !=null){
								if(GuildCenter.isGuildSame(playerData.guildId,me.guildId)){
									bool=false;
									}else{
									bool=!GuildCenter.isAlliance(playerData.guildId);
								}
								}else{
								if(GuildCenter.isGuildSame(data.guildId,me.guildId)){
									bool=false;
									}else{
									bool=!GuildCenter.isAlliance(data.guildId);
								}
							}
						}
					}
				return bool;
			}
		}
		return false;
	}

	/**
	*
	*@param type 0所有，1怪物，2玩家 3怪+q_energy_type==5的npc
	*@param isAttack 是否只选择可攻击
	*@return
	*
	*/
	__proto.getFightRoleDataList=function(type,isAttack){
		(type===void 0)&& (type=0);
		(isAttack===void 0)&& (isAttack=false);
		if(type==1){
			return this._monsterHash.values;
		}
		else{
			var infos,arr;
			if(type==3){
				arr=[];
				infos=this._npcHash.values;
				var npc;
				for(var $each_npc in infos){
					npc=infos[$each_npc];
					if(npc.npcModelBean.q_energy_type==5){
						arr.push(npc);
					}
				}
				return arr.concat(this._monsterHash.values);
			}
			else{
				infos=this._playerHash.values;
				if(isAttack){
					arr=[];
					for(var i=0;i < infos.length;i++){
						if(this.isEnemy(infos[i])){
							arr.push(infos[i]);
						}
					}
					infos=arr;
				}
				if(type==0){
					return infos.concat(this._monsterHash.values);
					}else if(type==2){
					return infos;
				}
			}
		}
		return null;
	}

	/**
	*创建主角
	*@param roleData
	*
	*/
	__proto.createCharacter=function(roleData,createView){
		App.role=roleData;
		this._character=ClassUtils.asTo(roleData.roleView,Character);
		if(createView){
			this.makePlayer(roleData,"1",roleData.dir,false);
		}
	}

	__proto.getAllRoles=function(){
		return this._playerHash.values.concat(this._monsterHash.values).concat(this._petHash.values).concat(this._npcHash.values);
	}

	__proto.getRoleAndMonster=function(){
		return this._playerHash.values.concat(this._monsterHash.values);
	}

	__proto.changeDebugMode=function(){
		this.debugChangeRole(this._playerHash);
		this.debugChangeRole(this._monsterHash);
		this.debugChangeRole(this._petHash);
		this.debugChangeRole(this._npcHash);
		this.character.roleData.name=this.character.roleData.name;
		this.character.changeGreenPointState();
	}

	__proto.debugChangeRole=function(hash){
		var values=hash.values;
		var role;
		for(var $each_role in values){
			role=values[$each_role];
			role.name=role.name;
			role.roleView.changeGreenPointState();
		}
	}

	__proto.disposeHash=function(hash){
		var values=hash.values;
		var role;
		for(var $each_role in values){
			role=values[$each_role];
			role.dispose();
		}
		hash.clear();
	}

	__proto.clear=function(){
		this.disposeHash(this._playerHash);
		this.disposeHash(this._monsterHash);
		this.disposeHash(this._npcHash);
		this.disposeHash(this._petHash);
		this.disposeHash(this._fenshenHash);
		if(this._character){
			this._character.clear();
		}
		if(this._nodeBlockHash){
			this._nodeBlockHash.clear();
		}
	}

	__proto.petTalk=function(bean,type,clearCache){
		(type===void 0)&& (type=1);
		(clearCache===void 0)&& (clearCache=true);
		if(clearCache){
			this._petTalk={};
		};
		var bool=true;
		if(bean){
			if(bean.q_condition){
				var obj=JSON.parse(bean.q_condition);
				arr=obj["joined_actid"];
				if(arr){
					for(var i=0;i < arr.length;i++){
						var data=ActivityCenter.getData(arr[i]);
						if(!data || data.playerStates !=0){
							bool=false;
							break ;
						}
					}
				}
				if(bool){
					arr=obj["actid"];
					if(arr){
						bool=false;
						for(i=0;i < arr.length;i++){
							data=ActivityCenter.getData(arr[i]);
							if(data && data.activityStates==1 && data.playerStates !=0){
								bool=true;
								break ;
							}
						}
					}
				}
			}
		}
		if(bool){
			if(bean){
				this.showMarsTalk(bean.q_say_content,bean.q_panel);
			}
			}else{
			if(bean){
				this._petTalk[bean.q_id]=true;
			}
			bean=null;
			var arr=App.dataMgr.q_sayContainer.getArr(type);
			if(arr){
				bean=arr[myparseInt(Math.random()*arr.length)];
				while(bean){
					if(Boolean(this._petTalk[bean.q_id])){
						bean=arr[myparseInt(Math.random()*arr.length)];
						}else{
						break ;
					}
				}
			}
			if(bean){
				this.petTalk(bean,type,false);
			}
		}
	}

	__proto.addDeadMonster=function(id,nodex,nodey){
		var m=this._deadDict[id];
		if(!m){
			m=new DeadMonster();
			m.id=id;
			m.nodex=nodex;
			m.nodey=nodey;
			this._deadDict[id]=m;
			this._deadCount++;
		}
	}

	__proto.isDeadMonster=function(id,nodex,nodey){
		var m=this._deadDict[id];
		if(m){
			if(m.nodex==nodex && m.nodey==nodey){
				return true;
			}
			this._deadDict[id]=null;
			delete this._deadDict[id];
			this._deadCount--;
		}
		return false;
	}

	__proto.clearDeadMonster=function(){
		if(this._deadCount > 0){
			this._deadCount=0;
			this._deadDict={};
		}
	}

	__getset(0,__proto,'character',function(){
		return this._character;
	});

	__getset(0,__proto,'npcHash',function(){
		return this._npcHash;
	});

	__getset(0,__proto,'playerHash',function(){
		return this._playerHash;
	});

	/**
	*当前屏幕内显示的玩家数量
	*@return
	*
	*/
	__getset(0,__proto,'crtVisRoleNum',function(){
		return this._crtVisRoleNum;
	});

	__getset(0,__proto,'petHash',function(){
		return this._petHash;
	});

	__getset(0,__proto,'fenshenHash',function(){
		return this._fenshenHash;
	});

	__getset(0,__proto,'monsterHash',function(){
		return this._monsterHash;
	});

	MapAvatarModel.isSameCountry=function(a,b){
		if(a==null || b==null){
			return true;
		}
		if((a.group & 0x20)==0x20){
			return true;
		}
		if(!a.nation || !b.nation){
			return false;
		}
		return a.nation==b.nation;
	}

	__static(MapAvatarModel,
	['_hideData',function(){return this._hideData=new MapRoleShowHideData();}
	]);
	MapAvatarModel.__init$=function(){
		//class DeadMonster
		DeadMonster=(function(){
			function DeadMonster(){
				this.id=null;
				this.nodex=0;
				this.nodey=0;
			}
			__class(DeadMonster,'');
			return DeadMonster;
		})()
	}

	return MapAvatarModel;
})()