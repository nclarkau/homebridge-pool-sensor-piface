var Service, Characteristic // set in the module.exports, from homebridge
var pfio = require("piface-node-12")
pfio.init()

module.exports = function(homebridge) {
  Service = homebridge.hap.Service
  Characteristic = homebridge.hap.Characteristic

  homebridge.registerAccessory("homebridge-pool-sensor-piface", "PoolPiFace", PoolTemperatureAccessory)
}

function PoolTemperatureAccessory(log, config) {
  this.log = log
  this.version = require('./package.json').version
  log("PoolTemperatureAccessory version " + this.version)

  this.name = config.name
  this.sensorPollInMs = config.pollInMs || 4000
  this.refresh = config.refresh || "60"; // Every minute

  log("Sensor Poll in ms: " + this.sensorPollInMs)
  log("Poll in seconds: " + this.refresh)
}

PoolTempAccessory.prototype = {

  getTemperature: function(callback) {
    exec(cputemp, function(error, responseBody, stderr) {
      if (error !== null) {
        this.log('cputemp function failed: ' + error);
        callback(error);
      } else {
        var binaryState = parseFloat(responseBody);
        this.log("Got Temperature of %s", binaryState);

        callback(null, binaryState);
      }
    }.bind(this));
  },

  identify: function(callback) {
    this.log("Identify requested!");
    callback(); // success
  },

  getServices: function() {
    this.log("INIT: %s", this.name);
      switch (this.service) {
      case "Temperature":
        this.temperatureService = new Service.TemperatureSensor(this.name);
        this.temperatureService
          .getCharacteristic(Characteristic.CurrentTemperature)
          .setProps({
            minValue: -100,
            maxValue: 100
          })
          .on('get', this.getTemperature.bind(this));

        setInterval(function() {
          this.getTemperature(function(err, temp) {
            if (err) {
              temp = err;
            }
            this.temperatureService
              .getCharacteristic(Characteristic.CurrentTemperature).updateValue(temp);
          }.bind(this));
        }.bind(this), this.refresh * 1000);

        return [informationService, this.temperatureService];
    }
}
