import { useEffect, useRef, useContext } from "react";
import Themes from './Themes';
import { ThemeCtx } from '../App.js';

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
      <textarea inputmode="none" ref={txtarea} onClick={(e) => {
        if (expression.length !== 0) {
          const cursorPosition = e.target.selectionStart;
          setCursor(cursorPosition);
        }
      }}
        className="screen__expression"
        value={expression}></textarea>
      <p className="screen__result"></p>
    </div>
  )
}

export default Screen;