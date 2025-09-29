import { TenantProvider } from "./contexts/TenantProvider";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useRoutes } from "react-router-dom";
import routes from "./routes/routes";

function App() {
  let router = useRoutes(routes);
  return (
    <div>
      <TenantProvider>
        <ThemeProvider>{router}</ThemeProvider>
      </TenantProvider>
    </div>
  );
}

export default App;
