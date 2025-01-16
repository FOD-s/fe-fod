export const formatRupiah = (value) => {
  if (!value) return "";
  if (typeof value !== "string") {
    value = String(value); // Konversi nilai ke string
  }
  const numberString = value.replace(/[^0-9]/g, "");
  // Tambahkan titik setiap 3 angka dari belakang
  return `Rp ${numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

export const parseRupiah = (value) => {
  if (!value) return "";
  // Hapus karakter non-numerik
  const numberString = value.replace(/[^0-9]/g, "");
  return numberString;
};
