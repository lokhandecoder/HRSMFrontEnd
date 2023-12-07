import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams to get the ID from the route params
import { API_URL } from "../APIConfig";
import useCustomSnackbar from "../Components/CustomComponent/useCustomSnackbar";

export const UpdatePasswordUtilities = () => {
  const snackbar = useCustomSnackbar();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setFieldErrors({ password: "", confirmPassword: "" });
  }, [formData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const { password, confirmPassword } = formData;

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!password.match(passwordRegex)) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "Password must contain at least 8 characters, including one letter, one number, and one special character (@$!%*#?&).",
      }));
      setLoading(false);
      return;
    }
    if (!password) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required.",
      }));
      setLoading(false);

      return;
    }

    if (!confirmPassword) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Please confirm your password.",
      }));
      setLoading(false);

      return;
    }

    if (password !== confirmPassword) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Password does not match.",
      }));
      setLoading(false);

      return;
    }

    Axios.post(`${API_URL}employee/UpdateEmployeePassword`, {
      employeeId: id,
      password: password,
    })
      .then((response) => {
        console.log(`${API_URL}employee/UpdateEmployeeAsync`, response.data);
        snackbar.showSnackbar(
          "Password Change Successfully",
          "success",
          { vertical: "top", horizontal: "center" },
          5000
        );
        setLoading(false);
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      })
      .catch((error) => {
        console.error("Error submitting:", error);
        snackbar.showSnackbar(
          "Failed to Change Password",
          "error",
          { vertical: "top", horizontal: "center" },
          5000
        );
        setLoading(false);
      });
  };

  return {
    handleInputChange,
    handleSubmit,
    formData,
    fieldErrors,
    snackbar,
  };
};
