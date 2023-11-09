const SIGNS = new Set(["÷", "×", "-", "+"]);

let answer = 0;
let operator = "";

function main() {
    let numbers = document.getElementsByClassName("numbers");
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].onclick = () => {
            updateDisplay(numbers[i].textContent);
        }
    }
    let signs = document.getElementsByClassName("signs");
    for (let i = 0; i < signs.length; i++) {
        signs[i].onclick = () => {
            if (operator === "") {
                answer = Number(display.textContent);
                clear.textContent = "C";
                clearDisplay();
            }
            setActiveOperator(signs[i]);
        }
    }
}

main();

function resetOperation() {
    answer = 0;
    operator = "";
}

function toPercent() {
    display.textContent = (Number(display.textContent) / 100.0).toString();
}

function toNegative() {
    display.textContent = ((-1) * Number(display.textContent)).toString();
}

function isOperationInProcess() {
    if ((answer === 0) && (operator === "")) {
        return false;
    }
    return true;
}

function clearDisplay() {
    if (clear.textContent === "AC") {
        resetOperation();
        clearActiveOperator();
    } else {
        clear.textContent = "AC";
    }
    display.textContent = "0";
}

function updateDisplay(value) {
    if (value === ".") {
        if (display.textContent.includes(".")) {
            return;
        }
        clear.textContent = "C";
    } else if (display.textContent === "0") {
        if (value !== "0") {
            clear.textContent = "C";
            display.textContent = value;
        }
        return;
    }
    display.textContent += value;
}

function clearActiveOperator() {
    let actives = document.getElementsByClassName("active");
    for (let i = 0; i < actives.length; i++) {
        actives[i].classList.remove("active");
    }
}

function setActiveOperator(input) {
    clearActiveOperator();
    operator = input.textContent;
    input.classList.add("active");
}

function equate() {
    switch (operator) {
        case "÷":
            display.textContent = (answer / Number(display.textContent)).toString();
            break;
        case "×":
            display.textContent = (answer * Number(display.textContent)).toString();
            break;
        case "-":
            display.textContent = (answer - Number(display.textContent)).toString();
            break;
        case "+":
            display.textContent = (answer + Number(display.textContent)).toString();
            break;
        default:
            return;
    }
    resetOperation();
    clearActiveOperator();
    clear.textContent = "AC";
}