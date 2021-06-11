const mongoose = require("mongoose");

const DB_URI =
  //"mongodb+srv://amir:aamir123@cluster0.0fib0.mongodb.net/CMS?retryWrites=true&w=majority"
  "mongodb://127.0.0.1:27017/school";
  //"mongodb+srv://asim:123@cluster0-ojxvp.mongodb.net/test?retryWrites=true";
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connect Successful"))
  .catch((err) => console.log("DB not connect" + err));
