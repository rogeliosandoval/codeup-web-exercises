"use strict";

// My attempt at the exercise

// var oddNumber = prompt("Enter an odd number between 1 and 50!");
// for(var i = 1; i <= 50; i++) {
//     if (oddNumber % 2 === 0) {
//         console.log("Here is an odd number " + oddNumber);
//     }
//     console.log(oddNumber);
// }

var oddNumber = 0;

while (oddNumber !== "You're never going to come up with this") {
    oddNumber = parseFloat(prompt("Enter an odd number between 1 and 50!"));
    if (oddNumber % 2 !== 1 || (oddNumber < 1 && oddNumber > 50)) {
        break;
    }

    for (var i = 1; i < 50; i += 2) {
        if (i === oddNumber) {
            console.log("Yikes! Skipping a number: " + oddNumber);
            continue;
        }
        console.log(i);
    }
}