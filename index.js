import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import registration from "./registration.js";
import flash from "express-flash";
import session from "express-session";
import DBJS from "./database.js";
import RegistrationDBLogic from "./database/dbLogic.js";

const app = express();
let database = RegistrationDBLogic(DBJS);

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