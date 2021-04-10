/*
  Smart component

  Component (FORM) to submit a new transaction

  Usage:
    <AddTransaction />
*/

import tw from "twin.macro";

/* Start styled components */

const Container = tw.div`bg-gray-300 flex justify-center align-middle flex flex-col md:grid md:grid-cols-2 align-middle`;
const LeftContainer = tw.div`pt-5 bg-red-200 flex-col flex justify-center items-center`;
const RightContainer = tw.div`pt-5 bg-blue-200 flex-col flex justify-center items-center`;

const CommonBottonStyle = tw.button`py-2 px-8 lg:px-20 font-semibold text-lg`;
const PrimaryButton = tw(CommonBottonStyle)`
rounded-xl 
bg-primary-500 
hover:bg-primary-700 transform hover:scale-105
hocus:outline-none text-white 
transition duration-200 ease-in-out`;
const SecondaryButton = tw(
  CommonBottonStyle
)`mt-2 text-blue-600 text-base underline`;

const InputItemContainer = tw.div`flex flex-col bg-red-500`;
const InputText = tw.text`text-base mb-1`;

/* End styled components */

function AddTransaction() {
  function CategoryDropdown() {
    return (
      <InputItemContainer>
        <InputText>Categoría:</InputText>
      </InputItemContainer>
    );
  }
  return (
    <Container>
      <LeftContainer>
        <CategoryDropdown />
      </LeftContainer>
      <RightContainer>
        <PrimaryButton>Add Transaction</PrimaryButton>
        <SecondaryButton>Add and Create another</SecondaryButton>
      </RightContainer>
    </Container>
  );
}

export default AddTransaction;
