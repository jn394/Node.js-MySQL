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
            console.log("ID: " + res[i].item_id + "\n" + "Product: " + res[i].product_name + "\n" + "Department: " + res[i].department_name + "\n" + "Price: " + res[i].price + "\n" + "Quantity: " + res[i].stock_quantity + "\n" + "Sales: " + res[i].product_sales);
            console.log("---------------------------------------------");
        };
        startCustomer();
    });
};

function startCustomer() {
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

        var ID = parseInt(answers.productID);
        var productAmount = parseInt(answers.productAmount);

        connection.query("SELECT * FROM products WHERE item_id =" + answers.productID, function (err, res) {
            if (err) throw err;

            if (productAmount <= res[0].stock_quantity) {

                purchaseProduct(ID, res[0].stock_quantity, productAmount, res[0].price);
            }
            else {
                console.log("Insufficient Quantity!");
                startCustomer();
            }
        });
    });
};

function purchaseProduct(ID, total, productAmount, price) {
    var productSales = productAmount * price;
    var salesArray = [];

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            salesArray.push(res[i].product_sales);
        };

        var currentSales = salesArray[ID - 1];

        connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: total - productAmount,
                    product_sales: currentSales + productSales
                },
                {
                    item_id: ID
                }
            ],
            function (err, res) {
                if (err) throw err;
                console.log("\n" + "You have purchased the item! Total Cost: $" + productSales + "\n");
                readProducts();
            }
        );
    });
};

