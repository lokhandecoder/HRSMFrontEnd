// import LayoutComponent from "../Components/Fixed/LayoutComponent";
// import React, { useState, useEffect } from "react";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import Button from "@mui/material/Button";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField"; // Import TextField
// import LocalizationProvider from "@mui/lab/LocalizationProvider"; // Import LocalizationProvider
// import AdapterDateFns from "@mui/lab/AdapterDateFns"; // Import Date Adapter for DatePicker
// import DatePicker from "@mui/lab/DatePicker"; // Import DatePicker
// import { GetHolidaysAsync } from "../Services/HolidaysServices";
// import { ManageHolidayModel } from "../Model/ManageHolidayModel";
// import axios from "axios";


function ManageHolidayss() {
//   const [holiday, setHoliday] = useState<ManageHolidayModel[]>([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await GetHolidaysAsync();
//       const holidayList: ManageHolidayModel[] = response.data.map(
//         (item: any) => ({
//           id: item.id,
//           holidayName: item.holidayName,
//           selectedDate: new Date(item.holidayDate),
//           isActive: item.isActive,
//         })
//       );
//       setHoliday(holidayList);
//     } catch (e) {
//       console.log("Error", e);
//     }
//   };

//   const handleAddHoliday = () => {
//     const newHoliday: ManageHolidayModel = {
//       id: holiday.length + 1,
//       holidayName: newHolidayName,
//       selectedDate: newSelectedDate,
//       isActive: true,
//     };

//     setHoliday([...holiday, newHoliday]);
//     // Reset form fields after adding the new holiday
//     setNewHolidayName("");
//     setNewSelectedDate(new Date());
//   };


//   const handleSendData = async () => {
//     try {
//       // Perform Axios POST request to send the updated holiday data
//       await axios.post("your_api_endpoint_here", holiday);
//       // Optionally, you can perform additional actions after sending data, such as refetching data
//       fetchData();
//     } catch (error) {
//       console.error("Error sending data:", error);
//     }
//   };

//   const [newHolidayName, setNewHolidayName] = useState("");
//   const [newSelectedDate, setNewSelectedDate] = useState(new Date());

 
//     // JSX for the form to add a new holiday
//     const addHolidayForm = (
//         <TableRow>
//           <TableCell>{/* ID field, can be empty */}</TableCell>
//           <TableCell>
//             <TextField
//               label="Holiday Name"
//               value={newHolidayName}
//               onChange={(e) => setNewHolidayName(e.target.value)}
//             />
//           </TableCell>
//           <TableCell>
//             {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <DatePicker
//                 label="Selected Date"
//                 value={newSelectedDate}
//                 onChange={(date: Date | null) => {
//                   if (date) {
//                     setNewSelectedDate(date);
//                   }
//                 }}
//                 renderInput={(params: any) => <TextField {...params} />}
//               />
//             </LocalizationProvider> */}
            
//           </TableCell>
//           <TableCell>
//             <Button variant="contained" color="primary" onClick={handleAddHoliday}>
//               Save
//             </Button>
//           </TableCell>
//         </TableRow>
//       );
    

//   return (
//     <LayoutComponent>
//       <Card sx={{ minWidth: 275, mt: 3, boxShadow: 5 }}>
//         <Typography variant="h4" style={{ marginLeft: "1%" }}>
//           Manage Holidays
//         </Typography>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Holiday Name</TableCell>
//               <TableCell>Selected Date</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//           {addHolidayForm}
//           {holiday.map((holidayItem, index) => (
//               <TableRow key={holidayItem.id}>
//                 <TableCell>{holidayItem.id}</TableCell>
//                 <TableCell>{holidayItem.holidayName}</TableCell>
//                 <TableCell>
//                   {holidayItem.selectedDate
//                     ? holidayItem.selectedDate.toDateString()
//                     : "No date selected"}
//                 </TableCell>
//                 <TableCell>{/* Actions buttons can go here */}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <CardActions style={{ justifyContent: "right" }}>
//           <Button
//             type="submit"
//             size="large"
//             variant="contained"
//             color="primary"
//             onClick={handleAddHoliday} // Trigger adding a new holiday row
//             sx={{ mt: 5 }}
//           >
//             Add
//           </Button>
//           <Button
//             type="submit"
//             size="large"
//             variant="contained"
//             color="primary"
//             onClick={handleSendData} // Trigger sending data using Axios
//             sx={{ mt: 5, ml: 2 }}
//           >
//             Send Data
//           </Button>
//         </CardActions>
//       </Card>
//     </LayoutComponent>
//   );
}

export default ManageHolidayss;
