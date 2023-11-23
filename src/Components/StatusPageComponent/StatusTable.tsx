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
import ConfirmationDialog from "../ConfirmationDialog";
import { GetActiveLeaveAllocationAsync } from "../../Services/LeaveAllocation";
import { StatusTableUtilities } from "../../Utilities/StatusPageUtilities/StatusTableUtilities";
function StatusTable() {
  const statustableutility = StatusTableUtilities();

  const { FetchList,
    fetchLeaveTypes,
    fetchData,
    handleEdit,
    handleDelete,
    onLeaveStatusUpdate,
    data,
    formatDate,
    openConfirmation,
    handleConfirmationClose} = statustableutility;

  useEffect(() => {
   
    FetchList();
    fetchLeaveTypes();
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
              onClick={() => onLeaveStatusUpdate(appliedLeaveTypeId || 0,"CAR")}
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
          {data && data !== null
            ? data.map((row: AppliedLeave, key) => {
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
    </TableContainer>
    
 <ConfirmationDialog isOpen = {openConfirmation} handleClose= {handleConfirmationClose}  message = "Are you sure you want to delete this leave" />
    </>
    
  );
}
/*UnpublishedOutlinedIcon*/
export default StatusTable;
