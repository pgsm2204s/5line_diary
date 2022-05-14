const express = require('express');
const app = express();
const mysql = require('mysql');

const port = 3002;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '231224Syun1122#',
    database: '5line_diary',
});

// connection.connect((err) => {
//     if (err) {
//       console.log('error connecting: ' + err.stack);
//       return;
//     }
//     console.log('success');
// });

app.use(express.json());

app.get('/diarys', (req, res) => {
    connection.query(
        "SELECT id, text, point, DATE_FORMAT(date, '%Y-%m-%d') AS date FROM diarys",
        (error, results) => {
            res.json({
                "status": true,
                "results": results
            });
        }
    );
});

app.get('/diarys/:id', (req, res) => {
    connection.query(
        "SELECT id, text, point, DATE_FORMAT(date, '%Y-%m-%d') AS date FROM diarys WHERE id = ?",
        [req.params.id],
        (error, results) => {
            res.json({
                "status": true,
                "results": results
            });
        }
    );
});

app.post('/diarys', (req, res) => {
    connection.query(
        "INSERT INTO diarys (text, point, date) VALUES (?, ?, ?)",
        [req.body.text, req.body.point, req.body.date],
        (error, results) => {
            res.json({
                "status": true,
            });
        }
    );
});

app.put('/diarys/:id', (req, res) => {
    connection.query(
        "UPDATE diarys SET ? WHERE id = ?",
        [req.body, req.params.id],
        (error, results) => {
            res.json({
                "status": true,
            });
        }
    );
});

app.delete('/diarys/:id', (req, res) => {
    connection.query(
        "DELETE FROM diarys WHERE id = ?",
        [req.params.id],
        (error, results) => {
            res.json({
                "status": true,
            });
        }
    );
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});