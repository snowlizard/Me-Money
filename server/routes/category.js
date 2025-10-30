const express = require('express');
const router = express.Router({ mergeParams: true, strict: true});
const pool = require("../db");

router.get('/:id', async(req, res) => {
        try {
            const category_id = req.params.id;
            console.log("cat id " + category_id);
            const data = await pool.query('SELECT * FROM category WHERE id = ($1);', [category_id]);
            res.json(data.rows[0]);
        } catch (error) {
            console.log(error);
        }
});
router.post('/', async(req, res) => {
        try {
            const category = Object.values(req.body);
            category.shift();
            console.log(category)
            const data = await pool.query('INSERT INTO category (name, parent) VALUES ($1, $2)', category);
            res.json(data.rows);
        } catch (error) {
            console.log(error);
        }
});
router.put('/', async(req, res) => {
        try {
            const category = req.body;
            const data = await pool.query('UPDATE category SET name = ($2), parent = ($3)  WHERE id = ($1)',
                [category.id, category.name, category.parent]
            );
            res.json(data.rows);
        } catch (error) {
            console.log(error);
        }
});
router.delete('/:id', async(req, res) => {
        try {
            const category_id = req.params.id;
            const data = await pool.query('DELETE FROM category WHERE id = ($1)', [category_id]);
            res.json(data.rows);
        } catch (error) {
            console.log(error);
        }
});

module.exports = router;