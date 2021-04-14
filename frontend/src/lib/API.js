// TODO: Add AXIOS RETRY

/* eslint-disable */
import axios from "axios";

const DEV_BASE_URL = "http://localhost:4002/api";
const PROD_BASE_URL = "https://ibudget.app/api";

const API_BASE_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? DEV_BASE_URL
    : PROD_BASE_URL;

// Function called on API request error
function handleError(errorData) {
  console.error("API error:", errorData);
}

/*
  List of available API endpoints

  shape:
    { 
      requiresAuth: bool to indicate axios to append withCredentials option (optional)
      axiosCall: fn(payload) the actual axios function to be called
      currentPromise: field to store the current running promise for this endpoint to avoid concurrent calls
    }
*/
// To know the payload shape, available endpoints, etc. visit the documentation: https://documenter.getpostman.com/view/13863838/TzCV45Ku
const authOptions = { withCredentials: true }; // axios config for auth/protected endpoints
const ENDPOINTS = {
  // User endpoints:
  login: {
    currentPromise: null,
    axiosCall: (
      payload // Payload: see api docs
    ) => axios.post(API_BASE_URL + "/user/login", payload, authOptions),
  },

  // Transactions (protected) endpoints:
  getTransactions: {
    currentPromise: null,
    axiosCall: () => axios.get(API_BASE_URL + "/transactions", authOptions),
  },
  createTransaction: {
    currentPromise: null,
    axiosCall: (
      payload // Payload: see api docs
    ) => axios.post(API_BASE_URL + "/transactions", payload, authOptions),
  },
  deleteTransaction: {
    currentPromise: null,
    axiosCall: (
      payload // Payload: see api docs
    ) => axios.delete(API_BASE_URL + `/transactions/${payload}`, authOptions),
  },
  updateTransaction: {
    currentPromise: null,
    axiosCall: (
      payload // Payload: see api docs
    ) =>
      axios.put(
        API_BASE_URL + `/transactions/${payload.id}`,
        payload.transactionInfo,
        authOptions
      ),
  },
};

export function request(endpoint, payload) {
  const endpointInfo = ENDPOINTS[endpoint];

  if (!endpointInfo) {
    console.error(
      `API request() with invalid endpoint ${endpoint}. Valid values: ${Object.keys(
        ENDPOINTS
      )}`
    );

    return null;
  }

  // If our endpointInfo.currentPromise is valid/running, return it to avoid unnecessary calls.
  if (endpointInfo.currentPromise) {
    return endpointInfo.currentPromise;
  }

  // Else create a new Promise, assign to endpointInfo.currentPromise and return it
  endpointInfo.currentPromise = new Promise((resolve, reject) => {
    endpointInfo
      .axiosCall(payload)
      .then((axiosResponse) => {
        if (axiosResponse.data.error) {
          throw reject(new Error(axiosResponse.data));
        } else resolve(axiosResponse.data); // Resolve on valid data received
      })
      .catch((error) => {
        let errorData;

        // Process the error response
        if (error && error.response && error.response.data)
          errorData = error.response.data;
        else
          errorData = {
            error: true,
            message: error.message || "No error message",
          };

        handleError(errorData);
        reject(errorData);
      })
      .finally(() => (endpointInfo.currentPromise = null)); // Clear currentPromise after the axios request
  });

  return endpointInfo.currentPromise;
}
