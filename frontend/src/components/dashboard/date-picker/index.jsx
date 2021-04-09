import tw from "twin.macro";
import DatePicker from "./DatePicker";

const Container = tw.div`mt-8 flex-col text-center flex sm:flex-row justify-center`;
const Label = tw.text`text-gray-600 mr-3 object-center pt-1`;

export default () => {
  return (
    <Container>
      <Label>Period: </Label>
      <DatePicker />
    </Container>
  );
};
