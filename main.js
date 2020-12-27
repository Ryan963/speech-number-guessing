const msgEl = document.getElementById('msg')
const randomNum = getRandomNumber();
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


console.log(randomNum)

function onSpeak(e){
    const msg = e.results[0][0].transcript;
    writeMessage(msg);
    checkNumber(msg);
}

function writeMessage(msg){
    msgEl.innerHTML = `
    <div>You said:</div>
    <span class="box" >${msg}</span>
    `
}


function checkNumber(msg){
    const num = +msg
    if (Number.isNaN(num)) {
        msgEl.innerHTML += `<div>${msg} is not a valid number</div>`
        return
    }
    if (num > 100 || num < 1){
        msgEl.innerHTML += `<div>Number must be between 1 and 100</div>`
        return
    }

    if (num === randomNum) {
        document.body.innerHTML = `<h2> Congrats! you have guess the number! <br><br>
        it was ${num}</h2>
        <button id='play-btn'>Play Again</button>
       `
    }
    else if (num > randomNum) {
        msgEl.innerHTML += `<div>Go lower</div>`
    }
    else {
        msgEl.innerHTML += `<div>Go heigher</div>`
    }
}

function getRandomNumber(){
    return Math.floor((Math.random() * 100) + 1)
}

function recognize(){
    let recognition = new window.SpeechRecognition()
    recognition.start()
    recognition.addEventListener('result',onSpeak);
    recognition.addEventListener('end', () => {recognition.start()})
    document.body.addEventListener('click', e => {
        console.log(e.target.class)
        if (e.target.id == 'play-btn'){
            window.location.reload();
        }
    })
}
recognize()




