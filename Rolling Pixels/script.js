let animationHandler;

const start = document.querySelector('.start')
const stop = document.querySelector('.stop')


start.addEventListener('click', () => {

    stop.hidden = false;
    start.hidden = true;
    animationHandler = setInterval(createBox, 300)
})

stop.addEventListener('click', () => {

    stop.hidden = true;
    start.hidden = false;
    clearInterval(animationHandler)

})

function createBox() {

    let d = document.createElement('div')
    let b = document.querySelector('body')
    d.style.right = Math.round(Math.random() * 100) + '%'
    d.style.backgroundColor = '#' + Math.round(Math.random() * 999999)
    d.className = 'box up'
    b.appendChild(d)
    setTimeout(() => {
        b.removeChild(d)
    }, 2000)
}


