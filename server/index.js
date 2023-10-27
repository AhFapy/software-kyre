const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = "mongodb+srv://softwarekyre:f04E1rp7aHhlpNX4@software-kyre.cha0api.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

// Define your API routes here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
