import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import emailRoutes from "./routes/email.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));
app.use(bodyParser.json());

// Root Route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the LinkedIn Email Extractor API!",
        endpoints: {
            email: {
                method: "POST",
                path: "/api/email",
                description: "Accepts an email address and returns a response.",
            },
        },
    });
});

// Email Routes
app.use("/api/email", emailRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
