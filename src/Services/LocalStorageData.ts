
interface StoredData {
    employeeId: number;
    roleAssignId: number;
    userName?: string;
    password?: string;
    firtsName?: string;
    lastName?: string;
    token?: string;
    refreshToken?: string;
    refreshTokenExpiryTime?: string;
  }
  
  let storedData: StoredData | null = null; // Declare storedData variable
export const GetLoginEmployeeByLocalStorage = () => {
    const storedDataString = localStorage.getItem("Role");
  
    if (storedDataString) {
      storedData = JSON.parse(storedDataString);
    
      if (storedData !== null) {
        return storedData;
      } else {
        console.log("Invalid data retrieved from localStorage.");
      }
    } else {
      console.log("No data found for 'Role' in localStorage.");
    }
}