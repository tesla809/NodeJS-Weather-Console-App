// Moved code to profile.js and created it as a module.

// can't access module unless its added in via require method
var https = require("https");
var http = require("http");

// print out message
function printMessage(username, badgeCount, points){
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
  console.log(message);
}

// Print out error messages
function printError(error){
  console.error(error.message);
}

// error handling
// try/catch allows you to try code and catch errors
// throw lets you create custom errors
// finally lets you execute code after throw or catch regardless of the result.

function get(username){
  try {
    var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response){
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
            var profile = JSON.parse(body);
            // Print the data.
            printMessage(username, profile.badges.length, profile.points.JavaScript);
          } catch(error){
            // if parse error
            printError(error);
          }
        } else {
          // if status code error
          // side note, constants are in uppercase letters
          // in printError method, we access the x.message. So here we just passed our own
          // .message
          printError({message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] +") "});
        }
      });
    });
  } catch (error){
      // if connection error
      printError(error);
  }
}

// for this module, we want to export the get method
// this is needed when creating modules
// assign exports.get to our get function
module.exports.get = get;


// -----------_
// Prepare
// Problem: We need a simple way to look a user's badge count and Javascript points.
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out.

// Plan
// Connect to API URL(http://teamtreehouse.com/username.json)

