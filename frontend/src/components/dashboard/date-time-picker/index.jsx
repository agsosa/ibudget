import tw from "twin.macro";
import DateTimeDropdown from "./DateTimeDropdown";

const Container = tw.div`mt-8 flex flex-row justify-center`;
const Label = tw.text`text-gray-600 mr-3 top-0 object-center pt-2`;

export default () => {
  return (
    <Container>
      <Label>Period: </Label>
      <DateTimeDropdown />
    </Container>
  );
};
