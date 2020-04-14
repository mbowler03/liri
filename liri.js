require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var request = require("request");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);


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
    
    var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";
    console.log(queryUrl);
    
    axios.get(queryUrl).then(
      function(response) {
        console.log(response.data[0]);
        console.log('================= HERE IS YOUR ARTIST INFO...==================') 
        console.log("Artist Name: " + response.data[0].artist.name);
        console.log("Artist URL: " + response.data[0].url);
        console.log("Upcoming Events: " + response.data[0].venue.name);
        console.log("Country, City: " + response.data[0].venue.country + "," + response.data[0].venue.city);
        console.log("See Tour Dates: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
        console.log('================= HERE IS YOUR ARTIST INFO...==================') 
    
      })
      .catch(function(error) {
        if (error.response) {
       
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {

          console.log(error.request);
        } else {
        
          console.log("Error", error.message);
        }
        console.log(error.config);
      });

    }
var doWhatItSays = function() {
fs.readFile('random.txt', 'utf8', function (err, data) {
  if (err) throw err;
 var dataArr = data.split(',');
if (dataArr =data.length == 2) {
  pick(dataArr[0], dataArr[1]);
} else if (dataArr.length ==1) {
  pick(dataArr[0]);
}
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
      break;
     case 'do-what-it-says':
       doWhatItSays();
       break; 
      default: 
      console.log("LIRI DOES NOT KNOW THAT!!");
    }
  }

  var runThis = function (argOne, argTwo) {
  pick(argOne, argTwo);
};
runThis(process.argv[2], process.argv[3]);

   


 

    




    
    