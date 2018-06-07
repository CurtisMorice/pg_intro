const express = require('express');
const router = express.Router();

//REQUIRE pool.js into the ROUTER
const pool = require('../modules/pool');

router.get('/', ( req, res ) => {
    console.log(`in song router-GET`);
    // build a query
    // use pool for the query
    // when query gets back send the data
    const queryText = 'SELECT * FROM songs';
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) =>{
            console.log(`Error getting all songs: ${err}`);
            res.sendStatus(500);
        })
})

router.post('/', ( req, res ) => {
    console.log(`in song router-POST`);
    res.sendStatus(200);
})

router.put('/', ( req, res ) => {
    console.log(`in song router-UPDATE`);
    res.sendStatus(200);
})

router.delete('/:id', ( req, res ) => {
    console.log(`in song router-DELETE`);
    const id = req.params.id;
    const queryText = 'DELETE FROM songs WHERE id=$1';
    // Passing two things to the query. 1) the query text
    // 2) the calues to substitute into the query for the $1, $2, $3
    // when subbin in multiple things, the order is important
    pool.query(queryText, [id])
        .then((results) => {
            console.log(`successful delete of song ${results}`);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(`ERROR deleting song ${err}`);
            res.sendStatus(500);
            
        })
    res.sendStatus(200);
})

module.exports = router;