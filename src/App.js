import React, { useState, useEffect } from 'react';

// components
import Message from './components/Message';
import Keyboard from './components/Keyboard';
import Screen from './components/Screen';

// style
import './styles/App.css';
import './styles/themes.css';

export const ThemeCtx = React.createContext();

function App() {
  let localTheme = localStorage.getItem('theme');
  if (localTheme == null) {
    localTheme = 1;
    localStorage.setItem('theme', 1);
  }

  const [theme, setTheme] = useState(localTheme);
  const [expression, setExpression] = useState("");
  const [cursor, setCursor] = useState(1);
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    window.addEventListener('click', () => {
      const screenExpression = document.querySelector(".screen__expression");
      screenExpression.focus();
    })

    const userLanguage = navigator.language || navigator.userLanguage;
    setLanguage(userLanguage);
  }, [])

  return (
    <ThemeCtx.Provider value={{
      theme, setTheme, expression, setMessage,
      setExpression, cursor, setCursor, language
    }}>
      <main className="app">
        <Screen />
        <Keyboard />
        {message !== "" &&
          <Message setMessage={setMessage} message={message} />}
      </main>
    </ThemeCtx.Provider>
  )
}

export default App;
