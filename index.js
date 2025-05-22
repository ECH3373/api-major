import express from 'express';
import 'express-async-errors';
import { config } from './config/index.js';
import { event } from './src/events/index.js';
import { enrollment } from './src/enrollment/index.js';
import { login } from './src/login/index.js';
import { piece } from './src/piece/index.js';
import { dot } from './src/dot/index.js';

const app = express();

app.use(express.json());

app.use('/api/v1/events', event.router);
app.use('/api/v1/enrollments', enrollment.router);
app.use('/api/v1/login', login.router);
app.use('/api/v1/pieces', piece.router);
app.use('/api/v1/dots', dot.router);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || 'An error occurred while processing the request' });
});

app.listen(config.app.port, () => {
  console.log(`Server is running on port: http://localhost:${config.app.port}`);
});
