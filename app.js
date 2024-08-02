const express = require("express");
const app = express();
const path = require("path");
const router = require("./routes/index");
const helmet = require("helmet");
const cors = require("cors");

app.use(helmet());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/", router);
const port = 8000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
