// https://en.wikipedia.org/wiki/Shunting-yard_algorithm

import { checkOperator } from "./checkValidity.js";

const shuntingYardAlgorithm = (expression) => {
  const operatorsPrecedence = {
    '+': 1,
    '-': 1,
    'x': 2,
    '÷': 2,
    '(': -1,
  }

  const queue = [];
  const stack = [];

  for (const exp of expression) {
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
      queue.push(exp);
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

const queue = shuntingYardAlgorithm("2x(5+1x1)+5");
console.log(queue);

const calculate = (expression) => {
  const queue = shuntingYardAlgorithm(expression);
}

