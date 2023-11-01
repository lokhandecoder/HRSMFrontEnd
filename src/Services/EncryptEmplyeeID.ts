import * as CryptoJS from 'crypto-js';


import { EmployeeIDByLocalStorage, secretKey_global } from '../APIConfig';

export const encryptData = (data: number, secretKey: string): string => {
  const encrypted = CryptoJS.AES.encrypt(data.toString(), secretKey);
  return encrypted.toString();
};
  
  // Decryption function
  export const decryptData = (encryptedData: string, secretKey: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  export const DecryptEmployeeID = () => {
    const encryptedEmployeeId = EmployeeIDByLocalStorage;
    if (!encryptedEmployeeId) {
      return { data: [] };
    }

    const employeeId = decryptData(encryptedEmployeeId, secretKey_global); 
    console.log("decrypted employee ID: ",employeeId)
    return employeeId;

  } 
