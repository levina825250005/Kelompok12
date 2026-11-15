import { NavLink, useNavigate } from "react-router-dom";

const menuItems = [
  { to: "/admin", label: "Overview", icon: "bi-speedometer2", end: true },
  { to: "/admin/kamar", label: "Data Kamar", icon: "bi-door-open" },
  { to: "/admin/promo", label: "Data Promo", icon: "bi-tags" },
  { to: "/admin/booking", label: "Data Booking", icon: "bi-journal-check" },
  { to: "/admin/pembayaran", label: "Data Pembayaran", icon: "bi-wallet2" },
];

export default function AdminSidebar() {
  const navigate = useNavigate();

  // Pada layar kecil, tutup sidebar setelah admin memilih menu.
  // Klik tombol toggle AdminLTE agar status sidebar dan backdrop ikut diperbarui.
  function closeSidebarOnMobile() {
    const isMobile = window.matchMedia("(max-width: 991.98px)").matches;
    const sidebarIsOpen = document.body.classList.contains("sidebar-open");

    if (isMobile && sidebarIsOpen) {
      document.querySelector('[data-lte-toggle="sidebar"]')?.click();
    }
  }

  function logout() {
    sessionStorage.removeItem("kosIbuTriAdmin");
    navigate("/admin/login", { replace: true });
  }

  return (
    <aside className="app-sidebar bg-dark shadow" data-bs-theme="dark">
      <div className="sidebar-brand">
        <NavLink to="/admin" className="brand-link">
          <span className="brand-image admin-brand-mark">KT</span>
          <span className="brand-text fw-light">Kos Ibu Tri</span>
        </NavLink>
      </div>

      <div className="sidebar-wrapper">
        <nav className="mt-2" aria-label="Navigasi admin">
          <ul
            className="nav sidebar-menu flex-column"
            data-lte-toggle="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-header">MENU UTAMA</li>
            {menuItems.map((item) => (
              <li className="nav-item" key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={closeSidebarOnMobile}
                  className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                >
                  <i className={`nav-icon bi ${item.icon}`} />
                  <p>{item.label}</p>
                </NavLink>
              </li>
            ))}
            <li className="nav-header mt-3">LAINNYA</li>
            <li className="nav-item">
              <NavLink to="/" end onClick={closeSidebarOnMobile} className="nav-link">
                <i className="nav-icon bi bi-house-door" />
                <p>Lihat Website</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <button type="button" className="nav-link admin-logout-link" onClick={logout}>
                <i className="nav-icon bi bi-box-arrow-right" />
                <p>Logout</p>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
