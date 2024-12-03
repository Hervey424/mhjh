/**
 *竞技3V3匹配-有队伍
 *@author mcc
 *创建时间：2024-10-14 下午1:34:13
 *
 */
//class com.modules.jingji3V3.view.Jingji3V3PipeiTeamView extends ui.mobile.jingji3V3.view.Jingji3V3PipeiTeamViewUI
var Jingji3V3PipeiTeamView = (function (_super) {
  function Jingji3V3PipeiTeamView() {
    this._pipeiTime = 0;
    this._myAvatar = null;
    this._avatarVec = null;
    this._myInfo = null;
    Jingji3V3PipeiTeamView.__super.call(this);
    this._myAvatar = new Jingji3V3Avatar();
    this._myAvatar.move(630, 201, this, 0);
    this._avatarVec = [];
    var posArr = [
      [457, 148],
      [831, 148]
    ];
    var avatar;
    for (var i = 0; i < 2; i++) {
      avatar = new Jingji3V3Avatar();
      avatar.move(posArr[i][0], posArr[i][1], this, 0);
      this._avatarVec.push(avatar);
    }
  }

  __class(Jingji3V3PipeiTeamView, 'com.modules.jingji3V3.view.Jingji3V3PipeiTeamView', _super);
  var __proto = Jingji3V3PipeiTeamView.prototype;
  Laya.imps(__proto, { 'com.game.core.panel.ITabView': true });
  __proto.destroy = function (destroyChild) {
    destroyChild === void 0 && (destroyChild = true);
    this._avatarVec = null;
    this._myAvatar = null;
    laya.ui.View.prototype.destroy.call(this);
  };

  __proto.show = function (data, tab) {
    tab === void 0 && (tab = -1);
    this.btn1.on('click', this, this.onClick);
    this.btn2.on('click', this, this.onClick);
    this.btnTeam.on('click', this, this.onClick);
    Laya.stage.on('click', this, this.onStageClick);
    this.addEvent('Jingji3V3Center.TEAN_PIPEI_STATE', this.onPipeiInfo);
    var role = App.role;
    var zhenfaBean = App.dataMgr.q_zhenfaContainer.getDataBean(PetCenter.getZhenfa(role.pvpzhenfa), false);
    if (zhenfaBean) {
      this.txt0.htmlText = zhenfaBean.q_des;
      this.txtBg.visible = true;
    } else {
      this.txt0.text = '';
      this.txtBg.visible = false;
    }
    this.onInfo(data);
    this.startPipei();
  };

  __proto.hide = function () {
    this.btn1.off('click', this, this.onClick);
    this.btn2.off('click', this, this.onClick);
    this.btnTeam.off('click', this, this.onClick);
    Laya.stage.off('click', this, this.onStageClick);
    EventMgr.removeAll(this);
    this.clearPipei();
    if (this._myAvatar) {
      this._myAvatar.clear();
    }
    for (var i = 0; i < this._avatarVec.length; i++) {
      this._avatarVec[i].clear();
    }
    this._myInfo = null;
    this.remove();
  };

  __proto.onStageClick = function (e) {
    e.stopImmediatePropagation();
    var targetName = e.target.name;
    if (targetName == 'teamName') {
      return;
    }
    if (e.target instanceof laya.ui.Button) {
      var btn = e.target;
      if (btn.label == '世界频道' || btn.label == '行会频道' || btn.label == '跨服频道') {
        return;
      }
    }
    PanelManager.closeByClass(Jingji3V3ChatPanel);
  };

  __proto.onClick = function (e) {
    switch (e.currentTarget) {
      case this.btn1:
        if (this._myInfo) {
          if (this._myInfo.captain == 1) {
            Jingji3V3Center.sendJiesanTeamReq(1);
          } else {
            Jingji3V3Center.sendJiesanTeamReq(2);
          }
        } else {
          Jingji3V3Center.sendJiesanTeamReq(1);
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
      case this.btnTeam:
        PanelManager.openByClass(Jingji3V3ChatPanel);
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
      this.btn2.url = 'mobile/jingji3V3/btnPipei.png';
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

  __proto.onInfo = function (cmd) {
    var myPlayerId = App.role.personId;
    var infoList = cmd.teamInfos;
    var newList = [];
    var info;
    var myInfo = null;
    for (var i = 0; i < infoList.length; i++) {
      info = infoList[i];
      if (info.playerId.toString() != myPlayerId) {
        newList.push(info);
      } else {
        myInfo = info;
      }
    }
    this._myAvatar.setInfo(myInfo, myInfo);
    this._myInfo = myInfo;
    if (myInfo) {
      if (myInfo.captain == 1) {
        this.btn1.url = 'mobile/jingji3V3/btnJiesan.png';
      } else {
        this.btn1.url = 'mobile/jingji3V3/btnLikai.png';
      }
    } else {
      this.btn1.url = 'mobile/jingji3V3/btnJiesan.png';
    }
    var avatar;
    for (i = 0; i < this._avatarVec.length; i++) {
      avatar = this._avatarVec[i];
      if (i >= newList.length) {
        avatar.setInfo(null);
      } else {
        avatar.setInfo(newList[i], myInfo);
      }
    }
  };

  return Jingji3V3PipeiTeamView;
})(Jingji3V3PipeiTeamViewUI);
