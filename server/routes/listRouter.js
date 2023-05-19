const express = require('express');
const router = express.Router();
const pool = require('../modules/listPool.js');


//route to get list data from database
router.get('/', (req, res) => {

    let queryText = `SELECT * FROM "list"
                     ORDER BY "timeCreated" ASC;`;

    pool.query(queryText)
    .then((response) => {
        res.send(response.rows);
        console.log('sending list');
    }).catch((err) => {
        res.sendStatus(500);
        console.log('request for list failed');
    });

});








module.exports = router;
