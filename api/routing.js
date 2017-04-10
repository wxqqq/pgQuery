/*
 * @Author: wxq
 * @Date:   2017-04-05 14:47:48
 * @Last Modified by:   wxq
 * @Last Modified time: 2017-04-10 17:28:46
 * @Email: 304861063@qq.com
 * @File Path: H:\work\hyMapServer\api\routing.js
 * @File Name: routing.js
 * @Descript: 
 */
'use strict';
var express = require('express');
var router = express.Router();
var Sequelize = require('Sequelize');

function getRouting(req, res) {
    try {

        const start = req.param('start'); //[116.87675722305062,36.67248480521945 POINT(116.87675722305062 36.67248480521945)
        const end = req.param('end'); //[116.94490678970101,36.64965384208468] POINT(116.94490678970101 36.64965384208468)
        const distance = req.param('distance') || 150;
        var sequelize = new Sequelize('postgres://postgres:postgres@192.168.58.128:5432/postgis');
        console.log(start);
        console.log(end)
        sequelize.query("select pro_short_path(?,?,?)", {
            replacements: [start, end, distance]

            // sequelize.query("select * from pgr_fromatob(?,?,?,?,?) as(gid integer,source integer, target integer,length double precision ,name character  varying(50),type integer ,coordinates text  )", {
            // replacements: ['road_jinan', start[0], start[1], end[0], end[1]]
            // bind: []
        }).spread(function(results, metadata) {
            // Raw query - use spread
            // console.log(results);
            var result = {
                start: {
                    coordinates: start
                },
                end: {
                    coordinates: end
                }
            }
            result.routing = results;
            // console.log(results);
            res.send(result);

        }).catch(function(e) {
            console.log(e)
            res.send(e);

        });
    } catch (err) {
        console.log(err)
        res.send('支持post请求<br>参数格式为: start:[x,y],end:[x,y]');
    }
}


router.get('/', function(req, res, next) {
    res.send('支持post请求\n\r参数格式为: start:[x,y],end:[x,y]');
    getRouting(req, res);

});
router.post('/', function(req, res, next) {
    getRouting(req, res);

});

module.exports = router;