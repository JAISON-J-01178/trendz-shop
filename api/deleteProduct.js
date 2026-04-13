import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id } = req.body;

    try {
      await pool.query("DELETE FROM products WHERE id=$1", [id]);
      res.status(200).json({ message: "Deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).send("Only POST allowed");
  }
}
