import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Employee } from "../../Database/EmployeeServices";
import { LeaveType } from "../../Database/LeaveType";
import { AppliedLeave } from "../../Model/AppliedLeaveModel";
import { LeaveStatus } from "../../Model/LeaveStatus";
import { DecryptEmployeeID } from "../../Services/EncryptEmplyeeID";
import useCustomSnackbar from "../../Components/CustomComponent/useCustomSnackbar";
import { getDecryptedValueFromStorage } from "../LocalStorageEncryptionUtilities";
import { AppliedLeaveUpdateStatusAsync, GetAppliedLeavesByReportingPersonIdAsync, UpdateIsApprovedAsync } from "../../Services/EmployeeLeaveApplyServices";
import { GetEmployeesAsync } from "../../Services/EmployeeServices";
import { getLeaveStatus, getLeaveTypes } from "../../Services/LeaveType";
import { GetActiveLeaveAllocationAsync } from "../../Services/LeaveAllocation";
import Select, { SelectChangeEvent } from "@mui/material/Select";





export const EmployeeAppliedLeaveUtilities = () => {
    const employeeId = DecryptEmployeeID();

    const [data, setData] = useState<AppliedLeave[]>([]); // Specify the type for data
    const [employee, setEmployee] = useState<Employee[]>([]);
    const navigate = useNavigate();
    const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
    const [leaveStatus, setLeaveStatus] = useState<LeaveStatus[]>([]);
    const [selectedLeaveStatusId, setSelectedLeaveStatusId] = useState<number>(0);
    const [ leaveAllocation, setLeaveAllocation] = useState<number>(0);
    const snackbar = useCustomSnackbar();
  
  
    const handleEdit = (appliedLeaveTypeId: number | undefined) => {
      const editUrl = appliedLeaveTypeId
        ? `/leave/${appliedLeaveTypeId}`
        : "/leave";
      navigate(editUrl);
    };
  
    const handleDelete = (appliedLeaveTypeId: number | undefined) => {
      alert(appliedLeaveTypeId);
    };
  
    const handleUpdate = (appliedLeaveTypeId: number | undefined) => {
      console.log(
        "applied id = ",
        appliedLeaveTypeId,
        "value",
        selectedLeaveStatusId
      );
    };
    const handleSelectStatusChange = (
      event: SelectChangeEvent<number>,
      appliedLeaveTypeId: number | undefined
    ) => {
      const value =
        typeof event.target.value === "string"
          ? parseInt(event.target.value, 10)
          : event.target.value;
  
      setData((prevData) =>
        prevData.map((row) => {
          if (row.appliedLeaveTypeId === appliedLeaveTypeId) {
            return { ...row, leaveStatusId: value };
          }
          return row;
        })
      );
  
      // Update selectedLeaveStatusId
      setSelectedLeaveStatusId(value);
    };
    const FetchList = async () => {
        try {
          const roleAssignId = getDecryptedValueFromStorage("roleAssignId", 0);
          const employeeId = getDecryptedValueFromStorage("employeeID", 0);
    
          //alert(employeeId);
    
          const fetchData = await GetAppliedLeavesByReportingPersonIdAsync(
            employeeId
          );
          const fetched = fetchData.data;
          const fetchemployee = await GetEmployeesAsync();
    
          if (Array.isArray(fetched)) {
            setData(fetched);
          } else {
            console.error("Invalid leave types data.");
          }
        } catch (error) {
          console.error("Error fetching leave types:", (error as Error).message);
        }
      };
    
      const fetchLeaveTypes = async () => {
        try {
          const fetchedLeaveTypes = await getLeaveTypes();
          const leaveTypesData = fetchedLeaveTypes.data;
          if (Array.isArray(leaveTypesData)) {
            setLeaveTypes(leaveTypesData);
          } else {
            console.error("Invalid leave types data.");
          }
        } catch (error) {
          console.error("Error fetching leave types:", (error as Error).message);
        }
      };
    
      function formatDate(date: Date) {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
        const year = date.getFullYear();
    
        return `${day}/${month}/${year}`;
      }
    
      const fetchData = async () => {
        try {
          const [LeaveStatus] = await Promise.all([getLeaveStatus()]);
          const leavestatuss = LeaveStatus.data;
    
          const [leaveAllocate] = await Promise.all([GetActiveLeaveAllocationAsync()])
          const leaveallocate = leaveAllocate.data.leaveAllocationId;
          setLeaveStatus(leavestatuss);
          setLeaveAllocation(leaveallocate);
          
        } catch (error) {
          console.error("Failed to fetch data: ", (error as Error).message);
        }
      };
    
      const onLeaveApprove = async (appliedLeaveTypeId: number, statusCode : string) => {
        const isApproved = true;
        const data = await UpdateIsApprovedAsync(appliedLeaveTypeId, isApproved);
    
        fetchData();
      };
      const onLeaveCancel = (appliedLeaveTypeId: number) => {};
      // const onLeaveReject = async (appliedLeaveTypeId: number, statusCode : string) => {
      //   const isApproved = true;
      //   const data = await UpdateIsRejectedAsync(appliedLeaveTypeId, isApproved);
      //   fetchData();
      // };
      
      //const onLeaveEdit = (appliedLeaveTypeId: number) => {};
      //const onLeaveDelete = (appliedLeaveTypeId: number) => {};
    
      //const onLeaveEdit = (appliedLeaveTypeId: number) => {};
      //const onLeaveApprove = (appliedLeaveTypeId: number) => {};
    
    
      const onLeaveStatusUpdate = async (appliedLeaveTypeId: number, statusCode: string) => {
        const data = await AppliedLeaveUpdateStatusAsync({
          appliedLeaveTypeId: appliedLeaveTypeId,
          leaveAllocationId : leaveAllocation,
          statusCode: statusCode,
        });
        snackbar.showSnackbar(
          data.message,
          "success",
          { vertical: "top", horizontal: "center" },
          5000
        );
        FetchList();
      };




    return {
        FetchList,
        fetchLeaveTypes,
        fetchData,
        onLeaveStatusUpdate,
        data,
        formatDate,
        snackbar,
        
      };
}
