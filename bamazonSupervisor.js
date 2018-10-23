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
    startSupervisor();
});

function startSupervisor() {
    inquirer.prompt([
        {
            name: "options",
            message: "What do you want to do?",
            choices: ["View All Departments","View Product Sales By Department", "Create New Department"],
            type: "list"
        }

    ]).then(function (answers) {
        console.log(answers.options);

        switch (answers.options) {
            case "View All Departments":
                return viewDepartments();

            case "View Product Sales By Department":
                return viewSales();
                
            case "Create New Department":
                return createDepartment();
        };
    });
};


function viewDepartments() {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        console.log("---------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].department_id + "\n" + "Department: " + res[i].department_name + "\n" + "Over Head Costs: " + res[i].over_head_costs);
            console.log("---------------------------------------------");
        };
        startSupervisor();
    });
};


function viewSales() {
    connection.query("SELECT departments.department_id, departments.department_name, SUM(departments.over_head_costs) AS over_head_costs, SUM(products.product_sales) AS product_sales, (SUM(products.product_sales) - departments.over_head_costs) AS total_profit FROM departments INNER JOIN products ON departments.department_name = products.department_name GROUP BY department_name", function (err, res) {
        if (err) throw err;
        console.log("---------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].department_id + "\n" + "Department: " + res[i].department_name + "\n" + "Over Head Costs: " + res[i].over_head_costs + "\n" + "Product Sales: " + res[i].product_sales + "\n" + "Total Profits: " + res[i].total_profit);
            console.log("---------------------------------------------");
        };
        startSupervisor();
    });
};


function createDepartment() {
    inquirer.prompt([
        {
            name: "department",
            message: "What department do you want to add?",
            type: "input"
        },
        {
            name: "cost",
            message: "What is the over head cost?",
            type: "input"
        }

    ]).then(function (answers) {
        connection.query("INSERT INTO departments SET ?", {
            department_name: answers.department,
            over_head_costs: answers.cost
        }, function (err) {
            if (err) throw err;
            console.log("---------------------------------------------");
            console.log("Successfully added " + answers.department + "!!");
            console.log("---------------------------------------------");
            startSupervisor();
        }
        );
    });
};