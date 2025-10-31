const express = require('express');
const router = express.Router({ mergeParams: true, strict: true});
const pool = require("../db");

router.get('/all', async(req, res) => {
    try {
        const data = await pool.query('SELECT * FROM account;');
        res.json(data.rows);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const account_id = req.params.id;
        const data = await pool.query('SELECT * FROM account WHERE id = ($1);', [account_id]);
        res.json(data.rows);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.post('/', async(req, res) => {
    try {
        const account = Object.values(req.body);
        const data = await pool.query('INSERT INTO account(name, balance, type) values($1, $2, $3);', account);
        res.json(200);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.put('/', async(req, res) => {
    try {
        const query = ' set name = ($2), balance = ($3), type=($4) WHERE id = ($1);';

        const account = Object.values(req.body);
        const data = await pool.query('UPDATE account' + query, account);
        res.json(200);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const account_id = req.params.id;
        const data = await pool.query('DELETE * FROM account WHERE id = ($1);', [account_id]);
        res.json(200);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = router;