
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

        //future reference for input box style
        /* const screenTest = document.createElement('input')
        screenTest.classList.add('input-screen')
        screenTest.textContent = this.textContent;
        document.getElementsByTagName('input').type = 'text'
        wrapper.appendChild(screenTest) */
    }

}

//Handle how numbers display on calculator screen

let regexOpe = /(\×|\÷|\−|\-|\+)/g
let regexUnique = /(\.|0|\d|√|\^)|(\w)/gi
let regexUnique2 = /(0|\d)/gi 
let ope2Counter = 0;
let num2Counter = 0;

function addText(e) {
    
    if (e.target.textContent.match(regexOpe) && ope2Counter === 0) {
        display.lastChild.firstChild.textContent += " " + e.target.textContent;
        ope2Counter = 1;
    } else if (e.target.textContent.match(regexOpe) && ope2Counter === 1) {
        display.lastChild.firstChild.textContent += e.target.textContent;
        num2Counter = 1;
    } else if (e.target.textContent.match(regexUnique) && ope2Counter === 1 && num2Counter === 1) {
        display.lastChild.firstChild.textContent += " " + e.target.textContent;
        ope2Counter = 0;
        num2Counter = 0
    } else if (e.target.textContent.match(regexUnique) && num2Counter === 0 && ope2Counter === 0) {
        display.lastChild.firstChild.textContent += e.target.textContent;
    } else if (e.target.textContent.match(regexUnique) && num2Counter === 0 && ope2Counter === 1) {
        display.lastChild.firstChild.textContent += " " + e.target.textContent;
        ope2Counter = 0;
    } 
    
    display.lastChild.firstChild.scrollLeft = display.lastChild.firstChild.scrollWidth
}

//operate "=" button and Ans function
const enters = document.querySelectorAll('.equal');
let order = -1;
let n = 0;
let display2;
let regex = /[\s\S]*/g
let ans;

enters.forEach(enterBtn => enterBtn.addEventListener('click', enter))

/* addEventListener('click', (e) => {
    
    order -= 1;
    const newScreen = document.createElement('div');
    newScreen.classList.add('big-screen')
    generateScreens(newScreen)
    display.lastChild.style.cssText = `order: ${order}`;
    getAns()
    
    str = str.replace(regex,'')
    userInput = [0]
    display.lastChild.lastChild.textContent = `= 0`
    display.lastChild.firstChild.textContent = ""
    n += 1;
    dotCount = 0;
    ansCount = 0;
    sqrCount = 0;
    numCount = 0;
}) */
function enter() {
    order -= 1;
    const newScreen = document.createElement('div');
    newScreen.classList.add('big-screen')
    generateScreens(newScreen)
    display.lastChild.style.cssText = `order: ${order}`;
    getAns()
    
    str = str.replace(regex,'')
    userInput = [0]
    display.lastChild.lastChild.textContent = `= 0`
    display.lastChild.firstChild.textContent = ""
    n += 1;
    dotCount = 0;
    ansCount = 0;
    sqrCount = 0;
    numCount = 0;
}

let regAns = /(Ans)/gi

function getAns() {
    if (display.children.length >= 2) {
        
        if (display.children[n].lastChild) {
        ans = display.children[n].lastChild.textContent.split("=").filter(a => a !== "").join('');
        }        
    }
}
//Math operations
const operators = {
    //organize operators as their positions can cause errors without the use of "(" and ")"
    //'÷' before '×' for this type of case: 3 ÷ 3 ÷ 2 x 3 => if "x" is to be executed first, the result is 1/6 when it should be 1.5
    '÷-': (arg1, arg2) => arg1/(-arg2),
    '÷+': (arg1, arg2) => arg1/arg2,
    '÷': (arg1, arg2) => arg1/arg2,
    '×-': (arg1, arg2) => arg1*(-arg2),
    '×+': (arg1, arg2) => arg1*arg2,
    '×': (arg1, arg2) => arg1*arg2,
    //'-' before '+' for the case of : 4 - (-3) + 2 => if '+' is executed before '-', the result is 5 when it should be 9
    '-': (arg1, arg2) => arg1-arg2,
    '+': (arg1, arg2) => Number(arg1)+Number(arg2),
}


