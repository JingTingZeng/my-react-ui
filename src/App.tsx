import { useEffect, useState } from "react";
import "./App.css";
import { Theme, ThemeContext } from "./libs/context/theme-context";
import Nav from "./components/Nav";
import Card from "./components/ui/Card";
import Button from "./components/ui/Button";
import Calculator from "./components/Calculator";
import TodoList from "./components/TodoList";
import TicTacToe from "./components/TicTacToe";
import ContactForm from "./components/ContactForm";

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
        <div className="container mx-auto mt-10 grid grid-cols-1 gap-8 px-5 sm:px-0">
          <Card title="TicTacToe">
            <div className="flex justify-center">
              <TicTacToe></TicTacToe>
            </div>
          </Card>
          <Card title="Calculator">
            <div className="flex justify-center">
              <Calculator></Calculator>
            </div>
          </Card>
          <Card title="Todo">
            <TodoList></TodoList>
          </Card>
          <Card title="Validate Form">
            <div className="flex justify-center">
              <ContactForm></ContactForm>
            </div>
          </Card>
          <Card title="Button">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button disabled={false} style="primary">
                Primary
              </Button>
              <Button disabled={true} style="primary">
                Primary disabled
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <Button disabled={false} style="secondary">
                Secondary
              </Button>
              <Button disabled={true} style="secondary">
                Secondary disabled
              </Button>
            </div>
          </Card>
        </div>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
