var KuafuTaskView=(function(_super){
	function KuafuTaskView(){
		this._boxVec=null;
		KuafuTaskView.__super.call(this);
		this._boxVec=[];
		var typeArr=DailyCenter.getJitanEverydayTypeArr(1);
		var tempWidth=this.pro.width / typeArr.length;
		var box;
		for(var i=0;i < typeArr.length;i++){
			box=new KuafuTaskBox(typeArr[i],i);
			box.move(this.pro.x+(i+1)*tempWidth-(box.width / 2),466,this);
			this._boxVec.push(box);
		}
		this.list.renderHandler=GameHandler.create(this,this.renderHandler);
		this.list.scrollBarAllwaysShow="off";
		this.list.itemRender=KuafuTaskItem;
	}

	__class(KuafuTaskView,'com.modules.daily.kuafuTask.KuafuTaskView',_super);
	var __proto=KuafuTaskView.prototype;
	Laya.imps(__proto,{"com.game.core.panel.ITabView":true})
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._boxVec=null;
		laya.ui.View.prototype.destroy.call(this);
	}

	__proto.show=function(data,tab){
		(tab===void 0)&& (tab=-1);
		this.fuliImg.on("click",this,this.onClick);
		this.addEvent("DailyCenter.KUAFU_TASK_INFO",this.onTaskInfo);
		this.addEvent("jitaninfo_result",this.updateTask);
		this.addEvent("get_todayreward_result",this.updateTask);
		this.addEvent(ActivityEvent.refreshRedPoint,this.onTaskRedpoint);
		JitianCommandSender.sendJitianInfo();
		this.onTaskRedpoint(1021,false);
	}

	__proto.hide=function(){
		this.fuliImg.off("click",this,this.onClick);
		EventMgr.removeAll(this);
		this.fuliImg.showRedPoint(false);
	}

	__proto.onTaskRedpoint=function(iconId,bool){
		if(iconId==1021){
			this.fuliImg.showRedPoint(DailyCenter.kuafuTaskWeekRedPoint);
		}
	}

	__proto.onClick=function(e){
		PanelManager.openByClass(KuafuFuliPanel);
	}

	__proto.renderHandler=function(cell,index){
		cell.update(this.list.array[index].bean,this.list.array[index].task);
	}

	__proto.onTaskInfo=function(){
		this.updateItemCount();
	}

	__proto.updateItemCount=function(){
		var hasCount=DailyCenter.rongyuDayValue;
		this.numTxt.text=""+hasCount;
		var box;
		var tempIndex=-1;
		for(var j=0;j < this._boxVec.length;j++){
			if(tempIndex==-1 && hasCount <=this._boxVec[j].bean.q_needexp){
				tempIndex=j;
			}
		}
		tempIndex=tempIndex !=-1 ? tempIndex :this._boxVec.length-1;
		var tempWidth=0;
		var width1=0;
		var lastExp=0;
		if(tempIndex==0){
			tempWidth=this._boxVec[tempIndex].x-this.pro.x;
		}
		else{
			lastExp=this._boxVec[tempIndex-1].bean.q_needexp;
			width1=this._boxVec[tempIndex-1].x+this._boxVec[0].width;
			tempWidth=this._boxVec[tempIndex].x-width1;
			width1-=this.pro.x;
		};
		var needExp=this._boxVec[tempIndex].bean.q_needexp;
		var scaleX=(hasCount-lastExp)/ (needExp-lastExp);
		scaleX=scaleX > 1 ? 1 :scaleX;
		this.pro.width=width1+scaleX *tempWidth;
		for(var i=0;i < this._boxVec.length;i++){
			this._boxVec[i].setInfo();
		};
		var typeArr=DailyCenter.getJitanEverydayTypeArr(2);
		var bean;
		for(i=0;i < typeArr.length;i++){
			bean=typeArr[i];
			if(JitanCenter.todayRewards.indexOf(bean.q_id)==-1){
				break ;
			}
		}
		this.weekNumTxt.htmlText=GameHTML.setBoolColor(DailyCenter.rongyuWeekValue,DailyCenter.rongyuWeekValue >=bean.q_needexp)+"/"+bean.q_needexp;
	}

	__proto.updateTask=function(){
		var task,param,datas=[],datas2=[];
		var bean,beans=App.dataMgr.q_jitanContainer.getList();
		for (var i=0;i < beans.length;i++){
			bean=beans[i];
			if(bean.q_show==0 && bean.q_type==1){
				if(bean.q_function > 0 && FunctionManager.isFunctionOpen(bean.q_function,false)==false){
					continue ;
				}
				task=JitanCenter.getJiTianTaskData(bean.q_id);
				if(task){
					param={};
					if(task.rewardtimes < bean.q_time){
						param["sort"]=task.times > task.rewardtimes ? 1 :2;
					}
					else{
						param["sort"]=3;
					}
					param["bean"]=bean;
					param["task"]=task;
					datas2.push(param);
				}
				else{
					datas.push({bean:bean});
				}
			}
		}
		datas.sort(this.onSort1);
		datas2.sort(this.onSort2);
		this.list.array=datas2.concat(datas);
		this.updateItemCount();
	}

	__proto.onSort1=function(v1,v2){
		return v1.bean.q_sort-v2.bean.q_sort;
	}

	__proto.onSort2=function(v1,v2){
		if(v1.sort < v2.sort)
			return-1;
		if(v1.sort > v2.sort)
			return 1;
		return v1.bean.q_sort-v2.bean.q_sort;
	}

	return KuafuTaskView;
})(KuafuTaskViewUI)