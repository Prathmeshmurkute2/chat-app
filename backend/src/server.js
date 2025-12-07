import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';
import messageRoute from './routes/message.route.js';
import connectDB from './config/connect.js';
import { fileURLToPath } from 'url';
import path from 'path';


dotenv.config();
connectDB();
const app = express();

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
// Test route
app.get('/', (req, res) => {
    res.send("App server is running");
});
}

// API routes
app.use('/api/login', authRoute);
app.use('/api/signup', authRoute);

// Deployment setup
if (process.env.NODE_ENV === "production") {

    const frontendPath = path.join(__dirname, "../../frontend/dist");
     console.log("Serving frontend from:", frontendPath); 
    app.use(express.static(frontendPath));

    app.get("*", (_, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
