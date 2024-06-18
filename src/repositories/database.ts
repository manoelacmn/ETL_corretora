import sqlite3 from "sqlite3";
const DBSOURCE = "db.sqlite";

/***
 * Atenção: não existe tipo boolean no banco SQLite.
 * Apenas devemos representar como inteiro
 * sendo: 0 => false e 1 => true.
 */
const DDL_SCRIPT = `
    CREATE TABLE items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT,
        checked INTEGER
    )`;
const database = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Database connected.");
    database.run(DDL_SCRIPT, (err) => {
      if (err) {
        console.log("Table items already exists.");
      } else {
        console.log("Table items created.");
      }
    });
  }
});
export default database;
