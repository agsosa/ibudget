/*
  Component to animate children components (fade in). Supports react-router.
*/

import * as React from "react";

import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

function AnimationRevealPage({ disabled, children }) {
  let childrenElements = children;

  // React-Router animate on patah change
  const { pathname } = useLocation();

  // Process children object
  if (!disabled) {
    if (!Array.isArray(children)) childrenElements = [children];

    childrenElements = childrenElements.map((child, i) => {
      return (
        <AnimatePresence exitBeforeEnter key={pathname}>
          <motion.section
            key={i} // eslint-disable-line
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
  }

  return <>{childrenElements}</>;
}

AnimationRevealPage.defaultProps = {
  disabled: false,
  children: [],
};

AnimationRevealPage.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export default AnimationRevealPage;
