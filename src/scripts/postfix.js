// https://en.wikipedia.org/wiki/Shunting-yard_algorithm
// https://www.includehelp.com/c/evaluation-of-postfix-expressions-using-stack-with-c-program.aspx
// http://mathcenter.oxford.emory.edu/site/cs171/shuntingYardAlgorithm/

import { checkOperator } from "./checkValidity.js";

const joinLargerNumbers = (expression) => {
  // join numbers that are larger than 1 digit and push them to the expression array
  const expressionArray = [];

  for (let i = 0; i < expression.length; i++) {
    let isLastDigitNumber = !isNaN(expression[i - 1]);
    let isLastDigitDecimal = expression[i - 1] === '.';
    let isCurrentDigitDecimal = expression[i] === '.';
    let isCurrentDigitNotNumber = isNaN(expression[i]);

    if (isCurrentDigitNotNumber && !isCurrentDigitDecimal) {
      expressionArray.push(expression[i]);
    } else if (
      expression.length > 0 && (isLastDigitNumber ||
        isLastDigitDecimal ||
        isCurrentDigitDecimal)
    ) {
      const lastNumber = expressionArray.pop();
      expressionArray.push(lastNumber + expression[i]);
    } else {
      expressionArray.push(expression[i]);
    }
  }
  console.log(expressionArray);

  return expressionArray;
}

export const shuntingYardAlgorithm = (expression) => {
  const operatorsPrecedence = {
    '+': 1,
    '-': 1,
    'x': 2,
    '÷': 2,
    '(': -1,
  }

  expression = joinLargerNumbers(expression);

  const queue = [];
  const stack = [];

  for (const exp of expression) {
    // if exp is a operator or parenthesis
    if (isNaN(exp)) {

      const isOperator = checkOperator(exp);
      if (isOperator) {
        const currentOperatorPrecedence = operatorsPrecedence[exp];
        const stackLastOperatorPrecedence = operatorsPrecedence[stack.slice(-1)] || 10;

        if (currentOperatorPrecedence <= stackLastOperatorPrecedence) {
          if (stack.length > 0) {
            const operator = stack.pop();
            stack.push(exp);
            queue.push(operator);
          } else {
            stack.push(exp);
          }
        } else {
          stack.push(exp);
        }
      } else if (exp === '(') {
        stack.push(exp);
      } else if (exp === ')') {
        let currentChar = stack.pop();
        while (currentChar !== '(') {
          queue.push(currentChar);
          currentChar = stack.pop();
        }
      }
    } else {
      queue.push(Number(exp));
    }
  }
  const finalQueue = orderQueue(queue, stack);
  return finalQueue;
}

const orderQueue = (queue, stack) => {
  while (stack.length != 0) {
    queue.push(stack.pop());
  }
  return queue;
}

const calculate = (expression) => {
  const queue = shuntingYardAlgorithm(expression);
  const stack = [];
  for (const value of queue) {
    if (isNaN(value)) {
      const firstNumber = stack.pop();
      const secondNumber = stack.pop();
      const result = evaluate(firstNumber, secondNumber, value);
      stack.push(result);
    } else {
      stack.push(value);
    }
  }
  return String(stack[0]);
}

const evaluate = (first, second, operation) => {
  if (operation === "+") return first + second;
  else if (operation === "-") return second - first;
  else if (operation === "x") return first * second;
  else if (operation === "÷") return second / first;
}


export default calculate;
