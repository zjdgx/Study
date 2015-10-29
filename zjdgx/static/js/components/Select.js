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
			$('body').on('click', {this: this}, this.hideSelectView);
		},
		render: function (options) {
			if (!options) {
				new AlertView().render('Please parse options for select.');
			} else {
				options.onChange && (this.onChange = options.onChange);
				options.subSelectView && (this.subSelectView = options.subSelectView);
				options.allOptions && (this.allOptions = options.allOptions);
				this.$el.addClass(options.className || '').append(this.template(options));
			}

			return this;
		},
		toggleOpen: function () {
			this.$el.find('ul').toggleClass('open');

			return false;
		},
		select: function (e) {
			var target = $(e.currentTarget);

			this.$el.find('label.selected').attr({
				key: target.attr('key'),
				val: target.attr('val')
			}).find('span').html(target.attr('val'));
			this.$el.find('ul').removeClass('open');
			this.onChange && this.onChange(target.attr('key'));
		},
		updateOptions: function (selected, options) {
			var html = [];

			$.each(options, function (i, v) {
				html.push('<li key="'+v.key+'" val="'+v.value+'">' + v.value+'</li>');
			});

			this.$el.find('label.selected').attr({
				key: selected.key,
				val: selected.value
			}).find('span').html(selected.value);
			this.$el.find('ul').html(html.join(''));

			this.delegateEvents();
		},
		hideSelectView: function (e) {
			var target = $(e.target);

			if (target.parents('.zjdgx-select') != e.data.this.$el) {
				e.data.this.$el.find('ul').removeClass('open');
			}
		}
	});
});