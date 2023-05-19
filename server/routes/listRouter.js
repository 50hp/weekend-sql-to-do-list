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

router.post('/', (req, res) => {
    const newTask = req.body;
    console.log(newTask);

    const queryText =`
    INSERT INTO "list" ("task", "notes")
    VALUES ($1, $2);`;

    pool.query(queryText, [newTask.task, newTask.notes])
        .then((result) => {
            res.sendStatus(201);
        }).catch((err) => {
            console.log('database err', err);
        });

});



module.exports = router;
