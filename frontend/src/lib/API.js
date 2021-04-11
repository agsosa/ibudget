const DEV_BASE_URL = "http://localhost:4002/api";
const PROD_BASE_URL = "https://ibudget.app/api";

const API_BASE_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? DEV_BASE_URL
    : PROD_BASE_URL;
