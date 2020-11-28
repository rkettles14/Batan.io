import config from '../config';

const socketioJwt = require('socketio-jwt')
const jwks = require('jwks-rsa');

import authSocket from '../api-socket'

export default ({ httpApp: http }) => {
  const io = require("socket.io")(http, {
    logger: true,
    cors: {
      origin: config.allowed_origins,
      methods: ["GET", "POST"],
      allowedHeaders: [""],
      credentials: true
    }
  });

  io.sockets.on('connection', socketioJwt.authorize({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: config.AUTH0_JWKS_URI
      }),
    timeout: 5000
  }))
  .on('authenticated', authSocket.bind(null, io));
}
