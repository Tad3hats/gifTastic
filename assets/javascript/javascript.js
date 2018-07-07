
// Initial array of basketball players
var players = ["Michael Jordan", "Stephen Curry", "Steve Nash", "Scottie Pippen",
    "Lebron James", "Kobe Bryant", "Grant Hill", "Kevin Durant", "Charles Barkley",
    "Kristaps Porzingas", "Larry Bird", "Shaq", "Jalen Rose", "Jason Williams",
    "Tracy McGrady", "Russell Westbrook", "Paul Pierce", "Jeremy Lin"];

function renderButtons() {
    //empty basketballButtons before setting them up
    $("#basketballButtons").empty();

    for (var i = 0; i < players.length; i++) {
        //this creates buttons and fills them with the player array
        $("#basketballButtons").append("<button class='giphyButton'>" + players[i] + "</button>");
    }
}

$(document).on("click", ".giphyButton", function () {
    console.log($(this).text());

    //push this into a variable for the api call
    var player = $(this).text();
    console.log(player);

    // Constructing a queryURL using the player name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        player + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
        // after data comes back from the request prepend image from response to div
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
            $("#gifDiv").prepend(`
          <div>
            <img src=${response.data[i].images.original_still.url} data-still=${response.data[i].images.original_still.url} 
            data-animate=${response.data[i].images.original.url} data-state="still" class="gif">
            </div>  
        `)
        }
        $(".gif").on("click", function () {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    
    });

    })


//onsubmit here, grab form value push it into player var and then call renderButtons function
  
  $("#addPlayer").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var addPlayer = $("#player-input").val().trim();

    // Adding the player from the textbox to our array
    players.push(addPlayer);
    console.log(players);
    renderButtons();
  }
);

renderButtons();

