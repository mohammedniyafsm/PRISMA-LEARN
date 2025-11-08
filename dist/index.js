"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Server running");
});
app.post("/users", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await prisma.user.create({
            data: { name, email, password },
        });
        res.json(user);
    }
    catch (err) {
        res.status(400).json({ error: "Something went wrong" });
    }
});
// Get all users
app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});
app.post('/todo', async (req, res) => {
    const { title, description, user_id } = req.body;
    const todo = await prisma.todo.create({
        data: {
            title: title,
            description: description,
            done: false,
            user_id: user_id
        }
    });
    res.json({ todo });
});
app.get('/todo', async (req, res) => {
    const todo = await prisma.todo.findMany();
    res.json({ todo });
});
app.listen(3000, () => {
    console.log("🚀 Server ready at http://localhost:3000");
});
//# sourceMappingURL=index.js.map