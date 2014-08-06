var path = require("path");
var _ = require("underscore");
var _s = require("underscore.string");
var EventEmitter = require("events").EventEmitter;

var events = new EventEmitter();
var configuration;

module.exports = {
  get: get,
  set: set,
  getConfiguration: getConfiguration,
  updateConfiguration: updateConfiguration,
  events: events
};

init();

function init () {
  var c = defaultConfiguration();
  _.extend(c, envConfiguration());
  updateConfiguration(c);
}


function defaultConfiguration () {
  return {
    downloadedFolder: path.join(getUserHome(), "Downloads", "downloaded"),
    tvshowsFolder: path.join(getUserHome(), "Downloads", "tvshows"),
    utorrentUser: "",
    utorrentPassword: "",
    utorrentPort: "",
    serverPort: "5004",
    traktApiKey: "5a6741f036689886bb9d030fed43af82",
    env: "production"
  };
}

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

function envConfiguration () {
  var conf = {};
  var keys = _.keys(defaultConfiguration());
  _.each(keys, function (key) {
    var cmdKey = _s.underscored(key).toUpperCase();
    if (_.has(process.env, cmdKey)) {
      conf[key] = process.env[cmdKey];
    }
  });
  return conf;
}

function getConfiguration () {
  return _.extend({}, configuration);
}

function updateConfiguration (newConfiguration) {
  configuration = newConfiguration;
  events.emit("change");
}

function get (key) {
  return configuration[key];
}

function set (key, value) {
  configuration[key] = value;
  updateConfiguration(configuration);
}
