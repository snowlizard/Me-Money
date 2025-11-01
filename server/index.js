const express = require('express');
const app = express();

const pool = require("./db");
const category = require('./routes/category');
const account = require('./routes/account');
const transaction = require('./routes/transaction');

require('dotenv').config();

app.use(express.json());
app.use('/category', category);
app.use('/account', account);
app.use('/transaction', transaction);

app.listen(5000, () => {
    console.log("Server is listening on port " + 5000);
});