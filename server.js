const express = require('express');
const app = express()
require("dotenv").config();
const {connect} = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

connect();

app.use(express.json({limit: "50MB"}));

app.use("/admin",require("./router/admin"));
app.use("/customers",require("./router/customers"));

app.use(errorHandler);

app.listen(process.env.PORT,()=>{
   console.log(`Server listening on port ${process.env.PORT}`);
})