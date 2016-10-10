/**
 * Service for issue_statistics
 *
 * @author <a href="mailto:xingxiaoguang@nhn.com">Scott</a>
 * @version 1.0 2013-12-3 13:16:25
 * @since nCrazer 0.1
 */

var _ = require("underscore"),
		async = require("async"),
		colors = ['blue', 'purple', 'aqua', 'yellow', 'red', 'green', 'black'],
		country_name = require("./util/country_name"),
		db = require("./util/dbtool"),
		initShowNumberForBar = 10,
		moment = require("moment"),
		service = module.exports = {},
		util = require("./util/util.js");

/**
 * get trends of UniqueUsers
 * @param projName
 * @param form
 * @param cb
 */
service.getUniqueUsers = function (projName, form, cb) {
	var maxNum = parseInt(form.choseninthelast),
			startMill = null,
			interval = 24 * 3600 * 1000,
			rawData = {},
			versions_data = {},
			t_mills = null,
			versions = form.chosenappversion || [],
			versions_clone = _.clone(versions),
			selects = null;

	rawData.data = {};
	rawData.interval = interval;

	async.parallel([
		function (cb) {
			db.getUniqueUsers(projName, form, function (err, docs) {
				if (!err) {
					startMill = form.startDate.getTime();
					versions_clone.push('All');

					for (var v = 0; v < versions_clone.length; v++) {
						versions_data[versions_clone[v]] = [];

						for (var i = 0; i < maxNum; i++) {
							versions_data[versions_clone[v]][i] = [startMill + i * interval, 0];
						}
					}

					docs && docs.forEach(function (ele) {
						t_mills = new Date(ele._id.datetime).getTime();

						var seq = (t_mills - startMill) / interval,
								version = ele._id.version;

						if (seq < maxNum) {
							if (!versions_data[version]) {
								versions_data[version] = [];

								for (var i = 0; i < maxNum; i++) {
									versions_data[version][i] = [startMill + i * interval, 0];
								}
							}

							versions_data[version][seq] = [t_mills, ele.occurrence];
						}
					});

					rawData.data['versions'] = versions_data;
				}

				cb(err);
			});
		},
		function (cb) {
			db.getVersionArray(projName, form, function (err, docs) {
				if (!err) {
					selects = docs;
				}

				cb(err);
			});
		}
	], function (err) {
		cb(err, {data: rawData, selects: selects});
	});
};

/**
 * get trends of Correlate
 * @param projName
 * @param form
 * @param cb
 */
service.getCorrelate = function (projName, form, cb) {
	var maxNum = parseInt(form.choseninthelast),
			t_chosenappversion,
			interval = 24 * 3600 * 1000,
			rawData = {data:{}},
			newData = [],
			selects,
			crashes_data = [],
			versions_data = {},
			t_mills,
			_form = _.clone(form),
			startMill = null;

	if (form.chosenappversion) {
		t_chosenappversion = form.chosenappversion;
		delete form.chosenappversion;
	}

	async.parallel([
		function (cb) {
			db.getCorrelate(projName, form, function (err, docs) {
				if (!err) {
					//array init
					for (var i = 0; i < maxNum; i++) {
						newData[i] = [startMill + i * interval, 0];
					}

					startMill = form.startDate.getTime();
					rawData.interval = interval;

					for (var i = 0; i < maxNum; i++) {
						crashes_data[i] = [startMill + i * interval, 0];
					}

					docs && docs.forEach(function (ele) {
						t_mills = new Date(ele._id).getTime();

						var seq = (t_mills - startMill) / interval;

						if (seq < maxNum) {
							crashes_data[seq] = [t_mills, ele.occurrence];
						}
					});

					rawData.data['occurrence'] = crashes_data;
				}

				cb(err);
			});
		},
		function (cb) {
			if (t_chosenappversion) {
				_form.chosenappversion = t_chosenappversion;

				db.getCorrelate(projName, _form, function (err, docs) {
					if (!err) {
						var seq,
								version;

						startMill = form.startDate.getTime();

						docs && docs.forEach(function (ele) {
							t_mills = new Date(ele._id.datetime).getTime();
							seq = (t_mills - startMill) / interval;
							version = ele._id.version;

							if (seq < maxNum) {
								if (!versions_data[version]) {
									versions_data[version] = [];

									for (var i = 0; i < maxNum; i++) {
										versions_data[version][i] = [startMill + i * interval, 0];
									}
								}

								versions_data[version][seq] = [t_mills, ele.occurrence];
							}
						});
						rawData.data['versions'] = versions_data;
					}

					cb(err);
				});
			} else {
				cb(null);
			}
		},
		function (cb) {
			db.getVersionArray(projName, form, function (err, docs) {
				if (!err) {
					selects = docs;
				}

				cb(err);
			});
		}
	], function (err) {
		cb(err, {data: rawData, selects: selects});
	});
};

