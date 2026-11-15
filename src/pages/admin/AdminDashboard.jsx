import { Link } from "react-router-dom";
import { useAdminData } from "../../context/AdminDataContext.jsx";

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

export default function AdminDashboard() {
  const { rooms, promotions, bookings } = useAdminData();
  const waiting = bookings.filter((item) => item.status === "Menunggu").length;
  const stats = [
    { label: "Tipe Kamar", value: rooms.length, icon: "▣", note: "Data kamar" },
    { label: "Total Promo", value: promotions.length, icon: "◇", note: "Data promo" },
    { label: "Total Booking", value: bookings.length, icon: "▤", note: "Seluruh booking" },
    { label: "Menunggu", value: waiting, icon: "◷", note: "Perlu diperiksa" },
  ];

  return (
    <>
      <div className="admin-page-heading">
        <div><span className="admin-eyebrow">RINGKASAN</span><h1>Dashboard Overview</h1><p>Selamat datang! Berikut ringkasan Kos Ibu Tri.</p></div>
        <span className="admin-demo-badge">Data Demo</span>
      </div>
      <div className="admin-stat-grid">
        {stats.map((stat) => <article className="admin-stat-card" key={stat.label}>
          <span className="admin-stat-icon">{stat.icon}</span>
          <div><p>{stat.label}</p><strong>{stat.value}</strong><small>{stat.note}</small></div>
        </article>)}
      </div>
      <section className="admin-panel">
        <div className="admin-panel-heading"><div><h2>Booking Terbaru</h2><p>Aktivitas booking yang masuk.</p></div><Link to="/admin/booking" className="admin-text-link">Lihat semua →</Link></div>
        {bookings.length ? <div className="admin-table-wrap"><table className="admin-table">
          <thead><tr><th>Nama</th><th>Tipe Kamar</th><th>Tanggal Masuk</th><th>Status</th></tr></thead>
          <tbody>{bookings.slice(0, 5).map((booking) => <tr key={booking.id}>
            <td><strong>{booking.name}</strong><small>{booking.phone}</small></td><td>{booking.room}</td><td>{formatDate(booking.date)}</td><td><span className={`admin-status status-${booking.status.toLowerCase()}`}>{booking.status}</span></td>
          </tr>)}</tbody>
        </table></div> : <div className="admin-empty">Belum ada booking. Booking baru dari website akan muncul di sini.</div>}
      </section>
      <div className="admin-quick-grid">
        <Link to="/admin/kamar" className="admin-quick-card"><span>▣</span><div><strong>Kelola Kamar</strong><small>Tambah atau ubah informasi kamar.</small></div><b>→</b></Link>
        <Link to="/admin/promo" className="admin-quick-card"><span>◇</span><div><strong>Kelola Promo</strong><small>Perbarui penawaran untuk pengunjung.</small></div><b>→</b></Link>
        <Link to="/admin/pembayaran" className="admin-quick-card"><span><i className="bi bi-wallet2" /></span><div><strong>Data Pembayaran</strong><small>Pantau transaksi dan tunggakan penghuni.</small></div><b>→</b></Link>
      </div>
    </>
  );
}
