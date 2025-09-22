import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductRow from "../components/ProductRow";
import { waLink, buildOrderMessage } from "../lib/wa"; // [WA] import helper

const best = [
  { name: "Es Kopi Susu", price: "Rp18.000" },
  { name: "Matcha Latte", price: "Rp22.000" },
  { name: "Strawberry Yakult", price: "Rp19.000" },
];

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Home() {
  // [WA] siapkan pesan WA untuk CTA
  const waCta = waLink(
    buildOrderMessage({
      category: "Umum",
      name: "Rekomendasi Minuman",
      variant: "Dingin",
      size: "M",
      qty: 1,
      note: "Boleh rekomendasikan menu best seller ya",
    })
  );

  return (
    <>
      {/* HERO */}
      <section className="container py-6 sm:py-12 text-center">
        <motion.h1
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fade}
          className="title-fluid font-extrabold mb-4"
        >
          Cerah, Segar, &{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-600 to-rose-600">
            Bergairah
          </span>
        </motion.h1>

        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fade}
          className="text-slate-700/90 dark:text-slate-300 max-w-prose mx-auto mb-6"
        >
          Pilihan kopi, non-kopi, dan teh. Bahan segar, proses cepat. Semua data
          dummy—bebas kamu ganti.
        </motion.p>

        <div className="flex justify-center gap-3">
          {/* (tidak direvisi) */}
          <Link to="/menu" className="btn-ghost">
            Lihat Menu
          </Link>

          {/* [WA] CTA langsung ke WhatsApp dengan pesan prefill */}
          <a
            href={waCta}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Pesan Sekarang
          </a>
        </div>
      </section>

      {/* BEST SELLER */}
      <section className="container pb-10 sm:pb-12">
        <h2 className="text-lg font-bold mb-3">Paling Laris</h2>
        <div className="surface-quiet rounded-2xl">
          <ul className="divide-hairline">
            {best.map((it) => (
              <ProductRow key={it.name} {...it} />
            ))}
          </ul>
        </div>
      </section>

      {/* DESKRIPSI & BAHAN PREMIUM */}
      <section className="container pb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Kenapa Pilih Kami?
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Semua minuman diracik dengan bahan premium pilihan, agar rasa tetap
            konsisten dan segar.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="surface p-6 text-center"
          >
            <span className="text-4xl">☕</span>
            <h3 className="mt-3 font-bold">Kopi Arabica Premium</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Biji kopi arabica pilihan dari dataran tinggi, disangrai dengan
              sempurna.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="surface p-6 text-center"
          >
            <span className="text-4xl">🥛</span>
            <h3 className="mt-3 font-bold">Susu Segar</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Susu murni kualitas tinggi, menjaga rasa creamy dan gurih.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="surface p-6 text-center"
          >
            <span className="text-4xl">🍯</span>
            <h3 className="mt-3 font-bold">Gula Aren Asli</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Gula aren murni, tanpa pemanis buatan, manis alami khas Nusantara.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
