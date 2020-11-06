// from data.js
var tableData = data;

// select objects
var tbody = d3.select("tbody");
var button = d3.select("#form-button");
var form = d3.select("#datetime");

// create event handlers
button.on("click", filterData);
form.on("submit", filterData);

// filter function
function filterData() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // store input value
    inputValue = form.property("value");
    //filter data based on input value
    var filteredData = tableData.filter(sighting => sighting.datetime === inputValue);
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

// clear table data
function clearTable() {
    //remove all code from tbody to clear table
    var tableContent = d3.select("tbody").html(""); 
}

// display default data on page load
displayData(tableData);