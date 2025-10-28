const express = require('express');
const app = express();

const pool = require("./db");
require('dotenv').config();

app.use(express.json());

app.get("/activities", async(req, res) => {
    try {
        const data = await pool.query('SELECT * FROM "Activities"');
        res.json(data.rows);
    } catch (error) {
        console.log("BRUH" + error);
        res.send("Error: something went wrong");
    }
});

/**
 * Category
 */
app.get('/category:id', async(req, res) => {
        try {
            const category_id = req.body.category_id;
            const data = await pool.query('SELECT * FROM "Category" WHERE category_id = ($1)', [category_id]);
            res.json(data.rows);
        } catch (error) {
            console.log(error);
        }
});
app.get('/categories', async(req, res) => {
        try {
            const data = await pool.query('SELECT * FROM "Category" WHERE parent IS NULL');
            res.json(data.rows);
        } catch (error) {
        console.log("BRUH " + error);
        res.send("Error: something went wrong");
        }
});
app.get('/subcategories', async(req, res) => {
        try {
            const data = await pool.query('SELECT * FROM "Category" WHERE parent IS NOT NULL');
            res.json(data.rows);
        } catch (error) {
            console.log(error);
        }
});
app.put('/category:id', async(req, res) => {
        try {
            const category = req.body.category;
            const data = await pool.query('INSERT INTO "Category" (category_id, name, parent) VALUES ($1, $2, $3)',
                [category.id, category.name, category.parent]);
            res.json(data.rows);
        } catch (error) {
            console.log(error);
        }
});
app.put('/category:id', async(req, res) => {
        try {
            const category = req.body.category;
            const data = await pool.query('UPDATE "Category" SET name = ($2), parent = ($3)  WHERE category_id = ($1)',
                [category.id, category.name, category.parent]
            );
            res.json(data.rows);
        } catch (error) {
            console.log(error);
        }
});
app.delete('/category:id', async(req, res) => {
        try {
            const category_id = req.body.category_id;
            const data = await pool.query('DELETE FROM "Category" WHERE category_id = ($1)', [category_id]);
            res.json(data.rows);
        } catch (error) {
            console.log(error);
        }
});

app.listen(5000, () => {
    console.log("Server is listening on port " + 5000);
});