const express = require('express');
const router = express.Router();
const pool = require('../modules/listPool.js');


//route to get list data from database
router.get('/:id', (req, res) => {
    
    let orderToggle = req.params.id;
    //console.log(req.params, orderToggle);
    let queryText = '';

    if ( orderToggle == 0 ) {
        queryText = `SELECT * FROM "list"
                     ORDER BY "timeCreated" ASC;`;
    }else {
        queryText = `SELECT * FROM "list"
                     ORDER BY "timeCreated" DESC;`;
    }
    pool.query(queryText)
    .then((response) => {
        res.send(response.rows);
        console.log('sending list');
    }).catch((err) => {
        res.sendStatus(500);
        console.log('request for list failed');
    });

});

//route to insert new items
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
            console.log('database request err', err);
            res.sendStatus(500);
        });

});

//route to update competion status
router.put('/:id', (req, res) => {
    let idToUpdate = req.params.id;
    let status = req.body.status;
    let queryText = ``;
    console.log(status, idToUpdate)

    if(status === 'true'){
        queryText = `UPDATE "list" SET "status" = FALSE, "timeCompleted" = NULL WHERE "id"=$1;`;
    }else{
        queryText = `UPDATE "list" SET "status" = TRUE, "timeCompleted" = CURRENT_TIMESTAMP WHERE "id"=$1;`;
    }

    pool.query(queryText, [idToUpdate])
        .then((result) => {
            res.sendStatus(201);
        }).catch((err) => {
            console.log('database request err', err);
            res.sendStatus(500);
        }); 
});

//route to remove a specified entry
router.delete('/:id', (req, res) => {
    
    let idToRemove = req.params.id;
    let queryText = `DELETE FROM "list" WHERE "id"=$1;`;

    pool.query(queryText, [idToRemove])
        .then((result) => {
            res.sendStatus(202);
        }).catch((err) => {
            console.log('database request err', err);
            res.sendStatus(500);
        });

});

module.exports = router;




