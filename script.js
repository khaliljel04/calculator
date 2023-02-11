const display = document.querySelector('#display');
let operator = null;
let num = null;
let currentNum = 0;

const numberKeys = Array.from(document.querySelectorAll('.number'));
numberKeys.forEach(numberKey => numberKey.addEventListener('click', () => addDigit(numberKey)));

const operatorKeys = Array.from(document.querySelectorAll('.operator'));
operatorKeys.forEach(operatorKey => operatorKey.addEventListener('click', () => {
    if (currentNum !== null) {
        if (operator) {
            num = operate(operator, num, currentNum);
        } else {
            num = currentNum;
        }
        display.textContent = num;
        currentNum = null;
    }
    setOperator(operatorKey);
}));

const operateKey = document.querySelector('#operate');
operateKey.addEventListener('click', () => {
    num = operate(operator, num, currentNum);
    display.textContent = num;
    currentNum = null;
    operator = null;
    num = null;
    document.querySelector('.active-operator').classList.remove('active-operator');
});

const deleteKey = document.querySelector('#delete');
deleteKey.addEventListener('click', () => deleteDigit());

const clearKey = document.querySelector('#clear');
clearKey.addEventListener('click', () => clearCalculator());

const dotKey = document.querySelector('#dot');
dotKey.addEventListener('click', () => addDot());



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

function operate(operator, num1, num2) {
    if (operator === window['divide'] && (num2 === 0)) {
        alert('LMAO!!!!!!');
        return 0;
    }
    return +operator(num1, num2).toFixed(7);
}

function clearCalculator() {
    operator = null;
    num = null;
    currentNum = 0;
    display.textContent = '';
    document.querySelector('.active-operator').classList.remove('active-operator');
}

function setOperator(operatorKey) {
    operator = window[operatorKey.id];
    if (document.querySelector('.active-operator')) {
        document.querySelector('.active-operator').classList.remove('active-operator');
    }
    operatorKey.classList.add('active-operator');
}

function addDot() {
    if (display.textContent.includes('.')) return;
    display.textContent += '.';
    currentNum = +display.textContent;
}

function addDigit(numberKey) {
    if (currentNum == null) display.textContent = '';
    display.textContent += numberKey.value;    
    currentNum = +display.textContent;
}

function deleteDigit() {
    display.textContent = display.textContent.slice(0, -1);
    currentNum = +display.textContent;
}