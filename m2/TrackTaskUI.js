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
