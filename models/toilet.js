// Modelでもmongooseを読み込みます
var mongoose = require('mongoose');

// MongoDBに接続
var mURI = process.env.MONGOLAB_URI || 'mongodb://localhost/toilet';
console.log(mURI);
mongoose.connect(mURI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'mongo 接続エラー ctrl + c:'));

// 接続イベントを利用してログ出力
mongoose.connection.on('connected', function () {
    console.log('mongoose URI locates ' + mURI);
});

// スキーマの定義とToiletモデルの作成
var ToiletSchema = new mongoose.Schema({
    name : String,
    station : String,
    description: String,
    seatCount: Number
});

exports.Toilet= mongoose.model('Toilet', ToiletSchema);
