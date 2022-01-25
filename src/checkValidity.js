// check that the digit is valid
const MAX_EXPRESSION_LENGTH = 15;

const operators = ['+', '-', 'x', '÷'];

export const checkValidity = (value, stack, position) => {
  const previousDigit = stack[position - 1];
  const nextDigit = stack[position + 1];

  if (!isNaN(value)) {
    let currentNumber = "";
    stack.forEach(s => {
      if (isNaN(s)) {
        currentNumber = "";
      } else {
        currentNumber += s;
      }
    })
    if (currentNumber.length < MAX_EXPRESSION_LENGTH &&
      previousDigit !== '%') {
      stack.splice(position, 0, value);
      return [true, stack.join("")]
    } else return [false, ""];

  } else if (operators.some((op) => op === value)) {
    if (isNaN(previousDigit) &&
      isNaN(nextDigit) &&
      isNaN(undefined) &&
      previousDigit !== '%') {
      return [false, ""];
    }
    stack.splice(position, 0, value);
    return [true, stack.join("")];

  } else {
    if (value === 'C') {
      return [true, ""];
    }
    else if (value === '%') {
      if (isNaN(previousDigit)) return [false, ""];
      else {
        stack.splice(position, 0, value);
        console.log(stack);
        return [true, stack.join("")];
      }
    } else {
      return [false, ""];
    }
  }
}