//Store each click inputs into string
let str = '';
let userInput;
let opeCounter = 0;
let numCounter = 0;

function getInput(e) {//making sure numbers and operators are separated 
    if (e.target.textContent.match(regexOpe) && opeCounter === 0) {
        str += " " + e.target.textContent;
        opeCounter = 1;
    } else if (e.target.textContent.match(regexOpe) && opeCounter === 1) {
        str += e.target.textContent;
        numCounter = 1;
    } else if (e.target.textContent.match(regexUnique) && numCounter === 1 && opeCounter === 1) {
        str += " " + e.target.textContent;
        opeCounter = 0;
        numCounter = 0
    } else if (e.target.textContent.match(regexUnique) && numCounter === 0 && opeCounter === 0) {
        str += e.target.textContent;
    } else if (e.target.textContent.match(regexUnique) && numCounter === 0 && opeCounter === 1) {
        str += " " + e.target.textContent;
        opeCounter = 0;
    }     
    userInput = str.split(" ").filter(char => char !== '');
    console.log(str)
    console.log("-----below is userinput")
    console.log(userInput)
    /* console.log(ans) */
}

//Fix edge cases of valid multiple operators in conjuntion with "+" and "-"
let regexPos = /(\+){1,}/g
let regexNeg = /(\−|\-){1,}/g
let regexMulDivPos = /^(\×|\÷)(\+){1,}/g
let regexMulDivNeg = /^(\×|\÷)(\−|\-){1,}/g

let regexDiv = /(\÷){1}/g
let regexMul = /(\×){1}/g
let regexMulDiv = /(\×){1}|(\÷){1}/g
let errorDiv = /(\÷){2,}/g
let errorMul = /(\×){2,}/g
let regexFirstPosNeg = /^(\-|\+|\−)+(×|\÷)+/g

let regexExpo = /(\^)/g

function fixInput() {

    for (let i = 0; i < userInput.length; i++) {

        
        if (userInput[i].match(regAns)) {
            userInput.splice(i, 1, `${ans}`)
        }
        if (userInput[i].match(regexExpo)) {
            
            let resArr = userInput[i].split('x')
            let expo = resArr[1].split('^')
            let resExpo = Math.pow(expo[0], expo[1])
            let result = resArr[0]*resExpo
            userInput.splice(i, 1, `${result}`)
        }

        if (userInput[i].split('').filter(ope => ope === "×").join('').match(errorMul) || userInput[i].split('').filter(ope => ope === "÷").join('').match(errorDiv)) {//case of having 2 or more "x" || "÷"
            const tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.textContent = "⚠️";
            const tooltipText = document.createElement('span');
            tooltipText.classList.add('tooltip-text');

            display.lastChild.lastChild.textContent = ""
            tooltipText.textContent = "Operators \"×\" and \"÷\" can't be placed next to each other";
            tooltip.appendChild(tooltipText);
            display.lastChild.lastChild.appendChild(tooltip)

        } else if (userInput[i].match(regexMulDiv)) {
            //case of "x" && "÷" co-existing in user inputs
            if (userInput[i].match(regexDiv) && userInput[i].match(regexMul)){
                const tooltip = document.createElement('div');
                tooltip.classList.add('tooltip');
                tooltip.textContent = "⚠️";
                const tooltipText = document.createElement('span');
                tooltipText.classList.add('tooltip-text');

                display.lastChild.lastChild.textContent = ""
                tooltipText.textContent = "One \"×\" and \"÷\" to rule them all!";
                tooltip.appendChild(tooltipText);
                display.lastChild.lastChild.appendChild(tooltip)
                
                break
            }
            //case of "+" || "-" being placed BEFORE "x" || "÷"
            else if (userInput[i].match(regexFirstPosNeg))
            {
                const tooltip = document.createElement('div');
                tooltip.classList.add('tooltip');
                tooltip.textContent = "⚠️";
                const tooltipText = document.createElement('span');
                tooltipText.classList.add('tooltip-text');

                display.lastChild.lastChild.textContent = ""
                tooltipText.textContent = "Can't place an operator before \"×\" or \"÷\"";
                tooltip.appendChild(tooltipText);
                display.lastChild.lastChild.appendChild(tooltip)
                       
            } 
        }
             
        if (userInput[i].match(regexMulDivPos) || userInput[i].match(regexMulDivNeg)) {//input is mixed with x or ÷ at the start
            let minus2 = userInput[i].split("").filter(ope => ope === "-" | ope === "−")
            if (userInput[i][0] === "×") {
                if (minus2.length % 2 === 0) {
                    userInput.splice(i, 1, "×+")
                } else {
                    userInput.splice(i, 1, "×-")
                }
            }      
            else if (userInput[i][0] === '÷') {
                if (minus2.length % 2 === 0) {
                    userInput.splice(i, 1, "÷+")
                } else {
                    userInput.splice(i, 1, "÷-")
                }
            }
        }
  
        if (!userInput[i].match(regexMulDiv)) {// input has a mix of + and -
            if (userInput[i].match(regexPos) && userInput[i].match(regexNeg)|| userInput[i].match(regexNeg)) { 
                let minus = userInput[i].split("").filter(ope => ope === "-" | ope === "−")
                
                if (minus.length % 2 === 0) {
                    userInput.splice(i, 1, "+")
                } else {
                    userInput.splice(i, 1, "-")
                }   
            } else if (userInput[i].match(regexPos) && !userInput[i].match(regexNeg)) {
                userInput.splice(i, 1, "+")
            }
        }
     
    } 
}



