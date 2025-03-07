import express from 'express';
import db from './config/connection.js';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ API Routes only
app.use(routes);

// ✅ Start server after database connection
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on port ${PORT}`));
});