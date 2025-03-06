const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.error("❌ ERROR: Google Gemini API key is missing! Check your .env file.");
    process.exit(1);
}

app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        
        // Kullanıcının mesajlarını birleştir
        const prompt = messages.map(m => m.content).join("\n");

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }]
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        res.status(200).json({ role: "assistant", content: response.data.candidates[0].content.parts[0].text });
    } catch (error) {
        console.error("🔥 Gemini API Hatası:", error.response ? error.response.data : error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.response ? error.response.data : error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
