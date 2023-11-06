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
  import FormHelperText from "@mui/material/FormHelperText";
  import CircularProgress from "@mui/material/CircularProgress";
  import Snackbar from "@mui/material/Snackbar";
  import Alert from "@mui/material/Alert";
  import { useParams } from "react-router-dom"; // Import useParams to get the ID from the route params
  import { EmployeesUtilities } from "../Utilities/EmployeesUtilities";
  import { IconButton } from "@mui/material";
  import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
  const EmployeesPage = () => {
    const { id } = useParams();
    const employeeId = id ? parseInt(id, 10) : 0;
  
    const employeesUtilities = EmployeesUtilities(employeeId);
  
    const { employeeData,onEdit } = employeesUtilities;
    console.log(employeeData);
  
    const label = { inputProps: { "aria-label": "Checkbox demo" } };
    return (
      <LayoutComponent>
        <Card sx={{ minWidth: 275, mt: 3, boxShadow: 5 }}>
          <h1 style={{ marginLeft: "1%", fontSize: "24px" }}>Employees List</h1>
  
          <CardContent>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date of Joining</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Date of Birth</TableCell>
                    <TableCell>Email Address</TableCell>
                    <TableCell>MObile No</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Designation</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Reporting Person</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employeeData.map((row) => (
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
                      <TableCell>{row.gender ? row.gender.genderName: 'N/A'}</TableCell> 
                     <TableCell>{row.designation ? row.designation.designationName: 'N/A'}</TableCell>
                     <TableCell>{row.role ? row.role.roleAssignName: 'N/A'}</TableCell>
                     <TableCell>{row.reportingPerson ? row.reportingPerson.firstName: 'N/A'}</TableCell>
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
          <CardActions></CardActions>
        </Card>
      </LayoutComponent>
    );
  };
  
  export default EmployeesPage;
  