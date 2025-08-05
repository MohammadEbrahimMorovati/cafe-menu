import { createContext, useEffect, useState } from "react";
import api from "https://cafejsonserver.liara.run"; // آدرس به axiosت

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    api
      .get("/theme") // فرض کنیم آدرس JSON اینه
      .then((res) => {
        const data = res.data;
        if (data.theme) {
          setTheme(data.theme);
        }
      })
      .catch(() => {
        setTheme({
          name: "light",
          primary: "#613A27",
          secondary: "#FBE6D3",
          bodyBg: "#FBE6D3",
        });
      });
  }, []);

  if (!theme) return <div>در حال بارگذاری تم...</div>;

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
}
