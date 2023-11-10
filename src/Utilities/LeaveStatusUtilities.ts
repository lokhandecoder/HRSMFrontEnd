import React, { useState, useEffect } from "react";
import { DecryptEmployeeID } from "../Services/EncryptEmplyeeID";
import { StatusTableRow } from "../Model/StatusTableRow";
import { Employee } from "../Database/EmployeeServices";
import { useNavigate } from "react-router";
import { LeaveType } from "../Database/LeaveType";
import { LeaveStatus } from "../Model/LeaveStatus";
import {
  GetAppliedLeavesByEmpIdAsync,
  UpdateIsApprovedAsync,
  UpdateIsRejectedAsync,
} from "../Services/EmployeeLeaveApplyServices";
import { GetEmployeesAsync } from "../Services/EmployeeServices";
import { getLeaveTypes } from "../Services/LeaveType";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export const LeaveStatusUtilities = () => {
  const employeeId = DecryptEmployeeID();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // You can set your desired number of rows per page here.

  const [data, setData] = useState<StatusTableRow[]>([]); // Specify the type for data
  //   const [employee, setEmployee] = useState<Employee[]>([]);
  const navigate = useNavigate();
  //   const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  //   const [leaveStatus, setLeaveStatus] = useState<LeaveStatus[]>([]);
  //   const [selectedLeaveStatusId, setSelectedLeaveStatusId] = useState<number>(0);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const displayedData = data.slice(startIndex, endIndex);

  const handleEdit = (appliedLeaveTypeId: number | undefined) => {
    const editUrl = appliedLeaveTypeId
      ? `/leave/${appliedLeaveTypeId}`
      : "/leave";
    navigate(editUrl);
  };
  //   const handleUpdate = (appliedLeaveTypeId: number | undefined) => {
  //     console.log(
  //       "applied id = ",
  //       appliedLeaveTypeId,
  //       "value",
  //       selectedLeaveStatusId
  //     );
  //   };
  //   const handleSelectStatusChange = (
  //     event: SelectChangeEvent<number>,
  //     appliedLeaveTypeId: number | undefined
  //   ) => {
  //     const value =
  //       typeof event.target.value === "string"
  //         ? parseInt(event.target.value, 10)
  //         : event.target.value;

  //     setData((prevData) =>
  //       prevData.map((row) => {
  //         if (row.appliedLeaveTypeId === appliedLeaveTypeId) {
  //           return { ...row, leaveStatusId: value };
  //         }
  //         return row;
  //       })
  //     );

  //     // Update selectedLeaveStatusId
  //     setSelectedLeaveStatusId(value);
  //   };
  useEffect(() => {
    const FetchList = async () => {
      try {
        const fetchData = await GetAppliedLeavesByEmpIdAsync();
        const fetched = fetchData.data;
        // const fetchemployee = await GetEmployeesAsync();

        if (Array.isArray(fetched)) {
          setData(fetched);
        } else {
          console.error("Invalid leave types data.");
        }
      } catch (error) {
        console.error("Error fetching leave types:", (error as Error).message);
      }
    };

    // const fetchLeaveTypes = async () => {
    //   try {
    //     const fetchedLeaveTypes = await getLeaveTypes();
    //     const leaveTypesData = fetchedLeaveTypes.data;
    //     if (Array.isArray(leaveTypesData)) {
    //       setLeaveTypes(leaveTypesData);
    //     } else {
    //       console.error("Invalid leave types data.");
    //     }
    //   } catch (error) {
    //     console.error("Error fetching leave types:", (error as Error).message);
    //   }
    // };
    FetchList();
    // fetchLeaveTypes();
  }, []);
  function formatDate(date: Date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  // const fetchData = async () => {
  //   try {
  //     const [LeaveStatus] = await Promise.all([getLeaveStatus()]);
  //     const leavestatuss = LeaveStatus.data;
  //     setLeaveStatus(leavestatuss);
  //   } catch (error) {
  //     console.error("Failed to fetch data: ", (error as Error).message);
  //   }
  // };

  const onLeaveApprove = async (appliedLeaveTypeId: number) => {
    const isApproved = true;
    const data = await UpdateIsApprovedAsync(appliedLeaveTypeId, isApproved);

    // fetchData();
  };
  const onLeaveCancel = (appliedLeaveTypeId: number) => {};
  const onLeaveReject = async (appliedLeaveTypeId: number) => {
    const isApproved = true;
    const data = await UpdateIsRejectedAsync(appliedLeaveTypeId, isApproved);
    // fetchData();
  };
  const onLeaveEdit = (appliedLeaveTypeId: number) => {};
  const onLeaveDelete = (appliedLeaveTypeId: number) => {};

  return {
    displayedData,
    employeeId,
    formatDate,
    handleEdit,
    onLeaveApprove,
    onLeaveReject,
    data,
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
  };
};
