import axios from "axios";
import { API_URL } from "../APIConfig";

export async function GetActiveLeaveAllocationAsync(): Promise<any> {
    try {
      const response = await axios.get(`${API_URL}leaveAllocation/GetActiveLeaveAllocationAsync`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }