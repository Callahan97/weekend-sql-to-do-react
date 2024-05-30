const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) =>{
    const sqlText =`SELECT * FROM tasks ORDER BY name, location DESC;`;
    pool.query(sqlText)
    .then((result) => {
        console.log(`Got tasks info back from database`, result);
        res.send(result.rows);
    })
    .catch((error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500);
    })
})
// POST
router.post('/', (req, res) => {
    const task = req.body;
    console.log(task, 'task');
    const sqlText = `INSERT INTO tasks (name, location)
    VALUES ($1, $2)`;

    pool.query(sqlText, [task.name, task.location])
    .then((result) => {
        console.log(`Added a task to the database`, task);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500);
    })
});
// PUT
router.put('/toggle/:id', (req, res) => {
    let {id} = req.params;
    const sqlText = `
    UPDATE "tasks" SET "completed" = NOT "completed"
    WHERE "id" = $1;
    `;
    pool.query(sqlText, [id])
    .then((result) => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500);
    })
});
// DELETE
router.delete('/:id', (req, res) => {
    let {id} = req.params;
    const sqlText = `DELETE FROM "tasks" WHERE "id" = $1;`;
    pool.query(sqlText, [id])
    .then((result) => {
        console.log(`Got Confirmation back from database`, result);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500);
    })
})
module.exports = router;
