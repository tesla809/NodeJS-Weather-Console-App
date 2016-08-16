// get weather
var weather = require("./weather.js");

// get zipcode arguments inside console.
var zipcodes = process.argv.slice(2);

// allows you to pass any number of zipcodes for weather
zipcodes.forEach(weather.get);
