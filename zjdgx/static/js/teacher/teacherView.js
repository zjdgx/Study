/**
 * Build Date: 15/9/15 11:08.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['jquery', 'backbone', './templates', 'paginationView', './teacherCollection'], function ($, Backbone, templates, PaginationView, TeacherCollection) {
	return Backbone.View.extend({
		el: '.page',
		template: templates.teacherViewTemplate,
		teacherItemTemplate: templates.TeacherItemTemplate,
		events: {

		},
		initialize: function () {
			this.collection = new TeacherCollection();
		},
		render: function () {
			var self = this;

			this.$el.append(this.template());

			new PaginationView({curPage: 1, totalPage: 10, pageSize: 12, selects: [12, 24, 48]}).render();

			this.collection.fetch({
				success: function () {
					self.showTeacherList();
				}
			});

			return this;
		},
		updateSearchCondition: function () {
			
		},
		showTeacherList: function () {
			var self = this,
					fragment = [];

			this.collection.each(function (model) {
				fragment.push(self.teacherItemTemplate(model.toJSON()));
			});

			this.$el.find('#teacher-list').append(fragment.join(''));
		}
	});
});