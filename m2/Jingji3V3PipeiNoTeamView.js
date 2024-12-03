/**
 *竞技3V3匹配-无队伍
 *@author mcc
 *创建时间：2024-10-11 下午3:26:27
 *
 */
//class com.modules.jingji3V3.view.Jingji3V3PipeiNoTeamView extends ui.mobile.jingji3V3.view.Jingji3V3PipeiNoTeamViewUI
var Jingji3V3PipeiNoTeamView = (function (_super) {
  function Jingji3V3PipeiNoTeamView() {
    this._pipeiTime = 0;
    Jingji3V3PipeiNoTeamView.__super.call(this);
  }

  __class(Jingji3V3PipeiNoTeamView, 'com.modules.jingji3V3.view.Jingji3V3PipeiNoTeamView', _super);
  var __proto = Jingji3V3PipeiNoTeamView.prototype;
  Laya.imps(__proto, { 'com.game.core.panel.ITabView': true });
  __proto.show = function (data, tab) {
    tab === void 0 && (tab = -1);
    this.btn1.on('click', this, this.onClick);
    this.btn2.on('click', this, this.onClick);
    this.addEvent('Jingji3V3Center.TEAN_PIPEI_STATE', this.onPipeiInfo);
    var bean = App.dataMgr.q_activitiesContainer.getDataBean(22024, false);
    if (bean) {
      this.timeTxt.htmlText = bean.q_info_spare;
    } else {
      this.timeTxt.text = '';
    }
    this.startPipei();
  };

  __proto.hide = function () {
    this.btn1.off('click', this, this.onClick);
    this.btn2.off('click', this, this.onClick);
    EventMgr.removeAll(this);
    this.clearPipei();
    this.remove();
  };

  __proto.onClick = function (e) {
    switch (e.currentTarget) {
      case this.btn1:
        if (Jingji3V3Center.isPipei) {
          GameNotice.showMousePosMessage('先取消匹配再点击');
        } else {
          Jingji3V3Center.sendCreateTeamReq();
        }
        break;
      case this.btn2:
        var tili178 = BossDataCenter.instance.getMonsterTili(187);
        if (tili178 && tili178.num > 0) {
          this.startPipei(true);
        } else {
          GameNotice.showMousePosMessage('今日匹配已达上限');
        }
        break;
    }
  };

  __proto.onPipeiInfo = function () {
    this.startPipei();
  };

  __proto.startPipei = function (isClick) {
    isClick === void 0 && (isClick = false);
    if (Jingji3V3Center.isPipei) {
      this.btn2.url = 'mobile/jingji3V3/btnPipei3.png';
      this.pipeiTxt.text = '匹配中';
      this._pipeiTime = 0;
      Laya.timer.loop(300, this, this.onPipei);
      if (isClick) {
        Jingji3V3Center.sendPipeiReq(2);
      }
    } else {
      this.btn2.url = 'mobile/jingji3V3/btnPipei2.png';
      this.pipeiTxt.text = '';
      Laya.timer.clear(this, this.onPipei);
      if (isClick) {
        Jingji3V3Center.sendPipeiReq(1);
      }
    }
  };

  //开始匹配
  __proto.onPipei = function () {
    this._pipeiTime++;
    if (this._pipeiTime > 3) {
      this._pipeiTime = 0;
      this.pipeiTxt.text = '匹配中';
    }
    if (this._pipeiTime == 1) {
      this.pipeiTxt.text = '匹配中.';
    } else if (this._pipeiTime == 2) {
      this.pipeiTxt.text = '匹配中..';
    } else if (this._pipeiTime == 3) {
      this.pipeiTxt.text = '匹配中...';
    }
  };

  __proto.clearPipei = function () {
    Laya.timer.clear(this, this.onPipei);
    this.pipeiTxt.text = '';
  };

  return Jingji3V3PipeiNoTeamView;
})(Jingji3V3PipeiNoTeamViewUI);
