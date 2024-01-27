// Imports
const express = require('express');
const router = express.Router();
const pg = require('pg');
const pool = require('../modules/pool');

// GET Route - Gabriel
router.get('/', (req, res) => {
  console.log('in GET request');
  let queryText = 'SELECT * FROM shopping_list ORDER By;';

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error in GET route', error);
      res.sendStatus(500);
    });
}); // end of GET route

// POST Route - Jessica
router.post('/', (req, res) => {
  console.log('req.body: ', req.body);
  let itemToAdd = req.body;
  let queryText = `
    INSERT INTO "shopping_list" ("name", "quantity", "unit")
    VALUES ($1, $2, $3);
    `;

  pool
    .query(queryText, [itemToAdd.name, itemToAdd.quantity, itemToAdd.unit])
    .then((result) => {
      // Query was successful!
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error in POST route: ', error);
      res.sendStatus(500);
    });
}); // end of POST Route.

// PUT Route - Erik
router.put('/:id', (req, res) => {
  console.log(req.params, req.body);
  const modifiedShoppingList = parseInt(req.params.id);
  console.log(modifiedShoppingList);
  let queryText = `UPDATE "shopping_list" SET "purchased" = NOT "purchased" WHERE "id" = $1;`;

  pool
    .query(queryText, [modifiedShoppingList])
    .then((result) => {
      res.send(result.rows);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error in PUT route: ', error);
      res.sendStatus(500);
    });
});

// DELETE Route - Ying
router.delete('/:id', (req, res) => {
  const deleteShoppingItem = parseInt(req.params.id);
  console.log(deleteShoppingItem);
  const queryText = `DELETE FROM "shopping_list" WHERE id = $1;`;

  pool
    .query(queryText, [deleteShoppingItem])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Unable to delete item', error);
      res.sendStatus(500);
    });
});

module.exports = router;
