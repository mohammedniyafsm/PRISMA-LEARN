import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server running");
});


app.post("/users", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email, password },
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

app.post('/todo',async (req:Request,res:Response)=>{
  const { title,description,user_id } = req.body;
  const todo = await prisma.todo.create({
    data : {
      title : title,
      description : description,
      done : false,
      user_id : user_id
    }
  })
  res.json({todo});
})


app.get('/todo',async (req:Request,res:Response)=>{
  const todo = await prisma.todo.findMany();
  res.json({todo});
})

app.listen(3000, () => {
  console.log("🚀 Server ready at http://localhost:3000");
});













