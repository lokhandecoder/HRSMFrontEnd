import { API_URL, EmployeeIDByLocalStorage, TokenByLocalStorage } from "../APIConfig";
import { LeaveFormData } from "../Model/LeaveFormData";import axios from "axios";
import { DecryptEmployeeID } from "./EncryptEmplyeeID";
import { AppliedLeaveUpdateStatus } from "../Model/AppliedLeaveModel";

//UpdateAppliedLeaveAsync/18
// const API_URL = 'https://leaveapplication14.azurewebsites.net/api/employee/';
// const API_URL = "http://localhost:5024/api/appliedLeave/";
//https://leaveapplication14.azurewebsites.net/api/appliedLeave/CreateAppliedLeaveAsync

export async function GetApplyLeaveById(appliedLeaveTypeId: number): Promise<{ data: LeaveFormData }> {

    try {
      const response = await axios.get<{data:LeaveFormData}>(`${API_URL}appliedLeave/GetAppliedLeaveByIdAsync/${appliedLeaveTypeId}`,{
        headers: {
          Authorization: `Bearer ${TokenByLocalStorage}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch leave data: ' + (error as Error).message);
    }
  }

  export async function createLeaveApply(leaveForm: LeaveFormData): Promise<any> {
    try {
      const response = await axios.post(`${API_URL}appliedLeave/CreateAppliedLeaveAsync`, leaveForm,{
        headers: {
          Authorization: `Bearer ${TokenByLocalStorage}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch leave data: ' + (error as Error).message);
    }
  }
  export async function updateLeaveApply(id: number, leaveForm: LeaveFormData): Promise<any> {
    try {
      const response = await axios.put(`${API_URL}appliedLeave/UpdateAppliedLeaveAsync/${id}`, leaveForm,{
        headers: {
          Authorization: `Bearer ${TokenByLocalStorage}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }
  export async function SendLeaveReminder(id: number): Promise<any> {
    try {
      const response = await axios.post(`${API_URL}appliedLeave/SendLeaveReminder/${id}`, {
        headers: {
          Authorization: `Bearer ${TokenByLocalStorage}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }
  export async function GetAppliedLeavesAsync(): Promise<any> {
    try {
      const response = await axios.get(`${API_URL}appliedLeave/GetAppliedLeavesAsync`,{
        headers: {
          Authorization: `Bearer ${TokenByLocalStorage}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }
  export async function GetAppliedLeavesByEmpIdAsync(): Promise<any> {
    try {
      const empID = DecryptEmployeeID();
     // const response = await axios.get(`${API_URL}appliedLeave/GetAppliedLeavesByReportingPersonIdAsync/${empID}`);
     const response = await axios.get(`${API_URL}appliedLeave/GetAppliedLeavesByEmpIdAsync/${empID}`,{
      headers: {
        Authorization: `Bearer ${TokenByLocalStorage}`,
      },
    });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }

  export async function GetAppliedLeavesByReportingPersonIdAsync(reportingPersonId : number): Promise<any> {
    try {
      //const empID = DecryptEmployeeID();
     // const response = await axios.get(`${API_URL}appliedLeave/GetAppliedLeavesByReportingPersonIdAsync/${empID}`);
     const response = await axios.get(`${API_URL}appliedLeave/GetAppliedLeavesByReportingPersonIdAsync/${reportingPersonId}`,{
      headers: {
        Authorization: `Bearer ${TokenByLocalStorage}`,
      },
    });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }

  export async function updateLeaveStatus(id: number, leaveForm: LeaveFormData): Promise<any> {
    try {
      const response = await axios.put(`${API_URL}UpdateAppliedLeaveAsync/${id}`, leaveForm,{
        headers: {
          Authorization: `Bearer ${TokenByLocalStorage}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }

  export async function UpdateIsRejectedAsync(appliedLeaveTypeId: number, isRejected: boolean): Promise<any> {
    try {
      const response = await axios.get(`${API_URL}AppliedLeave/UpdateIsRejectedAsync/${appliedLeaveTypeId}/${isRejected}`,{
        headers: {
          Authorization: `Bearer ${TokenByLocalStorage}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }
  
  export async function UpdateIsApprovedAsync(appliedLeaveTypeId: number, isApproved: boolean): Promise<any> {
    try {
     
      const response = await axios.get(`${API_URL}AppliedLeave/UpdateIsApprovedAsync/${appliedLeaveTypeId}/${isApproved}`,{
        headers: {
          Authorization: `Bearer ${TokenByLocalStorage}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }

  export async function UpdateIsApprovedCancelAsync(appliedLeaveTypeId: number, isApproved: boolean): Promise<any> {
    try {
      const response = await axios.put(`${API_URL}AppliedLeave/UpdateIsApprovedCancelAsync/${appliedLeaveTypeId}/${isApproved}`,{
        headers: {
          Authorization: `Bearer ${TokenByLocalStorage}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }

  export async function AppliedLeaveUpdateStatusAsync(updateStatus: AppliedLeaveUpdateStatus): Promise<any> {
    try {
      const response = await axios.post(`${API_URL}appliedLeave/AppliedLeaveUpdateStatusAsync`, updateStatus,{
        headers: {
          Authorization: `Bearer ${TokenByLocalStorage}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch leave data: ' + (error as Error).message);
    }
  }

  // export async function AppliedLeaveUpdateStatusByEmailAsync(updateStatus: AppliedLeaveUpdateStatus): Promise<any> {
  //   try {
  //     const response = await axios.post(`${API_URL}appliedLeave/AppliedLeaveUpdateStatusByEmailAsync`, updateStatus);
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     throw new Error('Failed to fetch leave data: ' + (error as Error).message);
  //   }
  // }

  export async function AppliedLeaveUpdateStatusByEmailAsync(code: string): Promise<any> {
    try {
     
      const response = await axios.get(`${API_URL}AppliedLeave/AppliedLeaveUpdateStatusByEmailAsync/${code}`,{
        headers: {
          Authorization: `Bearer ${TokenByLocalStorage}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }
  // export async function AppliedLeaveUpdateStatusByEmailConfirmAsync(code: string): Promise<any> {
  //   try {
     
  //     const response = await axios.get(`${API_URL}AppliedLeave/AppliedLeaveUpdateStatusByEmailConfirmAsync/${code}`,{
  //       headers: {
  //         Authorization: `Bearer ${TokenByLocalStorage}`,
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     throw new Error('Failed to update leave data: ' + (error as Error).message);
  //   }
  // }
  interface LeaveUpdateData {
    code: string;
    commentByUser: string;
    commentDate : Date | null;
  }
  
  export async function AppliedLeaveUpdateStatusByEmailConfirmAsync(dataObject: LeaveUpdateData) {
    try {
      const { code, commentByUser, commentDate} = dataObject;
  
      const response = await axios.post(
        `${API_URL}AppliedLeave/AppliedLeaveUpdateStatusByEmailConfirmAsync`,
        { code, commentByUser, commentDate }, // Passing commentByUser in the request body
        {
          headers: {
            Authorization: `Bearer ${TokenByLocalStorage}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }

  export async function DeleteAppliedLeaveByIdAsync(id: number): Promise<{ data: any }> {

    try {
      const response = await axios.delete(`${API_URL}appliedLeave/DeleteAppliedLeaveByIdAsync/${id}`,{
        headers: {
          Authorization: `Bearer ${TokenByLocalStorage}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch leave data: ' + (error as Error).message);
    }
  }