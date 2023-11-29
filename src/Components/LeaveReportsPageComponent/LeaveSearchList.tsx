import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { LeaveSearchUtlilities } from "../../Utilities/LeaveSearchUtlilities";
import { AppliedLeave } from "../../Model/AppliedLeaveModel";
import dayjs, { Dayjs } from "dayjs";
import { EmployeeLeavesReportResponse } from "../../Model/EmployeeLeavesReportResponse";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import * as XLSX from "xlsx"; // Import xlsx library




interface LeaveSearchListProps {
  employeeLeaveReport: EmployeeLeavesReportResponse[]; // Replace YourEmployeeLeaveReportType with the actual type
}



function LeaveSearchList({ employeeLeaveReport }: LeaveSearchListProps) {
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

  return (
    <>
      <Card sx={{ minWidth: 275, mt: 5, boxShadow: 5 }}>
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Leave Type</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Reason for Leave</TableCell>
                <TableCell>Applied Days</TableCell>
                <TableCell>Status </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeLeaveReport && employeeLeaveReport.length != 0 ? (
                employeeLeaveReport.map(
                  (row: EmployeeLeavesReportResponse, key: number) => (
                    <TableRow key={key}>
                      <TableCell>
                        {row.firstName} {row.lastName}
                      </TableCell>
                      <TableCell>{row.leaveTypeName}</TableCell>
                      <TableCell>{row.startDate}</TableCell>
                      <TableCell>{row.endDate}</TableCell>
                      <TableCell>{row.leaveReason}</TableCell>
                      <TableCell>{row.applyLeaveDay}</TableCell>
                      <TableCell>{row.leaveStatusName}</TableCell>
                    </TableRow>
                  )
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>No data available </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <CardActions style={{ justifyContent: "right" }}>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            onClick={handleExportToExcel} // Call handleExportToExcel function on button click
            sx={{ mt: 2, marginRight: 2 }} // Add margin to the right
            disabled={!employeeLeaveReport || employeeLeaveReport.length === 0} // Disable button if no data available
          >
            Export to Excel
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default LeaveSearchList;
