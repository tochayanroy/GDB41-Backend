const express = require('express');
const app = express();

const dotenv = require('dotenv');

const db = require('./config/db');

dotenv.config();


app.listen(process.env.PORT, ()=>{
    console.log(`Server is Running on PORT ${process.env.PORT}`);
});