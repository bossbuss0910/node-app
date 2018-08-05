var express = require('express');
var router = express.Router();
var Toilet = require('../models/toilet').Toilet;

// 一覧画面処理
router.get('/', function(req, res) {
    // var toilets = Toilet.find();
    Toilet.find(function(err, toilets) {
        if (err)
            res.send(err);
        res.render('toilets', { title: '一覧画面', toilets: toilets});
    });
});

//検索処理
router.get('/search/', function(req, res) {
    var query = req.query.name;
    Toilet.find({name: new RegExp(".*"+query+".*")},function(err, toilets) {
        if (err) {
            console.error(err);
        }
        res.render('toilets', { title: '検索結果', toilets: toilets});
    });
});

//詳細画面処理
router.get('/:id/', function(req, res) {
    Toilet.findById(req.params.id, function(err, toilet) {
        if (err) {
            console.error(err);
            res.redirect('/toilets');
        }
        res.render('detail', { title: '詳細画面', toilet: toilet});
    });
});

// 登録処理
router.post('/', function(req, res) {
    var toilet = new Toilet();
    toilet.name = req.body.name;
    toilet.station = req.body.station;
    toilet.description = req.body.description;
    toilet.seatCount = req.body.seatCount;
    toilet.save(function(err) {
        if (err) { console.log(err); }
    });
    res.redirect('/toilets/'+ toilet._id);
});

module.exports = router;
