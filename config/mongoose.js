const mongoose = require("mongoose");
require('dotenv').config();
const db_url = process.env.MONGODB_URI;
mongoose.connect(db_url);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error conecting to MongoDB"));
db.once("open", () => {
    console.log("Connected to database :: MongoDB");
})

