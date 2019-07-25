var buttons = ["dog"];

$(document).ready(function(){
    generateBtns();
});

$(document).on("click", "#gifBtns button", function () {
    // Grabbing and storing the data-animal property value from the button
    var animal = $(this).attr("data-animal");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=tjUFS5NfN9BI4Y4bTOkAFj5NhyE2hhJF&limit=10";

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
            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var animalDiv = $("<div>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var animalImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("data-state", "still");

                // Appending the paragraph and image tag to the animalDiv                
                animalDiv.append(animalImage);
                animalDiv.append(p);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifArea").prepend(animalDiv);
            }
        });
});

$("#addGIFbtn").on("click", function () {
    console.log($("#newBtnText").val())

    if ($("#newBtnText").val() != "") {
        buttons.push($("#newBtnText").val());
        console.log(buttons);
       
        generateBtns();
    }
});

function generateBtns(){
    $("#gifBtns").empty();
    $("#gifBtns").append($("<p>").text("Click to dispay GIF's"));
    
    buttons.forEach(function (element) {
        var newBtn = $("<li>")
            .append($("<button>")
                .addClass("btn btn-light col-12 my-1")
                .attr("data-animal", element)
                .text(element));
        $("#gifBtns").append(newBtn);
        $("#newBtnText").val("")
    });
}

$(document).on("click", "img", function () {
    ($(this).attr("data-state") === "still") ?
    $(this).attr("src", $(this).attr("data-animate")).attr("data-state", "animate"):
        $(this).attr("src", $(this).attr("data-still")).attr("data-state", "still");
});