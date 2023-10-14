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
// parse application/ json
app.use(bodyParser.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "Yams",
  })
);
app.use(flash());

app.get("/days", async (req, res) => {
  waitersList = await waiterFunction.getAllWaiters()
  let theWaiters = await database.getWaiters()
  let rosterDays = await waiterFunction.assignDays()
  console.log(rosterDays);

    res.render("index",{
      waitersList : rosterDays,
      theWaiters: theWaiters
    });
  })

app.post("/waiters/:username", async (req,res) => {
  let theDays = req.body.days
  let user = req.params.username
  let waiterId = await database.getWaiterId(user)
 await waiterFunction.addShift(waiterId,theDays)
 
res.redirect("index")
})
app.get("/waiters/:username", (req,res) => {
    let username = req.params.username
   res.render("employee",{
    theUsername: username
   })
})

app.post("/reset", async (req,res) => {
  await database.reset()
  res.redirect("/index")
})

let PORT = process.env.PORT || 8008;
app.listen(PORT, () => {
  console.log("App started...", PORT);
});
