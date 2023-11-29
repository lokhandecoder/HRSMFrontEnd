import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { LeaveType } from "../../Database/LeaveType";
import { useNavigate } from "react-router-dom";
import { getLeaveStatus, getLeaveTypes } from "../../Services/LeaveType";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { LeaveStatus } from "../../Model/LeaveStatus";
import ClearIcon from "@mui/icons-material/Clear";

import {
  AppliedLeaveUpdateStatusAsync,
  DeleteAppliedLeaveByIdAsync,
  GetAppliedLeavesByEmpIdAsync,
  UpdateIsApprovedAsync,
  UpdateIsRejectedAsync,
} from "../../Services/EmployeeLeaveApplyServices";
import { IconButton, Stack, Tooltip } from "@mui/material";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
//import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
//import UnpublishedOutlinedIcon from "@mui/icons-material/UnpublishedOutlined";

import {
  CancelPresentationOutlined,
  DeleteForeverOutlined,
  EditAttributesOutlined,
  ThumbDownOffAlt,
  Unpublished,
} from "@mui/icons-material";
import { GetEmployeesAsync } from "../../Services/EmployeeServices";
import { Employee } from "../../Database/EmployeeServices";
import { DecryptEmployeeID } from "../../Services/EncryptEmplyeeID";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import {
  getDecryptedValueFromStorage,
  setEncryptedValueInStorage,
} from "../../Utilities/LocalStorageEncryptionUtilities";
import { AppliedLeave } from "../../Model/AppliedLeaveModel";
import TablePagination from "@mui/material/TablePagination";
import ConfirmationDialog from "../ConfirmationDialog";
import { GetActiveLeaveAllocationAsync } from "../../Services/LeaveAllocation";
import ConfirmationDialogWithComment from "../ConfrimationDialogWithComment";
function StatusTable() {
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
    //alert(appliedLeaveTypeId);
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
    setOpenConfirmation(false);

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
    setOpenConfirmation(true);
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
  function renderIconButton(statusCode: string, appliedLeaveTypeId: number) {
    switch (statusCode) {
      case "APP":
        return (
          <Stack direction="row">
            <Tooltip title="Edit">
              <IconButton
                aria-label="Edit"
                onClick={() => handleEdit(appliedLeaveTypeId || 0)}
              >
                <EditNoteOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                aria-label="Delete"
                onClick={() => handleDelete(appliedLeaveTypeId || 0)}
              >
                <DeleteForeverOutlined />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      case "APR":
        return (
          <Stack direction="row">
            <Tooltip title="Cancel">
              <IconButton
                aria-label="Cancel"
                onClick={() =>
                  onLeaveStatusUpdate(appliedLeaveTypeId || 0, "CAR")
                }
              >
                <CancelOutlinedIcon color="warning" />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      case "CAR":
        return (
          // <IconButton color="primary">
          //   <IconButton aria-label="Approve">
          //     <Unpublished />
          //   </IconButton>
          // </IconButton>
          <></>
        );
      case "REC":
        return (
          // <IconButton color="primary">
          //   <IconButton aria-label="Approve">
          //     <EditAttributesOutlined />
          //   </IconButton>
          // </IconButton>
          <></>
        );
      case "APC":
        return (
          // <IconButton color="primary">
          //   <IconButton aria-label="Approve">
          //     <EditAttributesOutlined />
          //   </IconButton>
          // </IconButton>
          <></>
        );
      case "REJ":
        return (
          // <IconButton color="primary">
          //   <IconButton aria-label="Approve">
          //     <EditAttributesOutlined />
          //   </IconButton>
          // </IconButton>
          <></>
        );
      default:
        return (
          <IconButton color="primary">
            <IconButton aria-label="Approve">
              <Unpublished />
            </IconButton>
          </IconButton>
        );
    }
  }
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Reason for Leave</TableCell>
              {/* <TableCell>Balance Leaves</TableCell> */}
              <TableCell>Applied Days</TableCell>
              {/* <TableCell>Remaining Leaves</TableCell> */}

              <TableCell>Status </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData && displayedData !== null
              ? displayedData.map((row: AppliedLeave, key) => {
                  // Check if the employeeId from the logged-in user matches the employeeId from appliedLeave
                  //const isCurrentUserLeave = row.employeeId.toString() === employeeId;

                  return (
                    <TableRow key={key}>
                      <TableCell>
                        {row.firstName} {row.lastName}
                      </TableCell>
                      <TableCell>{row.leaveTypeName}</TableCell>
                      <TableCell>
                        {row.startDate
                          ? formatDate(new Date(row.startDate))
                          : "No date available"}
                      </TableCell>
                      <TableCell>
                        {row.endDate
                          ? formatDate(new Date(row.endDate))
                          : "No date available"}
                      </TableCell>
                      <TableCell>{row.leaveReason}</TableCell>
                      {/* <TableCell>{row.balanceLeave}</TableCell> */}
                      <TableCell>{row.applyLeaveDay}</TableCell>
                      {/* <TableCell>{row.remaingLeave}</TableCell> */}

                      <TableCell>{row.leaveStatusName}</TableCell>

                      <TableCell>
                        {renderIconButton(
                          row.leaveStatusCode,
                          row.appliedLeaveTypeId || 0
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              : "No data available"}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]} // Define available rows per page options
          component="div"
          count={data.length} // Pass the total number of rows
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <ConfirmationDialog
        isOpen={openConfirmation}
        handleClose={handleConfirmationClose}
        message="Are you sure you want to delete this leave"
      />
      <ConfirmationDialogWithComment
        isOpen={openConfirmation}
        handleClose={handleConfirmationClose2}
        message=" "
      />
    </>
  );
}
/*UnpublishedOutlinedIcon*/
export default StatusTable;
