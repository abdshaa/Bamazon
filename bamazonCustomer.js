var inquirer = require("inquirer");
var mysql = require("mysql");
// var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123456789",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
});

function searchProduct() {
  inquirer
    .prompt([
      {
        name: "ID",
        type: "input",
        message: "Enter Item ID that you wish to purchase."
      },
      {
        name: "qntInput",
        type: "input",
        message: "How many units do you wish to purchase?"
      }
    ])
    .then(function(Purchase) {
      connection.query(
        "SELECT * FROM products WHERE item_id=?",
        Purchase.ID,
        function(err, res) {
          for (var i = 0; i < res.length; i++) {
            if (Purchase.qntInput > res[i].stock_quantity) {
              console.log("Oh no! Out of stock!");
            } else {
              console.log("You selected: ");
              console.log("Item: " + res[i].product_name);
              console.log("Price: " + res[i].price);
              console.log("Quantity: " + res[i].qntInput);
              console.log("Total: " + res[i].price * Purchase.qntInput);

              var stockUpdate = res[i].stock_quantity - Purchase.qntInput;
              var id = Purchase.ID;
              confirmPurchase(stockUpdate, id);
            }
          }
        }
      );
    });
}
function confirmPurchase(stockUpdate, id) {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "Confirm",
        message: "Please confirm your purchase",
        default: true
      }
    ])
    .then(function(acceptPurchase) {
      if (acceptPurchase.Confirm === true) {
        connection.query("UPDATE products SET ? WHERE ?", [
          {
            stock_quantity: stockUpdate
          },
          {
            item_id: id
          }
        ]);
        console.log("Thank you for your purchase!");
      }
    });
}
searchProduct();
