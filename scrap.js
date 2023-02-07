var checkArray = savedItems.includes(title);
if (checkArray === true) {
    return
} else {
    savedItems.append(title)
    renderSaves();



    // calling the saved items from local storage
// function renderSaves() {
//     // delete the buttons prior to adding new favourites to stop repeated buttons
//     $("#savedButtons").empty();
//     // loop through the array of movies
//     for (var i = 0; i < savedItems.length; i++) {
//         // generate a button for each entry
//         var a = $("<button>");
//         // Adding a class of city to our button
//         a.addClass("savedMovie");
//         // Adding a data-attribute
//         a.attr("id", savedItems[i]);
//         // Providing the initial button text
//         a.text(savedItems[i]);
//         // Adding the button to the city-list div
//         $("#savedButtons").append(a);
//     }
}