'use strict';


// // Global Variables // //

Store.hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
Store.all = [];
Store.salesTable = document.getElementById('store');
Store.newCookieStore = document.getElementById('new-store');
Store.allStoreTotals = [];
Store.totalTurtle = 0;
Store.allStoresHourlyLabor = [];
Store.totalDailyLabor = 0;


// Store Object Constructor //

function Store(name, minCust, maxCust, avgCookieSales){
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookieSales = avgCookieSales;
  this.dailySales = 0;
  this.dailyEmployees = 0;
  this.hourlySales = [];
  this.hourlyEmployees = [];
  Store.all.push(this);
}

// Store Object Prototypes //

// Random-number generator based on store object data
Store.prototype.hourlyCusts = function(){
  return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
};

// Calculate hourly transactions
Store.prototype.hourlyTrans = function(){
  for (var i = 0; i < Store.hours.length; i++){
    var numCust = this.hourlyCusts();
    this.hourlySales.push(Math.round(numCust * this.avgCookieSales));
  }
};

Store.prototype.hourlyLaborReq = function() {
  for (var i = 0; i < this.hourlySales.length; i++){
    this.hourlyEmployees.push(Math.ceil(this.hourlySales[i] / 20));
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
  Store.newElement('th', this.name, trEl);
  for (var i in this.hourlySales) {
    Store.newElement('td', this.hourlySales[i] + ' cookies', trEl);
  }
  Store.newElement('th', this.dailySales, trEl);
  Store.salesTable.appendChild(trEl);
};

// Instantiate Store objects
new Store('1st and Pike', 23, 65, 6.3);
new Store('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);


// // Functions: // //


Store.newElement = function(type, content, parent) {
  var newEl = document.createElement(type);
  newEl.textContent = content;
  parent.appendChild(newEl);
};

// Render table header row
Store.makeHeaderRow = function() {
  var trEl = document.createElement('tr');
  Store.newElement('th', 'Store', trEl);
  for (var i in Store.hours) {
    Store.newElement('th', Store.hours[i], trEl);
  }
  Store.newElement('th', 'Daily Total', trEl);
  Store.salesTable.appendChild(trEl);
};

// Generate and render the data for each Store object
Store.dataRowCall = function(){
  for (var i in Store.all){
    Store.all[i].hourlyTrans();
    Store.all[i].dailyTrans();
    Store.all[i].render();
  }
};

// Calculate the total sales for all location hour by hour
Store.columnSum = function(){
  for (var i = 0; i < Store.hours.length; i++){
    var storeTotal = 0;
    for (var j = 0; j < Store.all.length; j++){
      storeTotal += Store.all[j].hourlySales[i];
    }
    Store.allStoreTotals.push(storeTotal);
  }
};

// Calculate total daily sum of all locations
Store.totalTotalSum = function(){
  Store.totalTurtle = 0;
  for (var i in Store.allStoreTotals){
    Store.totalTurtle += Store.allStoreTotals[i];
  }
};

// Render table footer row
Store.makeTotalsRender = function() {
  var trEl = document.createElement('tr');
  Store.newElement('th', 'All Stores Totals', trEl);
  for (var i in Store.hours) {
    Store.newElement('th', Store.allStoreTotals[i], trEl);
  }
  Store.newElement('th', Store.totalTurtle, trEl);
  Store.salesTable.appendChild(trEl);
};

// Call all three functions related to calculating and rendering the final row simultaneosly
Store.callFooterFunctions = function() {
  Store.columnSum();
  Store.totalTotalSum();
  Store.makeTotalsRender();
};

// Re-renders all of the Store data keeping old data unchanged and inserting new data related to the user input
Store.renderAllTable = function(){
  // Declare text-box data as variables
  var newStoreName = event.target.getStoreName.value;
  var newMinCusts = event.target.getMinCusts.value;
  var newMaxCusts = event.target.getMaxCusts.value;
  var newAvgSales = event.target.getAvgSales.value;
  // Variable to prevent duplicate Store object when editing existing data
  var counter = 0;
  // Checks the name entered in text-box against existing Store objects
  for (var i = 0; i < Store.all.length; i++){
    if (newStoreName === Store.all[i].name){
      // Edit data of existing Store object
      Store.all[i].minCust = parseInt(newMinCusts);
      Store.all[i].maxCust = parseInt(newMaxCusts);
      Store.all[i].avgCookieSales = parseInt(newAvgSales);
      // Reset data to be re-calculated
      Store.all[i].dailySales = 0;
      Store.all[i].hourlySales = [];
      Store.all[i].dailyEmployees = 0;
      Store.all[i].hourlyEmployees = [];
      // Call functions to calculate new data based on new numbers entered
      Store.all[i].hourlyTrans();
      Store.all[i].dailyTrans();
      Store.all[i].hourlyLaborReq();
      Store.all[i].dailyEmployeeReq();
      // Skip next if statement if this conditional is triggered
      counter++;
    }
  }
  // Create new Store object if the name entered in the text box doesn't match a previously existing Store object
  if (counter === 0){
    new Store(newStoreName, parseInt(newMinCusts), parseInt(newMaxCusts), parseInt(newAvgSales));
    // Calculate data only for the newest Store object (i.e. the one just instantiated)
    Store.all[Store.all.length - 1].hourlyTrans();
    Store.all[Store.all.length - 1].dailyTrans();
    Store.all[Store.all.length - 1].hourlyLaborReq();
    Store.all[Store.all.length - 1].dailyEmployeeReq();
  }
  // Render the table data for the Store objects
  for (var j = 0; j < Store.all.length; j++){
    Store.all[j].render();
    Store.all[j].laborRender();
  }
};

// Function for handling the event of pressing the submit button
Store.handleNewStoreSubmit = function(event){
  // Prevent the page from reloading
  event.preventDefault();
  // Reset the sum of all hourly total sales/labor (a Store will be added or changed, so this value will change)
  Store.allStoreTotals = [];
  Store.allStoresHourlyLabor = [];
  // Input validation
  if (!event.target.getStoreName.value || !event.target.getMinCusts.value || !event.target.getMaxCusts.value || !event.target.getAvgSales.value ) {
    return alert('Please fill in all fields!');
  }
  // Wipe the table data clean
  Store.salesTable.innerHTML = '';
  Store.laborTable.innerHTML = '';

  // Re-render the table (unchanged data will remain in memory)
  Store.makeHeaderRow();
  Store.laborHeaderRow();
  Store.renderAllTable();
  Store.callFooterFunctions();
  Store.laborFooterFunctions();
};


// // Execution // //

// Creates event listener for submit button
Store.newCookieStore.addEventListener('submit', Store.handleNewStoreSubmit);

Store.makeHeaderRow();

Store.dataRowCall();

Store.callFooterFunctions();


Store.laborTable = document.getElementById('staff');

Store.laborHeaderRow = function() {
  var trEl = document.createElement('tr');

  // var thEl = document.createElement('th');
  // thEl.textContent = 'Store';
  // trEl.appendChild(thEl);
  Store.newElement('th', 'Store', trEl);

  for (var i in Store.hours) {
    // thEl = document.createElement('th');
    // thEl.textContent = Store.hours[i];
    // trEl.appendChild(thEl);
    Store.newElement('th', Store.hours[i], trEl);
  }

  // thEl = document.createElement('th');
  // thEl.textContent = 'Total Employee Hours';
  // trEl.appendChild(thEl);
  Store.newElement('th', 'Total Employee Hours', trEl);

  Store.laborTable.appendChild(trEl);
};

Store.laborHeaderRow();

Store.prototype.laborRender = function(){
  var trEl = document.createElement('tr');

  // var thEl = document.createElement('th');
  // thEl.textContent = this.name;
  // trEl.appendChild(thEl);
  Store.newElement('th', this.name, trEl);

  for (var i in this.hourlySales) {
    // var tdEl = document.createElement('td');
    // tdEl.textContent = this.hourlyEmployees[i];
    // trEl.appendChild(tdEl);
    Store.newElement('td', this.hourlyEmployees[i], trEl);
  }

  // thEl = document.createElement('th');
  // thEl.textContent = this.dailyEmployees;
  // trEl.appendChild(thEl);
  Store.newElement('th', this.dailyEmployees, trEl);

  Store.laborTable.appendChild(trEl);
};

Store.prototype.dailyEmployeeReq = function(){
  for (var i in this.hourlyEmployees){
    this.dailyEmployees += this.hourlyEmployees[i];
  }
};

Store.laborRowCall = function(){
  for (var i in Store.all){
    Store.all[i].hourlyLaborReq();
    Store.all[i].dailyEmployeeReq();
    Store.all[i].laborRender();
  }
};

Store.laborRowCall();

Store.laborColumnSum = function(){
  for (var i = 0; i < Store.hours.length; i++){
    var storeTotal = 0;
    for (var j = 0; j < Store.all.length; j++){
      storeTotal += Store.all[j].hourlyEmployees[i];
    }
    Store.allStoresHourlyLabor.push(storeTotal);
  }
};

Store.totalLaborSum = function(){
  Store.totalDailyLabor = 0;
  for (var i in Store.allStoresHourlyLabor){
    Store.totalDailyLabor += Store.allStoresHourlyLabor[i];
  }
};

Store.totalsLaborRender = function() {
  var trEl = document.createElement('tr');
  //
  // var thEl = document.createElement('th');
  // thEl.textContent = 'All Stores Totals';
  // trEl.appendChild(thEl);
  Store.newElement('th', 'All Stores Totals', trEl);

  for (var i in Store.hours) {
    // thEl = document.createElement('th');
    // thEl.textContent = Store.allStoresHourlyLabor[i];
    // trEl.appendChild(thEl);
    Store.newElement('th', Store.allStoresHourlyLabor[i], trEl);
  }

  // thEl = document.createElement('th');
  // thEl.textContent = Store.totalDailyLabor;
  // trEl.appendChild(thEl);
  Store.newElement('th', Store.totalDailyLabor, trEl);

  Store.laborTable.appendChild(trEl);
};

Store.laborFooterFunctions = function() {
  Store.laborColumnSum();
  Store.totalLaborSum();
  Store.totalsLaborRender();
};

Store.laborFooterFunctions();
