/**
 *内挂
 *@author 胡剑
 *创建时间：2024-7-24 下午2:05:36
 *
 */
//class com.modules.map.model.auto.NeiGuaFight
var NeiGuaFight = (function () {
  function NeiGuaFight() {}
  __class(NeiGuaFight, 'com.modules.map.model.auto.NeiGuaFight');

  NeiGuaFight.CHANGE = 'NeiGuaFight.CHANGE';
  NeiGuaFight.isZoneExitContinueNeigua = false;
  NeiGuaFight.isAttackCommonMonster = false;
  NeiGuaFight._mapIndex = 0;
  // 保存地图ids
  NeiGuaFight._saveMapIds = [];
  NeiGuaFight._mapIds = [];
  NeiGuaFight._isContinue = false;
  NeiGuaFight._isRuning = false;
  NeiGuaFight._lastX = -1;
  NeiGuaFight._lastY = -1;
  NeiGuaFight._checkPosTime = 0;

  /**
   *切换地图后是否继续内挂（目前两种情况继续：死亡回城，残血回城）
   *@return
   *
   */
  __getset(
    1,
    NeiGuaFight,
    'isContinue',
    function () {
      return NeiGuaFight._isContinue;
    },
    function (value) {
      NeiGuaFight._isContinue = value;
    }
  );
  /**
   *是否内挂中
   *@return
   *
   */
  __getset(1, NeiGuaFight, 'isRuning', function () {
    return NeiGuaFight._isRuning;
  });

  // 是否购买内挂
  NeiGuaFight.isOpen = function () {
    if (GameConfig.isDebug) {
      return true;
    }
    var id = Q_globalCenter.getInt(15179);
    var data = ActivityCenter.getData(id);
    if (data && data.playerStates != 0) {
      return false;
    }
    return true;
  };

  // 保存地图
  NeiGuaFight.setSaveMapIds = function (arr) {
    if (!arr) {
      arr = [];
    }
    NeiGuaFight._saveMapIds = arr;
  };

  // 根据索引获取保存的地图Id
  NeiGuaFight.getSaveMapId = function (index) {
    return myparseInt(NeiGuaFight._saveMapIds[index]);
  };

  // 保存指定的地图
  NeiGuaFight.setSaveMapId = function (index, value) {
    var old = NeiGuaFight.getSaveMapId(index);
    if (old != value) {
      NeiGuaFight._saveMapIds[index] = value;
      if (NeiGuaFight._isRuning) {
        App.closeAutoFight();
      }
      EventMgr.dispatch('NeiGuaFight.CHANGE');
      SetupCenter.saveClient('39', NeiGuaFight._saveMapIds);
    }
  };

  // 获取地图索引
  NeiGuaFight.getIndexByMapId = function (mapId) {
    return NeiGuaFight._saveMapIds.indexOf(mapId);
  };

  // 更新地图
  NeiGuaFight.updateMapIds = function () {
    NeiGuaFight._mapIds.length = 0;
    var mapId = 0;
    for (var i = 0; i < NeiGuaFight._saveMapIds.length; i++) {
      mapId = NeiGuaFight.getSaveMapId(i);
      if (mapId > 0) {
        NeiGuaFight._mapIds.push(mapId);
      }
    }
    return NeiGuaFight._mapIds.length > 0;
  };

  // 获取第一个有boss的地图索引, 如果都没有boss, 则返回第一个可用地图
  NeiGuaFight.getHasBossMapIndex = function () {
    var mapId = 0,
      firstMapIndex = -1;
    for (var i = 0; i < NeiGuaFight._saveMapIds.length; i++) {
      mapId = NeiGuaFight.getSaveMapId(i);
      if (mapId > 0) {
        if (firstMapIndex == -1) {
          firstMapIndex = i;
        }
        if (NeiGuaFight.hasBossByMapId(mapId)) {
          return i;
        }
      }
    }
    return firstMapIndex;
  };

  NeiGuaFight.getNextHasBossMapIndex = function () {
    var mapId = 0;
    var firstMapIndex = -1;
    // 从当前地图的下一个开始找
    for (var i = NeiGuaFight._mapIndex + 1; i < NeiGuaFight._saveMapIds.length; i++) {
      mapId = NeiGuaFight.getSaveMapId(i);
      if (mapId > 0) {
        if (firstMapIndex == -1) {
          firstMapIndex = i;
        }
        if (NeiGuaFight.hasBossByMapId(mapId)) {
          return i;
        }
      }
    }
    // 从第一个开始找, 知道当前地图
    for (i = 0; i < NeiGuaFight._mapIndex; i++) {
      mapId = NeiGuaFight.getSaveMapId(i);
      if (mapId > 0) {
        if (firstMapIndex == -1) {
          firstMapIndex = i;
        }
        if (NeiGuaFight.hasBossByMapId(mapId)) {
          return i;
        }
      }
    }

    // 如果没找到, 就返回当前所在地图
    if (firstMapIndex == -1) {
      firstMapIndex = NeiGuaFight._mapIndex;
    }
    return firstMapIndex;
  };

  NeiGuaFight.start = function (isRequestBoss) {
    if (!NeiGuaFight._isRuning) {
      NeiGuaFight._isRuning = true;
      NeiGuaFight._lastX = -1;
      NeiGuaFight._lastY = -1;
      NeiGuaFight._checkPosTime = 0;
      // 清空寻路点
      App.mapModule.autoFightRobot.clearHookPoint();
      // 开启自动攻击
      App.mainProxy.changeAutoFightSign(true);
      // 触发事件
      EventMgr.dispatch('ET.ANC', NeiGuaFight._isRuning);

      // 请求boss
      if (isRequestBoss) {
        NeiGuaFight.requestBoss(1);
      }

      Laya.workerTimer.loop(8000, NeiGuaFight, com.modules.map.model.auto.NeiGuaFight.requestBoss);
      Laya.workerTimer.loop(10000, NeiGuaFight, com.modules.map.model.auto.NeiGuaFight.checkBoss);
    }
  };

  NeiGuaFight.stop = function (from) {
    if (NeiGuaFight._isRuning) {
      if (from) {
        console.log('停止内挂来源：' + from);
      }
      NeiGuaFight._isRuning = false;
      NeiGuaFight.isAttackCommonMonster = false;
      Laya.workerTimer.clear(NeiGuaFight, com.modules.map.model.auto.NeiGuaFight.requestBoss);
      Laya.workerTimer.clear(NeiGuaFight, com.modules.map.model.auto.NeiGuaFight.checkBoss);
      EventMgr.dispatch('ET.ANC', NeiGuaFight._isRuning);
    }
  };

  // 从服务端获取所有可用boss
  NeiGuaFight.requestBoss = function (client) {
    client === void 0 && (client = 2);
    BossCommandSender.sendC2S_AliveWildBossMessage(NeiGuaFight._mapIds, client, false);
  };

  NeiGuaFight.checkBoss = function () {
    if (!NeiGuaFight._isRuning) {
      return;
    }
    // 当前地图没有boss, 直接返回
    if (NeiGuaFight.hasBossByMapId(App.role.mapId)) {
      return;
    }

    // 如果没有boss
    if (!NeiGuaFight.hasBoss()) {
      if (NeiGuaFight._checkPosTime == 0) {
        NeiGuaFight._lastX = App.role.nodex;
        NeiGuaFight._lastY = App.role.nodey;
      }
      NeiGuaFight._checkPosTime++;
      if (NeiGuaFight._checkPosTime < 30 || NeiGuaFight._lastX != App.role.nodex || NeiGuaFight._lastY != App.role.nodey) {
        return;
      }
    }
    var mapIndex = com.modules.map.model.auto.NeiGuaFight.getNextHasBossMapIndex();
    if (mapIndex != -1) {
      NeiGuaFight._checkPosTime = 0;
      com.modules.map.model.auto.NeiGuaFight.sendTransmitMap(mapIndex);
    }
  };

  // 检查所有地图是不是有boss可以打
  NeiGuaFight.hasBoss = function () {
    for (var i = 0; i < NeiGuaFight._mapIds.length; i++) {
      if (NeiGuaFight.hasBossByMapId(NeiGuaFight._mapIds[i]) > 0) {
        console.log('----------------> 有霸主BOSS可打');
        return true;
      }
    }
    console.log('----------------> 没有找到霸主BOSS');
    return false;
  };

  // 检查指定地图是不是有boss存活的boss
  NeiGuaFight.hasBossByMapId = function (mapId) {
    var arr = BossDataCenter.instance.getBossListByMapId(mapId, false, false);
    for (var i = 0; i < arr.length; i++) {
      var boss = arr[i];
      if (boss.remainTime > 0) {
        continue;
      }
      if (EnumMonsterType.isMonster(boss.bean.q_type, 16)) {
        return true;
      }
    }
    return false;
  };

  // 传送到指定地图
  NeiGuaFight.sendTransmitMap = function (mapIndex) {
    NeiGuaFight._mapIndex = mapIndex;
    var mapId = NeiGuaFight.getSaveMapId(mapIndex);
    if (mapId > 0) {
      // 如果当前用户在这个地图, 就开启自动打怪
      if (App.role.mapId == mapId) {
        App.openAutoFight();
      } else {
        // 如果当前用户不在这个地图, 就传送到这个地图
        com.modules.map.model.auto.NeiGuaFight.isContinue = true;
        var cmd = new C2S_TransmitToServerMessage();
        cmd.transParam = '{"mapmodelid":' + mapId + '}';
        cmd.type = 6;
        GameServer.sendCommand(cmd);
      }
    } else {
      console.log('警告！内挂没找到要前往的地图 mapIndex：' + mapIndex);
    }
  };

  return NeiGuaFight;
})();
