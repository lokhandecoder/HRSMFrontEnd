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
import TablePagination from "@mui/material/TablePagination";
import {
  GetAppliedLeavesByEmpIdAsync,
  UpdateIsApprovedAsync,
  UpdateIsRejectedAsync,
} from "../../Services/EmployeeLeaveApplyServices";
import { IconButton } from "@mui/material";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
//import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
//import UnpublishedOutlinedIcon from "@mui/icons-material/UnpublishedOutlined";

import { ThumbDownOffAlt, Unpublished } from "@mui/icons-material";
import { GetEmployeesAsync } from "../../Services/EmployeeServices";
import { Employee } from "../../Database/EmployeeServices";
import { DecryptEmployeeID } from "../../Services/EncryptEmplyeeID";
import { StatusTableRow } from "../../Model/StatusTableRow";
import { LeaveStatusUtilities } from "../../Utilities/LeaveStatusUtilities";

function StatusTable() {
  const StatusTable = LeaveStatusUtilities();

  const {
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
  } = StatusTable;

  return (
    <>
      <div style={{ overflow: "auto", maxHeight: "500px" }}>
        {" "}
        {/* Adjust maxHeight to your preferred value */}
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="simple table">
            <TableHead className="tableHead">
              <TableRow>
                <TableCell sx={{ color: "white" }}>First Name</TableCell>
                <TableCell sx={{ color: "white" }}>Leave Type</TableCell>
                <TableCell sx={{ color: "white" }}>Start Date</TableCell>
                <TableCell sx={{ color: "white" }}>End Date</TableCell>
                <TableCell sx={{ color: "white" }}>Reason for Leave</TableCell>
                <TableCell sx={{ color: "white" }}>Balance Leaves</TableCell>
                <TableCell sx={{ color: "white" }}>Applied Days</TableCell>
                <TableCell sx={{ color: "white" }}>Remaining Leaves</TableCell>

                <TableCell sx={{ color: "white" }}>Edit </TableCell>
                <TableCell sx={{ color: "white" }}>Approve/Reject </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedData && displayedData !== null
                ? displayedData.map((row: StatusTableRow, key) => {
                    // Check if the employeeId from the logged-in user matches the employeeId from appliedLeave
                    const isCurrentUserLeave =
                      row.employeeId.toString() === employeeId;

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
                        <TableCell>{row.balanceLeave}</TableCell>
                        <TableCell>{row.applyLeaveDay}</TableCell>
                        <TableCell>{row.remaingLeave}</TableCell>

                        <TableCell>
                          {!row.isApproved && (
                            <IconButton
                              aria-label="Edit"
                              onClick={() =>
                                handleEdit(row.appliedLeaveTypeId || 0)
                              }
                              disabled={row.isApproved}
                            >
                              <ModeEditOutlinedIcon />
                            </IconButton>
                          )}
                        </TableCell>

                        <TableCell
                          className={row.isApproved ? "approved-cell" : ""}
                        >
                          {!isCurrentUserLeave &&
                            !row.isApproved &&
                            !row.isRejected && (
                              <>
                                <IconButton
                                  aria-label="Approve"
                                  onClick={() =>
                                    onLeaveApprove(row.appliedLeaveTypeId || 0)
                                  }
                                >
                                  <DoneAllOutlinedIcon color="success" />
                                </IconButton>

                                <IconButton
                                  aria-label="Reject"
                                  onClick={() =>
                                    onLeaveReject(row.appliedLeaveTypeId || 0)
                                  }
                                >
                                  <ClearIcon color="error" />
                                </IconButton>
                              </>
                            )}

                          {row.isApproved && row.isRejected ? (
                            <>
                              <IconButton aria-label="Approve">
                                <Unpublished />
                              </IconButton>
                            </>
                          ) : (
                            <>
                              {row.isApproved && !row.isRejected && "Approved"}
                              {!row.isApproved && row.isRejected && "Rejected"}
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                : "No data available"}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}
export default StatusTable;
