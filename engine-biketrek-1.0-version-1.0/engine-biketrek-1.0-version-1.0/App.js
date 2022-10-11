const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const HttpError = require("./exceptions/http-error");
require("dotenv").config();
const { readdirSync } = require("fs");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 3001;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());

// const corsOptions ={
//   origin:'http://localhost:3000', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }
app.use(cors());
//app.options('*', cors());

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With,Content-Type,Accept,Authoeization"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
//   next();
// });

readdirSync("./routes").map((r) =>
  app.use("/biketrek", require("./routes/" + r))
);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || "An unknown error occured.",
  });
});

mongoose
  .connect(process.env.MONGO_DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(port);
    console.log(`Server is running on port ${port}`);
  })
  .catch((error) => {
    console.log(error);
  });
