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

let waiterFunction = waiterAvailability(database)
let waitersList
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

app.get("/", async (req,res) => {
  let allWaiters = await waiterFunction.getAllWaiters()
  res.render("login", {
    allWaiters: allWaiters
  })
})

app.get("/days", async (req, res) => {
  waitersList = await waiterFunction.getAllWaiters()
  let theWaiters = await database.getWaiters()
  let rosterDays = await waiterFunction.assignDays()
  let monClass = await waiterFunction.checkClass(rosterDays.Monday)
  let tuesClass = await waiterFunction.checkClass(rosterDays.Tuesday)
  let wedClass = await waiterFunction.checkClass(rosterDays.Wednesday)
  let thursClass = await waiterFunction.checkClass(rosterDays.Thursday)
  let friClass = await waiterFunction.checkClass(rosterDays.Friday)
  let resetMsg = req.flash("resetMsg")
  

    res.render("index",{
      waitersList : rosterDays,
      theWaiters: theWaiters,
      monClass : monClass,
      tuesClass : tuesClass,
      wedClass : wedClass,
      thursClass : thursClass,
      friClass : friClass,
      resetMessage: resetMsg,
      


    });
  })

app.post("/waiters/:username", async (req,res) => {
  let theDays = req.body.days
  let user = req.params.username
  let waiterId = await database.getWaiterId(user)
  // console.log(theDays);
 await waiterFunction.addShift(waiterId,theDays)
 req.flash("addMsg", "Successfully added to the roster!")
 
 
 res.redirect(user)
})
app.get("/waiters/:username", async (req,res) => {
  let amadays = req.body.days
    let username = req.params.username
    let addMsg = req.flash("addMsg")
    let results = await database.getWaiterDays(username)
  
  
   res.render("employee",{
    theUsername: username,
    addMsg : addMsg
   })
})

app.post("/reset", async (req,res) => {
  await database.reset()
  req.flash("resetMsg", "Successfully cleared roster!");
  res.redirect("/days")
})


let PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("App started...", PORT);
});
