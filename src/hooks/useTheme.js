import { useLocalStorage } from "../hooks";
import { useEffect } from "react";

const useTheme = () => {
  const [selectedTheme, setSelectedTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    document.getElementById("root").setAttribute("data-theme", selectedTheme);
  }, [selectedTheme]);

  const handleThemeSwitch = () => {
    if (selectedTheme === "light") {
      setSelectedTheme("dark");
    } else {
      setSelectedTheme("light");
    }
  };
  return [selectedTheme, handleThemeSwitch];
};

export default useTheme;
