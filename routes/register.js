var express = require('express');
var router = express.Router();

/* GET register listing. */
router.get('/', function(req, res, next) {
    res.render('register', { title: '登録画面' });
});

module.exports = router;
