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

let displayValue = 0;

/* put event listeners on numbers*/

const numberButtons = document.querySelector("#numbers").children;
console.log(numberButtons);

for (let i=0; i<numberButtons.length; i++){
    numberButtons[i].addEventListener(
        "click", 
        function(){
        setNumbers(numberButtons[i].id);
        }
    );
}

function getLine() {
    return line = document.getElementById("#line").textContent;
}

function setNumbers(a){
  displayValue = line.textContent + a;
  line.textContent = displayValue;
}
/*
container.style.gridTemplateColumns = `repeat(4, 1fr)`;
container.style.gridTemplateRows = `repeat(4, 1fr)`;
*/