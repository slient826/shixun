/**
 * 添加鼠标悬停改变样式事件
 * @无参数
 * @无返回值
 */
function hoverEffect() {
    $("article section .product-box .show-summary").hover(
        function () {
            $(this).addClass("hover");
        },
        function () {
            $(this).removeClass("hover");
        });
}

/**
 * 添加点击布局按钮切换大小布局事件
 * @无参数
 * @无返回值
 */
function clickLayout() {
    //点击摘要布局
    $(".show-way").on("click", ".summary", function () {
        $(this).addClass("active");
        $(".show-way").find(".detail").removeClass("active");
        $(".product-box").removeClass("large");
    });

    //点击详细布局
    $(".show-way").on("click", ".detail", function () {
        $(this).addClass("active");
        $(".show-way").find(".summary").removeClass("active");
        $(".product-box").addClass("large");
    });
}

/**
 * 购物车中有商品则显示结账按钮
 * @无参数
 * @无返回值
 */
function showPay() {
    if ($(".left-title .btn .pay-bill").css("display") == "none") {
        $(".left-title .btn .pay-bill").css(
            "display", "inline-block"
        );
    }
}

/**
 * 保存购物车数据到本地LocalStorage
 * @参数 [页面元素]：将该页面元素下的所有商品的指定数据存储到本地（若传入非指定页面元素，需要更改本方法代码）
 * @无返回值
 */
function saveDataToLocal(parents) {
    var productData = [];
    $(parents).each(function (i, target) {
        var tTarget = $(target);
        if (parents == ".cart-product")
            productData.push({
                image: tTarget.find("img").attr("src"),
                name: tTarget.find(".cart-title").text(),
                price: tTarget.find(".cart-price").text(),
                num: tTarget.find(".cart-itemnum").text()
            })
        else if (parents == ".table-middle")
            productData.push({
                image: tTarget.find("img").attr("src"),
                name: tTarget.find(".tableitem-name").text(),
                price: tTarget.find(".tableitem-price").text(),
                num: tTarget.find(".tableitem-num").text()
            })
    });
    localStorage.setItem("products", JSON.stringify(productData));
}

/**
 * 从本地LocalStorage加载数据到页面上
 * @参数 [页面元素]：将本地LocalStorage中的数据加载到该页面元素下（若传入非指定页面元素，需要更改 appendItemInfo() 代码）
 * @无返回值
 */
function loadDataToLocal(parents) {
    var productJson = localStorage.getItem("products");
    if (productJson != "" && productJson != null && productJson != undefined) {
        var products = JSON.parse(productJson);
        $.each(products, function (i, p) {
            appendItemInfo(p.image, p.name, p.price, p.num, parents, true);
        })
    }
}

/**
 * 从本地LocalStorage加载数据到页面上
 * @参数 [parents]：传入页面元素，将信息添加到该页面元素下
 * @参数 [loadLocal]：true：页面元素下数据为空，从零开始加载；false：页面元素下已有数据，开启数量检测，若只有数量变更则只变更数量
 * @无返回值
 */
function appendItemInfo(image, name, price, num, parents, loadLocal) {
    if (parents == "table") {
        var productItem =
            '<tr class="table-middle">' +
            '<td><input type="checkbox"></td>' +
            '<td>' +
            '<div class="tableitem-info">' +
            '<img src="' + image + '" alt="">' +
            '<span class="tableitem-name">' + name + '</span>' +
            '</div>' +
            '</td>' +
            '<td class="tableitem-price">' + price + '</td>' +
            '<td><span class="less">-</span>' +
            '<span class="tableitem-num">' + num + '</span>' +
            '<span class="plus">+</span></td>' +
            '<td class="tableitem-subtotal">' + '￥' + (price.match(/\d+/) * num) + '</td > ' +
            '<td class="tableitem-delete">删除</td>' +
            '</tr>'
    } else {
        if (num == 1 || loadLocal == true) {
            var productItem = '<li class="cart-product">' +
                '<div class="cart-img">' +
                '<img src="' + image + '" alt="">' +
                '</div>' +
                '<div class="cart-text">' +
                '<div class="cart-title">' + name + '</div>' +
                '<div class="cart-price">' + price + '</div>' +
                '<div class="cart-itemnum">' + num + '</div>' +
                '</div>' +
                '</li>';
            showPay();
        } else {
            $(calItemNum(name, true).item).find(".cart-itemnum")
                .text(num);
        }
    }
    $(parents).append(productItem);
    //计算购物车物品总数
    subCartItem();
}

