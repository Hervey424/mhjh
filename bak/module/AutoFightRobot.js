var AutoFightRobot = (function () {
  function AutoFightRobot(mapModule, autoUse) {
    /**
     *自动攻击间隔
     */
    this.attackGap = 0;
    this._killTime = 0;
    this._deadMonsterCheckTime = 0;
    this._isTaskEndCheckDrop = false;
    this._isMonsterKillCheckDrop = false;
    this._lastPickItemID = '';
    this._startHookPoint = null;
    this._pickItemList = [];
    this._pickItemLastList = [];
    this._setup = null;
    this._me = null;
    this._mapModule = null;
    this._autoUse = null;
    this._attackTarget = null;
    this._dropItemBackDict = null;
    this._canChooseTargetList = null;
    this._attackTargetModelID = 0;
    this._attackTargetFunc = null;
    this._always = false;
    this._selectSkillId = 0;
    this._testTime = 0;
    this._lastX = 0;
    this._lastY = 0;
    this._lastTime = 0;
    this._hasNextGroup = false;
    this._dropNextCount = 0;
    // }
    this._lastAtkTime = 0;
    this._seachMonsterId = 0;
    // Laya.workerTimer.clear(this,clearSeachingBoss);
    this._seachHandler = null;
    this._index = 0;
    /**q_map表q_boss */
    this._q_boss = null;
    this._points = null;
    this._nextPoint = null;
    /**true为往后找，false为往前找 */
    this._bool = false;
    /**
     *打死一个怪， 人物动作完毕，触发 onCharacterActionListEmpty 里的 runNextAction-> nextMove-> moveToNextRefreshMonsterPoint-> gotoNext
     *此时_nextPoint还是上次的_nextPoint（这也是打完怪还会朝怪死的地方跑几步的原因），如果触发特戒传送就是错误的坐标，所以需要判断寻路点有没有改变
     *
     */
    this._chuansongTime = 0;
    this._mapModule = mapModule;
    this._autoUse = autoUse;
    this._setup = SetupCenter.instance;
  }

  __class(AutoFightRobot, 'com.modules.map.model.auto.AutoFightRobot');
  var __proto = AutoFightRobot.prototype;
  __proto.setAttackTargetModelID = function (id, func, always) {
    this._attackTargetModelID = id;
    this._attackTargetFunc = func;
    this._always = always;
  };

  __proto.resetSkill = function () {
    this._selectSkillId = 0;
  };

  __proto.resetStartHookPoint = function () {
    if (this._me) {
      if (!this._startHookPoint) {
        this._startHookPoint = new Point(this._me.move_to_x, this._me.move_to_y);
      } else {
        this._startHookPoint.setTo(this._me.move_to_x, this._me.move_to_y);
      }
    }
  };

  __proto.setSelectTarget = function (target, changeSkillTarget) {
    changeSkillTarget === void 0 && (changeSkillTarget = true);
    this._attackTarget = target;
    if (changeSkillTarget) {
      this._mapModule.mapSkillModel.setSelectTarget(target);
    }
  };

  __proto.startAuto = function (target) {
    this._killTime = 0;
    this._lastAtkTime = 0;
    this._dropNextCount = 0;
    this._hasNextGroup = false;
    ShiquCenter.clearGroup();
    AutoGameRobot.isSeachingBoss = false;
    this._me = App.role;
    this._isMonsterKillCheckDrop = false;
    this._pickItemList.length = 0;
    this._pickItemLastList.length = 0;
    this.resetStartHookPoint();
    this._dropItemBackDict = {};
    this._canChooseTargetList = {};
    this._deadMonsterCheckTime = 0;
    this._mapModule.mapAvatarModel.clearDeadMonster();
    EventMgr.add(this, 'PE.role_dead', this.onRoleOrDead);
    EventMgr.add(this, 'ET.character_action_list_empty', this.onCharacterActionListEmpty);
    EventMgr.add(this, 'ET.ADD_DROP_ITEM', this.onAddDropItem);
    EventMgr.add(this, 'ET.select_monster', this.onSelectMonster);
    if (target) {
      this.roleState = 'role_fight';
      this.setSelectTarget(target);
    } else {
      this.roleState = 'role_wait';
      if (this._mapModule.mapItemModel.hasDropItem()) {
        this.setSelectTarget(null);
        this._mapModule.mapSkillModel.clearAuto();
        this._mapModule.mapSkillModel.clear(false);
      }
    }
    Laya.workerTimer.loop(1000, this, this.checkNextAction);
    if (this._me.actionList.length == 0 && this._me.actionList.crtAction == null) {
      this.runNextAction();
    } else {
      this._me.actionList.clearList();
    }
    EventMgr.dispatch('ET.auto_fight_start');
  };

  __proto.endAuto = function () {
    this.roleState = 'end';
    this._killTime = 0;
    this._lastAtkTime = 0;
    this._dropNextCount = 0;
    this._hasNextGroup = false;
    ShiquCenter.clearGroup();
    this.clearSeachingBoss();
    this.clearDelayByKilled();
    this._isTaskEndCheckDrop = false;
    Laya.workerTimer.clear(this, this.runNextAction);
    Laya.workerTimer.clear(this, this.checkNextAction);
    Laya.workerTimer.clear(this, this.useSkillToTarget);
    this._dropItemBackDict = null;
    this._pickItemList.length = 0;
    this._pickItemLastList.length = 0;
    this._canChooseTargetList = null;
    EventMgr.remove(this, 'PE.role_dead', this.onRoleOrDead);
    EventMgr.remove(this, 'ET.character_action_list_empty', this.onCharacterActionListEmpty);
    EventMgr.remove(this, 'ET.ADD_DROP_ITEM', this.onAddDropItem);
    EventMgr.remove(this, 'ET.select_monster', this.onSelectMonster);
    this._deadMonsterCheckTime = 0;
    this._mapModule.mapAvatarModel.clearDeadMonster();
    App.mapModule.mapMoveModel.clearSearchRoad();
    EventMgr.dispatch('ET.auto_fight_end');
  };

  __proto.checkNextAction = function () {
    if (this._me.isGather) {
      return;
    }
    this._deadMonsterCheckTime++;
    if (this._deadMonsterCheckTime >= 60) {
      this._deadMonsterCheckTime = 0;
      this._mapModule.mapAvatarModel.clearDeadMonster();
    }
    this.onSafeCheck();
    for (var obj in this._dropItemBackDict) {
      var time = myparseInt(this._dropItemBackDict[obj]);
      time -= 1000;
      if (time <= 0) {
        delete this._dropItemBackDict[obj];
      } else {
        this._dropItemBackDict[obj] = time;
      }
    }
    if (this.roleState == 'role_wait') {
      this.runNextAction();
    } else if (this.roleState == 'role_fight') {
      if (this.isLive(this._attackTarget)) {
        this.attackRole(this._attackTarget);
      } else {
        this.setSelectTarget(null);
        this.runNextAction();
      }
    }
    if (this._me.stopTime >= 6000) {
      if (this._pickItemList != null && this._pickItemList.length > 0) {
        this.dropItem(true);
      } else {
        this.dropItemEnd();
      }
    }
  };

  //不要一直是拾取物品状态，导致不动。
  __proto.endAutoFightAndCheckItem = function (force) {
    force === void 0 && (force = false);
    if (this.roleState == 'role_goto_monster') {
      this.reset = true;
    }
    if (force || this.roleState != 'role_pick_item') {
      this._isTaskEndCheckDrop = true;
    }
  };

  __proto.onCharacterActionListEmpty = function () {
    if (this._me.isGather) {
      return;
    }
    var bool = false;
    if (this.roleState == 'role_reset') {
      if (!GlobalControl.isAutoFight) {
        return;
      }
      var target = this._mapModule.mapSkillModel.selectFightTarget;
      if (!this.isLive(target)) {
        if (this.checkHasDropItem()) {
          return;
        }
      }
      target = this.checkFanji();
      if (!target) {
        target = this._mapModule.mapSkillModel.selectFightTarget;
      }
      this.resetStartHookPoint();
      if (target == null) {
        target = this.getAttackMonster();
        if (this.isLive(target)) {
          this._mapModule.mapSkillModel.setSelectTarget(target);
        }
      }
      if (target == null) {
        bool = true;
      }
    }
    if (!GlobalControl.isAutoFight) {
      return;
    }
    if (this.roleState != 'role_pick_item' && this.roleState != 'role_goto_monster' && this.roleState != 'role_move') {
      this.roleState = 'role_wait';
      this.runNextAction(bool);
    }
  };

  // Laya.workerTimer.frameOnce(2,this,runNextAction,["onCharacterActionListEmpty",bool]);
  __proto.getCanTaskUpItemList = function () {
    var dropItemHash = this._mapModule.mapItemModel.dropItemHash;
    var array = [];
    if (dropItemHash && dropItemHash.size > 0) {
      array = this.getCanTaskUpItemListByHashMap(dropItemHash);
    }
    return array;
  };

  /**
   *获得一组可以捡取的物品
   *@param dropItemHash
   *@return
   *
   */
  __proto.getCanTaskUpItemListByHashMap = function (dropItemHash) {
    var array = [];
    var values = dropItemHash.values;
    var item;
    for (var $each_item in values) {
      item = values[$each_item];
      if (this.itemIsCanTakeUp(item)) {
        array.push(item);
      }
    }
    return array;
  };

  // }
  __proto.checkHasDropItem = function (reset, dispatchFinish) {
    reset === void 0 && (reset = false);
    dispatchFinish === void 0 && (dispatchFinish = false);
    if (this._isMonsterKillCheckDrop) {
      this.clearDelayByKilled();
    }
    if (this.roleState == 'role_pick_box') {
      return false;
    }
    if (this.roleState == 'role_pick_item' && reset == false) {
      return true;
    }
    var array = this.getCanTaskUpItemList();
    var leng = array.length;
    if (leng > 0) {
      array = this.getFullPickList(array);
      leng = array.length;
      if (leng > 0) {
        this.startDropItem(array, true, 'checkHasDropItem');
      }
    } else {
      if (dispatchFinish) {
        this.onDropFinishHandler();
      }
    }
    return leng > 0 ? true : false;
  };

  __proto.getFullPickList = function (list) {
    var isBagFull = BagItemCenter.isFull();
    var isTempFull = BagItemCenter.isTempFull();
    var temp = [];
    var item;
    var leng = list.length;
    for (var i = 0; i < leng; i++) {
      item = list[i];
      if (item.q_drop_type == 15) {
        temp.push(item);
      } else {
        if (Q_globalCenter.isTempItem(item.itemId) && !isTempFull) {
          temp.push(item);
        } else {
          var bagType = EnumContainer.getContainerTypeByItemId(item.itemId);
          if (bagType == 1) {
            if (!isBagFull) {
              temp.push(item);
            }
          } else {
            if (!BagOtherItemCenter.isFull(bagType)) {
              temp.push(item);
            }
          }
        }
      }
    }
    list = temp;
    if (isBagFull && list.length >= 1) {
      GameNotice.showBottomMessage('您的背包已满，请及时清理背包');
    }
    return list;
  };

  /**
   *选中怪取消当前的拾取，执行打怪逻辑
   *@param info
   *
   */
  __proto.onSelectMonster = function (info) {
    if (this.roleState == 'role_pick_item' || this.roleState == 'role_pick_box') {
      var target = this._mapModule.mapSkillModel.selectFightTarget;
      if (this.isLive(target)) {
        this._mapModule.mapMoveModel.clearSearchRoad();
        this.setSelectTarget(target, false);
        this.attackRole(target);
        return;
      }
    }
  };

  /**
   *执行下一步的行为
   *@param from
   *@param pickItem
   *
   */
  __proto.runNextAction = function (pickItem) {
    pickItem === void 0 && (pickItem = true);
    if (this._me.enterMap == false) {
      return;
    }
    if (this._me.isGather) {
      return;
    }
    if (this._isTaskEndCheckDrop) {
      if (this.checkHasDropItem() == false) {
        this._isTaskEndCheckDrop = false;
        this._mapModule.autoFightRobot.end(true, 'runNextAction:任务结束检测');
        return;
      }
    }
    if (GlobalControl.isAutoFight) {
      this._autoUse.useBuffSkill();
      if (this.roleState != 'role_usebuffer') {
        this._autoUse.useZhaohuanSkill();
      }
    }
    var npc;
    if (SetupCenter.instance.autoWajue) {
      var tempNpc = App.mapModule.mapAvatarModel.getShiti();
      if (tempNpc) {
        var wajueCount = GatherCenter.getWajueCount(tempNpc.personId);
        if (SetupCenter.instance.wajueCount > wajueCount) {
          var dropprob = App.dataMgr.q_monster_dropprob.getDataBean(tempNpc.dropId, false);
          if (dropprob && dropprob.q_open_cost) {
            var obj = JSON.parse(dropprob.q_open_cost)[0];
            var has = BagItemCenter.getItemCount(obj['id']);
            if (has >= obj['num']) {
              npc = tempNpc;
            } else if (SetupCenter.instance.autoBuyWajue) {
              if (ConditionUtil.isItemEnoughObject(obj, false, false, true)) {
                npc = tempNpc;
              }
            }
          }
        }
      }
    }
    if (npc) {
      var p = new Point(npc.map_x, npc.map_y);
      var npcNode = App.mapData.getNodeByXY(p.x, p.y);
      var distanceGrid = MapVO.getDistanceBy2Point(this._me.move_to_x, this._me.move_to_y, p.x, p.y);
      if (distanceGrid > npc.npcModelBean.q_Interactive) {
        var vo = new SearchToPointVO();
        vo.px = p.x;
        vo.py = p.y;
        vo.type = 'runNextAction';
        vo.finishHandler = Handler.create(this, TaskCommandSender.sendC2S_NpcServicesMessage);
        vo.finishParam = [npc.personId];
        vo.shift = 1;
        var list = this._mapModule.mapMoveModel.searchRoadByAstar(vo);
        if (list && list.length > 0) {
          this._mapModule.mapAvatarModel.character.roleData.actionList.resetActionList(list);
        }
      } else {
        TaskCommandSender.sendC2S_NpcServicesMessage(npc.personId);
      }
      return;
    }
    var target;
    if (AutoGameRobot.forceAttackTargetID) {
      var role = App.mapModule.mapAvatarModel.getRoleData(AutoGameRobot.forceAttackTargetID);
      if (this.isLive(role)) {
        target = role;
        this.setSelectTarget(target);
      }
      AutoGameRobot.forceAttackTargetID = null;
    }
    if (AutoGameRobot.forceAttackTargetModelId > 0) {
      role = App.mapModule.mapAvatarModel.getMonsterByModelId(AutoGameRobot.forceAttackTargetModelId);
      if (this.isLive(role)) {
        target = role;
        this.setSelectTarget(target);
      }
      AutoGameRobot.forceAttackTargetModelId = 0;
    }
    target = this._mapModule.mapSkillModel.selectFightTarget;
    if (target != null) {
      if (this.isLive(target)) {
        this.setSelectTarget(target, false);
        this.attackRole(target);
        return;
      }
    }
    if (this._isMonsterKillCheckDrop) {
      this._isMonsterKillCheckDrop = false;
      if (this.checkHasDropItem()) {
        return;
      }
    }
    if (pickItem) {
      this._hasNextGroup = false;
      if (this.checkHasDropItem()) {
        return;
      }
    }
    if (this.roleState != 'role_call_baby' && this.roleState != 'role_usebuffer') {
      if (this._isMonsterKillCheckDrop) {
        return;
      }
      if (this.roleState != 'role_pick_item') {
        if (!AutoGameRobot.forceFullMapHook && EnumSetup.getValue(1007) == 2 && (this.roleState == 'role_wait' || this.roleState == 'role_reset') && !this.isLive(this._attackTarget)) {
          target = this.getAttackMonster(false);
          if (this.isLive(target)) {
            this.setSelectTarget(target);
            this.attackRole(target);
          } else {
            if (this._startHookPoint.x != this._me.map_x || this._startHookPoint.y != this._me.map_y) {
              distanceGrid = MapVO.getDistanceBy2Point(this._startHookPoint.x, this._startHookPoint.y, this._me.map_x, this._me.map_y);
              if (distanceGrid > EnumSetup.getValue(1009)) {
                if (this.roleState != 'role_move') {
                  this.roleState = 'role_move';
                  if (this.moveToPostion(this._startHookPoint.x, this._startHookPoint.y, null, GameHandler.create(this, this.onMoveToFinishHandler1), 0) == null) {
                    this.roleState = 'role_wait';
                  }
                }
              }
            }
          }
          return;
        }
        target = this.checkFanji();
        if (target == null) {
          target = this._mapModule.mapSkillModel.selectFightTarget;
        }
        if (this.isLive(target) && this._me != null) {
          if (this._mapModule.mapAvatarModel.isSameGroup(target, this._me)) {
            target = null;
          }
        }
        if (target != null && !LookVisibleScreenAreaUtils.isInVisiBleAreaByNode(target.nodex, target.nodey)) {
          target = null;
        }
        if (!this.isLive(target)) {
          target = this.getAttackMonster(false);
        }
        if (this.isLive(target)) {
          this.setSelectTarget(target);
          this.attackRole(target);
        } else {
          if (pickItem == false || this.checkHasDropItem() == false) {
            if (this.isAllMapHook) {
              if (this.roleState != 'role_goto_monster') {
                this.roleState = 'role_goto_monster';
              }
            } else {
              target = this.getAttackMonster(true);
              if (this.isLive(target)) {
                this.setSelectTarget(target);
                this.attackRole(target);
              } else {
                if (this._attackTargetModelID && this._attackTargetFunc != null) {
                  if (!this._attackTargetFunc.runWith(this._attackTargetModelID)) {
                    target = this._mapModule.mapAvatarModel.getMonsterShortestDistance(this._me.map_x, this._me.map_y, 0, this._canChooseTargetList, true);
                    if (this.isLive(target)) {
                      this.setSelectTarget(target);
                      this.attackRole(target);
                    } else {
                      this.nextMove();
                    }
                  }
                } else {
                  this.nextMove();
                }
              }
            }
          }
        }
      }
    }
  };

  __proto.onRoleOrDead = function (personId) {
    if (this._attackTarget && this._attackTarget.personId == personId) {
      this._killTime = getTimer();
      this.setSelectTarget(null);
    }
    if (this._attackTarget == null) {
      if (this.roleState == 'role_pick_item') {
      } else {
        if (this.checkHasDropItem()) {
          this._isMonsterKillCheckDrop = true;
          Laya.workerTimer.once(300, this, this.delayByKilled);
        }
      }
    }
  };

  // }
  __proto.delayByKilled = function () {
    this._isMonsterKillCheckDrop = false;
  };

  __proto.clearDelayByKilled = function () {
    this._isMonsterKillCheckDrop = false;
    Laya.workerTimer.clear(this, this.delayByKilled);
  };

  /*****************************拾取********************************/
  __proto.dropMapItemBySpace = function (item) {
    if (this.roleState == 'role_pick_item') {
      if (this._lastPickItemID != item.itemOnlyId) {
        if (this._pickItemList && this._pickItemList.length > 0) {
          var litem = this._mapModule.mapItemModel.getDropItem(this._lastPickItemID);
          if (litem) {
            this._pickItemList.unshift(litem);
          }
          this._pickItemList.unshift(item);
          this.startDropItem(this._pickItemList, false, 'dropMapItemBySpace1');
        } else {
          this.startDropItem([item], false, 'dropMapItemBySpace2');
        }
      }
    } else {
      this.startDropItem([item], false, 'dropMapItemBySpace3');
    }
  };

  /**
   *安全监测，打补丁
   *
   */
  __proto.onSafeCheck = function () {
    if (Laya.workerTimer.currTimer - this._lastTime >= 2000) {
      this._lastTime = Laya.workerTimer.currTimer;
      if (this._lastX == this._me.roleView.x && this._lastY == this._me.roleView.y) {
        var actionType = this._me.roleView.action;
        if (GameConfig.isDebug) {
          mytrace('自动战斗长期站在同一个坐标，当前挂机状态：' + this.roleState, '当前动作：' + actionType);
        }
        if (this.roleState == 'role_reset' || this.roleState == 'role_usebuffer') {
          mytrace('自动战斗长期状态为：' + this.roleState + '，强制改为：' + 'role_wait');
          this.roleState = 'role_wait';
          this.runNextAction();
          return;
        }
        if (actionType == '1' || AvatarActionType.isRunAction(actionType)) {
          var hasDropItem = this._mapModule.mapItemModel.hasDropItemByXY(this._lastX, this._lastY);
          if (hasDropItem) {
            mytrace('强制执行拾取物品');
            this._mapModule.mapItemModel.checkCanDropItem(this._lastX, this._lastY);
            return;
          } else {
            if (this._pickItemList != null && this._pickItemList.length > 0) {
              mytrace('脚下没东西尝试拾取下一个道具，拾取列表长度：' + this._pickItemList.length);
              this.dropItem(true);
              return;
            } else {
              var action = App.role.actionList.crtAction;
              if (action instanceof com.game.core.action.MoveAction) {
                if (action.isDispose) {
                  App.role.actionList.setCurActionNull();
                }
              }
              mytrace('没有物品可拾取，强制执行下一步，_isSeachingBoss：' + AutoGameRobot.isSeachingBoss);
              if (actionType == '1') {
                this.clearSeachingBoss();
              }
              this.checkNextAction();
            }
          }
        }
      } else {
        this._lastX = this._me.roleView.x;
        this._lastY = this._me.roleView.y;
      }
    }
  };

  __proto.isInTakeDropItemList = function (item) {
    if (this._pickItemList && this._pickItemList.indexOf(item) != -1) {
      return true;
    }
    if (this._pickItemLastList && this._pickItemLastList.indexOf(item) != -1) {
      return true;
    }
    return false;
  };

  __proto.itemIsCanTakeUp = function (item) {
    if (item == null) {
      return false;
    }
    if (item.tryTakeCount >= 1) {
      return false;
    }
    if (this._dropItemBackDict && myparseInt(this._dropItemBackDict[item.itemOnlyId]) > 0) {
      return false;
    }
    if (ShiquCenter.getInstance().isMy(item) > 0) {
      return false;
    }
    var bool = true;
    var itemBean = App.dataMgr.q_itemContainer.getDataBean(item.itemId, false);
    if (itemBean != null && this._setup != null) {
      bool = ShiquCenter.getInstance().isPickup(item.itemId, item.count);
    }
    return bool;
  };

  /**
   *排序拾取物品
   *@param list
   *
   */
  __proto.startDropItem = function (list, sortBool, from) {
    this._pickItemLastList = [];
    this._pickItemList = list;
    this.dropItem(sortBool);
  };

  __proto.dropItem = function (sortBool, needClear) {
    needClear === void 0 && (needClear = true);
    if (this._pickItemList != null && this._pickItemList.length > 0) {
      if (needClear) {
        this._mapModule.mapSkillModel.clearAuto();
      }
      this.roleState = 'role_pick_item';
      var charx = this._me.move_to_x;
      var chary = this._me.move_to_y;
      var item;
      this._pickItemList = this.getFullPickList(this._pickItemList);
      var leng = this._pickItemList.length;
      if (leng >= 1) {
        if (sortBool && this._pickItemList.length > 1) {
          this._pickItemList = ShiquCenter.sortPickItemsByRole(this._pickItemList);
          if (leng != this._pickItemList.length) {
            if (GameConfig.isDebug) {
              mytrace('总拾取长度：' + leng + '，拾取组长度：' + this._pickItemList.length + '，意味着拾取完要进行下一组拾取');
            }
            this._hasNextGroup = true;
          } else {
            this._hasNextGroup = false;
          }
        }
        item = this._pickItemList.shift();
        this._pickItemLastList.push(item);
        this._lastPickItemID = item.itemOnlyId;
        if (item.x == charx && item.y == chary) {
          return;
        }
        var node = App.mapData.getNode(item.nodex, item.nodey);
        if (node == null) {
          return;
        }
        if (this._mapModule.mapItemModel.dropItemHash.has(item.itemOnlyId) && node.walkAble == true && node.roleBlock == true) {
          var vo = new SearchToPointVO();
          vo.px = MapVO.getPixelPos(node, true);
          vo.py = MapVO.getPixelPos(node, false);
          vo.type = 'AutoFightRobot.dropItem';
          vo.max = 3;
          vo.isNearestPoint = false;
          vo.countMaxFinishHandler = GameHandler.create(this, this.onSearchToDropItemFailHandler);
          vo.countMaxFinishParam = [vo, item.itemOnlyId];
          var list = this._mapModule.mapMoveModel.searchRoadByAstar(vo, false, true);
          if (list && list.length > 0) {
            this._me.actionList.resetActionList(list);
          } else {
            this.dropItem(false, false);
          }
        } else {
          this.dropItem(false, false);
        }
      } else {
        if (GameConfig.isDebug) {
          mytrace('背包已满且无货币拾取，不用进行下一组拾取了');
        }
        this._hasNextGroup = false;
        this.dropItemEnd();
      }
    } else {
      if (GameConfig.isDebug) {
        mytrace('当前组拾取完' + (this._hasNextGroup ? '，进行下一组拾取' : ''));
      }
      if (this._hasNextGroup && this._dropNextCount < 10) {
        this._dropNextCount++;
        this._hasNextGroup = false;
        if (!this.checkHasDropItem(true)) {
          this.dropItemEnd();
        }
      } else {
        this._dropNextCount = 0;
        this._hasNextGroup = false;
        this.dropItemEnd();
      }
    }
  };

  __proto.onDropFinishHandler = function () {
    EventMgr.dispatch('ET.PICK_ALL_END');
  };

  __proto.onSearchToDropItemFailHandler = function (vo, itemOnlyId) {
    if (this._dropItemBackDict) {
      if (this._mapModule.mapItemModel.getDropItem(itemOnlyId)) {
        this._dropItemBackDict[itemOnlyId] = 15000;
      }
    }
    if (this._me != null) {
      this.dropItem(false);
    }
  };

  __proto.dropItemEnd = function () {
    this._pickItemLastList.length = 0;
    if (this._isTaskEndCheckDrop) {
      this._isTaskEndCheckDrop = false;
    }
    this.roleState = 'role_wait';
    if (this._me.actionList.length == 0 && this._me.actionList.crtAction == null) {
      this.runNextAction(false);
    }
    this.onDropFinishHandler();
    MengchongTakeUpItemAI.getInstance().execute();
  };

  __proto.onAddDropItem = function (group) {
    if (this._me.isGather) {
      return;
    }
    var target = this._mapModule.mapSkillModel.selectFightTarget;
    if (!this.isLive(target)) {
      if (this._isMonsterKillCheckDrop) {
        this.clearDelayByKilled();
      }
      if (this.roleState == 'role_pick_item') {
        this._hasNextGroup = true;
      } else {
        var arr = this.getCanTaskUpItemList();
        var leng = arr.length;
        if (leng > 0) {
          var curGroup = ShiquCenter.group;
          if (curGroup && curGroup == group) {
            this.startDropItem(arr, true, 'onAddDropItem1');
          } else {
            ShiquCenter.clearGroup();
            this.startDropItem(arr, true, 'onAddDropItem2');
          }
        }
      }
    }
  };

  // }
  __proto.deleteDropItem = function (item) {
    if (this._pickItemList && this._pickItemList.length > 0) {
      var leng = this._pickItemList.length;
      for (var i = leng - 1; i >= 0; i--) {
        if (item == this._pickItemList[i]) {
          this._pickItemList.splice(i, 1);
        }
      }
    }
    if (this._dropItemBackDict[item.itemOnlyId]) {
      delete this._dropItemBackDict[item.itemOnlyId];
    }
    if (this.roleState == 'role_pick_item') {
      if (this._lastPickItemID == item.itemOnlyId) {
        this._lastPickItemID = '';
        this.delayDropItem();
      } else {
        if (this._pickItemList.length == 0) {
          this.dropItem(true);
        }
      }
    }
  };

  __proto.delayDropItem = function () {
    if (this.roleState == 'role_pick_item') {
      this._lastPickItemID = '';
      this.dropItem(false);
    }
  };

  /******************************下面是战斗动作************************************/
  __proto.chooseNewTarget = function (personId) {
    var count = this._canChooseTargetList[personId];
    count++;
    this._canChooseTargetList[personId] = count;
  };

  __proto.attackRole = function (target) {
    if (this.isLive(target)) {
      if (!this._me || !this._me.isBuffCanUseSkill()) {
        return;
      }
      var newtime = Laya.workerTimer.currTimer;
      var spacing = newtime - this._lastAtkTime;
      if (spacing >= this.attackGap) {
        this._lastAtkTime = newtime;
        this.useSkillToTarget(this.getSkillId(target), target, true);
      } else {
        Laya.workerTimer.once(this.attackGap - spacing + 10, this, this.runNextAction, [false]);
      }
    }
  };

  __proto.useSkillToTarget = function (skillId, target, bool) {
    if (skillId > 0) {
      if (this.isLive(target)) {
        if (!this._me || !this._me.isBuffCanUseSkill()) {
          return;
        }
        var t = CDCenter.getSkillCDLeftTime(skillId);
        if (t <= 0) {
          if (GlobalCenter.selectMonsterId == target.personId) {
            GlobalCenter.selectAttackInc++;
            if (GlobalCenter.selectAttackInc >= 30) {
              GlobalCenter.selectAttackInc = 0;
              if (GlobalCenter.selectMonsterHp == target.hp && GlobalCenter.selectMonsterNodeX == target.nodex && GlobalCenter.selectMonsterNodeY == target.nodey) {
                this._mapModule.mapAvatarModel.addDeadMonster(target.personId, target.nodex, target.nodey);
                this._mapModule.mapSkillModel.clearSelectTarget();
                this.runNextAction();
                return;
              }
            }
          }
          if (this._mapModule.mapSkillModel.onUseHookSkill(skillId, 1)) {
            this._canChooseTargetList = {};
          }
          this.roleState = 'role_fight';
          return;
        } else {
          if (bool) {
            Laya.workerTimer.once(t + 1, this, this.useSkillToTarget, [skillId, target, false]);
          }
        }
      }
    }
  };

  /**
   *选择技能
   *@return
   *
   */
  __proto.getSkillId = function (target) {
    this._selectSkillId = SkillSelect.getSkill(target);
    this.changeShortcutSkillId(this._selectSkillId);
    return this._selectSkillId;
  };

  __proto.changeShortcutSkillId = function (skillId) {
    EventMgr.dispatch('ET.AUTO_SKILL_CHANGE', skillId);
  };

  __proto.getSkillBean = function (skillid) {
    var skillData = SkillCenter.getSkill(skillid);
    var skillLevel = skillData ? skillData.skillLevel : 1;
    return SkillCenter.getSkillBean(skillid, skillLevel);
  };

  __proto.checkFanji = function () {
    var data;
    var map = App.role.mapBean;
    if (map.q_auto_fight_player == 1) {
      if (AttackerListCenter.getAttackers() > 0) {
        data = this._mapModule.mapAvatarModel.getPlayerShortestDistance(this._startHookPoint.x, this._startHookPoint.y, AttackerListCenter.dict);
        if (data != null) {
          PkModelCenter.changePkModel(data);
          return data;
        }
      }
    }
    return null;
  };

  __proto.seachMonsterComplete = function () {
    var target = this._mapModule.mapAvatarModel.getMonsterByModelId(this._seachMonsterId);
    if (this.isLive(target)) {
      this._lastAtkTime = 0;
      this.setSelectTarget(target);
      this.attackRole(target);
    }
    this.clearSeachingBoss();
  };

  __proto.clearSeachingBoss = function () {
    if (AutoGameRobot.isSeachingBoss) {
      AutoGameRobot.isSeachingBoss = false;
    }
  };

  __proto.getAttackMonster = function (searchAll, splusPersonDict) {
    searchAll === void 0 && (searchAll = true);
    if (this.isAllMapHook) {
      return null;
    }
    if (SkillCenter.getPassSkill(20512) == null) {
      var delay = true;
      var zone = ZoneCenter.getZoneBean();
      if (zone) {
        var arr = Q_globalCenter.getJsonData(15087);
        if (arr && arr.indexOf(zone.q_zone_client_type) != -1) {
          delay = false;
        }
      }
      if (delay && SkillCenter.getPassSkill(20512) == null) {
        var t = getTimer();
        if (t - this._killTime <= 200) {
          mytrace('寻怪距杀死小于200ms，不执行寻怪，防止掉落延迟导致不拾取');
          return null;
        }
      }
    }
    var data;
    var map = App.role.mapBean;
    if (map.q_auto_fight_player == 2) {
      data = this._mapModule.mapAvatarModel.getPlayerShortestDistance(this._startHookPoint.x, this._startHookPoint.y, null, true);
      if (this.isLive(data)) {
        PkModelCenter.changePkModel(data);
        return data;
      }
    }
    data = this.checkFanji();
    if (this.isLive(data)) {
      return data;
    }
    if (map.q_boss_list > 0) {
      if (AutoFightBossCenter.getInstance().getArr(map.q_map_id)) {
        if (!AutoGameRobot.isSeachingBoss) {
          var boss = AutoFightBossCenter.getInstance().getAttackBoss(map.q_map_id);
          if (boss) {
            this._seachMonsterId = boss.monsterModelId;
            if (!this._seachHandler) {
              this._seachHandler = GameHandler.create(this, this.seachMonsterComplete);
            }
            App.mapModule.mapMoveModel.walkToMap(map.q_map_id, boss.birthX, boss.birthY, false, this._seachHandler, 0, false, false, false);
            AutoGameRobot.isSeachingBoss = true;
            return null;
          }
        } else {
          return null;
        }
      }
    }
    var range = EnumSetup.getValue(1007);
    if (AutoGameRobot.forceFullMapHook) {
      range = 3;
    } else {
      var zoneType = ZoneCenter.getZoneClientType();
      if (zoneType == 54 || zoneType == 55 || zoneType == 89 || EnumZoneClientType.isCailiaoZone(ZoneCenter.zoneId)) {
        range = 3;
      }
    }
    splusPersonDict = this._canChooseTargetList;
    var isOnlyAttackBazhu = NeiGuaFight.isRuning && !NeiGuaFight.isAttackCommonMonster;
    switch (range) {
      case 1: {
        break;
      }
      case 2: {
        data = this._mapModule.mapAvatarModel.getMonsterShortestDistance(this._me.map_x, this._me.map_y, this._attackTargetModelID, splusPersonDict, false, isOnlyAttackBazhu);
        if (!this._always) {
          this._attackTargetModelID = 0;
        }
        break;
      }
      case 3: {
        data = this._mapModule.mapAvatarModel.getMonsterShortestDistance(this._me.map_x, this._me.map_y, this._attackTargetModelID, splusPersonDict, searchAll, isOnlyAttackBazhu);
        if (!this._always) {
          this._attackTargetModelID = 0;
        }
        break;
      }
    }
    return data;
  };

  __proto.nextMove = function () {
    if (AutoGameRobot.isSeachingBoss) {
      return;
    }
    this.roleState = 'role_wait';
    var type = EnumSetup.getValue(1007);
    if (AutoGameRobot.forceFullMapHook) {
      type = 3;
    }
    var q_map = App.dataMgr.q_mapContainer.getDataBean(this._me.mapId, false);
    if (q_map != null && !q_map.q_hang_up) {
      type = 2;
    }
    switch (type) {
      case 1: {
        break;
      }
      case 2: {
        if (this._startHookPoint.x != this._me.map_x || this._startHookPoint.y != this._me.map_y) {
          var distanceGrid = MapVO.getDistanceBy2Point(this._startHookPoint.x, this._startHookPoint.y, this._me.map_x, this._me.map_y);
          if (distanceGrid > EnumSetup.getValue(1009)) {
            if (this.moveToPostion(this._startHookPoint.x, this._startHookPoint.y, null, GameHandler.create(this, this.onMoveToFinishHandler1), 0) == null) {
              this.roleState = 'role_wait';
            }
          }
        } else {
          Laya.workerTimer.once(1000, this, this.runNextAction);
        }
        break;
      }
      case 3: {
        this.moveToNextRefreshMonsterPoint();
        break;
      }
    }
  };

  __proto.clearHookPoint = function () {
    this._index = 0;
    this._q_boss = null;
    this._nextPoint = null;
    this._chuansongTime = 0;
    if (this._points == null) {
      this._points = [];
    } else {
      this._points.length = 0;
    }
  };

  /**
   *去下个刷怪点
   *
   */
  __proto.moveToNextRefreshMonsterPoint = function () {
    var i = 0,
      dtc = 0,
      isSeachNext = false;
    var q_map = App.dataMgr.q_mapContainer.getDataBean(this._me.mapId, false);
    if (this._points == null || this._points.length == 0) {
      this._bool = true;
      this.clearHookPoint();
      if (q_map != null) {
        var xy = q_map.q_hang_up;
        if (NeiGuaFight.isRuning && !NeiGuaFight.isAttackCommonMonster) {
          xy = q_map.q_hang_xy;
          Log.logInfo('当前地图巡航点 q_hang_xy：' + xy);
        } else {
          Log.logInfo('当前地图刷怪点 q_hang_up：' + xy);
        }
        var arr = xy.split('|');
        for (i = 0; i < arr.length; i++) {
          var brr = arr[i].split('_');
          var xpos = myparseInt(brr[0]);
          var ypos = myparseInt(brr[1]);
          this._points.push({ x: xpos, y: ypos, dtc: Math.abs(xpos - this._me.nodex) + Math.abs(ypos - this._me.nodey) });
        }
        if (this._points.length > 0 && (NeiGuaFight.isRuning || q_map.q_guaji_parol != 2)) {
          dtc = 9999999;
          for (i = 0; i < this._points.length; i++) {
            if (dtc > this._points[i]['dtc']) {
              this._index = i;
              dtc = this._points[i]['dtc'];
            }
          }
        }
      } else {
        if (!GameConfig.isRelease) {
          GameNotice.showBottomMessage('地图（ID:' + this._me.mapId + '）全屏挂机没有配置挂机点（Q_map表字段q_hang_up）');
        }
      }
    } else {
      isSeachNext = true;
    }
    if (isSeachNext) {
      if (this._nextPoint == null) {
        this.updateNextIndex();
      }
    }
    if (this._index >= 0 && this._index <= this._points.length - 1) {
      if (NeiGuaFight.isRuning) {
        if (NeiGuaFight.isAttackCommonMonster) {
          this._nextPoint = this._points[this._index];
        } else {
          i = this.getLiveBossIndex(this._index, q_map.q_guaji_parol);
          if (i != -1) {
            this._nextPoint = this._points[i];
          }
        }
      } else {
        if (q_map.q_guaji_parol == 0) {
          this._nextPoint = this._points[this._index];
        } else if (q_map.q_guaji_parol == 1 || q_map.q_guaji_parol == 2) {
          i = this.getLiveBossIndex(this._index, q_map.q_guaji_parol);
          if (i != -1) {
            this._nextPoint = this._points[i];
          }
        }
      }
    }
    this.gotoNext();
  };

  __proto.getLiveBossIndex = function (index, q_guaji_parol) {
    var bossArr = BossDataCenter.instance.getBossListByMapId(this._me.mapId, false, false);
    if (q_guaji_parol == 2) {
      var isAllDead = true;
      var boss;
      for (var $each_boss in bossArr) {
        boss = bossArr[$each_boss];
        if (boss.remainTime <= 0) {
          isAllDead = false;
          break;
        }
      }
      if (isAllDead) {
        return 0;
      }
    }
    if (this._bool) {
      for (var i = index; i < this._points.length; i++) {
        if (this.isBossLive(this._points[i], bossArr)) {
          return i;
        }
      }
      for (i = index - 2; i >= 0; i--) {
        if (this.isBossLive(this._points[i], bossArr)) {
          return i;
        }
      }
    } else {
      for (i = index; i >= 0; i--) {
        if (this.isBossLive(this._points[i], bossArr)) {
          return i;
        }
      }
      for (i = index + 2; i < this._points.length; i++) {
        if (this.isBossLive(this._points[i], bossArr)) {
          return i;
        }
      }
    }
    return -1;
  };

  __proto.isBossLive = function (p, bossArr) {
    var boss;
    for (var $each_boss in bossArr) {
      boss = bossArr[$each_boss];
      if (boss.remainTime <= 0 && boss.birthX == p.x && boss.birthY == p.y) {
        return true;
      }
    }
    return false;
  };

  __proto.updateNextIndex = function () {
    if (this._bool) {
      if (this._index >= this._points.length - 1) {
        this._bool = false;
        this._index--;
      } else {
        this._index++;
      }
    } else {
      if (this._index <= 0) {
        this._bool = true;
        this._index++;
      } else {
        this._index--;
      }
    }
  };

  __proto.gotoNext = function () {
    if (this._nextPoint != null) {
      console.log('前往下一个刷怪点：' + this._nextPoint.x, this._nextPoint.y);
      if (this._nextPoint.x != this._me.nodex || this._nextPoint.y != this._me.nodey) {
        var p = MapVO.getCenterPoint(this._nextPoint.x, this._nextPoint.y);
        if (p != null) {
          var moveList = this.moveToPostion(p.x, p.y, GameHandler.create(this, this.onMoveProgress), GameHandler.create(this, this.onMoveFinish), 0);
          if (moveList) {
            this._chuansongTime = getTimer();
            var action = App.role.actionList.crtAction;
            if (action instanceof com.game.core.action.FightAction) {
              if (action.isDispose) {
                App.role.actionList.setCurActionNull();
              }
            }
            this.roleState = 'role_reset';
            return;
          }
        }
      }
      this.onMoveFinish();
      Laya.workerTimer.once(1000, this, this.runNextAction);
    } else {
      Laya.workerTimer.once(1000, this, this.runNextAction);
    }
  };

  __proto.onMoveProgress = function () {
    if (GlobalControl.isAutoFight && this.checkHasDropItem() == false) {
      this.resetStartHookPoint();
      if (this.useTejie()) {
        return;
      }
      var target = this.getAttackMonster();
      this.setSelectTarget(target);
      this.attackRole(target);
    }
  };

  __proto.useTejie = function () {
    if (!this._nextPoint || !NeiGuaFight.isRuning || NeiGuaFight.isAttackCommonMonster) {
      return false;
    }
    var now = getTimer();
    if (this._chuansongTime > 0 && now - this._chuansongTime < 1000) {
      return false;
    }
    this._chuansongTime = now;
    var skill = SkillCenter.getPassSkill(7601);
    if (skill) {
      if (!skill.isInCD()) {
        if (ItemUseManager.isMapCanUse(101017001, false)) {
          console.log('内挂特戒传送：' + this._nextPoint.x + ',' + this._nextPoint.y);
          TransferManager.sendTransmint(App.role.mapId, this._nextPoint.x, this._nextPoint.y, 17, false, 1);
          return true;
        }
      }
    }
    return false;
  };

  __proto.onMoveFinish = function () {
    this._chuansongTime = 0;
    this._nextPoint = null;
  };

  __proto.moveToPostion = function (tx, ty, handler, finishHandler, shift) {
    shift === void 0 && (shift = 2);
    var vo = new SearchToPointVO();
    vo.px = tx;
    vo.py = ty;
    vo.type = 'AutoFightRobot.moveToPostion';
    vo.handler = handler;
    vo.finishHandler = finishHandler;
    vo.shift = shift;
    var list = this._mapModule.mapMoveModel.searchRoadByAstar(vo);
    if (list && list.length > 0) {
      this._me.actionList.resetActionList(list);
      return list;
    }
    return null;
  };

  __proto.onMoveToFinishHandler1 = function () {
    this.roleState = 'role_wait';
  };

  // }
  __proto.isLive = function (target) {
    if (target == null || target.isDead || target.isDispose || target.hp <= 0) {
      return false;
    }
    if (target instanceof com.logic.data.role.MapMonsterRoleData) {
      if (target.monsterModelBean == null) {
        return false;
      }
    }
    return true;
  };

  /**
   *不拾取物品补丁。有的时候服务器卡了，导致物品掉落返回延迟（比如500~1000毫秒后才返回），这时候人物刚好已经去做主线（自动寻路过程中）或者寻路杀其它怪中。
   */
  __proto.checkPickMyItems = function () {
    if (!GlobalControl.isAutoFight) {
      var arr = this.getCanTaskUpItemList();
      if (arr.length > 0) {
        this._mapModule.autoFightRobot.start();
        this.startDropItem(arr, true);
        return true;
      }
    }
    return false;
  };

  /**
   *是否全图选择挂机（ZoneBOssCityInfo上的勾选，不是设置里的）
   */
  __getset(0, __proto, 'isAllMapHook', function () {
    return false;
  });

  __getset(
    0,
    __proto,
    'roleState',
    function () {
      return AutoGameRobot.roleState;
    },
    function (value) {
      AutoGameRobot.roleState = value;
    }
  );

  // logTrace("当前状态："+value,AutoGameRobot.roleState);
  __getset(0, __proto, 'reset', null, function (value) {
    if (value == true) {
      this.roleState = 'role_reset';
      Laya.workerTimer.clear(this, this.runNextAction);
    }
  });

  AutoFightRobot.dashMonster = null;
  return AutoFightRobot;
})();
