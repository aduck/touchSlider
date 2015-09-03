function TouchSlide(opts){
	var opts=opts||{};
	this.count=0;
	this.auto=opts.auto||false;
	this.elem=opts.elem;
	this.len=this.elem.getElementsByTagName("li").length;
	this.width=opts.width;
	this.init.apply(this,arguments);
}
TouchSlide.prototype={
	constructor:TouchSlide,
	move:function(points){
		if(this.count>=this.len-1){
			this.count=0;
		}else{
			this.count++;
		}
		this.elem.style.left=-this.count*this.width+"px";
		var i,
			point=points.getElementsByTagName("li"),
			len=point.length;
		for(i=0;i<len;i++){
			point[i].className="";
		}
		point[this.count].className="selected";
	},
	isAuto:function(points){
		var that=this;
		if(that.auto){
			that.mover=setInterval(function(){
				that.move(points);
			},that.auto);
		}
	},
	createPoints:function(){
		var i,
			points=document.createElement("ul");
		points.className="points";
		for(i=0;i<this.len;i++){
			points.appendChild(document.createElement("li"));
		}
		this.elem.parentNode.appendChild(points);
		return points;
	},
	binder:function(points){
		var initp={},
			movep={},
			endp={},
			xpos,
			that=this;
		this.elem.addEventListener("touchstart",function(e){
			if(that.mover) clearInterval(that.mover);
			xpos=parseInt(this.style.left)||0;
			initp=touchEvent.getPos(e);
		},false);
		this.elem.addEventListener("touchmove",function(e){
			movep=touchEvent.getPos(e);
			this.style.left=xpos+movep.mx-initp.x+"px";
		},false);
		this.elem.addEventListener("touchend",function(e){
			endp=touchEvent.getPos(e);
			var dir=touchEvent.getDirect(initp.x,endp.ex,initp.y,endp.ey);
			if(dir=="left"){
				if(Math.abs(endp.ex-initp.x)>30){
					if(that.count>=that.len-1){
						that.count=that.len-1
					}else{
						that.count++;
					}
				}
			}else if(dir=="right"){
				if(Math.abs(endp.ex-initp.x)>30){
					if(that.count<=0){
						that.count=0;
					}else{
						that.count--;
					}
				}
			}
			var i,
				point=points.getElementsByTagName("li"),
				len=point.length;
			for(i=0;i<len;i++){
				point[i].className="";
			}
			this.style.left=-that.count*that.width+"px";
			point[that.count].className="selected";
			that.isAuto(points);
		},false);
	},
	init:function(){
		var points=this.createPoints();
		points.getElementsByTagName("li")[0].className="selected";
		this.binder(points);
		this.isAuto(points);

	}
};