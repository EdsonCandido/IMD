const express = require('express');
const routesAPI = require('./routes')
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use('/', routesAPI);

app.use('/public', express.static(path.resolve(__dirname, 'tmp')));

app.listen(PORT, console.log(`SERVER START IN PORT: ${PORT}`));