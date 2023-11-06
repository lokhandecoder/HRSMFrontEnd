import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import { Box, Button, Card, CardContent, CardActions } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import LayoutComponent from "../Components/Fixed/LayoutComponent";
import TableRowWithCheckboxes from "../Components/DataTable/TableRowWithCheckboxes";
import {
  RowHeaderModel,
  ColumnHeaderModel,
} from "../Model/RoleAssignModels";
import { UserRoleMapping } from "../Model/UserRoleMapping";
import { GetRoleAssignsAsync, GetApplicationPagesAsync,  createUserRoleMappingsAsync} from "../Services/RoleAssignServices";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../APIConfig";
import axios from "axios";
import { GetUserRoleMappingsAsync } from "../Services/UserRoleMappingServices";


type DataObject = {
  [key: string]: {
    [key: string]: boolean;
  };
};

const SNACKBAR_DURATION = 6000;

function RoleAssign() {
  const initialData: DataObject = {};
  const [columnHeaders, setColumnHeaders] = useState<ColumnHeaderModel[]>([]);
  const [rowHeaders, setRowHeaders] = useState<RowHeaderModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor | undefined>("success"); 
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState<UserRoleMapping[]>([]);
  const [ userRole, setUserRole] = useState<UserRoleMapping[]>([]);

  // for (const item of userRole) {
  //   if (item.roleAssignId && item.applicationPageId) {
  //     if (!initialData[item.applicationPageId]) {
  //       initialData[item.applicationPageId] = {};
  //     }
  //     initialData[item.applicationPageId][item.roleAssignId] = true;
  //   }
  // }

  useEffect(() => {
    async function fetchData() {
      try {
        const columnResponse = await GetRoleAssignsAsync();
        setColumnHeaders(columnResponse.data);

        const rowResponse = await GetApplicationPagesAsync();
        setRowHeaders(rowResponse.data);
        const userrole = await GetUserRoleMappingsAsync();
        // console.log("userrole",userrole.data);
        setSelectedData(userrole.data);
        setLoading(false);
      } catch (error: any) {
        setError(
          "Failed to fetch column headers data: " + (error as Error).message
        );
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  for (const row of rowHeaders) {
    initialData[row.id] = {};
    for (const header of columnHeaders) {
      initialData[row.id][header.roleAssignId] = false;
    }
  }

  const [data, setData] = useState<DataObject>(initialData);
 

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const handleSave = async () => {
    
    console.log("from consle",selectedData);
    
    try {
      await axios.post(`${API_URL}UserRoleMapping/CreateUserRoleMappingsAsync/`, selectedData);
      

      console.log('Data saved successfully');
      setSnackbarMessage('Data saved successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      //setData(initialData);
      //setSelectedData([]);

      
    
    } catch (error) {
      console.error('Error saving data:', error);
    alert('Error saving data');
    }
  };

  const handleReset = () => {
    setData(initialData);
    setSelectedData([]);
    setSnackbarMessage('Data reset to initial state');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };

  
  const toggleCell = (rowId: number, columnId: number) => {
    const cellKey = `${rowId}-${columnId}`;
    const isCellSelected = selectedData.some(
      (data) => data.applicationPageId === rowId && data.roleAssignId === columnId
    );

    if (isCellSelected) {
   
      const updatedData = selectedData.filter(
        (data) => !(data.applicationPageId === rowId && data.roleAssignId === columnId)
      );
      setSelectedData(updatedData); // Assuming you have a setter function like this
    } else {
      // If the cell is not selected, add it to the selectedData
      const newData: UserRoleMapping = { roleAssignId: columnId, applicationPageId: rowId , roleAssignName:'',roleAssignCodeName:'',pageName:'',pageCode:'',routePath:'',menuPath:'',isMenuPage:false,componentName:'' };
      const updatedData = [...selectedData, newData];
      setSelectedData(updatedData);
    }

 
  };
  


  if (error) {
    return <p>{error}</p>;
  }
  console.log("userroleee", userRole)

  return (
    <>
      <LayoutComponent>
        <Box sx={{ mt: 4 }}>
          <Card>
            <CardContent>
              <h1 style={{ marginLeft: "1%", fontSize: "24px" }}>Role Assignment</h1>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      {columnHeaders.map((column) => (
                        <TableCell key={column.roleAssignId}>{column.roleAssignName}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  
                  <TableBody>
                    {rowHeaders.map((row) => (
                      <TableRowWithCheckboxes
                        key={row.id}
                        row={row}
                        columnHeaders={columnHeaders}
                        selectedData={selectedData}
                        toggleCell={toggleCell}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <CardActions style={{ justifyContent: "right" }}>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  color="secondary"
                  onClick={handleReset}
                  startIcon={<CancelIcon />}
                >
                  Reset
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Box>
      </LayoutComponent>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={SNACKBAR_DURATION}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          elevation={6}
          variant="filled"
          severity={snackbarSeverity}
          onClose={handleCloseSnackbar}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default RoleAssign;
