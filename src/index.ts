import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("Server running 🚀");
});

// Create user
app.post("/users", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: { username, email, password },
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Something went wrong" });
  }
});

// Get all users
app.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(3000, () => {
  console.log("🚀 Server ready at http://localhost:3000");
});
