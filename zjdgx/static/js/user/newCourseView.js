/**
 * Build Date: 15/10/22 13:59.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['jquery', 'underscore', 'backbone', './courseModel', './templates', '../components/Select'], function ($, _, Backbone, CourseModel, Templates, SelectView) {
	return Backbone.View.extend({
		el: '.newCourse',
		model: new CourseModel(),
		subjectMap: {
			primary: '小学',
			junior: '初中',
			senior: '高中',
			language: '语言',
			music: '音乐',
			others: '其他'
		},
		events: {

		},
		initialize: function () {
			this.mainGradeSelect = new SelectView({className: 'gradeMainSelect'});
			this.subjectSelect = new SelectView({className: 'subjectSelect'});
			this.gradeSelect = new SelectView({className: 'gradesSelect'});
		},
		render: function () {
			var self = this;

			self.model.fetch({
				success: function () {
					self.updateGradeInfo();
				},
				error: function (err) {

				}
			});
		},
		updateGradeInfo: function () {
			var self = this,
					courses = this.model.get('courses');

			this.$el.find('div.subject').append(self.mainGradeSelect.render({
				selected: {key: -1, value: '请选择'},
				options: function () {
					var result = [{key: -1, value: '请选择'}];

					$.each(courses, function (index, value) {
						result.push({key: _.keys(value), value: self.subjectMap[_.keys(value)]});
					});

					return result;
				},
				onChange: function (key) {

				}
			}).el);

			this.$el.find('div.subject').append(self.subjectSelect.render({
				selected: {key: -1, value: '请选择'},
				options: [{key: -1, value: '请选择'}]
			}).el);

			this.$el.find('div.subject').append(self.gradeSelect.render({
				selected: {key: 0, value: '学前'},
				options: [
					{key: 0, value: '学前'},
					{key: 1, value: '一年级'},
					{key: 2, value: '二年级'},
					{key: 3, value: '三年级'},
					{key: 4, value: '四年级'},
					{key: 5, value: '五年级'},
					{key: 6, value: '六年级'},
					{key: 7, value: '初一'},
					{key: 8, value: '初二'},
					{key: 9, value: '初三'},
					{key: 10, value: '高一'},
					{key: 11, value: '高二'},
					{key: 12, value: '高三'},
					{key: 13, value: '成人'}
				]
			}).el);
		}
	});
});