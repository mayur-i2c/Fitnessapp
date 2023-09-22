const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
var bodyParser = require("body-parser");
const cors = require("cors");


// Get error controller
const errorController = require("./helper/errorController");


mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true, useUnifiedTopology: true}
)

app.use(cors());
app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    
// app.use(express.json());

const adminRoute = require("./routes/admin/admin");
app.use("/admin", adminRoute);


//App route
const userRoute = require('./routes/app/user');
app.use("/app/user",userRoute);

// Error handling middleware
app.use(errorController);

const db = mongoose.connection;
db.on('error',console.error.bind(console, "Connection Error"));
db.once('open',function(){
    // console.log("Connected Successfully");
})

var server = app.listen(5000);