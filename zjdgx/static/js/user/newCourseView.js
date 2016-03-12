/**
 * Build Date: 15/10/22 13:59.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['jquery', 'underscore', 'backbone', 'backboneModelBinder', './courseModel', './templates', '../components/Select', '../components/alertView', './addressModel', './addressView'],
	function ($, _, Backbone, ModelBinder, CourseModel, Templates, SelectView, AlertView, AddressModel, AddressView) {
		return Backbone.View.extend({
			el: '.newCourse',
			model: new CourseModel(),
			modelBinder: new ModelBinder(),
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
						new AlertView().render({
							title: '错误提示',
							msg: '获取地址信息失败, 请重试.'
						});
					}
				});

				this.getAddresses();
				this.showBMap();
			},
			getAddresses: function () {
				var self = this,
						target = this.$el.find('.location');

				new AddressView(target, 1930, 4, function (level, id) {
					new AddressView(target, id, level).render();
				}).render(function () {
					self.modelBinding();
				});
			},
			updateGradeInfo: function () {
				var self = this,
						courses = this.model.get('courses');

				this.$el.find('div.subjects').append(self.mainGradeSelect.render({
					name: 'grade',
					className: 'gradeMainSelect',
					selected: {key: -1, value: '请选择'},
					options: function () {
						var result = [{key: -1, value: '请选择'}];

						$.each(courses, function (index, value) {
							result.push({key: _.keys(value), value: _.keys(value)});
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

						self.model.set({grade: key});
					}
				}).el);

				this.$el.find('div.subjects').append(self.subjectSelect.render({
					name: 'subject',
					className: 'subjectSelect',
					selected: {key: -1, value: '请选择'},
					options: [{key: -1, value: '请选择'}],
					onChange: function (key) {
						self.model.set({subject: key});
					}
				}).el);

				this.$el.find('div.grade').append(self.gradeSelect.render({
					name: 'class',
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
					],
					onChange: function (key) {
						self.model.set({class: key});
					}
				}).el);
			},
			modelBinding: function () {
				var modelBindings = {
					grade: '[name=grade]',
					class: '[name=class]',
					subject: '[name=subject]'
				};

				this.modelBinder.bind(this.model, this.$el, modelBindings);
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