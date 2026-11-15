export const rooms = [
  { id: "standar", name: "Kamar Standar", image: "/img/kamar-standar.jpeg", price: 1000000, priceLabel: "Rp 1.000.000 / bln", summary: "Kamar mandi dalam & kosongan", facilities: ["Kosongan", "Kamar mandi dalam"] },
  { id: "deluxe", name: "Kamar Deluxe", image: "/img/kamar-deluxe.jpg", price: 1700000, priceLabel: "Rp 1.700.000 / bln", summary: "Fasilitas kamar & kamar mandi dalam.", facilities: ["AC", "Kamar mandi dalam", "Jendela besar"] },
  { id: "vip", name: "Kamar VIP", image: "/img/kamar-vip.jpg", price: 2200000, priceLabel: "Rp 2.200.000 / bln", summary: "AC, kamar mandi dalam, dan WiFi.", facilities: ["AC & kamar mandi dalam", "WiFi khusus", "Ruangan lebih luas"] }
];

export const promotions = [
  { id: "booking", image: "/img/promo-booking.png", date: "1 Sept 2026", title: "Diskon Booking Awal Bulan", description: "Potongan biaya admin untuk booking 3 hari pertama tiap bulan." },
  { id: "laundry", image: "/img/promo-laundry.png", date: "15 Agu 2026", title: "Gratis Sewa Laundry 1 Bulan", description: "Khusus penghuni baru tipe Deluxe & VIP." },
  { id: "extend", image: "/img/promo-perpanjang.png", date: "Info", title: "Perpanjangan Otomatis", description: "Cara & syarat perpanjangan masa sewa kamar." }
];

export const facilities = [
  { icon: "📶", name: "WiFi" }, { icon: "🍳", name: "Dapur Bersama" },
  { icon: "🧺", name: "Laundry" }, { icon: "🛵", name: "Parkir" },
  { icon: "🔒", name: "CCTV" }, { icon: "🛋️", name: "Ruang Tamu" }
];