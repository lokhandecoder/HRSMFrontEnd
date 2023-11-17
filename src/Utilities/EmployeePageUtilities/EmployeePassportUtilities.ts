import { useState } from "react";
import useCustomSnackbar from "../../Components/CustomComponent/useCustomSnackbar";

interface PassportFormData {
  passportNumber: string;
  validity: string;
  visaType: string;
}

export const EmployeePassportUtilities = () => {
  const snackbar = useCustomSnackbar();
  const [formData, setFormData] = useState<PassportFormData>({
    passportNumber: '',
    validity: '',
    visaType: '',
  });

  const handleFieldChange = (fieldName: keyof PassportFormData, value: string) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = () => {
    console.log('Passport Form data:', formData);
    setFormData({
      passportNumber: '',
      validity: '',
      visaType: '',
    });
    snackbar.showSnackbar(
      "Passport Details Added Successfully",
      "success",
      { vertical: "top", horizontal: "center" },
      5000
    );
  };

  return {
    formData,
    handleFieldChange,
    handleSubmit,
    snackbar,
  };
};
