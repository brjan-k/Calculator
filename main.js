// JavaScript Document
let runningTotal = 0;
let buffer = "0";
let previousOperator;
const screen = document.querySelector(".ans-screen");

document
.querySelector(".calc-buttons")
.addEventListener("click", function(event) {
   
    buttonClick(event.target.innerText);
    rerender();
});

function buttonClick(value) {
    if(isNaN(parseInt(value))) {
        handleSymbol(value);

    } else {
        
        handleNumber(value);
    }
}

function handleNumber(value) {
    if(buffer === "0"){
        buffer = value;
    } else {
        buffer += value;
    }
  
}

function handleSymbol(value){
    switch(value) {
        case "Clr" :
            buffer = "0" ;
            runningTotal = 0;
            previousOperator = null;
         
            break;

        case "=":
            if (previousOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = " " + runningTotal;
            runningTotal = 0;
        
            break;
        case "Del":
            if (buffer.length === 1){
                buffer = "0";

            }else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
           
            break;
        default:
            handleMath(value);
            break;
    }
}

function handleMath(value){
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0){
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
      
    }
    previousOperator = value;

    buffer = "0";
}

function flushOperation(intBuffer){
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "-") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "x") {
        runningTotal *= intBuffer;
    }else {
        if (intBuffer !== 0){
             runningTotal /= intBuffer;
        } else {
            
        }
    }
}
function rerender(){
    screen.innerText = buffer;
}