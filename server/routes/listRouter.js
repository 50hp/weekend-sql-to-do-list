const express = require('express');
const router = express.Router();
const pool = require('../modules/listPool.js');

router.get(('/', (req, res) => {

    let queryText = `SELECT * FROM "list"
                     ORDER BY "timeCreated" ASC;`;
    pool.query(queryText)


}):








module.exports = router;
