const express = require('express');
const app = express();

const pool = require("./db");
const category = require('./routes/category');

require('dotenv').config();

app.use(express.json());
app.use('/category', category);


app.get('/categories', async(req, res) => {
        try {
            const data = await pool.query('SELECT * FROM category WHERE parent is NULL');
            res.json(data.rows);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
});
app.get('/subcategories', async(req, res) => {
        try {
            const data = await pool.query('SELECT * FROM category WHERE parent IS NOT NULL');
            res.json(data.rows);
        } catch (error) {
            console.log(error);
        }
    });

app.listen(5000, () => {
    console.log("Server is listening on port " + 5000);
});