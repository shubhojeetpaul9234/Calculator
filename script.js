class Calculator {
    constructor(previousoper_and_text_element, currentoperand_and_text_element) {
        this.previousoper_and_text_element = previousoper_and_text_element
        this.currentoperand_and_text_element = currentoperand_and_text_element
        this.clear()
    }
    clear() {
        this.currentoperand = ''
        this.previousoperand = ''
        this.operation = undefined
    }
    delete() {
        this.currentoperand = this.currentoperand.toString().slice(0,-1)

    }
    appendnumber(number) {
        if (number === '.' && this.currentoperand.includes('.')) return
        this.currentoperand = this.currentoperand.toString() + number.toString()


    }

    chooseoperation(operation) {
        if (this.currentoperand === '') return
        if (this.previousoperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousoperand = this.currentoperand
        this.currentoperand = ''


    }

    compute() {
        let computation
        const prev = parseFloat(this.previousoperand)
        const current = parseFloat(this.currentoperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break;
            case '÷':
                computation = prev / current
                break;
            default:
                return

        }
        this.currentoperand = computation
        this.operation = undefined
        this.previousoperand = ''

    }
    getdisplay(number){
        const stringnumber = number.toString()
        const integerdigit = parseFloat(stringnumber.split('.')[0])
        const decimaldigits = stringnumber.split('.')[1]
        let integerdisplay
        if(isNaN(integerdigit)){
            integerdisplay = ''
        }
        else{
            integerdisplay = integerdigit.toLocaleString('en', {maximumFractionDigits: 0})

        }
        if(decimaldigits!=null){
            return `${integerdisplay}.${decimaldigits}`
        }
        else{
            return integerdisplay
        }

    }

    updateDisplay() {
        this.currentoperand_and_text_element.innerText = this.getdisplay(this.currentoperand)
        if(this.operation != null){
            this.previousoper_and_text_element.innerText = `${this.getdisplay(this.previousoperand)} ${this.operation}`
        }
        else{
            this.previousoper_and_text_element.innerText = ''
        }

    }

}




const numberbuttons = document.querySelectorAll('[data-number]')
const operationbuttons = document.querySelectorAll('[data-operation]')
const equalbuttons = document.querySelector('[data-equals]')
const deletebuttons = document.querySelector('[data-delete]')
const allclearbuttons = document.querySelector('[data-all-clear]')
const previousoper_and_text_element = document.querySelector('[data-previous-operand]')
const currentoperand_and_text_element = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousoper_and_text_element, currentoperand_and_text_element)

numberbuttons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendnumber(button.innerText)
        calculator.updateDisplay()

    })
})

operationbuttons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseoperation(button.innerText)
        calculator.updateDisplay()

    })
})
equalbuttons.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()

})

allclearbuttons.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()

})

deletebuttons.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()

})

