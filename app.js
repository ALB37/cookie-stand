'use strict';


// // Global Variables // //

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
var allStores = [];
var storeTable = document.getElementById('store');
var newCookieStore = document.getElementById('new-store');
var allStoreTotals = [];
var totalTurtle = 0;


// Store Object Constructor //

function Store(name, minCust, maxCust, avgCookieSales){
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookieSales = avgCookieSales;
  this.dailySales = 0;
  this.hourlySales = [];
  allStores.push(this);
}

// Store Object Prototypes //

// Random-number generator based on store object data
Store.prototype.hourlyCusts = function(){
  return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
};

// Calculate hourly transactions
Store.prototype.hourlyTrans = function(){
  for (var i = 0; i < hours.length; i++){
    var numCust = this.hourlyCusts();
    this.hourlySales.push(Math.round(numCust * this.avgCookieSales));
  }
};

// Calculate daily transactions per location
Store.prototype.dailyTrans = function(){
  for (var i in this.hourlySales){
    this.dailySales += this.hourlySales[i];
  }
};

// Render store data into table
Store.prototype.render = function(){
  var trEl = document.createElement('tr');

  var thEl = document.createElement('th');
  thEl.textContent = this.name;
  trEl.appendChild(thEl);

  for (var i in this.hourlySales) {
    var tdEl = document.createElement('td');
    tdEl.textContent = this.hourlySales[i] + ' cookies';
    trEl.appendChild(tdEl);
  }

  thEl = document.createElement('th');
  thEl.textContent = this.dailySales;
  trEl.appendChild(thEl);

  storeTable.appendChild(trEl);
};

// Instantiate Store objects
new Store('1st and Pike', 23, 65, 6.3);
new Store('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);


// // Functions: // //

// Render table header row
function makeHeaderRow() {
  var trEl = document.createElement('tr');

  var thEl = document.createElement('th');
  thEl.textContent = 'Store';
  trEl.appendChild(thEl);

  for (var i in hours) {
    thEl = document.createElement('th');
    thEl.textContent = hours[i];
    trEl.appendChild(thEl);
  }

  thEl = document.createElement('th');
  thEl.textContent = 'Daily Total';
  trEl.appendChild(thEl);

  storeTable.appendChild(trEl);
}

// Generate and render the data for each Store object
function dataRowCall(){
  for (var i in allStores){
    allStores[i].hourlyTrans();
    allStores[i].dailyTrans();
    allStores[i].render();
  }
}

// Calculate the total sales for all location hour by hour
function columnSum(){
  for (var i = 0; i < hours.length; i++){
    var storeTotal = 0;
    for (var j = 0; j < allStores.length; j++){
      storeTotal += allStores[j].hourlySales[i];
    }
    allStoreTotals.push(storeTotal);
  }
}

// Calculate total daily sum of all locations
function totalTotalSum(){
  totalTurtle = 0;
  for (var i in allStoreTotals){
    totalTurtle += allStoreTotals[i];
  }
}

// Render table footer row
function makeTotalsRender() {
  var trEl = document.createElement('tr');
  trEl.setAttribute('id', 'footer');

  var thEl = document.createElement('th');
  thEl.textContent = 'All Stores Totals';
  trEl.appendChild(thEl);

  for (var i in hours) {
    thEl = document.createElement('th');
    thEl.textContent = allStoreTotals[i];
    trEl.appendChild(thEl);
  }

  thEl = document.createElement('th');
  thEl.textContent = totalTurtle;
  trEl.appendChild(thEl);

  storeTable.appendChild(trEl);
}

// Call all three functions related to calculating and rendering the final row simultaneosly
function callFooterFunctions() {
  columnSum();
  totalTotalSum();
  makeTotalsRender();
}

// Re-renders all of the Store data keeping old data unchanged and inserting new data related to the user input
function renderAllTable(){
  // Declare text-box data as variables
  var newStoreName = event.target.getStoreName.value;
  var newMinCusts = event.target.getMinCusts.value;
  var newMaxCusts = event.target.getMaxCusts.value;
  var newAvgSales = event.target.getAvgSales.value;
  // Variable to prevent duplicate Store object when editing existing data
  var counter = 0;
  // Checks the name entered in text-box against existing Store objects
  for (var i = 0; i < allStores.length; i++){
    if (newStoreName === allStores[i].name){
      // Edit data of existing Store object
      allStores[i].minCust = parseInt(newMinCusts);
      allStores[i].maxCust = parseInt(newMaxCusts);
      allStores[i].avgCookieSales = parseInt(newAvgSales);
      allStores[i].dailySales = 0;
      allStores[i].hourlySales = [];
      // Call functions to calculate new data based on new numbers entered
      allStores[i].hourlyTrans();
      allStores[i].dailyTrans();
      // Skip next if statement if this conditional is triggered
      counter++;
    }
  }
  // Create new Store object if the name entered in the text box doesn't match a previously existing Store object
  if (counter === 0){
    new Store(newStoreName, parseInt(newMinCusts), parseInt(newMaxCusts), parseInt(newAvgSales));
    // Calculate data only for the newest Store object (i.e. the one just instantiated)
    allStores[allStores.length - 1].hourlyTrans();
    allStores[allStores.length - 1].dailyTrans();
  }
  // Render the table data for the Store objects
  for (var j = 0; j < allStores.length; j++){
    allStores[j].render();
  }
}

// Function for handling the event of pressing the submit button
function handleNewStoreSubmit(event){
  // Prevent the page from reloading
  event.preventDefault();
  // Reset the sum of all hourly total sales (a Store will be added or changed, so this value will change)
  allStoreTotals = [];
  // Input validation
  if (!event.target.getStoreName.value || !event.target.getMinCusts.value || !event.target.getMaxCusts.value || !event.target.getAvgSales.value ) {
    return alert('Please fill in all fields!');
  }
  // Wipe the table data clean
  storeTable.innerHTML = '';

  // Re-render the table (unchanged data will remain in memory)
  makeHeaderRow();
  renderAllTable();
  callFooterFunctions();
}


// // Execution // //

// Creates event listener for submit button
newCookieStore.addEventListener('submit', handleNewStoreSubmit);

makeHeaderRow();

dataRowCall();

callFooterFunctions();
