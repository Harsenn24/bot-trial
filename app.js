const cors = require("cors");
require("dotenv").config()
const express = require("express");
const app = express();
const { router } = require("./router");
const port = 3005


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

