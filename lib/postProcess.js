var cfs = require("co-fs");
var downloadPostProcess = require("download-post-process");
var configuration = require("./configuration");

var debug = require("debug")("tvchous:server:postProcess");

module.exports = {
  start: start,
  stop: stop
};

var watcher;

function* start () {
  var basePath = configuration.get("downloadedFolder");
  var destPath = configuration.get("tvshowsFolder");

  try {
    yield createIfNotExists(basePath);
    yield createIfNotExists(destPath);

    watcher = downloadPostProcess.watcher(basePath, destPath);
    watcher.start();

    debug("Starting postProcess watcher %s -> %s", basePath, destPath);

  } catch(e) {
    console.error("postProcess service error", e);
  }
}

function* createIfNotExists(folder) {
  var exist = yield cfs.exists(folder);
  if (!exist) {
    yield mkdirp(folder);
  }
}

function stop () {
  if (watcher) {
    watcher.stop();
    watcher = undefined;
  }
}