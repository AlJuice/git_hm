"use strict";

devisionNumbers(100)
function devisionNumbers(maxValue){
    for (let number = 0; number <= maxValue; number++) {
        if (number % 5 ==0 && number % 3 ==0 ){
            console.log(`Число ${number} делится на 3 и на 5`)
        }
        else if (number % 3 == 0){
            console.log(`Число ${number} делится на 3`)
        }
        else if (number % 5 == 0){
            console.log(`Число ${number} делится на 5`)
        }    
    }
};



