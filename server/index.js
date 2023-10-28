const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const app = express();
const port = process.env.PORT || 3000;
const mongoURI = "mongodb+srv://softwarekyre:f04E1rp7aHhlpNX4@software-kyre.cha0api.mongodb.net/?retryWrites=true&w=majority";
const cors = require('cors'); // Import the cors package
const flash = require('connect-flash');

const passportRoutes = require("./routes/passportRoutes");

app.use(
  session({
    secret: 'kyre-key', // Replace with a strong, random key
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use("/passport", passportRoutes);

app.get('/', (req, res) => {
  // You can send a response, render a view, or redirect to another page here
  // For example, you can send your React app's HTML or render your landing page
  res.send(JSON.stringify('welcome to My App'));
});


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
