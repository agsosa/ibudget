import { CategoryEnum, PeriodEnum } from "./Enums";

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
// Function to convert a PeriodEnum value to a label
export function getPeriodLabel(periodEnum) {
  switch (periodEnum) {
    case PeriodEnum.SEVEN_DAYS:
      return "7 days";
    case PeriodEnum.THIRTY_DAYS:
      return "30 days";
    case PeriodEnum.NINETY_DAYS:
      return "90 days";
    case PeriodEnum.TWELVE_MONTHS:
      return "12 months";
    case PeriodEnum.CUSTOM:
      return "Custom range";
    default:
      return "Invalid period";
  }
}
// Function to convert a CategoryEnum value to a label
export function getCategoryLabel(categoryEnum) {
  switch (categoryEnum) {
    case CategoryEnum.FOOD_DRINKS:
      return "Comida y Bebidas";
    case CategoryEnum.SHOPPING:
      return "Compras";
    case CategoryEnum.HOUSING:
      return "Propiedades";
    case CategoryEnum.TRANSPORTATION:
      return "Transporte";
    case CategoryEnum.VEHICLE:
      return "Vehículo";
    case CategoryEnum.LIFE_ENTERTAINMENT:
      return "Vida y Entretenimiento";
    case CategoryEnum.COMMUNICATION_PC:
      return "Comunicación y Tecnología";
    case CategoryEnum.FINANCIAL_EXPENSES:
      return "Gastos Financieros";
    case CategoryEnum.INVESTMENTS:
      return "Inversiones";
    case CategoryEnum.INCOME:
      return "Ingresos";
    case CategoryEnum.OTHERS:
      return "Otros";
    default:
      return "";
  }
}
