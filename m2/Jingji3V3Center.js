/**
 *
 *@author mcc
 *创建时间：2024-9-28 下午5:42:24
 *
 */
//class com.modules.jingji3V3.Jingji3V3Center extends com.game.core.connect.GameServer
var Jingji3V3Center = (function (_super) {
  function Jingji3V3Center() {
    Jingji3V3Center.__super.call(this);
  }

  __class(Jingji3V3Center, 'com.modules.jingji3V3.Jingji3V3Center', _super);
  var __proto = Jingji3V3Center.prototype;
  __proto.init = function () {
    GameServer.register(S2C_InviteCrossMatchTeamMessage, GameHandler.create(this, this.onS2C_InviteCrossMatchTeamMessage));
    GameServer.register(S2C_CrossMatchTeamInfoMessage, GameHandler.create(this, this.onS2C_CrossMatchTeamInfoMessage));
    GameServer.register(S2C_CrossMatchResultMessage, GameHandler.create(this, this.onS2C_CrossMatchResultMessage));
    GameServer.register(S2C_CrossPvPInfoMessage, GameHandler.create(this, this.onS2C_CrossPvPInfoMessage));
    GameServer.register(S2C_CrossMatchSuccessMessage, GameHandler.create(this, this.onS2C_CrossMatchSuccessMessage));
    GameServer.register(S2C_TianShuNpcInfoMessage, GameHandler.create(this, this.onS2C_TianShuNpcInfoMessage));
    GameServer.register(S2C_CrossMatchFightInfoMessage, GameHandler.create(this, this.onS2C_CrossMatchFightInfoMessage));
    GameServer.register(S2C_CrossPVPTeamInfoMessage, GameHandler.create(this, this.onS2C_CrossPVPTeamInfoMessage));
    GameServer.register(S2C_CrossPvPZoneFinishPanelMessage, GameHandler.create(this, this.onS2C_CrossPvPZoneFinishPanelMessage));
    GameServer.register(S2C_3v3RewardInfoMessage, GameHandler.create(this, this.onS2C_3v3RewardInfoMessage));
  };

  /**3v3竞技奖励*/
  __proto.onS2C_3v3RewardInfoMessage = function (cmd) {
    Jingji3V3Center.awardtInfo = cmd;
    EventMgr.dispatch('Jingji3V3Center.AWARD_INFO');
    Jingji3V3Center.getJingjiDabiaoRedpoint();
    Jingji3V3Center.getDayRedpoint();
  };

  /**3v3结算面板*/
  __proto.onS2C_CrossPvPZoneFinishPanelMessage = function (cmd) {
    Jingji3V3Center.resultInfo = cmd;
    if (Jingji3V3Center.resultInfo.winTeamType > 0) {
      PanelManager.openPanel(PanelRegister.JINGJI_3V3_RESULT, cmd);
    }
    EventMgr.dispatch('Jingji3V3Center.SIDE_RESULT_INFO');
  };

  /**3v3队伍信息*/
  __proto.onS2C_CrossPVPTeamInfoMessage = function (cmd) {
    Jingji3V3Center.teamInfo = cmd;
    EventMgr.dispatch('Jingji3V3Center.SIDE_TEAM_INFO');
  };

  /**3v3g副本分数*/
  __proto.onS2C_CrossMatchFightInfoMessage = function (cmd) {
    Jingji3V3Center.topInfo = cmd;
    EventMgr.dispatch('Jingji3V3Center.SIDE_TOP_INFO');
  };

  /**上古天书NPC信息*/
  __proto.onS2C_TianShuNpcInfoMessage = function (cmd) {
    Jingji3V3Center.npcInfo = cmd;
    EventMgr.dispatch('Jingji3V3Center.NPC_INFO');
  };

  /**匹配成功，进入跨服*/
  __proto.onS2C_CrossMatchSuccessMessage = function (cmd) {
    FuzhanCenter.sendCrossSignupMessage(210046);
  };

  /**玩家段位信息*/
  __proto.onS2C_CrossPvPInfoMessage = function (cmd) {
    Jingji3V3Center.duanweiInfo = cmd;
    EventMgr.dispatch('Jingji3V3Center.PLAYER_DUANWEI_INFO');
    Jingji3V3Center.getDuanweiRedpoint();
  };

  /**3V3匹配返回消息*/
  __proto.onS2C_CrossMatchResultMessage = function (cmd) {
    Jingji3V3Center.isPipei = cmd.result == 1;
    EventMgr.dispatch('Jingji3V3Center.TEAN_PIPEI_STATE');
    Jingji3V3Center.actIconTimer();
  };

  /**3V3返回队伍消息*/
  __proto.onS2C_CrossMatchTeamInfoMessage = function (cmd) {
    Jingji3V3Center.isPipei = cmd.state == 1;
    EventMgr.dispatch('Jingji3V3Center.TEAN_INFO', cmd);
    Jingji3V3Center.actIconTimer();
  };

  /**3V3弹窗邀请*/
  __proto.onS2C_InviteCrossMatchTeamMessage = function (cmd) {
    if (com.modules.jingji3V3.Jingji3V3Center.yaoqingState) {
      return;
    }
    if (cmd.infos.length > 0) {
      PanelManager.openByClass(Jingji3V3TeamYaoqingPanel, cmd.infos);
    } else {
      PanelManager.closeByClass(Jingji3V3TeamYaoqingPanel);
    }
  };

  Jingji3V3Center.sendCrossNotice = function (name, type) {
    var cmd = new C2S_CrossNoticeMessage();
    cmd.name = name;
    cmd.type = type;
    GameServer.sendCommand(cmd);
  };

  Jingji3V3Center.sendRewardReq = function (type, id) {
    var cmd = new C2S_3v3RewardMessage();
    cmd.type = type;
    cmd.id = id;
    GameServer.sendCommand(cmd);
  };

  Jingji3V3Center.sendZoneResultReq = function () {
    var cmd = new C2S_CrossPvPZoneFinishPanelMessage();
    GameServer.sendCommand(cmd);
  };

  Jingji3V3Center.sendCrossDuanweiReq = function () {
    var cmd = new C2S_CrossPvPInfoMessage();
    GameServer.sendCommand(cmd);
  };

  Jingji3V3Center.sendCrossTeamReq = function () {
    var cmd = new C2S_CrossMatchTeamInfoMessage();
    GameServer.sendCommand(cmd);
  };

  Jingji3V3Center.sendPipeiReq = function (type) {
    if (type == 1) {
      if (Jingji3V3Center.getActOpenData() == null) {
        GameNotice.showMousePosMessage('活动未到竞技时间');
        return;
      }
    }
    var cmd = new C2S_CrossMatchMessage();
    cmd.type = type;
    GameServer.sendCommand(cmd);
  };

  Jingji3V3Center.sendCreateTeamReq = function () {
    var cmd = new C2S_CreatCrossMatchTeamMessage();
    GameServer.sendCommand(cmd);
  };

  Jingji3V3Center.sendJiesanTeamReq = function (type) {
    var cmd = new C2S_DisCrossMatchTeamMessage();
    cmd.type = type;
    GameServer.sendCommand(cmd);
  };

  Jingji3V3Center.sendKickReq = function (i64Id) {
    var cmd = new C2S_KickCrossMatchTeamMessage();
    cmd.playerid = i64Id;
    GameServer.sendCommand(cmd);
  };

  Jingji3V3Center.sendOnekeyShoutReq = function (type) {
    var cmd = new C2S_OnekeyShoutTeamMessage();
    cmd.type = type;
    GameServer.sendCommand(cmd);
  };

  Jingji3V3Center.sendYaoqingRoleReq = function (serverId, i64Id) {
    var cmd = new C2S_InviteCrossMatchTeamMessage();
    cmd.serverid = serverId;
    cmd.playerid = i64Id;
    GameServer.sendCommand(cmd);
  };

  Jingji3V3Center.sendOperateReq = function (type, temaid) {
    var cmd = new C2S_OperateCrossMatchTeamMessage();
    cmd.state = type;
    cmd.teamid = temaid;
    GameServer.sendCommand(cmd);
  };

  Jingji3V3Center.getCaijiTeamItem = function () {
    var item;
    var caijiArr = com.modules.jingji3V3.Jingji3V3Center.caijiSideIconArr;
    if (caijiArr.length > 0) {
      item = com.modules.jingji3V3.Jingji3V3Center.caijiSideIconArr.shift();
    } else {
      item = new Jingji3V3TeamShow();
    }
    return item;
  };

  Jingji3V3Center.getJihuoTeamItem = function () {
    var item;
    var jihuoArr = com.modules.jingji3V3.Jingji3V3Center.jihuoSideIconArr;
    if (jihuoArr.length > 0) {
      item = com.modules.jingji3V3.Jingji3V3Center.jihuoSideIconArr.shift();
    } else {
      item = new Jingji3V3TeamShow();
    }
    return item;
  };

  Jingji3V3Center.getActOpenData = function () {
    var curData;
    var data = ActivityCenter.getData(22022);
    if (data && data.activityStates == 1) {
      curData = data;
    }
    if (!curData) {
      data = ActivityCenter.getData(22023);
      if (data && data.activityStates == 1) {
        curData = data;
      }
    }
    return curData;
  };

  Jingji3V3Center.actIconTimer = function () {
    var actData = com.modules.jingji3V3.Jingji3V3Center.getActOpenData();
    if (actData) {
      if (com.modules.jingji3V3.Jingji3V3Center.isPipei) {
        Jingji3V3Center._pipeiTime = 0;
        ActivityUtil.showIconText(3010, '匹配中');
        Laya.timer.loop(300, Jingji3V3Center, Jingji3V3Center.onPipei);
      } else {
        Jingji3V3Center.clearPipeiTimer();
        ActivityUtil.showIconTimer(3010, actData.time);
      }
    } else {
      Jingji3V3Center.clearPipeiTimer();
    }
  };

  Jingji3V3Center.onPipei = function () {
    Jingji3V3Center._pipeiTime++;
    var str;
    if (Jingji3V3Center._pipeiTime > 3) {
      Jingji3V3Center._pipeiTime = 0;
      str = '匹配中';
    }
    if (Jingji3V3Center._pipeiTime == 1) {
      str = '匹配中.';
    } else if (Jingji3V3Center._pipeiTime == 2) {
      str = '匹配中..';
    } else if (Jingji3V3Center._pipeiTime == 3) {
      str = '匹配中...';
    }
    ActivityUtil.showIconText(3010, str);
  };

  Jingji3V3Center.clearPipeiTimer = function () {
    Laya.timer.clear(Jingji3V3Center, Jingji3V3Center.onPipei);
    ActivityUtil.showIconTimer(3010, -1);
  };

  Jingji3V3Center.sendTransmitToServer = function (npcId) {
    if (com.modules.jingji3V3.Jingji3V3Center.startTime > 0) {
      GameNotice.showMousePosMessage(com.modules.jingji3V3.Jingji3V3Center.startTime + '秒后可传送');
    } else {
      TaskCommandSender.sendTransmitToServer(JSON.stringify({ npcid: npcId }), 1);
    }
  };

  Jingji3V3Center.getMovePos = function () {
    if (Browser.onPC == false) {
      return [250, 300];
    }
    return [Laya.stage.stageWidth - EnumMainPanel.TASKTRACK_WIDTH - 300, 300];
  };

  Jingji3V3Center.getBean = function (jifen) {
    var index = -1;
    var bean;
    var list = App.dataMgr.q_jingji3V3Container.getList();
    for (var i = 0; i < list.length; i++) {
      bean = list[i];
      if (jifen <= bean.q_rank_num) {
        index = i;
        break;
      }
    }
    if (index == -1) {
      index = list.length - 1;
    }
    return list[index];
  };

  Jingji3V3Center.getShopRedpoint = function () {
    if (FunctionManager.isFunctionOpen(330) == false) return;
    var bool = false;
    var bean;
    var cost;
    var shops = MallCenter.getShopItemInfos(15, 1);
    for (var i = 0; i < shops.length; i++) {
      bean = App.dataMgr.q_shopContainer.getDataBean(shops[i].sellId);
      if (bean) {
        cost = JSON.parse(bean.q_consume)[0];
        if (cost.num == 0 && shops[i].remainNum > 0) {
          bool = true;
          break;
        }
      }
    }
    if (bool != Jingji3V3Center.shopRedpoint) {
      Jingji3V3Center.shopRedpoint = bool;
      Jingji3V3Center.sendNotice();
    }
  };

  Jingji3V3Center.getDuanweiRedpoint = function () {
    if (FunctionManager.isFunctionOpen(330) == false) return;
    var bool = false;
    var cmd = com.modules.jingji3V3.Jingji3V3Center.duanweiInfo;
    var rewardId = cmd.rewardId;
    var tempId = rewardId == 0 ? rewardId + 2 : rewardId + 1;
    var curBean = App.dataMgr.q_jingji3V3Container.getDataBean(tempId, false);
    if (curBean) {
      if (cmd.score >= curBean.q_rank_num) {
        bool = true;
      }
    }
    if (Jingji3V3Center.duwanweiRedpoint != bool) {
      Jingji3V3Center.duwanweiRedpoint = bool;
      Jingji3V3Center.sendNotice();
    }
  };

  Jingji3V3Center.getJingjiDabiaoRedpoint = function () {
    if (FunctionManager.isFunctionOpen(330) == false) return;
    var cmd = com.modules.jingji3V3.Jingji3V3Center.awardtInfo;
    var isGet = false;
    var bool = false;
    var bean;
    var beans = App.dataMgr.q_jingji3V3StandContainer.getList();
    for (var i = 0; i < beans.length; i++) {
      bean = beans[i];
      isGet = false;
      for (var a = 0; a < cmd.wandRewardStatus.length; a++) {
        if (bean.q_id == cmd.wandRewardStatus[a]) {
          isGet = true;
          break;
        }
      }
      if (!isGet && cmd.wandNum >= bean.q_rank_num) {
        bool = true;
        break;
      }
    }
    if (Jingji3V3Center.jingjiDabiao != bool) {
      Jingji3V3Center.jingjiDabiao = bool;
      Jingji3V3Center.sendNotice();
    }
  };

  Jingji3V3Center.getDayRedpoint = function () {
    if (FunctionManager.isFunctionOpen(330) == false) return;
    var cmd = com.modules.jingji3V3.Jingji3V3Center.awardtInfo;
    var bool = cmd.dayRewardStatus == 0;
    if (Jingji3V3Center.dayRedpoint != bool) {
      Jingji3V3Center.dayRedpoint = bool;
      Jingji3V3Center.sendNotice();
    }
  };

  Jingji3V3Center.getTiliRedpoint = function () {
    if (FunctionManager.isFunctionOpen(330) == false) return;
    var bool = false;
    var tili178 = BossDataCenter.instance.getMonsterTili(187);
    if (tili178 && tili178.num > 0 && Jingji3V3Center.getActOpenData()) {
      bool = true;
    }
    if (Jingji3V3Center.tiliRedpoint != bool) {
      Jingji3V3Center.tiliRedpoint = bool;
      Jingji3V3Center.sendNotice();
    }
  };

  Jingji3V3Center.sendNotice = function () {
    var bool = Jingji3V3Center.duwanweiRedpoint || Jingji3V3Center.jingjiDabiao || Jingji3V3Center.dayRedpoint || Jingji3V3Center.shopRedpoint || Jingji3V3Center.tiliRedpoint;
    EventMgr.dispatch(ActivityEvent.refreshRedPoint, 3010, bool);
  };

  Jingji3V3Center.openJingji3V3Panel = function () {
    var tili178 = BossDataCenter.instance.getMonsterTili(187);
    if (tili178 && tili178.num > 0 && Jingji3V3Center.getActOpenData()) {
      PanelManager.openPanel(PanelRegister.JINGJI_3V3, null, -1, false);
    }
  };

  Jingji3V3Center.TEAN_INFO = 'Jingji3V3Center.TEAN_INFO';
  Jingji3V3Center.TEAN_PIPEI_STATE = 'Jingji3V3Center.TEAN_PIPEI_STATE';
  Jingji3V3Center.PLAYER_DUANWEI_INFO = 'Jingji3V3Center.PLAYER_DUANWEI_INFO';
  Jingji3V3Center.NPC_INFO = 'Jingji3V3Center.NPC_INFO';
  Jingji3V3Center.SIDE_TOP_INFO = 'Jingji3V3Center.SIDE_TOP_INFO';
  Jingji3V3Center.SIDE_TEAM_INFO = 'Jingji3V3Center.SIDE_TEAM_INFO';
  Jingji3V3Center.SIDE_RESULT_INFO = 'Jingji3V3Center.SIDE_RESULT_INFO';
  Jingji3V3Center.AWARD_INFO = 'Jingji3V3Center.AWARD_INFO';
  Jingji3V3Center.duanweiInfo = null;
  Jingji3V3Center.npcInfo = null;
  Jingji3V3Center.topInfo = null;
  Jingji3V3Center.teamInfo = null;
  Jingji3V3Center.resultInfo = null;
  Jingji3V3Center.awardtInfo = null;
  Jingji3V3Center.ITEM_8490 = 8490;
  Jingji3V3Center._jingjiList = null;
  Jingji3V3Center._jingjiStandList = null;
  Jingji3V3Center.yaoqingState = false;
  Jingji3V3Center.isPipei = false;
  Jingji3V3Center.MAP_ID = 210046;
  Jingji3V3Center.jihuoNum = 0;
  Jingji3V3Center.caijiNum = 0;
  Jingji3V3Center.caijiSideIconArr = [];
  Jingji3V3Center.jihuoSideIconArr = [];
  Jingji3V3Center.JINGJI_3V3_ID1 = 22022;
  Jingji3V3Center.JINGJI_3V3_ID2 = 22023;
  Jingji3V3Center.JINGJI_3V3_SHOW = 22024;
  Jingji3V3Center.actYugao = false;
  Jingji3V3Center.startTime = 0;
  Jingji3V3Center.SIDE_Y = 406;
  Jingji3V3Center.caijiName = null;
  Jingji3V3Center._pipeiTime = 0;
  Jingji3V3Center.duwanweiRedpoint = false;
  Jingji3V3Center.jingjiDabiao = false;
  Jingji3V3Center.dayRedpoint = false;
  Jingji3V3Center.shopRedpoint = false;
  Jingji3V3Center.tiliRedpoint = false;
  return Jingji3V3Center;
})(GameServer);
