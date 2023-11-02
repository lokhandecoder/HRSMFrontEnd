import axios from 'axios';
import { LeaveType } from '../Database/LeaveType';
import { LeaveStatus } from '../Model/LeaveStatus';
import { API_URL } from '../APIConfig';


//https://leaveapplication14.azurewebsites.net/api/LeaveType/GetAllLeaveTypes
// const API_URL = 'https://leaveapplication14.azurewebsites.net/api/LeaveType'; // Replace with your API endpoint
//const API_URL = 'http://localhost:5024/api/LeaveType';
//http://localhost:5024/api/LeaveStatus/GetLeaveStatusesAsync



//async function getLeaveTypes(): Promise<CommonResponse<LeaveType>> {


export async function getLeaveTypes(): Promise<{ data: LeaveType[] }> {
  try {
  //  const response = await axios.get<LeaveType[]>(`${API_URL}/GetAllLeaveTypes`);
  const response = await axios.get<{ data: LeaveType[] }>(`${API_URL}LeaveType/GetAllLeaveTypes`);

    return response.data;
    
  } catch (error) {
    throw new Error('Failed to fetch leave types: ' + (error as Error).message);
  }
}
// export astnc function getLeaveStatus(): Promise<{data: LeaveStatus }>{

//   try{
//     const response = await
//   }
// }
export async function getLeaveStatus(): Promise<{ data: LeaveStatus[] }> {
  try {
    
  //  const response = await axios.get<LeaveType[]>(`${API_URL}/GetAllLeaveTypes`);
  const response = await axios.get<{ data: LeaveStatus[] }>(`${API_URL}LeaveStatus/GetLeaveStatusesAsync`);
    return response.data;
    
  } catch (error) {
    throw new Error('Failed to fetch leave types: ' + (error as Error).message);
  }
}