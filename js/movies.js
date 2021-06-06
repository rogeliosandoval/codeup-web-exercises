// this is where we are calling the function to display a loading while waiting on the page to come through
addLoader();

// here is where we are calling the movie list to our page
fetch("https://turquoise-youthful-king.glitch.me/movies")
    .then(resp => resp.json())
    .then(data => console.log(data));

// trying to get the omdb api to work
// fetch("https://img.omdbapi.com/?apikey=[df3f3144]&")
//     .then(resp => resp.json())
//     .then(data => console.log(data));


let getOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
};

//This function pulls the movie list from the api/database and drops into
//into the html for the container
function fillMovieList(sortOrder, searchTerm) {

// const ourMovies = () => {
    fetch("https://turquoise-youthful-king.glitch.me/movies")
        .then(resp => resp.json())
        .then(movies => {

            if (sortOrder === 1) {
                movies.sort((a, b) => (a.title > b.title) ? 1 : -1)
            } else if (sortOrder === 2) {
                movies.sort((a, b) => (a.title < b.title) ? 1 : -1)
            }
            if (typeof (searchTerm) === "undefined") {
                searchTerm = null;
            }

            let htmlStr = "";
            for (let movie of movies) {
                if (searchTerm === null || searchTerm === "" || movie.title.toLowerCase().includes(searchTerm.toLowerCase()) || movie.actors.toLowerCase().includes(searchTerm.toLowerCase()) || movie.plot.toLowerCase().includes(searchTerm.toLowerCase()) || movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) || movie.imdbid.toLowerCase().includes(searchTerm.toLowerCase())) {


                    htmlStr += `<h1>${movie.title}</h1><h3>${movie.genre}</h3><p>${movie.plot}</p><br><p>${movie.actors}</p><p><button class="editB" style="margin-right:25px;" onClick="editItem(\`${movie.id}\`,\`${movie.title}\`,\`${movie.genre}\`,\`${movie.plot}\`,\`${movie.actors}\`,\`${movie.imdbid}\`)">edit</button><button class="detailsB" style="margin-left:25px;margin-right:25px;" onClick="fillMovieDetails(\`${movie.imdbid}\`)">details</button><button class="deleteB" style="margin-left:25px;" onClick="deleteItem(\`${movie.id}\`,\`${movie.title}\`)">delete</button></p><div class="omdbDetails displayNone" id="${movie.imdbid}"></div><hr>`;
                }
            }
            $("#container").html(htmlStr);

        });

}

//This calls the function that fills the movie list. We need to call it
//here so the page gets the info on page load
fillMovieList(2);


fetch("https://turquoise-youthful-king.glitch.me/movies")
    .then(resp => resp.json())
    .then(movie => console.log(movie));

//This function displays that the page is loading while waiting for the JSON to finish.
function addLoader() {
    $('body').append('<div id="loadingDiv" style="width:300px;margin:auto;"><img src="image/loading-10.gif" alt="movie-reel-loading"></div>');
    $(window).on('load', function () {
        setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
    });

    //This displays that the page is loading at the bottom of the page.
    function removeLoader() {
        $("#loadingDiv").fadeOut(200, function () {
            // fadeOut complete.
            $("#loadingDiv").remove(); //makes page more lightweight
            $("#myForm").css('display', 'block');
        });
    }
}

