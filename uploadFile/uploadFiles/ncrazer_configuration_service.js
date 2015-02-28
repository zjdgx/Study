/*
 * ncrazer_configuration_service.js
 * copyright NHN China Co.,LTD
 */

/**
 * service for ncrazer configuration
 *
 * @author <a href="mailto:xingxiaoguang@nhn.com">Scott</a>
 * @author <a href="mailto:chencheng@nhn.com">Carter</a>
 * @version 1.0 2013-10-25 13:16:25
 */
var db =  require('../utils/db_cubrid'),
		mongodb = require("./util/dbtool"),
		async = require("async"),
		projectService = require("./project_service");

exports.addOrUpdateIntegration = function (pid, uid, integration_configid, integration, cb) {
	if (integration_configid == null) {
		insertIntegration(pid, uid, integration, cb);
	} else {
		updateIntegration(pid, integration, cb);
	}
};

exports.getProjectInfoById = function (pid, cb) {
	var sql = "SELECT projectname, app_type AS platform FROM project WHERE id = ?",
			info = {};

	db.queryObjects(sql, [pid], function(err, r){
		if (!err && r.length > 0) {
			info = r[0];
		}

		cb(err, info);
	});
};

exports.getIntegration = function (pid, cb) {
	var sql = "SELECT id, uid, pid, integration_service, bts_integration_url, bts_integration_project, bts_issue_type, github_url, github_token, gitlab_url, gitlab_token, gitlab_id, issue_title_format FROM crash_analyzer WHERE pid = ?";

	db.queryObjects(sql, [pid], cb);
};

exports.getIntegrationByName = function (pname, platform, cb) {
	var sql = "SELECT c.id, c.uid, pid, integration_service, bts_integration_url, bts_integration_project, bts_issue_type, github_url, github_token, gitlab_url, gitlab_token, gitlab_id FROM crash_analyzer c, project p WHERE c.pid = p.id AND p.projectname = ? AND c.platform = ?";

	db.queryObjects(sql, [pname, platform], cb);
};

exports.getIntegration = function (pid, platform, cb) {
	var sql = "SELECT id, uid, pid, platform, integration_service, bts_integration_url, bts_integration_project, bts_issue_type, github_url, github_token, gitlab_url, gitlab_token, gitlab_id, issue_title_format FROM crash_analyzer WHERE pid = ? AND platform = ?";

	db.queryObjects(sql, [pid, platform], cb);
};

exports.getAbnormalPatternConfig = function (projectname, platform, cb) {
	mongodb.getAbnormalPatternConfig(projectname, platform, cb);
};

exports.getPlatformByIssueId = function (projectname,issue_id, cb) {
	mongodb.getPlatformByIssueId(projectname, issue_id, cb);
};

exports.getDailyReportConfig = function (projectName, platform, cb) {
	mongodb.getDailyReportConfig(projectName, platform, cb);
};

exports.getGeneralConfig = function (pid, cb) {
	var query_sql = "SELECT use_crashanalyzer, app_type FROM project WHERE id = ?";
	db.queryObjects(query_sql, [pid], cb);
};

exports.getProjIdbyProjName = function (pname, cb) {
	var sql = "SELECT id FROM project WHERE projectname = ?";

	db.queryObjects(sql, [pname], function (err, r) {
		cb(err, r);
	});
};

exports.getProjectInfoByName = function (pname, cb) {
	var sql = "SELECT id, projectname, app_type AS platform FROM project WHERE projectname = ?",
		info = {};

	db.queryObjects(sql, [pname], function(err, r){
		if (!err && r.length > 0) {
			info = r[0];
		}

		cb(err, info);
	});
};

