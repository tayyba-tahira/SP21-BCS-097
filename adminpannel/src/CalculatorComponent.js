// CalculatorComponent.js
import React, { useState, useEffect } from 'react';

const CalculatorComponent = () => {
  const [operand1, setOperand1] = useState('');
  const [operand2, setOperand2] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');
  const [resultArray, setResultArray] = useState([]);

  useEffect(() => {
    // Check for existing cookies and initialize state
    const storedResultArray = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('resultArray='));

    if (storedResultArray) {
      const parsedResultArray = JSON.parse(storedResultArray.split('=')[1]);
      setResultArray(parsedResultArray);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ operand1, operand2, operation, result }),
      });

      const data = await response.json();

      if (data.success) {
        // Update resultArray state
        setResultArray([...resultArray, { operand1, operand2, operation, result }]);

        // Update cookies with the new resultArray
        document.cookie = `resultArray=${JSON.stringify(resultArray)}`;
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div>
      <h1>Calculator</h1>
      <form>
        <label htmlFor="operand1">Operand 1:</label>
        <input
          type="number"
          id="operand1"
          value={operand1}
          onChange={(e) => setOperand1(e.target.value)}
        />
        {/* Similar inputs for operand2, operation, and result */}
        <button type="button" onClick={handleSubmit}>
          Calculate
        </button>
      </form>

      <h2>Results</h2>
      <table>
        <thead>
          <tr>
            <th>Operand 1</th>
            <th>Operand 2</th>
            <th>Operation</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {resultArray.map((resultItem, index) => (
            <tr key={index}>
              <td>{resultItem.operand1}</td>
              <td>{resultItem.operand2}</td>
              <td>{resultItem.operation}</td>
              <td>{resultItem.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalculatorComponent;
