require('dotenv').config(); // Load .env file
const express = require("express");
const mongoose = require('mongoose');

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Build MongoDB URI from environment variables
const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoDB = process.env.MONGO_DB || 'dd_db';
const mongoUser = process.env.MONGO_USERNAME || '';
const mongoPass = process.env.MONGO_PASSWORD || '';

const mongoURI = mongoUser
  ? `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:27017/${mongoDB}`
  : `mongodb://${mongoHost}:27017/${mongoDB}`;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => {
    console.error("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Test application." });
});

// Import your routes
require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
