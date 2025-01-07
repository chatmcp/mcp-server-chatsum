import sqlite3 from "sqlite3";

export function getDb(): sqlite3.Database {
  const dbName = process.env.BINANCE_DB_PATH || "";
  if (!dbName) {
    throw new Error("BINANCE_DB_PATH is not set");
  }

  const db = new sqlite3.Database(dbName, (err) => {
    if (err) {
      console.error("binance db connect failed: ", dbName, err.message);
      return;
    }
  });

  return db;
}