/**
 * get trends of ActiveUsers
 * @param projName
 * @param form
 * @param cb
 */
service.getActiveUsers = function (projName, form, cb) {
	form.choseninthelast = 30;

	db.getTrends(projName, form, function (err, docs) {
		cb(err, {data: docs});
	});
};

/**
 * get trends of Sessions
 * @param projName
 * @param form
 * @param cb
 */
service.getSessions = function (projName, form, cb) {
	db.getTrends(projName, form, function (err, docs) {
		cb(err, {data: docs});
	});
};

/**
 * get trends of AppVersions
 * @param projName
 * @param form
 * @param cb
 */
service.getAppVersions = function (projName, form, cb) {
	var chosenappversion = form.chosenappversion,
			rawData = {},
			selected = null,
			selects = null;

	delete form.chosenappversion; //we query all versions to get total number and also avoid second query.

	async.parallel([
		function (cb) {
			db.getAppVersions(projName, form, function (err, docs) {
				var total = getTotal(docs, 'occurrence'),
						newDoc = [];

				for (j in docs) {
					var value = docs[j]['occurrence'];
					docs[j] = ({key: docs[j]['_id'], percent: (value / total * 100).toFixed(1), value: util.numberFormat(value), color: colors[j % (colors.length)]});
				}

				//if user already select some version we need do filtering here.
				if (!form.init && chosenappversion) {
					for (var i in docs) {
						if (_.indexOf(chosenappversion, docs[i].key) >= 0) {
							newDoc.push(docs[i]);
						}
					}
				} else {
					newDoc = docs;
				}

				docs = newDoc;

				docs = _.sortBy(docs, function (num) {
					return -num.value;
				});

				if (chosenappversion) {
					var zeroItem = _.difference(chosenappversion, _.pluck(docs, 'key'));

					_.each(zeroItem, function (i) {
						docs.push({key: i, percent: 0.0, value: 0, color: 'gray'});
					})
				}

				selected = _.pluck(docs, 'key');

				if (form.init || !chosenappversion) {
					selected = _.first(selected, initShowNumberForBar);
					docs = _.first(docs, initShowNumberForBar);
				}

				rawData = docs;
				cb(err);
			});
		},
		function (cb) {
			db.getVersionArray(projName, form, function (err, docs) {
				if (!err) {
					selects = docs;
				}

				cb(err);
			});
		}
	], function (err) {
		cb(err, {data: rawData, selects: selects, selected: selected});
	});
};

/**
 * get trends of OSVersions
 * @param projName
 * @param form
 * @param cb
 */
service.getOSVersions = function (projName, form, cb) {
	var rawData = {},
			selected = null,
			selects = null;

	async.parallel([
		function (cb) {
			db.getOSVersions(projName, form, function (err, docs) {
				var item = 'os_version',
						i = 0,
						total = getTotal(docs[item], null),
						result;

				for (var j in docs[item]) {
					percentFormat(docs, item, j, total, colors[i++ % (colors.length)]);
				}

				docs[item] = _.sortBy(docs[item + '_arr'], function (num) {
					return -num.percent;
				});

				delete docs[item + '_arr'];
				result = docs[item];

				if (form.chosenosversion) {
					var temp = [];

					for (var i in result) {
						if (_.indexOf(form.chosenosversion, result[i].key) > -1) {
							temp.push(result[i]);
						}
					}

					result = temp;
				}

				if (form.init || !form.chosenosversion) {
					result = _.first(result, initShowNumberForBar);
					selected = _.pluck(result, 'key');
				}

				rawData = result;
				cb(err);
			});
		},
		function (cb) {
			db.getOSVersionArray(projName, form, function (err, docs) {
				if (!err) {
					selects = docs;
				}

				cb(err);
			});
		}
	], function (err) {
		cb(err, {data: rawData, selects: selects, selected: selected});
	});
};

