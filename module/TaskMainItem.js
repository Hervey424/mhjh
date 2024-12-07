var TaskMainItem = (function (_super) {
  function TaskMainItem() {
    this._link1 = null;
    this._link2 = null;
    this._clientNpc = 0;
    this._g_eff = null;
    this._guide = null;
    this._eff2 = null;
    this.eff2_id = 0;
    TaskMainItem.__super.call(this);
    this.title.text = '[主]◇';
    this.title.color = '#ffff00';
    this.nameTxt.color = '#ffff00';
    this.state_txt.color = '#ffff00';
  }

  __class(TaskMainItem, 'com.modules.track.task.TaskMainItem', _super);
  var __proto = TaskMainItem.prototype;
  __proto.refresh = function () {
    this.update();
  };
  __proto.update = function () {
    if (this._data.taskID != this.eff2_id) {
      this.changeEffect();
    }
    this._clientNpc = 0;
    var isLevel = false;
    var bean = App.dataMgr.q_taskModelContainer.getDataBean(this._data.taskID, false);
    if (!bean) {
      this.state_txt.text = '';
      this.nameTxt.text = '任务ID：' + this._data.taskID + '配置不存在';
      return;
    }
    this.nameTxt.text = this._data.taskName;
    if (this._data.taskState == EnumTaskState.NO_LEVEL) {
      this.conTxt.text = '';
      this.state_txt.text = '';
      this.btnFly.visible = false;
      this.barTxt.text = '(点击快速升级)';
      this.barTxt.color = '#00ff00';
      this.typeTxt.color = '#ef0605';
      this.typeTxt.text = this._data.acceptLevel + '级可接取';
    } else if (this._data.taskState == 3) {
      if (this._effect) {
        this._effect.stopAndHide();
      }
    } else {
      this.barTxt.color = '#ef0605';
      this.typeTxt.color = '#cdcdcb';
      var tcon = this._data.getConditionData();
      isLevel = tcon.taskConditionType == 2 && Browser.onPC;
      if (this._data.taskState < 2) {
        this.state_txt.text = '(进行中)';
        if (tcon.taskConditionType == 4 && tcon.conditionObj && tcon.conditionObj.hasOwnProperty('taskids')) {
          var temp,
            taskids = tcon.conditionObj.taskids;
          var taskid;
          for (var $each_taskid in taskids) {
            taskid = taskids[$each_taskid];
            temp = TaskModel.getTaskData(taskid);
            if (temp && temp.taskState == 2) {
              this.playFinishEff(true);
              break;
            }
          }
        }
      } else {
        this.state_txt.text = '(已完成)';
      }
      if (this._data.taskState == 2) {
        if (this._data.taskFinishID > 0) {
          this.typeTxt.text = '回复';
          this.conTxt.text = App.dataMgr.q_npcContainer.getDataBean(this._data.taskFinishID).q_name;
        } else {
          this.typeTxt.text = '';
          this.conTxt.text = '点击领取奖励';
        }
      } else if (this._data.taskState == 0) {
        if (this._data.taskAcceptID > 0) {
          this.typeTxt.text = '接取';
          this.conTxt.text = App.dataMgr.q_npcContainer.getDataBean(this._data.taskAcceptID).q_name;
        } else {
          this.typeTxt.text = tcon.getActionStr();
          this.conTxt.text = bean.q_task_des ? bean.q_task_des : tcon.getTargetStr();
        }
      } else {
        if (tcon.conditionObj && myparseInt(tcon.conditionObj['clienttype']) == 1) {
          var zxTask = TaskModel.getTaskData(tcon.conditionObj['taskid']);
          if (zxTask && zxTask.taskState == 2) {
            this.typeTxt.text = '';
            this.conTxt.text = '回城领取奖励';
            this._clientNpc = myparseInt(tcon.conditionObj['clienttuijiannpc']);
            this.changeEffect(true);
          }
        }
        if (this._clientNpc == 0) {
          this.typeTxt.text = tcon.getActionStr();
          this.conTxt.text = bean.q_task_des ? bean.q_task_des : tcon.getTargetStr();
        }
      }
      if (this._clientNpc == 0 && this.typeTxt.text != '回复') {
        this.barTxt.text = tcon.getProStr();
        if (this.barTxt.text) {
          this.barTxt.color = tcon.pro < tcon.total ? '#ef0605' : '#00ff00';
        }
      } else {
        this.barTxt.text = '';
      }
      if (bean.q_task_transfer) {
        if (this._data.taskState == 1 && bean.q_task_transfer.indexOf('taskadvans') == -1) {
          this.btnFly.visible = false;
        } else if (this._data.taskState == 2 && bean.q_task_transfer.indexOf('taskreched') == -1) {
          this.btnFly.visible = false;
        } else {
          this.btnFly.visible = true;
        }
      } else {
        this.btnFly.visible = false;
      }
    }
    if (isLevel) {
      if (!this._link1) {
        this._link1 = new LabelItemUI();
        this._link1.conTxt.on('mouseover', this, this.onLabelMouse);
        this._link1.conTxt.on('mouseout', this, this.onLabelMouse);
        this._link1.conTxt.on('click', this, this.onLink);
        this._link1.conTxt.setRedPointStyle(EnumCommon.BUTTON_RED_TYPE3);
        this._link1.move(0, this.typeTxt.y + 24, this);
        this._link2 = new LabelItemUI();
        this._link2.conTxt.on('mouseover', this, this.onLabelMouse);
        this._link2.conTxt.on('mouseout', this, this.onLabelMouse);
        this._link2.conTxt.on('click', this, this.onLink);
        this._link2.typeTxt.text = '获得方式:';
        this._link2.move(0, this.typeTxt.y + 48, this);
        EventMgr.add(this, 'Bag.CHANGE', this.onItemUpdate);
        this.onItemUpdate();
      }
      this._link2.tag = tcon.conditionObj && tcon.conditionObj.hasOwnProperty('clientMap') ? myparseInt(tcon.conditionObj['clientMap']) : 0;
      this._link2.conTxt.text = this._link2.tag > 0 ? GameUtils.getMapName(this._link2.tag) : '';
      this._height = 104;
    } else if (this._link1) {
      EventMgr.remove(this, 'Bag.CHANGE', this.onItemUpdate);
      this._link1.conTxt.off('mouseover', this, this.onLabelMouse);
      this._link1.conTxt.off('mouseout', this, this.onLabelMouse);
      this._link1.conTxt.off('click', this, this.onLink);
      this._link1.destroy();
      this._link1 = null;
      this._link2.conTxt.off('mouseover', this, this.onLabelMouse);
      this._link2.conTxt.off('mouseout', this, this.onLabelMouse);
      this._link2.conTxt.off('click', this, this.onLink);
      this._link2.destroy();
      this._link2 = null;
      this._height = 60;
    }
  };

  __proto.onClick = function (e) {
    if (this._g_eff) {
      TaskAuto.taskAutoOrStop(false);
      this._guide.hide();
      this._guide = null;
      this._g_eff.destroy();
      this._g_eff = null;
    }
    this.changeEffect();
    TaskModel.hideOrShowTaskGuide(false);
    if (this._data.taskState < 2) {
      if (this._clientNpc > 0) {
        var npc = App.dataMgr.q_npcContainer.getDataBean(this._clientNpc);
        if (npc.q_map != App.role.mapId) {
          TransferManager.transferToNPC(npc.q_id);
        } else {
          App.mapModule.mapMoveModel.walkToNpc(npc.q_id);
        }
        return;
      } else {
        var bean = App.dataMgr.q_taskModelContainer.getDataBean(this._data.taskID);
        if (bean.q_tuijian) {
          PanelManager.openByClass(TaskTuijianPanel, { tuijian: bean.q_tuijian, click: this });
          return;
        }
        if (bean.q_guide_ID == 9) {
          EventMgr.dispatch(ActivityEvent.SHOW_ICON_GUIDE, 1001, true);
        } else if (bean.q_guide_ID == 11 && TaskModel.canGetBranchTask(51)) {
          EventMgr.dispatch(TaskEvent.TASK_AUTO_RUN_TIP, true, 2);
          EventMgr.dispatch('TE.TASK_ACCEPT', 1);
          return;
        }
      }
    } else if (this._data.taskState == 2 && this._data.taskFinishID == 0) {
      TaskCommandSender.finishTask(this._data);
      return;
    }
    if (this.barTxt.text == '(点击快速升级)') {
      PanelManager.openPanel(PanelRegister.KUAISU_SJ, null, -1, false);
      return;
    }
    if (e.currentTarget == this.btnFly) {
      TaskDataManager.instance.transferByTaskData(this._data, true);
      return;
    }
    TaskDataManager.instance.gotoTargetByTaskData(this._data);
  };

  __proto.onLink = function (e) {
    e.stopImmediatePropagation();
    if (e.currentTarget == this._link1.conTxt) {
      PanelOpenManager.openBag();
    } else if (e.currentTarget == this._link2.conTxt) {
      if (App.role.mapId != this._link2.tag) {
        GameUtils.setEnterInfo(this._link2.tag);
      }
    }
  };

  __proto.onItemUpdate = function (ids) {
    if (ids) {
      var has = false;
      var id;
      for (var $each_id in ids) {
        id = ids[$each_id];
        if (App.dataMgr.q_itemContainer.getDataBean(id).q_client_type == 39) {
          has = true;
          break;
        }
      }
      if (!has) return;
    }
    this._link1.conTxt.showRedPoint(BagItemCenter.getItemsByClientType(39, false, true).length > 0, this._link1.conTxt.width + 2, 2);
  };

  __proto.setListener = function (value) {
    _super.prototype.setListener.call(this, value);
    if (value && this._data) {
      var bean = App.dataMgr.q_taskModelContainer.getDataBean(this._data.taskID, false);
      if (bean && bean.q_tuijian) {
        PanelManager.openByClass(TaskTuijianPanel, { tuijian: bean.q_tuijian, click: this });
      }
    }
  };

  __proto.play = function (playType) {
    if (this._eff2) return;
    _super.prototype.play.call(this, playType);
    if (playType == 1 && TaskModel.mainTask) {
      var bean = App.dataMgr.q_taskModelContainer.getDataBean(TaskModel.mainTask.taskID, false);
      if (bean) {
        if (bean.q_guide_ID == 22 || bean.q_guide_ID == 26 || bean.q_guide_ID == 27) {
          App.onClickGuideTarget();
          if (!this._g_eff) {
            this._g_eff = GameEffect.getEffect();
            this._g_eff.url = ResPathUtil.getPanelEffect('select1', 'common');
            this._g_eff.move(110, this.height >> 1, this);
            this._g_eff.play();
            this._guide = Guide.getGuide();
            this._guide.show2('点击打开', Browser.onPC ? 4 : 3);
            this._guide.guideTo(this, this);
          }
          App.addGuideMask(this);
          TaskAuto.taskAutoOrStop(true);
        } else if (bean.q_tuijian) {
          PanelManager.openByClass(TaskTuijianPanel, { tuijian: bean.q_tuijian, click: this });
        }
      }
    }
  };

  __proto.changeEffect = function (value) {
    value === void 0 && (value = false);
    if (value) {
      if (!this._eff2) {
        this._eff2 = GameEffect.getEffect();
        this._eff2.url = ResPathUtil.getPanelEffect('fm_task_update', 'main');
        this._eff2.move(110, this.height >> 1, this);
        this._eff2.play();
      }
      if (this._effect) {
        this._effect.stopAndHide();
      }
    } else if (this._eff2) {
      this._eff2.destroy();
      this._eff2 = null;
    }
  };

  __proto.destroy = function (destroyChild) {
    destroyChild === void 0 && (destroyChild = true);
    this._link1 = null;
    this._link2 = null;
    this._g_eff = null;
    this._eff2 = null;
    _super.prototype.destroy.call(this);
  };

  __getset(0, __proto, 'isGuide', function () {
    return Boolean(this._g_eff);
  });
  return TaskMainItem;
})(TaskItem);

