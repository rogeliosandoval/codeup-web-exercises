fetch("https://stingy-radical-tamarillo.glitch.me/books")
    .then(resp => resp.json())
    .then(data => console.log(data));

let getOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
};

    fetch("https://stingy-radical-tamarillo.glitch.me/books")
        .then(resp => resp.json())
        .then(books => {
            let htmlStr = "";
            for(let book of books) {
                htmlStr += `<h1>${book.title}</h1><p>by: ${book.author.firstName} ${book.author.lastName}</p>`;
            }
            $("#container").html(htmlStr);
        });


fetch("https://stingy-radical-tamarillo.glitch.me/books/1")
    .then(resp => resp.json())
    .then(book => console.log(book));

fetch("https://stingy-radical-tamarillo.glitch.me/books")
    .then(resp => resp.json())
    .then(book => console.log(book));

let newBook = {
    "title": "I'm Lost",
    "author": {
        "firstName": "Roger",
        "lastName": "Sandoval"
    }
};

let postOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBook)
};

$("#btn").click(function(){
    fetch("https://stingy-radical-tamarillo.glitch.me/books", postOptions)
        .then(resp => resp.json())
        .then(book => console.log(book));
});

// let deleteOptions = {
//     method: 'DELETE',
//     headers: {
//         'Content-Type': 'application/json',
//     }
// };
//
// fetch("https://stingy-radical-tamarillo.glitch.me/books/5", deleteOptions)
//     .then(resp => resp.json())
//     .then(book => console.log(book));