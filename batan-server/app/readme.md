# Batan Server

## app.ts
This is the entry-point for the server. It mainly creates the app and http server
and calls the loaders before starting the http listener.

## config
Configuration from the .env file (and environment) is loaded into a cleaner
javascript object to be imported to other locations.

## loaders
These bootstrap other components of the server application (apis, db connections,
loggers, background task scheduling, etc.)

## api-http
This is the http request (traditional) api. It deals only with authenticated requests.

## api-socket
This is the real-time socket-io api. It deals solely with authenticated sockets.

## state
This is the in-memory state store for the server side.
It is responsible for maintaining collection required during runtime, state
caching & database synchronization.

## engine
This is the game engine. It is responsible for providing interfaces to the logic
of a single game.

## services
This should hold any business logic that is to be moved away from the routes or
state, excluding game logic.

## jobs
Any scheduled, long-running or non-time-sensitive tasks belong here.
