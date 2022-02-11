// check that the digit is valid
const MAX_EXPRESSION_LENGTH = 15;

export const checkOperator = (value) => {
  const operators = ['+', '-', 'x', '÷'];
  return operators.some((op) => op === value);
}

const countNumberDigits = (position, stack, type) => {
  let numberDigits = 0;
  if (type == "after") {
    for (let i = position; i < stack.length; i++) {
      const isOperator = checkOperator(stack[i]);
      const isParenthesis = stack[i] === "(" || stack[i] === ")";
      if (isOperator && isParenthesis) {
        break;
      } else if (stack[i] != undefined) numberDigits++;
    }
  } else {
    for (let i = position; i > 0; i--) {
      const isOperator = checkOperator(stack[i]);
      if (isOperator) {
        break;
      } else if (stack[i] != undefined) numberDigits++;
    }
  }
  return numberDigits;
}

export const checkValidity = (value, stack, position) => {
  const previousDigit = stack.slice(-1);
  const nextDigit = stack[position + 1];

  if (!isNaN(value)) { // digit is a number
    // check number is at max size (15)
    const numberDigitsAfter = countNumberDigits(position - 1, stack, "after");
    const numberDigitsBefore = countNumberDigits(position, stack, "before");
    const numberDigitsTotal = numberDigitsAfter + numberDigitsBefore;

    if (numberDigitsTotal < MAX_EXPRESSION_LENGTH) {
      stack.splice(position, 0, value);
      return [true, stack.join("")];
    } else return [false, ""];

  } else if (checkOperator(value)) { // digit is a operator
    const isNeighborhood = {
      notNumber: isNaN(previousDigit) && isNaN(nextDigit) && nextDigit !== undefined,
      notSpecial: previousDigit !== '%' && previousDigit !== ')'
    };

    if (checkOperator(previousDigit[0])) {
      return [false, ""];
    }

    if (isNeighborhood.notNumber &&
      isNeighborhood.notSpecial) {
      return [false, ""];
    }
    stack.splice(position, 0, value);
    return [true, stack.join("")];

  } else { // digit is special
    if (value === 'C') {
      return [true, ""];
    }
    else if (value === '%') {
      if (isNaN(previousDigit)) return [false, ""];
      else {
        stack.splice(position, 0, value);
        return [true, stack.join("")];
      }
    } else if (value === '()') {
      let parenthesisChar;
      if (checkOperator(value) || previousDigit === '(') {
        parenthesisChar = '(';
      } else parenthesisChar = balanceParenthesis(stack);
      if ((!isNaN(previousDigit) || previousDigit === ')') && parenthesisChar === '(') {
        stack.splice(position, 0, 'x');
        stack.splice(position + 1, 0, parenthesisChar);
      } else stack.splice(position, 0, parenthesisChar);
      return [true, stack.join("")];
    }
  }
}

const balanceParenthesis = (stack) => {
  const parenthesisStack = [];
  for (let i = 0; i < stack.length; i++) {
    if (stack[i] == '(') {
      parenthesisStack.push('(');
    } else if (stack[i] === ')') parenthesisStack.pop();
  }

  if (parenthesisStack.length !== 0) return ')';
  else return '(';
}

