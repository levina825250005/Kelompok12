import { useState } from "react";
import { useAdminData } from "../../context/AdminDataContext.jsx";

const emptyForm = { title: "", date: "", description: "", image: "/img/promo-booking.png" };

export default function AdminPromos() {
  const { promotions, addPromotion, updatePromotion, deletePromotion } = useAdminData();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  function openAdd() { setEditingId(null); setForm(emptyForm); setShowForm(true); }
  function openEdit(promo) {
    setEditingId(promo.id);
    setForm({ title: promo.title, date: promo.date || "", description: promo.description || "", image: promo.image || "/img/promo-booking.png" });
    setShowForm(true);
  }
  function handleSubmit(event) {
    event.preventDefault();
    const data = { ...form, title: form.title.trim(), description: form.description.trim(), image: form.image.trim() || "/img/promo-booking.png" };
    if (editingId) updatePromotion(editingId, data);
    else addPromotion({ ...data, id: `promo-${Date.now()}` });
    setShowForm(false); setForm(emptyForm); setEditingId(null);
  }
  function handleDelete(promo) { if (window.confirm(`Hapus promo "${promo.title}"?`)) deletePromotion(promo.id); }

  return (
    <>
      <div className="admin-page-heading"><div><span className="admin-eyebrow">PENGELOLAAN</span><h1>Data Promo</h1><p>Atur informasi promo yang tampil di website.</p></div><button className="admin-primary-btn" onClick={openAdd}>＋ Tambah Promo</button></div>
      {showForm && <section className="admin-panel admin-edit-panel">
        <div className="admin-panel-heading"><div><h2>{editingId ? "Edit Promo" : "Tambah Promo"}</h2><p>Lengkapi informasi penawaran.</p></div><button type="button" className="admin-close-btn" onClick={() => setShowForm(false)}>✕</button></div>
        <form className="admin-form-grid" onSubmit={handleSubmit}>
          <div><label htmlFor="promo-title">Nama Promo</label><input id="promo-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Nama promo" required /></div>
          <div><label htmlFor="promo-date">Tanggal / Periode</label><input id="promo-date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="Contoh: November 2026" required /></div>
          <div className="admin-field-full"><label htmlFor="promo-description">Deskripsi</label><textarea id="promo-description" rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Deskripsi promo" required /></div>
          <div className="admin-field-full"><label htmlFor="promo-image">Path Gambar</label><input id="promo-image" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="/img/promo-booking.png" /></div>
          <div className="admin-form-actions"><button className="admin-primary-btn" type="submit">{editingId ? "Simpan Perubahan" : "Tambah Promo"}</button><button type="button" className="admin-secondary-btn" onClick={() => setShowForm(false)}>Batal</button></div>
        </form>
      </section>}
      <section className="admin-panel"><div className="admin-panel-heading"><div><h2>Daftar Promo</h2><p>{promotions.length} promo terdaftar.</p></div></div>
        <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Promo</th><th>Periode</th><th>Deskripsi</th><th>Aksi</th></tr></thead><tbody>
          {promotions.map((promo) => <tr key={promo.id}><td><div className="admin-room-cell"><img src={promo.image} alt={promo.title} /><strong>{promo.title}</strong></div></td><td>{promo.date}</td><td>{promo.description}</td><td><div className="admin-actions"><button className="admin-edit-btn" onClick={() => openEdit(promo)}>Edit</button><button className="admin-delete-btn" onClick={() => handleDelete(promo)}>Hapus</button></div></td></tr>)}
        </tbody></table></div>
        {!promotions.length && <div className="admin-empty">Belum ada promo. Klik Tambah Promo untuk membuat data.</div>}
      </section>
    </>
  );
}
