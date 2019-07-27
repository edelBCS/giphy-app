var buttons = {btnInfo: ["dog"]};

//generates inital buttons
$(document).ready(function () {
    loadBtns();
    generateBtns();
});

//add gifs to page when button is clicked
$(document).on("click", "#gifBtns button", function () {
    // Grabbing and storing the data-animal property value from the button
    var animal = $(this).attr("data-animal");
    var button = $(this);
    var apiKey = "F6H0NODnWEYqT57AwDQnUNXRJ4HPePvi"
    // Constructing a queryURL using the animal name
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${animal}&api_key=${apiKey}&limit=10`;

    // Performing an AJAX request with the queryURL
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the results variable

            if (response.pagination.total_count === 0) {
                //removes the button is no GIFs are found
                console.log(button);
                buttons.btnInfo.splice(buttons.btnInfo.indexOf(button.text()), 1);
                saveBtns();
                button.text("no GIF's Found");
                button.fadeOut(250).fadeIn(250).fadeOut(250).fadeIn(250);
                setTimeout(function(){generateBtns()}, 1300);
                
            } else {
                //generates the GIFs and ratings
                var results = response.data;

                // Looping through each result item
                for (var i = 0; i < results.length; i++) {

                    // Setting the src attribute of the image to a property pulled off the result item
                    var animalImage = $("<img>").attr("src", results[i].images.fixed_height_still.url)
                        .attr("data-animate", results[i].images.fixed_height.url)
                        .attr("data-still", results[i].images.fixed_height_still.url)
                        .attr("data-state", "still");

                    //append new img GIF and Rating
                    var animalDiv = $("<div>")
                        .append(animalImage)
                        .append($("<p>").text("Rating: " + results[i].rating));

                    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                    $("#gifArea").prepend(animalDiv);
                    console.log(buttons.btnInfo);
                }
            }
        });
});

function saveBtns(){
    localStorage.setItem("savedBtns", JSON.stringify(buttons));
}

function loadBtns(){
    buttons = JSON.parse(localStorage.getItem("savedBtns"));
}

//adds a button when input is filled and (+) button is clicked
$("#addGIFbtn").on("click", function () {
    console.log($("#newBtnText").val())
    
    if ($("#newBtnText").val() != "") {
        buttons.btnInfo.push($("#newBtnText").val());
        saveBtns();
        console.log(buttons.btnInfo);

        generateBtns();
    }
});

//Generates the buttons from the array
function generateBtns() {
    $("#gifBtns").empty();
    $("#gifBtns").append($("<p>").text("Click to dispay GIF's"));

    buttons.btnInfo.forEach(function (element) {
        var newBtn = $("<li>")
            .append($("<button>")
                .addClass("btn btn-light col-12 my-1")
                .attr("data-animal", element)
                .text(element));
        $("#gifBtns").append(newBtn);
        $("#newBtnText").val("");
    });
}

//listens for click to animate GIF's
$(document).on("click", "img", function () {
    ($(this).attr("data-state") === "still") ?
    $(this).attr("src", $(this).attr("data-animate")).attr("data-state", "animate"):
        $(this).attr("src", $(this).attr("data-still")).attr("data-state", "still");
});