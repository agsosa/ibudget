export const EnumPeriod = Object.freeze({
  SevenDays: 0,
  ThirtyDays: 1,
  NinetyDays: 2,
  TwelveMonths: 3,
  Custom: 4,
});

// Function to convert a EnumTimePeriod value to a label
export function getTimePeriodLabel(enumTimePeriod) {
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
