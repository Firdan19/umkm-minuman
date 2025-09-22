import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [open, setOpen] = useState(false);

  const pill = ({ isActive }) =>
    "px-3 py-1.5 rounded-full text-sm transition " +
    (isActive
      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
      : "hover:bg-black/5 dark:hover:bg-white/10");

  return (
    <header className="sticky top-0 z-50 h-14 bg-white/70 dark:bg-slate-950/40 backdrop-blur border-b border-black/5 dark:border-white/5">
      <div className="container h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-extrabold">
          <img src="/logo.png" alt="Logo UMKM" className="h-12 w-auto" />
        </Link>

        {/* Desktop nav (Beranda & Menu saja) */}
        <nav className="hidden sm:flex items-center gap-2">
          <NavLink to="/" className={pill}>Beranda</NavLink>
          <NavLink to="/menu" className={pill}>Menu</NavLink>
          <ThemeToggle />
        </nav>

        {/* Mobile FAB menu */}
        <div className="sm:hidden flex items-center gap-2">
          <ThemeToggle />
          <div className="relative">
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-rose-500 shadow-lg flex items-center justify-center text-white text-xl"
            >
              ☰
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="absolute right-0 mt-3 w-44 rounded-2xl bg-white dark:bg-slate-900 shadow-lg ring-1 ring-black/5 dark:ring-white/10 overflow-hidden"
                >
                  <nav className="flex flex-col text-sm">
                    <NavLink
                      to="/"
                      onClick={() => setOpen(false)}
                      className="px-4 py-3 hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      Beranda
                    </NavLink>
                    <NavLink
                      to="/menu"
                      onClick={() => setOpen(false)}
                      className="px-4 py-3 hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      Menu
                    </NavLink>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
