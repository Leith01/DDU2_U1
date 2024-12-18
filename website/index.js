const cities_id = document.querySelector("#cities");
const target = document.querySelector(".target");
const closestSpan = document.getElementById("closest");
const furthestSpan = document.getElementById("furthest");
const table = document.querySelector("#table");
const title = document.querySelector("title");
const h2Element = document.querySelector("h2");
const h3Element = document.querySelector("h3");

const targetCityName = prompt("Vilken stad?")
const targetCity = searchCity(targetCityName)

function init() {
    createAllCityBox();
    addCity();
    markTargetCity(targetCity);
    createDistanceTable();
}

function addCity() {
    if (!targetCityName) {
        h2Element.textContent = "Ingen stad angavs";
        title.textContent = "Not found"
        h3Element.remove();
        createDistanceTable();
    } else {
        if (targetCity) {
        h2Element.textContent = `${targetCity.name} (${targetCity.country})`;
        title.textContent = `${targetCity.name}`;
        } else {
        h2Element.textContent = `${targetCityName} finns inte i databasen`;
        h3Element.remove();
        title.textContent = "Not found";
        createDistanceTable();
        }
    } 
}

function searchCity(name) {
    if (!name) {
        return null;
    }
    const normalizedInput = name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    for (let i = 0; i < cities.length; i++) {
        const cityNameNormalized = cities[i].name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        if (cityNameNormalized === normalizedInput) {
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
    let closestCity = null; 
    let furthestCity = null; 
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

function createDistanceTable() {
    const headerColumn = document.createElement("div");
    headerColumn.classList.add("head_column");
    const emptySpace = document.createElement("div");
    emptySpace.classList.add("cell", "head_column");
    emptySpace.textContent = "NoCity";
    emptySpace.style.color = "rgba(0,0,0,0)";
    headerColumn.appendChild(emptySpace);

    for (let i = 0; i < cities.length; i++) {
        const cityNameCell = document.createElement("div");
        cityNameCell.classList.add("cell", "head_column");
        cityNameCell.textContent = `${cities[i].id}-${cities[i].name}`;
        headerColumn.appendChild(cityNameCell);
    }
    table.appendChild(headerColumn);

    const nameCells = headerColumn.querySelectorAll(".cell");
    for (let i = 0; i < cities.length; i++) {
        const cityRow = document.createElement("div");
        cityRow.classList.add(".row");
        const idNmrCell = document.createElement("div");
        idNmrCell.classList.add("cell", "head_row");
        idNmrCell.textContent = cities[i].id;
        cityRow.appendChild(idNmrCell);
        idNmrCell.style.backgroundColor = "aliceblue";

        for (let j = 0; j < cities.length; j++) {
            const distanceCell = document.createElement("div");
            distanceCell.classList.add("cell");

            if (i === j) {
                distanceCell.textContent = "0";
                distanceCell.style.color = "rgba(0,0,0,0)"
            } else {
                const distance = findDistanceBetweenCities(cities[i].id, cities[j].id);
                distanceCell.textContent = `${distance / 10}`;
            }   

            if (i % 2 === 0) {
                cityRow.classList.add("even_col");
            }

            if (j % 2 === 0) {
                distanceCell.classList.add("even_row");
            }

            cityRow.appendChild(distanceCell);

            const nameCell = nameCells[j + 1];
            if (j % 2 === 0) {
                nameCell.style.borderBottom = "2px solid black";
            }
        }
        table.appendChild(cityRow);
    }
}

function findDistanceBetweenCities(city1Id, city2Id) {
    for (let distanceObj of distances) {
        if (distanceObj.city1 === city1Id) {
            if (distanceObj.city2 === city2Id) {
                return distanceObj.distance;
            }
        } 
        if (distanceObj.city2 === city1Id) {
            if (distanceObj.city1 === city2Id) {
                return distanceObj.distance;
            }
        }
    }
    return null;
}

init();
