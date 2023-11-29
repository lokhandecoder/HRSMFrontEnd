import React, { useState, useEffect } from "react";
import { DecryptEmployeeID } from "../../Services/EncryptEmplyeeID";
import { AppliedLeave } from "../../Model/AppliedLeaveModel";
import { Employee } from "../../Database/EmployeeServices";
import { useNavigate } from "react-router-dom";
import { LeaveType } from "../../Database/LeaveType";
import { LeaveStatus } from "../../Model/LeaveStatus";
import { AppliedLeaveUpdateStatusAsync, DeleteAppliedLeaveByIdAsync, GetAppliedLeavesByEmpIdAsync, UpdateIsApprovedAsync, UpdateIsRejectedAsync } from "../../Services/EmployeeLeaveApplyServices";
import { GetEmployeesAsync } from "../../Services/EmployeeServices";
import { getLeaveStatus, getLeaveTypes } from "../../Services/LeaveType";
import Select, { SelectChangeEvent } from "@mui/material/Select";




export const StatusTableUtilitites = () => {
    const employeeId = DecryptEmployeeID();

    const [data, setData] = useState<AppliedLeave[]>([]); // Specify the type for data
    const [employee, setEmployee] = useState<Employee[]>([]);
    const navigate = useNavigate();
    const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
    const [leaveStatus, setLeaveStatus] = useState<LeaveStatus[]>([]);
    const [selectedLeaveStatusId, setSelectedLeaveStatusId] = useState<number>(0);
    const [leaveAllocation, setLeaveAllocation] = useState<number>(0);
    const [openConfirmation, setOpenConfirmation] =
      React.useState<boolean>(false);
      const [openConfirmation2, setOpenConfirmation2] =
      React.useState<boolean>(false);
  
    const [selectedAppliedLeaveTypeId, setSelectedAppliedLeaveTypeId] =
      useState<number>(0);
  
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Define the number of rows per page
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0); // Reset to the first page when changing rows per page
    };
  
    const lastIndex = (page + 1) * rowsPerPage;
    const firstIndex = lastIndex - rowsPerPage;
  
    const displayedData = data.slice(firstIndex, lastIndex);
    const handleEdit = (appliedLeaveTypeId: number | undefined) => {
      const editUrl = appliedLeaveTypeId
        ? `/leave/${appliedLeaveTypeId}`
        : "/leave";
      navigate(editUrl);
    };
  
    const handleDelete = (appliedLeaveTypeId: number | undefined) => {
      // alert(appliedLeaveTypeId);
      setSelectedAppliedLeaveTypeId(appliedLeaveTypeId || 0);
      //alert("dsa");
      setOpenConfirmation(true);
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
    const handleConfirmationClose = async (value: string) => {
      setOpenConfirmation(false);
  
      if (value == "yes") {
        var response = await DeleteAppliedLeaveByIdAsync(
          selectedAppliedLeaveTypeId
        );
        FetchList();
      }
    };
    
    // console.log("table data", data);
    useEffect(() => {
      FetchList();
      fetchLeaveTypes();
    }, []);
  
    const FetchList = async () => {
      try {
        const fetchData = await GetAppliedLeavesByEmpIdAsync();
        const fetched = fetchData.data;
        const fetchemployee = await GetEmployeesAsync();
        //const [leaveAllocate] = await Promise.all([GetActiveLeaveAllocationAsync()])
        //  const leaveallocate = leaveAllocate.data.leaveAllocationId;
        // setLeaveAllocation(leaveallocate);
  
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
        setLeaveStatus(leavestatuss);
      } catch (error) {
        console.error("Failed to fetch data: ", (error as Error).message);
      }
    };
  
    const onLeaveApprove = async (appliedLeaveTypeId: number) => {
      const isApproved = true;
      const data = await UpdateIsApprovedAsync(appliedLeaveTypeId, isApproved);
  
      fetchData();
    };
    const onLeaveCancel = (appliedLeaveTypeId: number) => {};
    const onLeaveReject = async (appliedLeaveTypeId: number) => {
      const isApproved = true;
      const data = await UpdateIsRejectedAsync(appliedLeaveTypeId, isApproved);
      fetchData();
    };
    const onLeaveEdit = (appliedLeaveTypeId: number) => {};
    const onLeaveDelete = (appliedLeaveTypeId: number) => {};
  
  
    const [currentAppliedLeaveTypeId, setCurrentAppliedLeaveTypeId] = useState(0);
    const [currentAppliedLeaveStatusCode, setCurrentAppliedLeaveStatusCode] =
      useState("APP");
    const handleConfirmationClose2 = async (value: string) => {
      setOpenConfirmation2(false);
  
      if (value == "yes") {
        const data = await AppliedLeaveUpdateStatusAsync({
          appliedLeaveTypeId: currentAppliedLeaveTypeId,
          leaveAllocationId: leaveAllocation,
          statusCode: currentAppliedLeaveStatusCode,
        });
        // snackbar.showSnackbar(
        //   data.message,
        //   "success",
        //   { vertical: "top", horizontal: "center" },
        //   5000
        // );
        FetchList();
      }
    };
  
    const onLeaveStatusUpdate = async (
      appliedLeaveTypeId: number,
      statusCode: string
    ) => {
      setOpenConfirmation2(true);
      setCurrentAppliedLeaveTypeId(appliedLeaveTypeId);
      setCurrentAppliedLeaveStatusCode(statusCode);
      // const data = await AppliedLeaveUpdateStatusAsync({
      //   appliedLeaveTypeId: appliedLeaveTypeId,
      //   leaveAllocationId: leaveAllocation,
      //   statusCode: statusCode,
      // });
  
      FetchList();
    };
  
    useEffect(() => {
      fetchData(); // Call fetchData when the component mounts
    }, []);

    return {
        handleEdit,
        handleDelete,
        onLeaveStatusUpdate,
        displayedData,
        formatDate,
        data,
        rowsPerPage,
        page,
        handleChangePage,
        handleChangeRowsPerPage,
        openConfirmation,
        handleConfirmationClose,
        openConfirmation2,
        handleConfirmationClose2,
        
      };

}