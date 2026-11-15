const STORAGE_KEYS = {
  rooms: "kosIbuTri_rooms",
  promotions: "kosIbuTri_promotions",
  bookings: "kosIbuTri_bookings",
  paymentRecords: "kosIbuTri_paymentRecords",
};

export function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS[key]);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.error(`Gagal membaca data ${key}:`, error);
    return fallback;
  }
}

export function saveData(key, value) {
  try {
    localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
  } catch (error) {
    console.error(`Gagal menyimpan data ${key}:`, error);
  }
}

export function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}
