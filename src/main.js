particlesJS.load('particles-js', 'particles.json', function() {
    console.log('particles.js loaded...');
});

gsap.registerPlugin(ScrollTrigger);
var t1 = gsap.timeline();

t1.from('.nav-container', {
    y: -30,
    opacity:0,
    duration: .4,
    ease: Power4.easeOut
})
t1.from('.contaier-particles', {
    y: -40,
    opacity:0,
    duration: .5,
    ease: Power4.easein
})
t1.from('.hero', {
    y: -30,
    opacity:0,
    duration: .1,
    ease: Power4.easein
})
t1.from('.content', {
    y: -30,
    opacity:0,
    duration: 1,
    ease: Power4.easeOut
})
t1.from('.stagger1',{
    opacity: 0,
    y: -50,
    stagger: .3,
    ease: Power4.easeOut,
    duration:2
},"-=1.5")

t1.from('.hero-design',{
    opacity:0,
    y:50,
    ease: Power4.easeOut,
    duration: 1
},"-=2")

gsap.from('.skills-info',{
    scrollTrigger:{
        trigger: '.transition2',
        start:"top bottom"
    },
    y: 50,
    opacity: 0,
    duration: 1.2,
    stagger: .3
})
gsap.from('.projects-info',{
    scrollTrigger:{
        trigger: '.transition2',
        start:"top bottom"
    },
    y: 50,
    opacity: 0,
    duration: 1.2,
    stagger: .3
})
gsap.from('.transition2',{
    scrollTrigger:{
        trigger: '.transition2',
        start:"top bottom"
    },
    y: 50,
    opacity: 0,
    duration: 1.2,
    stagger: .3
})
gsap.from('.transition3', {
    scrollTrigger:{
        trigger: '.transition3',
        start:"top center"
    },
    y: 50,
    opacity: 0,
    duration: 1.2,
    stagger: .6
});


//Calculator

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
        
}

//clear(AC) button 

clear(){
        this.currentOperand =''
        this.previousOperand =''
        this.operation = undefined
}

//delete(DEL) button 

delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
}

//numbers button 

appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
}

//operation button 
    
chooseOperation(operation){
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        } 
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
}

//equals button

compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+':
                computation = prev + current
                break
            case '−':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
}

getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
}

//output 
updateDisplay(){
        this.currentOperandTextElement.innerText = 
          this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
              `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else {
            this.previousOperandTextElement.innerText = ''
        }
    
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

//numberButtons eventlistener

numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.appendNumber(button.innerText)
            calculator.updateDisplay()
        })
})

//operationButton eventlistener

operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.chooseOperation(button.innerText)
            calculator.updateDisplay()
        })
})

//equalsButton eventlistener

equalsButton.addEventListener('click', button =>{
        calculator.compute()
        calculator.updateDisplay()
})

//allClearButton eventlistener

allClearButton.addEventListener('click', button =>{
        calculator.clear()
        calculator.updateDisplay()
})

//deleteButton eventlistener

deleteButton.addEventListener('click', button =>{
        calculator.delete()
        calculator.updateDisplay()
});


//TIC-TAC-TOE
const boxElements = document.querySelectorAll('[data-box]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const newGameButton = document.getElementById('newGameButton')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
let circleTurn

startGame()

newGameButton.addEventListener('click', startGame)
restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  boxElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Won!`
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...boxElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return boxElements[index].classList.contains(currentClass)
    })
  })
}

