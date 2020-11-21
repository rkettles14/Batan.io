require("dotenv").config();
import express = require('express');
const cors = require("cors");
const app: express.Application = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const socketioJwt = require('socketio-jwt')
var http = require('http').Server(app);

const io = require("socket.io")(http, {
  logger: true,
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: [""],
    credentials: true
  }
});


const port: string = process.env.PORT || "3001"

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

io.sockets.on('connection', socketioJwt.authorize({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: process.env.AUTH0_JWKS_URI
    }),
  timeout: 5000
}))
.on('authenticated', (socket) => {
  // this socket is now authenticated, we can handle authenticated events
  // and access user's UID from socket.decoded_token.sub
  console.log(`From socket: ${socket.decoded_token.sub}`);
  socket.on('hello', (data) => {
    console.log(`Hello received from ${socket.decoded_token.sub}`)
  })
});


// Routes
app.get('/', function (req, res) {
  // Connections to the API are authenticated using Authorization header &
  // Bearer jwt strategy. Access user's UID by req.user.sub
  console.log(`From https: ${req.user.sub}`);
  res.send('hi!');
});

app.get('/login', function(req, res){
  res.send('login..')
})

http.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});
