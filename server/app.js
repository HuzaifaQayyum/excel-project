require('express-async-errors');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

require('./startup/route-handler')(app);

require('./startup/error-handler')(app);

require('./startup/db')(app);