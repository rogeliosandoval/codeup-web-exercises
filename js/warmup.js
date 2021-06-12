function fizzBuzz(num) {
    for(var i = 1; i <= num; i++) {
        if( i % 15 === 0) {
            console.log("fizzbuzz")
        }
        else if(i % 15 === 0) {
            console.log("fizz")
        }
        else if(i % 3 === 0) {
            console.log("buzz")
        }
        else {
            console.log(i);
        }
    }
}


fizzBuzz(30)

console.log(fizzBuzz());

function addTo7(num) {
    num = 5 + 2
    return num;
}

console.log(addTo7());