
/**
 * 通用登录函数
 * 默认加载了加密js三剑客：crypto-js.js | jsencrypt.min.js | md5.js
 * 默认加载了jquery
 *
 * @format
 */

(function () {
  
  /**
   * CommonLoginClass 是一个通用登录功能类，支持注册和登录操作，以及极验验证。
   * 提供了注册和登录请求的回调函数以及初始化极验验证的选项。
   *
   * @param {Object} options - 配置参数
   * @param {Function} options.regBeforeSend - 注册请求前的回调，参数：{Object} params
   * @param {Function} options.regSuccess - 注册成功的回调，参数：{Object} res
   * @param {Function} options.loginBeforeSend - 登录请求前的回调，参数：{Object} params
   * @param {Function} options.loginSuccess - 登录成功的回调，参数：{Object} res
   * @param {boolean} [options.preloadGeetest=true] - 是否在初始化时预先加载极验验证，默认为true
   * @param {Object} [options.customValidator=null] - 自定义验证函数，参数：{Object} params，返回Promise
   */
  function CommonLoginClass(options) {
    this.theRequest = {};
    var defaultOpt = {
      apiUrl: "//www.602.com/member/email/checkResLogin",
      checkNameApi: "//www.602.com/member/email/checkResLogin",
      smsApi: "//www.602.com/?m=member&c=email&a=sendSmsV1",
      smsLoginApi: "//www.602.com/?m=member&c=email&a=smsLogin",
      smsRegisterApi: "//www.602.com/?m=member&c=email&a=smsRegister",
      Geetest4Options: {
        captchaId: "d3cbfb9219ef2524645d66b35f7dbb7f",
        product: "bind",
        riskType: "word",
        language: 'zho',
      },
      isBindVerify: true,
      needGeetest: false,
      preloadGeetest : true,
      customValidator: null,
      skipCharacterCheck: false,
      localStorageKey: 'commonLoginData',
      sendCodeStr: '获取'
    };
    this.options = assignS(defaultOpt, options);
    var self = this;
    this.verifyMap = {
      username: {
        verify: function (value, formType) {
          return new Promise(function (resolve, reject) {
            var status = checkUserNameSync(value, formType, resolve)
            if (status === true) {
              resolve(true)
            } else if (status === 'checkOnService') {
              resolve(self.checkNameOnService(value));
            } else {
              resolve(status)
            }
          });
        },
      },
      password: {
        verify: function (value, formType) {
          return new Promise(function (resolve, reject) {
            var length = value.length;
            var min = 6,
              max = 20;
            if (!value) {
              resolve('密码不能为空')
              return
            } 
            if (formType === 'login') {
              resolve(true)
              return;  
            } 
            if (!self.options.skipCharacterCheck  && !validatePassword(value)) {
              resolve('必须包含大写字母、小写字母、数字、特殊字符其中三种')
            } else if (length < min || length > max) {
              return resolve("密码长度为" + min + "到" + max + "位");
            }
            return resolve(true);
          });
        },
      },
      repassword: {
        verify: function (value, formType, $form) {
          return new Promise(function (resolve, reject) {
            var pvalEl = $form.find("[data-verifyFormItem='password']")
            var pval = pvalEl.val();
            if (pval != value || !value) {
              return resolve("您两次输入的账号密码不一致！");
            }
            return resolve(true);
          });
        },
      },
      mobilePhone: {
        verify: function (value) {
          return new Promise(function (resolve, reject) {
            if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)) {
              return resolve("请输入正确的手机号码");
            }
            return resolve(true);
          });
        },
      },
    };
    this.captchaList = {}
    this.init(this.options.initBack);
  }

  CommonLoginClass.prototype = {
    loginType: 'account', // account, mobile
    timer: null, // 手机号登录发送短信倒计时定时器

    init: function (callback) {
      var self = this;
      this.loadRemoteNeedCode(function () {
        self.bindVerifyForForm();
        if (self.options.customValidator) {
          extend(self.verifyMap, self.options.customValidator);
        }
        if (callback) {
          callback();
        }
      });
      this.loadGt4js();
      this.loadLayer();
      this.initPostMessage();
    },
    getTheRequest: function () {
      return this.theRequest;
    },
    bindVerifyForForm: function () {
      var forms = jQuery("[data-verifyForm]");
      var self = this;
      forms.each(function (formIndex, form) {
        var $form = jQuery(form);
        var formType = $form.attr("data-verifyForm");
        $form.verifylist = [];
        $form.find("[data-verifyFormItem]").each(function (eindex, item) {
          var $vitem = jQuery(item);
          var type = $vitem.attr("data-verifyFormItem");
          var $tipsEl = $form.find("[data-verifyFormTip='" + type + "']");
          $form.verifylist.push(type);
          if (!$tipsEl.length) {
            return;
          }
          
          $vitem.on(" blur", function (evant) {
            var verifyItem = self.verifyMap[type];

            if (verifyItem) {
              if (type === "username" && evant.type === "focus") {
                return;
              }
              var value = $vitem.val();
              verifyItem.verify(value, formType, $form).then(function (res) {
                if (verifyItem.verifyHandler) {
                  verifyItem.verifyHandler(res, $formItem)
                } else if (res === true) {
                  $tipsEl.text("验证通过！").removeClass("Validform_wrong").addClass("Validform_right");
                } else {
                  $tipsEl.text(res).removeClass("Validform_right").addClass("Validform_wrong");
                }
              });
            }
          });
        });

        $("[data-verifyFormSubmit='register']").on("click", function () {
          console.log('register')
          handleCheckData(formIndex, formType, $form)
          
        });

        $form.find("[data-verifyFormSubmit='login']").on("click", function () {
          
          if (self.loginType == 'account') {
            handleCheckData(formIndex, formType, $form) 
          } else {
            self.clickSubmit(formIndex, formType);
          }
        });

        function handleCheckData(formIndex, formType, $form) {
          var verifyFunctions = $form.verifylist.map(function (type) {
            var verifyItem = self.verifyMap[type];
            var $formItem = $form.find("[data-verifyFormItem='" + type + "']")
            var value = $formItem.val();
            return function () {
              if (!verifyItem) return new Promise(function (resolve, reject) {
                resolve(true)
              });
              return verifyItem.verify(value, formType, $form).then(function (res) {
                if (verifyItem.verifyHandler) {
                  verifyItem.verifyHandler(res, $formItem)
                } else {
                  var $tipsEl = $form.find("[data-verifyFormTip='" + type + "']");
                  if (res === true) {
                    $tipsEl.text("验证通过！").removeClass("Validform_wrong").addClass("Validform_right");
                  } else {
                    $tipsEl.text(res).removeClass("Validform_right").addClass("Validform_wrong");
                  }
                }
                return res;
              });
            }
          });
          function executeNext(index) {
            if (index < verifyFunctions.length) {
              verifyFunctions[index]().then(function (res) {
                if (res !== true) {
                  // 如果验证不通过，直接结束，不再执行后续验证
                  return;
                }
                // 继续执行下一个验证
                executeNext(index + 1);
              });
            } else {
              // 所有验证通过，执行提交逻辑
              self.clickSubmit(formIndex, formType);
            }
          }
          executeNext(0);
        }
        if (formType === 'login') {
          jQuery("[data-verifyFormItem='password']").keypress(function (evant) {
            var code = evant.keyCode;
            code == 13 && handleCheckData(formIndex, formType, $form)
          });
        }
        $form.find('#send-code').on('click', function (e) {
          self.handleSms($form, formType)
        })
        
        $form.find('#com-tab-box').on('click', function (e) {
          handleTabClick(e, $form)
        });
      });
      $('#neiye-layout #com-tab-box').on('click', function (e) {
        handleTabClick(e, $('#neiye-layout'))
      })

      function handleTabClick(e, $form) {
        if (!(e.target.className.includes('reg-tab-1') || e.target.className.includes('reg-tab-2'))) {
          return
        }

        $form.find('#com-tab-box').find('.focus').removeClass('focus');
        $(e.target).addClass('focus');
        if (e.target.className.includes('reg-tab-1')) {
          $form.find('#account-box').show();
          $form.find('#mobile-box').hide();
          self.loginType = 'account';
        } else if (e.target.className.includes('reg-tab-2')) {
          $form.find('#mobile-box').show();
          $form.find('#account-box').hide();
          self.loginType = 'mobile';
        }
      }
      
      $("[data-verifyFormSubmit='smslogin']").on("click", function (evant) {
        // 选择用户列表页的提交按钮
        self.handleSmsLogin({})
      });
    },
    checkMobile: function (mobile) {
      return /^1[3456789]\d{9}$/.test(mobile);
    },
    handleSms: function ($form, formType) {
      var mobile = $form.find("[data-verifyFormItem='mobile']").val();
      if (!mobile || !this.checkMobile(mobile)) {
        // options.msg 只用于手机号注册登录
        
        this.options.msg('请输入正确的手机号', formType)
        return;
      }
      if(this.timer) {
        return;
      }
      this.smsFunc(mobile, $form, formType)
    },
    smsStatus: false,
    smsFunc: function (mobile,$form, formType) {
      var self = this;
      if (this.smsStatus) {
        return;
      }
      
      this.smsStatus = true;
      jQuery.ajax({
        type: "POST",
        url: self.options.smsApi,
        data: {mobile: mobile},
        success: function (res) {
          if (typeof res == 'string') {
            res = JSON.parse(res)
          }
          if (res.result == 'success') {
            $form.find('#send-code').addClass('gray').text('再次发送(60s)')
            let time = 60
            self.timer = setInterval(() => {
              time --
              if (time == 0) {
                self.smsStatus = false;
                clearInterval(self.timer);
                self.timer = null;
                $form.find('#send-code').removeClass('gray').text(self.options.sendCodeStr)
              } else {
                $form.find('#send-code').text('再次发送('+time+'s)')
              }
            }, 1000);
            // self.options.msg('发送成功')
          } else {
            clearInterval(self.timer);
            self.smsStatus = false;
            self.options.msg(res.msg, formType)
          }
        },
        error: function (err) {
          console.log(err)
          self.smsStatus = false;
          self.options.msg(err, formType)
        },
      });
    },

    handleSmsLogin: function (result) {
      var mobile = $("[data-verifyFormItem='mobile']").val();
      var smsCode = $("[data-verifyFormItem='smsCode']").val();
      var userid = $('.user-list-box').attr('data-userid');
      
      result.mobile = mobile;
      result.userid = userid;
      result.smsCode = smsCode;
      if (this.options.loginBeforeSend) {
        this.options.loginBeforeSend(result);
      }
      if (!result.mobile || !this.checkMobile(result.mobile)) {
        this.options.msg('请输入正确的手机号', 'login')
        return;
      }
      if (!result.smsCode) {
        this.options.msg('请输入验证码', 'login')
        return;
      }
      
      this.smsLoginFunc(result)
    },
    smsLoginFunc: function (result) {
      var self = this;
      if (!result) result = {}
      var params = {mobile: result.mobile, smsCode: result.smsCode, userid: result.userid || ''};
      if (this.options.loginBeforeSend) {
        this.options.loginBeforeSend(params);
      }
      if (result) {
        params.lot_number= result.lot_number;
        params.pass_token= result.pass_token;
        params.gen_time= result.gen_time;
        params.captcha_output= result.captcha_output;
      }
      rsaApi(this.options.smsLoginApi,params, function (res) {
        if (res.code == '0') {
          // self.options.msg('登录成功')
          if (res.list) {
            self.options.smsLoginSucc(res.list)
          } else {
            self.options.loginSuccess(res)
          }
        } else {
          self.options.msg(res.msg, 'login')
        }
      })
    },
    handleSmsReg: function (result) {
      result.mobile = $("[data-verifyFormItem='mobile']").val();
      result.smsCode = $("[data-verifyFormItem='smsCode']").val();
      if (this.options.regBeforeSend) {
        this.options.regBeforeSend(result);
      }
      if (!result.mobile) {
        this.options.msg('请输入手机号', 'register')
        return;
      }
      if (!result.smsCode) {
        this.options.msg('请输入验证码', 'register')
        return;
      }
      this.smsRegFunc(result)
    },

    smsRegFunc: function (result){
      var self = this;
      if (!result) result = {}
      var params = {mobile: result.mobile, smsCode: result.smsCode};
      if (this.options.regBeforeSend) {
        this.options.regBeforeSend(params);
      }
      if (result) {
        params.lot_number= result.lot_number;
        params.pass_token= result.pass_token;
        params.gen_time= result.gen_time;
        params.captcha_output= result.captcha_output;
      }
      rsaApi(this.options.smsRegisterApi,params, function (res) {
        if (res.code == '0') {
          // self.options.msg('登录成功')
          self.options.regSuccess(res);
        } else {
          self.options.msg(res.msg, 'register', 'mobile')
        }
      })
    },

    initGeetest4: function (loadBack, successBack) {
      initGeetest4(this.options.Geetest4Options, function (captcha) {
        captcha.appendTo("body"); // 调用appendTo将验证码插入到页的某一个元素中，这个元素用户可以自定义
        // captcha为验证码实例
        captcha.onReady(function () {
          // 验证码ready之后才能调用verify方法显示验证码
          // self.captcha = captcha;
          loadBack && loadBack(captcha);
        });
        captcha.onSuccess(function () {
          var result = captcha.getValidate();
          if (!result) {
            alert("请完成验证");
          } else {
            successBack && successBack(result);
          }
        });
        captcha.onError(function (err) {
          console.log("captcha onError", err);
        });
        captcha.onClose(function () {
        });
        
      });
    },
    loadScript: function (url, callback) {
      var script = document.createElement("script");
      script.charset = "UTF-8";
      script.async = true;

      // 对geetest的静态资源添加 crossOrigin
      if (/static\.geetest\.com/g.test(url)) {
        script.crossOrigin = "anonymous";
      }

      script.onerror = function () {
        // 错误触发了，超时逻辑就不用了
        loaded = true;
      };
      var loaded = false;
      script.onload = script.onreadystatechange = function () {
        if (!loaded && (!this.readyState || this.readyState === "loaded" || this.readyState === "compvare")) {
          loaded = true;
          setTimeout(function () {
            callback && callback(false);
          }, 0);
        }
      };
      script.src = location.protocol + url;
      document.head.appendChild(script);
    },
    loadGt4js: function () {
      var self = this;
      if (!window.initGeetest4) {
        this.loadScript("//static.geetest.com/v4/gt4.js");
      }
    },

    clickSubmit: function (formIndex, formType, iframeMessageId) {
      if (this.options.needGeetest ) {
        this.handleCaptchaShowbox(formIndex, formType, iframeMessageId)
        return;
      }
      if (formType == 'login') {
        if (this.loginType == 'mobile') {
          this.handleSmsLogin({});
        } else {
          this.loginFunc(formIndex, null, iframeMessageId);
        }
      } else {
        if (this.loginType == 'mobile') {
          this.handleSmsReg({});
        } else {
          this.registerFunc(formIndex, null, iframeMessageId);
        }
      }
    },
    registerFunc: function (formIndex, result, iframeMessageId) {
      var self = this;
      if (!result) {
        result = {};
      }
      var $form = jQuery("[data-verifyForm]").eq(formIndex);
      var params = {
        userSourceYz: 1,
        type: self.options.needGeetest ? "yzm" : undefined,
        service: "regUser",
        cn: $form.find("[data-verifyFormItem='username']").val(),
        pwd: $form.find("[data-verifyFormItem='password']").val(),
      };
      if (this.options.regBeforeSend) {
        this.options.regBeforeSend(params);
      }
      params.lot_number= result.lot_number;
      params.pass_token= result.pass_token;
      params.gen_time= result.gen_time;
      params.captcha_output= result.captcha_output;

      rsaApi(this.options.apiUrl, params, function (data) {
        if (data.errno == 3) {
          self.options.needGeetest = true;
          self.setLocalsTimer();
          self.handleCaptchaShowbox(formIndex, 'register', iframeMessageId)
        } else if (self.options.regSuccess) {
          self.options.regSuccess(data);
        }
      });
    },
    loginFunc: function (formIndex, result, iframeMessageId) {
      var self = this;
      if (!result) {
        result = {};
      }
      var $form = jQuery("[data-verifyForm]").eq(formIndex);
      var params = {
        service: "login",
        cn: $form.find("[data-verifyFormItem='username']").val(),
        pwd: $form.find("[data-verifyFormItem='password']").val(),
      };
      if (this.options.loginBeforeSend) {
        this.options.loginBeforeSend(params);
      }

      if (result.smsCode ) {
        params.smsCode = result.smsCode;
      } else {
        params.userSourceYz = 1;
        params.type = self.options.needGeetest ? "yzm" : undefined;
        params.lot_number= result.lot_number;
        params.pass_token= result.pass_token;
        params.gen_time= result.gen_time;
        params.captcha_output= result.captcha_output;
      }
      
      rsaApi(this.options.apiUrl, params, function (data) {
        if (data.errno == 3) {
          self.options.needGeetest = true;
          self.setLocalsTimer();
          self.handleCaptchaShowbox(formIndex, 'login', iframeMessageId)
        } else if (data.result == 'errsmscode') {
          if (iframeMessageId) {
            self.options.loginSuccess(data);
            window.postMessage(JSON.stringify({ type: 'loadSafePhone', id: iframeMessageId, phone: data.data, err: data.msg || '验证码错误'}), '*')
            return;
          }
          var iframe = document.getElementById('layui-layer-iframe' + self.layerIndex);
          if (iframe) {
            iframe.contentWindow.postMessage(
              JSON.stringify({ type: 'loadSafePhone', id: iframeMessageId, phone: data.data, err: data.msg || '验证码错误'}), 
              '*'
            );
          }

        } else if (data.result == 'errsms' ) {
          if (iframeMessageId) {
            self.options.loginSuccess(data);
            window.postMessage(JSON.stringify({ type: 'loadSafePhone', id: iframeMessageId, phone: data.data}), '*')
            return;
          }
          self._loginParams = params;
          self._formIndex = formIndex;
          self.layerIndex = layer.open({
            type: 2,
            area: ['315px', '300px'],
            title: '安全防护验证',
            content: ['//www.602.com/index.php?m=member&c=index&a=safePhone', 'no'], //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
            success: function(layero, index){
              setTimeout(function(){
                var iframe = document.getElementById('layui-layer-iframe' + index)
                if (iframe) {
                  iframe.contentWindow.postMessage(
                    JSON.stringify({ type: 'loadSafePhone', id: iframeMessageId,  phone: data.data}), 
                    '*'
                  );  
                }
              }, 10)
            }
          });
        } else if (self.options.loginSuccess) {
          layer.close(self._formIndex)
          self.options.loginSuccess(data);
          self._loginParams = null;
          self._formIndex = null;
        }
      });
    },
    handleCaptchaShowbox: function (formIndex, type, iframeMessageId) {
      var self = this;
      if (this.options.needGeetest && iframeMessageId) {
        window.parent.postMessage(JSON.stringify({type: 'geetest', id: iframeMessageId, funcType: type}), '*')
        return
      }
      if (self.captchaList[formIndex]) {
        self.captchaList[formIndex].showBox();
      } else {
        self.initGeetest4(function (captcha) {
          self.captchaList[formIndex] = captcha;
          captcha.showBox();
        }, function(results) {
          if (type === 'login') {
            if (self.loginType == 'account') {
              self.loginFunc(formIndex, results, iframeMessageId)
            } else {
              self.handleSmsLogin(results);
            }
          } else {
            if (self.loginType == 'account') {
              self.registerFunc(formIndex, results, iframeMessageId);
            } else {
              self.handleSmsReg(results);
            }
          }
        })
      }
    },
    checkNameOnService: function (value) {
      var self = this;
      return new Promise(function (rel, rej) {
        var debouncedCheck = debounce(function (value) {
          var params = {
            Math: Math.random(),
            service: "checkCn",
            cn: value,
          };
          rsaApi(self.options.checkNameApi, params, function (data) {
            if (data.result === "success") {
              rel(true);
            } else {
              rel(data.msg ? (data.msg !== "err" ? data.msg : "用户名已经存在") : "用户名已经存在");
            }
          });
        }, 300); // 设置防抖延迟，例如300毫秒

        debouncedCheck(value);
      });
    },
    checkNeedGeetest: function (callback) {
      var self = this;
      var lk = this.options.localStorageKey;
      /**
       * ld.t 极验上次登录时间戳
      */
      var ld = localStorage.getItem(lk);
      
      if (!ld) {
        this.loadRemoteNeedCode(callback);
        return ;
      }
      try {
        var ldate = JSON.parse(ld);
        if (ldate && ldate.t) {  
          var now = new Date().getTime();
          var t = ldate.t;
          if (now - t < 1000 * 60 * 60 * 24 ) {
            self.options.needGeetest = true;
            callback()
          } else {
            localStorage.removeItem(lk);
            this.loadRemoteNeedCode(callback);
          }
        } else {
          this.loadRemoteNeedCode(callback);
        }
      } catch (error) {
        console.log(error)
        this.loadRemoteNeedCode(callback);
      }
    },
    loadRemoteNeedCode: function (callback) {
      var self = this;
      rsaApi(this.options.apiUrl, {service: "jycode"}, function (data) {
        console.log(data.result)
        if (data.result == "1") {
          self.options.needGeetest = true;
          self.setLocalsTimer();
        }
        // console.log('jycode ', data)
        callback();
      }, function () {
        callback();
      })
    },
    setLocalsTimer: function (){
      localStorage.setItem(this.options.localStorageKey, JSON.stringify({"t": this.getTodayZeroTimestamp()}))
    },
    getTodayZeroTimestamp: function () {
      var today = new Date();
      today.setHours(0, 0, 0, 0); // 设置时间为零点
      return today.getTime(); // 返回该时间的时间戳
    },
    loadLayer: function () {
      if (!window.layer) {
        this.loadScript("//static-1.602.com/602/public/public-plug/layer-3.5/layer.js");
      }
    },
    initPostMessage: function () {
      var self = this;
    
      window.isLoginPostMessage = true;
      window.addEventListener('message', function(event) {
        // 解析接收到的消息
        var message = JSON.parse(event.data);
        if (message.type == 'safePhone') {
          if (self._loginParams && self._loginParams.pwd) {
            self._loginParams.smsCode = message.smsCode;
            self.loginFunc(self._formIndex, self._loginParams)
          }
          
        }
        
        // 根据message执行相应操作
      }, false);
    }
  };

  function extend(target, source, depth ) {
    if (!depth) {
      depth = 3
    }
    // 检查深度是否超过限制
    if (depth === 0) {
      throw new Error('Depth limit reached');
    }

    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        // 如果源对象的属性值是对象并且不是null，进行深度扩展
        if (typeof source[prop] === 'object' && source[prop] !== null) {
          // 如果目标对象没有此属性或者属性值不是对象，创建一个新的空对象
          if (!target.hasOwnProperty(prop) || typeof target[prop] !== 'object') {
            target[prop] = Object.prototype.toString.call(source[prop]) === '[object Array]' ? [] : {};
          }
          // 对属性值进行深度扩展
          extend(target[prop], source[prop], depth - 1);
        } else {
          // 如果属性值不是对象，直接复制
          target[prop] = source[prop];
        }
      }
    }
    return target;
  }

  // 防抖函数
  function debounce(func, wait) {
    var timeout;
    return function () {
      var context = this;
      var args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    };
  }

  function getRsaData (paramObj) {
    var aes = generatekey();
    var datas = JSON.stringify(paramObj);
    var md5data = jQuery.md5(datas);
    var securityKey = rsaencrypt(md5data + aes);
    var securityData = aesencrypt(datas, aes);
    return {
      securityKey: securityKey,
      securityData: securityData,
      aes: aes,
    };
  }

  function rsaApi (url, params, callback, errBack) {
    console.log('rsaApi before', JSON.stringify(params))
    var securityData = getRsaData(params);
    jQuery.ajax({
      type: "POST",
      url: url,
      data: securityData.securityData,
      headers: {
        securityKey: securityData.securityKey,
      },
      success: function (res) {
        var resData = JSON.parse(aesdecrypt(res, securityData.aes));
        console.log('rsaApi response', JSON.stringify(resData))
        callback(resData);
      },
      error: function (err) {
        errBack && errBack(err);
      },
    });
  }

  function validatePassword(username) {
    var hasUpperCase = /[A-Z]/.test(username);
    var hasLowerCase = /[a-z]/.test(username);
    var hasNumber = /\d/.test(username);
    var hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(username);

    var count = (hasUpperCase ? 1 : 0) + (hasLowerCase ? 1 : 0) + (hasNumber ? 1 : 0) + (hasSpecialChar ? 1 : 0);

    return count >= 3;
  }
  function assignS (target, source) {
    for (var obj in source) {
    target[obj] = source[obj];
    }
    return target;
  };
  function checkUserNameSync(value, formType) {
    if (!value) {
      return '账号由6~16位数字、字母或下划线组成'
    } else if (formType === 'login') {
      return true
    }  else if (/^\d+$/.test(value)) {
      return "账号由6~16位数字、字母或下划线组成";
    } else if (/^\_+$/.test(value)) {
      return "账号由6~16位数字、字母或下划线组成";
    } else if (!/^[a-zA-Z0-9][a-zA-Z0-9_]{5,15}$/.test(value)) {
      return "账号由6~16位数字、字母或下划线组成";
    } else {
      return 'checkOnService'
    }
  }
  window.CommonLoginClass = CommonLoginClass;
  window.CommonLoginClass.rsaApi = rsaApi;
  window.CommonLoginClass.checkUserNameSync = checkUserNameSync;
})();
