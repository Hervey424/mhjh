var BossXinxiTabData=(function(){
	function BossXinxiTabData(bean){
		this.isLock=false;
		this.q_rank_lv=0;
		this.q_rankid=0;
		this.fightId=0;
		this.datas=null;
		this.maps=null;
		this.ids=null;
		this.fightId=bean.q_id;
		this.ids=bean.q_monster_id ? JSON.parse(bean.q_monster_id):[];
		this.maps=bean.q_refresh_maps ? JSON.parse(bean.q_refresh_maps):[];
		var map,obj,types=[],dic={};
		for(var i=0;i < this.maps.length;i++){
			map=App.dataMgr.q_mapContainer.getDataBean(this.maps[i]);
			obj={map:this.maps[i],boss:this.ids[i],rankid:App.dataMgr.q_monsterContainer.getDataBean(this.ids[i]).q_boss_title_type};
			if(!dic[map.q_client_type]){
				dic[map.q_client_type]=[];
				types.push(map.q_client_type);
			}
			dic[map.q_client_type].push(obj);
		}
		types.sort(SortTools.smallToBig);
		this.datas=[];
		for(i=0;i < types.length;i++){
			this.datas.push(dic[types[i]]);
		};
		var rbean=App.dataMgr.q_monster_rankContainer.getDataBean(BossDataCenter.instance.getBossWorldRank(this.ids[0]));
		if(rbean){
			this.q_rankid=rbean.q_id;
			this.q_rank_lv=rbean.q_rank_lv;
		}
	}

	__class(BossXinxiTabData,'com.modules.boss.xinxi.BossXinxiTabData');
	return BossXinxiTabData;
})()