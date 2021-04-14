// TODO: Move enum helpers to Enums.js

import tw from "twin.macro";
import {
  mdiSilverware,
  mdiCartOutline,
  mdiHome,
  mdiBus,
  mdiCarHatchback,
  mdiDevices,
  mdiCurrencyUsd,
  mdiCreditCardOutline,
  mdiBriefcaseOutline,
  mdiAccount,
  mdiDotsVertical,
} from "@mdi/js";
import { TransactionTypeEnum, CategoryEnum } from "ibudget-shared";
import { PeriodEnum, SortModeEnum } from "lib/Enums";

// Add countDecimals() to Number
/* eslint-disable no-extend-native */
Number.prototype.countDecimals = function () {
  if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
  return this.toString().split(".")[1].length || 0;
};

// Javascript NumberFormat object to format money (NOTE: use getMoneyDisplayString)
const moneyFormatter = new Intl.NumberFormat("es-ES", {
  // TODO: Change format locale by user language settings
  style: "currency",
  currency: "USD",
  currencyDisplay: "narrowSymbol",
  minimumFractionDigits: 1,
});

/**
 * Format a number as a currency
 * @param  {Number} money The number (money amount)
 * @return {String}       Formatted money number
 */
export function getMoneyDisplayString(money) {
  return moneyFormatter.format(money);
}

// Big number formatter (100000 to 100k, 50000 to 50k, etc)
export function bigNumberFormatter(num, digits) {
  const si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i -= 1) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
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

// Function to get the symbol (+ or -) string for a TransactionTypeEnum value (example: getTransactionTypeSymbol(TransactionTypeEnum.OUT) = "-")
export function getTransactionTypeSymbol(transactionTypeEnum) {
  return transactionTypeEnum === TransactionTypeEnum.OUT ? "-" : "+";
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
      return "Entretenimiento";
    case CategoryEnum.COMMUNICATION_PC:
      return "Tecnología";
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

// Function to convert a TransactionTypeEnum value to a label
export function getTransactionTypeLabel(transactionTypeEnum) {
  switch (transactionTypeEnum) {
    case TransactionTypeEnum.IN:
      return "Ingreso";
    case TransactionTypeEnum.OUT:
      return "Egreso";
    default:
      return "";
  }
}

// Function to convert a SortModeEnum value to a label
export function getSortModeLabel(sortModeEnum) {
  switch (sortModeEnum) {
    case SortModeEnum.AMOUNT_ASCENDING:
      return "Monto (de menor a mayor)";
    case SortModeEnum.AMOUNT_DESCENDING:
      return "Monto (de mayor a menor)";
    case SortModeEnum.DATE_ASCENDING:
      return "Fecha (mas antiguo primero)";
    case SortModeEnum.DATE_DESCENDING:
      return "Fecha (mas reciente primero)";
    default:
      return "";
  }
}

/**
 * Get the associated tailwind background style for a category
 * @param  {String} categoryEnum The category (must be a value of CategoryEnum)
 * @return {TwFn}                Tailwind background style
 */
export const getCategoryBackgroundStyle = (categoryEnum) => {
  switch (categoryEnum) {
    case CategoryEnum.SHOPPING:
      return tw`bg-orange-500`;
    case CategoryEnum.COMMUNICATION_PC:
      return tw`bg-orange-400`;
    case CategoryEnum.FINANCIAL_EXPENSES:
      return tw`bg-red-600`;
    case CategoryEnum.FOOD_DRINKS:
      return tw`bg-red-500`;
    case CategoryEnum.HOUSING:
      return tw`bg-indigo-600`;
    case CategoryEnum.INCOME:
      return tw`bg-yellow-400`;
    case CategoryEnum.INVESTMENTS:
      return tw`bg-green-500`;
    case CategoryEnum.LIFE_ENTERTAINMENT:
      return tw`bg-blue-500`;
    case CategoryEnum.OTHERS:
      return tw`bg-gray-500`;
    case CategoryEnum.TRANSPORTATION:
      return tw`bg-pink-500`;
    case CategoryEnum.VEHICLE:
      return tw`bg-purple-500`;
    default:
      return tw`bg-gray-700`;
  }
};

// Get the associated material design icon for the category
export const getCategoryMaterialIcon = (category) => {
  let icon;
  switch (category) {
    case CategoryEnum.SHOPPING:
      icon = mdiCartOutline;
      break;
    case CategoryEnum.FOOD_DRINKS:
      icon = mdiSilverware;
      break;
    case CategoryEnum.HOUSING:
      icon = mdiHome;
      break;
    case CategoryEnum.COMMUNICATION_PC:
      icon = mdiDevices;
      break;
    case CategoryEnum.FINANCIAL_EXPENSES:
      icon = mdiCreditCardOutline;
      break;
    case CategoryEnum.INCOME:
      icon = mdiCurrencyUsd;
      break;
    case CategoryEnum.INVESTMENTS:
      icon = mdiBriefcaseOutline;
      break;
    case CategoryEnum.LIFE_ENTERTAINMENT:
      icon = mdiAccount;
      break;
    case CategoryEnum.OTHERS:
      icon = mdiDotsVertical;
      break;
    case CategoryEnum.TRANSPORTATION:
      icon = mdiBus;
      break;
    case CategoryEnum.VEHICLE:
      icon = mdiCarHatchback;
      break;
    default:
      icon = null;
  }

  return icon;
};

/**
 * Get the amount field of a TransactionModel object WITH SIGN (positive or negative)
 * This has been added because we store the amount of every transaction as positive and use the type_id to know if it's spending or income
 * @param  {Object of TransactionModel} transaction The transaction object
 * @return {Number}       The amount field with sign (depending on the transaction type)
 */
export const getTransactionAmountWithSign = (transaction) =>
  transaction.type_id === TransactionTypeEnum.OUT
    ? -transaction.amount
    : transaction.amount;
