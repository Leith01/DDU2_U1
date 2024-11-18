// Recommended: All functions declared here

//En funktion för att initiera sidan
function init() {
    const targetCityName = prompt("Vilken stad?")

    const h2Element = document.querySelector("h2");

    if (!targetCityName) {
        h2Element.textContent = "Ingen stad angavs";
        return;
    }

    const targetCity = searchCity(targetCityName);
    if (targetCity) {
        h2Element.textContent = `${targetCity.name} (${targetCity.country})`;
    }
    else {
    h2Element.textContent = "Staden hittades inte!";
}
    createAllCityBox();
//    createDistanceTable();
}

function searchCity(name) {
    for (let i = 0; i < cities.length; i++) {
        if (cities[i].name === name) {
            return cities[i];
        }
    }
}

function createAllCityBox() {
    const citiesContainer = document.getElementById("cities");

    for (let i = 0; i < cities.length; i++) {
        const city = cities[i];

        const cityBox = document.createElement("div");
        cityBox.className = "cityBox";
        cityBox.textContent = city.name;

        citiesContainer.appendChild(cityBox);
    }
}

// Recommended: constants with references to existing HTML-elements
const cities_id = document.querySelector("#cities");
const target = document.querySelector(".target");
const closest = document.querySelector(".closest");
const furthest = document.querySelector(".furthest");
const table = document.querySelector("#table");

// Recommended: Ask for the city name and then the rest of the code

init();
