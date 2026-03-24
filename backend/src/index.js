import { config } from './config/dotenv.js';
import { connectDB } from './config/db.js';
import app from './app.js';

config();
connectDB();

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port - ${PORT}`);
});
