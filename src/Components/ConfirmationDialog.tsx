import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmationDialog: React.FC<{ isOpen: boolean; handleClose: (value:string) => void, message :  string  }> = ({
    isOpen,
    handleClose,
    message
  }) => {
  
  return (
    <React.Fragment>
     
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete confirmation?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose("yes")}>Yes</Button>
          <Button onClick={()=>handleClose("no")}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default ConfirmationDialog;