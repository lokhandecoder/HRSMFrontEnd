import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";


interface LoaderProps {
  loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  return (
    <Dialog
      open={loading}
      onClose={() => {}}
      aria-labelledby="loading-dialog"
      PaperProps={{
        style: { 
          backgroundColor: 'transparent',
          boxShadow: 'none',
          overflow: 'hidden',
        },
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        {/* <CircularProgress /> */}
        <ClimbingBoxLoader color="#1976d2"  size={20} />
      </div>
    </Dialog>
  );
};

export default Loader;
