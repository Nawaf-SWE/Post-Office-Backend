const express = require('express');
const app = express()
require("dotenv").config();
const {connect} = require("./config/db");
const { cities, packages } = require('./models');

connect();

app.use(express.json({limit: "50MB"}));

app.get("/", async (req, res) => {
   const data = await cities.findAll({ 
    where: {},
    include: [
    {
        model: packages,
        as: "sender_city_packages",
    }
   ],
});
   res.send(data);
});

app.listen(process.env.PORT,()=>{
   console.log(`Server listening on port ${process.env.PORT}`);
})