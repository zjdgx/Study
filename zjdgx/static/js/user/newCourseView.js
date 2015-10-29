/**
 * Build Date: 15/10/22 13:59.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['jquery', 'underscore', 'backbone', './courseModel', './templates', '../components/Select', './addressModel', './addressView'],
	function ($, _, Backbone, CourseModel, Templates, SelectView, AddressModel, AddressView) {
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
			events: {},
			initialize: function () {
				this.mainGradeSelect = new SelectView();
				this.subjectSelect = new SelectView();
				this.gradeSelect = new SelectView();
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

				this.getAddresses();
				this.showBMap();
			},
			getAddresses: function () {
				var target = this.$el.find('.location');

				new AddressView(target, 1930, 4, function (level, id) {
					new AddressView(target, id, level).render();
				}).render();
			},
			updateGradeInfo: function () {
				var self = this,
						courses = this.model.get('courses');

				this.$el.find('div.subjects').append(self.mainGradeSelect.render({
					className: 'gradeMainSelect',
					selected: {key: -1, value: '请选择'},
					options: function () {
						var result = [{key: -1, value: '请选择'}];

						$.each(courses, function (index, value) {
							result.push({key: _.keys(value), value: self.subjectMap[_.keys(value)]});
						});

						return result;
					},
					allOptions: courses,
					subSelectView: self.subjectSelect,
					onChange: function (key) {
						if (this.subSelectView) {
							this.subSelectView.updateOptions(
								{key: -1, value: '请选择'},
								self.getOptionValues(_.find(this.allOptions, function (option, index) {
									return Object.keys(option)[0] == key;
								}))
							);
						}
					}
				}).el);

				this.$el.find('div.subjects').append(self.subjectSelect.render({
					className: 'subjectSelect',
					selected: {key: -1, value: '请选择'},
					options: [{key: -1, value: '请选择'}]
				}).el);

				this.$el.find('div.grade').append(self.gradeSelect.render({
					className: 'gradesSelect',
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
			},
			getOptionValues: function (values) {
				var result = [{key: -1, value: '请选择'}];

				$.each(_.values(values)[0], function (index, value) {
					result.push({key: _.keys(value)[0], value: _.values(value)[0]});
				});

				return result;
			},
			showBMap: function () {
				var map = new BMap.Map('baiduMap');

				map.centerAndZoom('成都', 15);
				map.addEventListener('click', function (e) {
					var markers = map.getOverlays();

					$.each(markers, function (i, marker) {
						map.removeOverlay(marker);
					});

					map.addOverlay(new BMap.Marker(e.point));
				});

			},
			addAddressSelectView: function (key) {

			}
		});
	});