exports.upsertAbnormalPattern = function (pid, config, cb) {
	getProjNamebyProjId(pid, function (err, r) {
		if (!err) {
			var configs = detectConfigs(config, r),
					detection_configs = configs.dc,
					ac = configs.ac,
					cv = configs.cv,
					dr = configs.dr,
					project_member = null;

			async.series([
				function (callback) {
					ac['members'] = config.average_crash_alarmedUsers;

					if (config.sent_to_all_normal) {
						getProjectUser(pid, function (err, r) {
							var memeber = [];

							if (r) {
								for (var i = 0, len = r.length; i < len; i++) {
									memeber.push({'staff_no': r[i]['staffno'], "send_by": "SMSEmail"});
								}
							}

							ac['project_members'] = memeber;
							project_member = memeber;
							callback(err, r);
						});
					} else {
						ac['project_members'] = null;
						callback(null);
					}
				},
				function (callback) {
					cv['members'] = config.vs_crash_alarmedUsers;

					if (config.sent_to_all_rate && config.sent_to_all_normal) {
						cv['project_members'] = ac['project_members'];
						callback(null);
					} else if (config.sent_to_all_rate) {
						getProjectUser(pid, function (err, r) {
							var memeber = [];

							if (r) {
								for (var i = 0, len = r.length; i < len; i++) {
									memeber.push({'staff_no': r[i]['staffno'], "send_by": "SMSEmail"});
								}
							}

							cv['project_members'] = memeber;
							project_member = memeber;
							callback(err, r);
						});
					} else {
						cv['project_members'] = null;
						callback(null);
					}
				},
				function (callback) {
					dr['members'] = config.daily_report_users;

					if (project_member && config.sent_to_all_daily) {
						dr['project_members'] = project_member;
						callback(null);
					} else if (config.sent_to_all_daily) {
						getProjectUser(pid, function (err, r) {
							var memeber = [];

							if (r) {
								for (var i = 0, len = r.length; i < len; i++) {
									memeber.push({'staff_no': r[i]['staffno'], 'email': r[i]['email']});
								}
							}
							dr['project_members'] = memeber;
							project_member = memeber;
							callback(err, r);
						});
					} else {
						dr['project_members'] = null;
						callback(null);
					}
				}], function (err, result) {
				var now = new Date();

				async.each(detection_configs, function (detection_config, callback) {
					if (detection_config.in_use_init !== detection_config.in_use) {
						if (!config.none && detection_config.in_use === 0) {
							detection_config.closed_time = now;
						} else if (detection_config.in_use === 1) {
							if (!config.none && detection_config.opened_time) {
								detection_config.closed_time = null;
								detection_config.isnew = true;
							}

							detection_config.opened_time = now;
						}
					}

					delete detection_config.in_use_init;
					mongodb.updateAbnormalPatternConfig(r[0]['projectname'], detection_config, callback);
				}, function (err, res) {
					if (!err) {
						mongodb.updateDailyReportConfig(r[0]['projectname'], dr, function (e) {
							cb(e, res);
						});
					} else {
						cb(err, res);
					}
				})
			});
		} else {
			cb(err);
		}
	});
};

exports.saveGeneralConfig = function (pid, config, cb) {
	var platform = projectService.validPlatform(config.platform);

	if (platform){
		var update_sql = "UPDATE project SET use_crashanalyzer= ? , app_type = ? WHERE id = ?";

		db.pool.execute(update_sql, [config.user_crash_analyzer, platform, pid], cb);
	} else {
		cb("Undefined platform");
	}
};

exports.getUserByStaffNo = function (staffnos, cb) {
	var in_statement = "(";

	for (var i = 0, l = staffnos.length; i < l; i++) {
		if (i > 0) {
			in_statement += ","
		}

		in_statement += "'" + staffnos[i] + "'"
	}

	in_statement += ")";

	var query_sql = 'SELECT id, name, staffno, department, cellphone, email FROM [user] WHERE staffno IN ' + in_statement;

	db.query(query_sql, function (err, r) {
		cb(err, r);
	});
};

