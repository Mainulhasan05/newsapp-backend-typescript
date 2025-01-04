require('dotenv').config();
const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const PORT = process.env.PORT || 5000;


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
