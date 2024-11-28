import { FormControlLabel, Switch, useColorScheme } from "@mui/material";
import { useEffect } from "react";

export const Header = () => {
  const { mode, setMode } = useColorScheme();

  useEffect(() => {
    const storedMode = localStorage.getItem("mui-mode");
    if (storedMode === "dark" || storedMode === "light") {
      setMode(storedMode);
    }
  }, [setMode]);

  const toggleTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMode = event.target.checked ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("mui-mode", newMode);
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <FormControlLabel
        control={
          <Switch
            checked={mode === "dark"}
            onChange={toggleTheme}
            name="themeToggle"
            color="secondary"
          />
        }
        label={mode === "dark" ? "Dark Mode" : "Light Mode"}
      />
    </div>
  );
};
