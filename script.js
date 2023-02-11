const display = document.querySelector('#display');
let operator = null;
let num = null;
let currentNum = 0;

const numberKeys = Array.from(document.querySelectorAll('.number'));
numberKeys.forEach(numberKey => numberKey.addEventListener('click', () => addDigit(numberKey)));

const operatorKeys = Array.from(document.querySelectorAll('.operator'));
operatorKeys.forEach(operatorKey => operatorKey.addEventListener('click', () => {
    if (operator) {
        num = operate(operator, num, parseInt(display.textContent));
    } else {
        num = parseInt(display.textContent);
    }
    display.textContent = num;
    currentNum = 0;
    setOperator(operatorKey);
}));

const operateKey = document.querySelector('#operate');
operateKey.addEventListener('click', () => {
    num = operate(operator, num, parseInt(display.textContent));
    display.textContent = num;
    document.querySelector('.active-operator').classList.remove('active-operator');
    operator = null;
    num = null;
});

const deleteKey = document.querySelector('#delete');
deleteKey.addEventListener('click', () => deleteDigit());



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
    return operator(num1, num2);
}

function deleteDigit() {
    display.textContent = display.textContent.slice(0, -1);
}

function setOperator(operatorKey) {
    operator = window[operatorKey.id];
    if (document.querySelector('.active-operator')) {
        document.querySelector('.active-operator').classList.remove('active-operator');
    }
    operatorKey.classList.add('active-operator');
}

function addDigit(numberKey) {
    currentNum = currentNum * 10 + parseInt(numberKey.value);
    display.textContent = currentNum;
}