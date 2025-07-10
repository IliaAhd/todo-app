import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type Dispatch,
} from "react";

interface ThemeContextType {
  theme: string;
  setTheme: Dispatch<string>;
}

const themes = {
  light: "light",
  dark: "dark",
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || themes.light
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
