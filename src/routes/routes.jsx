import HomePage from "../pages/moro/homePage";

// let routes = [
//   { path: "/moro/:slug", element: <HomePage /> },
//   { path: "/ali/:slug", element: <HomePage /> },
// ];
const routes = [{ path: "/:tenantSlug/:slug?", element: <HomePage /> }];

export default routes;
