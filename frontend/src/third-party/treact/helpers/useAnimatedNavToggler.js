import { useState } from "react";
import { useAnimation, useCycle } from "framer-motion";

// Below logic is for toggling the navbar when toggleNavbar is called. It is used on mobile toggling of navbar.
export default function useAnimatedNavToggler() {
  const [showNavLinks, setShowNavLinks] = useState(false);
  const [x, cycleX] = useCycle("0%", "120%");
  const animation = useAnimation();

  const toggleNavbar = () => {
    setShowNavLinks(!showNavLinks);
    animation.start({
      x,
      display: "block",
      transition: { duration: 0.5 },
    });
    cycleX();
  };

  return { showNavLinks, animation, toggleNavbar };
}
