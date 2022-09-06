window.addEventListener('load', function() {

    //获取元素
    var btn_left = document.querySelector('#arrow1');
    var btn_right = document.querySelector('#arrow2');
    var focus = document.querySelector('.focus');
    //鼠标经过轮播图就显示左右按钮 离开就隐藏
    focus.addEventListener('mouseover', function() {
        btn_left.style.display = 'block';
        btn_right.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function() {
        btn_left.style.display = 'none';
        btn_right.style.display = 'none';
        timer = setInterval(function() {
            btn_right.click();
        }, 2000)
    });
    // 动态生成小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        ol.appendChild(li);
        //记录当前小圆圈的索引号 通过自定义属性去实现
        li.setAttribute('data-index', i);
        //生成小圆圈的同时绑定点击事件 点击小圆圈就让其背景色变色 排他思想
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].style.backgroundColor = '';
            }
            this.style.backgroundColor = 'orange';
            // 点击小圆圈移动图片
            // animate(obj,dis,callvack);
            //当我们点击了某个小li 就拿到当前小li的索引号
            var index = this.getAttribute('data-index');
            num = index;
            circle = index;
            console.log(focus.offsetWidth, index);
            animate(ul, -index * focus.offsetWidth)

        });
    }
    //克隆第一张图片放在后面弥补动画不足
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    console.log(ul.children.length);
    //点击左右按钮进行切换轮播图
    var num = 0;
    var circle = 0;
    //右侧按钮
    btn_right.addEventListener('click', function() {
        //加入节流阀防止过快点击 等待动画结束
        var flag = true;
        if (flag) {
            flag = false; //关闭节流阀
            //如果走到最后复制的一张图片 我们要快速复原left改为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focus.offsetWidth, function() {
                flag = true; //打开节流阀
            });

            //点击右侧按钮 小圆圈也跟着一起变化 ky再声明一个变量控制小圆圈的播放
            circle++;
            //当走到克隆的图片时候将小圆圈赋值为0 复原
            if (circle == ul.children.length - 1) {
                circle = 0;
            }
            //先清楚其他小圆圈样式
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].style.backgroundColor = '';
            }
            ol.children[circle].style.backgroundColor = 'orange';
        }
    });

    // 左侧按钮
    btn_left.addEventListener('click', function() {
        //如果走到最后复制的一张图片 我们要快速复原left改为0
        if (num == 0) {
            ul.style.left = (ul.children.length - 1) * focus.offsetWidth + 'px';
            num = ul.children.length - 1;
        }
        num--;
        animate(ul, -num * focus.offsetWidth);
        //点击右侧按钮 小圆圈也跟着一起变化 ky再声明一个变量控制小圆圈的播放
        circle--;
        //当走到克隆的图片时候将小圆圈赋值为0 复原
        if (circle < 0) {
            circle = ol.children.length - 1;
        }
        //先清楚其他小圆圈样式
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].style.backgroundColor = '';
        }
        ol.children[circle].style.backgroundColor = 'orange';

    });
    //轮播图自动播放
    var timer = 0;
    timer = this.setInterval(function() {
        btn_right.click();
    }, 2000)


})