/**
 * Memformat nomor telepon dari format internasional (+62) atau lokal (08) menjadi format dengan tanda hubung.
 * @param {string} phoneNumber - Nomor telepon dalam format internasional (misal: +6281234567891) atau lokal (081234567891).
 * @returns {string} Nomor telepon yang sudah diformat (misal: 0812-3456-7891) atau pesan error jika format tidak valid.
 */
const phoneNumberFormat = (phoneNumber) => {
  // Memeriksa apakah input adalah string
  if (typeof phoneNumber !== "string") {
    return "Format nomor telepon tidak valid. Harap masukkan nomor telepon yang benar.";
  }

  let localNumber;

  // Menghandle format internasional (+62)
  if (phoneNumber.startsWith("+62")) {
    localNumber = `0${phoneNumber.substring(3)}`;
  }
  // Menghandle format lokal (08)
  else if (phoneNumber.startsWith("08")) {
    localNumber = phoneNumber;
  }
  // Jika tidak sesuai format yang diharapkan
  else {
    return "Format nomor telepon tidak valid. Harap gunakan format +62... atau 08...";
  }

  // Memeriksa panjang nomor untuk memastikan bisa diformat
  if (localNumber.length < 9) {
    return "Nomor telepon terlalu pendek untuk diformat.";
  }

  // Menggunakan regex untuk menyisipkan tanda hubung
  // Format: 0XXX-XXXX-XXXX...
  const formattedNumber = localNumber.replace(
    /(\d{4})(\d{4})(\d+)/,
    "$1-$2-$3"
  );

  return formattedNumber;
};

export default phoneNumberFormat;
