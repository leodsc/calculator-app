import { useEffect, useContext } from 'react';
import { ThemeCtx } from '../App.js';

// scripts
import messages from "../scripts/messages.js";
import icons from '../scripts/icons.js';
import { preventDoubleClick } from '../scripts/preventDoubleClick';
import { checkOperator, checkValidity } from '../scripts/checkValidity.js';
import digits from '../scripts/digits';
import calculate from '../scripts/postfix.js';

function Keyboard() {
  const { theme, expression, setExpression, cursor, setCursor, setMessage, language } = useContext(ThemeCtx);

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      const isBackspace = e.key === 'Backspace';
      const isEqual = e.key === '=' || e.key === "Enter";
      const leftArrow = e.key === 'ArrowLeft';
      const rightArrow = e.key === 'ArrowRight';
      const digits = document.querySelectorAll(".keyboard__digit");

      if (isBackspace) {
        digits[2].click();
      } else if (isEqual) {
        digits[digits.length - 1].click();
      } else if (leftArrow || rightArrow) {
        chooseMessage(messages.arrow);
      } else {
        for (const digit of digits) {
          if (digit.textContent === e.key) {
            digit.click();
            break;
          }
        }
      }
    });
  }, [])


  const chooseMessage = (messageType) => {
    // prevent error if language not supported
    if (messageType[language] !== undefined) {
      setMessage(messageType[language]);
    } else {
      setMessage(messageType["en-US"]);
    }
  }

  const changeDigitColor = (e) => {
    e.target.classList.add("keyboard__digit--active");
    e.target.classList.remove(`keyboard__digit--theme${theme}`);
    setTimeout(() => {
      e.target.classList.remove("keyboard__digit--active");
      e.target.classList.add(`keyboard__digit--theme${theme}`);
    }, 100)
  }

  const eraseDigit = (e) => {
    if (expression.length > 0) {
      const newExpression = icons[3].action(cursor, expression);
      setExpression(newExpression);
      setCursor((old) => {
        if (newExpression.length > 0) {
          return old - 1;
        } else return 1;
      })
    } else setCursor(1);
    preventDoubleClick(e.currentTarget);
  }

  const showDigit = (e) => {
    const value = e.target.textContent;
    preventDoubleClick(e.target);

    if (expression !== "") {
      const stack = expression.split("");
      const [isDigitValid, newExpression] = checkValidity(value, stack, cursor);
      if (isDigitValid) {
        if (newExpression.length === 0) {
          // update cursor position if clear button (C) is clicked
          setCursor(1);
        } else if (newExpression.slice(-1) === "(" &&
          newExpression.slice(-2, -1) !== "(") {
          setCursor(old => {
            return old + 2;
          })
        }
        else {
          setCursor(old => {
            if (old !== 0) {
              // prevent bug if cursor is at the first value of the expression 
              // then it only increases by 1 when it is in the second position forward
              return old + 1;
            }
          })
        }
        setExpression(newExpression);
      } else {
        const isOperator = checkOperator(value);
        if (value !== '.' && !isOperator) {
          chooseMessage(messages.numberTooLarge);
        } else if (isOperator) {
          chooseMessage(messages.twoOperatorsSequence);
        } else {
          chooseMessage(messages.twoDecimalDots);
        }
      }
    } else if (!isNaN(value)) {
      setExpression(old => {
        return old + value;
      })
    }
  }

  return (
    <div className="keyboard">
      {digits.map(digit => {
        return <button className={
          `keyboard__digit keyboard__digit--theme${theme} keyboard__digit--${digit.position}`
        } onClick={(e) => {
          changeDigitColor(e);
          if (e.target.textContent === "=") {
            const result = calculate(expression);
            if (!isNaN(result)) {
              setCursor(result.length);
              setExpression(result);
            } else {
              chooseMessage(messages.invalidCalculation);
            }
          } else if (e.target.textContent === '⌫') {
            eraseDigit(e);
          }
          else showDigit(e);
        }} >{digit.char}</button>
      })}
      {/* 
      {icons.map(icon => {
        const Svg = icon.svg;
        return (
          <button onClick={(e) => {
            if (expression.length > 0) {
              const newExpression = icon.action(cursor, expression);
              setExpression(newExpression);
              setCursor((old) => {
                if (newExpression.length > 0) {
                  return old - 1;
                } else return 1;
              })
            } else setCursor(1);

            preventDoubleClick(e.currentTarget);
          }}>
            <Svg />
          </button>
        )
      })}
      */}
    </div>
  )
}

export default Keyboard;