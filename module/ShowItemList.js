var ShowItemList=(function(_super){
	function ShowItemList(showCount,isHorizontal,gap,$parent2,xpos,ypos,showBagItemCount,$gridType,$imageType,$size,showTip){
		this._gridList=null;
		this._showCount=false;
		this._isHorizontal=false;
		this._gap=0;
		this._showBagItemCount=false;
		this._gridType=null;
		this._imageType=null;
		this._size=0;
		this._showTip=false;
		this._$4__width=0;
		this._$4__height=0;
		this._isEnough=false;
		this.autoClear=true;
		this.isInnerTip=false;
		this.showLock=false;
		/**是否显示更好的箭头*/
		this.isShowBatter=true;
		ShowItemList.__super.call(this);
		(showCount===void 0)&& (showCount=true);
		(isHorizontal===void 0)&& (isHorizontal=true);
		(gap===void 0)&& (gap=10);
		(xpos===void 0)&& (xpos=0);
		(ypos===void 0)&& (ypos=0);
		(showBagItemCount===void 0)&& (showBagItemCount=false);
		($size===void 0)&& ($size=0);
		(showTip===void 0)&& (showTip=true);
		if($gridType=="grid_null"){
			$gridType=null;
		}
		else if($gridType==null){
			$gridType="grid_44_1";
		}
		if($imageType==null){
			$imageType=EnumImageType.ITEM_40;
		}
		if($size <=0){
			$size=EnumGridType.getGridSize($gridType);
		}
		this._showCount=showCount;
		this._isHorizontal=isHorizontal;
		this._gap=gap;
		this._showBagItemCount=showBagItemCount;
		this._gridType=$gridType;
		this._imageType=$imageType;
		this._size=$size;
		this._showTip=showTip;
		this._gridList=[];
		this.x=xpos;
		this.y=ypos;
		if($parent2 !=null){
			$parent2.addChild(this);
		}
	}

	__class(ShowItemList,'com.components.grids.ShowItemList',_super);
	var __proto=ShowItemList.prototype;
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._gridList=null;
		this._gridType=null;
		this._imageType=null;
		laya.display.Sprite.prototype.destroy.call(this);
	}

	__proto.center=function(){
		if(this.parent2 !=null){
			this.x=this.parent2.width-this.width >> 1;
		}
	}

	/**
	*显示物品id数组
	*@param arr [id]
	*@param isLimit 是否对职业和性别进行筛选
	*@param gap-1表示使用初始化函数中的值
	*@param multiple 数量倍数（物品的数量将会乘以该倍数）
	*@param length 最多显示多少个，默认-1显示所有
	*@param count 数量
	*
	*/
	__proto.showArrById=function(arr,isLimit,gap,multiple,length,count){
		(isLimit===void 0)&& (isLimit=true);
		(gap===void 0)&& (gap=-1);
		(multiple===void 0)&& (multiple=1);
		(length===void 0)&& (length=-1);
		(count===void 0)&& (count=1);
		var brr=[];
		if(arr !=null){
			var len=arr.length;
			for(var i=0;i < len;i++){
				brr.push({"id":arr[i],"num":count,"isbind":false});
			}
		}
		this.showArr(brr,isLimit,gap,multiple,length);
	}

	/**
	*显示物品id数组
	*@param arr [id],Int64类型
	*@param isLimit 是否对职业和性别进行筛选
	*@param gap-1表示使用初始化函数中的值
	*@param multiple 数量倍数（物品的数量将会乘以该倍数）
	*@param length 最多显示多少个，默认-1显示所有
	*@param count [count]
	*
	*/
	__proto.showArrByIdOrCount=function(arr,countArr,isLimit,gap,multiple,length){
		(isLimit===void 0)&& (isLimit=true);
		(gap===void 0)&& (gap=-1);
		(multiple===void 0)&& (multiple=1);
		(length===void 0)&& (length=-1);
		var brr=[];
		if(arr !=null){
			var len=arr.length;
			for(var i=0;i < len;i++){
				brr.push({"id":(arr[i]).toNumber(),"num":countArr[i],"isbind":false});
			}
		}
		this.showArr(brr,isLimit,gap,multiple,length);
	}

	__proto.showOrderBySimpleItemInfo=function(arr,col,gapX,gapY,isLimit,length){
		(gapX===void 0)&& (gapX=0);
		(gapY===void 0)&& (gapY=0);
		(isLimit===void 0)&& (isLimit=true);
		(length===void 0)&& (length=-1);
		var obj;
		var dict={};
		var brr=[];
		var info;
		if(arr !=null){
			var len=arr.length;
			for(var i=0;i < len;i++){
				info=arr[i];
				obj=dict[info.itemModelId+"_"+info.isbind];
				if(obj==null){
					obj={"id":info.itemModelId,"num":info.itemNum,"isbind":info.isbind==1};
					dict[info.itemModelId+"_"+info.isbind]=obj;
					brr.push(obj);
				}
				else{
					obj["num"]+=info.itemNum;
				}
			}
		}
		this.showOrderGridByArr(brr,col,gapX,gapX,isLimit,length);
	}

	__proto.showSimpleItemInfo=function(arr,isLimit,gap,multiple,length){
		(isLimit===void 0)&& (isLimit=true);
		(gap===void 0)&& (gap=-1);
		(multiple===void 0)&& (multiple=1);
		(length===void 0)&& (length=-1);
		var obj;
		var dict={};
		var brr=[];
		var info;
		if(arr !=null){
			var len=arr.length;
			for(var i=0;i < len;i++){
				info=arr[i];
				obj=dict[info.itemModelId+"_"+info.isbind];
				if(obj==null){
					obj={"id":info.itemModelId,"num":info.itemNum,"isbind":info.isbind==1};
					dict[info.itemModelId+"_"+info.isbind]=obj;
					brr.push(obj);
				}
				else{
					obj["num"]+=info.itemNum;
				}
			}
		}
		this.showArr(brr,isLimit,gap,multiple,length);
	}

	__proto.showZoneReward=function(arr,isLimit,gap,multiple,length){
		(isLimit===void 0)&& (isLimit=true);
		(gap===void 0)&& (gap=-1);
		(multiple===void 0)&& (multiple=1);
		(length===void 0)&& (length=-1);
		var obj;
		var dict={};
		var brr=[];
		var info;
		if(arr !=null){
			var len=arr.length;
			for(var i=0;i < len;i++){
				info=arr[i];
				obj=dict[info.itemModelid+"_"+0];
				if(obj==null){
					obj={"id":info.itemModelid,"num":info.num,"isbind":false};
					dict[info.itemModelid+"_"+0]=obj;
					brr.push(obj);
				}
				else{
					obj["num"]+=info.num;
				}
			}
		}
		this.showArr(brr,isLimit,gap,multiple,length);
	}

	/**
	*显示ItemData数组
	*@param arr [ItemData]
	*@param isLimit 是否对职业和性别进行筛选
	*@param gap-1表示使用初始化函数中的值
	*@param multiple 数量倍数（物品的数量将会乘以该倍数）
	*@param length 最多显示多少个，默认-1显示所有
	*
	*/
	__proto.showArrByItemData=function(arr,isLimit,gap,multiple,length){
		(isLimit===void 0)&& (isLimit=true);
		(gap===void 0)&& (gap=-1);
		(multiple===void 0)&& (multiple=1);
		(length===void 0)&& (length=-1);
		var brr=[];
		if(arr !=null){
			var data;
			var len=arr.length;
			for(var i=0;i < len;i++){
				data=arr[i];
				brr.push({"id":data.itemId,"num":data.count,"isbind":data.isbind});
			}
		}
		this.showArr(brr,isLimit,gap,multiple,length);
	}

	/**
	*显示ItemData数组
	*@param arr Vector.<ItemData>
	*@param isLimit 是否对职业和性别进行筛选
	*@param gap-1表示使用初始化函数中的值
	*@param multiple 数量倍数（物品的数量将会乘以该倍数）
	*@param length 最多显示多少个，默认-1显示所有
	*
	*/
	__proto.showVecByItemData=function(vec,isLimit,gap,multiple,length){
		(isLimit===void 0)&& (isLimit=true);
		(gap===void 0)&& (gap=-1);
		(multiple===void 0)&& (multiple=1);
		(length===void 0)&& (length=-1);
		var brr=[];
		if(vec !=null){
			var len=vec.length;
			for(var i=0;i < len;i++){
				brr.push({"id":vec[i].itemId,"num":vec[i].count,"isbind":vec[i].isbind});
			}
		}
		this.showArr(brr,isLimit,gap,multiple,length);
	}

	/**
	*显示奖励
	*@param json [{'id':'100001','num':1,'jb':''},{'id':'100002','num':2,'jb':''}]
	*@param isLimit 是否对职业和性别进行筛选
	*@param gap-1表示使用初始化函数中的值
	*@param multiple 数量倍数（物品的数量将会乘以该倍数）
	*@param length 最多显示多少个，默认-1显示所有
	*/
	__proto.showJson=function(json,isLimit,gap,multiple,length){
		(isLimit===void 0)&& (isLimit=true);
		(gap===void 0)&& (gap=-1);
		(multiple===void 0)&& (multiple=1);
		(length===void 0)&& (length=-1);
		var arr=[];
		if(json){
			arr=JSON.parse(json);
		}
		this.showArr(arr,isLimit,gap,multiple,length);
	}

	/**
	*显示奖励
	*@param json [100001,100002]
	*@param isLimit 是否对职业和性别进行筛选
	*@param gap-1表示使用初始化函数中的值
	*@param multiple 数量倍数（物品的数量将会乘以该倍数）
	*@param length 最多显示多少个，默认-1显示所有
	*@param count 数量
	*/
	__proto.showJsonById=function(json,isLimit,gap,multiple,length,count){
		(isLimit===void 0)&& (isLimit=true);
		(gap===void 0)&& (gap=-1);
		(multiple===void 0)&& (multiple=1);
		(length===void 0)&& (length=-1);
		(count===void 0)&& (count=1);
		var arr=[];
		if(json){
			arr=JSON.parse(json);
		}
		this.showArrById(arr,isLimit,gap,multiple,length,count);
	}

	/**
	*显示奖励
	*@param arr [{id:'100001','num':1,'jb':''},{id:'100002','num':2,'jb':''}]
	*@param isLimit 是否对职业和性别进行筛选
	*@param gap-1表示使用初始化函数中的值
	*@param multiple 数量倍数（物品的数量将会乘以该倍数）
	*@param length 最多显示多少个，默认-1显示所有
	*/
	__proto.showArr=function(arr,isLimit,gap,multiple,length){
		(isLimit===void 0)&& (isLimit=true);
		(gap===void 0)&& (gap=-1);
		(multiple===void 0)&& (multiple=1);
		(length===void 0)&& (length=-1);
		this.clear();
		if(arr==null || arr.length==0){
			this._$4__width=0;
			this._$4__height=0;
			return;
		}
		if(gap !=-1){
			this._gap=gap;
		}
		if(length==-1){
			length=arr.length;
		};
		var NUM=40;
		var GRP=10;
		var pos=0;
		var itemId=0;
		var grid;
		for(var i=0;i < arr.length;i++){
			if(pos >=length){
				break ;
			}
			if(!ItemUtil.isShow(arr[i],isLimit)){
				continue ;
			}
			if(this._gridList.length > 0){
				grid=this._gridList.pop();
				grid.showCountTxt=this._showCount;
			}
			else{
				grid=new ItemGrid(this._gridType,this._imageType,this._size,true,this._showCount,false,this._showTip,true,this.autoClear);
				grid.isShowBatter=this.isShowBatter;
			}
			grid.showTip=this._showTip;
			grid.isInnerTip=this.isInnerTip;
			grid.setLockImage(this.showLock);
			if(this._isHorizontal){
				if(pos >=NUM){
					grid.x=(pos-NUM)*(grid.width+this._gap);
					grid.y=this._size+GRP;
					}else{
					grid.x=pos *(grid.width+this._gap);
					grid.y=0;
				}
			}
			else{
				grid.x=0;
				grid.y=pos *(grid.height+this._gap);
			}
			pos++;
			this.addChild(grid);
			grid.showJsonObject(arr[i],multiple);
			this.updateCount(grid);
		};
		var num=this.numChildren;
		if(this._isHorizontal){
			if(pos > NUM){
				this._$4__width=NUM *this._size+(NUM-1)*this._gap;
				this._$4__height=this._size *2+GRP;
				}else{
				this._$4__width=num *this._size+(num-1)*this._gap;
				this._$4__height=this._size;
			}
		}
		else{
			this._$4__width=this._size;
			this._$4__height=num *this._size+(num-1)*this._gap;
		}
	}

	/**
	*更新格子数量显示
	*@param grid 不传表示更新所有格子
	*
	*/
	__proto.updateCount=function(grid){
		if(grid !=null){
			if(this._showCount){
				if(this._showBagItemCount){
					if(grid.data !=null){
						var count=grid.data.count;
						var has=BagItemCenter.getItemCount(grid.itemId);
						var countStr=has+"/"+count;
						this._isEnough=count <=has;
						if((this._size==48 && countStr.length > 5)|| (this._size==66 && countStr.length > 7)){
							grid.showCount(count+"",this._isEnough ? GameHTML.GREEN :GameHTML.RED);
						}
						else{
							grid.showCount(countStr,this._isEnough ? GameHTML.GREEN :GameHTML.RED);
						}
					}
				}
			}
			else{
				grid.showCount("");
			}
		}
		else{
			var grids=this.getGrids();
			for(var i=0;i < grids.length;i++){
				this.updateCount(grids[i]);
			}
		}
	}

	/**
	*获取正在展示的物品格子
	*@return
	*
	*/
	__proto.getGrids=function(){
		var list=[];
		var i=0;
		var grid;
		while(i < this.numChildren){
			grid=ClassUtils.asTo(this.getChildAt(i),ItemGrid);
			if(grid !=null){
				list.push(grid);
			}
			i++;
		}
		return list;
	}

	/**
	*获取第几个格子，0为第一个
	*@param index
	*@return
	*
	*/
	__proto.getGrid=function(index){
		(index===void 0)&& (index=0);
		var i=0;
		var grid;
		while(i < this.numChildren){
			grid=ClassUtils.asTo(this.getChildAt(i),ItemGrid);
			if(grid !=null){
				if(i >=index){
					return grid;
				}
			}
			i++;
		}
		return null;
	}

	/**
	*移除格子并清除格子数据
	*
	*/
	__proto.clear=function(){
		this.showRedPoint(false);
		var grid;
		while(this.numChildren > 0){
			grid=ClassUtils.asTo(this.removeChildAt(0),ItemGrid);
			if(grid){
				grid.data=null;
				this._gridList.push(grid);
			}
		}
	}

	/**
	*飞货币到头像兰
	*/
	__proto.flyMoneyItems=function(){
		var i=0;
		var grid;
		while(i < this.numChildren){
			grid=ClassUtils.asTo(this.getChildAt(i),ItemGrid);
			if(grid !=null){
				grid.flyMoneyItems();
			}
			i++;
		}
	}

	/**
	*飞入到背包
	*/
	__proto.flyToBag=function(){
		ItemFlyToBagEffect.flyItem(this.getGrids(),null,-1,null,true);
	}

	/**
	*显示物品id数组
	*@param arr [id]
	*@param col
	*@param gapX
	*@param gapY
	*@param isLimit
	*@param length
	*
	*/
	__proto.showOrderGridById=function(arr,col,gapX,gapY,isLimit,length){
		(gapX===void 0)&& (gapX=0);
		(gapY===void 0)&& (gapY=0);
		(isLimit===void 0)&& (isLimit=true);
		(length===void 0)&& (length=-1);
		var brr=[];
		if(arr !=null){
			var len=arr.length;
			for(var i=0;i < len;i++){
				brr.push({"id":arr[i],"num":1,"isbind":false});
			}
		}
		this.showOrderGridByArr(brr,col,gapX,gapY,isLimit,length);
	}

	/**
	*
	*@param arr [ItemData]
	*@param col
	*@param gapX
	*@param gapY
	*@param isLimit
	*@param length
	*
	*/
	__proto.showOrderGridByItemData=function(arr,col,gapX,gapY,isLimit,length){
		(gapX===void 0)&& (gapX=0);
		(gapY===void 0)&& (gapY=0);
		(isLimit===void 0)&& (isLimit=true);
		(length===void 0)&& (length=-1);
		var brr=[];
		if(arr !=null){
			var data;
			var len=arr.length;
			for(var i=0;i < len;i++){
				data=arr[i];
				brr.push({"id":data.itemId,"num":data.count,"isbind":data.isbind});
			}
		}
		this.showOrderGridByArr(brr,col,gapX,gapY,isLimit,length);
	}

	/**
	*
	*@param json [{id:'100001','num':1,'jb':''},{id:'100002','num':2,'jb':''}]
	*@param col 一行多少个
	*@param gapX x间距
	*@param gapY y间距
	*@param isLimit 是否对职业和性别进行筛选
	*@param length 最多显示多少个，默认-1显示所有
	*
	*/
	__proto.showOrderGridByJson=function(json,col,gapX,gapY,isLimit,length){
		(gapX===void 0)&& (gapX=0);
		(gapY===void 0)&& (gapY=0);
		(isLimit===void 0)&& (isLimit=true);
		(length===void 0)&& (length=-1);
		var arr=[];
		if(json){
			arr=JSON.parse(json);
		}
		this.showOrderGridByArr(arr,col,gapX,gapY,isLimit,length);
	}

	/**
	*
	*@param arr [{id:'100001','num':1,'jb':''},{id:'100002','num':2,'jb':''}]
	*@param col 一行多少个
	*@param gapX x间距
	*@param gapY y间距
	*@param isLimit 是否对职业和性别进行筛选
	*@param length 最多显示多少个，默认-1显示所有
	*
	*/
	__proto.showOrderGridByArr=function(arr,col,gapX,gapY,isLimit,length){
		(gapX===void 0)&& (gapX=0);
		(gapY===void 0)&& (gapY=0);
		(isLimit===void 0)&& (isLimit=true);
		(length===void 0)&& (length=-1);
		this.clear();
		if(arr==null || arr.length==0){
			this._$4__width=0;
			this._$4__height=0;
			return;
		}
		if(length==-1){
			length=arr.length;
		}
		else{
			length=arr.length > length ? length :arr.length;
		};
		var pos=0;
		var grid;
		for(var i=0;i < arr.length;i++){
			if(pos >=length){
				break ;
			}
			if(!ItemUtil.isShow(arr[i],isLimit)){
				continue ;
			}
			if(this._gridList.length > 0){
				grid=this._gridList.pop();
				grid.showCountTxt=this._showCount;
			}
			else{
				grid=new ItemGrid(this._gridType,this._imageType,this._size,true,this._showCount,false,this._showTip,true,this.autoClear);
				grid.isShowBatter=this.isShowBatter;
			}
			grid.showTip=this._showTip;
			grid.isInnerTip=this.isInnerTip;
			grid.move(pos % col *(this._size+gapX),myparseInt(pos / col)*(this._size+gapY),this);
			grid.showJsonObject(arr[i]);
			pos++;
		};
		var min=Math.min(pos,col);
		this._$4__width=min *this._size+(min-1)*gapX;
		min=Math.ceil(pos / col);
		this._$4__height=min *this._size+(min-1)*gapY;
	}

	/**
	*
	*@param arr [{id:'100001','num':1,'jb':''},{id:'100002','num':2,'jb':''}]
	*@param pos
	*@param isLimit
	*
	*/
	__proto.showGridByPos=function(arr,pos,isLimit){
		(isLimit===void 0)&& (isLimit=true);
		this.clear();
		if(arr==null || arr.length==0){
			this._$4__width=0;
			this._$4__height=0;
			return;
		};
		var grid;
		for(var i=0;i < arr.length;i++){
			if(!ItemUtil.isShow(arr[i],isLimit)){
				continue ;
			}
			if(this._gridList.length > 0){
				grid=this._gridList.pop();
				grid.showCountTxt=this._showCount;
			}
			else{
				grid=new ItemGrid(this._gridType,this._imageType,this._size,true,this._showCount,false,this._showTip,true,this.autoClear);
				grid.isShowBatter=this.isShowBatter;
			}
			grid.move(pos[i]["x"],pos[i]["y"],this);
			grid.showJsonObject(arr[i]);
		}
	}

	/**
	*道具数量翻倍
	*@param mult 0显示原始
	*
	*/
	__proto.showMultipleCount=function(mult){
		(mult===void 0)&& (mult=0);
		var grids=this.getGrids();
		for(var i=0;i < grids.length;i++){
			grids[i].showMultipleCount(mult);
		}
	}

	__proto.showRedPointEffect=function(value,$x,$y,$parent){
		($x===void 0)&& ($x=-999);
		($y===void 0)&& ($y=-999);
		if(value==this.isRedPoint || (value && !this.visible)){
			return;
		}
		this.isRedPoint=value;
		var grid;
		for(var $each_grid in this._childs){
			grid=this._childs[$each_grid];
			if((grid instanceof com.components.grids.ItemGrid )){
				grid.showRedPointEffect(value,$x,$y);
			}
		}
	}

	__getset(0,__proto,'gap',function(){return this._gap;});
	__getset(0,__proto,'width',function(){return this._$4__width;},_super.prototype._$set_width);
	__getset(0,__proto,'tipEnabled',null,function(value){
		var grid;
		for(var $each_grid in this._childs){
			grid=this._childs[$each_grid];
			if((grid instanceof com.components.grids.ItemGrid )){
				grid.tipEnabled=value;
			}
		}
	});

	__getset(0,__proto,'height',function(){return this._$4__height;},_super.prototype._$set_height);
	__getset(0,__proto,'showBagItemCount',null,function(value){
		this._showBagItemCount=value;
	});

	__getset(0,__proto,'gridSize',function(){return this._size;});
	/**背包中每个物品是否足够， 需设置 showBagItemCount 为 true*/
	__getset(0,__proto,'isEnough',function(){
		return this._isEnough;
	});

	return ShowItemList;
})(BaseSprite)