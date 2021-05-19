addLoader();

fetch("https://turquoise-youthful-king.glitch.me/movies")
    .then(resp => resp.json())
    .then(data => console.log(data));

let getOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
};

// const ourMovies = () => {
    fetch("https://turquoise-youthful-king.glitch.me/movies")
        .then(resp => resp.json())
        .then(movies => {
            let htmlStr = "";
            for (let movie of movies) {
                htmlStr += `<h1>${movie.title}</h1><p>${movie.plot}</p><br><p>${movie.actors}</p>`;
            }
            $("#container").html(htmlStr);
        });
// }

fetch("https://turquoise-youthful-king.glitch.me/movies")
    .then(resp => resp.json())
    .then(movie => console.log(movie));

//This function displays that the page is loading while waiting for the JSON to finish.
function addLoader() {
    $('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
    $(window).on('load', function () {
        setTimeout(removeLoader, 1500); //wait for page load PLUS two seconds.
    });
    //This displays that the page is loading at the bottom of the page.
    function removeLoader() {
        $("#loadingDiv").fadeOut(200, function () {
            // fadeOut complete. Remove the loading div
            $("#loadingDiv").remove(); //makes page more lightweight
        });
    }
}

let newMovie = {
    "title": $("#movieTitle").val(),
    "plot": "This is a plot",
    "actors": "Actor #1, Actor #2"
};

let postOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMovie)
}

$("#addMovie").click(function() {
    fetch("https://turquoise-youthful-king.glitch.me/movies", postOptions)
        .then(resp => resp.json())
        .then(movies => movies);
    console.log($("#movieTitle").val())
});

let deleteOptions = {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    }
};

$("#deleteMovie").click(function(){
    fetch("https://turquoise-youthful-king.glitch.me/movies/6", deleteOptions)
        .then(resp => resp.json())
        .then(movies => console.log(movies));
});