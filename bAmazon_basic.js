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


  
function yesToViewingInventory() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].item_name);
              }
              return choiceArray;
            },
            message: "What item would you like to purchase?"
          },
          {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase?"
          }
        ])
        .then(function(answer) {
          // get the information of the chosen item
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            if (results[i].item_name === answer.choice) {
              chosenItem = results[i];
            }
          }
  
          // determine if bid was high enough
          if (chosenItem.stockquantity >= parseInt(answer.quantity)) {
            // bid was high enough, so update db, let the user know, and start over
            connection.query(
              "UPDATE auctions SET ? WHERE ?",
              [
                {
                  stockquantity: chosenItem.stockquantity - answer.quantity
                },
                {
                  id: chosenItem.id
                }
              ],
              function(error) {
                if (error) throw err;
                console.log("Congratulations! All items have been purchased. Thank you for shopping at BAMAZON!");
                start();
              }
            );
          }
          else {
            // bid wasn't high enough, so apologize and start over
            console.log("Insufficient funds! Please try again.");
            start();
          }
        });
    });
  }
  
