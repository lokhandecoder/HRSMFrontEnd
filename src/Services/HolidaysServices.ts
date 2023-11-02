import axios from "axios";
import { GenderModel } from "../Model/GenderModel";
import { API_URL } from "../APIConfig";
import { Holiday } from "../Components/HomePageComponents/UpcomingHolidays";

export async function GetHolidaysAsync(): Promise<{ data: Holiday[]}> {
    try {
      const response = await axios.get(`${API_URL}holiday/GetHolidaysAsync`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }