/**
 * Build Date: 15/10/22 13:35.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['jquery', 'backbone', './alertView', './templates'], function ($, Backbone, AlertView, Template) {
	return Backbone.View.extend({
		className: 'zjdgx-select',
		template: Template.SelectTemplate,
		events: {
			'click label.selected': 'toggleOpen',
			'click li': 'select'
		},
		initialize: function (options) {
			this.$el.addClass(options.className || '');
		},
		render: function (options) {
			if (!options) {
				new AlertView().render('Please parse options for select.');
			} else {
				options.onChange && (this.onChange = options.onChange);
				this.$el.append(this.template(options));
			}

			return this;
		},
		toggleOpen: function () {
			this.$el.find('ul').toggleClass('open');
		},
		select: function (e) {
			var target = $(e.currentTarget);

			this.$el.find('label.selected').attr({
				key: target.attr('key'),
				val: target.attr('val')
			}).find('span').html(target.attr('val'));
			this.$el.find('ul').removeClass('open');
		},
		updateOptions: function (options) {
			var html = [];

			$.each(options, function (option) {
				html.push('<li key="'+option.key+'" val="'+option.value+'">' + option.value+'</li>');
			});

			this.$el.find('ul').html(html.join(''));

			this.delegateEvents();
		}
	});
});