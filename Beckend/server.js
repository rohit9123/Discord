const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`sever started ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