/**
 * get trends of Devices
 * @param projName
 * @param form
 * @param cb
 */
service.getDevices = function (projName, form, cb) {
	var rawData = {},
			selected = null,
			selects = null;

	async.parallel([
		function (cb) {
			db.getDevices(projName, form, function (err, docs) {
				var item = 'hardware_model',
						i = 0,
						total = getTotal(docs[item], null),
						result;

				for (var j in docs[item]) {
					percentFormat(docs, item, j, total, colors[i++ % (colors.length)]);
				}

				docs[item] = _.sortBy(docs[item + '_arr'], function (num) {
					return -num.ovalue;
				});

				delete docs[item + '_arr'];

				result = docs[item];

				if (form.chosendevices) {
					var temp = [];

					for (var i in result) {
						if (_.indexOf(form.chosendevices, result[i].key) > -1) {
							temp.push(result[i]);
						}
					}

					result = temp;
				}

				if (form.init|| !form.chosendevices) {
					result = _.first(result, initShowNumberForBar);
					selected = _.pluck(result, 'key');
				}

				rawData = result;
				cb(err);
			});
		},
		function (cb) {
			db.getDeviceArray(projName, form, function (err, docs) {
				if (!err) {
					selects = docs;
				}

				cb(err);
			});
		}
	], function (err) {
		cb(err, {data: rawData, selects: selects, selected: selected});
	});
};

/**
 * get trends of Countries
 * @param projName
 * @param form
 * @param cb
 */
service.getCountries = function (projName, form, cb) {
	var rawData = {},
			selected = null,
			selects = null;

	async.parallel([
		function (cb) {
			db.getCountries(projName, form, function (err, docs) {
				if (err) {
					cb(err);
				} else {
					var item = 'countries',
						i = 0,
						result = null,
						total = getTotal(docs[item], null);

					for (var j in docs[item]) {
						percentFormat(docs, item, j, total, colors[i++ % (colors.length)]);
					}

					docs[item] = _.sortBy(docs[item + '_arr'], function (num) {
						return -num.percent;
					});

					delete docs[item + '_arr'];
					result = docs[item];

					if (form.chosencountry) {
						var temp = [];

						for (var i in result) {
							if (_.indexOf(form.chosencountry, result[i].key) > -1) {
								temp.push(result[i]);
							}
						}

						result = temp;
					}

					if (form.init || !form.chosencountry) {
						result = _.first(result, initShowNumberForBar);
						selected = _.pluck(result, 'key');
					}

					_.map(result, function (item) {
						item.key = country_name.get_country_name(item.key);

						return item;
					});

					rawData = result;

					cb(err);
				}
			});
		},
		function (cb) {
			db.getCountryArray(projName, form, function (err, docs) {
				if (!err) {
					selects = docs;
				}

				cb(err);
			});
		}
	], function (err) {
		cb(err, {data: rawData, selects: selects, selected: selected});
	});
};

/**
 * get trends of TrendingErrors
 * @param projName
 * @param form
 * @param cb
 */
service.getTrendingErrors = function (projName, form, cb) {
	var selects = null,
			rawData = null;

	async.parallel([
		function (cb) {
			db.getTrendingErrors(projName, form, function (err, docs) {
				if (!err) {
					var total = getTotal(docs, 'occurrence');

					for (j in docs) {
						var value = docs[j]['occurrence'];
						docs[j] = ({key: docs[j]['_id']['exception_type'], percent: (value / total * 100).toFixed(1), value: util.numberFormat(value), crashed_location: docs[j]['_id']['crashed_location'], color: colors[j % (colors.length)]});
					}

					docs = _.sortBy(docs, function (num) {
						return -num.value;
					});

					rawData = _.first(docs, 10);
				}

				cb(err);
			});
		},
		function (cb) {
			db.getVersionArray(projName, form, function (err, docs) {
				if (!err) {
					selects = docs;
				}

				cb(err);
			});
		}
	], function (err) {
		cb(err, {data: rawData, selects: selects});
	});
};

