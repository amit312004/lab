const  express = require('express');
const app =  express();
const bodyParser = require("body-parser");
const PORT = 3000;
const cors= require('cors');
app.use(bodyParser.json());
app.use(cors());
require('./connection.js');
const TestRoute = require("./routes/testRoutes.js");
app.use('/test',TestRoute);

app.listen(PORT,()=>{
    console.log("local host is running on the port no.3000");
})