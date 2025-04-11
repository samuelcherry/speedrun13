import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db/pool.js";

const SECRET = process.env.JWT_SECRET || "secret";

export const Register = async (req, res) => {
  const { email, password, displayName } = req.body;

  if (!email || !password || !displayName) {
    console.log("Missing field(s)");
    return res.status(400).json({ error: "All fields are required" });
  }

  const hash = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, displayName)
      VALUES ($1, $2, $3)
      RETURNING id, email, displayName`,
      [email, hash, displayName]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(400)
      .json({ erorr: "Email may already by taken or database error" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email
  ]);

  const user = result.rows[0];
  if (!user) return res.status(401).json({ error: "Invalid Credentails" });

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
    expiresIn: "1d"
  });
  console.log("Sending response:");
  console.log({ token, user });
  res.json({ token, user });
};
