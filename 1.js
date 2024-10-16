ChatCenter.sendChat=function(channel,content,playerName,bool,str,from){
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