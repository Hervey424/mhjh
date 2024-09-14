/**
*面板管理
*@author 胡剑
*创建时间：2015-7-21 上午11:51:00
*
*/
//class com.game.core.panel.PanelManager
var PanelManager=(function(){
	function PanelManager(){}
	__class(PanelManager,'com.game.core.panel.PanelManager');
	__getset(1,PanelManager,'parent',function(){return App.stageLayer.moduleLayer;});
	__getset(1,PanelManager,'loader',function(){return PanelManager._loader;});
	PanelManager.getPanel=function(panelName){
		if(!panelName){
			return null;
		}
		if((typeof panelName=='string')){
			return PanelManager._panelDict[panelName];
		};
		var pn=panelName.name;
		if(!pn){
			pn=getFunctionName(panelName);
		}
		return PanelManager._panelDict[pn];
	}

	PanelManager.hidePanel=function(panelName){
		if(!panelName || !((typeof panelName=='string'))){
			return;
		};
		var p=PanelManager.getPanel(panelName);
		if(p){
			p.visible=false;
			PanelManager._setVibiles.push(p);
		}
	}

	PanelManager.isShowing=function(panelName,tab){
		(tab===void 0)&& (tab=0);
		var app=PanelManager.getPanel(panelName);
		if(app){
			if((Laya.__typeof(app,'com.game.core.panel.IPanel'))&& (app).isShowing(tab)){
				return true;
			}
			if((app).parent){
				return true;
			}
		}
		return false;
	}

	PanelManager.getPanelInfo=function(panelName){
		var app;
		if((typeof panelName=='string')){
			app=PanelManager._allPanelDict[panelName];
			}else{
			var pn=panelName.name;
			if(!pn){
				pn=getFunctionName(panelName);
			}
			app=PanelManager._allPanelDict[pn];
		}
		return app;
	}

	PanelManager.registerPanel=function(className,res,isDestroyRes,loadingTip){
		(isDestroyRes===void 0)&& (isDestroyRes=true);
		var panelName=className.name;
		if(!panelName){
			panelName=getFunctionName(className);
		};
		var app=PanelManager.getPanelInfo(panelName);
		if(app==null){
			app=new PanelInfo(panelName,res,isDestroyRes,loadingTip,className);
			PanelManager._allPanelDict[panelName]=app;
		}
		return panelName;
	}

	PanelManager.openPanel=function(panelName,data,tab,isSwitch,isUpdate,from,layout){
		(tab===void 0)&& (tab=-1);
		(isSwitch===void 0)&& (isSwitch=true);
		(isUpdate===void 0)&& (isUpdate=true);
		(layout===void 0)&& (layout=1);
		if(panelName !=PanelRegister.MAP && panelName !=PanelRegister.LOG && panelName !=PanelRegister.GM && panelName !=PanelRegister.MESSAGE
			&& panelName !=PanelRegister.SETUP && panelName !=PanelRegister.REVIVE && panelName !=PanelRegister.FUZHAN_PK_RESULT && panelName !=PanelRegister.FUZHAN_RESULT){
			if(GlobalControl.isJiaoyi){
				GameNotice.showMousePosMessage("交易中无法执行此操作");
				return;
			}
			if(GlobalControl.isInkuafu || FuzhanCenter.isBenfu){
				GameNotice.showMousePosMessage("当前跨服地图不支持此功能");
				return;
			}
		};
		var app=PanelManager._panelDict[panelName];
		if(app==null){
			var info=PanelManager.getPanelInfo(panelName);
			if(info==null){
				Log.logError("面板 "+panelName+" 不存在，请检查在 PanelRegister 类中是否有注册");
			}
			else{
				if(!PanelManager._panelLoadingDict[panelName]){
					PanelManager._panelLoadingDict[panelName]=true;
					if(info.res==null || info.res.length==0){
						PanelManager.onModuleLoaded(info,data,tab,isSwitch,isUpdate,from,layout);
					}
					else{
						info.callback=Handler.create(PanelManager,com.game.core.panel.PanelManager.onModuleLoaded,[info,data,tab,isSwitch,isUpdate,from,layout]);
						if(PanelManager._loader==null){
							PanelManager._loader=new PanelLoader();
						}
						PanelManager._loader.loadModule(info);
					}
				}
			}
		}
		else{
			PanelDispose.remove(app.getDisposeKey());
			PanelManager.addModule(app,data,tab,isSwitch,isUpdate,from,layout);
		}
	}

	PanelManager.deleteLoadingPanel=function(panelName){
		delete PanelManager._panelLoadingDict[panelName];
	}

	PanelManager.onModuleLoaded=function(info,data,tab,isSwitch,isUpdate,from,layout){
		var cls=info.className;
		if(cls !=null){
			var app=PanelManager._panelDict[info.panelName];
			if(app==null){
				app=new cls();
				app.resetDisposeCD();
				PanelManager._panelDict[info.panelName]=app;
			}
			PanelManager.deleteLoadingPanel(info.panelName);
			PanelManager.addModule(app,data,tab,isSwitch,isUpdate,from,layout);
		}
	}

	PanelManager.addModule=function(app,data,tab,isSwitch,isUpdate,from,layout){
		if(app !=null){
			if(app.isShowing(tab)){
				if(isSwitch){
					PanelManager.removePanel(app.panelName);
				}
				else{
					if(isUpdate){
						app.updatePanel(data,tab);
					};
					var p=app.parent;
					if(!p){
						p=PanelManager.parent;
					}
					p.addChild((app));
				}
			}
			else{
				var layer;
				if(app.panelName==PanelRegister.REVIVE){
					layer=App.stageLayer.topLayer;
				}
				else{
					layer=PanelManager.parent;
				}
				if(PanelManager.parent.numChildren <=0){
					PanelManager.addToCenter(app,data,tab,layer);
					PanelManager.openTweenComplete(app);
				}
				else{
					app.from=from;
					var i=0;
					var otherApp;
					switch(app.panelName){
						case PanelRegister.MAIL:{
								PanelManager.removePanel(PanelRegister.SETUP,false);
								break ;
							}
						case PanelRegister.SETUP:{
								PanelManager.removePanel(PanelRegister.MAIL,false);
								break ;
							}
						};
					var vec=[];
					var totalWidth=0;
					var maxHeight=0;
					var index=0;
					if(app.coexistPanelNameList==null || app.coexistPanelNameList.length==0){
						PanelManager.addToCenter(app,data,tab,layer);
						PanelManager.openTweenComplete(app);
						return;
					}
					else{
						for(i=0;i < PanelManager.parent.numChildren;i++){
							otherApp=PanelManager.parent.getChildAt(i);
							if(otherApp !=null){
								if(app.coexistPanelNameList.indexOf(otherApp.panelName)!=-1){
									index=PanelManager.PANEL_SORT.indexOf(otherApp.panelName);
									if(index==-1){
										vec.unshift(otherApp);
										}else{
										vec[index]=otherApp;
									}
									totalWidth+=otherApp.width;
									if(otherApp.height > maxHeight){
										maxHeight=otherApp.height;
									}
								}
							}
						}
					}
					if(vec.length==0){
						PanelManager.addToCenter(app,data,tab,layer);
						PanelManager.openTweenComplete(app);
						return;
					}
					index=PanelManager.PANEL_SORT.indexOf(app.panelName);
					if(index==-1){
						vec.push(app);
						}else{
						vec[index]=app;
					}
					PanelManager.addToCenter(app,data,tab,layer);
					totalWidth+=app.width;
					if(app.height > maxHeight){
						maxHeight=app.height;
					};
					var sw=PanelManager.parent.stage.stageWidth;
					var sh=PanelManager.parent.stage.stageHeight;
					var centerX=sw-totalWidth >> 1;
					var centerY=0;
					if(maxHeight > sh){
						centerY=-app.closeBtn.y;
					}
					else{
						centerY=sh-maxHeight >> 1;
						if(!Browser.onPC){
							centerY+=10;
						}
					}
					if(centerX < 0){
						centerX=0;
					};
					var tempX=centerX;
					var tempY=centerY;
					var isFirst=true;
					for(i=0;i < vec.length;i++){
						if(vec[i] !=null){
							if((vec[i]).stage !=null){
								PanelManager.parent.addChild((vec[i]));
								if(layout==2){
									tempY=centerY+(maxHeight-(vec[i]).height);
								}
								if(tempX+vec[i].width > PanelManager.parent.stage.stageWidth){
									tempX=PanelManager.parent.stage.stageWidth-vec[i].width;
								}
								if(isFirst){
									TweenLite.to(vec[i],0.5,{x:tempX,y:tempY,caller:PanelManager,onComplete:PanelManager.openTweenComplete,onCompleteParams:[vec[i]] });
									isFirst=false;
								}
								else{
									TweenLite.to(vec[i],0.5,{x:tempX+0,y:tempY,caller:PanelManager,onComplete:PanelManager.openTweenComplete,onCompleteParams:[vec[i]] });
									tempX+=0;
								}
								tempX+=vec[i].width;
							}
						}
					}
				}
			}
		}
	}

	PanelManager.openTweenComplete=function(app){
		EventMgr.dispatch("ET.PANEL_OPEN",app);
		if((app instanceof com.game.core.panel.BasePanel )){
			(app).openTweenComplete();
		}
	}

	PanelManager.removePanel=function(panelName,needReset,panel){
		(needReset===void 0)&& (needReset=true);
		if(App.role){
			App.role.stopTime=0;
			App.role.mainStopTime=0;
		};
		var iPanel=PanelManager._panelDict[panelName];
		if(iPanel==null){
			if(panel !=null){
				PanelManager.remove(panel);
			}
			else{
				if(PanelManager._loader){
					PanelManager._loader.removeModule(panelName);
				}
				PanelManager.deleteLoadingPanel(panelName);
			}
		}
		else{
			if(iPanel.parent !=null){
				PanelManager.remove(iPanel);
				if(needReset){
					var otherApp;
					var vec=[];
					var totalWidth=0;
					var maxHeight=0;
					var index=0;
					if(iPanel.from){
						otherApp=PanelManager.getPanel(iPanel.from);
						if(otherApp !=null && otherApp.stage !=null){
							index=PanelManager.PANEL_SORT.indexOf(iPanel.from);
							if(index==-1){
								vec.unshift(otherApp);
								}else{
								vec[index]=otherApp;
							}
							totalWidth+=otherApp.width;
							if(otherApp.height > maxHeight){
								maxHeight=otherApp.height;
							}
						}
						iPanel.from=null;
					}
					if(vec.length==0){
						if(iPanel.coexistPanelNameList !=null && iPanel.coexistPanelNameList.length > 0){
							if(PanelManager.parent.numChildren > 0){
								for(var i=0;i < PanelManager.parent.numChildren;i++){
									otherApp=PanelManager.parent.getChildAt(i);
									if(otherApp==iPanel || otherApp==null){
										continue ;
									}
									if(iPanel.coexistPanelNameList.indexOf(otherApp.panelName)!=-1){
										index=PanelManager.PANEL_SORT.indexOf(otherApp.panelName);
										if(index==-1){
											vec.unshift(otherApp);
											}else{
											vec[index]=otherApp;
										}
										totalWidth+=otherApp.width;
										if(otherApp.height > maxHeight){
											maxHeight=otherApp.height;
										}
									}
								}
							}
						}
					}
					if(vec.length > 0){
						var sw=PanelManager.parent.stage.stageWidth;
						var sh=PanelManager.parent.stage.stageHeight;
						var centerX=sw-totalWidth >> 1;
						var centerY=sh-maxHeight >> 1;
						if(maxHeight > sh){
							centerY=-iPanel.closeBtn.y;
						}
						else{
							centerY=sh-maxHeight >> 1;
							if(!Browser.onPC){
								centerY+=10;
							}
						};
						var temp=centerX;
						var isFirst=true;
						for(i=0;i < vec.length;i++){
							if(vec[i] !=null){
								if(isFirst){
									TweenLite.to(vec[i],0.5,{x:temp,y:centerY });
									isFirst=false;
								}
								else{
									TweenLite.to(vec[i],0.5,{x:temp+0,y:centerY });
									temp+=0;
								}
								temp+=vec[i].width;
							}
						}
					}
				}
			}
		}
		if(PanelManager._setVibiles.length > 0){
			(PanelManager._setVibiles.pop()).visible=true;
		}
	}

	PanelManager.remove=function(app,playSound){
		(playSound===void 0)&& (playSound=true);
		if(PanelManager.isNeedHideFlyEffect && (Laya.__typeof(app,'com.game.core.panel.IPanel'))){
			var target=(app).getHideFlyToTarget();
			PanelManager.removeFlyTo(app,target,null,null,playSound);
		}
		else{
			PanelManager.removeFromStage(app,playSound);
		}
	}

	PanelManager.removeFlyTo=function(app,flyTo,callFun,callParams,playSound){
		(playSound===void 0)&& (playSound=true);
		if(app !=null && app.stage !=null){
			if(Browser.onPC && !Config.isSimpleRender){
				try{
					if(flyTo !=null && flyTo.stage !=null){
						if(app.width > 0 && app.height > 0){
							var bmd=BitmapUtils.draw(app);
							var img=new BaseBitmap(bmd);
							App.stageLayer.popLayer.addChild(img);
							img.x=app.x;
							img.y=app.y;
							var p;
							if(flyTo && !flyTo.destroyed){
								p=flyTo.localToGlobal(new Point(flyTo.width / 2,flyTo.height / 2));
							}
							else{
								p=new Point(Laya.stage.stageWidth >> 1,Laya.stage.stageHeight >> 1);
							}
							TweenLite.to(img,0.3,{x:p.x,y:p.y,scaleX:0,scaleY:0,caller:PanelManager,onComplete:PanelManager.onTweenOver,onCompleteParams:[img,flyTo,callFun,callParams]});
						}
					}
				}
				catch(e){
					Log.logError(e,"面板移除出错");
				}
			}
			PanelManager.removeFromStage(app,playSound);
		}
	}

	PanelManager.removeFromStage=function(app,playSound){
		(playSound===void 0)&& (playSound=true);
		if(app !=null && app.parent !=null){
			if(Laya.__typeof(app,'com.game.core.panel.IUIDispose')){
				PanelDispose.add(app);
			}
			PanelManager.addAtlasCount(getClassName(app),false);
			if('hide' in app){
				app.hide();
			}
			if(app.parent){
				app.removeSelf();
			}
			if((app instanceof com.modules.bag.HuigouPanel )){
				var bag=com.game.core.panel.PanelManager.getPanel(PanelRegister.BAG);
				if(bag && bag.parent && bag.tabIndex==5){
					bag.updatePanel(null,0);
				}
			}
			if(!Browser.onPC){
				if('isAddMoneyBar' in app){
					App.removeMobiMask(Boolean(app["isAddMoneyBar"]()),Boolean(app["isAddMask"]()));
				}
			}
			if('isHideMainUI' in app){
				if(app['isHideMainUI']()){
					App.mainPanel.hideMainUI(false);
				}
			}
			PanelCloseMgr.remove(app);
			if(playSound){
				if(getClassName(app)==PanelRegister.MALL){
					App.sound.playSound("6005");
				}
			}
		}
	}

	PanelManager.onTweenOver=function(img,target,callFun,callParams){
		if(WebParams.isWeiduan()){
			return;
		}
		if(img !=null){
			img.disposeTrue();
		}
		if(callFun){
			if(callParams){
				callFun.runWith(callParams);
			}
			else{
				callFun.run();
			}
		}
		EffectUtil.changeColor(target);
	}

	PanelManager.addToCenter=function(app,data,tab,$parent,playSound,addMask){
		(tab===void 0)&& (tab=-1);
		(playSound===void 0)&& (playSound=true);
		(addMask===void 0)&& (addMask=false);
		if($parent==null){
			$parent=PanelManager.parent;
		}
		if(!Browser.onPC){
			TipMgr.removeShowTip();
			App.addMobiMask(Boolean(app["isAddMoneyBar"]()),Boolean(app["isAddMask"]()),$parent);
		}
		if(addMask){
			App.addMask($parent);
		}
		$parent.addChild((app));
		if(Laya.__typeof(app,'com.game.core.panel.IPanel')){
			PanelManager.addAtlasCount(getClassName(app),true);
			var app2=app;
			app2.show(data,tab);
			app2.updatePanel(data,tab);
			if(app2.setPos()){
				var w=app2.width;
				var h=app2.height;
				app2.x=Laya.stage.width-w >> 1;
				h=Laya.stage.height-h >> 1;
				if(!Browser.onPC){
					h+=10;
				}
				app2.y=h;
			}
		}
		else{
			if('show' in app){
				app['show'](data,tab);
			}
			if('updatePanel' in app){
				app['updatePanel'](data,tab);
			}
		}
		if('isHideMainUI' in app){
			if(app['isHideMainUI']()){
				App.mainPanel.hideMainUI(true);
			}
		}
		if(playSound){
			App.sound.playSound("6002");
			if(getClassName(app)==PanelRegister.MALL){
				App.sound.playSound("6004");
			}
		}
	}

	PanelManager.scalePop=function(panel,width,height,onComplete,completeParams){
		(width===void 0)&& (width=0);
		(height===void 0)&& (height=0);
		var oldX=panel.x;
		var oldY=panel.y;
		width=width==0 ? panel.width :width;
		height=height==0 ? panel.height :height;
		panel.x=oldX+width / 2;
		panel.y=oldY+height / 2;
		panel.scaleX=0.01;
		panel.scaleY=0.01;
		var params={};
		params.x=oldX;
		params.y=oldY;
		params.scaleX=1;
		params.scaleY=1;
		if(onComplete !=null){
			params.caller=onComplete.caller;
			params.onComplete=onComplete;
			if(completeParams !=null)
				params.onCompleteParams=completeParams;
		}
		params.ease=Back.easeOut;
		TweenLite.to(panel,0.3,params);
	}

	PanelManager.removeTopPanel=function(needReset){
		(needReset===void 0)&& (needReset=true);
		var count=PanelManager.parent.numChildren;
		if(count > 0){
			var panel=PanelManager.parent.getChildAt(count-1);
			var panelName="";
			if(Laya.__typeof(panel,'com.game.core.panel.IPanel')){
				if(!(panel).isESC()){
					return;
				}
				panelName=(panel).panelName;
			};
			var app=PanelManager._panelDict[panelName];
			if(app !=null){
				PanelManager.removePanel(panelName,needReset);
			}
			else{
				PanelManager.remove(panel);
			}
		}
	}

	PanelManager.removeAllPanel=function(){
		var length=0;
		var panel;
		while(PanelManager.parent.numChildren > length){
			panel=PanelManager.parent.getChildAt(0);
			if((Laya.__typeof(panel,'com.game.core.panel.IPanel'))&& (panel).panelName==PanelRegister.REVIVE){
				length++;
				PanelManager.parent.addChild(panel);
				continue ;
			}
			PanelManager.removeFromStage(panel,false);
			panel=null;
		}
	}

	PanelManager.dispose=function(panelName){
		var app=PanelManager._panelDict[panelName];
		if(app){
			console.log("销毁面板 -> "+panelName);
			PanelManager._panelDict[panelName]=null;
			delete PanelManager._panelDict[panelName];
			app.destroy();
			if(GameConfig.isDebug){
				Log.logOther("销毁面板 -> "+panelName);
			}
			return true;
		}
		return false;
	}

	PanelManager.addAtlasCount=function(panelName,isAdd){
		return;
		var info=PanelManager.getPanelInfo(panelName);
		if(info && info.res){
			var url;
			var count=0;
			for(var i=0;i < info.res.length;i++){
				url=info.res[i];
				count=myparseInt(PanelManager._atlasCount[url]);
				if(isAdd){
					count++;
					}else{
					count--;
				}
				PanelManager._atlasCount[url]=count;
			}
			if(GameConfig.isDebug){
				var str="";
				for(url in PanelManager._atlasCount){
					if(str.length > 0){
						str+=", ";
					}
					str+=url+":"+PanelManager._atlasCount[url];
				}
				Log.logOther("面板图集情况 -> "+str);
			}
		}
	}

	PanelManager.openByClass=function(cls,data,tab,addMask,$parent,isSwitch,playSound){
		(tab===void 0)&& (tab=-1);
		(addMask===void 0)&& (addMask=false);
		(isSwitch===void 0)&& (isSwitch=false);
		(playSound===void 0)&& (playSound=true);
		if(GlobalControl.isJiaoyi){
			GameNotice.showMousePosMessage("交易中无法执行此操作");
			return;
		}
		if(GlobalControl.isInkuafu || FuzhanCenter.isBenfu){
			if(cls !=FuzhanSidePanel && cls !=FuzhanWorldZhuweiMove && cls !=FuzhanPkTopTime && cls !=FuzhanSidePro && cls !=FuzhanJifenPanel && cls !=FuzhanGongluePanel && cls !=ZoneExitPanel){
				GameNotice.showMousePosMessage("当前跨服地图不支持此功能");
				return;
			}
		};
		var panelName=cls.name;
		if(!panelName){
			panelName=getFunctionName(cls);
		};
		var app=PanelManager._panelDict[panelName];
		var isShow=PanelManager.isShowing(panelName,tab);
		if(isSwitch && isShow){
			PanelManager.remove(app);
			return;
		}
		if(app==null){
			app=new cls();
			app.resetDisposeCD();
			PanelManager._panelDict[panelName]=app;
		}
		else{
			PanelDispose.remove(app.getDisposeKey());
		}
		if(isShow){
			if('updatePanel' in app){
				app['updatePanel'](data,tab);
			};
			var p=(app).parent;
			if(!p){
				p=PanelManager.parent;
			}
			p.addChild((app));
		}
		else{
			PanelManager.addToCenter(app,data,tab,$parent,playSound,addMask);
		}
		return app;
	}

	PanelManager.closeByClass=function(cls,playSound){
		(playSound===void 0)&& (playSound=true);
		var app=PanelManager.getPanel(cls);
		if(app){
			PanelManager.remove(app,playSound);
		}
	}

	PanelManager.PANEL_SORT=[];
	PanelManager.SPACING=0;
	PanelManager.TWEEN_TIME=0.5;
	PanelManager._loader=null;
	PanelManager._allPanelDict={};
	PanelManager._panelLoadingDict={};
	PanelManager._panelDict={};
	PanelManager._atlasCount={};
	PanelManager.isNeedHideFlyEffect=true;
	PanelManager._setVibiles=[];
	return PanelManager;
})()