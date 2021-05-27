const calculatorScreen = document.querySelector(".calculator-screen")
const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const equalSign = document.querySelector(".equal-sign")
const clearbtn = document.querySelector(".all-clear")
const decimal = document.querySelector(".decimal")
const percentage = document.querySelector(".percentage")

let prevNumber = ''
let calculationOperator = ''
let currentNumber = ''
const hundred = 100.0

const updateScreen = (number)=>{
    if(calculationOperator == ''){
        calculatorScreen.value = number
    }else{
        calculatorScreen.value = prevNumber + " " + calculationOperator + " " + currentNumber
    }
}

const inputNumber = (number)=>{
    if(currentNumber == '0'){
        currentNumber = number
    }else{
        currentNumber += number
    }
    updateScreen(currentNumber)
}

equalSign.addEventListener("click", () =>{
    calculate()
    updateScreen(currentNumber)
    //console.log("equal button is pressed")
})

clearbtn.addEventListener("click", ()=>{
    clearAll()
    updateScreen(currentNumber)
})

decimal.addEventListener("click", (event)=>{
    inputDecimal(event.target.value)
    updateScreen(currentNumber)
})

const inputOperator = (operator) => {
    if(calculationOperator == ''){
        prevNumber = currentNumber
        calculationOperator = operator
        currentNumber = ''
    }else{
        calculationOperator = operator
    }
    updateScreen(currentNumber)
}

inputDecimal = (dot)=>{
    if(currentNumber.includes(".")){
        return
    }else if(currentNumber==''){
        currentNumber = '0'
    }
    currentNumber += dot
}

percentage.addEventListener("click", () =>{
    let result = ''
    if(calculationOperator == ''){
        result = currentNumber / hundred
        currentNumber = result
        updateScreen(currentNumber)
    }else if(calculationOperator != ''){
        if(prevNumber==''){
            calculationOperator = ''
            result = currentNumber / hundred
            currentNumber = result
            updateScreen(currentNumber)
        }else{
            if(currentNumber==''){
                if(calculationOperator=='/'){
                    currentNumber = "1"
                }else{
                    currentNumber = "0"
                }
                calculate()
                result = currentNumber / hundred
                currentNumber = result
                updateScreen(currentNumber)
            }else{
                if(calculationOperator=='/' && parseFloat(currentNumber)==0.0){
                    currentNumber = "1"
                }
                calculate()
                result = currentNumber / hundred
                currentNumber = result
                updateScreen(currentNumber)
            }
        }
    }
})

numbers.forEach((number)=>{
    number.addEventListener("click", (event)=>{
        inputNumber(event.target.value)
        //console.log("number is pressed")
    })
})

operators.forEach((operator)=>{
    operator.addEventListener("click", (event)=>{
        inputOperator(event.target.value)
        //console.log("number is pressed")
    })
})

const calculate = () =>{
    let result = ''
    switch(calculationOperator){
        case "+":
            result = parseFloat(prevNumber) + parseFloat(currentNumber)
            break
        case "-":
            result = parseFloat(prevNumber) - parseFloat(currentNumber)
            break
        case "*":
            result = parseFloat(prevNumber) * parseFloat(currentNumber)
            break
        case "/":
            result = parseFloat(prevNumber) / parseFloat(currentNumber)
            break
        default:
            result = currentNumber
            break
    }
    currentNumber = result
    calculationOperator = ''
}

const clearAll = ()=>{
    prevNumber = ''
    calculationOperator = ''
    currentNumber = '0'
}