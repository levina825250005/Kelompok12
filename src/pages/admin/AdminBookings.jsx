import { useMemo, useState } from "react";
import { useAdminData } from "../../context/AdminDataContext.jsx";

function displayDate(value) {
  if (!value) return "-";
  return new Date(`${value}T00:00:00`).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

export default function AdminBookings() {
  const { bookings, updateBooking, deleteBooking } = useAdminData();
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState(null);
  const filtered = useMemo(() => bookings.filter((booking) => `${booking.name} ${booking.room} ${booking.phone}`.toLowerCase().includes(keyword.toLowerCase())), [bookings, keyword]);

  function removeBooking(booking) {
    if (window.confirm(`Hapus booking dari ${booking.name}?`)) {
      deleteBooking(booking.id);
      if (selected?.id === booking.id) setSelected(null);
    }
  }

  return (
    <>
      <div className="admin-page-heading"><div><span className="admin-eyebrow">PENGELOLAAN</span><h1>Data Booking</h1><p>Lihat data calon penghuni dan perbarui status booking.</p></div><span className="admin-demo-badge">{bookings.length} Booking</span></div>
      <section className="admin-panel">
        <div className="admin-panel-heading"><div><h2>Daftar Booking</h2><p>Data dari form booking pengunjung.</p></div><input className="admin-search" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Cari nama, kamar, atau HP..." /></div>
        <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Calon Penghuni</th><th>Tipe Kamar</th><th>Tanggal Masuk</th><th>Status</th><th>Aksi</th></tr></thead><tbody>
          {filtered.map((booking) => <tr key={booking.id}>
            <td><strong>{booking.name}</strong><small>{booking.phone}</small></td><td>{booking.room}</td><td>{displayDate(booking.date)}</td>
            <td><select className="admin-status-select" value={booking.status} onChange={(e) => updateBooking(booking.id, { status: e.target.value })}><option>Menunggu</option><option>Diterima</option><option>Ditolak</option></select></td>
            <td><div className="admin-actions"><button className="admin-edit-btn" onClick={() => setSelected(booking)}>Detail</button><button className="admin-delete-btn" onClick={() => removeBooking(booking)}>Hapus</button></div></td>
          </tr>)}
        </tbody></table></div>
        {!filtered.length && <div className="admin-empty">Tidak ada data booking yang cocok.</div>}
      </section>
      {selected && <section className="admin-panel admin-detail-panel"><div className="admin-panel-heading"><div><h2>Detail Booking</h2><p>Informasi calon penghuni.</p></div><button className="admin-close-btn" onClick={() => setSelected(null)}>✕</button></div>
        <div className="admin-detail-grid">
          <p><small>Nama</small><strong>{selected.name}</strong></p><p><small>Email</small><strong>{selected.email}</strong></p><p><small>Nomor HP</small><strong>{selected.phone}</strong></p><p><small>Jumlah Penghuni</small><strong>{selected.occupants}</strong></p><p><small>Tipe Kamar</small><strong>{selected.room}</strong></p><p><small>Tanggal Masuk</small><strong>{displayDate(selected.date)}</strong></p><p><small>Jenis Kelamin</small><strong>{selected.gender || "-"}</strong></p><p><small>Fasilitas Tambahan</small><strong>{selected.extras?.join(", ") || "Tidak ada"}</strong></p><p className="admin-field-full"><small>Catatan</small><strong>{selected.notes || "Tidak ada catatan"}</strong></p>
        </div>
      </section>}
    </>
  );
}
