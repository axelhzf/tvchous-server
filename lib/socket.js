var co = require("co");
var thunkify = require("thunkify");
var downloadSubtitle = thunkify(require("subtitles-downloader").downloadSubtitle);
var configuration = require("./configuration");
var Server = require("socket.io");

var shows = require("./shows");
var downloadedFolder = require("./downloadedFolder");
var torrents = require("./torrents");
var utorrent = require("./utorrent");

var debug = require("debug")("tvchous:server:socket");

module.exports = {
  start: start,
  stop: stop
};

var remoteMethods = {
  findShows: shows.findShows,
  findShow: shows.findShow,
  findSeason: shows.findSeason,
  findEpisode: shows.findEpisode,
  downloadedFolders: downloadedFolder.list,
  findTorrents: torrents.findTorrents,
  defaultTorrentForEpisode: torrents.defaultTorrentForEpisode,
  downloadTorrent: torrents.downloadTorrent,
  downloadSubtitle: downloadSubtitle,
  torrentList: utorrent.list
};


var io;

function* start () {
  stop();
  var port = configuration.get("serverPort");
  var io = new Server(port);

  debug("Start socket server at port %s", port);

  io.on("connect", function (socket) {
    debug("connect");

    socket.on("call", function (data) {
      debug("call id %s %s ", data.methodName, data.id);

      var methodName = data.methodName;
      if (!remoteMethods[methodName]) {
        socket.emit("response", {id: data.id, error: "Method not found"});
        return;
      }

      co(function* () {
        try {
          var result = yield remoteMethods[methodName].apply(null, data.params);
          debug("emit response id %s %s", data.methodName, data.id);
          socket.emit("response", {id: data.id, data: result});
        } catch (e) {
          console.error("Socket error", e);
          socket.emit("response", {id: data.id, error: {message: e.message, stack: e.stack}});
        }
      })();

    });

    socket.on("watch", function (data) {
      var key = data.key;
      console.log("key", data.key);

      socket.emit("watchUpdate:" + key, ["a", "b", "c"]);

      setInterval(function () {
        socket.emit("watchUpdate:" + key, ["a", "b", "c"]);
      }, 1000);

    });

    socket.on("stopWatch", function () {

    });

  });
}

function* stop () {
  if (io) {
    io.close();
  }
}