/**
 * 计算并显示购物车商品总数
 * @无参数
 * @无返回值
 */
function subCartItem() {
    var itemTotalNum = 0;
    $("#cart-item .cart-product").each(function () {
        itemTotalNum += parseInt($(this).find(".cart-itemnum").text());
    })
    if (itemTotalNum == 0)
        $(".item-num").text("购物车中没有商品");
    else
        $(".item-num").text("您添加了" + itemTotalNum + "件商品");
}

/**
 * 添加结账按钮跳转事件
 * @无参数
 * @无返回值
 */
function toPay() {
    $(".pay-bill").on("click", function () {
        location.href = "./cart.html";
    })
}

/**
 * 添加物品到购物车时计算物品数量
 * @无参数
 * @无返回值
 */
function calItemNum(itemTitle, getItem) {
    var itemNum = 1;
    var item;
    $("#cart-item .cart-title").each(function () {
        if ($(this).text() == itemTitle) {
            item = $(this).parents(".cart-product");
            if (getItem == true) {
                return {
                    itemNum,
                    item
                }, false;
            } else {
                itemNum += parseInt($(item).find(".cart-itemnum").text());
                return {
                    itemNum,
                    item
                }, false;
            }
        }
    });
    return {
        itemNum,
        item,
    };
}

/**
 * 添加加入购物车按钮事件
 * @无参数
 * @无返回值
 */
function addToCart() {
    var finished = true;
    //添加按钮事件
    $(".product-box .show-summary .add-cart-btn,.large-cart-btn").on("click", function () {
        if (finished) {
            finished = false;
            //获取当前商品信息
            var productInfo = $(this).parents(".show-summary");

            //用于动画，确定当前商品图片元素，准备克隆
            var productImg = productInfo.find(".product-img img");

            //获取信息用于添加到左侧购物车
            var itemImgSrc = productImg.attr("src");
            var itemTitle = productInfo.find(".product-title").text();
            var itemPrice = productInfo.find(".now-price").text();

            //计算购物车中单一商品数量
            var itemNum = calItemNum(itemTitle).itemNum;
            var cItem = calItemNum(itemTitle).item;

            //用于动画，定位左侧购物车
            var cartTransform = $(".shopping-cart .left-content");

            if (cItem == null || cItem == undefined || cItem == "") {
                var cItemTop = cartTransform.offset().top + cartTransform.height();
            } else {
                var cItemTop = cItem.offset().top + (cItem.height() / 2);
            }
            //用于动画，克隆商品图片元素
            var cloneProduct = productImg
                .clone()
                .css({
                    "position": "absolute",
                    "left": productImg.offset().left,
                    "top": productImg.offset().top,
                    "width": productImg.width(),
                    "height": productImg.height()
                })
                .appendTo("body");

            //移动动画：动画时间，淡出事件函数
            cloneProduct.animate({
                    left: cartTransform.offset().left,
                    top: cItemTop,
                    width: "0px",
                    height: "0px"
                }, 300)
                //淡出（含回调函数）
                .fadeOut(0, function () {
                    appendItemInfo(itemImgSrc, itemTitle, itemPrice, itemNum, "#cart-item");

                    //动画完成，删除克隆的图片元素
                    cloneProduct.remove();
                    //数据保存到本地
                    saveDataToLocal(".cart-product");
                    finished = true;
                });
        }
    })
}


$(function () {
    toPay();
    loadDataToLocal("#cart-item");
    hoverEffect();
    clickLayout();
    addToCart();
})