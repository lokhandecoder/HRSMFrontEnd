import React, { useState } from "react";
import { useParams } from "react-router";
import dayjs, { Dayjs } from "dayjs";
import FormHelperText from "@mui/material/FormHelperText";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import SaveIcon from "@mui/icons-material/Save";
import Checkbox from "@mui/material/Checkbox";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
  TextField,
} from "@mui/material";
import useCustomSnackbar from "../CustomComponent/useCustomSnackbar";
import { EmployeeBankDetailsUtilities } from "../../Utilities/EmployeePageUtilities/EmployeeBankDetailsUtilities";

function EmployeeBankDetails() {
  const employeeUtilities = EmployeeBankDetailsUtilities();

  const { formData, handleFieldChange, handleSubmit, snackbar } =
    employeeUtilities;
    
  return (
    <>
      <Card sx={{ minWidth: 275, boxShadow: 5 }}>
        <h1 style={{ marginLeft: "1%", fontSize: "24px" }}>Bank Details</h1>
        <CardContent>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={3}>
              <TextField
                fullWidth
                autoComplete="off"
                id="BankName"
                name="BankName"
                label="Bank Name"
                value={formData.bankName}
                onChange={(e) => handleFieldChange("bankName", e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                autoComplete="off"
                id="AccountNumber"
                name="AccountNumber"
                label="Account Number"
                value={formData.accountNumber}
                onChange={(e) =>
                  handleFieldChange("accountNumber", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                autoComplete="off"
                id="IFSCcode"
                name="IFSCcode"
                label="IFSC code"
                value={formData.IFSCCode}
                onChange={(e) => handleFieldChange("IFSCCode", e.target.value)}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions style={{ justifyContent: "right" }}>
          <Button variant="contained" onClick={handleSubmit} color="primary">
            Save
          </Button>
        </CardActions>
      </Card>
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
    </>
  );
}

export default EmployeeBankDetails;
