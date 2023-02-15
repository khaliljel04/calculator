const display = document.querySelector('#display');
const numberKeys = Array.from(document.querySelectorAll('.number'));
const operatorKeys = Array.from(document.querySelectorAll('.operator'));
const operateKey = document.querySelector('#operate');
const clearKey = document.querySelector('#clear');
const deleteKey = document.querySelector('#delete');
const dotKey = document.querySelector('#dot');

let operator = null;
let num = null;
let currentNum = null;

//#region EventListners

numberKeys.forEach(numberKey => numberKey.addEventListener('click', () => addDigit(numberKey)));

deleteKey.addEventListener('click', () => deleteDigit());

clearKey.addEventListener('click', () => clearCalculator());

dotKey.addEventListener('click', () => addDot());

operatorKeys.forEach(operatorKey => operatorKey.addEventListener('click', () => setOperator(operatorKey)));

operateKey.addEventListener('click', () => operate());

//#endregion

//#region Basic operations' functions

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

//#endregion

//#region Basic number input

function addDot() {
    if (currentNum === null) display.textContent = '';
    if (display.textContent.includes('.')) return;
    display.textContent += '.';
    currentNum = +display.textContent;
}

function addDigit(numberKey) {
    if (currentNum === null) display.textContent = '';
    display.textContent += numberKey.value;    
    currentNum = +display.textContent;
}

function deleteDigit() {
    display.textContent = display.textContent.slice(0, -1);
    currentNum = +display.textContent;
}

//#endregion

function calculate(operator, num1, num2) {
    const tryingToDivideByZero = operator === window['divide'] && (num2 === 0);
    if (tryingToDivideByZero) {
        alert('Stop messing around!');
        return 0;
    }
    return +operator(num1, num2).toFixed(7);
}

function clearCalculator() {
    operator = null;
    num = null;
    currentNum = null;
    display.textContent = '';
    document.querySelector('.active-operator').classList.remove('active-operator');
}

function setOperator(operatorKey) {
    handlePreOperatorSelection();
    operator = window[operatorKey.id];
    if (document.querySelector('.active-operator')) {
        document.querySelector('.active-operator').classList.remove('active-operator');
    }
    operatorKey.classList.add('active-operator');
}

function handlePreOperatorSelection() {
    if (currentNum !== null) {
        if (operator) {
            num = calculate(operator, num, currentNum);
        } else {
            num = currentNum;
        }
        display.textContent = num;
        currentNum = null;
    }
}

function operate() {
    if (operator === null) {
        alert('Select an operator!');
        return;
    }
    if (currentNum === null) {
        alert('Give a second operand!');
        return;
    }
    let result = calculate(operator, num, currentNum);
    clearCalculator()
    num = result;
    display.textContent = result;
}