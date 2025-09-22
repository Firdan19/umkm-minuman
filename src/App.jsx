import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import { AnimatePresence, motion } from "framer-motion";

function PageWrap({ children }) {
  return (
    <motion.main
      className="flex-1 safe-top"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}

export default function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col sunrise dark:sunrise-dark">
      <Header />
      <AnimatePresence mode="wait">
        <PageWrap key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </PageWrap>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
