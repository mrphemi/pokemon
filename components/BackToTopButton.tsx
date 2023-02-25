import { useState, useEffect } from "react";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300) {
        setVisible(true);
      } else if (scrolled <= 300) {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisible);

    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, [visible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="submit"
      className={`py-3 px-5 md:py-4 md:px-6 bg-poke-light-blue rounded-xl text-white fixed right-2 bottom-5 md:right-10 md:bottom-20 animate-fade-in-down ${
        visible ? "inline" : "hidden"
      }`}
      onClick={scrollToTop}
    >
      <span className="md:text-xl">&#8593;</span>
    </button>
  );
};

export default BackToTopButton;
