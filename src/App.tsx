import { useEffect, useState } from "react";
import "./App.css";
import { Theme, ThemeContext } from "./libs/context/theme-context";
import Nav from "./components/Nav";
import Card from "./components/Card";
import Button from "./components/Button";

function App() {
  const [theme, setTheme] = useState(Theme.DARK);

  useEffect(() => {
    if (theme === Theme.DARK) {
      document.documentElement.classList.add(Theme.DARK);
    } else {
      document.documentElement.classList.remove(Theme.DARK);
    }
  }, [theme]);

  const handleToggleTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.checked ? Theme.DARK : Theme.LIGHT);
  };

  return (
    <div className="App font-sans">
      <ThemeContext.Provider value={theme}>
        <Nav onToggle={(e) => handleToggleTheme(e)}></Nav>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