/**
 *
 *Jian
 *2022-11-11
 */
//class com.modules.track.task.TaskItem extends ui.mobile.track.task.TaskItemUI
var TaskItem = (function (_super) {
  function TaskItem(isFeixie, isGrid) {
    this.grid = null;
    this._feixie = null;
    this._data = null;
    this._reward = null;
    this.branchType = 0;
    this.type = 0;
    this._effect = null;
    this._play = false;
    this._finishEff = null;
    this._isDown = false;
    isFeixie === void 0 && (isFeixie = true);
    isGrid === void 0 && (isGrid = false);
    TaskItem.__super.call(this);
    if (isGrid) {
      this.grid = new ItemGrid('grid_44_1', EnumImageType.ITEM_40, 48, true, true, false, true, true, false);
      this.grid.move(176, 5, this, 0);
    }
    if (isFeixie) {
      this._feixie = new CEffect();
      this._feixie.url = ResPathUtil.getSceneEffect('fly_xiezi', 'zidong');
      this._feixie.father = this.btnFly;
      this._feixie.move(20, 20, this.btnFly);
    } else {
      this.btnFly.removeSelf();
    }
    if (GameConfig.isAndroid) {
      this.conTxt.y -= 1;
    }
  }

  __class(TaskItem, 'com.modules.track.task.TaskItem', _super);
  var __proto = TaskItem.prototype;
  __proto.update = function () {};
  __proto.showReward = function (value) {
    if (value != this._reward) {
      this._reward = value;
      if (value) {
        this.grid.visible = true;
        this.grid.showJson(value);
      } else {
        this.grid.clear();
        this.grid.visible = false;
      }
    }
  };

  __proto.updatePosition = function () {
    this.nameTxt.x = this.title.x + this.title.width + 2;
    this.state_txt.x = this.nameTxt.x + this.nameTxt.width + 4;
    this.conTxt.x = this.typeTxt.x + this.typeTxt.width + 2;
    this.barTxt.x = this.conTxt.x + this.conTxt.width + 4;
  };

  __proto.play = function (playType) {
    if (!this._effect) {
      this._effect = GameEffect.getEffect();
      this._effect.visible = false;
      this._effect.move(100, 9, this.typeTxt);
    }
    this._effect.url = ResPathUtil.getPanelEffect(playType > 1 ? 'task_update' : 'task_accept', 'main');
    this._effect.x = playType > 1 ? 106 : 100;
    this._effect.restart(false);
    if (this.type == 1) {
      if (playType == 2) {
        var task = TaskModel.mainTask;
        if (task && task.taskFinishID == 0 && task.taskState == 2) {
          this._effect.play();
          return;
        }
      }
    }
    this._effect.playTimes(1, false);
    if (playType < 2) {
      this._play = true;
      App.timer.doTimeOnce(this, 5000, this.play, [0]);
    } else if (this._play) {
      this._play = false;
      App.timer.clearTimer(this, this.play);
    }
  };

  __proto.playFinishEff = function (value) {
    if (value) {
      if (!this._finishEff) {
        this._finishEff = GameEffect.getEffect();
        this._finishEff.url = ResPathUtil.getPanelEffect('taskState2', 'main');
        this._finishEff.play();
        this._finishEff.move(0, -8, this);
      }
    } else if (this._finishEff) {
      this._finishEff.destroy();
      this._finishEff = null;
    }
  };

  __proto.setListener = function (value) {
    if (value) {
      Laya.stage.on('mouseup', this, this.onMouse);
      this.conTxt.on('mouseover', this, this.onLabelMouse);
      this.conTxt.on('mouseout', this, this.onLabelMouse);
      this.btnFly.on('click', this, this.onClick);
      this.on('mousedown', this, this.onMouse);
    } else {
      if (this._play) App.timer.clearTimer(this, this.play);
      Laya.stage.off('mouseup', this, this.onMouse);
      this.conTxt.off('mouseover', this, this.onLabelMouse);
      this.conTxt.off('mouseout', this, this.onLabelMouse);
      this.btnFly.off('click', this, this.onClick);
      this.off('mousedown', this, this.onMouse);
    }
  };

  __proto.onMouse = function (e) {
    if (e.type == 'mousedown') {
      this.scaleXY = 0.9;
      this._isDown = true;
    } else if (e.type == 'mouseup') {
      if (this._isDown) {
        this.scaleXY = 1;
        GlobalCenter.point.setTo(0, 0);
        GlobalCenter.point = this.localToGlobal(GlobalCenter.point);
        var sx = e.stageX,
          sy = e.stageY;
        if (sx > GlobalCenter.point.x && sx < GlobalCenter.point.x + this.width && sy > GlobalCenter.point.y && sy < GlobalCenter.point.y + this.height) {
          Event.EMPTY.setTo('click', this, this);
          this.onClick(Event.EMPTY);
        }
        this._isDown = false;
      }
    }
  };

  __proto.onLabelMouse = function (e) {
    var label = e.currentTarget;
    if (e.type == 'mouseover') {
      label.color = '#ffff00';
    } else if (e.type == 'mouseout') {
      label.color = '#00ff00';
    }
  };

  __proto.onClick = function (e) {};
  __proto.destroy = function (destroyChild) {
    destroyChild === void 0 && (destroyChild = true);
    if (this._feixie) {
      this._feixie.dispose();
      this._feixie = null;
    }
    this.playFinishEff(false);
    this.play(3);
    this.grid = null;
    this._reward = null;
    this._play = false;
    this._data = null;
    laya.ui.View.prototype.destroy.call(this);
  };

  __getset(0, __proto, 'data', null, function (value) {
    this._data = value;
    if (value) {
      this.playFinishEff(value.taskState == 2);
    }
    this.update();
    this.updatePosition();
  });

  return TaskItem;
})(TaskItemUI);

