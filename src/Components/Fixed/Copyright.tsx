import React from 'react'
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";



function Copyright() {
    return (
        <Typography sx={{ mt: 8, mb: 4 }} 
          variant="body2"
          color="text.secondary"
          align="center"
        >
          {"Copyright © "}
          <Link color="inherit" href="">
            Wonderbiz
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      );
}

export default Copyright    