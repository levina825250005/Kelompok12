import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { facilities } from "../data.js";
import { useAdminData } from "../context/AdminDataContext.jsx";
import RoomCard from "../components/RoomCard.jsx";
import FacilityCard from "../components/FacilityCard.jsx";

export default function Home() {
  const [roomType, setRoomType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const { rooms } = useAdminData();
  const navigate = useNavigate();

function handleSearch(event) {
  event.preventDefault();

  const params = new URLSearchParams();
  if (roomType) params.set("type", roomType);
  if (priceRange) params.set("price", priceRange);
  navigate(`/kamar-harga?${params.toString()}#kamar`);
}

  return <>
    <section className="hero">
      <span className="layout">Melihat Lebih Jauh</span>
      <h1>Cari Kos Nyaman &amp; Strategis Jadi Lebih Mudah</h1>
      <p>Temukan kamar kos sesuai budget dan lokasi kampus kamu, lengkap dengan fasilitas terbaik.</p>
      <form className="search-box" onSubmit={handleSearch}>
        <select value={roomType} onChange={(e) => setRoomType(e.target.value)} aria-label="Tipe kamar">
          <option value="">Tipe kamar</option>{rooms.map((room) => <option key={room.id} value={room.id}>{room.name.replace(/^Kamar\s*/i, "")}</option>)}
        </select>
        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} aria-label="Rentang harga">
          <option value="">Rentang harga</option><option value="low">Di bawah Rp 1.500.000</option><option value="mid">Rp 1.500.000 - Rp 2.000.000</option><option value="high">Di atas Rp 2.000.000</option>
        </select>
        <button type="submit">Cari</button>
      </form>
    </section>

    <section className="about">
      <div className="about-img"><img src="/img/kos.jpeg" alt="Foto Kos Ibu Tri" /></div>
      <div className="about-content"><span className="layout">Tentang</span>
        <h2>Selamat Datang di Kos Ibu Tri</h2>
        <p>Kos Ibu Tri merupakan tempat tinggal yang mengutamakan kenyamanan, keamanan, dan kedekatan dengan kampus. Cocok untuk mahasiswa yang mencari hunian tenang dengan fasilitas yang lengkap.</p>
      </div>
    </section>

    <section className="video-section">
      <span className="layout center">Video</span><h2 className="section-title">Video Profil Kos</h2>
      <p className="section-sub">Lihat suasana kamar dan lingkungan Kos Ibu Tri lebih dekat.</p>
      <div className="video-wrapper"><video controls poster="/img/kos.jpeg"><source src="/video/video.mp4" type="video/mp4" />Browser kamu tidak mendukung tag video.</video></div>
    </section>

    <section className="room-section" id="hasil-pencarian">
      <span className="layout center">Kamar & Harga</span>
      <h2 className="section-title">Pilihan Tipe Kamar</h2>
      <p className="section-sub">Beberapa contoh tipe kamar yang tersedia.</p>
      <div className="grid">{rooms.map((room) => <RoomCard key={room.id} room={room} />)}</div>
      <p className="more-link"><Link to="/kamar-harga#kamar">Lihat detail kamar & fasilitas →</Link></p>
    </section>

    <section className="facilities">
      <span className="layout center">Fasilitas</span><h2 className="section-title">Fasilitas Kos</h2>
      <div className="fac-grid">{facilities.map((facility) => <FacilityCard key={facility.name} {...facility} />)}</div>
    </section>

    <section className="cta">
      <span className="layout">Booking Form</span><h2>Tertarik Booking Kamar?</h2>
      <p>Isi form pendaftaran, kemudian tunggu konfirmasi dari pihak Kos.</p>
      <Link to="/promo#booking">Booking Sekarang</Link>
    </section>
  </>;
}