/**
 * get trends of UniqueUsers
 * @param projName
 * @param form
 * @param cb
 */
service.getTopErrors = function (projName, form, cb) {
	var selects = null,
			rawData = null;

	async.parallel([
		function (cb) {
			db.getTopErrors(projName, form, function (err, docs) {
				if (!err) {
					var total = getTotal(docs, 'occurrence');

					for (j in docs) {
						var value = docs[j]['occurrence'];
						docs[j] = ({key: docs[j]['_id']['exception_type'], percent: (value / total * 100).toFixed(1), value: util.numberFormat(value), crashed_location: docs[j]['_id']['crashed_location'], color: colors[j % (colors.length)]});
					}

					docs = _.sortBy(docs, function (num) {
						return -num.value;
					});

					rawData = _.first(docs, 10);
				}

				cb(err);
			});
		},
		function (cb) {
			db.getVersionArray(projName, form, function (err, docs) {
				if (!err) {
					selects = docs;
				}

				cb(err);
			});
		}
	], function (err) {
		cb(err, {data: rawData, selects: selects});
	});
};

/**
 * get trends of BreakdownByAppVersions
 * @param projName
 * @param form
 * @param cb
 */
service.getBreakdownByAppVersions = function (projName, form, cb) {
	var maxNum = parseInt(form.choseninthelast),
			chosenappversion = form.chosenappversion,
			rawData = {},
			selected = null,
			_selects = null,
			selects = null;

	delete form.chosenappversion; //we query all versions to get total number and also avoid second query.
	async.parallel([
		function (cb) {
			db.getBreakdownByAppVersions(projName, form, function (err, docs) {
				var startMill = form.startDate.getTime(),
						interval = 24 * 3600 * 1000,
						newData = [],
						temp = {},
						t_mills,
						t_version,
						zeroItem = [];

				//array init
				for (var i = 0; i < maxNum; i++) {
					newData[i] = [startMill + i * interval, 0];
				}

				rawData.data = [];
				rawData.interval = interval;
				temp['Total'] = [];

				//init the total array
				for (var i = 0; i < maxNum; i++) {
					temp['Total'][i] = [startMill + i * interval, 0];
				}

				docs && docs.forEach(function (ele) {
					t_mills = new Date(ele._id.datetime).getTime();
					t_version = ele._id.version;

					var seq = (t_mills - startMill) / interval;

					if (temp['Total'][seq]) {
						temp['Total'][seq][1] += ele.occurrence;

						if (seq < maxNum) {
							if (!temp[t_version]) {
								temp[t_version] = [];

								for (var i = 0; i < maxNum; i++) {
									temp[t_version][i] = [startMill + i * interval, 0];
								}
							}

							temp[t_version][seq] = [t_mills, ele.occurrence];
						}
					}
				});

				//if user already select some version we need do filtering here.
				for (var i in temp) {
					if (i == 'Total' || (!chosenappversion && form.init) || (chosenappversion && _.indexOf(chosenappversion, i) > -1)) {
						rawData.data.push({name: i, data: temp[i]});
					}
				}

				if (chosenappversion) {
					zeroItem = _.difference(chosenappversion, _.pluck(rawData.data, 'name'));
				}

				//init the total array
				_.each(zeroItem, function (j) {

					var zero = [];

					for (var i = 0; i < maxNum; i++) {
						zero[i] = [startMill + i * interval, 0];
					}

					rawData.data.push({name: j, data: zero});
				})


				rawData.data = _.sortBy(rawData.data, function (e) {
					var sum = 0;

					for (var i in e.data) {
						sum += e['data'][i][1];
					}

					return -sum;
				});

				_selects = _.without(_.pluck(rawData.data, 'name'), 'Total');
				selected = _selects;

				if (form.init || !chosenappversion) {
					selected = _.first(_selects, 5);
					rawData.data = _.first(rawData.data, 5 + 1);
				}

				cb(err);
			});
		},
		function (cb) {
			db.getVersionArray(projName, form, function (err, docs) {
				if (!err) {
					selects = docs;
				}

				cb(err);
			});
		}
	], function (err) {
		cb(err, {data: rawData, selects: selects, selected: selected});
	});
};

/**
 * get trends of BreakdownByOSVersions
 * @param projName
 * @param form
 * @param cb
 */
