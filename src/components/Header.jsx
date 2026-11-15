import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return <header className="site-header">
    <Link className="logo" to="/">Kos Ibu Tri</Link>
    <nav aria-label="Navigasi utama">
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/kamar-harga#kamar">Kamar & Fasilitas</NavLink></li>
        <li className="has-submenu">
          <NavLink to="/about-us">About Us</NavLink>
          <ul className="submenu">
            <li><Link to="/about-us#lokasi">Lokasi</Link></li>
            <li><Link to="/about-us#kontak">Kontak</Link></li>
          </ul>
        </li>
        <li><NavLink to="/promo">Promo</NavLink></li>
      </ul>
    </nav>
    <Link to="/promo#booking" className="btn-pink">Booking</Link>
  </header>;
}