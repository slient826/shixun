// 基于准备好的dom，初始化echarts实例
const weatherModel = echarts.init(document.getElementById('weatherModel'));
const movieModel = echarts.init(document.getElementById('movieModel'));
const salesModel = echarts.init(document.getElementById('salesModel'));
const qidianModel = echarts.init(document.getElementById('qidianModel'));
const qidianUpdataTime = echarts.init(document.getElementById('qidianUpdataTime'));
const travelModel = echarts.init(document.getElementById('travelModel'));


// 天气预报
// 使用指定的配置项和数据显示图表。
weatherModel.setOption({
    tooltip: { //提示框组件
        trigger: 'axis', //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
        formatter: '{c0}℃', //提示框浮层内容格式器
    },
    xAxis: { //直角坐标系 grid 中的 x 轴
        type: 'category', //'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
        boundaryGap: false, //默认为 true，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间。
        data: ['现在', '14点', '17点', '20点', '23点', '02点', '05点', '08点', '11点'],
        axisLabel: { //坐标轴刻度标签的相关设置。
            show: true, //是否显示刻度标签。
            textStyle: { //刻度标签文字的颜色
                color: '#fff'
            }
        },
        axisLine: { //坐标轴轴线相关设置。
            lineStyle: { //坐标轴线线的颜色。
                color: 'rgba(32,117,171,0.4)'
            }
        },
        splitLine: { //坐标轴在 grid 区域中的分隔线。
            show: false //是否显示分隔线
        }
    },
    yAxis: { //直角坐标系 grid 中的 y 轴
        type: 'value', //'value' 数值轴，适用于连续数据。
        axisLabel: {
            show: true,
            textStyle: {
                color: '#fff'
            }
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(83,157,204,0.5)'
            },
        }
    },
    series: [{ //系列列表。每个系列通过 type 决定自己的图表类型
        type: 'line', //折线图
        data: [18, 21, 21, 14, 10, 10, 10, 14, 19], //数据内容数组
        areaStyle: { //区域填充样式。
            normal: {
                color: 'rgba(79,109,205,0.4)'
            }
        },
        itemStyle: { //折线拐点标志的样式。
            normal: {
                color: '#fff',
                label: {
                    show: true,
                    formatter: '{c0}℃'
                },
            }
        },
    }]
});

// 电影票房
movieModel.setOption({
    tooltip: {
        trigger: 'axis',
        formatter: '{c0}万'
    },
    xAxis: {
        type: 'category',
        data: ['狂暴巨兽', '头号玩家', '湮灭', '起跑线', '红海行动', '暴裂无声', '寻找罗麦', '毕业作品', '西北风云'],
        axisLabel: {
            show: true,
            textStyle: {
                color: '#fff'
            }
        }

    },
    yAxis: {
        type: 'value',
        axisLabel: {
            show: true,
            textStyle: {
                color: '#fff'
            }
        },
        splitLine: {
            show: false,
        }

    },
    series: [{
        data: [1097, 719.4, 628.3, 481.1, 373.4, 461.4, 717.7, 812.2, 929.8],
        type: 'bar', //柱状/条形图
        barWidth: 15, //柱图宽度
        itemStyle: { //图形样式
            normal: { //渐变色填充
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#25d9fa'
                }, {
                    offset: 1,
                    color: '#1171c0'
                }]),
                shadowColor: 'rgba(255, 255, 255, 0.4)', //阴影颜色
                shadowBlur: 20, //阴影的模糊大小
                label: { //图形上的文本标签
                    show: true, //是否显示标签
                    position: 'top', //标签的位置。
                    formatter: '{c0}万', //标签内容格式器
                    textStyle: {
                        color: '#25d9fa' //标签内容颜色
                    }
                },
            }
        },
    }]
});

