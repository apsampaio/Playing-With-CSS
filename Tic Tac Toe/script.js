const nameSpace = 'http://www.w3.org/2000/svg'

const s = document.querySelector('svg')
const btns = document.querySelector('.btns')

let clickPointer = []
let player;
let board;
let count;

const playBtn = document.querySelector('#play')
const resetBtn = document.querySelector('#reset')

playBtn.addEventListener('click', () => {

    s.setAttribute('class', 'end')
    btns.classList.replace('down', 'up')

    setTimeout(() => {
        s.innerHTML = ""
        s.classList.replace('end', 'a')
        init()
    }, 600)

})

init()

function init() {

    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]
    player = 1
    count = 0
    s.innerHTML = `       
    
        <rect class="board" x="0" y="0" />

        <rect class="p00 placer" x="0" y="0" />
        <rect class="p01 placer" x="55" y="0" />
        <rect class="p02 placer" x="110" y="0" />

        <rect class="p10 placer" x="0" y="55" />
        <rect class="p11 placer" x="55" y="55" />
        <rect class="p12 placer" x="110" y="55" />

        <rect class="p20 placer" x="0" y="110" />
        <rect class="p21 placer" x="55" y="110" />
        <rect class="p22 placer" x="110" y="110" />
    `

    s.setAttribute('class', 'start')

    setTimeout(() => {
        s.classList.replace('start', 'a')
    }, 600)

    document.querySelectorAll('.placer').forEach((e) => {

        clickPointer.push(e.addEventListener('click', manageClick))

    })

}

function createX(x, y) {
    const offset = 5
    const size = 40
    let l1 = document.createElementNS(nameSpace, 'line')
    let l2 = document.createElementNS(nameSpace, 'line')

    l1.setAttribute('class', 'animate')
    l1.setAttribute('x1', x + offset)
    l1.setAttribute('y1', y + offset)
    l1.setAttribute('x2', x + size + offset)
    l1.setAttribute('y2', y + size + offset)

    l2.setAttribute('class', 'animate')
    l2.setAttribute('x1', x + size + offset)
    l2.setAttribute('y1', y + offset)
    l2.setAttribute('x2', x + offset)
    l2.setAttribute('y2', y + size + offset)

    s.appendChild(l1)

    setTimeout(() => {
        s.appendChild(l2)
    }, 500)

}

function createO(x, y) {

    let radius = 20
    let offset = 5
    let c = document.createElementNS(nameSpace, 'circle')

    c.setAttribute('class', 'animate')

    c.setAttribute('cx', x + radius + offset)
    c.setAttribute('cy', y + radius + offset)
    c.setAttribute('r', radius)

    s.appendChild(c)

}

function manageClick(e) {

    let boardX = e.target.classList[0][1]
    let boardY = e.target.classList[0][2]

    let x = e.target.x.baseVal.value
    let y = e.target.y.baseVal.value

    if (player) {
        board[boardX][boardY] = 'x'
        createX(x, y)
    } else {
        createO(x, y)
        board[boardX][boardY] = 'o'
    }
    player = !player
    count++;
    if ((finish = checkBoard())) end(finish)
}

function checkBoard() {

    for (let i = 0; i < 3; i++) {

        /* Horizontal */
        if (board[i][0] == 'x' && board[i][1] == 'x' && board[i][2] == 'x' ||
            board[i][0] == 'o' && board[i][1] == 'o' && board[i][2] == 'o')
            return 'h' + i

        /* Vertical */
        else if (board[0][i] == 'x' && board[1][i] == 'x' && board[2][i] == 'x' ||
            board[0][i] == 'o' && board[1][i] == 'o' && board[2][i] == 'o'
        )
            return 'v' + i
    }

    /* Diagonal */
    if (board[0][0] == 'x' && board[1][1] == 'x' && board[2][2] == 'x' ||
        board[0][0] == 'o' && board[1][1] == 'o' && board[2][2] == 'o')
        return 'dr'

    else if (board[0][2] == 'x' && board[1][1] == 'x' && board[2][0] == 'x' ||
        board[0][2] == 'o' && board[1][1] == 'o' && board[2][0] == 'o')
        return 'dl'

    if (count == 9)
        return 'draw'

    return false
}

function end(finish) {

    let x1 = 0, y1 = 0, x2 = 0, y2 = 0

    if (finish == 'dr') {
        x2 = 160
        y2 = 160
    } else if (finish == 'dl') {
        x1 = 160
        y2 = 160
    } else if (finish[0] == 'h') {
        x2 = 160

        if (finish[1] == 0) {
            y1 = 25
            y2 = 25
        } else if (finish[1] == 1) {
            y1 = 80
            y2 = 80
        } else {
            y1 = 135
            y2 = 135
        }
    } else if (finish[0] == 'v') {
        y2 = 160

        if (finish[1] == 0) {
            x1 = 25
            x2 = 25
        } else if (finish[1] == 1) {
            x1 = 80
            x2 = 80
        } else {
            x1 = 135
            x2 = 135
        }
    }

    let l = document.createElementNS(nameSpace, 'line')
    l.setAttribute('class', 'animate finish')
    l.setAttribute('x1', x1)
    l.setAttribute('y1', y1)
    l.setAttribute('x2', x2)
    l.setAttribute('y2', y2)

    setTimeout(() => {
        s.appendChild(l)
        btns.className += ' down'
    }, 500)

    document.querySelectorAll('.placer').forEach((e) => {
        e.removeEventListener('click', manageClick)
    })

}
