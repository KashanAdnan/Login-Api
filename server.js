const express = require("express");
const app = express();
const connectDataBase = require("./Database/Connection.DB");
const UserRoute = require("./Routes/User.Route");
const body_parser = require("body-parser");
const { PORT } = require("./Config/confg")

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

app.use("/api", UserRoute);

connectDataBase();

app.listen(PORT, () => {
  console.log(`listening on Port ${PORT}`);
});
