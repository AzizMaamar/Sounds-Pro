import React, {useState, useEffect} from 'react'
import axios from "axios"
import parse from 'html-react-parser';
const CompareScreen =  () => 
{
  const [data, setData] = useState([])
    useEffect(() => {
      if(!data.length) products()
    }, [])
    
   const products = async() => {
    const res =  await axios.get(`http://localhost:5000/api/products/compare`);
    res.data.map((prod)=>{
      const parsedData = parse(prod.productDescription)
      setData(old=> [...old,{description:parsedData, name:prod.productName}])
    })
   }
   
 
  return (
    <div>
       { data.length && data.map((prod)=>
          <><h1>{prod.name}</h1>
         <div>{prod.description}</div>
         </>
      )} 
    </div>
  )
}

export default CompareScreen