var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon_db',
})

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
   start();
  });

  var start = function(){
      inquirer.prompt({
          name:"customerViewInventory",
          type:"rawlist",
          message:"Welcome to BAMAZON! Would you like to see what lovely items we have?",
          choices:["YES","NO"]
      }).then(function(answer){
          if(answer.customerViewInventory.toUpperCase()=="YES"){
              yesToViewingInventory();
          } else {
              start();
          }
      })
  }

  var yesToViewingInventory = function(){
      connection.query("SELECT * FROM products", function(err,res){
          console.log(res);
          inquirer.prompt({
              name:"choice",
              type:"rawlist",
              choices: function(value){
                  var choiceArray = [];
                  for(var i=0;i<res.length;i++){
                      choiceArray.push(res[i].productname);
                  }
                  return choiceArray;
              },
              message:"What item would you like to purchase?"

          }).then(function(answer){
              for (var i=0;i<res.length;i++){
                  if(res[i].productname==answer.choice){
                      var chosenItem = res[i];
                      inquirer.prompt({
                          name:"purchase",
                          type:"input",
                          message:"How many would you like to buy?",
                          validate: function(value){
                              if(isNaN(value)==false){
                                  return true;
                              } else {
                                  return false;
                              }
                          }
                      }).then(function(answer){
                          if(chosenItem.stockquantity >= parseInt(answer.purchase)){
                                      purchaseItems();
                                  } else {
                                      console.log("Insufficient funds! Please try again.")
                                      start();
                                  }
                              })
                          }
                    }
                  }
          )
      })
  }

  var purchaseItems = function(){
    connection.query('SELECT * FROM products', function(err, res) {
    console.log(res);
    var choiceArray = [];
    for (var i = 0; i < res.length; i++) {
        choiceArray.push(res[i].product_name);
    }
      inquirer.prompt({
          name:"showPrice",
          type:"rawlist",
          message:"Great! We have enough in stock! Did you want to continue with your purchase?",
          choices:["YES","NO"]
      }).then(function(answer){
          if(answer.showPrice.toUpperCase()=="YES"){
            console.log("Congratulations! You've purchased all the items you wished for!")
            start();
          } else {
              start();
          }
      })
  }
    )
  }
