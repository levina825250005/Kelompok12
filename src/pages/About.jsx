export default function About() {
  return <>
    <div className="page-hero"><span className="layout">KOS IBU TRI</span><h1>About Us</h1><p>Informasi kontak dan lokasi Kos Ibu Tri.</p></div>
    <section className="contact-section" id="kontak"><span className="layout center">Kontak</span>
      <h2 className="section-title">Hubungi Kos Ibu Tri</h2><p className="section-sub">Untuk informasi kamar dan booking, silakan hubungi kontak berikut.</p>
      <div className="card contact-card"><div className="card-body"><h3>Kontak Pemilik Kos</h3><p>WhatsApp: 0811-2222-3333</p><p>Email: kosibutri@email.com</p></div></div>
    </section>
    <section className="access" id="lokasi"><span className="layout center">Lokasi</span><h2 className="section-title">Akses & Transportasi</h2>
      <div className="access-content"><div className="access-img"><img src="/img/kos.jpeg" alt="Lokasi Kos Ibu Tri" /></div>
        <div className="access-text"><h3>Lokasi Strategis</h3><p>Kos Ibu Tri berada di lokasi yang mudah dijangkau oleh mahasiswa dan dekat dengan berbagai fasilitas umum.</p>
          <p>1.5 km dengan Halte Kalideres</p><p>1.3 km dengan Hari-Hari Pasar Swalayan</p><p>850 meter dengan RS Mitra Keluarga Kalideres</p><p>3.4 km dengan Mall Daan Mogot Baru</p>
        </div>
      </div>
      <div className="map-wrapper"><iframe title="Peta lokasi Kos Ibu Tri" loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.0496890201757!2d106.71742427398902!3d-6.1240154938626885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a02b38437247f%3A0x32439783ae137c77!2sJl.%20Bahagia%20No.27%2C%20RT.12%2FRW.6%2C%20Tegal%20Alur%2C%20Kec.%20Kalideres%2C%20Kota%20Jakarta%20Barat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2011820!5e0!3m2!1sen!2sid!4v1790753051594!5m2!1sen!2sid" /></div>
    </section>
  </>;
}