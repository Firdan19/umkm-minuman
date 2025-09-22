import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const r = document.documentElement;
    if (dark) { r.classList.add("dark"); localStorage.setItem("theme","dark"); }
    else { r.classList.remove("dark"); localStorage.setItem("theme","light"); }
  }, [dark]);

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setDark(d => !d)}
      className="w-10 h-10 rounded-xl bg-white/70 dark:bg-white/5 backdrop-blur"
      title={dark ? "Mode Terang" : "Mode Gelap"}
    >
      {dark ? "🌞" : "🌙"}
    </button>
  );
}
