import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import AddPage from "./pages/AddPage";
import DetailPage from "./pages/DetailPage";

const Layout = () => {
  return (
    <div>
      <Nav />

      <Outlet />

      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="100vh">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="stocks" element={<MainPage />} />
          <Route path="stock/add" element={<AddPage />} />
          <Route path="stock/:id" element={<DetailPage />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
