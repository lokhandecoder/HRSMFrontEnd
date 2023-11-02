import React from 'react';
import CryptoJS from 'crypto-js';

const secretKey = 'your-secret-key'; // Replace with your own secret key

// Function to set a value in storage in encrypted format
export const  setEncryptedValueInStorage = (key: string, value: any) => {
  try {
    const serializedValue = JSON.stringify(value);
    const encryptedValue = CryptoJS.AES.encrypt(serializedValue, secretKey).toString();
    localStorage.setItem(key, encryptedValue);
  } catch (error) {
    console.error('Error setting encrypted value in storage:', error);
  }
};

// Function to get an encrypted value from storage and decrypt it
export const  getDecryptedValueFromStorage = (key: string, defaultValue: any) => {
  try {
    const encryptedValue = localStorage.getItem(key);
    if (encryptedValue !== null) {
      const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
      const decryptedValue = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedValue;
    }
  } catch (error) {
    console.error('Error getting decrypted value from storage:', error);
  }

  return defaultValue;
};