//Get 2 numbers for calculation purposes
let num1;
let num2;
let startIndex;

function getNums(ope) {
    if (userInput.indexOf(ope) === 0 && userInput[userInput.indexOf(ope) - 1] === undefined) {
        num1 = 0
        num2 = userInput[userInput.indexOf(ope) + 1]
        startIndex = userInput.indexOf(ope);
    } else if (userInput.join('').includes('√') && userInput[userInput.indexOf(ope) + 1]) {//num1 has sqr || num2 has sqr
        //userInput[userInput.indexOf(ope) - 1].includes('√') || userInput[userInput.indexOf(ope) + 1].includes('√')

        if (userInput[userInput.indexOf(ope) - 1].indexOf('√') - (userInput[userInput.indexOf(ope) - 1].length - 1) === 0 || userInput[userInput.indexOf(ope) + 1].indexOf('√') - (userInput[userInput.indexOf(ope) + 1].length - 1) === 0) { //Catch error for when sqr is at the end of one of these numbers
            
            function SqrError() {
                const tooltip = document.createElement('div');
                tooltip.classList.add('tooltip');
                tooltip.textContent = "⚠️";
                const tooltipText = document.createElement('span');
                tooltipText.classList.add('tooltip-text');
                
                display.lastChild.lastChild.textContent = ""
                tooltipText.textContent = `Radical cannot be empty!`;
                tooltip.appendChild(tooltipText);
                display.lastChild.lastChild.appendChild(tooltip)
            }
            return SqrError
        }
        
        if (userInput[userInput.indexOf(ope) - 1].includes('√') && !userInput[userInput.indexOf(ope) + 1].includes('√')) {//num1 has sqr but num2 doesn't

            if (userInput[userInput.indexOf(ope) - 1].indexOf('√') === 0) {
                num1 = Math.sqrt(userInput[userInput.indexOf(ope) - 1].split('√')[1])
            } else if (userInput[userInput.indexOf(ope) - 1].indexOf('√') > 0 && userInput[userInput.indexOf(ope) - 1].indexOf('√') < userInput[userInput.indexOf(ope) - 1].length - 1) {
                num1 = userInput[userInput.indexOf(ope) - 1].split('√')[0]*Math.sqrt(userInput[userInput.indexOf(ope) - 1].split('√')[1])
            }
            num2 = userInput[userInput.indexOf(ope) + 1]
            startIndex = userInput.indexOf(ope) - 1;

        } else if (!userInput[userInput.indexOf(ope) - 1].includes('√') && userInput[userInput.indexOf(ope) + 1].includes('√')) {//num2 has sqr, not num1
            if (userInput[userInput.indexOf(ope) + 1].indexOf('√') === 0) {//sqr at start of string
                num2 = Math.sqrt(userInput[userInput.indexOf(ope) + 1].split('√')[1])
            } else if (userInput[userInput.indexOf(ope) + 1].indexOf('√') > 0 && userInput[userInput.indexOf(ope) + 1].indexOf('√') < userInput[userInput.indexOf(ope) + 1].length - 1) {//sqr in middle of string
                num2 = userInput[userInput.indexOf(ope) + 1].split('√')[0]*Math.sqrt(userInput[userInput.indexOf(ope) + 1].split('√')[1])
            }
            num1 = num1 = userInput[userInput.indexOf(ope) - 1]
            startIndex = userInput.indexOf(ope) - 1;

        } else if (userInput[userInput.indexOf(ope) - 1].includes('√') && userInput[userInput.indexOf(ope) + 1].includes('√')) {//both have sqr

            if (userInput[userInput.indexOf(ope) - 1].indexOf('√') === 0 && userInput[userInput.indexOf(ope) + 1].indexOf('√') === 0) {//both sqr at start
                
                num1 = Math.sqrt(userInput[userInput.indexOf(ope) - 1].split('√')[1])
                num2 = Math.sqrt(userInput[userInput.indexOf(ope) + 1].split('√')[1])

            } else if (userInput[userInput.indexOf(ope) - 1].indexOf('√') === 0 && userInput[userInput.indexOf(ope) + 1].indexOf('√') > 0 && userInput[userInput.indexOf(ope) + 1].indexOf('√') < userInput[userInput.indexOf(ope) + 1].length - 1) {//num 1 has at start but num2 has in the middle
                
                num1 = Math.sqrt(userInput[userInput.indexOf(ope) - 1].split('√')[1])
                num2 = userInput[userInput.indexOf(ope) + 1].split('√')[0]*Math.sqrt(userInput[userInput.indexOf(ope) + 1].split('√')[1])

            } else if (userInput[userInput.indexOf(ope) + 1].indexOf('√') === 0 && userInput[userInput.indexOf(ope) - 1].indexOf('√') > 0 && userInput[userInput.indexOf(ope) - 1].indexOf('√') < userInput[userInput.indexOf(ope) - 1].length - 1){//num2 has at start but num1 has in the middle
                num1 = userInput[userInput.indexOf(ope) - 1].split('√')[0]*Math.sqrt(userInput[userInput.indexOf(ope) - 1].split('√')[1])
                num2 = Math.sqrt(userInput[userInput.indexOf(ope) + 1].split('√')[1])
                
            } else if (userInput[userInput.indexOf(ope) - 1].indexOf('√') > 0 && userInput[userInput.indexOf(ope) - 1].indexOf('√') < userInput[userInput.indexOf(ope) - 1].length - 1 && userInput[userInput.indexOf(ope) + 1].indexOf('√') > 0 && userInput[userInput.indexOf(ope) + 1].indexOf('√') < userInput[userInput.indexOf(ope) + 1].length - 1){//both in the middle
                num1 = userInput[userInput.indexOf(ope) - 1].split('√')[0]*Math.sqrt(userInput[userInput.indexOf(ope) - 1].split('√')[1])
                num2 = userInput[userInput.indexOf(ope) + 1].split('√')[0]*Math.sqrt(userInput[userInput.indexOf(ope) + 1].split('√')[1])
                
            }

        } 
        startIndex = userInput.indexOf(ope) - 1;
    } else {
        num1 = userInput[userInput.indexOf(ope) - 1]
        num2 = userInput[userInput.indexOf(ope) + 1]
        startIndex = userInput.indexOf(ope) - 1;
    }
}

