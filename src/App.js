import React, { useContext, useRef, useState, useEffect } from 'react';
import digits from './digits.js';
import icons from './icons.js';
import { checkValidity } from './checkValidity.js';
import './App.css';
import './themes.css';

const ThemeCtx = React.createContext();

function App() {
  let localTheme = localStorage.getItem('theme');
  if (localTheme == null) {
    localTheme = 1;
    localStorage.setItem('theme', 1);
  }

  const [theme, setTheme] = useState(localTheme);
  const [expression, setExpression] = useState("");
  const [cursor, setCursor] = useState(1);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme, expression, setExpression, cursor, setCursor }}>
      <main className="app">
        <Screen />
        <Keyboard />
        <Options />
      </main>
    </ThemeCtx.Provider>
  )
}

function Screen() {
  const { theme, setTheme, expression, cursor, setCursor } = useContext(ThemeCtx);
  const txtarea = useRef(null);

  useEffect(() => {
    // focus in input to show where the cursor is after clicking in a digit
    txtarea.current.focus();
    txtarea.current.setSelectionRange(cursor, cursor);
  }, [expression])

  return (
    <div className={`screen screen--theme${theme}`}>
      <Themes theme={theme} setTheme={setTheme} />
      <textarea ref={txtarea} onClick={(e) => {
        const cursorPosition = e.target.selectionStart;
        setCursor(cursorPosition);
      }}
        cols="20"
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
      console.log('oi');
      themeButton.current.style.transform = `translateX(${40 * (theme - 1)}px)`;
    } else {
      themeButton.current.style.transform = `translateX(0px)`;
    }
  }, [theme])

  const changeTheme = () => {
    setTheme(old => {
      if (old !== 3) return Number(old) + 1;
      else return 1;
    })

  }

  return (
    <button className="screen__themes" onClick={changeTheme}>
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

  const showDigit = (e) => {
    const value = e.target.textContent;

    // prevent double click
    e.target.setAttribute("disabled", "true")
    setTimeout(() => {
      e.target.removeAttribute("disabled");
    }, 40)

    // update expression value
    if (expression !== "") {
      const stack = expression.split("");
      const [isDigitValid, newExpression] = checkValidity(value, stack, cursor);
      if (isDigitValid) {
        setExpression(newExpression)
        setCursor(old => {
          // prevent bug if cursor is at the first value of the expression 
          // then it only increases by 1 when it is in the second position forward
          if (old !== 0) {
            return old + 1;
          }
        })
      }
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
        } onClick={(e) => showDigit(e)} >{digit.char}</button>
      })}
      {icons.map(Icon => {
        return <Icon />
      })}
    </div>
  )
}

function Options() {
  const { theme } = useContext(ThemeCtx);

  return (
    <div></div>
  )
}

export default App;
