/**
 * Build Date: 15/9/15 11:18.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['backbone','moment'], function (Backbone, moment) {
	return Backbone.Model.extend({
		defaults: {
			sex: '',
			type: '',
			school: '',
			subjects: '',
			location: ''
		},
		parse: function (values) {
			var result = {};

			result.id= values.id;
			result.sex= values.sex;
			result.name= values.name;
			result.type= values.type;
			result.phone= values.phone;
			result.school= values.school;
			result.location= values.location;
			result.subjects= values.subjects;
			result.teachNumber= values.teach_number;
			result.registerDate= moment(values.register_date).format('YYYY年M月D日');
			result.headIcon= values.headIcon || '/img/headIcon.png';

			return result;
		}
	});
});