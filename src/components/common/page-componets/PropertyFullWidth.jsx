import { useSelector } from "react-redux";
import { dataStore } from "../../../features/dataSlice";
import SingleProductCardFullWidth from "./SingleProductCardFullWidth";
import { useEffect, useState } from "react";
const PropertyFullWidth = () => {
  const { currentDataItems } = useSelector(dataStore);


  const [properties , setProperties ] = useState([])

  async function getData(){
    let data = await fetch(`${process.env.REACT_APP_SERVER_URL}/get-properties`);
    data = await data.json();
    console.log(data);
    
    setProperties(data.data)
  }  

  useEffect(()=>{
    getData();
  },[])


  return (
    <div>
      {properties?.map((property) => (
        <SingleProductCardFullWidth key={property.id} {...property} />
      ))}
    </div>
  );
};

export default PropertyFullWidth;
