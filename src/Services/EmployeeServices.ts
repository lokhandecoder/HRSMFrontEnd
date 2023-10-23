import { GenderModel } from "../Model/GenderModel";
import { API_URL } from "../APIConfig";
import { EmployeeModel } from "../Model/EmployeeModel";
import dayjs, { Dayjs } from "dayjs"; // Import dayjs
import axios, { AxiosResponse, AxiosError } from "axios";

export const createEmployee = async (employeeData: EmployeeModel) => {
  try {
    if (employeeData.dateOfBirth) {
      employeeData.dateOfBirth = dayjs(employeeData.dateOfBirth).format(
        "YYYY-MM-DD"
      );
    }
    if (employeeData.dateOfJoining) {
      employeeData.dateOfJoining = dayjs(employeeData.dateOfJoining).format(
        "YYYY-MM-DD"
      );
    }

    const response = await axios.post(
      `${API_URL}Employee/CreateEmployeeAsync`,
      employeeData
    );

    return response.data; // Assuming response contains the actual data
  } catch (error) {
    const errorResponse = {
      status: 500,
      message: (error as Error).message,
      data: null,
      additionalParameters: null,
    };

    return errorResponse;
  }
};

export const updateEmployee = async (employeeData: EmployeeModel) => {
  try {
    if (employeeData.dateOfBirth) {
      employeeData.dateOfBirth = dayjs(employeeData.dateOfBirth).format(
        "YYYY-MM-DD"
      );
    }
    if (employeeData.dateOfJoining) {
      employeeData.dateOfJoining = dayjs(employeeData.dateOfJoining).format(
        "YYYY-MM-DD"
      );
    }

    const response = await axios.post(
      `${API_URL}Employee/UpdateEmployeeAsync`,
      employeeData
    );

    return response.data; // Assuming response contains the actual data
  } catch (error) {
    const errorResponse = {
      status: 500,
      message: (error as Error).message,
      data: null,
      additionalParameters: null,
    };

    return errorResponse;
  }
};


export async function GetEmployeeByIdAsync(employeeId :number): Promise<{ data: EmployeeModel}> {
  try {
    const response = await axios.get(`${API_URL}Employee/GetEmployeeByIdAsync/${employeeId}`);
    //console.log(response);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update leave data: ' + (error as Error).message);
  }
}


export async function GetEmployeesAsync(): Promise<{ data: EmployeeModel[]}> {
  try {
    const response = await axios.get(`${API_URL}Employee/GetEmployeesAsync`);
    //console.log(response);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update leave data: ' + (error as Error).message);
  }
}

