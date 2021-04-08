import * as React from "react";
import { Dropdown } from "react-bulma-components";
import { EnumPeriod, getTimePeriodLabel } from "./EnumPeriod";

export default () => {
  const dropdownRef = React.useRef(null);
  const [period, setPeriod] = React.useState(EnumPeriod.ThirtyDays); // EnumTimePeriod

  function handleChange(enumPeriod) {
    setPeriod(enumPeriod);
    if (dropdownRef.current) dropdownRef.current.close();
  }

  function getDropdownPlaceholder() {
    // TODO: Add support for custom ranges
    return getTimePeriodLabel(period);
  }

  return (
    <Dropdown
      ref={dropdownRef}
      label={getDropdownPlaceholder()}
      value={period}
      onChange={(selected) => console.log(`onChange ${selected}`)}
    >
      {Object.entries(EnumPeriod).map(([key, value]) => {
        return (
          <>
            {value === EnumPeriod.Custom && <Dropdown.Divider />}
            <Dropdown.Item
              key={key}
              value={value}
              onClick={() => handleChange(value)}
            >
              {getTimePeriodLabel(value)}
            </Dropdown.Item>
          </>
        );
      })}
    </Dropdown>
  );
};
