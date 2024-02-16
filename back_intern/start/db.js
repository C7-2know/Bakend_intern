const sqlite3 = require('sqlite3').verbose();

// Open the SQLite database
const db = new sqlite3.Database(
  'database/tasks.db',
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
    console.log('Successfully connected to SQLite');
  }
);


const createTableQuery = `
    CREATE TABLE IF NOT EXISTS tasks (
        title TEXT ,
        description TEXT,
        due_date TEXT,
    )
`;

db.run(createTableQuery, (err) => {
  if (err) {
    console.error('Error creating recipe table:', err);
  } else {
    console.log('Recipe table created successfully');
  }})