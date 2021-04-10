import { EnumCategory, EnumPeriod } from "./Enums";

/* eslint-disable no-extend-native */
Number.prototype.countDecimals = function () {
  if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
  return this.toString().split(".")[1].length || 0;
};

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

// TODO: Move Enum to Label functions to Locale manager
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
// Function to convert a EnumCategory value to a label
export function getCategoryLabel(enumCategory) {
  switch (enumCategory) {
    case EnumCategory.FOOD_DRINKS:
      return "Comida y Bebidas";
    case EnumCategory.SHOPPING:
      return "Compras";
    case EnumCategory.HOUSING:
      return "Propiedades";
    case EnumCategory.TRANSPORTATION:
      return "Transporte";
    case EnumCategory.VEHICLE:
      return "Vehículo";
    case EnumCategory.LIFE_ENTERTAINMENT:
      return "Vida y Entretenimiento";
    case EnumCategory.COMMUNICATION_PC:
      return "Comunicación y Tecnología";
    case EnumCategory.FINANCIAL_EXPENSES:
      return "Gastos Financieros";
    case EnumCategory.INVESTMENTS:
      return "Inversiones";
    case EnumCategory.INCOME:
      return "Ingresos";
    case EnumCategory.OTHERS:
      return "Otros";
    default:
      return "";
  }
}
