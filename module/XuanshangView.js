var XuanshangView = (function (_super) {
  function XuanshangView() {
    this._items = null;
    this._heads = null;
    this._grids = null;
    this._acc = null;
    this._taskId = 0;
    this._txts = null;
    this._cons = null;
    XuanshangView.__super.call(this);
    this._acc = new Accordion(162, 514, GameHandler.create(this, this.onSelectItem));
    this._acc.setItemStyle(XuanshangAccordionHead, XuanshangAccordionItem);
    this._acc.setSelectStyle(null, 156, 44, '10,10,10,10');
    this._acc.move(22, 52, this);
    this._grids = new ShowItemListBigGrid(10, this, 0, 420);
    this._items = [];
    this._heads = [];
    for (var i = 0; i < 2; i++) {
      this._heads.push(new XuanshangHead());
      this._heads[i].move(232 + i * 414, 120, this, 0);
    }
  }

  __class(XuanshangView, 'com.modules.shouji.XuanshangView', _super);
  var __proto = XuanshangView.prototype;
  Laya.imps(__proto, { 'com.game.core.panel.ITabView': true });
  __proto.destroy = function (destroyChild) {
    destroyChild === void 0 && (destroyChild = true);
    this._heads = null;
    this._items = null;
    this._grids = null;
    this._acc = null;
    laya.ui.View.prototype.destroy.call(this);
  };

  __proto.show = function (data, tab) {
    tab === void 0 && (tab = -1);
    this.addEvent('TE.updateTaskTrack', this.updateTask);
    this.btnGo.on('click', this, this.onClick);
    this.updateTask();
  };

  __proto.hide = function () {
    EventMgr.removeAll(this);
    this.btnGo.off('click', this, this.onClick);
    this._heads[0].monster.stopAndHide();
    this._heads[1].monster.stopAndHide();
    this._acc.setSelectedIndex(-1, -1);
    this._cons = null;
    this._txts = null;
  };

  __proto.updateTask = function (task) {
    if (task && task.branchType != 68) {
      return;
    }
    if (!task || task.taskState == 3) {
      var dic = {},
        datas = [],
        beans = App.dataMgr.q_taskBranchContainer.getTaskList(68);
      var bean,
        indexs = [-1, -1, -1, -1];
      for (var i = 0; i < beans.length; i++) {
        bean = beans[i];
        if (bean.q_show_condition && TaskModel.getTaskData(bean.q_show_condition)) {
          continue;
        }
        task = TaskModel.getTaskData(bean.q_id);
        if (!dic[bean.q_show_type]) {
          dic[bean.q_show_type] = { label: bean.q_task_des, data: [] };
          datas.push(dic[bean.q_show_type]);
        }
        dic[bean.q_show_type]['data'].push(bean);
        if (!task) continue;
        if (task.taskState == 2) {
          if (indexs[0] < 0) {
            indexs[0] = datas.length - 1;
            indexs[1] = dic[bean.q_show_type]['data'].length - 1;
          }
        } else if (indexs[2] < 0) {
          indexs[2] = datas.length - 1;
          indexs[3] = dic[bean.q_show_type]['data'].length - 1;
        }
      }
      this._acc.dataProvider = datas;
      if (indexs[0] < 0) {
        this._acc.setSelectedIndex(indexs[2], indexs[3]);
      } else {
        this._acc.setSelectedIndex(indexs[0], indexs[1]);
      }
    } else {
      this._acc.refresh();
      this.update();
    }
  };

  __proto.update = function () {
    if (!this._txts || !this._cons) {
      return;
    }
    var task = TaskModel.getTaskData(this._taskId);
    if (task) {
      var cons = task.vecConditionData;
      this.btnGo.disabled = false;
      this.btnGo.showRedPoint(task.taskState == 2);
      this.btnGo.label = this.btnGo.isRedPoint ? '领取奖励' : '前往击杀';
    } else {
      this.btnGo.disabled = true;
      this.btnGo.label = '已完成';
      this.btnGo.showRedPoint(false);
    }
    var i = 0,
      value = 0,
      max = 0;
    this._heads[1].visible = this._cons.length == 2;
    this.detailBox.visible = this._txts.length > 2;
    if (this.detailBox.visible) {
      this._heads[0].x = 210;
      this._heads[0].update(myparseInt(this._cons[0].clientmonster), myparseInt(this._cons[0].clientMap));
      this._heads[0].gou.visible = false;
      var item, con;
      for (i = 0; i < this._txts.length; i++) {
        if (i < this._items.length) {
          item = this._items[i];
        } else {
          item = new XuanshangItemUI();
          item.move(0, 34 + i * 38, this.detailBox);
          this._items.push(item);
        }
        item.visible = true;
        con = task ? task.vecConditionData[i] : null;
        if (con) {
          max = con.total;
          value = con.pro;
        } else {
          max = TaskConditionData.getTotal(this._cons[i]);
          value = max;
        }
        item.gou.visible = value >= max;
        item.txt.text = this._txts[i] + GameHTML.setColor('(' + value + '/' + max + ')', value < max ? '#ef0605' : '#00ff00');
      }
      for (; i < this._items.length; i++) {
        this._items[i].visible = false;
      }
    } else {
      this._heads[0].x = this._heads[1].visible ? 232 : 439;
      for (i = 0; i < 2; i++) {
        if (this._heads[i].visible) {
          con = task ? task.vecConditionData[i] : null;
          if (con) {
            max = con.total;
            value = con.pro;
          } else {
            max = 0;
            value = 0;
          }
          this._heads[i].update(myparseInt(this._cons[i].clientmonster), myparseInt(this._cons[i].clientMap), value, max);
        }
      }
    }
  };

  __proto.onSelectItem = function (item) {
    var bean = item.data;
    this._cons = JSON.parse(bean.q_finish_condition_ids);
    this._txts = bean.q_condition_des.split('|');
    this._grids.showJson(bean.q_tesk_rewards);
    this._grids.x = this.btnGo.x - this._grids.width * 0.5;
    this._taskId = bean.q_id;
    this.btnGo.tag = bean;
    this.update();
  };

  __proto.onClick = function (e) {
    GameUtils.gotoTaskBranch(this.btnGo.tag, this.btnGo, PanelRegister.EQUIP_SHOUJI);
  };

  return XuanshangView;
})(XuanshangViewUI);
