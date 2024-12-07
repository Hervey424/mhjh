/**
 *VIP等级
 *Jian
 *2022-11-19
 */
//class com.modules.vip.xin.VipLevelView extends ui.mobile.vip.xin.VipLevelViewUI
var VipLevelView = (function (_super) {
  function VipLevelView() {
    this._itemVec = null;
    this._tabs = null;
    this._itemList1 = null;
    this._itemList2 = null;
    this._curTab = null;
    this._guide = null;
    this._g_step = 0;
    this._isSend = false;
    VipLevelView.__super.call(this);
  }

  __class(VipLevelView, 'com.modules.vip.xin.VipLevelView', _super);
  var __proto = VipLevelView.prototype;
  Laya.imps(__proto, { 'com.game.core.panel.ITabView': true });
  __proto.initialize = function () {
    this.tabsPanel.vScrollBarAllwaysShow = 'off';
    this.descPanel.vScrollBarAllwaysShow = 'off';
    this._tabs = [];
    var tabBtn,
      max = App.dataMgr.q_vipContainer.getMaxBean(1).q_level;
    for (var i = 1; i <= max; i++) {
      tabBtn = new VipButton('mobile/common/tab_7.png', 'VIP' + i);
      tabBtn.y = (i - 1) * 56;
      tabBtn.tag = i;
      this._tabs.push(tabBtn);
    }
    this._itemVec = [];
    this._itemList1 = new ShowItemListBigGrid(4, this, 710, 308);
    this._itemList2 = new ShowItemListBigGrid(4, this, 710, 488);
  };

  __proto.show = function (data, tab) {
    tab === void 0 && (tab = -1);
    this._g_step = App.needGuide(27) ? 1 : 0;
    this.banner.skin = ResPathUtil.getImageRes('banner', '.jpg', 'vip');
    this.bg.skin = ResPathUtil.getImageRes('bg', '.jpg', 'vip/level');
    this.addEvent('TE.updateTaskTrack', this.updateTask);
    this.addEvent('VipEvent.VIP_LEVEL_UP', this.onVipLevel);
    this.addEvent('VipEvent.VIP_INFO', this.onVipInfo);
    this.addEvent('MoneyEvent.CHANGE', this.onMoney);
    this.tabsPanel.content.on('click', this, this.onTab);
    this.btnFree.on('click', this, this.onClick);
    this.btnBuy.on('click', this, this.onClick);
    this.onVipLevel(App.role.vipLevel);
    tab = this.onVipInfo(false);
    var bean;
    if (data > 0) {
      bean = App.dataMgr.q_vipContainer.getDataBean(1000 + data - 1);
    } else if (tab < 0) {
      bean = App.dataMgr.q_vipContainer.getDataBean(1000 + App.role.vipLevel);
    }
    if (bean) {
      tab = bean.q_vip_level < bean.q_vipmax ? bean.q_level : bean.q_level - 1;
    }
    Event.EMPTY.setTo('click', null, this._tabs[tab]);
    this.onTab(Event.EMPTY);
  };

  __proto.hide = function () {
    EventMgr.removeAll(this);
    this.tabsPanel.content.off('click', this, this.onTab);
    this.btnFree.off('click', this, this.onClick);
    this.btnBuy.off('click', this, this.onClick);
    this.banner.skin = null;
    this.bg.skin = null;
    this.showGuide(false);
    this._isSend = false;
    if (this._curTab) {
      this._curTab.selected = false;
      this._curTab = null;
    }
    if (this._guide) {
      this._guide.hide();
      this._guide = null;
    }
  };

  __proto.update = function (level) {
    var bean = App.dataMgr.q_vipContainer.getDataBean(1000 + level);
    this._itemList2.showJson(bean.q_vip_upreward);
    this._itemList1.showJson(bean.q_vip_reward, true, -1, 1, 5);
    this._itemList1.x = this.btnBuy.x + ((this.btnBuy.width - this._itemList1.width) >> 1);
    var datas = bean.q_vip_desc ? JSON.parse(bean.q_vip_desc) : [];
    var item,
      py = 0;
    for (var i = 0; i < datas.length; i++) {
      if (i < this._itemVec.length) {
        item = this._itemVec[i];
      } else {
        item = new VipLevelDescItemUI();
        item.txt.color = '#00ff00';
        item.txt.width = 204;
        item.pos(-20, 2);
        this._itemVec.push(item);
      }
      if (!item.stage) {
        this.descPanel.content.addChild(item);
      }
      item.y = py;
      item.txt.text = datas[i];
      item.height = item.txt.height < 40 ? 28 : item.txt.height + 2;
      py += item.height;
    }
    for (; i < this._itemVec.length; i++) {
      this._itemVec[i].removeSelf();
    }
    this.descPanel.refresh();
  };

  __proto.onClick = function (e) {
    if (e.currentTarget == this.btnFree) {
      this._isSend = true;
      this.btnFree.disabled = true;
      VipCommandSender.sendC2S_getVipLvRewardMessage(this._curTab.tag, 1);
    } else if (e.currentTarget == this.btnBuy) {
      if (App.isMoneyEnough(this.p_txt.tag, this.p_icon.tag)) {
        this._isSend = true;
        this.btnBuy.disabled = true;
        VipCommandSender.sendC2S_GetVipDailyAwardMessage(this._curTab.tag, 1);
      }
    } else {
      this.update(e.currentTarget.tag);
      this.updateBtnUPState();
    }
  };

  __proto.onVipLevel = function (level) {
    level === void 0 && (level = 0);
    var max = App.dataMgr.q_vipContainer.getDataBean(1000 + level).q_vipmax % 1000;
    for (var i = 0; i < max; i++) {
      this._tabs[i].yijihuo = i < level;
      if (level > max) {
        if (this._tabs[i].stage) {
          this._tabs[i].removeSelf();
        }
      } else if (!this._tabs[i].stage) {
        this.tabsPanel.content.addChild(this._tabs[i]);
      }
    }
    this.tabsPanel.refresh();
  };

  __proto.onVipInfo = function (value) {
    value === void 0 && (value = true);
    var bean = App.dataMgr.q_vipContainer.getDataBean(1000 + App.role.vipLevel);
    var def = -1,
      red = -1,
      max = bean.q_vipmax % 1000;
    for (var i = 0; i < max; i++) {
      if (this._tabs[i].stage) {
        this._tabs[i].showRedPoint(i < bean.q_level && VipCenter.hasVipRed(i + 1), 165, 6);
        if (def < 0 && !VipCenter.getAwardState(i + 1, 1, 2)) {
          def = i;
        }
        if (this._tabs[i].isRedPoint && red < 0) {
          red = i;
        }
      }
    }
    if (value) {
      this.updateBtnUPState();
      if (this._isSend) {
        this._isSend = false;
        if (red != -1) {
          Event.EMPTY.setTo('click', this._tabs[red], this._tabs[red]);
          this.onTab(Event.EMPTY);
        }
      }
    }
    return red < 0 ? def : red;
  };

  __proto.updateBtnUPState = function () {
    var bean = App.dataMgr.q_vipContainer.getDataBean(this._curTab.tag + 1000);
    if (App.role.vipLevel < bean.q_level) {
      this.showGuide(false);
      this.p_txt.visible = false;
      this.btnBuy.visible = false;
      this.btnFree.visible = false;
      this.limitTxt.visible = false;
      this.yilingqu1.visible = false;
      this.yilingqu2.visible = false;
      this._itemList1.x = this.btnBuy.x + ((this.btnBuy.width - this._itemList1.width) >> 1);
      this._itemList2.x = this.btnBuy.x + ((this.btnBuy.width - this._itemList2.width) >> 1);
      this._itemList2.filters = null;
    } else {
      var state = 0;
      if (bean.q_level == 1 || VipCenter.getAwardState(bean.q_level - 1, 1, 2)) {
        state = 1;
      }
      this.limitTxt.visible = state < 1;
      if (state == 1 && VipCenter.getAwardState(bean.q_level, 1, 2)) {
        state = 2;
      }
      this.btnBuy.visible = state == 1;
      this.yilingqu1.visible = state == 2;
      this.p_txt.visible = this.btnBuy.visible && bean.q_vip_need;
      if (this.p_txt.visible) {
        var param = JSON.parse(bean.q_vip_need)[0];
        this.p_icon.skin = EnumMoney.getIcon(param.id);
        this.p_txt.text = param.num + '';
        this.p_icon.tag = param.id;
        this.p_txt.tag = param.num;
        this.p_txt.x = this.btnBuy.x + ((this.btnBuy.width - this.p_txt.width + 24) >> 1);
        this.onMoney(param.id, MoneyCenter.getMoneyReplaceBind(param.id));
        this.btnBuy.disabled = false;
      } else if (this.btnBuy.visible) {
        this.btnBuy.disabled = false;
        this.btnBuy.showRedPoint(true);
      }
      state = 0;
      if (bean.q_level == 1 || VipCenter.getAwardState(bean.q_level - 1, 1, 1)) {
        state = 1;
      }
      if (state == 1 && VipCenter.getAwardState(bean.q_level, 1, 1)) {
        state = 2;
      }
      this.btnFree.disabled = false;
      this.btnFree.visible = state == 1;
      this.btnFree.showRedPoint(state == 1);
      this.yilingqu2.visible = state == 2;
      this._itemList2.filters = this.yilingqu2.visible ? FilterUtil.GRAY_FILTER_ARRAY : null;
      this._itemList2.x = state > 0 ? 510 : this.btnBuy.x + ((this.btnBuy.width - this._itemList2.width) >> 1);
      this.showGuide(state == 1 && this._g_step == 1);
    }
  };

  __proto.onTab = function (e) {
    var tab = e.target;
    if (tab instanceof com.modules.vip.xin.VipButton) {
      if (this._curTab) this._curTab.selected = false;
      tab.selected = true;
      this._curTab = tab;
      this.update(tab.tag);
      this.updateBtnUPState();
      VipCenter.setClick(tab.tag);
      VipCenter.updateVipRed();
      tab.showRedPoint(tab.tag - 1 < App.role.vipLevel && VipCenter.hasVipRed(tab.tag), 165, 6);
    }
  };

  __proto.onMoney = function (type, value) {
    if (this.p_txt.visible && type == this.p_icon.tag) {
      this.btnBuy.showRedPoint(value >= this.p_txt.tag);
      this.p_txt.color = this.btnBuy.isRedPoint ? '#00ff00' : '#ef0605';
    }
    if (type == EnumMoney.BIND_YUAN_BAO) {
      this.onVipInfo(false);
    }
  };

  __proto.showGuide = function (value, delay) {
    delay === void 0 && (delay = true);
    if (value) {
      if (delay) {
        this.timerOnce(200, this, this.showGuide, [true, false]);
        return;
      }
      this._g_step = 2;
      App.onClickGuideTarget();
      if (!this._guide) {
        this._guide = Guide.getGuide();
        this._guide.show2('点击领取', 2);
        this._guide.guideTo(this.btnFree, this.btnFree);
        App.addGuideMask(this.btnFree);
      }
    } else if (this._isSend && this._g_step == 2) {
      App.onClickGuideTarget();
      this.clearTimer(this, this.showGuide);
      this._guide.removeSelf();
      this._g_step = 3;
    }
  };

  __proto.updateTask = function (task) {
    if (this._g_step > 1 && task && task.taskType == 1 && !App.needGuide(27)) {
      this._g_step = 0;
      PanelManager.getPanel(PanelRegister.VIP_PANEL).doCloseGuide(this._guide, null);
    }
  };

  __proto.destroy = function (destroyChild) {
    destroyChild === void 0 && (destroyChild = true);
    this._itemList1 = null;
    this._itemList2 = null;
    this._itemVec = null;
    this._tabs = null;
    laya.ui.View.prototype.destroy.call(this);
  };

  return VipLevelView;
})(VipLevelViewUI);
