var Utorrent = require('utorrent-api');
var configuration = require("./configuration");
var thunkify = require("thunkify");

module.exports = {
  list : list
};

var port = configuration.get("utorrentPort");
var user = configuration.get("utorrentUser");
var password = configuration.get("utorrentPassword");

var utorrent = new Utorrent('localhost', port);
utorrent.setCredentials(user, password);
utorrentCall = thunkify(utorrent.call.bind(utorrent));

function* list() {
  return yield utorrentCall("list");
}