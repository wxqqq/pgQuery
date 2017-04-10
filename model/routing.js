/*
 * @Author: wxq
 * @Date:   2017-04-05 10:30:23
 * @Last Modified by:   wxq
 * @Last Modified time: 2017-04-05 14:21:37
 * @Email: 304861063@qq.com
 * @File Path: H:\work\hyMapServer\model\routing.js
 * @File Name: routing.js
 * @Descript: 
 */
'use strict';
var Sequelize = require('Sequelize');
var sequelize = new Sequelize('postgres://postgres:postgres@192.168.58.128:5432/postgis');

sequelize.query("select * from pgr_fromatob('road_jinan ','116.87675722305062 ','36.67248480521945 ','116.94490678970101 ','36.64965384208468 ')").spread(function(results, metadata) {
    // Raw query - use spread
    console.log(result.col1);
});

var routing = sequelize.define('pgr_fromatob', {
    col1: {
        type: Sequelize.STRING,
        field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    col2: {
        type: Sequelize.INTEGER
    },
    lastName: {
        type: Sequelize.STRING
    }
});
module.exports = routing;