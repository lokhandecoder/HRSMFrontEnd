import axios from "axios";
import { API_URL, TokenByLocalStorage } from "../APIConfig";

export async function GetActiveLeaveAllocationAsync(): Promise<any> {
    try {
      const response = await axios.get(`${API_URL}leaveAllocation/GetActiveLeaveAllocationAsync`,{
        headers: {
          Authorization: `Bearer ${TokenByLocalStorage}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }