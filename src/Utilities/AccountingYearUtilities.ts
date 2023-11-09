import React, { useEffect, useState } from "react";
import { LeaveType } from "../Database/LeaveType";
import { EmployeeLeave } from "../Model/EmployeeLeave";
import { getLeaveTypes } from "../Services/LeaveType";
import dayjs, { Dayjs } from "dayjs";
import { GetEmployeeLeaveByEmployeeId } from "../Services/EmployeeLeaveServices";

export const AccountingYearUtilities = () => {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [employeeLeaves, setemployeeLeaves] = useState<EmployeeLeave[]>([]);
  const [formData, setFormData] = useState<{
    startDate: string;
    endDate: string;
    leavetype: {
      [leavetypeid: string]: string;
    };
  }>({
    startDate: "",
    endDate: "",
    leavetype: {},
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
      [field]: formattedValue,
    }));
  };
  const handleTextFieldChange = (
    leavetypeid: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      leavetype: {
        leavetypeid, // Set leavetypeid as a key
        leavcount: newValue, // Set leavcount with the value
      },
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted with data:", formData);
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
  };
};
