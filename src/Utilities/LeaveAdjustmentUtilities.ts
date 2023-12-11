import React, { useEffect, useState } from "react";
import { leaveAdjustmentModel } from "../Model/leaveAdjustmentModel";
import useCustomSnackbar from "../Components/CustomComponent/useCustomSnackbar";
import { EmployeeModel } from "../Model/EmployeeModel";
import { EmployeeLeave } from "../Model/EmployeeLeave";
import {
  InputLabel,
  MenuItem,
  Select,
  Chip,
  SelectChangeEvent,
} from "@mui/material";
import {
  GetEmployeeLeaveById,
  UpdateEmployeeLeaveAsync,
} from "../Services/EmployeeLeaveServices";
import { GetEmployeesAsync } from "../Services/EmployeeServices";

export const LeaveAdjustmentUtilities = () => {
  const [formData, setFormData] = useState<leaveAdjustmentModel>({
    employeeId: 0,
    adjustmentAdd: 0,
    adjustmentDel: 0,
    // leaveReason: "", // Add leaveReason field to the state
  });
  const [selectedOption, setSelectedOption] = useState("Add"); // State to manage selected option
  const snackbar = useCustomSnackbar();
  const [employeeNames, setEmployeeNames] = useState<EmployeeModel[]>([]);
  const [employeeLeaves, setemployeeLeaves] = useState<EmployeeLeave[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleChangeOption = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as string;
    setSelectedOption(selectedValue);

    // Check if formData.adjustmentAdd and formData.adjustmentDel are not null before performing addition
    if (formData.adjustmentAdd !== null && formData.adjustmentDel !== null) {
      if (selectedValue === "Add") {
        setFormData({
          ...formData,
          adjustmentAdd: formData.adjustmentAdd + formData.adjustmentDel,
          adjustmentDel: 0,
        });
      } else if (selectedValue === "Subtract") {
        setFormData({
          ...formData,
          adjustmentAdd: 0,
          adjustmentDel: formData.adjustmentAdd + formData.adjustmentDel,
        });
      }
    } else {
      // Handle the case where either formData.adjustmentAdd or formData.adjustmentDel is null
      // You might want to set default values or handle this scenario based on your application's logic
      console.error("Adjustment values are null.");
    }
  };

  const handleNoOfDays = (value: string) => {
    const regex = /^[0-9]*$/;
    if (value === "" || (value.length <= 30 && regex.test(value))) {
      const numberOfDays = value === "" ? 0 : parseInt(value, 10);

      if (selectedOption === "Add") {
        setFormData({
          ...formData,
          adjustmentAdd: numberOfDays,
          adjustmentDel: null, // Set the number of days to addLeaves if 'Add' is selected
        });
      } else if (selectedOption === "Subtract") {
        setFormData({
          ...formData,
          adjustmentDel: numberOfDays,
          adjustmentAdd: null, // Set the number of days to deleteLeaves if 'Subtract' is selected
        });
      }
    }
  };
  const fetchLeaves = async (id: number) => {
    try {
      const employeeLeaves = await GetEmployeeLeaveById(id); // Assuming GetEmployeeLeaveById accepts an 'id' argument
      console.log("employeeLeaves", employeeLeaves.data);
      setemployeeLeaves(employeeLeaves.data);
      // Further logic with employeeLeaves
    } catch (e) {
      console.log("error", e);
      // Handle errors
    }
  };
  const handleEmployeeChange = async (employeeId: number) => {
    handleChange("employeeId", employeeId);
    if (employeeId !== 0) {
      setFieldErrors({}); // Clear the error for employeeId field
      await fetchLeaves(employeeId);
    } else {
      setFieldErrors({
        employeeId: "Please select an employee",
      });
    }
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const employeesResponse = await GetEmployeesAsync();
        setEmployeeNames(employeesResponse.data);
        console.log("employeesResponse", employeesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleSubmit = async () => {
    if (formData.employeeId === 0) {
      setFieldErrors({
        employeeId: "Please select an employee",
      });
    } else {
      setFieldErrors({}); // Clear the error for employeeId field
      console.log("Form Data: ", formData);
      try {
        const senData = await UpdateEmployeeLeaveAsync(formData);
        console.log("senData", senData.data);

        handleClear();
        snackbar.showSnackbar(
          "Leaves Updated Successfully",
          "success",
          { vertical: "top", horizontal: "center" },
          5000
        );
        // Implement logic for form submission or API calls here
      } catch (e) {
        console.log(e);
        // Handle errors from UpdateEmployeeLeaveAsync
      }
    }
  };

  const handleClear = () => {
    setFormData({
      employeeId: 0,
      adjustmentAdd: 0,
      adjustmentDel: 0,
      // leaveReason: "",
    });
    setemployeeLeaves([]); // Resetting employeeLeaves state as well
  };
  return {
    employeeNames,
    formData,
    handleEmployeeChange,
    fieldErrors,
    employeeLeaves,
    selectedOption,
    handleChangeOption,
    handleNoOfDays,
    handleInputChange,
    handleSubmit,
    handleClear,
    snackbar,
  };
};
