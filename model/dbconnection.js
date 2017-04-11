/*
 * @Author: wxq
 * @Date:   2017-04-11 10:48:34
 * @Last Modified by:   wxq
 * @Last Modified time: 2017-04-11 15:23:39
 * @Email: 304861063@qq.com
 * @File Path: H:\work\hyMapServer\model\dbconnection.js
 * @File Name: dbconnection.js
 * @Descript: 
 */
'use strict';
var Sequelize = require('Sequelize');
var dbconnection = new Sequelize('postgres://postgres:postgres@192.168.0.50:5432/postgis');
module.exports = dbconnection;