/**
*聊天数据
*@author 胡剑
*创建时间：2015-9-25 下午3:55:45
*
*/
//class com.game.modules.chats.data.ChatCenter
var ChatCenter=(function(){
	function ChatCenter(){}
	__class(ChatCenter,'com.game.modules.chats.data.ChatCenter');
	/**总的未读消息数量*/
	__getset(1,ChatCenter,'allNoreadCount',function(){return ChatCenter._allNoreadCount;});
	/**当前聊天频道 */
	__getset(1,ChatCenter,'channel',function(){return ChatCenter._channel;},function(value){
		if(ChatCenter._channel !=value){
			ChatCenter._channel=value;
			ChatCenter.delNoReadMsg(value);
			EventMgr.dispatch("CE.CHANNEL_CHANGE");
		}
	});

	/**所有频道的消息*/
	__getset(1,ChatCenter,'allChannelData',function(){
		var total=ChatCenter._allChannelData;
		var arr=[];
		for (var i=0;i < total.length;i++){
			var info=total[i];
			if(ChatCenter.checkChatCondition(info)){
				arr.push(info);
			}
		}
		return arr;
	});

	/**私聊对象名字，最多十个*/
	__getset(1,ChatCenter,'siliaoPlayers',function(){return ChatCenter._siliaoPlayers;});
	__getset(1,ChatCenter,'shieldVipLower',function(){return ChatCenter._shieldVipLower;},function(value){
		if(ChatCenter._shieldVipLower !=value){
			ChatCenter._shieldVipLower=value;
			EventMgr.dispatch("CE.VIP_LOWER_CHANGE");
		}
	});

	__getset(1,ChatCenter,'siliaoName',function(){return ChatCenter._siliaoName;},function(value){ChatCenter._siliaoName=value;});
	__getset(1,ChatCenter,'remIndex',function(){return ChatCenter._remIndex;},function(value){ChatCenter._remIndex=value;});
	__getset(1,ChatCenter,'remAry',function(){return ChatCenter._remAry;});
	ChatCenter.getNoreadMsgCount=function(channel){
		return myparseInt(ChatCenter._noreadMsgDict[channel]);
	}

	ChatCenter.addNoreadMsgCount=function(channel){
		ChatCenter._allNoreadCount++;
		ChatCenter._noreadMsgDict[channel]=ChatCenter.getNoreadMsgCount(channel)+1;
		EventMgr.dispatch("CE.NO_READ");
	}

	ChatCenter.delNoReadMsg=function(channel){
		var hasNoRead=ChatCenter.getNoreadMsgCount(channel);
		if(hasNoRead !=0){
			ChatCenter._allNoreadCount-=hasNoRead;
			ChatCenter._noreadMsgDict[channel]=0;
			EventMgr.dispatch("CE.NO_READ");
		}
	}

	ChatCenter.isNoreadChannel=function(channel){
		if(channel==1 || channel==2 || channel==3 || channel==7){
			return true;
		}
		return false;
	}

	ChatCenter.hasNoreadSiliao=function(){return ChatCenter._noreadSiliaoNum > 0;}
	ChatCenter.getNoreadSiliaoCount=function(playerName){return myparseInt(ChatCenter._noreadSiliaoDict[playerName])}
	ChatCenter.isNoreadSiliao=function(playerName){return ChatCenter._noreadSiliaoDict[playerName] > 0;}
	ChatCenter.addNoreadSiliao=function(playerName){
		if(!ChatCenter.isNoreadSiliao(playerName)){
			if(!ChatCenter._noreadSiliaoDict[playerName]){
				ChatCenter._noreadSiliaoDict[playerName]=0;
			}
			ChatCenter._noreadSiliaoDict[playerName]++;
			ChatCenter._noreadSiliaoNum++;
			EventMgr.dispatch("CE.NO_READ_SILIAO");
		}
	}

	ChatCenter.delNoreadSiliao=function(playerName){
		if(ChatCenter.isNoreadSiliao(playerName)){
			delete ChatCenter._noreadSiliaoDict[playerName];
			ChatCenter._noreadSiliaoNum--;
			EventMgr.dispatch("CE.NO_READ_SILIAO");
		}
	}

	ChatCenter.getCurrentChannelData=function(channel){
		var total=ChatCenter._dataDict[channel] || [];
		var arr=[];
		for (var i=0;i < total.length;i++){
			var info=total[i];
			if(ChatCenter.checkChatCondition(info)){
				arr.push(info);
			}
		}
		return arr;
	}

	ChatCenter.checkChatCondition=function(info){
		return info.type==2 || info.isMe || info.vip==0 || info.lv >=ChatCenter._shieldVipLower;
	}

	ChatCenter.getSiliaoChat=function(playerName){return ChatCenter._siliaoDict[playerName];}
	ChatCenter.addSiliaoName=function(playerName,info){
		if(!info || ChatCenter._siliaoPlayers.length < 10){
			var index=ChatCenter._siliaoPlayers.indexOf(playerName);
			if(index==-1){
				ChatCenter._siliaoPlayers.push(playerName);
				if(!info){
					ChatCenter.siliaoPlayersChange=true;
				}
			}
			if(ChatCenter._siliaoPlayers.length >=10){
				ChatCenter._siliaoPlayers.shift();
				if(!info){
					ChatCenter.siliaoPlayersChange=true;
				}
			}
		}
		if(info){
			var arr=ChatCenter._siliaoDict[playerName];
			if(!arr){
				arr=[];
				ChatCenter._siliaoDict[playerName]=arr;
			}
			arr.push(info.clone());
			if(arr.length > 40){
				arr.shift().clear();
			}
		}
	}

	ChatCenter.delSiliaoName=function(playerName){
		var index=ChatCenter._siliaoPlayers.indexOf(playerName);
		if(index !=-1){
			ChatCenter._siliaoPlayers.splice(index,1);
			ChatCenter.siliaoPlayersChange=true;
		}
		return ChatCenter._siliaoPlayers.length;
	}

	ChatCenter.addSiliao=function(playerName){
		if(playerName){
			if(playerName==App.role.name){
				GameNotice.show(10003);
				return;
			}
			if(playerName){
				if(com.game.modules.chats.data.ChatCenter.channel !=2){
					com.game.modules.chats.data.ChatCenter.siliaoName=playerName;
					ChatCenter.addSiliaoName(playerName);
					com.game.modules.chats.data.ChatCenter.channel=2;
				}
				else{
					if(playerName !=com.game.modules.chats.data.ChatCenter.siliaoName){
						com.game.modules.chats.data.ChatCenter.siliaoName=playerName;
						ChatCenter.addSiliaoName(playerName);
						if(Browser.onPC){
							App.mainPanel.mainChat.updateSiliaoView();
						}
						EventMgr.dispatch("CE.add_siliao");
					}
				}
			}
		}
	}

	ChatCenter.addChannelData=function(type,info){
		var arr=ChatCenter._dataDict[type];
		if(!arr){
			arr=[];
			ChatCenter._dataDict[type]=arr;
		}
		arr.push(info);
		ChatCenter._allChannelData.push(info.clone());
		if(arr.length > 50){
			arr.shift().clear();
		}
		if(ChatCenter._allChannelData.length > 50){
			ChatCenter._allChannelData.shift().clear();
		}
		if(type==2 && info.playerName){
			if(info.playerName !=FriendCenter.siliaoName && info.sender !=App.role.name){
				if(com.game.modules.chats.data.ChatCenter.channel !=type || info.playerName !=com.game.modules.chats.data.ChatCenter.siliaoName){
					ChatCenter.addNoreadSiliao(info.playerName);
				}
			}
			ChatCenter.addSiliaoName(info.playerName,info);
		}
		if(type==7 || type==11){
			GuildMemberCenter.addChat(info.id);
		}
	}

  ChatCenter.sendChat = function (channel, content, playerName, bool, str, from) {
		if(channel==9){
			channel=4;
		};
		var text=str ? str :content;
		if(text=="" || text==GameConfig.default_chat){
			GameNotice.show(10004);
			return false;
		}
		if(ChatCenter._remAry.length > 9){
			ChatCenter._remAry.shift();
		};
		var role=App.role;
		if(bool){
			if(role.gmLevel <=0){
				text=text.replace(/</g,"&lt;");
				text=text.replace(/>/g,"&gt;");
			}
		}
		if(text && text.indexOf("html")==-1){
			ChatCenter._remAry.push(text);
			ChatCenter._remIndex=ChatCenter._remAry.length;
		}
		if(text=="@mhexp"){
			ExpGmCenter.execute();
			return false;
		};
		var sendStr=com.game.modules.chats.data.ChatCenter.parseShowItemMessage(text);
		var sendName;
		if(channel==2){
			sendName=playerName;
		}
		else{
			sendName="";
		}
		if(com.game.modules.chats.data.ChatCenter.showItemNum !=0 || com.game.modules.chats.data.ChatCenter.showMyposNum !=0){
			text=sendStr;
		}
		if(GMUtils.checkIsGmString(text)){
			return false;
		}
		if(text.indexOf("@1111")!=-1){
			Stat.show();
			return false;
		}
		else if(text.indexOf("@2222")!=-1){
			Stat.hide();
			return false;
		}
		if(GlobalControl.isInkuafu || FuzhanCenter.isBenfu){
			if(channel !=3 && channel !=7){
				GameNotice.showMousePosMessage("当前跨服地图不支持此功能");
				return false;
			}
		}
		if(text.indexOf(EnumChatRegType.REG_SHOWALL_START)!=-1){
			channel=4;
		}
		if(App.role.gmLevel > 0){
			return ChatCommandSender.sendChatRequestMessage(channel,text,sendName,null,from);
		};
		var obj=com.game.modules.chats.data.ChatCenter.getChatLevelObj()[channel];
		if(obj==null){
			return false;
		};
		var isGmCmd=text.charAt(0)=="@";
		if(obj.vip==0){
			if(role.allLevel < obj.level && !GameConfig.isDebug && !isGmCmd){
				if(WebParams.agent==EnumPlatform.PLAT_YY){
					GameNotice.showMousePosMessage("达到250级或任意付费可以发言 ");
					return false;
				}
				else{
					GameNotice.show(10005,obj.level);
					return false;
				}
			}
		}
		else{
			if(role.allLevel < obj.level && !GameConfig.isDebug && !isGmCmd){
				if(role.vipLevel < obj.vip){
					if(WebParams.agent==EnumPlatform.PLAT_YY){
						GameNotice.showMousePosMessage("达到250级或任意付费可以发言 ");
						return false;
					}
					else{
						GameNotice.show(10005,obj.level);
						return false;
					}
				}
			}
		};
		var rarr=text.match(GameImageText.REG_FACE);
		com.game.modules.chats.data.ChatCenter.showBQNum=rarr ? rarr.length :0;
		if(com.game.modules.chats.data.ChatCenter.showBQNum > 5){
			GameNotice.show(10006,5);
			return false;
		}
		if(com.game.modules.chats.data.ChatCenter.showItemNum > 3){
			GameNotice.show(10007,3);
			return false;
		}
		if(FriendUtils.isBlack(null,sendName)){
			GameNotice.show(10010);
		}
		else if(channel==2 && !FriendUtils.isFriend(null,sendName)){
			GameNotice.showMousePosMessage("添加好友后才可以私聊");
		}
		else{
			var ok=false;
			var t=0;
			var now=getTimer();
			if(channel==5){
				if(now-ChatCenter.chat_time_kuafu >=ChatCenter.CD_KuaFu){
					ChatCenter.chat_time_kuafu=now;
					ok=true;
				}
				else{
					t=Math.ceil((ChatCenter.CD_KuaFu-now+ChatCenter.chat_time_kuafu)/ 1000);
				}
			}
			else{
				if(now-ChatCenter.chat_time >=ChatCenter.CD){
					ChatCenter.chat_time=now;
					ok=true;
				}
				else{
					t=Math.ceil((ChatCenter.CD-now+ChatCenter.chat_time)/ 1000);
				}
			}
			if(ok){
				return ChatCommandSender.sendChatRequestMessage(channel,text,sendName,null,from);
			}
			else{
				GameNotice.showMousePosMessage("聊天CD："+t+"秒");
			}
		}
		return false;
	}

	ChatCenter.okFunc=function(price,type,text,from){
		if(App.isMoneyEnough(price,type)){
			ChatCommandSender.sendChatRequestMessage(5,text,"",null,from);
		}
	}

	ChatCenter.getPlayerIconSign=function(player){
		var rolePfVipType=App.role.pfVipType;
		var iconSign="";
		if(player){
			if(player.pfVipInfo){
				var pfType=player.pfVipInfo.vipType;
				if(pfType==rolePfVipType){
					var pfViphigh=player.pfVipInfo.highVip;
					var pfVipYear=player.pfVipInfo.yearVip;
					var pfVipLvl=player.pfVipInfo.vipLvl;
					var param=player.pfVipInfo.param;
					if(pfType==2){
						if(pfVipLvl > 0){
							if(pfVipYear==1){
								if(pfViphigh==1){
									iconSign+=EnumChatIcon.HAO_BLUE_ICON[pfVipLvl];
									}else {
									iconSign+=EnumChatIcon.BLUE_ICON[pfVipLvl];
								}
								iconSign+=EnumChatIcon.BLUE_ICON[0];
								}else {
								if(pfViphigh==1){
									iconSign+=EnumChatIcon.HAO_BLUE_ICON[pfVipLvl];
									}else {
									iconSign+=EnumChatIcon.BLUE_ICON[pfVipLvl];
								}
							}
						}
					}
					else if(pfType==1){
						if(pfVipLvl > 0){
							if(pfVipYear==1){
								if(pfViphigh==1){
									iconSign+=EnumChatIcon.HAOYEAR_YELLOW_ICON[pfVipLvl];
									}else {
									iconSign+=EnumChatIcon.YELLOW_ICON[pfVipLvl];
									if(pfVipLvl==8){
										iconSign+=EnumChatIcon.HAO_YELLOW_ICON[0];
										}else {
										iconSign+=EnumChatIcon.YELLOW_ICON[0];
									}
								}
								}else {
								if(pfViphigh==1){
									iconSign+=EnumChatIcon.HAO_YELLOW_ICON[pfVipLvl];
									}else {
									iconSign+=EnumChatIcon.YELLOW_ICON[pfVipLvl];
								}
							}
						}
					}
					else if(pfType==23){
						iconSign+=EnumChatIcon.QQ_DAWANKA[pfVipLvl];
					}
					else if(pfType==3){
						if(param > 0){
							iconSign+=EnumChatIcon.YYSUPERVIP[param-1];
						}
						else{
							if(pfVipLvl > 0){
								iconSign+=EnumChatIcon.YYSUPERVIP[pfVipLvl-1];
							}
						}
					}
					else if(pfType==5){
						if(pfVipLvl > 0){
							iconSign+=EnumChatIcon.XUNLEI_ICON[pfVipLvl];
							if(pfVipYear==1){
								iconSign+=EnumChatIcon.XUNLEI_ICON[0];
							}
						}
					}
					else if(pfType==4){
						iconSign+="○tgp○";
					}
					else if(pfType==18){
						if(pfVipLvl > 0){
							iconSign+=EnumChatIcon.HUYA[pfVipLvl-1];
						}
					}
					else if(pfType==17){
						if(pfVipLvl > 0){
							iconSign+=EnumChatIcon.LIEBAO[pfVipLvl-1];
						}
					}
				}
			}
		}
		return iconSign;
	}

	ChatCenter.checkPlayer=function(playerId,serverId){
		(serverId===void 0)&& (serverId=0);
		if((typeof playerId=='string')){
			playerId=Int64.parseInt64(playerId);
		};
		var type=App.mapModule.mapAvatarModel.getPlayer(playerId)? 0 :1;
		CharacterUICommandSender.checkPalyerInfo(playerId,serverId,type);
	}

	ChatCenter.parseNoDisabledMessage=function(message,noArr){
		var index=message.indexOf("{pbz}");
		var noIndex=0;
		while(index !=-1 && noArr[noIndex] !=null){
			message=message.replace("{pbz}",""+noArr[noIndex]);
			index=message.indexOf("{pbz}");
			noIndex++;
		}
		return message;
	}

	ChatCenter.parseShowItemMessage=function(message){
		com.game.modules.chats.data.ChatCenter.showBQNum=0;
		com.game.modules.chats.data.ChatCenter.showItemNum=0;
		com.game.modules.chats.data.ChatCenter.showMyposNum=0;
		com.game.modules.chats.data.ChatCenter.noDisabledArr.length=0;
		var showData;
		var showStart="";
		var start=message.indexOf('[<a style="text-decoration: underline;" href="event:');
		var end=message.indexOf("</a>]");
		var subStr;
		var id="";
		var retStr="";
		var preEnd=0;
		if(start==-1 || end-start < 3){
			return message;
		}
		while(start !=-1 && end !=-1){
			var isMypos=false;
			var isFace=false;
			subStr=message.slice(start+EnumChatRegType.SHOWITEM_START_CLIENT.length,end);
			id=subStr.match(/[0-9]*/)[0];
			var obj=JSON.parse(id);
			if(((typeof obj=='number')&& Math.floor(obj)==obj)){
				if(obj < EnumChatRegType.ID_NUMBER_POINT){
					showStart="~showAchieve_";
					showData=com.game.modules.chats.data.ChatCenter.getAchieveInfo(myparseInt(id));
				}
				else{
					if(obj.toString()==EnumChatRegType.SHOWMYPOSITION_EVENTID){
						isMypos=true;
						ChatCenter.showMyposNum++;
						showStart=EnumChatRegType.SHOWMYPOSITION_START;
					}
					else if(obj.toString()==EnumChatRegType.SHOW_FACE_EVENTID){
						isFace=true;
						ChatCenter.showBQNum++;
						showStart=message.substring(end-3,end);
					}
					else{
						showStart="~showItem_";
						showData=com.game.modules.chats.data.ChatCenter.getItemInfo(id);
					}
				}
			}
			if(isMypos){
				retStr+=message.substring(preEnd,start)+"{pbz}";
				ChatCenter.noDisabledArr.push(showStart);
			}
			else if(isFace){
				retStr+=message.substring(preEnd,start)+"{pbz}";
				ChatCenter.noDisabledArr.push(showStart);
			}
			else{
				var itemStr="";
				if(showData){
					itemStr=showStart+showData.id+"~";
					ChatCenter.noDisabledArr.push(itemStr);
				}
				if(start !=0){
					if(preEnd==0){
						if(showData==null){
							retStr+=message.substring(preEnd+id.length+1,end);
						}
						else{
							retStr+=message.substring(0,start)+"{pbz}";
							ChatCenter.showItemNum++;
						}
					}
					else{
						if(showData==null){
							retStr+=message.substring(preEnd+id.length+1,end);
						}
						else{
							retStr+=message.substring(preEnd,start)+"{pbz}";
							ChatCenter.showItemNum++;
						}
					}
				}
				else{
					if(showData==null){
						retStr+=message.substring(preEnd+id.length+1,end);
					}
					else{
						retStr+="{pbz}";
						ChatCenter.showItemNum++;
					}
				}
			}
			if(!isFace){
				retStr+=" ";
			}
			preEnd=end+EnumChatRegType.SHOWITEM_END_CLIENT.length;
			start=message.indexOf('[<a style="text-decoration: underline;" href="event:',end+EnumChatRegType.SHOWITEM_END_CLIENT.length);
			end=message.indexOf("</a>]",start);
		}
		if(preEnd < message.length-11){
			retStr+=message.substring(preEnd,message.length-11);
		}
		if(ChatCenter._tempText==null){
			ChatCenter._tempText=new FText(false);
		}
		return retStr;
	}

	ChatCenter.formatStringToLink=function(str){
		str=ChatCenter.addTempLink(str,"#playername_s","#playername_e",ChatCenter.addPlayerNameLink);
		str=ChatCenter.addTempLink(str,"#mapname_s","#mapname_e",ChatCenter.addMapNameLink);
		str=ChatCenter.addTempLink(str,"#gotomap_s","#gotomap_e",ChatCenter.addGotoMapLink);
		str=ChatCenter.addTempLink(str,"#itemid_s","#itemid_e",ChatCenter.addItemLink);
		str=ChatCenter.addTempLink(str,"#openpanel_s","#openpanel_e",ChatCenter.addOpenPanelLink);
		str=ChatCenter.addTempLink(str,"#colour_s","#colour_e",ChatCenter.addNameColor);
		str=ChatCenter.addTempLink(str,"#flytomap_s","#flytomap_e",ChatCenter.addFlytoMapLink);
		str=ChatCenter.addTempLink(str,"#flytoboss_s","#flytoboss_e",ChatCenter.addFlytoBossLink);
		str=ChatCenter.addTempLink(str,EnumChatRegType.REG_SHOWMYPOS_START,EnumChatRegType.REG_SHOWMYPOS_END,ChatCenter.addShowMyposLink);
		str=ChatCenter.addTempLink(str,"#fengnaHelp_s","#fengnaHelp_e",ChatCenter.addFengnaLink);
		str=ChatCenter.addTempLink(str,EnumChatRegType.REG_SHOWALL_START,EnumChatRegType.REG_SHOWALL_END,ChatCenter.addShowAllLink);
		str=ChatCenter.addTempLink(str,"#joinTeam_s","#joinTeam_e",ChatCenter.addTeamLink);
		return str;
	}

	ChatCenter.addTempLink=function(str,reg_s,reg_e,func){
		var startIndex=0;
		var endIndex=0;
		if(str.indexOf(reg_s)!=-1 && str.indexOf(reg_e)!=-1){
			startIndex=str.indexOf(reg_s);
			while(startIndex !=-1){
				endIndex=str.indexOf(reg_e,startIndex+1);
				if(endIndex==-1){
					break ;
				}
				str=func(str,startIndex,endIndex);
				startIndex=str.indexOf(reg_s);
			}
		}
		return str;
	}

	ChatCenter.addFengnaLink=function(str,startIndex,endIndex){
		str=str.slice(startIndex+EnumChatRegType.REG_FENGNA_START.length,endIndex);
		var obj=JSON.parse(StringFormat.replacJosnStr(str));
		var bean=App.dataMgr.q_guild_donateContainer.getDataBean(obj.donateId);
		var cost=JSON.parse(bean.q_donate_item)[0];
		var arr=JSON.parse(bean.q_help_reward);
		var content="求"+ChatCenter.getHtmlText(ItemUtil.getItemName(cost.id)+'x'+myparseInt(cost.num),ItemUtil.getItemNameColor(cost.id))+"完成"+"行会"+"奉纳任务,";
		content+="帮助我可以获得";
		for(var i=0;i < arr.length;i++){
			content+=ChatCenter.getHtmlText(ItemUtil.getItemName(arr[i].id)+'x'+myparseInt(arr[i].num),ItemUtil.getItemNameColor(arr[i].id));
			if(i < arr.length-1){
				content+='、';
			}
		}
		content+=","+ChatCenter.getHtmlText("去帮助他","#00ff00",str);
		return content;
	}

	ChatCenter.addShowAllLink=function(str,startIndex,endIndex){
		var allStr=str.slice(startIndex+EnumChatRegType.REG_SHOWALL_START.length,endIndex);
		var arr=allStr.split(EnumChatRegType.REG_SHOWALL_SIGN);
		var showName=arr[0];
		var eventStr=arr[1];
		var arr2=eventStr.split(EnumChatRegType.REG_SHOWALL_SIGN2);
		eventStr=arr2[1];
		var obj={f_type:9999,subType:arr2[0],content:eventStr};
		eventStr=JSON.stringify(obj);
		var anyHtml=ChatCenter.getHtmlText(showName,"#00ff00",eventStr);
		str=str.replace(EnumChatRegType.REG_SHOWALL_START+allStr+EnumChatRegType.REG_SHOWALL_END,anyHtml);
		return str;
	}

	ChatCenter.addTeamLink=function(str,startIndex,endIndex){
		var teamStr=str.slice(startIndex+EnumChatRegType.JOIN_TEAM_START.length,endIndex);
		var obj=JSON.parse(StringFormat.replacJosnStr(teamStr));
		str=str.replace("#joinTeam_s"+teamStr+"#joinTeam_e",ChatCenter.getHtmlText(obj.tip,"#00ff00",teamStr));
		return str;
	}

	ChatCenter.addPlayerNameLink=function(str,startIndex,endIndex){
		var roleNameStr=str.slice(startIndex+EnumChatRegType.REG_PLAYERNAME_START.length,endIndex);
		var obj=JSON.parse(StringFormat.replacJosnStr(roleNameStr));
		str=str.replace("#playername_s"+roleNameStr+"#playername_e","playerNameStr");
		var roleInfo=com.game.modules.chats.data.ChatCenter.getPlayerInfo(obj.rname);
		if(roleInfo==null){
			roleInfo=new RoleChatInfo();
			roleInfo.playerId=Int64.parseInt64(obj.rid);
			roleInfo.playerName=obj.rname;
			com.game.modules.chats.data.ChatCenter.savePlayerInfo(roleInfo);
		}
		str=str.replace("playerNameStr",obj.rname);
		return str;
	}

	ChatCenter.addMapNameLink=function(str,startIndex,endIndex){
		var mapNameStr=str.slice(startIndex+EnumChatRegType.REG_MAPNAME_START.length,endIndex);
		var obj=JSON.parse(StringFormat.replacJosnStr(mapNameStr));
		str=str.replace("#mapname_s"+mapNameStr+"#mapname_e","mapNameStr");
		var mapName=GameUtils.getMapName(obj.mid);
		str=str.replace("mapNameStr",mapName);
		return str;
	}

	ChatCenter.addShowMyposLink=function(str,startIndex,endIndex){
		var gotoPosStr=str.slice(startIndex+EnumChatRegType.REG_SHOWMYPOS_START.length,endIndex);
		str=str.replace(EnumChatRegType.REG_SHOWMYPOS_START+gotoPosStr+EnumChatRegType.REG_SHOWMYPOS_END,"gotoPosStr");
		var obj=JSON.parse(StringFormat.replacJosnStr(gotoPosStr));
		var mapId=obj.mid;
		var posX=obj.x;
		var posY=obj.y;
		var mapName=GameUtils.getMapName(mapId);
		var show=mapName+"("+posX+","+posY+")";
		var gotoMap=ChatCenter.getHtmlText(show,"#00FF00",gotoPosStr);
		str=str.replace("gotoPosStr",gotoMap);
		return str;
	}

	ChatCenter.addGotoMapLink=function(str,startIndex,endIndex){
		var gotoMapStr=str.slice(startIndex+EnumChatRegType.REG_GOTOMAP_START.length,endIndex);
		str=str.replace("#gotomap_s"+gotoMapStr+"#gotomap_e","gotoMapStr");
		var obj=JSON.parse(StringFormat.replacJosnStr(gotoMapStr));
		var gotoMap=ChatCenter.getHtmlText(obj.tip,"#00FF00",gotoMapStr);
		str=str.replace("gotoMapStr",gotoMap);
		return str;
	}

	ChatCenter.addFlytoMapLink=function(str,startIndex,endIndex){
		var flytoMapStr=str.slice(startIndex+EnumChatRegType.REG_FLYTOMAP_START.length,endIndex);
		str=str.replace("#flytomap_s"+flytoMapStr+"#flytomap_e","flytoMapStr");
		var obj=JSON.parse(StringFormat.replacJosnStr(flytoMapStr));
		var flytoMap=ChatCenter.getHtmlText(obj.tip,"#00FF00",flytoMapStr);
		str=str.replace("flytoMapStr",flytoMap);
		return str;
	}

	ChatCenter.addFlytoBossLink=function(str,startIndex,endIndex){
		var flytoBossStr=str.slice(startIndex+EnumChatRegType.REG_FLYTOBOSS_START.length,endIndex);
		str=str.replace("#flytoboss_s"+flytoBossStr+"#flytoboss_e","flytoBossStr");
		var obj=JSON.parse(StringFormat.replacJosnStr(flytoBossStr));
		var flytoMap=ChatCenter.getHtmlText(obj.tip,"#00FF00",flytoBossStr);
		str=str.replace("flytoBossStr",flytoMap);
		return str;
	}

	ChatCenter.addItemLink=function(str,startIndex,endIndex){
		var itemIdStr=str.slice(startIndex+EnumChatRegType.REG_ITEMID_START.length,endIndex);
		str=str.replace("#itemid_s"+itemIdStr+"#itemid_e","itemIdStr");
		var data=com.game.modules.chats.data.ChatCenter.getItemInfo(itemIdStr);
		if(data){
			var bean=GameUtils.getItemConfigData(data.itemId);
			if(bean){
				var color=ItemUtil.getItemNameColor(data.itemId);
				var itemId="<font color='"+color+"'><a style='text-decoration: underline;'  href='event:"+itemIdStr+"'>["+ItemUtil.getItemNameBean(bean)+"]</a></font>";
				str=str.replace("itemIdStr",itemId);
			}
			else{
				str=str.replace("itemIdStr","");
			}
		}
		return str;
	}

	ChatCenter.addOpenPanelLink=function(str,startIndex,endIndex){
		var openPanelStr=str.slice(startIndex+EnumChatRegType.REG_OPENPANEL_START.length,endIndex);
		str=str.replace("#openpanel_s"+openPanelStr+"#openpanel_e","openPanelStr");
		var obj=JSON.parse(StringFormat.replacJosnStr(openPanelStr));
		var openpanel=ChatCenter.getHtmlText(obj.tip,"#00FF00",openPanelStr);
		str=str.replace("openPanelStr",openpanel);
		return str;
	}

	ChatCenter.addNameColor=function(str,startIndex,endIndex){
		var nameColorStr=str.slice(startIndex+EnumChatRegType.REG_NAMECOLOR_START.length,endIndex);
		str=str.replace("#colour_s"+nameColorStr+"#colour_e","nameColorStr");
		var obj=JSON.parse(StringFormat.replacJosnStr(nameColorStr));
		var namecolor=ChatCenter.getHtmlText(obj.name,EnumChatRegType.getColorByType(obj.color));
		str=str.replace("nameColorStr",namecolor);
		return str;
	}

	ChatCenter.getHtmlText=function(content,color,event){
		if(event){
			content="<a style='text-decoration: underline;' href='event:"+event+"'>"+content+"</a>";
		}
		if(color){
			content="<font color='"+color+"'>"+content+"</font>";
		}
		return content;
	}

	ChatCenter.getMainChatItem=function(){
		if(ChatCenter._mainChatPool.length > 0){
			return ChatCenter._mainChatPool.pop();
		}
		return new MainChatItem();
	}

	ChatCenter.addMainChatItem=function(item){
		ChatCenter._mainChatPool.push(item);
	}

	ChatCenter.initMainChatItem=function(){
		ChatCenter._mainChatPool=[];
		for(var i=0;i <=50;i++){
			ChatCenter._mainChatPool.push(new MainChatItem());
		}
	}

	ChatCenter.getChatLevelObj=function(){
		if(!ChatCenter._chatLvObj){
			ChatCenter._chatLvObj={};
			var bean=App.dataMgr.q_globalContainer.getDataBean(89,false);
			if(bean && bean.q_string_value){
				var arr=JSON.parse(bean.q_string_value);
				for (var i=0;i < arr.length;i++){
					ChatCenter._chatLvObj[arr[i]["type"]]=arr[i];
				}
			}
		}
		return ChatCenter._chatLvObj;
	}

	ChatCenter.addNoticeChatInfo=function(type,content,color){
		if(!color){
			color=EnumChatType.getChannelColor(type);
		}
		if(type==0 || type==9){
			type=9;
		};
		var text=com.game.modules.chats.data.ChatCenter.formatStringToLink(content);
		var info=new ChatInfo();
		info.type=type;
		info.head="0";
		info.sender="<font color='"+color+"'>"+EnumChatType.TYPE_NAME[0]+"</font>";
		info.chat=text;
		info.content=EnumChatType.getChannelName(type)+text;
		info.color=color;
		info.name=EnumChatType.TYPE_NAME[0];
		com.game.modules.chats.data.ChatCenter.addChannelData(type,info);
		EventMgr.dispatch("CE.chat_response",info);
	}

	ChatCenter.createLoginNoticeChat=function(){
		if(!ChatCenter._loginChatInfo){
			var bean=App.dataMgr.q_globalContainer.getDataBean(76,false);
			if(bean){
				var text=bean.q_string_value;
				ChatCenter._loginChatInfo=new ChatInfo();
				ChatCenter._loginChatInfo.type=9;
				ChatCenter._loginChatInfo.head="0";
				ChatCenter._loginChatInfo.sender="<font color='"+EnumChatType.getChannelColor(0)+"'>"+EnumChatType.TYPE_NAME[0]+"</font>";
				ChatCenter._loginChatInfo.chat=text;
				ChatCenter._loginChatInfo.content=text;
				ChatCenter._loginChatInfo.name=EnumChatType.TYPE_NAME[0];
				com.game.modules.chats.data.ChatCenter.addChannelData(4,ChatCenter._loginChatInfo);
			}
		}
		return ChatCenter._loginChatInfo;
	}

	ChatCenter.saveItemInfo=function(itemData){
		ChatCenter._chatItemDic[itemData.id]=itemData;
	}

	ChatCenter.getItemInfo=function(itemId){
		return ChatCenter._chatItemDic[itemId];
	}

	ChatCenter.savePlayerInfo=function(playerInfo){
		ChatCenter._chatPlayerDic[playerInfo.playerName]=playerInfo;
	}

	ChatCenter.getPlayerInfo=function(name){
		return ChatCenter._chatPlayerDic[name];
	}

	ChatCenter.saveAchieveInfo=function(data){
		ChatCenter._chatAchieveDic[data.id]=data;
	}

	ChatCenter.getAchieveInfo=function(id){
		return ChatCenter._chatAchieveDic[id];
	}

	ChatCenter.PRIVATE="请选择您要私聊的对象";
	ChatCenter.ALL_COUNT=50;
	ChatCenter.OTHER_COUNT=50;
	ChatCenter.SILIAO_COUNT=40;
	ChatCenter.SILIAO_PLAYER=10;
	ChatCenter._allNoreadCount=0;
	ChatCenter._noreadMsgDict={};
	ChatCenter._noreadSiliaoNum=0;
	ChatCenter._noreadSiliaoDict={};
	ChatCenter._channel=0;
	ChatCenter._allChannelData=[];
	ChatCenter._dataDict={};
	ChatCenter._shieldVipLower=100;
	ChatCenter.chat_time=0;
	ChatCenter.CD=5000;
	ChatCenter.CD_KuaFu=10000;
	ChatCenter.chat_time_kuafu=0;
	ChatCenter.siliaoPlayersChange=false;
	ChatCenter._siliaoPlayers=[];
	ChatCenter._siliaoDict={};
	ChatCenter._siliaoName=null;
	ChatCenter._remIndex=0;
	ChatCenter._remAry=[];
	ChatCenter.SHOWITEM_MAXNUM=3;
	ChatCenter.SHOWBQ_MAXNUM=5;
	ChatCenter.showItemNum=0;
	ChatCenter.showMyposNum=0;
	ChatCenter.showBQNum=0;
	ChatCenter.noDisabledArr=[];
	ChatCenter.isSplit=false;
	ChatCenter._tempText=null;
	ChatCenter._mainChatPool=null;
	ChatCenter.currentBei=0;
	ChatCenter._chatLvObj=null;
	ChatCenter._loginChatInfo=null;
	ChatCenter._chatItemDic={};
	ChatCenter._chatPlayerDic={};
	ChatCenter._chatAchieveDic={};
	return ChatCenter;
})()