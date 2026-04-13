import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email } = req.body;

    try {
      const result = await pool.query(
        "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *",
        [name, email]
      );

      res.status(200).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).send("Only POST allowed");
  }
}
