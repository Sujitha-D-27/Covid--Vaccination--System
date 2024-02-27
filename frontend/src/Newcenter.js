
import axios from 'axios';
import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Newcenter.css';

function Newcenter() {
    const [values, setValues] = useState({
        centername: '',
        address: '',
        location: '',
        fdate: '',
        edate: '',
        tslots: ''
    })
    const navigate = useNavigate();
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }
    const handlesubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/addcenter', values);

            if (response.data.success) {
                console.log('Center added successfully');
                navigate('/Admin');
            } else {
                console.log('Failed to add center:', response.data.message, response.data.error);

            }
        }
        catch (error) {
            console.error('Error during addition of center:', error.response ? error.response.data : error.message);

        }
    }

    return (
        <div className="newcontainer">
            <h2>New center</h2>
            <form className="center-form" >
                <div className="new-group">
                    <label>Centername</label>
                    <input type="text" className="new-control" placeholder="Enter centername" name="centername" onChange={handleInput} />

                </div>
                < div className="new-group">
                    <label>Address</label>
                    <input type="text" className="new-control" placeholder="Enter address" name="address" onChange={handleInput} />


                </div>
                <div className="new-group">
                    <label>Location</label>
                    <input type="text" className="new-control" placeholder="Enter location" name="location" onChange={handleInput} />

                </div>
                <div className="new-group">
                    <label>From date</label>
                    <input type="date" className="new-control" name="fdate" onChange={handleInput} />

                </div>
                <div className="new-group">
                    <label>End date</label>
                    <input type="date" className="new-control" name="edate" onChange={handleInput} />

                </div>
                <div className="new-group">
                    <label>Total Slots</label>
                    <input type="text" className="new-control" placeholder="Enter total slots" name="tslots" onChange={handleInput} />

                </div>


                <Link to="/Admin">
                    <button type="submit" className="addbtn" onClick={handlesubmit} >Add new center</button>
                </Link>

            </form>
        </div>
    )
}


export default Newcenter;