// SECTION variables & data

let energy = 50;
let masks = 0;

let energyCountElem = document.getElementById('energy-count');
let maskCountElem = document.getElementById('mask-count');



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
        price: 200,
        quantity: 0,
        multiplier: 2
    },
    {
        name: 'hire-babysitter',
        price: 80,
        quantity: 0,
        multiplier: 5
    }
];

let cucumberMask = clickUpgrades[0];

// SECTION game logic

function mineEnergy() {
    if (cucumberMask.quantity > 0) {
        energy += 1 + cucumberMask.multiplier * cucumberMask.quantity;
    } else {
        energy++
    }

    //console.log(energy)
    drawStats()
}


// SECTION draw to page

function drawStats() {
    energyCountElem.innerText = energy;
    maskCountElem.innerText = masks;
}

function buyMask() {
    if (energy >= 20) {
        energy -= 20;
        masks++
        cucumberMask.quantity++
    } else {
        window.alert('Not enough energy to buy cucumber mask!')
    }
    drawStats()
}

drawStats()
//console.log(clickUpgrades[0])