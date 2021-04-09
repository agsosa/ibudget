/* 
  Responsive modal component

  Usage :
    const modalRef = React.useRef(); // Create ref to be able to open the modal

    modalRef.current.toggle(); // Open modal

    <Modal ref={modalRef} title="My modal">
      ...content...
    </Modal>


  Props:
    title: string to display as title
*/

import * as React from "react";
import tw, { styled } from "twin.macro";
import ReactModalAdapter from "treact/helpers/ReactModalAdapter";
import { PropTypes } from "prop-types";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { motion } from "framer-motion";

/* Start styled components */

const StyledModal = styled(ReactModalAdapter)`
  &.mainHeroModal__overlay {
    ${tw`fixed inset-0 z-50`}
  }
`;
const BlackOverlay = styled.div(({ isOpen }) => [
  tw`bg-black bg-opacity-75 w-screen h-screen absolute inset-0 z-50 transition-all duration-500 ease-in-out`,
  !isOpen && tw`hidden`,
]);
const Content = tw(
  motion.div
)`xl:mx-auto p-6 lg:p-12 m-6 my-12 sm:m-16 max-w-screen-xl absolute inset-0 flex rounded-xl bg-white outline-none flex-col`; // p-6 lg:p-12
const Header = tw.div`w-full grid grid-rows-1 grid-cols-2 sm:mx-5`; // sm:mx-5
const Title = tw.text`font-bold justify-self-start text-base sm:text-xl`;
const CloseModalButton = tw.button`hocus:text-primary-500 justify-self-end sm:mr-12`; // sm:mr-12
const ChildrenContainer = tw.div`sm:px-5 w-full h-full mt-8`;

/* End styled components */

function Modal({ children, title }, ref) {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  React.useImperativeHandle(ref, () => ({
    toggle() {
      toggleModal();
    },
  }));

  return (
    <BlackOverlay isOpen={modalIsOpen}>
      <StyledModal
        className="mainHeroModal"
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        shouldCloseOnOverlayClick
      >
        <Content
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          transition={{
            type: "spring",
            ease: "easeInOut",
            stiffness: 70,
            duration: 0.3,
          }}
        >
          <Header>
            <Title>{title}</Title>
            <CloseModalButton onClick={toggleModal}>
              <CloseIcon tw="w-6 h-6" />
            </CloseModalButton>
          </Header>
          <ChildrenContainer>{children}</ChildrenContainer>
        </Content>
      </StyledModal>
    </BlackOverlay>
  );
}

Modal.defaultProps = {
  children: null,
  title: "",
};

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default React.forwardRef(Modal);
