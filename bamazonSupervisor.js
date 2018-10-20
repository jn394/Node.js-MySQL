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
    startSupervisor();
});

function startSupervisor() {
    inquirer.prompt([
        {
            name: "options",
            message: "What do you want to do?",
            choices: ["View Product Sales By Department", "Create New Department"],
            type: "list"
        }

    ]).then(function (answers) {
        console.log(answers.options);

        switch (answers.options) {
            case "View Product Sales By Department":
                viewSales();
                break;
            case "Create New Department":
                createDepartment();
                break;
        };
    });
};

function viewSales() {
    connection.query("ALTER TABLE departments ADD total_profit DECIMAL(10,2)", function (err) {
        if (err) throw err;
    });

    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;

        startSupervisor();
    });
};