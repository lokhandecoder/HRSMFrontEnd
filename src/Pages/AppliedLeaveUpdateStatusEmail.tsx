import { useParams,  } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import { AppliedLeaveUpdateStatusByEmailAsync } from '../Services/EmployeeLeaveApplyServices';
const AppliedLeaveUpdateStatusEmail = () => {
    const { code } = useParams();
    const [data, setData] = useState({status: 200, message : ''}); // Specify the type for data
    const[count, setCount] = useState(0)
    const renderAfterCalled =useRef(false);
    
  useEffect(() => {
   
    // if (count==0){
    //     fetchData();
    // }
    if(!renderAfterCalled.current) 
     fetchData();
  
  }, []);

  const fetchData = async () => {
    try {
      const data = await AppliedLeaveUpdateStatusByEmailAsync(code || '');
      setData(data);
      console.log(data);
      setCount(1);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

    return ( <>
    {data?.message}
    </>  );
}
 
export default AppliedLeaveUpdateStatusEmail;