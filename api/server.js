const express = require("express");
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require("./projects/projects-router.js");

server.use(express.json());
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);
server.use("*", (req, res) => {
    res.status(404).json({ message: " not found!" });
    console.log('hi from server.js!!!');
});

module.exports = server;
