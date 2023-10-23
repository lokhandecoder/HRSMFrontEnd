import axios from "axios";
import { GenderModel } from "../Model/GenderModel";
import { API_URL } from "../APIConfig";

export async function GetHolidaysAsync(): Promise<{ data: GenderModel[]}> {
    try {
      const response = await axios.get(`${API_URL}holiday/GetHolidaysAsync`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }