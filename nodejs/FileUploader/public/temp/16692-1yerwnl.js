/*
 * issues_integration_jira_service.js
 * copyright NHN China Co.,LTD
 */

/**
 * issues integration jira service
 *
 * @author <a href="mailto:chencheng@nhn.com">Carter</a>
 */
var _ = require('underscore'),
		async = require("async"),
		btsConfig = require('../utils/config_util.js').bts_integration,
		configservice = require("./ncrazer_configuration_service.js"),
		db = require("./util/dbtool"),
		dbutil = require('../utils/db_cubrid'),
		JiraApi = require('jira').JiraApi,
		logger = require("../utils/nelo2_logger").getLogger('issues_integration_jira_service.js'),
		projects_controller = require('../projects/projects_controller'),
		util = require("./util/util.js");

JiraApi.prototype.createMeta = function (project, cb) {
	var options = {
		rejectUnauthorized: this.strictSSL,
		uri: this.makeUri('/issue/createmeta?projectKeys=' + project + '&expand=projects.issuetypes.fields').replace('%3F', '?'),
		method: 'GET',
		json: true
	};

	this.doRequest(options, function (error, response) {
		if (error) {
			logger.error('getconnect:createMeta:request:error', error, response && response.statusCode, options);
			cb(error);
		} else if(!response){
			logger.error('getconnect:createMeta:request:emptyResponse', options);
			cb('Empty Resposne');
		} else if (response.statusCode === 200 || response.statusCode === 204) {
			logger.info('getconnect:createMeta:request', response.statusCode, options);
			cb(null, response.body);
		} else {
			logger.error('getconnect:createMeta:request:else:response.statusCode', response.statusCode);
			cb(response.statusCode + ': Error while querying meta data');
		}
	});
};

exports.getIssueTypes = function (url, projectKey, cb) {
	var jira = getSampleConnect(url);

	if (jira) {
		jira.createMeta(projectKey, function (error, res) {
			var types = [],
					projects = res && res.projects || [];

			if (error){
				logger.error('getIssueTypes: invalid bts meta. error:', error);
				cb(null, 'bts_invalid_config', null);
			} else if(projects && projects.length) {
				types = _.pluck(projects[0].issuetypes, 'name');
				cb(null, null, types);
			} else {
				logger.error('getIssueTypes: Can not get projects list，url:', url);
				cb(null, 'bts_invalid_url', null);
			}
		});
	} else {
		logger.error('getIssueTypes: Failed to getSampleConnect');
		cb("integration configuration error", null, null);
	}
};

exports.createissue = function (req, res, platform, cb) {
	var jira,
			bts_issue_type;

	logger.info('CreateIssue:params:', req.params, "platform:", platform);
	jira = getconnect(req.params.project_id, platform, function (jira, project) {
			if (jira == null) {
				logger.error('createissue: Failed to get jira obj');
				cb("integration configuration error", null)
			} else {
				var summary = '[Crash]' + req.query.exceptionType,
						desc = 'Exception Type: ' + req.query.exceptionType + '\n' +
							'Crash at: ' + req.query.location + '\n' +
							'Version: ' + req.query.appVersion + '\n\n' +
							'Date: ' + req.query.firstSeen + ' ~ ' + req.query.lastSeen + '\n' +
							'Affected user: ' + req.query.affectedUser + '\n' +
							'Number of crashes: ' + req.query.occur + '\n\n';

				async.waterfall([
					function (cb) {
						projects_controller.getProjectIdByName(req.params.project_id, cb);
					},
					function (pid, cb) {
						var fragments,
								sql = "SELECT issue_title_format, bts_issue_type FROM crash_analyzer WHERE pid = ? AND platform = ?";

						logger.info('createissue: getProjectIdByName: pid:', pid);

						dbutil.queryObjects(sql, [pid, req.query.appType], function (err, r) {
							if (!err) {
								if (r[0] && r[0].issue_title_format) {
									bts_issue_type = r[0].bts_issue_type;
									fragments = r[0].issue_title_format.split('/');

									if (fragments.length > 1) {
										for (var i = 1, l = fragments.length; i < l; i++) {
											var normalized = fragments[i].replace(/^\s+|\s+$/g, '');

											switch (normalized) {
												case 'Version':
													summary += '/' + req.query.appVersion;
													break;
												case 'Location':
													summary += '/' + req.query.location;
											}
										}
									}
								}
							} else {
								logger.error('createissue: queryObjects: pid:', pid, 'appType', req.query.appType, 'err:', err);
							}

							cb(err);
						});
					},
					function (cb) {
						var cond = {"_id": req.query.issue_id};

						util.generateDesc(req.params.project_id, cond, 'jira', function (err, description) {
							if (err) {
								logger.error('createissue:generateDesc:cond:', cond, 'description:', description, 'err:', err);
							} else {
								desc += description + 'NELO2 Link: ' + req.query.neloUrl;
							}

							cb(err);
						});
					},
					function (cb) {
						var request = {
							fields: {
								project: {key: project},
								summary: summary,
								description: desc
							}
						};

						jira.createMeta(project, function (error, res) {
							if (error) {
								logger.error('createissue:createMeta:error:', error, 'res:', res);
								cb(error, null);
							} else {
								if (!res.projects || res.projects.length == 0) {
									logger.error('createissue:createMeta:error:no project found in BTS');
									cb(new Error("no project found in BTS"), null);
								} else {
									var project = res.projects[0],
											issuetype = project.issuetypes[0];

									request.fields.issuetype = {name: bts_issue_type || issuetype.name};

									if (!_.isEmpty(issuetype)) {
										for (var fieldName in issuetype.fields) {
											var field = issuetype.fields[fieldName];

											if (issuetype.fields.hasOwnProperty(fieldName)) {
												if (field.required && field.schema && !field.schema.customId) {
													if (!fieldRequired(field, fieldName)) {
														continue;
													}

													if (field.schema.type == "array") {
														request.fields[fieldName] = [field.allowedValues[0]];
													} else if (field.schema.type == "string") {
														request.fields[fieldName] = field.allowedValues[0]['name'];
													}
												} else if (field.required && field.schema && field.schema.customId && field.allowedValues) {
													if (field.schema.type == "array") {
														if (field.allowedValues[0]['value'] && field.allowedValues[0]['value'] != "") {
															request.fields[fieldName] = [
																{value: field.allowedValues[0]['value']}
															];
														}
													} else if (field.schema.type == "string") {
														request.fields[fieldName] = {value: field.allowedValues[0]['value'] ? field.allowedValues[0]['value'] : ''};
													}
												} else if (field.name == "Assignee") {
													request.fields[fieldName] = null;
												}
											}
										}
									}

									cb(null, request);
								}
							}
						});
					},
					function (request, cb) {
						jira.addNewIssue(request, function (error, response) {
							if (error) {
								logger.error('createissue:addNewIssue:error:', error, 'response:', response);
							}

							cb(error, response);
						});
					},
					function (response, cb) {
						jira.findIssue(response.id, function (err, response) {
							if (err) {
								logger.error('createissue:findIssue:error:', err, 'response:', response);
								cb(err, null);
							} else {
								cb(null, {
									issueId: response.id,
									issueStastus: response.fields.status.name,
									issueKey: response.key,
									issueURL: "http://" + jira.host + "/browse/" + response.key,
									editURL: "http://" + jira.host + "/secure/EditIssue!default.jspa?id=" + response.id
								});
							}
						});
					}
				], cb);
			}
		}
	);
};

