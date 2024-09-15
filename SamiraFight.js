var SamiraFight = (function () {
  function SamiraFight() { }
  __class(SamiraFight, 'com.modules.map.model.auto.SamiraFight');

  SamiraFight.personId = '';
  SamiraFight.running = false;
  // 当前状态 search-搜索boss, fight-战斗, fight-xiuluo-正在攻击修罗天界, wudao-武道会, kuafuboss-跨服boss
  SamiraFight.currentStatus = 'search';
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
  // 修罗天界层数
  SamiraFight.currentXiuLuoCengshu = -1;
  // 配置文件
  SamiraFight.config = {};
  // 自动复活并战斗运行状态
  SamiraFight.autoReviveAndFight = false;
  // boss血量监测
  SamiraFight.kuafuBossMapId = 300011;
  // 跨服bossid, 字符串类型的
  SamiraFight.kuafuBossIds = [];
  SamiraFight.kuafuBossData = [];
  SamiraFight.kuafuBossHpStatus = false;
  SamiraFight.kuafuBossHpDic = {};

  // 开启内挂
  SamiraFight.start = function () {
    if (SamiraFight.running != true) {
      SamiraFight.config = SamiraFight.getConfigFromUI();
      console.log('[samira]config:', SamiraFight.config)
      $('.samira-status').text('运行中...')
      SamiraFight.requestBoss();
      SamiraFight.running = true;
      Laya.workerTimer.loop(3000, SamiraFight, com.modules.map.model.auto.SamiraFight.requestBoss);
      Laya.workerTimer.loop(5000, SamiraFight, com.modules.map.model.auto.SamiraFight.requestXiuLuoBoss);
      Laya.workerTimer.loop(1000, SamiraFight, com.modules.map.model.auto.SamiraFight.update);
    } else {
      SamiraFight.stop(); 
    }
  };

  // 关闭内挂
  SamiraFight.stop = function () {
    SamiraFight.running = false;
    SamiraFight.currentStatus = 'search';
    SamiraFight.currentBoss = null;
    SamiraFight.currentcheckTimes = 0;
    SamiraFight.currentXiuLuoCengshu = -1;
    $('.samira-status').text('开启')
    Laya.workerTimer.clear(SamiraFight, com.modules.map.model.auto.SamiraFight.requestBoss);
    Laya.workerTimer.clear(SamiraFight, com.modules.map.model.auto.SamiraFight.update);
    Laya.workerTimer.clear(SamiraFight, com.modules.map.model.auto.SamiraFight.requestXiuLuoBoss);
  };

  // 切换自动复活和自动攻击
  SamiraFight.changeAutoReviveAndAutoFightStatus = function () {
    if (SamiraFight.autoReviveAndFight) {
      SamiraFight.autoReviveAndFight = false;
      $('.samira-auto-revive').text('自动复活&战斗');
      Laya.workerTimer.clear(SamiraFight, com.modules.map.model.auto.SamiraFight.reviewTimer);
    } else {
      SamiraFight.autoReviveAndFight = true;
      $('.samira-auto-revive').text('开启中...');
      Laya.workerTimer.loop(1000, SamiraFight, com.modules.map.model.auto.SamiraFight.reviewTimer);
    }
  };

  // 复活timer
  SamiraFight.reviewTimer = function () {
    if (com.App.role._isDead) {
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
      }
      else if (revType == 4 || revType == 6) {
        type = 4;
      }
      else if (revType == 16) {
        type = 16;
      }
      else if (revType == 32 || revType == 34) {
        type = 32;
      }
      else if (revType == 130) {
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
      $('.samira-kuafu-hp').text('开启中...');
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
      $('.samira-kuafu-hp').text('跨服boss血量监测');
    }
  };

  // 跨服boss血量监测timer
  SamiraFight.kuafuBossHpTimer = function () {
    BossCommandSender.sendC2S_AliveWildBossMessage([SamiraFight.kuafuBossMapId], 0, false);
    const bosses = com.logic.data.zone.boss.BossDataCenter.instance.getBossListByMapId(SamiraFight.kuafuBossMapId, false)
      .filter(x => x.bean.q_type === 8)
    SamiraFight.kuafuBossIds = bosses.map(x => x.monsterIn64Id);
    SamiraFight.kuafuBossData = bosses;
    let html = '';
    for (const boss of bosses) {
      const hp = boss.allHp == 0 ? '' : ((boss.curHp / boss.allHp) * 100).toFixed(0);
      const attact = SamiraFight.kuafuBossHpDic[boss.monsterIn64Id] || 0;
      const attact2 = boss.allHp == 0 ? '0.00' : (attact / boss.allHp * 100).toFixed(2);
      html += '<div style="white-space: nowrap;">' + boss.bean.q_name + ': ' + hp + '%(' + attact2 + '%)</div>'
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
    };
    // 获取攻击人的id
    var attackerId = cmd.sourceId.toString();
    var attacker = com.App.mapModule.mapAvatarModel.getFightRoleData(attackerId);

    if (!attacker) {
      return;
    }

    // 攻击人是自己或者宠物
    if (attacker._personId == com.App.role._personId || attacker._ownerId == com.App.role._personId) {
      for (const fightRet of (cmd.fightRetList || [])) {
        for (const attactReg of (fightRet.attackRetList || [])) {
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

  }

  // 从配置文件加载配置, 程序启动会执行
  SamiraFight.loadConfig = function () {
    const key = 'player-config-' + SamiraFight.personId;
    const json = localStorage.getItem(key);
    let config = {};
    try {
      config = JSON.parse(json);
    } catch { };

    config = config || {};
    config.xiuluoCengshu = config.xiuluoCengshu || [1,2];
    config.bossTimeOut = config.bossTimeOut || 300;
    config.mapIds = config.mapIds || [];
    config.fuli = config.fuli || '1';
    config.shanggu = config.shanggu || '1';
    config.shangguWaitTime = config.shangguWaitTime || 60;
    config.shangguMapCount = config.shangguMapCount || 1;
    config.zhanqi = config.zhanqi || '1';
    config.anzhishendian = config.anzhishendian || '1';
    config.yiji = config.yiji || '1';
    config.wudao = config.wudao || '1';
    config.zhanchangBoss = config.zhanchangBoss || '1';
    config.zhanchangBossMinHp = config.zhanchangBossMinHp || 0;
    config.shenmoBoss = config.shenmoBoss || '1';

    // 弄到ui上
    if ((config.xiuluoCengshu || []).includes(1)) {
      $('.samira-xiuluo1').prop('checked', true);
    }
    if ((config.xiuluoCengshu || []).includes(2)) {
      $('.samira-xiuluo2').prop('checked', true);
    }
    if ((config.xiuluoCengshu || []).includes(3)) {
      $('.samira-xiuluo3').prop('checked', true);
    }
    if ((config.xiuluoCengshu || []).includes(4)) {
      $('.samira-xiuluo4').prop('checked', true);
    }

    $('.samira-fuli').prop('checked', config.fuli === '1');
    $('.samira-shanggu').prop('checked', config.shanggu === '1');
    $('.samira-shanggu-wait-time').val(config.shangguWaitTime);
    $('.samira-shanggu-map-count').val(config.shangguMapCount);
    $('.samira-zhanqi').prop('checked', config.zhanqi === '1');
    $('.samira-anzhishendian').prop('checked', config.anzhishendian === '1');
    $('.samira-yiji').prop('checked', config.yiji === '1');
    $('.samira-wudao').prop('checked', config.wudao === '1');
    $('.samira-shenmoboss').prop('checked', config.shenmoBoss === '1');
    $('.samira-zhanchang-boss').prop('checked', config.zhanchangBoss === '1');
    $('.samira-zhanchang-boss-min-hp').val(config.zhanchangBossMinHp);
    $('.samira-boss-timeout').val(config.bossTimeOut || 100)
    $('.samira-map').val(config.mapIds.join('|'))
  };

  // 从ui获取配置
  SamiraFight.getConfigFromUI = function () {
    // 修罗层数
    const xiuluoCengshu = [];
    $('.samira-xiuluo:checked').each(function () {
      xiuluoCengshu.push(parseInt($(this).val()));
    });
    // 超时
    const bossTimeout = parseInt($('.samira-boss-timeout').val().trim());
    // 福利
    const fuli = $('.samira-fuli').prop('checked') ? '1' : '0';
    // 上古禁地
    const shanggu = $('.samira-shanggu').prop('checked') ? '1' : '0';
    const shangguWaitTime = parseInt($('.samira-shanggu-wait-time').val().trim());
    const shangguMapCount = parseInt($('.samira-shanggu-map-count').val().trim());
    // 战骑祭坛
    const zhanqi = $('.samira-zhanqi').prop('checked') ? '1' : '0';
    // 暗之神殿
    const anzhishendian = $('.samira-anzhishendian').prop('checked') ? '1' : '0';
    // 战场遗迹
    const yiji = $('.samira-yiji').prop('checked') ? '1' : '0';
    // 武道会
    const wudao = $('.samira-wudao').prop('checked') ? '1' : '0';
    // 战场boss
    const zhanchangBoss = $('.samira-zhanchang-boss').prop('checked') ? '1' : '0';
    const zhanchangBossMinHp = parseInt($('.samira-zhanchang-boss-min-hp').val().trim());
    // 神魔boss
    const shenmoBoss = $('.samira-shenmoboss').prop('checked') ? '1' : '0';

    return {
      xiuluoCengshu: xiuluoCengshu,
      bossTimeOut: bossTimeout,
      mapIds: [],
      fuli: fuli,
      shanggu: shanggu,
      zhanqi: zhanqi,
      anzhishendian: anzhishendian,
      yiji: yiji,
      wudao: wudao,
      shangguWaitTime: shangguWaitTime,
      shangguMapCount: shangguMapCount,
      zhanchangBoss: zhanchangBoss,
      zhanchangBossMinHp: zhanchangBossMinHp,
      shenmoBoss: shenmoBoss,
      shenmoBossWaitTime: 60
    }
  };

  // 保存配置
  SamiraFight.saveConfig = function () {
    const config = SamiraFight.getConfigFromUI();
    const key = 'player-config-' + SamiraFight.personId;
    localStorage.setItem(key, JSON.stringify(config));
    com.components.game.GameNotice.showBottomMessage('保存成功')
  };

  // 从服务端获取或者的boss列表
  SamiraFight.requestBoss = function () {
    console.log('[samira]获取boss列表');
    // 获取福利boss地图
    const fuliMapId = SamiraFight.getMaxLevelFuliBossMapId();
    // 获取暗之神殿地图boss
    const azsmMapIds = SamiraFight.getAzsdMapIds();
    // 获取遗迹地图
    const yijiMapId = SamiraFight.getMaxLevelYijiBossMapId();
    // 获取战骑地图
    const zhanqiMapId = SamiraFight.getMaxLevelZhanqiBossMapId();
    // 获取上古禁地地图
    const shangguMapIds = SamiraFight.getMaxLevelShangguBossMapIds();

    const mapIds = [...NeiGuaFight._mapIds, fuliMapId, ...azsmMapIds, yijiMapId, zhanqiMapId, SamiraFight.kuafuBossMapId,...shangguMapIds];
    BossCommandSender.sendC2S_AliveWildBossMessage(mapIds, 0, false);
  };

  // 从服务端获取修罗boss
  SamiraFight.requestXiuLuoBoss = function () {
    console.log('[samira]获取修罗boss列表');
    com.logic.data.zone.tower.ZoneTowerCenter.sendC2S_WushenZoneInfoMessage(200000)
  };

  // 逻辑更新
  SamiraFight.update = function () {
    const playerName = com.App.role._name;
    const playerMapId = com.App.role._mapId;
    const mapIds = NeiGuaFight._saveMapIds;
    const ts = Math.floor(Date.now() / 1000);

    // 恢复武道会
    if (ts > SamiraFight.wudaoResumeTs) {
      SamiraFight.wudaoStatus = true;
      SamiraFight.wudaoResumeTs = 0;
    }

    // 时间如果是11点, 16点, 21点, 自动开启boss伤害统计
    const hours = new Date().getHours();
    if (hours == 11 || hours == 16 || hours == 21) {
      SamiraFight.startKuafuBossHp();
    } else { 
      SamiraFight.stopKuafuBossHp();
    }

    console.log('[samira]currentStatus:' + SamiraFight.currentStatus, 'player: ' + playerName)
    if (SamiraFight.currentStatus === 'search') {
      // 关闭武道会界面
      PanelManager.closeByClass(WulingdahuiPanel);
      PanelManager.closeByClass(WulingdahuiPipeiPanel);

      // 跨服boss
      if (SamiraFight.config.zhanchangBoss == '1') {
        const bosses = SamiraFight.kuafuBossData;
        const filterBosses = bosses.filter(x => x.curHp / x.allHp * 100 >= SamiraFight.config.zhanchangBossMinHp)
          .filter(x => {
            // 获取当前boss自己已经打的血量
            const attact = SamiraFight.kuafuBossHpDic[x.monsterIn64Id] || 0;
            // 如果已经超过百分之二就不打了
            if (attact / x.allHp * 100 > 2) {
              return false;
            }
            else {
              return true;
            }
          })
          .sort((a, b) => b.curHp - a.curHp);
        if (filterBosses.length > 0) {
          const boss = filterBosses[0];
          SamiraFight.currentBoss = boss;
          console.log('[samira]找到跨服boss:', boss);
          SamiraFight.currentcheckTimes = 0;
          SamiraFight.currentStatus = 'kuafuboss';
          return;
        }
      }

      // 武道会
      if (com.logic.data.MoneyCenter.getMoney(EnumMoney.JINGJI) > 0 && SamiraFight.config.wudao == '1' && SamiraFight.wudaoStatus) {
        // 修改状态
        SamiraFight.currentStatus = 'wudao';
        SamiraFight.currentBoss = null;
        SamiraFight.currentWudaocheckTimes = 0;
        // 开始匹配
        PanelManager.openByClass(WulingdahuiPipeiPanel, '最强王者');
        return;
      }

      // 处理神魔boss
      if (com.logic.data.zone.boss.BossDataCenter.instance.getTiliNum(178) > 0 && SamiraFight.config.shenmoBoss == '1') {
        const bosses = com.logic.data.zone.boss.BossDataCenter.instance.getBossListByMapId(SamiraFight.kuafuBossMapId);
        const filterShanguBoss = bosses.filter(x => x.bean.q_type == 16)
          .filter(boss => ((boss.owner === playerName || boss.owner == '' || boss.owner == null) && boss.remainTime === 0) || (boss.remainTime != 0 && boss.remainTime <= ts + SamiraFight.config.shenmoBossWaitTime))
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

      // 检查修罗天界地图
      if (SamiraFight.config.xiuluoCengshu.length > 0) {
        const xiuluoData = com.modules.boss.lianyu.LianyuCenter._dic[200000]._dic;
        for (const f of SamiraFight.config.xiuluoCengshu) {
          const key = '10000' + f;
          const monsters = xiuluoData[key].monsters;
          // 必须五个全是活着的时候才去打
          const allALive = monsters.every(x => x.receiveTimestamp == 0);
          if (allALive) {
            console.log('[samira]修罗天地' + f + '层boss全部活着, 去攻击!');
            SamiraFight.currentStatus = 'fight-xiuluo';
            SamiraFight.currentXiuLuoCengshu = f;
            ZoneTowerCenter.sendC2S_IntoPurgatoryZoneMessage(200000, f, 0);
            window.setTimeout(() => {
              com.App.openAutoFight();
            })

            return;
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

      // 处理上古禁地
      if (SamiraFight.config.shanggu == '1') {
        const bosses = [];
        const shangguMapIds = SamiraFight.getMaxLevelShangguBossMapIds();
        for (const mapId of shangguMapIds) {
          const mapBosses = BossDataCenter.instance._mapbossDic[mapId];
          for (const bossId in mapBosses) {
            const bs = mapBosses[bossId];
            for (const b in bs) {
              bosses.push(bs[b]);
            }
          }
        }
        const filterShanguBoss = bosses.filter(x => x.bean.q_type == 16)
          .filter(boss => ((boss.owner === playerName || boss.owner == '' || boss.owner == null) && boss.remainTime === 0) || (boss.remainTime != 0 && boss.remainTime <= ts + SamiraFight.config.shangguWaitTime))
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

      // 处理战场遗迹
      if (com.logic.data.zone.boss.BossDataCenter.instance.getTiliNum(179) > 0 && SamiraFight.config.yiji == '1') {
        const yijiMapId = SamiraFight.getMaxLevelYijiBossMapId();
        const yiujiBosses = com.logic.data.zone.boss.BossDataCenter.instance.getBossListByMapId(yijiMapId).filter(boss => (boss.owner === playerName || boss.owner == '' || boss.owner == null) && boss.remainTime === 0)

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
      if (com.logic.data.zone.boss.BossDataCenter.instance.getTiliNum(168) > 0 && SamiraFight.config.zhanqi == '1') {
        const zhanqiMapId = SamiraFight.getMaxLevelZhanqiBossMapId();
        const zhanqiBosses = com.logic.data.zone.boss.BossDataCenter.instance.getBossListByMapId(zhanqiMapId)
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

      // 获取所有挂机地图活着的boss
      {
        let selectBoss = null;
        const bosses = [];
        const bossFilterFunc = boss => boss.bean.q_type == 16 && (boss.owner === playerName || boss.owner == '' || boss.owner == null) && boss.remainTime === 0;
        // 如果玩家当前所在地图在挂机地图中, 优先获取玩家当前所在地图的boss
        if(mapIds.includes(playerMapId)){
          // 获取当前地图活着的boss
          const currentMapBossesObject = BossDataCenter.instance._mapbossDic[playerMapId];
          const currentMapBosses = []
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
        if(bosses.length > 0){
          // 获取每个boss的距离
          for(const b of bosses){
            b.distance = GameMathUtil.getDistance(App.role.nodex,App.role.nodey,b.monsterX,b.monsterY);
          }
          // 获取最近的一个
          const sortedBosses = bosses.sort((a,b) => a.distance - b.distance);
          selectBoss = sortedBosses[0];
        } 
        // 如果当前地图没有boss, 就获取所有地图的
        else{
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

          // 筛选出来活着的并且
          const allMapFilterdBosses = allMapBosses
            .filter(bossFilterFunc)
            .sort((a, b) => {
              return b.level - a.level;
            });

            bosses.push(...allMapFilterdBosses);

          if(bosses.length > 0){
            selectBoss = bosses[0];
          }
        }
        
        if (selectBoss) {
          SamiraFight.currentBoss = selectBoss;
          console.log('[samira]找到boss:', selectBoss);
          SamiraFight.currentcheckTimes = 0;
          SamiraFight.currentStatus = 'fight';
        } else {
          App.openAutoFight();
          console.log('[samira]没有找到boss, 开启自动攻击, 重新寻找boss');
        }
      }
    }
    else if (SamiraFight.currentStatus === 'fight') {
      // 怪物为空
      if (SamiraFight.currentBoss == null) {
        console.log('[samira]boss为空, 重新寻找boss');
        SamiraFight.currentStatus = 'search';
        return;
      }

      const isShanggujindi = SamiraFight.getMaxLevelShangguBossMapIds().includes(SamiraFight.currentBoss.mapModelId);
      const isShenmoBoss = SamiraFight.currentBoss.mapModelId == SamiraFight.kuafuBossMapId && SamiraFight.currentBoss.bean.q_type == 16;

      // 需要等待boss复活的地图需要单独处理, 上古禁地, 神魔boss
      if (isShanggujindi || isShenmoBoss) {

        // 上古禁地怪物死亡
        if (isShanggujindi) {
          if (SamiraFight.currentBoss.remainTime > ts + SamiraFight.config.shangguWaitTime) {
            console.log('[samira]boss已被击杀, 重新寻找boss');
            SamiraFight.currentStatus = 'search';
            return;
          }
        }

        // 神魔boss
        if (isShenmoBoss) {
          if (SamiraFight.currentBoss.remainTime > ts + SamiraFight.config.shenmoBossWaitTime) {
            console.log('[samira]boss已被击杀, 重新寻找boss');
            SamiraFight.currentStatus = 'search';
            return;
          }
        }

        // 怪物已刷新后归属改变
        if (SamiraFight.currentBoss.remainTime == 0 && SamiraFight.currentBoss.owner != '' && SamiraFight.currentBoss.owner != playerName) {
          console.log('[samira]boss已有归属(' + SamiraFight.currentBoss.owner + '), 重新寻找boss3');
          SamiraFight.currentStatus = 'search';
          return;
        }
      }
      else {
        // 怪物死亡
        if (SamiraFight.currentBoss.remainTime > 0) {
          console.log('[samira]boss已被击杀, 重新寻找boss');
          SamiraFight.currentStatus = 'search';
          return;
        }
        // 怪物归属改变
        if (SamiraFight.currentBoss.owner != '' && SamiraFight.currentBoss.owner != playerName) {
          console.log('[samira]boss已有归属(' + SamiraFight.currentBoss.owner + '), 重新寻找boss4');
          SamiraFight.currentStatus = 'search';
          return;
        }
      }

      // 检查超时
      SamiraFight.currentcheckTimes += 1;
      if (SamiraFight.currentcheckTimes >= SamiraFight.config.bossTimeOut) {
        console.log('[samira]当前boss'+ SamiraFight.currentcheckTimes +'秒未死亡, 重新进行寻路');
        SamiraFight.currentStatus = 'search';
      }

      // 如果不在地图内, 就进入地图
      if (playerMapId !== SamiraFight.currentBoss.mapModelId) {
        if (SamiraFight.currentBoss.mapModelId == SamiraFight.kuafuBossMapId) { 
          GameServer.sendCommand(new C2S_PlayerEnterNationWarMessage());
        } else {
          var cmd = new C2S_TransmitToServerMessage();
          cmd.transParam = '{"mapmodelid":' + SamiraFight.currentBoss.mapModelId + '}';
          cmd.type = 6;
          GameServer.sendCommand(cmd);
          return;
        }
      }

      // 当前玩家已经在boss附近了
      const playerPosition = SamiraFight.getPlayerPositionNode();
      if (playerPosition.x >= SamiraFight.currentBoss.monsterX - 2 && playerPosition.x <= SamiraFight.currentBoss.monsterX + 2 && playerPosition.y >= SamiraFight.currentBoss.monsterY - 2 && playerPosition.y <= SamiraFight.currentBoss.monsterY + 2) {
        com.App.openAutoFight();
      }
      else {
        // 走路过去并且自动攻击
        (new com.modules.kmap.view.MapView()).gotoWhere(SamiraFight.currentBoss.monsterX, SamiraFight.currentBoss.monsterY, GameHandler.create(com.App, com.App.openAutoFight))
      }
    }
    else if (SamiraFight.currentStatus === 'fight-xiuluo') {
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
      }
      else {
        console.log('[samira]还有' + aliveCount + '个boss没有死亡, 继续打怪');
      }
    }
    else if (SamiraFight.currentStatus === 'wudao') {
      // 因为匹配和进入地图需要时间, 30秒后, 判断地图是不是在武道会, 如果不在说明已经结束
      if (SamiraFight.currentWudaocheckTimes > 30 && playerMapId != 190000) {
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
          $('.samira-wudaohui-status').show();
          SamiraFight.wudaoResumeTs = ts + (60 * 30);
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
    }
    else if (SamiraFight.currentStatus === 'kuafuboss') {
      // 怪物为空
      if (SamiraFight.currentBoss == null) {
        console.log('[samira]boss为空, 重新寻找boss');
        SamiraFight.currentStatus = 'search';
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
      
      // boss被自己打掉百分之二以上
      const attact = SamiraFight.kuafuBossHpDic[boss.monsterIn64Id] || 0;
      if (attact / boss.allHp * 100 > 2) {
        console.log('[samira]boss已被自己攻击超过2%, 重新寻找boss');
        SamiraFight.currentStatus = 'search';
        return;
      }

      // 传送到boss地图
      if (playerMapId !== SamiraFight.currentBoss.mapModelId) {
        var cmd = new C2S_TransmitToServerMessage();
        cmd.transParam = '{"mapmodelid":' + SamiraFight.currentBoss.mapModelId + '}';
        cmd.type = 6;
        GameServer.sendCommand(cmd);
        return;
      }

      // 当前玩家已经在boss附近了
      const playerPosition = SamiraFight.getPlayerPositionNode();
      if (playerPosition.x >= SamiraFight.currentBoss.monsterX - 2 && playerPosition.x <= SamiraFight.currentBoss.monsterX + 2 && playerPosition.y >= SamiraFight.currentBoss.monsterY - 2 && playerPosition.y <= SamiraFight.currentBoss.monsterY + 2) {
        com.App.openAutoFight();
      }
      else {
        // 走路过去并且自动攻击
        (new com.modules.kmap.view.MapView()).gotoWhere(SamiraFight.currentBoss.monsterX, SamiraFight.currentBoss.monsterY, GameHandler.create(com.App, com.App.openAutoFight))
      }
    }
  };

  // 获取玩家位置(node)
  SamiraFight.getPlayerPositionNode = function () {
    var x = Math.floor(com.App.role._map_x / MapConfig.MAP_NODE_WIDTH);
    var y = Math.floor(com.App.role._map_y / MapConfig.MAP_NODE_HEIGHT);
    return { x: x, y: y }
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
  SamiraFight.getMaxLevelShangguBossMapIds = function () {
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
    return mapIds.slice(0 - SamiraFight.config.shangguMapCount);
  };

  // 获取战骑地图
  SamiraFight.getZhanqiBossMaps = function () {
    return com.App.dataMgr.q_mapContainer.list.filter(x => x.q_map_id >= 200001 && x.q_map_id <= 200085);
  };

  // 获取最大等级战骑地图
  SamiraFight.getMaxLevelZhanqiBossMapId = function () {
    const maps = SamiraFight.getZhanqiBossMaps();
    let mapId = -1;
    for (const map of maps) {
      if (mapId == -1) {
        mapId = map.q_map_id;
        continue;
      }

      const playerLevel = com.App.role._level;
      const serverOpenDay = com.game.core.utils.ServerTime.getOpenDays();

      const condition = JSON.parse(map.q_entry_condition)[0];
      const minLevel = condition.q_min_level;
      const openday = condition.openday;
      if (playerLevel >= minLevel && serverOpenDay >= openday) {
        mapId = map.q_map_id;
      }
    }
    return mapId;
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
    const tongshuai = KuafuBattleCenter.getAttrValue(junzhuang, "统率");
    const yongwu = KuafuBattleCenter.getAttrValue(junzhuang, "勇武");
    const zhimou = KuafuBattleCenter.getAttrValue(junzhuang, "智谋");
    const neizheng = KuafuBattleCenter.getAttrValue(junzhuang, "内政");
    const weiwang = KuafuBattleCenter.getAttrValue(junzhuang, "威望");
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
  }

  // 添加ui
  SamiraFight.initUI = function () {
    const html = $(`<div style='background: #00000099; position: fixed; bottom: 0; left: 0; color: #fff;'>
          <div class='samira-panel' style='width: 400px; padding: 10px;'>
            <div style='margin-bottom: 10px; display: none; color: red;' class='samira-wudaohui-status'>武道会已关闭, 半小时后会自动开启!</div>
            <div style='margin-bottom: 10px; display: none;' class='samira-hp-container'>
              <div style='display: flex; '>
                <div>战场BOSS血量: </div>
                <div style='flex: 1; margin-left: 10px;' class='samira-hp-items'></div>
              </div>
            </div>
            <div style='display: flex; align-items: center; margin-bottom: 10px;'>
                <div>修罗天界: </div>
                <div style='flex: 1; display: flex;'>
                    <div><input type='checkbox' value='1' class='samira-xiuluo samira-xiuluo1' />1层</div>
                    <div><input type='checkbox' value='2' class='samira-xiuluo samira-xiuluo2' />2层</div>
                    <div><input type='checkbox' value='3' class='samira-xiuluo samira-xiuluo3' />3层</div>
                    <div><input type='checkbox' value='4' class='samira-xiuluo samira-xiuluo4' />4层</div>
                </div>
            </div>
            <div style='display: flex; align-items: center; margin-bottom: 10px;'>
              <div><input type="checkbox" class="samira-shanggu" />上古禁地</div>
              <div><input type="checkbox" class="samira-zhanqi" />战骑祭坛</div>
              <div><input type="checkbox" class="samira-yiji" />战场遗迹</div>
              <div><input type="checkbox" class="samira-wudao" />武道会</div>
            </div>
            <div style='display: flex; align-items: center; margin-bottom: 10px;'>
              <div><input type="checkbox" class="samira-zhanchang-boss" />跨服BOSS</div>
              <div><input type="checkbox" class="samira-fuli" />福利BOSS</div>
              <div><input type="checkbox" class="samira-anzhishendian" />暗之神殿</div>
              <div><input type="checkbox" class="samira-shenmoboss" />神魔BOSS</div>
            </div>
            <div style='display: none; align-items: center; margin-bottom: 10px;'>
              <div style='display: none'>&nbsp;&nbsp;BOSS血量下限: <input type='number' class='samira-zhanchang-boss-min-hp' style='width: 70px;' /></div>
            </div>
            <div style='display: flex; align-items: center; margin-bottom: 10px;'>
              <div>上古禁地提前到达BOSS点时间: <input type='number' class='samira-shanggu-wait-time' style='width: 80px;' /></div>
            </div>
            <div style='display: flex; align-items: center; margin-bottom: 10px;'>
              <div>上古禁地地图数量: <input type='number' class='samira-shanggu-map-count' style='width: 80px;' /></div>
            </div>
            <div style='display: flex; align-items: center; margin-bottom: 10px;'>
              <div>挂机BOSS超时时间: <input type='number' class='samira-boss-timeout' style='width: 80px;' /></div>
            </div>
            <div style='display: flex; align-items: center; margin-bottom: 10px; display: none'>
              <div>挂机地图ID列表: <input type='number' class='samira-map' style='width: 150px;' /></div>
            </div>
            <div style='display: flex; margin-bottom: 10px;'>
                <div class='samira-kuafu-hp' style='color: #fff; border-radius: 3px; border: 1px solid #fff; padding: 3px 10px; margin-right: 10px;'>跨服boss血量监测</div>
                <div class='samira-auto-revive' style='color: #fff; border-radius: 3px; border: 1px solid #fff; padding: 3px 10px; margin-right: 10px;'>自动复活&战斗</div>
            </div>
            <div style='display: flex;'>
                <div class='samira-status samira-start' style='color: #fff; border-radius: 3px; border: 1px solid #fff; padding: 3px 10px; margin-right: 10px;'>开启</div>
                <div class='samira-save-config' style='color: #fff; border-radius: 3px; border: 1px solid #fff; padding: 3px 10px; margin-right: 10px;'>保存配置</div>
                <div class='samira-panel-hide' style='color: #fff; border-radius: 3px; border: 1px solid #fff; padding: 3px 10px; margin-right: 10px;'>隐藏</div>
            </div>
          </div>
          <div style='display: none;' class='samira-hidden-container'>
            <div class='samira-panel-show' style='color: #fff; border-radius: 3px; border: 1px solid #fff; padding: 3px 10px;'>显示</div>
          </div>
      </div>`);

    html.find('.samira-start').click(function () {
      SamiraFight.start();
    });

    html.find('.samira-save-config').click(function () {
      SamiraFight.saveConfig();
    });

    html.find('.samira-auto-revive').click(function () {
      SamiraFight.changeAutoReviveAndAutoFightStatus();
    });

    html.find('.samira-kuafu-hp').click(function () {
      SamiraFight.changeKuafuBossHpStatus();
    });

    html.find('.samira-panel-hide').click(function(){
      $('.samira-panel').hide();
      $('.samira-hidden-container').show();
    });
  
    html.find('.samira-panel-show').click(function(){
      $('.samira-panel').show();
      $('.samira-hidden-container').hide();
    });

    html.find('.samira-select-map').click(function(){
      SamiraFight.selectMap();
    });

    $('body').append(html);
  };

  // 修改内部函数
  SamiraFight.modifyInternelFunction = function(){
    ActivityCenter.getData=function(id){
      // 修改内挂地图限制
      if(!id){
        return null;
      }
      const data = ActivityCenter._actDict[id];
      if(data){
        // 修改巡航为已开启
        if([Q_globalCenter.getInt(15179), 200002, 200003, 200004,200005,200006,200007,200008,200009].includes(id)){
          data.playerStates = 0;
        }
      }
      return data;
    }

    FunctionManager.isFunctionOpen=function(functionId,needNotice,noticeType,noticeColor){
      // 修改巡航自动合成
      if(functionId == 105){
        return true;
      }

      (needNotice===void 0)&& (needNotice=false);
      (noticeType===void 0)&& (noticeType=-1);
      (noticeColor===void 0)&& (noticeColor=0xff0000);
      if(FunctionManager._state !=null){
        if(myparseInt(functionId)==0){
          return true;
        };
        var bit=FunctionManager.getBit(functionId);
        if(bit==0){
          var bean=App.dataMgr.q_functionContainer.getDataBean(functionId,false);
          if(bean !=null){
            if(needNotice){
              if(noticeType==-1)GameNotice.showMousePosMessage(bean.q_describe);
              else GameNotice.showNoticeTypeMsg(noticeType,bean.q_describe);
            }
          }
        }
        else{
          return true;
        }
      }
      return false;
    }
  };

  // 注册攻击boss回调
	GameServer.register(S2C_AttackResultMessage, GameHandler.create(SamiraFight,SamiraFight.kuafuBossHpAttackResultMessage));
	// 注册回去用户信息回调
	GameServer.register(S2C_MyPlayerInfoMessage, GameHandler.create(this, (cmd) => {
	  const personId = cmd.personId.toString();
    SamiraFight.personId = personId;
	  // 初始化ui
		SamiraFight.initUI();
		// 自动合成
		SetupCenter.instance.setGouFuse(EnumDuanzao.AUTO_3, true);
		// 加载配置
		SamiraFight.loadConfig();
    // 修改内部函数
    SamiraFight.modifyInternelFunction();
  }));

  return SamiraFight;
})();
