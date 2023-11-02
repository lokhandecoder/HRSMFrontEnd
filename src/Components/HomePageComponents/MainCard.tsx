import { useEffect, useState } from "react";
import { GetEmployeeByIdAsync } from "../../Services/EmployeeServices";
import { EmployeeModel } from "../../Model/EmployeeModel";
import {
  DecryptEmployeeID,
  decryptData,
} from "../../Services/EncryptEmplyeeID";
import { secretKey_global } from "../../APIConfig";

function MainCard() {
  const [employeeData, setEmployeeData] = useState<EmployeeModel | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeId = DecryptEmployeeID();

        if (employeeId !== null && Number(employeeId) > 0) {
          try {
            const employeeResult = await GetEmployeeByIdAsync(
              Number(employeeId)
            );
            // Assuming employeeResult.data is a single EmployeeModel
            setEmployeeData(employeeResult.data);
          } catch (error) {
            console.error("Error fetching employee data:", error);
          }
        } else {
          console.error("Employee ID is null or not a positive number.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {employeeData ? (
        <div className="product-details">
          <h1>
            Welcome, {`${employeeData.firstName} ${employeeData.lastName}`}
          </h1>
          <span className="hint-star star">
            <i className="fa fa-star" aria-hidden="true" />
            <i className="fa fa-star" aria-hidden="true" />
            <i className="fa fa-star" aria-hidden="true" />
            <i className="fa fa-star" aria-hidden="true" />
            <i className="fa fa-star-o" aria-hidden="true" />
          </span>
          <h3>
            Designation:{" "}
            {employeeData.designation
              ? employeeData.designation.designationName
              : "N/A"}
          </h3>
          <h3>Date of Birth: {employeeData.dateOfBirth}</h3>
          <h3>Email : {employeeData.emailAddress}</h3>
          <h3>Contact No: {employeeData.mobileNo}</h3>
          <h3>Date of Joining: {employeeData.dateOfJoining}</h3>
        </div>
      ) : (
        <div>Loading employee data...</div>
      )}
    </>
  );
}

export default MainCard;