// 汽车销售
salesModel.setOption({
    tooltip: { //图例组件
        trigger: 'item',
        formatter: '{c0}万件'
    },
    legend: {
        orient: 'vertical', //图例列表垂直朝向
        left: 'center',
        top: '20px',
        data: ['汽车'],
        textStyle: {
            color: '#fff'
        }
    },
    visualMap: {
        min: 0,
        max: 2500,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],
        calculable: true, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
        color: ['#343167', '#192434'],
        textStyle: {
            color: '#fff' // 值域控件的文本颜色
        }
    },
    series: [{
            name: '汽车',
            type: 'map', //地图
            mapType: 'china',
            roam: true, //是否开启鼠标缩放和平移漫游
            label: {
                normal: {
                    show: true, //显示省份标签
                    textStyle: {
                        color: "#fff"
                    } //省份标签字体颜色
                },
                emphasis: { //对应的鼠标悬浮效果
                    show: true,
                    textStyle: {
                        color: "#fff"
                    }
                }
            },
            itemStyle: { //地图区域的多边形 图形样式。
                normal: {
                    borderWidth: .5, //区域边框宽度
                    borderColor: '#0685c1', //区域边框颜色
                    areaColor: "#0685c1", //区域颜色
                },
                emphasis: { //高亮状态下的多边形和标签样式。
                    borderWidth: .5,
                    borderColor: '#0685c1',
                    areaColor: "#0685c1",
                }
            },
            data: [{
                    name: '北京',
                    value: '833'
                },
                {
                    name: '天津',
                    value: '568'
                },
                {
                    name: '上海',
                    value: '926'
                },
                {
                    name: '重庆',
                    value: '191'
                },
                {
                    name: '河北',
                    value: '300'
                },
                {
                    name: '河南',
                    value: '723'
                },
                {
                    name: '云南',
                    value: '625'
                },
                {
                    name: '辽宁',
                    value: '563'
                },
                {
                    name: '黑龙江',
                    value: '944'
                },
                {
                    name: '湖南',
                    value: '132'
                },
                {
                    name: '安徽',
                    value: '95'
                },
                {
                    name: '山东',
                    value: '757'
                },
                {
                    name: '新疆',
                    value: '283'
                },
                {
                    name: '江苏',
                    value: '545'
                },
                {
                    name: '浙江',
                    value: '612'
                },
                {
                    name: '江西',
                    value: '120'
                },
                {
                    name: '湖北',
                    value: '557'
                },
                {
                    name: '广西',
                    value: '940'
                },
                {
                    name: '甘肃',
                    value: '501'
                },
                {
                    name: '山西',
                    value: '219'
                },
                {
                    name: '内蒙古',
                    value: '996'
                },
                {
                    name: '陕西',
                    value: '853'
                },
                {
                    name: '吉林',
                    value: '92'
                },
                {
                    name: '福建',
                    value: '256'
                },
                {
                    name: '贵州',
                    value: '972'
                },
                {
                    name: '广东',
                    value: '312'
                },
                {
                    name: '青海',
                    value: '478'
                },
                {
                    name: '西藏',
                    value: '353'
                },
                {
                    name: '四川',
                    value: '695'
                },
                {
                    name: '宁夏',
                    value: '166'
                },
                {
                    name: '海南',
                    value: '951'
                },
                {
                    name: '台湾',
                    value: '69'
                },
                {
                    name: '香港',
                    value: '397'
                },
                {
                    name: '澳门',
                    value: '36'
                },
                {
                    name: '南海诸岛',
                    value: '100'
                }
            ]
        },

    ]
});

