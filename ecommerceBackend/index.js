const express = require('express');
const app = express();
const passport = require('passport')

const dotenv = require('dotenv');


const db = require('./config/db');
require('./middleware/passport-config');

const userRoutes = require('./routes/userRoutes')
dotenv.config();
app.use(express.json())
app.use(passport.initialize());

app.use('/user', userRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`Server is Running on PORT ${process.env.PORT}`);
});