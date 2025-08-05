import { createContext, useEffect, useState } from "react";
import api from "../api/api.js"; // آدرس به axiosت

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    api
      .get("/theme")
      .then((res) => {
        console.log("تم دریافتی از بک‌اند:", res.data);
        setTheme(res.data); // 👈 این خط رو مستقیم بذار
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
