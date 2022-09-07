const mysql = require('mysql');
const con = mysql.createConnection({
    host: "csce310ressim.cnb0q1gcfvpt.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "readysetgo",
    port:"3306"
});


module.exports = function(app){


    app.get('/dbRoutes/restaurantLocations', (req, res) => {
        // Retreive Restaurant Locations
        console.log("Request Made" );
        //res.send('Connecting to database! 1')
        //console.log(req.body.name);
        con.connect(function(err) {
          con.query(`SELECT * FROM main.restaurant_location`, function(err, result, fields) {
              if (err) res.send(err);
              if (result) res.send(result);
                });
            });
            
        //res.json({ received: 'You sent a post request' })
        //res.send("Howdy");
      })

      app.post('/dbRoutes/restaurantLocations', (req, res) => {
        // Inserts a restaurant location 
        console.log("POST Request Made" );
        console.log(req.body);

        
        //res.send('Connecting to database! 1')
        //console.log(req.body.name);
        con.connect(function(err) {
          con.query(`INSERT into main.restaurant_location(address,city,state,zipcode,lat,lon) VALUES ('${req.body.address}','${req.body.city}','${req.body.state}',${req.body.zipcode},${req.body.latitude},${req.body.lontitude})`, function(err, result, fields) {
              if (err) res.send(err);
              if (result) res.send({status:"success"});
                });
            });

        //res.json({ received: 'You sent a post request' })
        //res.send("Howdy");
        //res.send("PostReceived");
      })// END of POST request

      app.put('/dbRoutes/restaurantLocations', (req, res) => {
        // Update a restaurant location 
        console.log("PUT Request Made" );
        console.log(req.body);
        //res.send("PUTReceived");
        var sql = `UPDATE main.restaurant_location SET address='${req.body.address}', state='${req.body.state}',city ='${req.body.city}',zipcode=${req.body.zipcode},lat=${req.body.latitude},lon=${req.body.lontitude} WHERE id=${req.body.restaurantid}`;
        //res.send('Connecting to database! 1')
        //console.log(req.body.name);
       con.connect(function(err) {
          con.query(sql, function(err, result, fields) {
              if (err) res.send(err);
              if (result) res.send({status:"success"});
                });
            });
        //res.json({ received: 'You sent a post request' })
        //res.send("Howdy");
      })// END of PUT request

      app.delete('/dbRoutes/restaurantLocations', (req, res) => {
        // Update a restaurant location 
        console.log("Delete Request Made" );
        console.log(req.body);
        //res.send("DeleteReceived");
        //res.send('Connecting to database! 1')
        //console.log(req.body.name);
        var sql = `DELETE FROM main.restaurant_location WHERE id =${req.body.restaurantid}`
        con.connect(function(err) {
          con.query(sql, function(err, result, fields) {
              if (err) res.send(err);
              if (result) res.send({status:"success"});
                });
            });
        //res.json({ received: 'You sent a post request' })
        //res.send("Howdy");
      })// END of PUT request

    //We need to add a POST, DELETE, and PUT
      /*

      We can add diffrent Request types here
    app.get('/dbRoutes/restaurantLocations', function(req, res){

        console.log("request made to login")*/
        /*res.render('login', {
            title: 'Express Login'
        });*/
       
    //});
    

    //other routes..
}

