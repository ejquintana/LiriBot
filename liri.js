var request = require('request');
var Twitter = require('twitter');
var spotify = require('node-spotify-api');
var fs = require('fs');
var key = require('./key.js');

var action = process.argv;
var prompt = process.argv[2];

//Start Switch for Prompts
switch (prompt) {
	case "my-tweets": 
	myTweets(); 
	break; 
	// case "spotify-this-song": 
	// spotify-this-song(); 
	// break; 
	// case "movie-this": 
	// movie-this(); 
	// break
	// case "do-what-it-says": 
	// doWhat-it-says();
	// break; 
}//End Switch
//my-tweets function
function myTweets() {
	var screenName = {screen_name: 'changelingcat'};
	key.get('statuses/user_timeline', screenName, function(error, tweets, response) {
	    if(!error){
	      for(var i = 0; i<tweets.length; i++){
	        var date = tweets[i].created_at;
	        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	        console.log("@changelingcat: " + tweets[i].text + "." + " Created On: " + date.substring(0,16) + ".");
	        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	        //adds text to log.txt file
	        // fs.appendFile('log.txt', "@changelingcat: " + tweets[i].text + " Created At: " + date.substring(0, 19));
	        // fs.appendFile('log.txt', "-----------------------");
	      }//End If Statement
	      }else {
	      		console.log('Error occurred');
    	  }
  	});//End key.get function
}//End myTweets function