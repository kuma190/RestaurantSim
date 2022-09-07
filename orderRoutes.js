const mysql = require('mysql');
const con = mysql.createConnection({
    host: "csce310ressim.cnb0q1gcfvpt.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "readysetgo",
    port:"3306"
});

module.exports = function(app){


    app.get('/orderRoutes/ordersHistory', (req, res) => {
        console.log(" current workers Request Made" );
        //res.send('Connecting to database! 1')
        //console.log(req.body.name);
        con.connect(function(err) {
          con.query(`SELECT * From main.Order INNER JOIN main.Order_Item on main.Order.order_id=main.Order_Item.order_id INNER JOIN main.Item on main.Item.item_id =main.Order_Item.item_id INNER JOIN main.restaurant_location on main.restaurant_location.id=main.Order.restaurant_id WHERE main.Order.customer_id='testUser';`, function(err, result, fields) {
              if (err) res.send(err);
              if (result) res.send(result);
          });
      });
        //res.json({ received: 'You sent a post request' })
        //res.send("Howdy");
      })

      app.post('/orderRoutes/editOrder', (req, res) => {
        console.log(" edit worker Request Made" +req.body.currentStatus);
        
        data = JSON.parse(JSON.stringify(req.body))
        console.log("DAta"+data)
        // for (key in data){
        //     if (data[key] == ''){
        //         data[key] = NULL;
        //     }
        // }
        res.send('Connecting to database! 1')
        //console.log(req.body.name);
        var arr = [data['address']]
        console.log("order_id"+arr);
        var addSt= "UPDATE main.Order SET currentStatus='"+req.body.currentStatus+"'WHERE order_id='"+req.body.orderID+"' AND customer_id='testUser';";
        console.log("EEE "+addSt);
        // /if (data['username'] == ''){ return;}
        con.connect(function(err) {
           
            con.query(addSt, function(err, result, fields) {
                console.log("result",result)
                if (result != undefined){console.log("hello"); res.status(200).send()}
                else{
                    console.log("undefined")

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