var co = require("co");
var configuration = require("./configuration");
var io = require("socket.io")(configuration.port);

var shows = require("./shows");
var downloadedFolder = require("./downloadedFolder");
var torrents = require("./torrents");

var debug = require("debug")("socket");

var remoteMethods = {
  findShows: shows.findShows,
  findShow: shows.findShow,
  findSeason: shows.findSeason,
  findEpisode: shows.findEpisode,
  downloadedFolders: downloadedFolder.list,
  findTorrents: torrents.findTorrents,
  defaultTorrentForEpisode: torrents.defaultTorrentForEpisode,
  downloadTorrent: torrents.downloadTorrent
};

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

