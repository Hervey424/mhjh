var MapFightModel=(function(){
	function MapFightModel(mapModule){
		this._mapModule=null;
		this._groundMagicHash=null;
		this._groundMagicHash2=null;
		this._mapModule=mapModule;
		this.initialize();
	}

	__class(MapFightModel,'com.modules.map.model.MapFightModel');
	var __proto=MapFightModel.prototype;
	__proto.initialize=function(){
		this._groundMagicHash={};
		this._groundMagicHash2={};
		EventMgr.add(this,"ET.debug_mode_change",this.onDebugChange);
	}

	__proto.onDebugChange=function(){
		var effect;
		if(this._groundMagicHash !=null){
			var $each_effect;
			for($each_effect in this._groundMagicHash){
				effect=this._groundMagicHash[$each_effect];
				if(effect !=null){
					effect.updateName();
				}
			}
		}
		if(this._groundMagicHash2 !=null){
			var $each_effect;
			for($each_effect in this._groundMagicHash2){
				effect=this._groundMagicHash2[$each_effect];
				if(effect !=null){
					effect.updateName();
				}
			}
		}
	}

	/**
	*增加一个地面魔法
	*@param magicid 魔法唯一魔法
	*@param skillid 技能ID
	*@param skillLevel 技能等级
	*@param px
	*@param py
	*
	*/
	__proto.addGroundMagic=function(magicId,skillId,skillLevel,px,py,calx,caly,magicInfo){
		this.removeGroundMagic(magicId);
		var skillBean=SkillCenter.getSkillBean(skillId,skillLevel);
		if(skillBean.q_series_effect_is_only==1 && (calx !=0 || caly !=0)){
			return;
		};
		var effect;
		if(skillBean.q_series_effect){
			effect=MapGroundEffect.getEffect();
			effect.url=ResPathUtil.getSkillEffect(skillBean.q_File_client,skillBean.q_series_effect);
			effect.setTo(px,py);
			effect.play();
			effect.addParent(App.mapModule.scene.mapGroundMagicContainer);
			this._groundMagicHash[magicId]=effect;
			SkillCenter.addSceneSkill(magicId,0,px,py);
		}
		if(skillBean.q_series_effect2){
			effect=MapGroundEffect.getEffect();
			effect.url=ResPathUtil.getSkillEffect(skillBean.q_File_client,skillBean.q_series_effect2);
			effect.setTo(px,py);
			effect.play();
			effect.addParent(App.mapModule.scene.mapFlyMagicContainer);
			this._groundMagicHash2[magicId]=effect;
		}
	}

	/**
	*移除一个地面魔法
	*@param magicid
	*
	*/
	__proto.removeGroundMagic=function(magicId){
		var effect=this._groundMagicHash[magicId];
		if(effect !=null){
			this._groundMagicHash[magicId]=null;
			delete this._groundMagicHash[magicId];
			effect.dispose();
			SkillCenter.removeSceneSkill(magicId);
		}
		effect=this._groundMagicHash2[magicId];
		if(effect !=null){
			this._groundMagicHash2[magicId]=null;
			delete this._groundMagicHash2[magicId];
			effect.dispose();
		}
	}

	/**
	*显示战斗结果
	*@param cmd
	*
	*/
	__proto.showFightResult=function(cmd){
		if(App.role==null){
			return;
		};
		var isStageShow=!Laya.stage.isHide();
		var fighterId;
		var result;
		var targetRoleData;
		var attackerId=cmd.sourceId.toString();
		var attacker=this._mapModule.mapAvatarModel.getFightRoleData(attackerId);
		var isAttackerMe=attackerId==App.role.personId;
		if(isStageShow){
			result=cmd.attackResult;
			if(result !=null){
				fighterId=result.fighterId.toString();
				targetRoleData=this._mapModule.mapAvatarModel.getFightRoleData(fighterId);
				if(targetRoleData !=null){
					this.playFightNumber(result.fightResultJz.toNumber(),result.damagehp.toNumber(),targetRoleData,attackerId,cmd.job,cmd.playerId,true);
					if(fighterId==App.role.personId){
						var addhp=result.addhp.toNumber();
						if(addhp > 0){
							var num=FightNumber.getFightNumber();
							num.showAddHp3(addhp);
							targetRoleData.roleView.delayShowBloodWord(num);
						}
					}
				}
			}
		};
		var damageHp=0;
		var resultType=0;
		var leng=cmd.fightRetList.length;
		for(var i=0;i < leng;i++){
			var fightResoult=ClassUtils.asTo(cmd.fightRetList[i],FightResultInfo);
			for(var j=0;j < fightResoult.attackRetList.length;j++){
				result=fightResoult.attackRetList[j];
				fighterId=result.fighterId.toString();
				targetRoleData=this._mapModule.mapAvatarModel.getFightRoleData(fighterId);
				if(targetRoleData !=null){
					damageHp=result.damagehp.toNumber()+result.backdamage.toNumber();
					targetRoleData.setCrtHp(result.curhp.toNumber(),false);
					targetRoleData.setCrtMp(result.curmp,false);
					if(isStageShow){
						resultType=result.fightResultJz.toNumber();
						this.playFightNumber(resultType,damageHp,targetRoleData,attackerId,cmd.job,cmd.playerId,false,false,fightResoult.skillId);
						if(result.shouhuvalue > 0){
							this.playFightNumber(resultType,result.shouhuvalue,targetRoleData,attackerId,cmd.job,cmd.playerId,false,true);
						}
					}
					targetRoleData.refreshCurrentHp();
					targetRoleData.refreshCurrentMp();
					if(isAttackerMe){
						if(fightResoult.skillId > 0 && fightResoult.skillLevel > 0){
							if((targetRoleData instanceof com.logic.data.role.MapMonsterRoleData )){
								if(isStageShow){
									var skill=SkillCenter.getSkillBean(fightResoult.skillId,fightResoult.skillLevel);
									if(skill !=null){
										if(skill.q_monster_hit_effect){
											if(!App.showHideData.hide_skillEffect){
												targetRoleData.roleView.showEffect(ResPathUtil.getSkillEffect2(skill.q_monster_hit_effect),0,-0.5 *targetRoleData.roleView.modelHeight,null,true,App.mapScene.mapFlyMagicContainer);
											}
										}
									}
								}
								if(result.curhp.toNumber()<=0){
									targetRoleData.deadSkillId=fightResoult.skillId *1000+fightResoult.skillLevel;
								}
								else{
									if(isStageShow){
										(targetRoleData).playShoujiVoice();
										var dir=SceneType.getDretion(targetRoleData.map_x,targetRoleData.map_y,attacker.map_x,attacker.map_y);
										(targetRoleData.roleView).playShoujiAction(dir);
									}
								}
								if((targetRoleData).monsterModelBean.q_boss_title_type > 0){
									(targetRoleData).roleView.removeEffect(2);
								}
							}
							else if((targetRoleData instanceof com.logic.data.role.MapPlayerRoleData )){
								if(EnumSetup.isGou(30)&& !Browser.onPC){
									App.setSimpleMode(true);
								}
							}
						}
					}
					// 有人打我
					else if(fighterId==App.role.personId){
						if(attacker !=null){
							if((attacker instanceof com.logic.data.role.MapMonsterRoleData )){
								App.role.startAutoFight();
							}
							else if((attacker instanceof com.logic.data.role.MapPlayerRoleData )){
								if(!EnumZoneClientType.isInYanwuChang()){
									if(!isAttackerMe){
										if(!attacker.bufferManager.hasBufferBy_action_type(18)){
											AttackerListCenter.add(attacker);
										}
									}
								}
							}
						}
					}
					else if(((targetRoleData instanceof com.logic.data.role.MapMonsterRoleData ))&& (targetRoleData).isEscort && (targetRoleData).creatorId==App.role.personId){
						AttackerListCenter.add(attacker);
						PanelManager.openByClass(EscortAttackPrompt);
					}
				}
			}
		}
	}

	__proto.getDire=function(attacker,target){
		var dire=0;
		if(attacker !=null && target !=null){
			if(attacker.map_x < target.map_x){
				if(attacker.map_y < target.map_y){
					dire=3;
					}else{
					dire=1;
				}
				}else{
				if(attacker.map_y < target.map_y){
					dire=5;
					}else{
					dire=7;
				}
			}
		}
		return dire;
	}

	__proto.playFightNumber=function(result,value,target,attackPersonId,job,ownerId,isFanshang,isRingShouhu,skillId,$parent){
		(job===void 0)&& (job=0);
		(isFanshang===void 0)&& (isFanshang=false);
		(isRingShouhu===void 0)&& (isRingShouhu=false);
		(skillId===void 0)&& (skillId=0);
		var isAttackMe=false,isTargetMe=false,myId=App.role.personId,hideOther=EnumSetup.isGou(36);
		var attacker=this._mapModule.mapAvatarModel.getFightRoleData(attackPersonId);
		if(attacker){
			if(attackPersonId==myId || attacker.ownerId==myId){
				isAttackMe=true;
			}
		}
		isTargetMe=target.personId==myId || target.ownerId==myId;
		if(!isAttackMe && !isTargetMe){
			return null;
		}
		if(hideOther){
			if(isFanshang){
				return null;
			}
			if(attackPersonId !=myId && target.personId !=myId){
				return null;
			}
		};
		var dire=0;
		if(attacker){
			dire=this.getDire(attacker,target);
		};
		var num;
		if(result==-1){
			num=FightNumber.showAddHp(value,isTargetMe);
		}
		else if(result==-2){
			num=FightNumber.showAddExp(value);
		}
		else if(result==-13){
		}
		else if(result==-14){
			num=FightNumber.showFontAndNum(value,dire,"chaojiqiege","fight_8",160,51,60);
		}
		else if(result==-16){
			num=FightNumber.showFontAndNum(value,dire,"font_zhulong","font_heji_num",101,62,51);
		}
		else if(result==-26){
			num=FightNumber.showFontAndNum(value,dire,"font_beiling","font_beiling",197,50,41);
		}
		else if(result==-29){
			num=FightNumber.showAddHp(value,false);
		}
		else if(result==-30){
			num=FightNumber.getFightNumber();
			num.showBuffHurt(result *-1,value,null,'');
		}
		else if(result==-39){
			num=FightNumber.getFightNumber();
			num.showShenjiangHurt(value,1,true);
		}
		else if(result==-40 || result==-41 || result==-43 || result==-44){
			num=FightNumber.getFightNumber();
			num.showSpecialAttack(result,value);
		}
		else if(result==-45){
			num=FightNumber.getFightNumber();
			num.showZuoQiHurt(value,1,2);
		}
		else if(result==-48){
			this.playCommonFightNumber(result,value,target,attackPersonId,job,true);
		}
		else if(result==-49){
			num=FightNumber.showFontAndNum(value,dire,"tnjl","fight_8",170,47,60);
		}
		else if(result==-50){
			num=FightNumber.showFontAndNum(value,dire,"miaosha","fight_12",94,60,60);
		}
		else if(result==-53){
			num=FightNumber.getFightNumber();
			num.showShenhunHurt(0,value,dire,result,true);
		}
		else if(result==-54){
			num=FightNumber.getFightNumber();
			num.showShenhunHurt(999,value,dire,result);
		}
		else if(result==-56){
			num=FightNumber.getFightNumber();
			num.showFont("zuji2",72,34,14);
		}
		else if(result==-57){
			if(attacker){
				num=FightNumber.getFightNumber();
				num.showFont("wanjianguizong",260,58,14);
				attacker.roleView.delayShowBloodWord(num);
				return num;
			}
			return null;
		}
		else if(skillId==93105){
			num=FightNumber.getFightNumber();
			num.showZuoQiHurt(value,1,1);
		}
		else if(result < 0 && result !=-3 && result !=-42 && result !=-47 && result !=-51){
			num=FightNumber.getFightNumber();
			num.showBuffHurt(result *-1,value);
		}
		else if(ByteUtils.hasKey(result,524288)){
			num=FightNumber.showRing(5);
		}
		else{
			var hide_FightNumber=App.showHideData.hide_FightNumber;
			attacker=this._mapModule.mapAvatarModel.getFightRoleData(attackPersonId);
			if(attacker==null && ownerId !=null){
				if(!hide_FightNumber || ownerId.toString()==myId){
					attacker=this._mapModule.mapAvatarModel.getFightRoleData(ownerId.toString());
					if(attacker !=null){
						dire=this.getDire(attacker,target);
						num=FightNumber.getFightNumber();
						num.showShenhunHurt(1,value,dire,result);
					}
				}
			}
			else{
				if(target !=null){
					if(attacker !=null){
						dire=this.getDire(attacker,target);
					}
					if(result > 0){
						if(ByteUtils.hasKey(result,4096)){
							num=FightNumber.showFontAndNum(value,dire,"chaojiqiege","fight_8",160,51,60);
							num.parentCtn=$parent;
							target.roleView.delayShowBloodWord(num);
							return num;
						}
						if(ByteUtils.hasKey(result,131072)){
							num=FightNumber.showFontAndNum(value,dire,"chaojiqiege","fight_8",160,51,60);
							num.parentCtn=$parent;
							target.roleView.delayShowBloodWord(num);
							return num;
						}
						if(ByteUtils.hasKey(result,8388608)){
							num=FightNumber.showFontAndNum(value,dire,"font_heji",null,214,95);
							num.parentCtn=$parent;
							target.roleView.delayShowBloodWord(num);
							return num;
						}
						if(ByteUtils.hasKey(result,32)){
							if(ByteUtils.hasKey(result,4)){
								if(ByteUtils.hasKey(result,1073741824)){
									num=FightNumber.showFontAndNum(value,dire,"feishengzhimingbaoji","fight_12",430,60,60);
								}
								else{
									num=FightNumber.showFontAndNum(value,dire,"feishengbaoji","fight_20",288,60,60);
								}
							}
							else if(ByteUtils.hasKey(result,1073741824)){
								num=FightNumber.showFontAndNum(value,dire,"feishengzhiming","fight_13",340,60,60);
							}
							else{
								num=FightNumber.showFontAndNum(value,dire,"feisheng","fight_8",189,60,60);
							}
							num.parentCtn=$parent;
							target.roleView.delayShowBloodWord(num);
							return num;
						}
						if(ByteUtils.hasKey(result,1073741824)){
							if(ByteUtils.hasKey(result,4)){
								num=FightNumber.showFontAndNum(value,dire,"tg_4","fight_20",288,60,60,1);
							}
							else{
								num=FightNumber.showFontAndNum(value,dire,"tg_1","fight_17",189,60,60);
							}
							num.parentCtn=$parent;
							target.roleView.delayShowBloodWord(num);
							return num;
						}
						if(ByteUtils.hasKey(result,2147483648)){
							num=FightNumber.showFontAndNum(value,dire,"tg_2","fight_18",170,50,60);
							num.parentCtn=$parent;
							target.roleView.delayShowBloodWord(num);
							return num;
						}
						if(ByteUtils.hasKey(result,4294967296)){
							num=FightNumber.showFontAndNum(value,dire,"tg_3","fight_8",170,50,60);
							num.parentCtn=$parent;
							target.roleView.delayShowBloodWord(num);
							return num;
						}
						if(ByteUtils.hasKey(result,1024)){
							num=FightNumber.showRing(3,value,dire);
							num.parentCtn=$parent;
							target.roleView.delayShowBloodWord(num);
							return num;
						}
						if(ByteUtils.hasKey(result,2048)){
							return num;
						}
						if(isRingShouhu){
							num=FightNumber.showRing(4,value,dire);
							num.parentCtn=$parent;
							target.roleView.delayShowBloodWord(num);
							return num;
						}
						if(ByteUtils.hasKey(result,16)){
							num=FightNumber.getFightNumber();
							num.showFont("wudi",74,38,1);
							num.parentCtn=$parent;
							target.roleView.delayShowBloodWord(num);
							return num;
						}
					}
					num=this.playCommonFightNumber(result,value,target,attackPersonId,job,isFanshang);
				}
			}
		}
		if(num !=null){
			num.parentCtn=$parent;
			target.roleView.delayShowBloodWord(num);
		}
		return num;
	}

	__proto.playCommonFightNumber=function(result,value,target,attackPersonId,job,isFanshang){
		(job===void 0)&& (job=0);
		(isFanshang===void 0)&& (isFanshang=false);
		var num;
		var attacker=this._mapModule.mapAvatarModel.getFightRoleData(attackPersonId);
		if(attacker !=null){
			var isMeHurt=0;
			var dire=this.getDire(attacker,target);
			var myId=App.role.personId;
			var hide_FightNumber=App.showHideData.hide_FightNumber;
			if(((attacker instanceof com.logic.data.role.MapPlayerRoleData ))|| ((attacker instanceof com.logic.data.role.MapFenshenRoleData ))){
				if(attacker.personId==myId || attacker.ownerId==myId){
					if(isFanshang){
						num=FightNumber.showFanshang(true,value,dire);
					}
					else{
						num=FightNumber.showMyHurt(result,0,value,dire,(target instanceof com.logic.data.role.MapMonsterRoleData ),attacker.hasLianzhan);
					}
				}
				else if(target.personId==myId || target.ownerId==myId){
					if(isFanshang){
						num=FightNumber.showFanshang(false,value,dire);
					}
					else{
						num=FightNumber.showOtherHurt(result,0,job,value,dire,attacker.hasLianzhan);
					}
				}
				else if(!hide_FightNumber || (((target instanceof com.logic.data.role.MapMonsterRoleData ))&& (target).isEscort && (target).creatorId==myId)){
					if(isFanshang){
						num=FightNumber.showFanshang(false,value,dire);
					}
					else{
						num=FightNumber.showOtherHurt(result,1,job,value,dire,attacker.hasLianzhan);
					}
				}
			}
			else if((attacker instanceof com.logic.data.role.MapPetRoleData )){
				var pet=ClassUtils.asTo(attacker,MapPetRoleData);
				var hurtType=1;
				if(pet.petModelBean.q_pettype==13){
					hurtType=2;
					}else if(pet.petModelBean.q_pettype==14){
					hurtType=3;
				}
				if(pet.ownerId==myId){
					if(isFanshang){
						num=FightNumber.showFanshang(true,value,dire);
					}
					else if(pet.isMars || pet.isShenhun){
						num=FightNumber.getFightNumber();
						if(ByteUtils.hasKey(result,65536)){
							num.showBuffHurt(11,value);
						}
						else if(ByteUtils.hasKey(result,4194304)){
							num.showShenhunSibeiHurt(hurtType,value,dire);
						}
						else{
							num.showShenhunHurt(hurtType,value,dire,result);
						}
					}
					else if(pet.isShenjiang){
						num=FightNumber.getFightNumber();
						num.showShenjiangHurt(value,dire);
					}
					else{
						num=FightNumber.showMyHurt(result,pet.isMars ? 2 :1,value,dire,(target instanceof com.logic.data.role.MapMonsterRoleData ));
					}
				}
				else if(target.personId==myId){
					if(isFanshang){
						num=FightNumber.showFanshang(false,value,dire);
					}
					else{
						num=FightNumber.showOtherHurt(result,isMeHurt,pet.isMars ?-1 :0,value,dire);
					}
				}
				else if(!hide_FightNumber){
					if(isFanshang){
						num=FightNumber.showFanshang(false,value,dire);
					}
					else if(pet.isMars || pet.isShenhun){
						num=FightNumber.getFightNumber();
						num.showShenhunHurt(hurtType,value,dire,result);
					}
					else if(pet.isShenjiang){
						num=FightNumber.getFightNumber();
						num.showShenjiangHurt(value,dire);
					}
					else{
						isMeHurt=target.ownerId==myId ? 0 :1;
						num=FightNumber.showOtherHurt(result,isMeHurt,pet.isMars ?-1 :0,value,dire);
					}
				}
			}
			else if((attacker instanceof com.logic.data.role.MapMonsterRoleData )){
				if(target.personId==myId){
					num=FightNumber.showOtherHurt(result,isMeHurt,-1,value,dire);
				}
				else if(!hide_FightNumber){
					isMeHurt=target.ownerId==myId ? 0 :1;
					num=FightNumber.showOtherHurt(result,isMeHurt,-1,value,dire);
				}
			}
		}
		return num;
	}

	/**
	*清理
	*
	*/
	__proto.clear=function(){
		var effect;
		for(var $each_effect in this._groundMagicHash){
			effect=this._groundMagicHash[$each_effect];
			effect.dispose();
		}
		var $each_effect;
		for($each_effect in this._groundMagicHash2){
			effect=this._groundMagicHash2[$each_effect];
			effect.dispose();
		}
		this._groundMagicHash={};
		this._groundMagicHash2={};
	}

	__proto.dispose=function(){
		this.clear();
		this._mapModule=null;
		_super.prototype.dispose();
	}

	return MapFightModel;
})()