/**
 * Build Date: 15/9/15 16:08.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */
var mysql = require('../util/mySqlPool'),
		subjectMapping = {
			'11': '小学数学',
			'12': '小学语文',
			'13': '小学英语',
			'21': '初中数学',
			'22': '初中语文',
			'23': '初中物理',
			'24': '初中化学',
			'25': '初中英语',
			'31': '高中数学',
			'32': '高中语文',
			'33': '高中物理',
			'34': '高中化学',
			'35': '高中英语',
			'36': '高中生物',
			'37': '高中地理'
		};

exports.main = function (req, res) {
	res.render('teacher/select', {});
};

exports.teacherList = function (req, res) {
	mysql.mySqlQuery(
		'SELECT * FROM teacher',
		{},
		function (result) {
			result.forEach(function (model) {
				model.subjects = subjectsTranslate(model.subjects);
			});

			res.send(result);
		}
	);
};

function subjectsTranslate(subject) {
	var result = [],
			subjects = subject.split(',');

	subjects.forEach(function (value) {
		result.push(subjectMapping[value]);
	});

	return result;
}