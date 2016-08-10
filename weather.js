// Weather querying is now its own module.

// can't access module unless its added in via require method
var https = require("https");
var http = require("http");

// lets decide what weather info we want...
// print out message
function printMessage(zipcode, badgeCount, points){
  var message = zipcode + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
  console.log(message);
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
    var address = "http://api.openweathermap.org/data/2.5/weather?" ;
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
            printMessage(zipcode, weather.badges.length, weather.points.JavaScript);
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

