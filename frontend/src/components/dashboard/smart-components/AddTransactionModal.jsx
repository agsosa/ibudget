/*
  Smart component (Interacting with BudgetModel)

  Component to create a new TransactionModel using TransactionInfoForm

  TODO: Implement edit mode

  Usage:
    <AddTransaction />
*/

import * as React from "react";
import tw from "twin.macro";
import { NotificationTypeEnum } from "lib/Enums";
import CloudLoadingIndicator from "components/misc/CloudLoadingIndicator";
import Modal from "components/misc/Modal";
import { useDispatch } from "react-redux";
import { PropTypes } from "prop-types";
import TransactionInfoForm from "components/dashboard/TransactionInfoForm";

/* Start styled components */

const CommonBottonStyle = tw.button`py-2 px-8 lg:px-20 font-semibold text-lg focus:outline-none`;
const PrimaryButton = tw(CommonBottonStyle)`
rounded-xl mt-3
bg-primary-500 
hover:bg-primary-700 transform hover:scale-105 text-white 
transition-all duration-200 ease-in-out`;
const SecondaryButton = tw(
  CommonBottonStyle
)`mt-2 text-blue-600 text-base hover:text-primary-500 hover:underline`;
const ButtonsContainer = tw.div`w-full justify-center items-center flex flex-col mt-4`;

/* End styled components */

function AddTransactionModal({ toggleModal }) {
  const dispatch = useDispatch();

  const [transactionInfo, setTransactionInfo] = React.useState(null); // TODO: Implement here the initial transaction info if it's edit mode
  const [loading, setLoading] = React.useState(false);

  /* Start event handlers */

  function onInfoChange(info) {
    setTransactionInfo(info);
  }

  // Function called on Add transaction button click
  // Parameter closeModal: set to true to close the parent modal
  function onAddTransactionButtonClick(closeModal = false) {
    if (
      transactionInfo.amount == null ||
      transactionInfo.category_id == null ||
      transactionInfo.date == null
    ) {
      dispatch({
        type: "NotificationsQueueModel/pushNotification",
        payload: {
          type: NotificationTypeEnum.WARN,
          message: "Please fill the required (*) fields.",
        },
      });
    } else {
      setLoading(true);

      dispatch({
        type: "BudgetModel/createTransaction",
        payload: {
          transactionInfo,
          callback: (result) => {
            setLoading(false);
            if (!result.error && closeModal === true) toggleModal();
          },
        },
      });
    }
  }

  /* End event handlers */

  return (
    <>
      <TransactionInfoForm onInfoChange={onInfoChange} loading={loading} />
      <ButtonsContainer>
        {loading ? (
          <CloudLoadingIndicator upload />
        ) : (
          <>
            <PrimaryButton
              disabled={loading}
              onClick={() => onAddTransactionButtonClick(true)}
            >
              Add Transaction
            </PrimaryButton>
            <SecondaryButton
              disabled={loading}
              onClick={onAddTransactionButtonClick}
            >
              Add and Create another
            </SecondaryButton>
          </>
        )}
      </ButtonsContainer>
    </>
  );
}

AddTransactionModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

const withModalHoc = Modal(AddTransactionModal, "Add Transaction");
export default withModalHoc;
