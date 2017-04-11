var express = require('express');
var router = express.Router();

function initIndex(res) {
    var title = 'hyMapServer(地图查询服务)';
    var body = [{
        src: "/routing?start=116.87675722305062,36.67248480521945&end=116.94490678970101,36.64965384208468",
        name: '路径查询服务'
    }, {
        src: '/table',
        name: '数据表'
    }, {
        src: '/geocode',
        name: '地址匹配'
    }]
    res.render('index', {
        title: title,
        clist: body
    });
}

module.exports = function(app) {

    /* GET home page. */

    app.get('/', function(req, res, next) {
        initIndex(res);
    });
    app.post('/', function(req, res, next) {
        initIndex(res);
    });

    var users = require('../api/users');
    app.use('/users', users);

    var routing = require('../api/routing');
    app.use('/routing', routing);

    var spaticalQuery = require('../api/spatialQuery');
    app.use('/spatialQuery', spaticalQuery);

    var table = require('../api/table');
    app.use('/table', table);
};