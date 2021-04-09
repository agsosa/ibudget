// TODO: Replace Dropdown from bulma with react-select
// TODO: Implement custom range select option

import * as React from "react";
import DatePicker from "react-modern-calendar-datepicker";

export default () => {
  const [selectedDayRange, setSelectedDayRange] = React.useState({
    from: null,
    to: null,
  });
  return (
    <>
      <DatePicker
        value={selectedDayRange}
        onChange={setSelectedDayRange}
        inputPlaceholder="Select a day range"
        shouldHighlightWeekends
      />
    </>
  );
};
