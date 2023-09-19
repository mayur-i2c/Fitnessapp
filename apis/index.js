const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true, useUnifiedTopology: true}
)

const db = mongoose.connection;
db.on('error',console.error.bind(console, "Connection Error"));
db.once('open',function(){
    console.log("Connected Successfully");
})