function detectConfigs( config, r ) {
	var detection_configs = [],
		ac = {},
		cv = {},
		platform = config.platform,
		dr = {},
		update_time = new Date();

	ac['_id'] = config.detection_avg_id;
	ac['updated_time'] = update_time;
	ac['closed_time'] = standardizeDateTime(config.detection_avg_closed_time);
	ac['opened_time'] = standardizeDateTime(config.detection_avg_opened_time);
	ac['in_use'] = config.detection_avg_flag;
	ac['in_use_init'] = config.detection_avg_flag_init;
	ac['project_name'] = r[0]['projectname'];
	ac['threshold'] = parseInt(config.detection_avg_threshold);
	ac['rule_model'] = parseInt(config.detection_crash_event_mode);
	ac['platform'] = platform;

	cv['_id'] = config.detection_launch_id;
	cv['updated_time'] = update_time;
	cv['closed_time'] = standardizeDateTime(config.detection_launch_closed_time);
	cv['opened_time'] = standardizeDateTime(config.detection_launch_opened_time);
	cv['in_use'] = config.detection_launch_flag;
	cv['in_use_init'] = config.detection_launch_flag_init;
	cv['project_name'] = r[0]['projectname'];
	cv['threshold'] = parseInt(config.detection_launch_threshold);
	cv['rule_model'] = 1;
	cv['platform'] = platform;

	dr['_id'] = config.daily_report_id;
	dr['updated_time'] = update_time;
	dr['in_use'] = config.daily_flag;
	dr['project_name'] = r[0]['projectname'];
	dr['platform'] = platform;

	detection_configs.push(ac);
	detection_configs.push(cv);

	return {dc: detection_configs, ac: ac, cv: cv, dr: dr};
}

function standardizeDateTime(dateTime) {
	if (dateTime != null && dateTime.constructor == String) {
		return new Date(dateTime);
	}
	return dateTime;
}

function insertIntegration(pid, uid, integration, cb) {
	var fields = "INSERT INTO crash_analyzer (`uid`, `pid`, `integration_service`, `platform`";
	var values = " VALUES ("
		+ uid + ", " + pid + ", '"
		+ integration.integrationService + "', '"
		+ integration.platform + "', '";

	var service = integration.integrationService;

	if (!service) {
		return cb(null);
	} else if (service === 'BTS') {
		fields += ", bts_integration_url, bts_integration_project, bts_issue_type, issue_title_format";
		values += integration.url + "', '" + integration.projectKey + "', '" + integration.bts_issue_type + "', '" + integration.issue_title_format;
	} else if (service === 'GitHub') {
		fields += ", github_url, github_token, issue_title_format";
		values += integration.github_url + "', '" + integration.github_token + "', '" + integration.issue_title_format;
	} else if (service === 'GitLab') {
		fields += ", gitlab_url, gitlab_token, gitlab_id, issue_title_format";
		values += integration.gitlab_url + "', '" + integration.gitlab_token + "', '" + integration.gitlab_id + "', '" + integration.issue_title_format;
	} else {
		return cb(null);
	}

	var insert_sql = fields + ") " + values + "')";

	db.pool.execute(insert_sql, function (err, r) {
		cb(err, r);
	});
}

function updateIntegration(pid, integration, cb) {
	var update_sql = "UPDATE crash_analyzer SET integration_service = '" + integration.integrationService;

	if (integration.integrationService.toLowerCase() === 'bts') {
		update_sql += "', bts_integration_url = '" + integration.url + "', bts_issue_type = '" + integration.bts_issue_type + "', bts_integration_project = '" + integration.projectKey;
	} else if (integration.integrationService.toLowerCase() === 'github') {
		update_sql += "', github_url = '" + integration.github_url + "', github_token = '" + integration.github_token;
	} else if (integration.integrationService.toLowerCase() === 'gitlab') {
		update_sql += "', gitlab_url = '" + integration.gitlab_url + "', gitlab_token = '" + integration.gitlab_token
			+ "', gitlab_id = '" + integration.gitlab_id;
	}

	update_sql += "', issue_title_format = '" + integration.issue_title_format + "' WHERE pid = ? AND platform = ?";

	db.pool.execute(update_sql, [pid, integration.platform], function (err, r) {
		if (!err) {
			if (integration.integrationChanged) {
				getProjNamebyProjId(pid, function (err, r) {
					mongodb.resetAllIssuesIntegrationID(r[0]['projectname'], integration.platform, function (err) {
						cb(err);
					});
				});
			} else {
				cb(err, r);
			}
		} else {
			cb(err);
		}
	});
}

function getProjNamebyProjId(projId, cb) {
	var sql = "SELECT projectname FROM project WHERE id = ?";
	db.queryObjects(sql, [projId], function (err, r) {
		cb(err, r);
	});
}

function getProjectUser(pid, cb) {
	var sql = "SELECT staffno, email FROM user_project p, [user] u WHERE p.uid=u.id AND p.pid = ?";

	db.queryObjects(sql, [pid], function (err, r) {
		cb(err, r);
	});
}