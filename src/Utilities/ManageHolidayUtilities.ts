import { ManageHolidayModel } from "../Model/ManageHolidayModel";
import React, { useState, useEffect, ChangeEvent } from "react";
import { CreateHoliday, GetHolidaysAsync, UpdateHoliday } from "../Services/HolidaysServices";
import dayjs, { Dayjs } from "dayjs"; //
import { Holiday } from "../Components/HomePageComponents/UpcomingHolidays";

export const ManageHolidayUtilities = () => {
  const [holidayName, setHolidayName] = useState(""); // State to store the holiday name
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null); // Define the type for selectedDate
  const [data, setData] = useState<Holiday[]>([]);
  const [editableRows, setEditableRows] = useState<Record<number, boolean>>({});
  const [editingRowId, setEditingRowId] = useState<number | null>(null); //
  const handleDateChange = (date: Dayjs | null) => {
    // Define the type for the 'date' parameter
    setSelectedDate(date);
  };

  const handleAddHoliday = async () => {
    if (holidayName && selectedDate) {
      // const formattedDate = selectedDate.toDate(); // Convert Dayjs to Date object
      const formattedDate = selectedDate.startOf("day").toDate(); // Extract only the date part

      const holidayData: ManageHolidayModel = {
        id: editingRowId !== null ? editingRowId : 0, // Provide a default value when editingRowId is null
        holidayName: holidayName,
        HolidayDate: formattedDate,
      };
      console.log("holidayData", holidayData);

      try {
        const sendData = await CreateHoliday(holidayData);
        console.log("Holiday successfully created:", sendData);
      } catch (error) {
        console.error("Error creating holiday:", error);
      }
    } else {
      console.error("Please fill in both holiday name and select a date.");
    }
  };
  const initializeEditableRows = (length: number) => {
    const initialRowsState: Record<number, boolean> = {};
    for (let i = 0; i < length; i++) {
      initialRowsState[i] = false;
    }
    setEditableRows(initialRowsState);
  };

  //   const handleEdit = (index: number) => {
  //     const updatedEditableRows = { ...editableRows };
  //     updatedEditableRows[index] = true;
  //     setEditableRows(updatedEditableRows);
  //     setEditingRowId(index); // Set currently editing row ID
  //   };
  const handleEdit = (id: number) => {
    const editingHoliday = data.find((holiday) => holiday.id === id);
  
    if (editingHoliday) {
      const updatedEditableRows = { ...editableRows };
      updatedEditableRows[id] = true;
      setEditableRows(updatedEditableRows);
      setEditingRowId(id); // Set currently editing row ID
  
      setHolidayName(editingHoliday.holidayName);
      setSelectedDate(dayjs(editingHoliday.holidayDate));
    }
  };

  const handleUpdate = async () => {
    if (holidayName && selectedDate && editingRowId !== null) {
      const formattedDate = selectedDate.startOf("day").toDate();

      const updatedHolidayData: ManageHolidayModel = {
        id : editingRowId,
        holidayName: holidayName,
        HolidayDate: formattedDate,
      };

      try {
        console.log("updatedHolidayData",updatedHolidayData )
        // Assuming you have an UpdateHolidayAsync function in your service to update the holiday data
        // const updatedData = await UpdateHolidayAsync(editingRowId, updatedHolidayData);
        const sendData = await UpdateHoliday(updatedHolidayData);
        console.log("Holiday successfully Updated:", sendData);
        // Update the data with the updated holiday details returned from the API
        const updatedHolidays = [...data];
        // updatedHolidays[editingRowId] = updatedData;

        // Update the state with the modified data
        setData(updatedHolidays);
        setEditableRows({ ...editableRows, [editingRowId]: false });
        setEditingRowId(null);
      } catch (error) {
        console.error("Error updating holiday:", error);
      }
    } else {
      console.error("Please fill in both holiday name and select a date.");
    }
  };

  useEffect(() => {
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
    fetchList();
  }, []);
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
  };
};
