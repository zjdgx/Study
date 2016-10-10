/*
 * trends_controller.js
 * copyright NHN China Co.,LTD
 */

/**
 * Controller for issue_trend
 * @author <a href="mailto:xingxiaoguang@nhn.com">Scott</a>
 * @version 1.0 13-12-03
 * @since nCrazer 0.1
 */
var config = require('../utils/config_util.js').highcharts,
		issueService = require("./issues_service"),
		moment = require("moment"),
		service = require("./trends_service");

/**
 * Get all kinds of trends
 * Execute the getXXX method of trends_service.  xxx stand for the trends name.
 * @param req
 * @param res
 */
exports.getTrends = function (req, res) {
	var form = req.query,
			projName = req.params.project_id;

	form.platform = req.params.platform;

	if (form.todo === 'true') {
		return res.json({rawData: {}});
	}

	var cb = function (err, rawData) {
		if (err) {
			res.send(500);
		} else {
			res.json({rawData: rawData});
		}
	};
	service['get' + form.type].apply(null, [projName, form, cb]);
};

exports.downloadCsv = function (req, res) {
	var form = req.query,
			filename = 'export_' + form.type + '_' + moment().format('YYYYMMDD');

	res.setHeader('Content-disposition', 'attachment; filename=' + filename + ".csv");
	res.setHeader('Content-type', 'application/octet-stream;charset=utf-8');
	res.write('\xEF\xBB\xBF', 'binary');
	res.write(form.content);
	res.end();
}