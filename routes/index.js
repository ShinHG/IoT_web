var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({
	host:'localhost',
	user:'root',
	password:'1234',
	database:'test'
});


/* GET home page. */
router.get('/', function(req, res, next) {
	var test;
	var ledStatus;
	pool.getConnection(function(error,con) {
		if(error) throw error;
		con.query('select ledOn from test;', function(err,rows){
			if(err) throw err;
			test = rows[0].ledOn;
			console.log(test);
			con.release();
			if (test == 1) ledStatus = 'on';
			else ledStatus = 'off';
  		res.render('index', { test: ledStatus });
		});

	});
});

router.post('/on', function(req, res) {
	pool.getConnection(function(error, con){
		if(error) throw error;

		con.query('update test set ledOn = ? where idx=1',1, function(err, rows){
			if(err) throw err;

			con.release();
		});
  });

	return res.redirect('/');
});


router.post('/off', function(req, res) {
	pool.getConnection(function(error, con){
		if(error) throw error;

		con.query('update test set ledOn = ? where idx=1',0, function(err, rows){
			if(err) throw err;

			con.release();
		});
  });

	return res.redirect('/');
});


module.exports = router;
