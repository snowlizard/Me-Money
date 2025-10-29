const express = require('express');
const app = express();

const pool = require("./db");
require('dotenv').config();

app.use(express.json());

/**
 * Category
 */
app.get('/category/:id', async(req, res) => {
        try {
            const category_id = req.params.id;
            console.log("cat id " + category_id);
            const data = await pool.query('SELECT * FROM category WHERE id = ($1);', [category_id]);
            res.json(data.rows[0]);
        } catch (error) {
            console.log(error);
        }
});
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
app.put('/category/:id', async(req, res) => {
        try {
            const category = req.params.id;
            const data = await pool.query('INSERT INTO category (id, name, parent) VALUES ($1, $2, $3)',
                [category.id, category.name, category.parent]);
            res.json(data.rows);
        } catch (error) {
            console.log(error);
        }
});
app.put('/category/:category', async(req, res) => {
        try {
            const category = req.params.category;
            const data = await pool.query('UPDATE category SET name = ($2), parent = ($3)  WHERE id = ($1)',
                [category.id, category.name, category.parent]
            );
            res.json(data.rows);
        } catch (error) {
            console.log(error);
        }
});
app.delete('/category/:id', async(req, res) => {
        try {
            const category_id = req.params.id;
            const data = await pool.query('DELETE FROM category WHERE id = ($1)', [category_id]);
            res.json(data.rows);
        } catch (error) {
            console.log(error);
        }
});

app.listen(5000, () => {
    console.log("Server is listening on port " + 5000);
});