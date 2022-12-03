
//calculator screens
const display = document.querySelector('.display');
const bigScreen = document.createElement('div');
bigScreen.classList.add('big-screen')       
generateScreens(bigScreen)

//If not using flex column reverse + shrink: 0; this has to be included for the scroll bar to stay at the bottom at all time: display.scrollTop = display.scrollHeight;
//use either .children or .childNodes.. hasChildNodes() is very risky since it also counts text as child nodes (also don.t use things like hasChildNodes.length - only the previous mentioned functions have length)

function generateScreens(wrapper) {
    if (!wrapper.hasChildNodes()) {
        display.appendChild(wrapper)

        const screen1 = document.createElement('p');
        screen1.classList.add('input-screen')
        screen1.textContent = this.textContent;
        wrapper.appendChild(screen1)

        const screen2 = document.createElement('p');
        screen2.classList.add('result-screen')
        wrapper.appendChild(screen2)      
    }

}

let regexOpe = /[\×\÷\−\+]/g
let minusCounter = 0;

function displayOpe(e) {
    if (minusCounter === 1 && e.target.textContent === "−" || minusCounter === 1 && e.target.textContent === "+") {
        display.lastChild.firstChild.textContent += `${e.target.textContent}`;
        minusCounter = 0; 
    } else if (minusCounter === 0){
    display.lastChild.firstChild.textContent += ` ${e.target.textContent} `;
    minusCounter = 1; 
    }
}

function addText(e) {
    if (e.target.textContent.match(regexOpe)) {
        displayOpe(e);
        
    } else if (+e.target.textContent){  
        display.lastChild.firstChild.textContent += e.target.textContent;
        minusCounter = 0;
    }       
    display.lastChild.firstChild.scrollLeft = display.lastChild.firstChild.scrollWidth
}

//calculator buttons
const inputs = document.querySelectorAll('.inputs');
const math = document.querySelectorAll('.math')

math.forEach((func) => {
    func.addEventListener('click', e => addText(e))
})
inputs.forEach(input => {
    input.addEventListener('click', e => addText(e))
})


//operate "=" button 
const enter = document.querySelector('.equal');
let order = -1;

enter.addEventListener('click', (e) => {
    order -= 1;
    const newScreen = document.createElement('div');
    newScreen.classList.add('big-screen')
    generateScreens(newScreen)
    display.lastChild.style.cssText = `order: ${order}`;
    
})

//+ = 0; each time = 1; number = 0. For catching errors later

//Math operations
const operators = {
    '.': (arg1, arg2) => Number(arg1 + "." + arg2),
    '×': (arg1, arg2) => arg1*arg2,
    '÷': (arg1, arg2) => arg1/arg2,
    '−': (arg1, arg2) => arg1-arg2,
    '+': (arg1, arg2) => Number(arg1)+Number(arg2),    
}

let str = '';
let userInput;
let num1;
let num2;
let startIndex;
let regexNegPos = /(\+|\−){3,}/g
let regexTwoOpe = /(\+|\−|\×|\÷){2}/g
let mulOpe;
let negOpe;

//This is to take input from pressing enter. Alternative to getting inputs from clicks, which we will use in this case since it's more responsive in delivering result
/* let num = 0;
function computeWithEnter() {
    const screen = document.getElementsByClassName('input-screen')[num]
    console.log(screen)
    num += 1;
} */
let inputCounter = 0;
function getInput(e) {
    if (+e.target.textContent) {
        str += e.target.textContent;
        inputCounter = 0;
    } else if (inputCounter === 1 && e.target.textContent === "−") {
        str += "-"
        inputCounter = 0;
    } else if (inputCounter === 1 && e.target.textContent === "+") {
        str += e.target.textContent
        inputCounter = 0;
    } else {
        str += " " + e.target.textContent + " "
        inputCounter = 1;
    } 
    userInput = str.split(" ");
    console.log(str)
}   

function getNums(ope) {
        num1 = userInput[userInput.indexOf(ope) - 1]
        num2 = userInput[userInput.indexOf(ope) + 1]
}

function compute(n1, n2, func) {
    return func(n1,n2)
}

function computeSequence(e) {
    getInput(e);
    Object.keys(operators).forEach(key => {
        while (userInput.includes(key)) {   
            getNums(key)
            startIndex = userInput.indexOf(num1);
            userInput.splice(startIndex, 3, compute(Number(num1), Number(num2), operators[key]));
                
        }
    })
    console.log(userInput)
    /* mulOpe = str.match(regexNegPos)
        if (mulOpe) {         
        str = str.replace(mulOpe, "+") 
        } */
    display.lastChild.lastChild.textContent = `= ${userInput} `
}

math.forEach((func) => {
    func.addEventListener('click', e => computeSequence(e))
})
inputs.forEach(input => {
    input.addEventListener('click', e => computeSequence(e))
})






