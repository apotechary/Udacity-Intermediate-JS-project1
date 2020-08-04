
// Create Dino Constructor
function Dino(species, weight, height, diet, where, when, fact, image) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
    this.image = image;
}

// Create Dino Objects
const triceratops = new Dino("Triceratops", 13000, 114, "herbavor", "North America", "Late Cretaceous",
    "First discovered in 1889 by Othniel Charles Marsh",
    "images/triceratops.png");
const tyrannosaurusRex = new Dino("Tyrannosaurus Rex", 11905, 144, "carnivor", "North America", "Late Cretaceous", "The largest known skull measures in at 5 feet long.",
    "images/tyrannosaurus rex.png"
)
const anklyosaurus = new Dino("Anklyosaurus", 10500, 55, "herbavor", "North America", "Late Cretaceous", "Anklyosaurus survived for approximately 135 million years.",
    "images/anklyosaurus.png"
)
const brachiosaurus = new Dino("Brachiosaurus", 70000, 372, "herbavor", "North America", "Late Jurasic",
    "An asteroid was named 9954 Brachiosaurus in 1991.",
    "images/brachiosaurus.png"
)
const stegosaurus = new Dino("Stegosaurus", 11600, 79, "herbavor", "North America,Europe, Asia", "Late Jurasic to Early Cretaceous",
    "The Stegosaurus had between 17 and 22 seperate places and flat spines.",
    "images/stegosaurus.png"
)
const elasmosaurus = new Dino("Elasmosaurus", 16000, 59, "carnivor", "North America", "Late Cretaceous",
    "Elasmosaurus was a marine reptile first discovered in Kansas.",
    "images/elasmosaurus.png"
)
const pteranodon = new Dino("Pterandon", 44, 20, "carnivor", "North America", "Late Cretaceous", "Actually a flying reptile, the Pteranodon is not a dinosaur.",
    "images/pteranodon.png"
)
const pigeon = new Dino("Pigeon", 0.5, 9, "herbavor", "World Wide", "Holocene", "All birds are living dinosaurs.",
    "images/pigeon.png"
)
// Create Human Object
let human = {};

// Use IIFE to get human data from form


document.getElementById("btn").addEventListener('click', (function () {
    //const finalHeight = (heightValue1 * 12) + heightValue2;
    const selector = document.getElementById("diet");
    return function () {
        human = {
            name: document.getElementById("username").value,
            height: parseInt(document.getElementById("feet").value) * 12
                + parseInt(document.getElementById("inches").value),
            weight: parseInt(document.getElementById("weight").value),
            diet: selector.options[selector.selectedIndex].value,
            image: "images/human.png"
        }
        deleteForm();
        tileAppend();
    }
})());

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 
Dino.prototype.weightFact = function () {
    var weightRatio = Math.round(this.weight / human.weight);
    if (human.weight !== this.weight) {
        if (weightRatio > 1) {
            return `${this.species} was ${weightRatio} times heavier than you!`
        } else {
            return `${this.species} was ${(this.weight / human.weight).toFixed(2)} times lighter than you!`
        }
    } else {
        return `${this.species} weighs approximately the same as you!`
    }
}
// Create Dino Compare Method 2

Dino.prototype.heightFact = function () {
    var heightRatio = Math.round(this.height / human.height);
    if (human.height !== this.height) {
        if (heightRatio > 1) {
            return `${this.species} was approximately ${heightRatio} times taller than you!`
        } else {
            return `${this.species} was approximately ${(this.height / human.height).toFixed(2)} times shorter than you!`
        }
    } else {
        return `${this.species} was roughly the same height as you!`
    }
}
// Create Dino Compare Method 3

Dino.prototype.dietFact = function () {
    if (human.diet === this.diet) {
        return `You have the same diet as ${this.species} who is also a ${this.diet}!`
    } else {
        return `${this.species}  was a ${this.diet}, it has differnt diet from you!`
    }

}

Dino.prototype.locationFact = function () {
    return `${this.species} lived in ${this.where}.`
}

Dino.prototype.timeFact = function () {
    return `${this.species} existed in the ${this.when} era!`
}

Dino.prototype.triviaFact = function () {
    return `Did you know that  ${this.fact}?`
}
Dino.prototype.giveRandomFact = function () {
    if (this.species === "Pigeon") {
        return "All birds are considered Dinosaurs."
    }
    let randomFacts = {
        0: this.weightFact(),
        1: this.dietFact(),
        2: this.timeFact(),
        3: this.triviaFact(),
        4: this.heightFact(),
        5: this.locationFact()
    }
    let randomizer = (Math.floor(Math.random() * 6));
    console.log("ramdomizer-->", randomizer)
    return randomFacts[randomizer];;
}

// Generate Tiles for each Dino in Array
function tileAppend() {
    const dinos = [tyrannosaurusRex, triceratops, anklyosaurus, brachiosaurus, stegosaurus, elasmosaurus,
        pteranodon, pigeon];
    const grid = document.getElementById("grid");
    for (let [index, dino] of dinos.entries()) {
        if (index == 4) {
            let givenHuman = document.createElement("div");
            givenHuman.classList.add('grid-item');
            givenHuman.innerHTML = `
                <h4>${human.name}</h4>
                <img src="${human.image}">
            `;
            grid.appendChild(givenHuman);

            let tile = document.createElement('div');
            tile.classList.add('grid-item');
            tile.innerHTML = `
                <h4>${dino.species}</h4>
                <img src="${dino.image}">
                <p>${dino.giveRandomFact()}</p>
            `
            grid.appendChild(tile);


        } else {
            let tile = document.createElement('div');
            tile.classList.add('grid-item');
            tile.innerHTML = `
                <h4>${dino.species}</h4>
                <img src="${dino.image}">
                <p>${dino.giveRandomFact()}</p>
            `
            grid.appendChild(tile);
        }

    }

}
function deleteForm() {
    document.getElementById("dinocompare").hidden = true;
    document.getElementById("grid").hidden = false;
}
dinocompare.addEventListener('input', () => {
    if (username.value.length > 0 && feet.value.length > 0
        && inches.value.length > 0
        && weight.value.length > 0
    ) {
        btn.removeAttribute('disabled');
    } else {
        btn.setAttribute('disabled', 'disabled');
    }

});

var form = document.getElementById("dinocompare");
function handleForm(event) {
    event.preventDefault();
}
form.addEventListener('submit', handleForm);

     // Add tiles to DOM
    // Remove form from screen
// On button click, prepare and display infographic
