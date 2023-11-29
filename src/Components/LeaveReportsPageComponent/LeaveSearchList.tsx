// import React, { useState, useEffect } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import TablePagination from "@mui/material/TablePagination";
// import { LeaveSearchUtlilities } from "../../Utilities/LeaveSearchUtlilities";
// import { AppliedLeave } from "../../Model/AppliedLeaveModel";
// import dayjs, { Dayjs } from "dayjs";
// import { EmployeeLeavesReportResponse } from "../../Model/EmployeeLeavesReportResponse";

// function LeaveSearchList() {
//     const leavesearch = LeaveSearchUtlilities();

//   const {
//     handleSubmit,
//     isWeekend,
//     formData,
//     handleChange,
//     // employeeNames,
//     // leaveStatuses,
//     loading,
//     snackbar,
//     employeeLeaveReport,
//     formatDate,
//     setresponseList,
//   } = leavesearch;
//   const today = dayjs();
//   const todayDate = today.toDate();
//  // const [fetchlist, setfetchlist] = useState(responseList);
//   console.log("Hello Anzar" , {employeeLeaveReport});

//   // const fetchlist = () => {
//   //   return responseList && responseList !== null ? (
//   //     responseList.map((row: AppliedLeave, key: number) => (
//   //       <TableRow key={key}>
//   //       <TableCell>
//   //         {row.firstName} {row.lastName}
//   //       </TableCell>
//   //       <TableCell>{row.leaveTypeName}</TableCell>
//   //       <TableCell>
//   //         {row.startDate
//   //           ? formatDate(new Date(row.startDate))
//   //           : "No date available"}
//   //       </TableCell>
//   //       <TableCell>
//   //         {row.endDate
//   //           ? formatDate(new Date(row.endDate))
//   //           : "No date available"}
//   //       </TableCell>
//   //       <TableCell>{row.leaveReason}</TableCell>
//   //       <TableCell>{row.applyLeaveDay}</TableCell>

//   //       <TableCell>{row.leaveStatusName}</TableCell>

//   //       {/* <TableCell>
//   //         {renderIconButton(
//   //           row.leaveStatusCode,
//   //           row.appliedLeaveTypeId || 0
//   //         )}
//   //       </TableCell> */}
//   //     </TableRow>
//   //     ))
//   //   ) : (
//   //     <TableRow>
//   //       <TableCell colSpan={7}>No data available</TableCell>
//   //     </TableRow>
//   //   );
//   // };


  

//   return (
//     <>
//     <TableContainer>
//         <Table sx={{ minWidth: 700 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>First Name</TableCell>
//               <TableCell>Leave Type</TableCell>
//               <TableCell>Start Date</TableCell>
//               <TableCell>End Date</TableCell>
//               <TableCell>Reason for Leave</TableCell>
//               {/* <TableCell>Balance Leaves</TableCell> */}
//               <TableCell>Applied Days</TableCell>
//               {/* <TableCell>Remaining Leaves</TableCell> */}

//               <TableCell>Status </TableCell>
//               {/* <TableCell>Action</TableCell> */}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {
//               employeeLeaveReport && employeeLeaveReport.length != 0 ? (
//                 employeeLeaveReport.map((row: EmployeeLeavesReportResponse, key: number) => (
//                   <TableRow key={key}>
//                   <TableCell>
//                     {row.firstName} {row.lastName}
//                   </TableCell>
//                   <TableCell>{row.leaveTypeName}</TableCell>
//                   <TableCell>
//                     {row.startDate
//                       ? formatDate(new Date(row.startDate))
//                       : "No date available"}
//                   </TableCell>
//                   <TableCell>
//                     {row.endDate
//                       ? formatDate(new Date(row.endDate))
//                       : "No date available"}
//                   </TableCell>
//                   <TableCell>{row.leaveReason}</TableCell>
//                   <TableCell>{row.applyLeaveDay}</TableCell>
          
//                   <TableCell>{row.leaveStatusName}</TableCell>
          
//                   {/* <TableCell>
//                     {renderIconButton(
//                       row.leaveStatusCode,
//                       row.appliedLeaveTypeId || 0
//                     )}
//                   </TableCell> */}
//                 </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={7}>No data available 223</TableCell>
//                 </TableRow>
//               )
//             }
//           </TableBody>
//         </Table>
//         {/* <TablePagination
//           rowsPerPageOptions={[5, 10, 25]} // Define available rows per page options
//           component="div"
//           count={data.length} // Pass the total number of rows
//         //   rowsPerPage={rowsPerPage}
//         //   page={page}
//         //   onPageChange={handleChangePage}
//         //   onRowsPerPageChange={handleChangeRowsPerPage}
//         /> */}
//       </TableContainer></>

//   )
// }

// export default LeaveSearchList


const LeaveSearchList = () => {
  return (  <></>);
}
 
export default LeaveSearchList;