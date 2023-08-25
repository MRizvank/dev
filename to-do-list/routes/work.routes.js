import express from "express";
import fs from "fs";
const workRoutes = express.Router();

workRoutes.get("/", (req, res) => {
  let data = fs.readFileSync("./db/db.json", "utf-8");
  data = JSON.parse(data);
  res.render("Work.ejs", { List: data.work });
});
workRoutes.post("/", (req, res) => {
  let data = fs.readFileSync("./db/db.json", "utf-8");
  data = JSON.parse(data);
  data.work.push({ text: req.body["newItem"], status: false });
  fs.writeFileSync("./db/db.json", JSON.stringify(data));
  res.render("Work.ejs", { List: data.work });
});
export default workRoutes;
