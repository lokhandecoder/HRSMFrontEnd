import axios from "axios";
import { GenderModel } from "../Model/GenderModel";
import { API_URL, TokenByLocalStorage } from "../APIConfig";

export async function GetGendersAsync(): Promise<{ data: GenderModel[]}> {
    try {
      const response = await axios.get(`${API_URL}Gender/GetGendersAsync`,{
        headers: {
          Authorization: `Bearer ${TokenByLocalStorage}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }