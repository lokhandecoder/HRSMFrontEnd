import axios from "axios";
import { API_URL } from "../APIConfig";
import { EmployeeLeavesReportResponse } from "../Model/EmployeeLeavesReportResponse";
import { EmployeeReportRequest } from "../Model/EmployeeReportRequest";

// export async function GetLeavesReportAsync(formData : []): Promise<{}> {
//     try {
  
//       // const token = localStorage.getItem("Token"); // Replace 'YOUR_BEARER_TOKEN' with your actual bearer token
  
//       const response = await axios.get(`${API_URL}leaveReport/GetLeavesReportAsync`,formData);
//       console.log(response);
//       return response.data;
//     } catch (error) {
//       throw new Error('Failed to update leave data: ' + (error as Error).message);
//     }
//   }

// export const GetLeavesReportAsync = async (formData: any): Promise<any> => {
//     try {
//       const apiUrlWithParams = `${API_URL}leaveReport/GetLeavesReportAsync`;
  
//       const response = await axios.post(apiUrlWithParams, formData, {
//         headers: {
//           'Content-Type': 'application/json', // Ensure the correct content type
//         },
//       });
  
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       // Handle errors
//       console.error('Error:', error);
//       throw new Error('Failed to update leave data. Please check the request format.');
//     }
//   };
  
// export const GetLeavesReportAsync = async (formData: EmployeeReportRequest): Promise<EmployeeLeavesReportResponse[]> => {
//   try {
//     const apiUrlWithParams = `${API_URL}leaveReport/GetLeavesReportAsync`;

//     // const response = await axios.post<EmployeeLeavesReport[]>(apiUrlWithParams, formData, {
//     //   headers: {
//     //     'Content-Type': 'application/json', // Ensure the correct content type
//     //   },
//     // });

//     const response = await axios.post(
//       `${API_URL}leaveReport/GetLeavesReportAsync`,
//       EmployeeReportRequest,{
//         headers: {
//           Authorization: `Bearer ${TokenByLocalStorage}`,
//         },
//       }
//     );

//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     // Handle errors
//     console.error('Error:', error);
//     throw new Error('Failed to update leave data. Please check the request format.');
//   }
// };
  


// export const GetLeavesReportAsync = async (employeeData: EmployeeReportRequest) => {
//   try {
    

//     const response = await axios.post( `${API_URL}Employee/UpdateEmployeeAsync`, employeeData );

//     return response.data; // Assuming response contains the actual data
//   } catch (error) {
//     const errorResponse = {
//       status: 500,
//       message: (error as Error).message,
//       data: null,
//       additionalParameters: null,
//     };

//     return errorResponse;
//   }
// };

export async function GetLeavesReportAsync(employeeData: EmployeeReportRequest): Promise<{ data: EmployeeLeavesReportResponse[]  }> {

  try {
    const response = await axios.post<{data:EmployeeLeavesReportResponse[] }>(`${API_URL}leaveReport/GetLeavesReportAsync/`,employeeData);
   // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch leave data: ' + (error as Error).message);
  }
}

//{ data: LeaveStatus[] }