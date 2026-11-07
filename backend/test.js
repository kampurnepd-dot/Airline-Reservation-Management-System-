const pool = require("./config/pool");

async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT 1 AS connected");

    console.log("MySQL connected successfully!");
    console.log(rows);
  } catch (error) {
    console.error("Connection failed:", error.message);
  } finally {
    await pool.end();
  }
}

testConnection();