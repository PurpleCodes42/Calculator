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
    displayValues.push(a);
    line.textContent = line.textContent + a;
}

function setNumbers(a){
  currentDisplayValue += a;
  line.textContent = line.textContent + a;
}

function displayResult() {
    displayValues.push(currentDisplayValue);
    searchSpecificCalc(" x ");
    searchSpecificCalc(" : ");
    searchSpecificCalc(" + ");
    searchSpecificCalc(" - ");
    line.textContent = line.textContent + " = " + displayValues[0];
}

function searchSpecificCalc(calcu){
    for (let i = 1; i < displayValues.length; i++){
        if (displayValues[i] == calcu){
        result = operate(parseFloat(displayValues[i-1]), parseFloat(displayValues[i+1]), displayValues[i]);
        displayValues.splice(i-1,3,result);
        i = i - 1;
        }
    }   
}

function operate(a, b, calcu){
    if (calcu == " + "){
        return a + b;
    }
    if (calcu == " - "){
        return a - b
    }
    if (calcu == " : "){
        return a/b;
    }
    if (calcu == " x "){
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