const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Create a database connection
const db = new sqlite3.Database('../database/task.db');
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    due_date TEXT,
  )`);
});

router.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

// GET a  task by ID
router.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    db.get('SELECT * FROM tasks WHERE id = ?', taskId, (err, row) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
      } else if (!row) {
        res.status(404).json({ error: 'Task not found' });
      } else {
        res.json(row);
      }
    });
  });

// add a new task
router.post('/tasks', (req, res) => {
  const { title, description, due_date } = req.body;
  db.run('INSERT INTO tasks (title, description,due_date) VALUES (?, ?,?)', [title, description,due_date], function (err) {
    if (err) {
      res.status(500).json({ error: 'Internal error' });
    } else {
      res.status(201);
    }
  });
});

//  update an existing task
router.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, due_date} = req.body;
  db.run('UPDATE tasks SET title = ?, description = ?, due_date= ? WHERE id = ?', [title, description,due_date, taskId], function (err) {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json({ id: taskId, title, description });
    }
  });
});

router.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  db.run('DELETE FROM tasks WHERE id = ?', taskId, function (err) {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json({ id: taskId });
    }
  });
});

module.exports = router;