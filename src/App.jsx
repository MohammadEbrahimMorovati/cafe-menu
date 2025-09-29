import HomePage from "./pages/moro/homePage";
import { useEffect } from "react";
import { TenantProvider } from "./contexts/TenantProvider";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useRoutes } from "react-router-dom";
import routes from "./routes/routes";

function App() {
  let router = useRoutes(routes)
  
  useEffect(() => {
    fetch("https://cafejsonserver.liara.run/siteInfo")
      .then((res) => res.json())
      .then((data) => {
        if (data.title) {
          document.title = data.title;
        }
      });
  }, []);

  return (
    <div>
                <TenantProvider>
                <ThemeProvider >
              {router}
      </ThemeProvider>
      </TenantProvider>
    </div>
  );
}

export default App;
