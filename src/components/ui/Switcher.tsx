import React from "react";

interface SwitcherProps {
  checked: boolean;
  onToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Switcher = ({ checked, onToggle }: SwitcherProps) => {
  return (
    <>
      <input
        className="w-0 h-0 invisible peer block"
        type="checkbox"
        id="theme"
        checked={checked}
        onChange={onToggle}
      />
      <label
        className="cursor-pointer w-20 h-10 bg-yellow-400 block rounded-full relative after:content-[''] after:absolute after:w-8 after:h-8 after:bg-slate-200 after:rounded-full after:duration-300 after:top-1 after:left-1 peer-checked:bg-slate-700 peer-checked:after:bg-yellow-400 peer-checked:after:left-[calc(100%-4px)] peer-checked:after:-translate-x-full active:after:w-30"
        htmlFor="theme"
      >
        {/* Toggle {theme === Theme.DARK ? "Light" : "Dark"} */}
      </label>
    </>
  );
};

export default Switcher;
