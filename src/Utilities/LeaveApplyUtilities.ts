import { SelectChangeEvent } from "@mui/material/Select";
import { EmployeeLeave } from "../Model/EmployeeLeave";
import { GetEmployeeLeave } from "../Database/LeaveType";
import { LeaveFormData } from "../Model/LeaveFormData";
import { useState, useEffect } from "react";
import { GetLeaveHistory } from "../Database/LeaveHIstory";
import { Console } from "console";
import axios from "axios";
import { createLeaveApply, updateLeaveApply } from "../Services/EmployeeLeaveApplyServices";
import useCustomSnackbar from "../Components/CustomComponent/useCustomSnackbar";



const LeaveApplyUtilities = (
  formData: any,
  setFormData: React.Dispatch<any>,
  todayDate: any,
  onSubmit: any,

  difference: any,
  setdifference: any,
  balanceLeave: any,
  setBalanceLeave: any,

  employeeLeaves :EmployeeLeave[] ,setemployeeLeaves :any, errors:any,
  setErrors :any, snackbar:any, initialFormData : any ) => {


    const [loading, setLoading] = useState(false);


  const handleSubmit = async (event: React.FormEvent) => {
    setLoading(true);

    event.preventDefault();

    const isValid = isFormDataValid(formData);
   // alert(isValid);
    if (!isValid) {
      // Handle validation error, e.g., display an error message
      setLoading(false);
      return;
    }

    const applyLeave =
    formData.appliedLeaveTypeId > 0
      ? await updateLeaveApply(formData.appliedLeaveTypeId, formData)
      : await createLeaveApply(formData);

    const { status, message } = applyLeave;
    
    if (status ===200){
      //setsubmitMessageOpen(true);
      snackbar.showSnackbar(message, 'success', { vertical: 'top', horizontal: 'center' }, 5000);
      setLoading(false);
      handleClear();
    }else{
      //setsubmitMessageOpen(true);
      //handleClear();
      setLoading(false);
      snackbar.showSnackbar(message, 'warning', { vertical: 'top', horizontal: 'center' }, 5000);
    }

    console.log({formData});

  }
  const isFormDataValid = (formData: LeaveFormData) => {
    const newErrors: Partial<Record<keyof LeaveFormData, string>> = {};
    if (formData.leaveTypeId <= 0) {
      newErrors.leaveTypeId = 'Please select a leave type.';
    }
  
    // Check for null values and compare dates
    if (formData.startDate !== null && formData.endDate !== null) {
      if (formData.startDate > formData.endDate) {
        newErrors.startDate = 'Start date must be less than or equal to end date.';
        newErrors.endDate = 'Start date must be less than or equal to end date.';
      }
    }

  
    if (formData.employeeId <= 0) {
      newErrors.employeeId = 'Please select an employee.';
    }
  
    if (formData.applyLeaveDay > formData.balanceLeave) {
      newErrors.applyLeaveDay = 'Applied leave cannot exceed balance leave.';
    }
    if (formData.leaveReason == "") {
      newErrors.leaveReason = 'Please provide a reason';
    }
  
    // You can add additional validations for other fields here
  
    // Check if there are any errors
    const isValid = Object.keys(newErrors).length === 0;
  
    setErrors(newErrors);
   // return { isValid, errors };
   return isValid;
  };
  
  const handleSelectChange = (event: SelectChangeEvent<string | number>) => {
    const value =
      typeof event.target.value === "string"
        ? parseInt(event.target.value, 10)
        : event.target.value;
    setFormData({
      ...formData,
      leaveTypeId: value as number,
    });
    // Test();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (name: string, date: Date | null) => {
    setFormData({
      ...formData,
      [name]: date,
    });
    // differenceCehcker();

    // Test()
  };

  const handleIsHalfDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      isHalfDay: event.target.checked, // Update isHalfDay with the checkbox value
    });
  };

  const handleClear = () => {
    setFormData(initialFormData);
    setdifference(0);


  
  };

 
  const GetBalanceLeaveByLeaveTypeId = (
   // employeeLeaves: employeeLeaves,
    leaveTypeId: number
  ): number | null => {
    const balanceLeave = employeeLeaves.find(
      (leave) => leave.leaveTypeId === leaveTypeId 
    );
    const balance =balanceLeave ? balanceLeave.balanceLeaves : 0;
    return balance;
  };
  const differenceChecker = () => {
    const date1 = new Date(formData.startDate);
    const date2 = new Date(formData.endDate);
    const differenceInMilliseconds = Math.abs(
      date2.getTime() - date1.getTime()
    );
    let differenceInDays = Math.ceil(
      differenceInMilliseconds / (1000 * 3600 * 24)
    );
    const startDate = date1.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const endDate = date2.getDay();
    const weekends = Math.floor((differenceInDays + startDate) / 7) * 2;
    differenceInDays -= weekends;
    const finaldays = differenceInDays + 1;
    if (startDate === 6) differenceInDays--;
    if (startDate === 0) differenceInDays--;
    if (endDate === 6) differenceInDays--;
    if (differenceInDays < 0) differenceInDays = 0;
    if (formData.startDate > formData.endDate) {
      return 0;
    } else {
      setdifference(finaldays);
      // setFormData((prevFormData: LeaveFormData) => ({
      //   ...prevFormData,
      //   difference: finaldays,
      // }));
      console.log("Difference in days (excluding weekends):", finaldays);
    //  alert(finaldays);
      return finaldays;
    }
  };

  const Test = () => {
    if (formData.leaveTypeId > 0) {
      const balanceLeave = GetBalanceLeaveByLeaveTypeId(
        //GetEmployeeLeave(),
        formData.leaveTypeId
      );
      //alert(balanceLeave);
      setFormData((prevFormData: LeaveFormData) => ({
        ...prevFormData,
        balanceLeave: balanceLeave,
      }));

      let applyLeave =0;
      if (formData.isHalfDay){
         applyLeave = 0.5
      }else{
         applyLeave =  differenceChecker();
      }
     
     setFormData((prevFormData: LeaveFormData) => ({
      ...prevFormData,
      applyLeaveDay: applyLeave,
      remaingLeave: prevFormData.balanceLeave -  applyLeave ,
    }));
    // setFormData((prevFormData: LeaveFormData) => ({
    //   ...prevFormData,
    //   remaingLeave: prevFormData.balanceLeave -  prevFormData.applyLeave  ,
    // }));

    } else {
      setFormData((prevFormData: LeaveFormData) => ({
        ...prevFormData,
        balanceLeave: 0,
        applyLeaveDay: 0,
        remaingLeave : 0
      }));
    }
   
    console.log({formData});
  };

  

  return {
    handleSelectChange,
    handleInputChange,
    handleDateChange,
    GetBalanceLeaveByLeaveTypeId,
    handleClear,
    handleSubmit,
    Test,
    loading,
    differenceChecker,
    // ValidateEmployeeById,
    handleIsHalfDayChange
  };
};
export default LeaveApplyUtilities;
