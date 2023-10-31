import axios from "axios";
import { API_URL } from "../APIConfig";
import { UserRoleMapping } from "../Model/UserRoleMapping";

export async function GetUserRoleMappingsAsync(): Promise<{ data: UserRoleMapping[]}> {
    try {
      const response = await axios.get(`${API_URL}UserRoleMapping/GetUserRoleMappingsAsync`);
      console.log(response.data)
    //console.log("66666666666666666666");
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }