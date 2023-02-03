/* Create an API call on page load to search for movie information from a pre-determined list   -   ** DONE **

/* create an API to call information from OMDB containing 
    -   The Movie Title
    -   Age Rating
    -   Movie Length
    -   The Plot
    -   The Main Actors
    -   The Release date
    -   Genre
    -   The IMDB Rating
    -   The movie poster

    Will need the API search to be given by either the inputted text, or the clicked image

/* create an API to YouTube to get the movie trailer 
    (This again will need to be linked to either the inputted text or clicked image)

    in the call code we will need to add "movie trailer" so the youtube search looks for that specifically  
*/

// variables

var searchInput = $("#search-input"); // the text box
var searchButton = $("#search-button"); // the search button
var movieStatics = $("#movie-statics"); // the div section where the movie suggestions will be held
var movieSuggestions = [
    "Avatar: The Way of Water", 
    "Black Panther: Wakanda Forever", 
    "Minions: The Rise of Gru", 
    "Sonic The HedgeHog 2",
    "Bros", 
    "You People", 
    "Jung_E", 
    "The Last Manhunt", 
    "The Invitation", 
    "Everything Everywhere all at Once", 
    "smile", 
    "Bullet Train",
    "The Lost City", 
    "Lightyear", 
    "Uncharted", 
    "Morbius", 
    "Turning Red", 
    "Doctor Strange in the Multiverse of Madness", 
    "Black Adam",
    "Thor: Love and Thunder", 
    "The Bad Guys", 
    "Strange World", 
    "Jurassic World Dominion", 
    "Luck", 
    "The Sea Beast", 
    "Slumberland", 
    "Chip 'n Dale: Rescue Rangers",
    "The Lion King",
    "Top Gun: Maverick",
    "The Batman",
    "Troll",
    "Against the Ice",
    
];

// list of movies to show on screen - will need to add moreto the list and add a random feature to select different ones each time for variety
var movieInput = ""

displayMovies()



//  ** functions  **

// Fisher-Yates (aka Knuth) Shuffle method to shuffle the pre-set movie list
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

// displays 8 different movies to show on the page load up 
function displayMovies() {
    shuffle(movieSuggestions)
    // search through the movie list to display each icon
    for (var i = 0; i < 8; i++) {
        var movie = movieSuggestions[i];
        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy"

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            // Creating a div to hold the movie
            var movieDiv = $("<div class='moviePull col-md-3'; id='moviePoster'>");
            // store the movies name
            // movieDiv.attr("data-name", movie) // keeps printing the same name?
            // Retrieving the URL for the image
            var imgURL = response.Poster;
            // Creating an element to hold the image
            var image = $("<img>").attr("src", imgURL);
            // Appending the image
            movieDiv.append(image);
            // append to screen
            movieStatics.append(movieDiv);
        })
    }
}

// gets information about the movie the user requested
function getMovieInfo() {
    $("#movie-info").empty()
    // get the movie typed in the search bar
    var movie = $("#search-input").val();
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy"
    // ajax call on the searched info
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // Creating a div to hold the movie
        var movieDiv = $("<div class='movie'>");

        // Storing the rating data
        var rating = response.Rated;

        // Creating an element to have the rating displayed
        var pOne = $("<p>").text("Rating: " + rating);

        // Displaying the rating
        movieDiv.append(pOne);

        // Storing the release year
        var released = response.Released;

        // Creating an element to hold the release year
        var pTwo = $("<p>").text("Released: " + released);

        // Displaying the release year
        movieDiv.append(pTwo);

        // Storing the plot
        var plot = response.Plot;

        // Creating an element to hold the plot
        var pThree = $("<p>").text("Plot: " + plot);

        // Appending the plot
        movieDiv.append(pThree);

        // Retrieving the URL for the image
        var imgURL = response.Poster;

        // Creating an element to hold the image
        var image = $("<img>").attr("src", imgURL);

        // Appending the image
        movieDiv.append(image);

        // Putting the entire movie above the previous movies
        $("#movie-info").append(movieDiv);
    });
}

// display info about the movie poster that was clicked
function displayMovieInfo() {

  // var movie = $(event.target).attr("data-name");
  var movie = $(this).attr("data-name");
  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

   // Creating an AJAX call for the specific movie button being clicked
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {

     // Creating a div to hold the movie
     var movieDiv = $("<div class='movie'>");

     // Storing the rating data
     var rating = response.Rated;

     // Creating an element to have the rating displayed
     var pOne = $("<p>").text("Rating: " + rating);

     // Displaying the rating
     movieDiv.append(pOne);

     // Storing the release year
     var released = response.Released;

     // Creating an element to hold the release year
     var pTwo = $("<p>").text("Released: " + released);

     // Displaying the release year
     movieDiv.append(pTwo);

     // Storing the plot
     var plot = response.Plot;

     // Creating an element to hold the plot
     var pThree = $("<p>").text("Plot: " + plot);

     // Appending the plot
     movieDiv.append(pThree);

     // Retrieving the URL for the image
     var imgURL = response.Poster;

     // Creating an element to hold the image
     var image = $("<img>").attr("src", imgURL);

     // Appending the image
     movieDiv.append(image);

     // Putting the entire movie above the previous movies
     $("#movies-view").prepend(movieDiv);
   });

 }

// function to do the youtube movie search
function movieSearch(){
    var queryURL= "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + searchInput + " trailer&type=video&key=" + youtubeApi;
    $.ajax({
        url:queryURL,
        method:"GET",
    }).then(function(response){
        console.log(queryURL);
        console.log(response);
        var trailerThumbnail= response.items[0].snippet.thumbnails.high.url;
      var trailerVideo= response.items[0].id.videoId;
       console.log(trailerThumbnail,trailerVideo);
    });
}


//  **  click events  **

// search button click event
$("#search-button").on("click", function (event) {
    event.preventDefault();
    movieInput = searchInput.val();

    if (movieInput === "" || movieInput === " ") {
        alert("Please enter a movie to search for")
        return
    }

    getMovieInfo()
    searchInput.val("")
})

$("#moviePoster").on("click", ".moviePull", displayMovieInfo)