service.getBreakdownByOSVersions = function (projName, form, cb) {
	var maxNum = parseInt(form.choseninthelast),
			rawData = {},
			selected = null,
			selects = null;

	async.parallel([
		function (cb) {
			db.getBreakdownByOSVersions(projName, form, function (err, docs) {
				var startMill = form.startDate.getTime(),
						interval = 24 * 3600 * 1000,
						newData = [],
						temp = {},
						t_mills,
						t_version;

				//array init
				for (var i = 0; i < maxNum; i++) {
					newData[i] = [startMill + i * interval, 0];
				}

				rawData.data = [];
				rawData.interval = interval;
				temp['Total'] = [];

				//init the total array
				for (var i = 0; i < maxNum; i++) {
					temp['Total'][i] = [startMill + i * interval, 0];
				}

				docs && docs.forEach(function (ele) {
					t_mills = new Date(ele._id).getTime();

					var seq = (t_mills - startMill) / interval;

					if (seq < maxNum) {
						t_version = ele.value.os_version;
						temp['Total'][seq] = [t_mills, ele.value.occurrence];

						for (var o in t_version) {
							var v = util.dotEscape(o);

							if (!temp[v]) {
								temp[v] = [];

								for (var i = 0; i < maxNum; i++) {
									temp[v][i] = [startMill + i * interval, 0];
								}
							}

							temp[v][seq] = [t_mills, ele.value.os_version[o]];
						}
					}
				});

				var versions = []; //for combo-box
				//if user already select some version we need do filtering here.
				for (var i in temp) {
					versions.push(i);

					if (i == 'Total' || (!form.chosenosversion && form.init) || (form.chosenosversion && _.indexOf(form.chosenosversion, i) > -1)) {
						rawData.data.push({name: i, data: temp[i]});
					}
				}
				rawData.data = _.sortBy(rawData.data, function (e) {
					var sum = 0;

					for (var i in e.data) {
						sum += e['data'][i][1];
					}

					return -sum;
				});

				if (form.init || !form.chosenosversion) {
					selected = _.first(_.without(_.pluck(rawData.data, 'name'), 'Total'), 5);
					rawData.data = _.first(rawData.data, 5 + 1);
				}

				cb(err);
			});
		},
		function (cb) {
			db.getOSVersionArray(projName, form, function (err, docs) {
				if (!err) {
					selects = docs;
				}

				cb(err);
			});
		}
	], function (err) {
		cb(err, {data: rawData, selects: selects, selected: selected});
	});
};

/**
 * get trends of BreakdownByDevices
 * @param projName
 * @param form
 * @param cb
 */
service.getBreakdownByDevices = function (projName, form, cb) {
	var maxNum = parseInt(form.choseninthelast),
			rawData = {},
			selected = null,
			selects = null;

	async.parallel([
		function (cb) {
			db.getBreakdownByDevices(projName, form, function (err, docs) {
				var startMill = form.startDate.getTime(),
						interval = 24 * 3600 * 1000,
						newData = [],
						temp = {Total:[]},
						t_mills,
						t_version,
						seq;

				//array init
				for (var i = 0; i < maxNum; i++) {
					newData[i] = [startMill + i * interval, 0];
				}

				rawData.data = [];
				rawData.interval = interval;

				//init the total array
				for (var i = 0; i < maxNum; i++) {
					temp['Total'][i] = [startMill + i * interval, 0];
				}

				docs && docs.forEach(function (ele) {
					t_mills = new Date(ele._id).getTime();
					seq = (t_mills - startMill) / interval;

					if (seq < maxNum) {
						t_version = ele.value.hardware_model;
						temp['Total'][seq] = [t_mills, ele.value.occurrence];

						for (var o in t_version) {
							var v = util.dotEscape(o);

							if (!temp[v]) {
								temp[v] = [];

								for (var i = 0; i < maxNum; i++) {
									temp[v][i] = [startMill + i * interval, 0];
								}
							}

							temp[v][seq] = [t_mills, ele.value.hardware_model[o]];
						}
					}
				});

				//for combo-box, if user already select some version we need do filtering here.
				var versions = [];

				for (var i in temp) {
					versions.push(i);

					if (i == 'Total' || (!form.chosendevices && form.init) || (form.chosendevices && _.indexOf(form.chosendevices, i) > -1)) {
						rawData.data.push({name: i, data: temp[i]});
					}
				}
				rawData.data = _.sortBy(rawData.data, function (e) {
					var sum = 0;

					for (var i in e.data) {
						sum += e['data'][i][1];
					}

					return -sum;
				});

				//default selected versions.

				if (form.init || !form.chosendevices) {
					selected = _.first(_.without(_.pluck(rawData.data, 'name'), 'Total'), 5);
					rawData.data = _.first(rawData.data, 5 + 1);
				}

				cb(err);
			});
		},
		function (cb) {
			db.getDeviceArray(projName, form, function (err, docs) {
				if (!err) {
					selects = docs;
				}

				cb(err);
			});
		}
	], function (err) {
		cb(err, {data: rawData, selects: selects, selected: selected});
	});
};

