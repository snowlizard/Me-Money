const express = require('express');
const router = express.Router({ mergeParams: true, strict: true});
const pool = require("../db");

// Monthly expenses
router.get('/month', async(req, res) => {
    try {
        const data = await pool.query(`SELECT * FROM transaction WHERE type = 'withdrawal'
            AND EXTRACT(MONTH FROM date) = EXTRACT(MONTH FROM current_date)
            AND EXTRACT(YEAR FROM date) = EXTRACT(YEAR FROM current_date);`);
        res.send(data.rows);
    } catch (error) {
        res.send(error);
    }
});

// Total spent monthly (current month)
router.get('/monthly/spent', async(req, res) => {
    try {
        const data = await pool.query(`SELECT SUM(amount) FROM transaction WHERE type = 'withdrawal' 
            AND EXTRACT(MONTH FROM date) = EXTRACT(MONTH FROM current_date) 
            AND EXTRACT(YEAR FROM date) = EXTRACT(YEAR FROM current_date);`);
        res.send(data.rows);
    } catch (error) {
        res.send(error);
    }
});

// Total income
router.get('/monthly/income', async(req, res) => {
    try {
        const data = await pool.query(`SELECT SUM(amount) FROM transaction WHERE type = 'revenue' 
            AND EXTRACT(MONTH FROM date) = EXTRACT(MONTH FROM current_date) 
            AND EXTRACT(YEAR FROM date) = EXTRACT(YEAR FROM current_date);`);
        res.send(data.rows);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;