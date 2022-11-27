//Math functions
function add(num) {
	return num.reduce((a, b) => a + b)
};

function subtract(num) {
	return num.reduce((a, b) => a - b)
};

function multiply(num) {
    return num.reduce((a, b) => a*b)
  };

function divide(num) {
    return num.reduce((a, b) => a/b)
}

// "=" button
function operator(num, func) {
    return func(num);
}

console.log(operator([3,4], divide))