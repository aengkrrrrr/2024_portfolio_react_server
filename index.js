const express = require('express')
const app = express()
const port = 9000

const mysql = require('mysql');
const cors = require('cors');



var corsOptions = {
  origin: '*',  //* 모두허용
}

app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({extended: false}));

var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'chu_boardㄴ',
  password : '1234',
  database : 'chu_board'
});

db.connect();

/*
app.get('/list', (req, res) => {
  const Sql = "SELECT id,name,content,DATE_FORMAT(update_date, '%Y-%m-%d') AS update_date FROM board ORDER BY update_date DESC";
  db.query(Sql, function(err, result) {
     if (err) throw err;
    res.send(result);
  });
})
  */
app.get('/list', (req, res) => {
  const sql = "SELECT id,name,content,DATE_FORMAT(update_date, '%Y-%m-%d') AS update_date FROM board ORDER BY update_date DESC";

  db.query(sql, function(err, result) {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    res.send(result);
  });
});

app.get('/view', (req, res) => {
  const id = req.query.id;

  const Sql = "SELECT name, content FROM board WHERE id=?";
  db.query(Sql, [id], function(err, result) {
     if (err) throw err;
    res.send(result);
  });
})

app.post('/delete', (req, res) => {
  const id = req.body.boardIdList;

  const Sql = `DELETE from board where id in (${id})`;
  console.log(id);
  db.query(Sql, function(err, result) {
     if (err) throw err;
    res.send(result);
  });
})
app.post('/insert', (req, res) => { 
  let name = req.body.name;
  let content = req.body.content;

  console.log(name,content);
  //const{name, content} = req.body;
  
  let sql = "INSERT INTO board (name, content) VALUES (?,?)";
  db.query(sql, [name, content], function(err, result) {
    if (err) throw err;
   res.send(result);
 });
})
app.post('/update', (req, res) => {
  
  let name = req.body.name;
  let content = req.body.content;

  //const{id, name, content} = req.body;
  
  let sql = "UPDATE board SET name=?, content=? WHERE id=?";
  db.query(sql, [name, content, id], function(err, result) {
    if (err) throw err;
   res.send(result);
 });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
  