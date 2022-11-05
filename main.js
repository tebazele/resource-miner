// SECTION variables & data

let energy = 1000;
let masks = 0;
let massages = 0;
let housecleaners = 0;
let nannies = 0;
let gameSeconds = 90;

let energyCountElem = document.getElementById('energy-count');
let maskCountElem = document.getElementById('mask-count');
let massageCountElem = document.getElementById('massage-count');
let cleanerCountElem = document.getElementById('cleaner-count');
let nannyCountElem = document.getElementById('nanny-count');

let cleanerPriceElem = document.getElementById('cleaner-price');
let nannyPriceElem = document.getElementById('nanny-price');

let animatedCounterElem = document.getElementById('animated-counter');
let showAutoCollectElem = document.getElementById('show-auto-collect');

let toolTipElem = document.getElementById('tool-tip');
let energyFlashElem = document.getElementById('energy-background');

let timerElem = document.getElementById('timer');



let clickUpgrades = [
    {
        name: 'cucumber-mask',
        price: 20,
        quantity: 0,
        multiplier: 1
    },
    {
        name: 'full-body-massage',
        price: 100,
        quantity: 0,
        multiplier: 5
    }
];

let automaticUpgrades = [
    {
        name: 'hire-housecleaner',
        price: 400,
        quantity: 0,
        multiplier: 250
    },
    {
        name: 'hire-nanny',
        price: 1000,
        quantity: 0,
        multiplier: 400
    }
];

let cucumberMaskObj = clickUpgrades[0];
let massageObj = clickUpgrades[1];
let housecleanerObj = automaticUpgrades[0];
let nannyObj = automaticUpgrades[1];

let animationPlacementClasses = ['square', 'square2', 'square3', 'square4'];

// SECTION game logic

function mineEnergy() {
    if (cucumberMaskObj.quantity > 0 && massageObj.quantity > 0) {
        energy += 1 + (cucumberMaskObj.multiplier * cucumberMaskObj.quantity) + (massageObj.multiplier * massageObj.quantity);
    } else if (cucumberMaskObj.quantity > 0) {
        energy += 1 + (cucumberMaskObj.multiplier * cucumberMaskObj.quantity);
    } else if (massageObj.quantity > 0) {
        energy += 1 + massageObj.multiplier * massageObj.quantity;
    } else {
        energy++
    }

    //console.log(energy)
    drawToPage()
    drawCount()
}

function buyMask() {
    if (energy >= 20) {
        energy -= 20;
        masks++
        cucumberMaskObj.quantity++
    } else {
        window.alert('Not enough energy to buy cucumber mask!')
    }
    drawToPage()
}

function buyMassage() {
    if (energy >= 100) {
        energy -= 100;
        massages++
        massageObj.quantity++
    } else {
        window.alert('Not enough energy to buy a massage!')
    }
    drawToPage()
}

function hireCleaner() {
    if (energy >= housecleanerObj.price) {
        energy -= housecleanerObj.price;
        housecleaners++
        housecleanerObj.quantity++
        housecleanerObj.price += 100;
        let autoCollect = setInterval(collectAutoUpgrades, 3000);
        drawToPage()
        setTimeout(() => {
            clearInterval(autoCollect);
            housecleanerObj.quantity = 0;
            housecleaners = 0;
            console.log(housecleanerObj);
            drawToPage()
        }, 10000);
    } else {
        window.alert('Not enough energy to hire a house cleaner!')
    }
}

function hireNanny() {
    if (energy >= nannyObj.price) {
        energy -= nannyObj.price;
        nannies++
        nannyObj.quantity++
        nannyObj.price += 150;
        let autoCollect = setInterval(collectAutoUpgrades, 3000);
        drawToPage()
        setTimeout(() => {
            clearInterval(autoCollect);
            nannyObj.quantity = 0;
            nannies = 0;
            console.log(housecleanerObj);
            drawToPage()
        }, 20000);

    } else {
        window.alert('Not enough energy to hire a nanny!')
    }
}

function collectAutoUpgrades() {
    automaticUpgrades.forEach(upgrade => {
        energy += upgrade.quantity * upgrade.multiplier;
        if (housecleanerObj.quantity > 0 && nannyObj.quantity > 0) {
            showAutoCollectElem.innerHTML = `
            <h4 class='grandstander disappear'>${housecleanerObj.multiplier} energy</h4><img class="img-fluid disappear" src="/1.png">
            <h4 class='grandstander disappear'>${nannyObj.multiplier} energy</h4><img class="img-fluid disappear" src="/2.png">`
        } else if (housecleanerObj.quantity > 0) {
            showAutoCollectElem.innerHTML = `
            <h4 class='grandstander disappear'>${housecleanerObj.multiplier} energy</h4><img class="img-fluid disappear" src="/1.png">
            `
        } else if (nannyObj.quantity > 0) {
            showAutoCollectElem.innerHTML = `
            <h4 class='grandstander disappear'>${nannyObj.multiplier} energy</h4><img class="img-fluid disappear" src="/2.png">`
        }
    })

    energyFlashElem.classList.add('energy-bg');

    drawToPage()
    setTimeout(() => { energyFlashElem.classList.remove('energy-bg'); }, 1000)
}


function timer() {
    gameSeconds--;
    if (gameSeconds < 0) {
        timerElem.innerText = 0
    } else {
        timerElem.innerText = gameSeconds;
    }
}

function startGame() {
    let timerInterval = setInterval(timer, 1000);
    setTimeout(() => {
        clearInterval(timerInterval);
        endGame()
    }, 92000);
}

function endGame() {
    window.alert(`Game over! Cindy has earned ${energy} energy points!`)
    energy = 0;
    cucumberMaskObj.quantity = 0;
    masks = 0;
    massageObj.quantity = 0;
    massages = 0;
    housecleanerObj.price = 400;
    housecleanerObj.quantity = 0;
    nannyObj.price = 1000;
    nannyObj.quantity = 0;
    gameSeconds = 90;
    timerElem.innerText = gameSeconds;

    drawToPage()
}

// SECTION draw to page

function drawToPage() {
    energyCountElem.innerText = energy;
    maskCountElem.innerText = masks;
    massageCountElem.innerText = massages;
    cleanerCountElem.innerText = housecleaners;
    nannyCountElem.innerText = nannies;

    cleanerPriceElem.innerText = 'Cost: ' + housecleanerObj.price + ' energy';
    nannyPriceElem.innerText = 'Cost: ' + nannyObj.price + ' energy';
}

function drawCount() {
    let randNum = Math.floor(Math.random() * animationPlacementClasses.length);
    animatedCounterElem.innerHTML = `<div class="col-1 d-flex align-items-center ${animationPlacementClasses[randNum]} disappear">
    <h1 class="text-light text-shadow text-center p-3 rounded-circle bg-dark">
        +${1 + (cucumberMaskObj.quantity * cucumberMaskObj.multiplier) + (massageObj.quantity * massageObj.multiplier)}</h1>
</div>`
    console.log(animationPlacementClasses[randNum])
}

function closeToolTip() {
    toolTipElem.style.opacity = 0;
}




drawToPage()
//console.log(clickUpgrades[0])