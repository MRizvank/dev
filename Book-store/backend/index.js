import express from "express";
import { PORT, connection } from "./config.js";
import BookRoutes from "./routes/Bookroute.js";
import cors from "cors";

const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:5353",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
app.use("/books", BookRoutes);

app.get("/", (req, res) => {
  res.send("<h1>server is running successfully</h1>");
});

connection()
  .then(() => {
    console.log("connected");
    app.listen(PORT, () => {
      console.log(`server is running at http://localhost:${PORT} `);
    });
  })
  .catch((err) => {
    console.log(err);
  });
