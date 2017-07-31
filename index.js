"use strict";

var Gpio = require("onoff").Gpio;
var Service, Characteristic;

module.exports = function(homebridge)
{
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  // Register this accessory as 'GPIO-OnOff'
  homebridge.registerAccessory("homebridge-gpio-onoff2", "GPIO-OnOff2", GPIOOnOffAccessory);
};

function GPIOOnOffAccessory(log, config)
{
  this.log = log;

  // Read configuration
  this.name = config.name;
  let pin = config.pin;
  let direction = config.direction;
  let edge = config.edge;
  let activeLow = !!config.activeLow;

  let hapService = config.hapService;
  this.hapCharacteristic = config.hapCharacteristic;
  this.trueValue = config.trueValue;
  this.falseValue = config.falseValue;

  // Check configuration
  /* if (!pin)
    throw new Error("You must provide a config value for pin.");
  if ([ "in", "out" ].indexOf(direction) < 0)
    direction = "in";
  if ([ "none", "rising", "falling", "both" ].indexOf(edge) < 0)
    edge = "none"; 
  */
  

  // If the specified service or characteristic is unknown, fall back to generic Switch
  if (!(hapService in Service) || !(this.hapCharacteristic in Characteristic))
    hapService = "Switch";
  // If the service is a Switch, use the On characteristic (will also be triggered when service was unknown)
  if (hapService == "Switch")
  {
    this.hapCharacteristic = "On";
    this.trueValue = true;
    this.falseValue = false;
  };
