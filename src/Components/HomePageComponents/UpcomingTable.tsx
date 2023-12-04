import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import { Holiday } from "./UpcomingHolidays";
import { GetHolidaysAsync } from "../../Services/HolidaysServices";


const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const UpcomingTable = () => {
  const [data, setData] = useState<Holiday[]>([]);

  useEffect(() => {
    const FetchList = async () => {
      try {
        const fetchData = await GetHolidaysAsync();
        const fetched = fetchData.data;
        if (Array.isArray(fetched)) {
          setData(fetched);
        } else {
          console.error("Invalid holidays data.");
        }
      } catch (error) {
        console.error("Error fetching leave types:", (error as Error).message);
      }
    };
    FetchList();
  }, []);

  const getTableSize = () => {
    if (data.length > 4) {
      return "large";
    } else if (data.length > 2) {
      return "medium";
    } else {
      return "small";
    }
  };
  const tableSize = getTableSize();

  return (
    // <TableContainer style={{ maxHeight: data.length > 3 ? 300 : 'auto', overflow: 'auto' }}>
    //   <Table size={tableSize === "large" ? undefined : tableSize}>
    <TableContainer style={{ maxHeight: 250, overflow: "auto" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Holiday</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((holiday, index) => (
            <React.Fragment key={index}>
              <TableRow>
              <TableCell>{formatDate(holiday.holidayDate)}</TableCell>
                <TableCell>{holiday.holidayName}</TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UpcomingTable;








// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';


// interface Holiday {
//     date: string;
//     holiday: string;
//   }

//   const holidays: Holiday[] = [
//     {
//       date: "2023-10-02",
//       holiday: "Gandhi Jayanti",
//     },
//     {
//       date: "2023-10-19",
//       holiday: "Diwali (Deepavali)",
//     },
//     {
//       date: "2023-12-25",
//       holiday: "Christmas",
//     },
//     {
//       date: "2024-01-01",
//       holiday: "New Year's Day",
//     },
//     {
//       date: "2024-01-26",
//       holiday: "Republic Day",
//     },
//     {
//       date: "2024-03-18",
//       holiday: "Holi",
//     },
//     {
//       date: "2024-04-05",
//       holiday: "Good Friday",
//     },
//     {
//       date: "2024-04-14",
//       holiday: "Baisakhi (Vaisakhi)",
//     },
//     {
//       date: "2024-05-01",
//       holiday: "Labour Day (May Day)",
//     },
//     {
//       date: "2024-04-23",
//       holiday: "Eid ul-Fitr",
//     },
//     {
//       date: "2024-08-15",
//       holiday: "Independence Day",
//     },
//     {
//       date: "2024-09-02",
//       holiday: "Ganesh Chaturthi",
//     },
//   ];

// export default function BasicTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 300 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Holidays</TableCell>
//             <TableCell align="right">Date</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {holidays.map((days,index) => (
//             <TableRow
//               key={index}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {days.holiday}
//               </TableCell>
//               <TableCell align="right">{days.date}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
