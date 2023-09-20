const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { connect } = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

connect();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/admin", require("./router/admin"));
app.use("/customers", require("./router/customers"));

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
