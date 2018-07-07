
 // Initial array of basketball players
 var players = ["Michael Jordan", "Hakeem Olajawon", "Charles Barkley", "Scottie Pippen", "Lebron James", "Kobe Bryant", "Stephen Curry"];

 // Function for dumping the JSON content for each button into the div
 function displayPlayer() {


// Adding click event listen listener to all buttons
$("button").on("click", function () {
  // Grabbing and storing the data- property value from the button
  var player = $(this).attr("player-form");

  // Constructing a queryURL using the animal name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    player + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
    // after data comes back from the request  
  }).then(function (response) {
    $("#basketballButtons").text(JSON.stringify(response));
    renderButtons();

    console.log(queryURL);
    console.log(response);
  });
  // storing the data from the AJAX request in the results variable
  var results = response.data;

  // Looping through each result item
  for (var i = 0; i < results.length; i++) {

    // Creating and storing a div tag
    var playerlDiv = $("<div>");

    // Creating a paragraph tag with the result item's rating
    var p = $("<p>").text("Rating: " + results[i].rating);

    // Creating and storing an image tag
    var playerImage = $("<img>");
    // Setting the src attribute of the image to a property pulled off the result item
    playerImage.attr("src", results[i].images.fixed_height.url);

    // Appending the paragraph and image tag to the animalDiv
    playerDiv.append(p);
    playerDiv.append(playerImage);

    // Prependng to the HTML page in the "#gifs-appear-here" div
    $("#playerButtons").prepend(playerDiv);
  }
});
