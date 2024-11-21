// createdb.ts

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const initDb = async () => {
  const db = await open({
    filename: '../Database/sapp.db',
    driver: sqlite3.Database,
  });

  // May need to change fields as necessary
  await db.exec(`

    CREATE TABLE IF NOT EXISTS users (
        name TEXT NOT NULL,
        email TEXT NOT NULL,
    );

    CREATE TABLE IF NOT EXISTS decks (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS flashcards (
      id INTEGER PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      deck_id INTEGER NOT NULL,
      FOREIGN KEY(deck_id) REFERENCES decks(id)
    );
  `);

  return db;
};

export default initDb;