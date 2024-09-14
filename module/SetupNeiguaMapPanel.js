var SetupNeiguaMapPanel=(function(_super){
	function SetupNeiguaMapPanel(){
		this._view=null;
		/**NeiGuaFight的_saveMapIds中的索引，表明此次打开设置的是哪个索引地图 */
		this._index=0;
		this._tabArr=[];
		this._tabIndex=-1;
		this._fightBossId=0;
		SetupNeiguaMapPanel.__super.call(this);
	}

	__class(SetupNeiguaMapPanel,'com.modules.setup.neigua.SetupNeiguaMapPanel',_super);
	var __proto=SetupNeiguaMapPanel.prototype;
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._view=null;
		_super.prototype.destroy.call(this);
	}

	__proto.init=function(){
		this._view=new SetupNeiguaMapPanelUI();
		this.addChild(this._view);
		this._view.select_img.removeSelf();
		this._view.tablist.scrollBarAllwaysShow="off";
		this._view.tablist.itemRender=SetupNeiguaMapTabUI;
		this._view.tablist.renderHandler=GameHandler.create(this,this.renderTabFunc);
		this._view.tablist.selectHandler=GameHandler.create(this,this.selectTabFunc);
		this._view.itemlist.scrollBarAllwaysShow="off";
		this._view.itemlist.itemRender=SetupNeiguaMapItemUI;
		this._view.itemlist.renderHandler=GameHandler.create(this,this.renderItemFunc);
		this._view.itemlist.selectHandler=GameHandler.create(this,this.selectItemFunc);
	}

	__proto.renderTabFunc=function(item,index){
		var arr=this._view.tablist.array;
		if(arr){
			var bean=arr[index];
			if(bean){
				var ids=JSON.parse(bean.q_monster_id);
				var rbean=App.dataMgr.q_monster_rankContainer.getDataBean(BossDataCenter.instance.getBossWorldRank(ids[0]));
				if(rbean){
					item.btn.label=rbean.q_rank_lv+"阶BOSS";
				}
			}
			if(index==this._tabIndex){
				if(!item.contains(this._view.select_img)){
					item.addChild(this._view.select_img);
				}
				}else{
				if(item.contains(this._view.select_img)){
					this._view.select_img.removeSelf();
				}
			}
		}
	}

	__proto.selectTabFunc=function(index){
		this._tabIndex=index;
		var item=this._view.tablist.selection;
		if(item){
			item.addChild(this._view.select_img);
		}
		this._fightBossId=this._view.tablist.array[index].q_id;
		var obj=Q_globalCenter.getJsonData(15178);
		if(obj){
			this._view.itemlist.array=obj[this._fightBossId];
			this._view.itemlist.resetSelectedIndex();
		}
	}

	// 清除选中状态，否则切换Tab后，itemlist点击上一次选中的会没反应
	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		_super.prototype.show.call(this);
		this._tabArr.length=0;
		var beans=App.dataMgr.q_fightBossContainer.getListBy(21);
		for(var i=0;i < beans.length;i++){
			if(TaskModel.getTaskData(beans[i].q_jingjie)==null){
				this._tabArr.push(beans[i]);
			}
		}
		this._tabArr.reverse();
		this._view.tablist.array=this._tabArr;
	}

	__proto.updatePanel=function(data,tab){
		(tab===void 0)&& (tab=-1);
		this._index=data;
		tab=-1;
		var obj=Q_globalCenter.getJsonData(15178);
		if(obj){
			for(var i=0;i < this._tabArr.length;i++){
				if(tab >-1){
					break ;
				};
				var fightBossId=this._tabArr[i].q_id;
				var arr=obj[fightBossId];
				if(arr){
					for(var j=0;j < arr.length;j++){
						if(ConditionUtil.isMapCanEnterByMapId(arr[j])){
							tab=i;
							break ;
						}
					}
				}
			}
		}
		if(tab==-1){
			tab=this._tabArr.length-1;
		}
		if(tab < 8){
			this._view.tablist.scrollTo(0);
			}else if(tab > this._tabArr.length-9){
			this._view.tablist.scrollTo(this._tabArr.length-8);
			}else{
			this._view.tablist.scrollTo(tab-4);
		}
		this._view.tablist.resetSelectedIndex();
		this._view.tablist.selectedIndex=tab;
	}

	__proto.hide=function(){
		_super.prototype.hide.call(this);
		this._tabIndex=-1;
		this._fightBossId=0;
		this._view.tablist.resetSelectedIndex();
	}

	__proto.renderItemFunc=function(item,index){
		var arr=this._view.itemlist.array;
		if(arr){
			var mapId=arr[index];
			var bean=App.dataMgr.q_mapContainer.getDataBean(mapId,false);
			if(bean){
				item.name_txt.text=bean.q_map_info+bean.q_map_name;
				var colors=ConditionUtil.getMapEnterColors(bean);
				item.tag=colors.indexOf("#ef0605")==-1;
				item.desc_txt.htmlText=StringFormat.getSubstitute(ConditionUtil.getMapEnterDesc(bean),colors);
				index=NeiGuaFight.getIndexByMapId(mapId);
				if(index==-1){
					item.ck.gray=false;
					item.ck.selected=false;
				}
				else{
					if(index==this._index){
						item.ck.gray=false;
						}else{
						item.ck.gray=true;
					}
					item.ck.selected=true;
				}
			}
		}
	}

	__proto.selectItemFunc=function(index){
		var item=this._view.itemlist.selection;
		if(item){
			if(!Boolean(item.tag)){
				GameNotice.showMousePosMessage("地图进入条件不足");
				return;
			}
			if(item.ck.selected){
				return;
			};
			var mapId=this._view.itemlist.array[index];
			NeiGuaFight.setSaveMapId(this._index,mapId);
			this._view.itemlist.updateList();
		}
	}

	return SetupNeiguaMapPanel;
})(BasePanel)