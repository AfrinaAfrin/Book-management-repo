// device.js

function Device(name, type) {
    this.name = name;
    this.type = type;
    this.status = 'off'; // Default status is off
  }
  
  Device.prototype.turnOn = function() {
    this.status = 'on';
    console.log(`${this.name} is now ON.`);
  };
  
  Device.prototype.turnOff = function() {
    this.status = 'off';
    console.log(`${this.name} is now OFF.`);
  };
  
  Device.prototype.checkStatus = function() {
    console.log(`${this.name} is currently ${this.status}.`);
  };
  
  module.exports = Device;

// smartDevice.js

const Device = require('./device');

function SmartDevice(name, type, brand, connectivity) {
  Device.call(this, name, type); // Call the parent constructor (Device)
  this.brand = brand;
  this.connectivity = connectivity; // Connectivity status: "connected", "disconnected"
}

SmartDevice.prototype = Object.create(Device.prototype);
SmartDevice.prototype.constructor = SmartDevice;

// Asynchronous firmware update method
SmartDevice.prototype.updateFirmware = async function() {
  console.log(`Updating firmware for ${this.name}...`);
  try {
    let response = await fetch('https://api.smartdevice.com/updateFirmware'); // Simulate API call
    let data = await response.json();
    console.log(`${this.name} firmware update completed. Version: ${data.version}`);
  } catch (error) {
    console.error('Firmware update failed:', error);
  }
};

SmartDevice.prototype.checkConnectivity = function() {
  console.log(`${this.name} connectivity status: ${this.connectivity}`);
};

module.exports = SmartDevice;


// smartLight.js

const SmartDevice = require('./smartDevice');

function SmartLight(name, brand, connectivity, brightness, color) {
  SmartDevice.call(this, name, 'Light', brand, connectivity);
  this.brightness = brightness;
  this.color = color;
}

SmartLight.prototype = Object.create(SmartDevice.prototype);
SmartLight.prototype.constructor = SmartLight;

SmartLight.prototype.adjustBrightness = function(level) {
  this.brightness = level;
  console.log(`${this.name} brightness set to ${level}.`);
};

SmartLight.prototype.changeColor = function(newColor) {
  this.color = newColor;
  console.log(`${this.name} color changed to ${newColor}.`);
};

module.exports = SmartLight;



// smartThermostat.js

const SmartDevice = require('./smartDevice');

function SmartThermostat(name, brand, connectivity, temperature, mode) {
  SmartDevice.call(this, name, 'Thermostat', brand, connectivity);
  this.temperature = temperature;
  this.mode = mode; // "heat", "cool", or "auto"
}

SmartThermostat.prototype = Object.create(SmartDevice.prototype);
SmartThermostat.prototype.constructor = SmartThermostat;

SmartThermostat.prototype.setTemperature = function(newTemperature) {
  this.temperature = newTemperature;
  console.log(`${this.name} temperature set to ${newTemperature}°C.`);
};

SmartThermostat.prototype.changeMode = function(newMode) {
  this.mode = newMode;
  console.log(`${this.name} mode changed to ${newMode}.`);
};

module.exports = SmartThermostat;


// user.js

function User(username, password) {
    this.username = username;
    this.password = password;
    this.smartHome = null; // Initially no smart home
  }
  
  // Asynchronous authentication method
  User.prototype.authenticate = async function() {
    console.log('Authenticating user...');
    try {
      const response = await fetch('https://api.authservice.com/authenticate', {
        method: 'POST',
        body: JSON.stringify({ username: this.username, password: this.password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.success) {
        console.log('Authentication successful!');
      } else {
        console.log('Authentication failed!');
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };
  
  User.prototype.manageDevices = function(device, action) {
    if (this.smartHome) {
      if (action === 'add') {
        this.smartHome.addDevice(device);
      } else if (action === 'remove') {
        this.smartHome.removeDevice(device.name);
      }
    } else {
      console.log('No smart home assigned to this user.');
    }
  };
  
  module.exports = User;

  
// app.js

const Device = require('./device');
const SmartHome = require('./smartHome');
const SmartDevice = require('./smartDevice');
const SmartLight = require('./smartLight');
const SmartThermostat = require('./smartThermostat');
const User = require('./user');

// Create devices
const light1 = new SmartLight('Living Room Light', 'Philips', 'connected', 80, 'white');
const thermostat1 = new SmartThermostat('Living Room Thermostat', 'Nest', 'connected', 22, 'heat');

// Create a smart home for a user
const user1 = new User('john_doe', 'password123');
const smartHome = new SmartHome('John Doe');
user1.smartHome = smartHome;

// Authenticate user
user1.authenticate();

// Add devices to smart home
user1.manageDevices(light1, 'add');
user1.manageDevices(thermostat1, 'add');

// List devices
smartHome.listDevices();

// Test asynchronous actions
light1.updateFirmware();
thermostat1.checkConnectivity();



