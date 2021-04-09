/*
  Component to automatically scroll to top on React Router path name change
  
  Usage:
    Add <ScrollToTop /> after <Router> tags
*/

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
