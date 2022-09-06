function animate(obj, dis, callback) {
    clearInterval(obj.timer);
    //相当于
    // callback = function() {};
    obj.timer = setInterval(function() {
        //步长值取整
        var step = (dis - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == dis) {
            clearInterval(timer);
            //回调函数写到计时器结束后的位置
            if (callback) {
                callback();
            }
        }
        //缓动效果 （目标值-现在的位置）/10
        obj.style.left = obj.offsetLeft + step + 'px';

    }, 10);
}