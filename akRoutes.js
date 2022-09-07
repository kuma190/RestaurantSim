const mysql = require('mysql');
const con = mysql.createConnection({
    host: "csce310ressim.cnb0q1gcfvpt.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "readysetgo",
    port:"3306"
});

module.exports = function(app){


    app.get('/akRoutes/currentWorkers', (req, res) => {
        console.log(" current workers Request Made" );
        //res.send('Connecting to database! 1')
        //console.log(req.body.name);
        con.connect(function(err) {
          con.query(`SELECT * FROM main.Worker`, function(err, result, fields) {
              if (err) res.send(err);
              if (result) res.send(result);
          });
      });
        //res.json({ received: 'You sent a post request' })
        //res.send("Howdy");
      })

      app.post('/akRoutes/editWorker', (req, res) => {
        console.log(" edit worker Request Made" );
        data = JSON.parse(JSON.stringify(req.body))
        console.log(data)
        for (key in data){
            if (data[key] == ''){
                data[key] = NULL;
            }
            else{
                data[key]= "'" + data[key]+ "'"
            }
        }
        ..res.send('Connecting to database! 1')
        //console.log(req.body.name);
    //     var arr = [data['first_name'],data['last_name'],data['last_name'],data['password'],data['email'],data['birthday'],
    // data['address'],data['city'],data['state'],data['zip'],data['position'],data['username']]
        var addSt= `UPDATE main.Worker 
        SET 
        first_name = ${data['first_name']},
        last_name = ${data['last_name']},
        username = ${data['username']},
        password = ${data['password']}, 
        email = ${data['email']},
        birthday = ${data['birthday']},
        address = ${data['address']},
        city = ${data['city']},
        state = ${data['state']},
        zip = ${data['zip']},
        position = ${data['position']},
        restaurant_id = ${data['restaurant_id']}
        WHERE (username = ${data['username']});
        `
        // /if (data['username'] == ''){ return;}
        con.connect(function(err) {
           
            con.query(addSt, function(err, result, fields) {
                console.log("result",result)
                console.log("error",err)
                if (result == undefined){
                    res.status(400).send()
                }
                else if (result != undefined && result.warningCount != 0){
                    res.status(400).send()
                }
                else{
                    res.status(200).send()

                } 
            });
      });
        // res.json({ received: 'You sent a post request' })
        // res.send("Howdy");
      })

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