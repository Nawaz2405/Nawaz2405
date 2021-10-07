const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");

const model = require("./models/model");

const mongoose = require("mongoose");
const db =
  "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

mongoose.connect(db, (err) => {
  if (err) {
    console.log("somnething is wroonmg in the database");
  } else {
    console.log("connection is established correctly");
  }
});

route.get("/", (req, res) => {
  res.send("route is working perfectly fine");
});

route.post("/register", (req, res) => {
  let clientData = req.body;
  let scehmaData = new model(clientData);
  scehmaData.save((err, dbResponse) => {
    if (err) {
      console.log("something is wrong");
    } else {
      let payload = { subject: dbResponse._id };
      let token = jwt.sign(payload, "secureKey");

      res.status(200).send({ token });
    }
  });
});

route.post("/login", (req, res) => {
  let userDetails = req.body;
  model.findOne({ username: userDetails.username }, (err, user) => {
    if (err) {
      console.log("This is invalid" + err);
    } else {
      if (!user) {
        res.status(401).send("unathorized");
      } else {
        if (userDetails.password !== user.password) {
          res.status(401).send("unathorized");
        } else {
          let payload = { subject: user._id };
          let token = jwt.sign(payload, "secureKey");
          res.status(200).send({ token });
        }
      }
    }
  });
});
route.get("/home", (req, res) => {
  let homePage = [
    {
      _id: "1",
      name: "Mobiles",
      url: "assets/CategoryImages/Mobiles.png",
    },
    {
      _id: "2",
      name: "Electronics",
      url: "assets/CategoryImages/Electronics.png",
    },
    {
      _id: "3",
      name: "Fashion",
      url: "assets/CategoryImages/Fashion.png",
    },
    {
      _id: "4",
      name: "TVs & Appliances",
      url: "assets/CategoryImages/Fashion.png",
    },
    {
      _id: "5",
      name: "Home & Furniture",
      url: "assets/CategoryImages/Home.png",
    },
    {
      _id: "6",
      name: "Beauty",
      url: "assets/CategoryImages/Beauty.png",
    },
  ];
  res.json(homePage);
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).send("unauthorized");
  } else {
    let token = req.hearders.authorization.spilt(" ")[1];
    if (token === "null") {
      res.status(401).send("unauthorized");
    }

    let payload = jwt.verify(token, "secureKey");
    if (!payload) {
      res.status(401).send("unauthorized");
    }
    req.user = payload.subject;
    next();
    // if (req.headers.authorization) {
    //   res.status(200).send("authorized");
    // }
  }
}

route.get("/dashboard", verifyToken, (req, res) => {
  let dashboard = [
    {
      _id: "1",
      name: "Mobiles",
      url: "assets/CategoryImages/Mobiles.png",
    },
    {
      _id: "2",
      name: "Electronics",
      url: "assets/CategoryImages/Electronics.png",
    },
    {
      _id: "3",
      name: "Fashion",
      url: "assets/CategoryImages/Fashion.png",
    },
    {
      _id: "4",
      name: "TVs & Appliances",
      url: "assets/CategoryImages/Fashion.png",
    },
    {
      _id: "5",
      name: "Home & Furniture",
      url: "assets/CategoryImages/Home.png",
    },
    {
      _id: "6",
      name: "Beauty",
      url: "assets/CategoryImages/Beauty.png",
    },
  ];
  res.json(dashboard);
});

module.exports = route;
