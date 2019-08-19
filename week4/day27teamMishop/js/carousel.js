import "./../css/carousel.css";
import $ from "jquery";
//设置总轮播图数量
var picNum = 5;

//切换图片事件处理
var pic = (function () {
    var account = 1;
    var isChange = false;
    //下一张图片
    function nextPic() {
        if (isChange == false) {
            isChange = true;
            if (account == picNum)
                account = 0;
            account++;
            $(".carousel .first .img").css("background-image", "url('../img/carouselPic/" + account + ".jpg')");
            var timer = setTimeout(function () {
                isChange = false;
                timer = window.clearTimeout(timer);
            }, 1000);

            changeCircle();
        }
    }
    //上一张图片
    function prevPic() {
        if (isChange == false) {
            isChange = true;
            if (account == 1)
                account += picNum;
            account--;
            $(".carousel .first .img").css("background-image", "url('../img/carouselPic/" + account + ".jpg')");
            var timer = setTimeout(function () {
                isChange = false;
                timer = window.clearTimeout(timer);
            }, 1000);
            changeCircle();
        }
    }
    //点击小圆点切换指定图片
    function accountPic(count) {
        account = count;
        $(".carousel .first .img").css("background-image", "url('../img/carouselPic/" + account + ".jpg')");
        changeCircle();
    }
    //小圆点相应变换
    function changeCircle() {
        $(".choice").removeClass("active");
        $("#" + account).addClass("active");
    }
    return {
        next: nextPic,
        prev: prevPic,
        change: accountPic
    };
})();
//左侧响应事件
var left = (function () {
    function showCurrent(currentClass) {
        hiddenCurrent();
        $("." + currentClass).addClass("current");
    }

    function hiddenCurrent() {
        $(".left-big").removeClass("current");
    }
    return {
        show: showCurrent,
        hidden: hiddenCurrent
    };
})();
$(function () {

    //添加计时器以自动播放轮播图
    var timer = setInterval(pic.next, 3000);

    //鼠标未指到图片时重新开始自动播放
    $(".carousel .first .img,.carousel .first .btn-left,.carousel .first .btn-right").mouseout(function () {
        timer = window.clearInterval(timer);
        timer = setInterval(pic.next, 3000);
    });
    //鼠标指到图片时停止自动播放
    $(".carousel .first .img,.carousel .first .btn-left,.carousel .first .btn-right,.choice").mouseover(function () {
        timer = window.clearInterval(timer);
    });

    //添加左按钮切换图片事件
    $(".carousel .first .btn-left").on("click", function () {
        pic.prev();
    });

    //添加右按钮切换图片事件
    $(".carousel .first .btn-right").on("click", function () {
        pic.next();
    });

    //添加小圆点按钮切换图片事件
    $(".choice").on("click", function () {
        timer = window.clearInterval(timer);
        var id = $(this).attr("id");
        pic.change(id);
    });

    //添加弹出右侧商品列表事件
    $(".big-left").on("mouseenter", function () {
        //清除所有
        $(".big-left").removeClass("hover");
        left.hidden();
        //显示当前
        var id = $(this).attr("id");
        $(this).addClass("hover");
        left.show(id);
    });

    //移出轮播图区域才取消所有商品列表显示
    $(".first,.left-big").mouseleave(function () {
        $(".big-left").removeClass("hover");
        left.hidden();
    });
});