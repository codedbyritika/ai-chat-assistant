import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js"

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

//backend test route
app.get("/", (req, res) => {
    res.send("AI Chat Assistant Backend is running!");
});

app.use("/api",chatRoutes)



const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected with database");

        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });

    } catch (err) {
        console.log("Failed to connect with DB", err);
    }
};

connectDB();