
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

        //future reference for input box style
        /* const screenTest = document.createElement('input')
        screenTest.classList.add('input-screen')
        screenTest.textContent = this.textContent;
        document.getElementsByTagName('input').type = 'text'
        wrapper.appendChild(screenTest) */

        const screen2 = document.createElement('p');
        screen2.classList.add('result-screen')
        wrapper.appendChild(screen2)
        
        

    }

}

//Handle how numbers display on calculator screen

let regexOpe = /(\×|\÷|\−|\-|\+)/g
let regexUnique = /(\.|0|\d|√|\^)|(\w)/gi /* equal (parseInt(e.target.textContent) || e.target.textContent === "." || e.target.textContent === "0")*/
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

function getInput(e) {
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

function fixInput() {
    for (let i = 0; i < userInput.length; i++) {

        //case of having 2 or more "x" || "÷"
        if (userInput[i].match(errorDiv) || userInput[i].match(errorMul)) {
            display.lastChild.lastChild.textContent = "Operators can't be placed next to itself and each other"
        }
        else if (userInput[i].match(regexMulDiv)) {
            //case of "x" && "÷" co-existing in user inputs
            if (userInput[i].match(regexDiv) && userInput[i].match(regexMul)){
                console.log("Hoc lai phep nhan de")
            }
            //case of "+" || "-" being placed BEFORE "x" || "÷"
            else if (userInput[i].match(regexFirstPosNeg))
            {
                console.log("Con me may ngu")        
            } 
        }
    
        //mix with x or ÷ at the start
        if (userInput[i].match(regexMulDivPos) || userInput[i].match(regexMulDivNeg)) {
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

        // pure + and -
        if (!userInput[i].match(regexMulDiv)) {
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
    } else if (userInput.join('').includes('√')) {//num1 has sqr || num2 has sqr
        //userInput[userInput.indexOf(ope) - 1].includes('√') || userInput[userInput.indexOf(ope) + 1].includes('√')
        console.log(userInput[userInput.indexOf(ope) - 1].indexOf('√') - (userInput[userInput.indexOf(ope) - 1].length - 1))

        if (userInput[userInput.indexOf(ope) - 1].indexOf('√') - (userInput[userInput.indexOf(ope) - 1].length - 1) === 0 || userInput[userInput.indexOf(ope) + 1].indexOf('√') - (userInput[userInput.indexOf(ope) + 1].length - 1) === 0) { //Catch error for when sqr is at the end of one of these numbers
            console.log("Syntax error!")
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
    Object.keys(operators).forEach(key => {
        if (userInput.length === 1) {
            display.lastChild.lastChild.textContent = `= ${userInput[0]}`
        }
        while (userInput.includes(key) && userInput.length >= 2 && !userInput.includes(NaN)) { 
            getNums(key)  
            console.log(num1)
            console.log(num2)
            console.log(key)
            
            console.log(startIndex)
            userInput.splice(startIndex, 3, compute(Number(num1), Number(num2), operators[key]));
            display.lastChild.lastChild.textContent = `= ${userInput}`
            
            console.log(userInput)
            /* if (num1 === undefined || num2 === undefined) {
                display.lastChild.lastChild.textContent = 'shut the fuck up';
            } else {
                display.lastChild.lastChild.textContent = `= ${userInput}`
            }   */  
            
        }
    })
    
}

function computeSequence(e) {
    getInput(e);
    
    fixInput();
    
    sequence()
    
}    
    

//Add responsive calculating events to each click
math.forEach((func) => {
    func.addEventListener('click', e => computeSequence(e))
})
inputs.forEach(input => {
    input.addEventListener('click', e => computeSequence(e))
})


//delete function
const del = document.querySelector('.delete')
del.addEventListener('click', deleteStr)


function deleteStr() {
     
    let test = display.lastChild.firstChild.textContent;

    if (test[test.length - 1].match(regexUnique) && test[test.length - 2] === " ") {
        test = test.substring(0, test.length - 2)
        display.lastChild.firstChild.textContent = test;
        ope2Counter = 1;
        num2Counter = 0;
        
    } else if (test[test.length - 1].match(regexOpe) && test[test.length - 2] === " ") {
        test = test.substring(0, test.length - 2)
        display.lastChild.firstChild.textContent = test;
        ope2Counter = 0;
        num2Counter = 0;
    } else if (test[test.length - 2] !== undefined) {
        if (test[test.length - 1].match(regexUnique) && test[test.length - 2].match(regexUnique)) {
        test = test.substring(0, test.length - 1)
        display.lastChild.firstChild.textContent = test;
        ope2Counter = 0;
        num2Counter = 0;
        } else if (test[test.length - 1].match(regexOpe) && test[test.length - 2].match(regexOpe)) {
            test = test.substring(0, test.length - 1)
            display.lastChild.firstChild.textContent = test;     
            ope2Counter = 1;
            num2Counter = 0;
        }
    } else if (test.length === 1) {
        test = test.substring(0, test.length - 1)
        display.lastChild.firstChild.textContent = test;
        ope2Counter = 0;
        num2Counter = 0;
    }


    if (str[str.length - 1].match(regexUnique) && str[str.length - 2] === " ") {
        str = str.substring(0, str.length - 2)
        opeCounter = 1;
        numCounter = 0;
        
    } else if (str[str.length - 1].match(regexOpe) && str[str.length - 2] === " ") {
        str = str.substring(0, str.length - 2)
        opeCounter = 0;
        numCounter = 0;
        
    } else if (str[str.length - 2] !== undefined) {
        if (str[str.length - 1].match(regexUnique) && str[str.length - 2].match(regexUnique)) {
        str = str.substring(0, str.length - 1)    
        opeCounter = 0;
        numCounter = 0;
        } else if (str[str.length - 1].match(regexOpe) && str[str.length - 2].match(regexOpe)) {
            str = str.substring(0, str.length - 1)
            opeCounter = 1;
            numCounter = 0;     
        }
    }  else if (str.length === 1) {
        str = str.substring(0, str.length - 1)
        opeCounter = 0;
        numCounter = 0;    
    }
        userInput = str.split(" ").filter(char => char !== '');
        fixInput();
        sequence();
}

//Ans function
let ans = "Ans√12";
let test = 3
console.log('this below is ans')
console.log(ans.split("Ans").filter(a => a !== "")[0])
console.log('this above is ans')
const answer = document.querySelector('cur-total')

//ans.addEventListener()

//function 

//Modern mode - classic mode
//clear function - for AC button 
function clear() {

}

function clearAll() {
    str = ""
    display.lastChild.firstChild.textContent = ""
}

