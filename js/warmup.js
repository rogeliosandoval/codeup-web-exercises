// function fizzBuzz(num) {
//     for(var i = 1; i <= num; i++) {
//         if( i % 15 === 0) {
//             console.log("fizzbuzz")
//         }
//         else if(i % 15 === 0) {
//             console.log("fizz")
//         }
//         else if(i % 3 === 0) {
//             console.log("buzz")
//         }
//         else {
//             console.log(i);
//         }
//     }
// }

//
// fizzBuzz(30)
//
// console.log(fizzBuzz());
//
// function addTo7(num) {
//     num = 5 + 2
//     return num;
// }
//
// console.log(addTo7());

//Below is all personal practice

function takesInANumberAndReturnsThePastNumberMultipliedByFive (num) {
    if (typeof num === "number") {
        return num * 5;
    }
    return 0
}

console.log(takesInANumberAndReturnsThePastNumberMultipliedByFive(3))

function numberPlusFive (num) {
    return num + 5;
}

console.log(numberPlusFive(5));

function numberPlusSeven(num) {
    return num + 7;
}

function myNameInCaps(name){
    return name.toUpperCase();
}

function myNameInLowerCase(name){
    return name.toLowerCase();
}

function sayHello(x){
    return "Hello, " + x;
}

console.log(numberPlusSeven(5));
console.log(myNameInCaps("Roger"));
console.log(myNameInLowerCase("Bryan"));
console.log(sayHello("Bill"));

console.log("Hello my name is Roger!");

var colors = ['red', 'blue', 'green', 'yellow', 'black'];

let arrayLength = colors.length

for(let i = 0; i < arrayLength; i++) {
    if (colors[i] === 'blue') {
        colors[i] = "I'm blue if I was green I would die!";
    } else if (colors[i] === 'red'){
        colors[i] = "Red like an apple!";
    } else if (colors[i] === 'green'){
        colors[i] = "Green like the grass!";
    } else if (colors[i] === 'black'){
        colors[i] = "Black like pepper!";
    }
    console.log(colors[i]);
}

var myString = "Hello this is my string and my name is ";
var myName = "Roger"

console.log(myString + myName + ".");

function toLowerCase(x) {
    return x.toLowerCase();
}
console.log(toLowerCase("I WANT THIS LOWER CASED PLEASE"));
console.log(toLowerCase(myName));
console.log(myString + myNameInCaps("Roger") + ".");
