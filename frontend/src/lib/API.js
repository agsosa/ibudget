// TODO: Add AXIOS RETRY

/* eslint-disable */
import axios from "axios";

const DEV_BASE_URL = "http://localhost:4002/api"; // Development base url
const PROD_BASE_URL = "https://ibudget.app/api"; // Production base url

const API_BASE_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? DEV_BASE_URL
    : PROD_BASE_URL;

let errorSubscriptions = [];

// Function called when we get an error from the server or axios
function handleError(errorData) {
  console.error("API error:", errorData);
  errorSubscriptions.map((cb) => cb(errorData)); // Call all the callbacks subscribed to this event
}

// Add a function to be called on handleError with the response from the server
// NOTE: Don't forget to unsuscribe!
export function addErrorListener(callback) {
  if (callback) errorSubscriptions.push(callback);
}

// Remove a function previously added as an error listener
export function removeErrorListener(callback) {
  if (callback)
    errorSubscriptions = errorSubscriptions.filter((q) => q !== callback);
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

/* 
  Function to request an API endpoint

  Parameters:
    endpoint: required string, a key of ENDPOINTS object to request. Make sure it's valid!
    payload: optional object to be passed to the server (check the axiosCall method or the API docs for the desired endpoint)
  
  returns a promise that will ALWAYS resolve with the response from the server
  response shape: { error: bool, message: string, }
*/
export function request(endpoint, payload) {
  const endpointInfo = ENDPOINTS[endpoint];

  // Validate endpoint parameter
  if (!endpointInfo) {
    console.error(
      `API request() called with invalid endpoint ${endpoint}. Valid values: ${Object.keys(
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
  endpointInfo.currentPromise = new Promise((resolve) => {
    endpointInfo
      .axiosCall(payload)
      .then((axiosResponse) => {
        return { ...axiosResponse.data, statusCode: axiosResponse.status };
      })
      .catch((error) => {
        let errorData;

        /* 
          Since we don't know which shape will have the error returned by axios,
          ensure it to match the expected shape ({error: bool, message: string, data?: any})
        */
        if (error && error.response && error.response.data)
          errorData = error.response.data;
        else
          errorData = {
            error: true,
            message: error.message || "No error message",
          };

        errorData = {
          ...errorData,
          statusCode: error.response ? error.response.status : 0,
        };

        handleError(errorData);
        return errorData;
      })
      .then((response) => {
        endpointInfo.currentPromise = null; // Clear currentPromise after the axios request
        resolve(response); // Always resolve and use the "error" field of the response to know if the request succeed or not
      });
  });

  return endpointInfo.currentPromise;
}
