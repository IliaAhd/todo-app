import { useEffect } from "react";
import { ReactSVG } from "react-svg";
import { useTheme } from "../contexts/ThemeContext";

export default function Header() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  function themeChange() {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  }

  return (
    <header className="flex justify-between">
      <h1 className="text-3xl font-bold tracking-[10px]">TODO</h1>
      <button onClick={themeChange} aria-label="Toggle theme">
        <ReactSVG src={theme === "dark" ? "/icon-sun.svg" : "/icon-moon.svg"} />
      </button>
    </header>
  );
}
