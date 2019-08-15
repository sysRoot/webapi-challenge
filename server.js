const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan('short'));
server.use(cors());

const projectsRouter = require('./routers/projectsRouter');
const actionsRouter = require('./routers/actionsRouter');

server.use('/projects', projectsRouter);
server.use('/actions', actionsRouter);

// server.get('', (req, res) => {
//   res.json({ message: "the server is alive!"})
// })

module.exports = server;