function compute(n1, n2, func) {
    return func(n1,n2)
}

//Check input for suitable operators - calculate accordingly
function sequence() {

    if (userInput.length === 1 || userInput.length === 0) {
        display.lastChild.lastChild.textContent = ''
    }

    Object.keys(operators).forEach(key => {
        
        while (userInput.includes(key) && !userInput.includes(NaN)) { 
            getNums(key)  
            userInput.splice(startIndex, 3, compute(Number(num1), Number(num2), operators[key]));
            display.lastChild.lastChild.textContent = `= ${userInput}`
            catchError()
        }
    })
    
}

//Check for errors in calculations
function catchError() {
    
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = "⚠️";
    const tooltipText = document.createElement('span');
    tooltipText.classList.add('tooltip-text');
    let input = display.lastChild.firstChild.textContent;
    let result = display.lastChild.lastChild.textContent;
    if (result.includes('NaN') || num1 === undefined || num2 === undefined) {
        if (input[input.length - 1].match(regexOpe)) {
            display.lastChild.lastChild.textContent = ""
            tooltipText.textContent = "You need numbers on both sides of an operator";
            tooltip.appendChild(tooltipText);
            display.lastChild.lastChild.appendChild(tooltip)
        } else if (input.match(regAns) && ans === undefined) {
            display.lastChild.lastChild.textContent = ""
            tooltipText.textContent = "Answer is not yet defined";
            tooltip.appendChild(tooltipText);
            display.lastChild.lastChild.appendChild(tooltip)
        } else if (num1 === undefined || num2 === undefined){
            display.lastChild.lastChild.textContent = ""
            tooltipText.textContent = "Syntax Error!";
            tooltip.appendChild(tooltipText);
            display.lastChild.lastChild.appendChild(tooltip)
        } else if (input[input.length - 1].match(regexDot)) {
            display.lastChild.lastChild.textContent = ""
            tooltipText.textContent = `You need numbers on at least one side of the \'.\' symbol`;
            tooltip.appendChild(tooltipText);
            display.lastChild.lastChild.appendChild(tooltip)
        } 
    } 
}

