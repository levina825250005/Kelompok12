import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar.jsx";

/** AdminLTE v4 application shell. The pages rendered by Outlet keep their existing CRUD logic. */
export default function AdminLayout() {
  useEffect(() => {
    const bodyClasses = ["layout-fixed", "sidebar-expand-lg", "bg-body-tertiary"];
    document.body.classList.add(...bodyClasses);
    return () => document.body.classList.remove(...bodyClasses);
  }, []);

  return (
    <div className="app-wrapper admin-shell">
      <nav className="app-header navbar navbar-expand bg-body shadow-sm">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                type="button"
                className="nav-link"
                data-lte-toggle="sidebar"
                aria-label="Buka atau tutup menu navigasi"
                title="Buka/tutup menu"
              >
                <i className="bi bi-list" />
              </button>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-2 ms-auto">
            <span className="text-secondary small d-none d-sm-inline">Pengelolaan Kos Ibu Tri</span>
            <span className="admin-user-chip"><i className="bi bi-person-circle me-2" />Admin</span>
          </div>
        </div>
      </nav>

      <AdminSidebar />

      <main className="app-main admin-main">
        <div className="app-content admin-content">
          <div className="container-fluid px-0">
            <Outlet />
          </div>
        </div>
      </main>

      <footer className="app-footer admin-footer">
        <span><strong>Kos Ibu Tri</strong> · Admin Dashboard</span>
        <span className="text-secondary">Dikelola oleh Admin</span>
      </footer>
    </div>
  );
}
