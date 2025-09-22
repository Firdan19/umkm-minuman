import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { waLink, buildOrderMessage } from "../lib/wa"; // [WA]

const DATA = {
  Kopi: [
    { name: "Espresso", price: "Rp15.000" },
    { name: "Americano", price: "Rp18.000" },
    { name: "Kopi Susu Gula Aren", price: "Rp20.000" },
  ],
  "Non-Kopi": [
    { name: "Matcha Latte", price: "Rp22.000" },
    { name: "Chocolate", price: "Rp20.000" },
    { name: "Strawberry Yakult", price: "Rp19.000" },
  ],
  Teh: [
    { name: "Lychee Tea", price: "Rp18.000" },
    { name: "Lemon Tea", price: "Rp16.000" },
  ],
  Snack: [
    { name: "Croissant", price: "Rp14.000" },
    { name: "French Fries", price: "Rp15.000" },
  ],
};

export default function Menu() {
  const tabs = Object.keys(DATA);
  const [active, setActive] = useState(tabs[0]);
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const base = DATA[active] || [];
    if (!q.trim()) return base;
    const s = q.toLowerCase();
    return base.filter((it) => it.name.toLowerCase().includes(s));
  }, [active, q]);

  // [WA] handler order per item (pakai prompt sederhana dulu)
  function orderItem(it) {
  const variant = (prompt(`Pilih Varian untuk ${it.name} (Dingin/Panas):`, "Dingin") || "Dingin").trim();
  const size = (prompt(`Pilih Ukuran (S/M/L):`, "M") || "M").trim().toUpperCase();
  const qty = parseInt(prompt(`Jumlah:`, "1"), 10) || 1;
  const note = (prompt(`Catatan (opsional):`, "") || "").trim();

  const msg = buildOrderMessage({
    category: active, // aktif tab kategori
    name: it.name,
    variant,
    size,
    qty,
    note,
  });

  const url = waLink(msg);

  console.log("➡️ pesan WA:", msg);
  console.log("➡️ url WA:", url);

  if (url === "#") {
    alert("Nomor WhatsApp belum diset. Cek file .env (VITE_WA_NUMBER) lalu restart `npm run dev`.");
    return;
  }

  // coba pakai window.location.href biar pasti redirect
  window.location.href = url;
  // kalau mau buka tab baru:
  // window.open(url, "_blank", "noopener,noreferrer");
}


  return (
    <section className="container py-6 sm:py-10">
      <header className="text-center mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Menu</h1>
        <p className="mt-1 text-slate-700/90 dark:text-slate-400">Sederhana & cepat. Data dummy—bebas edit.</p>
      </header>

      <LayoutGroup id="tabs">
        {/* Tabs chip, highlight bergerak */}
        <div className="relative rounded-full px-1 py-1 overflow-x-auto no-scrollbar mb-3 sm:mb-4 bg-white/70 dark:bg-white/5 backdrop-blur">
          <div className="flex gap-1 min-w-max">
            {tabs.map((t) => {
              const is = active === t;
              return (
                <button
                  key={t}
                  onClick={() => setActive(t)}
                  className={"chip " + (is ? "text-slate-900" : "text-slate-600 dark:text-slate-300")}
                >
                  {is && (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-full bg-white"
                      style={{ boxShadow: "0 6px 20px rgba(0,0,0,.06)" }}
                      transition={{ type: "spring", stiffness: 420, damping: 38 }}
                    />
                  )}
                  <span className="relative">{t}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search minimal */}
        <div className="mb-2 sm:mb-4">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari menu…"
            className="w-full bg-white/70 dark:bg-white/[0.04] backdrop-blur rounded-xl px-4 py-2 text-sm placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        {/* List */}
        <div className="surface-quiet rounded-2xl">
          <AnimatePresence mode="popLayout">
            {list.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                exit={{ opacity: 0 }}
                className="text-center text-slate-500 py-10"
              >
                Tidak ada hasil.
              </motion.p>
            ) : (
              <motion.ul
                key={active + q}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="divide-hairline"
              >
                {list.map((it) => (
                  <motion.li
                    key={it.name}
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center justify-between px-3 py-3.5"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{it.name}</div>
                      <div className="text-sm text-slate-500">{it.price}</div>
                    </div>

                    {/* [WA] Tombol Pesan */}
                    <button
                      onClick={() => orderItem(it)}
                      className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    >
                      Pesan
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </section>
  );
}
