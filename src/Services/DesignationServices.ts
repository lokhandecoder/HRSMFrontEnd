import axios from "axios";
import { API_URL, TokenByLocalStorage } from "../APIConfig";
import { DesignationModel } from "../Model/DesignationModel";

export async function GetDesignationsAsync(): Promise<{ data: DesignationModel[]}> {
    try {
      const response = await axios.get(`${API_URL}Designation/GetDesignationsAsync`,{
        headers: {
          Authorization: `Bearer ${TokenByLocalStorage}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }