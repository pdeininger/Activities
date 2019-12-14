$(document).ready(function() {
    // Declare variables
    var searchTermEl = $("#search-term");
    var numberRecordsEl = $("#number-records");
    var startYearEl = $("#start-year");
    var endYearEl = $("#end-year");
    var articlesGoHereEl = $("#articlesGoHere");
  
    // Create click event for Search button
    var searchBtn = $("#searchBtn");
    searchBtn.on("click", function() {
      event.preventDefault();
      // Get value from text inputs
      var searchTermVal = searchTermEl.val();
      var numberRecordsVal = numberRecordsEl.val();
      var startYear = startYearEl.val();
      var endYear = endYearEl.val();
      // Access API
      // queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=canada&api-key=PVhkpNf6oRHLZzBRz8qh2olTphYL39Rx";
      queryURL =
        "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
        searchTermVal +
        "&fq=pub_year:[" +
        startYear +
        "%20TO%20" +
        endYear +
        "]&api-key=PVhkpNf6oRHLZzBRz8qh2olTphYL39Rx";
      console.log(queryURL);
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(result) {
        for (var i = 0; i < numberRecordsVal; i++) {
          // Create a new div within articlesGoHereEl to house each article returned from API
          var newDiv = $("<div>");
          // Add title, author, section, publication date, and URL to div
          newDiv.append(
            $("<h4>" + result.response.docs[i].headline.main + "</h4>")
          );
          newDiv.append(
            $("<h6>" + result.response.docs[i].byline.original + "</h6>")
          );
          newDiv.append($("<p>" + result.response.docs[i].section_name) + "</p>");
          newDiv.append(
            $("<p><strong>" + result.response.docs[i].pub_date + "</strong></p>")
          );
          newDiv.append(
            $(
              '<a href="' +
                result.response.docs[i].web_url +
                '" target="_blank">' +
                result.response.docs[i].web_url +
                "</a>"
            )
          );
          articlesGoHereEl.append(newDiv);
        }
      });
    });
  
    // Create click event for Clear button
    var clearBtn = $("clearBtn");
    clearBtn.on("click", function() {
      event.preventDefault();
      // Empty all text inputs
      searchTermEl.empty();
      startYearEl.empty();
      endYearEl.empty();
      // Reset number of records to 5
      numberRecordsEl.val(5);
      // Clear the articles div
      articlesGoHereEl.empty();
    });
  });