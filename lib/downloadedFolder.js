var co = require("co");
var path = require("path");
var cfs = require("co-fs");
var filter = require("co-filter");
var configuration = require("./configuration");

module.exports = {
  list: list
};

function *list () {
  var folder = configuration.tvshowsFolder;
  var downloadedFiles = yield cfs.readdir(folder);
  var downloadedDirectories = yield filter(downloadedFiles, function* (file) {
    var stat = yield cfs.stat(path.join(folder, file));
    return stat.isDirectory();
  });
  return downloadedDirectories;
}