$("#addMovie").click(function () {

    if ($("#movieTitle").val() == "" || $("#movieGenre").val() == "" || $("#moviePlot").val() == "" || $("#movieActors").val() == "" || $("#movieImdbId").val() == "") {
        swal('Unable To Submit Request', 'All fields are required', 'warning');
    } else {
        //The problem that you were having was about variable value assignment.
        //You had the variables defined in a global scope and they were being
        //assigned values when the page was first loaded. During mage load the value of
        //$("#movieTitle").val() is empty, so the title was always empty
        //you hard coded in the plot and the actors, which is why they were showing up
        //to fix tis we moved the variable declaration / value assignment into the
        //function itself. That way, when the function was called, we assigned the value
        //to the variable at that time and at that time there was a value in
        //$("#movieTitle").val(), it was not a blank string. So, then things were working
        //then we added more boxes for the plot and the actors and just processed them the
        //same way we processed the title.

        let newMovie = {
            "title": $("#movieTitle").val(),
            "genre": $("#movieGenre").val(),
            "plot": $("#moviePlot").val(),
            "actors": $("#movieActors").val(),
            "imdbid": $("#movieImdbId").val()
        };
        let postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie)
        };

        fetch("https://turquoise-youthful-king.glitch.me/movies", postOptions)
            .then(resp => resp.json())
            .then(movies => movies);
        console.log($("#movieTitle").val());

        //Now, after the new movie was added we needed to pull the data down from the api / database again
        //To do this, i put the original call into a function instead of just having it run inline. Then
        //i called that function on page load so we filled in the page like normal. That allowed me to then
        //call the info grab from the api any time I wanted to by calling that function
        //the problem was though that the database has a delay before it updates so if you pull
        //the data right after adding the movie you get the same results and it would look like
        //nothing changed. With that in mind we added a 1.5 second delay before we attempt to reload
        //the movie list from the api/database and drop it into the html of the page

        setTimeout(function () {
            fillMovieList();
            swal('Movie Added', 'Congratulations, the movie "' + $("#movieTitle").val() + '" has been added to the database.', 'success');
            $("#movieTitle").val("");
            $("#movieGenre").val("");
            $("#moviePlot").val("");
            $("#movieActors").val("");
            $("#movieImdbId").val("");
        }, 1500);
    }
});

function editItem(movieId, movieTitle, movieGenre, moviePlot, movieActors, movieImdbId) {
    $("#addEditTitle").html("Edit " + movieTitle);
    $("#editMovie").css('display', 'inline-block');
    $("#editMovieCancel").css('display', 'inline-block');
    $("#addMovie").css('display', 'none');
    $("#movieTitle").val(movieTitle);
    $("#movieGenre").val(movieGenre);
    $("#moviePlot").val(moviePlot);
    $("#movieActors").val(movieActors);
    $("#movieId").val(movieId);
    $("#movieImdbId").val(movieImdbId);
    $("#movieTitle").focus();

}

$("#editMovie").click(function () {

    if ($("#movieTitle").val() === "" || $("#movieGenre").val() === "" || $("#moviePlot").val() === "" || $("#movieActors").val() === "" || $("#movieImdbId").val() === "") {
        swal('Unable To Make Changes', 'All fields are required', 'warning');
    } else {
//send edit command / info to the api/db
        let editMovie = {
            "title": $("#movieTitle").val(),
            "genre": $("#movieGenre").val(),
            "plot": $("#moviePlot").val(),
            "actors": $("#movieActors").val(),
            "imdbid": $("#movieImdbId").val()
        };
        let patchOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editMovie)
        };

        fetch("https://turquoise-youthful-king.glitch.me/movies/" + $("#movieId").val(), patchOptions)
            .then(resp => resp.json())
            .then(movies => movies);

        //When the edit command has been completed

        setTimeout(function () {
            fillMovieList();
            swal('Congratulations', 'The movie "' + $("#movieTitle").val() + '" has been edited.', 'success');
            resetFields();
        }, 1500);

    }
});

$("#editMovieCancel").click(function () {
    resetFields();

});

function resetFields() {
    $("#movieTitle").val("");
    $("#movieGenre").val("");
    $("#moviePlot").val("");
    $("#movieActors").val("");
    $("#movieId").val("");
    $("#movieImdbId").val("");

    $("#editMovie").css('display', 'none');
    $("#editMovieCancel").css('display', 'none');
    $("#addMovie").css('display', 'inline-block');
    $("#addEditTitle").html("Add A Movie");
}

