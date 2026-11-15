import { createContext, useContext, useEffect, useState } from "react";
import { rooms as defaultRooms, promotions as defaultPromotions } from "../data.js";
import { formatRupiah, loadData, saveData } from "../utils/storage.js";

const AdminDataContext = createContext(null);

// Data contoh agar dashboard langsung memiliki isi saat pertama dibuka.
const defaultBookings = [
  {
    id: "booking-demo-1",
    name: "Andi Pratama",
    email: "andi@example.com",
    phone: "081234567801",
    occupants: "1",
    room: "Deluxe",
    date: "2026-11-10",
    gender: "Laki-laki",
    extras: ["WiFi"],
    notes: "Contoh data booking",
    status: "Menunggu",
    createdAt: "2026-11-02T09:00:00.000Z",
  },
  {
    id: "booking-demo-2",
    name: "Sinta Maharani",
    email: "sinta@example.com",
    phone: "081234567802",
    occupants: "1",
    room: "VIP",
    date: "2026-11-12",
    gender: "Perempuan",
    extras: ["Laundry", "Parkir"],
    notes: "Contoh data booking",
    status: "Diterima",
    createdAt: "2026-11-01T10:30:00.000Z",
  },
  {
    id: "booking-demo-3",
    name: "Rina Amelia",
    email: "rina@example.com",
    phone: "081234567803",
    occupants: "1",
    room: "Standar",
    date: "2026-11-15",
    gender: "Perempuan",
    extras: [],
    notes: "Contoh data booking",
    status: "Ditolak",
    createdAt: "2026-10-31T08:15:00.000Z",
  },
];

function prepareRoom(room) {
  const price = Number(room.price) || 0;
  return { ...room, price, priceLabel: `${formatRupiah(price)} / bln` };
}

export function AdminDataProvider({ children }) {
  const [rooms, setRooms] = useState(() => loadData("rooms", defaultRooms).map(prepareRoom));
  const [promotions, setPromotions] = useState(() => loadData("promotions", defaultPromotions));
  const [bookings, setBookings] = useState(() => loadData("bookings", defaultBookings));
  const [paymentRecords, setPaymentRecords] = useState(() => loadData("paymentRecords", []));

  useEffect(() => saveData("rooms", rooms), [rooms]);
  useEffect(() => saveData("promotions", promotions), [promotions]);
  useEffect(() => saveData("bookings", bookings), [bookings]);
  useEffect(() => saveData("paymentRecords", paymentRecords), [paymentRecords]);

  const addRoom = (room) => setRooms((current) => [...current, prepareRoom(room)]);
  const updateRoom = (id, changes) => setRooms((current) => current.map((room) => room.id === id ? prepareRoom({ ...room, ...changes }) : room));
  const deleteRoom = (id) => setRooms((current) => current.filter((room) => room.id !== id));

  const addPromotion = (promo) => setPromotions((current) => [...current, promo]);
  const updatePromotion = (id, changes) => setPromotions((current) => current.map((promo) => promo.id === id ? { ...promo, ...changes } : promo));
  const deletePromotion = (id) => setPromotions((current) => current.filter((promo) => promo.id !== id));

  const addBooking = (booking) => setBookings((current) => [booking, ...current]);
  const updateBooking = (id, changes) => setBookings((current) => current.map((booking) => booking.id === id ? { ...booking, ...changes } : booking));
  const deleteBooking = (id) => setBookings((current) => current.filter((booking) => booking.id !== id));

  // Satu ringkasan pembayaran disimpan untuk setiap booking/penghuni.
  const savePaymentRecord = (record) => setPaymentRecords((current) => {
    const exists = current.some((item) => item.bookingId === record.bookingId);
    return exists
      ? current.map((item) => item.bookingId === record.bookingId ? record : item)
      : [...current, record];
  });

  return (
    <AdminDataContext.Provider value={{
      rooms, promotions, bookings, paymentRecords,
      addRoom, updateRoom, deleteRoom,
      addPromotion, updatePromotion, deletePromotion,
      addBooking, updateBooking, deleteBooking, savePaymentRecord,
    }}>
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) throw new Error("useAdminData harus digunakan di dalam AdminDataProvider");
  return context;
}
