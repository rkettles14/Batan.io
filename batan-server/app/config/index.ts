// This module should read .env if placed in batan-server root
import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (dotenv.config().error) {
  throw new Error("No env file found.")
}

let origins;
let port;
if (process.env.NODE_ENV == 'development') {
  origins = "http://localhost:3000";
  port = 3001;
} else if (process.env.NODE_ENV == 'production') {
  throw new Error("No production environment defined.")
}

export default {
  port: port,
  allowed_origins: origins,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
  AUTH0_JWKS_URI: process.env.AUTH0_JWKS_URI,
  db_uri: process.env.db_uri,
};
