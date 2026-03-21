import dotenv from 'dotenv';
import cors from 'cors';
import app from './src/app.js';
import connectDB from './src/config/db.js';

dotenv.config();
app.use(cors({
  origin: '*'
}));

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});