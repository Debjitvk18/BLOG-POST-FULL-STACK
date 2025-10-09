import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import PostRoutes from './routes/postRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


// Allow CORS for frontend
app.use(cors());
app.use(express.json());


// For serving uploaded images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// API Routes
app.use('/api/posts', PostRoutes);


app.listen(PORT, () => {
console.log(`✅ Server running on http://localhost:${PORT}`);
});