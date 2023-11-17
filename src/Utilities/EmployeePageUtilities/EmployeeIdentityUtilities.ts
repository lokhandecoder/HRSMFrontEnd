import { useState } from "react";
import useCustomSnackbar from "../../Components/CustomComponent/useCustomSnackbar";

interface IdentityFormData {
  aadharCard: string;
  panCard: string;
  voterId: string;
  UAN: string,
}

export const EmployeeIdentityUtilities = () => {
  const snackbar = useCustomSnackbar();
  const [formData, setFormData] = useState<IdentityFormData>({
    aadharCard: '',
    panCard: '',
    voterId: '',
    UAN : ','
  });

  const handleFieldChange = (fieldName: keyof IdentityFormData, value: string) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = () => {
    console.log('Identity Form data:', formData);
    setFormData({
      aadharCard: '',
      panCard: '',
      voterId: '',
      UAN : "",
    });
    snackbar.showSnackbar(
      "Identity Details Added Successfully",
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
