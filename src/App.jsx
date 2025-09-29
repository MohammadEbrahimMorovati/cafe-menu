import HomePage from "./pages/moro/homePage";
import { useEffect } from "react";

function App() {
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
      <HomePage />
    </div>
  );
}

export default App;
