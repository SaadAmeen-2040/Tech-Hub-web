import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const elementId = hash.replace("#", "");
      let attempts = 0;
      const interval = setInterval(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          clearInterval(interval);
        }
        attempts++;
        if (attempts > 80) { // 80 attempts * 50ms = 4000ms max wait
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    } else {
      window.scrollTo({
        top: 0,
        behavior: "instant"
      });
    }
  }, [pathname, hash]);

  return null;
}