// 起点中文网书籍分类
qidianModel.setOption({
    legend: { //图例组件
        orient: 'horizontal', //图例列表水平朝向
        padding: 5, //图例内边距
        itemGap: 10, //图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
        textStyle: {
            color: '#91adcb'
        }, //字体颜色
        data: qidian.name //图例项的名称
    },
    tooltip: { //提示框组件
        trigger: 'item', //数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用
        formatter: "{a} <br/>{b} : {c} ({d}%)" //提示框浮层内容格式器
    },
    series: [{
        name: '书籍种类占比',
        type: 'pie', //类型为饼图
        radius: '55%', //饼图的半径
        center: ['50%', '50%'], //饼图的中心坐标
        data: (function () { //数据内容数组
            let res = [];
            for (let i = 0; i < qidian.value.length; i++) {
                res.push({
                    name: qidian.name[i], //数据项的名称
                    value: qidian.value[i] //数据项的值
                });
            }
            return res;
        })(),
        roseType: 'radius', //扇区圆心角展现数据的百分比，半径展现数据的大小。
        labelLine: {
            normal: {
                smooth: 0.2, //是否平滑视觉引导线，默认不平滑，可以设置成 true 平滑显示，也可以设置为 0 到 1 的值，表示平滑程度。
                length: 10, //视觉引导线第一段的长度。
                length2: 20 //视觉引导项第二段的长度
            }
        },

        animationType: 'scale', //初始动画效果,'scale' 缩放效果，配合设置 animationEasing='elasticOut' 可以做成 popup 的效果。
        animationEasing: 'elasticOut',
    }]
});
// 起点中文网更新时间
qidianUpdataTime.setOption({
    title: { //标题组件
        text: '更新时间',
        left: 'center',
        top: '20px',
        padding: 10,
        textStyle: {
            fontSize: '14px',
            color: '#fff'
        },
        backgroundColor: 'rgba(26,216,245,0.4)',
        borderRadius: '5px',
        shadowColor: 'rgba(255, 255, 255, 0.8)',
        shadowBlur: 20
    },
    tooltip: {
        trigger: 'axis',
        formatter: '{c0}万字'
    },
    xAxis: {
        type: 'category',
        boundaryGap: false, //是否从起点开始画线
        data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
        axisLabel: {
            show: true,
            textStyle: {
                color: '#fff'
            }
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(32,117,171,0.4)'
            }
        },
    },
    yAxis: {
        type: 'value',
        splitLine: {
            show: false,
        },
        axisLabel: {
            show: true,
            formatter: '{value} 万', //在y轴添加单位
            textStyle: {
                color: '#fff'
            }
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(32,117,171,0.4)'
            }
        },
    },
    series: [{
        data: [82, 92, 110, 64, 49, 68, 87, 98],
        type: 'line',
        areaStyle: {
            normal: {
                color: 'rgba(26,216,245,0.6)' //更新时间的折线图区域的颜色
            }
        },
        itemStyle: {
            normal: {
                color: '#1ad8f5', //折线的颜色
            }
        },
    }]
});

// 出行
travelModel.setOption({
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
    },
    legend: {
        data: ['2016年', '2017年'],
        textStyle: {
            color: '#fff'
        },
    },
    grid: { //直角坐标系内绘图网格
        left: '3%', //grid 组件离容器左侧的距离。
        right: '4%', //grid 组件离容器右侧的距离。
        bottom: '3%', //grid 组件离容器下侧的距离。
        containLabel: true //grid 区域是否包含坐标轴的刻度标签。
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLabel: {
            show: true,
            textStyle: {
                color: '#fff'
            },
            formatter: '{value} 人', //在x轴添加单位
        },
        splitLine: {
            show: false,
        },
    },
    yAxis: {
        type: 'category',
        data: ['其他', '小汽车', '公交', '步行', '地铁', '自行车'],
        axisLabel: {
            show: true,
            textStyle: {
                color: '#fff'
            }
        },
    },
    series: [{
            name: '2016年',
            type: 'bar',
            data: [18203, 23489, 29034, 14970, 31744, 30230],
            emphasis: {
                barBorderRadius: [0, 7, 7, 0]
            },
            itemStyle: {
                normal: {
                    barBorderRadius: [0, 7, 7, 0],
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 1, 0,
                        [{
                                offset: 0,
                                color: '#297acc'
                            },
                            {
                                offset: 1,
                                color: '#00e8df'
                            }

                        ]
                    )
                }
            },
        },
        {
            name: '2017年',
            type: 'bar',
            data: [19325, 23438, 31000, 11594, 34141, 41807],
            emphasis: {
                barBorderRadius: [0, 7, 7, 0] //圆角
            },
            itemStyle: {
                normal: {
                    barBorderRadius: [0, 7, 7, 0],
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 1, 0,
                        [{
                                offset: 0,
                                color: '#297acc'
                            },
                            {
                                offset: 1,
                                color: '#a55ccc'
                            }

                        ]
                    )
                }
            }
        }
    ]
});