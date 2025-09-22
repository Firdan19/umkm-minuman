import { motion } from "framer-motion";

export default function ProductCard({ img, title, price, desc }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="surface no-border"
    >
      <div className="p-4 flex items-center gap-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 dark:bg-white/10">
          {img ? <img src={img} alt={title} className="w-full h-full object-cover" /> : <div className="w-full h-full grid place-items-center text-slate-400">IMG</div>}
        </div>
        <div>
          <h3 className="font-bold">{title || "Nama Produk"}</h3>
          {desc && <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{desc}</p>}
          {price && <div className="mt-1 font-extrabold">{price}</div>}
        </div>
      </div>
    </motion.div>
  );
}
