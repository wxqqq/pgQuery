var express = require('express');
var router = express.Router();

function initIndex(res) {
    var title = 'hyMapServer(地图查询服务)'
    res.render('index', {
        title: title
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

    var spaticalQuery = require('../api/spaticalQuery');
    app.use('/spaticalQuery', spaticalQuery);
};