function computeSequence(e) {
    getInput(e);
    fixInput();
    sequence();
}    
    

//delete function
const del = document.querySelector('.delete')
del.addEventListener('click', deleteStr)

let regexSpe = /(\.|\√)/g
let regexSqr = /(\√)/g
let regexDot = /(\.)/g

function deleteStr() {
    
    let test = display.lastChild.firstChild.textContent;
    
    //Go through the end of the string to see what type of data it is. Iterate one by one.
    if (test.length >= 3 && test[test.length - 1].match("s")) {
        
        if (test.length === 3) {
            
            test = test.substring(0, test.length - 3)
            str = str.substring(0, str.length - 3)
            display.lastChild.firstChild.textContent = test;

            dotCount = 0;
            ansCount = 0;
            sqrCount = 0;
            numCount = 0;
        } else if (test[test.length - 4] === " ") {
            test = test.substring(0, test.length - 4)
            str = str.substring(0, str.length - 4)
            display.lastChild.firstChild.textContent = test;
            
            ope2Counter = 1;
            num2Counter = 0;
            opeCounter = 1;
            numCounter = 0;

            dotCount = 0;
            ansCount = 0;
            sqrCount = 0;
            numCount = 0;
        }
    } else if (test[test.length - 1].match(regexUnique2) && test[test.length - 2] === " ") {
        test = test.substring(0, test.length - 2)
        display.lastChild.firstChild.textContent = test;
        str = str.substring(0, str.length - 2)

        ope2Counter = 1;
        num2Counter = 0;
        opeCounter = 1;
        numCounter = 0;
    } else if (test[test.length - 1].match(regexDot) && test[test.length - 2] === " ") {
        test = test.substring(0, test.length - 2)
        display.lastChild.firstChild.textContent = test;
        str = str.substring(0, str.length - 2);

        ope2Counter = 1;
        num2Counter = 0;
        opeCounter = 1;
        numCounter = 0;
        
        dotCount = 0;
        ansCount = 0;
    } else if (test[test.length - 1].match(regexSqr) && test[test.length - 2] === " ") {
        test = test.substring(0, test.length - 2)
        display.lastChild.firstChild.textContent = test;
        str = str.substring(0, str.length - 2);

        ope2Counter = 1;
        num2Counter = 0;
        opeCounter = 1;
        numCounter = 0;
        
        sqrCount = 0;
        ansCount = 0;
    } else if (test[test.length - 1].match(regexOpe) && test[test.length - 2] === " ") {
        test = test.substring(0, test.length - 2)
        display.lastChild.firstChild.textContent = test;
        str = str.substring(0, str.length - 2)

        ope2Counter = 0;
        num2Counter = 0;
        opeCounter = 0;
        numCounter = 0;
    } else if (test[test.length - 2] !== undefined) {
        if ( (test[test.length - 1].match(regexUnique2) && test[test.length - 2].match(regexUnique2)) || (test[test.length - 1].match(regexUnique2) && test[test.length - 2].match(regexSpe))) {
            test = test.substring(0, test.length - 1)
            display.lastChild.firstChild.textContent = test;
            str = str.substring(0, str.length - 1) 

            ope2Counter = 0;
            num2Counter = 0;
            opeCounter = 0;
            numCounter = 0;

            ansCount = 1;
        } else if (test[test.length - 1].match(regexOpe) && test[test.length - 2].match(regexOpe)) {
            test = test.substring(0, test.length - 1)
            display.lastChild.firstChild.textContent = test;
            str = str.substring(0, str.length - 1)      
            
            ope2Counter = 1;
            num2Counter = 0;
            opeCounter = 1;
            numCounter = 0;
        } else if (test[test.length - 1].match(regexDot) && test[test.length - 2].match(regexUnique2)) {
            test = test.substring(0, test.length - 1)
            display.lastChild.firstChild.textContent = test;
            str = str.substring(0, str.length - 1) 
            
            ope2Counter = 0;
            num2Counter = 0;
            opeCounter = 0;
            numCounter = 0;

            dotCount = 0;
            ansCount = 1;
        } else if (test[test.length - 1].match(regexSqr) && test[test.length - 2].match(regexUnique2)) {
            test = test.substring(0, test.length - 1)
            display.lastChild.firstChild.textContent = test;
            str = str.substring(0, str.length - 1) 
            
            ope2Counter = 0;
            num2Counter = 0;
            opeCounter = 0;
            numCounter = 0;

            sqrCount = 0;
            ansCount = 1;
        }
    } else if (test.length === 1) {
        test = test.substring(0, test.length - 1)
        display.lastChild.firstChild.textContent = test;
        str = str.substring(0, str.length - 1) 

        ope2Counter = 0;
        num2Counter = 0;
        opeCounter = 0;
        numCounter = 0;

        dotCount = 0;
        ansCount = 0;
        sqrCount = 0;
        numCount = 0;
    }
        userInput = str.split(" ").filter(char => char !== '');
        fixInput();
        sequence();
}

