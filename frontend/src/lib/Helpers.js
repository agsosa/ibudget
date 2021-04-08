import { EnumCategory } from "./Enums";

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

/**
 * Get the associated tailwind color for a category
 * @param  {String} enumCategory The category (must be a value of EnumCategory)
 * @return {String}              Tailwind color
 */
export function getCategoryColor(enumCategory) {
  // TODO: Add more categories colors
  switch (enumCategory) {
    case EnumCategory.SHOPPING:
      return "orange-500";
    case EnumCategory.COMMUNICATION_PC:
      return "blue-500";
    default:
      return "white";
  }
}
