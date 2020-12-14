import config from './config';
import express = require('express');

import httpLoader from './loaders/http'
import socketLoader from './loaders/socket-io'

import { connect } from './database'

const app: express.Application = express();
httpLoader({ expressApp: app})

const http = require('http').Server(app);
socketLoader({ httpApp: http });

http.listen(config.port, function () {
  console.log(`Example app listening on port ${config.port}`);
});

connect();