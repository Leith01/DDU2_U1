// Recommended: All functions declared here

//En funktion för att initiera sidan
function init() {
  
    createAllCityBox();
//    createDistanceTable();
}

function addCity() {
    
    if (!targetCityName) {
        h2Element.textContent = "Ingen stad angavs";
        title.textContent = "Not found"
        return;
    }

    const targetCity = searchCity(targetCityName);
    if (targetCity) {
        h2Element.textContent = `${targetCity.name} (${targetCity.country})`;
        title.textContent = `${targetCity.name}`;
    } else {
        h2Element.textContent = "Staden hittades inte!"; 
        title.textContent = "Not found";
    }
}

function searchCity(name) {
    for (let i = 0; i < cities.length; i++) {
        if (cities[i].name === name) {
            return cities[i];
        }
    }
    return null;
}

function createAllCityBox() {
    for (let i = 0; i < cities.length; i++) {
        const city = cities[i];

        const cityBox = document.createElement("div");
        cityBox.className = "cityBox";
        cityBox.textContent = city.name;

        cities_id.appendChild(cityBox);
    }
    addCity();
}

function findDistanceToCity(targetCity) {
    let closestCity = null; //null eftersom att vi inte har något objekt att jämföra med
    let furthestCity = null;  //null eftersom att vi inte har något objekt att jämföra med
    let closeDistance = 0;
    let farDistance = 0;

    for (let i = 0; i < distances.length; i++) {
        const distance = distances[i].distance;
        const city1Id = distances[i].city1;
        const city2Id = distances[i].city2;

        if (city1Id === targetCity.id) {
            if (distance < closeDistance || closeDistance === 0) {
                closeDistance = distance;
                closestCity = cities[city2Id]
            }
            if (distance > farDistance || farDistance === 0) {
                farDistance = distance;
                furthestCity = cities[city2Id];
            }
        }

        else if (city2Id === targetCity.id) {
            if (distance < closeDistance || closeDistance === 0) {
                closeDistance = distance;
                closestCity = cities[city1Id];
            }
            if (distance > farDistance || farDistance === 0) {
                farDistance = distance;
                furthestCity = cities[city1Id]
            }
        }
    }
    return {closestCity, furthestCity, closeDistance, farDistance};
}

function markTargetCity(targetCity) {
    const cityBoxes = document.getElementsByClassName("cityBox");
    const targetCity = searchCity(targetCityName)

    for (let i = 0; i < cityBoxes.length; i++) {
        const cityBox = cityBoxes[i];
        const city = cities[i];

        if (city.id === targetCity.id) {
            cityBox[i].classList.add("target");
            cityBox.textContent = `${city.name}`;
        }

        else if (city.id == closestCity.id) {
           // cityBox[i].textContent = 
        }
    }
}



// Recommended: constants with references to existing HTML-elements
const cities_id = document.querySelector("#cities");
const target = document.querySelector(".target");
const closest = document.querySelector(".closest");
const furthest = document.querySelector(".furthest");
const table = document.querySelector("#table");
const title = document.querySelector("title");
const h2Element = document.querySelector("h2");
// Recommended: Ask for the city name and then the rest of the code

const targetCityName = prompt("Vilken stad?")



init();
