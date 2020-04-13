var fs = require("fs");
var axios = require("axios");
var request = require("request");
var moment = require("moment");
var dotenv = require("dotenv");

//require("dotenv").config();
//var keys = require('./dataKeys.js');

var getMeMovie = function(movieName) {
            
request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
if (!error && response.statusCode == 200) {

  var jsonData =JSON.parse(body);
          
  console.log('===###= HERE IS YOUR MOVIE INFO...==============================================') 
          console.log('Title: ' + jsonData.Title)
          console.log('Year: ' + jsonData.Year)
          console.log('Rated: ' + jsonData.Rated)
          console.log('IMDB Rating: ' + jsonData.imdbRating)
          console.log('Country: ' + jsonData.Country)
          console.log('Language: ' + jsonData.Language)
          console.log('Plot: ' + jsonData.Plot)
          console.log('Actors: ' + jsonData.Actors)
          console.log('========================================================================') 
}
});
}

    var getMeSpotify = function(songName) {
     
      var Spotify = require('node-spotify-api');
 
      var spotify = new Spotify({
        id: "9e2da8ff15e642389e5e03123e4319b8" ,
        secret: "5068f3811b23475d83c15d83438d0407"
      });
       
      spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

          console.log('================= HERE IS YOUR SONG INFO...==================') 
          console.log('Song Name: ' + "'" + songName.toUpperCase() + "'")
          console.log('Album Name: ' + data.tracks.items[0].album.name)
          console.log('Artist Name: ' + data.tracks.items[0].album.artists[0].name)
          console.log('URL: ' + data.tracks.items[0].album.external_urls.spotify + '\n\n\n')
          console.log('=============================================================') 
     
      });
    }
    var getMyConcert = function(artistName) {
    
    var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "?app_id=codingbootcamp";
    console.log(queryUrl);
    
    axios.get(queryUrl).then(
      function(response) {
        console.log('================= HERE IS YOUR ARTIST INFO...==================') 
        console.log("Artist Name: " + response.name);
        console.log("Artist URL: " + response.url);
        console.log("Upcoming Events: " + response.upcoming_event_count);
        console.log("See Tour Dates: " + response.name);
        console.log('================= HERE IS YOUR ARTIST INFO...==================') 
      //Name of the venue
      //Venue location
      //Date of the Event (use moment to format this as "MM/DD/YYYY")
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });

    }

var pick = function(caseData, functionData) {
  switch (caseData) {
    case "concert-this":
    getMyConcert(functionData);
      break;
    case "spotify-this-song":
      getMeSpotify(functionData);
      break;
    case "movie-this":
      getMeMovie(functionData);
      default: 
      console.log("LIRI DOES NOT KNOW THAT!!");
    }
  }


  var runThis = function (argOne, argTwo) {
  pick(argOne, argTwo);
};
runThis(process.argv[2], process.argv[3]);

   


 

    




    
    