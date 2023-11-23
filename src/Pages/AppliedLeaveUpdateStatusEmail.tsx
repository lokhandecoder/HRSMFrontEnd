import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  AppliedLeaveUpdateStatusByEmailAsync,
  AppliedLeaveUpdateStatusByEmailConfirmAsync,
} from "../Services/EmployeeLeaveApplyServices";
import { CSSProperties } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const AppliedLeaveUpdateStatusEmail = () => {
  const { code } = useParams();
  const [data, setData] = useState({ status: 200, message: "" }); // Specify the type for data
  //const [count, setCount] = useState(0);
  const [confrim, setConfrim] = useState(false);
  const renderAfterCalled = useRef(false);

  useEffect(() => {
    if (!renderAfterCalled.current) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const receivedData = await AppliedLeaveUpdateStatusByEmailAsync(
        code || ""
      );
      setData(receivedData);
      //setCount(1);
      renderAfterCalled.current = true;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleConfirm = async () => {
    try {
      const receivedData = await AppliedLeaveUpdateStatusByEmailConfirmAsync(
        code || ""
      );
      setData(receivedData);
      //setCount(1);
      setConfrim(true);
      renderAfterCalled.current = true;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div style={{ ...styles.container, backgroundColor: '#85a4a6' }}>
      {confrim && confrim ? (
        // <div>{data?.message}</div>
        <Card
          sx={{
            minWidth: 800,
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
          }}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <Typography
              sx={{ fontSize: 20 }}
              color="text.secondary"
              gutterBottom
            >
              {data?.message}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        // <div>
        //   <p>Are you sure you want to {data?.message}</p>
        //   <div style={styles.buttonContainer}>
        //     <button style={styles.button} onClick={handleConfirm}>
        //       Yes
        //     </button>
        //   </div>
        // </div>
        <Card
          sx={{
            minWidth: 800,
            justifyContent: "center",
            alignItems: "center",
            padding: 5,

          }}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <Typography
              sx={{ fontSize: 20 }}
              color="text.secondary"
              gutterBottom
            >
              Are you sure you want to {data?.message}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <button style={styles.button} onClick={handleConfirm}>
              Yes
            </button>
          </CardActions>
        </Card>
      )}
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Adjust the height as needed
  },
  message: {
    padding: "20px",
    backgroundColor: "#f0f0f0",
    borderRadius: "5px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    margin: "0 10px",
    padding: "8px 16px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "4px",
    cursor: "pointer",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  },
};

export default AppliedLeaveUpdateStatusEmail;
