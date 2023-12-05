import axios from "axios";
import { GenderModel } from "../Model/GenderModel";
import { API_URL, TokenByLocalStorage } from "../APIConfig";
import { Holiday } from "../Components/HomePageComponents/UpcomingHolidays";
import { ManageHolidayModel } from "../Model/ManageHolidayModel";

export async function GetHolidaysAsync(): Promise<{ data: Holiday[]}> {
    try {
      const response = await axios.get(`${API_URL}holiday/GetHolidaysAsync`,{
        headers: {
          Authorization: `Bearer ${TokenByLocalStorage}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }

   
  export const CreateHoliday = async (data: ManageHolidayModel) => {
    try {
      const response = await axios.post(`${API_URL}holiday/CreateHoliday/`, data,{
        headers: {
          Authorization: `Bearer ${TokenByLocalStorage}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  export const UpdateHoliday = async (data: ManageHolidayModel) => {
    try {
      const response = await axios.post(`${API_URL}holiday/UpdateHoliday/`, data,{
        headers: {
          Authorization: `Bearer ${TokenByLocalStorage}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
