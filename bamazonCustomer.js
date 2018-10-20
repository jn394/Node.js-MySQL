var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;

    readProducts();
});


function readProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("---------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + "\n" + "Product: " + res[i].product_name + "\n" + "Department: " + res[i].department_name + "\n" + "Price: " + res[i].price + "\n" + "Quantity: " + res[i].stock_quantity);
            console.log("---------------------------------------------");
        };
        promptMessage()
    });
};

function promptMessage() {
    inquirer.prompt([
        {
            name: "productID",
            message: "ID of the product they would like to buy?",
            type: "input"
        },
        {
            name: "productAmount",
            message: "How many units of the product would you like to buy?",
            type: "input"
        }

    ]).then(function (answers) {

        var productAmount = parseInt(answers.productAmount);

        connection.query("SELECT * FROM products WHERE item_id =" + answers.productID, function (err, res) {
            if (err) throw err;

            if (productAmount < res[0].stock_quantity) {

                purchaseProduct(answers.productID, res[0].stock_quantity, productAmount, res[0].price);
            }
            else {
                console.log("Insufficient Quantity!")
            }
        });
    });
};

function purchaseProduct(ID, total, productAmount, price) {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: total - productAmount
            },
            {
                item_id: ID
            }
        ],
        function (err, res) {
            console.log("\n"+"You have purchased the item! Cost: $" + productAmount * price + "\n");
        }
    );
};

