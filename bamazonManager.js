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
    console.log("connected as id " + connection.threadId + "\n");
    startManager();
});

function startManager() {
    inquirer.prompt([
        {
            name: "options",
            message: "What do you want to do?",
            choices: ["View Product For Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            type: "list"
        }

    ]).then(function (answers) {
        console.log(answers.options);

        switch (answers.options) {
            case "View Product For Sale":
                readProducts();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addNewProduct();
                break;
        };
    });
};


function readProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("---------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + "\n" + "Product: " + res[i].product_name + "\n" + "Department: " + res[i].department_name + "\n" + "Price: " + res[i].price + "\n" + "Quantity: " + res[i].stock_quantity);
            console.log("---------------------------------------------");
        };
        startManager()
    });
};

function lowInventory() {
    connection.query("SELECT item_id,product_name, department_name, price, stock_quantity FROM products WHERE stock_quantity <=5;", function (err, res) {
        if (err) throw err;
        console.log("---------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + "\n" + "Product: " + res[i].product_name + "\n" + "Department: " + res[i].department_name + "\n" + "Price: " + res[i].price + "\n" + "Quantity: " + res[i].stock_quantity);
            console.log("---------------------------------------------");
        }
        startManager();
    });
};

function addInventory() {

    var itemArray = [];
    var stockQArray = [];

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("---------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            itemArray.push(res[i].product_name);
            stockQArray.push(res[i].stock_quantity);
        };

        inquirer.prompt([
            {
                name: "additem",
                message: "Add more to which item?",
                choices: itemArray,
                type: "list"
            }

        ]).then(function (answers) {
            var addeditem = answers.additem;

            var stockQ = stockQArray[itemArray.indexOf(addeditem)];

            if (answers.additem) {
                inquirer.prompt([
                    {
                        name: "amountAdded",
                        message: "How much more?",
                        type: "input"
                    }

                ]).then(function (answers) {

                    var total = stockQ + parseInt(answers.amountAdded);

                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: total
                            },
                            {
                                product_name: addeditem
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("---------------------------------------------");
                            console.log("Successfully added " + addeditem + " by " + answers.amountAdded + "!!" + "\n" + "New Total: " + total);
                            console.log("---------------------------------------------");
                            startManager();
                        });
                });
            }
        });
    });
};


function addNewProduct() {

    inquirer.prompt([
        {
            name: "productName",
            message: "Name of product?",
            type: "input"
        },
        {
            name: "departmentName",
            message: "Name of department?",
            type: "input"
        },
        {
            name: "price",
            message: "Price of product?",
            type: "input"
        },
        {
            name: "stockQ",
            message: "Stock Quantity?",
            type: "input"
        }

    ]).then(function (answers) {

        connection.query("INSERT INTO products SET ?", {
            product_name: answers.productName,
            department_name: answers.departmentName,
            price: answers.price,
            stock_quantity: answers.stockQ
        }, function (err) {
            if (err) throw err;
            console.log("---------------------------------------------");
            console.log("Successfully added " + answers.productName + "!!");
            console.log("---------------------------------------------");
            startManager();
        }
        );
    });
};
