// from data.js
var tableData = data;

// select objects
var tbody = d3.select("tbody");
var button = d3.select("#form-button");
var dateForm = d3.select("#datetime");
var cityForm = d3.select("#city");
var statesDropdown = d3.select("#stateslist");
var countriesDropdown = d3.select("#countrylist");
var shapesDropdown = d3.select("#shapelist");
var resetButton = d3.select("#reset-button");

// create event handlers
button.on("click", filterData);
dateForm.on("submit", filterData);
resetButton.on("click", resetTable)

//populate states dropdown
// create array of states (and upper case them)
var states = tableData.map(function(line) {
    return line.state.toUpperCase();
});
// sort state values and remove duplicates
uniqueStates = [...new Set(states.sort())];
// populate dropdown list
uniqueStates.forEach((state) => {
    var option = statesDropdown.append("option");
    option.text(state);
})

//populate countries dropdown
// create array of countries (and upper case them)
var countries = tableData.map(function(line) {
    return line.country.toUpperCase();
});
// sort country values and remove duplicates
uniqueCountries = [...new Set(countries.sort())];
// populate dropdown list
uniqueCountries.forEach((country) => {
    var option = countriesDropdown.append("option");
    option.text(country);
})

//populate shapes dropdown
// create array of shapes
var shapes = tableData.map(function(line) {
    return line.shape;
});
// sort shape values and remove duplicates
uniqueShapes = [...new Set(shapes.sort())];
// populate dropdown list
uniqueShapes.forEach((shape) => {
    var option = shapesDropdown.append("option");
    option.text(shape);
})

// filter function
function filterData() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // store input values
    dateValue = dateForm.property("value");
    cityValue = cityForm.property("value");
    stateValue = statesDropdown.property("value").toLowerCase();
    countryValue = countriesDropdown.property("value").toLowerCase();
    shapeValue = shapesDropdown.property("value");
    //filter data based on input values
    //if any inputs are blank, accept that as true
    var filteredData = tableData.filter(sighting => 
        ((dateValue === "") || (sighting.datetime === dateValue)) &&
        ((cityValue === "") || (sighting.city === cityValue)) &&
        ((stateValue === "") || (sighting.state === stateValue)) &&
        ((shapeValue === "") || (sighting.shape === shapeValue))
        );
    // run results through table populator
    displayData(filteredData);
}

// populate table function
function displayData(desiredData) {
    //clear out any existing table data
    clearTable();
    //create table and insert data
    desiredData.forEach((sighting) => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
        });
    });
}

// clear table function
function clearTable() {
    //remove all code from tbody to clear table
    var tableContent = d3.select("tbody").html(""); 
}

// reset table function
function resetTable() {
    clearTable;
    displayData(tableData)
}

// display default data on page load
displayData(tableData);