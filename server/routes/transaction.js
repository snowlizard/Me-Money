const express = require('express');
const router = express.Router({ mergeParams: true, strict: true});
const pool = require("../db");

router.get('/all', async(req, res) => {
    try {
        const data = await pool.query('SELECT * FROM transaction;');
        res.json(data.rows);
    } catch (error) {;
        res.send(error);
    }
});

router.get('/source/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const data = await pool.query('SELECT * FROM transaction WHERE source = ($1);', [id]);
        res.json(data.rows);
    } catch (error) {;
        res.send(error);
    }
});

router.get('/destination/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const data = await pool.query('SELECT * FROM transaction WHERE destination = ($1);', [id]);
        res.json(data.rows);
    } catch (error) {;
        res.send(error);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const data = await pool.query('SELECT * FROM transaction WHERE id = ($1);', [id]);
        res.json(data.rows);
    } catch (error) {;
        res.send(error);
    }
});

router.post('/', async(req, res) => {
    try {
        const transaction = req.body;
        handleTransaction(transaction);
        const values = Object.values(transaction, 'new');
        values.shift();
        const data = await pool.query(`INSERT into transaction(description, source,
            destination, date, amount, category, subcategory, type) VALUES(
            $1, $2, $3, $4, $5, $6, $7, $8);`, values);
        res.json(200);
    } catch (error) {
        res.send(error);
    }
});

router.put('/', async(req, res) => {
    try {
        const transaction = req.body;
        let previous = getTransaction(transaction.id);
        handlePreviousTransaction(previous);
        handleTransaction(transaction);
        const values = Object.values(transaction);
        const data = await pool.query(`UPDATE transaction SET description = ($2),
            source = ($3), destination = ($4), date = ($5), amount = ($6),
            category = ($7), subcategory = ($8), type = ($9) WHERE id = ($1);`, values);
        res.send(200);
    } catch (error) {
        res.send(error);
    }
});

router.delete('/', async(req, res) => {
    try {
        const transaction = req.body;
        let previous = getTransaction(transaction.id);
        handlePreviousTransaction(transaction);
        const data = await pool.query('DELETE FROM transaction WHERE id = ($1);', [transaction.id]);
        res.send(200);
    } catch (error) {
        res.send(error);
    }
});

/**
 * Apply database updates based on the type of transaction (withdrawal, transfer, revenue)
 * and database action
 * @param {Object} transaction 
 */
const handleTransaction = async (transaction) => {
    switch (transaction.type) {
        case 'withdrawal':
            updateAccountBalance(transaction.amount * -1, transaction.source);
            break;
        case 'transfer':
            updateAccountBalance(transaction.amount * -1, transaction.source);
            updateAccountBalance(transaction.amount, transaction.destination);

            break;
        case 'revenue':
            updateAccountBalance(transaction.amount, transaction.destination);
            break;
    }
}

/**
 * update previous transaction
 * @param {Object} transaction 
 */
const handlePreviousTransaction = async (transaction) => {
    switch (transaction.type) {
        case 'withdrawal':
            updateAccountBalance(transaction.amount, transaction.source);
            break;
        case 'transfer':
            updateAccountBalance(transaction.amount, transaction.source);
            updateAccountBalance(transaction.amount * -1, transaction.destination);

            break;
        case 'revenue':
            updateAccountBalance(transaction.amount * -1, transaction.destination);
            break;
    }
}

/**
 * Adds amount to the balance of the given account id
 * @param {integer} amount 
 * @param {integer} account_id 
 * @returns boolean
 */
const updateAccountBalance = async (amount, account_id) => {
    try {
        const data = await pool.query('UPDATE account SET balance = balance + ($1) WHERE id = ($2)', [amount, account_id]);
        return true;
    } catch (error){
        return false;
    }
}

/**
 * Returns transaction json object
 * @param {integer} id 
 * @returns transaction object
 */
const getTransaction = async (id) => {
    try {
        const data = await pool.query('SELECT * FROM transaction WHERE id = ($1);', [id]);
        return data.rows[0];
    } catch (error) {;
        return null;
    }
}

module.exports = router;