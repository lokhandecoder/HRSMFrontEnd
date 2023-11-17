import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Snackbar,
  TextField,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import useCustomSnackbar from "../CustomComponent/useCustomSnackbar";
import { EmployeeBankDetailsUtilities } from "../../Utilities/EmployeePageUtilities/EmployeeBankDetailsUtilities";
import { EmployeeIdentityUtilities } from "../../Utilities/EmployeePageUtilities/EmployeeIdentityUtilities";

function EmployeeIdentity() {
  const employeeUtilities = EmployeeIdentityUtilities();

  const {
    formData,
    handleFieldChange,
    handleSubmit,
    snackbar,
  } = employeeUtilities;

  return (
    <>
      <Card sx={{ minWidth: 275, boxShadow: 5 }}>
        <h1 style={{ marginLeft: "1%", fontSize: "24px" }}>Identity Details</h1>
        <CardContent>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                autoComplete="off"
                id="AadharCard"
                name="AadharCard"
                label="Aadhar Card"
                value={formData.aadharCard}
                onChange={(e) =>
                  handleFieldChange("aadharCard", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                autoComplete="off"
                id="PANCard"
                name="PANCard"
                label="PAN Card"
                value={formData.panCard}
                onChange={(e) => handleFieldChange("panCard", e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                autoComplete="off"
                id="VoterID"
                name="VoterID"
                label="Voter ID"
                value={formData.voterId}
                onChange={(e) => handleFieldChange("voterId", e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                autoComplete="off"
                id="UAN"
                name="UAN"
                label="UAN Number"
                value={formData.UAN}
                onChange={(e) => handleFieldChange("UAN", e.target.value)}
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

export default EmployeeIdentity;
