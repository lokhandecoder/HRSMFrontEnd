import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import avatarImage from "../Resources/Images/wonderbiz-technologies-squareLogo-1693374911041.webp";
import { API_URL } from "../APIConfig";
import useCustomSnackbar from "../Components/CustomComponent/useCustomSnackbar";
import { ForgotPageUtilities } from "../Utilities/ForgotPageUtilities";
import Copyright from "../Components/Fixed/Copyright";
import CircularProgress from "@mui/material/CircularProgress";




const defaultTheme = createTheme();

export default function ForgotPasswordPage() {
  const ForgotPassword = ForgotPageUtilities();

  const { handleInputChange, handleSubmit, fieldErrors, snackbar, loading } =
    ForgotPassword;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src={avatarImage}
            sx={{ m: 1, bgcolor: "secondary.main", width: 200, height: 200 }}
          />

          <Typography component="h1" variant="h5">
            Reset your password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleInputChange}
              error={!!fieldErrors.email}
              helperText={fieldErrors.email}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading} // Disable the button when loading
              >
                {loading ? (
                  <div>
                    Please wait...
                    <CircularProgress size={24} />
                  </div>
                ) : (
                  "Verify Email"
                )}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  Back to Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright />
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
      </Container>
    </ThemeProvider>
  );
}
