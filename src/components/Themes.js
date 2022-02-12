import { useRef, useEffect } from 'react';
import { preventDoubleClick } from '../scripts/preventDoubleClick.js';

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

export default Themes;