var express = require('express');
var router = express.Router();

//引入http、https模块
const http = require("http");
const https = require("https");

//引入cheerio模块
const cheerio = require("cheerio");

//引入Mongoose模块
const mongoose = require("mongoose");
mongoose.Promise = Promise;

//链接mongoDB数据库
mongoose.connect("mongodb://127.0.0.1:27017/shixun_crawler");

//获取mongoDB连接实例
const db = mongoose.connection;

db.on(
    "open",
    function () {
        console.log("连接成功！");
    }
)

db.on(
    "error",
    function () {
        console.log("失败...");
    }
)

function getWeatherData() {
    http.get("http://www.weather.com.cn/weather/101200101.shtml", function (res) {
        let weatherHtml = "";
        res.setEncoding("utf-8");

        res.on("data", function (chunk) {
            weatherHtml += chunk;
        })

        //HTML文档全部内容获取结束
        res.on("end", function () {

            //加载所有weatherHtml数据
            let $ = cheerio.load(weatherHtml);

            let date = [];
            $("#7d .t li h1").each(function (i) {
                date[i] = $(this).text();
            })

            let weather = [];
            $("#7d .t li .wea").each(function (i) {
                weather[i] = $(this).text();
            })

            let temperature = [];
            $("#7d .t li .tem").each(function (i) {
                temperature[i] = $(this).text();
            })

            let weatherList = {
                date,
                weather,
                temperature
            }

            saveWeatherData(weatherList);
        })
    })
}

//保存天气数据
function saveWeatherData(weatherList) {
    let weather = db.collection("weather");
    weather.save({
        "weatherList": weatherList
    }, function (err, data) {
        if (err) {
            throw err;
        }
    });
}

getWeatherData();

//获取起点数据
function getQiDianData() {
    https.get("https://www.qidian.com", function (res) {
        let articleHtml = "";
        res.setEncoding("utf-8");

        res.on("data", function (chunk) {
            articleHtml += chunk;
        });
        res.on("end", function () {
            let $ = cheerio.load(articleHtml);
            let name = [];
            $("#classify-list dl dd a cite span i").each(function (i, elem) {
                name[i] = $(this).text();
            });
            let value = [];
            $("#classify-list dl dd a cite span b").each(function (i, elem) {
                value[i] = $(this).text();
            });

            let QiDianList = {
                name,
                value
            }

            saveQiDianData(QiDianList);
        })
    })
}
//保存起点数据
function saveQiDianData(QiDianList) {
    let qidian = db.collection("qidian");
    qidian.save({
        "QiDianList": QiDianList
    }, function (err, data) {
        if (err) {
            throw err;
        }
    });
}
getQiDianData();
/* GET home page. */
router.get('/', function (req, res, next) {

    //从mongoDB中获取天气数据
    let weathers = db.collection("weather");

    //倒序查询获取mongoDB中的最后一条数据
    weathers.findOne({}, {
        sort: [
            ["_id", -1]
        ]
    }, (function (err, weatherResult) {
        if (weatherResult) {
            //查询并获取起点中文网数据
            let qidians = db.collection("qidian");
            qidians.findOne({}, {
                sort: [
                    ["_id", -1]
                ]
            }, (
                function (err, qidianResult) {
                    res.render('index', {
                        title: '数据可视化',
                        weathers: weatherResult,
                        qidians: qidianResult
                    });
                }
            ))
        }
    }));


});

module.exports = router;