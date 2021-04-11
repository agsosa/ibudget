/* 
  Responsive modal component

  Usage:
    const modalRef = React.useRef(); // Create ref to be able to open the modal

    modalRef.current.toggle(); // Open modal

    <Modal ref={modalRef} title="My modal">
      (content)
    </Modal>

  Props:
    title: optional string to display as title
*/

import * as React from "react";
import tw, { styled } from "twin.macro";
import ReactModalAdapter from "treact/helpers/ReactModalAdapter";
import { PropTypes } from "prop-types";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { motion } from "framer-motion";

/* Start styled components */

const StyledModal = styled(ReactModalAdapter)`
  &.mainModal__overlay {
    ${tw`fixed z-50 h-screen w-screen top-0 left-0 flex items-center justify-center bg-black bg-opacity-50`}
  }
  &.mainModal__content {
    ${tw`outline-none`}
  }
`;

// absolute inset-x-0 w-3/4 md:w-2/5 mx-auto my-auto bottom-1/2    left: 50%;transform: translateX(-50%);
const ModalContent = tw(motion.div)`
p-6 z-50
md:max-w-screen-md w-screen h-screen md:h-full overflow-auto
rounded-xl bg-gray-100
shadow-2xl
flex flex-col`;
const Header = tw.div`w-full grid grid-rows-1 grid-cols-2 sm:mx-5`; // sm:mx-5
const Title = tw.text`font-bold justify-self-start text-xl sm:text-2xl`;
const CloseModalButton = tw.button`hocus:text-primary-500 justify-self-end sm:mr-12 focus:outline-none`; // sm:mr-12
const ChildrenContainer = tw.div`sm:px-5 mt-8 sm:pb-2 pb-4`;

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
    <>
      <StyledModal
        className="mainModal"
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        shouldCloseOnOverlayClick
      >
        <ModalContent
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          transition={{
            type: "spring",
            ease: "easeIn",
            stiffness: 100,
            duration: 0.2,
          }}
        >
          <Header>
            <Title>{title}</Title>
            <CloseModalButton onClick={toggleModal}>
              <CloseIcon />
            </CloseModalButton>
          </Header>
          <ChildrenContainer>{children}</ChildrenContainer>
        </ModalContent>
      </StyledModal>
    </>
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
