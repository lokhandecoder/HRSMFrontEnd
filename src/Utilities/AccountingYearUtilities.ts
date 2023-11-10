import React, { useEffect, useState } from "react";
import axios from "axios";
import { LeaveType } from "../Database/LeaveType";
import { EmployeeLeave } from "../Model/EmployeeLeave";
import { getLeaveTypes } from "../Services/LeaveType";
import useCustomSnackbar from "../Components/CustomComponent/useCustomSnackbar";
import dayjs, { Dayjs } from "dayjs";
import { GetEmployeeLeaveByEmployeeId } from "../Services/EmployeeLeaveServices";
import { API_URL } from "../APIConfig";

export const AccountingYearUtilities = () => {
    const snackbar = useCustomSnackbar();
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [employeeLeaves, setemployeeLeaves] = useState<EmployeeLeave[]>([]);
//   const [formData, setFormData] = useState<{
//     startDate: string;
//     endDate: string;
//     leavetype: {
//       [leavetypeid: string]: string;
//     };
//   }>({
//     startDate: "",
//     endDate: "",
//     leavetype: {},
//   });
const [formData, setFormData] = useState<{
    financialYear: {
      startDate: string;
      endDate: string;
    };
    leaveTypeCounts: {
      [key: string]: string | number;
    };
  }>({
    financialYear: {
      startDate: "",
      endDate: "",
    },
    leaveTypeCounts: {},
  });
  
  const isWeekend = (date: Dayjs) => {
    const day = date.day();
    return day === 0 || day === 6;
  };

  const handleChange = (field: string, value: string | Dayjs | null) => {
    const formattedValue: string =
      value === null
        ? ""
        : typeof value === "string"
        ? value
        : value.format("YYYY-MM-DD");
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      financialYear: {
        ...prevFormData.financialYear,
        [field]: formattedValue,
      },
    }));
  };
  
//   const handleTextFieldChange = (
//     leavetypeid: string,
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const newValue = e.target.value;

//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       leavetype: {
//         leavetypeid, // Set leavetypeid as a key
//         leavcount: newValue, // Set leavcount with the value
//       },
//     }));
//   };
const handleTextFieldChange = (
    fieldName: string | number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
  
    // Convert the value to a number if the fieldName is a number
    const numericValue = typeof fieldName === 'number' ? parseInt(newValue, 10) : newValue;
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      leaveTypeCounts: {
        ...prevFormData.leaveTypeCounts,
        [fieldName]: numericValue,
      },
    }));
  };
  
  
  

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted with data:", formData);
    axios.post(`${API_URL}FinancialYearSetup/CreateLeaveAllocationForAllLeaveTypes`, formData).then((res) => {console.log("Zhala re", res);
    snackbar.showSnackbar(
        "New Accountig Year has been Set Successfully",
        "success",
        { vertical: "top", horizontal: "center" },
        5000
      );
    }).catch((e) => {console.log(e);
        snackbar.showSnackbar(
            "Failed to Set Accounting Year",
            "error",
            { vertical: "top", horizontal: "center" },
            5000
          );
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leaveTypesData, employeeLeaveData] = await Promise.all([
          getLeaveTypes(),
          GetEmployeeLeaveByEmployeeId(),
        ]);
        const leaveTypes = leaveTypesData.data;
        setLeaveTypes(leaveTypes);
        const employeeLeave = employeeLeaveData.data;
        setemployeeLeaves(employeeLeave);
      } catch (error) {
        console.error("Failed to fetch data: ", (error as Error).message);
      }
    };

    fetchData();
  }, []);

  return {
    leaveTypes,
    employeeLeaves,
    formData,
    handleChange,
    isWeekend,
    handleTextFieldChange,
    handleSubmit,
    snackbar,
  };
};
