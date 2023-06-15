const http = require('http');
const mysql = require('mysql')
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');


var urlencodedParser = bodyParser.urlencoded({ extended: false })

var port = 8000;

var app = express(); 

app.use(cors({ origin: true }));

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())


var dbConn = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: '',
     database: 'test_api'
 });



// connect to database

dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });


// get data
app.get('/get', function (req, res) {
  dbConn.query('SELECT * FROM users', function (error, results, fields) {
    if (error) throw error;
      return res.send(results);
  });
});


app.get('/get/:id', function (req, res) {  
    // res.send('id: ' + req.params.id);
    dbConn.query('SELECT * FROM users WHERE id='+req.params.id, function (error, results, fields) {
    if (error) throw error;
      return res.send(results);
  });
});  


// Insert Data
app.post('/insert' , function (req, res) {  
      

    const user = req.body;

    console.log("User : - ",user);    

    let data = {
      name: user.name,
      department: user.department,
      
    };
    
    if (!user) {

      return res.status(400).send({ error:true, message: 'Please provide user' });

    }

    dbConn.query("INSERT INTO users SET ? ", data , function (error, results, fields) {
      
      if (error) throw error;

        console.log("Inserted...");
        
        return res.send({ error: false, data: results, message: 'Inserted Successfully.' });

    });

    

});  


// Update Data
app.put('/update/:id',bodyParser.urlencoded(), function (req, res) {  

    const id = req.params.id;
    const user = req.body;

    // console.log(req);    

    let data = {
      name: user.name,
      department: user.department,
      
    };

    
    if (!user) {

      return res.status(400).send({ error:true, message: 'Please provide user' });

    }
    var query = "UPDATE users SET ? WHERE id="+id;
    console.log(query);

    dbConn.query(query,data, function (error, results, fields) {
      
      if (error) throw error;

        console.log("Updated...");

        return res.send({ error: false, data: results, message: 'Updated Successfully.' });

    });


}); 


app.delete('/delete/:id', function (req, res) {  

  const id = req.params.id;

  var query = "DELETE FROM users WHERE id="+id;
  
  console.log(query);


  dbConn.query(query, function (error, results, fields) {
      
      if (error) throw error;

        console.log("Deleted...");

        return res.send({ error: false, data: results, message: 'Deleted Successfully.' });

    });

}); 




var server = app.listen(port, function () {  
   
  console.log('Listening at http://localhost:%s', port);
    
});  
