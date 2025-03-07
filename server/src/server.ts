import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import db from './config/connection.js';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Fix for __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Serve static frontend files correctly
const clientPath = path.resolve(__dirname, '../../client/dist');
app.use(express.static(clientPath));

app.get('*', (_req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

// ✅ API Routes
app.use(routes);

// ✅ Start server after database connection
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on port ${PORT}`));
});