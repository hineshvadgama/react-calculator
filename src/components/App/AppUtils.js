export function getNumberBeforeOperation(operationPosition, expressionArray) {
    let counter = operationPosition;
    counter = counter - 1;
    let numberBeforeOperation = [];
    
    while (!isNaN(expressionArray[counter]) || expressionArray[counter] === '.') {
        numberBeforeOperation.push(expressionArray[counter]);
        counter = counter - 1;
    }
    numberBeforeOperation = numberBeforeOperation.reverse();
    numberBeforeOperation = numberBeforeOperation.toString();
    numberBeforeOperation = numberBeforeOperation.replace(/,/g, '');

    return numberBeforeOperation;
}

export function getNumberAfterOperation(operationPosition, expressionArray) {
    let counter = operationPosition;
    counter = counter + 1;
    let numberBeforeOperation = [];
    
    while (!isNaN(expressionArray[counter]) || expressionArray[counter] === '.') {
        numberBeforeOperation.push(expressionArray[counter]);
        counter = counter + 1;
    }
    numberBeforeOperation = numberBeforeOperation.toString();
    numberBeforeOperation = numberBeforeOperation.replace(/,/g, '');

    return numberBeforeOperation;
}

export function calculatePercentage(num1, num2) {
    return (num2/100) * num1;
}
