/**
 * 计算选中商品款数及选中商品总金额
 * @无参数
 * @无返回值
 */
function calValue() {
    var value = 0;
    var count = 0;
    $(".table-middle input[type='checkbox']").each(function () {
        var item = $(this).parent().parent();
        if ($(this).is(":checked")) {
            count += 1;
            value += parseInt(item.find(".tableitem-subtotal").text().match(/\d+/));
        }
        $(".selected-num").text(count);
        $(".total-num").text(value.toFixed(2));
    })
    $(".selected-num").text(count);
    $(".total-num").text(value.toFixed(2));
    saveDataToLocal(".table-middle");
}

/**
 * 添加全选按钮事件
 * @无参数
 * @无返回值
 */
function selectAll() {
    $(".table-top input[type='checkbox']").change(function () {
        if ($(this).is(":checked")) {
            $(".table-middle input[type='checkbox']").each(function (i, v) {
                $(v).prop("checked", true);
            })
        } else {
            $(".table-middle input[type='checkbox']").each(function (i, v) {
                $(v).prop("checked", false);
            })
        }
        calValue();
    });
}

/**
 * 添加数量加减按钮事件
 * @无参数
 * @无返回值
 */
function lessPlus() {
    $(".less").on("click", function () {
        var num = parseInt($(this).parents(".table-middle").find(".tableitem-num").text().match(/\d+/));
        $(this).parents(".table-middle").find(".tableitem-num").text(--num);
        if (num == 1) {
            $(this).css({
                display: "none"
            });
        }
        var price = parseInt($(this).parents(".table-middle").find(".tableitem-price").text().match(/\d+/));
        price *= num;
        $(this).parents(".table-middle").find(".tableitem-subtotal").text("￥" + price);
        calValue();
    })
    $(".plus").on("click", function () {
        $(this).siblings(".less").css({
            display: "inline-block"
        });
        var num = parseInt($(this).parents(".table-middle").find(".tableitem-num").text().match(/\d+/));
        $(this).parents(".table-middle").find(".tableitem-num").text(++num);
        var price = parseInt($(this).parents(".table-middle").find(".tableitem-price").text().match(/\d+/));
        price *= num;
        $(this).parents(".table-middle").find(".tableitem-subtotal").text("￥" + price);
        calValue();
    })
}

/**
 * 添加删除单个商品和删除全部按钮事件
 * @无参数
 * @无返回值
 */
function deleteEvent() {
    $(".tableitem-delete").on("click", function () {
        var item = $(this).parents(".table-middle");
        item.remove();
        localStorage.removeItem('products');
        calValue();
    })
    $("#delete").on("click", function () {
        var item = $(".table-middle");
        item.remove();
        localStorage.removeItem('products');
        calValue();
    })
}

/**
 * 页面初始化，添加各按钮事件
 * @无参数
 * @无返回值
 */
function init() {
    selectAll();
    lessPlus();
    deleteEvent();
    $(".table-middle input[type='checkbox']").each(function () {
        var item = $(this).parent().parent();
        console.log(item);
        var num = parseInt(item.find(".tableitem-num").text().match(/\d+/));
        if (num == 1) {
            $(item).find(".less").css({
                display: "none"
            });
        }
        $(this).change(function () {
            calValue();
        })
    })
}

$(function () {
    loadDataToLocal("table");
    init();
})