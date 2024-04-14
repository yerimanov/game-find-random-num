// создаем переменные
let tryCount = 1
let inputArray = []
let randomNum = getRandomNum(0, 100)

const inputNum = document.getElementById('input-1')
const lowHigh = document.getElementById('low-high')
const lastNum = document.getElementById('last-num')
const congrats = document.getElementById('congrat')
const tryAmount = document.getElementById('try-amount')
const lastNumText = document.getElementById('last-num-text')
const submitBtn = document.getElementById('submit-btn')
const resetBtn = document.getElementById('reset-btn')
const formID1 = document.getElementById('form-id-1')

formID1.addEventListener('submit', showNewResult)
resetBtn.addEventListener('click', resetGame)

// генерация рандомного числа
function getRandomNum(min, max) { 
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
} 

// условия взаимодействия пользователя с инпутом
inputNum.oninput = function() { 
    let userValue = Number(inputNum.value)
    let checkArray = inputArray.includes(userValue)

    if (this.value > 100) {
        this.value = 100

    } else if (this.value < 0) {
        this.value = 0

    } else if (checkArray === false) {
        submitBtn.textContent = 'Угадать'
        submitBtn.disabled = false
        submitBtn.style.color = 'rgb(123, 196, 212)'
    } 
} 

// проверка прошлых попыток
submitBtn.onclick = function() {
    let userValue = Number(inputNum.value)
    let checkArray = inputArray.includes(userValue)

    if (checkArray === true) {
        submitBtn.disabled = true
        submitBtn.textContent = 'Уже было!'
        submitBtn.style.color = 'red'
    } 
} 

function showNewResult (event) {
    event.preventDefault()

    let userValue = Number(inputNum.value)
    inputArray.push(userValue) // добавление значения в массив

    lastNum.style.display = 'unset'

    const showArray = inputArray.join(' ')
    lastNum.textContent = showArray 
    // отображение всего массива

    lastNumText.textContent = 'Предудыщие попытки: '
    tryAmount.textContent = 'Осталось попыток: ' + (10 - tryCount)
    congrats.textContent = ''
    
    const redColor = 100 + tryCount * 25.5
    const greenColor = 255 - tryCount * 25.5

    tryAmount.style.color = `rgb(${redColor}, ${greenColor}, 50)`
    // смена цвета попыток от зеленого к красному

    checkTry() // проверка результата победы или пройгрыша

    tryCount++ // увеличение кол-ва попыток
    inputNum.value = '' 
    inputNum.focus()
    console.log(inputArray);
} 

// проверка результата победы или пройгрыша
function checkTry() {
    let userValue = Number(inputNum.value)

    if (userValue === randomNum) {
        congrats.textContent = 
        `Поздравляем! Вы угадали число "${randomNum}" 
        c ${tryCount} попытки!`;
        congrats.style.color = 'greenyellow'
        showResetBtn() // замена кнопки с сабмита на ресет

    } else if (tryCount === 10 ) {
        congrats.textContent = 'K сожалению вы не угадали число'
        congrats.style.color = 'red'
        showResetBtn()

    } else {
        if (userValue < randomNum) {
            lowHigh.textContent = 'Мало'
            lowHigh.style.color = 'aqua'
            
        } else if (userValue > randomNum) {
            lowHigh.textContent = 'Много'
            lowHigh.style.color = 'red'
        }
    }
} 

// новая игра
function resetGame() { 
    tryCount = 1
    randomNum = getRandomNum(0, 100)
    inputArray = []

    congrats.textContent = 'Попробуйте еще!'
    congrats.style.color = 'greenyellow'
    submitBtn.style.display = 'unset'
    resetBtn.style.display = 'none'
    inputNum.disabled = false
    
    inputNum.focus()
    console.clear()
    console.log('Random number:', randomNum);
} 

function showResetBtn() {
    submitBtn.style.display = 'none'
    resetBtn.style.display = 'unset'
    lowHigh.textContent = '';
    lastNum.textContent = '';
    tryAmount.textContent = '';
    lastNumText.textContent = '';
    inputNum.disabled = true
}

console.log('Random number:', randomNum);
