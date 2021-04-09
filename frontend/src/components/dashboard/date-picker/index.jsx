/* eslint-disable */

import tw from "twin.macro";
import DatePicker from "./DatePicker";

const Container = tw.div`mt-8 flex-col text-center flex sm:flex-row justify-center align-middle`;
const Label = tw.text`text-gray-600 mr-3 mt-2`;

export default () => {
  return (
    <Container>
      <Label>Period: </Label>
      <DatePicker />
    </Container>
  );
};
