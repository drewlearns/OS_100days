const express = require("express");
const router = express.Router();
const domain = `OS_100Days`;
const sequelize = require("sequelize");
const bodyParser = require("body-parser");
const db = require("../models");
const bcrypt = require("bcryptjs");
const expressSession = require("express-session");
const saltRounds = 10;
router.use(bodyParser.json());
router.use(
  expressSession({
    secret: "Coding With Drew Is Fun",
  })
);

router.get("/", function (req, res, next) {
  if (req.session.userId) {
    res.render("index", { title: `${domain} | Home` });
  } else {
    res.redirect("/signin");
  }
});
router.get("/about", function (req, res, next) {
  res.render("about", { title: `${domain} | About` });
});
router.get("/signup", function (req, res, next) {
  res.render("signup", { title: `${domain} | Signup` });
});
router.post("/signup/auth", async (req, res, next) => {
  // from models, requires: email, password, username
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  console.log(password, "password");
  console.log(username, "username");
  console.log(email, "email");
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  console.log(email);
  db.user
    .create({ email: email, password: encryptedPassword, username: username })
    .then((user) => {
      res.redirect("/signin");
    })
    .catch((err) => {
      err;
    });
});
router.get("/signin", function (req, res, next) {
  res.render("signin", { title: `${domain} | Sign in` });
});
router.post("/signin/auth", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  db.user
    .findOne({ where: { username: username } })
    .then(async (user) => {
      if (user) {
        bcrypt.compare(password, user.password, (error, same) => {
          if (same) {
            console.log("logged in");
            req.session.userId = user.id;
            console.log(req.session.userId)
            res.redirect("/");
          } else {
            response.redirect("/signin");
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});
router.get("/profile", function (req, res, next) {
  res.render("profile", { title: `${domain} | Profile` });
});

module.exports = router;
