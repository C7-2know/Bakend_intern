const express = require('express');
const app = express();
const tasksRouter = require('./start/routes'); // Assuming your route file is named 'tasksRouter.js'

// Mount the tasksRouter as a middleware
app.use('/tasks', tasksRouter); // Mount the router under the '/tasks' prefix

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});