const express = require("express");
const dbConnect = require("./config/db");

dbConnect();
const app = express();

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
