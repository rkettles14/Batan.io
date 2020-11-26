import config from '../config';
const cors = require("cors");
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
import bodyParser from 'body-parser'
import routes from '../api-http'

export default ({ expressApp: app }) => {

  app.enable('trust proxy');
  app.use(cors());  // TODO: restrict this..
  var jwtCheck = jwt({
        secret: jwks.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: config.AUTH0_JWKS_URI
      }),
      audience: config.AUTH0_AUDIENCE,
      issuer: config.AUTH0_DOMAIN,
      algorithms: ['RS256']
  });
  app.use(jwtCheck);
  app.use(bodyParser.json());
  app.use('/api', routes());

  // convert any error response to JSON
  // TODO: Add more specific error handlers for more semantic msgs before catch-all
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      err: {
        msg: err.message,
      }
    });
  });
}
