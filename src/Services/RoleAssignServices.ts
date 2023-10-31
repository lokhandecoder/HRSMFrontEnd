import axios from "axios";
import { API_URL } from "../APIConfig";
import { RowHeaderModel, ColumnHeaderModel } from "../Model/RoleAssignModels";
import { UserRoleMapping } from "../Model/UserRoleMapping";
import { EmployeeModel } from "../Model/EmployeeModel";

export async function GetRoleAssignsAsync(): Promise<{ data: ColumnHeaderModel[] }> {
    try {
      const response = await axios.get(`${API_URL}RoleAssign/GetRoleAssignsAsync/`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch role assigns data: ' + (error as Error).message);
    }
  }


  export async function GetApplicationPagesAsync(): Promise<{ data: RowHeaderModel[] }> {
    try {
      const response = await axios.get(`${API_URL}ApplicationPage/GetApplicationPagesAsync/`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch application pages data: ' + (error as Error).message);
    }
  }
  
  
  
  
  export const createUserRoleMappingsAsync = async (data: UserRoleMapping) => {
    try {
      const response = await axios.post(`${API_URL}UserRoleMapping/CreateUserRoleMappingsAsync/`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  // export async function GetRoleAssignIdByEmployee(): Promise<{ data: EmployeeModel[] }> {
  //   try {
  //     const response = await axios.get(`${API_URL}employee/GetEmployeesAsync`);
  //     console.log("checking data", response.data)
  //     return response.data;
  //   } catch (error) {
  //     throw new Error('Failed to fetch role assigns data: ' + (error as Error).message);
  //   }
  // }
