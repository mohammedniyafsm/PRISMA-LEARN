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
// Test route
app.get("/", (req, res) => {
    res.send("Server running 🚀");
});
// Create user
app.post("/users", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await prisma.user.create({
            data: { username, email, password },
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
app.listen(3000, () => {
    console.log("🚀 Server ready at http://localhost:3000");
});
//# sourceMappingURL=index.js.map