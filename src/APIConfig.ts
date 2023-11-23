// apiConfig.js
 const API_URL = 'http://localhost:5024/api/';
//const API_URL = 'http://192.168.1.37:86/api/';
//const API_URL = 'http://10.0.0.57:86/api/';

const secretKey_global = "YourSecretKey";
const API_VERSION = 'v1';
const API_KEY = 'your-api-key';
const TIMEOUT = 5000; // 5 seconds
const EmployeeIDByLocalStorage = localStorage.getItem("EmployeeID");
const RoleByLocalStorage = localStorage.getItem("Role");

export { API_URL, API_VERSION, API_KEY, TIMEOUT, secretKey_global, EmployeeIDByLocalStorage, RoleByLocalStorage };