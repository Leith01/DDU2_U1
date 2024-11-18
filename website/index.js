// Recommended: All functions declared here

//En funktion för att initiera sidan
function init() {
    createAllCityBox();
    createDistanceTable();
}

function searchCity(name) {
    for (let i = 0; i < cities.length; i++) {
        if (cities[i].name === name) {
            return cities[i];
        }
    }
}

function createAllCityBox() {
    //.....
}



// Recommended: constants with references to existing HTML-elements
const cities = document.querySelector("#cities");
const target = document.querySelector(".target");
const closest = document.querySelector(".closest");
const furthest = document.querySelector(".furthest");
const table = document.querySelector("#table");

// Recommended: Ask for the city name and then the rest of the code

const targetCityName = prompt("Vilken stad?")

const h2Element = document.querySelector("h2");

if (!targetCityName) {
    alert("Du angav ingen stad. Try again!")
    h2Element.textContent = "Ingen stad angavs";
    return;
}

const targetCity = searchCity(targetCityName);
if (targetCity) {
    h2Element.textContent = '${targetCity.name} (${targetCity.country})';
}
else {
    h2Element.textContent = "Staden hittades inte!";
}

