import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState("light");

  const setMode = (mode) => {
    localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    theme === "light" ? setMode("dark") : setMode("light");
  };

  useEffect(() => {
    const userTheme = localStorage.getItem("theme");
    userTheme && setTheme(userTheme);
  }, [theme]);

  return [theme, toggleTheme];
};

export default useTheme;
