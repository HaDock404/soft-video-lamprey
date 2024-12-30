
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation(); // Utilise `useLocation` pour détecter les changements de route

  useEffect(() => {
    window.scrollTo(0, 0); // Défile en haut à chaque changement de route
  }, [pathname]);

  return null;
};

export default ScrollToTop;
