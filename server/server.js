const express = require("express");
const app = new express();
var cors = require("cors");
app.use(cors());
const bodyParsar = require("body-parser");
app.use(bodyParsar.json());

const route = require("./route");

app.use("/api", route);

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("route is working perfectly fine");
});

app.listen(PORT, () => {
  console.log(`App is listing ${PORT}`);
});
