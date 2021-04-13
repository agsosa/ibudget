/* 
  Classic accordion component

  Props:
    items: Array of objects with shape { title: string, contentComponent: React node }
    isMulti: Boolean to indicate the possibility to open multiple items at the same time

  Usage:
    <Accordion items={[...]} />
*/

import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as ChevronDownIcon } from "feather-icons/dist/icons/chevron-down.svg";
import { PropTypes } from "prop-types";

/* Start styled components */

const AccordionContainer = tw.dl`max-w-4xl`;
const Accordion = tw.div`
select-none 
mt-2 px-2 md:px-4 py-2 sm:-ml-5
 text-gray-800 `;
const AccordionHeader = tw.dt`flex cursor-pointer  items-center p-3 hover:text-primary-500 transition duration-300`;
const AccordionTitle = tw.span`text-lg lg:text-xl font-semibold`;
const AccordionToggleIcon = motion.custom(styled.span`
  ${tw`mr-5 transition duration-300`}
  svg {
    ${tw`w-6 h-6`}
  }
`);
const AccordionContent = motion.custom(
  tw.dd`text-sm sm:text-base leading-relaxed pl-5`
);

/* End styled components */

const AccordionExport = ({ items, isMulti }) => {
  const [activeIndex, setActiveIndex] = useState([]); // Array of index number

  const toggleItem = (index) => {
    if (activeIndex.includes(index))
      setActiveIndex(activeIndex.filter((i) => i !== index));
    else setActiveIndex(isMulti ? [index, ...activeIndex] : [index]);
  };

  return (
    <AccordionContainer>
      {items.map((item, index) => (
        <Accordion key={item.title} className="group">
          <AccordionHeader
            onClick={() => {
              toggleItem(index);
            }}
          >
            <AccordionToggleIcon
              variants={{
                collapsed: { rotate: 0 },
                open: { rotate: -180 },
              }}
              initial="collapsed"
              animate={activeIndex.includes(index) ? "open" : "collapsed"}
              transition={{
                duration: 0.02,
                ease: [0.04, 0.62, 0.23, 0.98],
              }}
            >
              <ChevronDownIcon />
            </AccordionToggleIcon>
            <AccordionTitle>{item.title}</AccordionTitle>
          </AccordionHeader>
          <AccordionContent
            variants={{
              open: { opacity: 1, height: "auto", marginTop: "16px" },
              collapsed: { opacity: 0, height: 0, marginTop: "0px" },
            }}
            initial="collapsed"
            animate={activeIndex.includes(index) ? "open" : "collapsed"}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {item.contentComponent}
          </AccordionContent>
        </Accordion>
      ))}
    </AccordionContainer>
  );
};

AccordionExport.defaultProps = {
  items: [],
  isMulti: false,
};

AccordionExport.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      contentComponent: PropTypes.node,
    })
  ),
  isMulti: PropTypes.bool,
};

export default AccordionExport;
