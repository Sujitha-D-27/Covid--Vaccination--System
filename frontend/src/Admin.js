import axios from 'axios';
import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
function Admin() {
  

  const [details, setDetails] = useState([]);
    
    function showdetails() {
        axios.get('https://covid-vaccination-system-sujitha.onrender.com/Home').then((result) => {
            setDetails(result.data);
            console.log(result);
        })
    }
function bookSlot(Location) {
      // Assuming 'id' is the unique identifier for the center
      axios.post('https://covid-vaccination-system-sujitha.onrender.com/AddSlot', { Location}).then((result) => {
          console.log(result);
        // Reload the details after booking a slot
        showdetails();
      }).catch((err)=>{
        console.log("error while adding slots",err);
      });
    }
    
  return (
  <div>
  
<div className="navbar">
<h1>Admin Page</h1>
    <button className="nav-btn" onClick={showdetails}>Details</button>
    <Link to="/center" className="nav-btn">
        <button className="login control">Add new center</button>
    </Link>
    </div>
        <table>
                    <thead>
                        <tr>
                            <th>Center Name</th>
                            <th>Address</th>
                            <th>Location</th>
                            <th>From Date</th>
                            <th>End Date</th>
                            <th>Total Slots</th>
                            <th>AddingSlot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map((val, id) => (
                            <tr key={id}>
                                <td>{val.Center_name}</td>
                                <td>{val.Address}</td>
                                <td>{val.Location}</td>
                                <td>{val.Fromdate}</td>
                                <td>{val.Enddate}</td>
                                <td>{val.TotalSlots}</td>
                                <td><button onClick={() => bookSlot(val.Location)}>Add</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
    </div>
  )
}

export default Admin