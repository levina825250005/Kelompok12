import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Rooms from "./pages/Rooms.jsx";
import About from "./pages/About.jsx";
import Promo from "./pages/Promo.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminRooms from "./pages/admin/AdminRooms.jsx";
import AdminPromos from "./pages/admin/AdminPromos.jsx";
import AdminBookings from "./pages/admin/AdminBookings.jsx";
import AdminPayments from "./pages/admin/AdminPayments.jsx";

function PublicLayout() {
  return <><Header /><Outlet /><Footer /></>;
}

function RequireAdmin() {
  return sessionStorage.getItem("kosIbuTriAdmin") === "true"
    ? <Outlet />
    : <Navigate to="/admin/login" replace />;
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/kamar-harga" element={<Rooms />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/promo" element={<Promo />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<RequireAdmin />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="kamar" element={<AdminRooms />} />
          <Route path="promo" element={<AdminPromos />} />
          <Route path="booking" element={<AdminBookings />} />
          <Route path="pembayaran" element={<AdminPayments />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
