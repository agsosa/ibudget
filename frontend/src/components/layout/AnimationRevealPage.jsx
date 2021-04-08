/*
  Component to animate children components (fade in) on mount. Supports react-router.
  Usage: Wrap child components to be animated

  TODO: Test without react router
*/

import * as React from "react";

import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

function AnimationRevealPage({ children }) {
  let childrenElements = children;

  // React-Router animate on path change
  const { pathname } = useLocation();

  // Process children object

  if (!Array.isArray(children)) childrenElements = [children];

  childrenElements = childrenElements.map((child, i) => {
    return (
      // AnimatePresence: Use react-router pathname as key to trigger the animation on route change
      <AnimatePresence exitBeforeEnter key={pathname}>
        <motion.section
          key={i} // eslint-disable-line react/no-array-index-key
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "tween", duration: 0.8 }}
        >
          {child}
        </motion.section>
      </AnimatePresence>
    );
  });

  return <>{childrenElements}</>;
}

AnimationRevealPage.defaultProps = {
  children: [],
};

AnimationRevealPage.propTypes = {
  children: PropTypes.node,
};

export default AnimationRevealPage;
