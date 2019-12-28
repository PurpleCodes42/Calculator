let currentDisplayValue = "";
displayValues = new Array;
calculations = new Array;

/* put event listeners on numbers*/

const numberButtons = document.querySelector("#numbers").children;

for (let i=0; i<numberButtons.length; i++){
    numberButtons[i].addEventListener(
        "click", 
        function(){
        setNumbers(numberButtons[i].id);
        }
    );
}

/* put event listeners on calculation buttons*/

const calcButtons = document.querySelector("#calcs").children;

for (let i=0; i<calcButtons.length; i++){
    calcButtons[i].addEventListener(
        "click", 
        function(){
        setCalc(calcButtons[i].id);
    });
}


/* put event listeners on other buttons */

const resultButton = document.querySelector("#result");
resultButton.addEventListener("click", displayResult);

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clearDisplay);

/*
function getLine() {
    return line = document.getElementById("#line").textContent;
}
*/

/* display in line */

function setCalc(a){
    calculations.push(a);
    displayValues.push(currentDisplayValue);
    currentDisplayValue = "";
    switch (a){
        case "plus": 
            a = " + ";
            break;
        case "minu": 
            a = " - ";
            break;
        case "divi": 
            a = " : ";
            break;
        case "mult": 
            a = " x ";
            break;
    }
    line.textContent = line.textContent + a;
}

function setNumbers(a){
  currentDisplayValue += a;
  line.textContent = line.textContent + a;
}

function displayResult() {
    displayValues.push(currentDisplayValue);
    let result = 0;
    for (let i = 1; i < displayValues.length; i++){
        console.log(calculations);
        console.log(displayValues);
        console.log(calculations[i-1]);
        console.log(displayValues[i-1]);
        console.log(displayValues[i]);
        switch (calculations[i-1]){
            case "plus" : 
                result = displayValues[i-1] + displayValues[i];
                break;
            case "minu" : 
                result = displayValues[i-1] - displayValues[i];
                break;
            case "mult" : 
                result = displayValues[i-1] * displayValues[i];
                break;
            case "divi" : 
                result = displayValues[i-1] / displayValues[i];
                break;
        }
    }
    line.textContent = line.textContent + " = " + result;
}

function operate(a, b, calcu){
    if (calcu == plus){
        return a + b;
    }
    if (calcu == minu){
        return a - b
    }
    if (calcu == divi){
        return a/b;
    }
    if (calcu == multi){
        return a*b;
    }
}

function clearDisplay(){
    line.textContent = "";
    currentDisplayValue = "";
    calculations = [];
    displayValues = [];
}

/*
container.style.gridTemplateColumns = `repeat(4, 1fr)`;
container.style.gridTemplateRows = `repeat(4, 1fr)`;
*/