//calculator buttons

const math = document.querySelectorAll('.math')
const numbers = document.querySelectorAll('.num')

math.forEach((func) => {
    func.addEventListener('click', e => addText(e))
})

//Add responsive calculating events to each click

math.forEach((func) => {
    func.addEventListener('click', e => computeSequence(e))
})

math.forEach((func) => {
    func.addEventListener('click', exponentDisplay)
})

//To make sure some items can only be repeated once(Ans, √, .)

const answer = document.querySelector('.cur-total')
const squareR = document.querySelector('.square-r')
const dot = document.querySelector('.decimal')

/* TO DO: fix the delete count too */

let dotCount = 0;
let ansCount = 0;
let sqrCount = 0;
let numCount = 0;


dot.addEventListener('click', (e) => {
    if (dotCount === 0) {
        addText(e);
        computeSequence(e);
        dotCount = 1;
        ansCount = 1;
        exponentDisplay()
    }
})

answer.addEventListener('click', (e) => {
    if (ansCount === 0) {
        addText(e);
        computeSequence(e);
        dotCount = 1;
        ansCount = 1;
        sqrCount = 1;
        numCount = 1;
        exponentDisplay()
    }
})

numbers.forEach(num => {
    num.addEventListener('click', (e) => {
        if (numCount === 0) {
            addText(e);
            computeSequence(e);
            ansCount = 1;
            exponentDisplay()
        }
    })
})

squareR.addEventListener('click', (e) => {
    if (sqrCount === 0) {
        addText(e);
        computeSequence(e);
        ansCount = 1;
        sqrCount = 1;
        exponentDisplay()
    }
})


math.forEach((func) => {
    func.addEventListener('click', resetByOpe)
})

