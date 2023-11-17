import { useState } from "react";
import useCustomSnackbar from "../../Components/CustomComponent/useCustomSnackbar";

interface FormData {
    bankName: string;
    accountNumber: string;
    IFSCCode: string;
  }

export const EmployeeBankDetailsUtilities = () => {
    const snackbar = useCustomSnackbar();
    const [formData, setFormData] = useState<FormData>({
        bankName: '',
        accountNumber: '',
        IFSCCode: '',
      });
    
      const handleFieldChange = (fieldName: keyof FormData, value: string) => {
        setFormData({
          ...formData,
          [fieldName]: value,
        });
      };
    
      const handleSubmit = () => {
        console.log('Form data:', formData);
        setFormData({
          bankName: '',
          accountNumber: '',
          IFSCCode: '',
        });
        snackbar.showSnackbar(
            "Bank Details Added Successfully",
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
