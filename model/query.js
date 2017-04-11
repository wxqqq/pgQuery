/*
 * @Author: wxq
 * @Date:   2017-04-10 18:26:40
 * @Last Modified by:   wxq
 * @Last Modified time: 2017-04-11 15:24:11
 * @Email: 304861063@qq.com
 * @File Path: H:\work\hyMapServer\model\query.js
 * @File Name: query.js
 * @Descript: 
 */
'use strict';
var sequelize = require('./dbconnection');

function queryModel() {
    this.x = 1;
}
queryModel.prototype.spatialQuery = function(table, polygon, callback) {
    //tianjin_video_pt
    //POLYGON((117.128 39.078, 117.132 39.107,117.185 39.126,117.162 39.073,117.128 39.078))
    sequelize.query("select id, st_astext(a.geom) from " + table + "  a where  st_intersects(st_geomfromtext($polygon),a.geom)", {
        type: sequelize.QueryTypes.SELECT,
        // replacements: ['POLYGON((117.128 39.078, 117.132 39.107,117.185 39.126,117.162 39.073,117.128 39.078))']
        bind: {
            polygon: polygon
        }

    }).then(function(results, metadata) {
        // console.log(results);
        callback(results);

    }).catch(function(e) {
        console.log(e)
        callback(e);
    });
}
module.exports = queryModel;