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
                movieThis(entry);
                break;
            case "Add New Product":
                doThis();
                break;
        };
    });
};


function readProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
    });
    startManager();
};

function lowInventory() {
    connection.query("SELECT item_id,product_name, department_name, price, stock_quantity FROM products WHERE stock_quantity <=5;", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i]);
        }
    });
    startManager();
};

function addInventory() {
    
//Get myArray from a select call

    inquirer.prompt([
        {
            name: "additem",
            message: "What more to which pro?",
            // choices: myArray,
            type: "list"
        }

    ]).then(function (answers) {
};