import axios from "axios";
import { API_URL } from "../APIConfig";
import { FinancialYearModel } from "../Model/FinancialYearModel";


export async function GetActiveFinancialYearsAsync(): Promise<{ data: FinancialYearModel[]}> {
    try {
      const response = await axios.get(`${API_URL}FinancialYear/GetActiveFinancialYearsAsync`);
      //console.log(response);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }