const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const speech = "World";
app.get("/", logger, (req, res) => {
  console.log("here");
  res.render("index", { text: speech });
});
app.use(logger);

const userRouter = require("./routes/users");
app.use("/users", userRouter);

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

app.listen(3000, "192.168.254.125");
