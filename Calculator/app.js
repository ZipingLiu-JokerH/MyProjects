const previousOperandTextElement = document.querySelector(".previous-operand");
const currentOperandTextElement = document.querySelector(".current-operand");
const allClearButton = document.querySelector(".all-clear"); //
const deleteButton = document.querySelector("[data-delete]"); //
const switchSignButton = document.querySelector("[data-switchSign]"); //
const numberButtons = document.querySelectorAll("[data-number]"); //
const operatorButtons = document.querySelectorAll("[data-operator]"); //
const equalButton = document.querySelector(".equal"); //

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.previousDisplay = "";
        this.currentDisplay = "0";
    }

    delete() {
        // when we have something in currentDisplay, simply remove the last number user clicked
        if (this.currentDisplay !== "0") {
            if (
                this.currentDisplay === "-0" ||
                this.currentDisplay.length === 1
            ) {
                this.currentDisplay = "0";
            } else {
                this.currentDisplay = this.currentDisplay.slice(0, -1);
            }
        } else {
            // we try to move the previousDiplay to currentDisplay
            this.previousDisplay !== ""
                ? (this.currentDisplay = this.previousDisplay)
                : (this.currentDisplay = "0");
            this.previousDisplay = "";
        }
    }

    appendNumber(number) {
        if (
            (this.currentDisplay === "0" && number === "0") ||
            (this.currentDisplay.includes(".") && number === ".")
        ) {
            return;
        }

        if (this.currentDisplay === "0") {
            this.currentDisplay = number;
        } else if (this.currentDisplay === "-0") {
            this.currentDisplay = "-" + number;
        } else {
            this.currentDisplay += number;
        }
    }

    switchSign() {
        if (this.currentDisplay[0] === "-") {
            this.currentDisplay = this.currentDisplay.slice(1);
        } else {
            this.currentDisplay = "-" + this.currentDisplay;
        }
    }

    chooseOperation(operator) {
        if (
            this.currentDisplay === "0" ||
            this.currentDisplay === "." ||
            "+-÷×".includes(this.currentDisplay[this.currentDisplay.length - 1])
        ) {
            return;
        } else {
            this.previousDisplay += this.currentDisplay + operator;
            this.currentDisplay = "0";
        }
    }

    compute() {
        let evalString = this.previousDisplay + this.currentDisplay;
        if ("+-÷×".includes(evalString[evalString.length - 1])) {
            evalString = evalString.slice(0, -1);
        }
        const firstformatedString = evalString.replace(/÷/g, "/");
        const secondformatedString = firstformatedString.replace(/×/g, "*");
        this.currentDisplay = eval(secondformatedString).toString();
        this.previousDisplay = "";
    }

    updataUI() {
        this.previousOperandTextElement.textContent = this.previousDisplay;
        this.currentOperandTextElement.textContent = this.currentDisplay;
    }
}

const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
);

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updataUI();
});

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updataUI();
});

switchSignButton.addEventListener("click", () => {
    calculator.switchSign();
    calculator.updataUI();
});

equalButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updataUI();
});

operatorButtons.forEach((operator) => {
    operator.addEventListener("click", () => {
        calculator.chooseOperation(operator.textContent);
        calculator.updataUI();
    });
});

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.textContent);
        calculator.updataUI();
    });
});
