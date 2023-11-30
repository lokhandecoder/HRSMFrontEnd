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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ClearIcon from "@mui/icons-material/Clear";
import TablePagination from "@mui/material/TablePagination";
import ConfirmationDialog from "../ConfirmationDialog";

import {
  AppliedLeaveUpdateStatusAsync,
  GetAppliedLeavesByEmpIdAsync,
  GetAppliedLeavesByReportingPersonIdAsync,
  UpdateIsApprovedAsync,
  UpdateIsRejectedAsync,
} from "../../Services/EmployeeLeaveApplyServices";
import { IconButton, Stack, Tooltip } from "@mui/material";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
//import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
//import UnpublishedOutlinedIcon from "@mui/icons-material/UnpublishedOutlined";

import {
  DeleteForeverOutlined,
  EditAttributesOutlined,
  ThumbDownOffAlt,
  Unpublished,
} from "@mui/icons-material";
import { GetEmployeesAsync } from "../../Services/EmployeeServices";
import { Employee } from "../../Database/EmployeeServices";
import { DecryptEmployeeID } from "../../Services/EncryptEmplyeeID";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { AppliedLeave } from "../../Model/AppliedLeaveModel";
import { getDecryptedValueFromStorage } from "../../Utilities/LocalStorageEncryptionUtilities";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import { GetActiveLeaveAllocationAsync } from "../../Services/LeaveAllocation";
import useCustomSnackbar from "../CustomComponent/useCustomSnackbar";
import ConfrimationDialogWithComment from "../ConfrimationDialogWithComment";
import { EmployeeAppliedLeaveUtilities } from "../../Utilities/StatusPageUtilities/EmployeeAppliedLeaveUtilities";
import Loader from "../Fixed/Loader";
import Dialog from '@mui/material/Dialog';
import CircularProgress from '@mui/material/CircularProgress';



