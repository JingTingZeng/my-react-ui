import React, { useContext } from "react";
import { Theme, ThemeContext } from "../libs/context/theme-context";
import Switcher from "./Switcher";

interface NavProps {
  onToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Nav = ({ onToggle }: NavProps) => {
  const theme = useContext(ThemeContext);
  return (
    <div className="flex w-full px-8 py-3 justify-between">
      <div className="text-4xl font-bold">My UI</div>
      <div className="flex items-center">
        <span className="text-lg inline-block mr-2 font-bold">
          {theme === Theme.DARK ? "Dark" : "Light"}:
        </span>
        <Switcher checked={theme === Theme.DARK} onToggle={onToggle} />
      </div>
    </div>
  );
};

export default Nav;
