// TODO: Add automatic retry?
/* eslint-disable */
import axios from "axios";
import { dispatchNotification } from "lib/Helpers";
import { NotificationTypeEnum } from "lib/Enums";

const DEV_BASE_URL = "http://localhost:4002/api";
const PROD_BASE_URL = "https://ibudget.app/api";

const API_BASE_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? DEV_BASE_URL
    : PROD_BASE_URL;

// Function called on API request error, can be used to display a message etc
function handleError(errorData) {
  console.error("API error:", errorData);

  // TODO: GET ERROR CODE AND CHANGE MESSAGE FOR SOME CODES (FOR EXAMPLE API RATE LIMITED)
  dispatchNotification(
    NotificationTypeEnum.ERROR,
    "Error while synchronizing the data, please try again"
  );
}

const ENDPOINTS = {
  getTransactions: {
    currentPromise: null,
    axiosCall: () => axios.get(API_BASE_URL + "/transactions"),
  },
  createTransaction: {
    currentPromise: null,
    axiosCall: (payload) => axios.post(API_BASE_URL + "/transactions", payload),
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
    endpointInfo.currentPromise = endpointInfo
      .axiosCall(payload)
      .then(({ data }) => {
        if (data.error) {
          throw new Error(data.error);
        } else resolve(data); // Resolve on valid data received
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
