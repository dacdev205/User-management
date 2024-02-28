//import
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const dotenv = require('dotenv');
dotenv.config();
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("uploads"));
//database connection
mongoose.connect((process.env.DB_URL), () =>  {
    console.log("Connected to database");
});
//routes prefix
app.use("/api/user", require("./routes/routes"))

app.listen(port, () => console.log(`listening at http://localhost:${port}`));