import React, { useContext, useRef, useState, useEffect } from 'react';
import digits from './digits.js';
import icons from './icons.js';
import './App.css';
import './themes.css';

const ThemeCtx = React.createContext();

function App() {
  const [theme, setTheme] = useState(1);
  const [expression, setExpression] = useState("");

  return (
    <ThemeCtx.Provider value={{ theme, setTheme, expression, setExpression }}>
      <main className="app">
        <Screen />
        <Keyboard />
        <Options />
      </main>
    </ThemeCtx.Provider>
  )
}

function Screen() {
  const { theme, setTheme, expression } = useContext(ThemeCtx);

  return (
    <div className={`screen screen--theme${theme}`}>
      <Themes theme={theme} setTheme={setTheme} />
      <p className="screen__expression">{expression}</p>
      <p className="screen__result"></p>
    </div>
  )
}

function Themes({ theme, setTheme }) {
  const themeButton = useRef(null);

  const changeTheme = () => {
    setTheme(old => {
      if (old != 3) return old + 1;
      else return 1
    })
    if (theme !== 3) {
      themeButton.current.style.transform = `translateX(${40 * theme - 1}px)`;
    } else {
      themeButton.current.style.transform = `translateX(0px)`;
    }
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
  const { theme, setExpression } = useContext(ThemeCtx);

  const showDigit = (e) => {
    setExpression(old => {
      return old + e.target.textContent;
    })
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
    <div>hello</div>
  )
}

export default App;
