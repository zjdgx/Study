/*
 * stat_controller.js
 * copyright NHN China Co.,LTD
 */

/**
 * Controller for issue_statistics
 * @author <a href="mailto:xingxiaoguang@nhn.com">Scott</a>
 * @version 1.0 13-12-03
 * @since nCrazer 0.1
 */
var _ = require("underscore"),
		async = require("async"),
		issueService = require("./issues_service"),
		moment = require("moment"),
		service = require("./stat_service");

/**
 * render the main page of statistic
 * @param req
 * @param res
 */
exports.main = function (req, res) {
	res.render("ncrazer/stat/main",
		{
			title: "NELO2-Crash Statistics",
			layout: false,
			menus: req.session.menus,
			project_id: req.params.project_id,
			username: req.session.user.name,
			timezoneOffset: (new Date()).getTimezoneOffset()
		});
}

/**
 * get statistic data from db
 * @param req
 * @param res
 */
exports.getStat = function (req, res) {
	var rawData = {},
			form = req.query;

	rawData.platform = req.params.platform;
	rawData.startDate = form.startDate ? moment(form.startDate, "YYYY/MM/DD").toDate() : moment().subtract(30, 'days').startOf('day').toDate();
	rawData.endDate = form.endDate ? moment(form.endDate, "YYYY/MM/DD").endOf('day').toDate() : moment().endOf('day').toDate();
	rawData.versions = form.chosenappversion ? form.chosenappversion : [];
	rawData.osversions = form.chosenosversion ? form.chosenosversion : [];
	rawData.countrys = form.chosencountry ? form.chosencountry : [];
	rawData.data = [];

	service.getStat(req.params.project_id, rawData, function (err, docs) {
		rawData.data = docs;
		res.json({rawData: docs});
	});
};

/**
 * get Default Filter
 * @param req
 * @param res
 */
exports.getDefaultFilter = function (req, res) {
	var form = req.query,
			rawData = {},
			projName = req.params.project_id;

	form.platform = req.params.platform;
	rawData.startDate = rawData.minDate = moment().subtract(29, 'days').format('YYYY/MM/DD');
	rawData.endDate = rawData.maxDate = moment().format('YYYY/MM/DD');
	rawData.appversion = form.chosenappversion ? form.chosenappversion : [];

	issueService.getGeneralfilter(projName, form, function (err, docs) {
		if (err) {
			res.json(500);
		} else {
			_.extend(rawData, _.pick(docs, 'appversion', 'country', 'osversion'));
			res.json(rawData);
		}
	});
};

exports.getStatIssueList = function (req, res) {
	var rawData = {},
			form = req.query;

	rawData.platform = req.params.platform;
	rawData.startDate = form.startDate ? moment(form.startDate, "YYYY/MM/DD").toDate() : moment().subtract(30, 'days').startOf('day').toDate();
	rawData.endDate = form.endDate ? moment(form.endDate, "YYYY/MM/DD").endOf('day').toDate() : moment().endOf('day').toDate();
	rawData.versions = form.chosenappversion ? form.chosenappversion : [];
	rawData.osversions = form.chosenosversion ? form.chosenosversion : [];
	rawData.countrys = form.chosencountry ? form.chosencountry : [];
	rawData.data = [];
	service.getStatIssueList(req.params.project_id, rawData, function (err, docs) {
		res.json(docs);
	});
}
/**
 * get the Statistics issue list
 * @param req
 * @param res
 */
exports.getIssues = function (req, res) {
	var projName = req.params.project_id,
			cond = req.query;

	cond.skip = parseInt(cond.skip);
	cond.limit = parseInt(cond.limit);
	cond.platform = req.params.platform;
	cond.osversions = cond.chosenosversion ? cond.chosenosversion : [];
	cond.countrys = cond.chosencountry ? cond.chosencountry : [];

	if (cond.sortby === "lastSeen") {
		cond.sortby = "last_seen";
	} else if (cond.sortby == "firstSeen") {
		cond.sortby = "first_seen";
	} else if (cond.sortby == "affectedUser") {
		cond.sortby = "affected_user_list";
	} else {
		cond.sortby = "occurrence";
	}

	service.findIssuesByCriteria(projName, cond, function (count, results) {
		var re = {};
		re.count = count;
		re.results = results;
		res.json(re);
	});
}

