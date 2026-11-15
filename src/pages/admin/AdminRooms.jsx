import { useState } from "react";
import { useAdminData } from "../../context/AdminDataContext.jsx";
import { formatRupiah } from "../../utils/storage.js";

const emptyForm = { name: "", price: "", summary: "", image: "/img/kamar-standar.jpeg", facilities: "" };

export default function AdminRooms() {
  const { rooms, addRoom, updateRoom, deleteRoom } = useAdminData();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(room) {
    setEditingId(room.id);
    setForm({ name: room.name, price: String(room.price), summary: room.summary || "", image: room.image || "/img/kamar-standar.jpeg", facilities: (room.facilities || []).join(", ") });
    setShowForm(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: form.name.trim(),
      price: Number(form.price),
      summary: form.summary.trim(),
      image: form.image.trim() || "/img/kamar-standar.jpeg",
      facilities: form.facilities.split(",").map((item) => item.trim()).filter(Boolean),
    };
    if (editingId) updateRoom(editingId, data);
    else addRoom({ ...data, id: `room-${Date.now()}` });
    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
  }

  function handleDelete(room) {
    if (window.confirm(`Hapus ${room.name}?`)) deleteRoom(room.id);
  }

  return (
    <>
      <div className="admin-page-heading">
        <div><span className="admin-eyebrow">PENGELOLAAN</span><h1>Data Kamar</h1><p>Atur nama, harga, gambar, dan fasilitas kamar.</p></div>
        <button className="admin-primary-btn" onClick={openAdd}>＋ Tambah Kamar</button>
      </div>

      {showForm && <section className="admin-panel admin-edit-panel">
        <div className="admin-panel-heading"><div><h2>{editingId ? "Edit Kamar" : "Tambah Kamar"}</h2><p>Lengkapi informasi kamar di bawah ini.</p></div><button type="button" className="admin-close-btn" onClick={() => setShowForm(false)}>✕</button></div>
        <form className="admin-form-grid" onSubmit={handleSubmit}>
          <div><label htmlFor="room-name">Nama Kamar</label><input id="room-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Contoh: Kamar Deluxe" required /></div>
          <div><label htmlFor="room-price">Harga per Bulan (Rp)</label><input id="room-price" type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="1700000" required /></div>
          <div className="admin-field-full"><label htmlFor="room-summary">Deskripsi Singkat</label><input id="room-summary" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} placeholder="Deskripsi kamar" required /></div>
          <div className="admin-field-full"><label htmlFor="room-image">Path Gambar</label><input id="room-image" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="/img/kamar-standar.jpeg" /></div>
          <div className="admin-field-full"><label htmlFor="room-facilities">Fasilitas (pisahkan dengan koma)</label><input id="room-facilities" value={form.facilities} onChange={(e) => setForm({ ...form, facilities: e.target.value })} placeholder="AC, Kamar mandi dalam, WiFi" /></div>
          <div className="admin-form-actions"><button className="admin-primary-btn" type="submit">{editingId ? "Simpan Perubahan" : "Tambah Kamar"}</button><button type="button" className="admin-secondary-btn" onClick={() => setShowForm(false)}>Batal</button></div>
        </form>
      </section>}

      <section className="admin-panel">
        <div className="admin-panel-heading"><div><h2>Daftar Tipe Kamar</h2><p>{rooms.length} tipe kamar terdaftar.</p></div></div>
        <div className="admin-table-wrap"><table className="admin-table">
          <thead><tr><th>Kamar</th><th>Harga / Bulan</th><th>Fasilitas</th><th>Aksi</th></tr></thead>
          <tbody>{rooms.map((room) => <tr key={room.id}>
            <td><div className="admin-room-cell"><img src={room.image} alt={room.name} /><strong>{room.name}</strong></div></td>
            <td>{formatRupiah(room.price)}</td><td>{(room.facilities || []).join(", ") || "-"}</td>
            <td><div className="admin-actions"><button className="admin-edit-btn" onClick={() => openEdit(room)}>Edit</button><button className="admin-delete-btn" onClick={() => handleDelete(room)}>Hapus</button></div></td>
          </tr>)}</tbody>
        </table></div>
        {!rooms.length && <div className="admin-empty">Belum ada kamar. Klik Tambah Kamar untuk membuat data.</div>}
      </section>
    </>
  );
}
