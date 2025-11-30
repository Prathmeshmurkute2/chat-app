import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';
import messageRoute from './routes/message.route.js';

import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const app = express();

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send("App server is running");
});

// API routes
app.use('/api/auth', authRoute);
app.use('/api/mess', messageRoute);

// Deployment setup
if (process.env.NODE_ENV === "production") {

    const frontendPath = path.join(__dirname, "../frontend/chatApp/dist");

    app.use(express.static(frontendPath));

    app.get("*", (_, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
