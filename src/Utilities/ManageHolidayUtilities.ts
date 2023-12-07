import { ManageHolidayModel } from "../Model/ManageHolidayModel";
import React, { useState, useEffect, ChangeEvent } from "react";
import {
  CreateHoliday,
  DeleteHoliday,
  GetHolidaysAsync,
  UpdateHoliday,
} from "../Services/HolidaysServices";
import dayjs, { Dayjs } from "dayjs"; //
import { Holiday } from "../Components/HomePageComponents/UpcomingHolidays";
import { HolidayModel } from "../Model/HolidayModel";
import useCustomSnackbar from "../Components/CustomComponent/useCustomSnackbar";
import { send } from "process";

export const ManageHolidayUtilities = () => {
  const today = dayjs();
  const todayDate = today.toDate();
  const snackbar = useCustomSnackbar();
  const [formData, setFormData] = useState<ManageHolidayModel>({
    // id: 0,
    holidayName: "",
    HolidayDate: dayjs(todayDate).format("YYYY-MM-DD"),
  });
  const [fieldErrors, setFieldErrors] = useState<{
    [key: string]: string | null;
  }>({});
  const [holidayName, setHolidayName] = useState(""); // State to store the holiday name
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null); // Define the type for selectedDate
  const [data, setData] = useState<Holiday[]>([]);
  const [editableRows, setEditableRows] = useState<Record<number, boolean>>({});
  const [editingRowId, setEditingRowId] = useState<number | null>(null); //

  const fetchList = async () => {
    try {
      const fetchData = await GetHolidaysAsync();
      const fetched = fetchData.data;
      if (Array.isArray(fetched)) {
        setData(fetched);
        initializeEditableRows(fetched.length);
      } else {
        console.error("Invalid holidays data.");
      }
    } catch (error) {
      console.error("Error fetching leave types:", (error as Error).message);
    }
  };
  useEffect(() => {
    
    fetchList();
  }, []);

  const handleDateChange = (name: string, date: Date | null) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  const handleAddHoliday = async () => {
    if (formData && formData.holidayName && formData.HolidayDate) {
      if(formData.holidayName === ""){
        // setFieldErrors((prev) => ({
        //   ...prev,
        //   holidayName: "Holiday Name  is required",
        // }));
      }else{
        // setFieldErrors((prev) => ({ ...prev, holidayName: null }));
        try {
          // Format the date in the desired format ("YYYY-MM-DD") before sending
          const formattedDate = dayjs(formData.HolidayDate).format("YYYY-MM-DD");
    
          const dataToSend = {
            ...formData,  
            HolidayDate: formattedDate,
          };
    
          const sendData = await CreateHoliday(dataToSend);
          if(sendData.status === 200 ){
            snackbar.showSnackbar(
              sendData.message,
              "success",
              { vertical: "top", horizontal: "center" },
              5000
            );
            fetchList()
          }else{
            snackbar.showSnackbar(
              sendData.message,
              "error",
              { vertical: "top", horizontal: "center" },
              5000
            );
          }
          console.log("Holiday successfully created:", sendData);

        } catch (error) {
          console.error("Error creating holiday:", error);
          snackbar.showSnackbar(
            "Failed to Add Holiday",
            "error",
            { vertical: "top", horizontal: "center" },
            5000
          );
        }
      }
      
    } else {
      console.error("Please fill in both holiday name and select a date.");
      snackbar.showSnackbar(
        "Please fill in both holiday name and select a date.",
        "error",
        { vertical: "top", horizontal: "center" },
        5000
      );
    }
  };
  const initializeEditableRows = (length: number) => {
    const initialRowsState: Record<number, boolean> = {};
    for (let i = 0; i < length; i++) {
      initialRowsState[i] = false;
    }
    setEditableRows(initialRowsState);
  };


  const handleEdit = (id: number) => {
    const editingHoliday = data.find((holiday) => holiday.id === id);

    if (editingHoliday) {
      const updatedEditableRows = { ...editableRows };
      updatedEditableRows[id] = true;
      setEditableRows(updatedEditableRows);
      setEditingRowId(id); // Set currently editing row ID

      setFormData({
        holidayName: editingHoliday.holidayName,
        HolidayDate: editingHoliday.holidayDate,
      });

    }
  };

  const handleUpdate = async () => {
    if (formData && formData.holidayName && formData.HolidayDate && editingRowId !== null) {
      try {
        // Format the date in the desired format ("YYYY-MM-DD") before sending
        const formattedDate = dayjs(formData.HolidayDate).format("YYYY-MM-DD");
  
        const updatedHolidayData: HolidayModel = {
          id: editingRowId,
          holidayName: formData.holidayName,
          HolidayDate: formattedDate,
        };
  
        const sendData = await UpdateHoliday(updatedHolidayData);
        if(sendData.status === 200 ){
          snackbar.showSnackbar(
            sendData.message,
            "success",
            { vertical: "top", horizontal: "center" },
            5000
          );
          fetchList();
        }else{
          snackbar.showSnackbar(
            "Failed to Add Holiday 2",
            "error",
            { vertical: "top", horizontal: "center" },
            5000
          );
        }
        console.log("Holiday successfully Updated:", sendData);
  
        // Rest of your code for updating state etc.
      } catch (error) {
        console.error("Error updating holiday:", error);
      }
    } else {
      console.error("Please fill in both holiday name and select a date.");
      snackbar.showSnackbar(
        "Please fill in both holiday name and select a date.",
        "error",
        { vertical: "top", horizontal: "center" },
        5000
      );
    }
  };



  const handleFieldChange = (
    fieldName: keyof ManageHolidayModel,
    value: string | number | boolean
  ) => {
    setFormData({ ...formData, [fieldName]: value });
    // setFieldErrors((prev) => ({ ...prev, [fieldName]: null })); // Clear the error when the field changes
  };


  const handleDelete = async (id: number) => { // Mark the function as async
    const editingHoliday = data.find((holiday) => holiday.id === id);
  
    if (editingHoliday) {
      try {
        const fetchData = await DeleteHoliday(id); // Assuming DeleteHoliday returns a Promise
        const fetched = fetchData.data;
        console.log("delete", fetchData.status)
        if(fetchData.status === 200){
          snackbar.showSnackbar(
            "Deleted Successfully",
            "success",
            { vertical: "top", horizontal: "center" },
            5000
          );
          fetchList()
        }else{
          snackbar.showSnackbar(
            "Failed to Delete Data",
            "error",
            { vertical: "top", horizontal: "center" },
            5000
          );
        }

        // Further logic with fetched data
  
      } catch (error) {
        console.error("Error fetching leave types:", (error as Error).message);
      }
    }
  }
  
  return {
    selectedDate,
    handleDateChange,
    holidayName,
    setHolidayName,
    handleAddHoliday,
    data,
    handleEdit,
    handleUpdate,
    editingRowId,
    formData,
    handleFieldChange,
    fieldErrors,
    snackbar,
    handleDelete,
  };
};
