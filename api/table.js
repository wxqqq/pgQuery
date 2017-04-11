/*
 * @Author: wxq
 * @Date:   2017-04-11 10:05:02
 * @Last Modified by:   wxq
 * @Last Modified time: 2017-04-11 18:31:52
 * @Email: 304861063@qq.com
 * @File Path: H:\work\hyMapServer\api\table.js
 * @File Name: table.js
 * @Descript: 
 */
'use strict';
var express = require('express');
var router = express.Router();
var sequelize = require('../model/dbconnection');
var queryModel = require('../model/query');

router.get('/', function(req, res, next) {
    var sql = 'SELECT tablename,description FROM pg_tables a,pg_class b' +
        ' LEFT OUTER JOIN pg_description d  on d.objsubid=0 and b.oid=d.objoid ' + 'WHERE schemaname=\'public\' and tablename = b.relname  ' + ' and a.tablename NOT LIKE \'pg%\' ' + '  AND a.tablename NOT LIKE \'sql_%\'  ' + 'ORDER BY a.tablename; ';

    sequelize.query(sql).spread(function(results, metadata) {
        var body = [];
        results.forEach(function(val, index) {
            body.push({
                src: 'table/' + val.tablename,
                name: val.tablename,
                desc: val.description
            });

        });
        res.render('list', {
            title: 'table',
            clist: body
        });
    }).catch(function(e) {
        res.send(e);
    });

});

router.get('/:id', function(req, res, next) {
    console.log('id:' + req.param('id'));

    getTableColumn(req.param('id'), function(result) {
        var body = [{
            name: 'saptialQuery',
            src: '' + req.param('id') + '/spatialQuery'
        }]
        console.log(result)
        res.render('list', {
            title: req.param('id'),
            column: result,
            clist: body
        });

    })

});

router.get('/:id/:method', function(req, res, next) {
    console.log(req.param('id'))
    res.send('空间查询服务，支持类型为post,参数为 table:tianjin_video_pt polygon:POLYGON((117.128 39.078, 117.132 39.107,117.185 39.126,117.162 39.073,117.128 39.078))')

})
router.post('/:id/:method', function(req, res, next) {
    var query = new queryModel();
    var table = req.param('id')
    var polygon = 'POLYGON((117.128 39.078, 117.132 39.107,117.185 39.126,117.162 39.073,117.128 39.078))';
    query.spatialQuery(table, polygon, function(result) {
        res.send(result);
    });

})

function getTableColumn(tablename, callback) {
    var sql = 'SELECT a.attname AS field,t.typname AS type,a.attlen AS length,a.atttypmod AS lengthvar,a.attnotnull AS notnull,b.description AS comment FROM pg_class c, pg_attribute a LEFT OUTER JOIN pg_description b ON a.attrelid =b.objoid AND a.attnum = b.objsubid, pg_type t WHERE 1 = 1 and c.relname = \'area_china_city\' and a.attnum > 0    and a.attrelid = c.oid and a.atttypid = t.oid ORDER BY a.attnum;';

    sequelize.query(sql).spread(function(results, metadata) {
        var body = [];
        results.forEach(function(val, index) {
            body.push({
                src: 'table/' + val.tablename,
                name: val.field,
                desc: val.comment
            });

        });
        callback(body);

    }).catch(function(e) {
        callback(e)
    });
}

module.exports = router;