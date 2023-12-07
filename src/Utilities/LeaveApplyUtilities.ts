import { SelectChangeEvent } from "@mui/material/Select";
import { EmployeeLeave } from "../Model/EmployeeLeave";
import { GetEmployeeLeave, LeaveType } from "../Database/LeaveType";
import { LeaveFormData } from "../Model/LeaveFormData";
import { useState, useEffect } from "react";
import { GetLeaveHistory } from "../Database/LeaveHIstory";
import { Console } from "console";
import axios from "axios";
import {
  GetApplyLeaveById,
  createLeaveApply,
  updateLeaveApply,
} from "../Services/EmployeeLeaveApplyServices";
import useCustomSnackbar from "../Components/CustomComponent/useCustomSnackbar";
import { getLeaveTypes } from "../Services/LeaveType";
import { GetEmployeeLeaveByEmployeeId } from "../Services/EmployeeLeaveServices";
import { GetHolidaysAsync } from "../Services/HolidaysServices";
import dayjs from "dayjs"; // Import dayjs library
import { GetActiveFinancialYearsAsync } from "../Services/FinancialyearServices";
import { FinancialYearModel } from "../Model/FinancialYearModel";

const LeaveApplyUtilities = (
  formData: any,
  setFormData: React.Dispatch<any>,
  todayDate: any,
  onSubmit: any,
  difference: any,
  setdifference: any,
  balanceLeave: any,
  setBalanceLeave: any,
  employeeLeaves: EmployeeLeave[],
  setemployeeLeaves: any,
  errors: any,
  setErrors: any,
  snackbar: any,
  initialFormData: any
) => {
  const [loading, setLoading] = useState(false);
  const [previousApplyLeave, setPreviousApplyLeave] = useState(0);
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [publicHolidaysList, setPublicHolidaysList] = useState<string[]>([]);
  const [financialYearDates, setFinancialYearDates] = useState<
    FinancialYearModel[]
  >([]);
  const [startDateFinancialYear, setStartDateFinancialYear] =
    useState<Date | null>(null);
  const [endDateFinancialYear, setEndDateFinancialYear] = useState<Date | null>(
    null
  );

  const FetchHolidayList = async () => {
    try {
      const fetchData = await GetHolidaysAsync();
      const fetched = fetchData.data;
      if (Array.isArray(fetched)) {
        const holidayDates = fetched.map((holiday) => {
          const date = dayjs(holiday.holidayDate); // Create a dayjs object from the holiday date
          return date.format("YYYY-MM-DD"); // Format the date to "YYYY-MM-DD"
        });

        console.log("Holiday Dates (yyyy-mm-dd):", holidayDates);
        setPublicHolidaysList(holidayDates);
      } else {
        console.error("Invalid holidays data.");
      }
    } catch (error) {
      console.error("Error fetching leave types:", (error as Error).message);
    }
  };
  const FetchFinancialYear = async () => {
    try {
      const fetchData = await GetActiveFinancialYearsAsync();
      const fetched = fetchData.data;
      if (Array.isArray(fetched)) {
        const formattedDates: FinancialYearModel[] = fetched.map(
          (financialYear) => {
            const startDate = dayjs(financialYear.startDate).toDate(); // Convert to Date object
            const endDate = dayjs(financialYear.endDate).toDate(); // Convert to Date object

            return {
              financialYearId: financialYear.financialYearId, // Replace with the actual financialYearId
              startDate: startDate,
              endDate: endDate,
              activeYear: financialYear.activeYear, // Replace with the actual activeYear
            };
          }
        );

        console.log("format date", formattedDates);
        setFinancialYearDates(formattedDates);
        setStartDateFinancialYear(formattedDates[0].startDate);
        setEndDateFinancialYear(formattedDates[0].endDate);
      } else {
        console.error("Invalid financial year data.");
      }
    } catch (error) {
      console.error("Error fetching financial year:", (error as Error).message);
    }
  };

  const isPublicHoliday = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    return publicHolidaysList.some((holiday) => holiday === dateString);
  };

  const verifyStartdateFinancialYear = (date: Date) => {
    console.log("provided date", date);
    console.log("financail year date ", startDateFinancialYear);
  };

  // const isPublicHolidayForFinancialYear = (date: Date | null) => {
  //   if (date === null) {
  //     return false; // Handle null case as needed
  //   }

  //   const dateString = date.toISOString().split("T")[0];

  //   // Ensure startDateFinancialYear is an array before using some()
  //   if (Array.isArray(startDateFinancialYear)) {
  //     return startDateFinancialYear.some((holiday) => {
  //       if (holiday instanceof Date) {
  //         return holiday.toISOString().split("T")[0] === dateString;
  //       }
  //       return false;
  //     });
  //   }

  //   return false;
  // };

  // const handleSubmit = async (event: React.FormEvent) => {
  //   setLoading(true);

  //   event.preventDefault();
  //   const isValid = isFormDataValid(formData);
  //   if (!isValid) {
  //     setLoading(false);
  //     return;
  //   }

  //   const applyLeave =
  //     formData.appliedLeaveTypeId > 0
  //       ? await updateLeaveApply(formData.appliedLeaveTypeId, formData)
  //       : await createLeaveApply(formData);

  //   const { status, message } = applyLeave;

  //   if (status === 200) {
  //     snackbar.showSnackbar(
  //       message,
  //       "success",
  //       { vertical: "top", horizontal: "center" },
  //       5000
  //     );
  //     setLoading(false);
  //     if (formData.appliedLeaveTypeId === 0) handleClear();
  //     fetchData();
  //   } else {
  //     fetchData();
  //     setLoading(false);
  //     snackbar.showSnackbar(
  //       message,
  //       "warning",
  //       { vertical: "top", horizontal: "center" },
  //       5000
  //     );
  //   }
  // };
  const handleSubmit = async (event: React.FormEvent) => {
    setLoading(true);
  
    event.preventDefault();
    const isValid = isFormDataValid(formData);
    if (!isValid) {
      setLoading(false);
      return;
    }
  
    try {
      const applyLeave =
        formData.appliedLeaveTypeId > 0
          ? await updateLeaveApply(formData.appliedLeaveTypeId, formData)
          : await createLeaveApply(formData);


          console.log("apply ", applyLeave)
  
      const { status, message , error  } = applyLeave;
  
      if (status === 200) {
        snackbar.showSnackbar(
          message,
          'success',
          { vertical: 'top', horizontal: 'center' },
          5000
        );
        setLoading(false); 
        handleClear();
        fetchData();
      } else {
        fetchData();
        setLoading(false);
        snackbar.showSnackbar(
          error,
          'warning',
          { vertical: 'top', horizontal: 'center' },
          5000
        );
      }

    } catch (error: any) {
      // Handle errors that occur during submission or fetching
      setLoading(false);
      console.log("error", error)
      // if (error?.message === 'Network Error') {
      //   const errorMessage = 'Failed to fetch leave data. Please check your network connection.';
      //   snackbar.showSnackbar(
      //     errorMessage,
      //     'error',
      //     { vertical: 'top', horizontal: 'center' },
      //     5000
      //   );
      // } else {
      //   const errorMessage = 'An error occurred. Please try again.';
      //   console.log("error", {error})
      //   snackbar.showSnackbar(
      //     errorMessage,
      //     'error',
      //     { vertical: 'top', horizontal: 'center' },
      //     5000
      //   );
      // }
      console.error('Error:', error);
    }
  };
  
  
  const isFormDataValid = (formData: LeaveFormData) => {
    const newErrors: Partial<Record<keyof LeaveFormData, string>> = {};
    if (formData.leaveTypeId <= 0) {
      newErrors.leaveTypeId = "Please select a leave type.";
    }

    if (formData.startDate !== null && formData.endDate !== null) {
      const startdate = new Date(formData.startDate);
      const enddate = new Date(formData.endDate);

      if (!formData.isHalfDay) {
        if (enddate < startdate) {
          newErrors.startDate =
            "Start date must be less than or equal to end date.";
          newErrors.endDate =
            "Start date must be less than or equal to end date.";
        }
      }
      if (isPublicHoliday(startdate)) {
        newErrors.startDate = "Start date cannot be a public holiday.";
      }
      if (isPublicHoliday(enddate)) {
        newErrors.endDate = "End date cannot be a public holiday.";
      }
      if (
        startDateFinancialYear &&
        endDateFinancialYear &&
        startdate < startDateFinancialYear
      ) {
        newErrors.startDate =
          "Start date is before the financial year start date.";
      } else if (
        startDateFinancialYear &&
        endDateFinancialYear &&
        startdate > endDateFinancialYear
      ) {
        newErrors.startDate =
          "Start date is after the financial year end date.";
      }
      if (
        startDateFinancialYear &&
        endDateFinancialYear &&
        enddate < startDateFinancialYear
      ) {
        newErrors.endDate = "End date is before the financial year start date.";
      } else if (
        startDateFinancialYear &&
        endDateFinancialYear &&
        enddate > endDateFinancialYear
      ) {
        newErrors.endDate = "End date is after the financial year end date.";
      }
    }

    if (formData.employeeId <= 0) {
      newErrors.employeeId = "Please select an employee.";
    }

    if (formData.applyLeaveDay > formData.balanceLeave) {
      newErrors.applyLeaveDay = "Applied leave cannot exceed balance leave.";
    }
    if (formData.leaveReason == "") {
      newErrors.leaveReason = "Please provide a reason";
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

  // const handleIsHalfDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {

  //   setFormData({
  //     ...formData,
  //     isHalfDay: event.target.checked,
  //      // Update isHalfDay with the checkbox value
  //   });
  // };

  const handleIsHalfDayChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isHalfDay = event.target.checked;
    setFormData({
      ...formData,
      isHalfDay: isHalfDay, // Update isHalfDay with the checkbox value
      endDate: isHalfDay ? formData.startDate : formData.endDate, // Update endDate based on isHalfDay
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
    const balanceLeave =
      employeeLeaves &&
      employeeLeaves.find((leave) => leave.leaveTypeId === leaveTypeId);
    const balance = balanceLeave ? balanceLeave.balanceLeaves : 0;
    return balance;
  };
  // const differenceChecker = () => {
  //   const date1 = new Date(formData.startDate);
  //   const date2 = new Date(formData.endDate);
  //   const differenceInMilliseconds = Math.abs(
  //     date2.getTime() - date1.getTime()
  //   );
  //   let differenceInDays = Math.ceil(
  //     differenceInMilliseconds / (1000 * 3600 * 24)
  //   );
  //   const startDate = date1.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  //   const endDate = date2.getDay();
  //   const weekends = Math.floor((differenceInDays + startDate) / 7) * 2;
  //   differenceInDays -= weekends;
  //   let finaldays = differenceInDays + 1;

  //   // if (differenceInDays ===0){
  //   //   finaldays = differenceInDays + 1;
  //   // }else{
  //   //   finaldays = differenceInDays ;
  //   // }
  //   if (startDate === 6) differenceInDays--;
  //   if (startDate === 0) differenceInDays--;
  //   if (endDate === 6) differenceInDays--;
  //   if (differenceInDays < 0) differenceInDays = 0;
  //   if (formData.startDate > formData.endDate) {
  //     return 0;
  //   } else {

  //     setdifference(finaldays);
  //     // setFormData((prevFormData: LeaveFormData) => ({
  //     //   ...prevFormData,
  //     //   difference: finaldays,
  //     // }));
  //     // console.log("diff: ", differenceInDays)
  //     console.log("Difference in days (excluding weekends):", finaldays);
  //   //  alert(finaldays);
  //     return finaldays;
  //   }
  // };

  const differenceChecker = () => {
    const date1 = dayjs(formData.startDate);
    const date2 = dayjs(formData.endDate);
    const differenceInDays = date2.diff(date1, "day") + 1; // Including both start and end days
    const startDate = date1.day(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const endDate = date2.day();

    // Calculate weekends between the dates
    const weekends = Math.floor((differenceInDays + startDate - 1) / 7) * 2;

    // Calculate the number of public holidays between the start and end dates
    const publicHolidaysBetween = Array.from(
      { length: differenceInDays },
      (_, index) => date1.add(index, "day")
    ).filter((date) => isPublicHoliday(date.toDate()));

    const publicHolidaysCount = publicHolidaysBetween.length;

    // Calculate final days excluding weekends and public holidays
    let finaldays = differenceInDays - weekends - publicHolidaysCount;

    // Adjust for specific start and end dates if necessary
    if (startDate === 0 || startDate === 6) finaldays--;
    if (endDate === 6) finaldays--;

    if (formData.startDate > formData.endDate || finaldays < 0) {
      return 0;
    } else {
      setdifference(finaldays);
      console.log(
        "Difference in days (excluding weekends and public holidays):",
        finaldays
      );
      return finaldays;
    }
  };

  const Test = () => {
    if (formData.leaveTypeId > 0) {
      let balanceLeave = GetBalanceLeaveByLeaveTypeId(
        //GetEmployeeLeave(),
        formData.leaveTypeId
      );
      console.log({ formData });
      console.log({ balanceLeave });

      if (formData.appliedLeaveTypeId > 0 && balanceLeave !== null) {
        balanceLeave = balanceLeave + previousApplyLeave;
      }

      //alert(balanceLeave);
      setFormData((prevFormData: LeaveFormData) => ({
        ...prevFormData,
        balanceLeave: balanceLeave,
      }));

      let applyLeave = 0;
      if (formData.isHalfDay) {
        applyLeave = 0.5;
      } else {
        applyLeave = differenceChecker();
        console.log({ applyLeave });
      }

      setFormData((prevFormData: LeaveFormData) => ({
        ...prevFormData,
        applyLeaveDay: applyLeave,
        remaingLeave: prevFormData.balanceLeave - applyLeave,
      }));
    } else {
      setFormData((prevFormData: LeaveFormData) => ({
        ...prevFormData,
        balanceLeave: 0,
        applyLeaveDay: 0,
        remaingLeave: 0,
      }));
    }

    // console.log({formData});
  };
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

      if (formData.appliedLeaveTypeId > 0) {
        const applyLeaveId = formData.appliedLeaveTypeId; // Replace with the actual apply leave ID
        const applyLeaveData = await GetApplyLeaveById(applyLeaveId);
        const applyLeaveTemp = applyLeaveData.data;

        setFormData((prevFormData: LeaveFormData) => ({
          ...prevFormData,
          appliedLeaveTypeId: applyLeaveTemp.appliedLeaveTypeId,
          leaveTypeId: applyLeaveTemp.leaveTypeId,
          leaveType: applyLeaveTemp.leaveType,
          startDate: applyLeaveTemp.startDate,
          endDate: applyLeaveTemp.endDate,
          leaveReason: applyLeaveTemp.leaveReason,
          applyLeaveDay: applyLeaveTemp.applyLeaveDay,
          leaveStatusId: applyLeaveTemp.leaveStatusId,
          employeeId: applyLeaveTemp.employeeId,
          isHalfDay: applyLeaveTemp.isHalfDay,
        }));
        setPreviousApplyLeave(applyLeaveTemp.applyLeaveDay);
        /*Tedst  asd*/
      }
    } catch (error) {
      console.error("Failed to fetch data: ", (error as Error).message);
    }
  };
  useEffect(() => {
    fetchData();
    FetchHolidayList();
    FetchFinancialYear();
    // isDateInList();
  }, []);

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
    previousApplyLeave,
    leaveTypes,
    publicHolidaysList,
    isPublicHoliday,
    startDateFinancialYear,
    endDateFinancialYear,
    // ValidateEmployeeById,
    handleIsHalfDayChange,
  };
};
export default LeaveApplyUtilities;
