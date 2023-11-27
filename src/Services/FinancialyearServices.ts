import axios from "axios";
import { API_URL, TokenByLocalStorage } from "../APIConfig";
import { FinancialYearModel } from "../Model/FinancialYearModel";


export async function GetActiveFinancialYearsAsync(): Promise<{ data: FinancialYearModel[]}> {
    try {
      const response = await axios.get(`${API_URL}FinancialYear/GetActiveFinancialYearsAsync`,{
        headers: {
          Authorization: `Bearer ${TokenByLocalStorage}`,
        },
      });
      //console.log(response);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }