const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const port = 1425;
dotenv.config({ path: "./.env" });

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("DB connection secured !!");
  })
  .catch((e) => {
    console.log(e.message);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log("The server is running on port:" + port);
});
