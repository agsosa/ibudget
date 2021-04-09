import { EnumPeriod } from "./Enums";

// Javascript NumberFormat object to format money
const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

/**
 * Format a number as a currency
 * @param  {Number} money The number (money amount)
 * @return {String}       Formatted money number
 */
export function getMoneyDisplayString(money) {
  return moneyFormatter.format(money);
}

// Function to convert a EnumTimePeriod value to a label
export function getPeriodLabel(enumTimePeriod) {
  switch (enumTimePeriod) {
    case EnumPeriod.SevenDays:
      return "7 days";
    case EnumPeriod.ThirtyDays:
      return "30 days";
    case EnumPeriod.NinetyDays:
      return "90 days";
    case EnumPeriod.TwelveMonths:
      return "12 months";
    case EnumPeriod.Custom:
      return "Custom range";
    default:
      return "Invalid period";
  }
}
