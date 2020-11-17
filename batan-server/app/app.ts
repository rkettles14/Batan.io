import express = require('express');
const cors = require("cors");
const app: express.Application = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
// const expressSession = require("express-session");

require("dotenv").config();
const port: string = process.env.PORT || "3001"

// // Session config
// const session = {
//   secret: process.env.SESSION_SIGNING_SECRET,
//   cookie: {},
//   resave: false,
//   saveUninitialized: false
// };

// if (app.get("env") === "production") {
//   // requires https
//   session.cookie.secure = true;
// }

// Security config
app.use(cors());  // TODO: restrict this..
var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: process.env.AUTH0_JWKS_URI
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_DOMAIN,
    algorithms: ['RS256']
});
app.use(jwtCheck);


// Routes
app.get('/', function (req, res) {
  res.send('hi!');
});

app.get('/login', function(req, res){
  res.send('login..')
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});
