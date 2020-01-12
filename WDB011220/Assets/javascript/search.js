//declare global variables
var searchHistoryDiv = $("#search-history-div");
var searchInput = $("#Search-input");
var searchButton = $("#search-button");
var city;
var searchHistoryArray = [];

//create a click event for the search button
searchButton.on("click", function() {
  //take the string that the user entered in the search input
  city = searchInput.val();
  // Add city to searh history array
  searchHistoryArray.push(city);
  // Add the search history array to local storage
  localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArray));
  //create a button labeled with the user's string
  var newButton = $("<button>");
  newButton.text(city);
  newButton.addClass("search-history-button");
  //create a click event for new button
  //put the button inside the search history div
  searchHistoryDiv.prepend(newButton);
  //city entered by user is used for API calls
  currentWeather(city);
});

//create a function that takes search history from local storage and creates search history buttons as soon as the page loads
function historyButtons() {
  //get our array from local storage
  searchHistoryArray = JSON.parse(localStorage.getItem("searchHistory"));
  console.log(searchHistoryArray);
  //for loop to create buttons from the array
  for (var i = searchHistoryArray.length - 1; i >= 0; i--) {
    console.log("inside the for loop");
    // create a button for this index of the array
    var newButton = $("<button>");
    newButton.text(searchHistoryArray[i]);
    newButton.addClass("search-history-button");
    //create a click event for new button
    //put the button inside the search history div
    searchHistoryDiv.append(newButton);
  }
}

historyButtons();