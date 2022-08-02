const mongoose = require("mongoose");
require('dotenv').config();
 
const URI=process.env.MONGODB_URI;
main().catch(err => console.log("Cannot run database"));

async function main() {
  await mongoose.connect(URI);
  console.log("Database successfully accessed");
}
const db=mongoose.connection;

module.exports=db;

