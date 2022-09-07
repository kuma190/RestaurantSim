// File is running in the backend 
const express = require('express')
const mysql = require('mysql');

const app = express()
const port = 3000




const con = mysql.createConnection({
    host: "csce310ressim.cnb0q1gcfvpt.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "readysetgo",
    port:"3306"
});

/*con.connect(function(err) {
    console.log("Attempting to Connect");
    if (err) throw err;
    console.log("Connected!");
  
    con.query(`SELECT * FROM main.users`, function(err, result, fields) {
        if (err) console.log(err);
        if (result) console.log(result);
    });
    

    con.end();
}); */

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(express.json());
app.use(express.urlencoded());
const path = require('path');

app.get('/', (req, res) => {
  console.log("Request Made" );
  //res.send('Connecting to database! 1')
  //console.log(req);
  //res.json({ received: 'THIS IS A MESSAGE ANother BACKEND ' });
  con.connect(function(err) {
    con.query(`SELECT * FROM main.users`, function(err, result, fields) {
        if (err) res.send(err);
        if (result) res.send(result);
    });
});


});



app.post('/', (req, res) => {
  console.log("Request Made" );
  //res.send('Connecting to database! 1')
  console.log(req.body.name);
  res.json({ received: 'You sent a post request' })
})

app.post('/login', (req,res) =>{
  console.log("Request Made" );
  //res.send('Connecting to database! 1')
  //console.log(req.body.name);
  //res.json({received: req.body.username})
  // 
  con.connect(function(err) {
    var sqlSt = "SELECT * FROM main.Worker WHERE username ='"+ req.body.username+"'";
    con.query(sqlSt, function(err, result, fields) {
      
      console.log(sqlSt);
      console.log("frick");
      console.log(result);
      result.cookie = "username=frickfrack";
       res.json({received: result});
    });
  });
  //res.json({ received: 'You sent a post request' })
})
app.post('/orderHistory', async (req,res) =>{
  console.log("Request Made" );
  //res.send('Connecting to database! 1')
  //console.log(req.body.name);
  //res.json({received: req.body.username})
  // 
  var toSend= "<h1> Orders</h1><br>";
   con.connect( function(err) {
    //var sqlSt = "SELECT  * FROM main.Order WHERE username ='"+ req.cookies.username+"'";
    var sqlSt = "SELECT * FROM main.Order WHERE customer_id = 'testUser';"
    
     con.query(sqlSt,  function(err, result, fields) {
        
         Object.keys(result).forEach( function(key) {
        var row =result[key];

        var gettingItemID = "SELECT * FROM main.Order_Item WHERE order_id ='"+row.order_id+"';"
        //console.log(gettingItemID);
        con.query(gettingItemID,  function(err1, result1, fields1) {
                console.log(result1);
                 Object.keys(result1).forEach( function(key1){
                var row1 =result1[key1];

                var gettingItemInfo= "SELECT * FROM main.Item WHERE item_id = '"+row1.item_id+"';"

                con.query(gettingItemInfo,function(err2,result2,fields2){
                    Object.keys(result2).forEach(function(key2){
                      var row2=result2[key2];
                      //await new Promise(resolve =>  setTimeout(resolve,1000));
                      toSend+="<script>app.post('/editOrder"+row.order_id+"', async(req,res)=>{var sqlST = 'UPDATE main.Order_Item SET item_id='order"+req.body.order_id+"'WHERE order_id='"+req.body.order_id+"'req con.query(sqlST);})</script>"
                      toSend+="Food Ordered: "+row2.FoodType+ "  Price: " + row2.price + " Calories: "+row2.calories + " Cuisine:" +row2.cuisine;
                      toSend+= "<form action = '/editOrder' method = 'post'><input name='order"+row.order_id+"' type='text' placeholder ='ItemID'></input></form>"+"<br>";
                      //toSend="<div name='orderID"+row.order_id+"'> ";
                    });
                });


            });
        });
      });
       //res.sendFile("public/index.html");
    });
  });
  
  //let finalJson=JSON.parse(toSend);
  //res.json({sqlSt: finalJson});
  res.send(toSend);
  //res.json({ received: 'You sent a post request' })
})




app.post("/clearOrderHistory", async (req,res)=>{
  // Have to go into order_item to delete orders with id as well
  con.connect(async function(err) {
    var  sqlSt = "SELECT * FROM main.Order WHERE customer_id = 'testuser';";
    con.query(sqlSt, function(err,result,fields){
      Object.keys(result).forEach(function(key){
        // Now delete from order_item and then delete from order
        var deletingFromORderItems= "DELETE FROM main.Order_Item WHERE order_id = '"+result[key].order_id+"';";
        con.query(deletingFromORderItems);
      });
    }); 
    await new Promise(resolve =>  setTimeout(resolve,5000));
    var delSt="DELETE FROM main.Order WHERE customer_id= 'testuser';"
    con.query(delSt);
    //await new Promise(resolve =>  setTimeout(resolve,5000));
  });
  res.sendFile(__dirname+"/public/index.html");
})

app.post("/submitOrder", async (req,res)=>{
  con.connect(async function(err){
    var orderId = "";
    var table_data ={customer_id:'testUser', ts:0, restaurant_id: 1, currentStatus:'unfinished'};
    var sqlSt = "INSERT INTO main.Order SET ?;";

    con.query(sqlSt,table_data, function(err,result, fields){
      orderId= result.insertId;
      console.log(result.insertId);
    });
    await new Promise(resolve =>  setTimeout(resolve,5000));
    var sqlSt2= "INSERT INTO main.Order_Item(order_id,item_id) VALUES(" + orderId + ",  66666);";
    con.query(sqlSt2);
  })
})


app.post('/register', (req,res) =>{
  console.log("Request Made" );
  //res.send('Connecting to database! 1')
  //console.log(req.body.name);
  //res.json({received: req.body.username})
  // 
  con.connect(function(err) {
    var sqlSt = "SELECT * FROM main.Worker WHERE username ='"+ req.body.username+"'";
    con.query(sqlSt, function(err, result, fields) {
      if(result == null) {
        console.log("Big error");
      }
      if (result.length == 0) {
        var addSt= "INSERT INTO main.Worker(username,password,first_name,last_name,email,birthdate,birthmonth,birthyear,address,city,state,zip) VALUES('"+req.body.username+"','"+req.body.password+"','"+req.body.first_name+"','"+req.body.last_name+"','"+req.body.email+"',"+req.body.birthdate+","+req.body.birthmonth+","+req.body.birthyear+",'"+req.body.address+"','"+req.body.city+"','"+req.body.state+"',"+req.body.zip+");"
        con.query(addSt, function (err1, result1) {
          if (err1) throw err1;
          console.log("1 record inserted");
        });
      } else {

      }

       res.json({received: result});
    });
  });
  //res.json({ received: 'You sent a post request' })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.static(path.join(__dirname,'public')));

require('./dbRoutes.js')(app); 
app.use(express.static(path.join(__dirname,'public')));

require('./akRoutes.js')(app); 
app.use(express.static(path.join(__dirname,'public')));
require('./orderRoutes.js')(app); 
app.use(express.static(path.join(__dirname,'public')));