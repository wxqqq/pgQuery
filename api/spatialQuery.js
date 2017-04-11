/*
 * @Author: wxq
 * @Date:   2017-04-10 14:41:38
 * @Last Modified by:   wxq
 * @Last Modified time: 2017-04-11 15:22:32
 * @Email: 304861063@qq.com
 * @File Path: H:\work\hyMapServer\api\spatialQuery.js
 * @File Name: spatialQuery.js
 * @Descript: 
 */
'use strict';
var express = require('express');
var router = express.Router();
var sequelize = require('../model/dbconnection');

router.get('/', function(req, res, next) {
    res.send('空间查询服务，支持类型为post,参数为 table:tianjin_video_pt polygon:POLYGON((117.128 39.078, 117.132 39.107,117.185 39.126,117.162 39.073,117.128 39.078))')
})

router.post('/', function(req, res, next) {
    console.log(req.param('table'));
    const tablename = req.param('table'); //tianjin_video_pt
    const polygon = req.param('polygon'); //POLYGON((117.128 39.078, 117.132 39.107,117.185 39.126,117.162 39.073,117.128 39.078))
    sequelize.query("select id, st_astext(a.geom) from " + tablename + "  a where  st_intersects(st_geomfromtext($polygon),a.geom)", {
        type: sequelize.QueryTypes.SELECT,
        // replacements: ['POLYGON((117.128 39.078, 117.132 39.107,117.185 39.126,117.162 39.073,117.128 39.078))']
        bind: {
            polygon: polygon
        }

    }).then(function(results, metadata) {
        // console.log(results);
        res.send(results);

    }).catch(function(e) {
        res.send(e);
        console.log(e)
    });
});

module.exports = router;