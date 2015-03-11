var mongo = require('../util/db_mongodb'),
	ObjectID = require('mongodb').ObjectID;

exports.main = function(req, res) {
	res.render('todo/index.jade', {
		title: 'TodoList'
	});
}

exports.getTodoList = function(req, res) {
	mongo.find('tasks', {}, {}, function(err, data) {
		res.json({count: 1, results: data});
	});
}

exports.createTodo = function(req, res) {
	var date = new Date(),
			content = req.body.content;

	mongo.insert('tasks', {createTime: date, name: content, completed: false}, null, function (err, result) {
		if (err) {
			res.json({result: -1, msg: err});
		} else {
			res.json({result: 1});
		}
	});
}

exports.removeTodo = function (req, res) {
	mongo.remove('tasks',{_id: new ObjectID(req.params.id)},{}, function (err, result) {
		if (err) {
			res.json({result: -1, msg: err});
		} else {
			res.json({result: 1});
		}
	});
}