exports.getIssuestatus = function (req, res, platform, cb) {
	var projName = req.params.project_id,
			jira_service = null,
			msg = null,
			issue_track_id = null;

	async.series([
		function (cb) {
			getconnect(req.params.project_id, platform, function (jira) {
				if (jira) {
					jira_service = jira;
					cb(null);
				} else {
					logger.error('getIssuestatus:getconnect: Cant get jira object', req.params.project_id, req.session.user.id, platform);
					cb("integration configuration error", null);
				}
			});
		},
		function (cb) {
			db.getissuetrackid(projName, req.query.issue_type_id, function (err, doc) {
				if (err) {
					logger.error('getIssuestatus:getissuetrackid: err:', err, 'doc:', doc);
				} else {
					issue_track_id = doc[0] ? doc[0].issue_track_id : null;
				}

				cb(err);
			})
		},
		function (cb) {
			if (issue_track_id) {
				jira_service.findIssue(issue_track_id, function (err, res) {
						if (!err && res) {
							msg = {
								issueStastus: res.fields.status.name,
								issueKey: res.key,
								issueURL: "http://" + jira_service.host + "/browse/" + res.key
							}
						} else {
							logger.error('getIssuestatus:findIssue: err:', err, 'doc:', res);
						}

						cb(err);
					}
				);
			} else {
				cb(null);
			}
		}
	], function (err) {
		cb(err, msg);
	});
};

function getconnect(pid, platform, cb) {
	var jira = null;

	configservice.getIntegrationByName(pid, platform, function (err, r) {
		if (err || r.length == 0) {
			logger.error('getconnect:getIntegrationByName:error:', err, 'pid:', pid, 'platform:',platform, 'response:', r);
			cb(jira);
		} else if (r[0].integration_service == null || r[0].integration_service == "" || r[0].bts_integration_url == null || r[0].bts_integration_url == "") {
			logger.error('getconnect:getIntegrationByName,empty result:r[0]:', r[0]);
			cb(jira);
		} else {
			jira = getSampleConnect(r[0].bts_integration_url);
			cb(jira, r[0].bts_integration_project);
		}
	});
}

function getSampleConnect(bts_integration_url) {
	var protocol,
			url,
			bts,
			user = "",
			password = "";

	protocol = bts_integration_url.substr(0, bts_integration_url.indexOf('://'));
	bts_integration_url = bts_integration_url.replace('http://', '').replace('https://', '');

	url = bts_integration_url;
	bts = btsConfig ? btsConfig : {};
	url = url.substr(0, url.indexOf('/browse'));

	_.each(_.keys(bts), function (ele) {
		if (ele && url.indexOf(ele) >= 0) {
			var keys = _.keys(bts[ele]);
			if (keys && keys[0]) {
				user = keys[0];
				password = bts[ele][user];
			}
		}
	});

	return new JiraApi(protocol, url, "", user, password, "2", true, (protocol && protocol.toLowerCase() == 'http'));
}

function fieldRequired(field, fieldName) {
	var require = true;

	if (fieldName == "project") {
		require = false;
	}

	if (!field.allowedValues || field.allowedValues.length == 0 || field.allowedValues[0] == null ||
		field.allowedValues[0] == '') {
		require = false;
	}

	return require;
}