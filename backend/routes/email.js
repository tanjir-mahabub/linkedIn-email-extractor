import { Router } from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

router.post("/", async (req, res) => {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Invalid or missing email" });
    }

    try {
        const chatCompletion = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a professional LinkedIn assistant creating connection requests." },
                { role: "user", content: `Create a LinkedIn message for the email: ${email}.` },
            ],
            max_tokens: 150,
            temperature: 0.7,
        });

        const message = chatCompletion.choices[0]?.message?.content.trim() || "Unable to generate a message.";
        res.status(200).json({
            message: `Message received: ${email}`,
            connection_request: message,
        });
    } catch (error) {
        console.error("OpenAI API Error:", error);

        // Fallback message if OpenAI fails
        const fallbackMessage = `Hi, I found your email (${email}) and would like to connect professionally.`;
        res.status(200).json({
            message: `Message received: ${email}`,
            connection_request: fallbackMessage,
            error: "OpenAI API failed. Returning a default connection request message.",
        });
    }
});


export default router;
