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
import tw from "twin.macro";
import ReactModalAdapter from "treact/helpers/ReactModalAdapter";
import { PropTypes } from "prop-types";

const StyledModal = styled(ReactModalAdapter)`
  &.mainHeroModal__overlay {
    ${tw`fixed inset-0 z-50`}
  }
  &.mainHeroModal__content {
    ${tw`xl:mx-auto m-4 sm:m-16 max-w-screen-xl absolute inset-0 flex justify-center items-center rounded-lg bg-gray-200 outline-none`}
  }
  .content {
    ${tw`w-full lg:p-16`}
  }
`;

const CloseModalButton = tw.button`absolute top-0 right-0 mt-8 mr-8 hocus:text-primary-500`;

function Modal({ children, title }, ref) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  React.useImperativeHandle(ref, () => ({
    toggle() {
      toggleModal();
    },
  }));

  return (
    <StyledModal
      closeTimeoutMS={300}
      className="mainHeroModal"
      isOpen={modalIsOpen}
      onRequestClose={toggleModal}
      shouldCloseOnOverlayClick
    >
      <CloseModalButton onClick={toggleModal}>
        <CloseIcon tw="w-6 h-6" />
      </CloseModalButton>

      {children}
    </StyledModal>
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
