
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
        screen2.textContent = "=";
        wrapper.appendChild(screen2)      
    }

}

function addText(e) {    
    display.lastChild.firstChild.textContent += e.target.textContent;      
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
const operation = {
    'x': (arg1, arg2) => arg1*arg2,
    '÷': (arg1, arg2) => arg1/arg2,
    '-': (arg1, arg2) => arg1-arg2,
    '+': (arg1, arg2) => arg1+arg2,    
}


let str = '';
let userInput = 0;
let num1;
let num2;
let newUserInput;
let startIndex;
let endIndex;
/* function getArrayFromInput(e) {
    str += e.target.textContent;
}
 */


console.log(str)



/* Object.keys(operation).forEach(key => {
    while (userInput.includes(key)) {
        getIndex(key)
        //console.log(operation[key])
        console.log(num1)
        console.log(num2)
        startIndex = userInput.indexOf(num1)
        endIndex = userInput.indexOf(num2)
        console.log(compute(num1, num2, operation[key]))
        userInput.splice(startIndex, 3, compute(num1, num2, operation[key]))
        
        console.log(userInput)
    }
})

function getIndex(ope) {
    num1 = userInput[userInput.indexOf(ope) - 1];
    num2 = userInput[userInput.indexOf(ope) + 1]; 
}

function merge(first, second, comp) {
    userInput
}

function compute(n1, n2, func) {
    return func(n1,n2)
} */




