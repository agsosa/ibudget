/* 
  Higher order component to display another component in a modal (responsive)

  Usage:
    Pass the wrapped component as first parameter and a title string as a second parameter.

    example:
      1) Define the content component

      function MyModalContent() {
        ....
      }

      const MyModalContentWithHoc = Modal(MyModalContent, "My modal Content");;
      export default MyModalContentWithHoc;

      2) Use the content component wrapped with this HoC in another component
        const modalRef = React.useRef(); // Define a ref to be able to show the modal

        modalRef.current.toggle(); // Use toggle() to show the modal (by default it will be hidden)

        Inside our render:
          <MyModalContentWithHoc ref={modalRef} />
*/

/* eslint-disable react/prop-types */

import * as React from "react";
import tw, { styled } from "twin.macro";
import ReactModalAdapter from "third-party/treact/helpers/ReactModalAdapter";
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

function Modal(WrappedComponent, title) {
  return React.forwardRef((props, ref) => {
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
            <ChildrenContainer>
              <WrappedComponent {...props} />
            </ChildrenContainer>
          </ModalContent>
        </StyledModal>
      </>
    );
  });
}

Modal.defaultProps = {
  children: null,
  title: "",
};

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default Modal;
