// TODO: Add automatic retry?

import axios from "axios";

const DEV_BASE_URL = "http://localhost:4002/api";
const PROD_BASE_URL = "https://ibudget.app/api";

const API_BASE_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? DEV_BASE_URL
    : PROD_BASE_URL;

// TRANSACTIONS ENDPOINT
let getTransactionsPromise = null; // Store the current promise to prevent concurrent requests
export function getTransactions() {
  const endpoint = "/transactions";

  // TODO: TEST
  if (!getTransactionsPromise) {
    getTransactionsPromise = axios.get(API_BASE_URL + endpoint);
  }

  return getTransactionsPromise;
}
