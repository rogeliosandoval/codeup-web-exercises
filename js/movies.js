// this is where we are calling the function to display a loading while waiting on the page to come through
addLoader();

// here is where we are calling the movie list to our page
fetch("https://turquoise-youthful-king.glitch.me/movies")
    .then(resp => resp.json())
    .then(data => console.log(data));


let getOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
};

//This function pulls the movie list from the api/database and drops into
//into the html for the container
function fillMovieList(sortOrder, searchTerm)
{

// const ourMovies = () => {
    fetch("https://turquoise-youthful-king.glitch.me/movies")
        .then(resp => resp.json())
        .then(movies => {

            if(sortOrder===1)
            {
                movies.sort((a, b) => (a.title > b.title) ? 1 : -1)
            }
            else if(sortOrder===2)
            {
                movies.sort((a, b) => (a.title < b.title) ? 1 : -1)
            }
            if(typeof(searchTerm)==="undefined")
            {
                searchTerm=null;
            }

            let htmlStr = "";
            //alert('st: ' + searchTerm);
            for (let movie of movies) {
                if (searchTerm === null || searchTerm ==="" || movie.title.toLowerCase().includes(searchTerm.toLowerCase()) || movie.actors.toLowerCase().includes(searchTerm.toLowerCase()) || movie.plot.toLowerCase().includes(searchTerm.toLowerCase()) || movie.genre.toLowerCase().includes(searchTerm.toLowerCase()))
                {
                    htmlStr += `<h1>${movie.title}</h1><h3>${movie.genre}</h3><p>${movie.plot}</p><br><p>${movie.actors}</p><p><button class="editB" style="margin-right:50px;" onClick="editItem(\`${movie.id}\`,\`${movie.title}\`,\`${movie.genre}\`,\`${movie.plot}\`,\`${movie.actors}\`)">edit</button><button class="deleteB" style="margin-left:50px;" onClick="deleteItem(\`${movie.id}\`,\`${movie.title}\`)">delete</button></p><hr>`;
                }
            }
            $("#container").html(htmlStr);

        });
// }

}
//This calls the function that fills the movie list. We need to call it
//here so the page gets the info on page load
fillMovieList(2);


fetch("https://turquoise-youthful-king.glitch.me/movies")
    .then(resp => resp.json())
    .then(movie => console.log(movie));

//This function displays that the page is loading while waiting for the JSON to finish.
function addLoader() {
    $('body').append('<div id="loadingDiv" style="width:300px;margin:auto;"><img src="img/loading-50.gif" alt="movie-reel-loading"></div>');
    $(window).on('load', function () {
        setTimeout(removeLoader, 1500); //wait for page load PLUS two seconds.
    });
    //This displays that the page is loading at the bottom of the page.
    function removeLoader() {
        $("#loadingDiv").fadeOut(200, function () {
            // fadeOut complete.
            $("#loadingDiv").remove(); //makes page more lightweight
            $("#myForm").css('display','block');
        });
    }
}



$("#addMovie").click(function() {

//Check to make sure the form fields are all filled in
    if($("#movieTitle").val()=="" || $("#movieGenre").val()=="" || $("#moviePlot").val()=="" || $("#movieActors").val()=="")
    {
        swal('Unable To Submit Request','All fields are required', 'warning');
    }
    else {
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
            "actors": $("#movieActors").val()
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
            //alert('Congratulations, the movie "' + $("#movieTitle").val() + '" has been added to the database.');
            swal('Movie Added','Congratulations, the movie "' + $("#movieTitle").val() + '" has been added to the database.', 'success');
            $("#movieTitle").val("");
            $("#movieGenre").val("");
            $("#moviePlot").val("");
            $("#movieActors").val("");
        }, 1500);

    }


});

function editItem(movieId, movieTitle, movieGenre, moviePlot, movieActors)
{

    $("#editMovie").css('display', 'inline-block');
    $("#editMovieCancel").css('display', 'inline-block');
    $("#addMovie").css('display', 'none');
    //alert('i am here: ' + movieId + " - " + movieTitle + " - " + moviePlot + " - " + movieActors);

    $("#movieTitle").val(movieTitle);
    $("#movieGenre").val(movieGenre);
    $("#moviePlot").val(moviePlot);
    $("#movieActors").val(movieActors);
    $("#movieId").val(movieId);

}

$("#editMovie").click(function() {

    if($("#movieTitle").val()==="" || $("#movieGenre").val()==="" || $("#moviePlot").val()==="" || $("#movieActors").val()==="")
    {
        swal('Unable To Make Changes', 'All fields are required', 'warning');
    }
    else {
//send edit command / info to the api/db
        let editMovie = {
            "title": $("#movieTitle").val(),
            "genre": $("#movieGenre").val(),
            "plot": $("#moviePlot").val(),
            "actors": $("#movieActors").val()
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

$("#editMovieCancel").click(function() {
    resetFields();

});

function resetFields()
{
    $("#movieTitle").val("");
    $("#movieGenre").val("");
    $("#moviePlot").val("");
    $("#movieActors").val("");
    $("#movieId").val("");

    $("#editMovie").css('display', 'none');
    $("#editMovieCancel").css('display', 'none');
    $("#addMovie").css('display', 'inline-block');
}

function deleteItem(movieId, movieTitle)
{

    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this movie!",
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
                    //  alert('Congratulations, the movie "' +movieTitle + '" has been deleted.');
                    swal("Poof! Your movie listing has been deleted!", {
                        icon: "success",
                    });

                }, 1500);



            } else {
                swal("Your movie listing is safe!");
            }
        });






}

//Trying to add alert box to the DELETE with the code below
//https://sweetalert.js.org/guides/
//
// swal({
//     title: "Are you sure?",
//     text: "Once deleted, you will not be able to recover this imaginary file!",
//     icon: "warning",
//     buttons: true,
//     dangerMode: true,
// })
//     .then((willDelete) => {
//         if (willDelete) {
//             swal("Poof! Your movie listing has been deleted!", {
//                 icon: "success",
//             });
//         } else {
//             swal("Your movie listing is safe!");
//         }
//     });



$("#btnSortAZ").click(function() {
    fillMovieList(1);
});

$("#btnSortZA").click(function() {
    fillMovieList(2);
});


$("#btnSearch").click(function() {
    fillMovieList(0,$(txtSearch).val());
});

