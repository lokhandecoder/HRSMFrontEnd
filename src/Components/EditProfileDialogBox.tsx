import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import ProfilePage from "../Pages/ProfilePage";
import UpdateEmployee from "./EmployeePageComponent/UpdateEmployee";
import { getDecryptedValueFromStorage } from "../Utilities/LocalStorageEncryptionUtilities";

interface EditProfileDialogProps {
  openConfirmation: boolean;
  handleClose: (value: string) => void;
}


function EditProfileDialogBox({
  openConfirmation,
  handleClose
}: EditProfileDialogProps) {

    const [employeeId, setEmployeeId] = React.useState<number>(0);

    React.useEffect(() => {
      // Fetch employeeId from storage and set it in state
      const decryptedEmployeeId = getDecryptedValueFromStorage("employeeID", 0);
      setEmployeeId(decryptedEmployeeId);
    }, [openConfirmation]); //
  return (
    <React.Fragment>
      <Dialog
        open={openConfirmation}
        onClose={() => handleClose("no")} // Close on backdrop click or escape key
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xl" // Set the desired maxWidth
      >
        <DialogTitle id="alert-dialog-title">{"Edit Profile"}</DialogTitle>
        <DialogContent>
                  <UpdateEmployee  employeeId={employeeId} />

        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default EditProfileDialogBox;
