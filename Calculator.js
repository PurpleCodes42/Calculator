let currentDisplayValue = "";
displayValues = new Array;
calculations = new Array;
calculationDone = false;
pointSet = false;

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

const pointButton = document.querySelector("#point");
pointButton.addEventListener(
    "click", 
    function() {
        setNumbers(".");
    }
);

/* put event listeners on keys */

window.addEventListener('keydown', testAlert);

/* put things in display */

function setNumbers(a){
    if (a == "." && pointSet){
        return;
    }
    else {
    currentDisplayValue += a;
    line.textContent = line.textContent + a;
    }
    if (a == ".") pointSet = true;
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
    else if (calculationDone){
        window.alert("Please clear the display first!")
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
    calculationDone = true;
}

/* clear last value */

function clearValue(){
    if (calculationDone) {
        window.alert("Please clear the display first!")
    }
    else {
    line.textContent = line.textContent.slice(0, line.textContent.length-1);
    currentDisplayValue = currentDisplayValue.slice(0, currentDisplayValue.length-1);
    }
}

/* clear display */

function clearDisplay(){
    line.textContent = "";
    currentDisplayValue = "";
    calculations = [];
    displayValues = [];
    pointSet = false;
    calculationDone = false;
}

/* keyboard support */

function testAlert() {
    numberArray = [12, 33, 34, 35, 36, 37, 38, 39, 
        40, 45, 48, 49, 50, 51, 52, 53, 54, 55, 56, 
        57, 8, 13, 46, 190, 46, 188, 101, 107, 111, 
        171, 173, 109, 106, 188];      
    key = window.event.keyCode;
    console.log(key);
    for (let i = 0; i<= numberArray.length-1; i++){
        if (numberArray[i] == key) {
            if (key == 48 || key == 45) setNumbers(0);
            else if (key == 48 || key == 45) setNumbers(0);
            else if (key == 49 || key == 35) setNumbers(1);
            else if (key == 50 || key == 40) setNumbers(2);
            else if (key == 51 || key == 34) setNumbers(3);
            else if (key == 52 || key == 37) setNumbers(4);
            else if (key == 53 || key == 12) setNumbers(5);
            else if (key == 54 || key == 39) setNumbers(6);
            else if (key == 55 || key == 36) setNumbers(7);
            else if (key == 56 || key == 38) setNumbers(8);
            else if (key == 57 || key == 33) setNumbers(9);
            else if (key == 190 || key == 46) setNumbers(".");
            else if (key == 107 || key == 171) setCalc("plus");
            else if (key == 173 || key == 109) setCalc("minu");
            else if (key == 111) setCalc("divi");  
            else if (key == 106 || key == 188) setCalc("mult");  
            else if (key == 13) displayResult();     
            else if (key == 8) clearValue();
        }
    }    
}


/* little helpers */

/* array for calculating the result */

function searchSpecificCalc(calcu){
    for (let i = 1; i < displayValues.length; i++){
        if (displayValues[i] == calcu){
            result = operate(parseFloat(displayValues[i-1]), parseFloat(displayValues[i+1]), displayValues[i]);
            displayValues.splice(i-1,3,result);
            i = i - 1; 
        }
    }   
}

/* calculations */

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

/*rounding by 1 decimal */

Math.roundBy = function (decimalPlaces, n) {
    var scale = Math.pow(10, decimalPlaces);
    return Math.round(scale * n) / scale;
};