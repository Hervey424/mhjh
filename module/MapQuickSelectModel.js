var MapQuickSelectModel=(function(){
	function MapQuickSelectModel(mapModule){
		this._index=0;
		this._list=null;
		this._lastTime=0;
		this._mapModule=null;
		this._list=[];
		this._mapModule=mapModule;
	}

	__class(MapQuickSelectModel,'com.modules.map.model.MapQuickSelectModel');
	var __proto=MapQuickSelectModel.prototype;
	__proto.reset=function(){
		if(this._list.length !=0){
			this._index=0;
			this._list.length=0;
		}
	}

	/**
	*快速选择
	*@param type 0所有，1怪物，2玩家
	*@param isAttack 选中是否攻击
	*@return
	*
	*/
	__proto.quickSelect=function(type,isAttack,checkTime){
		(type===void 0)&& (type=0);
		(isAttack===void 0)&& (isAttack=false);
		(checkTime===void 0)&& (checkTime=true);
		var role=App.role;
		if(role==null){
			return null;
		};
		var data;
		var result;
		var time=App.timer.currTimer;
		if(!checkTime || (time-this._lastTime >=200)){
			this._lastTime=time;
			if(this._list.length==0){
				this._index=0;
				var crtx=role.move_to_x;
				var crty=role.move_to_y;
				var allRoleList=this._mapModule.mapAvatarModel.getFightRoleDataList(type,isAttack);
				var leng=allRoleList.length;
				for(var i=0;i < leng;i++){
					data=allRoleList[i];
					if(!data.isDead && !data.isDispose && data.hp > 0 && !data.bufferManager.hasBufferBy_action_type(18)){
						var wightValue=this.getWightValue(data,crtx,crty);
						if(wightValue > 0){
							this._list.push({wv:wightValue,data:data});
						}
					}
				}
				this._list.sort(SortTools.sortFunc(["wv"],[16|2]));
			}
			else{
				this._index++;
				if(this._index >=this._list.length){
					this._index=0;
				}
			};
			var current=this._mapModule.mapSkillModel.selectFightTarget;
			leng=this._list.length;
			for(i=this._index;i < leng;i++){
				data=this._list[i]["data"];
				if(data.isDead==false && data.isDispose==false && data.hp > 0 && data.isInVisableArea && data !=current){
					result=data;
					break ;
				}
			}
		}
		return result;
	}

	/**
	*计算权重值
	*@param data
	*@return
	*
	*/
	__proto.getWightValue=function(data,crtx,crty){
		var value=0;
		if(this._mapModule.mapAvatarModel.isEnemy(data)){
			var distanceGrid=MapVO.getDistanceBy2Point(crtx,crty,data.map_x,data.map_y);
			if(distanceGrid > 12)
				return value;
			if((data instanceof com.logic.data.role.MapPlayerRoleData )){
				switch((data).pkState){
					case PkModelCenter.RED:
						value=100000;
						break ;
					case PkModelCenter.GRAY:
						value=30000;
						break ;
					case PkModelCenter.YELLOW:
						value=10100;
						break ;
					case PkModelCenter.WHITE:
						value=10000;
						break ;
					}
			}
			else if((data instanceof com.logic.data.role.MapPetRoleData )){
				value=200;
			}
			else if((data instanceof com.logic.data.role.MapMonsterRoleData )){
				var bean=(data).monsterModelBean;
				if(EnumMonsterType.isMonster(bean.q_type,16)){
					value=9999;
				}
				else if(EnumMonsterType.isBoss(bean.q_type)){
					value=5000;
				}
				else if(EnumMonsterType.isElite(bean.q_type)){
					value=2000;
				}
				else {
					value=1;
				}
			}
			value+=(15-distanceGrid);
		}
		return value;
	}

	return MapQuickSelectModel;
})()