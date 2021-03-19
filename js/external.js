"use strict";
// console.log("Hello from inline JavaScript");
// alert ("Welcome to my Website!");
// var favoriteColor = prompt("What is your favorite color?");
// console.log(favoriteColor + " is my favorite color too!");

// var lmrental = Math.ceil(parseFloat(prompt("How many are you renting the little mermaid?")));
// var bbrental = Math.ceil(parseFloat(prompt("How many are you renting brother bear?")));
// var hercrental = Math.ceil(parseFloat(prompt("How many are you renting Hercules?")));
//
// var rentalRate = parseFloat(prompt("How much is it to rent a movie for one day?"));
//
// var rentalTotal = (lmrental + bbrental + hercrental) * rentalRate;
//
// alert("You're final total is : $" + rentalTotal + ". Have a great day!");



// var mermaid = prompt("How many days would you like to rent the little mermaid?");
// var brotherbear = prompt("How many days would you like to rent brother bear?");
// var hercules = prompt("How many days would you like to rent Hercules?");
// var pricePerDay = 3;
// var totalDue = (mermaid * pricePerDay) + (brotherbear * pricePerDay) + (hercules * pricePerDay);
// alert(totalDue + " this is your total");

var googleRate = parseFloat(prompt("How much does Google pay per hour?"));
var googleHours = parseFloat(prompt("How many hours did you work for Google this week?"));

var amazonRate = parseFloat(prompt("How much does Amazon pay per hour?"));
var amazonHours = parseFloat(prompt("How many hours did you work for Amazon this week?"));

var fbRate = parseFloat(prompt("How much does Facebook pay per hour?"));
var fbHours = parseFloat(prompt("How many hours did you work for Facebook this week?"));

alert("WOW you got paid &" + ((googleHours * googleRate)+(amazonHours * amazonRate)+(fbRate * fbHours)).toFixed(2) + ". Wicked work, my dude!");

// alert("Let us know how many hours you have worked");
// var google = prompt("How many hours at Google did you work?");
// var amazon = prompt("How many hours at Amazon did you work?");
// var facebook = prompt("How many hours did you work at facebook");
// var totalCheck = (google * 400) + (amazon *  380) (facebook * 350);
// alert(totalCheck + " this is your check for the week");

// alert("You can only enroll in the class if the class is not full and it doesn't conflict with your schedule");
//
// var classIsFull = confirm("Is the class full?");
// console.log(classIsFull);
//
// var schedule = confirm("Does it conflict with your schedule?");
// console.log(schedule);
//
// { if (classIsFull || schedule)
//     {
//         alert("you cannot register")
//     } else {
//         alert("you are able to register")
//     }
// }

var isOfferValid = confirm("Are we still running that promo on fish sticks?");
var isPremiumMember = confirm("Does the customer have their Randall's card");
var amountBought = parseFloat(prompt("How many bags of fish sticks are they buying?"));

alert("Customer qualifies for promo: " + (((isPremiumMember || amountBought  >=2) && isOfferValid) && amountBought >= 1) + ".");