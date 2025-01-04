import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();
const PORT = process.env.PORT || 5000;

import DB from './config/db';

// Call the connection function
DB();

const app = express();

app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
    },
));
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());


const server = http.createServer(app);

server.listen(PORT, () => {
    console.log('Server is running on port http://localhost:' + PORT);
});
