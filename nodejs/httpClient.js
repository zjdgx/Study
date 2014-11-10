/**
 * learnyounode 7: http client
 * create on 2014/11/06 nhn
 *   node httpClient.js "http://www.google.com.hk"
 *    :__response__: response.setEncoding, response.on
 */
var http = require('http')

http.get(process.argv[2], function (response) {
  response.setEncoding('utf8')
  response.on('data', console.log)
  response.on('error', console.error)
})