function resetByOpe() {
    let test2 = display.lastChild.firstChild.textContent; 
    if (test2) {
        if (test2[test2.length - 1].match(regexOpe)) {
            dotCount = 0;
            ansCount = 0;
            sqrCount = 0;
            numCount = 0;
        }
    }
}


//clear function - for AC button 

const allClear = document.querySelector('.reset')
allClear.addEventListener('click', clearAll)

function clearAll() {
    if (display.children.length >= 2) {
        while (display.children.length >= 2) {
            display.removeChild(display.children[1])
            str = ""
            display.lastChild.lastChild.textContent = ""
            display.lastChild.firstChild.textContent = ""
            dotCount = 0;
            ansCount = 0;
            sqrCount = 0;
            numCount = 0;  
        }
    } else if (display.children.length === 1){
        str = ""
        display.lastChild.lastChild.textContent = ""
        display.lastChild.firstChild.textContent = ""
        dotCount = 0;
        ansCount = 0;
        sqrCount = 0;
        numCount = 0;
    }
    
}

//Scientific notation display - Powers of 10

let toggle = 0
const toggleBtn = document.querySelector('input');
toggleBtn.addEventListener('click', function() {
    if(this.checked) {
        toggle = 1;
    } else {
        toggle = 0;
    }
    exponentDisplay()
})

function exponentDisplay() {
    
    if (!display.lastChild.lastChild.textContent.includes("NaN") && toggle === 1) {
        let resultBefore = display.lastChild.lastChild.textContent.split(" ").filter(a => parseInt(a))
        let a = 4;
        let b;
        
        while (a < 1000 && !display.lastChild.lastChild.textContent.includes("^")) {
            if (Number(resultBefore[0]) >= 1000 && Number(resultBefore[0]) <= Math.pow(10, a)) {
                
                b = a - 1;
                let resultAfter = Number(resultBefore[0])/Math.pow(10, b)
                display.lastChild.lastChild.textContent = `= ${resultAfter}x10^${b}`
                a = 4;
                
            } else {  
                a += 1;
            }
        }    
    } else if (!display.lastChild.lastChild.textContent.includes("NaN") && toggle === 0) {
        if (display.lastChild.lastChild.textContent.includes("^")) {
            let resNumArr = display.lastChild.lastChild.textContent.split("=").join("");
            let resArr = resNumArr.split('x')
            let expo = resArr[1].split('^')
            let resExpo = Math.pow(expo[0], expo[1])
            let result = resArr[0]*resExpo
            
            display.lastChild.lastChild.textContent = `= ${result}`
        }
    }
}

//Get keyboard event

document.addEventListener('keyup', (e) => {
    
    if (Number(e.key) || (e.key === '0')) {
        
        if ((num2Counter === 0 && ope2Counter === 0 && numCount === 0) || (numCounter === 0 && opeCounter === 0 && numCount === 0)) {
            display.lastChild.firstChild.textContent += e.key
            str += e.key

            ansCount = 1;

        } else if ((ope2Counter === 1 && num2Counter === 1 && numCount === 0) || (numCount === 0 && numCounter === 1 && opeCounter === 1)) {
            display.lastChild.firstChild.textContent += " " + e.key;
            str += " " + e.key
            
            ope2Counter = 0;
            num2Counter = 0;
            opeCounter = 0;
            numCounter = 0
            

            ansCount = 1;
           
        } else if ((num2Counter === 0 && ope2Counter === 1 && numCount === 0) || (numCount === 0 && numCounter === 0 && opeCounter === 1)) {
            display.lastChild.firstChild.textContent += " " + e.key;
            str += " " + e.key
            ope2Counter = 0;
            opeCounter = 0;
           

            ansCount = 1;
           
        }
    }
    userInput = str.split(" ").filter(char => char !== '');
    fixInput()
    sequence()
    exponentDisplay()
})


//Time out for arrow helper
function timeout() {
    const arrow = document.getElementById('helper') //Cannot use get ele by class since they return an array like list
    setTimeout(function() {
        arrow.parentNode.removeChild(arrow);
    }, 2000);
    
}

timeout()
