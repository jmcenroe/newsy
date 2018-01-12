'use strict';

const db = require('./db-setup');

const first = values => values[0];
const rest = values => values.slice(1);

function insertRecords(recordset, callback) {
    const record = first(recordset);
    const remaining = rest(recordset);

    // Use db.scrapedData to create a new record
    // If there are more records to create, call insertRecords with the rest of the array
    // If there are no more records to create, call the callback

    // What happens if an error occurs? How would you handle it?
}

module.exports = {
    insertRecords: insertRecords
}