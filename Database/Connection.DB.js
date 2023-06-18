const mongoose = require("mongoose");
const { mongoDB } = require("../Config/confg");

mongoose.set("strictQuery", true);
const connectDataBase = () => {
  mongoose
    .connect(
     mongoDB,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    )
    .then((data) => {
      console.log(`MongoDB Connected With Server ${data.connection.host}`);
    });
};

module.exports = connectDataBase;
