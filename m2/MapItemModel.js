/***
 *
 *des:
 *by:guwanyuan(顾万圆)
 *2015-4-2 下午2:11:07
 ***/
//class com.modules.map.model.MapItemModel
var MapItemModel = (function () {
  function MapItemModel(mapModule) {
    /**
     *以像素坐标为键，存贮该坐标上的所有物品Array
     */
    this._gridHash = null;
    /**
     *以唯一id为键，存贮MapDropItem
     */
    this._dropItemHash = null;
    /**
     *以唯一group为键， 存贮该组的所有物品Dict
     */
    this._groupItemHash = null;
    this._mapModule = null;
    this._autoTimeing = false;
    this._spaceKeyLastTime = 0;
    this._mapModule = mapModule;
    this.init();
  }

  __class(MapItemModel, 'com.modules.map.model.MapItemModel');
  var __proto = MapItemModel.prototype;
  __proto.init = function () {
    this._gridHash = {};
    this._dropItemHash = new Dict();
    this._groupItemHash = new Dict();
  };

  __proto.getItemKey = function (px, py) {
    px = Math.floor(px / MapConfig.MAP_NODE_WIDTH);
    py = Math.floor(py / MapConfig.MAP_NODE_HEIGHT);
    return px * 100000 + py;
  };

  __proto.checkDropItemInNodeAndTake = function (px, py) {
    var key = this.getItemKey(px, py);
    var arr = this._gridHash[key];
    if (arr && arr.length > 0) {
      var item = arr[arr.length - 1];
      item.mouseDown();
      return true;
    }
    return false;
  };

  /**
   *检查捡取物品
   *
   */
  __proto.checkCanDropItem = function (px, py) {
    var key = this.getItemKey(px, py);
    var arr = this._gridHash[key];
    if (arr) {
      if (GlobalControl.isAutoFight) {
        var item;
        for (var $each_item in arr) {
          item = arr[$each_item];
          if (this._mapModule.autoFightRobot.itemIsCanTakeUp(item)) {
            this._mapModule.sendCommand.takeUpItem(item);
          } else if (this._mapModule.autoFightRobot.isInTakeDropItemList(item)) {
            this._mapModule.sendCommand.takeUpItem(item);
          }
        }
      } else {
        var bean;
        var $each_item;
        for ($each_item in arr) {
          item = arr[$each_item];
          bean = App.dataMgr.q_itemContainer.getDataBean(item.itemId, false);
          if (bean != null) {
            if (ShiquCenter.getInstance().isPickup(item.itemId, item.count)) {
              this._mapModule.sendCommand.takeUpItem(item);
              break;
            }
          }
        }
      }
    }
  };

  /**
   *重置地表物品的可见
   *
   */
  __proto.resetAllIsInVisibleArea = function () {
    this.resetShow();
  };

  __proto.resetShow = function () {
    var arr;
    for (var $each_arr in this._gridHash) {
      arr = this._gridHash[$each_arr];
      if (arr.length > 0) {
        arr[arr.length - 1].checkShow();
      }
    }
  };

  /**
   *显示、隐藏 掉落光柱特效
   *
   */
  __proto.showHideRole = function (data) {
    var values = this._dropItemHash.values;
    var item;
    for (var $each_item in values) {
      item = values[$each_item];
      item.checkDropEffect();
    }
  };

  /**
   *添加掉落物品
   *@param vo
   *
   */
  __proto.addDropItem = function (info, isDrop, i, mapId) {
    i === void 0 && (i = 0);
    mapId === void 0 && (mapId = 0);
    var onlyId = info.dropGoodsId.toString();
    var itemId = info.itemModelId;
    var x = info.x;
    var y = info.y;
    if (this._dropItemHash.has(onlyId) == false) {
      if (!this._autoTimeing) {
        this._autoTimeing = true;
        Laya.workerTimer.loop(2000, this, this.autoTakeItem);
      }
      var item = MapDropItem.getItemView(this._mapModule);
      item.setInfo(itemId, onlyId, info, mapId);
      item.pos(x, y);
      item.addParent(this._mapModule.scene.mapItemContainer, this._mapModule.scene.mapItemTextContainer, this._mapModule.scene.mapItemEffectContainer);
      this._dropItemHash.set(onlyId, item);
      var key = this.getItemKey(x, y);
      var arr = this._gridHash[key];
      if (!arr) {
        arr = [];
        this._gridHash[key] = arr;
      } else if (arr.length > 0) {
        for (var k = 0; k < arr.length; k++) {
          arr[k].clearDropJump();
          arr[k].removeFromScene();
        }
      }
      arr.push(item);
      var dict = this._groupItemHash.get(item.group);
      if (!dict) {
        dict = new Dict();
        this._groupItemHash.set(item.group, dict);
      }
      dict.set(onlyId, item);
      if (isDrop) {
        if (i < 2) {
          item.clearDropJump();
          item.dropJump();
        } else {
          if (i % 2 == 1) {
            i -= 1;
          }
          item.delayDropJump(Q_globalCenter.getInt(183) * i);
        }
      } else {
        item.clearDropJump();
      }
      if (!GlobalCenter.tip_kongge) {
        var characterData = App.role;
        if (characterData != null && !GlobalControl.isAutoFight) {
          if (characterData.personId == item.ownerId) {
            if (Browser.onPC) {
              GameNotice.showGuideMessage('使用快捷键“空格键”可拾取掉落物品');
            }
            GlobalCenter.tip_kongge = true;
          }
        }
      }
    } else {
      var bean = App.dataMgr.q_itemContainer.getDataBean(itemId, false);
      if (bean != null) {
        var str = '物品掉落有重复：' + '唯一ID：' + onlyId + '，配置ID：' + itemId + '，物品名称：' + ItemUtil.getItemNameBean(bean) + '，坐标X：' + myparseInt(info.x / MapConfig.MAP_NODE_WIDTH) + '，坐标Y：' + myparseInt(info.y / MapConfig.MAP_NODE_HEIGHT);
        Log.logError(str);
      }
    }
  };

  __proto.deleteDropItem = function (id) {
    if (this._dropItemHash.has(id)) {
      var item = this._dropItemHash.get(id);
      var key = this.getItemKey(item.x, item.y);
      var group = item.group;
      this._dropItemHash.remove(id);
      if (GlobalControl.isAutoFight) {
        this._mapModule.autoFightRobot.deleteDropItem(item);
      }
      var arr = this._gridHash[key];
      if (arr) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i]['itemOnlyId'] == id) {
            arr.splice(i, 1);
            if (arr.length <= 0) {
              this._gridHash[key] = null;
              delete this._gridHash[key];
            }
            break;
          }
        }
      }
      var dict = this._groupItemHash.get(group);
      if (dict) {
        dict.remove(id);
        if (dict.size == 0) {
          dict.dispose();
          this._groupItemHash.remove(group);
          if (this._groupItemHash.size == 0) {
            if (this._autoTimeing) {
              this._autoTimeing = false;
              Laya.workerTimer.clear(this, this.autoTakeItem);
            }
          }
        }
      }
      item.dispose();
    }
  };

  __proto.getDropItem = function (itemOnlyId) {
    return this._dropItemHash.get(itemOnlyId);
  };

  __proto.getOneDropItem = function () {
    if (this._dropItemHash && this._dropItemHash.size > 0) {
      var array = [];
      var values = this._dropItemHash.values;
      var item;
      for (var $each_item in values) {
        item = values[$each_item];
        if (ShiquCenter.getInstance().isPickup(item.itemId, item.count)) {
          if (item.tryTakeCount <= 0) {
            array.push(item);
          }
        }
      }
      if (array.length > 1) {
        array = ShiquCenter.sortPickItemsByRole(array);
      }
      item = array.shift();
      return item;
    }
    return null;
  };

  __proto.takeUpDropItemBySpace = function () {
    var ct = getTimer();
    if (ct - this._spaceKeyLastTime >= 100) {
      this._spaceKeyLastTime = ct;
      if (GlobalControl.isAutoFight) {
        if (AutoGameRobot.roleState == 'role_pick_item') {
        } else {
          var item = App.mapModule.mapItemModel.getOneDropItem();
          if (item) {
            App.mapModule.autoFightRobot.dropMapItem(item);
          }
        }
      } else {
        App.mapModule.mapSkillModel.clearAuto();
        item = App.mapModule.mapItemModel.getOneDropItem();
        if (item) {
          App.mapModule.mapItemModel.takeUpDropItem(item.x, item.y);
        }
      }
    }
  };

  __proto.takeUpDropItem = function (px, py) {
    this._mapModule.mapSkillModel.clearAuto();
    App.closeAutoFight('takeUpDropItem:手动拾取物品');
    var role = App.role;
    if (role.roleView.x == px && role.roleView.y == py) {
      this._mapModule.mapItemModel.checkCanDropItem(px, py);
    } else {
      var vo = new SearchToPointVO();
      vo.type = 'MapItemModel.takeUpDropItem';
      vo.px = px;
      vo.py = py;
      var list = this._mapModule.mapMoveModel.searchRoadByAstar(vo, false, true);
      if (list && list.length > 0) {
        role.actionList.resetActionList(list);
      }
    }
  };

  __proto.changeDebugMode = function () {
    var values = this._dropItemHash.values;
    var item;
    for (var $each_item in values) {
      item = values[$each_item];
      item.changeName();
    }
  };

  __proto.clear = function () {
    if (this._autoTimeing) {
      this._autoTimeing = false;
      Laya.workerTimer.clear(this, this.autoTakeItem);
    }
    var values = this._dropItemHash.values;
    var item;
    for (var $each_item in values) {
      item = values[$each_item];
      item.dispose();
    }
    this.init();
  };

  /**
   *是否有物品可拾取
   *@return
   *
   */
  __proto.hasDropItem = function () {
    if (this._dropItemHash != null && this._dropItemHash.size > 0) {
      var values = this._dropItemHash.values;
      var item;
      for (var $each_item in values) {
        item = values[$each_item];
        if (ShiquCenter.getInstance().isMy(item) <= 0) {
          if (ShiquCenter.getInstance().isPickup(item.itemId, item.count)) {
            return true;
          }
        }
      }
    }
    return false;
  };

  /**
   *是否有物品可拾取
   *@return
   *
   */
  __proto.hasDropItemByXY = function (px, py) {
    if (this._gridHash != null) {
      var key = this.getItemKey(px, py);
      var arr = this._gridHash[key];
      return arr != null && arr.length > 0;
    }
    return false;
  };

  /**
   *全屏自动拾取
   *
   */
  __proto.autoTakeItem = function () {
    var role = App.role;
    if (!role || !role.mapBean || role.mapBean.q_limit_shiqu > 0) {
      return;
    }
    if (this._groupItemHash.size > 0) {
      if (SkillCenter.getPassSkill(20512) != null) {
        var grids = BagItemCenter.getEmptyGridCount();
        if (grids > 0) {
          var groups = [];
          var keys = this._groupItemHash.keys;
          for (var i = 0; i < keys.length; i++) {
            var dict = this._groupItemHash.get(keys[i]);
            var values = dict.values;
            if (values.length > 0) {
              var item = values[0];
              var distance = Math.abs(item.sourceX - role.nodex) + Math.abs(item.sourceY - role.nodey);
              groups.push({ group: item.group, dt: distance });
            }
          }
          var group;
          var result = [];
          var shiqu = ShiquCenter.getInstance();
          groups.sort(MathUtil.sortByKey('dt'));
          for (i = 0; i < groups.length; i++) {
            group = groups[i]['group'];
            dict = this._groupItemHash.get(group);
            values = dict.values;
            for (var j = 0; j < values.length; j++) {
              item = values[j];
              if (shiqu.isMy(item) == 0) {
                result.push(Int64.parseInt64(item.itemOnlyId));
                grids--;
                if (grids <= 0) {
                  break;
                }
              }
            }
          }
          if (result.length > 0) {
            this._mapModule.sendCommand.autoTakeUpItem(result);
          }
        }
      }
    }
  };

  __getset(0, __proto, 'dropItemHash', function () {
    return this._dropItemHash;
  });

  return MapItemModel;
})();
