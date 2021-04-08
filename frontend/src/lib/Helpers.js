import tailwind from "tailwind.config";
import { EnumCategory } from "./Enums";

// Javascript number formatter
export const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

// TODO: Add more categories colors
export function getCategoryColor(enumCategory) {
  switch (enumCategory) {
    case EnumCategory.SHOPPING:
      return tailwind.theme.colors.orange["500"];
    case EnumCategory.COMMUNICATION_PC:
      return tailwind.theme.colors.blue["500"];
    default:
      return "white";
  }
}
