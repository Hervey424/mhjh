(function (window, document, Laya) {
  var __un = Laya.un,
    __uns = Laya.uns,
    __static = Laya.static,
    __class = Laya.class,
    __getset = Laya.getset,
    __newvec = Laya.__newvec;

  var Animation = laya.display.Animation,
    BaseConnection = Laya.BaseConnection,
    BlendMode = laya.webgl.canvas.BlendMode;
  var Box = laya.ui.Box,
    Browser = laya.utils.Browser,
    Button = laya.ui.Button,
    Clip = laya.ui.Clip,
    ColorFilter = laya.filters.ColorFilter;
  var Config = Laya.Config,
    DateUtils = Laya.DateUtils,
    EnumPlatform = Laya.EnumPlatform,
    EnumRole = Laya.EnumRole,
    Event = laya.events.Event;
  var EventMgr = Laya.EventMgr,
    FByteArray = flashdisplay.FByteArray,
    FLoader = flashdisplay.FLoader,
    FieldDescriptor_TYPE_INT32 = netease.protobuf.fieldDescriptors.FieldDescriptor_TYPE_INT32;
  var FieldDescriptor_TYPE_INT64 = netease.protobuf.fieldDescriptors.FieldDescriptor_TYPE_INT64,
    FieldDescriptor_TYPE_MESSAGE = netease.protobuf.fieldDescriptors.FieldDescriptor_TYPE_MESSAGE;
  var FieldDescriptor_TYPE_STRING = netease.protobuf.fieldDescriptors.FieldDescriptor_TYPE_STRING,
    FontColor = laya.display.css.FontColor;
  var GameConfig = Laya.GameConfig,
    GameHandler = Laya.GameHandler,
    Handler = laya.utils.Handler,
    IMessagePool = Laya.IMessagePool;
  var Image = laya.ui.Image,
    Input = laya.display.Input,
    InputProxy = Laya.InputProxy,
    Int64 = netease.protobuf.Int64;
  var Keyboard = laya.events.Keyboard,
    Label = laya.ui.Label,
    List = laya.ui.List,
    Loader = laya.net.Loader,
    LoadingPanel = Laya.LoadingPanel;
  var LocalStorage = laya.net.LocalStorage,
    Message = netease.protobuf.Message,
    MouseCursorStyle = Laya.MouseCursorStyle;
  var ReadUtils = netease.protobuf.ReadUtils,
    RepeatedFieldDescriptor_TYPE_MESSAGE = netease.protobuf.fieldDescriptors.RepeatedFieldDescriptor_TYPE_MESSAGE;
  var RepeatedFieldDescriptor_TYPE_STRING = netease.protobuf.fieldDescriptors.RepeatedFieldDescriptor_TYPE_STRING;
  var RequestServerState = Laya.RequestServerState,
    SimpleAlert = Laya.SimpleAlert,
    SoundChannel = laya.media.SoundChannel;
  var SoundManager = laya.media.SoundManager,
    Sprite = laya.display.Sprite,
    TagUtils = Laya.TagUtils,
    TextInput = laya.ui.TextInput;
  var UIUtils = laya.ui.UIUtils,
    View = laya.ui.View,
    WebParams = Laya.WebParams,
    WireType = netease.protobuf.WireType;
  var WriteUtils = netease.protobuf.WriteUtils,
    WritingBuffer = netease.protobuf.WritingBuffer,
    getClassPackageName = Laya.getClassPackageName;
  var getTimer = Laya.getTimer,
    myparseInt = Laya.myparseInt;
  /**
   *登录协议
   *@author 胡剑
   *创建时间：2015-12-8 下午4:18:04
   *
   */
  //class login.LoginMessage
  var LoginMessage = (function () {
    function LoginMessage() {
      // WebParams.setLoginWebLog("login error: "+str+","+str2);
      this._time = 0;
      this._timeing = false;
      this._serverState = '';
      this._http = null;
      BaseConnection.registerCommand(S2C_ErrorMessage, GameHandler.create(this, this.onErrorHandler));
      BaseConnection.registerCommand(S2C_CreateCharacterMessage, GameHandler.create(this, this.onS2CreateCharacterMessageHandler));
      BaseConnection.registerCommand(S2C_AccountLoginSuccessMessage, GameHandler.create(this, this.onS2C_AccountLoginSuccessMessageHandler));
      BaseConnection.registerCommand(S2C_PlayerEnterGameSuccessMessage, GameHandler.create(this, this.onS2C_PlayerEnterGameSuccessMessage));
      BaseConnection.registerCommand(S2C_SubstituteMessage, GameHandler.create(this, this.onS2C_SubstituteMessageHandler));
      BaseConnection.registerCommand(S2C_RandomNamesMessage, GameHandler.create(this, this.onS2C_RandomNamesMessageHandler));
      BaseConnection.registerCommand(S2C_CharacterListMessage, GameHandler.create(this, this.onS2C_CharacterListMessageHandler));
      BaseConnection.registerCommand(S2C_ChangeLoginRoleInfoMessage, GameHandler.create(this, this.onS2C_ChangeLoginRoleInfoMessageHandler));
      EventMgr.add(this, 'RoleLoginToSecne', this.onRemoveMessage);
    }

    __class(LoginMessage, 'login.LoginMessage');
    var __proto = LoginMessage.prototype;
    __proto.initSocketError = function () {
      BaseConnection.tipSocketClose = GameHandler.create(this, this.tipSocketClose);
    };

    __proto.clearSocketError = function () {
      BaseConnection.tipSocketClose = null;
      if (LoginMessage._alert != null) {
        LoginMessage._alert.dispose();
        LoginMessage._alert = null;
      }
      Laya.workerTimer.clear(this, this.onTimer);
    };

    __proto.onS2C_ChangeLoginRoleInfoMessageHandler = function (cmd) {
      LoginRoleManager.ins.changeRoleData(cmd.loginRoleInfo);
      EventMgr.dispatch('LoginEvent.PLAYER_CHANGE');
    };

    __proto.onErrorHandler = function (cmd) {
      var errorcode = cmd.errorcode;
      console.log('onErrorHandler() - errorcode = ' + errorcode);
      if (errorcode == 1) {
        GameConfig.isCreateRole = true;
        WebParams.call('iqiyiActiveUser', [WebParams.account, WebParams.zoneid, 'role']);
      } else if (errorcode == -10012) {
        EventMgr.dispatch('login_error', '您当前的IP地址异常，如有疑问请联系平台客服！');
      } else if (errorcode == -10200) {
        EventMgr.dispatch('login_error', '创建角色过多');
      } else if (errorcode == -10201) {
        EventMgr.dispatch('login_error', '角色创建数据库错误');
      } else if (errorcode == -10202) {
        EventMgr.dispatch('login_error', '长度不能少于2个中文或4个英文');
      } else if (errorcode == -10203) {
        EventMgr.dispatch('login_error', '长度不能超过7个中文或14个英文');
      } else if (errorcode == -10204) {
        EventMgr.dispatch('login_error', '已有相同名字存在');
      } else if (errorcode == -10205) {
        EventMgr.dispatch('login_error', '敏感字符，请输入其他名称');
      } else if (errorcode == -10206) {
        EventMgr.dispatch('login_error', '敏感字符，请输入其他名称');
      } else if (errorcode == -10207) {
        EventMgr.dispatch('login_error', '职业异常');
      } else if (errorcode == -10208) {
        EventMgr.dispatch('login_error', '性别异常');
      } else if (errorcode == -12201) {
        EventMgr.dispatch('login_error', '邀请码有误');
      } else if (errorcode == -12301) {
        EventMgr.dispatch('login_error', '邀请码次数已达上限');
      } else if (errorcode == -10007 || errorcode == -10009) {
        EventMgr.dispatch('LoginEvent.PLAYER_EXITING');
      } else {
        EventMgr.dispatch('login_error', cmd.errorcode + ': ' + cmd.errorMsg);
      }
    };

    // tipSocketClose("登录错误");
    __proto.onS2C_RandomNamesMessageHandler = function (cmd) {
      if (cmd.sex == 1) {
        LoginMessage.boyNames = cmd.names;
      } else {
        LoginMessage.girlNames = cmd.names;
      }
      EventMgr.dispatch('LoginEvent/RANDOM_NAME');
    };

    __proto.onRemoveMessage = function () {
      EventMgr.remove(this, 'RoleLoginToSecne', this.onRemoveMessage);
      LoginMessage.boyNames = null;
      LoginMessage.girlNames = null;
      if (LoginMessage._alert != null) {
        LoginMessage._alert.dispose();
        LoginMessage._alert = null;
      }
    };

    /**
     *账号登录成功返回
     *@param cmd
     *
     */
    __proto.onS2C_AccountLoginSuccessMessageHandler = function (cmd) {
      GameConfig.tempServerObj = cmd;
      GameConfig.msgServerVerson = cmd.msgVer;
    };

    /**
     *没有人物通知显示创角界面，否则返回角色列表onS2C_CharacterListMessageHandler
     *@param cmd
     *
     */
    __proto.onS2CreateCharacterMessageHandler = function (cmd) {
      LoginRoleManager.ins.needCode = cmd.codeType == 1;
      EventMgr.dispatch('show_create_player');
      GameConfig.isFirstCreateRole = true;
    };

    __proto.onS2C_CharacterListMessageHandler = function (cmd) {
      LoginRoleManager.ins.needCode = cmd.codeType == 1;
      var leng = cmd.loginRoleInfos.length;
      if (GameConfig.isOneRole && leng > 0) {
        LoginMessage.sendSelectRoleMessage(cmd.loginRoleInfos[0].playerId);
      } else {
        LoginRoleManager.ins.loadRoleList(cmd.loginRoleInfos);
        EventMgr.dispatch('show_create_player');
      }
    };

    /**
     *人物登录成功，通知显示预加载
     *@param cmd
     *
     */
    __proto.onS2C_PlayerEnterGameSuccessMessage = function (cmd) {
      GameConfig.mapId = cmd.mapId;
      TagUtils.tagTrack('preLoad_5');
      EventMgr.dispatch('show_pre_loader');
      BaseConnection.removeCommand(S2C_PlayerEnterGameSuccessMessage, GameHandler.create(this, this.onS2C_PlayerEnterGameSuccessMessage));
    };

    __proto.onS2C_SubstituteMessageHandler = function (cmd) {
      GameConfig.isSubstitute = true;
      this.showAlert('', '本账号已经在另一处登陆', '');
      console.log('---本账号已经在另一处登陆-----GameConfig.isSubstitute:', GameConfig.isSubstitute);
    };

    __proto.showAlert = function (str, txt2, txt3, caller, method) {
      LoginMessage.alert.show(str, txt2, txt3, caller, method);
    };

    __proto.tipSocketClose = function (str) {
      if (GameConfig.isSubstitute == false && !this._timeing) {
        LoginMessage.alert;
        this.requestServerState();
        this._timeing = true;
        this._time = 120;
        Laya.workerTimer.loop(1000, this, this.onTimer);
      }
    };

    __proto.requestServerState = function () {
      if (!this._http) {
        this._http = new RequestServerState(this, this.showServerState);
      }
      this._http.requestServerState();
    };

    __proto.showServerState = function (str, state) {
      this._serverState = str;
      if (LoginMessage._alert) {
        LoginMessage._alert.label1.text = str;
        LoginMessage._alert.label1.color = GameConfig.isServerWeihu(state) ? '#ef0605' : '#cdcdcb';
      }
    };

    __proto.onTimer = function () {
      this._time--;
      if (!this._serverState) {
        this._serverState = '服务器断开连接';
      }
      this.showAlert(this._serverState, '将在' + this._time + '秒后自动尝试重新连接', LoginMessage.formatTimeToLog(), this, this.callReLoad);
      if (this._time <= 0) {
        this.callReLoad();
      } else {
        if (this._time % 30 == 0) {
          this.requestServerState();
        }
      }
    };

    __proto.callReLoad = function () {
      GameConfig.reloadGame();
    };

    __proto.dispose = function () {
      if (this._http) {
        this._http.close();
        this._http = null;
      }
      this._serverState = null;
      BaseConnection.tipSocketClose = null;
      GameHandler.remove(this, this.tipSocketClose);
      BaseConnection.removeCommand(S2C_ErrorMessage, GameHandler.create(this, this.onErrorHandler));
      BaseConnection.removeCommand(S2C_CreateCharacterMessage, GameHandler.create(this, this.onS2CreateCharacterMessageHandler));
      BaseConnection.removeCommand(S2C_AccountLoginSuccessMessage, GameHandler.create(this, this.onS2C_AccountLoginSuccessMessageHandler));
      BaseConnection.removeCommand(S2C_PlayerEnterGameSuccessMessage, GameHandler.create(this, this.onS2C_PlayerEnterGameSuccessMessage));
      BaseConnection.removeCommand(S2C_SubstituteMessage, GameHandler.create(this, this.onS2C_SubstituteMessageHandler));
      BaseConnection.removeCommand(S2C_RandomNamesMessage, GameHandler.create(this, this.onS2C_RandomNamesMessageHandler));
      BaseConnection.removeCommand(S2C_CharacterListMessage, GameHandler.create(this, this.onS2C_CharacterListMessageHandler));
    };

    __getset(1, LoginMessage, 'alert', function () {
      if (LoginMessage._alert == null) {
        LoginMessage._alert = new SimpleAlert();
      }
      return LoginMessage._alert;
    });

    LoginMessage.formatTimeToLog = function () {
      var t;
      var d = new Date();
      var hour = d.getHours();
      var min = d.getMinutes();
      var sec = d.getSeconds();
      t = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + (hour < 10 ? '0' + hour : '' + hour) + ':' + (min < 10 ? '0' + min : '' + min) + ':' + (sec < 10 ? '0' + sec : '' + sec);
      return t;
    };

    LoginMessage.sendCreateCharacterMessage = function (charname, charsex, charjob, auto, flag, code) {
      auto === void 0 && (auto = 0);
      flag === void 0 && (flag = false);
      code === void 0 && (code = '');
      var msg = new C2S_CreateCharacterMessage();
      msg.country = 1;
      msg.icon = '1';
      msg.code = code;
      msg.name = charname;
      msg.sex = charsex;
      msg.auto = auto;
      msg.job = charjob;
      GameConfig.socket.sendCommand(msg);
    };

    LoginMessage.sendLoginMessage = function (username, password, serverId) {
      serverId === void 0 && (serverId = 1);
      var msg = new C2S_LoginMessage();
      msg.name = username;
      msg.password = password;
      msg.webid = 1;
      msg.serverId = serverId;
      GameConfig.socket.sendCommand(msg);
    };

    LoginMessage.sendLoginForPlatformMessage = function (isKuafuReturn) {
      isKuafuReturn === void 0 && (isKuafuReturn = false);
      var msg = new C2S_LoginForPlatformMessage();
      msg.webid = myparseInt(WebParams.webid);
      msg.serverId = WebParams.zoneid;
      msg.username = WebParams.account;
      msg.agent = WebParams.agent;
      msg.ad = WebParams.ad;
      msg.time = WebParams.time;
      msg.isadult = WebParams.isadultStr;
      msg.sign = WebParams.sign + (isKuafuReturn ? '#kuafu' : '');
      msg.logintype = WebParams.showlogin;
      msg.agentPlusdata = WebParams.agent_plusdata;
      msg.agentColdatas = WebParams.agent_coldatas;
      msg.adregtime = WebParams.adregtime;
      msg.hfagent = WebParams.hfagent;
      msg.agentAppendData = WebParams.agentAppendData;
      msg.agentAppendSign = WebParams.agentAppendSign;
      GameConfig.socket.sendCommand(msg);
    };

    LoginMessage.sendRandomNameMessage = function (sex) {
      var msg = new C2S_RandomNamesMessage();
      msg.sex = sex;
      GameConfig.socket.sendCommand(msg);
    };

    LoginMessage.sendDeleteRoleMessage = function (id) {
      var msg = new C2S_DeleteCharacterMessage();
      msg.playerId = Int64.parseInt64(id);
      GameConfig.socket.sendCommand(msg);
    };

    LoginMessage.sendSelectRoleMessage = function (id) {
      var msg = new C2S_SelectCharacterMessage();
      msg.playerId = id;
      GameConfig.socket.sendCommand(msg);
    };

    LoginMessage.sendRegainRoleMessage = function (id) {
      var msg = new C2S_RegainCharacterMessage();
      msg.playerId = Int64.parseInt64(id);
      GameConfig.socket.sendCommand(msg);
    };

    LoginMessage._alert = null;
    LoginMessage.boyNames = null;
    LoginMessage.girlNames = null;
    return LoginMessage;
  })();

  /**
   *
   *@author 胡剑
   *创建时间：2017-11-2 下午2:17:42
   *
   */
  //class login.utils.L_LocalSave
  var L_LocalSave = (function () {
    function L_LocalSave(name) {
      this._so = null;
      this._rootKey = null;
      this._rootKey = name;
      this._so = LocalStorage.getJSON(name);
      if (!this._so) {
        this._so = {};
      }
    }

    __class(L_LocalSave, 'login.utils.L_LocalSave');
    var __proto = L_LocalSave.prototype;
    __proto.getData = function (key) {
      return this._so[key];
    };

    __proto.deleteData = function (key) {
      delete this._so[key];
      LocalStorage.setJSON(this._rootKey, this._so);
    };

    __proto.setData = function (key, obj) {
      this._so[key] = obj;
      LocalStorage.setJSON(this._rootKey, this._so);
    };

    // }
    __proto.onStatus = function (e) {};
    __getset(0, __proto, 'data', function () {
      return this._so;
    });

    return L_LocalSave;
  })();

  /***
   *游戏预加载网络消息池
   *des:
   *by:guwanyuan(顾万圆)
   *2015-12-9 下午2:38:39
   ***/
  //class login.utils.L_PreLoaderMessagePool
  var L_PreLoaderMessagePool = (function () {
    function L_PreLoaderMessagePool() {
      this.messages = {};
      this.messageClassDic = {};
      this.register(5766, S2C_CreateCharacterMessage, 0);
      this.register(5521, S2C_AccountLoginSuccessMessage, 0);
      this.register(5058, S2C_PlayerEnterGameSuccessMessage, 0);
      this.register(5527, S2C_SubstituteMessage, 0);
      this.register(5331, S2C_RandomNamesMessage, 0);
      this.register(5534, S2C_ErrorMessage, 0);
      this.register(5483, S2C_CharacterListMessage, 0);
      this.register(5207, S2C_ChangeLoginRoleInfoMessage, 0);
      this.registerClass(16765, C2S_CreateCharacterMessage);
      this.registerClass(16423, C2S_LoginMessage);
      this.registerClass(16751, C2S_RandomNamesMessage);
      this.registerClass(16271, C2S_LoginForPlatformMessage);
      this.registerClass(16603, C2S_DeleteCharacterMessage);
      this.registerClass(16791, C2S_RegainCharacterMessage);
      this.registerClass(16185, C2S_SelectCharacterMessage);
    }

    __class(L_PreLoaderMessagePool, 'login.utils.L_PreLoaderMessagePool');
    var __proto = L_PreLoaderMessagePool.prototype;
    Laya.imps(__proto, { IMessagePool: true });
    __proto.register = function (id, messageClass, priority) {
      priority === void 0 && (priority = 0);
      this.messages[id] = messageClass;
    };

    __proto.registerClass = function (id, messageClass) {
      var key = getClassPackageName(messageClass);
      this.messageClassDic[key] = id;
    };

    __proto.getMessageIDByClass = function (messageClass) {
      var key = getClassPackageName(messageClass);
      if (this.messageClassDic[key] == null) return -1;
      else return this.messageClassDic[key];
    };

    __proto.getMessageCls = function (id) {
      if (this.messages[id] == null) return null;
      else return this.messages[id];
    };

    __proto.getMessage = function (id) {
      if (this.messages[id] == null) return null;
      else return new this.messages[id]();
    };

    return L_PreLoaderMessagePool;
  })();

  /**
   *创角-事件
   *@author zq
   *创建时间：2024年5月18日16:25:23
   */
  //class login.view.create.CreatePlayerEvent
  var CreatePlayerEvent = (function () {
    function CreatePlayerEvent() {}
    __class(CreatePlayerEvent, 'login.view.create.CreatePlayerEvent');
    CreatePlayerEvent.GAME_BEGIN = 'CreatePlayerEvent.GAME_BEGIN';
    CreatePlayerEvent.CHANGE_ROLE_UNIT = 'CreatePlayerEvent.CHANGE_ROLE_UNIT';
    CreatePlayerEvent.CLOSE_NAME_PANEL = 'CreatePlayerEvent.CLOSE_NAME_PANEL';
    CreatePlayerEvent.NOTICE = 'CreatePlayerEvent.NOTICE';
    CreatePlayerEvent.PLAY_CLICK_SOUND = 'CreatePlayerEvent.PLAY_CLICK_SOUND';
    CreatePlayerEvent.DEL_ROLE = 'CreatePlayerEvent.DEL_ROLE';
    return CreatePlayerEvent;
  })();

  /**
   *创角-工具类
   *@author zq
   *创建时间：2024年5月8日11:18:52
   */
  //class login.view.create.CreatePlayerUtils
  var CreatePlayerUtils = (function () {
    function CreatePlayerUtils() {}
    __class(CreatePlayerUtils, 'login.view.create.CreatePlayerUtils');
    CreatePlayerUtils.getMinScale = function () {
      var sw = Laya.stage.width;
      var sh = Laya.stage.height;
      if (sw < 1368) {
        sw = 1368;
      }
      if (sh < 768) {
        sh = 768;
      }
      sw = Laya.stage.width / 1920;
      sh = Laya.stage.height / Browser.clientHeight;
      if (sw > 1) {
        sw = 1;
      }
      if (sh > 1) {
        sh = 1;
      }
      var scaleValue = Math.min(sw, sh);
      return scaleValue;
    };

    CreatePlayerUtils.resizeByMinScale = function (target) {
      if (target == null) return;
      var scaleValue = login.view.create.CreatePlayerUtils.getMinScale();
      target.scaleXY = scaleValue;
      var xpos = (Laya.stage.width - target.width * scaleValue) >> 1;
      var ypos = (Laya.stage.height - target.height * scaleValue) >> 1;
      if (ypos > 0) {
        ypos = 0;
      }
      target.pos(xpos, ypos);
    };

    return CreatePlayerUtils;
  })();

  //class login.view.data.LoginRoleData
  var LoginRoleData = (function () {
    function LoginRoleData() {
      /**唯一ID*/
      this.id = null;
      /**职业*/
      this.job = 0;
      /**性别*/
      this.sex = 0;
      /**等级*/
      this.lv = 0;
      /**转生*/
      this.zs = 0;
      /**名字*/
      this.playerName = null;
      /**删除时间*/
      this.deltime = 0;
      /**删除状态 0未删除、1删除中、2已删除*/
      this.isDel = 0;
      /**上次登录时间*/
      this.logintime = 0;
    }

    __class(LoginRoleData, 'login.view.data.LoginRoleData');
    var __proto = LoginRoleData.prototype;
    __proto.init = function (info) {
      this.id = info.playerId.toString();
      this.sex = info.sex;
      this.job = info.job;
      this.lv = info.level;
      this.playerName = info.name;
      this.deltime = info.deleteTime;
      this.isDel = info.isDelete;
      this.logintime = info.loginTime;
      this.zs = info.jingjieId % 1000;
    };

    return LoginRoleData;
  })();

  /**
   *创角-管理类
   *@author zq
   *创建时间：2024年4月22日13:35:18
   */
  //class login.view.data.LoginRoleManager
  var LoginRoleManager = (function () {
    function LoginRoleManager() {
      //创角数据
      this.selectRole = null;
      this.job = 0;
      this.sex = 0;
      this.name = null;
      this.auto = 0;
      //是否需要邀请码，才可以创角 ？ 0不需要用， 1需要
      this.needCode = false;
      this.inviteCode = '';
      this._roleList = [];
    }

    __class(LoginRoleManager, 'login.view.data.LoginRoleManager');
    var __proto = LoginRoleManager.prototype;
    /**
     *自动进入游戏时间
     *@return
     */
    __proto.getAutoEnterGameTime = function () {
      var agent = WebParams.agent;
      if (agent == EnumPlatform.PLAT_QQ || agent == EnumPlatform.AD_QQGAME || agent == EnumPlatform.AD_QZONE) {
        return 10;
      }
      return 15;
    };

    __proto.loadRoleList = function (arr) {
      this._roleList = [];
      for (var i = 0; i < arr.length; i++) {
        var data = new LoginRoleData();
        data.init(arr[i]);
        this._roleList.push(data);
      }
      Laya.workerTimer.loop(1000, this, this.onTimer);
    };

    __proto.changeRoleData = function (info) {
      var id = info.playerId.toString();
      for (var i = 0; i < this._roleList.length; i++) {
        var data = this._roleList[i];
        if (data.id == id) {
          data.init(info);
          break;
        }
      }
    };

    __proto.getRoleList = function () {
      var arr;
      for (var i = 0; i < this._roleList.length; i++) {
        var data = this._roleList[i];
        if (data.isDel != 2) {
          if (arr == null) {
            arr = [];
          }
          arr.push(data);
        }
      }
      return arr;
    };

    __proto.getRoleCount = function () {
      var arr = this.getRoleList();
      if (arr) {
        return arr.length;
      }
      return 0;
    };

    __proto.selectRoleIsDelete = function (data) {
      if (data) {
        return data.isDel == 1;
      }
      return this.selectRole && this.selectRole.isDel == 1;
    };

    __proto.getLastLoginIndex = function () {
      var tmpData;
      var index = 0;
      var last = 0;
      for (var i = 0; i < this._roleList.length; i++) {
        var data = this._roleList[i];
        if (data.isDel == 2) {
          continue;
        }
        if (data.isDel == 1 && data.deltime <= 0) {
          continue;
        }
        if (tmpData == null) {
          tmpData = data;
          last = index;
        } else if (tmpData.logintime < data.logintime) {
          tmpData = data;
          last = index;
        }
        index++;
      }
      return last;
    };

    __proto.clear = function () {
      this.selectRole = null;
      this.job = 0;
      this.sex = 0;
      this.auto = 0;
      this.name = '';
    };

    __proto.beginGame = function () {
      if (this.selectRole != null) {
        this.sendSelectRole();
      } else {
        this.sendCreateRole();
      }
    };

    /**
     *发送创建角色
     *@param auto
     */
    __proto.sendCreateRole = function () {
      if (this.job != 0 && this.sex != 0 && this.name) {
        TagUtils.tagTrack('clickStart_4');
        LoginMessage.sendCreateCharacterMessage(this.name, this.sex, this.job, this.auto, false, this.inviteCode);
        if (WebParams.isIqiyi()) {
          var obj = { type: 'dataCount', msg: 'role' };
          Browser.window.parent.postMessage(obj, '*');
        }
      } else {
        EventMgr.dispatch('CreatePlayerEvent.NOTICE', '请输入角色名！');
      }
    };

    /**
     *发送选择角色
     */
    __proto.sendSelectRole = function () {
      if (this.selectRole) {
        LoginMessage.sendSelectRoleMessage(Int64.parseInt64(this.selectRole.id));
      }
    };

    /**
     *发送删除角色
     */
    __proto.sendDeleteRole = function (data) {
      var id;
      if (data && data.isDel == 0) {
        id = data.id;
      } else if (this.selectRole && this.selectRole.isDel == 0) {
        id = this.selectRole.id;
      }
      if (id) {
        LoginMessage.sendDeleteRoleMessage(id);
      }
    };

    __proto.onTimer = function () {
      var change = false;
      for (var i = 0; i < this._roleList.length; i++) {
        var data = this._roleList[i];
        if (data.isDel == 1 && data.deltime > 0) {
          data.deltime--;
          if (data.deltime <= 0) {
            change = true;
          }
        }
      }
      if (change) {
        EventMgr.dispatch('LoginEvent.PLAYER_CHANGE');
      }
    };

    __proto.destory = function () {
      this.clear();
      Laya.workerTimer.clear(this, this.onTimer);
    };

    __getset(1, LoginRoleManager, 'ins', function () {
      if (LoginRoleManager._ins == null) {
        LoginRoleManager._ins = new LoginRoleManager();
      }
      return LoginRoleManager._ins;
    });

    LoginRoleManager._ins = null;
    return LoginRoleManager;
  })();

  // @@protoc_insertion_point(class_metadata)
  //class login.net.protobuf.C2S_CreateCharacterMessage extends netease.protobuf.Message
  var C2S_CreateCharacterMessage = (function (_super) {
    function C2S_CreateCharacterMessage() {
      this.job$field = 0;
      this.hasField$0 = 0;
      this.country$field = 0;
      this.auto$field = 0;
      this.icon$field = null;
      this.name$field = null;
      this.sex$field = 0;
      this.code$field = null;
      C2S_CreateCharacterMessage.__super.call(this);
    }

    __class(C2S_CreateCharacterMessage, 'login.net.protobuf.C2S_CreateCharacterMessage', _super);
    var __proto = C2S_CreateCharacterMessage.prototype;
    __proto.clearJob = function () {
      this.hasField$0 &= 0xfffffffe;
      this.job$field = new int();
    };

    __proto.clearCountry = function () {
      this.hasField$0 &= 0xfffffffd;
      this.country$field = new int();
    };

    __proto.clearAuto = function () {
      this.hasField$0 &= 0xfffffffb;
      this.auto$field = new int();
    };

    __proto.clearIcon = function () {
      this.icon$field = null;
    };

    __proto.clearName = function () {
      this.name$field = null;
    };

    __proto.clearSex = function () {
      this.hasField$0 &= 0xfffffff7;
      this.sex$field = new int();
    };

    __proto.clearCode = function () {
      this.code$field = null;
    };

    /**
     *@private
     */
    __proto.writeToBuffer = function (output) {
      if (this.hasJob) {
        WriteUtils.writeTag(output, 0, 2);
        WriteUtils.write_TYPE_INT32(output, this.job$field);
      }
      if (this.hasCountry) {
        WriteUtils.writeTag(output, 0, 3);
        WriteUtils.write_TYPE_INT32(output, this.country$field);
      }
      if (this.hasAuto) {
        WriteUtils.writeTag(output, 0, 4);
        WriteUtils.write_TYPE_INT32(output, this.auto$field);
      }
      if (this.hasIcon) {
        WriteUtils.writeTag(output, 2, 5);
        WriteUtils.write_TYPE_STRING(output, this.icon$field);
      }
      if (this.hasName) {
        WriteUtils.writeTag(output, 2, 6);
        WriteUtils.write_TYPE_STRING(output, this.name$field);
      }
      if (this.hasSex) {
        WriteUtils.writeTag(output, 0, 7);
        WriteUtils.write_TYPE_INT32(output, this.sex$field);
      }
      if (this.hasCode) {
        WriteUtils.writeTag(output, 2, 8);
        WriteUtils.write_TYPE_STRING(output, this.code$field);
      }
      if (false) {
      }
    };
    /**
     *@private
     */
    __proto.readFromSlice = function (input, bytesAfterSlice) {
      var job$count = 0;
      var country$count = 0;
      var auto$count = 0;
      var icon$count = 0;
      var name$count = 0;
      var sex$count = 0;
      var code$count = 0;
      while (input.bytesAvailable > bytesAfterSlice) {
        var tag = ReadUtils.read_TYPE_UINT32(input);
        switch (tag >> 3) {
          case 2:
            if (job$count != 0) {
              throw new Error('Bad data format: C2S_CreateCharacterMessage.job cannot be set twice.');
            }
            ++job$count;
            this.job = ReadUtils.read_TYPE_INT32(input);
            break;
          case 3:
            if (country$count != 0) {
              throw new Error('Bad data format: C2S_CreateCharacterMessage.country cannot be set twice.');
            }
            ++country$count;
            this.country = ReadUtils.read_TYPE_INT32(input);
            break;
          case 4:
            if (auto$count != 0) {
              throw new Error('Bad data format: C2S_CreateCharacterMessage.auto cannot be set twice.');
            }
            ++auto$count;
            this.auto = ReadUtils.read_TYPE_INT32(input);
            break;
          case 5:
            if (icon$count != 0) {
              throw new Error('Bad data format: C2S_CreateCharacterMessage.icon cannot be set twice.');
            }
            ++icon$count;
            this.icon = ReadUtils.read_TYPE_STRING(input);
            break;
          case 6:
            if (name$count != 0) {
              throw new Error('Bad data format: C2S_CreateCharacterMessage.name cannot be set twice.');
            }
            ++name$count;
            this.name = ReadUtils.read_TYPE_STRING(input);
            break;
          case 7:
            if (sex$count != 0) {
              throw new Error('Bad data format: C2S_CreateCharacterMessage.sex cannot be set twice.');
            }
            ++sex$count;
            this.sex = ReadUtils.read_TYPE_INT32(input);
            break;
          case 8:
            if (code$count != 0) {
              throw new Error('Bad data format: C2S_CreateCharacterMessage.code cannot be set twice.');
            }
            ++code$count;
            this.code = ReadUtils.read_TYPE_STRING(input);
            break;
          default:
            this.readUnknown(input, tag);
            break;
        }
      }
    };

    __getset(0, __proto, 'hasIcon', function () {
      return this.icon$field != null;
    });

    __getset(0, __proto, 'hasJob', function () {
      return (this.hasField$0 & 0x1) != 0;
    });

    __getset(
      0,
      __proto,
      'job',
      function () {
        if (!this.hasJob) {
          return 0;
        }
        return this.job$field;
      },
      function (value) {
        this.hasField$0 |= 0x1;
        this.job$field = value;
      }
    );

    __getset(0, __proto, 'hasCountry', function () {
      return (this.hasField$0 & 0x2) != 0;
    });

    __getset(
      0,
      __proto,
      'country',
      function () {
        if (!this.hasCountry) {
          return 0;
        }
        return this.country$field;
      },
      function (value) {
        this.hasField$0 |= 0x2;
        this.country$field = value;
      }
    );

    __getset(0, __proto, 'hasName', function () {
      return this.name$field != null;
    });

    __getset(
      0,
      __proto,
      'icon',
      function () {
        if (!this.hasIcon) {
          return '';
        }
        return this.icon$field;
      },
      function (value) {
        this.icon$field = value;
      }
    );

    __getset(0, __proto, 'hasAuto', function () {
      return (this.hasField$0 & 0x4) != 0;
    });

    __getset(
      0,
      __proto,
      'auto',
      function () {
        if (!this.hasAuto) {
          return 0;
        }
        return this.auto$field;
      },
      function (value) {
        this.hasField$0 |= 0x4;
        this.auto$field = value;
      }
    );

    __getset(
      0,
      __proto,
      'name',
      function () {
        if (!this.hasName) {
          return '';
        }
        return this.name$field;
      },
      function (value) {
        this.name$field = value;
      }
    );

    __getset(0, __proto, 'hasSex', function () {
      return (this.hasField$0 & 0x8) != 0;
    });

    __getset(
      0,
      __proto,
      'sex',
      function () {
        if (!this.hasSex) {
          return 0;
        }
        return this.sex$field;
      },
      function (value) {
        this.hasField$0 |= 0x8;
        this.sex$field = value;
      }
    );

    __getset(0, __proto, 'hasCode', function () {
      return this.code$field != null;
    });

    __getset(
      0,
      __proto,
      'code',
      function () {
        if (!this.hasCode) {
          return '';
        }
        return this.code$field;
      },
      function (value) {
        this.code$field = value;
      }
    );

    __static(C2S_CreateCharacterMessage, [
      'JOB',
      function () {
        return (this.JOB = new FieldDescriptor_TYPE_INT32('C2S_CreateCharacterMessage.job', 'job', (2 << 3) | 0));
      },
      'COUNTRY',
      function () {
        return (this.COUNTRY = new FieldDescriptor_TYPE_INT32('C2S_CreateCharacterMessage.country', 'country', (3 << 3) | 0));
      },
      'AUTO',
      function () {
        return (this.AUTO = new FieldDescriptor_TYPE_INT32('C2S_CreateCharacterMessage.auto', 'auto', (4 << 3) | 0));
      },
      'ICON',
      function () {
        return (this.ICON = new FieldDescriptor_TYPE_STRING('C2S_CreateCharacterMessage.icon', 'icon', (5 << 3) | 2));
      },
      'NAME',
      function () {
        return (this.NAME = new FieldDescriptor_TYPE_STRING('C2S_CreateCharacterMessage.name', 'name', (6 << 3) | 2));
      },
      'SEX',
      function () {
        return (this.SEX = new FieldDescriptor_TYPE_INT32('C2S_CreateCharacterMessage.sex', 'sex', (7 << 3) | 0));
      },
      'CODE',
      function () {
        return (this.CODE = new FieldDescriptor_TYPE_STRING('C2S_CreateCharacterMessage.code', 'code', (8 << 3) | 2));
      }
    ]);
    return C2S_CreateCharacterMessage;
  })(Message);

  // @@protoc_insertion_point(class_metadata)
  //class login.net.protobuf.C2S_DeleteCharacterMessage extends netease.protobuf.Message
  var C2S_DeleteCharacterMessage = (function (_super) {
    function C2S_DeleteCharacterMessage() {
      this.playerId$field = null;
      C2S_DeleteCharacterMessage.__super.call(this);
    }

    __class(C2S_DeleteCharacterMessage, 'login.net.protobuf.C2S_DeleteCharacterMessage', _super);
    var __proto = C2S_DeleteCharacterMessage.prototype;
    __proto.clearPlayerId = function () {
      this.playerId$field = null;
    };

    /**
     *@private
     */
    __proto.writeToBuffer = function (output) {
      if (this.hasPlayerId) {
        WriteUtils.writeTag(output, 0, 1);
        WriteUtils.write_TYPE_INT64(output, this.playerId$field);
      }
      if (false) {
      }
    };
    /**
     *@private
     */
    __proto.readFromSlice = function (input, bytesAfterSlice) {
      var playerId$count = 0;
      while (input.bytesAvailable > bytesAfterSlice) {
        var tag = ReadUtils.read_TYPE_UINT32(input);
        switch (tag >> 3) {
          case 1:
            if (playerId$count != 0) {
              throw new Error('Bad data format: C2S_DeleteCharacterMessage.playerId cannot be set twice.');
            }
            ++playerId$count;
            this.playerId = ReadUtils.read_TYPE_INT64(input);
            break;
          default:
            this.readUnknown(input, tag);
            break;
        }
      }
    };

    __getset(0, __proto, 'hasPlayerId', function () {
      return this.playerId$field != null;
    });

    __getset(
      0,
      __proto,
      'playerId',
      function () {
        if (!this.hasPlayerId) {
          return new Int64(0, 0);
        }
        return this.playerId$field;
      },
      function (value) {
        this.playerId$field = value;
      }
    );

    __static(C2S_DeleteCharacterMessage, [
      'PLAYERID',
      function () {
        return (this.PLAYERID = new FieldDescriptor_TYPE_INT64('C2S_DeleteCharacterMessage.playerId', 'playerId', (1 << 3) | 0));
      }
    ]);
    return C2S_DeleteCharacterMessage;
  })(Message);

  // @@protoc_insertion_point(class_metadata)
  //class login.net.protobuf.C2S_LoginForPlatformMessage extends netease.protobuf.Message
  var C2S_LoginForPlatformMessage = (function (_super) {
    function C2S_LoginForPlatformMessage() {
      this.webid$field = 0;
      this.hasField$0 = 0;
      this.serverId$field = null;
      this.username$field = null;
      this.agent$field = null;
      this.ad$field = null;
      this.time$field = null;
      this.isadult$field = null;
      this.sign$field = null;
      this.logintype$field = null;
      this.agentPlusdata$field = null;
      this.agentColdatas$field = null;
      this.adregtime$field = null;
      this.hfagent$field = null;
      this.agentAppendData$field = null;
      this.agentAppendSign$field = null;
      C2S_LoginForPlatformMessage.__super.call(this);
    }

    __class(C2S_LoginForPlatformMessage, 'login.net.protobuf.C2S_LoginForPlatformMessage', _super);
    var __proto = C2S_LoginForPlatformMessage.prototype;
    __proto.clearWebid = function () {
      this.hasField$0 &= 0xfffffffe;
      this.webid$field = new int();
    };

    __proto.clearServerId = function () {
      this.serverId$field = null;
    };

    __proto.clearUsername = function () {
      this.username$field = null;
    };

    __proto.clearAgent = function () {
      this.agent$field = null;
    };

    __proto.clearAd = function () {
      this.ad$field = null;
    };

    __proto.clearTime = function () {
      this.time$field = null;
    };

    __proto.clearIsadult = function () {
      this.isadult$field = null;
    };

    __proto.clearSign = function () {
      this.sign$field = null;
    };

    __proto.clearLogintype = function () {
      this.logintype$field = null;
    };

    __proto.clearAgentPlusdata = function () {
      this.agentPlusdata$field = null;
    };

    __proto.clearAgentColdatas = function () {
      this.agentColdatas$field = null;
    };

    __proto.clearAdregtime = function () {
      this.adregtime$field = null;
    };

    __proto.clearHfagent = function () {
      this.hfagent$field = null;
    };

    __proto.clearAgentAppendData = function () {
      this.agentAppendData$field = null;
    };

    __proto.clearAgentAppendSign = function () {
      this.agentAppendSign$field = null;
    };

    /**
     *@private
     */
    __proto.writeToBuffer = function (output) {
      if (this.hasWebid) {
        WriteUtils.writeTag(output, 0, 1);
        WriteUtils.write_TYPE_INT32(output, this.webid$field);
      }
      if (this.hasServerId) {
        WriteUtils.writeTag(output, 2, 2);
        WriteUtils.write_TYPE_STRING(output, this.serverId$field);
      }
      if (this.hasUsername) {
        WriteUtils.writeTag(output, 2, 3);
        WriteUtils.write_TYPE_STRING(output, this.username$field);
      }
      if (this.hasAgent) {
        WriteUtils.writeTag(output, 2, 4);
        WriteUtils.write_TYPE_STRING(output, this.agent$field);
      }
      if (this.hasAd) {
        WriteUtils.writeTag(output, 2, 5);
        WriteUtils.write_TYPE_STRING(output, this.ad$field);
      }
      if (this.hasTime) {
        WriteUtils.writeTag(output, 2, 6);
        WriteUtils.write_TYPE_STRING(output, this.time$field);
      }
      if (this.hasIsadult) {
        WriteUtils.writeTag(output, 2, 7);
        WriteUtils.write_TYPE_STRING(output, this.isadult$field);
      }
      if (this.hasSign) {
        WriteUtils.writeTag(output, 2, 8);
        WriteUtils.write_TYPE_STRING(output, this.sign$field);
      }
      if (this.hasLogintype) {
        WriteUtils.writeTag(output, 2, 9);
        WriteUtils.write_TYPE_STRING(output, this.logintype$field);
      }
      if (this.hasAgentPlusdata) {
        WriteUtils.writeTag(output, 2, 10);
        WriteUtils.write_TYPE_STRING(output, this.agentPlusdata$field);
      }
      if (this.hasAgentColdatas) {
        WriteUtils.writeTag(output, 2, 11);
        WriteUtils.write_TYPE_STRING(output, this.agentColdatas$field);
      }
      if (this.hasAdregtime) {
        WriteUtils.writeTag(output, 2, 12);
        WriteUtils.write_TYPE_STRING(output, this.adregtime$field);
      }
      if (this.hasHfagent) {
        WriteUtils.writeTag(output, 2, 13);
        WriteUtils.write_TYPE_STRING(output, this.hfagent$field);
      }
      if (this.hasAgentAppendData) {
        WriteUtils.writeTag(output, 2, 14);
        WriteUtils.write_TYPE_STRING(output, this.agentAppendData$field);
      }
      if (this.hasAgentAppendSign) {
        WriteUtils.writeTag(output, 2, 15);
        WriteUtils.write_TYPE_STRING(output, this.agentAppendSign$field);
      }
      if (false) {
      }
    };
    /**
     *@private
     */
    __proto.readFromSlice = function (input, bytesAfterSlice) {
      var webid$count = 0;
      var serverId$count = 0;
      var username$count = 0;
      var agent$count = 0;
      var ad$count = 0;
      var time$count = 0;
      var isadult$count = 0;
      var sign$count = 0;
      var logintype$count = 0;
      var agentPlusdata$count = 0;
      var agentColdatas$count = 0;
      var adregtime$count = 0;
      var hfagent$count = 0;
      var agentAppendData$count = 0;
      var agentAppendSign$count = 0;
      while (input.bytesAvailable > bytesAfterSlice) {
        var tag = ReadUtils.read_TYPE_UINT32(input);
        switch (tag >> 3) {
          case 1:
            if (webid$count != 0) {
              throw new Error('Bad data format: C2S_LoginForPlatformMessage.webid cannot be set twice.');
            }
            ++webid$count;
            this.webid = ReadUtils.read_TYPE_INT32(input);
            break;
          case 2:
            if (serverId$count != 0) {
              throw new Error('Bad data format: C2S_LoginForPlatformMessage.serverId cannot be set twice.');
            }
            ++serverId$count;
            this.serverId = ReadUtils.read_TYPE_STRING(input);
            break;
          case 3:
            if (username$count != 0) {
              throw new Error('Bad data format: C2S_LoginForPlatformMessage.username cannot be set twice.');
            }
            ++username$count;
            this.username = ReadUtils.read_TYPE_STRING(input);
            break;
          case 4:
            if (agent$count != 0) {
              throw new Error('Bad data format: C2S_LoginForPlatformMessage.agent cannot be set twice.');
            }
            ++agent$count;
            this.agent = ReadUtils.read_TYPE_STRING(input);
            break;
          case 5:
            if (ad$count != 0) {
              throw new Error('Bad data format: C2S_LoginForPlatformMessage.ad cannot be set twice.');
            }
            ++ad$count;
            this.ad = ReadUtils.read_TYPE_STRING(input);
            break;
          case 6:
            if (time$count != 0) {
              throw new Error('Bad data format: C2S_LoginForPlatformMessage.time cannot be set twice.');
            }
            ++time$count;
            this.time = ReadUtils.read_TYPE_STRING(input);
            break;
          case 7:
            if (isadult$count != 0) {
              throw new Error('Bad data format: C2S_LoginForPlatformMessage.isadult cannot be set twice.');
            }
            ++isadult$count;
            this.isadult = ReadUtils.read_TYPE_STRING(input);
            break;
          case 8:
            if (sign$count != 0) {
              throw new Error('Bad data format: C2S_LoginForPlatformMessage.sign cannot be set twice.');
            }
            ++sign$count;
            this.sign = ReadUtils.read_TYPE_STRING(input);
            break;
          case 9:
            if (logintype$count != 0) {
              throw new Error('Bad data format: C2S_LoginForPlatformMessage.logintype cannot be set twice.');
            }
            ++logintype$count;
            this.logintype = ReadUtils.read_TYPE_STRING(input);
            break;
          case 10:
            if (agentPlusdata$count != 0) {
              throw new Error('Bad data format: C2S_LoginForPlatformMessage.agentPlusdata cannot be set twice.');
            }
            ++agentPlusdata$count;
            this.agentPlusdata = ReadUtils.read_TYPE_STRING(input);
            break;
          case 11:
            if (agentColdatas$count != 0) {
              throw new Error('Bad data format: C2S_LoginForPlatformMessage.agentColdatas cannot be set twice.');
            }
            ++agentColdatas$count;
            this.agentColdatas = ReadUtils.read_TYPE_STRING(input);
            break;
          case 12:
            if (adregtime$count != 0) {
              throw new Error('Bad data format: C2S_LoginForPlatformMessage.adregtime cannot be set twice.');
            }
            ++adregtime$count;
            this.adregtime = ReadUtils.read_TYPE_STRING(input);
            break;
          case 13:
            if (hfagent$count != 0) {
              throw new Error('Bad data format: C2S_LoginForPlatformMessage.hfagent cannot be set twice.');
            }
            ++hfagent$count;
            this.hfagent = ReadUtils.read_TYPE_STRING(input);
            break;
          case 14:
            if (agentAppendData$count != 0) {
              throw new Error('Bad data format: C2S_LoginForPlatformMessage.agentAppendData cannot be set twice.');
            }
            ++agentAppendData$count;
            this.agentAppendData = ReadUtils.read_TYPE_STRING(input);
            break;
          case 15:
            if (agentAppendSign$count != 0) {
              throw new Error('Bad data format: C2S_LoginForPlatformMessage.agentAppendSign cannot be set twice.');
            }
            ++agentAppendSign$count;
            this.agentAppendSign = ReadUtils.read_TYPE_STRING(input);
            break;
          default:
            this.readUnknown(input, tag);
            break;
        }
      }
    };

    __getset(0, __proto, 'hasAd', function () {
      return this.ad$field != null;
    });

    __getset(
      0,
      __proto,
      'agent',
      function () {
        if (!this.hasAgent) {
          return '';
        }
        return this.agent$field;
      },
      function (value) {
        this.agent$field = value;
      }
    );

    __getset(0, __proto, 'hasHfagent', function () {
      return this.hfagent$field != null;
    });

    __getset(0, __proto, 'hasWebid', function () {
      return (this.hasField$0 & 0x1) != 0;
    });

    __getset(
      0,
      __proto,
      'sign',
      function () {
        if (!this.hasSign) {
          return '';
        }
        return this.sign$field;
      },
      function (value) {
        this.sign$field = value;
      }
    );

    __getset(
      0,
      __proto,
      'time',
      function () {
        if (!this.hasTime) {
          return '';
        }
        return this.time$field;
      },
      function (value) {
        this.time$field = value;
      }
    );

    __getset(
      0,
      __proto,
      'webid',
      function () {
        if (!this.hasWebid) {
          return 0;
        }
        return this.webid$field;
      },
      function (value) {
        this.hasField$0 |= 0x1;
        this.webid$field = value;
      }
    );

    __getset(0, __proto, 'hasServerId', function () {
      return this.serverId$field != null;
    });

    __getset(
      0,
      __proto,
      'agentAppendSign',
      function () {
        if (!this.hasAgentAppendSign) {
          return '';
        }
        return this.agentAppendSign$field;
      },
      function (value) {
        this.agentAppendSign$field = value;
      }
    );

    __getset(
      0,
      __proto,
      'isadult',
      function () {
        if (!this.hasIsadult) {
          return '';
        }
        return this.isadult$field;
      },
      function (value) {
        this.isadult$field = value;
      }
    );

    __getset(
      0,
      __proto,
      'serverId',
      function () {
        if (!this.hasServerId) {
          return '';
        }
        return this.serverId$field;
      },
      function (value) {
        this.serverId$field = value;
      }
    );

    __getset(0, __proto, 'hasUsername', function () {
      return this.username$field != null;
    });

    __getset(0, __proto, 'hasAgentAppendSign', function () {
      return this.agentAppendSign$field != null;
    });

    __getset(
      0,
      __proto,
      'username',
      function () {
        if (!this.hasUsername) {
          return '';
        }
        return this.username$field;
      },
      function (value) {
        this.username$field = value;
      }
    );

    __getset(0, __proto, 'hasAgent', function () {
      return this.agent$field != null;
    });

    __getset(
      0,
      __proto,
      'ad',
      function () {
        if (!this.hasAd) {
          return '';
        }
        return this.ad$field;
      },
      function (value) {
        this.ad$field = value;
      }
    );

    __getset(0, __proto, 'hasTime', function () {
      return this.time$field != null;
    });

    __getset(0, __proto, 'hasIsadult', function () {
      return this.isadult$field != null;
    });

    __getset(0, __proto, 'hasSign', function () {
      return this.sign$field != null;
    });

    __getset(0, __proto, 'hasAgentPlusdata', function () {
      return this.agentPlusdata$field != null;
    });

    __getset(0, __proto, 'hasLogintype', function () {
      return this.logintype$field != null;
    });

    __getset(
      0,
      __proto,
      'agentAppendData',
      function () {
        if (!this.hasAgentAppendData) {
          return '';
        }
        return this.agentAppendData$field;
      },
      function (value) {
        this.agentAppendData$field = value;
      }
    );

    __getset(
      0,
      __proto,
      'logintype',
      function () {
        if (!this.hasLogintype) {
          return '';
        }
        return this.logintype$field;
      },
      function (value) {
        this.logintype$field = value;
      }
    );

    __getset(
      0,
      __proto,
      'agentPlusdata',
      function () {
        if (!this.hasAgentPlusdata) {
          return '';
        }
        return this.agentPlusdata$field;
      },
      function (value) {
        this.agentPlusdata$field = value;
      }
    );

    __getset(0, __proto, 'hasAgentColdatas', function () {
      return this.agentColdatas$field != null;
    });

    __getset(
      0,
      __proto,
      'agentColdatas',
      function () {
        if (!this.hasAgentColdatas) {
          return '';
        }
        return this.agentColdatas$field;
      },
      function (value) {
        this.agentColdatas$field = value;
      }
    );

    __getset(0, __proto, 'hasAdregtime', function () {
      return this.adregtime$field != null;
    });

    __getset(
      0,
      __proto,
      'adregtime',
      function () {
        if (!this.hasAdregtime) {
          return '';
        }
        return this.adregtime$field;
      },
      function (value) {
        this.adregtime$field = value;
      }
    );

    __getset(0, __proto, 'hasAgentAppendData', function () {
      return this.agentAppendData$field != null;
    });

    __getset(
      0,
      __proto,
      'hfagent',
      function () {
        if (!this.hasHfagent) {
          return '';
        }
        return this.hfagent$field;
      },
      function (value) {
        this.hfagent$field = value;
      }
    );

    __static(C2S_LoginForPlatformMessage, [
      'WEBID',
      function () {
        return (this.WEBID = new FieldDescriptor_TYPE_INT32('C2S_LoginForPlatformMessage.webid', 'webid', (1 << 3) | 0));
      },
      'SERVERID',
      function () {
        return (this.SERVERID = new FieldDescriptor_TYPE_STRING('C2S_LoginForPlatformMessage.serverId', 'serverId', (2 << 3) | 2));
      },
      'USERNAME',
      function () {
        return (this.USERNAME = new FieldDescriptor_TYPE_STRING('C2S_LoginForPlatformMessage.username', 'username', (3 << 3) | 2));
      },
      'AGENT',
      function () {
        return (this.AGENT = new FieldDescriptor_TYPE_STRING('C2S_LoginForPlatformMessage.agent', 'agent', (4 << 3) | 2));
      },
      'AD',
      function () {
        return (this.AD = new FieldDescriptor_TYPE_STRING('C2S_LoginForPlatformMessage.ad', 'ad', (5 << 3) | 2));
      },
      'TIME',
      function () {
        return (this.TIME = new FieldDescriptor_TYPE_STRING('C2S_LoginForPlatformMessage.time', 'time', (6 << 3) | 2));
      },
      'ISADULT',
      function () {
        return (this.ISADULT = new FieldDescriptor_TYPE_STRING('C2S_LoginForPlatformMessage.isadult', 'isadult', (7 << 3) | 2));
      },
      'SIGN',
      function () {
        return (this.SIGN = new FieldDescriptor_TYPE_STRING('C2S_LoginForPlatformMessage.sign', 'sign', (8 << 3) | 2));
      },
      'LOGINTYPE',
      function () {
        return (this.LOGINTYPE = new FieldDescriptor_TYPE_STRING('C2S_LoginForPlatformMessage.logintype', 'logintype', (9 << 3) | 2));
      },
      'AGENTPLUSDATA',
      function () {
        return (this.AGENTPLUSDATA = new FieldDescriptor_TYPE_STRING('C2S_LoginForPlatformMessage.agentPlusdata', 'agentPlusdata', (10 << 3) | 2));
      },
      'AGENTCOLDATAS',
      function () {
        return (this.AGENTCOLDATAS = new FieldDescriptor_TYPE_STRING('C2S_LoginForPlatformMessage.agentColdatas', 'agentColdatas', (11 << 3) | 2));
      },
      'ADREGTIME',
      function () {
        return (this.ADREGTIME = new FieldDescriptor_TYPE_STRING('C2S_LoginForPlatformMessage.adregtime', 'adregtime', (12 << 3) | 2));
      },
      'HFAGENT',
      function () {
        return (this.HFAGENT = new FieldDescriptor_TYPE_STRING('C2S_LoginForPlatformMessage.hfagent', 'hfagent', (13 << 3) | 2));
      },
      'AGENTAPPENDDATA',
      function () {
        return (this.AGENTAPPENDDATA = new FieldDescriptor_TYPE_STRING('C2S_LoginForPlatformMessage.agentAppendData', 'agentAppendData', (14 << 3) | 2));
      },
      'AGENTAPPENDSIGN',
      function () {
        return (this.AGENTAPPENDSIGN = new FieldDescriptor_TYPE_STRING('C2S_LoginForPlatformMessage.agentAppendSign', 'agentAppendSign', (15 << 3) | 2));
      }
    ]);
    return C2S_LoginForPlatformMessage;
  })(Message);

  // @@protoc_insertion_point(class_metadata)
  //class login.net.protobuf.C2S_LoginMessage extends netease.protobuf.Message
  var C2S_LoginMessage = (function (_super) {
    function C2S_LoginMessage() {
      this.name$field = null;
      this.password$field = null;
      this.webid$field = 0;
      this.hasField$0 = 0;
      this.serverId$field = 0;
      C2S_LoginMessage.__super.call(this);
    }

    __class(C2S_LoginMessage, 'login.net.protobuf.C2S_LoginMessage', _super);
    var __proto = C2S_LoginMessage.prototype;
    __proto.clearName = function () {
      this.name$field = null;
    };

    __proto.clearPassword = function () {
      this.password$field = null;
    };

    __proto.clearWebid = function () {
      this.hasField$0 &= 0xfffffffe;
      this.webid$field = new int();
    };

    __proto.clearServerId = function () {
      this.hasField$0 &= 0xfffffffd;
      this.serverId$field = new int();
    };

    /**
     *@private
     */
    __proto.writeToBuffer = function (output) {
      if (this.hasName) {
        WriteUtils.writeTag(output, 2, 1);
        WriteUtils.write_TYPE_STRING(output, this.name$field);
      }
      if (this.hasPassword) {
        WriteUtils.writeTag(output, 2, 2);
        WriteUtils.write_TYPE_STRING(output, this.password$field);
      }
      if (this.hasWebid) {
        WriteUtils.writeTag(output, 0, 3);
        WriteUtils.write_TYPE_INT32(output, this.webid$field);
      }
      if (this.hasServerId) {
        WriteUtils.writeTag(output, 0, 4);
        WriteUtils.write_TYPE_INT32(output, this.serverId$field);
      }
      if (false) {
      }
    };
    /**
     *@private
     */
    __proto.readFromSlice = function (input, bytesAfterSlice) {
      var name$count = 0;
      var password$count = 0;
      var webid$count = 0;
      var serverId$count = 0;
      while (input.bytesAvailable > bytesAfterSlice) {
        var tag = ReadUtils.read_TYPE_UINT32(input);
        switch (tag >> 3) {
          case 1:
            if (name$count != 0) {
              throw new Error('Bad data format: C2S_LoginMessage.name cannot be set twice.');
            }
            ++name$count;
            this.name = ReadUtils.read_TYPE_STRING(input);
            break;
          case 2:
            if (password$count != 0) {
              throw new Error('Bad data format: C2S_LoginMessage.password cannot be set twice.');
            }
            ++password$count;
            this.password = ReadUtils.read_TYPE_STRING(input);
            break;
          case 3:
            if (webid$count != 0) {
              throw new Error('Bad data format: C2S_LoginMessage.webid cannot be set twice.');
            }
            ++webid$count;
            this.webid = ReadUtils.read_TYPE_INT32(input);
            break;
          case 4:
            if (serverId$count != 0) {
              throw new Error('Bad data format: C2S_LoginMessage.serverId cannot be set twice.');
            }
            ++serverId$count;
            this.serverId = ReadUtils.read_TYPE_INT32(input);
            break;
          default:
            this.readUnknown(input, tag);
            break;
        }
      }
    };

    __getset(
      0,
      __proto,
      'password',
      function () {
        if (!this.hasPassword) {
          return '';
        }
        return this.password$field;
      },
      function (value) {
        this.password$field = value;
      }
    );

    __getset(0, __proto, 'hasName', function () {
      return this.name$field != null;
    });

    __getset(0, __proto, 'hasWebid', function () {
      return (this.hasField$0 & 0x1) != 0;
    });

    __getset(
      0,
      __proto,
      'name',
      function () {
        if (!this.hasName) {
          return '';
        }
        return this.name$field;
      },
      function (value) {
        this.name$field = value;
      }
    );

    __getset(0, __proto, 'hasPassword', function () {
      return this.password$field != null;
    });

    __getset(
      0,
      __proto,
      'webid',
      function () {
        if (!this.hasWebid) {
          return 0;
        }
        return this.webid$field;
      },
      function (value) {
        this.hasField$0 |= 0x1;
        this.webid$field = value;
      }
    );

    __getset(0, __proto, 'hasServerId', function () {
      return (this.hasField$0 & 0x2) != 0;
    });

    __getset(
      0,
      __proto,
      'serverId',
      function () {
        if (!this.hasServerId) {
          return 0;
        }
        return this.serverId$field;
      },
      function (value) {
        this.hasField$0 |= 0x2;
        this.serverId$field = value;
      }
    );

    __static(C2S_LoginMessage, [
      'NAME',
      function () {
        return (this.NAME = new FieldDescriptor_TYPE_STRING('C2S_LoginMessage.name', 'name', (1 << 3) | 2));
      },
      'PASSWORD',
      function () {
        return (this.PASSWORD = new FieldDescriptor_TYPE_STRING('C2S_LoginMessage.password', 'password', (2 << 3) | 2));
      },
      'WEBID',
      function () {
        return (this.WEBID = new FieldDescriptor_TYPE_INT32('C2S_LoginMessage.webid', 'webid', (3 << 3) | 0));
      },
      'SERVERID',
      function () {
        return (this.SERVERID = new FieldDescriptor_TYPE_INT32('C2S_LoginMessage.serverId', 'serverId', (4 << 3) | 0));
      }
    ]);
    return C2S_LoginMessage;
  })(Message);

  // @@protoc_insertion_point(class_metadata)
  //class login.net.protobuf.C2S_RandomNamesMessage extends netease.protobuf.Message
  var C2S_RandomNamesMessage = (function (_super) {
    function C2S_RandomNamesMessage() {
      this.sex$field = 0;
      this.hasField$0 = 0;
      C2S_RandomNamesMessage.__super.call(this);
    }

    __class(C2S_RandomNamesMessage, 'login.net.protobuf.C2S_RandomNamesMessage', _super);
    var __proto = C2S_RandomNamesMessage.prototype;
    __proto.clearSex = function () {
      this.hasField$0 &= 0xfffffffe;
      this.sex$field = new int();
    };

    /**
     *@private
     */
    __proto.writeToBuffer = function (output) {
      if (this.hasSex) {
        WriteUtils.writeTag(output, 0, 1);
        WriteUtils.write_TYPE_INT32(output, this.sex$field);
      }
      if (false) {
      }
    };
    /**
     *@private
     */
    __proto.readFromSlice = function (input, bytesAfterSlice) {
      var sex$count = 0;
      while (input.bytesAvailable > bytesAfterSlice) {
        var tag = ReadUtils.read_TYPE_UINT32(input);
        switch (tag >> 3) {
          case 1:
            if (sex$count != 0) {
              throw new Error('Bad data format: C2S_RandomNamesMessage.sex cannot be set twice.');
            }
            ++sex$count;
            this.sex = ReadUtils.read_TYPE_INT32(input);
            break;
          default:
            this.readUnknown(input, tag);
            break;
        }
      }
    };

    __getset(0, __proto, 'hasSex', function () {
      return (this.hasField$0 & 0x1) != 0;
    });

    __getset(
      0,
      __proto,
      'sex',
      function () {
        if (!this.hasSex) {
          return 0;
        }
        return this.sex$field;
      },
      function (value) {
        this.hasField$0 |= 0x1;
        this.sex$field = value;
      }
    );

    __static(C2S_RandomNamesMessage, [
      'SEX',
      function () {
        return (this.SEX = new FieldDescriptor_TYPE_INT32('C2S_RandomNamesMessage.sex', 'sex', (1 << 3) | 0));
      }
    ]);
    return C2S_RandomNamesMessage;
  })(Message);

  // @@protoc_insertion_point(class_metadata)
  //class login.net.protobuf.C2S_RegainCharacterMessage extends netease.protobuf.Message
  var C2S_RegainCharacterMessage = (function (_super) {
    function C2S_RegainCharacterMessage() {
      this.playerId$field = null;
      C2S_RegainCharacterMessage.__super.call(this);
    }

    __class(C2S_RegainCharacterMessage, 'login.net.protobuf.C2S_RegainCharacterMessage', _super);
    var __proto = C2S_RegainCharacterMessage.prototype;
    __proto.clearPlayerId = function () {
      this.playerId$field = null;
    };

    /**
     *@private
     */
    __proto.writeToBuffer = function (output) {
      if (this.hasPlayerId) {
        WriteUtils.writeTag(output, 0, 1);
        WriteUtils.write_TYPE_INT64(output, this.playerId$field);
      }
      if (false) {
      }
    };
    /**
     *@private
     */
    __proto.readFromSlice = function (input, bytesAfterSlice) {
      var playerId$count = 0;
      while (input.bytesAvailable > bytesAfterSlice) {
        var tag = ReadUtils.read_TYPE_UINT32(input);
        switch (tag >> 3) {
          case 1:
            if (playerId$count != 0) {
              throw new Error('Bad data format: C2S_RegainCharacterMessage.playerId cannot be set twice.');
            }
            ++playerId$count;
            this.playerId = ReadUtils.read_TYPE_INT64(input);
            break;
          default:
            this.readUnknown(input, tag);
            break;
        }
      }
    };

    __getset(0, __proto, 'hasPlayerId', function () {
      return this.playerId$field != null;
    });

    __getset(
      0,
      __proto,
      'playerId',
      function () {
        if (!this.hasPlayerId) {
          return new Int64(0, 0);
        }
        return this.playerId$field;
      },
      function (value) {
        this.playerId$field = value;
      }
    );

    __static(C2S_RegainCharacterMessage, [
      'PLAYERID',
      function () {
        return (this.PLAYERID = new FieldDescriptor_TYPE_INT64('C2S_RegainCharacterMessage.playerId', 'playerId', (1 << 3) | 0));
      }
    ]);
    return C2S_RegainCharacterMessage;
  })(Message);

  // @@protoc_insertion_point(class_metadata)
  //class login.net.protobuf.C2S_SelectCharacterMessage extends netease.protobuf.Message
  var C2S_SelectCharacterMessage = (function (_super) {
    function C2S_SelectCharacterMessage() {
      this.playerId$field = null;
      C2S_SelectCharacterMessage.__super.call(this);
    }

    __class(C2S_SelectCharacterMessage, 'login.net.protobuf.C2S_SelectCharacterMessage', _super);
    var __proto = C2S_SelectCharacterMessage.prototype;
    __proto.clearPlayerId = function () {
      this.playerId$field = null;
    };

    /**
     *@private
     */
    __proto.writeToBuffer = function (output) {
      if (this.hasPlayerId) {
        WriteUtils.writeTag(output, 0, 2);
        WriteUtils.write_TYPE_INT64(output, this.playerId$field);
      }
      if (false) {
      }
    };
    /**
     *@private
     */
    __proto.readFromSlice = function (input, bytesAfterSlice) {
      var playerId$count = 0;
      while (input.bytesAvailable > bytesAfterSlice) {
        var tag = ReadUtils.read_TYPE_UINT32(input);
        switch (tag >> 3) {
          case 2:
            if (playerId$count != 0) {
              throw new Error('Bad data format: C2S_SelectCharacterMessage.playerId cannot be set twice.');
            }
            ++playerId$count;
            this.playerId = ReadUtils.read_TYPE_INT64(input);
            break;
          default:
            this.readUnknown(input, tag);
            break;
        }
      }
    };

    __getset(0, __proto, 'hasPlayerId', function () {
      return this.playerId$field != null;
    });

    __getset(
      0,
      __proto,
      'playerId',
      function () {
        if (!this.hasPlayerId) {
          return new Int64(0, 0);
        }
        return this.playerId$field;
      },
      function (value) {
        this.playerId$field = value;
      }
    );

    __static(C2S_SelectCharacterMessage, [
      'PLAYERID',
      function () {
        return (this.PLAYERID = new FieldDescriptor_TYPE_INT64('C2S_SelectCharacterMessage.playerId', 'playerId', (2 << 3) | 0));
      }
    ]);
    return C2S_SelectCharacterMessage;
  })(Message);

  // @@protoc_insertion_point(class_metadata)
  //class login.net.protobuf.LoginRoleInfo extends netease.protobuf.Message
  var LoginRoleInfo = (function (_super) {
    function LoginRoleInfo() {
      this.playerId$field = null;
      this.job$field = 0;
      this.hasField$0 = 0;
      this.country$field = 0;
      this.icon$field = null;
      this.name$field = null;
      this.sex$field = 0;
      this.level$field = 0;
      this.isDelete$field = 0;
      this.deleteTime$field = 0;
      this.loginTime$field = 0;
      this.jingjieId$field = 0;
      LoginRoleInfo.__super.call(this);
    }

    __class(LoginRoleInfo, 'login.net.protobuf.LoginRoleInfo', _super);
    var __proto = LoginRoleInfo.prototype;
    __proto.clearPlayerId = function () {
      this.playerId$field = null;
    };

    __proto.clearJob = function () {
      this.hasField$0 &= 0xfffffffe;
      this.job$field = new int();
    };

    __proto.clearCountry = function () {
      this.hasField$0 &= 0xfffffffd;
      this.country$field = new int();
    };

    __proto.clearIcon = function () {
      this.icon$field = null;
    };

    __proto.clearName = function () {
      this.name$field = null;
    };

    __proto.clearSex = function () {
      this.hasField$0 &= 0xfffffffb;
      this.sex$field = new int();
    };

    __proto.clearLevel = function () {
      this.hasField$0 &= 0xfffffff7;
      this.level$field = new int();
    };

    __proto.clearIsDelete = function () {
      this.hasField$0 &= 0xffffffef;
      this.isDelete$field = new int();
    };

    __proto.clearDeleteTime = function () {
      this.hasField$0 &= 0xffffffdf;
      this.deleteTime$field = new int();
    };

    __proto.clearLoginTime = function () {
      this.hasField$0 &= 0xffffffbf;
      this.loginTime$field = new int();
    };

    __proto.clearJingjieId = function () {
      this.hasField$0 &= 0xffffff7f;
      this.jingjieId$field = new int();
    };

    /**
     *@private
     */
    __proto.writeToBuffer = function (output) {
      if (this.hasPlayerId) {
        WriteUtils.writeTag(output, 0, 1);
        WriteUtils.write_TYPE_INT64(output, this.playerId$field);
      }
      if (this.hasJob) {
        WriteUtils.writeTag(output, 0, 2);
        WriteUtils.write_TYPE_INT32(output, this.job$field);
      }
      if (this.hasCountry) {
        WriteUtils.writeTag(output, 0, 3);
        WriteUtils.write_TYPE_INT32(output, this.country$field);
      }
      if (this.hasIcon) {
        WriteUtils.writeTag(output, 2, 4);
        WriteUtils.write_TYPE_STRING(output, this.icon$field);
      }
      if (this.hasName) {
        WriteUtils.writeTag(output, 2, 5);
        WriteUtils.write_TYPE_STRING(output, this.name$field);
      }
      if (this.hasSex) {
        WriteUtils.writeTag(output, 0, 6);
        WriteUtils.write_TYPE_INT32(output, this.sex$field);
      }
      if (this.hasLevel) {
        WriteUtils.writeTag(output, 0, 7);
        WriteUtils.write_TYPE_INT32(output, this.level$field);
      }
      if (this.hasIsDelete) {
        WriteUtils.writeTag(output, 0, 8);
        WriteUtils.write_TYPE_INT32(output, this.isDelete$field);
      }
      if (this.hasDeleteTime) {
        WriteUtils.writeTag(output, 0, 9);
        WriteUtils.write_TYPE_INT32(output, this.deleteTime$field);
      }
      if (this.hasLoginTime) {
        WriteUtils.writeTag(output, 0, 10);
        WriteUtils.write_TYPE_INT32(output, this.loginTime$field);
      }
      if (this.hasJingjieId) {
        WriteUtils.writeTag(output, 0, 11);
        WriteUtils.write_TYPE_INT32(output, this.jingjieId$field);
      }
      if (false) {
      }
    };
    /**
     *@private
     */
    __proto.readFromSlice = function (input, bytesAfterSlice) {
      var playerId$count = 0;
      var job$count = 0;
      var country$count = 0;
      var icon$count = 0;
      var name$count = 0;
      var sex$count = 0;
      var level$count = 0;
      var isDelete$count = 0;
      var deleteTime$count = 0;
      var loginTime$count = 0;
      var jingjieId$count = 0;
      while (input.bytesAvailable > bytesAfterSlice) {
        var tag = ReadUtils.read_TYPE_UINT32(input);
        switch (tag >> 3) {
          case 1:
            if (playerId$count != 0) {
              throw new Error('Bad data format: LoginRoleInfo.playerId cannot be set twice.');
            }
            ++playerId$count;
            this.playerId = ReadUtils.read_TYPE_INT64(input);
            break;
          case 2:
            if (job$count != 0) {
              throw new Error('Bad data format: LoginRoleInfo.job cannot be set twice.');
            }
            ++job$count;
            this.job = ReadUtils.read_TYPE_INT32(input);
            break;
          case 3:
            if (country$count != 0) {
              throw new Error('Bad data format: LoginRoleInfo.country cannot be set twice.');
            }
            ++country$count;
            this.country = ReadUtils.read_TYPE_INT32(input);
            break;
          case 4:
            if (icon$count != 0) {
              throw new Error('Bad data format: LoginRoleInfo.icon cannot be set twice.');
            }
            ++icon$count;
            this.icon = ReadUtils.read_TYPE_STRING(input);
            break;
          case 5:
            if (name$count != 0) {
              throw new Error('Bad data format: LoginRoleInfo.name cannot be set twice.');
            }
            ++name$count;
            this.name = ReadUtils.read_TYPE_STRING(input);
            break;
          case 6:
            if (sex$count != 0) {
              throw new Error('Bad data format: LoginRoleInfo.sex cannot be set twice.');
            }
            ++sex$count;
            this.sex = ReadUtils.read_TYPE_INT32(input);
            break;
          case 7:
            if (level$count != 0) {
              throw new Error('Bad data format: LoginRoleInfo.level cannot be set twice.');
            }
            ++level$count;
            this.level = ReadUtils.read_TYPE_INT32(input);
            break;
          case 8:
            if (isDelete$count != 0) {
              throw new Error('Bad data format: LoginRoleInfo.isDelete cannot be set twice.');
            }
            ++isDelete$count;
            this.isDelete = ReadUtils.read_TYPE_INT32(input);
            break;
          case 9:
            if (deleteTime$count != 0) {
              throw new Error('Bad data format: LoginRoleInfo.deleteTime cannot be set twice.');
            }
            ++deleteTime$count;
            this.deleteTime = ReadUtils.read_TYPE_INT32(input);
            break;
          case 10:
            if (loginTime$count != 0) {
              throw new Error('Bad data format: LoginRoleInfo.loginTime cannot be set twice.');
            }
            ++loginTime$count;
            this.loginTime = ReadUtils.read_TYPE_INT32(input);
            break;
          case 11:
            if (jingjieId$count != 0) {
              throw new Error('Bad data format: LoginRoleInfo.jingjieId cannot be set twice.');
            }
            ++jingjieId$count;
            this.jingjieId = ReadUtils.read_TYPE_INT32(input);
            break;
          default:
            this.readUnknown(input, tag);
            break;
        }
      }
    };

    __getset(0, __proto, 'hasPlayerId', function () {
      return this.playerId$field != null;
    });

    __getset(
      0,
      __proto,
      'level',
      function () {
        if (!this.hasLevel) {
          return 0;
        }
        return this.level$field;
      },
      function (value) {
        this.hasField$0 |= 0x8;
        this.level$field = value;
      }
    );

    __getset(
      0,
      __proto,
      'playerId',
      function () {
        if (!this.hasPlayerId) {
          return new Int64(0, 0);
        }
        return this.playerId$field;
      },
      function (value) {
        this.playerId$field = value;
      }
    );

    __getset(0, __proto, 'hasIcon', function () {
      return this.icon$field != null;
    });

    __getset(0, __proto, 'hasJob', function () {
      return (this.hasField$0 & 0x1) != 0;
    });

    __getset(
      0,
      __proto,
      'jingjieId',
      function () {
        if (!this.hasJingjieId) {
          return 0;
        }
        return this.jingjieId$field;
      },
      function (value) {
        this.hasField$0 |= 0x80;
        this.jingjieId$field = value;
      }
    );

    __getset(
      0,
      __proto,
      'job',
      function () {
        if (!this.hasJob) {
          return 0;
        }
        return this.job$field;
      },
      function (value) {
        this.hasField$0 |= 0x1;
        this.job$field = value;
      }
    );

    __getset(0, __proto, 'hasCountry', function () {
      return (this.hasField$0 & 0x2) != 0;
    });

    __getset(
      0,
      __proto,
      'country',
      function () {
        if (!this.hasCountry) {
          return 0;
        }
        return this.country$field;
      },
      function (value) {
        this.hasField$0 |= 0x2;
        this.country$field = value;
      }
    );

    __getset(0, __proto, 'hasName', function () {
      return this.name$field != null;
    });

    __getset(
      0,
      __proto,
      'icon',
      function () {
        if (!this.hasIcon) {
          return '';
        }
        return this.icon$field;
      },
      function (value) {
        this.icon$field = value;
      }
    );

    __getset(
      0,
      __proto,
      'name',
      function () {
        if (!this.hasName) {
          return '';
        }
        return this.name$field;
      },
      function (value) {
        this.name$field = value;
      }
    );

    __getset(0, __proto, 'hasSex', function () {
      return (this.hasField$0 & 0x4) != 0;
    });

    __getset(
      0,
      __proto,
      'sex',
      function () {
        if (!this.hasSex) {
          return 0;
        }
        return this.sex$field;
      },
      function (value) {
        this.hasField$0 |= 0x4;
        this.sex$field = value;
      }
    );

    __getset(
      0,
      __proto,
      'loginTime',
      function () {
        if (!this.hasLoginTime) {
          return 0;
        }
        return this.loginTime$field;
      },
      function (value) {
        this.hasField$0 |= 0x40;
        this.loginTime$field = value;
      }
    );

    __getset(0, __proto, 'hasLevel', function () {
      return (this.hasField$0 & 0x8) != 0;
    });

    __getset(0, __proto, 'hasIsDelete', function () {
      return (this.hasField$0 & 0x10) != 0;
    });

    __getset(
      0,
      __proto,
      'isDelete',
      function () {
        if (!this.hasIsDelete) {
          return 0;
        }
        return this.isDelete$field;
      },
      function (value) {
        this.hasField$0 |= 0x10;
        this.isDelete$field = value;
      }
    );

    __getset(0, __proto, 'hasDeleteTime', function () {
      return (this.hasField$0 & 0x20) != 0;
    });

    __getset(
      0,
      __proto,
      'deleteTime',
      function () {
        if (!this.hasDeleteTime) {
          return 0;
        }
        return this.deleteTime$field;
      },
      function (value) {
        this.hasField$0 |= 0x20;
        this.deleteTime$field = value;
      }
    );

    __getset(0, __proto, 'hasLoginTime', function () {
      return (this.hasField$0 & 0x40) != 0;
    });

    __getset(0, __proto, 'hasJingjieId', function () {
      return (this.hasField$0 & 0x80) != 0;
    });

    __static(LoginRoleInfo, [
      'PLAYERID',
      function () {
        return (this.PLAYERID = new FieldDescriptor_TYPE_INT64('LoginRoleInfo.playerId', 'playerId', (1 << 3) | 0));
      },
      'JOB',
      function () {
        return (this.JOB = new FieldDescriptor_TYPE_INT32('LoginRoleInfo.job', 'job', (2 << 3) | 0));
      },
      'COUNTRY',
      function () {
        return (this.COUNTRY = new FieldDescriptor_TYPE_INT32('LoginRoleInfo.country', 'country', (3 << 3) | 0));
      },
      'ICON',
      function () {
        return (this.ICON = new FieldDescriptor_TYPE_STRING('LoginRoleInfo.icon', 'icon', (4 << 3) | 2));
      },
      'NAME',
      function () {
        return (this.NAME = new FieldDescriptor_TYPE_STRING('LoginRoleInfo.name', 'name', (5 << 3) | 2));
      },
      'SEX',
      function () {
        return (this.SEX = new FieldDescriptor_TYPE_INT32('LoginRoleInfo.sex', 'sex', (6 << 3) | 0));
      },
      'LEVEL',
      function () {
        return (this.LEVEL = new FieldDescriptor_TYPE_INT32('LoginRoleInfo.level', 'level', (7 << 3) | 0));
      },
      'ISDELETE',
      function () {
        return (this.ISDELETE = new FieldDescriptor_TYPE_INT32('LoginRoleInfo.isDelete', 'isDelete', (8 << 3) | 0));
      },
      'DELETETIME',
      function () {
        return (this.DELETETIME = new FieldDescriptor_TYPE_INT32('LoginRoleInfo.deleteTime', 'deleteTime', (9 << 3) | 0));
      },
      'LOGINTIME',
      function () {
        return (this.LOGINTIME = new FieldDescriptor_TYPE_INT32('LoginRoleInfo.loginTime', 'loginTime', (10 << 3) | 0));
      },
      'JINGJIEID',
      function () {
        return (this.JINGJIEID = new FieldDescriptor_TYPE_INT32('LoginRoleInfo.jingjieId', 'jingjieId', (11 << 3) | 0));
      }
    ]);
    return LoginRoleInfo;
  })(Message);

  // @@protoc_insertion_point(class_metadata)
  //class login.net.protobuf.ResVerParam extends netease.protobuf.Message
  var ResVerParam = (function (_super) {
    function ResVerParam() {
      this.res_type$field = 0;
      this.hasField$0 = 0;
      this.res_ver$field = 0;
      ResVerParam.__super.call(this);
    }

    __class(ResVerParam, 'login.net.protobuf.ResVerParam', _super);
    var __proto = ResVerParam.prototype;
    __proto.clearResType = function () {
      this.hasField$0 &= 0xfffffffe;
      this.res_type$field = new int();
    };

    __proto.clearResVer = function () {
      this.hasField$0 &= 0xfffffffd;
      this.res_ver$field = new int();
    };

    /**
     *@private
     */
    __proto.writeToBuffer = function (output) {
      if (this.hasResType) {
        WriteUtils.writeTag(output, 0, 1);
        WriteUtils.write_TYPE_INT32(output, this.res_type$field);
      }
      if (this.hasResVer) {
        WriteUtils.writeTag(output, 0, 2);
        WriteUtils.write_TYPE_INT32(output, this.res_ver$field);
      }
      if (false) {
      }
    };
    /**
     *@private
     */
    __proto.readFromSlice = function (input, bytesAfterSlice) {
      var res_type$count = 0;
      var res_ver$count = 0;
      while (input.bytesAvailable > bytesAfterSlice) {
        var tag = ReadUtils.read_TYPE_UINT32(input);
        switch (tag >> 3) {
          case 1:
            if (res_type$count != 0) {
              throw new Error('Bad data format: ResVerParam.resType cannot be set twice.');
            }
            ++res_type$count;
            this.resType = ReadUtils.read_TYPE_INT32(input);
            break;
          case 2:
            if (res_ver$count != 0) {
              throw new Error('Bad data format: ResVerParam.resVer cannot be set twice.');
            }
            ++res_ver$count;
            this.resVer = ReadUtils.read_TYPE_INT32(input);
            break;
          default:
            this.readUnknown(input, tag);
            break;
        }
      }
    };

    __getset(0, __proto, 'hasResType', function () {
      return (this.hasField$0 & 0x1) != 0;
    });

    __getset(
      0,
      __proto,
      'resType',
      function () {
        if (!this.hasResType) {
          return 0;
        }
        return this.res_type$field;
      },
      function (value) {
        this.hasField$0 |= 0x1;
        this.res_type$field = value;
      }
    );

    __getset(0, __proto, 'hasResVer', function () {
      return (this.hasField$0 & 0x2) != 0;
    });

    __getset(
      0,
      __proto,
      'resVer',
      function () {
        if (!this.hasResVer) {
          return 0;
        }
        return this.res_ver$field;
      },
      function (value) {
        this.hasField$0 |= 0x2;
        this.res_ver$field = value;
      }
    );

    __static(ResVerParam, [
      'RES_TYPE',
      function () {
        return (this.RES_TYPE = new FieldDescriptor_TYPE_INT32('ResVerParam.res_type', 'resType', (1 << 3) | 0));
      },
      'RES_VER',
      function () {
        return (this.RES_VER = new FieldDescriptor_TYPE_INT32('ResVerParam.res_ver', 'resVer', (2 << 3) | 0));
      }
    ]);
    return ResVerParam;
  })(Message);

  // @@protoc_insertion_point(class_metadata)
  //class login.net.protobuf.S2C_AccountLoginSuccessMessage extends netease.protobuf.Message
  var S2C_AccountLoginSuccessMessage = (function (_super) {
    function S2C_AccountLoginSuccessMessage() {
      this.errorCode$field = 0;
      this.hasField$0 = 0;
      this.serverStartTime$field = 0;
      this.serverOpenZoneTime$field = 0;
      this.serverCurTime$field = 0;
      this.serverVer$field = 0;
      this.roleCount$field = 0;
      this.msgVer$field = 0;
      this.isNewAccount$field = 0;
      this.allRoleCount$field = 0;
      this.buildOpenTime$field = 0;
      this.selectCharacter$field = 0;
      this.daysOfService$field = 0;
      //[ArrayElementType("ResVerParam")]
      this.resvers = [];
      S2C_AccountLoginSuccessMessage.__super.call(this);
    }

    __class(S2C_AccountLoginSuccessMessage, 'login.net.protobuf.S2C_AccountLoginSuccessMessage', _super);
    var __proto = S2C_AccountLoginSuccessMessage.prototype;
    __proto.clearErrorCode = function () {
      this.hasField$0 &= 0xfffffffe;
      this.errorCode$field = new int();
    };

    __proto.clearServerStartTime = function () {
      this.hasField$0 &= 0xfffffffd;
      this.serverStartTime$field = new int();
    };

    __proto.clearServerOpenZoneTime = function () {
      this.hasField$0 &= 0xfffffffb;
      this.serverOpenZoneTime$field = new int();
    };

    __proto.clearServerCurTime = function () {
      this.hasField$0 &= 0xfffffff7;
      this.serverCurTime$field = new int();
    };

    __proto.clearServerVer = function () {
      this.hasField$0 &= 0xffffffef;
      this.serverVer$field = new int();
    };

    __proto.clearRoleCount = function () {
      this.hasField$0 &= 0xffffffdf;
      this.roleCount$field = new int();
    };

    __proto.clearMsgVer = function () {
      this.hasField$0 &= 0xffffffbf;
      this.msgVer$field = new int();
    };

    __proto.clearIsNewAccount = function () {
      this.hasField$0 &= 0xffffff7f;
      this.isNewAccount$field = new int();
    };

    __proto.clearAllRoleCount = function () {
      this.hasField$0 &= 0xfffffeff;
      this.allRoleCount$field = new int();
    };

    __proto.clearBuildOpenTime = function () {
      this.hasField$0 &= 0xfffffdff;
      this.buildOpenTime$field = new int();
    };

    __proto.clearSelectCharacter = function () {
      this.hasField$0 &= 0xfffffbff;
      this.selectCharacter$field = new int();
    };

    __proto.clearDaysOfService = function () {
      this.hasField$0 &= 0xfffff7ff;
      this.daysOfService$field = new int();
    };

    /**
     *@private
     */
    __proto.writeToBuffer = function (output) {
      if (this.hasErrorCode) {
        WriteUtils.writeTag(output, 0, 1);
        WriteUtils.write_TYPE_INT32(output, this.errorCode$field);
      }
      if (this.hasServerStartTime) {
        WriteUtils.writeTag(output, 0, 2);
        WriteUtils.write_TYPE_INT32(output, this.serverStartTime$field);
      }
      if (this.hasServerOpenZoneTime) {
        WriteUtils.writeTag(output, 0, 3);
        WriteUtils.write_TYPE_INT32(output, this.serverOpenZoneTime$field);
      }
      if (this.hasServerCurTime) {
        WriteUtils.writeTag(output, 0, 4);
        WriteUtils.write_TYPE_INT32(output, this.serverCurTime$field);
      }
      if (this.hasServerVer) {
        WriteUtils.writeTag(output, 0, 5);
        WriteUtils.write_TYPE_INT32(output, this.serverVer$field);
      }
      if (this.hasRoleCount) {
        WriteUtils.writeTag(output, 0, 6);
        WriteUtils.write_TYPE_INT32(output, this.roleCount$field);
      }
      if (this.hasMsgVer) {
        WriteUtils.writeTag(output, 0, 7);
        WriteUtils.write_TYPE_INT32(output, this.msgVer$field);
      }
      if (this.hasIsNewAccount) {
        WriteUtils.writeTag(output, 0, 8);
        WriteUtils.write_TYPE_INT32(output, this.isNewAccount$field);
      }
      if (this.hasAllRoleCount) {
        WriteUtils.writeTag(output, 0, 9);
        WriteUtils.write_TYPE_INT32(output, this.allRoleCount$field);
      }
      if (this.hasBuildOpenTime) {
        WriteUtils.writeTag(output, 0, 10);
        WriteUtils.write_TYPE_INT32(output, this.buildOpenTime$field);
      }
      if (this.hasSelectCharacter) {
        WriteUtils.writeTag(output, 0, 11);
        WriteUtils.write_TYPE_INT32(output, this.selectCharacter$field);
      }
      if (this.hasDaysOfService) {
        WriteUtils.writeTag(output, 0, 12);
        WriteUtils.write_TYPE_INT32(output, this.daysOfService$field);
      }
      for (var resvers$index = 0; resvers$index < this.resvers.length; ++resvers$index) {
        WriteUtils.writeTag(output, 2, 20);
        WriteUtils.write_TYPE_MESSAGE(output, this.resvers[resvers$index]);
      }
      if (false) {
      }
    };
    /**
     *@private
     */
    __proto.readFromSlice = function (input, bytesAfterSlice) {
      var errorCode$count = 0;
      var serverStartTime$count = 0;
      var serverOpenZoneTime$count = 0;
      var serverCurTime$count = 0;
      var serverVer$count = 0;
      var roleCount$count = 0;
      var msgVer$count = 0;
      var isNewAccount$count = 0;
      var allRoleCount$count = 0;
      var buildOpenTime$count = 0;
      var selectCharacter$count = 0;
      var daysOfService$count = 0;
      while (input.bytesAvailable > bytesAfterSlice) {
        var tag = ReadUtils.read_TYPE_UINT32(input);
        switch (tag >> 3) {
          case 1:
            if (errorCode$count != 0) {
              throw new Error('Bad data format: S2C_AccountLoginSuccessMessage.errorCode cannot be set twice.');
            }
            ++errorCode$count;
            this.errorCode = ReadUtils.read_TYPE_INT32(input);
            break;
          case 2:
            if (serverStartTime$count != 0) {
              throw new Error('Bad data format: S2C_AccountLoginSuccessMessage.serverStartTime cannot be set twice.');
            }
            ++serverStartTime$count;
            this.serverStartTime = ReadUtils.read_TYPE_INT32(input);
            break;
          case 3:
            if (serverOpenZoneTime$count != 0) {
              throw new Error('Bad data format: S2C_AccountLoginSuccessMessage.serverOpenZoneTime cannot be set twice.');
            }
            ++serverOpenZoneTime$count;
            this.serverOpenZoneTime = ReadUtils.read_TYPE_INT32(input);
            break;
          case 4:
            if (serverCurTime$count != 0) {
              throw new Error('Bad data format: S2C_AccountLoginSuccessMessage.serverCurTime cannot be set twice.');
            }
            ++serverCurTime$count;
            this.serverCurTime = ReadUtils.read_TYPE_INT32(input);
            break;
          case 5:
            if (serverVer$count != 0) {
              throw new Error('Bad data format: S2C_AccountLoginSuccessMessage.serverVer cannot be set twice.');
            }
            ++serverVer$count;
            this.serverVer = ReadUtils.read_TYPE_INT32(input);
            break;
          case 6:
            if (roleCount$count != 0) {
              throw new Error('Bad data format: S2C_AccountLoginSuccessMessage.roleCount cannot be set twice.');
            }
            ++roleCount$count;
            this.roleCount = ReadUtils.read_TYPE_INT32(input);
            break;
          case 7:
            if (msgVer$count != 0) {
              throw new Error('Bad data format: S2C_AccountLoginSuccessMessage.msgVer cannot be set twice.');
            }
            ++msgVer$count;
            this.msgVer = ReadUtils.read_TYPE_INT32(input);
            break;
          case 8:
            if (isNewAccount$count != 0) {
              throw new Error('Bad data format: S2C_AccountLoginSuccessMessage.isNewAccount cannot be set twice.');
            }
            ++isNewAccount$count;
            this.isNewAccount = ReadUtils.read_TYPE_INT32(input);
            break;
          case 9:
            if (allRoleCount$count != 0) {
              throw new Error('Bad data format: S2C_AccountLoginSuccessMessage.allRoleCount cannot be set twice.');
            }
            ++allRoleCount$count;
            this.allRoleCount = ReadUtils.read_TYPE_INT32(input);
            break;
          case 10:
            if (buildOpenTime$count != 0) {
              throw new Error('Bad data format: S2C_AccountLoginSuccessMessage.buildOpenTime cannot be set twice.');
            }
            ++buildOpenTime$count;
            this.buildOpenTime = ReadUtils.read_TYPE_INT32(input);
            break;
          case 11:
            if (selectCharacter$count != 0) {
              throw new Error('Bad data format: S2C_AccountLoginSuccessMessage.selectCharacter cannot be set twice.');
            }
            ++selectCharacter$count;
            this.selectCharacter = ReadUtils.read_TYPE_INT32(input);
            break;
          case 12:
            if (daysOfService$count != 0) {
              throw new Error('Bad data format: S2C_AccountLoginSuccessMessage.daysOfService cannot be set twice.');
            }
            ++daysOfService$count;
            this.daysOfService = ReadUtils.read_TYPE_INT32(input);
            break;
          case 20:
            this.resvers.push(ReadUtils.read_TYPE_MESSAGE(input, new ResVerParam()));
            break;
          default:
            this.readUnknown(input, tag);
            break;
        }
      }
    };

    __getset(0, __proto, 'hasIsNewAccount', function () {
      return (this.hasField$0 & 0x80) != 0;
    });

    __getset(0, __proto, 'hasErrorCode', function () {
      return (this.hasField$0 & 0x1) != 0;
    });

    __getset(
      0,
      __proto,
      'selectCharacter',
      function () {
        if (!this.hasSelectCharacter) {
          return 0;
        }
        return this.selectCharacter$field;
      },
      function (value) {
        this.hasField$0 |= 0x400;
        this.selectCharacter$field = value;
      }
    );

    __getset(
      0,
      __proto,
      'errorCode',
      function () {
        if (!this.hasErrorCode) {
          return 0;
        }
        return this.errorCode$field;
      },
      function (value) {
        this.hasField$0 |= 0x1;
        this.errorCode$field = value;
      }
    );

    __getset(0, __proto, 'hasServerVer', function () {
      return (this.hasField$0 & 0x10) != 0;
    });

    __getset(
      0,
      __proto,
      'serverOpenZoneTime',
      function () {
        if (!this.hasServerOpenZoneTime) {
          return 0;
        }
        return this.serverOpenZoneTime$field;
      },
      function (value) {
        this.hasField$0 |= 0x4;
        this.serverOpenZoneTime$field = value;
      }
    );

    __getset(0, __proto, 'hasAllRoleCount', function () {
      return (this.hasField$0 & 0x100) != 0;
    });

    __getset(0, __proto, 'hasServerStartTime', function () {
      return (this.hasField$0 & 0x2) != 0;
    });

    __getset(0, __proto, 'hasServerCurTime', function () {
      return (this.hasField$0 & 0x8) != 0;
    });

    __getset(
      0,
      __proto,
      'serverStartTime',
      function () {
        if (!this.hasServerStartTime) {
          return 0;
        }
        return this.serverStartTime$field;
      },
      function (value) {
        this.hasField$0 |= 0x2;
        this.serverStartTime$field = value;
      }
    );

    __getset(0, __proto, 'hasServerOpenZoneTime', function () {
      return (this.hasField$0 & 0x4) != 0;
    });

    __getset(
      0,
      __proto,
      'serverCurTime',
      function () {
        if (!this.hasServerCurTime) {
          return 0;
        }
        return this.serverCurTime$field;
      },
      function (value) {
        this.hasField$0 |= 0x8;
        this.serverCurTime$field = value;
      }
    );

    __getset(
      0,
      __proto,
      'serverVer',
      function () {
        if (!this.hasServerVer) {
          return 0;
        }
        return this.serverVer$field;
      },
      function (value) {
        this.hasField$0 |= 0x10;
        this.serverVer$field = value;
      }
    );

    __getset(
      0,
      __proto,
      'buildOpenTime',
      function () {
        if (!this.hasBuildOpenTime) {
          return 0;
        }
        return this.buildOpenTime$field;
      },
      function (value) {
        this.hasField$0 |= 0x200;
        this.buildOpenTime$field = value;
      }
    );

    __getset(0, __proto, 'hasRoleCount', function () {
      return (this.hasField$0 & 0x20) != 0;
    });

    __getset(
      0,
      __proto,
      'roleCount',
      function () {
        if (!this.hasRoleCount) {
          return 0;
        }
        return this.roleCount$field;
      },
      function (value) {
        this.hasField$0 |= 0x20;
        this.roleCount$field = value;
      }
    );

    __getset(0, __proto, 'hasMsgVer', function () {
      return (this.hasField$0 & 0x40) != 0;
    });

    __getset(
      0,
      __proto,
      'msgVer',
      function () {
        if (!this.hasMsgVer) {
          return 0;
        }
        return this.msgVer$field;
      },
      function (value) {
        this.hasField$0 |= 0x40;
        this.msgVer$field = value;
      }
    );

    __getset(
      0,
      __proto,
      'isNewAccount',
      function () {
        if (!this.hasIsNewAccount) {
          return 0;
        }
        return this.isNewAccount$field;
      },
      function (value) {
        this.hasField$0 |= 0x80;
        this.isNewAccount$field = value;
      }
    );

    __getset(
      0,
      __proto,
      'allRoleCount',
      function () {
        if (!this.hasAllRoleCount) {
          return 0;
        }
        return this.allRoleCount$field;
      },
      function (value) {
        this.hasField$0 |= 0x100;
        this.allRoleCount$field = value;
      }
    );

    __getset(0, __proto, 'hasBuildOpenTime', function () {
      return (this.hasField$0 & 0x200) != 0;
    });

    __getset(0, __proto, 'hasSelectCharacter', function () {
      return (this.hasField$0 & 0x400) != 0;
    });

    __getset(0, __proto, 'hasDaysOfService', function () {
      return (this.hasField$0 & 0x800) != 0;
    });

    __getset(
      0,
      __proto,
      'daysOfService',
      function () {
        if (!this.hasDaysOfService) {
          return 0;
        }
        return this.daysOfService$field;
      },
      function (value) {
        this.hasField$0 |= 0x800;
        this.daysOfService$field = value;
      }
    );

    __static(S2C_AccountLoginSuccessMessage, [
      'ERRORCODE',
      function () {
        return (this.ERRORCODE = new FieldDescriptor_TYPE_INT32('S2C_AccountLoginSuccessMessage.errorCode', 'errorCode', (1 << 3) | 0));
      },
      'SERVERSTARTTIME',
      function () {
        return (this.SERVERSTARTTIME = new FieldDescriptor_TYPE_INT32('S2C_AccountLoginSuccessMessage.serverStartTime', 'serverStartTime', (2 << 3) | 0));
      },
      'SERVEROPENZONETIME',
      function () {
        return (this.SERVEROPENZONETIME = new FieldDescriptor_TYPE_INT32('S2C_AccountLoginSuccessMessage.serverOpenZoneTime', 'serverOpenZoneTime', (3 << 3) | 0));
      },
      'SERVERCURTIME',
      function () {
        return (this.SERVERCURTIME = new FieldDescriptor_TYPE_INT32('S2C_AccountLoginSuccessMessage.serverCurTime', 'serverCurTime', (4 << 3) | 0));
      },
      'SERVERVER',
      function () {
        return (this.SERVERVER = new FieldDescriptor_TYPE_INT32('S2C_AccountLoginSuccessMessage.serverVer', 'serverVer', (5 << 3) | 0));
      },
      'ROLECOUNT',
      function () {
        return (this.ROLECOUNT = new FieldDescriptor_TYPE_INT32('S2C_AccountLoginSuccessMessage.roleCount', 'roleCount', (6 << 3) | 0));
      },
      'MSGVER',
      function () {
        return (this.MSGVER = new FieldDescriptor_TYPE_INT32('S2C_AccountLoginSuccessMessage.msgVer', 'msgVer', (7 << 3) | 0));
      },
      'ISNEWACCOUNT',
      function () {
        return (this.ISNEWACCOUNT = new FieldDescriptor_TYPE_INT32('S2C_AccountLoginSuccessMessage.isNewAccount', 'isNewAccount', (8 << 3) | 0));
      },
      'ALLROLECOUNT',
      function () {
        return (this.ALLROLECOUNT = new FieldDescriptor_TYPE_INT32('S2C_AccountLoginSuccessMessage.allRoleCount', 'allRoleCount', (9 << 3) | 0));
      },
      'BUILDOPENTIME',
      function () {
        return (this.BUILDOPENTIME = new FieldDescriptor_TYPE_INT32('S2C_AccountLoginSuccessMessage.buildOpenTime', 'buildOpenTime', (10 << 3) | 0));
      },
      'SELECTCHARACTER',
      function () {
        return (this.SELECTCHARACTER = new FieldDescriptor_TYPE_INT32('S2C_AccountLoginSuccessMessage.selectCharacter', 'selectCharacter', (11 << 3) | 0));
      },
      'DAYSOFSERVICE',
      function () {
        return (this.DAYSOFSERVICE = new FieldDescriptor_TYPE_INT32('S2C_AccountLoginSuccessMessage.daysOfService', 'daysOfService', (12 << 3) | 0));
      },
      'RESVERS',
      function () {
        return (this.RESVERS = new RepeatedFieldDescriptor_TYPE_MESSAGE('S2C_AccountLoginSuccessMessage.resvers', 'resvers', (20 << 3) | 2, function () {
          return ResVerParam;
        }));
      }
    ]);
    return S2C_AccountLoginSuccessMessage;
  })(Message);

  // @@protoc_insertion_point(class_metadata)
  //class login.net.protobuf.S2C_ChangeLoginRoleInfoMessage extends netease.protobuf.Message
  var S2C_ChangeLoginRoleInfoMessage = (function (_super) {
    function S2C_ChangeLoginRoleInfoMessage() {
      this.userId$field = null;
      this.loginRoleInfo$field = null;
      S2C_ChangeLoginRoleInfoMessage.__super.call(this);
    }

    __class(S2C_ChangeLoginRoleInfoMessage, 'login.net.protobuf.S2C_ChangeLoginRoleInfoMessage', _super);
    var __proto = S2C_ChangeLoginRoleInfoMessage.prototype;
    __proto.clearUserId = function () {
      this.userId$field = null;
    };

    __proto.clearLoginRoleInfo = function () {
      this.loginRoleInfo$field = null;
    };

    /**
     *@private
     */
    __proto.writeToBuffer = function (output) {
      if (this.hasUserId) {
        WriteUtils.writeTag(output, 0, 1);
        WriteUtils.write_TYPE_INT64(output, this.userId$field);
      }
      if (this.hasLoginRoleInfo) {
        WriteUtils.writeTag(output, 2, 2);
        WriteUtils.write_TYPE_MESSAGE(output, this.loginRoleInfo$field);
      }
      if (false) {
      }
    };
    /**
     *@private
     */
    __proto.readFromSlice = function (input, bytesAfterSlice) {
      var userId$count = 0;
      var loginRoleInfo$count = 0;
      while (input.bytesAvailable > bytesAfterSlice) {
        var tag = ReadUtils.read_TYPE_UINT32(input);
        switch (tag >> 3) {
          case 1:
            if (userId$count != 0) {
              throw new Error('Bad data format: S2C_ChangeLoginRoleInfoMessage.userId cannot be set twice.');
            }
            ++userId$count;
            this.userId = ReadUtils.read_TYPE_INT64(input);
            break;
          case 2:
            if (loginRoleInfo$count != 0) {
              throw new Error('Bad data format: S2C_ChangeLoginRoleInfoMessage.loginRoleInfo cannot be set twice.');
            }
            ++loginRoleInfo$count;
            this.loginRoleInfo = new LoginRoleInfo();
            ReadUtils.read_TYPE_MESSAGE(input, this.loginRoleInfo);
            break;
          default:
            this.readUnknown(input, tag);
            break;
        }
      }
    };

    __getset(0, __proto, 'hasUserId', function () {
      return this.userId$field != null;
    });

    __getset(
      0,
      __proto,
      'userId',
      function () {
        if (!this.hasUserId) {
          return new Int64(0, 0);
        }
        return this.userId$field;
      },
      function (value) {
        this.userId$field = value;
      }
    );

    __getset(0, __proto, 'hasLoginRoleInfo', function () {
      return this.loginRoleInfo$field != null;
    });

    __getset(
      0,
      __proto,
      'loginRoleInfo',
      function () {
        return this.loginRoleInfo$field;
      },
      function (value) {
        this.loginRoleInfo$field = value;
      }
    );

    __static(S2C_ChangeLoginRoleInfoMessage, [
      'USERID',
      function () {
        return (this.USERID = new FieldDescriptor_TYPE_INT64('S2C_ChangeLoginRoleInfoMessage.userId', 'userId', (1 << 3) | 0));
      },
      'LOGINROLEINFO',
      function () {
        return (this.LOGINROLEINFO = new FieldDescriptor_TYPE_MESSAGE('S2C_ChangeLoginRoleInfoMessage.loginRoleInfo', 'loginRoleInfo', (2 << 3) | 2, function () {
          return LoginRoleInfo;
        }));
      }
    ]);
    return S2C_ChangeLoginRoleInfoMessage;
  })(Message);

  // @@protoc_insertion_point(class_metadata)
  //class login.net.protobuf.S2C_CharacterListMessage extends netease.protobuf.Message
  var S2C_CharacterListMessage = (function (_super) {
    function S2C_CharacterListMessage() {
      this.userId$field = null;
      //[ArrayElementType("LoginRoleInfo")]
      this.loginRoleInfos = [];
      this.codeType$field = 0;
      this.hasField$0 = 0;
      S2C_CharacterListMessage.__super.call(this);
    }

    __class(S2C_CharacterListMessage, 'login.net.protobuf.S2C_CharacterListMessage', _super);
    var __proto = S2C_CharacterListMessage.prototype;
    __proto.clearUserId = function () {
      this.userId$field = null;
    };

    __proto.clearCodeType = function () {
      this.hasField$0 &= 0xfffffffe;
      this.codeType$field = new int();
    };

    /**
     *@private
     */
    __proto.writeToBuffer = function (output) {
      if (this.hasUserId) {
        WriteUtils.writeTag(output, 0, 1);
        WriteUtils.write_TYPE_INT64(output, this.userId$field);
      }
      for (var loginRoleInfos$index = 0; loginRoleInfos$index < this.loginRoleInfos.length; ++loginRoleInfos$index) {
        WriteUtils.writeTag(output, 2, 2);
        WriteUtils.write_TYPE_MESSAGE(output, this.loginRoleInfos[loginRoleInfos$index]);
      }
      if (this.hasCodeType) {
        WriteUtils.writeTag(output, 0, 3);
        WriteUtils.write_TYPE_INT32(output, this.codeType$field);
      }
      if (false) {
      }
    };
    /**
     *@private
     */
    __proto.readFromSlice = function (input, bytesAfterSlice) {
      var userId$count = 0;
      var codeType$count = 0;
      while (input.bytesAvailable > bytesAfterSlice) {
        var tag = ReadUtils.read_TYPE_UINT32(input);
        switch (tag >> 3) {
          case 1:
            if (userId$count != 0) {
              throw new Error('Bad data format: S2C_CharacterListMessage.userId cannot be set twice.');
            }
            ++userId$count;
            this.userId = ReadUtils.read_TYPE_INT64(input);
            break;
          case 2:
            this.loginRoleInfos.push(ReadUtils.read_TYPE_MESSAGE(input, new LoginRoleInfo()));
            break;
          case 3:
            if (codeType$count != 0) {
              throw new Error('Bad data format: S2C_CharacterListMessage.codeType cannot be set twice.');
            }
            ++codeType$count;
            this.codeType = ReadUtils.read_TYPE_INT32(input);
            break;
          default:
            this.readUnknown(input, tag);
            break;
        }
      }
    };

    __getset(0, __proto, 'hasUserId', function () {
      return this.userId$field != null;
    });

    __getset(
      0,
      __proto,
      'userId',
      function () {
        if (!this.hasUserId) {
          return new Int64(0, 0);
        }
        return this.userId$field;
      },
      function (value) {
        this.userId$field = value;
      }
    );

    __getset(0, __proto, 'hasCodeType', function () {
      return (this.hasField$0 & 0x1) != 0;
    });

    __getset(
      0,
      __proto,
      'codeType',
      function () {
        if (!this.hasCodeType) {
          return 0;
        }
        return this.codeType$field;
      },
      function (value) {
        this.hasField$0 |= 0x1;
        this.codeType$field = value;
      }
    );

    __static(S2C_CharacterListMessage, [
      'USERID',
      function () {
        return (this.USERID = new FieldDescriptor_TYPE_INT64('S2C_CharacterListMessage.userId', 'userId', (1 << 3) | 0));
      },
      'LOGINROLEINFOS',
      function () {
        return (this.LOGINROLEINFOS = new RepeatedFieldDescriptor_TYPE_MESSAGE('S2C_CharacterListMessage.loginRoleInfos', 'loginRoleInfos', (2 << 3) | 2, function () {
          return LoginRoleInfo;
        }));
      },
      'CODETYPE',
      function () {
        return (this.CODETYPE = new FieldDescriptor_TYPE_INT32('S2C_CharacterListMessage.codeType', 'codeType', (3 << 3) | 0));
      }
    ]);
    return S2C_CharacterListMessage;
  })(Message);

  // @@protoc_insertion_point(class_metadata)
  //class login.net.protobuf.S2C_CreateCharacterMessage extends netease.protobuf.Message
  var S2C_CreateCharacterMessage = (function (_super) {
    function S2C_CreateCharacterMessage() {
      this.codeType$field = 0;
      this.hasField$0 = 0;
      S2C_CreateCharacterMessage.__super.call(this);
    }

    __class(S2C_CreateCharacterMessage, 'login.net.protobuf.S2C_CreateCharacterMessage', _super);
    var __proto = S2C_CreateCharacterMessage.prototype;
    __proto.clearCodeType = function () {
      this.hasField$0 &= 0xfffffffe;
      this.codeType$field = new int();
    };

    /**
     *@private
     */
    __proto.writeToBuffer = function (output) {
      if (this.hasCodeType) {
        WriteUtils.writeTag(output, 0, 1);
        WriteUtils.write_TYPE_INT32(output, this.codeType$field);
      }
      if (false) {
      }
    };
    /**
     *@private
     */
    __proto.readFromSlice = function (input, bytesAfterSlice) {
      var codeType$count = 0;
      while (input.bytesAvailable > bytesAfterSlice) {
        var tag = ReadUtils.read_TYPE_UINT32(input);
        switch (tag >> 3) {
          case 1:
            if (codeType$count != 0) {
              throw new Error('Bad data format: S2C_CreateCharacterMessage.codeType cannot be set twice.');
            }
            ++codeType$count;
            this.codeType = ReadUtils.read_TYPE_INT32(input);
            break;
          default:
            this.readUnknown(input, tag);
            break;
        }
      }
    };

    __getset(0, __proto, 'hasCodeType', function () {
      return (this.hasField$0 & 0x1) != 0;
    });

    __getset(
      0,
      __proto,
      'codeType',
      function () {
        if (!this.hasCodeType) {
          return 0;
        }
        return this.codeType$field;
      },
      function (value) {
        this.hasField$0 |= 0x1;
        this.codeType$field = value;
      }
    );

    __static(S2C_CreateCharacterMessage, [
      'CODETYPE',
      function () {
        return (this.CODETYPE = new FieldDescriptor_TYPE_INT32('S2C_CreateCharacterMessage.codeType', 'codeType', (1 << 3) | 0));
      }
    ]);
    return S2C_CreateCharacterMessage;
  })(Message);

  // @@protoc_insertion_point(class_metadata)
  //class login.net.protobuf.S2C_ErrorMessage extends netease.protobuf.Message
  var S2C_ErrorMessage = (function (_super) {
    function S2C_ErrorMessage() {
      this.errorcode$field = 0;
      this.hasField$0 = 0;
      this.msgid$field = 0;
      this.error_msg$field = null;
      //[ArrayElementType("String")]
      this.errorParam = [];
      S2C_ErrorMessage.__super.call(this);
    }

    __class(S2C_ErrorMessage, 'login.net.protobuf.S2C_ErrorMessage', _super);
    var __proto = S2C_ErrorMessage.prototype;
    __proto.clearErrorcode = function () {
      this.hasField$0 &= 0xfffffffe;
      this.errorcode$field = new int();
    };

    __proto.clearMsgid = function () {
      this.hasField$0 &= 0xfffffffd;
      this.msgid$field = new int();
    };

    __proto.clearErrorMsg = function () {
      this.error_msg$field = null;
    };

    /**
     *@private
     */
    __proto.writeToBuffer = function (output) {
      if (this.hasErrorcode) {
        WriteUtils.writeTag(output, 0, 1);
        WriteUtils.write_TYPE_INT32(output, this.errorcode$field);
      }
      if (this.hasMsgid) {
        WriteUtils.writeTag(output, 0, 2);
        WriteUtils.write_TYPE_INT32(output, this.msgid$field);
      }
      if (this.hasErrorMsg) {
        WriteUtils.writeTag(output, 2, 3);
        WriteUtils.write_TYPE_STRING(output, this.error_msg$field);
      }
      for (var errorParam$index = 0; errorParam$index < this.errorParam.length; ++errorParam$index) {
        WriteUtils.writeTag(output, 2, 4);
        WriteUtils.write_TYPE_STRING(output, this.errorParam[errorParam$index]);
      }
      if (false) {
      }
    };
    /**
     *@private
     */
    __proto.readFromSlice = function (input, bytesAfterSlice) {
      var errorcode$count = 0;
      var msgid$count = 0;
      var error_msg$count = 0;
      while (input.bytesAvailable > bytesAfterSlice) {
        var tag = ReadUtils.read_TYPE_UINT32(input);
        switch (tag >> 3) {
          case 1:
            if (errorcode$count != 0) {
              throw new Error('Bad data format: S2C_ErrorMessage.errorcode cannot be set twice.');
            }
            ++errorcode$count;
            this.errorcode = ReadUtils.read_TYPE_INT32(input);
            break;
          case 2:
            if (msgid$count != 0) {
              throw new Error('Bad data format: S2C_ErrorMessage.msgid cannot be set twice.');
            }
            ++msgid$count;
            this.msgid = ReadUtils.read_TYPE_INT32(input);
            break;
          case 3:
            if (error_msg$count != 0) {
              throw new Error('Bad data format: S2C_ErrorMessage.errorMsg cannot be set twice.');
            }
            ++error_msg$count;
            this.errorMsg = ReadUtils.read_TYPE_STRING(input);
            break;
          case 4:
            this.errorParam.push(ReadUtils.read_TYPE_STRING(input));
            break;
          default:
            this.readUnknown(input, tag);
            break;
        }
      }
    };

    __getset(0, __proto, 'hasErrorcode', function () {
      return (this.hasField$0 & 0x1) != 0;
    });

    __getset(
      0,
      __proto,
      'errorcode',
      function () {
        if (!this.hasErrorcode) {
          return 0;
        }
        return this.errorcode$field;
      },
      function (value) {
        this.hasField$0 |= 0x1;
        this.errorcode$field = value;
      }
    );

    __getset(0, __proto, 'hasMsgid', function () {
      return (this.hasField$0 & 0x2) != 0;
    });

    __getset(
      0,
      __proto,
      'msgid',
      function () {
        if (!this.hasMsgid) {
          return 0;
        }
        return this.msgid$field;
      },
      function (value) {
        this.hasField$0 |= 0x2;
        this.msgid$field = value;
      }
    );

    __getset(0, __proto, 'hasErrorMsg', function () {
      return this.error_msg$field != null;
    });

    __getset(
      0,
      __proto,
      'errorMsg',
      function () {
        if (!this.hasErrorMsg) {
          return '';
        }
        return this.error_msg$field;
      },
      function (value) {
        this.error_msg$field = value;
      }
    );

    __static(S2C_ErrorMessage, [
      'ERRORCODE',
      function () {
        return (this.ERRORCODE = new FieldDescriptor_TYPE_INT32('S2C_ErrorMessage.errorcode', 'errorcode', (1 << 3) | 0));
      },
      'MSGID',
      function () {
        return (this.MSGID = new FieldDescriptor_TYPE_INT32('S2C_ErrorMessage.msgid', 'msgid', (2 << 3) | 0));
      },
      'ERROR_MSG',
      function () {
        return (this.ERROR_MSG = new FieldDescriptor_TYPE_STRING('S2C_ErrorMessage.error_msg', 'errorMsg', (3 << 3) | 2));
      },
      'ERROR_PARAM',
      function () {
        return (this.ERROR_PARAM = new RepeatedFieldDescriptor_TYPE_STRING('S2C_ErrorMessage.error_param', 'errorParam', (4 << 3) | 2));
      }
    ]);
    return S2C_ErrorMessage;
  })(Message);

  // @@protoc_insertion_point(class_metadata)
  //class login.net.protobuf.S2C_PlayerEnterGameSuccessMessage extends netease.protobuf.Message
  var S2C_PlayerEnterGameSuccessMessage = (function (_super) {
    function S2C_PlayerEnterGameSuccessMessage() {
      this.mapId$field = 0;
      this.hasField$0 = 0;
      S2C_PlayerEnterGameSuccessMessage.__super.call(this);
    }

    __class(S2C_PlayerEnterGameSuccessMessage, 'login.net.protobuf.S2C_PlayerEnterGameSuccessMessage', _super);
    var __proto = S2C_PlayerEnterGameSuccessMessage.prototype;
    __proto.clearMapId = function () {
      this.hasField$0 &= 0xfffffffe;
      this.mapId$field = new int();
    };

    /**
     *@private
     */
    __proto.writeToBuffer = function (output) {
      if (this.hasMapId) {
        WriteUtils.writeTag(output, 0, 2);
        WriteUtils.write_TYPE_INT32(output, this.mapId$field);
      }
      if (false) {
      }
    };
    /**
     *@private
     */
    __proto.readFromSlice = function (input, bytesAfterSlice) {
      var mapId$count = 0;
      while (input.bytesAvailable > bytesAfterSlice) {
        var tag = ReadUtils.read_TYPE_UINT32(input);
        switch (tag >> 3) {
          case 2:
            if (mapId$count != 0) {
              throw new Error('Bad data format: S2C_PlayerEnterGameSuccessMessage.mapId cannot be set twice.');
            }
            ++mapId$count;
            this.mapId = ReadUtils.read_TYPE_INT32(input);
            break;
          default:
            this.readUnknown(input, tag);
            break;
        }
      }
    };

    __getset(0, __proto, 'hasMapId', function () {
      return (this.hasField$0 & 0x1) != 0;
    });

    __getset(
      0,
      __proto,
      'mapId',
      function () {
        if (!this.hasMapId) {
          return 0;
        }
        return this.mapId$field;
      },
      function (value) {
        this.hasField$0 |= 0x1;
        this.mapId$field = value;
      }
    );

    __static(S2C_PlayerEnterGameSuccessMessage, [
      'MAPID',
      function () {
        return (this.MAPID = new FieldDescriptor_TYPE_INT32('S2C_PlayerEnterGameSuccessMessage.mapId', 'mapId', (2 << 3) | 0));
      }
    ]);
    return S2C_PlayerEnterGameSuccessMessage;
  })(Message);

  // @@protoc_insertion_point(class_metadata)
  //class login.net.protobuf.S2C_RandomNamesMessage extends netease.protobuf.Message
  var S2C_RandomNamesMessage = (function (_super) {
    function S2C_RandomNamesMessage() {
      this.sex$field = 0;
      this.hasField$0 = 0;
      ////[ArrayElementType("String")]
      this.names = [];
      S2C_RandomNamesMessage.__super.call(this);
    }

    __class(S2C_RandomNamesMessage, 'login.net.protobuf.S2C_RandomNamesMessage', _super);
    var __proto = S2C_RandomNamesMessage.prototype;
    __proto.clearSex = function () {
      this.hasField$0 &= 0xfffffffe;
      this.sex$field = new int();
    };

    /**
     *@private
     */
    __proto.writeToBuffer = function (output) {
      if (this.hasSex) {
        WriteUtils.writeTag(output, 0, 1);
        WriteUtils.write_TYPE_INT32(output, this.sex$field);
      }
      for (var names$index = 0; names$index < this.names.length; ++names$index) {
        WriteUtils.writeTag(output, 2, 2);
        WriteUtils.write_TYPE_STRING(output, this.names[names$index]);
      }
      if (false) {
      }
    };
    /**
     *@private
     */
    __proto.readFromSlice = function (input, bytesAfterSlice) {
      var sex$count = 0;
      while (input.bytesAvailable > bytesAfterSlice) {
        var tag = ReadUtils.read_TYPE_UINT32(input);
        switch (tag >> 3) {
          case 1:
            if (sex$count != 0) {
              throw new Error('Bad data format: S2C_RandomNamesMessage.sex cannot be set twice.');
            }
            ++sex$count;
            this.sex = ReadUtils.read_TYPE_INT32(input);
            break;
          case 2:
            this.names.push(ReadUtils.read_TYPE_STRING(input));
            break;
          default:
            this.readUnknown(input, tag);
            break;
        }
      }
    };

    __getset(0, __proto, 'hasSex', function () {
      return (this.hasField$0 & 0x1) != 0;
    });

    __getset(
      0,
      __proto,
      'sex',
      function () {
        if (!this.hasSex) {
          return 0;
        }
        return this.sex$field;
      },
      function (value) {
        this.hasField$0 |= 0x1;
        this.sex$field = value;
      }
    );

    __static(S2C_RandomNamesMessage, [
      'SEX',
      function () {
        return (this.SEX = new FieldDescriptor_TYPE_INT32('S2C_RandomNamesMessage.sex', 'sex', (1 << 3) | 0));
      },
      'NAMES',
      function () {
        return (this.NAMES = new RepeatedFieldDescriptor_TYPE_STRING('S2C_RandomNamesMessage.names', 'names', (2 << 3) | 2));
      }
    ]);
    return S2C_RandomNamesMessage;
  })(Message);

  // @@protoc_insertion_point(class_metadata)
  //class login.net.protobuf.S2C_SubstituteMessage extends netease.protobuf.Message
  var S2C_SubstituteMessage = (function (_super) {
    function S2C_SubstituteMessage() {
      this.ip$field = null;
      S2C_SubstituteMessage.__super.call(this);
    }

    __class(S2C_SubstituteMessage, 'login.net.protobuf.S2C_SubstituteMessage', _super);
    var __proto = S2C_SubstituteMessage.prototype;
    __proto.clearIp = function () {
      this.ip$field = null;
    };

    /**
     *@private
     */
    __proto.writeToBuffer = function (output) {
      if (this.hasIp) {
        WriteUtils.writeTag(output, 2, 2);
        WriteUtils.write_TYPE_STRING(output, this.ip$field);
      }
      if (false) {
      }
    };
    /**
     *@private
     */
    __proto.readFromSlice = function (input, bytesAfterSlice) {
      var ip$count = 0;
      while (input.bytesAvailable > bytesAfterSlice) {
        var tag = ReadUtils.read_TYPE_UINT32(input);
        switch (tag >> 3) {
          case 2:
            if (ip$count != 0) {
              throw new Error('Bad data format: S2C_SubstituteMessage.ip cannot be set twice.');
            }
            ++ip$count;
            this.ip = ReadUtils.read_TYPE_STRING(input);
            break;
          default:
            this.readUnknown(input, tag);
            break;
        }
      }
    };

    __getset(0, __proto, 'hasIp', function () {
      return this.ip$field != null;
    });

    __getset(
      0,
      __proto,
      'ip',
      function () {
        if (!this.hasIp) {
          return '';
        }
        return this.ip$field;
      },
      function (value) {
        this.ip$field = value;
      }
    );

    __static(S2C_SubstituteMessage, [
      'IP',
      function () {
        return (this.IP = new FieldDescriptor_TYPE_STRING('S2C_SubstituteMessage.ip', 'ip', (2 << 3) | 2));
      }
    ]);
    return S2C_SubstituteMessage;
  })(Message);

  //class login.GameLogin extends laya.display.Sprite
  var GameLogin = (function (_super) {
    function GameLogin() {
      this.loginPanel = null;
      this.createPanel = null;
      // private var preLoader:PreLoaderView;
      this.isPreLoaderSuccess = false;
      this.isSocketSuccess = false;
      this.loginContainer = null;
      this.text = null;
      this._loginMessage = null;
      GameLogin.__super.call(this);
      this.on('added', this, this.onAddToStage);
    }

    __class(GameLogin, 'login.GameLogin', _super);
    var __proto = GameLogin.prototype;
    __proto.onAddToStage = function (e) {
      this.off('added', this, this.onAddToStage);
      GameConfig.mouseCursor = new MouseCursorStyle();
      this.stage.on('resize', this, this.onStageResize);
      EventMgr.add(this, 'login_error', this.onError);
      EventMgr.add(this, 'show_create_player', this.onShowCreatePlayer);
      EventMgr.add(this, 'show_pre_loader', this.onShowPreLoader);
      TagUtils.tagTrack('openSWF_2');
      this.loadPreLoader();
    };

    __proto.loadPreLoader = function () {
      this.isPreLoaderSuccess = true;
      this.initMouseStyle();
      this.initSocket();
    };

    __proto.initMouseStyle = function () {};
    __proto.initSocket = function () {
      var socket = new BaseConnection(new L_PreLoaderMessagePool());
      socket.lockMessageReslove = true;
      GameConfig.socket_bf = socket;
      GameConfig.socket = socket;
      this._loginMessage = new LoginMessage();
      this._loginMessage.initSocketError();
      if (!WebParams.ip || !WebParams.port || !WebParams.account || !WebParams.sign || !WebParams.zoneid) {
        this.loginPanel = new LoginPanel(GameHandler.create(this, this.onConnectSocket));
        this.addChild(this.loginPanel);
        LoadingPanel.ins.closeMe();
      } else {
        this.onConnectSocket();
      }
    };

    __proto.onConnectSocket = function () {
      GameConfig.socket.connect(WebParams.ip, WebParams.port, new Handler(this, this.onConnectSuccess));
    };

    // WebParams.setLoginWebLog("进行与服务器的SOCEKT连接,IP："+WebParams.ip+"，端口： "+WebParams.port);
    __proto.onConnectSuccess = function () {
      TagUtils.tagTrack('c_websocket_connected');
      this._loginMessage.clearSocketError();
      this.isSocketSuccess = true;
      if (this.loginPanel != null) {
        this.loginPanel.destroy();
      }
      if (this.loginContainer == null) {
        this.loginContainer = new LoginBackground();
        this.loginContainer.showLogo();
        this.addChild(this.loginContainer);
      }
      this.sendLoginMessage();
    };

    __proto.sendLoginMessage = function () {
      Config.loginTime = new Date().getTime();
      if (this.isSocketSuccess && this.isPreLoaderSuccess) {
        if (this.loginPanel != null) {
          LoginMessage.sendLoginMessage(WebParams.account, WebParams.sign, myparseInt(WebParams.zoneid));
        } else {
          LoginMessage.sendLoginForPlatformMessage();
        }
      }
    };

    // }
    __proto.onStageResize = function (e) {
      if (this.stage != null) {
        if (this.loginPanel != null) {
          this.loginPanel.resize();
        }
        if (this.loginContainer != null) {
          this.loginContainer.resize();
        }
        if (this.createPanel != null) {
          this.createPanel.resize();
        }
        if (this.text != null) {
          this.text.move((this.stage.stageWidth - this.text.width) >> 1, this.stage.stageHeight - 100);
        }
      }
    };

    __proto.onShowCreatePlayer = function () {
      if (this.createPanel == null) {
        TagUtils.tagTrack('inCreateRole_3');
        TagUtils.submitAndroid(2);
        switch (GameConfig.createRoleActionVersion) {
          case 3: {
            this.createPanel = new CreatePlayerPanel_v3();
            break;
          }
          case 2: {
            this.createPanel = new CreatePlayerPanel_v2();
            break;
          }
          default: {
            this.createPanel = new CreatePlayerPanel_v1();
            break;
          }
        }
      }
      this.loginContainer.showCreatePlayerBg();
      this.loginContainer.addChild(this.createPanel);
      LoadingPanel.ins.closeMe();
    };

    __proto.onShowPreLoader = function (show) {
      show === void 0 && (show = true);
      LoadingPanel.ins.startLoad();
      this.destroy();
    };

    __proto.onError = function (msg) {
      if (this.createPanel == null || this.createPanel.stage == null) {
        if (this.text == null) {
          this.text = new Label();
          this.text.width = 500;
          this.text.height = 50;
          this.text.fontSize = 16;
          this.text.color = '#ffff00';
          this.text.align = 'center';
          this.text.move((this.stage.stageWidth - this.text.width) >> 1, this.stage.stageHeight - 100, this);
        }
        this.text.text = msg;
      }
    };

    // WebParams.setLoginWebLog("LoginError, msg: "+msg);
    __proto.destroy = function (destroyChild) {
      destroyChild === void 0 && (destroyChild = true);
      if (this._destroyed) {
        return;
      }
      GameConfig.randomNameArr = null;
      this.stage.off('resize', this, this.onStageResize);
      EventMgr.remove(this, 'login_error', this.onError);
      EventMgr.remove(this, 'show_create_player', this.onShowCreatePlayer);
      EventMgr.remove(this, 'show_pre_loader', this.onShowPreLoader);
      this.loginPanel = null;
      this.createPanel = null;
      this.loginContainer = null;
      this.text = null;
      if (this._loginMessage != null) {
        this._loginMessage.dispose();
        this._loginMessage = null;
      }
      LoginRoleManager.ins.destory();
      _super.prototype.destroy.call(this);
    };

    return GameLogin;
  })(Sprite);

  /**
   *创角人物动作
   *@author zq
   *创建时间：2024年6月1日10:07:19
   */
  //class login.view.create.CreateRoleAnimation extends laya.display.Sprite
  var CreateRoleAnimation = (function (_super) {
    function CreateRoleAnimation(sex, job, version) {
      this._actionDic = {};
      this._urls = [];
      this._doCount = 0;
      this._version = 0;
      this._sex = 0;
      this._job = 0;
      this._animationCount = 4;
      //0、1为人物形象动画，2、3为技能动画
      this._loading = false;
      this._atkDelay = false;
      version === void 0 && (version = 1);
      CreateRoleAnimation.__super.call(this);
      this._version = version;
      this._sex = sex;
      this._job = job;
    }

    __class(CreateRoleAnimation, 'login.view.create.CreateRoleAnimation', _super);
    var __proto = CreateRoleAnimation.prototype;
    /**
     *播放动作
     */
    __proto.playAction = function (actionStr, timeStr, once) {
      this.traceLog('playAction - actionStr = ' + actionStr + ', timeStr = ' + timeStr + ', now = ' + getTimer());
      this.clearAction();
      this._loading = true;
      this._doCount = 0;
      for (var i = 0; i < this._animationCount; i++) {
        this.loadAction(i, actionStr, timeStr, once);
      }
    };

    __proto.stopAction = function () {
      if (this._actionDic == null) return;
      for (var i = 0; i < this._animationCount; i++) {
        var ani = this._actionDic[i];
        if (ani) {
          ani.stop();
          if (i != 0) {
            ani.removeSelf();
          }
        }
      }
    };

    __proto.clearAction = function () {
      if (this._actionDic == null) return;
      for (var i = 0; i < this._animationCount; i++) {
        var ani = this._actionDic[i];
        if (ani && i != 0) {
          ani.removeSelf();
        }
      }
    };

    __proto.loadAction = function (index, actionStr, timeStr, once) {
      var url = this.getProUrl(actionStr, index);
      if (!url) {
        this.traceLog('动作：' + actionStr + ', index:' + index + '没有对应动作资源');
        return;
      }
      if (this._actionDic == null) return;
      this._doCount++;
      var ani = this._actionDic[index];
      if (ani == null) {
        ani = new Animation();
        this._actionDic[index] = ani;
        if (index == 2 || index == 3) {
          ani.blendMode = 'add';
        }
        if (index == 0) {
          ani.on('complete', this, this.onBodyPlayOver);
        } else if (index == 2) {
          ani.on('complete', this, this.onSkillPlayOver);
        }
      }
      if (!ani.parent) {
        this.addChild(ani);
      }
      ani.loadAtlas(url, Handler.create(this, this.onActionLoaded, [actionStr, timeStr, once, index]));
      if (this._urls.indexOf(url) == -1) {
        this._urls.push(url);
      }
    };

    __proto.onActionLoaded = function (actionStr, timeStr, once, index) {
      this.traceLog('onActionLoaded - index = ' + index + ', actionStr = ' + actionStr + ', timeStr = ' + timeStr + ', now = ' + getTimer());
      this._doCount--;
      if (this._doCount == 0) {
        this._loading = false;
        if (this._atkDelay) {
          this._atkDelay = false;
          this.attack();
        } else {
          this.loadComplete(actionStr, timeStr, once);
        }
      }
    };

    __proto.loadComplete = function (actionStr, timeStr, once) {
      if (!GameConfig.createRoleActionFrames) {
        return;
      }
      if (this._actionDic == null) return;
      var t = GameConfig.createRoleActionFrames[timeStr];
      var frameCount = GameConfig.createRoleActionFrames[this.key][actionStr];
      for (var i = 0; i < this._animationCount; i++) {
        var ani = this._actionDic[i];
        if (ani && this.checkAni(actionStr, i)) {
          var aniName = this.getAniName(actionStr, i);
          ani.interval = t;
          if (once) {
            ani.loadImages(this.aniUrls(aniName, this._sex, this._job, frameCount)).play(0, false);
          } else {
            ani.loadImages(this.aniUrls(aniName, this._sex, this._job, frameCount)).play();
          }
        }
      }
    };

    __proto.onBodyPlayOver = function () {
      if (this._actionDic == null) return;
      var ani = this._actionDic[1];
      if (ani && !ani.isPlaying) {
        ani.removeSelf();
      }
      ani = this._actionDic[0];
      if (ani && !ani.isPlaying) {
        this.stand();
      }
    };

    __proto.onSkillPlayOver = function () {
      if (this._actionDic == null) return;
      var ani = this._actionDic[4];
      if (ani && !ani.isPlaying) {
        ani.removeSelf();
      }
      ani = this._actionDic[3];
      if (ani && !ani.isPlaying) {
        ani.removeSelf();
      }
    };

    __proto.stand = function () {
      this.playAction('std', 'stdtime', false);
    };

    __proto.attack = function () {
      if (this._loading) {
        this._atkDelay = true;
        return;
      }
      this.playAction('atk', 'atktime', true);
    };

    __proto.aniUrls = function (aniName, sex, job, length) {
      var url = [];
      for (var i = 0; i < length; i++) {
        url.push('' + sex + job + '/' + aniName + '/' + i + '.png');
      }
      return url;
    };

    __proto.getProUrl = function (actionName, index, atlas) {
      atlas === void 0 && (atlas = true);
      if (!this.checkAni(actionName, index)) {
        return '';
      }
      var aniName = this.getAniName(actionName, index);
      var suffix = atlas ? '.atlas' : '.png';
      var url = 'create/action' + this._version + '/' + this.key + '/' + aniName + suffix;
      return GameConfig.getProResPath(url);
    };

    __proto.getAniName = function (actionName, index) {
      if (index == 0) return actionName;
      if (index == 1) return actionName + 'down';
      if (index == 2) return actionName + 'skill';
      if (index == 3) return actionName + 'skill' + 'down';
      return '';
    };

    __proto.checkAni = function (actionName, index) {
      switch (this._version) {
        case 2: {
          if (actionName == 'std') {
            if (index == 1 || index == 3) {
              return false;
            }
          }
          break;
        }
        default: {
          if (index == 1 || index == 3) {
            return false;
          }
          if (actionName == 'std') {
            if (index > 0) {
              return false;
            }
          }
          break;
        }
      }
      return true;
    };

    __proto.traceLog = function (msg) {
      if (!GameConfig.isRelease) {
        msg = '版本version:' + this._version + ', sex:' + this._sex + ', job:' + this._job + ' --- ' + msg;
      }
    };

    // console.log(msg);
    __proto.destroy = function (destroyChild) {
      destroyChild === void 0 && (destroyChild = true);
      if (this._actionDic) {
        for (var k in this._actionDic) {
          var ani = this._actionDic[k];
          ani.off('complete', this, this.onBodyPlayOver);
          ani.off('complete', this, this.onSkillPlayOver);
          ani.destroy();
        }
        this._actionDic = null;
      }
      if (this._urls) {
        Laya.loader.cancelLoadByUrls(this._urls);
        for (var i = 0; i < this._urls.length; i++) {
          FLoader.clearRes(this._urls[i]);
        }
        this._urls = null;
      }
      _super.prototype.destroy.call(this, destroyChild);
    };

    __getset(0, __proto, 'key', function () {
      return '' + this._sex + this._job;
    });
    return CreateRoleAnimation;
  })(Sprite);

  /**
   *创角-人物动画基础单元
   *@author zq
   *创建时间：2024年5月8日11:08:55
   */
  //class login.view.create.CreateRoleUnit extends laya.display.Sprite
  var CreateRoleUnit = (function (_super) {
    function CreateRoleUnit(sex, job, $scale, unitSize, version) {
      this._role = null;
      this._sex = 0;
      this._job = 0;
      this._scale = NaN;
      this._sx = 0;
      this._sy = 0;
      this._unitSize = 0;
      this._roleContianer = null;
      $scale === void 0 && ($scale = 0.7);
      unitSize === void 0 && (unitSize = 900);
      version === void 0 && (version = 1);
      CreateRoleUnit.__super.call(this);
      this._sex = sex;
      this._job = job;
      this._scale = $scale;
      this._unitSize = unitSize;
      this.size(110, 240);
      this._role = new CreateRoleAnimation(sex, job, version);
      this.scaleRole($scale);
      this.addChild(this._role);
    }

    __class(CreateRoleUnit, 'login.view.create.CreateRoleUnit', _super);
    var __proto = CreateRoleUnit.prototype;
    // addMask(true);
    __proto.destroy = function (destroyChild) {
      destroyChild === void 0 && (destroyChild = true);
      this._roleContianer = null;
      if (this._role != null) {
        this._role.destroy();
        this._role = null;
      }
      _super.prototype.destroy.call(this, destroyChild);
    };

    __proto.initPosition = function (sx, sy, parent) {
      this._sx = sx;
      this._sy = sy;
      this._roleContianer = parent;
      this.move(sx, sy, parent);
    };

    __proto.scaleRole = function ($scale) {
      this._role.scale($scale, $scale);
      this._role.move((this.width - this._unitSize * $scale) / 2, (this.height - this._unitSize * $scale) / 2);
    };

    __proto.stand = function () {
      this._role.stand();
    };

    __proto.attack = function () {
      this._role.attack();
    };

    __proto.playSelect = function () {
      this._role.attack();
      this.scaleRole(1);
    };

    __proto.getKey = function () {
      return this._role.key;
    };

    __proto.reset = function () {
      this._role.stopAction();
      this._role.stand();
      this.scaleRole(this._scale);
      if (this._roleContianer) {
        this.move(this._sx, this._sy, this._roleContianer);
      }
    };

    __proto.addMask = function (value) {
      if (value) {
        this.filters = [new ColorFilter([0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0, 0, 0, 1, 0])];
      } else {
        this.filters = null;
      }
    };

    return CreateRoleUnit;
  })(Sprite);

  /**
   *登录模块的面板基类
   *@author 胡剑
   *创建时间：2021-3-8 下午9:01:58
   *
   */
  //class login.view.LoginBasePanel extends laya.display.Sprite
  var LoginBasePanel = (function (_super) {
    function LoginBasePanel(url, isLoadBg) {
      this._url = null;
      this._bg = null;
      this._loader = null;
      this._isLoadBg = false;
      isLoadBg === void 0 && (isLoadBg = true);
      LoginBasePanel.__super.call(this);
      this._url = url;
      this._isLoadBg = isLoadBg;
      this.on('added', this, this.onAddToStage);
    }

    __class(LoginBasePanel, 'login.view.LoginBasePanel', _super);
    var __proto = LoginBasePanel.prototype;
    __proto.onAddToStage = function (e) {
      this.off('added', this, this.onAddToStage);
      if (this._isLoadBg) {
        this._bg = new Image();
        this._bg.setURL(this, this.getBgPath(), this.bgToCenter);
        this.addChild(this._bg);
      }
      if (this._url) {
        this.showLoading();
        this._loader = new FLoader();
        this._loader.loaderType = 'atlas';
        this._loader.on('complete', this, this.onComplete);
        this._loader.load(this._url);
      } else {
        this.onComplete();
      }
    };

    __proto.getBgPath = function () {
      return GameConfig.getProResPath(GameConfig.loginResVersion + '/loginbg.jpg');
    };

    __proto.onComplete = function (e) {
      this._loader.off('complete', this, this.onComplete);
      this.removeLoading();
      this.init();
    };

    __proto.showLoading = function () {};
    __proto.removeLoading = function () {};
    __proto.init = function () {};
    __proto.bgToCenter = function () {
      if (this._bg != null && this.stage != null) {
        this._bg.x = (this.stage.stageWidth - this._bg.width) >> 1;
        this._bg.y = (this.stage.stageHeight - this._bg.height) >> 1;
        if (this._bg.y > 0) {
          this._bg.y = 0;
        }
      }
    };

    __proto.resize = function () {
      this.bgToCenter();
    };

    __proto.destroy = function (destroyChild) {
      destroyChild === void 0 && (destroyChild = true);
      if (this._destroyed) {
        return;
      }
      this.removeLoading();
      this._bg = null;
      if (this._loader != null) {
        this._loader.dispose();
        this._loader = null;
      }
      if (this._url) {
        FLoader.clearRes(this._url);
        this._url = null;
      }
      _super.prototype.destroy.call(this);
    };

    return LoginBasePanel;
  })(Sprite);

  /**
   *创角-选择职业
   *@author zq
   *创建时间：2024年5月8日11:08:55
   */
  //class login.view.create.v1.unit.CreateChooseJob extends laya.display.Sprite
  var CreateChooseJob = (function (_super) {
    function CreateChooseJob() {
      this._roleDict = {};
      this._selectRole = null;
      this._arrowEffect = null;
      this._sound = null;
      this._soundUrl = [];
      this._sex = 0;
      this._job = 0;
      this._sexTemp = 0;
      this._jobTemp = 0;
      this._stageImage = null;
      this._selectHandler = null;
      CreateChooseJob.__super.call(this);
      var stageWidth = GameConfig.SCREEN_WIDTH;
      var stageHeight = GameConfig.SCREEN_HEIGHT;
      this.size(stageWidth, stageHeight);
      var rx = Laya.stage.width >> 1;
      var ry = 0;
      var url;
      var scale = NaN;
      if (Browser.onPC) {
        url = 'mobile/CreatePanel1/bg_player_big.png';
        ry = stageHeight - 576 + 240;
        scale = 0.7;
      } else {
        url = 'mobile/CreatePanel1/bg_player_small.png';
        ry = Laya.stage.height - 440 + 240;
        scale = 0.5;
      }
      this._stageImage = new Image(url);
      this._stageImage.anchorX = 0.5;
      this._stageImage.move(rx, ry, this);
      var sexs = [1, 2, 1, 2, 1, 2];
      var jobs = [1, 1, 2, 2, 3, 3];
      var xs = [0.39, 0.66, 0.19, 0.76, 0.28, 0.61];
      var ys = [425, 225, 535, 505, 345, 455];
      if (!Browser.onPC) {
        ys = [200, 50, 300, 250, 150, 200];
      }
      for (var i = 0; i < 6; i++) {
        var px = Browser.onPC ? xs[i] * stageWidth - 55 : xs[i] * Laya.stage.width - 55;
        var py = ys[i];
        this.createRole(sexs[i], jobs[i], px >> 0, py, scale);
      }
    }

    __class(CreateChooseJob, 'login.view.create.v1.unit.CreateChooseJob', _super);
    var __proto = CreateChooseJob.prototype;
    __proto.destroy = function (destroyChild) {
      destroyChild === void 0 && (destroyChild = true);
      Laya.workerTimer.clear(this, this.onAutoSelect);
      if (this._sound) {
        this._sound.stop();
        this._sound = null;
      }
      if (this._soundUrl) {
        for (var i = 0; i < this._soundUrl.length; i++) {
          SoundManager.destroySound(GameConfig.getProResPath(this._soundUrl[i]));
        }
        this._soundUrl = null;
      }
      if (this._selectHandler) {
        this._selectHandler.dispose();
        this._selectHandler = null;
      }
      if (this._arrowEffect) {
        this._arrowEffect.destroy();
        this._arrowEffect = null;
      }
      if (this._roleDict != null) {
        for (var key in this._roleDict) {
          var r = this._roleDict[key];
          r.off('click', this, this.onClickRole);
          r.destroy();
          delete this._roleDict[key];
        }
        this._roleDict = null;
      }
      this._selectRole = null;
      this._stageImage = null;
      _super.prototype.destroy.call(this, destroyChild);
    };

    __proto.createRole = function (sex, job, px, py, scale) {
      scale === void 0 && (scale = 0.7);
      var role = new CreateRoleUnit(sex, job, scale);
      role.initPosition(px, py, this);
      role.on('click', this, this.onClickRole);
      role.stand();
      this._roleDict[role.getKey()] = role;
      return role;
    };

    __proto.getRoleUnit = function (sex, job) {
      var key = '' + sex + job;
      return this._roleDict[key];
    };

    /**
     *添加选中回调
     *@param selectHandler
     */
    __proto.addHandler = function (selectHandler) {
      this._selectHandler = selectHandler;
    };

    /**
     *默认显示随机
     */
    __proto.showRandomPlayer = function () {
      this._sex = ((Math.random() * 2) >> 0) + 1;
      this._job = ((Math.random() * 3) >> 0) + 1;
      this.selectJob(this._sex, this._job);
      this.doHandler();
      this._sexTemp = 1;
      this._jobTemp = ((Math.random() * 3) >> 0) + 1;
      while (this._sexTemp == this._sex && this._jobTemp == this._job) {
        this._jobTemp = ((Math.random() * 3) >> 0) + 1;
      }
      this.playArrowEffect(true, this._sexTemp, this._jobTemp);
    };

    __proto.selectJob = function (sex, job) {
      this._sex = sex;
      this._job = job;
      this.playArrowEffect(false);
      this.playRole();
      Laya.workerTimer.clear(this, this.onAutoSelect);
    };

    __proto.playRole = function () {
      var role = this.getRoleUnit(this._sex, this._job);
      if (role == null) {
        return;
      }
      if (this._selectRole != role) {
        if (this._selectRole) {
          this._selectRole.reset();
        }
        if (this._sound) {
          this._sound.stop();
        }
      }
      this._selectRole = role;
      this._selectRole.playSelect();
      this._selectRole.move((this._stageImage.width - this._selectRole.width) >> 1, -this._selectRole.height + (Browser.onPC ? 0 : -10), this._stageImage);
      var url = 'music/' + this._sex + this._job + GameConfig.SOUND;
      if (this._soundUrl.indexOf(url) == -1) {
        this._soundUrl.push(url);
      }
      this._sound = SoundManager.playSound(GameConfig.getProResPath(url));
    };

    __proto.doHandler = function () {
      if (this._selectHandler) {
        this._selectHandler.runWith([this._sex, this._job]);
      }
    };

    __proto.onClickRole = function (e) {
      var role = e.currentTarget;
      if (role == null) return;
      var sex = Number(role.getKey().charAt(0));
      var job = Number(role.getKey().charAt(1));
      if (sex == this._sex && this._job == job) return;
      this.selectJob(sex, job);
      this.doHandler();
    };

    __proto.reset = function () {
      this._sex = 0;
      this._job = 0;
      if (this._selectRole) {
        this._selectRole.reset();
        this._selectRole = null;
      }
      this.playArrowEffect(false);
    };

    __proto.playArrowEffect = function (value, sex, job) {
      sex === void 0 && (sex = 0);
      job === void 0 && (job = 0);
      if (value) {
        var role = this.getRoleUnit(sex, job);
        if (role) {
          if (!this._arrowEffect) {
            this._arrowEffect = new Animation();
            this._arrowEffect.source = GameConfig.getProResPath('create/SelectRoleArrow.ani');
          }
          this._arrowEffect.play();
          this._arrowEffect.move((role.width - 112) / 2, Browser.onPC ? -100 : -50, role);
        }
      } else {
        if (this._arrowEffect) {
          this._arrowEffect.stop();
          this._arrowEffect.removeSelf();
        }
      }
    };

    /**
     *随机推荐角色
     */
    __proto.randomRecommendRole = function () {
      this._sex = ((Math.random() * 2) >> 0) + 1;
      this._job = ((Math.random() * 3) >> 0) + 1;
      var role = this.getRoleUnit(this._sex, this._job);
      if (role) {
        role.attack();
        this.playArrowEffect(true, this._sex, this._job);
      }
      Laya.workerTimer.once(5000, this, this.onAutoSelect);
    };

    __proto.onAutoSelect = function () {
      this.selectJob(this._sex, this._job);
      this.doHandler();
    };

    __proto.resize = function () {
      if (Browser.onPC) {
        CreatePlayerUtils.resizeByMinScale(this);
      } else {
        this.move(0, 0);
      }
    };

    return CreateChooseJob;
  })(Sprite);

  /**
   *创角-选择角色
   *@author zq
   *创建时间：2024年5月8日10:12:53
   */
  //class login.view.create.v1.unit.CreateChooseRole extends laya.display.Sprite
  var CreateChooseRole = (function (_super) {
    function CreateChooseRole() {
      /**
       *15秒后进入游戏
       */
      this.COUNT_DWON_TIME = 15;
      /**
       *无操作后5秒进入倒计时
       */
      this.RECOVER_TIME = 5;
      this._selectRole = null;
      this._itemList = [];
      this._time_txt = null;
      this._time_box = null;
      this._time = 0;
      this._first = true;
      CreateChooseRole.__super.call(this);
      this.size(GameConfig.SCREEN_WIDTH, GameConfig.SCREEN_HEIGHT);
      for (var i = 0; i < 2; i++) {
        var item = new CreateChooseRoleItem();
        item.on('click', this, this.onClick);
        this._itemList.push(item);
      }
      this.addEvent('LoginEvent.PLAYER_CHANGE', this.showRoleList);
      Laya.stage.on('mousedown', this, this.onStageMouseDown);
    }

    __class(CreateChooseRole, 'login.view.create.v1.unit.CreateChooseRole', _super);
    var __proto = CreateChooseRole.prototype;
    __proto.destroy = function (destroyChild) {
      destroyChild === void 0 && (destroyChild = true);
      EventMgr.removeAll(this);
      Laya.workerTimer.clear(this, this.onTimer);
      this._selectRole = null;
      if (this._itemList != null) {
        for (var i = 0; i < this._itemList; i++) {
          var item = new CreateChooseRoleItem();
          item.off('click', this, this.onClick);
          item.destroy();
        }
        this._itemList = null;
      }
      this._time_txt = null;
      this._time_box = null;
      _super.prototype.destroy.call(this, destroyChild);
    };

    /**
     *显示列表
     */
    __proto.showRoleList = function () {
      var roles = LoginRoleManager.ins.getRoleList();
      if (roles == null || roles.length == 0) return;
      var selectRole;
      if (this._first) {
        this._first = false;
        selectRole = this.getSelectRole(roles);
      }
      var w = Laya.stage.width;
      var xs = [0.3 * w - 110 / 2, w * 0.7 - 110 / 2];
      var cx = (w - 110) / 2;
      var ry = 0;
      if (Browser.onPC) {
        ry = this.height - 576;
      } else {
        ry = Laya.stage.height - 440;
      }
      for (var i = 0; i < this._itemList.length; i++) {
        var item = this._itemList[i];
        if (i < roles.length) {
          var role = roles[i];
          item.setData(role);
          if (selectRole) {
            if (role.id == selectRole.id) {
              item.selectRole(true);
              this._selectRole = item;
              LoginRoleManager.ins.selectRole = role;
            } else {
              item.selectRole(false);
            }
          }
          if (roles.length == 1) {
            item.move(cx, ry, this);
          } else {
            item.move(xs[i], ry, this);
          }
        } else {
          item.remove();
        }
      }
    };

    __proto.setTime_txt = function (time_box, time_txt) {
      this._time_box = time_box;
      this._time_txt = time_txt;
      time_box.visible = false;
    };

    __proto.getSelectRole = function (roles) {
      var tmpData;
      for (var i = 0; i < roles.length; i++) {
        var data = roles[i];
        if (data.isDel == 2) {
          continue;
        }
        if (data.isDel == 1 && data.deltime <= 0) {
          continue;
        }
        if (tmpData == null) {
          tmpData = data;
        } else if (tmpData.logintime < data.logintime) {
          tmpData = data;
        }
      }
      return tmpData;
    };

    __proto.onClick = function (e) {
      var item = e.currentTarget;
      if (this._selectRole && this._selectRole != item) {
        this._selectRole.selectRole(false);
      }
      this._selectRole = item;
      item.selectRole(true);
      LoginRoleManager.ins.selectRole = item.getData();
    };

    __proto.onTimer = function () {
      this._time--;
      if (this._time <= this.COUNT_DWON_TIME) {
        if (this._time_box) {
          this._time_box.visible = true;
        }
        if (this._time_txt) {
          this._time_txt.text = '游戏将在' + this._time + 's后自动为您开始游戏';
        }
      }
      if (this._time <= 0) {
        Laya.workerTimer.clear(this, this.onTimer);
        if (this._time_box) {
          this._time_box.visible = false;
        }
        EventMgr.dispatch('CreatePlayerEvent.GAME_BEGIN');
      }
    };

    __proto.reset = function () {
      this.timeClear();
      Laya.workerTimer.loop(1000, this, this.onTimer);
      this._first = true;
    };

    __proto.clear = function () {
      this.timeClear();
      Laya.workerTimer.clear(this, this.onTimer);
    };

    __proto.timeClear = function () {
      this._time = this.COUNT_DWON_TIME + this.RECOVER_TIME;
      if (this._time_box) {
        this._time_box.visible = false;
      }
    };

    __proto.onStageMouseDown = function (e) {
      this.timeClear();
    };

    __proto.resize = function () {
      if (Browser.onPC) {
        CreatePlayerUtils.resizeByMinScale(this);
      } else {
        this.move(0, 0);
      }
    };

    return CreateChooseRole;
  })(Sprite);

  /**
   *背景图加载
   *@author 胡剑
   *创建时间：2021-3-8 下午9:30:14
   *
   */
  //class login.view.LoginBackground extends laya.display.Sprite
  var LoginBackground = (function (_super) {
    // private var _label:Label;
    function LoginBackground() {
      LoginBackground.__super.call(this);
    }

    __class(LoginBackground, 'login.view.LoginBackground', _super);
    var __proto = LoginBackground.prototype;
    /**
     *进入游戏时显示logo和健康游戏忠告
     *
     */
    __proto.showLogo = function () {};
    // _image.setURL(this,GameConfig.getProResPath("logo/big_hqg.png"),onComplete);
    __proto.showCreatePlayerBg = function () {};
    // }
    __proto.resize = function () {};
    // }
    __proto.removeLabel = function () {};
    // }
    __proto.removeImage = function () {};
    return LoginBackground;
  })(Sprite);

  /**
   *本地输入帐号的登录界面
   *@author 胡剑
   *创建时间：2015-12-8 下午3:43:37
   *
   */
  //class login.view.LoginPanel extends laya.display.Sprite
  var LoginPanel = (function (_super) {
    var L_Sprite;
    function LoginPanel($callback) {
      this._currentSelect = null;
      this._txt = null;
      this._txt2 = null;
      this._txt3 = null;
      this.container = null;
      this.container1 = null;
      this.ipTxt = null;
      this.portTxt = null;
      this.passwordTxt = null;
      this.userNameTxt = null;
      this.zoneIdTxt = null;
      this.txt1 = null;
      this.txt2 = null;
      this.txt3 = null;
      this.txt4 = null;
      this.txt5 = null;
      this.callback = null;
      this.txtTabArr = null;
      this.so = null;
      this._url = null;
      this.loginBtn = null;
      this.pcBtn = null;
      this.mobiBtn = null;
      this.font1Btn = null;
      this.font2Btn = null;
      this.font3Btn = null;
      this.strokeBtn = null;
      this.frameTxt = null;
      this.frameBtn = null;
      this.screenTxt = null;
      this.screenBtn = null;
      this.isHideLogin = false;
      this._selectBtn = null;
      LoginPanel.__super.call(this);
      this._listBtn = [];
      this.isHideLogin = myparseInt(WebParams.param['isHideLogin']) > 0;
      GameConfig.isLoginPanel = true;
      this.init();
      this.callback = $callback;
      this.on('display', this, this.onAddToStage);
    }

    __class(LoginPanel, 'login.view.LoginPanel', _super);
    var __proto = LoginPanel.prototype;
    __proto.init = function () {
      this.container = new Sprite();
      this.addChild(this.container);
      this.container.size(600, 400);
      this.container1 = new Sprite();
      this.addChild(this.container1);
      this.container1.size(1100, 166);
      LoginPanel.createText(this.container, 0, 2, '#ffffff', 50, 30, '区服：');
      LoginPanel.createText(this.container, 0, 134, '#ffffff', 50, 30, '帐号：');
      if (!this.isHideLogin) {
        LoginPanel.createText(this.container, 0, 46, '#ffffff', 50, 30, 'IP：');
        LoginPanel.createText(this.container, 0, 90, '#ffffff', 50, 30, '端口：');
        LoginPanel.createText(this.container, 0, 178, '#ffffff', 50, 30, '密码：');
      }
      this.zoneIdTxt = LoginPanel.createInput(this.container, 55, 0, 0xffffff, 200, 30, '1', true);
      this.ipTxt = LoginPanel.createInput(this.container, 55, 44, 0xffffff, 200, 30, '', true);
      this.portTxt = LoginPanel.createInput(this.container, 55, 88, 0xffffff, 200, 30, '', true);
      this.userNameTxt = LoginPanel.createInput(this.container, 55, 132, 0xffffff, 200, 30, '', true);
      this.passwordTxt = LoginPanel.createInput(this.container, 55, 176, 0xffffff, 200, 30, '', true);
      this.passwordTxt.type = 'password';
      this.txtTabArr = [this.zoneIdTxt, this.ipTxt, this.portTxt, this.userNameTxt, this.passwordTxt];
      this.txt1 = LoginPanel.createText(this.container, 270, 46, '#66ccff', 120, 30, '请输入ip');
      this.txt2 = LoginPanel.createText(this.container, 270, 90, '#66ccff', 120, 30, '请输入端口');
      this.txt3 = LoginPanel.createText(this.container, 270, 134, '#66ccff', 120, 30, '请输入帐号');
      this.txt4 = LoginPanel.createText(this.container, 270, 178, '#66ccff', 120, 30, '请输入密码');
      this.txt1.visible = false;
      this.txt2.visible = false;
      this.txt3.visible = false;
      this.txt4.visible = false;
      this.txt5 = new Label();
      this.txt5.font = 'SimSun';
      this.txt5.color = '#ffffff';
      this.txt5.fontSize = 20;
      this.txt5.width = 400;
      this.txt5.leading = 3;
      this.txt5.bold = true;
      this.txt5.wordWrap = true;
      this.txt5.text = '抵制不良游戏，拒绝盗版游戏。\n注意自我爱护，谨防受骗上当。\n适度游戏益脑，沉迷游戏伤身。\n合理安排时间，享受健康生活。';
      this.txt5.move(0, 300, this.container);
      this.loginBtn = new L_Sprite(100, 30);
      this.loginBtn.move(106, 243, this.container);
      this.loginBtn.selected = false;
      this.loginBtn.label = '登录';
      this._txt = LoginPanel.createInput(this, this.container.x + this.container.width + 300, this.container.y + 200, 0xff0000, 900, 410, '');
      this._txt.borderColor = '#FFFFFF';
      this._txt.wordWrap = true;
      this._txt.multiline = true;
      this._txt.align = 'left';
      this._txt.valign = 'top';
      this._txt2 = LoginPanel.createText(this, 0, 0, '#66ccff', 300, 40, '曾经登录过的用户名');
      this._txt2.align = 'left';
      this._txt3 = LoginPanel.createText(this, 0, 0, '#66ccff', 1200, 40, '区服\t\tIP\t\t\t\t端口\t\t账号\t\t');
      this._txt3.align = 'left';
      this.container1.visible = !this.isHideLogin;
      this._txt.visible = !this.isHideLogin;
      this._txt2.visible = !this.isHideLogin;
      this._txt3.visible = !this.isHideLogin;
      this.ipTxt.visible = !this.isHideLogin;
      this.portTxt.visible = !this.isHideLogin;
      this.passwordTxt.visible = !this.isHideLogin;
    };

    __proto.onAddToStage = function (e) {
      this.off('display', this, this.onAddToStage);
      this._url = GameConfig.TXT_PATH + 'ip.txt';
      Laya.loader.load(this._url, GameHandler.create(this, this.onLoaded), null, 'json');
    };

    __proto.onLoaded = function (e) {
      var xml = Laya.loader.getRes(this._url);
      var txt;
      var btn;
      for (var i = 0; i < xml.length; i++) {
        btn = new L_Sprite(200, 30);
        btn.id = xml[i]['id'];
        btn.ip = xml[i]['ip'];
        btn.port = xml[i]['port'];
        btn.selected = false;
        btn.label = xml[i]['name'] + '(' + xml[i]['ip'] + ')';
        btn.on('click', this, this.onClick);
        btn.move((i % 5) * (btn.width + 5), myparseInt(i / 5) * 32, this.container1);
        this._listBtn.push(btn);
      }
      this.pcBtn = new L_Sprite(100, 30);
      this.pcBtn.label = '电脑端';
      this.pcBtn.on('click', this, this.onClick2);
      this.pcBtn.move(420, 115, this.container1);
      this.mobiBtn = new L_Sprite(100, 30);
      this.mobiBtn.label = '移动端';
      this.mobiBtn.on('click', this, this.onClick2);
      this.mobiBtn.move(420, 150, this.container1);
      this.font1Btn = new L_Sprite(100, 30);
      this.font1Btn.label = '思源黑体';
      this.font1Btn.on('click', this, this.onClick2);
      this.font1Btn.move(420, 250, this.container1);
      this.font2Btn = new L_Sprite(100, 30);
      this.font2Btn.label = '宋体';
      this.font2Btn.on('click', this, this.onClick2);
      this.font2Btn.move(420, 282, this.container1);
      this.font3Btn = new L_Sprite(100, 30);
      this.font3Btn.label = '黑体';
      this.font3Btn.on('click', this, this.onClick2);
      this.font3Btn.move(420, 314, this.container1);
      this.strokeBtn = new L_Sprite(100, 30);
      this.strokeBtn.label = '去除描边';
      this.strokeBtn.on('click', this, this.onClick2);
      this.strokeBtn.move(420, 400, this.container1);
      this.strokeBtn.selected = parseInt(Browser.window.localStorage.getItem('noStroke')) == 1;
      this.frameTxt = LoginPanel.createInput(this.container1, 530, this.pcBtn.y, 0xffffff, 200, 30, '', true);
      this.frameBtn = new L_Sprite(100, 30);
      this.frameBtn.selected = false;
      this.frameBtn.label = '刷新帧率';
      this.frameBtn.on('click', this, this.onClick2);
      this.frameBtn.move(this.frameTxt.x + 210, this.frameTxt.y, this.container1);
      this.screenTxt = LoginPanel.createInput(this.container1, 530, this.mobiBtn.y, 0xffffff, 200, 30, '', true);
      this.screenBtn = new L_Sprite(100, 30);
      this.screenBtn.selected = false;
      this.screenBtn.label = '刷新分辨率';
      this.screenBtn.on('click', this, this.onClick2);
      this.screenBtn.move(this.screenTxt.x + 210, this.screenTxt.y, this.container1);
      this.resize();
      this.loginBtn.on('click', this, this.onSendLogin);
      Laya.stage.on('keydown', this, this.onSendLogin);
      var frame;
      var screenSize;
      var mobi = parseInt(Browser.window.localStorage.getItem('mobi'));
      if (mobi == 1) {
        this.pcBtn.selected = false;
        this.mobiBtn.selected = true;
        frame = Browser.window.localStorage.getItem('frameMobi');
        screenSize = Browser.window.localStorage.getItem('screenSizeMobi');
      } else {
        this.pcBtn.selected = true;
        this.mobiBtn.selected = false;
        frame = Browser.window.localStorage.getItem('framePC');
        screenSize = Browser.window.localStorage.getItem('screenSize');
      }
      this.frameTxt.text = frame;
      this.screenTxt.text = screenSize;
      mobi = parseInt(Browser.window.localStorage.getItem('font1'));
      if (mobi == 1) {
        this.font1Btn.selected = true;
        this.font2Btn.selected = false;
        this.font3Btn.selected = false;
      } else if (mobi == 2) {
        this.font1Btn.selected = false;
        this.font2Btn.selected = false;
        this.font3Btn.selected = true;
      } else {
        this.font1Btn.selected = false;
        this.font2Btn.selected = true;
        this.font3Btn.selected = false;
      }
      this.so = new L_LocalSave(GameConfig.SharedObject_name);
      if (WebParams.zoneid != null) {
        this.zoneIdTxt.text = WebParams.zoneid;
      } else {
        this.zoneIdTxt.text = this.so.data['qu'] != null ? this.so.data['qu'] : '1';
      }
      if (WebParams.ip != null) {
        this.ipTxt.text = WebParams.ip;
      } else {
        this.ipTxt.text = this.so.data['ip'] != null ? this.so.data['ip'] : '192.168.1.212';
      }
      if (WebParams.port != null) {
        this.portTxt.text = WebParams.port;
      } else {
        this.portTxt.text = this.so.data['port'] != null ? this.so.data['port'] : '8000';
      }
      if (WebParams.account != null) {
        this.userNameTxt.text = WebParams.account;
      } else {
        this.userNameTxt.text = this.so.data['user'] != null ? this.so.data['user'] : '';
      }
      if (WebParams.sign != null) {
        this.passwordTxt.text = WebParams.sign;
      } else {
        this.passwordTxt.text = this.so.data['password'] != null ? this.so.data['password'] : 'yyz';
      }
      for (i = 0; i < this._listBtn.length; i++) {
        btn = this._listBtn[i];
        if (btn.ip == this.ipTxt.text) {
          this.setSelectBtn(btn);
        }
      }
      var nameList;
      var str = '';
      if (this.so.data['loginList'] != null) {
        nameList = this.so.data['loginList'];
        for (i = 0; i < nameList.length; i++) {
          str += nameList[i].id + '\t\t' + nameList[i].ip + '\t\t' + nameList[i].port + '\t\t' + nameList[i].name + '\n';
        }
      }
      this._txt.text = str;
    };

    __proto.resize = function () {
      if (this.stage != null) {
        this.graphics.clear();
        this.graphics.beginFill('#444444');
        this.graphics.drawRect2(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.graphics.endFill();
        if (this.isHideLogin) {
          this.container.x = (this.stage.stageWidth - 300) >> 1;
          this.container.y = (this.stage.stageHeight - this.container.height) >> 1;
        } else {
          this.container.x = ((this.stage.stageWidth - this.container.width) >> 1) - 300;
          this.container.y = ((this.stage.stageHeight - this.container.height) >> 1) + 100;
        }
        this.container1.x = (this.stage.stageWidth - this.container1.width) >> 1;
        this.container1.y = this.container.y - 200;
        this._txt.x = this.container.x + this.container.width + 50;
        this._txt.y = this.container.y + 60;
        this._txt2.x = this._txt.x + 65;
        this._txt2.y = this._txt.y - 60;
        this._txt3.x = this._txt.x;
        this._txt3.y = this._txt.y - 30;
      }
    };

    __proto.setSelectBtn = function (value) {
      if (this._selectBtn != value) {
        if (this._selectBtn != null) {
          this._selectBtn.selected = false;
        }
        this._selectBtn = value;
        if (this._selectBtn != null) {
          this._selectBtn.selected = true;
          if (this._currentSelect == null) {
            this._currentSelect = {};
          }
          this._currentSelect.id = this._selectBtn.id;
          this._currentSelect.ip = this._selectBtn.ip;
          this._currentSelect.port = this._selectBtn.port;
        }
      }
    };

    __proto.onClick = function (e) {
      var btn = e.target;
      this.setSelectBtn(btn);
      this.updateInfo();
    };

    __proto.updateInfo = function () {
      this.ipTxt.text = this._currentSelect.ip;
      this.portTxt.text = this._currentSelect.port;
      this.zoneIdTxt.text = this._currentSelect.id;
    };

    __proto.onClick2 = function (e) {
      if (e.currentTarget == this.pcBtn) {
        if (!this.pcBtn.selected) {
          this.pcBtn.selected = true;
          this.mobiBtn.selected = false;
          Browser.window.localStorage.setItem('mobi', 0);
          GameConfig.reloadGame();
        }
      } else if (e.currentTarget == this.mobiBtn) {
        if (!this.mobiBtn.selected) {
          this.pcBtn.selected = false;
          this.mobiBtn.selected = true;
          Browser.window.localStorage.setItem('mobi', 1);
          GameConfig.reloadGame();
        }
      } else if (e.currentTarget == this.font1Btn) {
        if (!this.font1Btn.selected) {
          this.font1Btn.selected = true;
          this.font2Btn.selected = false;
          this.font3Btn.selected = false;
          Browser.window.localStorage.setItem('font1', 1);
          GameConfig.reloadGame();
        }
      } else if (e.currentTarget == this.font2Btn) {
        if (!this.font2Btn.selected) {
          this.font1Btn.selected = false;
          this.font2Btn.selected = true;
          this.font3Btn.selected = false;
          Browser.window.localStorage.setItem('font1', 0);
          GameConfig.reloadGame();
        }
      } else if (e.currentTarget == this.font3Btn) {
        if (!this.font3Btn.selected) {
          this.font1Btn.selected = false;
          this.font2Btn.selected = false;
          this.font3Btn.selected = true;
          Browser.window.localStorage.setItem('font1', 2);
          GameConfig.reloadGame();
        }
      } else if (e.currentTarget == this.frameBtn) {
        if (this.pcBtn.selected) {
          Browser.window.localStorage.setItem('framePC', this.frameTxt.text);
        } else if (this.mobiBtn.selected) {
          Browser.window.localStorage.setItem('frameMobi', this.frameTxt.text);
        }
        GameConfig.reloadGame();
      } else if (e.currentTarget == this.screenBtn) {
        if (this.pcBtn.selected) {
          Browser.window.localStorage.setItem('screenSize', this.screenTxt.text);
        } else if (this.mobiBtn.selected) {
          Browser.window.localStorage.setItem('screenSizeMobi', this.screenTxt.text);
        }
        GameConfig.reloadGame();
      } else if (e.currentTarget == this.strokeBtn) {
        if (this.strokeBtn.selected) {
          Browser.window.localStorage.setItem('noStroke', 0);
        } else {
          Browser.window.localStorage.setItem('noStroke', 1);
        }
        GameConfig.reloadGame();
      }
    };

    __proto.onSendLogin = function (e) {
      if (e.type == 'keydown') {
        if (e.keyCode != 13) {
          return;
        }
      }
      if (this.ipTxt.text == '') {
        this.txt1.visible = true;
        return;
      }
      if (this.portTxt.text == '') {
        this.txt2.visible = true;
        return;
      }
      if (this.userNameTxt.text == '') {
        this.txt3.visible = true;
        return;
      }
      if (this.passwordTxt.text == '' && GameConfig.isRelease) {
        this.txt4.visible = true;
        return;
      }
      WebParams.param['ip'] = this.ipTxt.text;
      WebParams.param['ip_cname'] = this.ipTxt.text;
      WebParams.param['port'] = myparseInt(this.portTxt.text);
      WebParams.param['account'] = this.userNameTxt.text;
      WebParams.param['sign'] = this.passwordTxt.text;
      WebParams.param['zoneid'] = myparseInt(this.zoneIdTxt.text);
      if (!this._currentSelect) {
        this._currentSelect = {};
        this._currentSelect.ip = this.ipTxt.text;
        this._currentSelect.port = this.portTxt.text;
        this._currentSelect.id = this.zoneIdTxt.text;
      }
      var list = [];
      if (this.so.data['loginList'] == null) {
        this._currentSelect.name = this.userNameTxt.text;
        list.push(this._currentSelect);
      } else {
        list = this.so.data['loginList'].concat();
        this._currentSelect.name = this.userNameTxt.text;
        list.push(this._currentSelect);
      }
      list = this.removal(list);
      if (list.length > 20) {
        list = list.splice(list.length - 20, 20);
      }
      this.so.setData('ip', this.ipTxt.text);
      this.so.setData('port', this.portTxt.text);
      this.so.setData('user', this.userNameTxt.text);
      this.so.setData('password', this.passwordTxt.text);
      this.so.setData('qu', this.zoneIdTxt.text);
      this.so.setData('loginList', list);
      if (this.callback != null) {
        this.callback.run();
      }
    };

    __proto.removal = function (arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].ip == arr[j].ip && arr[i].name == arr[j].name && arr[i].id == arr[j].id && arr[i].port == arr[j].port) {
            arr.splice(j, 1);
            j--;
          }
        }
      }
      return arr;
    };

    __proto.destroy = function (destroyChild) {
      destroyChild === void 0 && (destroyChild = true);
      if (this._destroyed) {
        return;
      }
      this.pcBtn.off('click', this, this.onClick2);
      this.mobiBtn.off('click', this, this.onClick2);
      this.loginBtn.off('click', this, this.onSendLogin);
      Laya.stage.off('keydown', this, this.onSendLogin);
      var btn1;
      for (var i = 0; i < this._listBtn.length; i++) {
        btn1 = this._listBtn[i];
        btn1.off('click', this, this.onClick);
        btn1 = null;
      }
      this._listBtn = null;
      this.container = null;
      this.container1 = null;
      this.ipTxt = null;
      this.portTxt = null;
      this.passwordTxt = null;
      this.userNameTxt = null;
      this.zoneIdTxt = null;
      this.txt1 = null;
      this.txt2 = null;
      this.txt3 = null;
      this.txt4 = null;
      this.txt5 = null;
      this.loginBtn = null;
      this.pcBtn = null;
      this.mobiBtn = null;
      this.callback = null;
      this.txtTabArr = null;
      this.so = null;
      this._txt = null;
      this._url = null;
      this._currentSelect = null;
      _super.prototype.destroy.call(this);
    };

    LoginPanel.createInput = function (container, x, y, color, w, h, text, isInput, size) {
      text === void 0 && (text = '');
      isInput === void 0 && (isInput = true);
      size === void 0 && (size = 20);
      var txt = new Input();
      txt.move(x, y, container);
      txt.fontSize = size;
      txt.font = 'SimSun';
      txt.align = 'center';
      txt.color = UIUtils.formatColor(color);
      txt.borderColor = '#FFFFFF';
      txt.width = w;
      txt.height = h;
      txt.text = text;
      return txt;
    };

    LoginPanel.createText = function (container, x, y, color, w, h, text, isInput, size) {
      text === void 0 && (text = '');
      isInput === void 0 && (isInput = false);
      size === void 0 && (size = 20);
      var txt = new Label();
      txt.move(x, y, container);
      txt.font = 'SimSun';
      txt.align = 'center';
      txt.valign = 'middle';
      txt.fontSize = size;
      txt.color = color;
      txt.width = w;
      txt.height = h;
      txt.text = text;
      txt.mouseEnabled = false;
      txt.mouseThrough = true;
      return txt;
    };

    LoginPanel.__init$ = function () {
      //class L_Sprite extends laya.display.Sprite
      L_Sprite = (function (_super) {
        function L_Sprite(w, h) {
          // {name:"231",ip:"192.168.1.231",port:8000,id:1}
          this.id = null;
          this.ip = null;
          this.port = null;
          this._txt = null;
          this._selected = false;
          L_Sprite.__super.call(this);
          this._width = w;
          this._height = h;
        }
        __class(L_Sprite, '', _super);
        var __proto = L_Sprite.prototype;
        __getset(0, __proto, 'label', null, function (value) {
          if (!this._txt) {
            this._txt = new Label();
            this._txt.fontSize = 16;
            this._txt.align = 'center';
            this._txt.valign = 'middle';
            this._txt.color = '#000000';
            this._txt.mouseEnabled = false;
            this._txt.mouseThrough = true;
            this._txt.setSize(this._width, this._height);
            this.addChild(this._txt);
          }
          this._txt.text = value;
        });
        __getset(
          0,
          __proto,
          'selected',
          function () {
            return this._selected;
          },
          function (value) {
            this._selected = value;
            this.graphics.clear();
            if (value) {
              this.graphics.drawRect(0, 0, this._width, this._height, '#66ccff');
            } else {
              this.graphics.drawRect(0, 0, this._width, this._height, '#dddddd');
            }
          }
        );
        return L_Sprite;
      })(Sprite);
    };

    return LoginPanel;
  })(Sprite);

  /**
   *创角-第一版
   *@author zq
   *创建时间：2024年4月22日13:35:18
   */
  //class login.view.create.v1.CreatePlayerPanel_v1 extends login.view.LoginBasePanel
  var CreatePlayerPanel_v1 = (function (_super) {
    function CreatePlayerPanel_v1(url) {
      this._chooseJob = null;
      this._namePanel = null;
      this._bottomBar = null;
      this._chooseRole = null;
      this._alert = null;
      this._inviteAlert = null;
      this._musicUrl = null;
      this._clickUrl = '';
      this._beginGameUrl = '';
      this._page = 0;
      //分页
      this._socketError = false;
      this._version = 1;
      if (!url) {
        url = GameConfig.resourceVersion.getVersionPath('mobileAtlas/mobile/CreatePanel1.atlas');
        url = GameConfig.getAtlasPath(url);
      }
      CreatePlayerPanel_v1.__super.call(this, url);
    }

    __class(CreatePlayerPanel_v1, 'login.view.create.v1.CreatePlayerPanel_v1', _super);
    var __proto = CreatePlayerPanel_v1.prototype;
    __proto.init = function () {
      this._chooseJob = new CreateChooseJob();
      this.addChild(this._chooseJob);
      this._chooseRole = new CreateChooseRole();
      this.addChild(this._chooseRole);
      this._bottomBar = new CreateBottomBar();
      this.addChild(this._bottomBar);
      this._namePanel = new CreateNamePanel();
      this.addChild(this._namePanel);
      this._chooseJob.addHandler(GameHandler.create(this, this.touchHandler_chooseJob));
      this._bottomBar.addHandler(GameHandler.create(this, this.randomJob));
      this._namePanel.addHandler(GameHandler.create(this, this.touchHandler_namePanel), GameHandler.create(this, this.closeHandler_namePanel));
      this._namePanel.setTime_txt(this._bottomBar.time_box, this._bottomBar.time_txt);
      this._chooseRole.setTime_txt(this._bottomBar.time_box, this._bottomBar.time_txt);
      this._namePanel.show();
      if (LoginRoleManager.ins.getRoleList() == null) {
        this.showCreatePlayer();
      } else {
        this.showSelectPlayer();
      }
      Laya.stage.on('keydown', this, this.onKeyDown);
      this._bottomBar.btn_create.on('click', this, this.onClick);
      this._bottomBar.btn_delete.on('click', this, this.onClick);
      this._bottomBar.btn_back.on('click', this, this.onClick);
      this._bottomBar.login_btn.on('click', this, this.onClick);
      this.addEvent('CreatePlayerEvent.GAME_BEGIN', this.beginGame);
      this.addEvent('CreatePlayerEvent.PLAY_CLICK_SOUND', this.onPlayClickSound);
      this.addEvent('LoginEvent.PLAYER_EXITING', this.onPlayerExiting);
      this._musicUrl = GameConfig.getProResPath('music/create' + GameConfig.SOUND);
      SoundManager.setMusicVolume(0.3);
      SoundManager.playMusic(this._musicUrl);
      this._clickUrl = GameConfig.getProResPath('music/create_click' + GameConfig.SOUND);
      this._beginGameUrl = GameConfig.getProResPath('music/btn_enter' + GameConfig.SOUND);
      this.resize();
    };

    /**创角*/
    __proto.showCreatePlayer = function () {
      this._page = 0;
      LoginRoleManager.ins.clear();
      this._chooseJob.showRandomPlayer();
      this._chooseJob.visible = true;
      this._bottomBar.showMenu(this._page);
      this._chooseRole.visible = false;
    };

    /**选角*/
    __proto.showSelectPlayer = function () {
      this._page = 1;
      this._chooseRole.reset();
      this._chooseRole.showRoleList();
      this._chooseRole.visible = true;
      this._bottomBar.showMenu(this._page);
      this._bottomBar.showRoleName();
      this._chooseJob.visible = false;
      this._namePanel.visible = false;
    };

    __proto.beginGame = function () {
      this._namePanel.save();
      if (LoginRoleManager.ins.selectRoleIsDelete()) {
        this.showAlert(GameHandler.create(this, this.onEnterGame), false);
      } else {
        this.onEnterGame();
      }
      SoundManager.playSound(this._beginGameUrl);
    };

    /**随机职业*/
    __proto.randomJob = function () {
      this._chooseJob.randomRecommendRole();
    };

    /**
     *选角色面板点击回调
     *@param sex
     *@param job
     */
    __proto.touchHandler_chooseJob = function (sex, job) {
      this._namePanel.selectJob(sex, job);
      this._bottomBar.timeClear();
      this._namePanel.resize();
    };

    /**
     *创角取名面板点击回调
     *@param sex
     *@param job
     */
    __proto.touchHandler_namePanel = function (sex, job) {
      this._chooseJob.selectJob(sex, job);
      this._bottomBar.timeClear();
      this._namePanel.resize();
    };

    /**
     *创角取名面板关闭回调
     *@param sex
     *@param job
     */
    __proto.closeHandler_namePanel = function () {
      var roles = LoginRoleManager.ins.getRoleList();
      if (roles && roles.length > 0) {
        this.showSelectPlayer();
      } else {
        this._chooseJob.reset();
        this._bottomBar.timeStart();
      }
    };

    __proto.showAlert = function (handler, isDel) {
      if (this._alert == null) {
        this._alert = new CreateAlert(this._version);
      }
      this._alert.move((Laya.stage.width - this._alert.width) >> 1, (Laya.stage.height - this._alert.height) >> 1, this);
      if (isDel) {
        this._alert.showDelete(handler);
      } else {
        this._alert.showRegain(handler);
      }
    };

    __proto.onDelAlert = function () {
      LoginRoleManager.ins.sendDeleteRole();
    };

    __proto.onEnterGame = function () {
      this.showInviteCodeAlert();
    };

    //5dfc5bf8da7fd6ce3fb4cb42a106fa63
    __proto.showInviteCodeAlert = function () {
      if (LoginRoleManager.ins.selectRole == null && LoginRoleManager.ins.needCode) {
        if (this._inviteAlert == null) {
          this._inviteAlert = new CreateInviteCodeAlert(this._version);
        }
        this._inviteAlert.move((Laya.stage.width - this._inviteAlert.width) >> 1, (Laya.stage.height - this._inviteAlert.height) >> 1, this);
        this._inviteAlert.showCode(GameHandler.create(this, this.onCodeAlert));
      } else {
        LoginRoleManager.ins.beginGame();
      }
    };

    __proto.onCodeAlert = function (code) {
      if (this._socketError && !GameConfig.socket.connected) {
        this.showNotice('角色正在存档退出，请稍后重新登录');
        return;
      }
      LoginRoleManager.ins.inviteCode = code;
      LoginRoleManager.ins.beginGame();
      Laya.workerTimer.clear(this, this.delayBeginGame);
      this.showNotice('进入游戏中，请稍等...');
    };

    __proto.onPlayerExiting = function () {
      this._socketError = true;
      this.showNotice('角色正在存档退出，稍后为您重新登录');
      Laya.workerTimer.once(3000, this, this.delayBeginGame);
    };

    __proto.delayBeginGame = function () {
      if (GameConfig.socket.connected) {
        console.log('socket连接成功，自动进入游戏！');
        LoginRoleManager.ins.beginGame();
        Laya.workerTimer.clear(this, this.delayBeginGame);
      } else {
        console.log('socket连接断开，等待3秒后再次自动进入游戏');
        Laya.workerTimer.once(3000, this, this.delayBeginGame);
      }
    };

    __proto.showNotice = function (msg, t) {
      t === void 0 && (t = 2000);
      this._bottomBar.time_txt.text = msg;
      this._bottomBar.time_txt.visible = true;
      this._bottomBar.time_box.visible = true;
      if (t > 0) {
        Laya.workerTimer.once(t, this, this.onHideNotice);
      }
    };

    __proto.onHideNotice = function () {
      Laya.workerTimer.clear(this, this.onHideNotice);
      this._bottomBar.time_txt.visible = false;
      this._bottomBar.time_box.visible = false;
    };

    __proto.onClick = function (e) {
      switch (e.currentTarget) {
        case this._bottomBar.btn_create: {
          var roles = LoginRoleManager.ins.getRoleList();
          if (roles == null || roles.length < 2) {
            this.showCreatePlayer();
          } else {
            this._bottomBar.showMax();
          }
          break;
        }
        case this._bottomBar.btn_delete: {
          if (LoginRoleManager.ins.selectRoleIsDelete()) {
            this._bottomBar.showDel();
          } else {
            this.showAlert(GameHandler.create(this, this.onDelAlert), true);
          }
          break;
        }
        case this._bottomBar.btn_back: {
          GameConfig.reloadGame();
          break;
        }
        case this._bottomBar.login_btn: {
          this.beginGame();
          break;
        }
      }
    };

    /**
     *键盘事件
     */
    __proto.onKeyDown = function (e) {
      if (e.keyCode == 13) {
        this.beginGame();
      }
    };

    __proto.onPlayClickSound = function () {
      SoundManager.playSound(this._clickUrl);
    };

    __proto.resize = function () {
      if (this.parent == null) {
        return;
      }
      this.bgToCenter();
      if (this._chooseJob) {
        this._chooseJob.resize();
      }
      if (this._chooseRole) {
        this._chooseRole.resize();
      }
      if (this._namePanel) {
        this._namePanel.resize();
      }
      if (this._bottomBar) {
        this._bottomBar.resize();
      }
    };

    __proto.getBgPath = function () {
      if (Browser.onPC) {
        return _super.prototype.getBgPath.call(this);
      }
      return GameConfig.getProResPath(GameConfig.loginResVersion + '/loginbgMobi.jpg');
    };

    __proto.bgToCenter = function () {
      if (Browser.onPC) {
        CreatePlayerUtils.resizeByMinScale(this._bg);
      } else {
        var sw = GameConfig.getRealWidth();
        var sh = GameConfig.SCREEN_HEIGHT2;
        this._bg.scale(sw / this._bg.width, sh / this._bg.height);
        this._bg.x = 0;
        this._bg.y = 0;
      }
    };

    __proto.destroy = function (destroyChild) {
      destroyChild === void 0 && (destroyChild = true);
      if (this._destroyed) {
        return;
      }
      EventMgr.removeAll(this);
      Laya.workerTimer.clear(this, this.onHideNotice);
      Laya.workerTimer.clear(this, this.delayBeginGame);
      Laya.stage.off('keydown', this, this.onKeyDown);
      SoundManager.stopMusic();
      SoundManager.destroySound(this._musicUrl);
      SoundManager.destroySound(this._beginGameUrl);
      SoundManager.destroySound(this._clickUrl);
      if (this._alert) {
        this._alert.destroy();
        this._alert = null;
      }
      if (this._inviteAlert) {
        this._inviteAlert.destroy();
        this._inviteAlert = null;
      }
      if (this._chooseJob) {
        this._chooseJob.destroy();
        this._chooseJob = null;
      }
      if (this._chooseRole) {
        this._chooseRole.destroy();
        this._chooseRole = null;
      }
      if (this._bottomBar) {
        this._bottomBar.destroy();
        this._bottomBar = null;
      }
      if (this._namePanel) {
        this._namePanel.hide();
        this._namePanel.destroy();
        this._namePanel = null;
      }
      _super.prototype.destroy.call(this);
    };

    return CreatePlayerPanel_v1;
  })(LoginBasePanel);

  /**
   *创角-第二版
   *@author zq
   *创建时间：2024年5月24日14:44:17
   */
  //class login.view.create.v2.CreatePlayerPanel_v2 extends login.view.LoginBasePanel
  var CreatePlayerPanel_v2 = (function (_super) {
    function CreatePlayerPanel_v2() {
      this._view = null;
      this._namePanel = null;
      this._alert = null;
      this._inviteAlert = null;
      this._roleMap = {};
      this._role = null;
      this._fireEffect = null;
      this._sound = null;
      this._soundUrl = [];
      this._musicUrl = null;
      this._clickUrl = '';
      this._beginGameUrl = '';
      this._time = 0;
      this._timerLock = false;
      //自动计时器锁，调试用
      this._page = 0;
      this.COUNT_DWON_TIME = 15;
      //15秒后进入游戏
      this.RECOVER_TIME = 5;
      //无操作后5秒进入倒计时
      this._offsetY = -55;
      //整体往上抬15像素，顶部遮挡去掉了需要补齐
      this._index = -1;
      //列表默认选项
      this._socketError = false;
      this._version = 2;
      CreatePlayerPanel_v2.__super.call(this, GameConfig.getAtlasPath(GameConfig.resourceVersion.getVersionPath('mobileAtlas/mobile/CreatePanel2.atlas')));
    }

    __class(CreatePlayerPanel_v2, 'login.view.create.v2.CreatePlayerPanel_v2', _super);
    var __proto = CreatePlayerPanel_v2.prototype;
    __proto.init = function () {
      this.COUNT_DWON_TIME = LoginRoleManager.ins.getAutoEnterGameTime();
      this._view = new CreatePlayerPanel_v2UI();
      this.addChild(this._view);
      this._view.bg2.skin = GameConfig.getProResPath('v2/bgbottom.png');
      this._fireEffect = new CreateSceneEffect('create/scene/fire', 10);
      this._fireEffect.move(this._view.width >> 1, (this._view.height >> 1) + this._offsetY, this._view, 1);
      this._fireEffect.blendMode = 'add';
      this._namePanel = new CreateNamePanel_v2();
      this._namePanel.move(210, 45, this._view);
      this._view.chooseList.itemRender = CreateChooseRoleItem_v2;
      this._view.chooseList.renderHandler = GameHandler.create(this, this.onRenderRole);
      this._view.chooseList.selectHandler = GameHandler.create(this, this.onSelectRole);
      this._view.chooseList.scrollBarAllwaysShow = 'off';
      this._view.chooseList.array = null;
      this._musicUrl = GameConfig.getProResPath('music/create' + GameConfig.SOUND);
      SoundManager.setMusicVolume(0.3);
      SoundManager.playMusic(this._musicUrl);
      this._clickUrl = GameConfig.getProResPath('music/create_click' + GameConfig.SOUND);
      this._beginGameUrl = GameConfig.getProResPath('music/btn_enter' + GameConfig.SOUND);
      this.addEvent('CreatePlayerEvent.GAME_BEGIN', this.beginGame);
      this.addEvent('CreatePlayerEvent.CHANGE_ROLE_UNIT', this.onChangeRoleUnit);
      this.addEvent('CreatePlayerEvent.CLOSE_NAME_PANEL', this.onCloseNamePanel);
      this.addEvent('CreatePlayerEvent.NOTICE', this.showNotice);
      this.addEvent('CreatePlayerEvent.PLAY_CLICK_SOUND', this.onPlayClickSound);
      this.addEvent('login_error', this.showNotice);
      this.addEvent('LoginEvent.PLAYER_EXITING', this.onPlayerExiting);
      this.addEvent('LoginEvent.PLAYER_CHANGE', this.onPlayerChange);
      this._view.btn_create.on('click', this, this.onClick);
      this._view.btn_del.on('click', this, this.onClick);
      this._view.btn_exit.on('click', this, this.onClick);
      this._view.btn_regain.on('click', this, this.onClick);
      this._view.btn_start.on('click', this, this.onClick);
      Laya.stage.on('mousedown', this, this.onStageMouseDown);
      Laya.workerTimer.once(100, this, this.onLaterSceneEffect);
      if (LoginRoleManager.ins.getRoleCount() == 0) {
        this.showCreatePlayer();
      } else {
        this.showSelectPlayer();
      }
      if (GameConfig.isRelease) {
        this._timerLock = false;
      }
      var clientVersion = myparseInt(WebParams.param['verCodeGameClient']);
      if (clientVersion > 0) {
        this._view.version_txt.text = 'Client:' + clientVersion;
      }
      if (GameConfig.appVersion > 0) {
        if (this._view.version_txt.text) {
          this._view.version_txt.text += ', ';
        }
        if (GameConfig.appVersionName) {
          this._view.version_txt.text += 'Version:' + GameConfig.appVersionName;
        } else {
          this._view.version_txt.text += 'Version:1.0.' + GameConfig.appVersion;
        }
      }
      this.resize();
    };

    __proto.destroy = function (destroyChild) {
      destroyChild === void 0 && (destroyChild = true);
      Laya.stage.off('mousedown', this, this.onStageMouseDown);
      SoundManager.stopMusic();
      SoundManager.destroySound(this._musicUrl);
      SoundManager.destroySound(this._clickUrl);
      SoundManager.destroySound(this._beginGameUrl);
      if (this._soundUrl) {
        for (var i = 0; i < this._soundUrl.length; i++) {
          SoundManager.destroySound(GameConfig.getProResPath(this._soundUrl[i]));
        }
        this._soundUrl = null;
      }
      if (this._sound) {
        this._sound.stop();
        this._sound = null;
      }
      Laya.workerTimer.clear(this, this.onHideNotice);
      Laya.workerTimer.clear(this, this.onTimer);
      Laya.workerTimer.clear(this, this.delayBeginGame);
      Laya.workerTimer.clear(this, this.onLaterSceneEffect);
      Laya.workerTimer.clear(this, this.onDelayJobSound);
      if (this._fireEffect) {
        this._fireEffect.destroy();
        this._fireEffect = null;
      }
      if (this._namePanel) {
        this._namePanel.destroy();
        this._namePanel = null;
      }
      if (this._alert) {
        this._alert.destroy();
        this._alert = null;
      }
      if (this._inviteAlert) {
        this._inviteAlert.destroy();
        this._inviteAlert = null;
      }
      if (this._roleMap != null) {
        for (var key in this._roleMap) {
          var role = this._roleMap[key];
          role.destroy();
          delete this._roleMap[key];
        }
        this._roleMap = null;
      }
      this._role = null;
      this._view = null;
      _super.prototype.destroy.call(this, destroyChild);
    };

    /**创角*/
    __proto.showCreatePlayer = function () {
      this._page = 0;
      LoginRoleManager.ins.clear();
      this._namePanel.showNamePanel(true);
      this._index = -1;
      this._view.chooseList.selectedIndex = -1;
      this._view.chooseList.disabled = true;
      this._view.imgVip.visible = true;
      this.resetTime();
      Laya.workerTimer.loop(1000, this, this.onTimer);
      this._view.btn_start.skin = 'mobile/CreatePanel2/btn_start.png';
    };

    /**选角*/
    __proto.showSelectPlayer = function () {
      this._page = 1;
      this._namePanel.showNamePanel(false);
      this._index = -1;
      this._view.chooseList.array = LoginRoleManager.ins.getRoleList();
      this._view.chooseList.selectedIndex = LoginRoleManager.ins.getLastLoginIndex();
      this._view.chooseList.scrollTo(0);
      this._view.chooseList.disabled = false;
      this._view.imgVip.visible = false;
      this.resetTime();
      Laya.workerTimer.loop(1000, this, this.onTimer);
      this._view.btn_start.skin = 'mobile/CreatePanel2/btn_start.png';
    };

    //-----------------回调事件----------------
    __proto.beginGame = function () {
      Laya.workerTimer.clear(this, this.onTimer);
      LoginRoleManager.ins.name = this._namePanel.getName();
      if (LoginRoleManager.ins.selectRoleIsDelete()) {
        this.showAlert(GameHandler.create(this, this.onEnterGame), false);
      } else {
        this.onEnterGame();
      }
      SoundManager.playSound(this._beginGameUrl);
    };

    __proto.onCloseNamePanel = function () {
      var num = LoginRoleManager.ins.getRoleCount();
      if (num > 0) {
        this.showSelectPlayer();
      } else {
        LoginRoleManager.ins.clear();
        this._namePanel.showNamePanel(false);
        this.onChangeRoleUnit(0, 0);
        this._view.btn_start.skin = 'mobile/CreatePanel2/btn_create.png';
      }
    };

    __proto.onChangeRoleUnit = function (sex, job) {
      LoginRoleManager.ins.sex = sex;
      LoginRoleManager.ins.job = job;
      if (this._role) {
        this._role.reset();
        this._role.removeSelf();
      }
      if (sex > 0 && job > 0) {
        this._role = this.getCreateRoleUnit(sex, job);
        this._role.move(0, 180, this._view.avatarNode);
        this._role.attack();
      }
    };

    // Laya.workerTimer.once(500,this,onDelayJobSound,[sex,job]);
    __proto.onTimer = function () {
      if (this._timerLock) {
        return;
      }
      if (this._namePanel.isShowDialog()) {
        return;
      }
      this._time--;
      var manager = LoginRoleManager.ins;
      if (this._time <= this.COUNT_DWON_TIME) {
        if (this._page == 0) {
          if (!this._namePanel.visible) {
            this._namePanel.showNamePanel(true);
            this._view.btn_start.skin = 'mobile/CreatePanel2/btn_start.png';
          }
          this.showNotice('游戏将在' + this._time + 's后自动为您创建角色', 1000);
        } else {
          this.showNotice('游戏将在' + this._time + 's后自动为您进入游戏', 1000);
        }
      }
      if (this._time <= 0) {
        Laya.workerTimer.clear(this, this.onTimer);
        manager.auto = 1;
        this.beginGame();
      }
    };

    __proto.onStageMouseDown = function (e) {
      this.onHideNotice();
      this.resetTime();
    };

    //-----选角操作----
    __proto.onPlayerChange = function () {
      this._view.chooseList.array = LoginRoleManager.ins.getRoleList();
    };

    __proto.onRenderRole = function (cell, index) {
      if (index < 0) return;
      var data = this._view.chooseList.array[index];
      if (data) {
        cell.setData(data);
      }
    };

    __proto.onSelectRole = function (index) {
      if (index < 0) return;
      var data = this._view.chooseList.array[index];
      if (data) {
        LoginRoleManager.ins.selectRole = data;
        this.onChangeRoleUnit(data.sex, data.job);
      }
      if (this._index != -1) {
        this.onPlayClickSound();
      }
      this._index = index;
    };

    __proto.onPlayClickSound = function () {
      SoundManager.playSound(this._clickUrl);
    };

    __proto.onDelayJobSound = function (sex, job) {
      Laya.workerTimer.clear(this, this.onDelayJobSound);
      if (this._sound) {
        this._sound.stop();
      }
      var url = 'music/' + sex + job + GameConfig.SOUND;
      if (this._soundUrl.indexOf(url) == -1) {
        this._soundUrl.push(url);
      }
      this._sound = SoundManager.playSound(GameConfig.getProResPath(url));
    };

    __proto.onClick = function (e) {
      var num = LoginRoleManager.ins.getRoleCount();
      switch (e.currentTarget) {
        case this._view.btn_create: {
          if (num < 2) {
            this.showCreatePlayer();
          } else {
            this.showNotice('创建角色个数已达上限！');
          }
          break;
        }
        case this._view.btn_regain: {
          if (num == 0) {
            this.showNotice('请点击角色形象创角');
          } else {
            this.showNotice('请联系客服！');
          }
          break;
        }
        case this._view.btn_del: {
          if (this._page == 0) {
            this.showNotice('正在创角中...');
          } else {
            if (LoginRoleManager.ins.selectRoleIsDelete()) {
              this.showNotice('该角色已处于删除状态！');
            } else {
              this.showAlert(GameHandler.create(this, this.onDelAlert), true);
            }
          }
          break;
        }
        case this._view.btn_exit: {
          GameConfig.reloadGame();
          break;
        }
        case this._view.btn_start: {
          if (this._page == 0 && !this._namePanel.visible) {
            this.showCreatePlayer();
            return;
          }
          this.beginGame();
          break;
        }
      }
    };

    //-----------------面板基础方法--------------------
    __proto.getCreateRoleUnit = function (sex, job) {
      var role = this._roleMap[sex + '_' + job];
      if (role == null) {
        role = new CreateRoleUnit(sex, job, 1, 1024, this._version);
        role.stand();
        this._roleMap[sex + '_' + job] = role;
      }
      return role;
    };

    __proto.showNotice = function (msg, t) {
      t === void 0 && (t = 2000);
      this._view.notice_txt.text = msg;
      this._view.notice_txt.visible = true;
      if (t > 0) {
        Laya.workerTimer.once(t, this, this.onHideNotice);
      }
    };

    __proto.onHideNotice = function () {
      Laya.workerTimer.clear(this, this.onHideNotice);
      this._view.notice_txt.visible = false;
    };

    __proto.showAlert = function (handler, isDel) {
      if (this._alert == null) {
        this._alert = new CreateAlert(this._version);
      }
      this._alert.move((Laya.stage.width - this._alert.width) >> 1, (Laya.stage.height - this._alert.height) >> 1, this);
      if (isDel) {
        this._alert.showDelete(handler);
      } else {
        this._alert.showRegain(handler);
      }
    };

    __proto.onDelAlert = function () {
      LoginRoleManager.ins.sendDeleteRole();
    };

    __proto.onEnterGame = function () {
      this.showInviteCodeAlert();
    };

    __proto.showInviteCodeAlert = function () {
      if (LoginRoleManager.ins.selectRole == null && LoginRoleManager.ins.needCode) {
        if (this._inviteAlert == null) {
          this._inviteAlert = new CreateInviteCodeAlert(this._version);
        }
        this._inviteAlert.move((Laya.stage.width - this._inviteAlert.width) >> 1, (Laya.stage.height - this._inviteAlert.height) >> 1, this);
        this._inviteAlert.showCode(GameHandler.create(this, this.onCodeAlert));
      } else {
        this.onCodeAlert('');
      }
    };

    __proto.onCodeAlert = function (code) {
      if (this._socketError && !GameConfig.socket.connected) {
        this.showNotice('角色正在存档退出，请稍后重新登录');
        return;
      }
      if (LoginRoleManager.ins.selectRole == null && LoginRoleManager.ins.name == '') {
        this.showNotice('请输入昵称后再进入游戏');
        return;
      }
      LoginRoleManager.ins.inviteCode = code;
      LoginRoleManager.ins.beginGame();
      Laya.workerTimer.clear(this, this.delayBeginGame);
      this.showNotice('进入游戏中，请稍等...');
    };

    __proto.onPlayerExiting = function () {
      this._socketError = true;
      this.showNotice('角色正在存档退出，稍后为您重新登录');
      Laya.workerTimer.once(3000, this, this.delayBeginGame);
    };

    __proto.delayBeginGame = function () {
      if (GameConfig.socket.connected) {
        console.log('socket连接成功，自动进入游戏！');
        LoginRoleManager.ins.beginGame();
        Laya.workerTimer.clear(this, this.delayBeginGame);
      } else {
        console.log('socket连接断开，等待3秒后再次自动进入游戏');
        Laya.workerTimer.once(3000, this, this.delayBeginGame);
      }
    };

    __proto.resetTime = function () {
      this._time = this.COUNT_DWON_TIME + this.RECOVER_TIME;
    };

    __proto.onLaterSceneEffect = function () {
      this._fireEffect.play();
    };

    __proto.getBgPath = function () {
      return GameConfig.getProResPath('v2/loginbg.jpg');
    };

    __proto.bgToCenter = function () {
      if (this._bg != null && this.stage != null) {
        this._bg.anchorX = 0.5;
        this._bg.anchorY = 0.5;
        this._bg.x = Laya.stage.width >> 1;
        this._bg.y = (Laya.stage.height >> 1) + this._offsetY;
      }
    };

    __proto.resize = function () {
      var stageKey = Laya.stage.width / Laya.stage.height;
      var scaleNumX = Laya.stage.width / this._view.width;
      var scaleNumY = Laya.stage.height / this._view.height;
      console.log('stageKey = ' + stageKey);
      console.log('scaleNumX = ' + scaleNumX);
      console.log('scaleNumY = ' + scaleNumY);
      var scaleNum = stageKey < 1.7 ? scaleNumX : scaleNumY;
      this._view.scaleXY = scaleNum;
      this._view.move(Laya.stage.width >> 1, (Laya.stage.height >> 1) - GameConfig.TX_BOTTOM_INFO_HEIGHT);
      if (this._bg) {
        this._bg.scaleXY = scaleNum;
        this.bgToCenter();
      }
    };

    return CreatePlayerPanel_v2;
  })(LoginBasePanel);

  /**
   *创角-第三版（页游专属）
   *@author zq
   *创建时间：2024年5月24日14:44:17
   */
  //class login.view.create.v3.CreatePlayerPanel_v3 extends login.view.LoginBasePanel
  var CreatePlayerPanel_v3 = (function (_super) {
    function CreatePlayerPanel_v3() {
      this._view = null;
      this._namePanel = null;
      this._alert = null;
      this._inviteAlert = null;
      this._fireEffect = null;
      this._selectEffect = null;
      this._vipEffect = null;
      this._sound = null;
      this._soundUrl = [];
      this._musicUrl = null;
      this._clickUrl = '';
      this._beginGameUrl = '';
      this._vipUrl = '';
      this._time = 0;
      this._timerLock = false;
      //false;//自动计时器锁，调试用
      this._page = 0;
      this.COUNT_DWON_TIME = 15;
      //15秒后进入游戏
      this.RECOVER_TIME = 5;
      //无操作后5秒进入倒计时
      this._offsetY = 0;
      //整体往上抬15像素，顶部遮挡去掉了需要补齐
      this._index = -1;
      //列表默认选项
      this._delayVip = false;
      this._socketError = false;
      this._version = 3;
      CreatePlayerPanel_v3.__super.call(this, GameConfig.getAtlasPath(GameConfig.resourceVersion.getVersionPath('mobileAtlas/mobile/CreatePanel3.atlas')));
    }

    __class(CreatePlayerPanel_v3, 'login.view.create.v3.CreatePlayerPanel_v3', _super);
    var __proto = CreatePlayerPanel_v3.prototype;
    __proto.init = function () {
      this.COUNT_DWON_TIME = LoginRoleManager.ins.getAutoEnterGameTime();
      this._view = new CreatePlayerPanel_v3UI();
      this.addChild(this._view);
      this._view.bg_bottom.skin = GameConfig.getProResPath('v3/bg_btn.png');
      this._namePanel = new CreateNamePanel_v3();
      this._namePanel.move(306, 625, this._view);
      this._view.chooseList.itemRender = CreateChooseRoleItem_v3;
      this._view.chooseList.renderHandler = GameHandler.create(this, this.onRenderRole);
      this._view.chooseList.selectHandler = GameHandler.create(this, this.onSelectRole);
      this._view.chooseList.scrollBarAllwaysShow = 'off';
      this._view.chooseList.array = null;
      this._fireEffect = new CreateSceneEffect('create/scene/start', 8);
      this._fireEffect.move(this._view.btn_start.width / 2, this._view.btn_start.height / 2, this._view.btn_start);
      this._fireEffect.play();
      this._selectEffect = new CreateSceneEffect('create/scene/select', 8);
      this._musicUrl = GameConfig.getProResPath('music/create' + GameConfig.SOUND);
      SoundManager.setMusicVolume(0.3);
      SoundManager.playMusic(this._musicUrl);
      this._clickUrl = GameConfig.getProResPath('music/create_click' + GameConfig.SOUND);
      this._beginGameUrl = GameConfig.getProResPath('music/btn_enter' + GameConfig.SOUND);
      this._vipUrl = GameConfig.getProResPath('music/renwu_07' + GameConfig.SOUND);
      Laya.workerTimer.once(3000, this, this.onShowVip);
      this.addEvent('CreatePlayerEvent.GAME_BEGIN', this.beginGame);
      this.addEvent('CreatePlayerEvent.CHANGE_ROLE_UNIT', this.onChangeRoleUnit);
      this.addEvent('CreatePlayerEvent.NOTICE', this.showNotice);
      this.addEvent('CreatePlayerEvent.PLAY_CLICK_SOUND', this.onPlayClickSound);
      this.addEvent('CreatePlayerEvent.DEL_ROLE', this.delRole);
      this.addEvent('login_error', this.showNotice);
      this.addEvent('LoginEvent.PLAYER_EXITING', this.onPlayerExiting);
      this.addEvent('LoginEvent.PLAYER_CHANGE', this.onPlayerChange);
      this._view.btn_create.on('click', this, this.onClick);
      this._view.btn_exit.on('click', this, this.onClick);
      this._view.btn_start.on('click', this, this.onClick);
      Laya.stage.on('mousedown', this, this.onStageMouseDown);
      if (LoginRoleManager.ins.getRoleCount() == 0) {
        this.showCreatePlayer();
      } else {
        this.showSelectPlayer();
      }
      if (GameConfig.isRelease) {
        this._timerLock = false;
      }
      var clientVersion = myparseInt(WebParams.param['verCodeGameClient']);
      if (clientVersion > 0) {
        this._view.version_txt.text = 'Client:' + clientVersion;
      }
      if (GameConfig.appVersion > 0) {
        if (this._view.version_txt.text) {
          this._view.version_txt.text += ', ';
        }
        if (GameConfig.appVersionName) {
          this._view.version_txt.text += 'Version:' + GameConfig.appVersionName;
        } else {
          this._view.version_txt.text += 'Version:1.0.' + GameConfig.appVersion;
        }
      }
      this.resize();
    };

    __proto.destroy = function (destroyChild) {
      destroyChild === void 0 && (destroyChild = true);
      Laya.stage.off('mousedown', this, this.onStageMouseDown);
      SoundManager.stopMusic();
      SoundManager.destroySound(this._musicUrl);
      SoundManager.destroySound(this._clickUrl);
      SoundManager.destroySound(this._beginGameUrl);
      SoundManager.destroySound(this._vipUrl);
      if (this._soundUrl) {
        for (var i = 0; i < this._soundUrl.length; i++) {
          SoundManager.destroySound(GameConfig.getProResPath(this._soundUrl[i]));
        }
        this._soundUrl = null;
      }
      if (this._sound) {
        this._sound.stop();
        this._sound = null;
      }
      Laya.workerTimer.clear(this, this.onHideNotice);
      Laya.workerTimer.clear(this, this.onTimer);
      Laya.workerTimer.clear(this, this.delayBeginGame);
      Laya.workerTimer.clear(this, this.onDelayJobSound);
      Laya.workerTimer.clear(this, this.onShowVip);
      if (this._vipEffect) {
        this._vipEffect.destroy();
        this._vipEffect = null;
      }
      if (this._selectEffect) {
        this._selectEffect.destroy();
        this._selectEffect = null;
      }
      if (this._fireEffect) {
        this._fireEffect.destroy();
        this._fireEffect = null;
      }
      if (this._namePanel) {
        this._namePanel.destroy();
        this._namePanel = null;
      }
      if (this._alert) {
        this._alert.destroy();
        this._alert = null;
      }
      if (this._inviteAlert) {
        this._inviteAlert.destroy();
        this._inviteAlert = null;
      }
      this._view = null;
      _super.prototype.destroy.call(this, destroyChild);
    };

    /**创角*/
    __proto.showCreatePlayer = function () {
      this._page = 0;
      LoginRoleManager.ins.clear();
      this._namePanel.showNamePanel(true);
      this._index = -1;
      this._view.chooseList.selectedIndex = -1;
      this._view.chooseList.visible = false;
      this._view.btn_create.visible = false;
      var roles = LoginRoleManager.ins.getRoleList();
      this._view.btn_exit.visible = roles && roles.length > 0;
      this._view.bg_top.skin = 'mobile/CreatePanel3/bg_top_create.png';
      this._selectEffect.visible = false;
      this._selectEffect.stop();
      this.playVipEffect(true);
      this.resetTime();
      Laya.workerTimer.loop(1000, this, this.onTimer);
    };

    /**选角*/
    __proto.showSelectPlayer = function () {
      this._page = 1;
      this._namePanel.showNamePanel(false);
      this._index = -1;
      var roles = LoginRoleManager.ins.getRoleList();
      this._view.chooseList.array = roles;
      this._view.chooseList.selectedIndex = LoginRoleManager.ins.getLastLoginIndex();
      this._view.chooseList.scrollTo(0);
      this._view.chooseList.visible = true;
      this._view.btn_exit.visible = false;
      this._view.btn_create.visible = roles.length < 2;
      this._view.btn_create.y = this._view.chooseList.y;
      if (roles) {
        this._view.btn_create.y += roles.length * (146 + 20);
      }
      this._view.bg_top.skin = 'mobile/CreatePanel3/bg_top_choose.png';
      this._selectEffect.visible = true;
      this._selectEffect.play();
      this.playVipEffect(false);
      this.resetTime();
      Laya.workerTimer.loop(1000, this, this.onTimer);
    };

    //-----------------回调事件----------------
    __proto.beginGame = function () {
      Laya.workerTimer.clear(this, this.onTimer);
      LoginRoleManager.ins.name = this._namePanel.getName();
      if (LoginRoleManager.ins.selectRoleIsDelete()) {
        this.showAlert(GameHandler.create(this, this.onEnterGame), false);
      } else {
        this.onEnterGame();
      }
      SoundManager.playSound(this._beginGameUrl);
    };

    // }
    __proto.onChangeRoleUnit = function (sex, job) {
      LoginRoleManager.ins.sex = sex;
      LoginRoleManager.ins.job = job;
      this._view.imgBody.skin = GameConfig.getProResPath('create/action3/body_' + job + '_' + sex + '.png');
      this._view.imgDes.skin = 'mobile/CreatePanel3/desc_' + job + '.png';
    };

    // Laya.workerTimer.once(500,this,onDelayJobSound,[sex,job]);
    __proto.onTimer = function () {
      if (this._timerLock) {
        return;
      }
      if (this._namePanel.isShowDialog()) {
        return;
      }
      this._time--;
      var manager = LoginRoleManager.ins;
      if (this._time <= this.COUNT_DWON_TIME) {
        if (this._page == 0) {
          if (!this._namePanel.visible) {
            this._namePanel.showNamePanel(true);
          }
          this.showNotice('游戏将在' + this._time + 's后自动为您创建角色', 1000);
        } else {
          this.showNotice('游戏将在' + this._time + 's后自动为您进入游戏', 1000);
        }
      }
      if (this._time <= 0) {
        Laya.workerTimer.clear(this, this.onTimer);
        manager.auto = 1;
        this.beginGame();
      }
    };

    __proto.onStageMouseDown = function (e) {
      this.onHideNotice();
      this.resetTime();
    };

    //-----选角操作----
    __proto.onPlayerChange = function () {
      this._view.chooseList.array = LoginRoleManager.ins.getRoleList();
    };

    __proto.onRenderRole = function (cell, index) {
      if (index < 0) return;
      var data = this._view.chooseList.array[index];
      if (data) {
        cell.setData(data);
      }
    };

    __proto.onSelectRole = function (index) {
      if (index < 0) return;
      var data = this._view.chooseList.array[index];
      if (data) {
        LoginRoleManager.ins.selectRole = data;
        this.onChangeRoleUnit(data.sex, data.job);
      }
      var cell = this._view.chooseList.getCell(index);
      if (cell) {
        this._selectEffect.move(69, 72, cell);
      }
      if (this._index != -1) {
        this.onPlayClickSound();
      }
      this._index = index;
    };

    __proto.onPlayClickSound = function () {
      SoundManager.playSound(this._clickUrl);
    };

    __proto.onDelayJobSound = function (sex, job) {
      Laya.workerTimer.clear(this, this.onDelayJobSound);
      if (this._sound) {
        this._sound.stop();
      }
      var url = 'music/' + sex + job + GameConfig.SOUND;
      if (this._soundUrl.indexOf(url) == -1) {
        this._soundUrl.push(url);
      }
      this._sound = SoundManager.playSound(GameConfig.getProResPath(url));
    };

    __proto.delRole = function (data) {
      if (this._page == 0) {
        this.showNotice('正在创角中...');
      } else {
        if (LoginRoleManager.ins.selectRoleIsDelete(data)) {
          this.showNotice('该角色已处于删除状态！');
        } else {
          this.showAlert(GameHandler.create(this, this.onDelAlert, [data]), true);
        }
      }
    };

    __proto.onClick = function (e) {
      var num = LoginRoleManager.ins.getRoleCount();
      switch (e.currentTarget) {
        case this._view.btn_create: {
          if (num < 2) {
            this.showCreatePlayer();
          } else {
            this.showNotice('创建角色个数已达上限！');
          }
          break;
        }
        case this._view.btn_exit: {
          this.showSelectPlayer();
          break;
        }
        case this._view.btn_start: {
          if (this._page == 0 && !this._namePanel.visible) {
            this.showCreatePlayer();
            return;
          }
          this.beginGame();
          break;
        }
      }
    };

    //-----------------面板基础方法--------------------
    __proto.showNotice = function (msg, t) {
      t === void 0 && (t = 2000);
      this._view.notice_txt.text = msg;
      this._view.notice_txt.visible = true;
      if (t > 0) {
        Laya.workerTimer.once(t, this, this.onHideNotice);
      }
    };

    __proto.onHideNotice = function () {
      Laya.workerTimer.clear(this, this.onHideNotice);
      this._view.notice_txt.visible = false;
    };

    __proto.showAlert = function (handler, isDel) {
      if (this._alert == null) {
        this._alert = new CreateAlert(this._version);
      }
      this._alert.move((Laya.stage.width - this._alert.width) >> 1, (Laya.stage.height - this._alert.height) >> 1, this);
      if (isDel) {
        this._alert.showDelete(handler);
      } else {
        this._alert.showRegain(handler);
      }
    };

    __proto.onDelAlert = function (data) {
      LoginRoleManager.ins.sendDeleteRole(data);
    };

    __proto.onEnterGame = function () {
      this.showInviteCodeAlert();
    };

    __proto.showInviteCodeAlert = function () {
      if (LoginRoleManager.ins.selectRole == null && LoginRoleManager.ins.needCode) {
        if (this._inviteAlert == null) {
          this._inviteAlert = new CreateInviteCodeAlert(this._version);
        }
        this._inviteAlert.move((Laya.stage.width - this._inviteAlert.width) >> 1, (Laya.stage.height - this._inviteAlert.height) >> 1, this);
        this._inviteAlert.showCode(GameHandler.create(this, this.onCodeAlert));
      } else {
        this.onCodeAlert('');
      }
    };

    __proto.onCodeAlert = function (code) {
      if (this._socketError && !GameConfig.socket.connected) {
        this.showNotice('角色正在存档退出，请稍后重新登录');
        return;
      }
      LoginRoleManager.ins.inviteCode = code;
      LoginRoleManager.ins.beginGame();
      Laya.workerTimer.clear(this, this.delayBeginGame);
      this.showNotice('进入游戏中，请稍等...');
    };

    __proto.onPlayerExiting = function () {
      this._socketError = true;
      this.showNotice('角色正在存档退出，稍后为您重新登录');
      Laya.workerTimer.once(3000, this, this.delayBeginGame);
    };

    __proto.delayBeginGame = function () {
      if (GameConfig.socket.connected) {
        console.log('socket连接成功，自动进入游戏！');
        LoginRoleManager.ins.beginGame();
        Laya.workerTimer.clear(this, this.delayBeginGame);
      } else {
        console.log('socket连接断开，等待3秒后再次自动进入游戏');
        Laya.workerTimer.once(3000, this, this.delayBeginGame);
      }
    };

    __proto.resetTime = function () {
      this._time = this.COUNT_DWON_TIME + this.RECOVER_TIME;
    };

    __proto.onShowVip = function () {
      SoundManager.playSound(this._vipUrl);
      this._delayVip = true;
      this.playVipEffect(true);
    };

    __proto.playVipEffect = function (value) {
      if (value && this._delayVip) {
        if (!this._vipEffect) {
          this._vipEffect = new Animation();
          this._vipEffect.source = GameConfig.getProResPath('create/GiveMoneyArrow.ani');
          this._vipEffect.move(850, 105, this._view.bg_bottom);
        }
        if (!this._vipEffect.isPlaying) {
          this._vipEffect.play();
        }
        if (!this._vipEffect.parent) {
          this.addChild(this._vipEffect);
        }
      } else {
        if (this._vipEffect) {
          this._vipEffect.stop();
          this._vipEffect.removeSelf();
        }
      }
    };

    __proto.getBgPath = function () {
      return GameConfig.getProResPath('v3/loginbg.jpg');
    };

    __proto.bgToCenter = function () {
      if (this._bg != null && this.stage != null) {
        this._bg.x = (Laya.stage.width - this._bg.width) >> 1;
        this._bg.y = (Laya.stage.height - this._bg.height) >> 1;
        console.log('bg.y = ' + this._bg.y);
        if (this._bg.y > 0) {
          this._bg.y = 0;
        }
      }
    };

    __proto.resize = function () {
      if (this._bg) {
        this.bgToCenter();
      }
      this.resetPlace(this._view.bg_bottom, 960, 913);
      this.resetPlace(this._view.imgDes, 1518, 400);
      this.resetPlace(this._view.imgBody, 1018, 513);
      this.resetPlace(this._view.bg_top, 960, 87);
      this.resetPlace(this._view.btn_exit, 242, 126);
      this.resetPlace(this._view.notice_txt, 960, 609);
      this._view.btn_create.x = (425 / 1920) * Laya.stage.width;
      this._view.chooseList.x = (425 / 1920) * Laya.stage.width;
      this._namePanel.move((Laya.stage.width - this._namePanel.width) >> 1, this._view.bg_bottom.y - this._namePanel.height);
      if (this._alert) {
        this._alert.move((Laya.stage.width - this._alert.width) >> 1, (Laya.stage.height - this._alert.height) >> 1, this);
      }
      if (this._inviteAlert) {
        this._inviteAlert.move((Laya.stage.width - this._inviteAlert.width) >> 1, (Laya.stage.height - this._inviteAlert.height) >> 1, this);
      }
    };

    __proto.resetPlace = function (target, tx, ty) {
      target.move(((tx / 1920) * Laya.stage.width) >> 0, (((ty / 1080) * Laya.stage.height) >> 0) - GameConfig.TX_BOTTOM_INFO_HEIGHT);
    };

    return CreatePlayerPanel_v3;
  })(LoginBasePanel);

  /**
   *创角-场景特效
   *@author zq
   *创建时间：2024年5月8日11:08:55
   */
  //class login.view.create.CreateSceneEffect extends laya.ui.Image
  var CreateSceneEffect = (function (_super) {
    function CreateSceneEffect(url, frameCount) {
      // private var _image:Image;
      this._url = null;
      this._urls = null;
      this._frameCount = 0;
      this._index = 0;
      this._playing = false;
      this._loadFinish = false;
      this._delayPlay = false;
      CreateSceneEffect.__super.call(this);
      this._url = url;
      this._frameCount = frameCount;
      this.anchorX = 0.5;
      this.anchorY = 0.5;
      this._urls = [];
      for (var i = 0; i < this._frameCount; i++) {
        this._urls.push(GameConfig.getProResPath(this._url + '/' + i + '.png'));
      }
      Laya.loader.load(this._urls, Handler.create(this, this.onComplete), null, 'image', 1, true, this._group);
    }

    __class(CreateSceneEffect, 'login.view.create.CreateSceneEffect', _super);
    var __proto = CreateSceneEffect.prototype;
    __proto.onComplete = function () {
      this._loadFinish = true;
      if (this._delayPlay) {
        this._delayPlay = false;
        this.play();
      }
    };

    __proto.play = function () {
      if (!this._playing) {
        if (this._loadFinish) {
          this._playing = true;
          Laya.workerTimer.loop(100, this, this.onLoop);
          this.onLoop();
        } else {
          this._delayPlay = true;
        }
      }
    };

    __proto.stop = function () {
      if (this._playing) {
        this._playing = false;
        Laya.workerTimer.clear(this, this.onLoop);
      }
    };

    __proto.onLoop = function () {
      var path = this._urls[this._index];
      this._index++;
      if (this._index >= this._frameCount) {
        this._index = 0;
      }
      this.skin = path;
    };

    __proto.destroy = function (destroyChild) {
      destroyChild === void 0 && (destroyChild = true);
      this._playing = false;
      Laya.workerTimer.clear(this, this.onLoop);
      for (var i = 0; i < this._urls.length; i++) {
        FLoader.clearRes(this._urls[i]);
      }
      _super.prototype.destroy.call(this);
    };

    return CreateSceneEffect;
  })(Image);

  //class login.loginui.mobile.CreateAlertUI extends laya.ui.View
  var CreateAlertUI = (function (_super) {
    function CreateAlertUI() {
      this.bg = null;
      this.btn_sure = null;
      this.btn_cancel = null;
      this.msg_txt1 = null;
      this.msg_txt2 = null;
      CreateAlertUI.__super.call(this);
    }

    __class(CreateAlertUI, 'login.loginui.mobile.CreateAlertUI', _super);
    var __proto = CreateAlertUI.prototype;
    __proto.createChildren = function () {
      laya.ui.Component.prototype.createChildren.call(this);
      this.createView(CreateAlertUI.uiView);
    };

    CreateAlertUI.uiView = {
      type: 'View',
      props: { width: 383, height: 254 },
      child: [
        { type: 'Image', props: { width: 383, var: 'bg', height: 254 } },
        {
          type: 'Button',
          props: {
            y: 192,
            x: 223,
            var: 'btn_sure',
            stateNum: 1,
            labelStrokeColor: '#000000',
            labelSize: 18,
            labelColors: '#d4c4aa,#d4c4aa,#d4c4aa',
            label: '删 除'
          }
        },
        {
          type: 'Button',
          props: {
            y: 192,
            x: 46,
            var: 'btn_cancel',
            stateNum: 1,
            labelSize: 18,
            labelColors: '#dbca35,#dbca35,#dbca35',
            label: '取 消'
          }
        },
        {
          type: 'Label',
          props: {
            y: 9,
            x: 58,
            width: 266,
            text: '提示',
            strokeColor: '#000000',
            stroke: 1,
            height: 18,
            fontSize: 18,
            color: '#dbca35',
            align: 'center'
          }
        },
        {
          type: 'Label',
          props: {
            y: 75,
            x: 0,
            width: 383,
            var: 'msg_txt1',
            text: '角色一旦删除后不可恢复，是否确定删除？',
            strokeColor: '#000000',
            stroke: 1,
            height: 18,
            fontSize: 18,
            color: '#FF0000',
            align: 'center'
          }
        },
        {
          type: 'Label',
          props: {
            y: 98,
            width: 383,
            var: 'msg_txt2',
            text: '(3天内可撤销删除，3天后角色自动删除)',
            strokeColor: '#000000',
            stroke: 1,
            height: 18,
            fontSize: 18,
            color: '#50ade0',
            align: 'center'
          }
        }
      ]
    };
    return CreateAlertUI;
  })(View);

  //class login.loginui.mobile.CreateInviteCodeAlertUI extends laya.ui.View
  var CreateInviteCodeAlertUI = (function (_super) {
    function CreateInviteCodeAlertUI() {
      this.bg = null;
      this.btn_sure = null;
      this.btn_cancel = null;
      this.bg_input = null;
      this.input_txt = null;
      this.msg_txt1 = null;
      this.error_txt = null;
      CreateInviteCodeAlertUI.__super.call(this);
    }

    __class(CreateInviteCodeAlertUI, 'login.loginui.mobile.CreateInviteCodeAlertUI', _super);
    var __proto = CreateInviteCodeAlertUI.prototype;
    __proto.createChildren = function () {
      laya.ui.Component.prototype.createChildren.call(this);
      this.createView(CreateInviteCodeAlertUI.uiView);
    };

    CreateInviteCodeAlertUI.uiView = {
      type: 'View',
      props: { width: 383, height: 254 },
      child: [
        { type: 'Image', props: { width: 383, var: 'bg', height: 254 } },
        {
          type: 'Button',
          props: {
            y: 192,
            x: 223,
            var: 'btn_sure',
            stateNum: 1,
            labelStrokeColor: '#000000',
            labelSize: 18,
            labelColors: '#d4c4aa,#d4c4aa,#d4c4aa',
            label: '确 定'
          }
        },
        {
          type: 'Button',
          props: {
            y: 192,
            x: 46,
            var: 'btn_cancel',
            stateNum: 1,
            labelSize: 18,
            labelColors: '#dbca35,#dbca35,#dbca35',
            label: '取 消'
          }
        },
        {
          type: 'Image',
          props: {
            y: 109,
            x: 51,
            width: 280,
            var: 'bg_input',
            sizeGrid: '5,5,5,5',
            height: 29
          }
        },
        {
          type: 'TextInput',
          props: {
            y: 111,
            x: 61,
            width: 259,
            var: 'input_txt',
            height: 24,
            fontSize: 16,
            color: '#FFE9C2',
            align: 'center'
          }
        },
        {
          type: 'Label',
          props: {
            y: 9,
            x: 58,
            width: 266,
            text: '提示',
            strokeColor: '#000000',
            stroke: 1,
            height: 18,
            fontSize: 18,
            color: '#dbca35',
            align: 'center'
          }
        },
        {
          type: 'Label',
          props: {
            y: 75,
            x: 0,
            width: 383,
            var: 'msg_txt1',
            text: '使用本服邀请码后，方可创建角色',
            strokeColor: '#000000',
            stroke: 1,
            height: 18,
            fontSize: 18,
            color: '#FFFFFE',
            align: 'center'
          }
        },
        {
          type: 'Label',
          props: {
            y: 150,
            x: 0,
            width: 383,
            var: 'error_txt',
            strokeColor: '#000000',
            stroke: 1,
            height: 18,
            fontSize: 18,
            color: '#FF0000',
            align: 'center'
          }
        }
      ]
    };
    return CreateInviteCodeAlertUI;
  })(View);

  //class login.loginui.mobile.v1.CreateBottomBarUI extends laya.ui.View
  var CreateBottomBarUI = (function (_super) {
    function CreateBottomBarUI() {
      this.bottom_center = null;
      this.bottom_bg = null;
      this.login_btn = null;
      this.time_box = null;
      this.time_txt = null;
      this.click_guide = null;
      this.ge = null;
      this.b_dragon = null;
      this.b_left = null;
      this.b_right = null;
      this.bottom_left = null;
      this.lv_bg1 = null;
      this.lv_txt1 = null;
      this.name_txt1 = null;
      this.job_txt1 = null;
      this.bottom_right = null;
      this.lv_bg2 = null;
      this.lv_txt2 = null;
      this.name_txt2 = null;
      this.job_txt2 = null;
      this.wen_left = null;
      this.wen_right = null;
      this.btn_create = null;
      this.max_txt = null;
      this.btn_delete = null;
      this.del_txt = null;
      this.btn_back = null;
      this.version_txt = null;
      CreateBottomBarUI.__super.call(this);
    }

    __class(CreateBottomBarUI, 'login.loginui.mobile.v1.CreateBottomBarUI', _super);
    var __proto = CreateBottomBarUI.prototype;
    __proto.createChildren = function () {
      laya.ui.Component.prototype.createChildren.call(this);
      this.createView(CreateBottomBarUI.uiView);
    };

    CreateBottomBarUI.uiView = {
      type: 'View',
      props: { width: 1920, height: 181 },
      child: [
        {
          type: 'Box',
          props: { y: 0, x: 0, width: 1920, var: 'bottom_center', height: 181 },
          child: [
            {
              type: 'Image',
              props: { y: 0, x: 0, width: 1920, var: 'bottom_bg', height: 181 }
            },
            {
              type: 'Button',
              props: {
                y: 146,
                x: 965,
                var: 'login_btn',
                stateNum: 1,
                skin: 'mobile/CreatePanel1/btn_login.png',
                pivotY: 28,
                pivotX: 78
              }
            },
            {
              type: 'Box',
              props: { y: -30, x: 831, var: 'time_box' },
              child: [
                {
                  type: 'Image',
                  props: {
                    y: 0,
                    x: 0,
                    width: 270,
                    skin: 'mobile/CreatePanel1/border.png',
                    sizeGrid: '0,14,0,14',
                    height: 24
                  }
                },
                {
                  type: 'Label',
                  props: {
                    y: 3,
                    x: 2,
                    width: 266,
                    var: 'time_txt',
                    text: '游戏将在15S后自动为您创造角色',
                    stroke: 0,
                    height: 18,
                    fontSize: 18,
                    color: '#FF0000',
                    align: 'center'
                  }
                }
              ]
            },
            {
              type: 'Image',
              props: {
                y: -75,
                x: 682,
                var: 'click_guide',
                skin: 'mobile/CreatePanel1/clickguide.png'
              },
              child: [
                {
                  type: 'Clip',
                  props: {
                    y: 2,
                    x: 520,
                    var: 'ge',
                    skin: 'mobile/CreatePanel1/clip_num.png',
                    index: 0,
                    clipX: 10
                  }
                }
              ]
            },
            { type: 'Image', props: { y: -1, x: 810, var: 'b_dragon' } },
            { type: 'Image', props: { y: 61, x: 0, var: 'b_left' } },
            {
              type: 'Image',
              props: { y: 61, x: 1920, var: 'b_right', scaleX: -1 }
            }
          ]
        },
        {
          type: 'Box',
          props: { y: 95, x: 175, var: 'bottom_left' },
          child: [
            {
              type: 'Image',
              props: { y: 2, skin: 'mobile/CreatePanel1/name.png' }
            },
            {
              type: 'Image',
              props: { y: 2, x: 213, skin: 'mobile/CreatePanel1/job.png' }
            },
            {
              type: 'Image',
              props: {
                x: 55,
                width: 158,
                skin: 'mobile/CreatePanel1/border.png',
                sizeGrid: '0,14,0,14',
                height: 29
              }
            },
            {
              type: 'Image',
              props: {
                x: 268,
                width: 74,
                skin: 'mobile/CreatePanel1/border.png',
                sizeGrid: '0,14,0,14',
                height: 29
              }
            },
            {
              type: 'Image',
              props: {
                y: 0,
                x: 399,
                width: 158,
                var: 'lv_bg1',
                skin: 'mobile/CreatePanel1/border.png',
                sizeGrid: '0,14,0,14',
                height: 29
              },
              child: [
                {
                  type: 'Image',
                  props: { y: 2, x: -55, skin: 'mobile/CreatePanel1/lv.png' }
                },
                {
                  type: 'Label',
                  props: {
                    y: 5,
                    x: 0,
                    width: 158,
                    var: 'lv_txt1',
                    strokeColor: '#000000',
                    stroke: 1,
                    height: 18,
                    fontSize: 18,
                    color: '#FFFF00',
                    align: 'center'
                  }
                }
              ]
            },
            {
              type: 'Label',
              props: {
                y: 5,
                x: 55,
                width: 158,
                var: 'name_txt1',
                strokeColor: '#000000',
                stroke: 1,
                height: 18,
                fontSize: 18,
                color: '#FFFF00',
                align: 'center'
              }
            },
            {
              type: 'Label',
              props: {
                y: 5,
                x: 270,
                width: 74,
                var: 'job_txt1',
                strokeColor: '#000000',
                stroke: 1,
                height: 18,
                fontSize: 18,
                color: '#FFFF00',
                align: 'center'
              }
            }
          ]
        },
        {
          type: 'Box',
          props: { y: 95, x: 1177, var: 'bottom_right' },
          child: [
            {
              type: 'Image',
              props: { y: 2, skin: 'mobile/CreatePanel1/name.png' }
            },
            {
              type: 'Image',
              props: { y: 2, x: 213, skin: 'mobile/CreatePanel1/job.png' }
            },
            {
              type: 'Image',
              props: {
                x: 55,
                width: 158,
                skin: 'mobile/CreatePanel1/border.png',
                sizeGrid: '0,14,0,14',
                height: 29
              }
            },
            {
              type: 'Image',
              props: {
                x: 268,
                width: 74,
                skin: 'mobile/CreatePanel1/border.png',
                sizeGrid: '0,14,0,14',
                height: 29
              }
            },
            {
              type: 'Image',
              props: {
                y: 0,
                x: 399,
                width: 158,
                var: 'lv_bg2',
                skin: 'mobile/CreatePanel1/border.png',
                sizeGrid: '0,14,0,14',
                height: 29
              },
              child: [
                {
                  type: 'Image',
                  props: { y: 2, x: -55, skin: 'mobile/CreatePanel1/lv.png' }
                },
                {
                  type: 'Label',
                  props: {
                    y: 5,
                    x: 0,
                    width: 158,
                    var: 'lv_txt2',
                    strokeColor: '#000000',
                    stroke: 1,
                    height: 18,
                    fontSize: 18,
                    color: '#FFFF00',
                    align: 'center'
                  }
                }
              ]
            },
            {
              type: 'Label',
              props: {
                y: 5,
                x: 55,
                width: 158,
                var: 'name_txt2',
                strokeColor: '#000000',
                stroke: 1,
                height: 18,
                fontSize: 18,
                color: '#FFFF00',
                align: 'center'
              }
            },
            {
              type: 'Label',
              props: {
                y: 5,
                x: 270,
                width: 74,
                var: 'job_txt2',
                strokeColor: '#000000',
                stroke: 1,
                height: 18,
                fontSize: 18,
                color: '#FFFF00',
                align: 'center'
              }
            }
          ]
        },
        {
          type: 'Image',
          props: { y: -12, x: 152, var: 'wen_left', scaleX: -1 }
        },
        { type: 'Image', props: { y: -12, x: 1768, var: 'wen_right' } },
        {
          type: 'Button',
          props: {
            y: -89,
            x: 1822,
            var: 'btn_create',
            stateNum: 1,
            skin: 'mobile/CreatePanel1/btn_create.png',
            anchorY: 0.5,
            anchorX: 0.5
          },
          child: [
            {
              type: 'Label',
              props: {
                y: -28,
                x: 7,
                var: 'max_txt',
                text: '角色个数已达上限！',
                strokeColor: '#000000',
                stroke: 1,
                fontSize: 18,
                color: '#FF0000',
                align: 'center'
              }
            }
          ]
        },
        {
          type: 'Button',
          props: {
            y: -175,
            x: 1822,
            var: 'btn_delete',
            stateNum: 1,
            skin: 'mobile/CreatePanel1/btn_del.png',
            anchorY: 0.5,
            anchorX: 0.5
          },
          child: [
            {
              type: 'Label',
              props: {
                y: -28,
                x: -13,
                var: 'del_txt',
                text: '该角色已处于删除状态！',
                strokeColor: '#000000',
                stroke: 1,
                fontSize: 18,
                color: '#FF0000',
                align: 'center'
              }
            }
          ]
        },
        {
          type: 'Button',
          props: {
            y: -93,
            x: 97,
            var: 'btn_back',
            stateNum: 1,
            skin: 'mobile/CreatePanel1/btn_exit.png',
            anchorY: 0.5,
            anchorX: 0.5
          }
        },
        {
          type: 'Label',
          props: {
            y: -146,
            x: 18,
            width: 180,
            var: 'version_txt',
            strokeColor: '#000000',
            stroke: 2,
            height: 18,
            fontSize: 16,
            color: '#cdcdcb',
            align: 'right'
          }
        }
      ]
    };
    return CreateBottomBarUI;
  })(View);

  //class login.loginui.mobile.v1.CreateChooseRoleItemUI extends laya.ui.View
  var CreateChooseRoleItemUI = (function (_super) {
    function CreateChooseRoleItemUI() {
      this.bg = null;
      this.bg_des = null;
      this.des_txt = null;
      this.bg_name = null;
      this.name_txt = null;
      CreateChooseRoleItemUI.__super.call(this);
    }

    __class(CreateChooseRoleItemUI, 'login.loginui.mobile.v1.CreateChooseRoleItemUI', _super);
    var __proto = CreateChooseRoleItemUI.prototype;
    __proto.createChildren = function () {
      laya.ui.Component.prototype.createChildren.call(this);
      this.createView(CreateChooseRoleItemUI.uiView);
    };

    CreateChooseRoleItemUI.uiView = {
      type: 'View',
      props: { width: 110, height: 240 },
      child: [
        {
          type: 'Image',
          props: {
            y: 240,
            x: 55,
            var: 'bg',
            skin: 'mobile/CreatePanel1/bg_player_big.png',
            anchorX: 0.5
          }
        },
        {
          type: 'Image',
          props: {
            y: -65,
            x: -80,
            width: 270,
            var: 'bg_des',
            skin: 'mobile/CreatePanel1/border.png',
            sizeGrid: '0,14,0,14',
            height: 24
          },
          child: [
            {
              type: 'Label',
              props: {
                y: 3,
                x: 2,
                width: 266,
                var: 'des_txt',
                text: '删除倒计时：1天23小时59分49秒',
                strokeColor: '#000000',
                stroke: 1,
                height: 18,
                fontSize: 18,
                color: '#FF0000',
                align: 'center'
              }
            }
          ]
        },
        {
          type: 'Image',
          props: {
            y: -35,
            x: -24,
            var: 'bg_name',
            skin: 'mobile/CreatePanel1/bg_name.png'
          },
          child: [
            {
              type: 'Label',
              props: {
                y: 4,
                x: -54,
                width: 266,
                var: 'name_txt',
                text: '玩家名字七个字',
                strokeColor: '#000000',
                stroke: 1,
                height: 18,
                fontSize: 18,
                color: '#FFFF00',
                align: 'center'
              }
            }
          ]
        }
      ]
    };
    return CreateChooseRoleItemUI;
  })(View);

  //class login.loginui.mobile.v1.NamePanelUI extends laya.ui.View
  var NamePanelUI = (function (_super) {
    function NamePanelUI() {
      this.name_bg = null;
      this.sex1 = null;
      this.sex2 = null;
      this.sex01 = null;
      this.sex02 = null;
      this.desc = null;
      this.job1 = null;
      this.job01 = null;
      this.job2 = null;
      this.job02 = null;
      this.job3 = null;
      this.job03 = null;
      this.name_txt = null;
      this.nameError_txt = null;
      this.ok_btn = null;
      this.close_btn = null;
      this.random_btn = null;
      NamePanelUI.__super.call(this);
    }

    __class(NamePanelUI, 'login.loginui.mobile.v1.NamePanelUI', _super);
    var __proto = NamePanelUI.prototype;
    __proto.createChildren = function () {
      laya.ui.Component.prototype.createChildren.call(this);
      this.createView(NamePanelUI.uiView);
    };

    NamePanelUI.uiView = {
      type: 'View',
      props: { width: 292, height: 462 },
      child: [
        {
          type: 'Image',
          props: {
            y: 0,
            x: 0,
            var: 'name_bg',
            skin: 'mobile/CreatePanel1/bg.png'
          }
        },
        {
          type: 'Image',
          props: {
            y: 109,
            x: 123,
            var: 'sex1',
            skin: 'mobile/CreatePanel1/sex1.png'
          }
        },
        {
          type: 'Image',
          props: {
            y: 109,
            x: 180,
            var: 'sex2',
            skin: 'mobile/CreatePanel1/sex2.png'
          }
        },
        {
          type: 'Image',
          props: {
            y: 109,
            x: 123,
            var: 'sex01',
            skin: 'mobile/CreatePanel1/sex01.png'
          }
        },
        {
          type: 'Image',
          props: {
            y: 109,
            x: 180,
            var: 'sex02',
            skin: 'mobile/CreatePanel1/sex02.png'
          }
        },
        {
          type: 'Image',
          props: {
            y: 320,
            x: 36,
            var: 'desc',
            skin: 'mobile/CreatePanel1/desc1.png'
          }
        },
        {
          type: 'Box',
          props: { y: 162, x: 124, var: 'job1' },
          child: [
            { type: 'Image', props: { skin: 'mobile/CreatePanel1/job1.png' } },
            {
              type: 'Image',
              props: { y: 8, x: 50, skin: 'mobile/CreatePanel1/font1.png' }
            }
          ]
        },
        {
          type: 'Box',
          props: { y: 162, x: 124, var: 'job01' },
          child: [
            { type: 'Image', props: { skin: 'mobile/CreatePanel1/job01.png' } },
            {
              type: 'Image',
              props: { y: 8, x: 50, skin: 'mobile/CreatePanel1/font01.png' }
            }
          ]
        },
        {
          type: 'Box',
          props: { y: 211, x: 124, var: 'job2' },
          child: [
            { type: 'Image', props: { skin: 'mobile/CreatePanel1/job2.png' } },
            {
              type: 'Image',
              props: { y: 8, x: 49, skin: 'mobile/CreatePanel1/font2.png' }
            }
          ]
        },
        {
          type: 'Box',
          props: { y: 211, x: 124, var: 'job02' },
          child: [
            { type: 'Image', props: { skin: 'mobile/CreatePanel1/job02.png' } },
            {
              type: 'Image',
              props: { y: 8, x: 49, skin: 'mobile/CreatePanel1/font02.png' }
            }
          ]
        },
        {
          type: 'Box',
          props: { y: 260, x: 124, var: 'job3' },
          child: [
            { type: 'Image', props: { skin: 'mobile/CreatePanel1/job3.png' } },
            {
              type: 'Image',
              props: { y: 8, x: 50, skin: 'mobile/CreatePanel1/font3.png' }
            }
          ]
        },
        {
          type: 'Box',
          props: { y: 260, x: 124, var: 'job03' },
          child: [
            { type: 'Image', props: { skin: 'mobile/CreatePanel1/job03.png' } },
            {
              type: 'Image',
              props: { y: 8, x: 50, skin: 'mobile/CreatePanel1/font03.png' }
            }
          ]
        },
        {
          type: 'TextInput',
          props: {
            y: 76,
            x: 52,
            width: 150,
            var: 'name_txt',
            height: 24,
            fontSize: 16,
            color: '#FFE9C2',
            align: 'center'
          }
        },
        {
          type: 'Label',
          props: {
            y: 61,
            x: 16,
            width: 222,
            var: 'nameError_txt',
            strokeColor: '#000000',
            stroke: 1,
            height: 16,
            color: '#FF0000',
            align: 'center'
          }
        },
        {
          type: 'Button',
          props: {
            y: 421,
            x: 145,
            var: 'ok_btn',
            stateNum: 1,
            skin: 'mobile/CreatePanel1/btn_ok.png',
            pivotY: 21,
            pivotX: 58
          }
        },
        {
          type: 'Button',
          props: {
            y: 22,
            x: 269,
            var: 'close_btn',
            stateNum: 1,
            skin: 'mobile/CreatePanel1/btn_close.png',
            pivotY: 18,
            pivotX: 18
          }
        },
        {
          type: 'Button',
          props: {
            y: 88,
            x: 236,
            var: 'random_btn',
            stateNum: 1,
            skin: 'mobile/CreatePanel1/btn_name.png',
            pivotY: 18,
            pivotX: 18
          }
        }
      ]
    };
    return NamePanelUI;
  })(View);

  //class login.loginui.mobile.v2.CreateChooseRoleItem_v2UI extends laya.ui.View
  var CreateChooseRoleItem_v2UI = (function (_super) {
    function CreateChooseRoleItem_v2UI() {
      this.bg = null;
      this.imgSelected = null;
      this.imgHead = null;
      this.name_txt = null;
      this.job_txt = null;
      this.lv_txt = null;
      this.zs_txt = null;
      this.time_txt = null;
      CreateChooseRoleItem_v2UI.__super.call(this);
    }

    __class(CreateChooseRoleItem_v2UI, 'login.loginui.mobile.v2.CreateChooseRoleItem_v2UI', _super);
    var __proto = CreateChooseRoleItem_v2UI.prototype;
    __proto.createChildren = function () {
      laya.ui.Component.prototype.createChildren.call(this);
      this.createView(CreateChooseRoleItem_v2UI.uiView);
    };

    CreateChooseRoleItem_v2UI.uiView = {
      type: 'View',
      props: { width: 258, height: 112 },
      child: [
        {
          type: 'Image',
          props: {
            y: 0,
            x: 0,
            var: 'bg',
            skin: 'mobile/CreatePanel2/bg_player.png'
          }
        },
        {
          type: 'Image',
          props: {
            y: 22,
            x: 25,
            width: 68,
            var: 'imgSelected',
            skin: 'mobile/CreatePanel2/select.png',
            sizeGrid: '20,20,20,20',
            name: 'selectBox',
            height: 68
          }
        },
        {
          type: 'Image',
          props: {
            y: 25,
            x: 28,
            var: 'imgHead',
            skin: 'mobile/CreatePanel2/head_1_1.png'
          }
        },
        {
          type: 'Label',
          props: {
            y: 10,
            x: 105,
            var: 'name_txt',
            text: '姓名：枫红染秋季',
            strokeColor: '#000000',
            stroke: 1,
            fontSize: 16,
            color: '#FFFFFE'
          }
        },
        {
          type: 'Label',
          props: {
            y: 32,
            x: 105,
            var: 'job_txt',
            text: '职业：道士',
            strokeColor: '#000000',
            stroke: 1,
            fontSize: 16,
            color: '#FFFFFE'
          }
        },
        {
          type: 'Label',
          props: {
            y: 54,
            x: 105,
            var: 'lv_txt',
            text: '等级：1000级',
            strokeColor: '#000000',
            stroke: 1,
            fontSize: 16,
            color: '#FFFFFE'
          }
        },
        {
          type: 'Label',
          props: {
            y: 75,
            x: 105,
            var: 'zs_txt',
            text: '转生：100转',
            strokeColor: '#000000',
            stroke: 1,
            fontSize: 16,
            color: '#FFFFFE'
          }
        },
        {
          type: 'Label',
          props: {
            y: 94,
            x: 22,
            var: 'time_txt',
            text: '删除倒计时：1天23小时59分49秒',
            strokeColor: '#000000',
            stroke: 1,
            fontSize: 16,
            color: '#FF0000'
          }
        }
      ]
    };
    return CreateChooseRoleItem_v2UI;
  })(View);

  //class login.loginui.mobile.v2.CreatePlayerPanel_v2UI extends laya.ui.View
  var CreatePlayerPanel_v2UI = (function (_super) {
    function CreatePlayerPanel_v2UI() {
      this.avatarNode = null;
      this.chooseList = null;
      this.notice_txt = null;
      this.version_txt = null;
      this.bg2 = null;
      this.btn_start = null;
      this.imgVip = null;
      this.btn_create = null;
      this.btn_del = null;
      this.btn_regain = null;
      this.btn_exit = null;
      CreatePlayerPanel_v2UI.__super.call(this);
    }

    __class(CreatePlayerPanel_v2UI, 'login.loginui.mobile.v2.CreatePlayerPanel_v2UI', _super);
    var __proto = CreatePlayerPanel_v2UI.prototype;
    __proto.createChildren = function () {
      laya.ui.Component.prototype.createChildren.call(this);
      this.createView(CreatePlayerPanel_v2UI.uiView);
    };

    CreatePlayerPanel_v2UI.uiView = {
      type: 'View',
      props: {
        y: 360,
        x: 695,
        width: 1390,
        height: 720,
        anchorY: 0.5,
        anchorX: 0.5
      },
      child: [
        {
          type: 'Box',
          props: { y: 235, x: 640, width: 110, var: 'avatarNode', height: 240 }
        },
        {
          type: 'List',
          props: {
            y: 130,
            x: 953,
            width: 323,
            var: 'chooseList',
            vScrollBarSkin: 'mobile/CreatePanel2/vscroll_2.png',
            spaceY: 20,
            height: 380
          }
        },
        {
          type: 'Label',
          props: {
            y: 352,
            x: 395,
            width: 600,
            var: 'notice_txt',
            strokeColor: '#000000',
            stroke: 2,
            height: 18,
            fontSize: 18,
            color: '#FF0000',
            align: 'center'
          }
        },
        {
          type: 'Label',
          props: {
            y: 10,
            x: 620,
            width: 600,
            var: 'version_txt',
            strokeColor: '#000000',
            stroke: 1,
            height: 18,
            fontSize: 14,
            color: '#cdcdcb',
            align: 'right'
          }
        },
        {
          type: 'Image',
          props: {
            y: 583,
            x: 119,
            width: 1152,
            var: 'bg2',
            sizeGrid: '100,100,100,100',
            height: 137
          }
        },
        {
          type: 'Button',
          props: {
            y: 647,
            x: 695,
            var: 'btn_start',
            stateNum: 3,
            skin: 'mobile/CreatePanel2/btn_start.png',
            anchorY: 0.5,
            anchorX: 0.5
          }
        },
        {
          type: 'Image',
          props: {
            y: 557,
            x: 591,
            var: 'imgVip',
            skin: 'mobile/CreatePanel2/xcx.png',
            scaleY: 0.75,
            scaleX: 0.75
          }
        },
        {
          type: 'Button',
          props: {
            y: 670,
            x: 262,
            var: 'btn_create',
            stateNum: 1,
            skin: 'mobile/CreatePanel2/btn_1.png',
            anchorY: 0.5,
            anchorX: 0.5
          },
          child: [
            {
              type: 'Image',
              props: {
                y: 10,
                x: 48,
                skin: 'mobile/CreatePanel2/txt_create.png'
              }
            }
          ]
        },
        {
          type: 'Button',
          props: {
            y: 670,
            x: 928,
            var: 'btn_del',
            stateNum: 1,
            skin: 'mobile/CreatePanel2/btn_1.png',
            anchorY: 0.5,
            anchorX: 0.5
          },
          child: [
            {
              type: 'Image',
              props: { y: 11, x: 49, skin: 'mobile/CreatePanel2/txt_del.png' }
            }
          ]
        },
        {
          type: 'Button',
          props: {
            y: 670,
            x: 462,
            var: 'btn_regain',
            stateNum: 1,
            skin: 'mobile/CreatePanel2/btn_1.png',
            anchorY: 0.5,
            anchorX: 0.5
          },
          child: [
            {
              type: 'Image',
              props: {
                y: 11,
                x: 49,
                skin: 'mobile/CreatePanel2/txt_regain.png'
              }
            }
          ]
        },
        {
          type: 'Button',
          props: {
            y: 670,
            x: 1128,
            var: 'btn_exit',
            stateNum: 1,
            skin: 'mobile/CreatePanel2/btn_1.png',
            anchorY: 0.5,
            anchorX: 0.5
          },
          child: [
            {
              type: 'Image',
              props: { y: 11, x: 49, skin: 'mobile/CreatePanel2/txt_exit.png' }
            }
          ]
        }
      ]
    };
    return CreatePlayerPanel_v2UI;
  })(View);

  //class login.loginui.mobile.v2.NamePanel_v2UI extends laya.ui.View
  var NamePanel_v2UI = (function (_super) {
    function NamePanel_v2UI() {
      this.bg = null;
      this.btn_close = null;
      this.input_txt = null;
      this.imgHead = null;
      this.zs_on = null;
      this.zs_off = null;
      this.fs_on = null;
      this.fs_off = null;
      this.ds_on = null;
      this.ds_off = null;
      this.btn_sure = null;
      this.imgDesc = null;
      this.btn_name = null;
      this.girl_off = null;
      this.girl_on = null;
      this.boy_off = null;
      this.boy_on = null;
      NamePanel_v2UI.__super.call(this);
    }

    __class(NamePanel_v2UI, 'login.loginui.mobile.v2.NamePanel_v2UI', _super);
    var __proto = NamePanel_v2UI.prototype;
    __proto.createChildren = function () {
      laya.ui.Component.prototype.createChildren.call(this);
      this.createView(NamePanel_v2UI.uiView);
    };

    NamePanel_v2UI.uiView = {
      type: 'View',
      props: { width: 258, height: 490 },
      child: [
        {
          type: 'Image',
          props: {
            y: 0,
            x: 4,
            var: 'bg',
            skin: 'mobile/CreatePanel2/bg_name.png'
          }
        },
        {
          type: 'Button',
          props: {
            y: 20,
            x: 234,
            var: 'btn_close',
            stateNum: 1,
            skin: 'mobile/CreatePanel2/btn_close.png',
            anchorY: 0.5,
            anchorX: 0.5
          }
        },
        {
          type: 'TextInput',
          props: {
            y: 60,
            x: 91,
            width: 110,
            var: 'input_txt',
            height: 18,
            fontSize: 16,
            color: '#FFE9C2',
            align: 'left'
          }
        },
        {
          type: 'Image',
          props: { y: 60, x: 22, skin: 'mobile/CreatePanel2/txt_name.png' }
        },
        {
          type: 'Image',
          props: {
            y: 94,
            x: 95,
            var: 'imgHead',
            skin: 'mobile/CreatePanel2/head_1_1.png'
          }
        },
        {
          type: 'Image',
          props: {
            y: 175,
            x: 18,
            var: 'zs_on',
            skin: 'mobile/CreatePanel2/job1_on.png'
          }
        },
        {
          type: 'Image',
          props: {
            y: 179,
            x: 22,
            var: 'zs_off',
            skin: 'mobile/CreatePanel2/job1_off.jpg'
          }
        },
        {
          type: 'Image',
          props: {
            y: 175,
            x: 94,
            var: 'fs_on',
            skin: 'mobile/CreatePanel2/job2_on.png'
          }
        },
        {
          type: 'Image',
          props: {
            y: 179,
            x: 98,
            var: 'fs_off',
            skin: 'mobile/CreatePanel2/job2_off.jpg'
          }
        },
        {
          type: 'Image',
          props: {
            y: 175,
            x: 170,
            var: 'ds_on',
            skin: 'mobile/CreatePanel2/job3_on.png'
          }
        },
        {
          type: 'Image',
          props: {
            y: 179,
            x: 174,
            var: 'ds_off',
            skin: 'mobile/CreatePanel2/job3_off.jpg'
          }
        },
        {
          type: 'Image',
          props: { y: 250, x: 28, skin: 'mobile/CreatePanel2/txt_job1.png' }
        },
        {
          type: 'Image',
          props: { y: 250, x: 104, skin: 'mobile/CreatePanel2/txt_job2.png' }
        },
        {
          type: 'Image',
          props: { y: 250, x: 180, skin: 'mobile/CreatePanel2/txt_job3.png' }
        },
        {
          type: 'Button',
          props: {
            y: 455,
            x: 129,
            var: 'btn_sure',
            stateNum: 1,
            skin: 'mobile/CreatePanel2/btn_2.png',
            labelSize: 16,
            label: '确  定',
            anchorY: 0.5,
            anchorX: 0.5
          }
        },
        {
          type: 'Image',
          props: {
            y: 356,
            x: 17,
            var: 'imgDesc',
            skin: 'mobile/CreatePanel2/desc1.png'
          }
        },
        {
          type: 'Button',
          props: {
            y: 51,
            x: 205,
            var: 'btn_name',
            stateNum: 3,
            skin: 'mobile/CreatePanel2/btn_name.png'
          }
        },
        {
          type: 'Image',
          props: {
            y: 286,
            x: 147,
            var: 'girl_off',
            skin: 'mobile/CreatePanel2/sex2_off.png'
          }
        },
        {
          type: 'Image',
          props: {
            y: 286,
            x: 147,
            var: 'girl_on',
            skin: 'mobile/CreatePanel2/sex2_on.png'
          }
        },
        {
          type: 'Image',
          props: {
            y: 310,
            x: 82,
            var: 'boy_off',
            skin: 'mobile/CreatePanel2/sex1_off.png',
            anchorY: 0.5,
            anchorX: 0.5
          }
        },
        {
          type: 'Image',
          props: {
            y: 310,
            x: 82,
            var: 'boy_on',
            skin: 'mobile/CreatePanel2/sex1_on.png',
            anchorY: 0.5,
            anchorX: 0.5
          }
        }
      ]
    };
    return NamePanel_v2UI;
  })(View);

  //class login.loginui.mobile.v3.CreateChooseRoleItem_v3UI extends laya.ui.View
  var CreateChooseRoleItem_v3UI = (function (_super) {
    function CreateChooseRoleItem_v3UI() {
      this.btn_del = null;
      this.imgHead = null;
      this.name_txt = null;
      this.lv_txt = null;
      this.time_txt = null;
      CreateChooseRoleItem_v3UI.__super.call(this);
    }

    __class(CreateChooseRoleItem_v3UI, 'login.loginui.mobile.v3.CreateChooseRoleItem_v3UI', _super);
    var __proto = CreateChooseRoleItem_v3UI.prototype;
    __proto.createChildren = function () {
      laya.ui.Component.prototype.createChildren.call(this);
      this.createView(CreateChooseRoleItem_v3UI.uiView);
    };

    CreateChooseRoleItem_v3UI.uiView = {
      type: 'View',
      props: { width: 370, height: 146 },
      child: [
        {
          type: 'Image',
          props: { y: 0, x: 0, skin: 'mobile/CreatePanel3/bg_choose.png' }
        },
        {
          type: 'Button',
          props: {
            y: 4,
            x: 306,
            var: 'btn_del',
            stateNum: 1,
            skin: 'mobile/CreatePanel3/btn_close.png'
          }
        },
        {
          type: 'Image',
          props: {
            y: 72,
            x: 69,
            var: 'imgHead',
            skin: 'mobile/CreatePanel3/head_1_1_on.png',
            anchorY: 0.5,
            anchorX: 0.5
          }
        },
        {
          type: 'Label',
          props: {
            y: 47,
            x: 156,
            var: 'name_txt',
            strokeColor: '#000000',
            stroke: 1,
            fontSize: 20,
            color: '#FFFFFE'
          }
        },
        {
          type: 'Label',
          props: {
            y: 76,
            x: 156,
            var: 'lv_txt',
            strokeColor: '#000000',
            stroke: 1,
            fontSize: 20,
            color: '#FFFFFE'
          }
        },
        {
          type: 'Label',
          props: {
            y: 120,
            x: 121,
            var: 'time_txt',
            text: '删除倒计时：1天23小时59分49秒',
            strokeColor: '#000000',
            stroke: 1,
            fontSize: 16,
            color: '#FF0000'
          }
        }
      ]
    };
    return CreateChooseRoleItem_v3UI;
  })(View);

  //class login.loginui.mobile.v3.CreatePlayerPanel_v3UI extends laya.ui.View
  var CreatePlayerPanel_v3UI = (function (_super) {
    function CreatePlayerPanel_v3UI() {
      this.imgBody = null;
      this.bg_top = null;
      this.imgDes = null;
      this.btn_exit = null;
      this.notice_txt = null;
      this.version_txt = null;
      this.chooseList = null;
      this.btn_create = null;
      this.bg_bottom = null;
      this.btn_start = null;
      CreatePlayerPanel_v3UI.__super.call(this);
    }

    __class(CreatePlayerPanel_v3UI, 'login.loginui.mobile.v3.CreatePlayerPanel_v3UI', _super);
    var __proto = CreatePlayerPanel_v3UI.prototype;
    __proto.createChildren = function () {
      laya.ui.Component.prototype.createChildren.call(this);
      this.createView(CreatePlayerPanel_v3UI.uiView);
    };

    CreatePlayerPanel_v3UI.uiView = {
      type: 'View',
      props: { y: 0, x: 0, width: 1920, height: 1080 },
      child: [
        {
          type: 'Image',
          props: {
            y: 513,
            x: 1018,
            width: 837,
            var: 'imgBody',
            height: 807,
            anchorY: 0.5,
            anchorX: 0.5
          }
        },
        {
          type: 'Image',
          props: {
            y: 87,
            x: 960,
            var: 'bg_top',
            skin: 'mobile/CreatePanel3/bg_top_create.png',
            anchorY: 0.5,
            anchorX: 0.5
          }
        },
        {
          type: 'Image',
          props: {
            y: 400,
            x: 1517,
            var: 'imgDes',
            skin: 'mobile/CreatePanel3/desc_3.png',
            anchorY: 0.5,
            anchorX: 0.5
          }
        },
        {
          type: 'Button',
          props: {
            y: 126,
            x: 242,
            var: 'btn_exit',
            stateNum: 1,
            skin: 'mobile/CreatePanel3/btn_back.png',
            anchorY: 0.5,
            anchorX: 0.5
          }
        },
        {
          type: 'Label',
          props: {
            y: 609,
            x: 960,
            width: 600,
            var: 'notice_txt',
            strokeColor: '#000000',
            stroke: 2,
            height: 18,
            fontSize: 18,
            color: '#FF0000',
            anchorY: 0.5,
            anchorX: 0.5,
            align: 'center'
          }
        },
        {
          type: 'Label',
          props: {
            y: 10,
            x: 1273,
            width: 600,
            var: 'version_txt',
            strokeColor: '#000000',
            stroke: 1,
            height: 18,
            fontSize: 14,
            color: '#cdcdcb',
            align: 'right'
          }
        },
        {
          type: 'List',
          props: {
            y: 230,
            x: 425,
            width: 370,
            var: 'chooseList',
            vScrollBarSkin: 'mobile/CreatePanel3/vscroll_4.png',
            spaceY: 20,
            height: 380,
            anchorX: 0.5
          }
        },
        {
          type: 'Button',
          props: {
            y: 230,
            x: 425,
            var: 'btn_create',
            stateNum: 1,
            skin: 'mobile/CreatePanel3/btn_create.png',
            anchorX: 0.5
          }
        },
        {
          type: 'Image',
          props: {
            y: 913,
            x: 960,
            width: 1445,
            var: 'bg_bottom',
            height: 205,
            anchorY: 0.5,
            anchorX: 0.5
          },
          child: [
            {
              type: 'Button',
              props: {
                y: 138,
                x: 723,
                var: 'btn_start',
                stateNum: 1,
                skin: 'mobile/CreatePanel3/btn_start.png',
                anchorY: 0.5,
                anchorX: 0.5
              }
            }
          ]
        }
      ]
    };
    return CreatePlayerPanel_v3UI;
  })(View);

  //class login.loginui.mobile.v3.NamePanel_v3UI extends laya.ui.View
  var NamePanel_v3UI = (function (_super) {
    function NamePanel_v3UI() {
      this.bg_head_bar = null;
      this.bg_head_1_1 = null;
      this.bg_head_2_1 = null;
      this.bg_head_3_1 = null;
      this.bg_head_1_2 = null;
      this.bg_head_2_2 = null;
      this.bg_head_3_2 = null;
      this.head_1_1 = null;
      this.head_2_1 = null;
      this.head_3_1 = null;
      this.head_1_2 = null;
      this.head_2_2 = null;
      this.head_3_2 = null;
      this.bg_input = null;
      this.btn_name = null;
      this.input_txt = null;
      NamePanel_v3UI.__super.call(this);
    }

    __class(NamePanel_v3UI, 'login.loginui.mobile.v3.NamePanel_v3UI', _super);
    var __proto = NamePanel_v3UI.prototype;
    __proto.createChildren = function () {
      laya.ui.Component.prototype.createChildren.call(this);
      this.createView(NamePanel_v3UI.uiView);
    };

    NamePanel_v3UI.uiView = {
      type: 'View',
      props: { width: 1307, height: 303 },
      child: [
        {
          type: 'Image',
          props: { y: 0, x: 0, width: 1307, var: 'bg_head_bar', height: 303 }
        },
        {
          type: 'Image',
          props: {
            y: 153,
            x: 191,
            var: 'bg_head_1_1',
            skin: 'mobile/CreatePanel3/bg_head_on.png',
            anchorY: 0.5,
            anchorX: 0.5
          }
        },
        {
          type: 'Image',
          props: {
            y: 153,
            x: 346,
            var: 'bg_head_2_1',
            skin: 'mobile/CreatePanel3/bg_head_off.png',
            anchorY: 0.5,
            anchorX: 0.5
          }
        },
        {
          type: 'Image',
          props: {
            y: 153,
            x: 502,
            var: 'bg_head_3_1',
            skin: 'mobile/CreatePanel3/bg_head_off.png',
            anchorY: 0.5,
            anchorX: 0.5
          }
        },
        {
          type: 'Image',
          props: {
            y: 153,
            x: 807,
            var: 'bg_head_1_2',
            skin: 'mobile/CreatePanel3/bg_head_off.png',
            anchorY: 0.5,
            anchorX: 0.5
          }
        },
        {
          type: 'Image',
          props: {
            y: 153,
            x: 964,
            var: 'bg_head_2_2',
            skin: 'mobile/CreatePanel3/bg_head_off.png',
            anchorY: 0.5,
            anchorX: 0.5
          }
        },
        {
          type: 'Image',
          props: {
            y: 153,
            x: 1120,
            var: 'bg_head_3_2',
            skin: 'mobile/CreatePanel3/bg_head_off.png',
            anchorY: 0.5,
            anchorX: 0.5
          }
        },
        {
          type: 'Image',
          props: {
            y: 150,
            x: 189,
            var: 'head_1_1',
            skin: 'mobile/CreatePanel3/head_1_1_on.png',
            anchorY: 0.5,
            anchorX: 0.5
          }
        },
        {
          type: 'Image',
          props: {
            y: 150,
            x: 344,
            var: 'head_2_1',
            skin: 'mobile/CreatePanel3/head_2_1_off.png',
            anchorY: 0.5,
            anchorX: 0.5
          }
        },
        {
          type: 'Image',
          props: {
            y: 150,
            x: 500,
            var: 'head_3_1',
            skin: 'mobile/CreatePanel3/head_3_1_off.png',
            anchorY: 0.5,
            anchorX: 0.5
          }
        },
        {
          type: 'Image',
          props: {
            y: 150,
            x: 806,
            var: 'head_1_2',
            skin: 'mobile/CreatePanel3/head_1_2_off.png',
            anchorY: 0.5,
            anchorX: 0.5
          }
        },
        {
          type: 'Image',
          props: {
            y: 150,
            x: 964,
            var: 'head_2_2',
            skin: 'mobile/CreatePanel3/head_2_2_off.png',
            anchorY: 0.5,
            anchorX: 0.5
          }
        },
        {
          type: 'Image',
          props: {
            y: 150,
            x: 1120,
            var: 'head_3_2',
            skin: 'mobile/CreatePanel3/head_3_2_off.png',
            anchorY: 0.5,
            anchorX: 0.5
          }
        },
        {
          type: 'Image',
          props: {
            y: 227,
            x: 521,
            var: 'bg_input',
            skin: 'mobile/CreatePanel3/bg_input.png'
          }
        },
        {
          type: 'Button',
          props: {
            y: 233,
            x: 717,
            var: 'btn_name',
            stateNum: 1,
            skin: 'mobile/CreatePanel3/btn_name.png'
          }
        },
        {
          type: 'TextInput',
          props: {
            y: 242,
            x: 562,
            width: 130,
            var: 'input_txt',
            height: 20,
            fontSize: 18,
            color: '#FFE9C2',
            align: 'left'
          }
        }
      ]
    };
    return NamePanel_v3UI;
  })(View);

  /**
   *创角-底部按钮区域
   *@author zq
   *创建时间：2024年5月10日20:46:19
   */
  //class login.view.create.CreateAlert extends login.loginui.mobile.CreateAlertUI
  var CreateAlert = (function (_super) {
    function CreateAlert(version) {
      this._time = 5;
      this._handler = null;
      CreateAlert.__super.call(this);
      this.bg.skin = GameConfig.getProResPath('create/CreatePanel1/alert.png');
      this.btn_sure.skin = 'mobile/CreatePanel' + version + '/btn_alert_sure.png';
      this.btn_cancel.skin = 'mobile/CreatePanel' + version + '/btn_alert_cancel.png';
      this.btn_sure.on('click', this, this.onSure);
      this.btn_cancel.on('click', this, this.onCancel);
    }

    __class(CreateAlert, 'login.view.create.CreateAlert', _super);
    var __proto = CreateAlert.prototype;
    __proto.destroy = function (destroyChild) {
      destroyChild === void 0 && (destroyChild = true);
      this.bg.skin = null;
      this.btn_sure.off('click', this, this.onSure);
      this.btn_cancel.off('click', this, this.onCancel);
      Laya.workerTimer.clear(this, this.onTimer);
      if (this._handler) {
        this._handler.dispose();
        this._handler = null;
      }
      laya.ui.View.prototype.destroy.call(this, destroyChild);
    };

    __proto.showDelete = function (okFun) {
      this._handler = okFun;
      this.msg_txt1.text = '角色一旦删除后不可恢复，是否确定删除？';
      this.msg_txt2.text = '(3天内可撤销删除，3天后角色自动删除)';
      this.btn_cancel.label = '取 消';
      this.btn_sure.label = '删 除';
      this.visible = true;
      this._time = 5;
      this.onTimer();
      Laya.workerTimer.loop(1000, this, this.onTimer);
    };

    __proto.showRegain = function (okFun) {
      this._handler = okFun;
      this.msg_txt1.text = '登录该角色将撤销角色删除';
      this.msg_txt2.text = '是否登录？';
      this.btn_cancel.label = '取 消';
      this.btn_sure.label = '确 定';
      this.visible = true;
      this._time = 0;
      Laya.workerTimer.clear(this, this.onTimer);
    };

    __proto.onSure = function (e) {
      if (this._time <= 0) {
        if (this._handler != null) {
          this._handler.run();
          this._handler.dispose();
          this._handler = null;
        }
        this.visible = false;
      }
    };

    __proto.onCancel = function (e) {
      this.visible = false;
    };

    __proto.onTimer = function () {
      this.btn_sure.label = '删除(' + this._time + ')';
      this._time--;
      if (this._time == 0) {
        this.btn_sure.label = '删 除';
        this.btn_sure.disabled = false;
        Laya.workerTimer.clear(this, this.onTimer);
      } else {
        this.btn_sure.disabled = true;
      }
    };

    return CreateAlert;
  })(CreateAlertUI);

  /**
   *创角-邀请码
   *@author zq
   *创建时间：2024年5月18日15:43:07
   */
  //class login.view.create.CreateInviteCodeAlert extends login.loginui.mobile.CreateInviteCodeAlertUI
  var CreateInviteCodeAlert = (function (_super) {
    function CreateInviteCodeAlert(version) {
      this._handler = null;
      this._inputProxy = null;
      CreateInviteCodeAlert.__super.call(this);
      this.bg.skin = GameConfig.getProResPath('create/CreatePanel1/alert.png');
      this.bg_input.skin = 'mobile/CreatePanel' + version + '/border.png';
      this.btn_sure.skin = 'mobile/CreatePanel' + version + '/btn_alert_sure.png';
      this.btn_cancel.skin = 'mobile/CreatePanel' + version + '/btn_alert_cancel.png';
      this.btn_sure.on('click', this, this.onSure);
      this.btn_cancel.on('click', this, this.onCancel);
      this._inputProxy = new InputProxy(this.input_txt);
      this._inputProxy.prompt = '请在此输入邀请码';
      this._inputProxy.show();
      this.addEvent('login_error', this.onError);
    }

    __class(CreateInviteCodeAlert, 'login.view.create.CreateInviteCodeAlert', _super);
    var __proto = CreateInviteCodeAlert.prototype;
    __proto.destroy = function (destroyChild) {
      destroyChild === void 0 && (destroyChild = true);
      EventMgr.removeAll(this);
      Laya.workerTimer.clear(this, this.onHideError);
      this.bg.skin = null;
      this.btn_sure.off('click', this, this.onSure);
      this.btn_cancel.off('click', this, this.onCancel);
      if (this._inputProxy) {
        this._inputProxy.hide();
        this._inputProxy.destroy();
        this._inputProxy = null;
      }
      if (this._handler) {
        this._handler.dispose();
        this._handler = null;
      }
      laya.ui.View.prototype.destroy.call(this, destroyChild);
    };

    __proto.showCode = function (okFun) {
      this.onHideError();
      this.visible = true;
      if (this._handler == null) {
        this._handler = okFun;
      }
    };

    __proto.onSure = function (e) {
      if (this._handler != null) {
        this._handler.runWith([this._inputProxy.msg]);
      }
    };

    __proto.onCancel = function (e) {
      this.visible = false;
    };

    __proto.onError = function (msg) {
      this.error_txt.text = msg;
      this.error_txt.visible = true;
      Laya.workerTimer.once(2000, this, this.onHideError);
    };

    __proto.onHideError = function () {
      Laya.workerTimer.clear(this, this.onHideError);
      this.error_txt.visible = false;
    };

    return CreateInviteCodeAlert;
  })(CreateInviteCodeAlertUI);

  /**
   *创角-底部按钮区域
   *@author zq
   *创建时间：2024年4月22日14:32:21
   */
  //class login.view.create.v1.unit.CreateBottomBar extends login.loginui.mobile.v1.CreateBottomBarUI
  var CreateBottomBar = (function (_super) {
    function CreateBottomBar() {
      this._randomHandler = null;
      this._clickTime = 0;
      CreateBottomBar.__super.call(this);
      this.click_guide.visible = false;
      this.max_txt.visible = false;
      this.del_txt.visible = false;
      if (Browser.onPC) {
        this.btn_back.visible = false;
        this.bottom_bg.skin = GameConfig.getProResPath('create/CreatePanel1/bottom.png');
      } else {
        this.b_left.skin = GameConfig.getProResPath('create/CreatePanel1/bottomMobi.png');
        this.b_right.skin = this.b_left.skin;
        this.b_dragon.skin = GameConfig.getProResPath('create/CreatePanel1/dragon.png');
        this.wen_left.skin = GameConfig.getProResPath('create/CreatePanel1/bottomwen.png');
        this.wen_right.skin = this.wen_left.skin;
        this.lv_bg1.visible = false;
        this.lv_bg2.visible = false;
      }
      var clientVersion = myparseInt(WebParams.param['verCodeGameClient']);
      if (clientVersion > 0) {
        this.version_txt.text = 'Client:' + clientVersion;
      }
      if (GameConfig.appVersion > 0) {
        if (this.version_txt.text) {
          this.version_txt.text += ', ';
        }
        if (GameConfig.appVersionName) {
          this.version_txt.text += 'Version:' + GameConfig.appVersionName;
        } else {
          this.version_txt.text += 'Version:1.0.' + GameConfig.appVersion;
        }
      }
    }

    __class(CreateBottomBar, 'login.view.create.v1.unit.CreateBottomBar', _super);
    var __proto = CreateBottomBar.prototype;
    __proto.destroy = function (destroyChild) {
      destroyChild === void 0 && (destroyChild = true);
      Laya.workerTimer.clear(this, this.onHideMax);
      Laya.workerTimer.clear(this, this.onHideDel);
      Laya.workerTimer.clear(this, this.onClickTimer);
      if (this._randomHandler) {
        this._randomHandler.dispose();
        this._randomHandler = null;
      }
      laya.ui.View.prototype.destroy.call(this, destroyChild);
    };

    __proto.addHandler = function (randomHandler) {
      this._randomHandler = randomHandler;
    };

    __proto.showRoleName = function () {
      var roles = LoginRoleManager.ins.getRoleList();
      if (roles == null) {
        this.hideRoleName();
        return;
      }
      var data;
      if (roles.length > 0) {
        data = roles[0];
        this.name_txt1.text = data.playerName;
        this.job_txt1.text = EnumRole.getJobName(data.job);
        this.lv_txt1.text = (data.zs > 0 ? data.zs + '转' : '') + data.lv + '级';
      } else {
        this.name_txt1.text = '';
        this.job_txt1.text = '';
        this.lv_txt1.text = '';
      }
      if (roles.length > 1) {
        data = roles[1];
        this.name_txt2.text = data.playerName;
        this.job_txt2.text = EnumRole.getJobName(data.job);
        this.lv_txt2.text = (data.zs > 0 ? data.zs + '转' : '') + data.lv + '级';
      } else {
        this.name_txt2.text = '';
        this.job_txt2.text = '';
        this.lv_txt2.text = '';
      }
    };

    __proto.hideRoleName = function () {
      this.name_txt1.text = '';
      this.job_txt1.text = '';
      this.lv_txt1.text = '';
      this.name_txt2.text = '';
      this.job_txt2.text = '';
      this.lv_txt2.text = '';
    };

    __proto.showMenu = function (page) {
      this.btn_create.visible = page != 0;
      this.btn_delete.visible = page != 0;
    };

    __proto.onClickTimer = function () {
      this._clickTime--;
      if (this._clickTime <= 0) {
        Laya.workerTimer.clear(this, this.onClickTimer);
        this.click_guide.visible = false;
        if (this._randomHandler != null) {
          this._randomHandler.run();
        }
      } else {
        this.ge.index = this._clickTime;
      }
    };

    __proto.timeStart = function () {
      this._clickTime = 5;
      this.ge.index = 5;
      this.click_guide.visible = true;
      Laya.workerTimer.loop(1000, this, this.onClickTimer);
    };

    __proto.timeClear = function () {
      this.click_guide.visible = false;
      Laya.workerTimer.clear(this, this.onClickTimer);
    };

    __proto.showMax = function () {
      this.max_txt.visible = true;
      Laya.workerTimer.once(2000, this, this.onHideMax);
    };

    __proto.onHideMax = function () {
      this.max_txt.visible = false;
      Laya.workerTimer.clear(this, this.onHideMax);
    };

    __proto.showDel = function () {
      this.del_txt.visible = true;
      Laya.workerTimer.once(2000, this, this.onHideDel);
    };

    __proto.onHideDel = function () {
      this.del_txt.visible = false;
      Laya.workerTimer.clear(this, this.onHideDel);
    };

    __proto.resize = function () {
      var sw = Laya.stage.width;
      var sh = Laya.stage.height;
      if (Browser.onPC) {
        this.bottom_center.pos((sw - this.bottom_center.width) >> 1, sh - this.bottom_center.height - GameConfig.TX_BOTTOM_INFO_HEIGHT);
        this.bottom_left.pos(((sw - 1368) * (176 - 10)) / (1920 - 1368) + 10, this.bottom_center.y + 120);
        this.bottom_right.pos(((sw - 1368) * (1178 - 820)) / (1920 - 1368) + 820, this.bottom_left.y);
      } else {
        this.bottom_center.pos((sw - this.bottom_center.width) >> 1, sh - this.bottom_center.height - GameConfig.TX_BOTTOM_INFO_HEIGHT);
        this.wen_left.pos(152, sh - 132);
        this.wen_right.pos(sw - 152, this.wen_left.y);
        this.bottom_left.pos(sw * 0.1, this.bottom_center.y + 52 + 61);
        this.bottom_right.pos(sw * 0.6, this.bottom_left.y);
      }
      this.btn_back.move(sw * 0.1, 50);
      this.btn_delete.move(sw - 152, 70);
      this.btn_create.move(sw - 152, 150);
      this.version_txt.move(sw - 250, 10);
    };

    return CreateBottomBar;
  })(CreateBottomBarUI);

  /**
   *选角-选角色
   *@author zq
   *创建时间：2024年4月22日14:31:18
   */
  //class login.view.create.v1.unit.CreateChooseRoleItem extends login.loginui.mobile.v1.CreateChooseRoleItemUI
  var CreateChooseRoleItem = (function (_super) {
    function CreateChooseRoleItem() {
      this._role = null;
      this._data = null;
      CreateChooseRoleItem.__super.call(this);
    }

    __class(CreateChooseRoleItem, 'login.view.create.v1.unit.CreateChooseRoleItem', _super);
    var __proto = CreateChooseRoleItem.prototype;
    __proto.destroy = function (destroyChild) {
      destroyChild === void 0 && (destroyChild = true);
      Laya.workerTimer.clear(this, this.onTimer);
      if (this._role) {
        this._role.destroy();
        this._role = null;
      }
      this._data = null;
      laya.ui.View.prototype.destroy.call(this, destroyChild);
    };

    __proto.setData = function (data) {
      this._data = data;
      var ry = 0;
      if (Browser.onPC) {
        this.bg.skin = 'mobile/CreatePanel1/bg_player_big.png';
      } else {
        this.bg.skin = 'mobile/CreatePanel1/bg_player_small.png';
        ry = -10;
      }
      if (this._role == null) {
        this._role = new CreateRoleUnit(data.sex, data.job, 1);
        this._role.initPosition(0, ry, this);
        this._role.stand();
      }
      this.name_txt.text = (data.zs > 0 ? data.zs + '转' : '') + data.lv + '级 ' + data.playerName;
      if (data.isDel == 0) {
        this.bg_des.visible = false;
      } else {
        this.onTimer();
        Laya.workerTimer.loop(1000, this, this.onTimer);
      }
      this.bg_name.y = -115;
      this.bg_des.y = -145;
    };

    __proto.selectRole = function (value) {
      if (value) {
        this._role.attack();
        this._role.addMask(false);
      } else {
        this._role.addMask(true);
      }
    };

    __proto.getData = function () {
      return this._data;
    };

    __proto.onTimer = function () {
      if (this._data.deltime > 0) {
        this.bg_des.visible = true;
        this.des_txt.text = '删除倒计时：' + DateUtils.formatDay(this._data.deltime);
      } else {
        Laya.workerTimer.clear(this, this.onTimer);
        this.bg_des.visible = true;
        this.des_txt.text = '删除倒计时：已删除';
      }
    };

    return CreateChooseRoleItem;
  })(CreateChooseRoleItemUI);

  /**
   *创角-创建新人物
   *@author zq
   *创建时间：2024年4月22日13:35:18
   */
  //class login.view.create.v1.unit.CreateNamePanel extends login.loginui.mobile.v1.NamePanelUI
  var CreateNamePanel = (function (_super) {
    function CreateNamePanel() {
      /**
       *15秒后进入游戏
       */
      this.COUNT_DWON_TIME = 15;
      /**
       *无操作后5秒进入倒计时
       */
      this.RECOVER_TIME = 5;
      this._vipEffect = null;
      this._sexAni = null;
      this._jobAni = null;
      this._touchHandler = null;
      this._closeHandler = null;
      this._inputProxy = null;
      this._voice = null;
      this._voiceUrl = null;
      this._time_txt = null;
      this._time_box = null;
      this._curSystemName = null;
      this._sex = 0;
      this._job = 0;
      this._time = 0;
      CreateNamePanel.__super.call(this);
      this.COUNT_DWON_TIME = LoginRoleManager.ins.getAutoEnterGameTime();
      this.name_txt.restrict = '^\x20\u3000\t\n\r';
      this.name_txt.maxChars = 14;
      if (GameConfig.isLayaNative_1_0_8) {
        this.name_txt.y += 3;
      }
      this._inputProxy = new InputProxy(this.name_txt);
      this._inputProxy.show();
      this._sexAni = new Animation();
      this._sexAni.interval = 100;
      this._sexAni.pos(-21, -21);
      this._jobAni = new Animation();
      this._jobAni.interval = 100;
      this._jobAni.pos(-21, -21);
      var url = GameConfig.getProResPath('create/flow.atlas');
      this._sexAni.loadAtlas(url);
      this._jobAni.loadAtlas(url);
      this._voiceUrl = GameConfig.getProResPath('music/renwu_07' + GameConfig.SOUND);
    }

    __class(CreateNamePanel, 'login.view.create.v1.unit.CreateNamePanel', _super);
    var __proto = CreateNamePanel.prototype;
    __proto.destroy = function (destroyChild) {
      destroyChild === void 0 && (destroyChild = true);
      EventMgr.removeAll(this);
      Laya.workerTimer.clear(this, this.onTimer);
      if (this._vipEffect) {
        this._vipEffect.destroy();
        this._vipEffect = null;
      }
      if (this._touchHandler) {
        this._touchHandler.dispose();
        this._touchHandler = null;
      }
      if (this._closeHandler) {
        this._closeHandler.dispose();
        this._closeHandler = null;
      }
      if (this._inputProxy) {
        this._inputProxy.hide();
        this._inputProxy.destroy();
        this._inputProxy = null;
      }
      if (this._sexAni) {
        this._sexAni.destroy();
        this._sexAni = null;
      }
      if (this._jobAni) {
        this._jobAni.destroy();
        this._jobAni = null;
      }
      if (this._voice) {
        this._voice.stop();
        this._voice = null;
      }
      this._time_txt = null;
      this._time_box = null;
      SoundManager.destroySound(this._voiceUrl);
      laya.ui.View.prototype.destroy.call(this, destroyChild);
    };

    __proto.setTime_txt = function (time_box, time_txt) {
      this._time_box = time_box;
      this._time_txt = time_txt;
      time_box.visible = false;
    };

    __proto.addHandler = function (touchHandler, closeHandler) {
      this._touchHandler = touchHandler;
      this._closeHandler = closeHandler;
    };

    __proto.beginGame = function (auto) {
      LoginRoleManager.ins.auto = auto;
      if (this._inputProxy.msg == '') {
        this.nameError_txt.text = '昵称不能为空';
        if (Browser.onPC) {
          if (this.stage != null) {
            this.stage.focus = this.name_txt;
          }
        }
        return;
      }
      EventMgr.dispatch('CreatePlayerEvent.GAME_BEGIN');
    };

    __proto.save = function () {
      LoginRoleManager.ins.name = this._inputProxy.msg;
      LoginRoleManager.ins.sex = this._sex;
      LoginRoleManager.ins.job = this._job;
    };

    __proto.show = function () {
      this.addEvent('login_error', this.onError);
      this.addEvent('LoginEvent/RANDOM_NAME', this.onRandomName);
      this.name_txt.on('change', this, this.onChange);
      this.name_txt.on('focus', this, this.onFocusIn);
      this.name_txt.on('blur', this, this.onFocusOut);
      this.close_btn.on('click', this, this.onClose);
      this.random_btn.on('click', this, this.onRandomName);
      this.sex1.on('click', this, this.onSexBtn);
      this.sex2.on('click', this, this.onSexBtn);
      this.job1.on('click', this, this.onJobBtn);
      this.job2.on('click', this, this.onJobBtn);
      this.job3.on('click', this, this.onJobBtn);
      this.ok_btn.on('click', this, this.onBeginGame);
      Laya.stage.on('mousedown', this, this.onStageMouseDown);
      this.timeClear();
      Laya.workerTimer.loop(1000, this, this.onTimer);
    };

    __proto.hide = function () {
      EventMgr.removeAll(this);
      this.name_txt.off('change', this, this.onChange);
      this.name_txt.off('focus', this, this.onFocusIn);
      this.name_txt.off('blur', this, this.onFocusOut);
      this.close_btn.off('click', this, this.onClose);
      this.random_btn.off('click', this, this.onRandomName);
      this.sex1.off('click', this, this.onSexBtn);
      this.sex2.off('click', this, this.onSexBtn);
      this.job1.off('click', this, this.onJobBtn);
      this.job2.off('click', this, this.onJobBtn);
      this.job3.off('click', this, this.onJobBtn);
      this.ok_btn.off('click', this, this.onBeginGame);
      Laya.stage.off('mousedown', this, this.onStageMouseDown);
      this.nameError_txt.text = '';
      this.name_txt.text = '';
      if (this._voice) {
        this._voice.stop();
      }
      this.playVipEffect(false);
      Laya.workerTimer.clear(this, this.onTimer);
    };

    __proto.selectJob = function (sex, job) {
      if (sex != this._sex || job != this._job) {
        this.onRandomName();
      }
      this._sex = sex;
      this._job = job;
      this.showNamePanel();
    };

    __proto.onTimer = function () {
      if (this._sex <= 0 || this._job <= 0) {
        return;
      }
      if (this._inputProxy.isShowDialog()) {
        return;
      }
      this._time--;
      if (this._time <= this.COUNT_DWON_TIME) {
        if (this._time_box) {
          this._time_box.visible = true;
        }
        if (this._time_txt) {
          this._time_txt.text = '游戏将在' + this._time + 's后自动为您创建角色';
        }
      }
      if (this._time <= 0) {
        Laya.workerTimer.clear(this, this.onTimer);
        if (this._time_box) {
          this._time_box.visible = false;
        }
        this.beginGame(1);
      }
    };

    __proto.timeClear = function () {
      this._time = this.COUNT_DWON_TIME + this.RECOVER_TIME;
      if (this._time_box) {
        this._time_box.visible = false;
      }
    };

    __proto.onStageMouseDown = function (e) {
      this.timeClear();
    };

    __proto.onError = function (msg) {
      this.nameError_txt.text = msg;
    };

    __proto.onBeginGame = function (e) {
      this.beginGame(0);
    };

    __proto.checkNameLength = function () {
      if (this._inputProxy.msg.length > 0) {
        var str = this._inputProxy.msg;
        var len = 0;
        var char = 0;
        for (var i = 0; i < str.length; i++) {
          char = str.charCodeAt(i);
          if (char >= 0x4e00 && char <= 0x9fa5) {
            len += 2;
          } else {
            len += 1;
          }
        }
        if (len > 14) {
          this.nameError_txt.text = '角色名不得超过7个中文或14个英文';
          return false;
        } else if (len < 4) {
          this.nameError_txt.text = '角色名长度不能少于2个中文或4个英文';
          return false;
        } else {
          this.nameError_txt.text = '';
          return true;
        }
      } else {
        this.nameError_txt.text = '昵称不能为空';
        return false;
      }
      return true;
    };

    __proto.onRandomName = function (e) {
      var arr;
      if (this._sex == 1) {
        arr = LoginMessage.boyNames;
      } else {
        arr = LoginMessage.girlNames;
      }
      if (arr != null && arr.length > 0) {
        var index = myparseInt(Math.random() * arr.length);
        this._curSystemName = arr[index];
        this._inputProxy.clear();
        this._inputProxy.addMsg(this._curSystemName);
        arr.splice(index, 1);
        this.checkNameLength();
      } else {
        this._curSystemName = null;
        LoginMessage.sendRandomNameMessage(this._sex);
      }
    };

    __proto.onSexBtn = function (e) {
      if (e.currentTarget == this.sex1) {
        this._sex = 1;
        this.showNamePanel();
      } else if (e.currentTarget == this.sex2) {
        this._sex = 2;
        this.showNamePanel();
      }
      this.onRandomName();
      this.selectJobSex();
      EventMgr.dispatch('CreatePlayerEvent.PLAY_CLICK_SOUND');
    };

    __proto.onChange = function (e) {
      this.timeClear();
      this.checkNameLength();
    };

    __proto.onFocusIn = function (e) {
      this.timeClear();
    };

    __proto.onFocusOut = function (e) {
      this.checkNameLength();
    };

    __proto.showNamePanel = function () {
      if (!this._voice) {
        this._voice = SoundManager.playSound(this._voiceUrl);
      }
      this.visible = true;
      this.desc.skin = 'mobile/CreatePanel1/desc' + this._job + '.png';
      if (this._sex == 1) {
        this.sex01.visible = true;
        this.sex02.visible = false;
        this.sex01.addChild(this._sexAni);
      } else {
        this.sex01.visible = false;
        this.sex02.visible = true;
        this.sex02.addChild(this._sexAni);
      }
      this._sexAni.play();
      if (this._job == 1) {
        this.job01.visible = true;
        this.job02.visible = false;
        this.job03.visible = false;
        this.job01.addChild(this._jobAni);
      } else if (this._job == 2) {
        this.job01.visible = false;
        this.job02.visible = true;
        this.job03.visible = false;
        this.job02.addChild(this._jobAni);
      } else if (this._job == 3) {
        this.job01.visible = false;
        this.job02.visible = false;
        this.job03.visible = true;
        this.job03.addChild(this._jobAni);
      }
      this._jobAni.play();
      this.playVipEffect(true);
    };

    __proto.onJobBtn = function (e) {
      if (e.currentTarget == this.job1) {
        this._job = 1;
        this.showNamePanel();
      } else if (e.currentTarget == this.job2) {
        this._job = 2;
        this.showNamePanel();
      } else if (e.currentTarget == this.job3) {
        this._job = 3;
        this.showNamePanel();
      }
      this.selectJobSex();
      EventMgr.dispatch('CreatePlayerEvent.PLAY_CLICK_SOUND');
    };

    __proto.onClose = function (e) {
      this.reset();
      if (this._closeHandler != null) {
        this._closeHandler.run();
      }
      EventMgr.dispatch('CreatePlayerEvent.PLAY_CLICK_SOUND');
    };

    __proto.selectJobSex = function () {
      if (this._touchHandler != null) {
        this._touchHandler.runWith([this._sex, this._job]);
      }
    };

    __proto.playVipEffect = function (value) {
      if (value) {
        if (!this._vipEffect) {
          this._vipEffect = new Animation();
          this._vipEffect.source = GameConfig.getProResPath('create/GiveVipArrow.ani');
          this._vipEffect.move(210, 370, this);
        }
        if (!this._vipEffect.isPlaying) {
          this._vipEffect.play();
        }
        if (!this._vipEffect.parent) {
          this.addChild(this._vipEffect);
        }
      } else {
        if (this._vipEffect) {
          this._vipEffect.stop();
          this._vipEffect.removeSelf();
        }
      }
    };

    __proto.reset = function () {
      this._sex = 0;
      this._job = 0;
      this.visible = false;
      if (this._sexAni) {
        this._sexAni.stop();
      }
      if (this._jobAni) {
        this._jobAni.stop();
      }
      this.timeClear();
      this.playVipEffect(false);
    };

    __proto.resize = function () {
      if (Browser.onPC) {
        if (this._sex == 1) {
          this.x = ((Laya.stage.width - 1368) * (1072 - 830)) / (1920 - 1368) + 830;
        } else {
          this.x = 400;
        }
        this.y = ((Laya.stage.width - 1368) * (322 - 190)) / (1920 - 1368) + 100;
      } else {
        if (this._sex == 1) {
          this.move(Laya.stage.width * 0.65, 100);
        } else {
          this.move(Laya.stage.width * 0.15, 100);
        }
      }
    };

    return CreateNamePanel;
  })(NamePanelUI);

  /**
   *选角-选角色
   *@author zq
   *创建时间：2024年5月25日10:31:23
   */
  //class login.view.create.v2.unit.CreateChooseRoleItem_v2 extends login.loginui.mobile.v2.CreateChooseRoleItem_v2UI
  var CreateChooseRoleItem_v2 = (function (_super) {
    function CreateChooseRoleItem_v2() {
      this._data = null;
      CreateChooseRoleItem_v2.__super.call(this);
    }

    __class(CreateChooseRoleItem_v2, 'login.view.create.v2.unit.CreateChooseRoleItem_v2', _super);
    var __proto = CreateChooseRoleItem_v2.prototype;
    __proto.destroy = function (destroyChild) {
      destroyChild === void 0 && (destroyChild = true);
      Laya.workerTimer.clear(this, this.onTimer);
      this._data = null;
      laya.ui.View.prototype.destroy.call(this, destroyChild);
    };

    __proto.setData = function (data) {
      this._data = data;
      this.name_txt.text = '姓名：' + data.playerName;
      this.job_txt.text = '职业：' + EnumRole.getJobName(data.job);
      this.lv_txt.text = '等级：' + data.lv + '级';
      this.zs_txt.text = '转生：' + data.zs + '转';
      this.imgHead.skin = 'mobile/CreatePanel2/head_' + data.job + '_' + data.sex + '.png';
      if (data.isDel == 0) {
        this.time_txt.visible = false;
      } else {
        this.time_txt.visible = true;
        this.onTimer();
        Laya.workerTimer.loop(1000, this, this.onTimer);
      }
    };

    __proto.onTimer = function () {
      if (this._data && this._data.deltime > 0) {
        this.time_txt.text = '删除倒计时：' + DateUtils.formatDay(this._data.deltime);
      } else {
        Laya.workerTimer.clear(this, this.onTimer);
        this.time_txt.text = '删除倒计时：已删除';
      }
    };

    __proto.selectedHandler = function (value) {
      if (value) {
        this.zs_txt.color = this.lv_txt.color = this.job_txt.color = this.name_txt.color = '#fffffe';
      } else {
        this.zs_txt.color = this.lv_txt.color = this.job_txt.color = this.name_txt.color = '#968575';
      }
    };

    return CreateChooseRoleItem_v2;
  })(CreateChooseRoleItem_v2UI);

  /**
   *创角-创建新人物
   *@author zq
   *创建时间：2024年5月24日17:17:53
   */
  //class login.view.create.v2.unit.CreateNamePanel_v2 extends login.loginui.mobile.v2.NamePanel_v2UI
  var CreateNamePanel_v2 = (function (_super) {
    function CreateNamePanel_v2() {
      this._inputProxy = null;
      this._voiceUrl = null;
      this._sex = 0;
      this._job = 0;
      this._curSystemName = null;
      CreateNamePanel_v2.__super.call(this);
      this.input_txt.restrict = '^\x20\u3000\t\n\r';
      this.input_txt.maxChars = 14;
      this._inputProxy = new InputProxy(this.input_txt);
      this._inputProxy.show();
      this._inputProxy.prompt = '请输入昵称...';
      if (!Browser.onPC) {
        this._inputProxy.maxChars = 7;
      }
      this._voiceUrl = GameConfig.getProResPath('music/renwu_07' + GameConfig.SOUND);
      this.boy_on.on('click', this, this.onClick);
      this.boy_off.on('click', this, this.onClick);
      this.girl_on.on('click', this, this.onClick);
      this.girl_off.on('click', this, this.onClick);
      this.zs_on.on('click', this, this.onClick);
      this.zs_off.on('click', this, this.onClick);
      this.fs_on.on('click', this, this.onClick);
      this.fs_off.on('click', this, this.onClick);
      this.ds_on.on('click', this, this.onClick);
      this.ds_off.on('click', this, this.onClick);
      this.btn_close.on('click', this, this.onClick);
      this.btn_name.on('click', this, this.onClick);
      this.btn_sure.on('click', this, this.onBeginGame);
      this.addEvent('LoginEvent/RANDOM_NAME', this.onRandomName);
    }

    __class(CreateNamePanel_v2, 'login.view.create.v2.unit.CreateNamePanel_v2', _super);
    var __proto = CreateNamePanel_v2.prototype;
    __proto.destroy = function (destroyChild) {
      destroyChild === void 0 && (destroyChild = true);
      EventMgr.removeAll(this);
      SoundManager.destroySound(this._voiceUrl);
      if (this._inputProxy) {
        this._inputProxy.hide();
        this._inputProxy.destroy();
        this._inputProxy = null;
      }
      laya.ui.View.prototype.destroy.call(this, destroyChild);
    };

    __proto.showNamePanel = function (value) {
      this.visible = value;
      if (value) {
        this.showRandomPlayer();
      } else {
        this._sex = 0;
        this._job = 0;
        this._inputProxy.clear();
      }
    };

    /**
     *默认显示随机
     */
    __proto.showRandomPlayer = function () {
      var sex = ((Math.random() * 2) >> 0) + 1;
      var job = ((Math.random() * 3) >> 0) + 1;
      this.selectJob(sex, job);
    };

    __proto.selectJob = function (sex, job) {
      if (this._sex == sex && this._job == job) {
        return;
      }
      this._sex = sex;
      this._job = job;
      this.onRandomName();
      this.imgHead.skin = 'mobile/CreatePanel2/head_' + job + '_' + sex + '.png';
      this.imgDesc.skin = 'mobile/CreatePanel2/desc' + job + '.png';
      this.zs_on.visible = job == 1;
      this.zs_off.visible = !this.zs_on.visible;
      this.fs_on.visible = job == 2;
      this.fs_off.visible = !this.fs_on.visible;
      this.ds_on.visible = job == 3;
      this.ds_off.visible = !this.ds_on.visible;
      this.boy_on.visible = sex == 1;
      this.boy_off.visible = !this.boy_on.visible;
      this.girl_on.visible = sex == 2;
      this.girl_off.visible = !this.girl_on.visible;
      EventMgr.dispatch('CreatePlayerEvent.CHANGE_ROLE_UNIT', sex, job);
    };

    __proto.onRandomName = function (e) {
      var arr;
      if (this._sex == 1) {
        arr = LoginMessage.boyNames;
      } else {
        arr = LoginMessage.girlNames;
      }
      if (arr != null && arr.length > 0) {
        var index = myparseInt(Math.random() * arr.length);
        this._curSystemName = arr[index];
        this._inputProxy.clear();
        this._inputProxy.addMsg(this._curSystemName);
        arr.splice(index, 1);
        this.checkNameLength();
      } else {
        this._curSystemName = null;
        LoginMessage.sendRandomNameMessage(this._sex);
      }
    };

    __proto.checkNameLength = function () {
      if (this._inputProxy.msg.length > 0) {
        var str = this._inputProxy.msg;
        var len = 0;
        var char = 0;
        for (var i = 0; i < str.length; i++) {
          char = str.charCodeAt(i);
          if (char >= 0x4e00 && char <= 0x9fa5) {
            len += 2;
          } else {
            len += 1;
          }
        }
        if (len > 14) {
          EventMgr.dispatch('CreatePlayerEvent.NOTICE', '角色名不得超过7个中文或14个英文');
          return false;
        } else if (len < 4) {
          EventMgr.dispatch('CreatePlayerEvent.NOTICE', '角色名长度不能少于2个中文或4个英文');
          return false;
        } else {
          return true;
        }
      } else {
        EventMgr.dispatch('CreatePlayerEvent.NOTICE', '昵称不能为空');
        return false;
      }
      return true;
    };

    __proto.onClick = function (e) {
      switch (e.currentTarget) {
        case this.boy_on:
        case this.boy_off: {
          this.selectJob(1, this._job);
          break;
        }
        case this.girl_on:
        case this.girl_off: {
          this.selectJob(2, this._job);
          break;
        }
        case this.zs_on:
        case this.zs_off: {
          this.selectJob(this._sex, 1);
          break;
        }
        case this.fs_on:
        case this.fs_off: {
          this.selectJob(this._sex, 2);
          break;
        }
        case this.ds_on:
        case this.ds_off: {
          this.selectJob(this._sex, 3);
          break;
        }
        case this.btn_name: {
          this.onRandomName();
          break;
        }
        case this.btn_close: {
          EventMgr.dispatch('CreatePlayerEvent.CLOSE_NAME_PANEL');
          break;
        }
      }
      EventMgr.dispatch('CreatePlayerEvent.PLAY_CLICK_SOUND');
    };

    __proto.onBeginGame = function (e) {
      EventMgr.dispatch('CreatePlayerEvent.GAME_BEGIN');
    };

    __proto.getName = function () {
      return this._inputProxy.msg;
    };

    __proto.isShowDialog = function () {
      return this._inputProxy.isShowDialog();
    };

    return CreateNamePanel_v2;
  })(NamePanel_v2UI);

  /**
   *创角-第三版
   *@author zq
   *创建时间：2024年5月24日14:44:17
   */
  //class login.view.create.v3.unit.CreateChooseRoleItem_v3 extends login.loginui.mobile.v3.CreateChooseRoleItem_v3UI
  var CreateChooseRoleItem_v3 = (function (_super) {
    function CreateChooseRoleItem_v3() {
      this._data = null;
      CreateChooseRoleItem_v3.__super.call(this);
      this.btn_del.on('click', this, this.onClick);
    }

    __class(CreateChooseRoleItem_v3, 'login.view.create.v3.unit.CreateChooseRoleItem_v3', _super);
    var __proto = CreateChooseRoleItem_v3.prototype;
    __proto.destroy = function (destroyChild) {
      destroyChild === void 0 && (destroyChild = true);
      this.btn_del.off('click', this, this.onClick);
      Laya.workerTimer.clear(this, this.onTimer);
      this._data = null;
      laya.ui.View.prototype.destroy.call(this, destroyChild);
    };

    __proto.onClick = function (e) {
      EventMgr.dispatch('CreatePlayerEvent.DEL_ROLE', this._data);
    };

    __proto.setData = function (data) {
      this._data = data;
      this.name_txt.text = '' + data.playerName;
      this.lv_txt.text = data.zs > 0 ? data.zs + '转' + data.lv + '级' : data.lv + '级';
      this.imgHead.skin = 'mobile/CreatePanel3/head_' + data.job + '_' + data.sex + '_on.png';
      if (data.isDel == 0) {
        this.time_txt.visible = false;
      } else {
        this.time_txt.visible = true;
        this.onTimer();
        Laya.workerTimer.loop(1000, this, this.onTimer);
      }
    };

    __proto.onTimer = function () {
      if (this._data && this._data.deltime > 0) {
        this.time_txt.text = '删除倒计时：' + DateUtils.formatDay(this._data.deltime);
      } else {
        Laya.workerTimer.clear(this, this.onTimer);
        this.time_txt.text = '删除倒计时：已删除';
      }
    };

    return CreateChooseRoleItem_v3;
  })(CreateChooseRoleItem_v3UI);

  /**
   *创角-第三版
   *@author zq
   *创建时间：2024年5月24日14:44:17
   */
  //class login.view.create.v3.unit.CreateNamePanel_v3 extends login.loginui.mobile.v3.NamePanel_v3UI
  var CreateNamePanel_v3 = (function (_super) {
    function CreateNamePanel_v3() {
      this._inputProxy = null;
      this._voiceUrl = null;
      this._sex = 0;
      this._job = 0;
      this._curSystemName = null;
      this._selectEffect = null;
      CreateNamePanel_v3.__super.call(this);
      this.bg_head_bar.skin = GameConfig.getProResPath('v3/bg_head_bar.png');
      this.input_txt.restrict = '^\x20\u3000\t\n\r';
      this.input_txt.maxChars = 14;
      this._inputProxy = new InputProxy(this.input_txt);
      this._inputProxy.show();
      this._inputProxy.prompt = '请输入昵称...';
      if (!Browser.onPC) {
        this._inputProxy.maxChars = 7;
      }
      this._voiceUrl = GameConfig.getProResPath('music/renwu_07' + GameConfig.SOUND);
      this._selectEffect = new CreateSceneEffect('create/scene/select', 8);
      this._selectEffect.play();
      this.bg_head_1_1.on('click', this, this.onClick);
      this.bg_head_2_1.on('click', this, this.onClick);
      this.bg_head_3_1.on('click', this, this.onClick);
      this.bg_head_1_2.on('click', this, this.onClick);
      this.bg_head_2_2.on('click', this, this.onClick);
      this.bg_head_3_2.on('click', this, this.onClick);
      this.btn_name.on('click', this, this.onClick);
      this.addEvent('LoginEvent/RANDOM_NAME', this.onRandomName);
    }

    __class(CreateNamePanel_v3, 'login.view.create.v3.unit.CreateNamePanel_v3', _super);
    var __proto = CreateNamePanel_v3.prototype;
    __proto.destroy = function (destroyChild) {
      destroyChild === void 0 && (destroyChild = true);
      EventMgr.removeAll(this);
      SoundManager.destroySound(this._voiceUrl);
      if (this._inputProxy) {
        this._inputProxy.hide();
        this._inputProxy.destroy();
        this._inputProxy = null;
      }
      if (this._selectEffect) {
        this._selectEffect.destroy();
        this._selectEffect = null;
      }
      laya.ui.View.prototype.destroy.call(this, destroyChild);
    };

    __proto.showNamePanel = function (value) {
      this.visible = value;
      if (value) {
        this.showRandomPlayer();
      } else {
        this._sex = 0;
        this._job = 0;
        this._inputProxy.clear();
      }
    };

    /**
     *默认显示随机
     */
    __proto.showRandomPlayer = function () {
      var sex = ((Math.random() * 2) >> 0) + 1;
      var job = ((Math.random() * 3) >> 0) + 1;
      this.selectJob(sex, job);
    };

    __proto.selectJob = function (sex, job) {
      if (this._sex == sex && this._job == job) {
        return;
      }
      this._sex = sex;
      this._job = job;
      this.onRandomName();
      this.head_1_1.skin = sex == 1 && job == 1 ? 'mobile/CreatePanel3/head_1_1_on.png' : 'mobile/CreatePanel3/head_1_1_off.png';
      this.head_2_1.skin = sex == 1 && job == 2 ? 'mobile/CreatePanel3/head_2_1_on.png' : 'mobile/CreatePanel3/head_2_1_off.png';
      this.head_3_1.skin = sex == 1 && job == 3 ? 'mobile/CreatePanel3/head_3_1_on.png' : 'mobile/CreatePanel3/head_3_1_off.png';
      this.head_1_2.skin = sex == 2 && job == 1 ? 'mobile/CreatePanel3/head_1_2_on.png' : 'mobile/CreatePanel3/head_1_2_off.png';
      this.head_2_2.skin = sex == 2 && job == 2 ? 'mobile/CreatePanel3/head_2_2_on.png' : 'mobile/CreatePanel3/head_2_2_off.png';
      this.head_3_2.skin = sex == 2 && job == 3 ? 'mobile/CreatePanel3/head_3_2_on.png' : 'mobile/CreatePanel3/head_3_2_off.png';
      this.bg_head_1_1.skin = sex == 1 && job == 1 ? 'mobile/CreatePanel3/bg_head_on.png' : 'mobile/CreatePanel3/bg_head_off.png';
      this.bg_head_2_1.skin = sex == 1 && job == 2 ? 'mobile/CreatePanel3/bg_head_on.png' : 'mobile/CreatePanel3/bg_head_off.png';
      this.bg_head_3_1.skin = sex == 1 && job == 3 ? 'mobile/CreatePanel3/bg_head_on.png' : 'mobile/CreatePanel3/bg_head_off.png';
      this.bg_head_1_2.skin = sex == 2 && job == 1 ? 'mobile/CreatePanel3/bg_head_on.png' : 'mobile/CreatePanel3/bg_head_off.png';
      this.bg_head_2_2.skin = sex == 2 && job == 2 ? 'mobile/CreatePanel3/bg_head_on.png' : 'mobile/CreatePanel3/bg_head_off.png';
      this.bg_head_3_2.skin = sex == 2 && job == 3 ? 'mobile/CreatePanel3/bg_head_on.png' : 'mobile/CreatePanel3/bg_head_off.png';
      this._selectEffect.move(this['head_' + job + '_' + sex].x, this['head_' + job + '_' + sex].y, this);
      EventMgr.dispatch('CreatePlayerEvent.CHANGE_ROLE_UNIT', sex, job);
    };

    __proto.onRandomName = function (e) {
      var arr;
      if (this._sex == 1) {
        arr = LoginMessage.boyNames;
      } else {
        arr = LoginMessage.girlNames;
      }
      if (arr != null && arr.length > 0) {
        var index = myparseInt(Math.random() * arr.length);
        this._curSystemName = arr[index];
        this._inputProxy.clear();
        this._inputProxy.addMsg(this._curSystemName);
        arr.splice(index, 1);
        this.checkNameLength();
      } else {
        this._curSystemName = null;
        LoginMessage.sendRandomNameMessage(this._sex);
      }
    };

    __proto.checkNameLength = function () {
      if (this._inputProxy.msg.length > 0) {
        var str = this._inputProxy.msg;
        var len = 0;
        var char = 0;
        for (var i = 0; i < str.length; i++) {
          char = str.charCodeAt(i);
          if (char >= 0x4e00 && char <= 0x9fa5) {
            len += 2;
          } else {
            len += 1;
          }
        }
        if (len > 14) {
          EventMgr.dispatch('CreatePlayerEvent.NOTICE', '角色名不得超过7个中文或14个英文');
          return false;
        } else if (len < 4) {
          EventMgr.dispatch('CreatePlayerEvent.NOTICE', '角色名长度不能少于2个中文或4个英文');
          return false;
        } else {
          return true;
        }
      } else {
        EventMgr.dispatch('CreatePlayerEvent.NOTICE', '昵称不能为空');
        return false;
      }
      return true;
    };

    __proto.onClick = function (e) {
      switch (e.currentTarget) {
        case this.bg_head_1_1: {
          this.selectJob(1, 1);
          break;
        }
        case this.bg_head_2_1: {
          this.selectJob(1, 2);
          break;
        }
        case this.bg_head_3_1: {
          this.selectJob(1, 3);
          break;
        }
        case this.bg_head_1_2: {
          this.selectJob(2, 1);
          break;
        }
        case this.bg_head_2_2: {
          this.selectJob(2, 2);
          break;
        }
        case this.bg_head_3_2: {
          this.selectJob(2, 3);
          break;
        }
        case this.btn_name: {
          this.onRandomName();
          break;
        }
      }
      EventMgr.dispatch('CreatePlayerEvent.PLAY_CLICK_SOUND');
    };

    __proto.onBeginGame = function (e) {
      EventMgr.dispatch('CreatePlayerEvent.GAME_BEGIN');
    };

    __proto.getName = function () {
      return this._inputProxy.msg;
    };

    __proto.isShowDialog = function () {
      return this._inputProxy.isShowDialog();
    };

    return CreateNamePanel_v3;
  })(NamePanel_v3UI);

  Laya.__init([LoginPanel]);
})(window, document, Laya);

if (typeof define === 'function' && define.amd) {
  define('laya.core', ['require', 'exports'], function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    for (var i in Laya) {
      var o = Laya[i];
      o && o.__isclass && (exports[i] = o);
    }
  });
}