function EmployeeAppliedLeave() {
  const appliedleaveutility = EmployeeAppliedLeaveUtilities();

  const {
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
  } = appliedleaveutility;

  // const employeeId = DecryptEmployeeID();

  // const [data, setData] = useState<AppliedLeave[]>([]); // Specify the type for data
  // const [employee, setEmployee] = useState<Employee[]>([]);
  // const navigate = useNavigate();
  // const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  // const [leaveStatus, setLeaveStatus] = useState<LeaveStatus[]>([]);
  // const [selectedLeaveStatusId, setSelectedLeaveStatusId] = useState<number>(0);
  // const [leaveAllocation, setLeaveAllocation] = useState<number>(0);
  // const snackbar = useCustomSnackbar();
  // const [page, setPage] = useState(0);
  // const [openConfirmation, setOpenConfirmation] =
  //   React.useState<boolean>(false);
  // const [openConfirmationSure, setOpenConfirmationSure] =
  //   React.useState<boolean>(false);
  // const [rowsPerPage, setRowsPerPage] = useState(5); // Define the number of rows per page

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0); // Reset to the first page when changing rows per page
  // };
  // const lastIndex = (page + 1) * rowsPerPage;
  // const firstIndex = lastIndex - rowsPerPage;

  // const displayedData = data.slice(firstIndex, lastIndex);
  // const handleEdit = (appliedLeaveTypeId: number | undefined) => {
  //   const editUrl = appliedLeaveTypeId
  //     ? `/leave/${appliedLeaveTypeId}`
  //     : "/leave";
  //   navigate(editUrl);
  // };

  // const handleDelete = (appliedLeaveTypeId: number | undefined) => {
  //   alert(appliedLeaveTypeId);
  // };

  // const handleUpdate = (appliedLeaveTypeId: number | undefined) => {
  //   console.log(
  //     "applied id = ",
  //     appliedLeaveTypeId,
  //     "value",
  //     selectedLeaveStatusId
  //   );
  // };
  // const handleSelectStatusChange = (
  //   event: SelectChangeEvent<number>,
  //   appliedLeaveTypeId: number | undefined
  // ) => {
  //   const value =
  //     typeof event.target.value === "string"
  //       ? parseInt(event.target.value, 10)
  //       : event.target.value;

  //   setData((prevData) =>
  //     prevData.map((row) => {
  //       if (row.appliedLeaveTypeId === appliedLeaveTypeId) {
  //         return { ...row, leaveStatusId: value };
  //       }
  //       return row;
  //     })
  //   );

  //   // Update selectedLeaveStatusId
  //   setSelectedLeaveStatusId(value);
  // };
  // // console.log("table data", data);
  // useEffect(() => {
  //   FetchList();
  //   fetchLeaveTypes();
  // }, []);

  // const FetchList = async () => {
  //   try {
  //     const roleAssignId = getDecryptedValueFromStorage("roleAssignId", 0);
  //     const employeeId = getDecryptedValueFromStorage("employeeID", 0);

  //     //alert(employeeId);

  //     const fetchData = await GetAppliedLeavesByReportingPersonIdAsync(
  //       employeeId
  //     );
  //     const fetched = fetchData.data;
  //     const fetchemployee = await GetEmployeesAsync();

  //     if (Array.isArray(fetched)) {
  //       setData(fetched);
  //     } else {
  //       console.error("Invalid leave types data.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching leave types:", (error as Error).message);
  //   }
  // };

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

  // function formatDate(date: Date) {
  //   const day = date.getDate().toString().padStart(2, "0");
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  //   const year = date.getFullYear();

  //   return `${day}/${month}/${year}`;
  // }

  // const fetchData = async () => {
  //   try {
  //     const [LeaveStatus] = await Promise.all([getLeaveStatus()]);
  //     const leavestatuss = LeaveStatus.data;

  //     // const [leaveAllocate] = await Promise.all([GetActiveLeaveAllocationAsync()])
  //     // const leaveallocate = leaveAllocate.data.leaveAllocationId;
  //     setLeaveStatus(leavestatuss);
  //     //setLeaveAllocation(leaveallocate);
  //   } catch (error) {
  //     console.error("Failed to fetch data: ", (error as Error).message);
  //   }
  // };

  // const onLeaveApprove = async (
  //   appliedLeaveTypeId: number,
  //   statusCode: string
  // ) => {
  //   const isApproved = true;
  //   const data = await UpdateIsApprovedAsync(appliedLeaveTypeId, isApproved);

  //   fetchData();
  // };
  // const onLeaveCancel = (appliedLeaveTypeId: number) => {};

  // const [currentAppliedLeaveTypeId, setCurrentAppliedLeaveTypeId] = useState(0);
  // const [currentAppliedLeaveStatusCode, setCurrentAppliedLeaveStatusCode] =
  //   useState("APP");
  // const handleConfirmationClose = async (value: string) => {
  //   setOpenConfirmation(false);

  //   if (value == "yes") {
  //     const data = await AppliedLeaveUpdateStatusAsync({
  //       appliedLeaveTypeId: currentAppliedLeaveTypeId,
  //       leaveAllocationId: leaveAllocation,
  //       statusCode: currentAppliedLeaveStatusCode,
  //     });
  //     snackbar.showSnackbar(
  //       data.message,
  //       "success",
  //       { vertical: "top", horizontal: "center" },
  //       5000
  //     );
  //     FetchList();
  //   }
  // };
  // const onLeaveStatusUpdate = async (
  //   appliedLeaveTypeId: number,
  //   statusCode: string
  // ) => {
  //   // alert("Hey Amit");
  //   setOpenConfirmation(true);
  //   // const data = await AppliedLeaveUpdateStatusAsync({
  //   //   appliedLeaveTypeId: appliedLeaveTypeId,
  //   //   leaveAllocationId: leaveAllocation,
  //   //   statusCode: statusCode,
  //   // });
  //   // snackbar.showSnackbar(
  //   //   data.message,
  //   //   "success",
  //   //   { vertical: "top", horizontal: "center" },
  //   //   5000
  //   // );

  //   setCurrentAppliedLeaveTypeId(appliedLeaveTypeId);
  //   setCurrentAppliedLeaveStatusCode(statusCode);

  //   FetchList();
  // };

  // useEffect(() => {
  //   fetchData(); // Call fetchData when the component mounts
  // }, []);

  function renderIconButton(
    statusCode: string,
    appliedLeaveTypeId: number,
    employeeids: number,
    leaveStatusId: number
  ) {
    switch (statusCode) {
      case "APP":
        return (
          <Stack direction="row">
            <Tooltip title="Approve">
              <IconButton
                aria-label="Approve"
                onClick={() =>
                  onLeaveStatusUpdate(
                    appliedLeaveTypeId || 0,
                    "APR",
                    employeeids,
                    leaveStatusId
                  )
                }
              >
                <DoneOutlineOutlinedIcon color="success" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Reject">
              <IconButton
                aria-label="Reject"
                onClick={() =>
                  onLeaveStatusUpdate(
                    appliedLeaveTypeId || 0,
                    "REJ",
                    employeeids,
                    leaveStatusId
                  )
                }
              >
                <CancelPresentationOutlinedIcon color="error" />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      case "APR":
        return (
          // <IconButton color="primary">
          //   <IconButton aria-label="Approve">
          //     <EditAttributesOutlined />
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

      case "CAR":
        return (
          <Stack direction="row">
            <Tooltip title="Approve Cancel Request">
              <IconButton
                aria-label="Approve Cancel Request"
                onClick={() =>
                  onLeaveStatusUpdate(
                    appliedLeaveTypeId || 0,
                    "APC",
                    employeeids,
                    leaveStatusId
                  )
                }
              >
                <DoneAllOutlinedIcon color="success" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Reject Cancel Request">
              <IconButton
                aria-label="Reject Cancel Request"
                onClick={() =>
                  onLeaveStatusUpdate(
                    appliedLeaveTypeId || 0,
                    "REC",
                    employeeids,
                    leaveStatusId
                  )
                }
              >
                <CancelOutlinedIcon color="error" />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      case "APPROVED":
        return (
          <IconButton color="primary">
            <IconButton aria-label="Approve">
              <Unpublished />
            </IconButton>
          </IconButton>
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

                      <TableCell>
                        {row.leaveStatusName} {row.leaveStatusId}
                      </TableCell>

                      <TableCell>
                        {renderIconButton(
                          row.leaveStatusCode,
                          row.appliedLeaveTypeId || 0,
                          row.employeeId,
                          row.leaveStatusId
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              : "No data available"}
          </TableBody>
        </Table>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={snackbar.duration}
          onClose={snackbar.handleSnackbarClose}
          anchorOrigin={snackbar.position}
        >
          <Alert
            onClose={snackbar.handleSnackbarClose}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
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
      <ConfrimationDialogWithComment
        isOpen={openConfirmation}
        handleClose={handleConfirmationClose}
        message=" "
        comment={comment}
        handleCommentChange={handleCommentChange}
      />
      <Loader  loading={loading}/> 
    </>
  );
}
/*UnpublishedOutlinedIcon*/
export default EmployeeAppliedLeave;
