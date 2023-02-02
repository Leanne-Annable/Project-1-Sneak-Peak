/* Create an API call on page load to search for movies released within the last 2 months
    using the "released" or "Year" key from the OMDB info.
    Will probably need to use moment.js to set a time scale? 
    Or we could find another type of movies to link to the page - Maybe "classics" instead of recent releases
    if the code becomes too challenging within our timescale


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
var movieSuggestions = ["Avatar: The Way of Water", "Black Panther: Wakanda Forever", "Minions: The Rise of Gru", "Sonic The HedgeHog 2"];
// list of movies to show on screen - will need to add moreto the list and add a random feature to select different ones each time for variety
var movieInput = ""

displaySearch()
// functions

function displaySearch() {
    // search through the movie list to display each icon
    for (var i = 0; i < movieSuggestions.length; i++) {
        var movie = movieSuggestions[i]
        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy"

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            // Creating a div to hold the movie
            var movieDiv = $("<div class='movie'>");
            // Retrieving the URL for the image
            var imgURL = response.Poster;
            // Creating an element to hold the image
            var image = $("<img>").attr("src", imgURL);
            // Appending the image
            movieDiv.append(image);
            // append to screen
            movieStatics.append(movieDiv)
        })
    }
}

function getMovieInfo(){
    $("#movie-info").empty()
    // get the movie typed in the search bar
    var movie = $("#search-input").val();
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy"
    // ajax call on the searched info
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
        $("#movie-info").append(movieDiv);
    });
}



// click events

// search button click event
$("#search-button").on("click", function(event){
    event.preventDefault();
    movieInput = searchInput.val();

    if (movieInput === "" || movieInput === " "){
        alert("Please enter a movie to search for")
        return
    }

    getMovieInfo()
    searchInput.val("")
})