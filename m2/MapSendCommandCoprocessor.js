/***
 *
 *des:
 *by:guwanyuan(顾万圆)
 *2015-2-26 上午10:56:14
 ***/
//class com.modules.map.controller.MapSendCommandCoprocessor extends com.game.core.connect.GameServer
var MapSendCommandCoprocessor = (function (_super) {
  function MapSendCommandCoprocessor(module) {
    this._mapModule = null;
    this._loadFinishMsg = null;
    this._runMsg = null;
    // }
    this._attackMsg = null;
    // logInfo(str);
    this._autoTakeUpMsg = null;
    this._curMapId = 0;
    this._takeTimeDict = {};
    this._takeUpMsg = null;
    this._takeTimeGap1 = 0;
    this._takeTimeGap2 = 0;
    // item.flyMoney();
    this._autoStartMsg = null;
    this._autoEndMsg = null;
    this._petTakeUp = null;
    MapSendCommandCoprocessor.__super.call(this);
    this._mapModule = module;
  }

  __class(MapSendCommandCoprocessor, 'com.modules.map.controller.MapSendCommandCoprocessor', _super);
  var __proto = MapSendCommandCoprocessor.prototype;
  /**
   *进入游戏初始化地图完成的信息（只会上线登录发一次，之后切换地图发的是C2S_LoadFinishForChangeMapMessage）
   *@param width
   *@param height
   *
   */
  __proto.sendLoadMapFinishMessage = function (width, height) {
    width === void 0 && (width = 0);
    height === void 0 && (height = 0);
    console.log('MapSendCommandCoprocessor.sendLoadMapFinishMessage -> 当前socket连接情况：' + GameConfig.socket.connected);
    console.log('MapSendCommandCoprocessor.sendLoadMapFinishMessage -> 发送加载完毕消息C2S_LoadFinishMessage');
    var cmd = new C2S_LoadFinishMessage();
    cmd.width = Capabilities.screenResolutionX;
    cmd.height = Capabilities.screenResolutionY;
    GameServer.sendCommand(cmd);
  };

  /**
   *游戏中切换地图完成的信息
   *@param width
   *@param height
   */
  __proto.sendLoadFinishForChangeMapMessage = function (width, height) {
    width === void 0 && (width = 0);
    height === void 0 && (height = 0);
    console.log('MapSendCommandCoprocessor.sendLoadFinishForChangeMapMessage -> 当前socket连接情况：' + GameConfig.socket.connected);
    console.log('MapSendCommandCoprocessor.sendLoadFinishForChangeMapMessage -> 发送加载完毕消息C2S_LoadFinishForChangeMapMessage');
    if (this._loadFinishMsg == null) {
      this._loadFinishMsg = new C2S_LoadFinishForChangeMapMessage();
    }
    this._loadFinishMsg.width = Capabilities.screenResolutionX;
    this._loadFinishMsg.height = Capabilities.screenResolutionY;
    GameServer.sendCommand(this._loadFinishMsg);
  };

  /**
   *发送角色走动的信息
   *@param mapid
   *@param tx
   *@param ty
   *@param dir
   *@param step
   *
   */
  __proto.sendCharcterRunMessage = function (sign, mapid, tx, ty, dir, step, actionStep) {
    FpsCheck.check();
    if (this._runMsg == null) {
      this._runMsg = new C2S_RunningMessage();
    }
    var postion = this._runMsg.position;
    if (!postion) {
      postion = new Position();
      this._runMsg.position = postion;
    }
    postion.px = tx;
    postion.py = ty;
    var posAry = [];
    var roadByte = 0;
    roadByte = dir << 5;
    roadByte = step | roadByte;
    posAry.push(roadByte);
    this._runMsg.mapId = mapid;
    this._runMsg.moveId = sign;
    this._runMsg.positions = posAry;
    this._runMsg.createTime = Int64.fromNumber(0);
    this._runMsg.actionStep = actionStep;
    GameServer.sendCommand(this._runMsg);
  };

  /**
   *发送攻击命令
   *@param skillid 就是攻击技能ID
   *@param fightDirection
   *@param fightTarget
   *@param x
   *@param y
   *@param targetType
   *
   */
  __proto.sendAttackPersonMessage = function (skillid, fightDirection, fightTarget, x, y, playerX, playerY, nextActionSkill, personId2) {
    if (ZuoQiCenter.isRiding) {
      ZuoQiCenter.sendShowOrHide(false);
    }
    var monster = AutoFightRobot.dashMonster;
    monster = App.mapModule.mapSkillModel.selectTarget;
    if (monster != null) {
      if (SkillCenter.getSkill(30060) != null) {
        var buff = monster.bufferManager.getBufferBy_client_type(1);
        if (buff != null) {
          EventMgr.dispatch('ET.USE_SHIDUSHU', false);
        } else {
          EventMgr.dispatch('ET.USE_SHIDUSHU', true);
        }
      }
    }
    if (GameConfig.isDebug) {
      console.log('C2S_AttackPersonMessage -> 发送攻击坐标：（' + x + ',' + y + '）（ID：' + fightTarget + '）');
    }
    if (this._attackMsg == null) {
      this._attackMsg = new C2S_AttackPersonMessage();
    }
    this._attackMsg.fightType = skillid;
    this._attackMsg.fightDirection = fightDirection;
    if (!fightTarget) {
      fightTarget = '0';
    }
    if (!personId2) {
      personId2 = '0';
    }
    this._attackMsg.fightTarget = Int64.parseInt64(fightTarget);
    this._attackMsg.specialFightTarget = Int64.parseInt64(personId2);
    this._attackMsg.x = x;
    this._attackMsg.y = y;
    this._attackMsg.targetType = 0;
    this._attackMsg.passing = ServerTime.flashTime;
    this._attackMsg.cur = ServerTime.systemTime;
    this._attackMsg.curplayerX = playerX;
    this._attackMsg.curplayerY = playerY;
    this._attackMsg.otherFightType = nextActionSkill;
    GameServer.sendCommand(this._attackMsg);
  };

  __proto.autoTakeUpItem = function (ids) {
    if (this._autoTakeUpMsg == null) {
      this._autoTakeUpMsg = new C2S_AutoTakeUpMessage();
    }
    this._autoTakeUpMsg.itemId = ids;
    GameServer.sendCommand(this._autoTakeUpMsg);
  };

  /**
   *捡取物品
   *@param itemId
   *
   */
  __proto.takeUpItem = function (item) {
    App.role.stopTime = 0;
    var t = getTimer();
    if (!GlobalControl.isInkuafu && !FuzhanCenter.isBenfu) {
      if (ShiquCenter.getInstance().isFull(item.itemId)) {
        if (this._takeTimeGap1 == 0 || t - this._takeTimeGap1 >= 1000) {
          this._takeTimeGap1 = t;
          GameNotice.showWeakMessage('您的背包已满，请及时清理背包');
        }
        return;
      }
    }
    var leftTime = ShiquCenter.getInstance().isMy(item);
    if (leftTime > 0) {
      if (this._takeTimeGap2 == 0 || t - this._takeTimeGap2 >= 1000) {
        this._takeTimeGap2 = t;
        GameNotice.showWeakMessage('这件物品不属于你，还需' + GameHTML.setColor(leftTime, '#00ff00') + '秒才可拾取');
      }
      return;
    }
    if (item != null) {
      var mapId = App.role.mapId;
      if (this._curMapId != mapId) {
        this._curMapId = mapId;
        this._takeTimeDict = {};
      }
      var time = myparseInt(this._takeTimeDict[item.itemOnlyId]);
      var nowtime = Laya.workerTimer.currTimer;
      if (time == 0) {
        this._takeTimeDict[item.itemOnlyId] = nowtime;
      } else {
        if (nowtime - time < 800) {
          return;
        }
        this._takeTimeDict[item.itemOnlyId] = nowtime;
      }
      item.tryTakeCount++;
      if (item.info != null) {
        var bean = GameUtils.getItemConfigData(item.info.itemModelId);
        if (bean.q_type == 3 || bean.q_id == 91006 || bean.q_id == 91007 || bean.q_id == 781 || bean.q_id == 782 || bean.q_id == 783 || bean.q_id == 784 || bean.q_id == 785) {
          App.sound.playSound('6008');
        } else {
          App.sound.playSound('6017');
        }
        if (this._takeUpMsg == null) {
          this._takeUpMsg = new C2S_TakeUpMessage();
        }
        this._takeUpMsg.itemId = item.info.dropGoodsId;
        GameServer.sendCommand(this._takeUpMsg);
      }
    }
  };

  /**
   *发送自动战斗状态
   *@param bool
   *
   */
  __proto.sendAutoFightState = function (bool, from) {
    if (bool) {
      mytrace('客户端发送开启自动战斗：' + from);
      if (this._autoStartMsg == null) {
        this._autoStartMsg = new C2S_AutoStartMessage();
      }
      this._autoStartMsg.passing = ServerTime.flashTime;
      this._autoStartMsg.cur = ServerTime.systemTime;
      GameServer.sendCommand(this._autoStartMsg);
    } else {
      mytrace('客户端发送停止自动战斗：' + from);
      if (this._autoEndMsg == null) {
        this._autoEndMsg = new C2S_AutoEndMessage();
      }
      this._autoEndMsg.passing = ServerTime.flashTime;
      this._autoEndMsg.cur = ServerTime.systemTime;
      GameServer.sendCommand(this._autoEndMsg);
    }
  };

  __proto.sendShenxingshu = function (add) {
    if (add) {
      GameServer.sendCommand(new C2S_AddShenXingShuBuffMessage());
    } else {
      GameServer.sendCommand(new C2S_RemoveShenXingShuBuffMessage());
    }
  };

  __proto.sendC2S_MengChongTakeUpMessage = function (itemIdAndPos) {
    if (this._petTakeUp == null) {
      this._petTakeUp = new C2S_MengChongTakeUpMessage();
    }
    this._petTakeUp.itemIdAndPos = itemIdAndPos;
    GameServer.sendCommand(this._petTakeUp);
  };

  MapSendCommandCoprocessor.sendC2S_MapBriefInfoMessage = function (mapIdArr) {
    var cmd = new C2S_MapBriefInfoMessage();
    cmd.mapIds = mapIdArr;
    GameServer.sendCommand(cmd);
  };

  MapSendCommandCoprocessor.sendC2S_SpendMoneyRefreshMonsterMessage = function (npcid) {
    var cmd = new C2S_SpendMoneyRefreshMonsterMessage();
    cmd.npcid = Int64.parseInt64(npcid);
    GameServer.sendCommand(cmd);
  };

  return MapSendCommandCoprocessor;
})(GameServer);
