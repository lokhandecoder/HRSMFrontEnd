import useCustomSnackbar from "../Components/CustomComponent/useCustomSnackbar";
import React, { useEffect, useState } from "react";
import { EmployeeModel } from "../Model/EmployeeModel";
import { LeaveStatus } from "../Model/LeaveStatus";
import { GetEmployeesAsync } from "../Services/EmployeeServices";
import { getLeaveStatus } from "../Services/LeaveType";
import dayjs, { Dayjs } from "dayjs";
import { API_URL } from "../APIConfig";
import * as XLSX from "xlsx"; // Import xlsx library
import axios from "axios";
import { GetLeavesReportAsync } from "../Services/LeaveReportServices";
import { EmployeeReportRequest } from "../Model/EmployeeReportRequest";
import { EmployeeLeavesReportResponse } from "../Model/EmployeeLeavesReportResponse";



export const LeaveSearchUtlilities = () => {
    const snackbar = useCustomSnackbar();
    const [loading, setLoading] = useState(false);
    const [employeeNames, setEmployeeNames] = useState<EmployeeModel[]>([]);
    const [leaveStatuses, setLeaveStatuses] = useState<LeaveStatus[]>([]);
    
    const [responseList, setresponseList] = useState<any[]>([]); // Change 'any[]' to the appropriate type if possible
   
    const today = dayjs();
    const todayDate = today.toDate();

    const initialFormData: EmployeeReportRequest = {
        leaveStatusId: 0,
        employeeId: 0, // Initial employeeId value
        startDate: todayDate,
        endDate: todayDate
        // Initialize other properties as needed
    };
    const [formData, setFormData] = useState<EmployeeReportRequest>(initialFormData);

    const [employeeLeaveReport, setEmployeeLeaveReport] = useState<EmployeeLeavesReportResponse[]>([]);

    const isWeekend = (date: Dayjs) => {
      const day = date.day();
      return day === 0 || day === 6;
    };
  
    useEffect(() => {
      // Fetch employee names and leave statuses from API
      const fetchEmployeeData = async () => {
        try {
          // Replace 'fetchEmployees' and 'fetchLeaveStatuses' with your actual API calls
          const employeesResponse = await GetEmployeesAsync();
          const [LeaveStatus] = await Promise.all([getLeaveStatus()]);
  
          // Assuming API response contains 'employees' and 'leaveStatuses' arrays
          setEmployeeNames(employeesResponse.data);
          console.log("Employees", employeesResponse.data);
          setLeaveStatuses(LeaveStatus.data);
          console.log("Leave status", LeaveStatus.data);
        } catch (error) {
          // Handle errors
          console.error("Error fetching data:", error);
          // Show error in Snackbar
        }
      };
  
      fetchEmployeeData();
    }, []);
    const handleChange = (field: string, value: any) => { // Ensure handleChange accepts Dayjs
        setFormData({
          ...formData,
          [field]: value,
        });
      };
      const handleEmployeeLeaveReportSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
       // setLoading(true);
      
        try {
       
          console.log("format aobject ",formData)
         
          const employeLeaveResponse = await GetLeavesReportAsync(formData);
          const employeeLeaveReportData = employeLeaveResponse.data;
          setEmployeeLeaveReport(employeeLeaveReportData);

         // setLoading(false);
       
        } catch (error) {
          //setLoading(false);
          console.error("Error submitting form:", error);
       
        }
      };

      function formatDate(date: Date) {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
        const year = date.getFullYear();
    
        return `${day}/${month}/${year}`;
      }
       // Function to handle export to Excel
  const handleExportToExcel = () => {
    if (employeeLeaveReport && employeeLeaveReport.length > 0) {
      const columnsToExport: string[] = [
        "firstName",
        "lastName",
        "leaveTypeName",
        "startDate",
        "endDate",
        "leaveReason",
        "applyLeaveDay",
        "leaveStatusName",
      ];
  
      const dataToExport = employeeLeaveReport.map((record) => {
        const filteredRecord: any = {};
        columnsToExport.forEach((column) => {
          if (record.hasOwnProperty(column)) {
            filteredRecord[column] = (record as any)[column];
          }
        });
        return filteredRecord;
      });
  
      // Convert data to XLSX format
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  
      // Create a workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Employee_Leaves_Report");
  
      // Save the workbook as an Excel file
      XLSX.writeFile(workbook, "employee_leaves_report.xlsx");
    }
  };

      

  // return {
  //   handleSubmit,
  //   isWeekend,
  //   formData,
  //   handleChange,
  //   employeeNames,
  //   leaveStatuses,
  //   loading,
  //   snackbar,
  //   employeeLeaveReport,
  //   formatDate,
  //   setresponseList,



  // };

  return {handleEmployeeLeaveReportSearch, employeeLeaveReport, employeeNames, leaveStatuses,handleChange,formData, handleExportToExcel}

};
