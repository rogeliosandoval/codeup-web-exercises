var plusTwo = 2;
while (plusTwo <= 65536) {
    console.log(plusTwo)
    plusTwo = plusTwo + plusTwo
}

var allCones = Math.floor(Math.random() * 50) + 50;
console.log("You start with " + allCones + " ice cream cones.");

do {
    var soldCones = Math.floor(Math.random() * 5) + 1;
    console.log("You have " + allCones + " ice cream cones.");
    if(allCones >= soldCones) {
        console.log("You sold " + soldCones + " cones!");
        allCones = allCones - soldCones;
    }
    else {
        console.log("You tried to sell " + soldCones + ". \r\n There are only " + allCones + " ice cream cones left.")
    }
}while(allCones > 0);