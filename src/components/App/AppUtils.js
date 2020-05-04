export function doesCurrentNumberContainDecimal(expressionArray) {
    let decimalStatus = false;
    let positionCounter = expressionArray.length - 1;

    while (expressionArray[positionCounter] !== '/' && expressionArray[positionCounter] !== '*'
    && expressionArray[positionCounter] !== '+' && expressionArray[positionCounter] !== '-') {

        if (expressionArray[positionCounter] === '.') {
            decimalStatus = true;
            break;
        }

        if (positionCounter > 0) {
            positionCounter--;
        } else {
            break;
        }

    }

    return decimalStatus;
}



export function getNumberBeforeOperation(operationPosition, expressionArray) {
    let counter = operationPosition;
    counter = counter - 1;
    let numberBeforeOperation = [];
    
    while (!isNaN(expressionArray[counter]) || expressionArray[counter] === '.') {
        numberBeforeOperation.push(expressionArray[counter]);
        counter = counter - 1;
    }

    // In case the number we're trying to get is a negative number
    let negativeStatus = false;

    if (expressionArray[counter] === '-') {

        if (expressionArray[counter - 1] === '/' || expressionArray[counter - 1] === '*' || expressionArray[counter - 1] === '+'
        || expressionArray[counter - 1] === '-') {

            negativeStatus = true;

        }

    }

    numberBeforeOperation = numberBeforeOperation.reverse();    

    if (negativeStatus === true) {
        numberBeforeOperation.unshift("-");
    }

    numberBeforeOperation = numberBeforeOperation.toString();
    numberBeforeOperation = numberBeforeOperation.replace(/,/g, '');

    return numberBeforeOperation;
}



export function getNumberAfterOperation(operationPosition, expressionArray) {
    let counter = operationPosition;
    counter = counter + 1;
    let numberAfterOperation = [];

    let negativeStatus = false;

    if (expressionArray[counter] === '-') {

        if (expressionArray[counter - 1] === '/' || expressionArray[counter - 1] === '*' || expressionArray[counter - 1] === '+'
        || expressionArray[counter - 1] === '-') {

            negativeStatus = true;

        }

    }

    if (negativeStatus === true) {
        counter++;
    }
    
    while (!isNaN(expressionArray[counter]) || expressionArray[counter] === '.') {
        numberAfterOperation.push(expressionArray[counter]);
        counter = counter + 1;
    }


    if (negativeStatus === true) {
        numberAfterOperation.unshift('-');
    }

    numberAfterOperation = numberAfterOperation.toString();
    numberAfterOperation = numberAfterOperation.replace(/,/g, '');

    return numberAfterOperation;
}



export function calculatePercentage(num1, num2) {
    return (num2/100) * num1;
}
