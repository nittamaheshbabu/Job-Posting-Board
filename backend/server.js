require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const signUpRoutes = require("./Routes/signUpRoutes");
const jobRoutes = require("./Routes/jobRoutes")
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/signup", signUpRoutes);
app.use("/api/job", jobRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log("Connected to DB & listening on port " + process.env.PORT)
    );
  })
  .catch((err) => console.log("There was an error connecting to DB " + err));
