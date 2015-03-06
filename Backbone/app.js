var http = require('http'),
	path = require('path');
	express = require('express');
	route = require('./route/todo/Todo_controller');
	app = express();
	
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', route.main);
app.get('/todoList', route.getTodoList);

app.listen(8000, function(){
	console.log('Todo start on port 8000...');
});