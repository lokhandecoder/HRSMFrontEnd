import { useState, useEffect } from "react";
import { EmployeeModel } from "../Model/EmployeeModel";
import { DesignationModel } from "../Model/DesignationModel";
import { GenderModel } from "../Model/GenderModel";
import dayjs, { Dayjs } from "dayjs";
import {
  GetEmployeeByIdAsync,
  GetEmployeesAsync,
  createEmployee,
  updateEmployee,
} from "../Services/EmployeeServices";
import useCustomSnackbar from "../Components/CustomComponent/useCustomSnackbar";
import { useNavigate } from "react-router-dom";
import { GetGendersAsync } from "../Services/GenderServices";
import { GetDesignationsAsync } from "../Services/DesignationServices";
export const EmployeesUtilities = (employeeId: number) => {
  const navigate = useNavigate();
  const today = dayjs();
  const todayDate = today.toDate();
  const snackbar = useCustomSnackbar();

  const [employeeData, setEmployeeData] = useState<EmployeeModel[]>([]);
  const [designations, setDesignations] = useState<DesignationModel[]>([]);
  const [genders, setGenders] = useState<GenderModel[]>([]);

  const onEdit = (employeeId: number) => {
    navigate(`/employee/${employeeId}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [designationResult, genderResult] = await Promise.allSettled([
          GetDesignationsAsync(),
          GetGendersAsync(),
        ]);

        setDesignations(
          designationResult.status === "fulfilled"
            ? designationResult.value.data
            : []
        );
        setGenders(
          genderResult.status === "fulfilled" ? genderResult.value.data : []
        );

        const employeeResult = await GetEmployeesAsync();

        setEmployeeData(employeeResult.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return {
    employeeData,
    onEdit,
  };
};
