
/*
 * GET home page.
 */

exports.index = function(req, res){
	console.log('routes: index file get in.');
    res.render('index', { title: 'Express' });
};