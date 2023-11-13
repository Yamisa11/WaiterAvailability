import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import waiterAvailability from "./waiter.js";
import flash from "express-flash";
import session from "express-session";
import DBJS from "./database.js";
import waiterDB from "./database/DBLogic.js";

const app = express();
let database = waiterDB(DBJS);

let waiterFunction = waiterAvailability(database);
let waitersList;
let message;
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "Yams",
  })
);
app.use(flash());

app.get("/", async (req, res) => {
  let allWaiters = await waiterFunction.getAllWaiters();
  let msg = req.flash("msg");

  res.render("login", {
    allWaiters: allWaiters,
    msg: msg,
  });
});

app.post("/", async (req, res) => {
  let logPass = req.body.login;
  let pass = await database.pass();

  if (logPass === pass.username) {
    res.redirect("/days");
  } else {
    req.flash("msg", "Incorrect password");
    res.redirect("/");
  }
});

app.get("/days", async (req, res) => {
  waitersList = await waiterFunction.getAllWaiters();
  let theWaiters = await database.getWaiters();
  let rosterDays = await waiterFunction.assignDays();
  let monClass = await waiterFunction.checkClass(rosterDays.Monday);
  let tuesClass = await waiterFunction.checkClass(rosterDays.Tuesday);
  let wedClass = await waiterFunction.checkClass(rosterDays.Wednesday);
  let thursClass = await waiterFunction.checkClass(rosterDays.Thursday);
  let friClass = await waiterFunction.checkClass(rosterDays.Friday);
  let resetMsg = req.flash("resetMsg");
  let newMsg = req.flash("newMsg");
  let existMsg = req.flash("existMsg");
  let enterMsg = req.flash("enterMsg");

  res.render("index", {
    waitersList: rosterDays,
    theWaiters: theWaiters,
    monClass: monClass,
    tuesClass: tuesClass,
    wedClass: wedClass,
    thursClass: thursClass,
    friClass: friClass,
    resetMessage: resetMsg,
    newMsg: newMsg,
    existMsg: existMsg,
    enterMsg: enterMsg,
  });
});

app.post("/waiters/:username", async (req, res) => {
  let theDays = req.body.weekday;
  let user = req.params.username;
  let waiterId = await database.getWaiterId(user);

  if (theDays === undefined) {
    req.flash("message", "Please select your days");
  } else {
    await database.createRoster(waiterId, theDays);
    req.flash("addMsg", "Successfully added to the roster!");
  }

  res.redirect(user);
});
app.get("/waiters/:username", async (req, res) => {
  let username = req.params.username;
  let addMsg = req.flash("addMsg");
  let themsg = req.flash("message");
  let results = await database.getWaiterSelectedDays(username);

  res.render("employee", {
    theUsername: username,
    addMsg: addMsg,
    themsg: themsg,
    selectedDays: results,
  });
});

app.post("/reset", async (req, res) => {
  await database.reset();
  req.flash("resetMsg", "Successfully cleared roster!");
  res.redirect("/days");
});
app.post("/create", async (req, res) => {
  let newWaiter = req.body.newWaiter;
  let theRes = await database.checkExistingWaiter(newWaiter);
  if (newWaiter == "") {
    req.flash("enterMsg", "Enter username");
  } else {
    if (theRes.length > 0) {
      req.flash("existMsg", "Already exists!");
    }
    if (theRes.length == 0) {
      await database.newWaiter(newWaiter);
      req.flash("newMsg", "Successfully added!");
    }
  }

  res.redirect("/days");
});

app.get("/signup", (req, res) => {
  let newMsg = req.flash("newMsg");
  let existMsg = req.flash("existMsg");
  let enterMsg = req.flash("enterMsg");
  res.render("newEmployee", {
    newMsg: newMsg,
    existMsg: existMsg,
    enterMsg: enterMsg,
  });
});
app.post("/signup", async (req, res) => {
  let signWaiter = req.body.signWaiter;
  let theResult = await database.checkExistingWaiter(signWaiter);
  if (signWaiter == "") {
    req.flash("enterMsg", "Enter username");
  } else {
    if (theResult.length > 0) {
      req.flash("existMsg", "Already exists!");
    }
    if (theResult.length == 0) {
      await database.newWaiter(signWaiter);
      req.flash("newMsg", "Successfully added!");
    }
  }

  res.redirect("/signup");
});

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App started...", PORT);
});
