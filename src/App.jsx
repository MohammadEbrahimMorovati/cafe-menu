import MenuPage from "./pages/Menu/menuPage";
import ProductCart from "./components/card/Product/productNormalCart";

function App() {
  return (
    <div>
      <h1>MORO</h1>
      <MenuPage />
      <ProductCart />
    </div>
  );
}

export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// src/App.jsx
// import { useEffect } from "react";
// import api from "./api/api";

// function App() {
//   useEffect(() => {
//     api
//       .get("/products")
//       .then((res) => {
//         console.log("لیست محصولات:", res.data);
//       })
//       .catch((err) => {
//         console.error("خطا در دریافت محصولات:", err);
//       });
//   }, []);

//   return <h1>Check console!</h1>;
// }

// export default App;

// import React, { useEffect, useState } from 'react';
// import api from './api/api';  // مسیر رو متناسب پروژه‌ات درست کن

// // توابع API
// export const getServices = () => api.get('/categories');
// export const getServiceById = (id) => api.get(`/categories/${id}`);
// export const createService = (data) => api.post('/categories', data);

// // کامپوننت React برای تست گرفتن لیست سرویس‌ها
// const App = () => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     getServices()
//       .then((res) => {
//         setServices(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message || 'خطا در دریافت سرویس‌ها');
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>در حال بارگذاری...</p>;
//   if (error) return <p>خطا: {error}</p>;

//   return (
//     <div>
//       <h1>لیست سرویس‌ها</h1>
//       <ul>
//         {services.map((service) => (
//           <li key={service.id}>
//             {service.name} - {service.description}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;
