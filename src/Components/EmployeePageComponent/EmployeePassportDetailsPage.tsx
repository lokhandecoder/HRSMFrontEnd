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
import { EmployeePassportUtilities } from "../../Utilities/EmployeePageUtilities/EmployeePassportUtilities";

function EmployeePassportDetailsPage() {
  const passportUtilities = EmployeePassportUtilities();

  const {
    formData,
    handleFieldChange,
    handleSubmit,
    snackbar,
  } = passportUtilities;

  return (
    <>
      <Card sx={{ minWidth: 275, boxShadow: 5 }}>
        <h1 style={{ marginLeft: "1%", fontSize: "24px" }}>Passport Details</h1>
        <CardContent>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                autoComplete="off"
                id="passportNumber"
                name="passportNumber"
                label="Passport Number"
                value={formData.passportNumber}
                onChange={(e) =>
                  handleFieldChange("passportNumber", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                autoComplete="off"
                id="validity"
                name="validity"
                label="Validity"
                value={formData.validity}
                onChange={(e) => handleFieldChange("validity", e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                autoComplete="off"
                id="visaType"
                name="visaType"
                label="Visa Type"
                value={formData.visaType}
                onChange={(e) => handleFieldChange("visaType", e.target.value)}
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

export default EmployeePassportDetailsPage;
