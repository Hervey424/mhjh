var JunZhuangCenter=(function(){
	function JunZhuangCenter(){}
	__class(JunZhuangCenter,'com.modules.role.junxian.data.JunZhuangCenter');
	JunZhuangCenter.getQiangHuaNewID=function(type,lv){
		return (type-1)*10000+lv;
	}

	JunZhuangCenter.getSummaryAttrs=function(){
		var ids=[137,138,139,140,141];
		var attrs=LazyUtil.getAttrList_v4(ids);
		for (var i=0;i < JunZhuangCenter.parts.length;i++){
			var part=JunZhuangCenter.parts[i];
			var equipData=WearEquipCenter.getEquipByPart(part);
			if(equipData==null){
				continue ;
			};
			var equipAttrs=LazyUtil.getAttrList(equipData.getEquipDataBean().q_add_attribute1);
			LazyUtil.addTwoAttr_v2(attrs,equipAttrs);
			var lv=EquipPartCenter.getPartQiangHuaLevel(part,10);
			var qianghuaBean=App.dataMgr.q_equip_qianghua_newContainer.getDataBean(JunZhuangCenter.getQiangHuaNewID(3,lv));
			if(qianghuaBean){
				var qianghuaAttrs=LazyUtil.getAttrList(qianghuaBean.q_add_attribute1);
				LazyUtil.addTwoAttr_v2(attrs,qianghuaAttrs);
			}
		}
		return attrs;
	}

	JunZhuangCenter.getMasterPartStr=function(itemBean){
		if(itemBean==null)
			return null;
		var equipBean=App.dataMgr.q_equipContainer.getDataBean(itemBean.q_id);
		if(equipBean==null)
			return null;
		var type=8501;
		var masters=MasterUtil.getMastersByPart(equipBean.q_kind);
		if(masters && masters.length > 0){
			type=masters[0];
		};
		var rank=itemBean.q_rank;
		var bean=App.dataMgr.q_equip_masterContainer.getBean(type,rank);
		if(bean==null || bean.q_equips=="")
			return null;
		var str1="";
		var str2="";
		var color;
		var index=0;
		var count=0;
		var equips=JSON.parse(bean.q_equips);
		for(var i=0;i < equips.length;i++){
			var item=App.dataMgr.q_itemContainer.getDataBean(equips[i],false);
			if(item && ItemUtil.isJobSame(item.q_job,false)&& ItemUtil.isSexSame(item.q_sex,false)){
				var equip=App.dataMgr.q_equipContainer.getDataBean(equips[i],false);
				var wear=WearEquipCenter.getEquipByPart(equip.q_kind);
				if(wear && wear.getEquipDataBean().q_rank >=rank){
					count++;
					color="#00ff00";
				}
				else{
					color="#b6b6b6";
				}
				if(index % 2==0){
					if(str1)str1+="<br/>";
					str1+=GameHTML.setColor(ItemUtil.getItemNameBean(item),color);
					}else{
					if(str2)str2+="<br/>";
					str2+=GameHTML.setColor(ItemUtil.getItemNameBean(item),color);
				}
				index++;
			}
		};
		var str3=bean.q_name+GameHTML.setColor("（"+count+"/"+bean.q_max_num+"）",count < bean.q_max_num ? GameHTML.RED :GameHTML.GREEN);
		return [str1,str2,str3,count];
	}

	JunZhuangCenter.checkPoint=function(){
		if(!FunctionManager.isFunctionOpen(116)){
			return;
		}
		JunZhuangCenter.redPoint=false;
		for (var i=0;i < JunZhuangCenter.parts.length;i++){
			var part=JunZhuangCenter.parts[i];
			JunZhuangCenter._redMap[part]=false;
			var equipData=WearEquipCenter.getEquipByPart(part);
			if(equipData==null){
				continue ;
			};
			var lv=EquipPartCenter.getPartQiangHuaLevel(part,10);
			var qh_id=com.modules.role.junxian.data.JunZhuangCenter.getQiangHuaNewID(3,lv);
			var qianghuaBean=App.dataMgr.q_equip_qianghua_newContainer.getDataBean(qh_id);
			if(qianghuaBean && qianghuaBean.q_next_id > 0){
				var nextQiangHuaBean=App.dataMgr.q_equip_qianghua_newContainer.getDataBean(qianghuaBean.q_next_id);
				if(nextQiangHuaBean && nextQiangHuaBean.q_cost_qianghua){
					if(ConditionUtil.isItemEnoughJson(nextQiangHuaBean.q_cost_qianghua)){
						JunZhuangCenter.redPoint=true;
						JunZhuangCenter._redMap[part]=true;
					}
				}
			}
		}
		JunXianCenter.dispatchPoint();
	}

	JunZhuangCenter.getPartPoint=function(part){
		return JunZhuangCenter._redMap[part];
	}

	JunZhuangCenter.redPoint=false;
	JunZhuangCenter._redMap={};
	__static(JunZhuangCenter,
	['parts',function(){return this.parts=[8801,8802,8803,8804,8805,8806,8807,8808,8809,8810,8811,8812];}
	]);
	return JunZhuangCenter;
})()