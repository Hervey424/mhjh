var ZSFuliView = (function (_super) {
  function ZSFuliView() {
    this._grids = null;
    this._cost = null;
    this._num = null;
    this._types = null;
    ZSFuliView.__super.call(this);
    App.registerNumber('51', '0123456789', -4, 410, 50);
    this._grids = new ShowItemListTween(true, true, 6, this, 586, 347, false, 'grid_62_1', EnumImageType.ITEM_56);
    this._grids.setMaskByGrids(4);
    this._num = NumberBitmap.show('51');
    this._num.move(704, 200, this);
    this.btnGet.delayClickTime = 1000;
    this.btnGet.delayClickEnabled = true;
    this.btnGet.delayClickTip = '点太快啦请慢点';
    this.t_list.scrollBarAllwaysShow = 'off';
    this.t_list.renderHandler = GameHandler.create(this, this.onRenTab);
    this.t_list.selectHandler = GameHandler.create(this, this.onSelect);
    this._types = [1260, 1261];
    this._cost = new ItemCostLabel3();
    this._cost.move(0, 440, this);
  }

  __class(ZSFuliView, 'com.modules.activity_xcq.leichong.view.ZSFuliView', _super);
  var __proto = ZSFuliView.prototype;
  Laya.imps(__proto, { 'com.modules.window.IActivity': true });
  __proto.destroy = function (destroyChild) {
    destroyChild === void 0 && (destroyChild = true);
    this._grids = null;
    this._cost = null;
    this._num = null;
    laya.ui.View.prototype.destroy.call(this);
  };

  __proto.show = function (data, tab) {
    tab === void 0 && (tab = -1);
    this.addEvent('MoneyEvent.CHANGE', this.onMoney);
    this.btnGet.on('click', this, this.onClick);
  };

  __proto.hide = function () {
    EventMgr.removeAll(this);
    this.btnGet.off('click', this, this.onClick);
    this.t_list.resetSelectedIndex();
    this.fontImg.skin = null;
    this.boxImg.skin = null;
    this._grids.stop();
  };

  __proto.update = function () {
    if (this.t_list.selectedIndex < 0 || (this.t_list.array && this.t_list.selectedIndex >= this.t_list.array.length)) {
      return;
    }
    var act = this.getAct(this.t_list.array[this.t_list.selectedIndex]);
    var hasBuy = Boolean(act.bean.q_need_item);
    this.yilingqu.visible = act.playerStates == 0;
    if (hasBuy && act.playerStates > 0) {
      var last = ActivityCenter.getData(act.id - 1);
      this.limitTxt.visible = last && last.playerStates > 0;
    } else {
      this.limitTxt.visible = false;
    }
    this.btnGet.visible = !this.limitTxt.visible && act.playerStates > 0;
    this._cost.visible = hasBuy && this.btnGet.visible;
    if (this.yilingqu.visible) {
      this._cost.visible = false;
      this.limitTxt.visible = false;
      this.yilingqu.skin = 'mobile/common2/' + (hasBuy ? 'yigoumai' : 'yilingqu') + '.png';
    } else if (this.btnGet.visible) {
      this.btnGet.tag = act;
      this.btnGet.label = hasBuy ? '购买礼包' : '领取奖励';
      this.btnGet.skin = 'mobile/common/btn_tip' + (hasBuy ? 1 : 2) + '.png';
      if (hasBuy) {
        this._cost.showJson(act.bean.q_need_item);
        this._cost.x = this.btnGet.x - this._cost.width / 2;
        this.btnGet.showRedPoint(this._cost.itemEnough);
      } else {
        this.btnGet.showRedPoint(act.playerStates == 1);
      }
    }
    this._num.show(act.bean.q_info);
    this._num.x = 724 - this._num.width / 2;
    this._grids.showJson(act.bean.q_show_rewards);
    this.boxImg.skin = ResPathUtil.getImageRes(act.bean.q_icon2, '.png', 'leichong');
    this.fontImg.skin = ResPathUtil.getImageRes('font_fuli' + (hasBuy ? 1 : 0), '.png', 'leichong');
  };

  __proto.updateState = function (type) {
    if (this._types.indexOf(type) < 0) {
      return;
    }
    var act,
      index1 = -1,
      index2 = -1;
    var acts = ActivityUtil.getOpenList(this._types[0], 4);
    this.t_list.array = acts;
    for (var i = 0; i < acts.length; i++) {
      act = this.getAct(acts[i]);
      if (act.playerStates == 0) {
        continue;
      }
      if (index2 < 0) {
        index2 = i;
      }
      if (act.playerStates == 1) {
        if (index1 < 0) {
          index1 = i;
          break;
        }
      } else if (act.bean.q_need_item && ConditionUtil.isItemEnoughJson(act.bean.q_need_item)) {
        if (index1 < 0) {
          index1 = i;
          break;
        }
      }
    }
    if (index1 < 0) {
      index1 = index2 < 0 ? 0 : index2;
    }
    if (index1 == this.t_list.selectedIndex) {
      this.update();
    } else {
      this.t_list.selectedIndex = index1;
      this.t_list.scrollTo(index1);
    }
  };

  __proto.onClick = function (e) {
    var act = this.btnGet.tag;
    if (act.bean.q_need_item) {
      if (ConditionUtil.isItemEnoughJson(act.bean.q_need_item, true)) {
        ActivitiesCommandSender.C2S_JoinActivityById(act.id);
      }
    } else if (act.playerStates == 1) {
      ActivitiesCommandSender.C2S_JoinActivityById(act.id);
    } else {
      GameNotice.showMousePosMessage('不满足领取条件');
    }
  };

  __proto.onRenTab = function (item, index) {
    var act = this.getAct(this.t_list.array[index]);
    item.txt.text = act.bean.q_name;
    item.icon.gray = act.playerStates == 0;
    item.icon.skin = ResPathUtil.getImageRes(act.bean.q_icon, '.png', 'leichong');
    item.yilingqu.visible = act.playerStates == 0;
    if (item.yilingqu.visible) {
      item.yilingqu.skin = 'mobile/common2/' + (act.bean.q_need_item ? 'yigoumai' : 'yilingqu') + '.png';
    }
    item.showRedPoint(this.isActRed(act), 68, 16);
  };

  __proto.isActRed = function (act) {
    if (act.bean.q_need_item) {
      if (act.playerStates == 0) return false;
      if (App.dataMgr.q_activitiesContainer.hasDataBean(act.id - 1)) {
        var last = ActivityCenter.getData(act.id - 1);
        if (!last || last.playerStates > 0) {
          return false;
        }
      }
    } else {
      return act.playerStates == 1;
    }
    return act.bean.q_need_item && ConditionUtil.isItemEnoughJson(act.bean.q_need_item);
  };

  __proto.getAct = function (act) {
    if (act.playerStates == 0 && act.bean.q_desc) {
      if (ActivityUtil.isOpenById(act.bean.q_desc)) {
        return ActivityCenter.getData(act.bean.q_desc);
      }
    }
    return act;
  };

  __proto.onMoney = function (type, value) {
    if (type == EnumMoney.BIND_YUAN_BAO) {
      this.t_list.updateList();
      this.update();
    }
  };

  __proto.onSelect = function (index) {
    this.update();
  };

  return ZSFuliView;
})(ZSFuliViewUI);
