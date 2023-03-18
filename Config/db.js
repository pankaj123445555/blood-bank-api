const mongoose = require("mongoose");
const db = 'mongodb+srv://pankaj_234:pankaj123@cluster0.vtywnzi.mongodb.net/?retryWrites=true&w=majority';

async function connectDB() {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected successfully");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = {connectDB};