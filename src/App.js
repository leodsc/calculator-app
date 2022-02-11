import React, { useContext, useRef, useState, useEffect } from 'react';
import digits from './digits.js';
// import IconsWrapper from './IconsWrapper';
import icons from './icons.js';
import { checkOperator, checkValidity } from './checkValidity.js';
import calculate from './postfix.js';

import './App.css';
import './themes.css';


const ThemeCtx = React.createContext();

const preventDoubleClick = (target) => {
  target.setAttribute("disabled", true);
  setTimeout(() => {
    target.removeAttribute("disabled");
  }, 40)
}

function App() {
  let localTheme = localStorage.getItem('theme');
  if (localTheme == null) {
    localTheme = 1;
    localStorage.setItem('theme', 1);
  }

  const [theme, setTheme] = useState(localTheme);
  const [expression, setExpression] = useState("");
  const [cursor, setCursor] = useState(1);

  useEffect(() => {
    window.addEventListener('click', () => {
      const screenExpression = document.querySelector(".screen__expression");
      screenExpression.focus();
    })

  }, [])

  return (
    <ThemeCtx.Provider value={{ theme, setTheme, expression, setExpression, cursor, setCursor }}>
      <main className="app">
        <Screen />
        <Keyboard />
      </main>
    </ThemeCtx.Provider>
  )
}

function Screen() {
  const { theme, setTheme, expression, cursor, setCursor } = useContext(ThemeCtx);
  const txtarea = useRef(null);

  useEffect(() => {
    // focus in input to show where the cursor is after clicking in a digit
    txtarea.current.setSelectionRange(cursor, cursor);
  }, [expression])

  return (
    <div className={`screen screen--theme${theme}`}>
      <Themes theme={theme} setTheme={setTheme} />
      <textarea ref={txtarea} onClick={(e) => {
        const cursorPosition = e.target.selectionStart;
        setCursor(cursorPosition);
      }}
        className="screen__expression"
        value={expression}></textarea>
      <p className="screen__result"></p>
    </div>
  )
}

function Themes({ theme, setTheme }) {
  const themeButton = useRef(null);

  useEffect(() => {
    localStorage.setItem('theme', theme);

    if (theme != 1) {
      themeButton.current.style.transform = `translateX(${40 * (theme - 1)}px)`;
    } else {
      themeButton.current.style.transform = `translateX(0px)`;
    }
  }, [theme])

  const changeTheme = (e) => {
    preventDoubleClick(e.currentTarget);

    setTheme(old => {
      if (old != 3) return Number(old) + 1;
      else return 1;
    })
  }

  return (
    <button className="screen__themes" onClick={(e) => changeTheme(e)}>
      <div className="screen__types">
        {[1, 2, 3].map(type => {
          return <p>{type}</p>
        })}
      </div>
      <div className="screen__themes-outer">
        <div ref={themeButton} className="screen__themes-inner"></div>
      </div>
    </button>
  )
}

function Keyboard() {
  const { theme, expression, setExpression, cursor, setCursor } = useContext(ThemeCtx);

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      const isNumber = !isNaN(e.key);
      const isOperator = checkOperator(e.key);
      const isBackspace = e.key === 'Backspace';
      if (isNumber || isOperator || isBackspace) {
        showDigit(e);
      }
    });
  }, [])

  const showDigit = (e) => {
    let value;
    if (e.type !== "keydown") {
      value = e.target.textContent;
    } else {
      value = e.key;
    }

    // prevent double click
    preventDoubleClick(e.target);

    // update expression value
    if (expression !== "") {
      const stack = expression.split("");
      const [isDigitValid, newExpression] = checkValidity(value, stack, cursor);
      if (isDigitValid) {
        setExpression(newExpression)
        if (newExpression.length == 0) {
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
      }
      // calculate();
    } else {
      if (!isNaN(value)) {
        setExpression(old => {
          return old + value;
        })
      }
    }

  }

  return (
    <div className="keyboard">
      {digits.map(digit => {
        return <button className={
          `keyboard__digit keyboard__digit--theme${theme} keyboard__digit--${digit.position}`
        } onClick={(e) => {
          if (e.target.textContent === "=") {
            const result = calculate(expression);
            if (!isNaN(result)) {
              setExpression(result);
            }
          } else if (e.target.textContent === '⌫') {
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
          else {
            showDigit(e);
          }
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

export default App;
