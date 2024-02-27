import axios from 'axios';
import { React, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Home() {
    const [details, setDetails] = useState([]);
    const [message, setMessage] = useState(false);

    function showdetails() {
        axios.get('http://localhost:5000/Home').then((result) => {
            setDetails(result.data);
            console.log(result);
        })
    }
    function bookSlot(Location) {
        // Assuming 'id' is the unique identifier for the center
        axios.post('http://localhost:5000/bookSlot', { Location}).then((result) => {
            setMessage(true);
          // Reload the details after booking a slot
          showdetails();
          toast.success("Slot booked successfully", {
            position: "top-right",
            autoClose: 3000, // Close the toast after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }).catch((err)=>{
            console.log("error while booking slot",err);
        });
      }
    return (

        <div>
            <button onClick={showdetails}>Details</button>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Center Name</th>
                            <th>Address</th>
                            <th>Location</th>
                            <th>From Date</th>
                            <th>End Date</th>
                            <th>Total Slots</th>
                            <th>slotBooking</th>
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
                                <td><button onClick={() => bookSlot(val.Location)}disabled={val.TotalSlots===0}>{val.TotalSlots===0 ?'booked':'book'}{message}</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Home