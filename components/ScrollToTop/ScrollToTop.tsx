"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const MIN_SCROLLS = 2;
  const SHOW_AFTER = 200;
  const docHeightRef = useRef(0);
  const tickingRef = useRef(false);
  const scrollCountRef = useRef(0);
  const lastScrollY = useRef(0);

  const [isVisible, setIsVisible] = useState(false);
  const [percent, setPercent] = useState(0);

  // Рассчет высоты документа
  const calcDocHeight = () => {
    docHeightRef.current = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );
  };

  // Обновление прогресса и видимости кнопки
  const update = () => {
    const scrollY = window.scrollY;
    const viewport = window.innerHeight;
    const scrollable = docHeightRef.current - viewport;
    const ratio = scrollable > 0 ? scrollY / scrollable : 0;
    const newPercent = Math.min(100, Math.max(0, ratio * 100));
    setPercent(newPercent);

    if (scrollCountRef.current >= MIN_SCROLLS && scrollY > SHOW_AFTER) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    tickingRef.current = false;
  };

  // Логика скролла
  const onScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > lastScrollY.current) scrollCountRef.current++;
    lastScrollY.current = scrollY;

    if (!tickingRef.current) {
      tickingRef.current = true;
      requestAnimationFrame(update);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    calcDocHeight();
    requestAnimationFrame(update);

    window.addEventListener("scroll", onScroll, { passive: true });
    const handleResize = () => {
      calcDocHeight();
      requestAnimationFrame(update);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return (
    <button
      onClick={handleClick}
      tabIndex={0}
      aria-hidden={!isVisible}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`
    fixed bottom-5 right-5 rounded-full w-10 h-10 md:w-12 md:h-12
    flex items-center justify-center
    transition-all duration-300 ease-in-out
    ${isVisible ? "opacity-100 translate-y-0 z-50" : "opacity-0 translate-y-5"}
    hover:scale-125 active:scale-110
    pointer-events-auto
  `}
      style={{
        background: `conic-gradient(var(--dark-green) ${percent}%, var(--light-green) 0%)`,
      }}
    >
      <ArrowUp className="w-4 h-4 md:w-5 md:h-5 text-white" />
    </button>
  );
}
