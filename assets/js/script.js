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
var searchInput = $("#search-input");
var searchButton = $("#search-button"); // the search button
var movieStatics = $("#movie-statics"); // the div section where the movie suggestions will be held
// list of movies to show on screen - will need to add moreto the list and add a random feature to select different ones each time for variety
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
    "Kung Fury",
    "Street Fighter",
    "Rocky horror Picture Show",
    "Sing 2",
    "The Karate Kid",
    "Police Academy",
    "Life of Brian",
    "The Mummy",
    "Puss in Boots: The Last Wish",
    "Magic Mike's Last Dance",
    "Plane",
    "The Fabelmans",
    "The Whale",
    "M3GAN",
    "Titanic",
    "Babylon",
    "A Man Called Otto",
    "Matilda",
    "Bridesmaids"
];
var movieInput = ""

// API keys
var youtubeApi= "AIzaSyBIW8mXoGKUPXkb0--LKM1NAqFcEi1wDH8";

displaySearch()


// functions
// Fisher-Yates (aka Knuth) Shuffle method
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
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
function displaySearch() {
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
            var movieDiv = $("<div class='moviePull col-md-3'>");
            // create a title name for the item
            var posterTitle = response.Title;
            // Retrieving the URL for the image
            var imgURL = response.Poster;
            // Creating an element to hold the image
            var image = $("<img class='posterImage'>").attr({id: posterTitle, src: imgURL});
            // Appending the image
            movieDiv.append(image);
            // append to screen
            movieStatics.append(movieDiv)
        })
    }
}
function getMovieInfo() {
    $("#movie-poster").empty();
    $("#movie-info").empty();
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
        // getting each of the required information sections from OMDB
        var title = response.Title;
        var pOne = $("<p>").text("Title: " + title);
        var age = response.Rated;
        var pTwo = $("<p>").text("Age Rating: " + age);
        var runtime = response.Runtime;
        var pThree = $("<p>").text("Run time: " + runtime);
        var plot = response.Plot;
        var pFour = $("<p>").text("Plot: " + plot);
        var actors = response.Actors;
        var pFive = $("<p>").text("Main Actors: " + actors);
        var rating = response.imdbRating;
        var pSix = $("<p>").text("IMDB Rating: " + rating + "/10");
        var release = response.Released
        var pSeven = $("<p>").text("Release Date: " + release)
        // append everything to the movie div
        movieDiv.append(pOne, pTwo, pThree, pSeven, pFour, pFive, pSix);        
        // Retrieving the URL for the image
        var imgURL = response.Poster;
        // Creating an element to hold the image
        var image = $("<img>").attr("src", imgURL);
        // Appending the image
        $("#movie-poster").append(image);
        // Putting the entire movie above the previous movies
        $("#movie-info").append(movieDiv);
    });
}
function movieSearch() {

    var queryURL =
        "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + searchInput + "trailer&type=video&key=" + youtubeApi;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {

        var movieDiv = $("<a id = 'trailer'>")

        var trailerVideo = response.items[0].id.videoId;
        movieDiv.append(trailerVideo);

        var trailer = $("<a id = 'trailer'>").text("Movie trailer" + movieTrailer);

        movieDiv.append(trailer);

        var movieTrailer = "www.youtube.com/watch?v=" + trailerVideo;
        console.log(movieTrailer);
        var trail = document.getElementById("movieTrailer");
        trail.innerHTML = ('Movie Trailer: ' + movieTrailer);
        $("#movie-info").append(trail);
    });
}


// click events
// search button click event
$("#search-button").on("click", function (event) {
    event.preventDefault();
    movieInput = searchInput.val();
    if (movieInput === "" || movieInput === " ") {
        alert("Please enter a movie to search for")
        return
    }

    getMovieInfo();
    movieSearch();
    searchInput.val("");
})

$("#posterImage").on("click", function (event){
    event.preventDefault();
    // need to create function to call the information the same way as the search button, but from clicking the poster value instead.
    // searchInput.val() = 
})