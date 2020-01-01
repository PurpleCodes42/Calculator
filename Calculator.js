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

const clearLastValue = document.querySelector("#back");
clearLastValue.addEventListener("click", clearValue);

/* put numbers in display */

function setNumbers(a){
    currentDisplayValue += a;
    line.textContent = line.textContent + a;
  }

/* display calculation*/

function setCalc(a){
    displayValues.push(currentDisplayValue);
    if (displayValues[displayValues.length-1] == ""){
        window.alert("Please enter a number first!");
        clearDisplay();
    }
    else {
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
}

/* calculate and display result */

function displayResult() {
    displayValues.push(currentDisplayValue);
    if (displayValues[displayValues.length-1] == ""){
        window.alert("Please complete the calculation!");
        displayValues.pop();
    }
    else {
    searchSpecificCalc(" x ");
    searchSpecificCalc(" : ");
    searchSpecificCalc(" + ");
    searchSpecificCalc(" - ");
        if (isNaN(displayValues[0])) {
            displayValues[0] = "Impossible operation"; 
        }
        else {
            displayValues[0] = Math.roundBy(1, displayValues[0]);
        }
        line.textContent = line.textContent + " = " + displayValues[0];   
    }
}

/* clear last value */

function clearValue(){
    line.textContent = line.textContent.slice(0, line.textContent.length-1);
    currentDisplayValue = currentDisplayValue.slice(0, currentDisplayValue.length-1);
}


/* clear display */

function clearDisplay(){
    line.textContent = "";
    currentDisplayValue = "";
    calculations = [];
    displayValues = [];
}

/* little helpers */

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
        if (b == 0){
            window.alert("Never divide by 0!");
        }
        else {
            return a/b;
        }
    }
    if (calcu == " x "){
        return a*b;
    }
}

Math.roundBy = function (decimalPlaces, n) {
    var scale = Math.pow(10, decimalPlaces);
    return Math.round(scale * n) / scale;
};