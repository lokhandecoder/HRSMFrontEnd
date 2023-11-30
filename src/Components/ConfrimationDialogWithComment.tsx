import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const ConfirmationDialogWithComment: React.FC<{
  isOpen: boolean;
  handleClose: (value: string, comment?: string) => void;
  message: string;
  comment: string; // Comment state
  handleCommentChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle comment change
}> = ({ isOpen, handleClose, message,comment,handleCommentChange }) => {
  // const [comment, setComment] = React.useState("");

  // const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setComment(event.target.value);
  // };

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={() => handleClose("no")} // Close on backdrop click or escape key
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Comment"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Enter your Comment"
            type="text"
            fullWidth
            multiline // Make it multiline
            rows={4} // Set the number of rows
            value={comment}
            onChange={handleCommentChange}
          />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={() => handleClose("yes", comment)}>Yes</Button>
          <Button onClick={() => handleClose("no")}>No</Button> */}
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => handleClose("yes", comment)}
          >
            Confrim
          </Button>

          <Button
            size="large"
            variant="contained"
            color="secondary"
            onClick={() => handleClose("no")}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ConfirmationDialogWithComment;
