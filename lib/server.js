var co = require("co");
var socket = require("./socket");
var postProcess = require("./postProcess");

module.exports = {
  start: start,
  stop: stop
};

function* start () {
  yield socket.start();
  yield postProcess.start();
}

function* stop () {
  yield postProcess.stop();
  yield socket.stop();
}

if (require.main === module) {
  co(function* () {
    yield start();
  })();
}