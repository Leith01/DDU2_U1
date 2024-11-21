// Recommended: All functions declared here

//En funktion för att initiera sidan
function init() {
  
    createAllCityBox();
    addCity();
    markTargetCity(targetCity);
//    createDistanceTable();
}

function addCity() {
    
    if (!targetCityName) {
        h2Element.textContent = "Ingen stad angavs";
        title.textContent = "Not found"
        return;
    }

    if (targetCity) {
        h2Element.textContent = `${targetCity.name} (${targetCity.country})`;
        title.textContent = `${targetCity.name}`;
    } else {
        h2Element.textContent = `${targetCityName} finns inte i databasen`;
        h3Element.remove();
        title.textContent = "Not found";
    }
}

function searchCity(name) {
    const lowerCaseName = name.toLowerCase();

    for (let i = 0; i < cities.length; i++) {
        if (cities[i].name.toLowerCase() === lowerCaseName) {
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

function markTargetCity(targetCity) { //KONVENTERA FRÅN KM TILL MIL!!!!!!!!!
    const cityBoxes = document.getElementsByClassName("cityBox");


    const {closestCity, furthestCity, closeDistance, farDistance} = findDistanceToCity(targetCity);

    closestSpan.textContent = `${closestCity.name}`;
    furthestSpan.textContent = `${furthestCity.name}`;
   
    for (let i = 0; i < cityBoxes.length; i++) {
        const cityBox = cityBoxes[i];
        const city = cities[i];
        

        if (city.id === targetCity.id) {
            cityBox.classList.add("target");
            cityBox.textContent = `${city.name}`;
        }

        else if (city.id == closestCity.id) {
            cityBox.classList.add("closest");
            cityBox.textContent = `${city.name} ligger ${closeDistance / 10} mil bort`;
        }

        else if (city.id === furthestCity.id) {
            cityBox.classList.add("furthest");
            cityBox.textContent = `${city.name} ligger ${farDistance / 10} mil bort`;
        }
        else {
            cityBox.classList.remove("target", "closest", "furthest");
            cityBox.textContent = city.name;
        }
    }
}

// Recommended: constants with references to existing HTML-elements
const cities_id = document.querySelector("#cities");
const target = document.querySelector(".target");
const closestSpan = document.getElementById("closest");
const furthestSpan = document.getElementById("furthest");
const table = document.querySelector("#table");
const title = document.querySelector("title");
const h2Element = document.querySelector("h2");
const h3Element = document.querySelector("h3");
// Recommended: Ask for the city name and then the rest of the code

const targetCityName = prompt("Vilken stad?")
const targetCity = searchCity(targetCityName)

init();
