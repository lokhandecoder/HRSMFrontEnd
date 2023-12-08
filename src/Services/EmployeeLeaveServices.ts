import axios from "axios";
import { LeaveType } from "../Database/LeaveType";
import { EmployeeLeave } from "../Model/EmployeeLeave";
import { API_URL, TokenByLocalStorage } from "../APIConfig";
import { DecryptEmployeeID, decryptData } from "./EncryptEmplyeeID";

//https://leaveapplication14.azurewebsites.net/api/LeaveType/GetAllLeaveTypes
// const API_URL = 'https://leaveapplication14.azurewebsites.net/api/LeaveType'; // Replace with your API endpoint

export async function GetEmployeeLeaveByEmployeeId(): Promise<{
  data: EmployeeLeave[];
}> {
  try {
    const ID = DecryptEmployeeID();
    const response = await axios.get<{ data: EmployeeLeave[] }>(
      `${API_URL}EmployeeLeave/GetEmployeeLeaveByEmployeeId/${ID}`,{
        headers: {
          Authorization: `Bearer ${TokenByLocalStorage}`,
        },
      }
    );
    // console.log("Data from New API: ", response.data.data)

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch leave types: " + (error as Error).message);
  }
}
export async function GetEmployeeLeaveById(ID : number): Promise<{
  data: EmployeeLeave[];
}> {
  try {
    // const ID = DecryptEmployeeID();
    const response = await axios.get<{ data: EmployeeLeave[] }>(
      `${API_URL}EmployeeLeave/GetEmployeeLeaveByEmployeeId/${ID}`,{
        headers: {
          Authorization: `Bearer ${TokenByLocalStorage}`,
        },
      }
    );
    // console.log("Data from New API: ", response.data.data)

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch leave types: " + (error as Error).message);
  }
}

