require('dotenv').config();

const express = require('express');
const cors = require('cors');
const schedulerRouter = require('./routes/schedulerRouter');

const app = express();
// const db = require('./db');

app.use(cors()); 
app.use(express.json());

app.use('/scheduler', schedulerRouter);

app.listen(3000, () => console.log('Server started on port 3000'));
