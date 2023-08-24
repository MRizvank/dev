import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import calender from "./db/calender.js";
import workRoutes from "./routes/work.routes.js";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/work", workRoutes);

const date = new Date().getMonth();
const day = new Date().getDay();
const Month = calender.months[date];
const Day = calender.days[day];

app.get("/", (req, res) => {
  let data = fs.readFileSync("./db/db.json", "utf-8");
  data = JSON.parse(data);
  res.render("Today.ejs", { Month, Day, List: data.today });
});

app.post("/", (req, res) => {
  let data = fs.readFileSync("./db/db.json", "utf-8");
  data = JSON.parse(data);
  data.today.push({ text: req.body["newItem"], status: false });
  fs.writeFileSync("./db/db.json", JSON.stringify(data));
  res.render("Today.ejs", { Month, Day, List: data.today });
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
