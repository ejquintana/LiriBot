const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const inquirer = require('inquirer');
const fs = require('fs');
const request = require('request');
const chalk = require('chalk');
const key = require('./key.js');

const spotifyKey = new Spotify(key.spotifyKeys);

startPrompts();

function startPrompts() {
	inquirer.prompt([{
	    type: 'list',
	    name: 'option',
	    message: 'What program do you want to run?',
	    choices: [
			'my-tweets', 
			'spotify-this-song', 
			'movie-this', 
			'do-what-it-says'
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
				    message: 'Please enter a song to search: ',
				  }])
					.then((response) => {
					const song = response.song;
					mySong(song);
					});
					break;
			 case "movie-this": 
			 inquirer.prompt([{
				    type: 'input',
				    name: 'movie',
				    message: 'Please enter a movie to search: ',
				  }])
					.then((response) => {
					const movie = response.movie;
					selectMovie(movie);
					});
					break;
			 case "do-what-it-says": 
			 doWhat();
			 break; 
	 }
  })
}//End Switch
function PromptAgain() {
	inquirer.prompt([{
	    type: 'confirm',
	    name: 'confirm',
	    message: 'Would you like to keep going?',
	  }
	])
	.then((answers) => {
		if (answers.confirm) {
			startPrompts();
		} else {
			console.log("Good Bye!");
		}
	})
}
function myTweets() {
	var screenName = {screen_name: 'changelingcat'};
	key.twitterKeys.get('statuses/user_timeline', screenName, function(error, tweets, response) {
	    if(!error){
	      for(var i = 0; i<tweets.length; i++){
	        var date = tweets[i].created_at;
	         // console.log(chalk.red("≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡"));
	        console.log(chalk.bold.cyan(" @changelingcat: ") + chalk.bold.whiteBright(tweets[i].text) + chalk.bold.yellowBright(".") + chalk.bold.cyan(" Created On: " + date.substring(0,16) + "."));
	        console.log(chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
	        //adds text to log.txt file
	         fs.appendFileSync('log.txt', "@changelingcat: " + tweets[i].text + " Created At: " + date.substring(0, 19));
	         fs.appendFileSync('log.txt', "-----------------------");
	      }//End If Statement
	      }else {
	      		console.log('Error occurred');
    	  }//End Error Elose
  	});//End Search
  	setTimeout(PromptAgain, 4000);
}//End myTweets function

function mySong(song){
	if(!song){
		spotifyKey.search({ type: 'track', query: 'The Sign Ace of Base', limit: 1}, function(error, data) {
			if(!error){
				for(var i = 0; i < data.tracks.items.length; i++){
		        	var songInfo = data.tracks.items[i];
		        	console.log(chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
		        	console.log(chalk.bold.blue(" ☠  Default Artist: ") + chalk.underline.white(songInfo.artists[0].name));
		        	console.log(chalk.bold.cyan(" ☠  Default Song: ") + chalk.underline.white(songInfo.name));
		        	console.log(chalk.bold.blue(" ☠  Default Preview URL: ") + chalk.white(songInfo.preview_url));
		        	console.log(chalk.bold.cyan(" ☠  Default Album Name: ") + chalk.underline.white(songInfo.album.name));
		        	console.log(chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
					//logout
					fs.appendFileSync('log.txt'," * Default Artist: " + songInfo.artists[0].name);
		        	fs.appendFileSync('log.txt'," * Default Song: " + songInfo.name);
		        	fs.appendFileSync('log.txt'," * Default Preview URL: " + songInfo.preview_url);
		        	fs.appendFileSync('log.txt'," * Default Album Name: " + songInfo.album.name);
		        	fs.appendFileSync('log.txt',"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

				}//End For loop
		    } //End If Statement
		    else{
		      console.log(chalk.redBright('Error occurred.' + error));
		    }//End Else
		 });//End Search
	} else {
		spotifyKey.search({ type: 'track', query: song}, function(error, data){
			if(!error){
		    	for(var i = 0; i < data.tracks.items.length; i++){
		        var songInfo = data.tracks.items[i];
		        	console.log(chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
		        	console.log(chalk.bold.blue(" ☠  Artist: ") + chalk.underline.white(songInfo.artists[0].name));
		        	console.log(chalk.bold.cyan(" ☠  Song: ") + chalk.underline.white(songInfo.name));
		        	console.log(chalk.bold.blue(" ☠  Preview URL: ") + chalk.white(songInfo.preview_url));
		        	console.log(chalk.bold.cyan(" ☠  Album Name: ") + chalk.underline.white(songInfo.album.name));
		        	console.log(chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
		       	
					fs.appendFileSync('log.txt'," * Default Artist: " + songInfo.artists[0].name);
		        	fs.appendFileSync('log.txt'," * Default Song: " + songInfo.name);
		        	fs.appendFileSync('log.txt'," * Default Preview URL: " + songInfo.preview_url);
		        	fs.appendFileSync('log.txt'," * Default Album Name: " + songInfo.album.name);
		        	fs.appendFileSync('log.txt',"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

		       	}//End For loop
		     }//End If Statement
		    else{
		      console.log(chalk.redBright('Error occurred.' + error));
		    }//End Else
		});//End Search
	}//END PRIMARY IF/ELSE
	  	setTimeout(PromptAgain, 4000);
}//End FUNCTION

function selectMovie(movie) {
    // Then run a request to the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
    // console.log(queryUrl);
    request(queryUrl, function(error, response, body) {
      // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200 && movie !== "") {
          console.log(chalk.blue("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
          console.log(chalk.gray("回") + chalk.underline.whiteBright("Move Title: ") + chalk.cyanBright(JSON.parse(body).Title));
          console.log(chalk.gray("回") + chalk.underline.cyanBright("Release Date: ") + chalk.whiteBright(JSON.parse(body).Year));
          console.log(chalk.gray("回") + chalk.underline.whiteBright("IMDB Rating: ") + chalk.cyanBright(JSON.parse(body).imdbRating));
          console.log(chalk.gray("回") + chalk.underline.cyanBright("Rotten Tomatoes Rating: ") + chalk.whiteBright(JSON.parse(body).Ratings[1].Value))
          console.log(chalk.gray("回") + chalk.underline.whiteBright("Production Country: ") + chalk.cyanBright(JSON.parse(body).Country));
          console.log(chalk.gray("回") + chalk.underline.cyanBright("Movie Language: ") + chalk.whiteBright(JSON.parse(body).Language));
          console.log(chalk.gray("回") + chalk.underline.whiteBright("Plot: ") + chalk.cyanBright(JSON.parse(body).Plot));
          console.log(chalk.gray("回") + chalk.underline.cyanBright("Actors: ") + chalk.whiteBright(JSON.parse(body).Actors));
          console.log(chalk.blue("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
    	
		fs.appendFileSync('log.txt'," # Move Title: " + JSON.parse(body).Title);
		fs.appendFileSync('log.txt'," # Release Date: " + JSON.parse(body).Year);
		fs.appendFileSync('log.txt'," # IMDB Rating: " + JSON.parse(body).imdbRating);
		fs.appendFileSync('log.txt'," # Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		fs.appendFileSync('log.txt'," # Production Country: " + JSON.parse(body).Country);
		fs.appendFileSync('log.txt'," # Movie Language: " + JSON.parse(body).Language);
		fs.appendFileSync('log.txt'," # Plot: " + JSON.parse(body).Plot);
		fs.appendFileSync('log.txt'," # Actors: " + JSON.parse(body).Actors);
		fs.appendFileSync('log.txt',"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    	}else if (movie == ""){
    		var queryUrl = "http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=40e9cece";
    // console.log(queryUrl);
    		request(queryUrl, function(error, response, body) {
          		console.log(chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
          		console.log(chalk.gray("㊚") + chalk.whiteBright(" If you haven't watched \"Mr. Nobody,\" then you should: http://www.imdb.com/title/tt0485947/"));
          		console.log(chalk.gray("㊚ ")+ chalk.redBright("Its on Netflix!!"));
          		console.log(chalk.gray("回") + chalk.underline.whiteBright("Move Title: ") +  chalk.cyanBright(JSON.parse(body).Title));
          		console.log(chalk.gray("回") + chalk.underline.whiteBright("Release Date: ") + chalk.whiteBright(JSON.parse(body).Year));
          		console.log(chalk.gray("回") + chalk.underline.whiteBright("IMDB Rating: ") + chalk.cyanBright(JSON.parse(body).imdbRating));
          		console.log(chalk.gray("回") + chalk.underline.whiteBright("Rotten Tomatoes rating: ") + chalk.whiteBright(JSON.parse(body).Ratings[1].Value));
          		console.log(chalk.gray("回") + chalk.underline.whiteBright("Production Country: ") + chalk.cyanBright(JSON.parse(body).Country));
          		console.log(chalk.gray("回") + chalk.underline.whiteBright("Movie Language: ") + chalk.whiteBright(JSON.parse(body).Language));
          		console.log(chalk.gray("回") + chalk.underline.whiteBright("Plot: ") + chalk.cyanBright(JSON.parse(body).Plot));
          		console.log(chalk.gray("回") + chalk.underline.whiteBright("Actors: ") + chalk.whiteBright(JSON.parse(body).Actors));
          		console.log(chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
    		
   	
				fs.appendFileSync('log.txt'," @ Move Title: " + JSON.parse(body).Title);
				fs.appendFileSync('log.txt'," @ Release Date: " + JSON.parse(body).Year);
				fs.appendFileSync('log.txt'," @ IMDB Rating: " + JSON.parse(body).imdbRating);
				fs.appendFileSync('log.txt'," @ Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
				fs.appendFileSync('log.txt'," @ Production Country: " + JSON.parse(body).Country);
				fs.appendFileSync('log.txt'," @ Movie Language: " + JSON.parse(body).Language);
				fs.appendFileSync('log.txt'," @ Plot: " + JSON.parse(body).Plot);
				fs.appendFileSync('log.txt'," @ Actors: " + JSON.parse(body).Actors);
				fs.appendFileSync('log.txt',"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  
    		});
    	}
    });
      	setTimeout(PromptAgain, 4000);
 }

 function doWhat(){
  fs.readFile('random.txt', "utf8", function(error, data){
    var txt = data.split(',');
    mySong(txt[1]);
  });
}



