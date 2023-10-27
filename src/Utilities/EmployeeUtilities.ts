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
export const EmployeeUtilities = (employeeId: number) => {
  const today = dayjs();
  const todayDate = today.toDate();
  const snackbar = useCustomSnackbar();

  const [roles, setRoles] = useState<ColumnHeaderModel[]>([]);
  const [designations, setDesignations] = useState<DesignationModel[]>([]);
  const [genders, setGenders] = useState<GenderModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    [key: string]: string | null;
  }>({});
  const [employeeData, setEmployeeData] = useState<EmployeeModel>({
    employeeId: employeeId,
    firstName: "",
    lastName: "",
    dateOfBirth: dayjs(todayDate).format("MM-DD-YYYY"),
    dateOfJoining: dayjs(todayDate).format("MM-DD-YYYY"),
    emailAddress: "",
    mobileNo: "",
    genderId: 0,
    designationId: 0,
    roleAssignId: 0,
    isActive: false,
    designation: null,
    gender: null,
    role: null,

  });

  /*
  const [employeeData, setEmployeeData] = useState<EmployeeModel>({
    employeeId: employeeId,
    firstName: "test",
    lastName: "test",
    dateOfBirth: dayjs(todayDate).format("MM-DD-YYYY"),
    dateOfJoining: dayjs(todayDate).format("MM-DD-YYYY"),
    emailAddress: "test@test.com",
    mobileNo: "test",
    genderId: 1,
    designationId: 1,
    isActive: false,
  });

  */
  const handleFieldChange = (
    fieldName: keyof EmployeeModel,
    value: string | number | boolean
  ) => {
    setEmployeeData({ ...employeeData, [fieldName]: value });
    setFieldErrors((prev) => ({ ...prev, [fieldName]: null })); // Clear the error when the field changes
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [designationResult, genderResult, roleResult] = await Promise.allSettled([
          GetDesignationsAsync(),
          GetGendersAsync(),
          GetRoleAssignsAsync()
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
  const isFormValid = () => {
    const {
      firstName,
      lastName,
      genderId,
      designationId,
      roleAssignId,
      emailAddress,
      mobileNo,
      dateOfBirth,
      dateOfJoining,
    } = employeeData;
    let valid = true;
    const dateFormatRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    // Date of Birth validation
    if (dateOfBirth === null || dateOfBirth.trim() === "") {
      setFieldErrors((prev) => ({
        ...prev,
        dateOfBirth: "Date of Birth is required",
      }));
      valid = false;
    } else if (
      !dayjs(dateOfBirth, { format: "DD/MM/YYYY" }).isValid() ||
      !dateOfBirth.match(dateFormatRegex)
    ) {
      setFieldErrors((prev) => ({
        ...prev,
        dateOfBirth: "Invalid date format for Date of Birth (dd/mm/yyyy)",
      }));
      valid = false;
    } else {
      setFieldErrors((prev) => ({ ...prev, dateOfBirth: null }));
    }

    // Date of Joining validation
    if (dateOfJoining === null || dateOfJoining.trim() === "") {
      setFieldErrors((prev) => ({
        ...prev,
        dateOfJoining: "Date of Joining is required",
      }));
      valid = false;
    } else if (
      !dayjs(dateOfJoining, { format: "DD/MM/YYYY" }).isValid() ||
      !dateOfJoining.match(dateFormatRegex)
    ) {
      setFieldErrors((prev) => ({
        ...prev,
        dateOfJoining: "Invalid date format for Date of Joining (dd/mm/yyyy)",
      }));
      valid = false;
    } else {
      setFieldErrors((prev) => ({ ...prev, dateOfJoining: null }));
    }

    if (firstName.trim() === "") {
      setFieldErrors((prev) => ({
        ...prev,
        firstName: "First Name is required",
      }));
      valid = false;
    } else {
      setFieldErrors((prev) => ({ ...prev, firstName: null }));
    }

    if (lastName.trim() === "") {
      setFieldErrors((prev) => ({
        ...prev,
        lastName: "Last Name is required",
      }));
      valid = false;
    } else {
      setFieldErrors((prev) => ({ ...prev, lastName: null }));
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
    }

    if (mobileNo.trim() === "") {
      setFieldErrors((prev) => ({ ...prev, mobileNo: "Mobile is required" }));
      valid = false;
    } else {
      setFieldErrors((prev) => ({ ...prev, mobileNo: null }));
    }

    if (genderId === 0) {
      setFieldErrors((prev) => ({ ...prev, genderId: "Gender is required" }));
      valid = false;
    } else {
      setFieldErrors((prev) => ({ ...prev, genderId: null }));
    }

    if (roleAssignId === 0) {
      setFieldErrors((prev) => ({ ...prev, roleAssignId: "Role is required"}));
      valid = false;
    } else {
      setFieldErrors((prev) => ({ ...prev, roleAssignId: null}));
    }

    if (designationId === 0) {
      setFieldErrors((prev) => ({
        ...prev,
        designationId: "Designation is required",
      }));
      valid = false;
    } else {
      setFieldErrors((prev) => ({ ...prev, designationId: null }));
    }

    return valid;
  };

  return {
    employeeData,
    designations,
    genders,
    roles,
    fieldErrors,
    snackbar,
    handleFieldChange,
    handleSubmit,
    loading,
  };
};