/**
 *任务栏
 *Jian
 *2022-11-11
 */
//class com.modules.track.task.TrackTask extends ui.mobile.track.task.TrackTaskUI
var TrackTask = (function (_super) {
  function TrackTask(track) {
    this._teamVec = null;
    this._task = null;
    this._team = null;
    this._fujin = null;
    this._isHide = false;
    this.track = null;
    this._sanguo = null;
    this._mapDic = null;
    this._itemId = 0;
    TrackTask.__super.call(this);
    this.track = track;
  }

  __class(TrackTask, 'com.modules.track.task.TrackTask', _super);
  var __proto = TrackTask.prototype;
  Laya.imps(__proto, { 'com.modules.track.ITrack': true });
  __proto.initialize = function () {
    this.p_task.vScrollBarAllwaysShow = 'off';
    this.p_team.vScrollBarAllwaysShow = 'off';
    this.btnSwitch.on('click', this, this.onClick);
    this.btnHide.on('click', this, this.onClick);
    this.l_tabs1.on('change', this, this.onTab);
    this.btnHide.delayClickEnabled = true;
    this._teamVec = [];
    this._task = new TaskTrackProxy(this);
    this._team = new TeamProxy(this.bg, this.p_team, GameHandler.create(this, this.getItem), GameHandler.create(this, this.removeItem));
    this._fujin = new FujinProxy(this.l_tabs2, this.fj_panel, this.fj_select);
    this.l_tabs1.selectedIndex = 0;
    Event.EMPTY.setTo('click', this.btnSwitch, this.btnSwitch);
    this.onClick(Event.EMPTY);
    this.setOnPc(Browser.onPC);
  };

  __proto.setOnPc = function (value) {
    if (value) {
      this.btnHide.scaleX = -1;
      this.btnHide.x = 245;
      this.btnSwitch.x = 225;
      this.l_tabs1.x = 229;
      this.bg.x = 0;
    } else {
      this.btnSwitch.x = -5;
      this.btnHide.scaleX = 1;
      this.btnHide.x = 15;
      this.l_tabs1.x = -1;
      this.bg.x = 30;
    }
    this.l_tabs2.x = this.l_tabs1.x;
    this._team.resize();
  };

  __proto.show = function (father) {
    this._task.changeMap();
    if (!this.stage) {
      father.addChild(this);
      this._task.setListener(true);
    }
    this.isSanguo();
    this.showFengmo(true);
  };

  __proto.hide = function () {
    if (!this.stage) return;
    this._task.setListener(false);
    this.isSanguo();
  };

  __proto.setSimpleMode = function (value) {
    if (this._isHide == value) return;
    this._isHide = value;
    this._task.isHide = value;
    this.btnHide.scaleX *= -1;
    TweenLite.to(this.bg, 0.2, { x: this.bg.x + EnumMainPanel.TASKTRACK_WIDTH * this.btnHide.scaleX, alpha: value ? 0 : 1 });
    EventMgr.dispatch('TrackPanel.SWITCH', this._isHide);
    TrackPanel.setShowType(TrackPanel.showType * -1);
  };

  __proto.onClick = function (e) {
    if (e.currentTarget == this.btnHide) {
      this.setSimpleMode(!this._isHide);
    } else if (this._sanguo && e.currentTarget == this._sanguo.btnGo) {
      PanelOpenManager.openPanelById(10006001, App.dataMgr.q_equip_ComposeContainer.getDataBean(850019));
    } else if (e.currentTarget == this.btnSwitch) {
      e.stopImmediatePropagation();
      this.btnSwitch.tag = !this.btnSwitch.tag;
      this.l_tabs1.visible = this.btnSwitch.tag;
      this.l_tabs2.visible = !this.btnSwitch.tag;
      this.fj_box.visible = this.l_tabs2.visible;
      this._fujin.setListener(this.l_tabs2.visible);
      if (this.l_tabs2.visible) {
        this.p_team.visible = false;
        this._task.visible = false;
        this._team.setListener(false);
      } else {
        this.onTab(null);
      }
    }
  };

  __proto.onTab = function (e) {
    var index = this.l_tabs1.selectedIndex;
    if (index == 1) {
      this._task.onGuide(false);
    }
    this.p_team.visible = index == 1;
    this._task.visible = index == 0;
    this._team.setListener(index == 1);
  };

  __proto.getItem = function (index) {
    var item;
    if (index < this._teamVec.length) {
      item = this._teamVec[index];
    } else {
      item = new TrackTeamItem();
      item.y = index * 48;
      this._teamVec.push(item);
    }
    if (!item.stage) {
      this.p_team.content.addChild(item);
    }
    return item;
  };

  __proto.removeItem = function (i) {
    for (; i < this._teamVec.length; i++) {
      if (this._teamVec[i].stage) {
        this._teamVec[i].removeSelf();
      }
    }
    this.p_team.refresh();
  };

  __proto.showFengmo = function (isChangeMap, task) {
    isChangeMap === void 0 && (isChangeMap = false);
    var has = false;
    if (FunctionManager.isFunctionOpen(222)) {
      task = task ? task : TaskModel.fengmo;
      if (task) {
        has = true;
        if (TaskModel.mainTask && TaskModel.mainTask.taskID == task.taskAcceptID) {
          var params,
            finish = 0;
          var bean = App.dataMgr.q_taskBranchContainer.getDataBean(task.taskID);
          for (var i = 0; i < task.vecConditionData.length; i++) {
            if (task.vecConditionData[i].enough) {
              finish++;
            } else if (!params) {
              params = [bean.q_task_des.split('|')[i], task.vecConditionData[i].pro, task.vecConditionData[i].total];
            }
          }
          if (params) {
            this._task.setMainBarTxt(GameHTML.removeHtml(params[0]), params[1], params[2], finish, task.vecConditionData.length);
          } else {
            this._task.setMainBarTxt();
          }
        }
        return;
      } else if (TaskModel.mainTask) {
        this._task.setMainBarTxt();
      }
    }
  };

  __proto.isSanguo = function () {
    if (App.role.mapClientType == 52) {
      if (!this._sanguo) {
        this._mapDic = JSON.parse(App.dataMgr.q_globalContainer.getDataBean(45027).q_string_value);
        this._sanguo = new SanguoBossTrackUI();
        this._sanguo.icon.skin = ResPathUtil.getImageRes('sg_track', '.png', 'boss/sanguo');
        this._sanguo.btnGo.on('click', this, this.onClick);
        this._sanguo.move(0, 216, this.bg);
        EventMgr.add(this, 'AdvanceEvent.DROP_UPDATE', this.updateSanguo);
      }
      this._itemId = myparseInt(this._mapDic[App.role.mapId]['id']);
      this.updateSanguo();
    } else if (this._sanguo) {
      this.bg.height = 216;
      EventMgr.remove(this, 'AdvanceEvent.DROP_UPDATE', this.updateSanguo);
      this._sanguo.btnGo.off('click', this, this.onClick);
      this._sanguo.destroy();
      this._sanguo = null;
      this._mapDic = null;
    }
  };

  __proto.updateSanguo = function () {
    var info = ZuoQiCenter.getDrop(this._itemId);
    var num = info ? info.num : 0;
    var max = info ? info.maxNum : 0;
    this._sanguo.infoTxt.text = '专属BOSS掉落5个信物<br/>专属化身BOSS掉落1个信物<br/>今日小怪掉落信物' + GameHTML.setColor('(' + num + '/' + max + ')', num < max ? '#ef0605' : '#00ff00');
    this._sanguo.btnGo.y = this._sanguo.infoTxt.y + this._sanguo.infoTxt.height + 14;
    this._sanguo.height = this._sanguo.btnGo.y + 40;
    this.bg.height = 216 + this._sanguo.height;
  };

  __getset(0, __proto, 'trackType', function () {
    return 1;
  });
  __getset(
    0,
    __proto,
    'height',
    function () {
      return this.bg.height;
    },
    _super.prototype._$set_height
  );

  return TrackTask;
})(TrackTaskUI);
