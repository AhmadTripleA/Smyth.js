import { configDotenv } from 'dotenv';
configDotenv();
import express from 'express';
import { json } from 'body-parser';
import { createServer } from 'http';
import expressRouter from './interfaces/http/router';

const app = express();
const server = createServer(app);

// Serve static files from the "public" folder
app.use(express.static('public'));
app.use(json());

app.use('/', expressRouter);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Smyth.js is running on port ${PORT}`);
});