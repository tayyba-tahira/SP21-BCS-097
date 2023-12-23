const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cookieParser());

let resultArray = [];


app.post('/api/calculate', (req, res) => {
  const { operand1, operand2, operation, result } = req.body;

  // Perform your calculation and store in the resultArray
  // You can customize this part based on your calculation logic
  // For simplicity, we're just storing the input values in the resultArray
  resultArray.push({ operand1, operand2, operation, result });

  // Send the result array in cookies
  res.cookie('resultArray', JSON.stringify(resultArray));

  res.json({ success: true });
});

app.get('/api/getResults', (req, res) => {
  // Retrieve the resultArray from cookies
  const storedResultArray = req.cookies.resultArray;

  // Parse the stored result array
  const parsedResultArray = storedResultArray ? JSON.parse(storedResultArray) : [];

  res.json(parsedResultArray);
});
















app.post('/api/calculate', (req, res) => {
  const { number1, operator, number2 } = req.body;
  let result;

  switch (operator) {
    case '+':
      result = number1 + number2;
      break;
    case '-':
      result = number1 - number2;
      break;
    case '*':
      result = number1 * number2;
      break;
    case '/':
      result = number1 / number2;
      break;
    default:
      return res.status(400).json({ error: 'Invalid operator' });
  }

  res.json({ result });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
