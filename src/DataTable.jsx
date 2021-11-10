import "./DataTable.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState,useEffect } from "react";
import axios from "axios";

const DataTable = () => {
  
  const [searchWord, setSearchWord] = useState([]);//search box state    

  const [respArray,setRespArray] = useState([]) //inserting data in table on each search

  useEffect(() => {
    console.log("resparray", respArray);
  }, [respArray]);

  const getData = async ()=>{
    try{
      const resp = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`);   

      setRespArray([...respArray, resp.data[0]]);            

    }catch(err){
      console.log(err);
    }    
  }
  return (
    <>
      <h1>Dictionary</h1>
      <input type="text" autoFocus="on" placeholder="Search..." onChange={(e)=>setSearchWord(e.target.value)}/>
      <button className='btn btn-success' onClick={getData} >Submit</button>

      <div className="container mt-5">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Sl No</th>
                <th>Word</th>
                <th>Definition</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody className="bg-#fff bg-gradient">                            
                
                {respArray.map((item,index)=>(
                  <tr key={index} >
                    <td>{index}</td>
                    <td>{item.word}</td>
                    <td>{item.meanings[0].definitions[0].definition}</td>
                    <td>{item.meanings[0].definitions[0].example}</td>
                </tr>
                ))}
               
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default DataTable;
