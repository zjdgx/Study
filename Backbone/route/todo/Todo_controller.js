exports.main = function(req, res) {
	res.render('todo/index.jade', {
		title: 'TodoList'
	});
}

exports.getTodoList = function(req, res) {
	res.json({count: 1, results:[{'title':'zjdgx1', 'date':'2015-03-06 14:40:23'}]});
}