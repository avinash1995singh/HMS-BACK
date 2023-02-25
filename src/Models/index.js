const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hms",
    port: 3306,
  });
  
  
  db.connect((err) => {
    if (err) {
      console.log(err, "error Come");
    } else {
      console.log("DataBase Connect Succesfully");
    }
  });

   module.exports= db