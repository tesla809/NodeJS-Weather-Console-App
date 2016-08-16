// Weather querying is now its own module.
/*
future bugs to handle
-if city entered instead of zipcode
-cities of different names- solution ... return all cities of that name with state.
-pick unit. soultion for now: output both c an f
*/

// can't access module unless its added in via require method
var http = require("http");

// lets decide what weather info we want...
// print out message
function printMessage(zipcode, temperature, lowTemp, highTemp, city, country){
  var message = "\n" + city + "," + country + "(" + zipcode + ")" + ": ";
  message += "\nCurrent Temp: " + toCelsius(temperature) + "°C/" + toFahrenheit(temperature) + "°F";
  message += "\n" + "High: " + toCelsius(highTemp) + "°C" + "/" + toFahrenheit(highTemp) + "°F";
  message += "\n" + "Low:  " + toCelsius(lowTemp) + "°C" + "/" + toFahrenheit(lowTemp) + "°F";
  message += "\n";
  console.log(message);
}

function toCelsius(temperature){
  // round up to nearest one's place
  temperature = (temperature + 0.5);
  // fix equation
  return (temperature - 273.15).toFixed(0);
}

function toFahrenheit(temperature){
  // round up to nearest one's place
  temperature = (temperature + 0.5);
  // truncate to one's place
  return (temperature * (9/5) - 459.67).toFixed(0);
}

// if they enter a city run city to zip code
// what about cities of same name?
function cityToZipcode(city){
  // return zip
}

// error in case city now found
function printNoCityError(city){
  console.log("No city found by the name of" + city);
}

// Print out error messages
function printError(error){
  console.error(error.message);
}

// exported method
function get(zipcode){
  // error handling
  try {
    var apiKey = "3b4d9c15fad7b35ee0e512ead946e18c";
    var address = "http://api.openweathermap.org/data/2.5/weather?";
    address += "zip=" + zipcode;
    address += ",us&appid=" + apiKey;

    var request = http.get(address, function(response){
      // concatanate responses are we recieve them
      // b/c the internet sends out/recieves info in chunks of packets so lets merge them.
      var body = "";
      
      // Read the data from the response
      response.on('data', function(chunk){
        //concat data packet chunk as it comes in
        body += chunk;
      }); 
      
      // all events in node js emit end event.
      response.on('end', function(){
        if(response.statusCode === 200){
          try {
            // Parse the data aka string to code
            var weather = JSON.parse(body);

            // Print the data.
            printMessage(zipcode, weather.main.temp, weather.main.temp_min, weather.main.temp_max, weather.name, weather.sys.country);
          } catch(error){
            // if parse error
            printError(error);
          }
        } else {
          // if status code error
          // in printError method, we access the x.message. Here we just passed our own .message
          printError({message: "There was an error getting the weather info for " + zipcode + ". (" + http.STATUS_CODES[response.statusCode] +") "});
        }
      });
    });
  } catch (error){
      // if connection error
      printError(error);
  }
}

// export our get function
module.exports.get = get;


// -----------
// Prepare
// Problem: We need a simple way get zipcode and send weather info
// Solution: Use Node.js to connect to OpenWeatherMap API to info to print out.

// Plan
// Connect to API URL(...)

/*

what weather info do we want?
tempeture
high
low

lets focus on what we want from API then fix print function.
After that we will edit the get function to get it.

We can mock up an input for the print function to make sure it works and comment out the get function.
then we fix get function with proper API call and website.
*/

