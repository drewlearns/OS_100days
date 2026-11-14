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
const signupErrors = {
  missing: "Username, email and password are all required.",
  email: "Please enter a valid email address.",
  exists: "That username or email is already registered.",
  server: "Something went wrong creating your account. Please try again.",
};
const signinErrors = {
  missing: "Username and password are required.",
  invalid: "Invalid username or password.",
  server: "Something went wrong signing you in. Please try again.",
};
const signinNotices = {
  registered: "Account created. Please log in.",
};

// Only own, known keys are looked up, so the query string can never inject text.
const pick = (messages, key) =>
  Object.prototype.hasOwnProperty.call(messages, key) ? messages[key] : null;

// req.body fields may be missing or non-strings (JSON bodies); normalise to a trimmed string.
const field = (value) => (typeof value === "string" ? value.trim() : "");

router.get("/signup", function (req, res, next) {
  res.render("signup", {
    title: `${domain} | Signup`,
    formError: pick(signupErrors, req.query.error),
  });
});
router.post("/signup/auth", async (req, res, next) => {
  // from models, requires: email, password, username
  const username = field(req.body.username);
  const email = field(req.body.email).toLowerCase();
  const password = typeof req.body.password === "string" ? req.body.password : "";
  if (!username || !email || !password) {
    return res.redirect("/signup?error=missing");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.redirect("/signup?error=email");
  }
  try {
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    await db.user.create({
      email: email,
      password: encryptedPassword,
      username: username,
    });
    res.redirect("/signin?notice=registered");
  } catch (err) {
    if (err instanceof sequelize.UniqueConstraintError) {
      return res.redirect("/signup?error=exists");
    }
    console.error("signup failed:", err.message);
    res.redirect("/signup?error=server");
  }
});
router.get("/signin", function (req, res, next) {
  res.render("signin", {
    title: `${domain} | Sign in`,
    formError: pick(signinErrors, req.query.error),
    formNotice: pick(signinNotices, req.query.notice),
  });
});
router.post("/signin/auth", async (req, res, next) => {
  const username = field(req.body.username);
  const password = typeof req.body.password === "string" ? req.body.password : "";
  if (!username || !password) {
    return res.redirect("/signin?error=missing");
  }
  try {
    const user = await db.user.findOne({ where: { username: username } });
    // Same response for an unknown user and a wrong password.
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.redirect("/signin?error=invalid");
    }
    req.session.userId = user.id;
    res.redirect("/");
  } catch (err) {
    console.error("signin failed:", err.message);
    res.redirect("/signin?error=server");
  }
});
router.get("/profile", function (req, res, next) {
  res.render("profile", { title: `${domain} | Profile` });
});

module.exports = router;
