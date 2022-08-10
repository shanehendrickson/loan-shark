// get values from page
function getValues() {
  let balance = parseInt(document.getElementById('loanAmount').value);
  let term = parseInt(document.getElementById('payments').value);
  let rate = parseFloat(document.getElementById('rate').value);

  let lcArray = loanCalc(balance, term, rate);
  displayData(lcArray);
}



// calculate needed values
function loanCalc(balance, term, rate) {
  // set initial remaining balance to original balance. this will change
  let remBal = balance;
  let prevInt = 0;
  let returnArray = [];

  


  for(let i = 1; i <= term; i++) {   
    

    //calculate total  payment, interest payment, principal payment, and new balance
    let month = i;
    let tmp = (((balance) * (rate/1200) / (1 - Math.pow((1 + rate/1200), -term))));
    let intPay = (remBal * (rate/1200));
    let princePay = (tmp - intPay);
    prevInt = (prevInt + intPay);
    remBal = (remBal - princePay);

    returnArray.push(month, tmp.toFixed(2), intPay.toFixed(2), princePay.toFixed(2), prevInt.toFixed(2), remBal.toFixed(2));
  }
  
  return returnArray;
}

// print new values to page
function displayData(lcArray) {
  let tableBody = document.getElementById('results');
  let templateRow = document.getElementById('lcTemplate');

  tableBody.innerHTML = '<tr class="table-heading"><th>Month</th><th>Payment</th><th>Principal</th><th>Interest</th><th>Total Interest</th><th>Balance</th></tr>';

  for (let index = 0; index < lcArray.length; index += 6) {
    let tableRow = document.importNode(templateRow.content, true);

    let rowCols = tableRow.querySelectorAll('td');
    rowCols[0].textContent = lcArray[index];
    rowCols[1].textContent = lcArray[index+1];
    rowCols[2].textContent = lcArray[index+2];
    rowCols[3].textContent = lcArray[index+3];
    rowCols[4].textContent = lcArray[index+4];
    rowCols[5].textContent = lcArray[index+5];

    tableBody.appendChild(tableRow);
  }
}