var touchEvent=function(){
	function getDirect(x1,x2,y1,y2){
		return Math.abs(x1-x2)>=Math.abs(y1-y2)?(x1>x2?"left":"right"):(y1>y2?"top":"bottom");	
	}
	function getPos(e){
		var e=e||window.event,
			x,y,  //初始位置
			ex,ey,  //结束位置
			mx,my;  //实时位置
		switch(e.type){
			case "touchstart":
				x=parseInt(e.touches[0].clientX);
				y=parseInt(e.touches[0].clientY);
				return {
					x:x,
					y:y
				}
			case "touchmove":
				e.preventDefault();
				mx=parseInt(e.changedTouches[0].clientX);
				my=parseInt(e.changedTouches[0].clientY);
				return {
					mx:mx,
					my:my
				}
			case "touchend":
				ex=parseInt(e.changedTouches[0].clientX);
				ey=parseInt(e.changedTouches[0].clientY);
				return {
					ex:ex,
					ey:ey
				}
		};
	}
	return{
		getDirect:getDirect,  //方向
		getPos:getPos	//位置
	}
}();
window.touchEvent=touchEvent;