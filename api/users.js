var express = require('express');
var router = express.Router();
var users = require('../model/users').users;
var user = require('../model/users.js');



/* GET users listing. */
router.get('/', function(req, res, next) {

    user.findOne().then(function(user) {
        console.log(user);
        res.send(user.dataValues);
        res.send('respond with a resource get: id==' + req.query.id + "result" + user.get('firstName'));
    });

    res.send(users[req.query.id]);
});
router.post('/', function(req, res, next) {
    console.log(req.url);
    console.log('id: ' + req.body.id);
    const id = req.body.id;
    console.log(typeof id)
    console.log(users[id.toString])
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.send(users[id]);
});

router.route('/:id').get(function(req, res) {
    console.log('id:' + req.param('id'));
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.send(users[req.param('id')]);
})
module.exports = router;