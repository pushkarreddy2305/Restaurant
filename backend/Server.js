const express = require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cities = require('./City');
const restas = require('./RestData');
let restaRoute = require('./routes/restaRoute');
let City =require('./models/cityModel') ;
let Resta=require('./models/restaModel');
require('dotenv').config();     
// import data from './data'
const app=express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(
    cors({
      origin: [
        "http://localhost:3000",
      ],
      methods: ["GET", "HEAD", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
      credentials: true //allow setting of cookies
    })
  );
const uri ='mongodb://localhost:27017/restaurant'
mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology:true })
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("mongoose connection success");
    // Resta.insertMany(restas);
    // City.insertMany(cities)
});
app.use('/api/products', restaRoute);

app.listen(5000, ()=>{console.log('server has started')})