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
    secret: "Yamisa",
  })
);
app.use(flash());

app.get("/", async (req, res) => {
  let monday = await waiterFunction.getMondayRoster()
  let tuesday = await waiterFunction.getTuesdayRoster()
  let wednesday = await waiterFunction.getWednesdayRoster()
  let thursday = await waiterFunction.getThursdayRoster()
  let friday = await waiterFunction.getFridayRoster()
  let saturday = await waiterFunction.getSaturdayRoster()
  console.log(monday);
    res.render("index", {
      MONDAY: monday,
      TUESDAY: tuesday,
      WEDNESDAY : wednesday,
      THURSDAY : thursday,
      FRIDAY : friday,
      SATURDAY : saturday
    });
  })

let PORT = process.env.PORT || 8008;
app.listen(PORT, () => {
  console.log("App started...", PORT);
});
