import { useMemo, useState } from "react";
import { useAdminData } from "../../context/AdminDataContext.jsx";
import { formatRupiah } from "../../utils/storage.js";

function parseLocalDate(value) {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function dateToISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addMonths(value, count) {
  const date = parseLocalDate(value);
  if (!date) return "";
  const originalDay = date.getDate();
  date.setDate(1);
  date.setMonth(date.getMonth() + Number(count));
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  date.setDate(Math.min(originalDay, lastDay));
  return dateToISO(date);
}

function daysBetween(from, to) {
  const start = parseLocalDate(from);
  const end = parseLocalDate(to);
  if (!start || !end) return 0;
  return Math.max(0, Math.floor((Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) -
    Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) / 86400000));
}

function formatDate(value) {
  const date = parseLocalDate(value);
  return date
    ? date.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })
    : "-";
}

function stayDuration(startDate, today) {
  const start = parseLocalDate(startDate);
  const end = parseLocalDate(today);
  if (!start || !end || end < start) return "Belum mulai";
  let months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
  if (end.getDate() < start.getDate()) months -= 1;
  months = Math.max(0, months);
  const anchor = parseLocalDate(addMonths(startDate, months));
  const days = anchor ? daysBetween(dateToISO(anchor), today) : 0;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const parts = [];
  if (years) parts.push(`${years} th`);
  if (remainingMonths) parts.push(`${remainingMonths} bln`);
  if (days || !parts.length) parts.push(`${days} hari`);
  return parts.join(" ");
}

function getPaymentStatus(nextDueDate, today) {
  if (!nextDueDate) return { label: "Belum ada jatuh tempo", days: 0, className: "status-menunggu" };
  const days = daysBetween(nextDueDate, today);
  if (nextDueDate < today) return { label: `Nunggak ${days} hari`, days, className: "status-ditolak" };
  if (nextDueDate === today) return { label: "Jatuh tempo hari ini", days: 0, className: "status-menunggu" };
  return { label: "Belum jatuh tempo", days: 0, className: "status-diterima" };
}

