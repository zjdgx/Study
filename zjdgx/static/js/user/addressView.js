/**
 * Build Date: 15/10/29 8:27.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['jquery', 'backbone', './addressModel', '../components/Select'], function ($, Backbone, AddressModel, SelectView) {
	return Backbone.View.extend({
		model: new AddressModel(),
		initialize: function (target, id, level, onChange) {
			this.target = target;
			onChange && (this.onChange = onChange);
			this.model.set({id: id, level: level});
		},
		render: function () {
			var self = this,
					level = self.model.get('level'),
					className = self.getAddressSelectClass(level);

			this.model.fetch({
				data: {id: this.model.get('id')},
				success: function () {
					if (self.model.get(className).length) {
						self.target.append(new SelectView().render({
							className: className,
							selected: {key: -1, value: '请选择'},
							options: function () {
								var result = [];

								$.each(self.model.get(className), function (i, v) {
									result.push({key: v.cityId, value: v.name});
								});

								return result;
							},
							onChange: function (key) {
								var element = self.getAddressSelectClass(level + 1),
										addressElement = element.length > 0 ? self.target.find('.' + element) : '';

								if (addressElement.length) {
									addressElement.remove();
								}

								self.onChange && self.onChange(level + 1, key);
							}
						}).el);
					}
				}
			});
		},
		getAddressSelectClass: function (level) {
			var className = '';

			if (level == 4) {
				className = 'county';
			} else if (level == 5) {
				className = 'town';
			}

			return className;
		}
	});
});