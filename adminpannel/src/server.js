
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 5000;


app.use(bodyParser.json());
app.use(cookieParser());

let resultArray = [];

app.post('/api/calculate', (req, res) => {
  const { operand1, operand2, operation, result } = req.body;

  // Perform your calculation and store in the resultArray
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
