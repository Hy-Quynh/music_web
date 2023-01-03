const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const app = express();
const cors = require('cors');
const authRouter = require('./routers/auth');
const adminRouter = require('./routers/admin');

app.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIE_KEY || 'DOAN'],
  maxAge: 4 * 7 * 24 * 60 * 60 * 1000
}));

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cors())


require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);

let PORT = process.env.PORT || 5005
app.listen(PORT, () => console.log(`App running on port: ${PORT}`))