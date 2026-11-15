import { useState } from "react";
import { useAdminData } from "../context/AdminDataContext.jsx";
import PromoCard from "../components/PromoCard.jsx";

const initialForm = { name: "", email: "", phone: "", occupants: "1", room: "", date: "", gender: "", extras: [], notes: "" };

export default function Promo() {
  const { promotions, rooms, addBooking } = useAdminData();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setSubmitted(false);
  };
  const toggleExtra = (event) => {
    const { value, checked } = event.target;
    setForm((current) => ({ ...current, extras: checked ? [...current.extras, value] : current.extras.filter((item) => item !== value) }));
  };
  const submitBooking = (event) => {
    event.preventDefault();
    addBooking({
      ...form,
      id: `booking-${Date.now()}`,
      status: "Menunggu",
      createdAt: new Date().toISOString(),
    });
    setSubmitted(true);
    setForm(initialForm);
  };

  return <>
    <div className="page-hero"><span className="layout">KOS IBU TRI</span><h1>Promo & Info Kos</h1><p>Info terbaru, penawaran, dan cara booking kamar.</p></div>
    <section><span className="layout center">Promo</span><h2 className="section-title">Info & Promo Terbaru</h2>
      <div className="grid">{promotions.map((promo) => <PromoCard key={promo.id} promo={promo} />)}</div>
    </section>
    <section className="booking" id="booking"><span className="layout center">Form Booking</span><h2 className="section-title">Form Booking Kamar</h2>
      <form onSubmit={submitBooking}>
        <div><label htmlFor="booking-name">Nama Lengkap</label><input id="booking-name" name="name" value={form.name} onChange={update} placeholder="Masukkan nama" required /></div>
        <div><label htmlFor="booking-email">Email</label><input id="booking-email" name="email" type="email" value={form.email} onChange={update} placeholder="contoh@email.com" required /></div>
        <div><label htmlFor="booking-phone">No. HP / WhatsApp</label><input id="booking-phone" name="phone" value={form.phone} onChange={update} placeholder="08xxxxxxxxxx" required /></div>
        <div><label htmlFor="booking-occupants">Jumlah Penghuni</label><input id="booking-occupants" name="occupants" type="number" min="1" max="4" value={form.occupants} onChange={update} required /></div>
        <div><label htmlFor="booking-room">Tipe Kamar</label><select id="booking-room" name="room" value={form.room} onChange={update} required><option value="">-- Pilih Tipe Kamar --</option>{rooms.map((room) => <option key={room.id} value={room.name}>{room.name}</option>)}</select></div>
        <div><label htmlFor="booking-date">Tanggal Masuk</label><input id="booking-date" name="date" type="date" value={form.date} onChange={update} required /></div>
        <div className="choice-group"><label>Jenis Kelamin</label><div className="choices">
          <label><input type="radio" name="gender" value="Laki-laki" checked={form.gender === "Laki-laki"} onChange={update} required /> Laki-laki</label>
          <label><input type="radio" name="gender" value="Perempuan" checked={form.gender === "Perempuan"} onChange={update} /> Perempuan</label>
        </div></div>
        <div className="choice-group"><label>Fasilitas Tambahan</label><div className="choices">
          {["Laundry", "Parkir", "WiFi"].map((item) => <label key={item}><input type="checkbox" value={item} checked={form.extras.includes(item)} onChange={toggleExtra} /> {item}</label>)}
        </div></div>
        <div><label htmlFor="booking-notes">Catatan</label><textarea id="booking-notes" name="notes" value={form.notes} onChange={update} placeholder="Pertanyaan tambahan (opsional)" /></div>
        <button type="submit">Kirim Booking</button>
      </form>
      {submitted && <p className="form-success" role="status">Booking berhasil disimpan (demo) dan dapat dilihat oleh admin di Dashboard. Data masih tersimpan di browser, belum dikirim ke server.</p>}
    </section>
  </>;
}