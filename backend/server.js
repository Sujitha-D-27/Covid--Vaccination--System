const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "bykcytfukyb7hknuasxi-mysql.services.clever-cloud.com",
    user: "uzoqasoch0enqd8h",
    password: "ESxDMNnaReJNaFJiX26z",
    database: "bykcytfukyb7hknuasxi"
})
/*db.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("success");
    }
 })*/
app.post('/signup', (req, res) => {
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    const sql = "INSERT INTO signindetails(`name`,`email`,`password`)VALUES(?,?,?)";

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    });
});

app.post('/loginn', (req, res) => {
    const mail = req.body.email;
    const pwd = req.body.password;

    const admin = "sujithadevaraj27@gmail.com";
    const adminpwd = "Ganesha5";
    db.query("SELECT * FROM  signindetails WHERE email=? AND password=? ", [mail, pwd], (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
        else if (mail === admin && pwd === adminpwd ) {
            console.log("Admin is in danger");
            return res.status(200).json({ role: "admin" });
        }
        else if (data.length > 0) {
            console.log("User is in cheer up!!");
            return res.status(200).json({ role: "user" });
        }
        else {
            console.log("Invalid credentials");
            return res.status(401).json({ message: "Invalid credentials" });
        }
    });
});

app.get('/Home', (req, res) => {
    db.query('SELECT distinct * FROM coviddetails', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.status(200).json(data);
        }
    });
})

app.post('/bookSlot', (req, res) => {
    const Centerlocation = req.body.Location;

    db.query('UPDATE  coviddetails SET TotalSlots = TotalSlots - 1 WHERE Location = ? and TotalSlots >0', [Centerlocation], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send( {message:"Internal Server Error"});
        } else {
            res.status(200).send({ message:"Slot booked successfully"});
        }
    });
});
app.post('/AddSlot', (req, res) => {
    const centerlocation = req.body.Location;

    db.query('UPDATE coviddetails SET TotalSlots = TotalSlots + 1 WHERE Location = ? ', [centerlocation], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send( {message:"Internal Server Error"});
        } else {
            res.status(200).send({ message:"Slot booked successfully"});
        }
    });
});
app.post('/addcenter', (req, res) => {
    const values = [
        req.body.centername,
        req.body.address,
        req.body.location,
        req.body.fdate,
        req.body.edate,
        req.body.tslots
    ];
    const sql = "INSERT INTO coviddetails(`Center_name`,`Address`,`Location`,`Fromdate`,`Enddate`,`TotalSlots`)VALUES(?,?,?,?,?,?)";

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error during center insertion:', err);
            return res.status(500).json({ success: false, message: 'Failed to add center', error: err.message });
        }
        
        return res.json({ success: true, message: 'Center added successfully' });
    });
});

app.listen(5000, () => {
    console.log("server is running");
});