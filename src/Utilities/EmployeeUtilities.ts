import { useState, useEffect } from "react";
import { EmployeeModel } from "../Model/EmployeeModel";
import { GetDesignationsAsync } from "../Services/DesignationServices";
import { DesignationModel } from "../Model/DesignationModel";
import { GetGendersAsync } from "../Services/GenderServices";
import { GenderModel } from "../Model/GenderModel";
import dayjs, { Dayjs } from "dayjs";
import {
  GetEmployeeByIdAsync,
  createEmployee,
  updateEmployee,
} from "../Services/EmployeeServices";
import useCustomSnackbar from "../Components/CustomComponent/useCustomSnackbar";
import { ColumnHeaderModel } from "../Model/RoleAssignModels";
import { GetRoleAssignsAsync } from "../Services/RoleAssignServices";
import { GetEmployeesAsync } from "../Services/EmployeeServices"; 
export const EmployeeUtilities = (employeeId: number) => {
  const today = dayjs();
  const todayDate = today.toDate();
  const snackbar = useCustomSnackbar();

  const [roles, setRoles] = useState<ColumnHeaderModel[]>([]);
  const [designations, setDesignations] = useState<DesignationModel[]>([]);
  const [genders, setGenders] = useState<GenderModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedReportingPersons, setSelectedReportingPersons] = useState<EmployeeModel[]>([]);
  // const [dob, setDob] = useState({dateOfBirth: todayDate});
  // const [doj, setDoj] = useState({dateOfJoining:todayDate});



  const [fieldErrors, setFieldErrors] = useState<{
    [key: string]: string | null;
  }>({});
  const [employeeData, setEmployeeData] = useState<EmployeeModel>({
    employeeId: employeeId,
    firstName: "",
    lastName: "",
    dateOfBirth: dayjs(todayDate).format("DD-MM-YYYY"),
    dateOfJoining: dayjs(todayDate).format("DD-MM-YYYY"),
    emailAddress: "",
    mobileNo: "",
    genderId: 0,
    designationId: 0,
    roleAssignId: 0,
    reportingPersonId: 0,
    isActive: false,
    designation: null,
    gender: null,
    role: null,
    reportingPerson: null
 

  });

  const handleFieldChange = (
    fieldName: keyof EmployeeModel,
    value: string | number | boolean
  ) => {
    setEmployeeData({ ...employeeData, [fieldName]: value });
    setFieldErrors((prev) => ({ ...prev, [fieldName]: null })); // Clear the error when the field changes
  };

  const handleDateChange = (name: string, date: Date | null) => {
    setEmployeeData({
      ...employeeData,
      [name]: date,
    });
    // differenceCehcker();

    // Test()
  };

  // const handledob = (
  //   fieldName: keyof EmployeeModel,
  //   value: string | number | boolean
  // ) => {
  //   // setEmployeeData({ ...employeeData, [fieldName]: value });
  //   setDob({...dob, [fieldName]: value})
  //   setFieldErrors((prev) => ({ ...prev, [fieldName]: null })); // Clear the error when the field changes
  // };

  // const handle = (
  //   fieldName: keyof EmployeeModel,
  //   value: string | number | boolean
  // ) => {
  //   // setEmployeeData({ ...employeeData, [fieldName]: value });
  //   setDob({...dob, [fieldName]: value})
  //   setFieldErrors((prev) => ({ ...prev, [fieldName]: null })); // Clear the error when the field changes
  // };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [designationResult, genderResult, roleResult, reportingPersonResult] = await Promise.allSettled([
          GetDesignationsAsync(),
          GetGendersAsync(),
          GetRoleAssignsAsync(),
          GetEmployeesAsync()
    
        ]);

        setDesignations(
          designationResult.status === "fulfilled"
            ? designationResult.value.data
            : []
        );
        setGenders(
          genderResult.status === "fulfilled" ? genderResult.value.data : []
        );
        setRoles(
          roleResult.status === "fulfilled" ? roleResult.value.data : []
        )
        setSelectedReportingPersons(
          reportingPersonResult.status === "fulfilled" ? reportingPersonResult.value.data : []
        )
      
       
        
    

        if (employeeId > 0) {
          try {
            const employeeResult = await GetEmployeeByIdAsync(employeeId);
            setEmployeeData(employeeResult.data);
            console.log(employeeResult.data);
            //alert(JSON.stringify(employeeResult.data));
          } catch (employeeError) {
            console.error("Error fetching employee data:", employeeError);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [employeeId]);

  const handleSubmit = async () => {
    setLoading(true);
    if (isFormValid()) {
      const createdEmployee =
        employeeData.employeeId > 0
          ? await updateEmployee(employeeData)
          : await createEmployee(employeeData);

      const { data, status, message } = createdEmployee;

      if (status === 200) {
        snackbar.showSnackbar(
          message,
          "success",
          { vertical: "top", horizontal: "center" },
          5000
        );
      } else {
        if (message.includes("IX_Employees_emailAddress")) {
          snackbar.showSnackbar(
            `The email address associated with this account, ${employeeData.emailAddress}, has already been registered. Please try using a different email address.`,
            "warning",
            { vertical: "top", horizontal: "center" },
            5000
          );
        } else {
          snackbar.showSnackbar(
            message,
            "error",
            { vertical: "top", horizontal: "center" },
            5000
          );
        }
      }
      setLoading(false);
    } else {
      setLoading(false);
      console.error("Form data is not valid.");
    }
  };
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  // Function to check if the date is in the correct format (DD/MM/YYYY)
const isDateFormatValid = (dateString:string) => {
  const dateFormatRegex = /^\d{2}\/\d{2}\/\d{4}$/; // DD/MM/YYYY format
  return dateFormatRegex.test(dateString);
};

// Function to check if the date is a valid date using Day.js
const isValidDate = (dateString:string) => {
  return dayjs(dateString, 'DD/MM/YYYY', true).isValid();
};

  const isFormValid = () => {
    const {
      firstName,
      lastName,
      genderId,
      designationId,
      roleAssignId,
      reportingPersonId,    
      emailAddress,
      mobileNo,
      dateOfBirth,
      dateOfJoining,
    } = employeeData;
    let valid = true;
    const dateFormatRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    // Date of Birth validation
    // if (dateOfBirth === null || dateOfBirth.toString() === "") {
    //   setFieldErrors((prev) => ({
    //     ...prev,
    //     dateOfBirth: "Date of Birth is required",
    //   }));
    //   valid = false;
    // } else if (
    //   !dayjs(dateOfBirth, { format: "DD/MM/YYYY" }).isValid() ||
    //   !dateOfBirth.toString().match(dateFormatRegex)
    // ) {
    //   setFieldErrors((prev) => ({
    //     ...prev,
    //     dateOfBirth: "Invalid date format for Date of Birth (dd/mm/yyyy)",
    //   }));
    //   valid = false;
    // } else {
    //   setFieldErrors((prev) => ({ ...prev, dateOfBirth: null }));
    //   valid = true;
    // }

    // Date of Joining validation
    // if (dateOfJoining === null || dateOfJoining.toString() === "") {
    //   setFieldErrors((prev) => ({
    //     ...prev,
    //     dateOfJoining: "Date of Joining is required",
    //   }));
    //   valid = false;
    // } else if (
    //   !dayjs(dateOfJoining, { format: "DD/MM/YYYY" }).isValid() ||
    //   !dateOfJoining.toString().match(dateFormatRegex)
    // ) {
    //   setFieldErrors((prev) => ({
    //     ...prev,
    //     dateOfJoining: "Invalid date format for Date of Joining (dd/mm/yyyy)",
    //   }));
    //   valid = false;
    // } else {
    //   setFieldErrors((prev) => ({ ...prev, dateOfJoining: null }));
    //   valid = true;
    // }



    const formatteddateOfJoining= dayjs(dateOfJoining).format('DD/MM/YYYY'); // Format the date
    const isFormatValid = isDateFormatValid(formatteddateOfJoining);
    const isValid = isValidDate(formatteddateOfJoining);

    const formatteddateOfBirth= dayjs(dateOfBirth).format('DD/MM/YYYY'); // Format the date
    const isFormatValiddob = isDateFormatValid(formatteddateOfBirth);
    const isValiddob = isValidDate(formatteddateOfBirth);

    //alert(formatteddateOfJoining);
    
    //alert(isFormatValid);
    //alert(isValid);

    if (isFormatValid && isValid) {
      setFieldErrors((prev) => ({ ...prev, dateOfJoining: null }));
     // valid = true;
    }else{
        setFieldErrors((prev) => ({
        ...prev,
        dateOfJoining: "Invalid date format for Date of Joining (dd/mm/yyyy) Or " +  formatteddateOfJoining,
      }));
      valid = false;
    }
    if (isFormatValiddob && isValiddob) {
      setFieldErrors((prev) => ({ ...prev, dateOfBirth: null }));
     // valid = true;
    }else{
        setFieldErrors((prev) => ({
        ...prev,
        dateOfBirth: "Invalid date format for Date of Birth (dd/mm/yyyy) Or " +  formatteddateOfBirth,
      }));
      valid = false;
    }

    if (firstName.trim() === "") {
      setFieldErrors((prev) => ({
        ...prev,
        firstName: "First Name is required",
      }));
      valid = false;
    } else {
      setFieldErrors((prev) => ({ ...prev, firstName: null }));
      //valid = true;
    }

    if (lastName.trim() === "") {
      setFieldErrors((prev) => ({
        ...prev,
        lastName: "Last Name is required",
      }));
      valid = false;
    } else {
      setFieldErrors((prev) => ({ ...prev, lastName: null }));
      //valid = true;
    }
    if (emailAddress.trim() === "") {
      setFieldErrors((prev) => ({
        ...prev,
        emailAddress: "Email Address is required",
      }));
      valid = false;
    } else if (!validateEmail(emailAddress)) {
      setFieldErrors((prev) => ({
        ...prev,
        emailAddress: "Invalid email format",
      }));
      valid = false;
    } else {
      setFieldErrors((prev) => ({ ...prev, emailAddress: null }));
    //  valid = true;
    }

    if (mobileNo.trim() === "") {
      setFieldErrors((prev) => ({ ...prev, mobileNo: "Mobile is required" }));
      valid = false;
    } else {
      setFieldErrors((prev) => ({ ...prev, mobileNo: null }));
     // valid = true;
    }

    if (genderId === 0) {
      setFieldErrors((prev) => ({ ...prev, genderId: "Gender is required" }));
      valid = false;
    } else {
      setFieldErrors((prev) => ({ ...prev, genderId: null }));
      //valid = true;
    }

    if (roleAssignId === 0) {
      setFieldErrors((prev) => ({ ...prev, roleAssignId: "Role is required"}));
      valid = false;
    } else {
      setFieldErrors((prev) => ({ ...prev, roleAssignId: null}));
     // valid = true;
    }

    if (reportingPersonId === 0) {
      setFieldErrors((prev) => ({ ...prev, reportingPersonId: "Reporting Person is required"}));
      valid = false;
    } else {
      setFieldErrors((prev) => ({ ...prev, reportingPersonId: null}));
      //valid = true;
    }


    if (designationId === 0) {
      setFieldErrors((prev) => ({
        ...prev,
        designationId: "Designation is required",
      }));
      valid = false;
    } else {
      setFieldErrors((prev) => ({ ...prev, designationId: null }));
     // valid = true;
    }

    return valid;
  };

  return {
    employeeData,
    designations,
    genders,
    selectedReportingPersons,
    roles,
    fieldErrors,
    snackbar,
    handleFieldChange,
    handleDateChange,
    handleSubmit,
    loading,
  };
};
