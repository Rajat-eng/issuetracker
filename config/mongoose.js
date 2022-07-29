const mongoose = require("mongoose");
require('dotenv').config();
 
main().catch(err => console.log("Cannot run database"));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/issue_tracker_dev');
  console.log("Database successfully accessed");
}
const db=mongoose.connection;

module.exports=db;

