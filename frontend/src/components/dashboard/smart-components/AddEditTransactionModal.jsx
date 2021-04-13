/*
  Smart component (Interacting with BudgetModel)

  Component to create or edit a TransactionModel using TransactionInfoForm

  Usage:
    <AddTransaction />

  Props:
    editMode: boolean to indicate if we're editing a transaction (default: false, creation mode)
    transaction: object of TransactionModel to initialize the form (optional for editMode=false, REQUIRED for editMode=true)
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
flex flex-row
rounded-xl mt-3
bg-primary-500 hover:bg-primary-700 disabled:bg-gray-500
 transform hover:scale-105 text-white disabled:scale-100
transition-all duration-200 ease-in-out`;
const SecondaryButton = tw(
  CommonBottonStyle
)`mt-2 text-blue-600 text-base hover:text-primary-500 hover:underline`;
const ButtonsContainer = tw.div`w-full justify-center items-center flex flex-col mt-4`;

/* End styled components */

function AddEditTransactionModal({ toggleModal, editMode, transaction }) {
  if (editMode && !transaction) {
    console.error(
      "AddEditTransactionModal should pass a valid transaction prop if editMode is true"
    );
    return "INVALID TRANSACTION INFO";
  }

  const dispatch = useDispatch();

  const [transactionInfo, setTransactionInfo] = React.useState(transaction);
  const [loading, setLoading] = React.useState(false);

  /* Start event handlers */

  // Handle input change by TransactionInfoForm
  function onInfoChange(info) {
    setTransactionInfo(info);
  }

  function createTransaction(closeModalOnFinish) {
    if (
      transactionInfo.amount == null ||
      transactionInfo.category_id == null ||
      transactionInfo.date == null
    ) {
      // Handle invalid/missing input
      dispatch({
        type: "NotificationsQueueModel/pushNotification",
        payload: {
          type: NotificationTypeEnum.WARN,
          message: "Please fill the required (*) fields.",
        },
      });
    } else {
      // Dispatch createTransaction
      setLoading(true);

      dispatch({
        type: "BudgetModel/createTransaction",
        payload: {
          transactionInfo,
          callback: (result) => {
            setLoading(false);
            if (!result.error && closeModalOnFinish) toggleModal();
          },
        },
      });
    }
  }

  function updateTransaction(closeModalOnFinish) {
    console.log(closeModalOnFinish);
  }

  function deleteTransaction(closeModalOnFinish) {
    if (!transaction || transaction.id == null) {
      // Handle invalid transaction prop
      dispatch({
        type: "NotificationsQueueModel/pushNotification",
        payload: {
          type: NotificationTypeEnum.WARN,
          message:
            "Couldn't delete the transaction due to invalid information. Please try again.",
        },
      });
    } else {
      setLoading(true);

      dispatch({
        type: "BudgetModel/deleteTransaction",
        payload: {
          id: transaction.id,
          callback: (result) => {
            setLoading(false);
            if (!result.error && closeModalOnFinish) toggleModal();
          },
        },
      });
    }
  }

  function onPrimaryButtonClick() {
    if (editMode) {
      updateTransaction(true);
    } else {
      createTransaction(true);
    }
  }

  function onSecondaryButtonClick() {
    if (editMode) {
      deleteTransaction(true);
    } else {
      createTransaction(false);
    }
  }

  /* End event handlers */

  const transactionInfoModified =
    transactionInfo &&
    transaction &&
    Object.keys(transactionInfo).some(
      (k) => transactionInfo[k] !== transaction[k]
    );

  return (
    <>
      <TransactionInfoForm
        onInfoChange={onInfoChange}
        loading={loading}
        initialInfo={transaction}
        editMode={editMode}
      />
      <ButtonsContainer>
        {loading ? (
          <CloudLoadingIndicator upload />
        ) : (
          <>
            <PrimaryButton
              disabled={loading || (editMode && !transactionInfoModified)}
              onClick={onPrimaryButtonClick}
            >
              {editMode ? "Modify Transaction" : "Add Transaction"}
            </PrimaryButton>

            <SecondaryButton
              disabled={loading}
              onClick={onSecondaryButtonClick}
            >
              {editMode ? "Delete Transaction" : "Add and Create another"}
            </SecondaryButton>
          </>
        )}
      </ButtonsContainer>
    </>
  );
}

AddEditTransactionModal.defaultProps = {
  editMode: false,
  transaction: null,
};

AddEditTransactionModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
  transaction: PropTypes.object,
};

const withModalHoc = Modal(AddEditTransactionModal);
export default withModalHoc;