function deleteItem(movieId, movieTitle) {

    swal({
        title: "Are you sure you want to delete \"" + movieTitle + "\"?",
        text: "Once deleted, you will not be able to recover this movie listing!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                let deleteOptions = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                };

                fetch("https://turquoise-youthful-king.glitch.me/movies/" + movieId, deleteOptions)
                    .then(resp => resp.json())
                    .then(movies => console.log(movies));

                setTimeout(function () {
                    fillMovieList();
                    swal("Poof! Your movie listing has been deleted!", {
                        icon: "success",
                    });
                }, 1500);
            } else {
                swal("Your movie listing is safe!");
            }
        });
}

$("#btnSortAZ").click(function () {
    fillMovieList(1);
});

$("#btnSortZA").click(function () {
    fillMovieList(2);
});


$("#btnSearch").click(function () {
    fillMovieList(0, $(txtSearch).val());
});




$("#btnSearchClear").click(function () {
    $(txtSearch).val("");
    fillMovieList(0, $(txtSearch).val());
});



function fillMovieDetails(imdbId) {
//let's check to see if the omdb info is being displayed. if it is not
    //then let's go fetch it and show it to the user.
    //we could make this better in the future by deciding if we had already fetched this data previously
    //and it is within and acceptable time limit and if it is then not fetch it again
    //just show it because the html is already generated in the page
    //or, grab it from local storage if we had it previously and saved it but the page has been reloaded
    //or similar so we do not have the html in the page right now

    //if the display si currently showing all we want to do is hide the information so we will not make
    //the fetch call here, we will skip to the else statement at the bottom of the function
    if($("#" + imdbId).hasClass("displayNone") && $("#" + imdbId).html()==="")   {


        fetch("https://www.omdbapi.com/?apikey=df3f3144&i=" + imdbId)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                var html = "";
                var imageHtml = "";
                //Since we didn't feel like making an object that matches what imdb returns
                //we are going to just do a generic object entry extraction
                for (const [key, value] of Object.entries(data)) {
                    //if the key we are on is poster, let's save it to a separate string so we can show it
                    //at the top of the details
                    if (key === "Poster") {
                        imageHtml += "<div><img src='" + `${value}` + "' style='margin-top:20px;margin-bottom:20px;' alt='Movie poster'/></div>";

                    } else if (key === "Ratings") {
                        //if we are on the key of ratings, we are really getting an array returned
                        //since we have an unknown type due to our generic object extraction approach
                        //used in the for loop above, we do not know that this is an array
                        //so we need to force it into an array format
                        var temp = [];
                        temp = value;
                        //now that it is in an array format, let's loop through it
                        for (let [key2, value2] of Object.entries(temp)) {
                            //once again we were lazy and didn't feel like making an object that
                            //matched the return type of a rating so we have to force it into
                            //an array so we can loop through it
                            var temp2 = [];
                            temp2 = value2;
                            //now that we are forced into the shape of an array
                            //we are going to loop through this array of objects
                            html += "<div>";
                            //we need an index counter so we know when to write in the colons since
                            //we only want it after the value items
                            let i = 0;
                            for (let [key3, value3] of Object.entries(temp2)) {
                                //write out the course of the rating
                                html += `${value3}`;
                                if (i % 2 === 0) {
                                    //if we just wrote the source and not the value add the colon
                                    html += ": ";
                                }
                                //increment our index counter
                                i++;
                            }
                            //end our lovely div
                            html += "</div>";
                        }
                    } else {
                        //if the key we are on in is anything other than poster or rating, just print it out
                        html += "<div>" + `${key}: ${value}` + "</div>";
                    }
                }

                //alert(html);
                $("#" + imdbId).html(imageHtml + html);
                $("#" + imdbId).toggleClass("displayNone");
            });
    }
    else
    {
        //we already have the information showing so let's just hide it
        $("#" + imdbId).toggleClass("displayNone");
    }
}



$("#btnAddMovie").click(function () {
    $("#movieTitle").focus();
});