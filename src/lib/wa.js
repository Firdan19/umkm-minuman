// src/lib/wa.js
export function waPhone() {
  const raw = (import.meta.env.VITE_WA_NUMBER || "").trim();
  // buang karakter aneh
  return raw.replace(/[^\d]/g, "");
}

export function waLink(message = "") {
  const phone = waPhone();
  if (!phone) return "#"; // fallback
  const text = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${text}`;
}

// Template pesan: kategori, item, varian, size, qty, catatan
export function buildOrderMessage({ category, name, variant = "Dingin", size = "M", qty = 1, note = "" }) {
  return [
    "Halo, saya mau pesan:",
    `• ${name} (${category})`,
    `• Varian: ${variant}`,
    `• Ukuran: ${size}`,
    `• Jumlah: ${qty}`,
    note ? `• Catatan: ${note}` : null,
    "",
    "Mohon info total & estimasi siap ya. Terima kasih 🙏"
  ].filter(Boolean).join("\n");
}
