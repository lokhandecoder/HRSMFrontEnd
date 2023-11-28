import React, { useEffect, useState } from "react";
import axios from "axios";
import { LeaveType } from "../Database/LeaveType";
import { EmployeeLeave } from "../Model/EmployeeLeave";
import { getLeaveTypes } from "../Services/LeaveType";
import useCustomSnackbar from "../Components/CustomComponent/useCustomSnackbar";
import dayjs, { Dayjs } from "dayjs";
import { GetEmployeeLeaveByEmployeeId } from "../Services/EmployeeLeaveServices";
import { API_URL, TokenByLocalStorage } from "../APIConfig";
import { GetActiveFinancialYearsAsync } from "../Services/FinancialyearServices";
import { FinancialYearModel } from "../Model/FinancialYearModel";
// import { GetActiveFinancialYearsAsync } from "../Services/FinancialyearServices";
// import { FinancialYearModel } from "../Model/FinancialYearModel";

export const AccountingYearUtilities = () => {
  const snackbar = useCustomSnackbar();
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [loading, setLoading] = useState(false);
  const [employeeLeaves, setemployeeLeaves] = useState<EmployeeLeave[]>([]);
  const [startDateFinancialYear, setStartDateFinancialYear] =
    useState<Date | null>(null);
  const [endDateFinancialYear, setEndDateFinancialYear] = useState<Date | null>(
    null
  );
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
        setStartDateFinancialYear(formattedDates[0].startDate);
        setEndDateFinancialYear(formattedDates[0].endDate);
      } else {
        console.error("Invalid financial year data.");
      }
    } catch (error) {
      console.error("Error fetching financial year:", (error as Error).message);
    }
  };
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
    const numericValue =
      typeof fieldName === "number" ? parseInt(newValue, 10) : newValue;

    setFormData((prevFormData) => ({
      ...prevFormData,
      leaveTypeCounts: {
        ...prevFormData.leaveTypeCounts,
        [fieldName]: numericValue,
      },
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();
    console.log("Form submitted with data:", formData);

    axios
      .post(
        `${API_URL}FinancialYearSetup/CreateLeaveAllocationForAllLeaveTypes`,
        formData,{
          headers: {
            Authorization: `Bearer ${TokenByLocalStorage}`,
          },
        }
      )
      .then((res) => {
        console.log("API Response:", res);

        if (res.status === 200) {
          if (res.data && res.data.status === 500) {
            const errorMessage =
              res.data.message || "Failed to Set Accounting Year";

            snackbar.showSnackbar(
              errorMessage,
              "error",
              { vertical: "top", horizontal: "center" },
              5000
            );
            setLoading(false);
          }
          if (res.data && res.data.status === 200) {
            const errorMessage = res.data.message || "All Set Accounting Year";

            snackbar.showSnackbar(
              errorMessage,
              "success",
              { vertical: "top", horizontal: "center" },
              5000
            );
            setLoading(false);
          }

          // Check if the response indicates an error
        } else {
          // Assume success
          snackbar.showSnackbar(
            "New Accounting Year has been Set Successfully",
            "success",
            { vertical: "top", horizontal: "center" },
            5000
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);

        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Failed to Set Accounting Year";

        snackbar.showSnackbar(
          errorMessage,
          "error",
          { vertical: "top", horizontal: "center" },
          5000
        );
        setLoading(false);
      });
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
    } catch (error) {
      console.error("Failed to fetch data: ", (error as Error).message);
    }
  };
  useEffect(() => {
    fetchData();
    FetchFinancialYear();
  }, []);

  return {
    leaveTypes,
    employeeLeaves,
    formData,
    handleChange,
    isWeekend,
    handleTextFieldChange,
    handleSubmit,
    loading,
    snackbar,
    startDateFinancialYear,
    endDateFinancialYear,

  };
};
