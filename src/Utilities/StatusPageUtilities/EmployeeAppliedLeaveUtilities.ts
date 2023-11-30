import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Employee } from "../../Database/EmployeeServices";
import { AppliedLeave } from "../../Model/AppliedLeaveModel";
import { DecryptEmployeeID } from "../../Services/EncryptEmplyeeID";
import { LeaveType } from "../../Database/LeaveType";
import { LeaveStatus } from "../../Model/LeaveStatus";
import useCustomSnackbar from "../../Components/CustomComponent/useCustomSnackbar";
import { getDecryptedValueFromStorage } from "../LocalStorageEncryptionUtilities";
import {
  AppliedLeaveUpdateStatusAsync,
  GetAppliedLeavesByReportingPersonIdAsync,
  UpdateIsApprovedAsync,
} from "../../Services/EmployeeLeaveApplyServices";
import { GetEmployeesAsync } from "../../Services/EmployeeServices";
import { getLeaveStatus, getLeaveTypes } from "../../Services/LeaveType";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CreateAppliedLeaveComment } from "../../Services/LeaveReportServices";

export const EmployeeAppliedLeaveUtilities = () => {
  const employeeId = DecryptEmployeeID();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AppliedLeave[]>([]); // Specify the type for data
  const [employee, setEmployee] = useState<Employee[]>([]);
  const navigate = useNavigate();
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [leaveStatus, setLeaveStatus] = useState<LeaveStatus[]>([]);
  const [selectedLeaveStatusId, setSelectedLeaveStatusId] = useState<number>(0);
  const [leaveAllocation, setLeaveAllocation] = useState<number>(0);
  const snackbar = useCustomSnackbar();
  const [page, setPage] = useState(0);
  const [openConfirmation, setOpenConfirmation] =
    React.useState<boolean>(false);
  const [openConfirmationSure, setOpenConfirmationSure] =
    React.useState<boolean>(false);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Define the number of rows per page
  const [comment, setComment] = React.useState("");

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

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
  // console.log("table data", data);
  useEffect(() => {
    FetchList();
    fetchLeaveTypes();
  }, []);

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

      // const [leaveAllocate] = await Promise.all([GetActiveLeaveAllocationAsync()])
      // const leaveallocate = leaveAllocate.data.leaveAllocationId;
      setLeaveStatus(leavestatuss);
      //setLeaveAllocation(leaveallocate);
    } catch (error) {
      console.error("Failed to fetch data: ", (error as Error).message);
    }
  };

  const onLeaveApprove = async (
    appliedLeaveTypeId: number,
    statusCode: string
  ) => {
    const isApproved = true;
    const data = await UpdateIsApprovedAsync(appliedLeaveTypeId, isApproved);

    fetchData();
  };
  const onLeaveCancel = (appliedLeaveTypeId: number) => {};

  const [currentAppliedLeaveTypeId, setCurrentAppliedLeaveTypeId] = useState(0);
  const [currentemployeeId, setcurrentemployeeId] = useState(0);
  const [currentleaveStatusId, setcurrentleaveStatusId] = useState(0);

  const [currentAppliedLeaveStatusCode, setCurrentAppliedLeaveStatusCode] =
    useState("APP");
  const handleConfirmationClose = async (value: string) => {
    setOpenConfirmation(false);

    if (value == "yes") {
      setLoading(true);
      const data = await AppliedLeaveUpdateStatusAsync({
        appliedLeaveTypeId: currentAppliedLeaveTypeId,
        leaveAllocationId: leaveAllocation,
        statusCode: currentAppliedLeaveStatusCode,
        commentByUser: comment,
        date: new Date(),      
      });
      // const rawdata = {
      //   appliedLeaveTypeId: currentAppliedLeaveTypeId,
      //   LeaveStatusId: currentleaveStatusId,
      //   comment: comment,
      //   employeeId: currentemployeeId,
      //   date: new Date(), 
      // }
      // console.log("rawdata", rawdata);
      // const commentMessage = await CreateAppliedLeaveComment({
      //   appliedLeaveTypeId: currentAppliedLeaveTypeId,
      //   LeaveStatusId: currentleaveStatusId,
      //   comment: comment,
      //   employeeId: currentemployeeId,
      //   date: new Date(), // Add the date property here with an appropriate date value
      // });
      // console.log("Data submiteed", commentMessage);
      snackbar.showSnackbar(
        data.message,
        "success",
        { vertical: "top", horizontal: "center" },
        5000
      );
      setLoading(false)
      FetchList();
      
    }
  };
  const onLeaveStatusUpdate = async (
    appliedLeaveTypeId: number,
    statusCode: string,
    employeeId: number,
    leaveStatusId: number,
  ) => {
    // alert("Hey Amit");
    setOpenConfirmation(true);

    // const data = await AppliedLeaveUpdateStatusAsync({
    //   appliedLeaveTypeId: appliedLeaveTypeId,
    //   leaveAllocationId: leaveAllocation,
    //   statusCode: statusCode,
    // });
    // snackbar.showSnackbar(
    //   data.message,
    //   "success",
    //   { vertical: "top", horizontal: "center" },
    //   5000
    // );
    setcurrentleaveStatusId(leaveStatusId);
    setcurrentemployeeId(employeeId);
    setCurrentAppliedLeaveTypeId(appliedLeaveTypeId);
    setCurrentAppliedLeaveStatusCode(statusCode);

    FetchList();
  };
  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
  }, []);

  return {
    onLeaveStatusUpdate,
    displayedData,
    formatDate,
    snackbar,
    data,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    openConfirmation,
    handleConfirmationClose,
    comment,
    handleCommentChange,
    loading,
  };
};
