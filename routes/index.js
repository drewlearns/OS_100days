const express = require("express");
const router = express.Router();
const domain = `OS_100Days`;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: `${domain} | Home` });
});
router.get("/faq", function (req, res, next) {
  res.render("faq", { title: `${domain} | FAQ` });
});
router.get("/about", function (req, res, next) {
  res.render("about", { title: `${domain} | About` });
});
router.get("/signup", function (req, res, next) {
  res.render("signup", { title: `${domain} | Signup` });
});

router.get("/signin", function (req, res, next) {
  res.render("signin", { title: `${domain} | Signin` });
});


router.get("/profile", function (req, res, next) {
  res.render("profile", { title: `${domain} | Profile` });
});


module.exports = router;
