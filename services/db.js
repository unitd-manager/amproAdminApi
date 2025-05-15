const mysql = require('mysql2');
const config = require('../config');

async function query(sql, params) {
  const connection = await mysql.createConnection({
    /* don't expose password or any sensitive info, done only for demo */
    host: "localhost",
    user: "naijagahuser",
    password: "E5jZs8WHEAhMDE7D",
    database: "naijagah",
  });
//   return
//   const [results,] = await connection.execute(sql, params);
// connection.execute(
//   'SELECT * FROM `programming_languages`',[],
//   function(err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available

//     // If you execute same statement again, it will be picked from a LRU cache
//     // which will save query preparation time and give better performance
//   }
// );
// simple query
connection.query(
  'SELECT * FROM programming_language',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields);
    return results// fields contains extra meta data about results, if available
  }
);
 

     
}

module.exports = {
  query
}