$(document).ready(function () {
    var celebs = ["Taylor Swift", "Justin Beiber", "Beyonce"];
     function getButtons() {
       $("#celeb-buttons").empty();
         for (i = 0; i < celebs.length; i++) {
             $("#celeb-buttons").append("<button class='btn btn-success' data-celeb='" + celebs[i] + "'>" + celebs[i] + "</button>");
         }
     }
    
     getButtons();
    
        
        $("#add-celeb").on("click", function () {
            event.preventDefault();
            var celeb = $("#celeb-input").val().trim();
            celebs.push(celeb);
            getButtons();
            return;
        });
    
    
        
        $("button").on("click", function () {
            var celeb = $(this).attr("data-celeb");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                celeb + "&api_key=qOo4k4qt2VA8bHrsuyphMOYCkUFVmq9U"
    
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function (response) {
                var results = response.data;
                $("#celebs").empty();
                for (var i = 0; i < results.length; i++) {
                    var celebDiv = $("<div>");
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var celebImg = $("<img>");
                    celebDiv.append(p);
                    celebDiv.append(celebImg);
                    $("#celebs").append(celebDiv);
                }
            });
        });
    
        function changeState(){
            var state = $(this).attr("data-state");
            var animateImage = $(this).attr("data-animate");
            var stillImage = $(this).attr("data-still");
    
            if (state == "still") {
                $(this).attr("src", animateImage);
                $(this).attr("data-state", "animate");
            }
    
            else if (state == "animate") {
                $(this).attr("src", stillImage);
                $(this).attr("data-state", "still");
            }
        }
  
        $(document).on("click", ".gif", changeState);
    
    });
    