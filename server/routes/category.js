const express = require('express');
const router = express.Router({ mergeParams: true, strict: true});
const pool = require("../db");

router.get('/all', async(req, res) => {
    try {
        const data = await pool.query('SELECT * FROM category;');
        res.json(data.rows);
    } catch (error) {;
        res.send(error);
    }
});

router.get('/categories', async(req, res) => {
    try {
        const data = await pool.query('SELECT * FROM category WHERE parent is NULL;');
        res.json(data.rows);
    } catch (error) {
        res.send(error);
    }
});
router.get('/subcategories', async(req, res) => {
    try {
        const data = await pool.query('SELECT * FROM category WHERE parent IS NOT NULL;');
        res.json(data.rows);
    } catch (error) {
        res.json(error);
    }
});

router.get('/:id', async(req, res) => {
        try {
            const category_id = req.params.id;
            console.log("cat id " + category_id);
            const data = await pool.query('SELECT * FROM category WHERE id = ($1);', [category_id]);
            res.json(data.rows[0]);
        } catch (error) {
            res.json(error);
        }
});
router.post('/', async(req, res) => {
        try {
            const category = Object.values(req.body);
            const data = await pool.query('INSERT INTO category (name, parent) VALUES ($1, $2);', category);
            res.json(200);
        } catch (error) {
            res.json(error);
        }
});
router.put('/', async(req, res) => {
        try {
            const category = Object.values(req.body);
            const data = await pool.query('UPDATE category SET name = ($2), parent = ($3)  WHERE id = ($1);',
                category
            );
            res.json(200);
        } catch (error) {
            console.log(error);
        }
});
router.delete('/:id', async(req, res) => {
        try {
            const category_id = req.params.id;
            const data = await pool.query('DELETE FROM category WHERE id = ($1);', [category_id]);
            res.json(200);
        } catch (error) {
            res.json(error);
        }
});

module.exports = router;