/**
*祈福数据
*@author 胡剑
*创建时间：2017-3-29 下午9:49:22
*
*/
//class com.logic.data.guild.GuildQifuCenter extends com.game.core.connect.GameServer
var GuildQifuCenter=(function(_super){
	function GuildQifuCenter(){
		GuildQifuCenter.__super.call(this);;
	}

	__class(GuildQifuCenter,'com.logic.data.guild.GuildQifuCenter',_super);
	var __proto=GuildQifuCenter.prototype;
	__proto.init=function(){
		GameServer.register(S2C_GetGuildCliffordInfoMessage,GameHandler.create(this,this.onS2C_GetGuildCliffordInfoMessage));
		GameServer.register(S2C_BuildDonateMessage,GameHandler.create(this,this.onS2C_BuildDonateMessage));
		GameServer.register(S2C_GuildQiandaoMessage,GameHandler.create(this,this.onS2C_GuildQiandaoMessage));
	}

	/**请求祈福数据返回 */
	__proto.onS2C_GetGuildCliffordInfoMessage=function(cmd){
		com.logic.data.guild.GuildQifuCenter.load(cmd.cliffordInfo);
		EventMgr.dispatch("GuildEvent.QIFU_INFO");
		GuildRedPoint.isHasQifu();
	}

	/**祈福捐献返回 */
	__proto.onS2C_BuildDonateMessage=function(cmd){
		if(cmd.result==1){
			var info=com.logic.data.guild.GuildQifuCenter.getInfo(cmd.donateType);
			if(info){
				info.cliffordTimes++;
				GuildRedPoint.isHasQifu();
			}
		}
		EventMgr.dispatch("GuildEvent.QIFU_JUAN_XIAN",cmd.donateType,cmd.result);
	}

	/**领取祈福宝箱返回 */
	__proto.onS2C_GuildQiandaoMessage=function(cmd){
		com.logic.data.guild.GuildQifuCenter.record=cmd.record;
		EventMgr.dispatch("MoneyEvent.CHANGE",EnumMoney.GUILD_QIFU,0);
	}

	GuildQifuCenter.load=function(cliffordInfo){
		GuildQifuCenter.isHasData=true;
		GuildQifuCenter._dict={};
		var info;
		for(var i=0;i < cliffordInfo.length;i++){
			info=cliffordInfo[i];
			GuildQifuCenter._dict[info.cliffordId]=info;
		}
	}

	GuildQifuCenter.getInfo=function(type){
		if(GuildQifuCenter._dict !=null){
			return GuildQifuCenter._dict[type];
		}
		return null;
	}

	GuildQifuCenter.isFree=function(type){
		var bean=App.dataMgr.q_building_juanxianContainer.getDataBean(type,false);
		if(bean){
			var info=com.logic.data.guild.GuildQifuCenter.getInfo(type);
			if(!info || info.cliffordTimes < bean.q_times){
				if(!bean.q_currency_type){
					return true;
				}
				if(bean.q_player_check_condition){
					var obj=JSON.parse(bean.q_player_check_condition);
					if("mooncard" in obj){
						if(MoonCardCenter.isMoonCardActive(obj["mooncard"])){
							return true;
						}
					}
					if("todayzanzhu" in obj){
						if(MoneyCenter.rechargeToday-MoneyCenter.hongbaoRechargeToday >=obj["todayzanzhu"]){
							return true;
						}
					}
				}
			}
		}
		return false;
	}

	GuildQifuCenter.sendC2S_GetGuildCliffordInfoMessage=function(){
		GameServer.sendCommand(new C2S_GetGuildCliffordInfoMessage());
	}

	GuildQifuCenter.sendC2S_BuildDonateMessage=function(donateType){
		var msg=new C2S_BuildDonateMessage();
		msg.donateType=donateType;
		GameServer.sendCommand(msg);
	}

	GuildQifuCenter.sendC2S_GuildQiandaoMessage=function(index){
		var msg=new C2S_GuildQiandaoMessage();
		msg.index=index;
		GameServer.sendCommand(msg);
	}

	GuildQifuCenter.record=0;
	GuildQifuCenter._dict=null;
	GuildQifuCenter.isHasData=false;
	return GuildQifuCenter;
})(GameServer)
