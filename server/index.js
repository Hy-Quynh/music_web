const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const app = express();
const cors = require("cors");
const authRouter = require("./routers/auth");
const adminRouter = require("./routers/admin");
const userRouter = require("./routers/user");
const categoryRouter = require("./routers/category");
const albumRouter = require("./routers/album");
const singerRouter = require("./routers/singer");
const countryRouter = require("./routers/country");
const songRouter = require("./routers/song");
const reviewRouter = require("./routers/review");
const searchRouter = require("./routers/search");

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEY || "DOAN"],
    maxAge: 4 * 7 * 24 * 60 * 60 * 1000,
  })
);

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cors());

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/album", albumRouter);
app.use("/api/singer", singerRouter);
app.use("/api/country", countryRouter);
app.use("/api/song", songRouter);
app.use("/api/song/review", reviewRouter);
app.use("/api/search", searchRouter);

let PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`App running on port: ${PORT}`));