export default function AdminPayments() {
  const { bookings, rooms, paymentRecords, savePaymentRecord } = useAdminData();
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState(null);

  const today = dateToISO(new Date());
  const residents = useMemo(() => bookings
    .filter((booking) => booking.status === "Diterima")
    .map((booking) => {
      const saved = paymentRecords.find((item) => item.bookingId === booking.id);
      const room = rooms.find((item) =>
        item.name.toLowerCase().includes(String(booking.room || "").toLowerCase()) ||
        String(booking.room || "").toLowerCase().includes(item.name.toLowerCase().replace("kamar ", ""))
      );
      const monthlyRent = saved?.monthlyRent ?? room?.price ?? 0;
      const checkInDate = saved?.checkInDate || booking.date;
      return {
        id: saved?.id || `payment-${booking.id}`,
        bookingId: booking.id,
        name: booking.name,
        room: booking.room,
        checkInDate,
        monthlyRent,
        history: saved?.history || [],
        nextDueDate: saved?.nextDueDate || addMonths(checkInDate, 1),
      };
    }), [bookings, rooms, paymentRecords]);

  const filtered = useMemo(() => residents.filter((resident) =>
    `${resident.name} ${resident.room} ${resident.bookingId}`.toLowerCase().includes(keyword.toLowerCase())
  ), [residents, keyword]);

  const overdueCount = residents.filter((resident) =>
    resident.nextDueDate && resident.nextDueDate < today
  ).length;
  const totalTransactions = residents.reduce((sum, resident) => sum + resident.history.length, 0);
  const totalPaid = residents.reduce((sum, resident) =>
    sum + resident.history.reduce((subtotal, item) => subtotal + Number(item.amount || 0), 0), 0
  );

  function recordPayment(resident) {
    const raw = window.prompt(
      `Pembayaran ${resident.name}\nBerapa bulan sewa yang dibayarkan?`,
      "1"
    );
    if (raw === null) return;
    const monthsCovered = Number(raw);
    if (!Number.isInteger(monthsCovered) || monthsCovered < 1 || monthsCovered > 12) {
      window.alert("Masukkan jumlah bulan antara 1 sampai 12.");
      return;
    }

    const payment = {
      id: `trx-${Date.now()}`,
      date: today,
      monthsCovered,
      amount: Number(resident.monthlyRent || 0) * monthsCovered,
    };
    const nextDueDate = addMonths(resident.nextDueDate || resident.checkInDate, monthsCovered);
    savePaymentRecord({
      id: resident.id,
      bookingId: resident.bookingId,
      checkInDate: resident.checkInDate,
      monthlyRent: resident.monthlyRent,
      nextDueDate,
      history: [...resident.history, payment],
    });
  }

  function resetPaymentRecord(resident) {
    if (!window.confirm(`Hapus riwayat pembayaran ${resident.name}? Data booking tidak akan dihapus.`)) return;
    savePaymentRecord({
      id: resident.id,
      bookingId: resident.bookingId,
      checkInDate: resident.checkInDate,
      monthlyRent: resident.monthlyRent,
      nextDueDate: addMonths(resident.checkInDate, 1),
      history: [],
    });
    setSelected(null);
  }

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">KEUANGAN PENGHUNI</span>
          <h1>Data Pembayaran</h1>
          <p>Pantau riwayat pembayaran, lama tinggal, dan tunggakan penghuni.</p>
        </div>
        <span className="admin-demo-badge">{residents.length} Penghuni Aktif</span>
      </div>

      <div className="admin-stat-grid">
        <article className="admin-stat-card">
          <span className="admin-stat-icon"><i className="bi bi-people" /></span>
          <div><p>Penghuni Aktif</p><strong>{residents.length}</strong><small>Booking berstatus Diterima</small></div>
        </article>
        <article className="admin-stat-card">
          <span className="admin-stat-icon"><i className="bi bi-receipt" /></span>
          <div><p>Total Transaksi</p><strong>{totalTransactions}</strong><small>Jumlah pembayaran tercatat</small></div>
        </article>
        <article className="admin-stat-card">
          <span className="admin-stat-icon"><i className="bi bi-exclamation-circle" /></span>
          <div><p>Penghuni Menunggak</p><strong>{overdueCount}</strong><small>Sudah melewati jatuh tempo</small></div>
        </article>
        <article className="admin-stat-card">
          <span className="admin-stat-icon"><i className="bi bi-wallet2" /></span>
          <div><p>Total Uang Masuk</p><strong>{formatRupiah(totalPaid)}</strong><small>Akumulasi pembayaran tercatat</small></div>
        </article>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div><h2>Daftar Pembayaran Penghuni</h2><p>Penghuni diambil dari booking yang sudah Diterima.</p></div>
          <input className="admin-search" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Cari nama atau kamar..." />
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table admin-payment-table">
            <thead><tr>
              <th>Penghuni</th><th>Lama Tinggal</th><th>Sudah Bayar</th><th>Jatuh Tempo</th><th>Tunggakan</th><th>Aksi</th>
            </tr></thead>
            <tbody>
              {filtered.map((resident) => {
                const status = getPaymentStatus(resident.nextDueDate, today);
                return (
                  <tr key={resident.bookingId}>
                    <td><strong>{resident.name}</strong><small>{resident.room} · {formatRupiah(resident.monthlyRent)}/bulan</small></td>
                    <td>{stayDuration(resident.checkInDate, today)}<small>Sejak {formatDate(resident.checkInDate)}</small></td>
                    <td><strong>{resident.history.length} kali</strong><small>{formatRupiah(resident.history.reduce((sum, item) => sum + Number(item.amount || 0), 0))}</small></td>
                    <td>{formatDate(resident.nextDueDate)}</td>
                    <td><span className={`admin-status ${status.className}`}>{status.label}</span></td>
                    <td><div className="admin-actions">
                      <button type="button" className="admin-primary-btn" onClick={() => recordPayment(resident)}>Catat Bayar</button>
                      <button type="button" className="admin-edit-btn" onClick={() => setSelected(resident)}>Riwayat</button>
                    </div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {!filtered.length && <div className="admin-empty">Belum ada penghuni aktif yang cocok. Ubah status booking menjadi Diterima untuk menampilkan penghuni di sini.</div>}
      </section>

      {selected && (
        <section className="admin-panel admin-detail-panel">
          <div className="admin-panel-heading">
            <div><h2>Riwayat Pembayaran</h2><p>{selected.name} · {selected.room}</p></div>
            <button type="button" className="admin-close-btn" onClick={() => setSelected(null)}>✕</button>
          </div>
          <div className="admin-detail-grid">
            <p><small>Tanggal mulai tinggal</small><strong>{formatDate(selected.checkInDate)}</strong></p>
            <p><small>Lama tinggal</small><strong>{stayDuration(selected.checkInDate, today)}</strong></p>
            <p><small>Jumlah transaksi</small><strong>{selected.history.length} kali</strong></p>
            <p><small>Jatuh tempo berikutnya</small><strong>{formatDate(selected.nextDueDate)}</strong></p>
          </div>
          <div className="admin-table-wrap mt-3">
            <table className="admin-table">
              <thead><tr><th>Tanggal Bayar</th><th>Untuk Sewa</th><th>Jumlah</th></tr></thead>
              <tbody>
                {selected.history.map((item) => (
                  <tr key={item.id}><td>{formatDate(item.date)}</td><td>{item.monthsCovered} bulan</td><td>{formatRupiah(item.amount)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          {!selected.history.length && <div className="admin-empty">Belum ada pembayaran yang dicatat.</div>}
          <div className="admin-form-actions mt-3">
            <button type="button" className="admin-delete-btn" onClick={() => resetPaymentRecord(selected)}>Reset Riwayat</button>
          </div>
        </section>
      )}
    </>
  );
}
