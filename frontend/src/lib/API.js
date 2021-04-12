// TODO: Add automatic retry?
/* eslint-disable */
import axios from "axios";

const DEV_BASE_URL = "http://localhost:4002/api";
const PROD_BASE_URL = "https://ibudget.app/api";

const API_BASE_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? DEV_BASE_URL
    : PROD_BASE_URL;

function handleAxiosError(error) {
  console.log("handleAxiosError ", error);
}

// TODO: Merge all the requests in one function and create an apiModule object

// GET: transactions
let getTransactionsPromise = null; // Store the current promise to prevent concurrent requests
export function getTransactions() {
  const endpoint = "/transactions";

  // TODO: TEST
  if (!getTransactionsPromise) {
    getTransactionsPromise = new Promise((resolve, reject) => {
      axios
        .get(API_BASE_URL + endpoint)
        .then(({ data }) => {
          if (data.error) {
            throw new Error(data.error);
          } else resolve(data);
        })
        .catch((error) => {
          let errorData;

          if (error && error.response && error.response.data)
            errorData = error.response.data;
          else
            errorData = {
              error: true,
              message: error.message || "No error message",
            };

          handleAxiosError(errorData);
          reject(errorData);
        });
    });
  }

  return getTransactionsPromise;
}

// POST: transaction
let createTransactionsPromise = null; // Store the current promise to prevent concurrent requests
export function createTransaction(payload) {
  const endpoint = "/transactions";

  // TODO: TEST
  if (!createTransactionsPromise) {
    createTransactionsPromise = new Promise((resolve, reject) => {
      axios
        .post(API_BASE_URL + endpoint, payload)
        .then(({ data }) => {
          if (data.error) {
            throw new Error(data.error);
          } else resolve(data);
        })
        .catch((error) => {
          let errorData;

          if (error && error.response && error.response.data)
            errorData = error.response.data;
          else
            errorData = {
              error: true,
              message: error.message || "No error message",
            };

          handleAxiosError(errorData);
          reject(errorData);
        });
    });
  }

  return createTransactionsPromise;
}
