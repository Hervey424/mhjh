/**
 *普通回收（装备回收，特殊回收）
 *@author mcc
 *创建时间：2024-11-21 下午1:29:47
 *
 */
//class com.modules.bag.huishou.HuishouView extends ui.mobile.bag.huishou.HuishouViewUI
var HuishouView = (function (_super) {
  function HuishouView() {
    this._l_btnEff = null;
    this._r_btnEff = null;
    this._obj = null;
    this._datas = null;
    this._type = 0;
    this._page = 0;
    this._maxPage = 0;
    this._pageNum = 14;
    this._items = null;
    this._ids = [];
    this._result = [];
    this._condition = 3;
    this._tiyanTime = 0;
    this._guide = null;
    this._guideHuishouId = 0;
    this._guideTime = 0;
    this._guideCb = null;
    this._guide2 = null;
    HuishouView.__super.call(this);
    this.init();
  }

  __class(HuishouView, 'com.modules.bag.huishou.HuishouView', _super);
  var __proto = HuishouView.prototype;
  Laya.imps(__proto, { 'com.game.core.panel.ITabView': true });
  __proto.destroy = function (destroyChild) {
    destroyChild === void 0 && (destroyChild = true);
    this._obj = null;
    this._datas = null;
    this._ids = null;
    this._result = null;
    this._l_btnEff = null;
    this._r_btnEff = null;
    this._items = null;
    laya.ui.View.prototype.destroy.call(this);
  };

  __proto.init = function () {
    var onPc = Browser.onPC;
    if (onPc) {
      TipMgr.registerTipStyle('HUI_SHOU', new HuishouTip());
    }
    this._items = [];
    for (var i = 0; i < this._pageNum; i++) {
      this['ck' + i].text.underline = true;
      if (onPc) {
        TipMgr.addTip(this['ck' + i], new TipData('HUI_SHOU', this['ck' + i]));
      }
    }
    this._obj = {};
    var bean = App.dataMgr.q_globalContainer.getDataBean(15000, false);
    if (bean && bean.q_string_value) {
      var type = 0;
      var temp;
      var arr = JSON.parse(bean.q_string_value);
      for (i = 0; i < arr.length; i++) {
        type = arr[i]['type'];
        temp = this._obj[type];
        if (!temp) {
          temp = [];
          this._obj[type] = temp;
        }
        temp.push(arr[i]);
      }
    }
    this._l_btnEff = GameEffect.getEffect();
    this._l_btnEff.url = ResPathUtil.getPanelEffect('down_arrow', 'common');
    this._l_btnEff.rotation = 90;
    this._l_btnEff.move(14, 22, this.left_btn);
    this._r_btnEff = GameEffect.getEffect();
    this._r_btnEff.url = this._l_btnEff.url;
    this._r_btnEff.rotation = -90;
    this._r_btnEff.move(14, 22, this.right_btn);
  };

  __proto.show = function (data, tab) {
    tab === void 0 && (tab = -1);
    this.auto_check.setSelected(HuishouCenter.isAutoHuishou);
    HuishouCenter.updateHuishouGou();
    this.tab1.on('click', this, this.onClick);
    this.tab2.on('click', this, this.onClick);
    this.btn.on('click', this, this.onClick);
    this.btnHungu.on('click', this, this.onClick);
    this.auto_check.on('click', this, this.onClick);
    this.left_btn.on('click', this, this.onClick);
    this.right_btn.on('click', this, this.onClick);
    for (var i = 0; i < this._pageNum; i++) {
      this['ck' + i].on('click', this, this.onClick);
    }
    this.setType(1);
    this.checkGuide();
    this.timerLoop(500, this, this.updateResult);
    this.showGuide(true);
    this.btnHungu.visible = FunctionManager.isFunctionOpen(158);
    this.condition_txt.tag = FunctionManager.isFunctionOpen(344);
    this.condition_txt.text = this.condition_txt.tag ? '(特权已激活)' : '(在线10分钟赠送)';
    this.condition_txt.color = this.condition_txt.tag ? '#00ff00' : '#ef0605';
    this.showGuide2(data instanceof com.modules.bag.huishou.HuishouAutoPanel);
  };

  __proto.hide = function () {
    EventMgr.removeAll(this);
    this.clearTimer(this, this.updateSelectResult);
    this.tab1.off('click', this, this.onClick);
    this.tab2.off('click', this, this.onClick);
    this.btn.off('click', this, this.onClick);
    this.btnHungu.off('click', this, this.onClick);
    this.auto_check.off('click', this, this.onClick);
    this.left_btn.off('click', this, this.onClick);
    this.right_btn.off('click', this, this.onClick);
    for (var i = 0; i < this._pageNum; i++) {
      this['ck' + i].off('click', this, this.onClick);
    }
    this.clearTimer(this, this.updateResult);
    this._l_btnEff.stop();
    this._r_btnEff.stop();
    this._result.length = 0;
    this._ids.length = 0;
    this._type = 0;
    this.hideGuide();
    this.showGuide(false);
    this.showGuide2(false);
    this.remove();
  };

  __proto.onClick = function (e) {
    e.stopPropagation();
    if (e.currentTarget == this.tab1) {
      this.hideGuide();
      this.setType(1);
    } else if (e.currentTarget == this.tab2) {
      this.hideGuide();
      this.setType(2);
    } else if (e.currentTarget == this.btnHungu) {
      if (PanelOpenManager.openPanelById(1010306)) {
        this.onClose();
      }
    } else if (e.currentTarget == this.left_btn) {
      this.hideGuide();
      if (this._page == 1 && this._type == 2) {
        this.setType(1, 0);
      } else {
        this.setPage(this._page - 1);
      }
    } else if (e.currentTarget == this.right_btn) {
      this.hideGuide();
      if (this._page == this._maxPage && this._type == 1) {
        this.setType(2);
      } else {
        this.setPage(this._page + 1);
      }
    } else if (e.currentTarget == this.auto_check) {
      if (FunctionManager.isFunctionOpen(344, true)) {
        HuishouCenter.isAutoHuishou = this.auto_check.selected;
        this.showGuide2(false);
      } else {
        this.auto_check.selected = false;
      }
    } else if (e.currentTarget == this.btn) {
      if (this.guide.visible) {
        if (!GameUtils.isBreakawayNewPlayer()) {
          if (this._guideCb) {
            this._guideCb.setSelected(true);
            this.selectCb(this._guideCb, false);
          }
        }
      }
      if (this._ids.length > 0) {
        HuishouCenter.huishouItemDict = {};
        HuishouCenter.sendC2S_EquipHuiShouMessage(this._ids);
        if (this._guide) {
          this._guide.removeSelf();
          if (this._guide.tag == 20) {
            this.clearTimer(this, this.onAutoGuide);
          }
        }
      }
    } else if (e.currentTarget instanceof laya.ui.CheckBox) {
      this.selectCb(e.currentTarget);
    }
  };

  __proto.selectCb = function (ck, delay) {
    delay === void 0 && (delay = true);
    if (ck && ck.tag > 0) {
      if (this._guideHuishouId == ck.tag) {
        this.hideGuide();
      }
      this.on_ok(ck, delay);
    }
  };

  __proto.onCombo = function (e) {
    var cb = e.target;
    if (cb.tag > 0 && cb.selectedLabel && !cb.disabled) {
      var rank = myparseInt(cb.selectedLabel.slice(0, cb.selectedLabel.length - 1));
      var old = HuishouCenter.getHuishouRank(cb.tag);
      if (rank != old) {
        HuishouCenter.setHuishouRank(cb.tag, rank);
        if (HuishouCenter.isAutoHuishouId(cb.tag)) {
          HuishouCenter.sendC2S_setAutoshuishourankMessage();
        }
        this.timerOnce(200, this, this.updateSelectResult);
      }
    }
  };

  __proto.on_ok = function (ck, delay) {
    delay === void 0 && (delay = true);
    HuishouCenter.setAutoHuishouId(ck.tag, ck.selected);
    if (delay) {
      this.timerOnce(200, this, this.updateSelectResult);
    } else {
      this.updateSelectResult();
    }
  };

  __proto.on_juanxuan = function (ck) {
    ck.selected = false;
    PanelOpenManager.openGuild(null, 4);
  };

  __proto.updateSelectResult = function () {
    HuishouCenter.updateHuishouGou();
    var bag = PanelManager.getPanel(PanelRegister.BAG);
    if (bag && bag.parent) {
      bag.refresh();
    }
    this.updateResult();
  };

  __proto.updateResult = function () {
    this._ids.length = 0;
    this._result.length = 0;
    var item,
      vec = BagItemCenter.itemList;
    for (var i = 0; i < vec.length; i++) {
      item = vec[i];
      if (item != null && HuishouCenter.huishouItemDict[item.id]) {
        this._result.push(item);
        this._ids.push(Int64.parseInt64(item.id));
      }
    }
    this.btn.showFlowEffect2(this._result.length > 0);
    if (this._result.length > 0) {
      this.result_txt.text = HuishouCenter.getHuishouString(this._result, 2);
    } else {
      this.result_txt.text = '';
    }
  };

  __proto.setType = function (value, page) {
    page === void 0 && (page = 1);
    if (this._type == value) return;
    this._type = value;
    if (value == 1) {
      this.box1.visible = true;
      this.box2.visible = false;
      this.tab1.skin = 'mobile/huishou/img2.png';
      this.tab2.skin = 'mobile/huishou/img1.png';
      this.title_txt1.color = '#eadabc';
      this.title_txt2.color = '#c4ac78';
    } else {
      this.box1.visible = false;
      this.box2.visible = true;
      this.tab1.skin = 'mobile/huishou/img1.png';
      this.tab2.skin = 'mobile/huishou/img2.png';
      this.title_txt1.color = '#c4ac78';
      this.title_txt2.color = '#eadabc';
    }
    this._datas = this._obj[value];
    if (this._datas) {
      this._maxPage = Math.ceil(this._datas.length / this._pageNum);
      if (page != 1) {
        page = this._maxPage;
      }
      this.setPage(page);
    }
  };

  __proto.setPage = function (value) {
    if (value < 1) {
      value = 1;
    }
    if (value > this._maxPage) {
      value = this._maxPage;
    }
    this._page = value;
    if (this._page <= 1) {
      this._page = 1;
      if (this._type == 1) {
        this.left_btn.visible = false;
        this._l_btnEff.stop();
      } else {
        this.left_btn.visible = true;
        this._l_btnEff.play();
      }
    } else {
      this.left_btn.visible = true;
      this._l_btnEff.play();
    }
    if (this._page >= this._maxPage) {
      this._page = this._maxPage;
      if (this._type == 2) {
        this.right_btn.visible = false;
        this._r_btnEff.stop();
      } else {
        this.right_btn.visible = true;
        this._r_btnEff.play();
      }
    } else {
      this.right_btn.visible = true;
      this._r_btnEff.play();
    }
    var startIndex = (this._page - 1) * this._pageNum;
    var arr = this._datas.slice(startIndex, Math.min(this._page * this._pageNum, this._datas.length));
    var count = arr.length;
    if (this._type == 1) {
      var ck;
      for (var i = 0; i < count; i++) {
        if (i >= this._pageNum) {
          break;
        }
        ck = this['ck' + i];
        ck.visible = true;
        ck.tag = arr[i]['id'];
        ck.label = arr[i]['name'];
        ck.selected = HuishouCenter.isAutoHuishouId(ck.tag);
      }
      for (; i < this._pageNum; i++) {
        ck = this['ck' + i];
        ck.visible = false;
        ck.tag = 0;
      }
    } else {
      var item, ranks;
      for (i = 0; i < count; i++) {
        if (i >= this._pageNum) {
          break;
        }
        if (i < this._items.length) {
          item = this._items[i];
          if (!item.parent) {
            this.box2.addChild(item);
          }
        } else {
          item = new HuishouItemUI();
          item.move((i % 2) * 205, myparseInt(i / 2) * 40, this.box2);
          item.ck.on('click', this, this.onClick);
          item.combo.on('change', this, this.onCombo);
          this._items.push(item);
        }
        var id = arr[i]['id'];
        item.ck.tag = id;
        item.combo.tag = id;
        item.txt.text = arr[i]['name'];
        item.ck.selected = HuishouCenter.isAutoHuishouId(id);
        var d = arr[i]['rank_list'];
        if (d) {
          ranks = [];
          for (var j = 0; j < d.length; j++) {
            ranks.push(d[j] + '阶');
          }
          item.combo.dataSource = ranks;
          var rank = HuishouCenter.getHuishouRank(id);
          if (rank == 0) {
            rank = arr[i]['default_rank'];
          }
          item.combo.selectedLabel = rank + '阶';
        } else {
          item.combo.disabled = true;
          item.combo.dataSource = ['自动'];
          item.combo.selectedIndex = 0;
        }
      }
      for (; i < this._items.length; i++) {
        this._items[i].removeSelf();
      }
    }
    var line;
    count = Math.floor((count - 1) / 2);
    for (i = 0; i < 8; i++) {
      line = this['line' + i];
      if (!line) {
        break;
      }
      line.visible = i <= count;
    }
  };

  __proto.checkGuide = function () {
    var temp = BagItemCenter.getHuishouGuideId();
    if (temp > 0) {
      var cb;
      for (var i = 0; i < this._pageNum; i++) {
        cb = this['ck' + i];
        if (cb.tag == temp) {
          this._guideCb = cb;
          this._guideHuishouId = temp;
          this.guide.visible = true;
          this.guide.move(cb.x - 3, cb.y + 20);
          this._guideTime = 9;
          this.timerLoop(1000, this, this.onGuide);
          this.onGuide();
          return;
        }
      }
    }
    this.hideGuide();
  };

  __proto.onClose = function (e) {
    if (this._guide) {
      PanelManager.removePanel(PanelRegister.BAG);
    }
    _super.prototype.onClose(e);
  };

  __proto.onGuide = function () {
    this._guideTime--;
    if (this._guideTime == 0) {
      if (this._guideCb) {
        this._guideCb.setSelected(true);
        this.selectCb(this._guideCb);
      }
      this.hideGuide();
    } else {
      this.gtime_txt.text = '低阶装备(' + this._guideTime + ')';
    }
  };

  __proto.hideGuide = function () {
    if (this._guideHuishouId > 0) {
      this.clearTimer(this, this.onGuide);
      this.guide.visible = false;
      this._guideHuishouId = 0;
      this._guideCb = null;
    }
  };

  __proto.showGuide = function (value) {
    if (value) {
      var gId = 0;
      if (App.needGuide(20)) {
        gId = 20;
      } else if (App.needGuide(3) && VipCenter.isCanAutoHuishou()) {
        gId = 3;
      }
      if (gId > 0) {
        if (!this._guide) {
          this._guide = Guide.getGuide();
          this.addEvent('TE.updateTaskTrack', this.updateTask);
        }
        this._guide.tag = gId;
        this._guide.showEffect2(this.btn, this);
        if (gId == 20) {
          this.timerOnce(TaskModel.getGuideStayLength(), this, this.onAutoGuide);
        }
      }
    } else if (this._guide) {
      if (this._guide.tag == 20) {
        this.clearTimer(this, this.onAutoGuide);
      }
      this._guide.hide();
      this._guide = null;
    }
  };

  __proto.onAutoGuide = function () {
    Event.EMPTY.setTo('click', this.btn, this.btn);
    this.onClick(Event.EMPTY);
  };

  __proto.showGuide2 = function (value) {
    if (value) {
      if (!this._guide2) {
        this._guide2 = Guide.getGuide();
        this._guide2.show2('点击激活', 2);
        this._guide2.guideTo(this.auto_check);
      }
    } else if (this._guide2) {
      this._guide2.hide();
      this._guide2 = null;
    }
  };

  __proto.updateTask = function (task) {
    if (this._guide && task.taskType == 1 && task.taskState > 1) {
      var panel = PanelManager.getPanel(PanelRegister.BAG);
      panel.doCloseGuide(this._guide, null);
    }
  };

  return HuishouView;
})(HuishouViewUI);
