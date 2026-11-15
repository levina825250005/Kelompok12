import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useAdminData } from "../context/AdminDataContext.jsx";
import RoomCard from "../components/RoomCard.jsx";
import FacilityCard from "../components/FacilityCard.jsx";

const inRoom = [
  { icon: "🛏️", name: "Kasur & Lemari", description: "Perabot dasar di setiap kamar." },
  { icon: "📚", name: "Meja Belajar", description: "Ruang kerja pribadi." },
  { icon: "❄️", name: "AC / Kipas Angin", description: "Tersedia sesuai tipe kamar." },
  { icon: "🚿", name: "Kamar Mandi Dalam", description: "Untuk semua tipe kamar." }
];
const shared = [
  { icon: "🍳", name: "Dapur Bersama", description: "Untuk memasak sehari-hari." },
  { icon: "🛋️", name: "Ruang Tamu", description: "Tempat bersantai & menerima tamu." },
  { icon: "🧺", name: "Laundry", description: "Layanan cuci dalam area kos." },
  { icon: "🛵", name: "Parkir", description: "Area parkir motor & sepeda." },
  { icon: "🔒", name: "CCTV & Satpam", description: "Keamanan selama 24 jam." },
  { icon: "📶", name: "WiFi", description: "Koneksi di seluruh area kos." }
];

export default function Rooms() {
  const { rooms } = useAdminData();
  const [searchParams] = useSearchParams();
  const typeFilter = searchParams.get("type") || "";
  const priceFilter = searchParams.get("price") || "";
  const visibleRooms = useMemo(() => rooms.filter((room) => {
    const typeMatch = !typeFilter || room.id === typeFilter;
    const priceMatch = !priceFilter || (priceFilter === "low" ? room.price < 1500000 : priceFilter === "mid" ? room.price >= 1500000 && room.price <= 2000000 : room.price > 2000000);
    return typeMatch && priceMatch;
  }), [rooms, typeFilter, priceFilter]);

  return <>
    <div className="page-hero"><span className="layout">KOS IBU TRI</span><h1>Kamar & Harga</h1><p>Pilih tipe kamar sesuai kebutuhan dan budget kamu.</p></div>
    <section className="room-section" id="kamar"><span className="layout center">Tipe Kamar</span>
      <h2 className="section-title">Daftar Tipe Kamar</h2>
      {(typeFilter || priceFilter) && <p className="section-sub">Hasil pencarian kamar sesuai filter yang dipilih.</p>}
      <div className="grid">{visibleRooms.map((room) => <RoomCard key={room.id} room={room} />)}</div>
      {!visibleRooms.length && <p className="empty-state">Tidak ada kamar yang cocok dengan pencarian tersebut.</p>}
    </section>
    <section className="facility-section" id="fasilitas"><span className="layout center">Fasilitas Kamar</span>
      <h2 className="section-title">Di Dalam Kamar</h2><div className="fac-grid">{inRoom.map((f) => <FacilityCard key={f.name} {...f} />)}</div>
    </section>
    <section className="facility-section green-section"><span className="layout center">Fasilitas Bersama</span>
      <h2 className="section-title">Area Bersama</h2><div className="fac-grid">{shared.map((f) => <FacilityCard key={f.name} {...f} />)}</div>
    </section>
  </>;
}