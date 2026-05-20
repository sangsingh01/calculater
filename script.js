// ── State ──
let current    = '0';
let prev       = '';
let operator   = '';
let justEvaled = false;

const resultEl = document.getElementById('result');
const exprEl   = document.getElementById('expr');

// ── Helpers ──
function updateDisplay() {
  resultEl.textContent = current;
}

function calculate(a, op, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case '+': return a + b;
    case '−': return a - b;
    case '×': return a * b;
    case '÷': return b === 0 ? 'Error' : a / b;
    default:  return b;
  }
}

function format(n) {
  if (n === 'Error') return 'Error';
  return parseFloat(parseFloat(n).toPrecision(10)).toString();
}

// ── Button handler ──
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    const val    = btn.dataset.val;

    switch (action) {

      case 'clear':
        current    = '0';
        prev       = '';
        operator   = '';
        justEvaled = false;
        exprEl.textContent = '';
        break;

      case 'sign':
        current = format(parseFloat(current) * -1);
        break;

      case 'percent':
        current = format(parseFloat(current) / 100);
        break;

      case 'dot':
        if (justEvaled) { current = '0'; justEvaled = false; }
        if (!current.includes('.')) current += '.';
        break;

      case 'num':
        if (justEvaled) { current = val; justEvaled = false; }
        else current = (current === '0') ? val : current + val;
        break;

      case 'op':
        if (operator && !justEvaled) {
          current = format(calculate(prev, operator, current));
        }
        prev       = current;
        operator   = val;
        justEvaled = true;
        exprEl.textContent = current + ' ' + operator;
        break;

      case 'equals':
        if (!operator) return;
        exprEl.textContent = prev + ' ' + operator + ' ' + current + ' =';
        current    = format(calculate(prev, operator, current));
        operator   = '';
        justEvaled = true;
        break;
    }

    updateDisplay();
  });
});