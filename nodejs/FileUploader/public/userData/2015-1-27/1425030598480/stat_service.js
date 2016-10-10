/*
 * stat_service.js
 * copyright NHN China Co.,LTD
 */

/**
 * Service for real_time_monitoring
 *
 * @author <a href="mailto:xingxiaoguang@nhn.com">Scott</a>
 * @version 1.0 2013-11-25 13:16:25
 * @since nCrazer 0.1
 */

var service = module.exports = {};
var _ = require("underscore");
var db = require("./util/dbtool");
var moment = require("moment");
var util = require("./util/util.js");

/**
 * Get statistic data from db
 * @param projName
 * @param form
 * @param cb
 */
service.getStat = function (projName, form, cb) {
	db.getStat(projName, form, function (err, docs) {
		var arr = [];

		for (var idx in docs) {
			if (idx > 150) {
				break;
			}
			arr.push([docs[idx]._id, docs[idx].occurrence]);
		}

		cb(err, arr);
	});
};

service.getStatIssueList = function (projName, form, cb) {
	db.getStatIssueList(projName, form, function (err, docs) {
		var arr = [];

		for (var idx in docs) {
			if (idx > 150) {
				break;
			}

				arr.push({location: docs[idx]._id.location, execptiontype: docs[idx]._id.execptiontype, occurrence: util.numberFormat(docs[idx].occurrence)});
		}

		cb(err, arr);
	});
}

/**
 * get the Statistics issue list
 * @param projName
 * @param cond
 * @param cb
 */
service.findIssuesByCriteria = function (projName, cond, cb) {
	db.findStatIssuesByCriteria(projName, cond, function (count, docs) {
		var results = [];
		_.each(docs, function (doc, index) {
			var result = {};
			result.issue_id = doc._id;
			result.exceptionType = doc.exception_type;
			result.location = doc.crashed_location;
			result.appVersion = doc.version;
			result.occur = util.numberFormat(doc.occurrence);
			result.affectedUser = util.numberFormat(doc.affected_user_list);
			result.fix_version = doc.fix_version;

			if (doc.first_seen !== null) {
				result.firstSeen = moment(new Date(doc.first_seen)).format('YYYY-MM-DD HH:mm:ss');
			}

			if (doc.last_seen !== null) {
				result.lastSeen = moment(new Date(doc.last_seen)).format('YYYY-MM-DD HH:mm:ss');
			}

			result.status = doc.status;
			result.issue_type_id = doc.issue_type_id;
			result.tags = doc.tags;
			results.push(result);
		});

		cb(count, results);
	});
}



