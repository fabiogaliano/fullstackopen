const config = require("./utils/config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("express-async-errors");

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const errorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }
  next(error);
};

app.use(cors());
app.use(express.json());

app.use("/api/blogs", require("./controllers/blogs"));

app.use(errorHandler);
module.exports = app;