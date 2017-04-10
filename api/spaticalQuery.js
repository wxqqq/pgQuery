/*
 * @Author: wxq
 * @Date:   2017-04-10 14:41:38
 * @Last Modified by:   wxq
 * @Last Modified time: 2017-04-10 16:08:50
 * @Email: 304861063@qq.com
 * @File Path: H:\work\hyMapServer\api\spaticalQuery.js
 * @File Name: spaticalQuery.js
 * @Descript: 
 */
'use strict';
var express = require('express');
var router = express.Router();
var Sequelize = require('Sequelize');

router.post('/', function(req, res, next) {
    console.log(req.param('table'));
    const tablename = req.param('table'); //tianjin_video_pt
    const polygon = req.param('polygon'); //POLYGON((117.128 39.078, 117.132 39.107,117.185 39.126,117.162 39.073,117.128 39.078))

    var sequelize = new Sequelize('postgres://postgres:postgres@192.168.0.50:5432/postgis');

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