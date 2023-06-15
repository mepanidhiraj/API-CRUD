export  dbConn = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: '',
     database: 'test_api'
 });
 // connect to database
 dbConn.connect(); 