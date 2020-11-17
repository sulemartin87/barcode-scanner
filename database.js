const sqlite3 = require('sqlite3').verbose();
//function for initializing the database
function newDatabase() {
    let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database database.');
    });

    db.serialize(() => {
        // Queries scheduled here will be serialized.
        db.run('CREATE TABLE tickets(ticket_number INTEGER PRIMARY KEY UNIQUE)');
        //     .run(`INSERT INTO tickets(ticket_number)
        //   VALUES('1'),
        //         ('2'),
        //         ('3')`)
        //     .each(`SELECT * FROM tickets`, (err, row) => {
        //         if (err) {
        //             throw err;
        //         }
        //         console.log(row.ticket_number);
        //     });
    });
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}
//function for entering a record
function insertData(number) {
    if (isNaN(number)) {
        openModal('Ticket is not valid');
    } else {

        let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the database database.');
        });


        db.serialize(() => {
            db.run(`INSERT INTO tickets(ticket_number)
          VALUES('${number}')`, (err, success) => {
                if (err) {

                    if ((err.message).match(/UNIQUE constraint/gi).length > 0) {
                        openModal('Barcode has already been scanned');
                    } else {
                        openModal(err.message);
                    }
                } else {
                    alert("successfully added");
                }
            });
        });
        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    }
}