const request = require('request');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const inquirer = require('inquirer');
const fs = require('fs');
const key = require('./key.js');

const spotifyKey = new Spotify(key.spotifyKeys);

var action = process.argv;
var prompt = process.argv[2];

startGame();

function startGame() {
	inquirer.prompt([{
	    type: 'list',
	    name: 'option',
	    message: 'What program do you want to run?',
	    choices: [
			'my-tweets', 
			'spotify-this-song', 
			'movie-this'
	    ]
	  }]).then((responses) => {

		switch (responses.option) {
//Start Switch for Prompts
		// switch (prompt) {
			case "my-tweets": 
			myTweets(); 
			break; 
			case 'spotify-this-song':
				inquirer.prompt([{
				    type: 'input',
				    name: 'song',
				    message: 'Please enter a song & press enter to search: ',
				  }])
					.then((response) => {
					const song = response.song;
					mySong(song);
					});
					break;
			// case "movie-this": 
			// movie-this(); 
			// break
			// case "do-what-it-says": 
			// doWhat-it-says();
			// break; 
	 }
  })
}//End Switch

function myTweets() {
	var screenName = {screen_name: 'changelingcat'};
	key.twitterKeys.get('statuses/user_timeline', screenName, function(error, tweets, response) {
	    if(!error){
	      for(var i = 0; i<tweets.length; i++){
	        var date = tweets[i].created_at;
	        console.log("╔═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗");
	        console.log("  @changelingcat: " + tweets[i].text + "." + " Created On: " + date.substring(0,16) + ".");
	        console.log("╚═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝");
	        //adds text to log.txt file
	        // fs.appendFile('log.txt', "@changelingcat: " + tweets[i].text + " Created At: " + date.substring(0, 19));
	        // fs.appendFile('log.txt', "-----------------------");
	      }//End If Statement
	      }else {
	      		console.log('Error occurred');
    	  }//End Error Elose
  	});//End Search
}//End myTweets function

function mySong(song){
	if(!song){
		spotifyKey.search({ type: 'track', query: 'The Sign Ace of Base', limit: 1}, function(error, data) {
			if(!error){
				for(var i = 0; i < data.tracks.items.length; i++){
		        	var songInfo = data.tracks.items[i];
		        	console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
		        	console.log(" * Default Artist: " + songInfo.artists[0].name);
		        	console.log(" * Default Song: " + songInfo.name);
		        	console.log(" * Default Preview URL: " + songInfo.preview_url);
		        	console.log(" * Default Album Name: " + songInfo.album.name);
		        	console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
				}//End For loop
		    } //End If Statement
		    else{
		      console.log('Error occurred.' + error);
		    }//End Else
		 });//End Search
	} else {
		spotifyKey.search({ type: 'track', query: song}, function(error, data){
			if(!error){
		    	for(var i = 0; i < data.tracks.items.length; i++){
		        var songInfo = data.tracks.items[i];
		        	console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
		        	console.log(" * Artist: " + songInfo.artists[0].name);
		        	console.log(" * Song: " + songInfo.name);
		        	console.log(" * Preview URL: " + songInfo.preview_url);
		        	console.log(" * Album Name: " + songInfo.album.name);
		        	console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
		       	}//End For loop
		     }//End If Statement
		    else{
		      console.log('Error occurred.' + error);
		    }//End Else
		});//End Search
	}//END PRIMARY IF/ELSE
}//End FUNCTION