/**
 * get trends of getBreakdownByCountries
 * @param projName
 * @param form
 * @param cb
 */
service.getBreakdownByCountries = function (projName, form, cb) {
	var maxNum = parseInt(form.choseninthelast),
			rawData = {},
			selected = null,
			selects = null;

	async.parallel([
		function (cb) {
			db.getBreakdownByCountries(projName, form, function (err, docs) {
				var startMill = form.startDate.getTime(),
						interval = 24 * 3600 * 1000,
						newData = [],
						temp = {},
						t_mills,
						t_version,
						seq,
						versions = [];

				//array init
				for (var i = 0; i < maxNum; i++) {
					newData[i] = [startMill + i * interval, 0];
				}

				rawData.data = [];
				rawData.interval = interval;
				temp['Total'] = [];

				//init the total array
				for (var i = 0; i < maxNum; i++) {
					temp['Total'][i] = [startMill + i * interval, 0];
				}

				docs && docs.forEach(function (ele) {
					t_mills = new Date(ele._id).getTime();
					seq = (t_mills - startMill) / interval;

					if (seq < maxNum) {
						t_version = ele.value.countries;
						temp['Total'][seq] = [t_mills, ele.value.occurrence];

						for (var o in t_version) {
							var v = util.dotEscape(o);

							if (!temp[v]) {
								temp[v] = [];

								for (var i = 0; i < maxNum; i++) {
									temp[v][i] = [startMill + i * interval, 0];
								}
							}

							temp[v][seq] = [t_mills, ele.value.countries[o]];
						}
					}
				});

				//if user already select some version we need do filtering here.
				for (var i in temp) {
					versions.push(i);

					if (i == 'Total' || (!form.chosencountry && form.init) || (form.chosencountry && _.indexOf(form.chosencountry, i) > -1)) {
						rawData.data.push({name: i, data: temp[i]});
					}
				}

				rawData.data = _.sortBy(rawData.data, function (e) {
					var sum = 0;

					for (var i in e.data) {
						sum += e['data'][i][1];
					}

					return -sum;
				});

				if (form.init || !form.chosencountry) {
					selected = _.first(_.without(_.pluck(rawData.data, 'name'), 'Total'), 5);
					rawData.data = _.first(rawData.data, 5 + 1);
				}

				_.map(rawData.data, function (item) {
					item.name = country_name.get_country_name(item.name);

					return item;
				});

				cb(err);
			});
		},
		function (cb) {
			db.getCountryArray(projName, form, function (err, docs) {
				if (!err) {
					selects = docs;
				}

				cb(err);
			});
		}
	], function (err) {
		cb(err, {data: rawData, selects: selects, selected: selected});
	});
};

/*util tool to sum the value*/
function getTotal(arr, field) {
	var total = 0;

	for (var j in arr) {
		total += field ? arr[j][field] : (isNaN(arr[j]) ? 0 : arr[j]);
	}

	return total;
};

/*percent format*/
function percentFormat(src, p1, p2, total, color) {
	var value;

	!src[p1 + '_arr'] ? (src[p1 + '_arr'] = []) : '';
	value = src[p1][p2];

	if (!isNaN(value)) {
		src[p1 + '_arr'].push({key: util.dotEscape(p2), percent: (value / total * 100).toFixed(1), value: util.numberFormat(value), ovalue: value, color: color});
	}
};

