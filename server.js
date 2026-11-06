
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Simple Calculator</title>

        <style>
            body {
                font-family: Arial, sans-serif;
                background: linear-gradient(135deg, #667eea, #764ba2);
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }

            .calculator {
                background: white;
                padding: 35px;
                border-radius: 15px;
                width: 320px;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }

            h1 {
                color: #5b4baf;
            }

            input, select, button {
                width: 100%;
                padding: 12px;
                margin: 10px 0;
                box-sizing: border-box;
                border-radius: 8px;
                border: 1px solid #ddd;
                font-size: 16px;
            }

            button {
                background: #6658d3;
                color: white;
                border: none;
                cursor: pointer;
            }

            button:hover {
                background: #5142b5;
            }

            p {
                color: #777;
            }
        </style>
    </head>

    <body>
        <div class="calculator">
            <h1>Simple Calculator</h1>
            <p>Perform Basic Mathematical Operations</p>

            <form action="/calculate" method="POST">
                <input type="number" name="num1"
                placeholder="Enter First Number" required>

                <select name="operator">
                    <option value="+">Addition (+)</option>
                    <option value="-">Subtraction (-)</option>
                    <option value="*">Multiplication (*)</option>
                    <option value="/">Division (/)</option>
                </select>

                <input type="number" name="num2"
                placeholder="Enter Second Number" required>

                <button type="submit">Calculate</button>
            </form>
        </div>
    </body>
    </html>
    `);
});

app.post("/calculate", (req, res) => {
    const num1 = Number(req.body.num1);
    const num2 = Number(req.body.num2);
    const operator = req.body.operator;

    let result;

    if (operator === "+") {
        result = num1 + num2;
    } else if (operator === "-") {
        result = num1 - num2;
    } else if (operator === "*") {
        result = num1 * num2;
    } else if (operator === "/") {
        result = num2 !== 0 ? num1 / num2 : "Cannot divide by zero";
    }

    res.send(`
        <html>
        <body style="font-family:Arial;text-align:center;
        background:#667eea;color:white;padding-top:100px">

            <h1>Calculator Result</h1>
            <h2>${num1} ${operator} ${num2} = ${result}</h2>

            <a href="/" style="color:white;font-size:20px">
            Back to Calculator</a>

        </body>
        </html>
    `);
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
