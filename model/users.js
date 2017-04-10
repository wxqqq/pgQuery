/*
 * @Author: wxq
 * @Date:   2017-04-01 11:56:39
 * @Last Modified by:   wxq
 * @Last Modified time: 2017-04-05 16:43:29
 * @Email: 304861063@qq.com
 * @File Path: H:\work\hyMapServer\model\users.js
 * @File Name: users.js
 * @Descript: 
 */
'use strict';
var Sequelize = require('Sequelize');
var sequelize = new Sequelize('postgres://postgres:postgres@192.168.58.128:5432/postgis');
var user = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING,
        field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    userid: {
        type: Sequelize.INTEGER
    },
    lastName: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

// user.sync({
//     force: true
// }).then(function() {
//     // Table created
//     return user.create({
//         userid: 123,
//         firstName: 'John',
//         lastName: 'Hancock'
//     });
// });
module.exports = user;
// exports.users = {
//     "a": {
//         id: 'a',
//         name: "usera",
//         password: "passworda"
//     },
//     "1": {
//         id: 1,
//         name: "user1",
//         password: "password1"
//     },
//     "2": {
//         id: 2,
//         name: "user2",
//         password: "password2"
//     },
//     "3": {
//         id: 3,
//         name: "user3",
//         password: "password3"
//     }
// }