/**
 * Build Date: 15/4/14 13:42.
 * Copyright (c): NHN China Co.,LTD
 * Author: ZJDGX
 * Description:
 */
module.exports = database_todo = {
	"type": "mongodb",
	"mode": "development",
	"url": "mongodb://127.0.0.1:27017/zjdgx-node-database?readPreference=secondaryPreferred&maxPoolSize=1",
	"min_connection": 0,
	"max_connection": 100
};