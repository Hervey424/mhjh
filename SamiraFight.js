var SamiraFight = (function () {
  function SamiraFight() {}
  __class(SamiraFight, 'com.modules.map.model.auto.SamiraFight');

  SamiraFight.version = '1218-0953';
  SamiraFight.isInit = false;
  SamiraFight.personId = '';
  SamiraFight.autoOpenTimer = 0;
  SamiraFight.autoOpenTime = 10;
  SamiraFight.running = false;
  // 当前状态 search-搜索boss, fight-战斗, fight-xiuluo-正在攻击修罗天界, wudao-武道会, kuafuboss-跨服boss, xukongliehen-虚空裂痕, yabiao-押镖, kuafuxiaoguai-跨服小怪
  // zhenyingzhan-阵营攻防战 yijieruqin-异界入侵 sbk-沙巴克, longhunboss-龙魂boss
  SamiraFight.currentStatus = 'search';
  SamiraFight.status = {
    search: '搜索BOSS',
    fight: '战斗',
    'fight-xiuluo': '修罗天界',
    wudao: '武道会',
    kuafuboss: '跨服BOSS',
    xukongliehen: '虚空裂痕',
    yabiao: '押镖',
    xiaoguai: '跨服小怪',
    zhenyingzhan: '阵营攻防战',
    yijieruqin: '异界入侵',
    sbk: '沙巴克',
    suoyaotacaiji: '锁妖塔采集',
    wudaohuijuesai: '武道会决赛',
    longhunboss: '龙魂BOSS',
    jiaoyi: '交易',
    hunhuan: '魂环秘境',
    lilian: '历练任务',
    sanguoxiaoguai: '三国小怪',
    sanguoxiaoguaiXinwu: '三国小怪信物'
  };
  // 当前boss
  SamiraFight.currentBoss = null;
  // 打boss防止卡住检查次数
  SamiraFight.currentcheckTimes = 0;
  // 武道会防止卡住检查次数
  SamiraFight.currentWudaocheckTimes = 0;
  SamiraFight.wudaoLastNum = -1;
  SamiraFight.wudaoLastNumTimes = 0;
  SamiraFight.wudaoStatus = true;
  SamiraFight.wudaoResumeTs = 0;
  // 跨服活动状态
  SamiraFight.kuafuActiveStatus = true;
  SamiraFight.kuafuActiveResumeTs = 0;
  // 修罗天界层数
  SamiraFight.currentXiuLuoCengshu = -1;
  // 配置文件
  SamiraFight.config = {};
  // boss血量监测
  SamiraFight.kuafuBossMapId = 300011;
  // 跨服bossid, 字符串类型的
  SamiraFight.kuafuBossIds = [];
  SamiraFight.kuafuBossData = [];
  SamiraFight.kuafuBossHpStatus = false;
  SamiraFight.kuafuBossHpDic = {};
  SamiraFight.kuafuXiaoGuai = {
    taskId: 60005,
    points: [
      { x: 206, y: 222 },
      { x: 237, y: 306 },
      { x: 160, y: 324 },
      { x: 127, y: 314 }
    ],
    pointIndex: 0,
    target: null
  };
  // 羊了个羊
  SamiraFight.ylgy = {
    level: 0,
    levelTs: 0,
    checkTimes: 0
  };
  // 锁妖塔水晶
  SamiraFight.yaoshou = {
    npcInfo: null,
    // 采集状态
    gatherStatus: false,
    // 超时时间
    gatherTimeoutTs: 0
  };
  // 当前进行的龙魂boss副本Id
  SamiraFight.currentLongHunZoneId = 0;
  // 交易
  SamiraFight.jiaoyi = {
    // 允许交易得时间
    allowTime: 0,
    // 交易开始时间
    startTime: 0,
    // 交易类型 1-发起 2-接收
    type: 1,
    // 目标用户
    targetUserId: '',
    targetUserName: ''
  };
  // 当前进行的魂环boss
  SamiraFight.currentHunhuanBoss = null;
  // 当前进行的历练任务
  SamiraFight.currentLilian = 0;
  SamiraFight.currentLilianBoss = null;
  // 三国小怪
  SamiraFight.sanguoXiaoguaiMapId = 0;
  SamiraFight.sanguoXiaoguaiEndTs = 0;
  SamiraFight.sanguoXiaoguaiMeiriMapId = 0;
  // 三国小怪每日已经完成的地图
  SamiraFight.sanguoXiaoguaiMeiriComplateMapIds = [];
  // 3v3
  SamiraFight.a3v3 = {
    // 状态包括 submit, match, fight, fail, end
    status: ''
  };

  // 开启内挂
  SamiraFight.start = function () {
    if (SamiraFight.running != true) {
      clearInterval(SamiraFight.autoOpenTimer);
      $('.samira-status').text('运行中');
      SamiraFight.requestBoss();
      SamiraFight.running = true;
      SamiraFight.currentStatus = 'search';
      console.log('[samira]内挂已开启, 当前状态: search');
      Laya.workerTimer.loop(1000, SamiraFight, com.modules.map.model.auto.SamiraFight.requestBoss);
      Laya.workerTimer.loop(10000, SamiraFight, com.modules.map.model.auto.SamiraFight.requestXiuLuoBoss);
      Laya.workerTimer.loop(1000, SamiraFight, com.modules.map.model.auto.SamiraFight.update);
    }
  };

  // 关闭内挂
  SamiraFight.stop = function () {
    SamiraFight.running = false;
    clearInterval(SamiraFight.autoOpenTimer);
    SamiraFight.currentStatus = '';
    SamiraFight.currentBoss = null;
    SamiraFight.currentcheckTimes = 0;
    SamiraFight.currentXiuLuoCengshu = -1;
    $('.samira-status').text('未运行');
    $('.samira-current-task').text('无');
    $('.samira-current-boss').text('无');
    Laya.workerTimer.clear(SamiraFight, com.modules.map.model.auto.SamiraFight.requestBoss);
    Laya.workerTimer.clear(SamiraFight, com.modules.map.model.auto.SamiraFight.update);
    Laya.workerTimer.clear(SamiraFight, com.modules.map.model.auto.SamiraFight.requestXiuLuoBoss);
    // 关闭自动历练任务
    TaskAuto.isAutoLilian = false;
    SamiraFight.currentLilian = 0;
    SamiraFight.currentLilianBoss = null;
  };

  // 自动开启
  SamiraFight.autoStart = function () { 
    SamiraFight.autoOpenTimer = setInterval(() => {
      SamiraFight.autoOpenTime -= 1;
      $('.samira-status').text(SamiraFight.autoOpenTime + '秒后自动开启');
      if (SamiraFight.autoOpenTime <= 0) {
        clearInterval(SamiraFight.autoOpenTimer);
        $('.samira-settings').hide();
        SamiraFight.start();
      }
    }, 1000);
  };

  // 自动复活timer
  SamiraFight.reviveTimer = function () {
    // 从UI加载配置
    SamiraFight.getConfigFromUI();

    // 自动复活
    if (com.App.role._isDead && SamiraFight.config.autoRevive == '1') {
      console.log('[samira]角色已死亡, 正在复活...');
      var reviewPanel = com.game.core.panel.PanelManager._panelDict.RevivePanel;
      if (!reviewPanel) {
        return;
      }
      var revType = com.game.core.panel.PanelManager._panelDict.RevivePanel._rev_type;
      var type;
      if (!revType) {
        return;
      }
      if (revType == 1 || revType == 3) {
        type = 1;
      } else if (revType == 4 || revType == 6) {
        type = 4;
      } else if (revType == 16) {
        type = 16;
      } else if (revType == 32 || revType == 34) {
        type = 32;
      } else if (revType == 130) {
        type = 128;
      }

      if (revType == 6) {
        com.logic.connect.sender.ReviveComandSender.sendLocalReviveMessage(2, 0);
      } else {
        com.logic.connect.sender.ReviveComandSender.sendLocalReviveMessage(type);
      }
      window.setTimeout(() => {
        com.App.openAutoFight();
      }, 1500);
    }
  };

  // 公共功能timer, 每秒执行一次
  SamiraFight.commonTimerFunction = function () {
    console.log('[samira]commonTimer', SamiraFight.config);
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const secende = new Date().getSeconds();

    // 时间如果是11点, 16点, 21点, 自动开启boss伤害统计
    if (hours == 11 || hours == 16 || hours == 21) {
      SamiraFight.startKuafuBossHp();
    } else {
      SamiraFight.stopKuafuBossHp();
    }

    // 每天0点清空三国每日
    if (hours == 0 && minutes <= 1) {
      SamiraFight.sanguoXiaoguaiMeiriComplateMapIds = [];
    }

    // 追杀别人
    if (secende % 2 === 0 && SamiraFight.config.track == '1') { 
      com.logic.connect.sender.BossCommandSender.sendC2S_AliveWildBossMessage(SamiraFight.getCanIntoMapIds(), 0, false);
    }

    SamiraFight.autoRichang();
    SamiraFight.autoYuanshenUp();
    SamiraFight.autoZhuansheng();
    SamiraFight.autoYanglegeyang();
    SamiraFight.autoFree10();
    SamiraFight.autoWear();
    SamiraFight.autoUse();
    SamiraFight.autoZuoqi();
    SamiraFight.hhqf();
    SamiraFight.hhgm();
    SamiraFight.autoNeigong();
    SamiraFight.autoGubao();
    SamiraFight.autoShenlu();
    SamiraFight.autoRonglian();
    SamiraFight.autoOpenRedpacket();
    SamiraFight.autoDuanzao();
    SamiraFight.autoJunzhuang();
    SamiraFight.denglujiangli();
    SamiraFight.tiantianzanzhu();
    SamiraFight.meirizhigou();
    SamiraFight.zaixianjiangli();
    SamiraFight.fangcangku();
    SamiraFight.meirixiangou();
    SamiraFight.autoNewPlayer();
  };

  // 自动处理新玩家模式
  SamiraFight.autoNewPlayer = function () { 
    if (SamiraFight.config.newPlayer != '1') { 
      return;
    }

    const level = com.App.role.level;
    const name = com.App.role.name || '';
    if (!name.includes('元风涵容')) {
      return;
    }

    if (level >= 1000) {
      return;
    }

    const secende = new Date().getSeconds();

    // 领取自动回收
    if (com.logic.data.activity.ActivityCenter.getData(3382).playerStates === 1) {
      com.logic.connect.sender.ActivitiesCommandSender.C2S_JoinActivityById(3382);
    }

    // 开启自动回收
    if (secende % 10 == 0) {
      com.logic.data.item.HuishouCenter.isAutoHuishou = true;
    }

    // 自动熔炼装备
    try {
      if (secende == 30) {
        const bags = com.logic.data.item.BagItemCenter.itemList;
        const datas = [];
        for (const item of bags) {
          if (!item) continue;
          const ebean = item.getEquipDataBean();
          if (ebean && ebean.q_smelt_reward) {
            datas.push(item);
          }
        }
  
        const ids = [];
        for (var item of datas) {
          if (!item) continue;
          ids.push(netease.protobuf.Int64.parseInt64(item.id));
        }
  
        if (ids.length > 0) {
          com.logic.data.item.HuishouCenter.sendC2S_EquipHuiShouMessage(ids, 1, 1);
        }
      }
    } catch (e) {
      console.log('[samira]自动熔炼装备失败', e);
    }

    // 自动回收
    try {
      if (secende % 3 == 0) { 
        com.logic.data.item.HuishouCenter.updateHuishouGou()
        var items = com.logic.data.item.BagItemCenter.itemList;
        var ids = [];
        for(const item of items) {
          if (item != null && com.logic.data.item.HuishouCenter.huishouItemDict[item.id]) {
                ids.push(netease.protobuf.Int64.parseInt64(item.id));
            }
        }
        com.logic.data.item.HuishouCenter.huishouItemDict={};
        com.logic.data.item.HuishouCenter.sendC2S_EquipHuiShouMessage(ids);
      }
    } catch (e) {
      console.log('[samira]自动回收失败', e);
    }

    // 自动领取VIP
    try { 
      VipCommandSender.sendC2S_VipInfoMessage();
      for (let level = 1; level <= 9; level++) { 
        if (com.modules.vip.VipCenter.hasVipRed(level)) { 
          com.logic.connect.sender.VipCommandSender.sendC2S_getVipLvRewardMessage(level, 1);
        }
      }
    } catch (e) { 
      console.log('[samira]自动领取VIP失败', e);
    }

    // 自动元神殿升级
    try {
      const bean = com.App.dataMgr.q_shenjiContainer.getDataBean(com.modules.role.shenshi.ShenShiCenter.getData(22) ? com.modules.role.shenshi.ShenShiCenter.getData(22).modelId : 22 * 10000, false);
      const cost = JSON.parse(bean.q_choose_item).find(x => x.id == -90);
      const num = cost.num;
      const have = com.logic.data.item.BagItemCenter.getItemCount(-90);
      if (have >= num && have > 5000) { 
        com.modules.role.shenshi.ShenShiCenter.sendC2S_ShenjiUpgradeMessage(bean.q_id)
      }
    } catch (e) {
      console.log('[samira]自动元神殿升级失败', e);
    }

    // 召唤第二元神
    try {
      const bean = com.modules.role.shenshi.ShenShiCenter.getData(22);
      const level = bean ? bean.level : 0;
      if (level >= 30) {
        if(!FunctionManager.isFunctionOpen(44)) {
          FunctionManager.c2s_openFunction(44);
        }
      }
    } catch (e) {
      console.log('[samira]召唤第二元神失败', e);
    }

    // 传世宝物
    try {
      // 发送请求
      if (secende % 5 == 0) {
        com.logic.connect.sender.BossCommandSender.sendC2S_AliveWildBossMessage([160001], 0, false);
      }
      // 升级
      if (secende % 55 == 0) { 
        const items = com.modules.treasure.data.TreasureCenter.getList();
        for (const item of items) { 
          const parts = item.parts || [];
          for (const part of parts) {
            com.modules.treasure.data.TreasureCenter.sendC2S_ArtifactDebrisMessage(item.id, part);
          }
          com.modules.treasure.data.TreasureCenter.sendC2S_ArtifactDebrisMessage(item.id);
        }
      }
    } catch (e) { 
      console.log('[samira]自动传世宝物失败', e);
    }

    // boss悬赏
    try {
      const tasks = com.App.dataMgr.q_taskBranchContainer.getTaskList(68);
      for (const task of tasks) {
        if (!task) {
          continue;
        }
        const info = com.logic.data.task.TaskModel.getTaskData(task.q_id);
        if (!info) {
          continue;
        }

        if (info.taskState >= 2) {
          TaskCommandSender.finishTask(info);
        }
      }
    } catch (e) {
      console.log('[samira]自动boss悬赏失败', e);
    }

    // 自动购买龙魂
    try {
      const buyItems = ['龙魂之晶'];
      var shops = com.logic.data.shop.MallCenter.getShopItemInfos(23, 1, true);
      if (!shops) {
        com.logic.connect.sender.ShopCommandSender.sendRequestShopListMessage(23);
      }
      for (const shop of shops) { 
        const shopItem = com.App.dataMgr.q_shopContainer.list.find(x => x.q_id == shop.sellId);
        const shopActualId = JSON.parse(shopItem.q_actual_item)[0].id;
        const item = com.App.dataMgr.q_itemContainer.list.find(x => x.q_id == shopActualId);
        if (buyItems.includes(item.q_name)) { 
          if (shop.remainNum <= 0) { 
            continue;
          }
          const ctype = shopItem.q_currency_type;
          const price = shopItem.q_price;
          const has = com.logic.data.MoneyCenter.getMoney(ctype);
          if (has >= price) { 
            ItemBuyManager.buy(shopItem, 1,false,1120000,price,23);
          }
        }
      }
    } catch (e) {
      console.log('[samira]自动购买龙魂失败', e);
    }

    // 自动合成龙魂
    try {
      // 是否开启
      if (FunctionManager.isFunctionOpen(101)) {
        const dataProviders = com.modules.longhun.data.LongHunCenter.getDataProvider();
        const items = dataProviders.filter(x => x.redPoint);
        if (items.length > 0) {
          const item = items[0];
          const equip = item.costs[0];
          if (com.game.core.components.utils.ItemUtil.isEquip(equip.itemId)) { 
            var bagItem = BagItemCenter.getItemById(equip.itemId);
						if(!bagItem){
							bagItem = WearEquipCenter.getEquipByItemId(equip.itemId);
            }
            if (bagItem) {
              com.modules.duanzao.DuanzaoServer.sendC2S_EquipFuseMessage(item.fuseId,[bagItem]);
            }
          } else {
            com.modules.duanzao.DuanzaoServer.sendC2S_EquipFuseMessage(item.fuseId)
          }
        }
      };
    } catch (e) { 
      console.log('[samira]自动合成龙魂失败', e);
    }

    // 自动使用
    try {
      const items = com.logic.data.item.BagItemCenter.itemList;
      for (const item of items) {
        if (!item) {
          continue;
        }
        const goodsInfo = com.App.dataMgr.q_itemContainer.list.find(x => x.q_id == item.itemId);
        if (goodsInfo && (['背包扩展卡'].includes(goodsInfo.q_name) || goodsInfo.q_name.includes('元充值卡') || goodsInfo.q_name == '钻石' || goodsInfo.q_name.includes('装备自动回收'))) {
          com.logic.manager.ItemUseManager.useItemByItemId(item.id, item.count);
        }
      }
    } catch (e) {
      console.log('[samira]自动使用失败', e);
    }

    // 转生福利
    try {
      const items = com.logic.data.activity.ActivityUtil.getOpenList(1260, 4);
      for (const item of items) {
        if (item.playerStates == 1) {
          com.logic.connect.sender.ActivitiesCommandSender.C2S_JoinActivityById(item.id);
        }
      }
    } catch (e) {
      console.log('[samira]转生福利失败', e);
    }

    // 龙魂福利
    try {
      const items = com.logic.data.activity.ActivityUtil.getOpenList(1266, 4);
      for (const item of items) {
        if (item.playerStates == 1) {
          com.logic.connect.sender.ActivitiesCommandSender.C2S_JoinActivityById(item.id);
        }
      }
    } catch (e) {
      console.log('[samira]转生福利失败', e);
    }
    
    // 领取更新奖励
    try {
      com.logic.connect.sender.ActivitiesCommandSender.sendC2S_GetGameUpdateRewardMessage();
    } catch (e) {
      console.log('[samira]领取更新奖励失败', e);
    }

    // 任务
    try {
      const mainTask = com.logic.data.task.TaskModel.mainTask;
      let isFinish = mainTask.taskState >= 2;
      let isCanFinish = false;
      const condition = mainTask.getConditionData();
      if (condition && condition.conditionObj && condition.conditionObj.clienttype == '1') {
        const zxTask = com.logic.data.task.TaskModel.getTaskData(parseInt(condition.conditionObj.taskid));
        if (zxTask && zxTask.taskState >= 2) { 
          isCanFinish = true;
        }
      }
      console.log(111111, '任务id:' + mainTask.taskID, '任务状态:' + mainTask.taskState, '是否完成:' + isFinish, '是否可以完成:' + isCanFinish);
      if (mainTask) { 
        // 小试牛刀1
        if (mainTask.taskID == 10161) {
          if (!isFinish) {
            SamiraFight.tp(160002)
          }
        }
        // 小试牛刀2
        else if (mainTask.taskID == 10181) {
          if (!isFinish) {
            SamiraFight.tp(160003)
          }
        }
        // 强敌试炼
        else if (mainTask.taskID == 10211) {
          if (!isFinish) {
            SamiraFight.tp(160004)
          }
        }
        // 召唤第一元神
        else if (mainTask.taskID == 10231) {
          if (!isFinish) {
            FunctionManager.c2s_openFunction(46);
          }
        }
        // vip
        else if (mainTask.taskID == 10051) { 
          if (isFinish) {
            console.log('[samira]任务完成, 去找npc2004');
            if (secende % 30 == 0) {
              com.logic.manager.TransferManager.transferToNPC(2004);
            }
          }
        }
        // 胆量历练
        else if (mainTask.taskID == 10061) {
          if (isFinish) {
            console.log('[samira]任务10061完成, 去找npc2024');
            if (secende % 30 == 0) {
              com.logic.manager.TransferManager.transferToNPC(2024)
            }
          } else {
            // 开启自动攻击
            com.App.openAutoFight();
          }
        }
        // 探索尸王殿
        else if (mainTask.taskID == 10071) {
          if (!isFinish) {
            SamiraFight.tp(160001)
          } else {
            console.log('[samira]任务10071完成, 去找npc2025');
            if (secende % 30 == 0) {
              com.logic.manager.TransferManager.transferToNPC(2025)
            }
          }
        }
        // 元神传说
        else if (mainTask.taskID == 10081) {
          if (secende % 20 == 0) {
            com.logic.manager.TransferManager.transferToNPC(2039)
          }
        }
        // 随机和回城
        else if (mainTask.taskID == 10091) {
          if (secende % 20 == 0) {
            com.logic.manager.TransferManager.transferToNPC(2051)
          }
        }
        // 探访元神殿
        else if (mainTask.taskID == 10101) {
          if (secende % 20 == 0) {
            com.logic.manager.TransferManager.transferToNPC(2168)
          }
        }
        // 元神殿·壹
        else if (mainTask.taskID == 10111) {
          if (secende % 20 == 0) {
            com.logic.manager.TransferManager.transferToNPC(2040)
          }
        }
        // 中州买药
        else if (mainTask.taskID == 10121) {
          if (secende % 20 == 0) {
            com.logic.manager.TransferManager.transferToNPC(2047)
          }
        }
        // 购买药品
        else if (mainTask.taskID == 10131) {
          if (isFinish) {
            if (secende % 20 == 0) {
              com.logic.manager.TransferManager.transferToNPC(2049);
            }
          } else {
            var shops = com.logic.data.shop.MallCenter.getShopItemInfos(1, 5, true);
            if (shops.length > 0) {
              const shopItem = com.App.dataMgr.q_shopContainer.list.find(x => x.q_id == shops[0].sellId);
              ItemBuyManager.buy(shopItem, 1,false, 1120000, shopItem.q_price,1);
            }
          }
        }
        // 药品说明
        else if (mainTask.taskID == 10141) {
          if (secende % 20 == 0) {
            com.logic.manager.TransferManager.transferToNPC(2037)
          }
        }
        // 装备回收
        else if (mainTask.taskID == 10271) {
          if (isFinish) {
            if (secende % 20 == 0) {
              com.logic.manager.TransferManager.transferToNPC(2046)
            }
          }
        }
        // 装备回收
        else if (mainTask.taskID == 10281) {
          if (isFinish) {
            if (secende % 20 == 0) {
              com.logic.manager.TransferManager.transferToNPC(2010);
            }
          }
        }
        // 加入行会
        else if (mainTask.taskID == 10291) {
          if (isFinish) {
            if (secende % 30 == 0) {
              com.logic.manager.TransferManager.transferToNPC(2107);
            }
          }
        }
        // 怀旧沙巴克
        else if (mainTask.taskID == 10301) {
          if (!isFinish) {
            if (com.App.role.mapId != 88004) {
              com.logic.connect.sender.ZoneCommandSender.enterZoneMap(88004);
            }
          } else {
            if (secende % 20 == 0) {
              com.modules.track.TrackPanel._instance._trackDic['1']._task._itemDic['1'].onClick({currentTarget: {}})
            }
          }
        }
        // 传世之路
        else if ([10241, 10251, 10261, 10321, 10331, 10351, 10361, 10381, 10391].includes(mainTask.taskID)) { 
          const mapId = {
            10241: 160005,
            10251: 160008,
            10261: 160011,
            10321: 160014,
            10331: 160016,
            10351: 160018,
            10361: 160020,
            10381: 80201,
            10391: 80202,
          };

          if (isFinish) {
            if (secende % 30 == 0) {
              com.logic.manager.TransferManager.transferToNPC(2070)
            }
          } else {
            if (isCanFinish) {
              // 完成任务
              com.logic.connect.sender.TaskCommandSender.finishTask(com.logic.data.task.TaskModel.fengmo);
            } else {
              const mid = mapId[mainTask.taskID];
              if (mid != 0) {
                SamiraFight.tp(mid)
              }
            }
          }
        }
        // 自动挂机了
        else if(mainTask.taskID > 10391){
          if (secende % 30 == 0) { 
            const mapIds = [
              // 炼狱魔境
              80203,
              80204,
              80205,
              80206,
              // boss之家
              80001,
              80002,
              80003,
              80004,
              80005,
              // 等级
              160025,
              160024,
              160023,
              160022,
            ].sort(() => Math.random() - 0.5);

            if (!NeiGuaFight._isRuning) {
              NeiGuaFight.setSaveMapIds(mapIds);
              if(NeiGuaFight.updateMapIds()){
                NeiGuaFight.start(true);
              }
            }
          }
        }
      }
    } catch (e) {
      console.log('[samira]自动主线任务失败', e);
    }
  };

  // 获取可以进入的地图
  SamiraFight.getCanIntoMapIds = function () { 
    const mapIds = [
      // 上古禁地
      ...SamiraFight.getCanIntoShangguBossMapIds(),
      // 三国地图
      ...SamiraFight.getCanIntoSanguoMapIds(),
      // 战骑祭坛
      ...SamiraFight.getCanIntoZhanqiBossMapIds()
    ];

    return mapIds;
  };

  // 每日限购
  SamiraFight.meirixiangou = function () { 
    const buyItems = SamiraFight.config.meirixiangouwupin || [];
    if (buyItems.length == 0) { 
      return;
    }
    if (SamiraFight.config.meirixiangou != '1') { 
      return;
    }
    var shops = com.logic.data.shop.MallCenter.getShopItemInfos(23, 1, true);
    if (!shops) {
      com.logic.connect.sender.ShopCommandSender.sendRequestShopListMessage(23);
    }
    for (const shop of shops) { 
      const shopItem = com.App.dataMgr.q_shopContainer.list.find(x => x.q_id == shop.sellId);
      const shopActualId = JSON.parse(shopItem.q_actual_item)[0].id;
      const item = com.App.dataMgr.q_itemContainer.list.find(x => x.q_id == shopActualId);
      if (buyItems.includes(item.q_name)) { 
        if (shop.remainNum <= 0) { 
          continue;
        }
        const ctype = shopItem.q_currency_type;
        const price = shopItem.q_price;
        const has = com.logic.data.MoneyCenter.getMoney(ctype);
        if (has >= price) { 
          ItemBuyManager.buy(shopItem, 1,false,1120000,price,23);
        }
      }
    }
  };

  // 物品放仓库
  SamiraFight.fangcangku = function () { 
    // 获取分钟数
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();
    const allowItems = SamiraFight.config.fangcangkuwupin || [];
    if (seconds % 3 == 0 && SamiraFight.config.fangcangku == '1' && allowItems.length > 0) { 
      const bagItems = com.logic.data.item.BagItemCenter.itemList.filter(x => x);
      for (const item of bagItems) { 
        if (!item) { 
          continue;
        }
        const goods = com.App.dataMgr.q_itemContainer.list.find(x => x.q_id == item.itemId);
        if (!goods) { 
          continue;
        }
        let allow = false;
        for(const name of allowItems) { 
          if (goods.q_name.includes(name)) { 
            allow = true;
            break;
          }
        }
        // 放入仓库
        if (allow) { 
          com.logic.connect.sender.ItemCommandSender.sendToDepot(item);
        }
      }
    }

    if (seconds % 10 == 0) {
      com.logic.connect.sender.ItemCommandSender.sendClearUpGoodsMessage(2);
    }
  };

  // 天天赞助
  SamiraFight.tiantianzanzhu = function () { 
    if (SamiraFight.config.tiantianzanzhu == '1') {
      const acts = com.logic.data.activity.ActivityUtil.getOpenList(293, 4);
      const act = acts.find(x => x.playerStates == 1);
      if (act) { 
        com.logic.connect.sender.ActivitiesCommandSender.C2S_JoinActivityById(act.id);
      }
    }
  };

  // 每日直购
  SamiraFight.meirizhigou = function () { 
    if (SamiraFight.config.meirizhigou == '1') {
      const acts = com.logic.data.activity.ActivityUtil.getOpenList(216, 4);
      const act = acts.find(x => x.playerStates == 1);
      if (act) { 
        com.logic.connect.sender.ActivitiesCommandSender.C2S_JoinActivityById(act.id);
      }
    }
  };

  // 在线奖励
  SamiraFight.zaixianjiangli = function () { 
    if (SamiraFight.config.zaixianjiangli == '1') {
      const acts = com.logic.data.activity.ActivityUtil.getOpenList(115, 4);
      const act = acts.find(x => x.playerStates == 1);
      if (act) { 
        com.logic.connect.sender.ActivitiesCommandSender.C2S_JoinActivityById(act.id);
      }
    }
  };

  // 登录奖励
  SamiraFight.denglujiangli = function () { 
    if (SamiraFight.config.dljiangli == '1') {
      const acts = com.logic.data.activity.ActivityUtil.getOpenList(9, 4);
      const act = acts.find(x => x.playerStates == 1);
      if (act) { 
        com.logic.connect.sender.ActivitiesCommandSender.C2S_JoinActivityById(act.id);
      }
    }
  };

  // 自动升级军装
  SamiraFight.autoJunzhuang = function () {
    if (SamiraFight.config.autoJunzhuang != '1') {
      return;
    }

    const parts = com.modules.role.junxian.data.JunZhuangCenter.parts;
    let minLevel = 999999;
    let minPart = 0;
    for (const part of parts) {
      const equip = com.logic.data.item.WearEquipCenter.getEquipByPart(part);
      if (!equip) {
        continue;
      }
      const level = com.logic.data.item.EquipPartCenter.getPartQiangHuaLevel(part, 10);
      const beanId = com.modules.duanzao.EnumDuanzao.getQiangHuaNewID(3, level);
      const bean = com.App.dataMgr.q_equip_qianghua_newContainer.getDataBean(beanId);
      if (bean && bean.q_next_id != 0) {
        if (level < minLevel) {
          minLevel = level;
          minPart = part;
        }
      }
    }

    if (minLevel != 999999 && minPart != 0) {
      const level = com.logic.data.item.EquipPartCenter.getPartQiangHuaLevel(minPart, 10);
      const beanId = com.modules.duanzao.EnumDuanzao.getQiangHuaNewID(3, level);
      const bean = com.App.dataMgr.q_equip_qianghua_newContainer.getDataBean(beanId);
      if (bean && bean.q_next_id != 0) {
        const next = com.App.dataMgr.q_equip_qianghua_newContainer.getDataBean(bean.q_next_id);
        if (next) {
          const cost = JSON.parse(next.q_cost_qianghua)[0];
          const costNum = cost.num;
          const costId = cost.id;
          const count = com.logic.data.item.BagItemCenter.getItemCount(costId);
          if (count >= costNum) {
            DuanzaoServer.sendC2S_Qianghua2ItemMessage(minPart, 0, 10);
            return;
          }
        }
      }
    }
  };

  // 自动锻造
  SamiraFight.autoDuanzao = function () {
    // 强化
    {
      const partItems = [com.logic.enum.EnumEquipType.shenshi_parts, com.logic.enum.EnumEquipType.qianghua_parts];
      for (const parts of partItems) {
        let minLevel = 999999,
          minPart = 0;
        for (const part of parts) {
          // 判断当前部位是否穿装备
          const equip = com.logic.data.item.WearEquipCenter.getEquipByPart(part);
          if (!equip) {
            continue;
          }
          const level = com.logic.data.item.EquipPartCenter.getPartInfo(part).getQianghuaLevel(10);
          if (level < minLevel) {
            minLevel = level;
            minPart = part;
          }
        }
        if (minLevel != 999999 && minPart != 0) {
          const isShenshi = !parts.includes(50000);
          const bean = com.App.dataMgr.q_equip_qianghua_newContainer.getDataBean(isShenshi ? 10000 + minLevel : minLevel, false);
          if (bean && bean.q_next_id != 0) {
            const next = com.App.dataMgr.q_equip_qianghua_newContainer.getDataBean(bean.q_next_id, false);
            if (next) {
              const cost = JSON.parse(next.q_cost_qianghua)[0];
              const costNum = cost.num;
              const costId = cost.id;
              const count = com.logic.data.item.BagItemCenter.getItemCount(costId);
              if (count >= costNum) {
                DuanzaoServer.sendC2S_Qianghua2ItemMessage(minPart, 0, 10);
                return;
              }
            }
          }
        }
      }
    }
    // 精炼
    {
      const parts = [...com.logic.enum.EnumEquipType.qianghua_parts, ...com.logic.enum.EnumEquipType.shenshi_parts];
      for (const part of parts) {
        const equip = com.logic.data.item.WearEquipCenter.getEquipByPart(part);
        if (!equip) {
          continue;
        }
        const level = com.logic.data.item.EquipPartCenter.getPartInfo(part).getQianghuaLevel(11);
        const bean = com.App.dataMgr.q_equip_jinglianContainer.list.find(x => x.q_equipPos == part);
        if (bean.q_maxlv != level) {
          const cost = JSON.parse(bean.q_cost_jinglian)[0];
          const costNum = cost.num;
          const costId = cost.id;
          const count = com.logic.data.item.BagItemCenter.getItemCount(costId);
          if (count >= costNum) {
            DuanzaoServer.sendC2S_Qianghua2ItemMessage(part, 0, 11);
            return;
          }
        }
      }
    }
  };

  // 自动打开红包
  SamiraFight.autoOpenRedpacket = function () {
    // 开启功能并且有体力
    if (SamiraFight.config.redpack == '1' && com.logic.data.zone.boss.BossDataCenter.instance.getTiliNum(184) > 0) {
      const list = com.modules.activity.flower.HongbaoCenter.list.filter(x => x.canGet == 1);
      let max = -1;
      let maxItem = null;
      for (const item of list) {
        let sum = 0;
        for (const log of item.logs) {
          sum += log.money;
        }
        const avg = item.logs.length == 0 ? 0 : sum / item.logs.length;
        if (avg > max) {
          max = avg;
          maxItem = item;
        }
      }

      if (maxItem) {
        var id = maxItem.id.toString();
        ActivitiesCommandSender.sendC2S_HongbaoOpenMessage(Int64.parseInt64(id), App.role.personId);
      }
    }
  };

  // 自动熔炼
  SamiraFight.autoRonglian = function () {
    if (SamiraFight.config.autoRonglian != '1') {
      return;
    }

    // 获取分钟数
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();

    if (minutes % 2 == 0 && seconds == 30) {
      const bags = com.logic.data.item.BagItemCenter.itemList;
      const datas = [];
      for (const item of bags) {
        if (!item) continue;
        const ebean = item.getEquipDataBean();
        if (ebean && ebean.q_smelt_reward) {
          datas.push(item);
        }
      }

      const ids = [];
      const job = com.App.role.job;
      const sex = com.App.role.sex;
      const isSex = com.logic.data.item.HuishouCenter.isRLOtherSex;
      for (var item of datas) {
        if (!item) continue;
        const bean = item.getDataBean();
        // 如果性别不符合, 就熔炼
        if (bean.q_sex != 0 && bean.q_sex != sex && bean.q_job == job) {
          if (isSex) {
            ids.push(netease.protobuf.Int64.parseInt64(item.id));
            continue;
          }
        }

        // 如果职业不对，并且是绑定的，就熔炼
        if (bean.q_job != 0 && bean.q_job != job && item.isbind) {
          ids.push(netease.protobuf.Int64.parseInt64(item.id));
          continue;
        }

        // 按照选择的职业和品质熔炼
        if (com.logic.data.item.HuishouCenter.isAutoSmeltByRank(bean.q_job, item.rank)) {
          ids.push(netease.protobuf.Int64.parseInt64(item.id));
        }
      }

      if (ids.length > 0) {
        com.logic.data.item.HuishouCenter.sendC2S_EquipHuiShouMessage(ids, 1, 1);
      }
    }
  };

  // 自动神炉升级
  SamiraFight.autoShenlu = function () {
    if (SamiraFight.config.autoShenlu != '1') {
      return;
    }

    const types = com.modules.shenLu.ShenLuCenter.SHENLU_TYPES;
    for (const type of types) {
      const data = com.modules.shenLu.ShenLuCenter.getData(type);
      const bean = data ? data.bean : null;
      // 数据不存在
      if (!data || !bean) {
        continue;
      }
      // 未激活
      if (!data.activate) {
        continue;
      }

      // 升级
      const cost = JSON.parse(bean.q_cost)[0];
      const costId = cost.id;
      const costNum = cost.num;
      const have = com.logic.data.item.BagItemCenter.getItemCount(costId);
      if (have >= costNum) {
        com.modules.shenLu.ShenLuCenter.sendC2S_BloodActiveMessage(type, 2);
        return;
      }

      // 被动技能升级
      const skill = (data.passiveBeanList || []).find(x => x.q_id === bean.q_passive);
      if (!skill) {
        return;
      }
      const nextSkill = (data.passiveBeanList || []).find(x => x.q_id === skill.q_next_id);
    }
  };

  // 自动古宝升级/激活
  SamiraFight.autoGubao = function () {
    if (SamiraFight.config.autoGubao != '1') {
      return;
    }

    // 获取古宝数据
    const data = com.App.dataMgr.q_globalContainer.map[15156] || {};
    const types = JSON.parse(data.q_string_value).tabs_type || [];

    // 古宝升级
    (function () {
      for (const type of types) {
        if (com.modules.gubao.GubaoCenter.isAllActive(type) && com.modules.gubao.GubaoCenter.isGubaoUP(type)) {
          com.modules.gubao.GubaoCenter.sendC2S_GubaoActivationMessage(type, 1, 1);
          return;
        }
      }
    })();

    // 古宝激活
    (function () {
      for (const type of types) {
        // 判断是否全部激活
        if (com.modules.gubao.GubaoCenter.isAllActive(type)) {
          continue;
        }

        // 获取小件
        const items = com.App.dataMgr.q_gubaoContainer.getBeans(type).slice(1);
        for (const item of items) {
          if (com.modules.gubao.GubaoCenter.isActive(item.q_id)) {
            continue;
          }

          // 判断有没有材料, 如果有就激活
          const cost = JSON.parse(item.q_open_cost)[0];
          const costId = cost.id;
          const costNum = cost.num;
          const have = com.logic.data.item.BagItemCenter.getItemCount(costId);
          if (have >= costNum) {
            com.modules.gubao.GubaoCenter.sendC2S_GubaoActivationMessage(item.q_id);
            return;
          }
        }
      }
    })();
  };

  // 内功任务/升级
  SamiraFight.autoNeigong = function () {
    if (SamiraFight.config.autoNeigong != '1') {
      return;
    }

    // 内功任务
    (function () {
      const times = SamiraFight.getNeigongTimes();

      // 没有次数了
      if (times <= 0) {
        return;
      }

      const bean = com.App.dataMgr.q_shopContainer.getDataBean(371003);
      if (!bean) {
        return;
      }

      if (ConditionUtil.isItemEnoughJson(bean.q_consume)) {
        ItemBuyManager.buy(bean, 1, bean.q_quickPurchaseUse == 1, 0, bean.q_price, bean.q_shop_type, 0);
      }
    })();

    (function () {
      const data = com.modules.role.neigong.NeiGongCenter.getData();
      const bean = data ? data.bean : null;
      if (!bean) {
        return;
      }
      const cost = JSON.parse(bean.q_cost)[0];
      const costId = cost.id;
      const costNum = cost.num;
      const have = com.logic.data.item.BagItemCenter.getItemCount(costId);
      if (have >= costNum) {
        ShenLuCenter.sendC2S_BloodActiveMessage(6, 1);
      }
    })();
  };

  // 获取内功次数
  SamiraFight.getNeigongTimes = function () {
    const data = com.App.dataMgr.q_globalContainer.getDataBean(15104);
    if (!data) {
      return 0;
    }
    const ids = JSON.parse(data.q_string_value);
    let times = -1;
    for (const id of ids) {
      const info = com.logic.data.shop.MallCenter.getShopItem(1, id);
      if (info) {
        if (times == -1 || times > info.remainNum) {
          times = info.remainNum;
        }
      }
    }

    // 没有次数了
    if (times <= 0) {
      times = 0;
    }

    return times;
  };

  // 行会购买
  SamiraFight.hhgm = function () {
    const names = (SamiraFight.config.hhgm || '').split('|').map(x => x.trim());
    const goods = com.logic.data.shop.MallCenter.getShopItemInfos(12) || [];

    for (const name of names) {
      for (const g of goods) {
        const shopItem = com.App.dataMgr.q_shopContainer.list.find(x => x.q_id == g.sellId);
        const shopActualId = JSON.parse(shopItem.q_actual_item)[0].id;
        const item = com.App.dataMgr.q_itemContainer.list.find(x => x.q_id == shopActualId);
        const need = g.dynamicShopBuyPrice;
        if (item.q_name === name) {
          // 没有购买次数
          if (g.remainNum <= 0) {
            continue;
          }

          if (need <= com.logic.data.MoneyCenter.getMoney(-31)) {
            ItemBuyManager.buy(shopItem, 1, false, 1120000, need, 12, 0);
          }
        }
      }
    }
  };

  // 行会祈福
  SamiraFight.hhqf = function () {
    // 先获取数据
    if (!GuildQifuCenter.isHasData) {
      GuildQifuCenter.sendC2S_GetGuildCliffordInfoMessage();
      return;
    }

    const types = (SamiraFight.config.hhqf || '')
      .split('|')
      .map(x => x.trim())
      .filter(x => ['1', '2', '3', '4'].includes(x))
      .map(x => parseInt(x));
    for (const type of types) {
      const bean = App.dataMgr.q_building_juanxianContainer.getDataBean(type, false);
      if (bean) {
        const info = GuildQifuCenter.getInfo(type);
        if (info) {
          if (info.cliffordTimes < bean.q_times) {
            if (GuildQifuCenter.isFree(type)) {
              GuildQifuCenter.sendC2S_BuildDonateMessage(type);
              return;
            } else if (App.isMoneyEnoughJson(bean.q_currency_type)) {
              GuildQifuCenter.sendC2S_BuildDonateMessage(type);
              return;
            }
          }
        }
      }
    }

    // 领取活跃
    const total = com.logic.data.MoneyCenter.getMoney(-83);
    const tasks = com.logic.data.Q_globalCenter.getJsonData(525);
    for (let i = 0; i < tasks.length; i++) {
      // 判断你是不是可以领取
      const task = tasks[i];
      if (total >= task.active) {
        if (ByteUtils.readBit(GuildQifuCenter.record, i) == 0) {
          GuildQifuCenter.sendC2S_GuildQiandaoMessage(i);
        }
      }
    }
  };

  // 自动坐骑升级
  SamiraFight.autoZuoqi = function () {
    if (SamiraFight.config.autoZuoqi != '1') {
      return;
    }

    // 坐骑升阶
    const advance = AdvanceCenter.getData(1);
    if (advance && advance.bean) {
      const bean = advance.bean;
      const cost = JSON.parse(bean.q_levelup_consume.split(';')[advance.star])[0];
      const costId = cost.id;
      const costNum = cost.num;
      const have = com.logic.data.item.BagItemCenter.getItemCount(costId);
      if (have >= costNum) {
        AdvanceCommandSender.sendC2S_AdvanceUpgradeMessage(1);
      }
    }

    // 坐骑化形
    const items = com.App.dataMgr.q_mountContainer.mounts;
    for (const item of items) {
      const itemData = com.modules.zuoqi.ZuoQiCenter.getZuoqi(item.q_id);
      // 已激活
      if (itemData) {
        const currentLv = itemData.lv;
        if (currentLv >= item.q_max_lv) {
          continue;
        }
        var nextLvInfo = App.dataMgr.q_mountLvContainer.getDataBean(item.q_id + currentLv);
        if (nextLvInfo) {
          const costInfo = JSON.parse(nextLvInfo.q_levelup_consume)[0];
          const costItemId = costInfo.id;
          const costItemNum = costInfo.num;
          const have = com.logic.data.item.BagItemCenter.getItemCount(costItemId);
          if (have >= costItemNum) {
            HorseCommandSender.sendC2S_FaqiUpgradeMessage(item.q_id);
            return;
          }
        }
      }
      // 未激活
      else {
        const costInfo = JSON.parse(item.q_open_cost)[0];
        const costItemId = costInfo.id;
        const costItemNum = costInfo.num;
        const have = com.logic.data.item.BagItemCenter.getItemCount(costItemId);
        if (have >= costItemNum) {
          HorseCommandSender.sendC2S_jihuoInfoMessage(1, item.q_id);
          return;
        }
      }
    }
  };

  // 自动使用
  SamiraFight.autoUse = function () {
    if (SamiraFight.config.autoUse != '1') {
      return;
    }

    const canUserItems = [...com.logic.data.Q_globalCenter.getJsonData(15024), 881494];
    const items = com.logic.data.item.BagItemCenter.itemList;
    for (const item of items) {
      if (item && canUserItems.includes(item.itemId)) {
        com.logic.manager.ItemUseManager.useItemByItemId(item.id, item.count);
      }
    }
  };

  // 自动穿戴
  SamiraFight.autoWear = function () {
    if (SamiraFight.config.autoWear != '1') {
      return;
    }

    const items = com.logic.data.item.BagItemCenter.itemList;
    for (const item of items) {
      if (item && item.isBatterInBag() && ItemUtil.isCanUseByItemData(item, false) && item.getDataBean().q_client_type != 131) {
        com.logic.manager.ItemUseManager.useItemByItemId(item.id);
        return;
      }
    }
  };

  // 自动领取10元礼包
  SamiraFight.autoFree10 = function () {
    if (SamiraFight.config.autoFree10 != '1') {
      return;
    }
    const active = com.logic.data.activity.ActivityUtil.getOpenList(100, 4)[0];
    if (active && active.playerStates == 1) {
      com.logic.connect.sender.ActivitiesCommandSender.C2S_JoinActivityById(active.bean.q_id);
    }
  };

  // 自动领取日常
  SamiraFight.autoRichang = function () {
    if (SamiraFight.config.autoRichang != '1') {
      return;
    }

    // 获取所有任务, 每次一个
    const tasks = com.App.dataMgr.q_jitanContainer.getList();
    for (const task of tasks) {
      const taskData = com.logic.data.jitian.JitanCenter.getJiTianTaskData(task.q_id);
      if (taskData.rewardtimes < taskData.times) {
        com.modules.daily.DailyCenter.sendGetDailyAward(task.q_id);
        return;
      }
    }

    const ignoreIds = com.logic.data.jitian.JitanCenter.todayRewards;

    // 获取日常经验奖励
    const exp = com.logic.data.jitian.JitanCenter.currentJinduExp;
    const expTasks = com.modules.daily.DailyCenter.getJitanEverydayTypeArr(0);
    for (const task of expTasks) {
      if (exp >= task.q_needexp && !ignoreIds.includes(task.q_id)) {
        com.logic.connect.sender.JitianCommandSender.sendJitianReward(task.q_id);
        return;
      }
    }

    // 获取跨服日常经验奖励
    const expKuafuTasks = com.modules.daily.DailyCenter.getJitanEverydayTypeArr(1);
    const expKuafu = com.modules.daily.DailyCenter.rongyuDayValue;
    for (const task of expKuafuTasks) {
      if (expKuafu >= task.q_needexp && !ignoreIds.includes(task.q_id)) {
        com.logic.connect.sender.JitianCommandSender.sendJitianReward(task.q_id);
        return;
      }
    }

    // 获取跨服周常经验奖励
    const expWeekTasks = com.modules.daily.DailyCenter.getJitanEverydayTypeArr(2);
    const expWeek = com.modules.daily.DailyCenter.rongyuWeekValue;
    for (const task of expWeekTasks) {
      if (expWeek >= task.q_needexp && !ignoreIds.includes(task.q_id)) {
        com.logic.connect.sender.JitianCommandSender.sendJitianReward(task.q_id);
        return;
      }
    }
  };

  // 自动转生
  SamiraFight.autoZhuansheng = function () {
    if (SamiraFight.config.autoZhuansheng != '1') {
      return;
    }

    if (com.modules.role.zhuansheng.ZhuanShengCenter.upgradePoint) {
      com.modules.role.zhuansheng.ZhuanShengCenter.sendC2S_JingjieLvUpMessage();
    }
  };

  // 自动元神升级
  SamiraFight.autoYuanshenUp = function () {
    if (SamiraFight.config.autoYuanshenUp != '1') {
      return;
    }
    const indexs = [0, 1, 2];
    for (const index of indexs) {
      const bean = App.dataMgr.q_petContainer.petVec[index];
      const pet = com.modules.pet.PetCenter.getHuanshen(bean.q_pet_id);
      if (pet) {
        const curr = App.dataMgr.q_huanshen_lvContainer.getDataBean(bean.q_pettype * 10000 + pet.marsLevel);
        const needObj = JSON.parse(curr.q_need_item)[0];
        const itemId = needObj.id;
        const need = needObj.num;
        const have = com.logic.data.item.BagItemCenter.getItemCount(itemId);
        if (have >= need) {
          HuobanCommandSender.sendC2S_yuanshengUpgradeMessage(bean.q_pettype);
        }
      }
    }
  };

  // 自动羊了个羊
  SamiraFight.autoYanglegeyang = function () {
    if (SamiraFight.config.autoYlgy != '1') {
      return;
    }

    // 查询奖励次数
    SamiraFight.ylgy.checkTimes += 1;
    if (SamiraFight.ylgy.checkTimes >= 60) {
      com.modules.yanglegeyang.YangCenter.sendC2S_ClgsActionMessage(0, 0, 0);
    }

    // 检测有没有次数
    if (com.modules.yanglegeyang.YangCenter.chessData.rewardRemainTimes <= 0) {
      SamiraFight.ylgy = {
        level: 0,
        levelTs: 0,
        checkTimes: 0
      };
      return;
    }

    // 如果未开始, 就进入第一关
    if (SamiraFight.ylgy.level == 0) {
      SamiraFight.ylgy.level = 1;
      SamiraFight.ylgy.levelTs = Math.floor(Date.now() / 1000);
      com.modules.yanglegeyang.YangCenter.sendC2S_ClgsActionMessage(1, 1, 0);
    }
    // 如果当前在第一关, 并且时间超过5秒, 就进入第二关
    else if (SamiraFight.ylgy.level == 1) {
      if (Math.floor(Date.now() / 1000) - SamiraFight.ylgy.levelTs >= 5) {
        SamiraFight.ylgy.level = 2;
        SamiraFight.ylgy.levelTs = Math.floor(Date.now() / 1000);
        com.modules.yanglegeyang.YangCenter.sendC2S_ClgsActionMessage(1, 2, 0);
      }
    }
    // 如果当前在第二关, 并且时间超过300秒, 就领取奖励
    else if (SamiraFight.ylgy.level == 2) {
      if (Math.floor(Date.now() / 1000) - SamiraFight.ylgy.levelTs >= 300) {
        SamiraFight.ylgy.level = 3;
        SamiraFight.ylgy.levelTs = Math.floor(Date.now() / 1000);
        com.modules.yanglegeyang.YangCenter.sendC2S_ClgsActionMessage(3, 2, 0);
      }
    }
  };

  // 切换跨服boss血量监测状态
  SamiraFight.changeKuafuBossHpStatus = function () {
    if (SamiraFight.kuafuBossHpStatus) {
      SamiraFight.stopKuafuBossHp();
    } else {
      SamiraFight.startKuafuBossHp();
    }
  };

  // 开启跨服boss血量监测
  SamiraFight.startKuafuBossHp = function () {
    if (!SamiraFight.kuafuBossHpStatus) {
      SamiraFight.kuafuBossHpStatus = true;
      SamiraFight.kuafuBossHpDic = {};
      Laya.workerTimer.loop(1000, SamiraFight, com.modules.map.model.auto.SamiraFight.kuafuBossHpTimer);
    }
  };

  // 关闭跨服boss血量监测
  SamiraFight.stopKuafuBossHp = function () {
    if (SamiraFight.kuafuBossHpStatus) {
      SamiraFight.kuafuBossHpStatus = false;
      Laya.workerTimer.clear(SamiraFight, com.modules.map.model.auto.SamiraFight.kuafuBossHpTimer);
      $('.samira-hp-container').hide();
    }
  };

  // 跨服boss血量监测timer
  SamiraFight.kuafuBossHpTimer = function () {
    BossCommandSender.sendC2S_AliveWildBossMessage([SamiraFight.kuafuBossMapId], 0, false);
    const bosses = com.logic.data.zone.boss.BossDataCenter.instance.getBossListByMapId(SamiraFight.kuafuBossMapId, false).filter(x => x.bean.q_type === 8);
    SamiraFight.kuafuBossIds = bosses.map(x => x.monsterIn64Id);
    SamiraFight.kuafuBossData = bosses;
    let html = '';
    for (const boss of bosses) {
      const hp = boss.allHp == 0 ? '' : ((boss.curHp / boss.allHp) * 100).toFixed(0);
      const attact = SamiraFight.kuafuBossHpDic[boss.monsterIn64Id] || 0;
      const attact2 = boss.allHp == 0 ? '0.00' : ((attact / boss.allHp) * 100).toFixed(2);
      html += '<div style="white-space: nowrap;">' + boss.bean.q_name + ': ' + hp + '%(' + attact2 + '%)</div>';
    }
    if (bosses.length > 0) {
      $('.samira-hp-container').show();
      $('.samira-hp-items').html(html);
    } else {
      $('.samira-hp-container').hide();
    }
  };

  // 攻击结果消息
  SamiraFight.kuafuBossHpAttackResultMessage = function (cmd) {
    if (App.role == null) {
      return;
    }
    // 获取攻击人的id
    var attackerId = cmd.sourceId.toString();
    var attacker = com.App.mapModule.mapAvatarModel.getFightRoleData(attackerId);

    if (!attacker) {
      return;
    }

    // 攻击人是自己或者宠物
    if (attacker._personId == com.App.role._personId || attacker._ownerId == com.App.role._personId) {
      for (const fightRet of cmd.fightRetList || []) {
        for (const attactReg of fightRet.attackRetList || []) {
          const targetId = attactReg.fighterId.toString();
          // 如果bossid在列表中, 就记录下来
          if (SamiraFight.kuafuBossIds.includes(targetId)) {
            const hp = attactReg.damagehp.toNumber() + attactReg.backdamage.toNumber();
            SamiraFight.kuafuBossHpDic = SamiraFight.kuafuBossHpDic || {};
            SamiraFight.kuafuBossHpDic[targetId] = SamiraFight.kuafuBossHpDic[targetId] || 0;
            SamiraFight.kuafuBossHpDic[targetId] += hp;
          }
        }
      }
    }
  };

  // 从配置文件加载配置, 程序启动会执行
  SamiraFight.loadConfig = function () {
    const key = 'player-config-v1-' + SamiraFight.personId;
    const json = localStorage.getItem(key);
    let config = {};
    try {
      config = JSON.parse(json);
    } catch { }
    if (!config) { 
      config = {};
    }

    config = config || {};
    config.xiuluoCengshu = config.xiuluoCengshu || [];
    config.mapIds = config.mapIds || [];
    config.fuli = config.fuli || '0';
    config.shanggu = config.shanggu || '0';
    config.shangguMap = config.shangguMap || '-1|-2';
    config.shangguxiaoguai = config.shangguxiaoguai || '0';
    config.shangguxiaoguaiMap = config.shangguxiaoguaiMap || '-1';
    config.zhanqi = config.zhanqi || '0';
    config.zhanqiMap = config.zhanqiMap || '-1';
    config.anzhishendian = config.anzhishendian || '0';
    config.yiji = config.yiji || '0';
    config.wudao = config.wudao || '0';
    config.zhanchangBoss = config.zhanchangBoss || '0';
    config.zhanchangBossHp = config.zhanchangBossHp || '10';
    config.shenmoBoss = config.shenmoBoss || '0';
    config.xukongliehen = config.xukongliehen || '0';
    config.yabiao = config.yabiao || '0';
    config.yabiaoType = config.yabiaoType || '1';
    config.xiaoguai = config.xiaoguai || '0';
    config.zhenyingzhan = config.zhenyingzhan || '0';
    config.autoRevive = config.autoRevive || '1';
    config.waitBossTime = config.waitBossTime || 30;
    config.autoYuanshenUp = config.autoYuanshenUp || '1';
    config.autoZhuansheng = config.autoZhuansheng || '1';
    config.autoRichang = config.autoRichang || '1';
    config.autoYlgy = config.autoYlgy || '1';
    config.autoFree10 = config.autoFree10 || '1';
    config.autoWear = config.autoWear || '1';
    config.autoUse = config.autoUse || '1';
    config.autoZuoqi = config.autoZuoqi || '1';
    config.yijieruqin = config.yijieruqin || '0';
    config.yijieruqinIndex = config.yijieruqinIndex || '4';
    config.hhqf = config.hhqf || '1';
    config.hhgm = config.hhgm || '行会免费礼包';
    config.autoNeigong = config.autoNeigong || '0';
    config.sbk = config.sbk || '0';
    config.autoGubao = config.autoGubao || '1';
    config.autoShenlu = config.autoShenlu || '1';
    config.chatNmsl = config.chatNmsl || '0';
    config.chatNmslText = config.chatNmslText || '【attname】在【mapname】击杀了【myname】， 但是【attname】的全家第二天就被大卡车撞死了';
    config.chatNmslColor = config.chatNmslColor || '#ff33ff';
    config.yaoshou = config.yaoshou || '0';
    config.yaoshouBoss = config.yaoshouBoss || '-1';
    config.yaoshouLonglin = config.yaoshouLonglin || '0';
    config.yaoshouFengyin = config.yaoshouFengyin || '0';
    config.wudaoJuesai = config.wudaoJuesai || '0';
    config.redpack = config.redpack || '1';
    config.autoRonglian = config.autoRonglian || '1';
    config.guajiMapNames = config.guajiMapNames || '';
    config.longhunBoss = config.longhunBoss || '1';
    config.autoDuanzao = config.autoDuanzao || '1';
    config.autoJunzhuang = config.autoJunzhuang || '1';
    config.zbfsValue = config.zbfsValue || '';
    config.zbjs = config.zbjs || [];
    config.dljiangli = config.dljiangli || '1';
    config.tiantianzanzhu = config.tiantianzanzhu || '1';
    config.meirizhigou = config.meirizhigou || '1';
    config.zaixianjiangli = config.zaixianjiangli || '1';
    config.fangcangku = config.fangcangku || '0';
    config.fangcangkuwupin = config.fangcangkuwupin || [];
    config.meirixiangou = config.meirixiangou || '0';
    config.meirixiangouwupin = config.meirixiangouwupin || [];
    config.hunhuan = config.hunhuan || '0';
    config.lilian = config.lilian || '0';
    config.sanguo = config.sanguo || '0';
    config.sanguoMapIndex = config.sanguoMapIndex || [];
    config.sanguoTask = config.sanguoTask || '0';
    config.sanguoXiaoguaiMeiri = config.sanguoXiaoguaiMeiri || '0';
    config.sanguoXiaoguaiMeiriIndexs = config.sanguoXiaoguaiMeiriIndexs || ['1'];
    config.sanguoXiaoguaiMeiriXinwu = config.sanguoXiaoguaiMeiriXinwu || '0';
    config.sanguoXiaoguaiMeiriXinwuIndexs = config.sanguoXiaoguaiMeiriXinwuIndexs || ['1'];
    config.fsboss = config.fsboss || '0';
    config.fsbossIndexs = config.fsbossIndexs || ['-1'];
    config.track = config.trace || '0';
    config.trackNames = config.traceNames || [];
    config.a3v3 = config.a3v3 || '0';
    config.autoStart = config.autoStart || '0';
    config.autoBoss = config.autoBoss || '0';
    config.newPlayer = config.newPlayer || '0';

    $('.samira-fsboss').prop('checked', config.fsboss === '1');
    $('.samira-fsboss-indexs').val(config.fsbossIndexs.join('|'));
    $('.samira-xiuluo').val(config.xiuluoCengshu.join('|'));
    $('.samira-fuli').prop('checked', config.fuli === '1');
    $('.samira-sanguo-task').prop('checked', config.sanguoTask === '1');
    $('.samira-auto-denglu').prop('checked', config.dljiangli === '1');
    $('.samira-shanggu').prop('checked', config.shanggu === '1');
    $('.samira-shanggu-xiaoguai').prop('checked', config.shangguxiaoguai === '1');
    $('.samira-zhanqi').prop('checked', config.zhanqi === '1');
    $('.samira-zhanqi-map').val(config.zhanqiMap);
    $('.samira-anzhishendian').prop('checked', config.anzhishendian === '1');
    $('.samira-yiji').prop('checked', config.yiji === '1');
    $('.samira-wudao').prop('checked', config.wudao === '1');
    $('.samira-shenmoboss').prop('checked', config.shenmoBoss === '1');
    $('.samira-zhanchang-boss').prop('checked', config.zhanchangBoss === '1');
    $('.samira-zhanchang-boss-hp').val(config.zhanchangBossHp);
    $('.samira-map').val(config.mapIds.join('|'));
    $('.samira-xukongliehen').prop('checked', config.xukongliehen === '1');
    $('.samira-yabiao').prop('checked', config.yabiao === '1');
    $('.samira-yabiao-type').val(config.yabiaoType);
    $('.samira-xiaoguai').prop('checked', config.xiaoguai === '1');
    $('.samira-zhenyingzhan').prop('checked', config.zhenyingzhan === '1');
    $('.samira-auto-revive').prop('checked', config.autoRevive === '1');
    $('.samira-wait-boss-time').val(config.waitBossTime);
    $('.samira-shanggu-map').val(config.shangguMap);
    $('.samira-shanggu-xiaoguai-map').val(config.shangguxiaoguaiMap);
    $('.samira-auto-yuanshen-up').prop('checked', config.autoYuanshenUp === '1');
    $('.samira-auto-zhuansheng').prop('checked', config.autoZhuansheng === '1');
    $('.samira-auto-richang').prop('checked', config.autoRichang === '1');
    $('.samira-auto-ylgy').prop('checked', config.autoYlgy === '1');
    $('.samira-auto-free10').prop('checked', config.autoFree10 === '1');
    $('.samira-auto-wear').prop('checked', config.autoWear === '1');
    $('.samira-auto-use').prop('checked', config.autoUse === '1');
    $('.samira-auto-zuoqi').prop('checked', config.autoZuoqi === '1');
    $('.samira-yijieruqin').prop('checked', config.yijieruqin === '1');
    $('.samira-yijieruqin-index').val(config.yijieruqinIndex);
    $('.samira-hhqf').val(config.hhqf);
    $('.samira-hhgm').val(config.hhgm);
    $('.samira-auto-neigong').prop('checked', config.autoNeigong === '1');
    $('.samira-sbk').prop('checked', config.sbk === '1');
    $('.samira-auto-gubao').prop('checked', config.autoGubao === '1');
    $('.samira-auto-shenlu').prop('checked', config.autoShenlu === '1');
    $('.samira-chat-nmsl').prop('checked', config.chatNmsl === '1');
    $('.samira-chat-nmsl-text').val(config.chatNmslText);
    $('.samira-chat-nmsl-color').val(config.chatNmslColor);
    $('.samira-yaoshou').prop('checked', config.yaoshou === '1');
    $('.samira-yaoshou-boss').val(config.yaoshouBoss);
    $('.samira-yaoshou-longlin').prop('checked', config.yaoshouLonglin === '1');
    $('.samira-yaoshou-fengyin').prop('checked', config.yaoshouFengyin === '1');
    $('.samira-wudao-juesai').prop('checked', config.wudaoJuesai === '1');
    $('.samira-redpack').prop('checked', config.redpack === '1');
    $('.samira-auto-ronglian').prop('checked', config.autoRonglian === '1');
    $('.samira-longhunboss').prop('checked', config.longhunBoss === '1');
    $('.samira-guaji-maps').val(config.guajiMapNames);
    $('.samira-duanzao').prop('checked', config.autoDuanzao === '1');
    $('.samira-auto-junzhuang').prop('checked', config.autoDuanzao === '1');
    $('.samira-zbfs').val(config.zbfsValue);
    $('.samira-zbjs').val(config.zbjs.join('|'));
    $('.samira-tiantianzanzhu').prop('checked', config.tiantianzanzhu === '1');
    $('.samira-meirizhigou').prop('checked', config.meirizhigou === '1');
    $('.samira-zaixianjiangli').prop('checked', config.zaixianjiangli === '1');
    $('.samira-fangcangku').prop('checked', config.fangcangku === '1');
    $('.samira-fangcangku-wupin').val(config.fangcangkuwupin.join('|'));
    $('.samira-meirixiangou').prop('checked', config.meirixiangou === '1');
    $('.samira-meirixiangou-wupin').val(config.meirixiangouwupin.join('|'));
    $('.samira-hunhuan').prop('checked', config.hunhuan === '1');
    $('.samira-lilian').prop('checked', config.lilian === '1');
    $('.samira-sanguo').prop('checked', config.sanguo === '1');
    $('.samira-sanguo-map-index').val(config.sanguoMapIndex.join('|'));
    $('.samira-sanguo-xiaoguai-meiri').prop('checked', config.sanguoXiaoguaiMeiri === '1');
    $('.samira-sanguo-xiaoguai-meiri-indexs').val(config.sanguoXiaoguaiMeiriIndexs.join('|'));
    $('.samira-sanguo-xiaoguai-meiri-xinwu').prop('checked', config.sanguoXiaoguaiMeiriXinwu === '1');
    $('.samira-sanguo-xiaoguai-meiri-xinwu-indexs').val(config.sanguoXiaoguaiMeiriXinwuIndexs.join('|'));
    $('.samira-track').prop('checked', config.track === '1');
    $('.samira-track-names').val(config.trackNames.join('|'));
    $('.samira-3v3').prop('checked', config.a3v3 === '1');
    $('.samira-auto-start').prop('checked', config.autoStart === '1');
    $('.samira-auto-boss').prop('checked', config.autoBoss === '1');
    $('.samira-new').prop('checked', config.newPlayer === '1');
  };

  // 从ui获取配置
  SamiraFight.getConfigFromUI = function () {
    // 修罗层数
    const xiuluoCengshu = $('.samira-xiuluo').val().split('|').map(x => parseInt(x));
    // 福利
    const fuli = $('.samira-fuli').prop('checked') ? '1' : '0';
    // 上古禁地
    const shanggu = $('.samira-shanggu').prop('checked') ? '1' : '0';
    const shangguMap = $('.samira-shanggu-map').val().trim();
    const shangguxiaoguai = $('.samira-shanggu-xiaoguai').prop('checked') ? '1' : '0';
    const shangguXiaoGuaiMap = $('.samira-shanggu-xiaoguai-map').val().trim();
    // 战骑祭坛
    const zhanqi = $('.samira-zhanqi').prop('checked') ? '1' : '0';
    const zhanqiMap = $('.samira-zhanqi-map').val().trim();
    // 暗之神殿
    const anzhishendian = $('.samira-anzhishendian').prop('checked') ? '1' : '0';
    // 战场遗迹
    const yiji = $('.samira-yiji').prop('checked') ? '1' : '0';
    // 武道会
    const wudao = $('.samira-wudao').prop('checked') ? '1' : '0';
    // 战场boss
    const zhanchangBoss = $('.samira-zhanchang-boss').prop('checked') ? '1' : '0';
    const zhanchangBossHp = ($('.samira-zhanchang-boss-hp').val() || '10');
    // 神魔boss
    const shenmoBoss = $('.samira-shenmoboss').prop('checked') ? '1' : '0';
    // 虚空裂痕
    const xukongliehen = $('.samira-xukongliehen').prop('checked') ? '1' : '0';
    // 押镖
    const yabiao = $('.samira-yabiao').prop('checked') ? '1' : '0';
    const yabiaoType = $('.samira-yabiao-type').val().trim();
    // 跨服战场小怪
    const xiaoguai = $('.samira-xiaoguai').prop('checked') ? '1' : '0';
    // 阵营战
    const zhenyingzhan = $('.samira-zhenyingzhan').prop('checked') ? '1' : '0';
    // 自动复活
    const autoRevive = $('.samira-auto-revive').prop('checked') ? '1' : '0';
    // boss等待时间
    const waitBossTime = parseInt($('.samira-wait-boss-time').val().trim());
    // 元神升级
    const autoYuanshenUp = $('.samira-auto-yuanshen-up').prop('checked') ? '1' : '0';
    // 自动转生
    const autoZhuansheng = $('.samira-auto-zhuansheng').prop('checked') ? '1' : '0';
    // 自动日常
    const autoRichang = $('.samira-auto-richang').prop('checked') ? '1' : '0';
    // 羊了个羊
    const autoYlgy = $('.samira-auto-ylgy').prop('checked') ? '1' : '0';
    // 免费10元礼包
    const autoFree10 = $('.samira-auto-free10').prop('checked') ? '1' : '0';
    // 自动穿戴
    const autoWear = $('.samira-auto-wear').prop('checked') ? '1' : '0';
    // 自动使用
    const autoUse = $('.samira-auto-use').prop('checked') ? '1' : '0';
    // 自动坐骑升级
    const autoZuoqi = $('.samira-auto-zuoqi').prop('checked') ? '1' : '0';
    // 异界入侵
    const yijieruqin = $('.samira-yijieruqin').prop('checked') ? '1' : '0';
    const yijieruqinIndex = parseInt($('.samira-yijieruqin-index').val().trim());
    // 行会祈福
    const hhqf = $('.samira-hhqf').val().trim();
    // 行会购买
    const hhgm = $('.samira-hhgm').val().trim();
    // 自动内功
    const autoNeigong = $('.samira-auto-neigong').prop('checked') ? '1' : '0';
    // 沙巴克
    const sbk = $('.samira-sbk').prop('checked') ? '1' : '0';
    // 自动古宝
    const autoGubao = $('.samira-auto-gubao').prop('checked') ? '1' : '0';
    // 神炉升级
    const autoShenlu = $('.samira-auto-shenlu').prop('checked') ? '1' : '0';
    // 自动聊天
    const chatNmsl = $('.samira-chat-nmsl').prop('checked') ? '1' : '0';
    const chatNmslText = $('.samira-chat-nmsl-text').val().trim();
    const chatNmslColor = $('.samira-chat-nmsl-color').val().trim();
    // 妖兽锁魂塔
    const yaoshou = $('.samira-yaoshou').prop('checked') ? '1' : '0';
    const yaoshouBoss = $('.samira-yaoshou-boss').val().trim();
    const yaoshouLonglin = $('.samira-yaoshou-longlin').prop('checked') ? '1' : '0';
    const yaoshouFengyin = $('.samira-yaoshou-fengyin').prop('checked') ? '1' : '0';
    // 武道会决赛
    const wudaoJuesai = $('.samira-wudao-juesai').prop('checked') ? '1' : '0';
    // 红包
    const redpack = $('.samira-redpack').prop('checked') ? '1' : '0';
    // 自动熔炼
    const autoRonglian = $('.samira-auto-ronglian').prop('checked') ? '1' : '0';
    // 挂机地图
    const guajiMapNames = $('.samira-guaji-maps').val().trim();
    // 龙魂boss
    const longhunBoss = $('.samira-longhunboss').prop('checked') ? '1' : '0';
    // 自动锻造
    const autoDuanzao = $('.samira-duanzao').prop('checked') ? '1' : '0';
    // 自动升级军装
    const autoJunzhuang = $('.samira-auto-junzhuang').prop('checked') ? '1' : '0';
    // 装备发送/装备接受
    const zbfsValue = $('.samira-zbfs').val().trim();
    const zbfsItems = (zbfsValue || '').split('|').filter(x => x);
    const zbfs = [];
    for (const item of zbfsItems) {
      const itemInfo = (item || '').split(',').filter(x => x);
      if (itemInfo.length != 4) {
        continue;
      }
      const name = itemInfo[0];
      const jobName = itemInfo[1].trim();
      const job = SamiraFight.getJobCodeByName(jobName);
      const rank = parseInt(itemInfo[2]) + 15;
      const count = parseInt(itemInfo[3]);
      zbfs.push({
        name: name,
        job: job,
        jobName: jobName,
        rank: rank,
        count: count
      })
    }

    const zbjs = $('.samira-zbjs').val().trim().split('|').filter(x => x);
    // 登录奖励
    const dljiangli = $('.samira-auto-denglu').prop('checked') ? '1' : '0';
    // 天天赞助
    const tiantianzanzhu = $('.samira-tiantianzanzhu').prop('checked') ? '1' : '0';
    // 每日直购
    const meirizhigou = $('.samira-meirizhigou').prop('checked') ? '1' : '0';
    // 在线奖励
    const zaixianjiangli = $('.samira-zaixianjiangli').prop('checked') ? '1' : '0';
    // 物品放仓库
    const fangcangku = $('.samira-fangcangku').prop('checked') ? '1' : '0';
    const fangcangkuwupin = $('.samira-fangcangku-wupin').val().split('|').filter(x => x);
    // 每日限购
    const meirixiangou = $('.samira-meirixiangou').prop('checked') ? '1' : '0';
    const meirixiangouwupin = $('.samira-meirixiangou-wupin').val().split('|').filter(x => x);
    // 魂环
    const hunhuan = $('.samira-hunhuan').prop('checked') ? '1' : '0';
    // 历练任务
    const lilian = $('.samira-lilian').prop('checked') ? '1' : '0';
    // 三国
    const sanguo = $('.samira-sanguo').prop('checked') ? '1' : '0';
    const sanguoMapIndex = $('.samira-sanguo-map-index').val().split('|').map(x => parseInt(x));
    // 三国任务
    const sanguoTask = $('.samira-sanguo-task').prop('checked') ? '1' : '0';
    // 三国小怪
    const sanguoXiaoguaiMeiri = $('.samira-sanguo-xiaoguai-meiri').prop('checked') ? '1' : '0';
    const sanguoXiaoguaiMeiriIndexs = $('.samira-sanguo-xiaoguai-meiri-indexs').val().split('|').filter(x => x != null && x!= undefined && x != '').map(x => parseInt(x));
    const sanguoXiaoguaiMeiriXinwu = $('.samira-sanguo-xiaoguai-meiri-xinwu').prop('checked') ? '1' : '0';
    const sanguoXiaoguaiMeiriXinwuIndexs = $('.samira-sanguo-xiaoguai-meiri-xinwu-indexs').val().split('|').filter(x => x != null && x!= undefined && x != '').map(x => parseInt(x));
    // 飞升boss
    const fsboss = $('.samira-fsboss').prop('checked') ? '1' : '0';
    const fsbossIndexs = $('.samira-fsboss-indexs').val().split('|').filter(x => x != null && x != undefined && x != '').map(x => parseInt(x));
    // 追踪
    const track = $('.samira-track').prop('checked') ? '1' : '0';
    const trackNames = $('.samira-track-names').val().split('|').filter(x => x != null && x != undefined && x != '');
    // 3v3
    const a3v3 = $('.samira-3v3').prop('checked') ? '1' : '0';
    // 自动开始
    const autoStart = $('.samira-auto-start').prop('checked') ? '1' : '0';
    // 自动boss
    const autoBoss = $('.samira-auto-boss').prop('checked') ? '1' : '0';
    // 新号模式
    const newPlayer = $('.samira-new').prop('checked') ? '1' : '0';

    SamiraFight.config = {
      xiuluoCengshu: xiuluoCengshu,
      bossTimeOut: 60 * 30,
      mapIds: [],
      fuli: fuli,
      shanggu: shanggu,
      shangguMap: shangguMap,
      shangguxiaoguai: shangguxiaoguai,
      shangguXiaoGuaiMap: shangguXiaoGuaiMap,
      zhanqi: zhanqi,
      anzhishendian: anzhishendian,
      yiji: yiji,
      wudao: wudao,
      zhanchangBoss: zhanchangBoss,
      zhanchangBossHp: zhanchangBossHp,
      shenmoBoss: shenmoBoss,
      xukongliehen: xukongliehen,
      yabiao: yabiao,
      yabiaoType: yabiaoType,
      xiaoguai: xiaoguai,
      zhenyingzhan: zhenyingzhan,
      autoRevive: autoRevive,
      waitBossTime: waitBossTime,
      autoYuanshenUp: autoYuanshenUp,
      autoZhuansheng: autoZhuansheng,
      autoRichang: autoRichang,
      autoYlgy: autoYlgy,
      autoFree10: autoFree10,
      autoWear: autoWear,
      autoUse: autoUse,
      autoZuoqi: autoZuoqi,
      yijieruqin: yijieruqin,
      hhqf: hhqf,
      hhgm: hhgm,
      autoNeigong: autoNeigong,
      sbk: sbk,
      autoGubao: autoGubao,
      autoShenlu: autoShenlu,
      chatNmsl: chatNmsl,
      chatNmslText: chatNmslText,
      chatNmslColor: chatNmslColor,
      yaoshou: yaoshou,
      yaoshouBoss: yaoshouBoss,
      yaoshouLonglin: yaoshouLonglin,
      yaoshouFengyin: yaoshouFengyin,
      wudaoJuesai: wudaoJuesai,
      redpack: redpack,
      autoRonglian: autoRonglian,
      zhanqiMap: zhanqiMap,
      guajiMapNames: guajiMapNames,
      longhunBoss: longhunBoss,
      autoDuanzao: autoDuanzao,
      autoJunzhuang: autoJunzhuang,
      yijieruqinIndex: yijieruqinIndex,
      zbfs: zbfs,
      zbfsValue: zbfsValue,
      zbjs: zbjs,
      dljiangli: dljiangli,
      tiantianzanzhu: tiantianzanzhu,
      meirizhigou: meirizhigou,
      zaixianjiangli: zaixianjiangli,
      fangcangku: fangcangku,
      fangcangkuwupin: fangcangkuwupin,
      meirixiangou: meirixiangou,
      meirixiangouwupin: meirixiangouwupin,
      hunhuan: hunhuan,
      lilian: lilian,
      sanguo: sanguo,
      sanguoMapIndex: sanguoMapIndex,
      sanguoTask: sanguoTask,
      sanguoXiaoguaiMeiri: sanguoXiaoguaiMeiri,
      sanguoXiaoguaiMeiriIndexs: sanguoXiaoguaiMeiriIndexs,
      sanguoXiaoguaiMeiriXinwu: sanguoXiaoguaiMeiriXinwu,
      sanguoXiaoguaiMeiriXinwuIndexs: sanguoXiaoguaiMeiriXinwuIndexs,
      fsboss: fsboss,
      fsbossIndexs: fsbossIndexs,
      track: track,
      trackNames: trackNames,
      a3v3: a3v3,
      autoStart: autoStart,
      autoBoss: autoBoss,
      newPlayer: newPlayer
    };

    return SamiraFight.config;
  };

  // 保存配置
  SamiraFight.saveConfig = function () {
    const config = SamiraFight.getConfigFromUI();
    const key = 'player-config-v1-' + SamiraFight.personId;
    localStorage.setItem(key, JSON.stringify(config));
    com.components.game.GameNotice.showBottomMessage('保存成功');
  };

  // 从服务端获取或者的boss列表
  SamiraFight.requestBoss = function () {
    // 获取福利boss地图
    const fuliMapId = SamiraFight.getMaxLevelFuliBossMapId();
    // 获取暗之神殿地图boss
    const azsmMapIds = SamiraFight.getAzsdMapIds();
    // 获取遗迹地图
    const yijiMapId = SamiraFight.getMaxLevelYijiBossMapId();
    // 获取战骑地图
    const zhanqiMapId = SamiraFight.getSelectZhanqiBossMapId();
    // 获取上古禁地地图
    const shangguMapIds = SamiraFight.getMaxLevelShangguBossMapIds(SamiraFight.config.shangguMap);
    // 获取上古禁地小怪地图
    const shangguXiaoGuaiMapIds = SamiraFight.getMaxLevelShangguBossMapIds(SamiraFight.config.shangguXiaoGuaiMap);
    // 跨服boss地图
    const kuafuMapId = SamiraFight.kuafuBossMapId;
    // 挂机地图
    const bossMapIds = SamiraFight.getGuaJiMapIds();
    // 异界入侵boss
    const yijieruqinMapIds = com.App.dataMgr.q_activitiesContainer.getListByType(3000).map(x => com.logic.data.activity.ActivityCenter.getData(x.q_id)).filter(x => x.activityStates > -1).map(x => parseInt(x.bean.q_info))
    // 锁魂塔
    let suohunta = 0;
    const sunhuntaArray = (SamiraFight.config.yaoshouBoss || '').split('|').filter(x => x && x.trim() != '').map(x => parseInt(x));
    if (sunhuntaArray.length > 0) {
      suohunta = sunhuntaArray[0];
    }
    // 魂环地图
    const hunhuanMapIds = SamiraFight.getHunhuanMaps();
    // 三国地图
    const sanguoMapIds = SamiraFight.getSanguoMapIds(SamiraFight.config.sanguoMapIndex || []);
    // 飞升地图
    const fsMapIds = SamiraFight.getFeishengMapIds(SamiraFight.config.fsbossIndexs || []);

    const mapIds = [...bossMapIds, fuliMapId, ...azsmMapIds, yijiMapId, zhanqiMapId, kuafuMapId, ...shangguMapIds, ...shangguXiaoGuaiMapIds, ...yijieruqinMapIds, suohunta, ...hunhuanMapIds,...sanguoMapIds, ...fsMapIds];
    BossCommandSender.sendC2S_AliveWildBossMessage(mapIds, 0, false);
  };

  // 从服务端获取修罗boss
  SamiraFight.requestXiuLuoBoss = function () {
    console.log('[samira]获取修罗boss列表');
    com.logic.data.zone.tower.ZoneTowerCenter.sendC2S_WushenZoneInfoMessage(200000);
  };

  // 获取背包内指定装备数量 
  SamiraFight.getEnableDealItems = function (job, rank) { 
    const bagItems = com.logic.data.item.BagItemCenter.itemList;
    let enableItems = [];
    for (const bagItem of bagItems) { 
      if (!bagItem) {
        continue;
      }
      const eqData = bagItem.getDataBean();
      if (!eqData) {
        continue;
      }
      
      if (eqData.q_job == job && eqData.q_rank >= rank && !bagItem.isbind && !bagItem.islock) { 
        enableItems.push(bagItem)
      }
    }
    return enableItems;
  }

  // 逻辑更新
  SamiraFight.update = function () {
    console.log('[samira]------------------------------------------------------------------------------------------------------')
    const playerName = com.App.role._name;
    const playerMapId = com.App.role._mapId;
    const mapIds = SamiraFight.getGuaJiMapIds();
    const ts = Math.floor(Date.now() / 1000);
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();
    const dayOfweek = new Date().getDay();
    const yabiaoTili = com.modules.escort.EscortCenter.getData().remainCount;
    const money = com.logic.data.MoneyCenter.getMoney(90);
    const diamond = com.logic.data.MoneyCenter.getMoney(1);
    // 小怪任务
    const dayXiaoguaiTask = com.App.dataMgr.q_jitanContainer.getList().find(x => x.q_id === SamiraFight.kuafuXiaoGuai.taskId);
    const dayXiaoGuaiData = com.logic.data.jitian.JitanCenter.getJiTianTaskData(SamiraFight.kuafuXiaoGuai.taskId);
    const dayXiaoGuaiTaskTimes = dayXiaoguaiTask ? dayXiaoguaiTask.q_time : 0;
    const dayXiaoGuaiTaskComplateTimes = dayXiaoGuaiData ? dayXiaoGuaiData.times : 0;

    console.log('[samira]currentStatus:' + SamiraFight.currentStatus, 'player: ' + playerName, mapIds, SamiraFight.currentBoss);

    // 清除窗口
    com.game.core.panel.PanelManager.closeByClass(com.modules.boss.fuli.SweepResultPanel);
    
    if (SamiraFight.currentStatus != 'lilian') { 
      // 如果强制退出了历练任务, 就取消自动任务
      TaskAuto.isAutoLilian = false;
      SamiraFight.currentLilian = 0;
      SamiraFight.currentLilianBoss = null;
    }

    // 恢复武道会
    if (ts > SamiraFight.wudaoResumeTs) {
      SamiraFight.wudaoStatus = true;
      SamiraFight.wudaoResumeTs = 0;
    }

    // 恢复跨服活动
    if (ts > SamiraFight.kuafuActiveResumeTs) {
      SamiraFight.kuafuActiveStatus = true;
      SamiraFight.kuafuActiveResumeTs = 0;
    }

    // 时间如果是11点, 16点, 21点, 进入战场
    if ((hours == 11 || hours == 16 || hours == 21) && SamiraFight.config.zhanchangBoss == '1') {
      // 如果当前分钟是0-5, 进停止一切活动,  从新搜索并且进入战场
      if (minutes >= 0 && minutes <= 5 && SamiraFight.currentStatus != 'kuafuboss' && SamiraFight.currentStatus != 'search') {
        com.App.returnCity();
        SamiraFight.currentStatus = 'search';
        SamiraFight.currentcheckTimes = 0;
        console.log('[samira]检测到跨服boss时间到了, 重新搜索boss: search');
        return;
      }
    }

    // 如果是7点30, 进入虚空裂痕
    if (hours == 19 && minutes >= 30 && minutes <= 50 && SamiraFight.config.xukongliehen == '1' && SamiraFight.currentStatus != 'xukongliehen') {
      com.App.returnCity();
      SamiraFight.currentStatus = 'xukongliehen';
      return;
    }

    // 如果是20点31分, 进入异界入侵
    if (hours == 20 && minutes >= 30 && minutes <= 31 && SamiraFight.config.yijieruqin == '1' && SamiraFight.currentStatus != 'yijieruqin') {
      // 先回城， 然后开始异界入侵
      com.App.returnCity();
      SamiraFight.currentStatus = 'yijieruqin';
      SamiraFight.currentBoss = null;
      return;
    }

    // 如果是星期一到星期五, 8点整进入跨服阵营战
    if ([1,2,3,4,5].includes(dayOfweek) && hours == 20 && minutes >= 0 && minutes < 15 && SamiraFight.config.zhenyingzhan == '1' && SamiraFight.currentStatus != 'zhenyingzhan') {
      com.App.returnCity();
      SamiraFight.currentStatus = 'zhenyingzhan';
      return;
    }

    // 如果是周六八点到八点半, 进入沙巴克
    if (dayOfweek == 6 && hours == 20 && minutes >= 0 && minutes < 30 && SamiraFight.config.sbk == '1' && SamiraFight.currentStatus != 'sbk') {
      com.App.returnCity();
      SamiraFight.currentStatus = 'sbk';
      return;
    }

    // 如果是周日八点到八点半, 进入武道会决赛
    // if (dayOfweek == 0 && hours == 20 && minutes >= 0 && minutes < 20 && SamiraFight.config.wudaoJuesai == '1' && SamiraFight.currentStatus != 'wudaojuesai') {
    //   com.App.returnCity();
    //   SamiraFight.currentStatus = 'wudaohuijuesai';
    //   SamiraFight.tp(210041);
    //   return;
    // }

    // 显示当前状态
    $('.samira-current-task').text(SamiraFight.currentStatus ? SamiraFight.status[SamiraFight.currentStatus] || '未知任务(' + SamiraFight.currentStatus + ')' : '无');
    if (SamiraFight.currentBoss && SamiraFight.currentBoss.bean) {
      let bossName = SamiraFight.currentBoss.bean.q_name || '无';
      if (SamiraFight.currentBoss.mapModelId) {
        const bossMap = com.App.dataMgr.q_mapContainer.list.find(x => x.q_map_id == SamiraFight.currentBoss.mapModelId);
        if (bossMap) {
          bossName += '(' + bossMap.q_map_name + ')';
        }
      }
      $('.samira-current-boss').text(bossName);
    }

    // 显示当前boss
    if (!SamiraFight.currentBoss || SamiraFight.currentStatus == 'search') {
      $('.samira-current-boss').text('无');
    }

    if (SamiraFight.currentStatus === 'search') {
      // 关闭武道会界面
      PanelManager.closeByClass(WulingdahuiPanel);
      PanelManager.closeByClass(WulingdahuiPipeiPanel);

      // 跨服boss
      if (SamiraFight.config.zhanchangBoss == '1') {
        const bosses = SamiraFight.kuafuBossData;
        const filterBosses = bosses
          .filter(x => (x.curHp / x.allHp) * 100)
          .filter(x => x.curHp > 0 && x.remainTime == 0)
          .filter(x => {
            // 获取当前boss自己已经打的血量
            const attact = SamiraFight.kuafuBossHpDic[x.monsterIn64Id] || 0;
            // 如果已经超过百分之二就不打了
            if ((attact / x.allHp) * 100 > SamiraFight.config.zhanchangBossHp) {
              return false;
            } else {
              return true;
            }
          })
          .map(b => {
            // 计算距离
            if (playerMapId !== SamiraFight.kuafuBossMapId) {
              b.distance = 0;
            } else {
              const vo = new com.game.core.scene.map.road.SearchToPointVO();
              const p = com.game.core.scene.map.libarys.MapVO.getCenterPoint(b.monsterX, b.monsterY);
              vo.px = p.x;
              vo.py = p.y;
              vo.shift = 0;
              vo.type = 'walk';
              const list = com.App.mapModule.mapMoveModel.searchRoadByAstar(vo);
              b.distance = list ? list.length : 9999999;
            }
            return b;
          })
          .sort((a, b) => a.distance - b.distance);

        // 寻找到还没有打的boss
        if (filterBosses.length > 0) {
          // 如果不在地图中, 先进入地图
          if (playerMapId !== SamiraFight.kuafuBossMapId) {
            GameServer.sendCommand(new C2S_PlayerEnterNationWarMessage());
            return;
          }

          const boss = filterBosses[0];
          SamiraFight.currentBoss = boss;
          console.log('[samira]找到跨服boss:', boss);
          SamiraFight.currentcheckTimes = 0;
          SamiraFight.currentStatus = 'kuafuboss';
          return;
        }

        if (SamiraFight.kuafuBossData.some(x => x.remainTime == 0 || x.curHp > 0)) {
          console.log('[samira]等待跨服boss奖励');
          SamiraFight.currentStatus = 'search';

          if (playerMapId !== SamiraFight.currentBoss.mapModelId) {
            GameServer.sendCommand(new C2S_PlayerEnterNationWarMessage());
          }

          return;
        }
      }

      // 3v3
      if (SamiraFight.config.a3v3 === '1' && (hours == 11 || hours == 21) && (minutes >= 17 && minutes <= 44) && com.logic.data.zone.boss.BossDataCenter.instance.getTiliNum(187) > 0) {
        com.App.returnCity();
        console.log('[samira]准备3v30');
        SamiraFight.currentStatus = '3v3';
        // 开始匹配
        Jingji3V3Center.sendPipeiReq(1);
        // 状态为匹配提交
        SamiraFight.a3v3.status = 'submit';
        return;
      }

      // 押镖
      if (SamiraFight.kuafuActiveStatus && yabiaoTili > 0 && minutes > 46 && (hours == 11 || hours == 16 || hours == 21) && SamiraFight.config.yabiao == '1') {
        if (SamiraFight.config.yabiaoType === '1' && money >= 2000000) {
          console.log('[samira]准备押镖');
          SamiraFight.currentStatus = 'yabiao';
          return;
        }
        
        if (SamiraFight.config.yabiaoType === '2' && diamond >= 5000) {
          console.log('[samira]准备押镖');
          SamiraFight.currentStatus = 'yabiao';
          return;
        }
      }

      // 武道会
      if (com.logic.data.MoneyCenter.getMoney(EnumMoney.JINGJI) > 0 && SamiraFight.config.wudao == '1' && SamiraFight.wudaoStatus) {
        // 修改状态
        SamiraFight.currentStatus = 'wudao';
        SamiraFight.currentBoss = null;
        SamiraFight.currentWudaocheckTimes = 0;
        // 先回城在匹配, 要不然会出问题
        com.App.returnCity();
        // 开始匹配
        PanelManager.openByClass(WulingdahuiPipeiPanel, '最强王者');
        return;
      }

      // 龙魂boss
      if (SamiraFight.config.longhunBoss == '1') {
        const zones = SamiraFight.getCanEnterLongHunBossZoneIds();
        if (zones.length > 0) {
          com.App.returnCity();
          SamiraFight.currentLongHunZoneId = zones[0];
          SamiraFight.currentStatus = 'longhunboss';
          com.logic.connect.sender.ZoneCommandSender.enterZoneMap(zones[0]);
          return;
        }
      }

      // 飞升boss
      if (SamiraFight.kuafuActiveStatus && hours > 1 && com.logic.data.zone.boss.BossDataCenter.instance.getTiliNum(183) > 0 && SamiraFight.config.fsboss == '1') {
        const mapIds = SamiraFight.getFeishengMapIds(SamiraFight.config.fsbossIndexs || []) || [];
        const bosses = [];
        for (const mapId of mapIds) {
          bosses.push(...com.logic.data.zone.boss.BossDataCenter.instance.getBossListByMapId(mapId));
        }
        // 获取活着的boss, 并且是自己的
        const aliveBOsses = bosses.find(x => (x.owner === playerName || x.owner == '' || x.owner == null) && x.remainTime == 0);
        if (aliveBOsses) {
          SamiraFight.currentBoss = aliveBOsses;
          console.log('[samira]找到飞升boss:', aliveBOsses);
          SamiraFight.currentcheckTimes = 0;
          SamiraFight.currentStatus = 'fight';
          return;
        }
      }

      // 处理神魔boss
      if (SamiraFight.kuafuActiveStatus && hours > 2 && com.logic.data.zone.boss.BossDataCenter.instance.getTiliNum(178) > 0 && SamiraFight.config.shenmoBoss == '1') {
        const bosses = com.logic.data.zone.boss.BossDataCenter.instance.getBossListByMapId(SamiraFight.kuafuBossMapId);
        const filterShanguBoss = bosses
          .filter(x => x.bean.q_type == 16)
          .filter(boss => ((boss.owner === playerName || boss.owner == '' || boss.owner == null) && boss.remainTime === 0) || (boss.remainTime != 0 && boss.remainTime <= ts + SamiraFight.config.waitBossTime))
          .sort((a, b) => {
            return b.level - a.level;
          });

        if (filterShanguBoss.length > 0) {
          const boss = filterShanguBoss[0];
          SamiraFight.currentBoss = boss;
          console.log('[samira]找到神魔boss:', boss);
          SamiraFight.currentcheckTimes = 0;
          SamiraFight.currentStatus = 'fight';
          return;
        }
      }

      // 发送交易装备
      if (SamiraFight.config.zbfs.length > 0 && (![11, 16, 19, 20, 21].includes(hours)) && minutes <= 50) {
        // Id|职业|等级|数量
        const items = SamiraFight.config.zbfs || [];
        for (const item of items) {
          const name = item.name;
          const job = item.job;
          const rank = item.rank;
          const count = item.count;

          let findCount = SamiraFight.getEnableDealItems(job, rank).length;
          console.log('[samira]发现了' + findCount);
          if (findCount >= count && ts > SamiraFight.jiaoyi.allowTime) {
            console.log('[samira]满足条件, 请求交易: 发现了' + findCount);
            SamiraFight.jiaoyi.allowTime = ts + 600;
            com.game.modules.chats.data.ChatCenter.sendChat(2, '交易一下', name, true, null, 'ChatDialog');
          }
        }
      }

      // 检查修罗天界地图
      if (SamiraFight.config.xiuluoCengshu.length > 0) {
        const xiuluoData = com.modules.boss.lianyu.LianyuCenter._dic[200000]._dic;
        for (const f of SamiraFight.config.xiuluoCengshu.filter(x => x)) {
          const key = '10000' + f;
          const bean = xiuluoData[key];
          const monsters = xiuluoData[key].monsters;
          // 扫荡
          if (bean.canSweep) {
            if (monsters.some(x => x.sweepCount > 0)) {
              ZoneTowerCenter.sendC2S_IntoPurgatoryZoneMessage(200000, f, 1);
            }
          } else {
            // 必须五个全是活着的时候才去打
            const allALive = monsters.every(x => x.receiveTimestamp == 0);
            if (allALive) {
              console.log('[samira]修罗天地' + f + '层boss全部活着, 去攻击!');
              SamiraFight.currentStatus = 'fight-xiuluo';
              SamiraFight.currentXiuLuoCengshu = f;
              ZoneTowerCenter.sendC2S_IntoPurgatoryZoneMessage(200000, f, 0);
              window.setTimeout(() => {
                com.App.openAutoFight();
              });

              return;
            }
          }
        }
      }

      // 处理福利boss
      if (com.logic.data.zone.boss.BossDataCenter.instance.getTiliNum(176) > 0 && SamiraFight.config.fuli == '1') {
        const fuliMapId = SamiraFight.getMaxLevelFuliBossMapId();
        const fuliBoss = com.logic.data.zone.boss.BossDataCenter.instance.getBossListByMapId(fuliMapId)[0];
        if (fuliBoss.remainTime == 0 && (fuliBoss.owner === playerName || fuliBoss.owner == '' || fuliBoss.owner == null)) {
          SamiraFight.currentBoss = fuliBoss;
          console.log('[samira]找到福利boss:', fuliBoss);
          SamiraFight.currentcheckTimes = 0;
          SamiraFight.currentStatus = 'fight';
          return;
        }
      }

      // 处理暗之神殿
      if (com.logic.data.zone.boss.BossDataCenter.instance.getTiliNum(177) > 0 && SamiraFight.config.anzhishendian == '1') {
        // 检查是否可以扫荡
        if (FunctionManager.isFunctionOpen(134) && false) {
          BossCommandSender.sendC2S_WildMapSweepMessage(SamiraFight.getAzsdMapIds()[0]);
        } else {
          const azsdMapIds = SamiraFight.getAzsdMapIds();
          const azsdBosses = [];
          for (const azsdMapId of azsdMapIds) {
            const mapBosses = com.logic.data.zone.boss.BossDataCenter.instance._mapbossDic[azsdMapId];
            for (const bossId in mapBosses) {
              const bs = mapBosses[bossId];
              for (const b in bs) {
                azsdBosses.push(bs[b]);
              }
            }
          }

          const filterdAzsdBosses = azsdBosses
            .filter(boss => (boss.owner === playerName || boss.owner == '' || boss.owner == null) && boss.remainTime === 0)
            .sort((a, b) => {
              return b.level - a.level;
            });

          if (filterdAzsdBosses.length > 0) {
            const boss = filterdAzsdBosses[0];
            SamiraFight.currentBoss = boss;
            console.log('[samira]找到暗之神殿boss:', boss);
            SamiraFight.currentcheckTimes = 0;
            SamiraFight.currentStatus = 'fight';
            return;
          }
        }
      }

      // 处理战场遗迹
      if (SamiraFight.kuafuActiveStatus && com.logic.data.zone.boss.BossDataCenter.instance.getTiliNum(179) > 0 && SamiraFight.config.yiji == '1') {
        const yijiMapId = SamiraFight.getMaxLevelYijiBossMapId();
        const yiujiBosses = com.logic.data.zone.boss.BossDataCenter.instance.getBossListByMapId(yijiMapId).filter(boss => (boss.owner === playerName || boss.owner == '' || boss.owner == null) && boss.remainTime === 0);

        if (yiujiBosses.length > 0) {
          const boss = yiujiBosses[0];
          SamiraFight.currentBoss = boss;
          console.log('[samira]找到遗迹boss:', boss);
          SamiraFight.currentcheckTimes = 0;
          SamiraFight.currentStatus = 'fight';
          return;
        }
      }

      // 处理战骑祭坛
      if (SamiraFight.kuafuActiveStatus && com.logic.data.zone.boss.BossDataCenter.instance.getTiliNum(168) > 0 && SamiraFight.config.zhanqi == '1') {
        const zhanqiMapId = SamiraFight.getSelectZhanqiBossMapId();
        const zhanqiBosses = com.logic.data.zone.boss.BossDataCenter.instance
          .getBossListByMapId(zhanqiMapId)
          .filter(x => x.bean.q_type == 8)
          .filter(boss => (boss.owner === playerName || boss.owner == '' || boss.owner == null) && boss.remainTime === 0);
        if (zhanqiBosses.length > 0) {
          const boss = zhanqiBosses[0];
          SamiraFight.currentBoss = boss;
          console.log('[samira]找到战骑boss:', boss);
          SamiraFight.currentcheckTimes = 0;
          SamiraFight.currentStatus = 'fight';
          return;
        }
      }

      // 魂环(每天4点之后再打, 为了不让脚本都进入同一个副本, 随机分钟数)
      const hunhuanMin = Math.floor(Math.random() * 50);
      if (SamiraFight.config.hunhuan == '1' && ((hours == 4 && minutes > hunhuanMin) || hours > 4) && com.logic.data.zone.boss.BossDataCenter.instance.getTiliNum(189) > 0) {
        const mapIds = SamiraFight.getHunhuanMaps();
        if (mapIds.length > 0) {
          const mapId = mapIds[0];
          // 判断boss数量是否大于5
          const bosses = com.logic.data.zone.boss.BossDataCenter.instance.getBossListByMapId(mapId).filter(x => x.remainTime == 0 && (x.owner == '' || x.owner == playerName));
          if (bosses.length >= 4) {
            console.log('[samira]开始进入魂环秘境');
            SamiraFight.currentHunhuanBoss = null;
            SamiraFight.currentStatus = 'hunhuan';
            // 进入副本
            TransferManager.toBossMap(12, mapId)

            return;
          }
        }
      }

      // 妖兽锁魂塔采集
      if (SamiraFight.kuafuActiveStatus && hours > 1 && (com.logic.data.zone.boss.BossDataCenter.instance.getTiliNum(181) > 0 || com.logic.data.zone.boss.BossDataCenter.instance.getTiliNum(182) > 0)) {
        if (SamiraFight.config.yaoshouLonglin == '1' || SamiraFight.config.yaoshouFengyin == '1') {
          WanyaoCenter.sendC2S_NpcInfoMessage();
        }

        // 处理采集
        const selectMapAndBoss = (SamiraFight.config.yaoshouBoss || '').split('|').filter(x => x && x.trim() != '').map(x => parseInt(x));
        const datas = com.modules.boss.wanyao.WanyaoCenter.datas.filter(x => x.isEnter);
        if (selectMapAndBoss.length > 0 && datas.length > 0) {
          const selectMapIndex = selectMapAndBoss[0];
          const data = selectMapIndex >= 0 ? datas[selectMapIndex] : datas[datas.length + selectMapIndex];
          const mapId = data.bean.q_map_id;

          const npcs = [];
          for (var $each_info in com.modules.boss.wanyao.WanyaoCenter._npcs[mapId]) {
            const info = com.modules.boss.wanyao.WanyaoCenter._npcs[mapId][$each_info];
            const bean = com.App.dataMgr.q_npcContainer.getDataBean(info.modelId, false);
            if (info.refreshTime > 0) {
              continue;
            }
            npcs.push({ info, bean });
          }

          // 采集龙鳞水晶
          if (com.logic.data.zone.boss.BossDataCenter.instance.getTiliNum(181) > 0 && SamiraFight.config.yaoshouLonglin == '1') {
            const aliveNpcs = npcs.filter(x => x.bean.q_name == '龙鳞水晶' && x.info.refreshTime == 0);
            if (aliveNpcs.length > 0) {
              const npc = aliveNpcs[0];
              SamiraFight.yaoshou.npcInfo = npc.info;
              SamiraFight.yaoshou.gatherTimeoutTs = ts + 180;
              SamiraFight.currentStatus = 'suoyaotacaiji';
              console.log('[samira]找到龙鳞水晶:', npc);
              return;
            }
          }
          // 采集凤吟水晶
          if (com.logic.data.zone.boss.BossDataCenter.instance.getTiliNum(182) > 0 && SamiraFight.config.yaoshouFengyin == '1') {
            const aliveNpcs = npcs.filter(x => x.bean.q_name == '凤吟水晶' && x.info.refreshTime == 0);
            if (aliveNpcs.length > 0) {
              const npc = aliveNpcs[0];
              SamiraFight.yaoshou.npcInfo = npc.info;
              SamiraFight.yaoshou.gatherTimeoutTs = ts + 180;
              SamiraFight.currentStatus = 'suoyaotacaiji';
              console.log('[samira]找到凤吟水晶:', npc);
              return;
            }
          }
        }
      }

      // 妖兽锁魂塔BOSS
      if (SamiraFight.kuafuActiveStatus && hours > 1 && com.logic.data.zone.boss.BossDataCenter.instance.getTiliNum(180) > 0 && SamiraFight.config.yaoshou == '1') {
        const selectMapAndBoss = (SamiraFight.config.yaoshouBoss || '').split('|').filter(x => x && x.trim() != '').map(x => parseInt(x));
        const datas = com.modules.boss.wanyao.WanyaoCenter.datas.filter(x => x.isEnter);
        if (selectMapAndBoss.length > 0 && datas.length > 0) {
          const selectMapIndex = selectMapAndBoss[0];
          const data = selectMapIndex >= 0 ? datas[selectMapIndex - 1] : datas[datas.length + selectMapIndex];
          const mapBean = data.bean;
          const bosss = com.logic.data.zone.boss.BossDataCenter.instance.getBossListByMapId(mapBean.q_map_id);
          const boss = bosss.find(x => (x.owner === playerName || x.owner == '' || x.owner == null) && x.remainTime == 0);
          if (boss) {
            SamiraFight.currentBoss = boss;
            console.log('[samira]找到锁魂塔boss:', boss);
            SamiraFight.currentcheckTimes = 0;
            SamiraFight.currentStatus = 'fight';
            return;
          }
        }
      }

      // 烽火每日任务
      const fenghuoTask = com.logic.data.task.TaskModel.taskDict[67002];
      if (fenghuoTask && SamiraFight.config.sanguoTask == '1') {
        // 未完成, 选中烽火地图
        if (fenghuoTask.taskState == 1) {
          console.log('[samira]三国任务未完成, 选中烽火地图');
          SamiraFight.config.sanguo = '1';
        }
        // 已完成, 领取任务
        else if (fenghuoTask.taskState == 2) {
          TaskCommandSender.finishTask(fenghuoTask);
        }
      }

      // 烽火三国
      if (SamiraFight.kuafuActiveStatus && SamiraFight.config.sanguo == '1') {
        const bosses = [];
        const mapIds = SamiraFight.getSanguoMapIds(SamiraFight.config.sanguoMapIndex || []);
        for (const mapId of mapIds) {
          const mapBosses = BossDataCenter.instance._mapbossDic[mapId];
          for (const bossId in mapBosses) {
            const bs = mapBosses[bossId];
            for (const b in bs) {
              bosses.push(bs[b]);
            }
          }
        }
        const filterShanguBoss = bosses
          .filter(boss => ((boss.owner === playerName || boss.owner == '' || boss.owner == null) && boss.remainTime === 0) || (boss.remainTime != 0 && boss.remainTime <= ts + SamiraFight.config.waitBossTime));

        if (filterShanguBoss.length > 0) {
          const boss = filterShanguBoss[0];
          SamiraFight.currentBoss = boss;
          console.log('[samira]找到三国boss:', boss);
          SamiraFight.currentcheckTimes = 0;
          SamiraFight.currentStatus = 'fight';
          return;
        }
      }

      // 如果有内功任务， 就去打上古boss，倒数三个
      if (SamiraFight.config.autoNeigong == '1' && SamiraFight.getNeigongTimes() > 0) {
        SamiraFight.config.shanggu = '1';
        SamiraFight.config.shangguMap = SamiraFight.config.shangguMap || '-1|-2|-3';
      }

      // 处理上古禁地小怪
      if (SamiraFight.kuafuActiveStatus && SamiraFight.config.shangguxiaoguai == '1') {
        const bosses = [];
        const shangguMapIds = SamiraFight.getMaxLevelShangguBossMapIds(SamiraFight.config.shangguXiaoGuaiMap);
        for (const mapId of shangguMapIds) {
          const mapBosses = BossDataCenter.instance._mapbossDic[mapId];
          for (const bossId in mapBosses) {
            const bs = mapBosses[bossId];
            for (const b in bs) {
              bosses.push(bs[b]);
            }
          }
        }
        const filterShanguBoss = bosses
          .filter(x => x.bean.q_type == 4)
          .filter(boss => (boss.owner === playerName || boss.owner == '' || boss.owner == null) && boss.remainTime === 0)
          .map(b => {
            const vo = new com.game.core.scene.map.road.SearchToPointVO();
            const p = com.game.core.scene.map.libarys.MapVO.getCenterPoint(b.monsterX, b.monsterY);
            vo.px = p.x;
            vo.py = p.y;
            vo.shift = 0;
            vo.type = 'walk';
            const list = com.App.mapModule.mapMoveModel.searchRoadByAstar(vo);
            b.distance = list ? list.length : 9999999;
            return b;
          })
          .sort((a, b) => {
            // 如果 mapModelId 和 mapId 相同
            let aIsSame = a.mapModelId === playerMapId;
            let bIsSame = b.mapModelId === playerMapId;

            if (aIsSame && !bIsSame) {
              return -1; // a 排在 b 前
            }
            if (!aIsSame && bIsSame) {
              return 1; // b 排在 a 前
            }

            // 如果两者都相同或都不同，则按 distance 排序
            return a.distance - b.distance;
          });

        if (filterShanguBoss.length > 0) {
          const boss = filterShanguBoss[0];
          SamiraFight.currentBoss = boss;
          console.log('[samira]找到上古禁地小怪:', boss);
          SamiraFight.currentcheckTimes = 0;
          SamiraFight.currentStatus = 'fight';
          return;
        }
      }

      // 处理上古禁地BOSS(如果有内功任务, 也会去打boss)
      if (SamiraFight.kuafuActiveStatus && SamiraFight.config.shanggu == '1') {
        const bosses = [];
        const shangguMapIds = SamiraFight.getMaxLevelShangguBossMapIds(SamiraFight.config.shangguMap);
        for (const mapId of shangguMapIds) {
          const mapBosses = BossDataCenter.instance._mapbossDic[mapId];
          for (const bossId in mapBosses) {
            const bs = mapBosses[bossId];
            for (const b in bs) {
              bosses.push(bs[b]);
            }
          }
        }
        const filterShanguBoss = bosses
          .filter(x => x.bean.q_type == 16)
          .filter(boss => ((boss.owner === playerName || boss.owner == '' || boss.owner == null) && boss.remainTime === 0) || (boss.remainTime != 0 && boss.remainTime <= ts + SamiraFight.config.waitBossTime))
          .sort((a, b) => {
            return b.level - a.level;
          });

        if (filterShanguBoss.length > 0) {
          const boss = filterShanguBoss[0];
          SamiraFight.currentBoss = boss;
          console.log('[samira]找到上古禁地boss:', boss);
          SamiraFight.currentcheckTimes = 0;
          SamiraFight.currentStatus = 'fight';
          return;
        }
      }
    
      // 跨服小怪
      if (SamiraFight.kuafuActiveStatus && SamiraFight.config.xiaoguai == '1' && dayXiaoGuaiTaskComplateTimes < dayXiaoGuaiTaskTimes) {
        console.log('[samira]准备攻击跨服小怪');
        SamiraFight.kuafuXiaoGuai.pointTimes = 0;
        SamiraFight.kuafuXiaoGuai.pointIndex = 0;
        SamiraFight.currentStatus = 'xiaoguai';
        return;
      }

      // 三国小怪
      if (SamiraFight.config.sanguoXiaoguaiMeiri === '1' && SamiraFight.config.sanguoXiaoguaiMeiriIndexs.length > 0) {
        const mapIds = SamiraFight.getSanguoMapIds(SamiraFight.config.sanguoXiaoguaiMeiriIndexs);
        if (mapIds.length > 0) {
          SamiraFight.sanguoXiaoguaiMapId = mapIds[0];
          SamiraFight.sanguoXiaoguaiEndTs = ts + 60 * 60;
          SamiraFight.currentStatus = 'sanguoxiaoguai';
          return;
        }
      }

      // 三国小怪每日信物
      if (SamiraFight.config.sanguoXiaoguaiMeiriXinwu === '1' && SamiraFight.config.sanguoXiaoguaiMeiriXinwuIndexs.length > 0) {
        const mapIds = SamiraFight.getSanguoMapIds(SamiraFight.config.sanguoXiaoguaiMeiriXinwuIndexs);
        const map = JSON.parse(com.App.dataMgr.q_globalContainer.getDataBean(45027).q_string_value);
        for (const mapId of mapIds) {
          // 如果已经完成了, 就退出
          if ((SamiraFight.sanguoXiaoguaiMeiriComplateMapIds || []).includes(mapId)) {
            continue;
          }
          const itemId = map[mapId].id;
          const info = com.modules.zuoqi.ZuoQiCenter.getDrop(itemId);
          if (!info) {
            SamiraFight.tp(mapId);
            return;
          }
          const num = info ? info.num : 0;
          const max = info ? info.maxNum : 0;
          if (num < max) {
            SamiraFight.currentStatus = 'sanguoxiaoguaimeiri';
            SamiraFight.sanguoXiaoguaiMeiriMapId = mapId;
            return;
          }
        }
      }
      
      // 历练任务
      const lilianTask = com.logic.data.task.TaskModel.lilianTask;
      if (SamiraFight.config.lilian == '1' && lilianTask && lilianTask.curCount <= lilianTask.maxCount) {
        console.log('[samira][历练]准备去做历练任务...' + lilianTask.curCount);
        SamiraFight.currentStatus = 'lilian';
        // 记录当前历练任务
        SamiraFight.currentLilian = lilianTask.curCount;
        SamiraFight.currentLilianBoss = null;
        com.App.returnCity();
        return;
      }
    
      // 追杀别人
      if (SamiraFight.config.track == '1') {
        const bosses = [];
        const bossDic = com.logic.data.zone.boss.BossDataCenter.instance._allBossDic;
        for (const key in bossDic) {
          const bs = bossDic[key];
          for (const b in bs) {
            const cs = bs[b];
            for (const c in cs) {
              bosses.push(cs[c]);
            }
          }
        }

        console.log(bosses)

        for (const name of SamiraFight.config.trackNames) {
          const boss = bosses.find(x => x.owner === name && x.remainTime === 0);
          if (boss) {
            SamiraFight.currentBoss = boss;
            console.log('[samira]找到追杀对象:', boss);
            SamiraFight.currentStatus = 'trace';
            return;
          }
        }
      }
    
      // 获取所有挂机地图活着的boss
      if(SamiraFight.config.autoBoss == '1'){
        let selectBoss = SamiraFight.getFightBoss();
        if (selectBoss) {
          SamiraFight.currentBoss = selectBoss;
          // 如果不是在当前地图, 就先进入地图
          if (playerMapId !== SamiraFight.currentBoss.mapModelId) {
            if (SamiraFight.currentBoss.mapModelId == SamiraFight.kuafuBossMapId) {
              GameServer.sendCommand(new C2S_PlayerEnterNationWarMessage());
            } else {
              var cmd = new C2S_TransmitToServerMessage();
              cmd.transParam = '{"mapmodelid":' + SamiraFight.currentBoss.mapModelId + '}';
              cmd.type = 6;
              GameServer.sendCommand(cmd);
            }
            // 进入地图后重新寻找boss
            SamiraFight.currentStatus = 'search';
            console.log('[samira]找到boss, 但是不在当前地图, 切换状态: search, 先进入地图:', selectBoss);
            return;
          } else {
            console.log('[samira]找到boss:', selectBoss);
            SamiraFight.currentcheckTimes = 0;
            SamiraFight.currentStatus = 'fight';
          }
        } else {
          console.log('[samira]没有找到boss, 开启自动攻击, 重新寻找boss');
          // 去第一个地图打怪
          if (mapIds.length > 0) {
            const mid = mapIds[0];
            if (mid != playerMapId) {
              SamiraFight.tp(mid);
            } else {
              App.openAutoFight();
            }
          }
        }
      }

    } else if (SamiraFight.currentStatus === 'fight') {
      // 怪物为空
      if (SamiraFight.currentBoss == null) {
        console.log('[samira]boss为空, 重新寻找boss');
        SamiraFight.currentStatus = 'search';
        return;
      }

      // boss死亡
      if (SamiraFight.currentBoss.remainTime > ts + SamiraFight.config.waitBossTime) {
        console.log('[samira]boss已被击杀, 重新寻找boss');
        SamiraFight.currentStatus = 'search';
        return;
      }

      // 怪物已刷新后归属改变
      if (SamiraFight.currentBoss.remainTime == 0 && SamiraFight.currentBoss.owner != '' && SamiraFight.currentBoss.owner != playerName) {
        console.log('[samira]boss已有归属(' + SamiraFight.currentBoss.owner + '), 重新寻找boss3');
        SamiraFight.currentStatus = 'search';
        return;
      }

      // 检查超时
      SamiraFight.currentcheckTimes += 1;
      if (SamiraFight.currentcheckTimes >= SamiraFight.config.bossTimeOut) {
        console.log('[samira]当前boss' + SamiraFight.currentcheckTimes + '秒未死亡, 重新进行寻路');
        SamiraFight.currentStatus = 'search';
      }

      SamiraFight.toPointFight(SamiraFight.currentBoss.mapModelId, SamiraFight.currentBoss.monsterX, SamiraFight.currentBoss.monsterY);
    } else if (SamiraFight.currentStatus === 'fight-xiuluo') {
      if (SamiraFight.currentXiuLuoCengshu <= 0) {
        console.log('[samira]修罗层数设置不正确, 开始寻找');
        SamiraFight.currentXiuLuoCengshu = -1;
        SamiraFight.currentStatus = 'search';
        return;
      }

      if (com.App.role._mapId != 200000) {
        console.log('[samira]当前人物不在boss地图中, 开始寻找');
        SamiraFight.currentXiuLuoCengshu = -1;
        SamiraFight.currentStatus = 'search';
        return;
      }

      const monsters = com.modules.boss.lianyu.LianyuCenter._dic[200000]._dic['10000' + SamiraFight.currentXiuLuoCengshu].monsters;
      const aliveCount = monsters.filter(x => x.receiveTimestamp == 0).length;
      if (aliveCount == 0) {
        console.log('[samira]boss已全部死亡, 开始寻找');
        SamiraFight.currentStatus = 'search';
        SamiraFight.currentXiuLuoCengshu = -1;
        return;
      } else {
        console.log('[samira]还有' + aliveCount + '个boss没有死亡, 继续打怪');
      }
    } else if (SamiraFight.currentStatus === 'wudao') {
      // 因为匹配和进入地图需要时间, 15秒后, 判断地图是不是在武道会, 如果不在说明已经结束
      if (SamiraFight.currentWudaocheckTimes > 15 && playerMapId != 190000) {
        console.log('[samira]比武已经结束, 重新寻找boss');
        SamiraFight.currentWudaocheckTimes = 0;
        SamiraFight.currentBoss = null;
        SamiraFight.currentStatus = 'search';

        // 记录次数
        if (SamiraFight.wudaoLastNum == com.logic.data.MoneyCenter.getMoney(EnumMoney.JINGJI)) {
          SamiraFight.wudaoLastNumTimes += 1;
        } else {
          SamiraFight.wudaoLastNum = com.logic.data.MoneyCenter.getMoney(EnumMoney.JINGJI);
          SamiraFight.wudaoLastNumTimes = 1;
        }

        // 关闭武道会
        if (SamiraFight.wudaoLastNumTimes >= 2) {
          SamiraFight.wudaoLastNum = -1;
          SamiraFight.wudaoLastNumTimes = 0;
          SamiraFight.wudaoStatus = false;
          PanelManager.closeByClass(WulingdahuiView);
          PanelManager.closeByClass(WulingdahuiPipeiPanel);
          SamiraFight.wudaoResumeTs = ts + 60 * 30;
          console.log('[samira]武道会暂时关闭, 不再进行匹配!');
        }
        return;
      }

      SamiraFight.currentWudaocheckTimes += 1;
      if (SamiraFight.currentWudaocheckTimes >= 180) {
        console.log('[samira]比武超时, 重新搜索boss');
        SamiraFight.currentBoss = null;
        SamiraFight.currentStatus = 'search';
        return;
      }

      console.log('[samira]正在比武(' + SamiraFight.currentWudaocheckTimes + ')...');
    } else if (SamiraFight.currentStatus === 'kuafuboss') {
      // 怪物为空
      if (SamiraFight.currentBoss == null) {
        console.log('[samira]boss为空, 重新寻找boss');
        SamiraFight.currentStatus = 'search';
        return;
      }

      // 传送到boss地图
      if (playerMapId !== SamiraFight.currentBoss.mapModelId) {
        GameServer.sendCommand(new C2S_PlayerEnterNationWarMessage());
        return;
      }

      // boss被击杀后
      const boss = SamiraFight.kuafuBossData.find(x => x.monsterIn64Id == SamiraFight.currentBoss.monsterIn64Id);
      if (boss == null) {
        console.log('[samira]boss已被击杀, 重新寻找boss');
        SamiraFight.currentStatus = 'search';
        return;
      }

      // boss被击杀后
      if (boss.remainTime > 0 || boss.curHp <= 0) {
        console.log('[samira]boss已被击杀, 重新寻找boss');
        SamiraFight.currentStatus = 'search';
        return;
      }

      const attact = SamiraFight.kuafuBossHpDic[boss.monsterIn64Id] || 0;
      if ((attact / boss.allHp) * 100 > SamiraFight.config.zhanchangBossHp) {
        console.log('[samira]boss已被自己攻击超过2%, 重新寻找boss');
        SamiraFight.currentStatus = 'search';
        return;
      }

      SamiraFight.toPointFight(SamiraFight.currentBoss.mapModelId, SamiraFight.currentBoss.monsterX, SamiraFight.currentBoss.monsterY)
    } else if (SamiraFight.currentStatus === 'xukongliehen') {
      if (minutes >= 55) {
        console.log('[samira]虚空裂痕已经结束, 重新寻找boss');
        SamiraFight.currentStatus = 'search';
        return;
      }

      // 传送到boss地图
      if (playerMapId != 23001) {
        var cmd = new C2S_JoinActivityMessage();
        cmd.activityId = 100080;
        cmd.count = 1;
        cmd.extendMap = '';
        GameServer.sendCommand(cmd);
      }

      // 开启自动攻击
      com.App.openAutoFight();
    } else if (SamiraFight.currentStatus === 'yabiao') {
      const taskId = SamiraFight.config.yabiaoType === '1' ? 640004 : 640006;
      const data = com.modules.escort.EscortCenter.getData(taskId);
      if (!data || !data.taskData) {
        return;
      }

      const status = data.taskState;
      // 未接任务
      if (status == 0) {

        if (SamiraFight.config.yabiaoType === '1') {
          if (money < 2000000) {
            console.log('[samira]金币不足, 无法接取任务');
            SamiraFight.currentStatus = 'search';
            return;
          }
        } else {
          if (diamond < 5000) {
            console.log('[samira]钻石不足, 无法接取任务');
            SamiraFight.currentStatus = 'search';
            return;
          }
        }

        EventMgr.dispatch('TE.taskTransfer', com.modules.escort.EscortCenter.getData().taskData.getConditionData(), JSON.stringify({ npcid: 2086 }), 1, true);
        TaskCommandSender.sendAccpetTask(data.taskID, data.taskType);
        PanelManager.removePanel(PanelRegister.ESCORT_ACCEPT);
      }
      // 押镖中
      else if (status == 1) {
        data.findCar();
      }
      // 完成
      else if (status == 2) {
        EventMgr.dispatch('TE.taskTransfer', data.taskData.getConditionData(), JSON.stringify({ npcid: 2087 }), 1, true);
        com.logic.connect.sender.TaskCommandSender.sendFinishTask(data.taskID, data.taskType);
        SamiraFight.currentStatus = 'search';
        console.log('[samira]押镖任务已完成, 重新寻找boss');
      } else {
        console.log('[samira]押镖状态异常:', status);
        SamiraFight.currentStatus = 'search';
      }
    } else if (SamiraFight.currentStatus === 'xiaoguai') {
      if (dayXiaoGuaiTaskComplateTimes >= dayXiaoGuaiTaskTimes) {
        console.log('[samira]跨服小怪任务已完成, 重新寻找boss');
        SamiraFight.currentStatus = 'search';
        return;
      }

      // 如果不在地图内, 就进入地图
      if (playerMapId != SamiraFight.kuafuBossMapId) {
        GameServer.sendCommand(new C2S_PlayerEnterNationWarMessage());
        return;
      }

      console.log('[samira]跨服小怪任务打怪中...(' + dayXiaoGuaiTaskComplateTimes + '/' + dayXiaoGuaiTaskTimes + ')', SamiraFight.kuafuXiaoGuai.target);

      // 重新寻找目标
      const monsters = com.App.mapModule.mapAvatarModel.getMonstersByModelId(30001115);

      // 如果有目标, 并且目标活着, 就去攻击, 否则重新寻找目标
      if (SamiraFight.kuafuXiaoGuai.target && monsters.indexOf(SamiraFight.kuafuXiaoGuai.target) != -1 && SamiraFight.kuafuXiaoGuai.target.hp > 0) {
        SamiraFight.toPointFight(SamiraFight.kuafuBossMapId, SamiraFight.kuafuXiaoGuai.target.nodex, SamiraFight.kuafuXiaoGuai.target.nodey);
        return;
      } else {
        SamiraFight.kuafuXiaoGuai.target = null;
      }

      // 如果周围有怪物, 就确定目标
      if (monsters.length > 0) {
        const monster = monsters[0];
        SamiraFight.kuafuXiaoGuai.target = monster;
        com.App.openAutoFight();
        return;
      }
      // 如果周围没有怪物, 就去目标地点
      else {
        // 移动到指定坐标
        const point = SamiraFight.kuafuXiaoGuai.points[SamiraFight.kuafuXiaoGuai.pointIndex];
        const playerPosition = SamiraFight.getPlayerPositionNode();
        if (playerPosition.x >= point.x - 2 && playerPosition.x <= point.x + 2 && playerPosition.y >= point.y - 2 && playerPosition.y <= point.y + 2) {
          SamiraFight.kuafuXiaoGuai.pointIndex += 1;
          if (SamiraFight.kuafuXiaoGuai.pointIndex >= SamiraFight.kuafuXiaoGuai.points.length) {
            SamiraFight.kuafuXiaoGuai.pointIndex = 0;
          }
        } else {
          SamiraFight.toPointFight(SamiraFight.kuafuBossMapId, point.x, point.y)
        }
      }
    } else if (SamiraFight.currentStatus === 'zhenyingzhan') {
      if (minutes >= 15) {
        console.log('[samira]阵营战已经结束, 重新寻找boss');
        SamiraFight.currentStatus = 'search';
        return;
      }

      // 传送到boss地图
      if (playerMapId != 33006) {
        ActivitiesCommandSender.joinByFuncType(1);
      }

      if (SamiraFight.config.autoRevive != '1') {
        $('.samira-auto-revive').prop('checked', true);
      }

      // 开启自动攻击
      com.App.openAutoFight();
    } else if (SamiraFight.currentStatus === 'yijieruqin') {
      console.log('[samira]异界入侵选择BOSS: ' + SamiraFight.config.yijieruqinIndex);

      const bosses = com.App.dataMgr.q_activitiesContainer
        .getListByType(3000)
        .map(x => com.logic.data.activity.ActivityCenter.getData(x.q_id))
        .filter(x => x.activityStates > -1)
        .map(x => ({ actId: x.id, mapId: x.bean.q_info, name: x.bean.q_name }));
      const boss = bosses[SamiraFight.config.yijieruqinIndex - 1];

      // 角色不在目标地图, 就进入地图
      if (playerMapId != boss.mapId) {
        com.logic.connect.sender.ActivitiesCommandSender.C2S_JoinActivityById(boss.actId);
        ZoneCommandSender.enterZoneMap(boss.mapId);
        return;
      }

      const map = App.dataMgr.q_mapContainer.getDataBean(boss.mapId);
      const mapid = map.q_map_id;
      const bossid = map.q_boss ? JSON.parse(map.q_boss)[0]['monster'] : 0;
      const num = BossDataCenter.instance.getMapsBossNum([mapid], null, [bossid], true);

      // 检查boss是否死亡
      if (num == 0) {
        console.log('[samira]异界入侵boss已死亡, 重新寻找boss');
        SamiraFight.currentStatus = 'search';
        return;
      }

      if (hours == 20 && minutes > 45) {
        console.log('[samira]异界入侵活动结束, 重新寻找boss');
        SamiraFight.currentStatus = 'search';
        return;
      }

      // 开启自动攻击
      com.App.openAutoFight();
    } else if (SamiraFight.currentStatus === 'sbk') {
      if (minutes >= 30) {
        console.log('[samira]沙巴克已结束, 重新寻找boss');
        SamiraFight.currentStatus = 'search';
        return;
      }

      // 如果在沙巴克地图中, 打开自动攻击
      if (EnumMapId.isInHuangcheng) {
        // 开启自动复活
        if (SamiraFight.config.autoRevive != '1') {
          $('.samira-auto-revive').prop('checked', true);
        }

        if (playerMapId != 10006) {
          EventMgr.dispatch('ET.character_move_to_position', 10006, 10, 21);
        } else {
          com.App.openAutoFight();
        }
        return;
      }

      // 进入地图
      com.logic.connect.sender.CastleWarCommandSender.askCountrySiegeSelect();
    } else if (SamiraFight.currentStatus === 'suoyaotacaiji') {
      // 刷新ncp信息
      WanyaoCenter.sendC2S_NpcInfoMessage();

      if (ts > SamiraFight.yaoshou.gatherTimeoutTs) {
        console.log('[samira]采集超时, 重新寻找boss');
        SamiraFight.currentStatus = 'search';
        return;
      }

      if (SamiraFight.yaoshou.npcInfo == null) {
        console.log('[samira]找不到要采集的水晶, 重新寻找BOSS');
        SamiraFight.currentStatus = 'search';
        return;
      }

      // 判断npc
      const npc = com.modules.boss.wanyao.WanyaoCenter._npcs[SamiraFight.yaoshou.npcInfo.mapModelId][SamiraFight.yaoshou.npcInfo.npcId.toString()];
      console.log('[samira]找到水晶:', npc);
      if (npc == null || npc.refreshTime > 0) {
        console.log('[samira]水晶还没有复活, 重新寻找BOSS');
        SamiraFight.currentStatus = 'search';
        return;
      }

      SamiraFight.toPointFight(npc.mapModelId, npc.x, npc.y, GameHandler.create(SamiraFight, function () {
        if (seconds % 15 == 0) { 
          console.log('[samira]发送采集水晶请求...');
          const npcId = npc.npcId.toString();
          com.logic.connect.sender.TaskCommandSender.sendC2S_NpcServicesMessage(npcId);
          com.logic.connect.sender.TaskCommandSender.sendServiceMessage(npcId, 2, 1);
        }
      }));
    } else if (SamiraFight.currentStatus === 'wudaohuijuesai') {
      if (minutes >= 25) {
        console.log('[samira]武道会决赛, 重新寻找boss');
        SamiraFight.currentStatus = 'search';
        return;
      }
    } else if (SamiraFight.currentStatus === 'longhunboss') {
      // 当前副本的次数没有了, 说明已经打完了
      const zones = SamiraFight.getCanEnterLongHunBossZoneIds();
      if (!zones.includes(SamiraFight.currentLongHunZoneId)) {
        SamiraFight.currentStatus = 'search';
        SamiraFight.currentLongHunZoneId = 0;
        console.log('[samira]龙魂副本已经打完, 重新寻找boss');
        return;
      }

      // 检查玩家是否再副本地图中
      const zoneInfo = com.logic.data.zone.ZoneCenter.getZone(SamiraFight.currentLongHunZoneId);
      const bean = zoneInfo ? zoneInfo.bean : null;
      if (bean) {
        const mapId = JSON.parse(bean.q_mapid)[0];
        if (com.App.role.mapId != mapId) {
          SamiraFight.currentStatus = 'search';
          SamiraFight.currentLongHunZoneId = 0;
          console.log('[samira]龙魂副本已经打完, 重新寻找boss');
          return;
        }
      }
    } else if (SamiraFight.currentStatus === 'jiaoyi') {
      const mapId = 21000;
      console.log('[samira][jiaoyi]当前正在交易', SamiraFight.jiaoyi);

      // 如果已经两分钟了, 就推出交易
      if (ts > SamiraFight.jiaoyi.startTime + 60) {
        console.log('[samira]交易超时, 重新寻找boss');
        SamiraFight.currentStatus = 'search';
        // 如果超时了就20分钟内不再交易
        SamiraFight.jiaoyi.allowTime = ts + 1200
        return;
      }

      // 如果不在主城, 就先回城
      if (playerMapId != mapId) {
        console.log('[samira][jiaoyi]角色不在主城,  马上回城');
        com.App.returnCity();
        return;
      }

      // 走到指定的交易地点
      const playerPosition = SamiraFight.getPlayerPositionNode();
      const jiaoyix = 222, jiaoyiy = 214;
      if (!(playerPosition.x >= jiaoyix - 2 && playerPosition.x <= jiaoyix + 2 && playerPosition.y >= jiaoyiy - 2 && jiaoyiy + 2)) {
        EventMgr.dispatch('ET.character_move_to_position', mapId, jiaoyix, jiaoyiy);
        console.log('[samira][jiaoyi]角色不在指定位置,  正在赶路');
        return;
      }

      // 发起方, 判断是否又可以交易的商品, 没有了的话就退出, 并且给接收方发送退出消息
      const configItem = (SamiraFight.config.zbfs || []).find(x => x.name == SamiraFight.jiaoyi.targetUserName);
      if (SamiraFight.jiaoyi.type == 1) {
        if (!configItem) {
          console.log('[samira][jiaoyi]发起方没有找到交易商品1, 重新寻找boss');
          SamiraFight.currentStatus = 'search';
          com.game.modules.chats.data.ChatCenter.sendChat(2, '交易中止', SamiraFight.jiaoyi.targetUserName, true, null, 'ChatDialog');
          return;
        }

        let findCount = SamiraFight.getEnableDealItems(configItem.job, configItem.rank).length;
        console.log('[samira][jiaoyi]发起方找到交易商品:', configItem, '数量:', findCount);
        if (findCount <= 0) {
          console.log('[samira][jiaoyi]发起方没有找到交易商品2, 重新寻找boss');
          SamiraFight.currentStatus = 'search';
          com.game.modules.chats.data.ChatCenter.sendChat(2, '交易中止', SamiraFight.jiaoyi.targetUserName, true, null, 'ChatDialog');
          return;
        }
      }
      
      // 判断交易栏是否打开, 如果打开就添加商品, 如果没打开就申请
      if (!com.game.core.panel.PanelManager.isShowing(com.modules.jiaoyi.JiaoyiPanel)) {
        console.log('[samira][jiaoyi]交易栏没有打开, 发送交易请求');
        if (SamiraFight.jiaoyi.type == 1) {
          com.logic.data.item.DealCenter.sendC2S_InviteTransactionMessage(SamiraFight.jiaoyi.targetUserId)
        } else {
          com.logic.data.item.DealCenter.sendC2S_DealInviteTransactionMessage(0, SamiraFight.jiaoyi.targetUserId)
        }
        return;
      }

      // 如果不允许发送装备, 直接锁定并提交
      if (!configItem) {
        console.log('[samira][jiaoyi]不允许给交易对象发送装备, 直接确认');
        com.logic.data.item.DealCenter.sendC2S_AddTransactionItemMessage(2, null);
        com.logic.data.item.DealCenter.sendC2S_ConfirmTransactionMessage();
        return;
      }

      // 如果添加足够商品了, 就锁定
      const submitItemsDic = com.game.core.panel.PanelManager.getPanel(com.modules.jiaoyi.JiaoyiPanel)._gouDic || {};
      const submitItems = [];
      for (const k in submitItemsDic) {
        submitItems.push(k);
      }
      const eqList = SamiraFight.getEnableDealItems(configItem.job, configItem.rank);
      const isAddComplete = submitItems.length >= 12 || submitItems.length >= eqList.length;
      console.log('[samira][jiaoyi]交易栏已添加商品:', submitItems, '是否添加完成:', isAddComplete);

      if (!isAddComplete) {
        // 判断是否可以给对方装备, 如果可以, 就添加装备
        console.log('[samira][jiaoyi]交易判断是否发送装备,', configItem);
        if (configItem) {
          console.log('[samira][jiaoyi]交易发送装备列表,', eqList);
          // 添加装备
          for (let i = 0; i < (eqList.length > 12 ? 12 : eqList.length); i++) {
            com.logic.data.item.DealCenter.sendC2S_AddTransactionItemMessage(0, eqList[i].id);
          }
        }
        return;
      }

      console.log('[samira][jiaoyi]交易栏已添加商品完成, 锁定并提交');

      // 锁定并且提交
      com.logic.data.item.DealCenter.sendC2S_AddTransactionItemMessage(2, null);
      com.logic.data.item.DealCenter.sendC2S_ConfirmTransactionMessage();
    } else if (SamiraFight.currentStatus === 'hunhuan') {
      const mapIds = SamiraFight.getHunhuanMaps();
      if (mapIds.length <= 0) {
        console.log('[samira]魂环地图为空, 重新寻找boss');
        SamiraFight.currentStatus = 'search';
        SamiraFight.currentHunhuanBoss = null;
        return;
      }
      const mapId = mapIds[0];
      if (playerMapId != mapId) {
        console.log('[samira]已退出副本');
        SamiraFight.currentStatus = 'search';
        SamiraFight.currentHunhuanBoss = null;
        return;
      };

      if (SamiraFight.currentHunhuanBoss && (SamiraFight.currentHunhuanBoss.curHp <= 0 || SamiraFight.currentHunhuanBoss.remainTime > 0)) {
        console.log('[samira]魂环boss已死亡, 重新寻找boss');
        SamiraFight.currentHunhuanBoss = null;
        return;
      }

      // 判断是否存在目标, 如果存在就去打, 不存在则寻找
      if (!SamiraFight.currentHunhuanBoss) {
        const bosses = com.logic.data.zone.boss.BossDataCenter.instance.getBossListByMapId(mapId).filter(x => x.remainTime == 0 && (x.owner == '' || x.owner == playerName));
        
        if (bosses.length > 0) {
          SamiraFight.currentHunhuanBoss = bosses[0];
        } else {
          return;
        }
      }
      // 如果存在目标, 就走过去打
      else {
        SamiraFight.toPointFight(mapId, SamiraFight.currentHunhuanBoss.monsterX, SamiraFight.currentHunhuanBoss.monsterY)
      }
    } else if (SamiraFight.currentStatus === 'lilian') {
      const lilianTask = com.logic.data.task.TaskModel.lilianTask;
      if (!lilianTask) {
        console.log('[samira][历练]历练任务已全部完成');
        SamiraFight.currentStatus = 'search';
        TaskAuto.isAutoLilian = false;
        return;
      }
      console.log('[samira][历练]正在做历练任务...' + lilianTask.curCount, lilianTask);

      // 如果不是寻找物品, 就开启自动任务
      if (lilianTask.lilian_type != 3 && !TaskAuto.isAutoLilian) {
        TaskAuto.isAutoLilian = true;
      }

      // 如果任务层数不一致, 说明任务已经完成
      if (lilianTask.curCount != SamiraFight.currentLilian) {
        console.log('[samira][历练]历练任务已完成, 重新寻找boss', lilianTask.curCount, SamiraFight.currentLilian);
        SamiraFight.currentStatus = 'search';
        TaskAuto.isAutoLilian = false;
        return;
      }

      // 如果是寻找物品, 就判断任务状态, 自动打怪
      if (lilianTask.lilian_type == 3) {
        // 未完成, 就去打boss
        if (lilianTask.taskState == 1) {
          // 如果有目标, 并且目标或者, 并且目标的归属是自己, 就去打
          const currentBoss = SamiraFight.currentLilianBoss;
          if (currentBoss && (currentBoss.owner == '' || currentBoss.owner == playerName) && currentBoss.remainTime == 0) {
            SamiraFight.toPointFight(currentBoss.mapModelId, currentBoss.monsterX, currentBoss.monsterY);
          } else {
            const boss = SamiraFight.getFightBoss();
            SamiraFight.currentLilianBoss = boss;
          }
        }
        // 已经获取任务物品
        else if (lilianTask.taskState == 2) {
          // 开启自动任务
          if (!TaskAuto.isAutoLilian) {
            TaskAuto.isAutoLilian = true;
          }
        }
      }
      // 如果是对话npc, 并且需要组队的任务
      else if (lilianTask.lilian_type == 4) {
        // 如果弹出了组队界面, 就直接进去
        if (com.game.core.panel.PanelManager.isShowing(com.modules.lilian.LilianTeamPanel)) {
          const panel = com.game.core.panel.PanelManager.getPanel(com.modules.lilian.LilianTeamPanel);
          if (panel) {
            panel.onClick({ currentTarget: panel._view.btnStart })
            // 关闭panel
            com.game.core.panel.PanelManager.closeByClass(com.modules.lilian.LilianTeamPanel);
          }
        }
      }
    } else if (SamiraFight.currentStatus === 'sanguoxiaoguai') {
      // 没在地图中就进入地图
      if (playerMapId != SamiraFight.sanguoXiaoguaiMapId) {
        SamiraFight.tp(SamiraFight.sanguoXiaoguaiMapId);
      }

      // 超时后重新寻找boss
      if (ts > SamiraFight.sanguoXiaoguaiEndTs) {
        console.log('[samira]三国小怪已结束, 重新寻找boss');
        SamiraFight.currentStatus = 'search';
        return;
      }

      // 开启自动攻击
      com.App.openAutoFight();
    } else if (SamiraFight.currentStatus === 'sanguoxiaoguaimeiri') {
      const map = JSON.parse(App.dataMgr.q_globalContainer.getDataBean(45027).q_string_value);
      const itemId = map[SamiraFight.sanguoXiaoguaiMeiriMapId].id;
      const info = ZuoQiCenter.getDrop(itemId);
      const num = info ? info.num : 0;
      const max = info ? info.maxNum : 0;
      console.log('[samira]三国小怪任务打怪中...(' + num + '/' + max + ')');
      if (num >= max) {
        console.log('[samira]三国小怪任务已完成, 重新寻找boss');
        SamiraFight.currentStatus = 'search';

        if (!SamiraFight.sanguoXiaoguaiMeiriComplateMapIds) {
          SamiraFight.sanguoXiaoguaiMeiriComplateMapIds = [];
        }

        SamiraFight.sanguoXiaoguaiMeiriComplateMapIds.push(playerMapId);

        return;
      }

      // 没在地图中进入地图
      if (playerMapId != SamiraFight.sanguoXiaoguaiMeiriMapId) {
        SamiraFight.tp(SamiraFight.sanguoXiaoguaiMeiriMapId);
      }

      // 开启自动攻击
      com.App.openAutoFight();
    } else if (SamiraFight.currentStatus === 'trace') { 
      // 怪物为空
      if (SamiraFight.currentBoss == null) {
        console.log('[samira]boss为空, 重新寻找boss');
        SamiraFight.currentStatus = 'search';
        return;
      }

      // boss死亡
      if (SamiraFight.currentBoss.remainTime > 0) {
        console.log('[samira]boss已被击杀, 重新寻找boss');
        SamiraFight.currentStatus = 'search';
        return;
      }

      // 走到boss旁边
      SamiraFight.toPointFight(SamiraFight.currentBoss.mapModelId, SamiraFight.currentBoss.monsterX, SamiraFight.currentBoss.monsterY, GameHandler.create(SamiraFight, function () {
        const trackName = SamiraFight.currentBoss.owner;
        // 如果旁边有人, 就大人
        // 如果没有人, 就打怪
      }));
    } else if (SamiraFight.currentStatus === '3v3') {
      // 如果是正在匹配和正在提交匹配, 就不做任何事情
      if (SamiraFight.a3v3.status === 'submit' || SamiraFight.a3v3.status === 'match') {
        console.log('[samira]3v3正在匹配中, 请等待...');
        return;
      }
      // 如果状态是fail, 则表示匹配失败, 退出3v3
      if (SamiraFight.a3v3.status === 'fail') {
        console.log('[samira]3v3匹配失败, 重新寻找boss');
        SamiraFight.currentStatus = 'search';
        return;
      }
      // 如果状态是end, 则表示已经结束了
      if (SamiraFight.a3v3.status === 'end' && playerMapId != 210046) {
        console.log('[samira]3v3已结束, 重新寻找boss');
        SamiraFight.currentStatus = 'search';
        return;
      }
      // 如果状态是fight, 表示正在打3v3
      if (SamiraFight.a3v3.status === 'fight') {
        console.log('[samira]3v3正在打架中...');
        SamiraFight.toPointFight(210046, 40,40);
        return;
      }
    }
  };

  // 获取飞升地图
  SamiraFight.getFeishengMapIds = function (indexs) { 
    const allMapIds = (com.modules.feisheng.FeiShengCenter.fs_datas || []).filter(x => x.isEnter)
      .map(x => x.bean.q_map_id);
    
      const mapIds = [];
      for (const index of indexs) { 
        const i = index < 0 ? allMapIds.length + index : index - 1;
        if (i < 0 || i >= allMapIds.length) { 
          continue;
        }
        mapIds.push(allMapIds[i]);
      }
  
      return mapIds;
  };

  // 获取三国地图
  SamiraFight.getSanguoMapIds = function (indexs) {
    const allowMaps = SamiraFight.getCanIntoSanguoMapIds();
    const mapIds = [];
    for (const index of indexs) { 
      const i = index < 0 ? allowMaps.length + index : index - 1;
      if (i < 0 || i >= allowMaps.length) { 
        continue;
      }
      mapIds.push(allowMaps[i]);
    }

    return mapIds;
  };

  // 获取三国可以进入的地图
  SamiraFight.getCanIntoSanguoMapIds = function () { 
    const data = com.logic.data.zone.boss.BossDataCenter.sanguo.sort((v1, v2) => {
      if (v1.bean.q_order == v2.bean.q_order) {
        return parseInt(v1.bean.q_image) - parseInt(v2.bean.q_image);
      }
      return v1.bean.q_order - v2.bean.q_order;
    }).map(x => x.maps[0]);
    const allowMaps = [];
    for (const mapId of data) { 
      const map = com.App.dataMgr.q_mapContainer.getDataBean(mapId);
      const flag = com.game.core.utils.ConditionUtil.isMapCanEnter(map);
      if (flag) { 
        allowMaps.push(mapId);
      }
    }
    return allowMaps;
  }

  // 获取挂机的boss
  SamiraFight.getFightBoss = function () { 
    const playerName = com.App.role._name;
    const playerMapId = com.App.role._mapId;
    const mapIds = SamiraFight.getGuaJiMapIds();
    
    let selectBoss = null;
    const bosses = [];
    const bossFilterFunc = boss => boss.bean.q_type == 16 && (boss.owner === playerName || boss.owner == '' || boss.owner == null) && boss.remainTime === 0;
    // 如果玩家当前所在地图在挂机地图中, 优先获取玩家当前所在地图的boss
    if (mapIds.includes(playerMapId)) {
      // 获取当前地图活着的boss
      const currentMapBossesObject = BossDataCenter.instance._mapbossDic[playerMapId];
      const currentMapBosses = [];
      for (const bossId in currentMapBossesObject) {
        const bs = currentMapBossesObject[bossId];
        for (const b in bs) {
          currentMapBosses.push(bs[b]);
        }
      }
      const currentMapFilterBosses = currentMapBosses.filter(bossFilterFunc);
      bosses.push(...currentMapFilterBosses);
    }

    // 获取当前地图最近的一个boss
    if (bosses.length > 0) {
      // 获取每个boss的距离
      for (const b of bosses) {
        const vo = new com.game.core.scene.map.road.SearchToPointVO();
        const p = com.game.core.scene.map.libarys.MapVO.getCenterPoint(b.monsterX, b.monsterY);
        vo.px = p.x;
        vo.py = p.y;
        vo.shift = 0;
        vo.type = 'walk';
        const list = com.App.mapModule.mapMoveModel.searchRoadByAstar(vo);
        b.distance = list ? list.length : 9999999;
      }
      // 获取最近的一个
      const sortedBosses = bosses.sort((a, b) => a.distance - b.distance);
      selectBoss = sortedBosses[0];
      console.log('[samira]找到当前地图boss', selectBoss)
    }
    // 如果当前地图没有boss, 就获取所有地图的
    else {
      // 获取地图中boss最多的地图
      const allMapBosses = [];
      for (const mapId of mapIds) {
        const mapBosses = BossDataCenter.instance._mapbossDic[mapId];
        for (const bossId in mapBosses) {
          const bs = mapBosses[bossId];
          for (const b in bs) {
            allMapBosses.push(bs[b]);
          }
        }
      }

      // 筛选出来活着的并且没有归属的
      const allMapFilterdBosses = allMapBosses.filter(bossFilterFunc);
      const mapBossCount = {};
      for (const b of allMapFilterdBosses) {
        const mid = b.mapModelId;
        if (mapBossCount[mid]) {
          mapBossCount[mid] += 1;
        } else {
          mapBossCount[mid] = 1;
        }
      }
      // 获取boss数量最多的地图
      let maxCount = 0;
      let maxCountMapId = 0;
      for (const key in mapBossCount) {
        if (mapBossCount[key] > maxCount) {
          maxCount = mapBossCount[key];
          maxCountMapId = key;
        }
      }

      console.log('[samira]所有地图boss数量:', mapBossCount, '最多的地图:', maxCountMapId, '数量:', maxCount);

      if (maxCount != 0 && maxCountMapId != 0) {
        const boss = allMapFilterdBosses.find(x => x.mapModelId == maxCountMapId);
        if (boss) {
          selectBoss = boss;
        }
      }
    }

    return selectBoss;
  }

  // 获取魂环地图
  SamiraFight.getHunhuanMaps = function () { 
    const items = com.logic.data.zone.boss.BossDataCenter.hhmijing.filter(x => x.isEnter);
    if (items.length <= 0) { 
      return [];
    }
    const mapId = items[items.length - 1].bean.q_map_id;
    return [mapId];
  };

  // 去指定地点打怪
  SamiraFight.toPointFight = function (mapid, x, y, callback) {
    const offset = 2;
    if (!callback) { 
      callback = GameHandler.create(com.App, com.App.openAutoFight);
    }

    // 不在地图中，先去地图
    if (com.App.role.mapId !== mapid) {
      if (mapid == SamiraFight.kuafuBossMapId) {
        GameServer.sendCommand(new C2S_PlayerEnterNationWarMessage());
      } else {
        var cmd = new C2S_TransmitToServerMessage();
        cmd.transParam = '{"mapmodelid":' + mapid + '}';
        cmd.type = 6;
        GameServer.sendCommand(cmd);
      }
      return;
    }

    // 获取当前角色位置
    const playerPosition = SamiraFight.getPlayerPositionNode();
    if (playerPosition.x >= x - offset && playerPosition.x <= x + offset && playerPosition.y >= y - offset && playerPosition.y <= y + offset) {
      callback.run();
    } else {
      EventMgr.dispatch('ET.character_move_to_position', mapid, x, y, true, callback);
    }
  }

  // 通过职业名获取职业编码
  SamiraFight.getJobCodeByName = function (name) { 
    if (name == '战士') return 1;
    if (name == '法师') return 2;
    if (name == '道士') return 3;
  };

  // 获取玩家位置(node)
  SamiraFight.getPlayerPositionNode = function () {
    var x = Math.floor(com.App.role._map_x / MapConfig.MAP_NODE_WIDTH);
    var y = Math.floor(com.App.role._map_y / MapConfig.MAP_NODE_HEIGHT);
    return { x: x, y: y };
  };

  // 获取挂机地图id, 首先先从输入框获取, 如果为空则使用巡航地图
  SamiraFight.getGuaJiMapIds = function () {
    const mapNames = SamiraFight.config.guajiMapNames || '';
    const nameArray = mapNames
      .split('|')
      .map(x => (x ? x.trim() : ''))
      .filter(x => x != '' && x != null && x != undefined);
    const mapIds = nameArray
      .map(x => com.App.dataMgr.q_mapContainer.list.find(z => z.q_map_name == x))
      .filter(x => x)
      .map(x => x.q_map_id);
    if (mapIds.length > 0) {
      return mapIds;
    }
    return NeiGuaFight._saveMapIds.filter(x => x != 0);
  };

  // 获取福利boss地图列表
  SamiraFight.getFuliBossMaps = function () {
    return com.App.dataMgr.q_mapContainer.list.filter(x => x.q_map_id >= 500001 && x.q_map_id <= 500021);
  };

  // 获取最大等级福利boss地图
  SamiraFight.getMaxLevelFuliBossMapId = function () {
    const maps = SamiraFight.getFuliBossMaps();
    let mapId = -1;
    for (const map of maps) {
      if (mapId == -1) {
        mapId = map.q_map_id;
        continue;
      }

      const minLevel = JSON.parse(map.q_entry_condition)[0].q_min_level;
      const playerLevel = com.App.role._level;
      if (playerLevel >= minLevel) {
        mapId = map.q_map_id;
      }
    }
    return mapId;
  };

  // 获取上古禁地地图
  SamiraFight.getShanguBossMaps = function () {
    return com.App.dataMgr.q_mapContainer.list.filter(x => x.q_map_id >= 50001 && x.q_map_id <= 50020);
  };

  // 获取最大等级的上古禁地地图列表
  SamiraFight.getMaxLevelShangguBossMapIds = function (mapIndexs) {
    const indexArray = (mapIndexs || '')
      .split('|')
      .filter(x => (x != '' && x != null) || x != undefined)
      .map(x => parseInt(x));
    
    const mapIds = SamiraFight.getCanIntoShangguBossMapIds();
    const result = [];
    for (const index of indexArray) {
      if (index >= 1 && index <= mapIds.length) {
        result.push(mapIds[index - 1]);
      } else if (index < 0) {
        result.push(mapIds[mapIds.length + index]);
      }
    }
    return result;
  };

  // 获取可以进入的上古禁地地图
  SamiraFight.getCanIntoShangguBossMapIds = function () { 
    const maps = SamiraFight.getShanguBossMaps();
    const mapIds = [];
    for (const map of maps) {
      const playerLevel = com.App.role._level;
      const serverOpenDay = com.game.core.utils.ServerTime.getOpenDays();

      const condition = JSON.parse(map.q_entry_condition)[0];
      const minLevel = condition.q_min_level;
      const openday = condition.openday;
      if (playerLevel >= minLevel && serverOpenDay >= openday) {
        mapIds.push(map.q_map_id);
      }
    }
    return mapIds;
  };

  // 获取战骑地图
  SamiraFight.getZhanqiBossMaps = function () {
    return com.App.dataMgr.q_mapContainer.list.filter(x => x.q_map_id >= 200001 && x.q_map_id <= 200085);
  };

  // 获取选择的战骑地图
  SamiraFight.getSelectZhanqiBossMapId = function () {
    const indexArray = (SamiraFight.config.zhanqiMap || '')
      .split('|')
      .filter(x => (x != '' && x != null) || x != undefined)
      .map(x => parseInt(x));

    const mapIds = SamiraFight.getCanIntoZhanqiBossMapIds();
    const result = [];
    for (const index of indexArray) {
      if (index >= 1 && index <= mapIds.length) {
        result.push(mapIds[index - 1]);
      } else if (index < 0) {
        result.push(mapIds[mapIds.length + index]);
      }
    }
    return result;
  };

  // 获取可以进入的战骑地图
  SamiraFight.getCanIntoZhanqiBossMapIds = function () {
    const maps = SamiraFight.getZhanqiBossMaps();
    let mapIds = [];
    for (const map of maps) {
      const playerLevel = com.App.role._level;
      const serverOpenDay = com.game.core.utils.ServerTime.getOpenDays();

      const condition = JSON.parse(map.q_entry_condition)[0];
      const minLevel = condition.q_min_level;
      const openday = condition.openday;
      if (playerLevel >= minLevel && serverOpenDay >= openday) {
        mapIds.push(map.q_map_id);
      }
    }
    return mapIds;
  };

  // 获取遗迹地图
  SamiraFight.getYijiBossMaps = function () {
    return com.App.dataMgr.q_mapContainer.list.filter(x => x.q_map_id >= 220001 && x.q_map_id <= 220050);
  };

  // 获取最大等级遗迹地图id
  SamiraFight.getMaxLevelYijiBossMapId = function () {
    const maps = SamiraFight.getYijiBossMaps();
    let mapId = -1;
    // 军装数据
    const junzhuang = JunZhuangCenter.getSummaryAttrs();
    const tongshuai = KuafuBattleCenter.getAttrValue(junzhuang, '统率');
    const yongwu = KuafuBattleCenter.getAttrValue(junzhuang, '勇武');
    const zhimou = KuafuBattleCenter.getAttrValue(junzhuang, '智谋');
    const neizheng = KuafuBattleCenter.getAttrValue(junzhuang, '内政');
    const weiwang = KuafuBattleCenter.getAttrValue(junzhuang, '威望');
    for (const map of maps) {
      if (mapId == -1) {
        mapId = map.q_map_id;
        continue;
      }

      const conditions = map.q_entry_condition;
      if (conditions) {
        var condition = JSON.parse(conditions)[0];
        const cts = condition.q_tongshuai || 0;
        const cyw = condition.q_yongwu || 0;
        const czm = condition.q_zhimou || 0;
        const cnz = condition.q_neizheng || 0;
        const cww = condition.q_weiwang || 0;

        if (tongshuai >= cts && yongwu >= cyw && zhimou >= czm && neizheng >= cnz && weiwang >= cww) {
          mapId = map.q_map_id;
        }
      }
      // 如果没有条件, 就默认显示
      else {
        mapId = map.q_map_id;
      }
    }
    return mapId;
  };

  // 获取暗之神殿地图Ids
  SamiraFight.getAzsdMapIds = function () {
    return [210000, 210001, 210002, 210003];
  };

  // 获取可以进入得龙魂boss副本id
  SamiraFight.getCanEnterLongHunBossZoneIds = function () {
    const zones = com.App.dataMgr.q_zone_mapContainer.getZoneListByType(100);
    const canEnterZoneIds = [];

    for (const zone of zones) {
      const mapId = JSON.parse(zone.q_mapid)[0];
      const mapBean = com.App.dataMgr.q_mapContainer.getDataBean(mapId);
      if (!mapBean) {
        continue;
      }

      if (ConditionUtil.isMapCanEnter(mapBean)) {
        const zoneInfo = com.logic.data.zone.ZoneCenter.getZone(zone.q_id);
        if (zoneInfo && zoneInfo.syCanEnterTimes > 0) {
          canEnterZoneIds.push(zone.q_id);
        }
      }
    }
    return canEnterZoneIds;
  };

  // 添加ui
  SamiraFight.initUI = function () {
    // 添加css
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://mhjh.xianghongwei.cn/css.css';
    document.head.appendChild(link);

    const settingHtml = $(`<div class="samira-settings">
        <div class="samira-settings-inner">
            <div class="samira-settings-header" style='display:none'>功能设置</div>
            <div class="samira-settings-content">
                <fieldset class="samira-settings-fieldset">
                    <legend>功能</legend>
                    <div class="samira-settings-items">
												<div class="samira-settings-items-group">
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-auto-start' />自动开始</label></div>
														<div class="samira-settings-item samira-func-new"><label><input type="checkbox" class='samira-new' />新号模式</label></div>
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-auto-boss' />自动打BOSS</label></div>
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-auto-revive' />自动复活&自动战斗</label></div>
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-auto-ronglian' />自动熔炼</label></div>
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-auto-yuanshen-up' />元神升级</label></div>
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-auto-zhuansheng' />自动转生</label></div>
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-auto-ylgy' />传了个世</label></div>
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-auto-richang' />自动领取日常</label></div>
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-auto-free10' />免费10元礼包</label></div>
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-auto-wear' />自动穿装备</label></div>
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-auto-use' />自动使用(金币,经验)</label></div>
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-auto-zuoqi' />坐骑升级</label></div>
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-auto-neigong' />内功任务/升级</label></div>
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-auto-gubao' />古宝升级/激活</label></div>
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-auto-shenlu' />神炉升级</label></div>
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-redpack' />抢红包</label></div>
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-longhunboss' />龙魂BOSS</label></div>
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-duanzao' />强化&精炼</label></div>
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-auto-junzhuang' />军装升级</label></div>
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-auto-denglu' />登录奖励</label></div>
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-tiantianzanzhu' />天天赞助</label></div>
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-meirizhigou' />每日直购</label></div>
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-zaixianjiangli' />在线奖励</label></div>
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-sanguo-task' />三国任务</label></div>
												</div>
												<div class="samira-settings-items-group">
														<div class="samira-settings-item">
																<span>行会祈福</span>
																<input type="input" style="width: 50px;" class="samira-hhqf" />
														</div>
														<div class="samira-settings-item">
																<span>行会商城购买</span>
																<input type="input" style="width: 100px;" class="samira-hhgm" />
														</div>
														<div class="samira-settings-item">
																<span>BOSS提前蹲时间</span>
																<input type="input" style="width: 50px;" class="samira-wait-boss-time" />
														</div>
                            <div class="samira-settings-item">
																<label><input type="checkbox" class='samira-meirixiangou' />每日限购物品</label>
																<input type="input" style="width: 150px;" class="samira-meirixiangou-wupin" />
														</div>
												</div>
                        <div class="samira-settings-items-group">
														<div class="samira-settings-item"><label><input type="checkbox" class='samira-chat-nmsl' />被杀后发送跨服信息</label></div>
														<div class="samira-settings-item">
																<span>信息内容</span>
																<input type="input" style="width: 200px;" class="samira-chat-nmsl-text" />
														</div>
														<div class="samira-settings-item">
																<span>信息颜色</span>
																<input type="input" style="width: 80px;" class="samira-chat-nmsl-color" />
														</div>
                            <div class="samira-settings-item samira-func-track">
																<label><input type="checkbox" class='samira-track' />追杀玩家</label>
																<input type="input" style="width: 200px;" class="samira-track-names" />
														</div>
												</div>
                        <div class="samira-settings-items-group">
                            <div class="samira-settings-item">
																<span>挂机地图</span>
																<input type="input" style="width: 120px;" placeholder="多个地图名称用|隔开, 如果为空则使用巡航选择地图" class="samira-guaji-maps" />
														</div>
														<div class="samira-settings-item">
																<span>发送装备</span>
																<input type="input" style="width: 120px;" class="samira-zbfs" />
														</div>
														<div class="samira-settings-item">
																<span>接受装备</span>
																<input type="input" style="width: 120px;" class="samira-zbjs" />
														</div>
                            <div class="samira-settings-item">
																<label><input type="checkbox" class='samira-fangcangku' />物品放仓库</label>
																<input type="input" style="width: 120px;" class="samira-fangcangku-wupin" />
														</div>
												</div>
                    </div>
                </fieldset>
                <fieldset class="samira-settings-fieldset">
                    <legend>活动</legend>
                    <div class="samira-settings-items">
                        <div class="samira-settings-item"><label><input type="checkbox" class="samira-xukongliehen" />虚空裂痕</label></div>
                        <div class="samira-settings-item"><label><input type="checkbox" class="samira-zhenyingzhan" />跨服阵营战</label></div>
                        <div class="samira-settings-item"><label><input type="checkbox" class="samira-zhanchang-boss" />跨服神尊BOSS</label></div>
                        <div class="samira-settings-item">
                          <label>跨服神尊BOSS血量&nbsp</label>
													<input type="input" style="width: 80px; height: 15px;" class="samira-zhanchang-boss-hp" />
                        </div>
                        <div class="samira-settings-item" style="display: flex; align-items: center;">
                          <label><input type="checkbox" class="samira-yijieruqin" />异界入侵&nbsp</label>
													<input type="input" style="width: 80px; height: 15px;" class="samira-yijieruqin-index" />
                        </div>
                        <div class="samira-settings-item"><label><input type="checkbox" class="samira-sbk" />沙巴克</label></div>
                        <div class="samira-settings-item" style="display: none"><label><input type="checkbox" class="samira-wudao-juesai" />武道会决赛【周日20.00】</label></div>
                        <div class="samira-settings-item">
                            <input type="checkbox" class="samira-yabiao" />双倍押镖</label>
                            <select style="width: 60px;" class="samira-yabiao-type">
                              <option value="1">金币</option>
                              <option value="2">钻石</option>
                            </select>
                        </div>
                        <div class="samira-settings-item" style="display: flex; align-items: center;"><label><input type="checkbox" class="samira-3v3" />3v3</label></div>
                    </div>
                </fieldset>
                <fieldset class="samira-settings-fieldset">
                    <legend>日常</legend>
                    <div class="samira-settings-items">
                        <div class="samira-settings-items-group">
                            <div class="samira-settings-item" style="display: flex; align-items: center;">
                              <label>修罗天界层数&nbsp;</label>
                              <input type="input" style="width: 80px; height: 15px;" class="samira-xiuluo" />
                            </div>
                            <div class="samira-settings-item"><label><input type="checkbox" class="samira-fuli" />福利BOSS</label></div>
                            <div class="samira-settings-item"><label><input type="checkbox" class="samira-anzhishendian" />暗之神殿</label></div>
                            <div class="samira-settings-item"><label><input type="checkbox" class="samira-wudao" />武道会</label></div>
                            <div class="samira-settings-item"><label><input type="checkbox" class="samira-shenmoboss" />神魔BOSS</label></div>
                            <div class="samira-settings-item"><label><input type="checkbox" class="samira-zhanqi"/>战骑祭坛</label></div>
                            <div class="samira-settings-item" style="display: flex; align-items: center;">
                                <span>战骑祭坛地图&nbsp;</span>
                                <input type="input" style="width: 60px; height: 15px;" class="samira-zhanqi-map" />
                            </div>
                            <div class="samira-settings-item"><label><input type="checkbox" class="samira-yiji" />跨服遗迹</label></div>
                            <div class="samira-settings-item"><label><input type="checkbox" class="samira-xiaoguai" />跨服魔甲虫</label></div>
                            <div class="samira-settings-item"><label><input type="checkbox" class="samira-hunhuan" />魂环秘境</label></div>
                            <div class="samira-settings-item"><label><input type="checkbox" class="samira-lilian" />历练任务</label></div>
                            <div class="samira-settings-item">
																<label><input type="checkbox" class="samira-sanguo" />烽火三国</label>
																<input type="input" style="width: 60px;" class="samira-sanguo-map-index" />
														</div>
                            <div class="samira-settings-item">
																<label><input type="checkbox" class="samira-sanguo-xiaoguai-meiri-xinwu" />三国小怪每日信物</label>
																<input type="input" style="width: 60px;" class="samira-sanguo-xiaoguai-meiri-xinwu-indexs" />
														</div>
                            <div class="samira-settings-item">
																<label><input type="checkbox" class="samira-sanguo-xiaoguai-meiri" />三国小怪</label>
																<input type="input" style="width: 60px;" class="samira-sanguo-xiaoguai-meiri-indexs" />
														</div>
                            <div class="samira-settings-item">
																<label><input type="checkbox" class="samira-fsboss" />飞升BOSS</label>
																<input type="input" style="width: 60px;" class="samira-fsboss-indexs" />
														</div>
                        </div>
                        <div class="samira-settings-items-group">
                            <div class="samira-settings-item"><label><input type="checkbox" class="samira-shanggu" />上古禁地BOSS</label></div>
                            <div class="samira-settings-item">
                                <span>上古禁地BOSS地图</span>
                                <input type="input" style="width: 60px;" class="samira-shanggu-map" />
                            </div>
                            <div class="samira-settings-item"><label><input type="checkbox" class="samira-shanggu-xiaoguai" />上古禁地小怪</label></div>
                            <div class="samira-settings-item">
                                <span>上古禁地小怪地图</span>
                                <input type="input" style="width: 60px;" class="samira-shanggu-xiaoguai-map" />
                            </div>
                        </div>
                        <div class="samira-settings-items-group">
                            <div class="samira-settings-item"><label><input type="checkbox" class="samira-yaoshou" />妖兽锁魂塔BOSS</label></div>
                            <div class="samira-settings-item">
                                <span>妖兽锁魂塔层数</span>
                                <input type="input" style="width: 100px;" class="samira-yaoshou-boss" />
                            </div>
                            <div class="samira-settings-item"><label><input type="checkbox" class="samira-yaoshou-longlin" />采集龙鳞水晶</label></div>
                            <div class="samira-settings-item"><label><input type="checkbox" class="samira-yaoshou-fengyin" />采集凤吟水晶</label></div>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div class="samira-settings-footer" style="display: block; text-align: left; padding: 10px 10px;">
                <div>当前版本: ${SamiraFight.version}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前任务: <span class='samira-current-task'>无</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前目标: <span class='samira-current-boss'>无</span></div>
            </div>
            <div class="samira-settings-footer">
                <div class="samira-settings-footer-btn samira-settings-footer-btn-start">启动</div>
                <div class="samira-settings-footer-btn samira-settings-footer-btn-stop">关闭</div>
                <div class="samira-settings-footer-btn samira-settings-footer-btn-savaconfig">保存配置</div>
                <div class="samira-settings-footer-btn samira-settings-footer-btn-select-map">选择地图</div>
                <div class="samira-settings-footer-btn samira-settings-footer-btn-open-dev">打开控制台</div>
                <div class="samira-settings-footer-btn samira-settings-footer-btn-refresh">刷新</div>
                <div class="samira-settings-footer-btn samira-settings-footer-close">关闭窗口</div>
            </div>
        </div>
    </div>`);

    settingHtml.find('.samira-settings-footer-btn-start').click(function () {
      SamiraFight.start();
      $('.samira-settings').hide();
    });
    settingHtml.find('.samira-settings-footer-btn-stop').click(function () {
      SamiraFight.stop();
    });
    settingHtml.find('.samira-settings-footer-btn-savaconfig').click(function () {
      SamiraFight.saveConfig();
    });
    settingHtml.find('.samira-settings-footer-close').click(function () {
      $('.samira-settings').hide();
    });
    settingHtml.find('.samira-settings-footer-btn-select-map').click(function () {
      PanelOpenManager.openSetup(null, 4);
    });
    settingHtml.find('.samira-settings-footer-btn-open-dev').click(function () { 
      if(window.myApi && window.myApi.openDevTools) {
        window.myApi.openDevTools();
      }
    });
    settingHtml.find('.samira-settings-footer-btn-refresh').click(function () { 
      if(window.myApi && window.myApi.refresh) {
        window.myApi.refresh();
      }
    });


    $('.samira-settings').remove();
    $('body').append(settingHtml);

    const bossHpHtml = $(`<div style='bottom: 25px; padding: 10px; display: none;' class='samira-hp-container'>
              <div style='display: flex; '>
                <div>战场BOSS血量: </div>
                <div style='flex: 1; margin-left: 10px;' class='samira-hp-items'></div>
              </div>
        </div>`);
    $('.samira-hp-container').remove();
    $('body').append(bossHpHtml);

    const statusHtml = $(`<div class='samira-status-contaienr'>
        <div class='samira-settings-footer-btn samira-status' style='margin: 0px'>未运行</div>
      </div>`);
    statusHtml.find('.samira-status').click(function () {
      $('.samira-settings').toggle();
    });
    $('.samira-status-contaienr').remove();
    $('body').append(statusHtml);
  };

  // 修改内部函数
  SamiraFight.modifyInternelFunction = function () {
    ActivityCenter.getData = function (id) {
      // 修改内挂地图限制
      if (!id) {
        return null;
      }
      const data = ActivityCenter._actDict[id];
      if (data) {
        // 修改巡航为已开启
        if ([Q_globalCenter.getInt(15179), 200002, 200003, 200004, 200005, 200006, 200007, 200008, 200009].includes(id)) {
          data.playerStates = 0;
        }
      }
      return data;
    };

    FunctionManager.isFunctionOpen = function (functionId, needNotice, noticeType, noticeColor) {
      // 105-自动合成, 108-自动历练任务
      if ([105, 108].includes(functionId)) {
        return true;
      }

      needNotice === void 0 && (needNotice = false);
      noticeType === void 0 && (noticeType = -1);
      noticeColor === void 0 && (noticeColor = 0xff0000);
      if (FunctionManager._state != null) {
        if (myparseInt(functionId) == 0) {
          return true;
        }
        var bit = FunctionManager.getBit(functionId);
        if (bit == 0) {
          var bean = App.dataMgr.q_functionContainer.getDataBean(functionId, false);
          if (bean != null) {
            if (needNotice) {
              if (noticeType == -1) GameNotice.showMousePosMessage(bean.q_describe);
              else GameNotice.showNoticeTypeMsg(noticeType, bean.q_describe);
            }
          }
        } else {
          return true;
        }
      }
      return false;
    };

    com.App.popExitAlert = function () { };
  };

  // 传送
  SamiraFight.tp = function (mid) {
    if (com.App.role.mapId == mid) {
      return;
    }
    var cmd = new C2S_TransmitToServerMessage();
    cmd.transParam = '{"mapmodelid": ' + mid + '}';
    cmd.type = 6;
    GameServer.sendCommand(cmd);
  };

  // 发送聊天
  SamiraFight.sendChat = function (channel, text, color) {
    if (color) {
      com.logic.connect.sender.ChatCommandSender.sendChatRequestMessage(channel, `<font color="${color}">${text}</font>`, '', null, 'chat');
    } else {
      com.logic.connect.sender.ChatCommandSender.sendChatRequestMessage(channel, text, '', null, 'chat');
    }
  };

  // 发送聊天2
  SamiraFight.sendChat2 = function (channel, text) {
    function getColor(i, total) {
      const red = Math.round(255 * (1 - i / total)); // 红色逐渐减少
      const green = Math.round(255 * (i / total)); // 绿色逐渐增加
      const hex = (r, g, b) => {
        return (
          '#' +
          [r, g, b]
            .map(x => {
              const hex = x.toString(16);
              return hex.length === 1 ? '0' + hex : hex;
            })
            .join('')
        );
      };
      return hex(red, green, 0); // 蓝色保持为0
    }
    let html = '';
    for (let i = 0; i < text.length; i++) {
      html += `<font color="${getColor(i, text.length)}">${text[i]}</font>`;
    }
    com.logic.connect.sender.ChatCommandSender.sendChatRequestMessage(channel, html, '', null, 'chat');
  };

  // 角色死亡
  SamiraFight.onS2C_PlayerDieMessageHandler = function (cmd) {
    var personId = cmd.personId.toString();
    if (com.App.mapModule.mapAvatarModel.checkIsCharcter(personId)) {
      const records = cmd.records || [];
      if (records.length <= 0) {
        return;
      }
      const record = records[records.length - 1];
      const mapId = record.mapModelid;

      // 如果在战骑祭坛, 上古禁地, 锁魂塔,  跨服地图并且状态不是跨服boss, 就5分钟内不进行跨服活动
      // if (
      //   SamiraFight.getShanguBossMaps()
      //     .map(x => x.q_map_id)
      //     .includes(mapId) ||
      //   SamiraFight.getZhanqiBossMaps()
      //     .map(x => x.q_map_id)
      //     .includes(mapId) ||
      //   com.modules.boss.wanyao.WanyaoCenter.datas.map(x => x.bean.q_map_id).includes(mapId) ||
      //   mapId == SamiraFight.kuafuBossMapId ||
      //   SamiraFight.currentStatus != 'kuafuboss'
      // ) {
      //   // SamiraFight.kuafuActiveStatus = false;
      //   // SamiraFight.kuafuActiveResumeTs = Math.floor(Date.now() / 1000) + 300;
      //   SamiraFight.currentStatus = 'search';
      //   console.log('[samira]角色已死亡, 5分钟内不进行跨服活动');
      // }

      // 跨服频道发送辱骂
      if (SamiraFight.config.chatNmsl == '1') {
        const mapIds = [...SamiraFight.getShanguBossMaps().map(x => x.q_map_id), ...SamiraFight.getZhanqiBossMaps().map(x => x.q_map_id), SamiraFight.kuafuBossMapId];

        if (SamiraFight.currentStatus == 'kuafuboss') {
          return;
        }

        if (cmd.attackername && cmd.monstermodelid == 0 && mapIds.includes(mapId)) {
          const testList = (SamiraFight.config.chatNmslText || '').split('|').filter(x => x != null && x != undefined && x.trim() != '');
          const testDetail = testList[Math.floor(Math.random() * testList.length)];
          const attName = cmd.attackername;
          const myName = com.App.role._name;
          const mapName = com.App.dataMgr.q_mapContainer.getDataBean(mapId).q_map_name;
          const text = testDetail
            .replace(/attname/gi, attName)
            .replace(/mapname/gi, mapName)
            .replace(/myname/gi, myName);
          const color = SamiraFight.config.chatNmslColor;
          if (color == 1) {
            SamiraFight.sendChat2(5, text);
          } else {
            SamiraFight.sendChat(5, text, color);
          }
        }
      }
    }
  };

  // 打开红包
  SamiraFight.openRedPack = function (cmd) {
    if (SamiraFight.config.redpack == '1' && com.logic.data.zone.boss.BossDataCenter.instance.getTiliNum(184) > 0) {
      const list = cmd.hongbao;
      for (var $each_item in list) {
        item = list[$each_item];
        if (item.canGet == 1 && item.gotNum == 0) {
          var id = item.id.toString();
          ActivitiesCommandSender.sendC2S_HongbaoOpenMessage(Int64.parseInt64(id), App.role.personId);
        }
      }
    }
  };

  // 红包更新
  SamiraFight.onHongbaoActionMessage = function (cmd) {
    const hongbao = cmd.hongbao;
    SamiraFight.openRedPack({ hongbao: [hongbao] });
  };

  // 时间更新
  SamiraFight.onS2C_TimeMessage = function (cmd) {
    // 通知外壳
    if (window.myApi && window.myApi.heartBeat()) {
      window.myApi.heartBeat();
    }
  };

  // 收到聊天信息
  SamiraFight.onS2C_ChatResponseMessage = function (cmd) {
    if (!SamiraFight.running) { 
      return;
    }
    const ts = Math.floor(Date.now() / 1000);
    for (const record of cmd.records || []) {
      if (record.showtype != 2) { 
        continue;
      }

      const content = (record.content || '').trim();
      const playerName = record.sender ? record.sender.playerName : '';
      const playerId = record.sender ? record.sender.playerId.toString() : '';
      console.log('[samira][jiaoyi]收到chat消息',SamiraFight.jiaoyi,record, playerName, playerId, content, SamiraFight.config.zbjs, (SamiraFight.config.zbjs || []).includes(playerName));
      
      // 交易的时候只处理交易完成消息
      if (SamiraFight.currentStatus == 'jiaoyi') {
        if(content == '交易中止' && playerId == SamiraFight.jiaoyi.targetUserId) {
          SamiraFight.currentStatus = 'search';
          console.log('[samira][jiaoyi]收到交易中止信息, 交易中止', playerName);
          return;
        }
      } else {
        if (SamiraFight.currentStatus != 'wudao') {
          // 收到交易一下, 如果允许接受,就回复ok, 并且回城
          if (content === '交易一下' && (SamiraFight.config.zbjs || []).includes(playerName)) { 
            // 状态为交易
            SamiraFight.currentStatus = 'jiaoyi';
            com.game.modules.chats.data.ChatCenter.sendChat(2, '交易一下ok', playerName, true, null, 'ChatDialog');
            SamiraFight.jiaoyi.startTime = ts;
            SamiraFight.jiaoyi.type = 2;
            SamiraFight.jiaoyi.targetUserId = playerId;
            SamiraFight.jiaoyi.targetUserName = playerName;
            // 关闭自动攻击
            com.App.closeAutoFight();
            // 回城
            com.App.returnCity();
            return;
          }

          // 如果收到ok, 就开始交易
          if (content === '交易一下ok' && (SamiraFight.config.zbfs || []).map(x => x.name).includes(playerName)) { 
            // 状态为交易
            SamiraFight.currentStatus = 'jiaoyi';
            SamiraFight.jiaoyi.startTime = ts;
            SamiraFight.jiaoyi.type = 1;
            SamiraFight.jiaoyi.targetUserId = playerId;
            SamiraFight.jiaoyi.targetUserName = playerName;
            // 关闭自动攻击
            com.App.closeAutoFight();
            // 回城
            com.App.returnCity();
            return;
          }
        }
      }
    }
  }

  // 角色死亡
  GameServer.register(S2C_PlayerDieMessage, GameHandler.create(SamiraFight, SamiraFight.onS2C_PlayerDieMessageHandler));
  // 注册攻击boss回调
  GameServer.register(S2C_AttackResultMessage, GameHandler.create(SamiraFight, SamiraFight.kuafuBossHpAttackResultMessage));
  // 注册回去用户信息回调
  GameServer.register(
    S2C_MyPlayerInfoMessage,
    GameHandler.create(this, cmd => {
      const name = cmd.name;
      if ((!['项小伟','辣辣的舞仙', '阳光的夏天', '绿色的思念', '冷丶风', '沙场学霸', '若男', '听话的珊珊', '傲慢的新儿', '刚炮'].includes(name)) && (!name.includes('听话的珊珊')) && (!name.includes('元风涵容'))) {
        alert('未开启!');
        return;
      }

      if (!SamiraFight.isInit) {
        SamiraFight.isInit = true;
        const personId = cmd.personId.toString();
        SamiraFight.personId = personId;
        // 初始化ui
        SamiraFight.initUI();
        // 自动合成
        SetupCenter.instance.setGouFuse(EnumDuanzao.AUTO_3, true);
        // 加载配置
        SamiraFight.loadConfig();
        SamiraFight.getConfigFromUI();
        // 修改内部函数
        SamiraFight.modifyInternelFunction();
        // 自动复活
        Laya.workerTimer.loop(1000, SamiraFight, com.modules.map.model.auto.SamiraFight.reviveTimer);
        // 其他功能
        Laya.workerTimer.loop(1000, SamiraFight, com.modules.map.model.auto.SamiraFight.commonTimerFunction);
        // 自动开启
        if (SamiraFight.config.autoStart == '1') {
          SamiraFight.autoStart();
        }

        if (!['项小伟', '绿色的思念'].includes(name)) {
          $('.samira-func-track').hide();
        }

        // 开启新号开关
        if (name.includes('元风涵容')) { 
          $('.samira-func-new').show();
        } else {
          $('.samira-func-new').hide();
        }
      }
    })
  );
  GameServer.register(S2C_HongbaoActionMessage, GameHandler.create(SamiraFight, SamiraFight.onHongbaoActionMessage));
  GameServer.register(S2C_HongbaoListMessage, GameHandler.create(SamiraFight, SamiraFight.openRedPack));
  GameServer.register(S2C_TimeMessage, GameHandler.create(SamiraFight, SamiraFight.onS2C_TimeMessage));
  GameServer.register(S2C_ChatResponseMessage, GameHandler.create(SamiraFight, SamiraFight.onS2C_ChatResponseMessage));
  GameServer.register(S2C_RankListMessage, GameHandler.create(SamiraFight, cmd => { 
    const rankInfoList = cmd.rankInfoList || [];
    console.log('收到排行榜信息: ', rankInfoList.map(x => ({ name: x.name, rankValue: x.rankValue.toString() })))
  }));
  // 3v3提交匹配结果,匹配结果,结束
  GameServer.register(S2C_CrossMatchResultMessage, GameHandler.create(this, cmd => { 
    const status = cmd.result == 1;
    if (status) {
      SamiraFight.a3v3.status = 'match';
    } else {
      SamiraFight.a3v3.status = 'fail';
    }
  }));
  GameServer.register(S2C_CrossMatchSuccessMessage, GameHandler.create(this, cmd => { 
    SamiraFight.a3v3.status = 'fight';
  }));
  GameServer.register(S2C_CrossPvPZoneFinishPanelMessage, GameHandler.create(this, cmd => { 
    if (cmd.winTeamType > 0) {
      SamiraFight.a3v3.status = 'end'
    }
  }));

  window.SamiraFight = SamiraFight;

  return SamiraFight;
})();
