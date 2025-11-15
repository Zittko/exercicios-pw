let calcLigada = false;
let display = '';
let tokens = [];
let waitingForSecond = false;

const tela = document.querySelector('.tela');
const on = document.getElementById('on');
const clear = document.getElementById('clear');

async function ligarTela() {
    tela.style.backgroundColor = '#9fb396';
    tela.textContent = 'LIGADO';
    await new Promise(r => setTimeout(r, 2000));
    tela.textContent = '';
    calcLigada = true;
}

function updateDisplay() {
    if (!calcLigada) {
        tela.textContent = '';
        return;
    }
    if (!display && tokens.length) {
        tela.textContent = tokens.join(' ');
        return;
    }

    tela.textContent = display || '';
}

function typeNumber(numero) {
    if (!calcLigada) return;

    if (waitingForSecond) {
        display = '';
        waitingForSecond = false;
    }

    if (display === '0' && numero !== '.') {
        display = numero;
    } else {
        display += numero;
    }

    updateDisplay();
}

function applySqrtToTarget(targetStr) {
    if (!targetStr) return null;
    const n = parseFloat(targetStr);
    if (n < 0) return 'Erro';
    return Math.sqrt(n).toString();
}

function handleOperator(op) {
    if (!calcLigada) return;
    if (op === '√') {
        if (display) {
            const r = applySqrtToTarget(display);
            if (r === 'Erro') { display = r; tokens = []; waitingForSecond = true; updateDisplay(); return; }
            display = r;
            waitingForSecond = true;
            updateDisplay();
            return;
        } else if (tokens.length) {
            const last = tokens[tokens.length - 1];
            if (isOperator(last)) return;
            const r = applySqrtToTarget(last);
            if (r === 'Erro') { display = r; tokens = []; waitingForSecond = true; updateDisplay(); return; }
            tokens[tokens.length - 1] = r;
            updateDisplay();
            return;
        }
        return;
    }

    if (display) {
        tokens.push(display);
        tokens.push(op);
        display = '';
        waitingForSecond = true;
        updateDisplay();
        return;
    }

    if (tokens.length) {
        const last = tokens[tokens.length - 1];
        if (isOperator(last)) {
            tokens[tokens.length - 1] = op;
            updateDisplay();
            return;
        }
    }
}

function isOperator(token) {
    return token === '+' || token === '-' || token === '×' || token === '÷' || token === '%';
}

function evaluateTokens(toks) {
    if (!toks || toks.length === 0) return '';

    let arr = toks.slice();

    for (let i = 0; i < arr.length; i++) {
        const tok = arr[i];
        if (tok === '×' || tok === '÷' || tok === '%') {
            const a = parseFloat(arr[i - 1]);
            const b = parseFloat(arr[i + 1]);
            if (Number.isNaN(a) || Number.isNaN(b)) return 'Erro';
            let res;
            if (tok === '×') res = a * b;
            if (tok === '÷') {
                if (b === 0) return 'Erro';
                res = a / b;
            }
            if (tok === '%') res = a % b;
            arr.splice(i - 1, 3, res.toString());
            i = Math.max(-1, i - 2);
        }
    }

    let result = parseFloat(arr[0]);
    for (let i = 1; i < arr.length; i += 2) {
        const op = arr[i];
        const num = parseFloat(arr[i + 1]);
        if (Number.isNaN(num)) return 'Erro';
        if (op === '+') result += num;
        if (op === '-') result -= num;
    }

    return result.toString();
}

function calculate() {
    if (!calcLigada) return;

    // empilha último número se existir
    if (display) tokens.push(display);

    if (tokens.length === 0) return;

    const result = evaluateTokens(tokens);
    display = result;
    tokens = [];
    waitingForSecond = true;
    updateDisplay();
}

function limparTela() {
    if (calcLigada) {
        display = '';
        tokens = [];
        waitingForSecond = false;
        updateDisplay();
    }
}

on.addEventListener('click', async () => {
    if (!calcLigada) await ligarTela();
});

clear.addEventListener('click', limparTela);

document.getElementById('n0').addEventListener('click', () => typeNumber('0'));
document.getElementById('n1').addEventListener('click', () => typeNumber('1'));
document.getElementById('n2').addEventListener('click', () => typeNumber('2'));
document.getElementById('n3').addEventListener('click', () => typeNumber('3'));
document.getElementById('n4').addEventListener('click', () => typeNumber('4'));
document.getElementById('n5').addEventListener('click', () => typeNumber('5'));
document.getElementById('n6').addEventListener('click', () => typeNumber('6'));
document.getElementById('n7').addEventListener('click', () => typeNumber('7'));
document.getElementById('n8').addEventListener('click', () => typeNumber('8'));
document.getElementById('n9').addEventListener('click', () => typeNumber('9'));
document.getElementById('dot').addEventListener('click', () => {
    if (calcLigada && !display.includes('.')) typeNumber('.');
});

document.getElementById('plus').addEventListener('click', () => handleOperator('+'));
document.getElementById('minus').addEventListener('click', () => handleOperator('-'));
document.getElementById('times').addEventListener('click', () => handleOperator('×'));
document.getElementById('divide').addEventListener('click', () => handleOperator('÷'));
document.getElementById('sqrt').addEventListener('click', () => handleOperator('√'));
document.getElementById('percent').addEventListener('click', () => handleOperator('%'));

document.getElementById('equals').addEventListener('click', calculate);