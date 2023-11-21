import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import LayoutComponent from "../Components/Fixed/LayoutComponent";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Checkbox from "@mui/material/Checkbox";
import { EmployeeUtilities } from "../Utilities/EmployeeUtilities";
import dayjs, { Dayjs } from "dayjs";
import TablePagination from "@mui/material/TablePagination";
import FormHelperText from "@mui/material/FormHelperText";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useParams } from "react-router-dom"; // Import useParams to get the ID from the route params
import { EmployeesUtilities } from "../Utilities/EmployeesUtilities";
import { IconButton } from "@mui/material";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { useState } from "react";
const EmployeesPage = () => {
  const { id } = useParams();
  const employeeId = id ? parseInt(id, 10) : 0;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const employeesUtilities = EmployeesUtilities(employeeId);
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  


  const { employeeData, onEdit, roles, selectedReportingPersons } = employeesUtilities;
  // console.log(employeeData);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, employeeData.length - page * rowsPerPage);


  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <LayoutComponent>
      <Card sx={{ minWidth: 275, mt: 3, boxShadow: 5 }}>
        <h1 style={{ marginLeft: "1%", fontSize: "24px" }}>Employees List</h1>

        <CardContent>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className="tableHead">
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Date of Joining</TableCell>
                  <TableCell sx={{ color: "white" }}>First Name</TableCell>
                  <TableCell sx={{ color: "white" }}>Last Name</TableCell>
                  <TableCell sx={{ color: "white" }}>Date of Birth</TableCell>
                  <TableCell sx={{ color: "white" }}>Email Address</TableCell>
                  <TableCell sx={{ color: "white" }}>Mobile No</TableCell>
                  <TableCell sx={{ color: "white" }}>Gender</TableCell>
                  <TableCell sx={{ color: "white" }}>Designation</TableCell>
                  <TableCell sx={{ color: "white" }}>Role</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    Reporting Person
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {(rowsPerPage > 0
                  ? employeeData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : employeeData
                ).map((row) => (
                  <TableRow
                    key={row.employeeId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.dateOfJoining}</TableCell>
                    <TableCell component="th" scope="row">
                      {" "}
                      {row.firstName}{" "}
                    </TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.dateOfBirth}</TableCell>
                    <TableCell>{row.emailAddress}</TableCell>
                    <TableCell>{row.mobileNo}</TableCell>
                    {/* <TableCell>{row.gender.genderCode}</TableCell> */}
                    <TableCell>
                      {row.gender ? row.gender.genderName : "N/A"}
                    </TableCell>
                    <TableCell>
                      {row.designation
                        ? row.designation.designationName
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {roles.map((data) =>
                        data.roleAssignId === row.roleAssignId
                          ? data.roleAssignName
                          : ""
                      )}
                    </TableCell>
                    {/* <TableCell>{row.roleAssignId ? row.roleAssignId: 'N/A'}</TableCell> */}
                    <TableCell>
                      {
                        selectedReportingPersons.map((data) => (
                          data.employeeId === row.reportingPersonId ? data.firstName : ""
                        ))
                      }
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="Edit"
                        onClick={() => onEdit(row.employeeId || 0)}
                      >
                        <ModeEditOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions sx={{ justifyContent : "right"}}>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={employeeData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardActions>

      </Card>
    </LayoutComponent>
  );
};

export default EmployeesPage;
